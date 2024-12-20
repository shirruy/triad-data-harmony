import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

interface Metrics {
  callsOffered: number;
  answeredCalls: number;
  abandonCalls: number;
}

export const useAHTMetrics = (startDate?: Date, endDate?: Date) => {
  const { data: metrics, isLoading, error, refetch } = useQuery({
    queryKey: ['aht-metrics', startDate, endDate],
    queryFn: async () => {
      try {
        let query = supabase
          .from('aht_metrics')
          .select('calls_offered, answered_calls, abandon_calls');

        if (startDate && endDate) {
          query = query
            .gte('created_at', format(startDate, 'yyyy-MM-dd'))
            .lte('created_at', format(endDate, 'yyyy-MM-dd'));
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        if (!data || data.length === 0) {
          return {
            callsOffered: 0,
            answeredCalls: 0,
            abandonCalls: 0,
          };
        }

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

        return totals;
      } catch (error) {
        console.error('Error fetching metrics:', error);
        throw error;
      }
    }
  });

  return { 
    metrics: metrics || { callsOffered: 0, answeredCalls: 0, abandonCalls: 0 },
    isLoading,
    error,
    refetch
  };
};