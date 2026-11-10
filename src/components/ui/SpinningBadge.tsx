import clsx from 'clsx'
import { useId } from 'react'
import { DressFormIcon } from './Icons'

/** Circular "QUALITY • PRECISION • ELEGANCE" seal from the flyer, slowly rotating. */
export function SpinningBadge({ className }: { className?: string }) {
  const id = `ring-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  return (
    <div
      className={clsx(
        'relative grid h-32 w-32 place-items-center rounded-full bg-ink text-gold-light shadow-[0_24px_50px_-18px_rgba(18,16,14,0.7)] ring-1 ring-gold/40 sm:h-36 sm:w-36',
        className,
      )}
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id={id} d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
        </defs>
        <text fontFamily="Cinzel, serif" fontSize="9.2" fill="currentColor">
          <textPath href={`#${id}`} textLength="280" lengthAdjust="spacing">
            QUALITY • PRECISION • ELEGANCE •
          </textPath>
        </text>
      </svg>
      <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/30">
        <DressFormIcon className="h-8 w-8" />
      </span>
      <span className="sr-only">Quality, precision, elegance</span>
    </div>
  )
}
