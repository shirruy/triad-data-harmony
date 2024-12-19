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
        .select('*');

      if (startDate && endDate) {
        query = query
          .gte('created_at', format(startDate, 'yyyy-MM-dd'))
          .lte('created_at', format(endDate, 'yyyy-MM-dd'));
      }

      const { data, error } = await query;
      if (error) throw error;

      // Create a map to store aggregated values
      const agentMap = new Map<string, { value: number, count: number }>();

      // Sum up all values and count records for each agent
      data.forEach(record => {
        const current = agentMap.get(record.agent_name) || { value: 0, count: 0 };
        agentMap.set(record.agent_name, {
          value: current.value + record.value,
          count: current.count + 1
        });
      });

      // Convert map to array and calculate averages
      const aggregatedData = Array.from(agentMap.entries()).map(([agent_name, stats]) => ({
        agent_name,
        value: Math.round(stats.value / stats.count) // Calculate average
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