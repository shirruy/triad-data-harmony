// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://sgophjadtxbduwkuuqjw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnb3BoamFkdHhiZHV3a3V1cWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1ODE5NzUsImV4cCI6MjA1MDE1Nzk3NX0.UhRClxDX7LBLZgdm7XsKBtlXfQi-xEU9r7ElPJGzsMQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);