import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

interface ErrorDisplayProps {
  message: string;
  onSignOut: () => Promise<void>;
}

export const ErrorDisplay = ({ message, onSignOut }: ErrorDisplayProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <p className="text-destructive">{message}</p>
        <div className="flex gap-2 justify-center">
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
          <Button 
            variant="outline" 
            onClick={onSignOut}
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