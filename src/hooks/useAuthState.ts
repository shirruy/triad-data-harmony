import { useState, useEffect, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserData } from '@/lib/supabase';
import { toast } from 'sonner';

export const useAuthState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);
  const authSubscriptionRef = useRef<{ unsubscribe: () => void } | null>(null);

  // Safe state updates
  const safeSetState = <T>(setter: (value: T) => void, value: T) => {
    if (mountedRef.current) {
      setter(value);
    }
  };

  const fetchUserData = async (userId: string) => {
    try {
      console.log('Starting user data fetch for ID:', userId);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (!mountedRef.current) return;

      if (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error loading user data');
        safeSetState(setLoading, false);
        return;
      }

      if (!data) {
        console.log('No user data found for ID:', userId);
        toast.error('User data not found');
        safeSetState(setLoading, false);
        return;
      }

      console.log('User data fetched successfully');
      safeSetState(setUserData, data);
      safeSetState(setLoading, false);
    } catch (error) {
      console.error('Unexpected error fetching user data:', error);
      if (mountedRef.current) {
        toast.error('Unexpected error loading user data');
        safeSetState(setLoading, false);
      }
    }
  };

  useEffect(() => {
    console.log('Auth state hook initialized');
    mountedRef.current = true;

    const initializeAuth = async () => {
      try {
        console.log('Starting auth initialization...');
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (!mountedRef.current) return;

        safeSetState(setSession, initialSession);
        safeSetState(setUser, initialSession?.user ?? null);

        if (initialSession?.user) {
          await fetchUserData(initialSession.user.id);
        } else {
          safeSetState(setLoading, false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mountedRef.current) {
          toast.error('Error initializing authentication');
          safeSetState(setLoading, false);
        }
      }
    };

    const setupAuthSubscription = () => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, newSession) => {
          console.log('Auth state changed:', event);
          
          if (!mountedRef.current) return;

          safeSetState(setSession, newSession);
          safeSetState(setUser, newSession?.user ?? null);

          if (newSession?.user) {
            await fetchUserData(newSession.user.id);
          } else {
            safeSetState(setUserData, null);
            safeSetState(setLoading, false);
          }
        }
      );

      authSubscriptionRef.current = subscription;
    };

    initializeAuth();
    setupAuthSubscription();

    return () => {
      console.log('Cleaning up auth state hook');
      mountedRef.current = false;
      if (authSubscriptionRef.current) {
        console.log('Unsubscribing from auth changes');
        authSubscriptionRef.current.unsubscribe();
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