import { useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AuthForms } from "@/components/AuthForms";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { useLoadingTimeout } from "@/hooks/useLoadingTimeout";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, userData, signOut } = useAuth();
  const timeoutError = useLoadingTimeout(loading, 5000); // Increased timeout to 5 seconds

  useEffect(() => {
    if (!loading && !user) {
      console.log("User not authenticated");
    }
  }, [loading, user]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (loading && !timeoutError) {
    return <LoadingSpinner />;
  }

  if (timeoutError) {
    return (
      <ErrorDisplay 
        message="Loading timed out. Please try signing out and back in."
        onSignOut={handleSignOut}
      />
    );
  }

  if (!user) {
    return <AuthForms />;
  }

  if (!userData) {
    return (
      <ErrorDisplay 
        message="Error loading user data. Please try signing out and back in."
        onSignOut={handleSignOut}
      />
    );
  }

  return <>{children}</>;
};