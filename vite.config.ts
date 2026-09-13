import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import babel from '@rolldown/plugin-babel'
import { defineConfig, loadEnv } from 'vite'
import type { Plugin, ResolvedConfig } from 'vite'

/**
 * ============================================================================
 *  Supabase Env Guard (build-time)
 * ----------------------------------------------------------------------------
 *  Vite inlines `VITE_*` variables when the bundle is BUILT — `.env` never
 *  reaches CI/host builds because it is git-ignored. Without this guard a CI
 *  build silently ships an app that renders but cannot authenticate at
 *  runtime ("Supabase is not configured").
 * ============================================================================
 */
function supabaseEnvGuard(): Plugin {
  return {
    name: 'farmshares:supabase-env-guard',
    configResolved(config: ResolvedConfig) {
      const envDir = typeof config.envDir === 'string' ? config.envDir : config.root
      const env = loadEnv(config.mode, envDir, '')
      const required = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'] as const
      const missing = required.filter((name) => !env[name])
      if (missing.length === 0) return

      // Hint for the classic mistake: real values set WITHOUT the VITE_ prefix.
      const unprefixed = missing
        .map((name) => name.replace('VITE_', ''))
        .filter((name) => Boolean(env[name]))

      config.logger.warnOnce(
        [
          '🌾 Supabase credentials are missing from this build:',
          ...missing.map((name) => `   · ${name}`),
          unprefixed.length > 0
            ? `   ↳ Found unprefixed ${unprefixed.join(', ')} — rename them with the VITE_ prefix.`
            : '   ↳ Local dev: set them in Frontend/.env (see .env.example).',
          '   ↳ Host/CI: add them to the platform build environment variables, then rebuild.',
          '   The app builds, but auth fails at runtime with "Supabase is not configured".',
        ].join('\n'),
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    supabaseEnvGuard(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})

