import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { User } from "lucide-react";

interface AgentData {
  agent_name: string;
  value: number;
  team_id: string | null;
}

export const AHTAgentView = () => {
  const { data: agentData, isLoading } = useQuery({
    queryKey: ['aht-agent-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('aht_agent_data')
        .select('*')
        .order('value', { ascending: true });
      
      if (error) throw error;
      return data as AgentData[];
    }
  });

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <User className="h-5 w-5 text-primary" />
            AHT per Agent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center text-foreground">
            Loading...
          </div>
        </CardContent>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover p-3 rounded-lg border border-border shadow-lg">
          <p className="text-foreground font-medium">{label}</p>
          <p className="text-primary">AHT: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <User className="h-5 w-5 text-primary" />
            AHT per Agent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis 
                  type="number" 
                  tick={{ fill: 'hsl(var(--foreground))' }}
                  stroke="hsl(var(--foreground))"
                />
                <YAxis 
                  dataKey="agent_name" 
                  type="category" 
                  width={120}
                  tick={{ fill: 'hsl(var(--foreground))' }}
                  stroke="hsl(var(--foreground))"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};