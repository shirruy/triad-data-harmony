import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";

export const TeamAvailability = () => {
  const { userData } = useAuth();
  const queryClient = useQueryClient();

  const { data: availability } = useQuery({
    queryKey: ['team-availability'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_availability')
        .select(`
          *,
          team_member:team_members(name)
        `)
        .order('start_time', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <Card className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h3 className="font-medium">Team Schedule</h3>
          <Calendar
            mode="single"
            selected={new Date()}
            className="rounded-md border"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h3 className="font-medium">Today's Availability</h3>
          <div className="space-y-2">
            {availability?.map((slot) => (
              <div
                key={slot.id}
                className="flex justify-between items-center p-2 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{slot.team_member.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(slot.start_time).toLocaleTimeString()} - 
                    {new Date(slot.end_time).toLocaleTimeString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  slot.status === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {slot.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Card>
  );
};