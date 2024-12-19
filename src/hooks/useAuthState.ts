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
  const authStateChangeHandled = useRef(false);

  const fetchUserData = async (userId: string) => {
    if (!mountedRef.current) return;
    
    try {
      console.log('Fetching user data for ID:', userId);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (!mountedRef.current) return;

      if (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error loading user data');
        setLoading(false);
        return;
      }

      if (!data) {
        console.error('No user data found for ID:', userId);
        toast.error('User data not found');
        setLoading(false);
        return;
      }

      console.log('User data fetched successfully:', data);
      setUserData(data);
      setLoading(false);
    } catch (error) {
      if (mountedRef.current) {
        console.error('Unexpected error fetching user data:', error);
        toast.error('Unexpected error loading user data');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      if (initializationAttempted.current) return;
      initializationAttempted.current = true;

      try {
        console.log('Starting auth initialization...');
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (!mountedRef.current) return;

        if (initialSession?.user) {
          setSession(initialSession);
          setUser(initialSession.user);
          await fetchUserData(initialSession.user.id);
        } else {
          setSession(null);
          setUser(null);
          setUserData(null);
          setLoading(false);
        }
      } catch (error) {
        if (mountedRef.current) {
          console.error('Auth initialization error:', error);
          toast.error('Error initializing authentication');
          setLoading(false);
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!mountedRef.current || authStateChangeHandled.current) return;
      authStateChangeHandled.current = true;

      console.log('Auth state changed:', event);
      
      try {
        if (newSession?.user) {
          setSession(newSession);
          setUser(newSession.user);
          await fetchUserData(newSession.user.id);
        } else {
          setSession(null);
          setUser(null);
          setUserData(null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error handling auth state change:', error);
        setLoading(false);
      } finally {
        authStateChangeHandled.current = false;
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