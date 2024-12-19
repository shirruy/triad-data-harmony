import { Button } from "@/components/ui/button";
import { RefreshCw, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardHeaderProps {
  onRefresh: () => void;
  canEdit: boolean;
}

export const DashboardHeader = ({ onRefresh, canEdit }: DashboardHeaderProps) => {
  const { userData, signOut } = useAuth();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Data Dashboard</h1>
        <p className="text-sm text-gray-500">Logged in as: {userData?.role}</p>
      </div>
      <div className="flex gap-2">
        {canEdit && (
          <Button onClick={onRefresh} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh All
          </Button>
        )}
        <Button variant="outline" onClick={signOut} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};