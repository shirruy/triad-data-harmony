import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { motion } from "framer-motion";

interface TeamData {
  name: string;
  value: number;
}

interface TeamPerformanceTableProps {
  teamData: TeamData[];
}

export const TeamPerformanceTable = ({ teamData }: TeamPerformanceTableProps) => {
  return (
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
  );
};