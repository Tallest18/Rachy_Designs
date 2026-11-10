import type { Variants } from 'motion/react'

/** Signature "luxury" ease used throughout the site. */
export const EASE = [0.22, 1, 0.36, 1] as const
/** Heavier in-out ease for curtains and page-level transitions. */
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE, delay },
  }),
}

export const riseIn: Variants = {
  hidden: { y: '110%' },
  show: (delay: number = 0) => ({
    y: '0%',
    transition: { duration: 1.15, ease: EASE, delay },
  }),
}

/** Wrap a value into the [min, max) range; used for infinite marquees. */
export function wrap(min: number, max: number, v: number) {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}
