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

  const fetchUserData = async (userId: string) => {
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
        return;
      }

      if (!data) {
        console.error('No user data found for ID:', userId);
        toast.error('User data not found');
        return;
      }

      console.log('User data fetched successfully:', data);
      if (mountedRef.current) {
        setUserData(data);
      }
    } catch (error) {
      console.error('Unexpected error fetching user data:', error);
      if (mountedRef.current) {
        toast.error('Unexpected error loading user data');
      }
    }
  };

  useEffect(() => {
    let authListener: any;

    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (mountedRef.current) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          
          if (initialSession?.user) {
            await fetchUserData(initialSession.user.id);
          } else {
            setUserData(null);
          }
        }

        authListener = supabase.auth.onAuthStateChange(async (event, newSession) => {
          console.log('Auth state changed:', event, newSession?.user?.id);
          
          if (mountedRef.current) {
            setSession(newSession);
            setUser(newSession?.user ?? null);
            
            if (newSession?.user) {
              await fetchUserData(newSession.user.id);
            } else {
              setUserData(null);
            }
          }
        });
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mountedRef.current) {
          toast.error('Error initializing authentication');
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mountedRef.current = false;
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  return {
    session,
    user,
    userData,
    loading,
  };
};