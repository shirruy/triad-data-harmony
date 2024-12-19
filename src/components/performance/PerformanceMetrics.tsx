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
        .select('name, value')
        .order('created_at', { ascending: true });

      if (startDate && endDate) {
        query = query
          .gte('created_at', `${format(startDate, 'yyyy-MM-dd')}T00:00:00`)
          .lte('created_at', `${format(endDate, 'yyyy-MM-dd')}T23:59:59`);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Group and sum values by metric name
      const aggregatedData = data.reduce((acc, curr) => {
        const existingMetric = acc.find(m => m.name === curr.name);
        if (existingMetric) {
          existingMetric.value += curr.value;
        } else {
          acc.push({
            name: curr.name,
            value: curr.value
          });
        }
        return acc;
      }, [] as Array<{ name: string; value: number }>);

      // Sort by value in descending order
      return aggregatedData.sort((a, b) => b.value - a.value);
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
            <div key={metric.name} className="flex justify-between">
              <span>{metric.name}</span>
              <span>{metric.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};