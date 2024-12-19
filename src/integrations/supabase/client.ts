import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://sgophjadtxbduwkuuqjw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnb3BoamFkdHhiZHV3a3V1cWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1ODE5NzUsImV4cCI6MjA1MDE1Nzk3NX0.UhRClxDX7LBLZgdm7XsKBtlXfQi-xEU9r7ElPJGzsMQ";

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Add error handling for fetch operations
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  try {
    const response = await originalFetch(...args);
    if (!response.ok) {
      console.error('Fetch error:', {
        status: response.status,
        statusText: response.statusText,
        url: args[0]
      });
    }
    return response;
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
};