import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Toaster } from "sonner";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Breadcrumbs } from "@/components/dashboard/Breadcrumbs";
import { QuickActions } from "./QuickActions";
import { DashboardControls } from "./DashboardControls";
import { DashboardMetrics } from "./DashboardMetrics";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
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
            <motion.div variants={containerVariants}>
              <Breadcrumbs />
            </motion.div>
            
            <motion.div variants={containerVariants}>
              <DashboardHeader canEdit={canUploadData} />
            </motion.div>

            <DashboardControls 
              canUploadData={canUploadData}
              onDateRangeChange={(startDate, endDate) => {
                if (startDate && endDate) {
                  toast({
                    title: "Date Range Selected",
                    description: "Data will be filtered accordingly.",
                  });
                }
              }}
              onSearchChange={(value) => {}}
              onFilterChange={(value) => {}}
            />
            
            <QuickActions canUploadData={canUploadData} />
            
            <DashboardMetrics />

            {children}
          </motion.div>
        </div>
        <Toaster position="top-right" />
      </div>
    </SidebarProvider>
  );
};