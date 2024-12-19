import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://sgophjadtxbduwkuuqjw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnb3BoamFkdHhiZHV3a3V1cWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1ODE5NzUsImV4cCI6MjA1MDE1Nzk3NX0.UhRClxDX7LBLZgdm7XsKBtlXfQi-xEU9r7ElPJGzsMQ";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'administrator' | 'analyst' | 'operations';

export interface UserData {
  id: string;
  email: string;
  role: UserRole;
}