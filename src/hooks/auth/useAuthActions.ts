import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { UserRole } from '@/lib/auth/types';

export const useAuthActions = () => {
  const signIn = async (email: string, password: string) => {
    try {
      const { data: userExists, error: userCheckError } = await supabase
        .from('users')
        .select('email, role')
        .eq('email', email)
        .maybeSingle();

      if (userCheckError) {
        console.error("Error checking user:", userCheckError);
        toast.error("An error occurred while checking user credentials");
        return;
      }

      if (!userExists) {
        toast.error("No account found with this email. Please register first.");
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        handleAuthError(error);
        return;
      }

      if (data?.user) {
        toast.success("Welcome back!");
      }
    } catch (error: any) {
      console.error("Unexpected error during sign in:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  const register = async (email: string, password: string, role: UserRole = 'operations') => {
    try {
      const { data: existingUser } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (existingUser) {
        toast.error("An account with this email already exists. Please sign in instead.");
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role }
        }
      });

      if (signUpError) {
        handleAuthError(signUpError);
        return;
      }

      if (!data.user) {
        throw new Error("User creation failed - no user data returned");
      }

      const { error: profileError } = await supabase.rpc('create_new_user', {
        user_id: data.user.id,
        user_email: email,
        user_role: role
      });

      if (profileError) {
        console.error("Error creating user profile:", profileError);
        toast.error("Account created but profile setup failed. Please contact support.");
        return;
      }

      toast.success("Registration successful! Please check your email for confirmation.");
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
      toast.error("Error signing out. Please try again.");
      throw error;
    }
  };

  return {
    signIn,
    signOut,
    register,
  };
};

const handleAuthError = (error: any) => {
  if (error.message.includes("Invalid login credentials")) {
    toast.error("Incorrect password. Please try again.");
  } else if (error.message.includes("Email not confirmed")) {
    toast.error("Please confirm your email address before signing in.");
  } else if (error.message.includes("weak_password")) {
    toast.error("Password is too weak. Please use at least 6 characters.");
  } else {
    toast.error(error.message || "An error occurred during authentication.");
  }
};