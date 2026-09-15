export interface SignUpFields {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

const EMAIL_PATTERN = /\S+@\S+\.\S+/

export function validateLoginFields(email: string, password: string): string | null {
  if (!email.trim() || !password.trim()) return 'Enter your email and password to continue.'
  if (!EMAIL_PATTERN.test(email)) return 'Enter a valid email address.'
  return null
}

export function validateSignUpFields(fields: SignUpFields): string | null {
  if (!fields.fullName.trim()) return 'Full name is required'
  if (!fields.email.trim()) return 'Email is required'
  if (!EMAIL_PATTERN.test(fields.email)) return 'Enter a valid email address'
  if (fields.password !== fields.confirmPassword) return 'Passwords do not match'
  if (fields.password.length < 8) return 'Password must contain at least 8 characters'
  return null
}

/** Email-only check for the "forgot password" request form. */
export function validateEmailField(email: string): string | null {
  if (!email.trim()) return 'Enter the email you registered with.'
  if (!EMAIL_PATTERN.test(email)) return 'Enter a valid email address.'
  return null
}

/** New password + confirmation check for the reset screen. */
export function validateResetFields(password: string, confirmPassword: string): string | null {
  if (!password.trim() || !confirmPassword.trim()) return 'Enter and confirm your new password.'
  if (password !== confirmPassword) return 'Passwords do not match'
  if (password.length < 8) return 'Password must contain at least 8 characters'
  return null
}