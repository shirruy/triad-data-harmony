import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface MetricsData {
  callsOffered: number;
  answeredCalls: number;
  abandonCalls: number;
}

export const useAHTMetrics = () => {
  const [metrics, setMetrics] = useState<MetricsData>({
    callsOffered: 0,
    answeredCalls: 0,
    abandonCalls: 0,
  });

  useEffect(() => {
    fetchMetrics();

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
    } catch (error) {
      console.error('Error in fetchMetrics:', error);
    }
  };

  return { metrics };
};