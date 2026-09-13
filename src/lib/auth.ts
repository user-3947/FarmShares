import { supabase, isSupabaseConfigured } from './supabase'
import type { Profile, Role } from '../context/AppContext'

const guard = () => {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured. VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY were empty when this bundle was built. Set them in Frontend/.env for local dev, or in your hosting platform build environment variables for deployments, then rebuild.',
    )
  }
}

/**
 * Reads the signed-in user's own profile row. This is the ONLY trusted source
 * for role/identity: it matches `id = auth.uid()` after authentication and RLS
 * makes any other (or anonymous) lookup impossible — there is deliberately no
 * public email-by-username endpoint.
 */
export async function fetchOwnProfile(): Promise<Profile> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) throw new Error('Session expired. Please sign in again.')

  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, email, role')
    .eq('id', user.id)
    .single()
  if (error) throw new Error('Unable to load your profile.')
  return data as Profile
}

export interface SignUpInput {
  email: string
  password: string
  fullName: string
  role: Role
}

/** Creates the auth user; the DB trigger turns user_metadata into public.profiles. */
export async function signUpUser({ email, password, fullName, role }: SignUpInput) {
  guard()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role,
      },
    },
  })
  if (error) throw new Error(error.message)
  return { needsEmailConfirmation: !data.session }
}

/**
 * Signs in with email (the only identity — no separate username) and verifies
 * the role picked in the UI against the server-side profile. Authorization
 * always comes from `profiles.role`, never from the UI selection or
 * user_metadata (which users can edit themselves).
 */
export async function signInUser(input: { email: string; password: string; selectedRole: Role }): Promise<Profile> {
  guard()
  const { error } = await supabase.auth.signInWithPassword({
    email: input.email.trim(),
    password: input.password,
  })
  if (error) {
    if (error.message.toLowerCase().includes('email not confirmed')) {
      throw new Error('Email not confirmed. Verify your email before signing in.')
    }
    throw new Error(error.message)
  }

  const profile = await fetchOwnProfile()
  if (profile.role !== input.selectedRole) {
    await supabase.auth.signOut()
    throw new Error(`This account is registered as ${profile.role}.`)
  }
  return profile
}

export async function signOutUser() {
  await supabase.auth.signOut()
}