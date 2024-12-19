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
import { AHTDateRangeSelector } from "./AHTDateRangeSelector";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";

interface TeamData {
  name: string;
  value: number;
  created_at: string;
}

interface AgentData {
  agent_name: string;
  value: number;
  team_id: string | null;
  created_at: string;
}

export const TotalCallsView = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

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
      return data as TeamData[];
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
      return data as AgentData[];
    }
  });

  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      toast.success(`Data filtered from ${format(start, 'MMM d, yyyy')} to ${format(end, 'MMM d, yyyy')}`);
    }
  };

  if (isTeamLoading || isAgentLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <AHTDateRangeSelector onDateRangeChange={handleDateRangeChange} />
      </div>

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