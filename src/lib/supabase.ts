import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'administrator' | 'analyst' | 'operations';

export interface UserData {
  id: string;
  email: string;
  role: UserRole;
}