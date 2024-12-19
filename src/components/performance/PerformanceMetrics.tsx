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
        .select('name, value, created_at');

      if (startDate && endDate) {
        query = query
          .gte('created_at', format(startDate, 'yyyy-MM-dd'))
          .lte('created_at', format(endDate, 'yyyy-MM-dd'));
      }

      const { data, error } = await query;
      if (error) throw error;

      // Create a map to store aggregated values
      const metricsMap = new Map();

      // Sum up all values and count records for each metric
      data.forEach(record => {
        if (!metricsMap.has(record.name)) {
          metricsMap.set(record.name, {
            total: 0,
            count: 0
          });
        }
        const current = metricsMap.get(record.name);
        current.total += record.value;
        current.count += 1;
      });

      // Convert map to array and calculate averages
      const aggregatedData = Array.from(metricsMap.entries()).map(([name, stats]) => ({
        name,
        value: Math.round(stats.total / stats.count)
      }));

      return aggregatedData.sort((a, b) => b.value - a.value);
    }
  });

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <Card>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Performance Metrics</h2>
        <div className="mt-4 space-y-2">
          {performanceData?.map((metric) => (
            <div key={metric.name} className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-lg">
              <span className="font-medium">{metric.name}</span>
              <span className="text-muted-foreground">{metric.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};