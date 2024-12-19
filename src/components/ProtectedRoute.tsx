import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AuthForms } from "@/components/AuthForms";
import { toast } from "sonner";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, userData } = useAuth();
  const [timeoutError, setTimeoutError] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (loading) {
      timer = setTimeout(() => {
        setTimeoutError(true);
        toast.error("Loading is taking longer than expected. Please refresh the page.");
      }, 2000); // Reduced to 2 seconds for faster feedback
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading]);

  // Reset timeout error when loading changes
  useEffect(() => {
    if (!loading) {
      setTimeoutError(false);
    }
  }, [loading]);

  if (loading && !timeoutError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (timeoutError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <p className="text-destructive">Loading timed out. Please try again.</p>
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  // If there's no user, show auth forms
  if (!user) {
    return <AuthForms />;
  }

  // If there's no user data but we have a user, something went wrong with the database
  if (!userData) {
    toast.error("Unable to load user data. Please sign out and try again.");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <p className="text-destructive">Error loading user data</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};