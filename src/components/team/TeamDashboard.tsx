import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TeamMemberCard } from "./TeamMemberCard";
import { PerformanceAlert } from "../alerts/PerformanceAlert";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface TeamDashboardProps {
  startDate?: Date;
  endDate?: Date;
}

export const TeamDashboard = ({ startDate, endDate }: TeamDashboardProps) => {
  const { data: teamMembers } = useQuery({
    queryKey: ['team-members', startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('team_members')
        .select('*')
        .order('performance_score', { ascending: false });

      if (startDate && endDate) {
        query = query
          .gte('created_at', format(startDate, 'yyyy-MM-dd'))
          .lte('created_at', format(endDate, 'yyyy-MM-dd'));
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const { data: alerts } = useQuery({
    queryKey: ['performance-alerts', startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from('performance_alerts')
        .select('*')
        .eq('is_active', true);

      if (startDate && endDate) {
        query = query
          .gte('created_at', format(startDate, 'yyyy-MM-dd'))
          .lte('created_at', format(endDate, 'yyyy-MM-dd'));
      }
      
      const { data, error } = await query;
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