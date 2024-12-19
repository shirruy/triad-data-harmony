import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

export const HistoricalTrend = () => {
  const { data: trendData } = useQuery({
    queryKey: ['historical-trend'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('aht_metrics')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      return data.map(item => ({
        date: new Date(item.created_at).toLocaleDateString(),
        calls: item.calls_offered,
        answered: item.answered_calls,
        abandoned: item.abandon_calls
      }));
    }
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Historical Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="calls" 
                stroke="#8884d8" 
                name="Total Calls" 
              />
              <Line 
                type="monotone" 
                dataKey="answered" 
                stroke="#82ca9d" 
                name="Answered" 
              />
              <Line 
                type="monotone" 
                dataKey="abandoned" 
                stroke="#ff7300" 
                name="Abandoned" 
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
};