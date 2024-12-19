import { Button } from "@/components/ui/button";
import { AlertCircle, LogOut, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ErrorDisplayProps {
  message: string;
  onSignOut: () => Promise<void>;
}

export const ErrorDisplay = ({ message, onSignOut }: ErrorDisplayProps) => {
  const handleRefresh = () => {
    toast.info("Refreshing page...");
    window.location.reload();
  };

  const handleSignOut = async () => {
    toast.info("Signing out...");
    await onSignOut();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="max-w-md w-full mx-auto p-6 space-y-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <p className="text-destructive font-medium">{message}</p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={handleRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Page
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};