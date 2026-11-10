import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { brand } from '../content'
import { EASE, EASE_IN_OUT } from '../lib/motion'
import { lockScroll, unlockScroll } from '../lib/scroll'
import { Monogram } from './ui/Icons'

const LETTERS = 'RACHY'.split('')

/**
 * Opening curtain: the monogram appears, the wordmark rises letter by letter,
 * a gold thread is drawn, then the curtain lifts to reveal the hero.
 */
export function Preloader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    lockScroll()
    let unlocked = false
    const timer = window.setTimeout(() => {
      unlocked = true
      unlockScroll()
      setVisible(false)
      onReveal()
    }, 2500)
    return () => {
      window.clearTimeout(timer)
      if (!unlocked) unlockScroll()
    }
  }, [onReveal])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading Rachy Designs"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink text-ivory"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 1.1, ease: EASE_IN_OUT }}
        >
          <motion.div
            className="flex flex-col items-center"
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE_IN_OUT }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              <Monogram className="h-16 w-16" />
            </motion.div>

            <h2 className="mt-8 flex overflow-hidden font-display text-4xl tracking-[0.32em] sm:text-6xl" aria-hidden>
              {LETTERS.map((l, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.35 + i * 0.07 }}
                >
                  {l}
                </motion.span>
              ))}
            </h2>

            <div className="mt-5 flex items-center gap-4">
              <motion.span
                className="h-px w-12 origin-right bg-gold sm:w-20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: EASE, delay: 0.9 }}
              />
              <motion.span
                className="font-display text-xs text-gold-light sm:text-sm"
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                animate={{ opacity: 1, letterSpacing: '0.6em' }}
                transition={{ duration: 1.3, ease: EASE, delay: 0.85 }}
              >
                DESIGNS
              </motion.span>
              <motion.span
                className="h-px w-12 origin-left bg-gold sm:w-20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: EASE, delay: 0.9 }}
              />
            </div>

            <motion.p
              className="mt-8 font-script text-3xl text-gold-light/90 sm:text-4xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 1.35 }}
            >
              {brand.tagline}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
