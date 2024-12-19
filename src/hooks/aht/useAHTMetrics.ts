import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface MetricsData {
  callsOffered: number;
  answeredCalls: number;
  abandonCalls: number;
}

export const useAHTMetrics = (startDate?: Date, endDate?: Date) => {
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
  }, [startDate, endDate]);

  const fetchMetrics = async () => {
    try {
      let query = supabase
        .from('aht_metrics')
        .select('*')
        .order('created_at', { ascending: false });

      if (startDate && endDate) {
        query = query
          .gte('created_at', format(startDate, 'yyyy-MM-dd'))
          .lte('created_at', format(endDate, 'yyyy-MM-dd'));
      }

      const { data, error } = await query.maybeSingle();

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