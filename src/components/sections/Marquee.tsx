import clsx from 'clsx'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { useRef } from 'react'
import { wrap } from '../../lib/motion'

const ITEMS = ['Bespoke Tailoring', 'Ready-to-Wear', 'Corporate Wear', 'Casual Wear', 'Custom Designs', 'Alterations']

/**
 * Infinite ribbon of services. It drifts on its own, speeds up with scroll
 * velocity and flips direction when the visitor scrolls back up.
 */
export function Marquee() {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(0, -25, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let moveBy = direction.current * -1.6 * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    moveBy += direction.current * moveBy * f
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <section aria-label="What we make" className="relative overflow-hidden border-y border-gold/25 bg-ink py-7 md:py-9">
      <motion.div style={{ x }} className="flex w-max whitespace-nowrap">
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} aria-hidden={copy > 0} className="flex shrink-0 items-center">
            {ITEMS.map((item, i) => (
              <span key={item} className="flex items-center">
                <span
                  className={clsx(
                    'px-7 font-display text-2xl tracking-[0.1em] md:px-12 md:text-[2.6rem]',
                    i % 2 ? 'text-outline-gold' : 'text-ivory',
                  )}
                >
                  {item}
                </span>
                <span aria-hidden className="font-script text-3xl text-gold md:text-5xl">
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  )
}
