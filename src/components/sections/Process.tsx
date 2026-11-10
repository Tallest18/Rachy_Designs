import clsx from 'clsx'
import { ArrowRight, MoveRight } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { processSteps } from '../../content'
import { useBooking } from '../../booking/context'
import { pad2 } from '../../lib/format'
import { Button } from '../ui/Button'
import { ChapterLabel } from '../ui/ChapterLabel'

/**
 * Pinned section: vertical scrolling slides the six process cards sideways,
 * while a gold thread grows to connect them.
 */
export function Process() {
  const reduce = useReducedMotion()
  const { bookService } = useBooking()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const distanceMV = useMotionValue(0)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => {
      const d = Math.max(0, track.scrollWidth - window.innerWidth)
      distanceMV.set(d)
      setDistance(d)
    }
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [distanceMV])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(() => -scrollYProgress.get() * distanceMV.get())

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-title"
      className="relative bg-ink text-ivory"
      style={reduce ? undefined : { height: `calc(100svh + ${distance}px)` }}
    >
      <div
        className={clsx(
          reduce ? 'overflow-x-auto py-28' : 'sticky top-0 flex h-svh flex-col justify-center overflow-hidden',
        )}
      >
        {/* ambient glow */}
        <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-gold/10 blur-3xl" />

        <motion.div
          ref={trackRef}
          style={reduce ? undefined : { x }}
          className="relative flex w-max items-stretch gap-5 px-5 sm:px-8 md:gap-7 lg:px-16"
        >
          {/* connecting thread */}
          <motion.div
            aria-hidden
            style={{ scaleX: reduce ? 1 : scrollYProgress }}
            className="absolute inset-x-0 top-1/2 h-px origin-left bg-linear-to-r from-gold/0 via-gold/60 to-gold/30"
          />

          {/* Intro panel */}
          <div className="relative flex w-[84vw] shrink-0 flex-col justify-center pr-4 sm:w-[440px] lg:w-[500px]">
            <ChapterLabel id="process" onDark />
            <h2 id="process-title" className="mt-7 font-display text-[clamp(2.1rem,4.4vw,3.7rem)] leading-[1.04]">
              From vision
              <span className="block font-serif font-normal italic normal-case text-gold-light">to wardrobe</span>
            </h2>
            <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-ivory/65">
              Every Rachy Designs piece follows a careful journey: six steps from your first idea to the moment you step
              out in it.
            </p>
            {!reduce && (
              <p className="mt-10 flex items-center gap-3 font-display text-[0.6rem] tracking-[0.4em] text-gold-light/80">
                KEEP SCROLLING <MoveRight className="h-4 w-4" />
              </p>
            )}
          </div>

          {processSteps.map((step, i) => (
            <article
              key={step.title}
              className="group relative flex h-[min(64svh,540px)] min-h-[400px] w-[78vw] shrink-0 flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-ink-soft p-7 transition-colors duration-500 hover:border-gold/40 sm:w-[370px] md:p-9 lg:w-[400px]"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-7xl leading-none text-outline-gold md:text-8xl">{pad2(i + 1)}</span>
                <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 text-gold-light transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                  <step.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
              </div>
              <div>
                <p className="font-display text-[0.6rem] tracking-[0.35em] text-gold-light/70">
                  STEP {pad2(i + 1)} / {pad2(processSteps.length)}
                </p>
                <h3 className="mt-3 font-display text-2xl tracking-[0.06em] text-ivory md:text-[1.75rem]">{step.title}</h3>
                <p className="mt-4 min-h-[5.25rem] leading-relaxed text-ivory/60">{step.body}</p>
              </div>
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-gold/10 blur-3xl transition-opacity duration-700 group-hover:bg-gold/25"
              />
            </article>
          ))}

          {/* Outro panel */}
          <div className="relative flex w-[84vw] shrink-0 flex-col justify-center rounded-[28px] bg-gold-gradient p-8 text-ink sm:w-[400px] md:p-10">
            <p className="font-script text-5xl leading-none">Your turn</p>
            <p className="mt-5 font-display text-2xl leading-snug tracking-[0.04em]">
              Every great outfit begins with a conversation.
            </p>
            <Button variant="primary" className="mt-8 self-start" onClick={() => bookService()}>
              Start yours <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* progress bar */}
        {!reduce && (
          <div className="mx-auto mt-10 h-px w-[min(70%,360px)] bg-white/10 md:mt-14">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-gold" />
          </div>
        )}
      </div>
    </section>
  )
}
