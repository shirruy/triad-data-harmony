import { Button } from "@/components/ui/button";
import { LogOut, RefreshCw, BarChart2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

interface DashboardHeaderProps {
  onRefresh?: () => void;
  canEdit: boolean;
}

export const DashboardHeader = ({ onRefresh, canEdit }: DashboardHeaderProps) => {
  const { userData, signOut } = useAuth();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
            <motion.p 
              className="text-sm text-slate-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {userData?.role.charAt(0).toUpperCase() + userData?.role.slice(1)} Dashboard
            </motion.p>
          </div>
        </div>
        <motion.div 
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {canEdit && onRefresh && (
            <Button onClick={onRefresh} variant="outline" className="flex items-center gap-2 hover:bg-slate-50">
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={signOut} 
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
};