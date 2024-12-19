import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AuthForms } from "@/components/AuthForms";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, userData, signOut } = useAuth();
  const [timeoutError, setTimeoutError] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (loading) {
      timer = setTimeout(() => {
        setTimeoutError(true);
        toast.error("Loading is taking longer than expected. Please try signing out and back in.");
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      setTimeoutError(false);
    }
  }, [loading]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Error signing out. Please try again.");
    }
  };

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
          <p className="text-destructive">Loading timed out. Please try signing out and back in.</p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => window.location.reload()}>
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
  }

  if (!user) {
    return <AuthForms />;
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <p className="text-destructive">Error loading user data</p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => window.location.reload()}>
              Try Again
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
  }

  return <>{children}</>;
};