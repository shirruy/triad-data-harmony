import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export const TaskManager = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { userData } = useAuth();
  const queryClient = useQueryClient();

  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          assignee:users!tasks_assignee_id_fkey(email),
          assigner:users!tasks_assigner_id_fkey(email)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const createTask = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('tasks')
        .insert([
          {
            title,
            description,
            assigner_id: userData?.id,
            assignee_id: userData?.id // For now, self-assign tasks
          }
        ]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setTitle("");
      setDescription("");
    }
  });

  const completeTask = useMutation({
    mutationFn: async (taskId: string) => {
      const { error } = await supabase
        .from('tasks')
        .update({ status: 'completed' })
        .eq('id', taskId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
          />
          <Button 
            onClick={() => createTask.mutate()}
            disabled={!title.trim()}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        <div className="space-y-4 mt-6">
          {tasks?.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  <div className="text-xs text-muted-foreground mt-2">
                    <p>Assigned by: {task.assigner.email}</p>
                    <p>Assigned to: {task.assignee.email}</p>
                  </div>
                </div>
                {task.status !== 'completed' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => completeTask.mutate(task.id)}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};