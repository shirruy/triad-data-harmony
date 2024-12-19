import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/DashboardHeader";
import { AHTInsight } from "@/components/AHTInsight";
import { AHTMetrics } from "@/components/aht/AHTMetrics";
import { AHTCharts } from "@/components/AHTCharts";
import { AHTDataUploadButton } from "@/components/aht/AHTDataUploadButton";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Toaster } from "sonner";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Breadcrumbs } from "@/components/dashboard/Breadcrumbs";

export const DashboardLayout = () => {
  const { userData } = useAuth();
  const { toast } = useToast();
  const canUploadData = userData?.role === 'administrator' || userData?.role === 'analyst';

  useEffect(() => {
    toast({
      title: `Welcome back, ${userData?.role}!`,
      description: "Your dashboard is up to date.",
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <motion.div 
            className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Breadcrumbs />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <DashboardHeader canEdit={canUploadData} />
            </motion.div>
            
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
                      <AHTDataUploadButton />
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

            <motion.div 
              variants={itemVariants}
              className="animate-float"
            >
              <AHTInsight />
            </motion.div>

            <motion.div variants={itemVariants}>
              <AHTMetrics />
            </motion.div>

            <motion.div variants={itemVariants}>
              <AHTCharts />
            </motion.div>
          </motion.div>
        </div>
        <Toaster position="top-right" />
      </div>
    </SidebarProvider>
  );
};