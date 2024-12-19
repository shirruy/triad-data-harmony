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
        .select('agent_name, value');

      if (startDate && endDate) {
        query = query
          .gte('created_at', format(startDate, 'yyyy-MM-dd'))
          .lte('created_at', format(endDate, 'yyyy-MM-dd'));
      }

      const { data, error } = await query;
      if (error) throw error;

      // Create a map to store aggregated values
      const agentMap = new Map<string, number>();

      // Sum up all values for each agent
      data.forEach(record => {
        const currentValue = agentMap.get(record.agent_name) || 0;
        agentMap.set(record.agent_name, currentValue + record.value);
      });

      // Convert map to array and sort by value
      const aggregatedData = Array.from(agentMap.entries()).map(([agent_name, value]) => ({
        agent_name,
        value
      }));

      return aggregatedData.sort((a, b) => b.value - a.value);
    },
    enabled: true
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
                <tr key={agent.agent_name}>
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