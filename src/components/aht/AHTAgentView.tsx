import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface AHTAgentViewProps {
  startDate?: Date;
  endDate?: Date;
}

export const AHTAgentView = ({ startDate, endDate }: AHTAgentViewProps) => {
  const { data: agentData, isLoading } = useQuery({
    queryKey: ['agent-aht', startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('aht_agent_data')
        .select('*')
        .order('value', { ascending: false });

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
      <CardHeader>
        <CardTitle>Agent AHT Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Agent</th>
                <th className="px-4 py-2">Average Handle Time</th>
              </tr>
            </thead>
            <tbody>
              {agentData?.map((agent) => (
                <tr key={`${agent.agent_name}-${agent.id}`}>
                  <td className="border px-4 py-2">{agent.agent_name}</td>
                  <td className="border px-4 py-2">{agent.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};