import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { UserRole } from '@/lib/supabase';

export const useAuthActions = () => {
  const { toast } = useToast();

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error.message === "Invalid login credentials" 
            ? "Invalid email or password. Please check your credentials and try again."
            : "An error occurred during login. Please try again.",
        });
        return;
      }

      if (data?.user) {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      }
    } catch (error: any) {
      console.error("Unexpected error during sign in:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const register = async (email: string, password: string, role: UserRole = 'operations') => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error("User creation failed");
      }

      const { error: userError } = await supabase.rpc('create_new_user', {
        user_id: authData.user.id,
        user_email: email,
        user_role: role
      });

      if (userError) {
        console.error("Error inserting user data:", userError);
        throw userError;
      }

      toast({
        title: "Success",
        description: "Registration successful. Please check your email for verification.",
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Success",
        description: "Successfully signed out",
      });
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      throw error;
    }
  };

  return {
    signIn,
    signOut,
    register,
  };
};