import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to get or create a stable anonymous user ID
export const getUserId = () => {
  if (typeof window === 'undefined') return null;
  
  let userId = localStorage.getItem('vibelingoUserId');
  if (!userId) {
    // Generate a random ID (pseudo-UUID) for anonymous tracking
    userId = 'user_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('vibelingoUserId', userId);
  }
  return userId;
};
