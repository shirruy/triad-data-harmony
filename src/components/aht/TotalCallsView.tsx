import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { Users, User } from "lucide-react";

interface TeamData {
  name: string;
  value: number;
}

interface AgentData {
  agent_name: string;
  value: number;
  team_id: string | null;
}

export const TotalCallsView = () => {
  const { data: teamData, isLoading: isTeamLoading } = useQuery({
    queryKey: ['team-total-calls'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('aht_team_data')
        .select('*')
        .order('value', { ascending: false });
      
      if (error) throw error;
      return data as TeamData[];
    }
  });

  const { data: agentData, isLoading: isAgentLoading } = useQuery({
    queryKey: ['agent-total-calls'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('aht_agent_data')
        .select('*')
        .order('value', { ascending: false });
      
      if (error) throw error;
      return data as AgentData[];
    }
  });

  if (isTeamLoading || isAgentLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Team Performance Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team</TableHead>
                    <TableHead>Total Calls</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamData?.map((team) => (
                    <TableRow key={team.name}>
                      <TableCell>{team.name}</TableCell>
                      <TableCell>{team.value.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Agent Performance Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Agent Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Total Calls</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agentData?.map((agent) => (
                    <TableRow key={agent.agent_name}>
                      <TableCell>{agent.agent_name}</TableCell>
                      <TableCell>{agent.value.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};