import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { UserRole } from '@/lib/auth/types';
import { AUTH_ERRORS } from '@/lib/auth/constants';
import { validateRegistrationKey } from '@/lib/auth/validators';

export const useAuthActions = () => {
  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting sign in with email:", email);
      
      const { data: userExists, error: userCheckError } = await supabase
        .from('users')
        .select('email, role')
        .eq('email', email)
        .single();

      if (userCheckError || !userExists) {
        console.log("User not found:", email);
        toast.error(AUTH_ERRORS.USER_NOT_FOUND);
        return;
      }

      console.log("User found, attempting login...");

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        
        if (error.message.includes(AUTH_ERRORS.INVALID_CREDENTIALS)) {
          toast.error("Incorrect password. Please try again.");
        } else if (error.message.includes(AUTH_ERRORS.EMAIL_NOT_CONFIRMED)) {
          toast.error("Please confirm your email address before signing in.");
        } else {
          toast.error(AUTH_ERRORS.GENERIC_ERROR);
        }
        return;
      }

      if (data?.user) {
        console.log("Sign in successful for user:", data.user.email);
        toast.success("Welcome back!");
      }
    } catch (error: any) {
      console.error("Unexpected error during sign in:", error);
      toast.error(AUTH_ERRORS.GENERIC_ERROR);
    }
  };

  const register = async (email: string, password: string, role: UserRole = 'operations') => {
    try {
      console.log("Starting registration process for email:", email);
      
      const { data: existingUser } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single();

      if (existingUser) {
        toast.error("An account with this email already exists. Please sign in instead.");
        return;
      }

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