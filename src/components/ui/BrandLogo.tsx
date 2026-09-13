/**
 * ============================================================================
 *  Brand Logo
 * ----------------------------------------------------------------------------
 *  Neumorphic leaf mark + optional wordmark/tagline combo used in every page
 *  header. Keeps brand markup identical across auth pages and dashboard.
 * ============================================================================
 */
import { Leaf } from 'lucide-react'
import { APP_NAME } from '../../config/app'

interface BrandLogoProps {
  /** Optional label rendered under the wordmark (uppercase tracking style). */
  tagline?: string
}

export function BrandLogo({ tagline }: BrandLogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="neu-outset flex h-10 w-10 items-center justify-center rounded-xl text-primary">
        <Leaf className="h-5 w-5" strokeWidth={2.25} />
      </div>
      {tagline ? (
        <div>
          <span className="block text-headline-sm font-headline-sm tracking-tight text-primary">
            {APP_NAME}
          </span>
          <span className="text-label-sm font-label-sm tracking-wide text-on-surface-variant uppercase">
            {tagline}
          </span>
        </div>
      ) : (
        <span className="text-headline-sm font-bold tracking-tight text-primary">
          {APP_NAME}
        </span>
      )}
    </div>
  )
}
