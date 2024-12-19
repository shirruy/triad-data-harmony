import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { motion } from "framer-motion";

interface AgentData {
  agent_name: string;
  value: number;
  team_id: string | null;
}

interface AgentPerformanceTableProps {
  agentData: AgentData[];
}

export const AgentPerformanceTable = ({ agentData }: AgentPerformanceTableProps) => {
  return (
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
  );
};