import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { UserRole } from '@/lib/supabase';

export const useAuthActions = () => {
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        toast.error(error.message === "Invalid login credentials" 
          ? "Invalid email or password"
          : "An error occurred during login");
        return;
      }

      if (data?.user) {
        toast.success("Welcome back!");
      }
    } catch (error) {
      console.error("Unexpected error during sign in:", error);
      toast.error("An unexpected error occurred");
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

      toast.success("Registration successful! Please check your email.");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Successfully signed out");
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast.error(error.message);
      throw error;
    }
  };

  return {
    signIn,
    signOut,
    register,
  };
};