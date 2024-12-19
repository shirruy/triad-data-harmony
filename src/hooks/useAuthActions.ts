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
      // First, attempt to sign up the user
      const signUpResponse = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role // Store role in auth metadata
          }
        }
      });

      if (signUpResponse.error) {
        throw signUpResponse.error;
      }

      const user = signUpResponse.data.user;
      if (!user) {
        throw new Error("User creation failed");
      }

      // Then create the user profile
      const { error: profileError } = await supabase.rpc('create_new_user', {
        user_id: user.id,
        user_email: email,
        user_role: role
      });

      if (profileError) {
        console.error("Error creating user profile:", profileError);
        // Even if profile creation fails, the user was created
        toast.error("Account created but profile setup failed. Please contact support.");
        return;
      }

      toast.success("Registration successful! Please check your email.");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed");
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