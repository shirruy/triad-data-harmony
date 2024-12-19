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
        .select('name, value');

      if (startDate && endDate) {
        query = query
          .gte('created_at', format(startDate, 'yyyy-MM-dd'))
          .lte('created_at', format(endDate, 'yyyy-MM-dd'));
      }

      const { data, error } = await query;
      if (error) throw error;

      // Create a map to store aggregated values
      const metricsMap = new Map<string, number>();

      // Sum up all values for each metric
      data.forEach(record => {
        const currentValue = metricsMap.get(record.name) || 0;
        metricsMap.set(record.name, currentValue + record.value);
      });

      // Convert map to array and sort by value
      const aggregatedData = Array.from(metricsMap.entries()).map(([name, value]) => ({
        name,
        value
      }));

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