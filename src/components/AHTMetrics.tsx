import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface MetricsData {
  callsOffered: number;
  answeredCalls: number;
  abandonCalls: number;
}

export const AHTMetrics = () => {
  const [metrics, setMetrics] = useState<MetricsData>({
    callsOffered: 0,
    answeredCalls: 0,
    abandonCalls: 0,
  });

  useEffect(() => {
    // Initial fetch
    fetchMetrics();

    // Set up real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'aht_metrics'
        },
        () => {
          fetchMetrics();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMetrics = async () => {
    try {
      const { data, error } = await supabase
        .from('aht_metrics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching metrics:', error);
        return;
      }

      if (data) {
        setMetrics({
          callsOffered: data.calls_offered,
          answeredCalls: data.answered_calls,
          abandonCalls: data.abandon_calls,
        });
      }
      // If no data is found, we'll keep using the default values set in useState
    } catch (error) {
      console.error('Error in fetchMetrics:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="Calls Offered"
        value={metrics.callsOffered.toLocaleString()}
      />
      <MetricCard
        title="Answered Calls"
        value={metrics.answeredCalls.toLocaleString()}
      />
      <MetricCard
        title="Abandon Calls"
        value={metrics.abandonCalls.toLocaleString()}
      />
    </div>
  );
};

const MetricCard = ({ title, value }: { title: string; value: string }) => (
  <Card className="bg-blue-600 text-white">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
      <HelpCircle className="h-4 w-4 text-white/70" />
    </CardHeader>
    <CardContent>
      <div className="text-4xl font-bold">{value}</div>
    </CardContent>
  </Card>
);
