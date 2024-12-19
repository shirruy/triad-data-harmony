import { useState, useEffect, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserData } from '@/lib/auth/types';
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
        .maybeSingle();

      if (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error loading user data');
        return;
      }

      if (!data && mountedRef.current) {
        console.warn('No user data found for ID:', userId);
        const { error: insertError } = await supabase
          .rpc('create_new_user', {
            user_id: userId,
            user_email: user?.email || '',
            user_role: 'operations'
          });

        if (insertError) {
          console.error('Error creating user data:', insertError);
          toast.error('Error creating user profile');
          return;
        }

        const { data: newData, error: refetchError } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        if (refetchError || !newData) {
          console.error('Error fetching new user data:', refetchError);
          toast.error('Error loading user profile');
          return;
        }

        setUserData(newData);
        toast.success('User profile created successfully');
      } else if (mountedRef.current) {
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

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, newSession) => {
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
          }
        );

        return () => {
          subscription.unsubscribe();
        };
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
    };
  }, []);

  return {
    session,
    user,
    userData,
    loading,
  };
};