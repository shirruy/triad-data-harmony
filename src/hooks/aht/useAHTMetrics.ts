import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Metrics {
  callsOffered: number;
  answeredCalls: number;
  abandonCalls: number;
}

export const useAHTMetrics = (startDate?: Date, endDate?: Date) => {
  const [metrics, setMetrics] = useState<Metrics>({
    callsOffered: 0,
    answeredCalls: 0,
    abandonCalls: 0,
  });

  const fetchMetrics = async () => {
    try {
      let query = supabase
        .from('aht_metrics')
        .select('calls_offered, answered_calls, abandon_calls')
        .order('created_at', { ascending: false });

      if (startDate && endDate) {
        query = query
          .gte('created_at', format(startDate, 'yyyy-MM-dd'))
          .lte('created_at', format(endDate, 'yyyy-MM-dd'));
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        // Sum up all metrics for the selected period
        const totals = data.reduce((acc, curr) => ({
          callsOffered: acc.callsOffered + curr.calls_offered,
          answeredCalls: acc.answeredCalls + curr.answered_calls,
          abandonCalls: acc.abandonCalls + curr.abandon_calls,
        }), {
          callsOffered: 0,
          answeredCalls: 0,
          abandonCalls: 0,
        });

        setMetrics(totals);
      }
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [startDate, endDate]);

  return { metrics };
};