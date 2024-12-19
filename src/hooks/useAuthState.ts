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
  const initializationAttempted = useRef(false);

  useEffect(() => {
    const fetchUserData = async (userId: string) => {
      if (!mountedRef.current) return;
      
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        if (!mountedRef.current) return;

        if (error) {
          console.error('Error fetching user data:', error);
          toast.error('Error loading user data');
          return;
        }

        if (!data) {
          console.error('No user data found for ID:', userId);
          toast.error('User data not found');
          return;
        }

        setUserData(data);
      } catch (error) {
        if (mountedRef.current) {
          console.error('Unexpected error fetching user data:', error);
          toast.error('Unexpected error loading user data');
        }
      }
    };

    const initializeAuth = async () => {
      if (initializationAttempted.current) return;
      initializationAttempted.current = true;

      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (!mountedRef.current) return;

        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        if (initialSession?.user) {
          await fetchUserData(initialSession.user.id);
        }
      } catch (error) {
        if (mountedRef.current) {
          console.error('Auth initialization error:', error);
          toast.error('Error initializing authentication');
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!mountedRef.current) return;

      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        await fetchUserData(newSession.user.id);
      } else {
        setUserData(null);
      }
    });

    initializeAuth();

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    user,
    userData,
    loading,
  };
};