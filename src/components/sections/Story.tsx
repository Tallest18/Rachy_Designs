import clsx from 'clsx'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useEffect, useRef, type RefObject } from 'react'
import { brand } from '../../content'
import { ChapterLabel } from '../ui/ChapterLabel'

const THREAD =
  'M -60 700 C 160 640 210 300 420 250 S 760 420 820 610 S 1080 860 1220 560 S 1330 140 1520 120'

const highlights = new Set(brand.storyHighlights)
const clean = (w: string) => w.toLowerCase().replace(/[^a-z]/g, '')

function placeNeedle(path: SVGPathElement | null, needle: SVGGElement | null, v: number) {
  if (!path || !needle) return
  const total = path.getTotalLength()
  const at = Math.min(total - 1, Math.max(0.5, v * total))
  const p = path.getPointAtLength(at)
  const q = path.getPointAtLength(at + 1)
  const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI
  needle.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${angle})`)
  needle.style.opacity = v > 0.01 && v < 0.99 ? '1' : '0'
}

/** A gold thread that sews itself across the section as you scroll, needle leading the way. */
function Thread({ progress }: { progress: MotionValue<number> }) {
  const pathRef = useRef<SVGPathElement>(null)
  const needleRef = useRef<SVGGElement>(null)
  const draw = useTransform(progress, [0.02, 0.95], [0, 1])

  useMotionValueEvent(draw, 'change', (v) => placeNeedle(pathRef.current, needleRef.current, v))
  useEffect(() => placeNeedle(pathRef.current, needleRef.current, draw.get()), [draw])

  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="thread-gold" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#8a6326" />
          <stop offset=".5" stopColor="#d9b36a" />
          <stop offset="1" stopColor="#b88a3e" />
        </linearGradient>
        <linearGradient id="needle-steel" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#8a6326" />
          <stop offset=".6" stopColor="#f3e6c4" />
          <stop offset="1" stopColor="#b88a3e" />
        </linearGradient>
      </defs>
      {/* stitching guide */}
      <path d={THREAD} fill="none" stroke="#d8c8ad" strokeWidth="1.2" strokeDasharray="3 11" strokeLinecap="round" />
      {/* the thread */}
      <motion.path
        ref={pathRef}
        d={THREAD}
        fill="none"
        stroke="url(#thread-gold)"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength: draw }}
      />
      {/* the needle (eye at the thread, point leading) */}
      <g ref={needleRef} style={{ opacity: 0 }}>
        <path d="M -6 0 C -6 -3.2 -2 -3.6 3 -3 L 64 0 L 3 3 C -2 3.6 -6 3.2 -6 0 Z" fill="url(#needle-steel)" />
        <ellipse cx="-1" cy="0" rx="3" ry="1.1" fill="#fbf7f0" />
      </g>
    </svg>
  )
}

function Word({
  children,
  progress,
  range,
  highlight,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  highlight: boolean
}) {
  const opacity = useTransform(progress, range, [0.13, 1])
  return (
    <motion.span style={{ opacity }} className={clsx(highlight && 'italic text-gold-deep')}>
      {children}
    </motion.span>
  )
}

export function Story() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref as RefObject<HTMLElement>, offset: ['start start', 'end end'] })
  const words = brand.story.split(' ')
  const signOpacity = useTransform(scrollYProgress, [0.82, 0.92], [0, 1])
  const signY = useTransform(scrollYProgress, [0.82, 0.92], [20, 0])

  const span = 0.74 / words.length

  return (
    <section
      id="story"
      ref={ref}
      aria-labelledby="story-title"
      className="relative bg-ivory"
      style={{ height: reduce ? 'auto' : '320vh' }}
    >
      <div className={clsx('flex items-center overflow-hidden', reduce ? 'py-32' : 'sticky top-0 h-svh')}>
        {!reduce && <Thread progress={scrollYProgress} />}

        <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8">
          <ChapterLabel id="story" />
          <h2 id="story-title" className="sr-only">
            Our Story
          </h2>
          <p className="mt-8 font-serif text-[clamp(1.65rem,3.7vw,3.35rem)] leading-[1.22] text-ink">
            {reduce
              ? brand.story
              : words.map((w, i) => {
                  const start = 0.06 + i * span
                  return (
                    <span key={i}>
                      <Word progress={scrollYProgress} range={[start, start + span * 3]} highlight={highlights.has(clean(w))}>
                        {w}
                      </Word>{' '}
                    </span>
                  )
                })}
          </p>
          <motion.div
            style={reduce ? undefined : { opacity: signOpacity, y: signY }}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            <span className="font-script text-5xl text-gold-deep">Rachy</span>
            <span className="h-px w-14 bg-gold/50" />
            <span className="font-display text-[0.62rem] tracking-[0.34em] text-muted">MADE WITH LOVE IN BENIN CITY</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
