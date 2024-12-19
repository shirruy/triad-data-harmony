import { Button } from "@/components/ui/button";
import { LogOut, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardActionsProps {
  onRefresh?: () => void;
  canEdit: boolean;
}

export const DashboardActions = ({ onRefresh, canEdit }: DashboardActionsProps) => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Error signing out. Please try again.");
    }
  };

  return (
    <div className="flex gap-2">
      {canEdit && onRefresh && (
        <Button onClick={onRefresh} variant="outline" className="flex items-center gap-2 hover:bg-slate-50">
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      )}
      <Button 
        variant="outline" 
        onClick={handleSignOut} 
        className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
};