import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface PerformanceMetricsProps {
  startDate?: Date;
  endDate?: Date;
}

export const PerformanceMetrics = ({ startDate, endDate }: PerformanceMetricsProps) => {
  const { data: performanceData, isLoading } = useQuery({
    queryKey: ['performance-metrics', startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('performance_metrics')
        .select('name, value, id')

      if (startDate && endDate) {
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');
        
        query = query
          .gte('created_at', `${formattedStartDate}T00:00:00`)
          .lte('created_at', `${formattedEndDate}T23:59:59`);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Aggregate data by metric name
      const aggregatedData = data?.reduce((acc, curr) => {
        const existingMetric = acc.find(m => m.name === curr.name);
        if (existingMetric) {
          existingMetric.value += curr.value;
        } else {
          acc.push({ ...curr });
        }
        return acc;
      }, [] as typeof data);

      return aggregatedData?.sort((a, b) => b.value - a.value) || [];
    },
    enabled: true
  });

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <Card>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Performance Metrics</h2>
        <div className="mt-4">
          {performanceData?.map((metric) => (
            <div key={`${metric.name}-${metric.id}`} className="flex justify-between">
              <span>{metric.name}</span>
              <span>{metric.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};