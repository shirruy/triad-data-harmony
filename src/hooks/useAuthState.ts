import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserData } from '@/lib/supabase';
import { toast } from 'sonner';

export const useAuthState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const fetchUserData = async (userId: string) => {
      try {
        console.log('Starting user data fetch for ID:', userId);
        const startTime = performance.now();
        
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        const endTime = performance.now();
        console.log(`User data fetch took ${endTime - startTime}ms`);

        if (!mounted) {
          console.log('Component unmounted during fetch, aborting state updates');
          return;
        }

        if (error) {
          console.error('Error fetching user data:', error);
          console.log('Full error details:', {
            message: error.message,
            details: error.details,
            hint: error.hint
          });
          if (mounted) {
            toast.error('Error loading user data');
            setLoading(false);
          }
          return;
        }

        if (!data) {
          console.log('No user data found in database for ID:', userId);
          console.log('Database response:', data);
          if (mounted) {
            toast.error('User data not found');
            setLoading(false);
          }
          return;
        }

        console.log('User data fetched successfully:', data);
        if (mounted) {
          setUserData(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Unexpected error fetching user data:', error);
        if (mounted) {
          console.log('Full error details:', error);
          setLoading(false);
          toast.error('Unexpected error loading user data');
        }
      }
    };

    const initializeAuth = async () => {
      try {
        console.log('Starting auth initialization...');
        const startTime = performance.now();
        
        const { data: { session } } = await supabase.auth.getSession();
        
        const endTime = performance.now();
        console.log(`Auth initialization took ${endTime - startTime}ms`);
        
        if (!mounted) {
          console.log('Component unmounted during initialization');
          return;
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserData(session.user.id);
        } else {
          console.log('No active session found during initialization');
          if (mounted) {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          console.log('Full initialization error details:', error);
          setLoading(false);
          toast.error('Error initializing authentication');
        }
      }
    };

    initializeAuth();

    // Set up auth state change subscription
    const setupAuthSubscription = async () => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("Auth state changed:", event);
        console.log("Session details:", session?.user?.id);
        
        if (!mounted) {
          console.log('Component unmounted during auth state change');
          return;
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserData(session.user.id);
        } else {
          if (mounted) {
            setUserData(null);
            setLoading(false);
          }
        }
      });
      
      authSubscription = subscription;
    };

    setupAuthSubscription();

    // Cleanup function
    return () => {
      mounted = false;
      if (authSubscription) {
        console.log('Cleaning up auth subscription');
        authSubscription.unsubscribe();
      }
    };
  }, []);

  return {
    session,
    user,
    userData,
    loading,
    setUserData,
  };
};