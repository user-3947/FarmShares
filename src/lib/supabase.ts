import { createClient } from '@supabase/supabase-js'

/** Replace the placeholder values in Frontend/.env with your Supabase project credentials. */
const PLACEHOLDER_URL = 'https://your-project-ref.supabase.co'
const PLACEHOLDER_KEY = 'your-anon-public-key'

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? ''
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

/** True once real project credentials are provided (not the placeholders). */
export const isSupabaseConfigured =
  Boolean(SUPABASE_URL && SUPABASE_ANON_KEY) &&
  SUPABASE_URL !== PLACEHOLDER_URL &&
  SUPABASE_ANON_KEY !== PLACEHOLDER_KEY

export const supabase = createClient(
  SUPABASE_URL || PLACEHOLDER_URL,
  SUPABASE_ANON_KEY || PLACEHOLDER_KEY,
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } },
)