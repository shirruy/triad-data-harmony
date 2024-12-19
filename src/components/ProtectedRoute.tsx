import { useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AuthForms } from "@/components/AuthForms";
import { toast } from "sonner";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { useLoadingTimeout } from "@/hooks/useLoadingTimeout";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, userData, signOut } = useAuth();
  const timeoutError = useLoadingTimeout(loading);

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload();
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Error signing out. Please try again.");
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
        message="Error loading user data"
        onSignOut={handleSignOut}
      />
    );
  }

  return <>{children}</>;
};