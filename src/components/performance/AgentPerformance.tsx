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
import { User } from "lucide-react";

interface AgentData {
  agent_name: string;
  value: number;
  team_id: string | null;
}

export const AgentPerformance = () => {
  const { data: agentData, isLoading } = useQuery({
    queryKey: ['agent-answered-calls'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('aht_agent_data')
        .select('*')
        .order('value', { ascending: false });
      
      if (error) throw error;
      return data as AgentData[];
    }
  });

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Agent Answered Calls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Answered Calls</TableHead>
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
  );
};