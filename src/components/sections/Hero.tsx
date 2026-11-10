import { ArrowDown, ArrowRight, Ruler } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { brand, images } from '../../content'
import { EASE, fadeUp, riseIn } from '../../lib/motion'
import { scrollToId } from '../../lib/scroll'
import { Button } from '../ui/Button'
import { SpinningBadge } from '../ui/SpinningBadge'

function RiseLine({ children, delay, className }: { children: ReactNode; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span className={`block ${className ?? ''}`} variants={riseIn} custom={delay}>
        {children}
      </motion.span>
    </span>
  )
}

const trust = [
  ['Made', 'to measure'],
  ['Premium', 'fabrics'],
  ['Studio', 'at UNIBEN'],
]

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const frameY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.28])
  const ghostY = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const state = ready ? 'show' : 'hidden'

  return (
    <section ref={ref} id="top" aria-label="Introduction" className="relative isolate overflow-hidden bg-ivory">
      {/* Ambient light */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[680px] w-[680px] rounded-full bg-gold-pale/70 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-52 -left-40 -z-10 h-[520px] w-[520px] rounded-full bg-sand/80 blur-3xl" />
      <motion.span
        aria-hidden
        style={{ y: ghostY }}
        className="pointer-events-none absolute -left-16 top-8 -z-10 hidden select-none font-display text-[36rem] leading-none text-ink/[0.03] lg:block"
      >
        R
      </motion.span>

      <div className="container-luxe grid min-h-svh items-center gap-16 pb-24 pt-32 lg:grid-cols-12 lg:gap-6 lg:pb-16 lg:pt-28">
        {/* ── Copy ── */}
        <motion.div style={{ y: textY, opacity: textOpacity }} initial="hidden" animate={state} className="lg:col-span-7">
          <motion.p
            variants={fadeUp}
            custom={0}
            className="flex items-center gap-3 font-display text-[0.62rem] uppercase tracking-[0.26em] text-gold-deep sm:text-[0.66rem] sm:tracking-[0.36em]"
          >
            <span className="h-px w-10 bg-gold" />
            Fashion &amp; Tailoring · Benin City
          </motion.p>

          <h1 className="mt-7">
            <span className="sr-only">Rachy Designs: </span>
            <RiseLine delay={0.12} className="font-serif text-[clamp(2.5rem,5.6vw,5rem)] font-normal italic leading-[1] text-umber">
              Wear your
            </RiseLine>
            <RiseLine
              delay={0.24}
              className="animate-shimmer font-display text-[clamp(2.7rem,7vw,6rem)] font-medium leading-[1.04] text-gold-gradient"
            >
              Confidence
            </RiseLine>
          </h1>

          <motion.p
            variants={fadeUp}
            custom={0.5}
            className="mt-6 font-display text-[0.7rem] tracking-[0.5em] text-ink/70 sm:text-xs"
          >
            {brand.motto.map((m) => m.toUpperCase()).join(' · ')}
          </motion.p>

          <motion.p variants={fadeUp} custom={0.6} className="mt-7 max-w-md text-lg font-light leading-relaxed text-muted">
            From everyday wear to statement pieces, I bring your style to life with{' '}
            <span className="font-serif text-[1.3rem] italic text-gold-deep">precision, passion and perfection.</span>
          </motion.p>

          <motion.div variants={fadeUp} custom={0.72} className="mt-10 flex flex-wrap items-center gap-4">
            <Button onClick={() => scrollToId('book')}>
              Book a Fitting
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
            </Button>
            <Button variant="ghost" onClick={() => scrollToId('story')}>
              Begin the story
              <ArrowDown className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-y-0.5" />
            </Button>
          </motion.div>

          <motion.dl variants={fadeUp} custom={0.88} className="mt-14 grid max-w-lg grid-cols-3 gap-4 border-t border-ink/10 pt-6">
            {trust.map(([a, b]) => (
              <div key={a}>
                <dt className="font-display text-[0.7rem] tracking-[0.24em] text-ink">{a.toUpperCase()}</dt>
                <dd className="mt-1 font-serif text-lg italic text-muted">{b}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── Image ── */}
        <div className="relative lg:col-span-5">
          <motion.div style={{ y: frameY }} className="relative mx-auto w-[86%] max-w-[440px] sm:w-full">
            <motion.div
              aria-hidden
              className="absolute -inset-3 rounded-t-[999px] rounded-b-[34px] border border-gold/45 sm:-inset-4"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={ready ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 1.6, ease: EASE, delay: 0.5 }}
            />
            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-sand shadow-[0_50px_90px_-40px_rgba(18,16,14,0.55)]"
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={ready ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
              transition={{ duration: 1.5, ease: EASE, delay: 0.1 }}
            >
              <motion.img
                src={images.gown}
                alt="Champagne draped one-shoulder gown with beaded embroidery on a dress form, with a tailor's measuring tape"
                style={{ scale: imageScale }}
                className="h-full w-full object-cover object-[50%_25%]"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/35 via-transparent to-transparent" />
            </motion.div>

            {/* Floating "made to measure" card */}
            <motion.div
              className="absolute -left-6 top-[16%] sm:-left-14"
              initial={{ opacity: 0, x: -24 }}
              animate={ready ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 1.1, ease: EASE, delay: 1.1 }}
            >
              <div className="flex animate-float items-center gap-3 rounded-2xl border border-white/70 bg-ivory/85 py-3 pl-3 pr-5 shadow-[0_20px_40px_-20px_rgba(18,16,14,0.4)] backdrop-blur-md">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-gold-light">
                  <Ruler className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-display text-[0.6rem] tracking-[0.24em] text-ink">MADE TO MEASURE</span>
                  <span className="block font-serif text-base italic text-muted">Cut for you alone</span>
                </span>
              </div>
            </motion.div>

            {/* Rotating seal */}
            <motion.div
              className="absolute -bottom-10 -right-4 sm:-right-12"
              initial={{ opacity: 0, scale: 0.5, rotate: -40 }}
              animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
              transition={{ duration: 1.3, ease: EASE, delay: 1.25 }}
            >
              <SpinningBadge />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 lg:block">
        <motion.button
          type="button"
          onClick={() => scrollToId('story')}
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ delay: 1.6, duration: 1 }}
          aria-label="Scroll to our story"
        >
          <span className="font-display text-[0.55rem] tracking-[0.42em] text-muted">SCROLL</span>
          <span className="relative h-12 w-px overflow-hidden bg-ink/10">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-gold" />
          </span>
        </motion.button>
      </div>
    </section>
  )
}
