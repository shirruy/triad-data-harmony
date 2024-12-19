import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import { Plus, Target } from "lucide-react";
import { motion } from "framer-motion";

export const PerformanceGoals = () => {
  const [metricName, setMetricName] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const { userData } = useAuth();
  const queryClient = useQueryClient();

  const { data: goals } = useQuery({
    queryKey: ['performance-goals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performance_goals')
        .select(`
          *,
          team_member:team_members(name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const createGoal = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('performance_goals')
        .insert([
          {
            metric_name: metricName,
            target_value: Number(targetValue),
            team_member_id: userData?.id,
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
          }
        ]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['performance-goals'] });
      setMetricName("");
      setTargetValue("");
    }
  });

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            value={metricName}
            onChange={(e) => setMetricName(e.target.value)}
            placeholder="Metric name"
          />
          <Input
            type="number"
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
            placeholder="Target value"
          />
          <Button 
            onClick={() => createGoal.mutate()}
            disabled={!metricName.trim() || !targetValue}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>

        <div className="space-y-4 mt-6">
          {goals?.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    {goal.metric_name}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {goal.team_member.name}
                  </span>
                </div>
                <Progress value={(goal.current_value / goal.target_value) * 100} />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Current: {goal.current_value}</span>
                  <span>Target: {goal.target_value}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};