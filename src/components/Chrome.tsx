import clsx from 'clsx'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { chapters } from '../content'
import { useActiveSection } from '../hooks/useActiveSection'
import { EASE } from '../lib/motion'
import { scrollToId } from '../lib/scroll'
import { enquiryLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './ui/Icons'

/** Gold "thread" across the top of the page that fills as you scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gold-gradient"
    />
  )
}

const chapterIds = chapters.map((c) => c.id)

/** Desktop side navigation listing the story's chapters. */
export function ChapterRail() {
  const active = useActiveSection(chapterIds)
  return (
    <AnimatePresence>
      {active && (
        <motion.nav
          aria-label="Chapters"
          className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <ul className="flex flex-col items-end gap-3.5">
            {chapters.map((c) => {
              const isActive = c.id === active
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(c.id)}
                    className="group flex items-center gap-3"
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <span
                      className={clsx(
                        'whitespace-nowrap rounded-full bg-ink/90 px-3 py-1.5 font-display text-[0.58rem] uppercase tracking-[0.25em] text-ivory backdrop-blur transition-all duration-300',
                        'pointer-events-none translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100',
                      )}
                    >
                      {c.numeral} · {c.title}
                    </span>
                    <span
                      className={clsx(
                        'block w-[3px] rounded-full transition-all duration-500 ease-luxe',
                        isActive ? 'h-8 bg-gold' : 'h-3 bg-gold/35 group-hover:bg-gold/70',
                      )}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

/** Floating WhatsApp button that appears once the visitor starts scrolling. */
export function FloatingWhatsApp() {
  const { scrollY } = useScroll()
  const [scrolledPast, setScrolledPast] = useState(false)
  const [bookingVisible, setBookingVisible] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setScrolledPast(y > 700))

  // Step aside while the booking form is on screen so it never covers its buttons.
  useEffect(() => {
    const card = document.getElementById('booking-card')
    if (!card) return
    const io = new IntersectionObserver(([entry]) => setBookingVisible(entry.isIntersecting), {
      rootMargin: '0px 0px -10% 0px',
    })
    io.observe(card)
    return () => io.disconnect()
  }, [])

  const show = scrolledPast && !bookingVisible

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={enquiryLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Rachy Designs on WhatsApp"
          className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-8 sm:right-8"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="pointer-events-none hidden translate-x-2 rounded-full bg-ink px-4 py-2 font-display text-[0.6rem] uppercase tracking-[0.25em] text-ivory opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
            Chat with Rachy
          </span>
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,0.7)] transition-transform duration-300 group-hover:scale-105">
            <span aria-hidden className="absolute inset-0 animate-soft-ping rounded-full bg-whatsapp" />
            <WhatsAppIcon className="relative h-7 w-7" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

/** Subtle film grain over the whole page for a tactile, printed feel. */
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[65] opacity-[0.05] mix-blend-multiply"
      style={{ backgroundImage: NOISE }}
    />
  )
}
