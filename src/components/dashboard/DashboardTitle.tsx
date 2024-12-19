import { BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { RoleBadge } from "./RoleBadge";

interface DashboardTitleProps {
  role: string;
}

export const DashboardTitle = ({ role }: DashboardTitleProps) => {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="p-3 bg-blue-600 rounded-lg">
          <BarChart2 className="w-6 h-6 text-white" />
        </div>
      </motion.div>
      <div>
        <motion.h1 
          className="text-2xl font-bold text-slate-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Workforce Analytics
        </motion.h1>
        <div className="flex items-center gap-2">
          <motion.p 
            className="text-sm text-slate-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <RoleBadge role={role} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};