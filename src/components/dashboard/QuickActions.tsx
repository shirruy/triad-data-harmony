import { motion } from "framer-motion";
import { AHTDataUpload } from "@/components/AHTDataUpload";
import { useToast } from "@/hooks/use-toast";

interface QuickActionsProps {
  canUploadData: boolean;
}

export const QuickActions = ({ canUploadData }: QuickActionsProps) => {
  const { toast } = useToast();

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

  return (
    <motion.div 
      variants={itemVariants}
      className="gradient-border animate-glow"
    >
      <div className="bg-card p-6 rounded-lg space-y-3">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {canUploadData && (
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AHTDataUpload />
            </motion.div>
          )}
          <motion.button 
            className="bg-secondary/50 hover:bg-secondary/70 transition-colors p-4 rounded-lg text-left backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toast({
              title: "Coming Soon",
              description: "This feature will be available soon!"
            })}
          >
            <p className="font-medium text-primary">Generate Report</p>
            <p className="text-sm text-muted-foreground">Create custom reports</p>
          </motion.button>
          <motion.button 
            className="bg-secondary/50 hover:bg-secondary/70 transition-colors p-4 rounded-lg text-left backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toast({
              title: "Coming Soon",
              description: "This feature will be available soon!"
            })}
          >
            <p className="font-medium text-primary">Team Overview</p>
            <p className="text-sm text-muted-foreground">View team performance</p>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};