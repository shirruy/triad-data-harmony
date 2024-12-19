import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserData } from '@/lib/auth/types';
import { toast } from 'sonner';

export const useUserProfile = (user: User | null) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching user data for ID:', user.id);
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching user data:', error);
          toast.error('Error loading user data');
          return;
        }

        if (!data) {
          console.warn('No user data found for ID:', user.id);
          const { error: insertError } = await supabase
            .rpc('create_new_user', {
              user_id: user.id,
              user_email: user.email || '',
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
            .eq('id', user.id)
            .maybeSingle();

          if (refetchError || !newData) {
            console.error('Error fetching new user data:', refetchError);
            toast.error('Error loading user profile');
            return;
          }

          setUserData(newData);
          toast.success('User profile created successfully');
        } else {
          setUserData(data);
        }
      } catch (error) {
        console.error('Unexpected error fetching user data:', error);
        toast.error('Unexpected error loading user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  return { userData, loading };
};