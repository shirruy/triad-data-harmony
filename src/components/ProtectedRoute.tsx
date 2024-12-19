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
    const timer = setTimeout(() => {
      if (loading) {
        setTimeoutError(true);
        toast.error("Loading is taking longer than expected. Please refresh the page.");
      }
    }, 3000); // Reduced timeout to 3 seconds

    return () => clearTimeout(timer);
  }, [loading]);

  // Reset timeout error when loading changes
  useEffect(() => {
    if (!loading) {
      setTimeoutError(false);
    }
  }, [loading]);

  if (loading && !timeoutError) {
    return <LoadingSpinner />;
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

  if (!user) {
    return <AuthForms />;
  }

  if (!userData) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};