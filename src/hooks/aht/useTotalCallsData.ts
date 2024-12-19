import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export const useTotalCallsData = (startDate?: Date, endDate?: Date) => {
  const { data: teamData, isLoading: isTeamLoading } = useQuery({
    queryKey: ['team-total-calls', startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('aht_team_data')
        .select('*')
        .order('value', { ascending: false });

      if (startDate && endDate) {
        query = query
          .gte('created_at', format(startDate, 'yyyy-MM-dd'))
          .lte('created_at', format(endDate, 'yyyy-MM-dd'));
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const { data: agentData, isLoading: isAgentLoading } = useQuery({
    queryKey: ['agent-total-calls', startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('aht_agent_data')
        .select('*')
        .order('value', { ascending: false });

      if (startDate && endDate) {
        query = query
          .gte('created_at', format(startDate, 'yyyy-MM-dd'))
          .lte('created_at', format(endDate, 'yyyy-MM-dd'));
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  return {
    teamData,
    agentData,
    isLoading: isTeamLoading || isAgentLoading
  };
};