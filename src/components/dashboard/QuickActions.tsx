import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { BarChart2, Download, Users, Bell, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickActionsProps {
  canUploadData: boolean;
}

export const QuickActions = ({ canUploadData }: QuickActionsProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'report':
        toast({
          title: "Generating Report",
          description: "Your report will be ready shortly."
        });
        break;
      case 'team':
        toast({
          title: "Team Overview",
          description: "Loading team performance data."
        });
        break;
      case 'alerts':
        toast({
          title: "Performance Alerts",
          description: "Checking for active alerts."
        });
        break;
      case 'schedule':
        toast({
          title: "Schedule Analysis",
          description: "Loading schedule data."
        });
        break;
      default:
        break;
    }
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="gradient-border animate-glow"
    >
      <div className="bg-card p-6 rounded-lg space-y-3">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.button 
            className="bg-secondary/50 hover:bg-secondary/70 transition-colors p-4 rounded-lg text-left backdrop-blur-sm flex flex-col gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAction('report')}
          >
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              <p className="font-medium text-primary">Generate Report</p>
            </div>
            <p className="text-sm text-muted-foreground">Create custom reports</p>
          </motion.button>

          <motion.button 
            className="bg-secondary/50 hover:bg-secondary/70 transition-colors p-4 rounded-lg text-left backdrop-blur-sm flex flex-col gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAction('team')}
          >
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <p className="font-medium text-primary">Team Overview</p>
            </div>
            <p className="text-sm text-muted-foreground">View team performance</p>
          </motion.button>

          <motion.button 
            className="bg-secondary/50 hover:bg-secondary/70 transition-colors p-4 rounded-lg text-left backdrop-blur-sm flex flex-col gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAction('alerts')}
          >
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <p className="font-medium text-primary">Performance Alerts</p>
            </div>
            <p className="text-sm text-muted-foreground">Check active alerts</p>
          </motion.button>

          <motion.button 
            className="bg-secondary/50 hover:bg-secondary/70 transition-colors p-4 rounded-lg text-left backdrop-blur-sm flex flex-col gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAction('schedule')}
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <p className="font-medium text-primary">Schedule Analysis</p>
            </div>
            <p className="text-sm text-muted-foreground">View scheduling data</p>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};