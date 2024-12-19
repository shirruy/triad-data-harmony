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
        duration: 0.5
      }
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 flex w-full">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <motion.div 
            className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Breadcrumbs />
            
            <motion.div variants={itemVariants}>
              <DashboardHeader canEdit={canUploadData} />
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-md space-y-3"
            >
              <h2 className="text-xl font-semibold">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {canUploadData && (
                  <motion.div variants={itemVariants}>
                    <AHTDataUploadButton />
                  </motion.div>
                )}
                <button 
                  className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-lg text-left"
                  onClick={() => toast({
                    title: "Coming Soon",
                    description: "This feature will be available soon!"
                  })}
                >
                  <p className="font-medium">Generate Report</p>
                  <p className="text-sm text-white/70">Create custom reports</p>
                </button>
                <button 
                  className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-lg text-left"
                  onClick={() => toast({
                    title: "Coming Soon",
                    description: "This feature will be available soon!"
                  })}
                >
                  <p className="font-medium">Team Overview</p>
                  <p className="text-sm text-white/70">View team performance</p>
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
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