import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface TeamCollaborationProps {
  startDate?: Date;
  endDate?: Date;
}

interface CollaborationData {
  id: string;
  team_name: string;
  collaboration_score: number;
  created_at: string;
}

export const TeamCollaboration = ({ startDate, endDate }: TeamCollaborationProps) => {
  const { data: collaborationData } = useQuery({
    queryKey: ['team-collaboration', startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('team_collaboration_data')
        .select('*');

      if (startDate && endDate) {
        query = query
          .gte('created_at', format(startDate, 'yyyy-MM-dd'))
          .lte('created_at', format(endDate, 'yyyy-MM-dd'));
      }

      const { data, error } = await query;
      if (error) throw error;

      // Aggregate collaboration scores by team
      const teamMap = new Map();
      data.forEach((record: CollaborationData) => {
        if (!teamMap.has(record.team_name)) {
          teamMap.set(record.team_name, {
            total: 0,
            count: 0
          });
        }
        const current = teamMap.get(record.team_name);
        current.total += record.collaboration_score;
        current.count += 1;
      });

      // Calculate averages and convert to array
      const aggregatedData = Array.from(teamMap.entries()).map(([team_name, stats]) => ({
        team_name,
        collaboration_score: Math.round(stats.total / stats.count)
      }));

      return aggregatedData.sort((a, b) => b.collaboration_score - a.collaboration_score);
    }
  });

  return (
    <Card>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Team Collaboration Overview</h2>
        <div className="mt-4">
          {collaborationData?.map((item) => (
            <div key={item.team_name} className="flex justify-between py-2 border-b last:border-0">
              <span>{item.team_name}</span>
              <span className="font-medium">{item.collaboration_score}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};