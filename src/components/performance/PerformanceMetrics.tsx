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
        .select('*')
        .order('created_at', { ascending: false });

      if (startDate && endDate) {
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');
        
        query = query
          .gte('created_at', `${formattedStartDate}T00:00:00`)
          .lte('created_at', `${formattedEndDate}T23:59:59`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: true // This ensures the query runs even when dates are undefined
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
            <div key={metric.id} className="flex justify-between">
              <span>{metric.name}</span>
              <span>{metric.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};