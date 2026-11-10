import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { reviews, reviewsArePlaceholders } from '../../content'
import { pad2 } from '../../lib/format'
import { EASE } from '../../lib/motion'
import { ChapterLabel } from '../ui/ChapterLabel'
import { MaskWords } from '../ui/Reveal'

export function Reviews() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1])
  const [paused, setPaused] = useState(false)
  const count = reviews.length
  const review = reviews[index]

  const paginate = (d: number) => setState(([i]) => [(i + d + count) % count, d])

  useEffect(() => {
    if (paused || count < 2) return
    const t = window.setInterval(() => setState(([i]) => [(i + 1) % count, 1]), 7000)
    return () => window.clearInterval(t)
  }, [paused, count])

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="relative overflow-hidden bg-ivory py-28 md:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container-luxe grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <ChapterLabel id="reviews" />
          <h2 id="reviews-title" className="mt-6 font-display text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.05] text-ink">
            <MaskWords text="Kind words" className="block" />
            <MaskWords
              text="from our clients"
              delay={0.15}
              className="block font-serif font-normal italic normal-case text-gold-deep"
            />
          </h2>
          {reviewsArePlaceholders && (
            <p className="mt-6 inline-block rounded-full border border-dashed border-wine/40 px-4 py-2 text-xs text-wine">
              Sample reviews: replace in <code>src/content.ts</code>. Hidden on the live site until then.
            </p>
          )}
          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous review"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 transition hover:border-ink hover:bg-ink hover:text-ivory"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next review"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 transition hover:border-ink hover:bg-ink hover:text-ivory"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="ml-3 font-display text-xs tracking-[0.25em] text-muted">
              {pad2(index + 1)} / {pad2(count)}
            </span>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="relative min-h-[360px] overflow-hidden rounded-[32px] bg-cream p-8 sm:p-12 md:min-h-[380px] md:p-16">
            <Quote aria-hidden className="absolute right-8 top-8 h-24 w-24 rotate-180 fill-gold/10 text-gold/20 md:right-12 md:top-10" strokeWidth={0.75} />
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, y: dir * 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: dir * -30 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative"
                aria-live="polite"
              >
                <div className="flex gap-1 text-gold" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-8 font-serif text-[clamp(1.5rem,2.6vw,2.3rem)] italic leading-snug text-ink">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-ink font-display text-gold-light">
                    {review.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-display text-sm tracking-[0.18em] text-ink">{review.name.toUpperCase()}</span>
                    <span className="block text-sm text-muted">{review.outfit}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setState(([cur]) => [i, i >= cur ? 1 : -1])}
                aria-label={`Show review ${i + 1}`}
                aria-current={i === index}
                className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10"
              >
                <span
                  className="block h-full origin-left bg-gold transition-transform duration-700 ease-luxe"
                  style={{ transform: `scaleX(${i === index ? 1 : 0})` }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
