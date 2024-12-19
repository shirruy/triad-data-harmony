import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useDetailedMetrics = (type: 'team' | 'agent' | 'wave') => {
  return useQuery({
    queryKey: ['detailed-metrics', type],
    queryFn: async () => {
      let query;
      
      switch(type) {
        case 'team':
          query = supabase
            .from('aht_team_data')
            .select('*')
            .order('value', { ascending: false });
          break;
        case 'agent':
          query = supabase
            .from('aht_agent_data')
            .select('*')
            .order('value', { ascending: false });
          break;
        case 'wave':
          query = supabase
            .from('aht_wave_data')
            .select('*')
            .order('value', { ascending: false });
          break;
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });
};