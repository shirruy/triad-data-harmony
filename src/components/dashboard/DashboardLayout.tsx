import { motion } from "framer-motion";
import { DashboardHeader } from "./DashboardHeader";
import { AHTInsight } from "../aht/AHTInsight";
import { AHTMetrics } from "../aht/AHTMetrics";
import { AHTCharts } from "../aht/AHTCharts";
import { AHTDataUploadButton } from "../aht/AHTDataUploadButton";
import { useAuth } from "@/contexts/AuthContext";

export const DashboardLayout = () => {
  const { userData } = useAuth();
  const canUploadData = userData?.role === 'administrator' || userData?.role === 'analyst';

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
    <div className="min-h-screen bg-slate-50">
      <motion.div 
        className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <DashboardHeader canEdit={canUploadData} />
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-lg shadow-md"
        >
          <p className="text-sm font-medium flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Last data update: 4 hours ago
          </p>
        </motion.div>

        {canUploadData && (
          <motion.div variants={itemVariants}>
            <AHTDataUploadButton />
          </motion.div>
        )}

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
  );
};