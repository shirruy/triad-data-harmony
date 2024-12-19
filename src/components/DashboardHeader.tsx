import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { DashboardTitle } from "./dashboard/DashboardTitle";
import { DashboardActions } from "./dashboard/DashboardActions";

interface DashboardHeaderProps {
  onRefresh?: () => void;
  canEdit: boolean;
}

export const DashboardHeader = ({ onRefresh, canEdit }: DashboardHeaderProps) => {
  const { userData } = useAuth();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <DashboardTitle role={userData?.role || 'user'} />
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <DashboardActions onRefresh={onRefresh} canEdit={canEdit} />
        </motion.div>
      </div>
    </div>
  );
};