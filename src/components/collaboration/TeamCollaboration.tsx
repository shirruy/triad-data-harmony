import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface TeamCollaborationProps {
  startDate?: Date;
  endDate?: Date;
}

export const TeamCollaboration = ({ startDate, endDate }: TeamCollaborationProps) => {
  const { data: collaborationData } = useQuery({
    queryKey: ['team-collaboration', startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('team_collaboration_data')
        .select('*')
        .order('collaboration_score', { ascending: false });

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

  return (
    <div>
      <Card>
        <h2 className="text-lg font-semibold">Team Collaboration Overview</h2>
        <div className="mt-4">
          {collaborationData?.map((item) => (
            <div key={item.id} className="flex justify-between py-2">
              <span>{item.team_name}</span>
              <span>{item.collaboration_score}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
