import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { UserRole } from '@/lib/auth/types';

export const useAuthActions = () => {
  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting sign in with email:", email);
      
      // First, check if the user exists in auth system
      const { data: userExists, error: userCheckError } = await supabase
        .from('users')
        .select('email, role')
        .eq('email', email)
        .maybeSingle(); // Changed from .single() to .maybeSingle()

      if (userCheckError) {
        console.error("Error checking user:", userCheckError);
        toast.error("An error occurred while checking user credentials");
        return;
      }

      if (!userExists) {
        console.log("User not found:", email);
        toast.error("No account found with this email. Please register first.");
        return;
      }

      console.log("User found, attempting login...");

      // Attempt to sign in with credentials
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        
        // Handle specific error cases
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Incorrect password. Please try again.");
        } else if (error.message.includes("Email not confirmed")) {
          toast.error("Please confirm your email address before signing in.");
        } else {
          toast.error("An error occurred during login. Please try again.");
        }
        return;
      }

      if (data?.user) {
        console.log("Sign in successful for user:", data.user.email);
        toast.success("Welcome back!");
      }
    } catch (error: any) {
      console.error("Unexpected error during sign in:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  const register = async (email: string, password: string, role: UserRole = 'operations') => {
    try {
      console.log("Starting registration process for email:", email);
      
      // Check if user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .maybeSingle(); // Changed from .single() to .maybeSingle()

      if (checkError) {
        console.error("Error checking existing user:", checkError);
        toast.error("An error occurred while checking user existence");
        return;
      }

      if (existingUser) {
        toast.error("An account with this email already exists. Please sign in instead.");
        return;
      }

      // Attempt to sign up the user
      const signUpResponse = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role
          }
        }
      });

      if (signUpResponse.error) {
        console.error("Registration error:", signUpResponse.error);
        throw signUpResponse.error;
      }

      const user = signUpResponse.data.user;
      if (!user) {
        console.error("User creation failed - no user data returned");
        throw new Error("User creation failed");
      }

      console.log("User created successfully, creating profile...");

      // Create the user profile
      const { error: profileError } = await supabase.rpc('create_new_user', {
        user_id: user.id,
        user_email: email,
        user_role: role
      });

      if (profileError) {
        console.error("Error creating user profile:", profileError);
        toast.error("Account created but profile setup failed. Please contact support.");
        return;
      }

      console.log("Registration completed successfully");
      toast.success("Registration successful! Please check your email for confirmation.");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("Attempting sign out");
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log("Sign out successful");
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