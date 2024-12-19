import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface HistoricalTrendProps {
  startDate?: Date;
  endDate?: Date;
}

interface HistoricalData {
  id: string;
  date: string;
  value: number;
  metric_type: string;
  created_at: string;
}

export const HistoricalTrend = ({ startDate, endDate }: HistoricalTrendProps) => {
  const { data: trendData, isLoading } = useQuery({
    queryKey: ['historical-trend', startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('historical_trend_data')
        .select('*')
        .order('date', { ascending: true });

      if (startDate && endDate) {
        query = query
          .gte('date', format(startDate, 'yyyy-MM-dd'))
          .lte('date', format(endDate, 'yyyy-MM-dd'));
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as HistoricalData[];
    }
  });

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <Card>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Historical Trend</h2>
        <div className="mt-4">
          {trendData?.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{format(new Date(item.date), 'MMM d, yyyy')}</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};