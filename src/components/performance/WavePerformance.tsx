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
import { Clock } from "lucide-react";

interface WaveData {
  wave: string;
  value: number;
}

export const WavePerformance = () => {
  const { data: waveData, isLoading } = useQuery({
    queryKey: ['wave-abandoned-calls'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('aht_wave_data')
        .select('*')
        .order('value', { ascending: false });
      
      if (error) throw error;
      return data as WaveData[];
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
            <Clock className="h-5 w-5 text-primary" />
            Abandoned Calls by Wave
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Wave</TableHead>
                  <TableHead>Abandoned Calls</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {waveData?.map((wave) => (
                  <TableRow key={wave.wave}>
                    <TableCell>{wave.wave}</TableCell>
                    <TableCell>{wave.value.toLocaleString()}</TableCell>
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