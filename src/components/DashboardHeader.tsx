import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { DashboardTitle } from "./dashboard/DashboardTitle";
import { DashboardActions } from "./dashboard/DashboardActions";
import { toast } from "sonner";

interface DashboardHeaderProps {
  onRefresh?: () => void;
  canEdit: boolean;
}

export const DashboardHeader = ({ onRefresh, canEdit }: DashboardHeaderProps) => {
  const { userData, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Error signing out. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <DashboardTitle role={userData?.role || 'user'} />
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <DashboardActions onRefresh={onRefresh} canEdit={canEdit} onSignOut={handleSignOut} />
        </motion.div>
      </div>
    </div>
  );
};