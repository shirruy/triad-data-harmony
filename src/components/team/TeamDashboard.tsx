import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TeamMemberCard } from "./TeamMemberCard";
import { PerformanceAlert } from "../alerts/PerformanceAlert";
import { motion } from "framer-motion";

export const TeamDashboard = () => {
  const { data: teamMembers } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('performance_score', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: alerts } = useQuery({
    queryKey: ['performance-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performance_alerts')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="space-y-10">
      {alerts && alerts.length > 0 && (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Active Alerts
          </h2>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <PerformanceAlert
                key={alert.id}
                type={alert.alert_type}
                message={alert.message}
                threshold={alert.threshold}
              />
            ))}
          </div>
        </motion.div>
      )}

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Team Members
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers?.map((member) => (
            <TeamMemberCard
              key={member.id}
              name={member.name}
              role={member.role}
              performanceScore={member.performance_score}
              avatarUrl={member.avatar_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};