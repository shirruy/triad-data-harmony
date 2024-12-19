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

interface TeamPerformanceData {
  name: string;
  value: number;
  trend: number;
}

export const TeamPerformance = () => {
  const { data: teamData, isLoading } = useQuery({
    queryKey: ['team-performance'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('aht_team_data')
        .select('*')
        .order('value', { ascending: true });

      if (error) throw error;
      
      // Calculate mock trend data (in a real app, this would come from the database)
      return data.map(item => ({
        ...item,
        trend: Math.random() * 10 - 5 // Random trend between -5 and 5
      }));
    }
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Team Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead>AHT Score</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamData?.map((team, index) => (
                <motion.tr
                  key={team.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.value.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={team.trend > 0 ? "text-green-500" : "text-red-500"}>
                      {team.trend > 0 ? "↑" : "↓"} {Math.abs(team.trend).toFixed(1)}%
                    </span>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};