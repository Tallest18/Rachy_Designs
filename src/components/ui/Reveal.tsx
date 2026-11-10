import { motion, stagger, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE } from '../../lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li'
}

/** Fades + lifts its children into view the first time they scroll on screen. */
export function Reveal({ children, className, delay = 0, y = 34, as = 'div' }: RevealProps) {
  const props = {
    className,
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -12% 0px' },
    transition: { duration: 1.05, ease: EASE, delay },
  }
  return as === 'li' ? <motion.li {...props}>{children}</motion.li> : <motion.div {...props}>{children}</motion.div>
}

const word: Variants = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: { duration: 1, ease: EASE } },
}

/** Splits text into words that rise out of a mask one after another. */
export function MaskWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      variants={{ hidden: {}, show: { transition: { delayChildren: stagger(0.035, { startDelay: delay }) } } }}
    >
      {words.map((w, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span className="inline-block" variants={word}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </motion.span>
  )
}
