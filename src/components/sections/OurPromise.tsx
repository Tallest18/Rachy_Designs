import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { brand } from '../../content'
import { ChapterLabel } from '../ui/ChapterLabel'
import { DressFormIcon } from '../ui/Icons'
import { MaskWords, Reveal } from '../ui/Reveal'

export function OurPromise() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['10%', '-45%'])
  const lineScale = useTransform(scrollYProgress, [0.15, 0.45], [0, 1])

  return (
    <section id="promise" ref={ref} aria-labelledby="promise-title" className="relative overflow-hidden bg-cream py-32 md:py-48">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none">
        <motion.p
          style={{ x }}
          className="whitespace-nowrap font-display text-[clamp(6rem,19vw,17rem)] leading-none text-ink/[0.035]"
        >
          EVERY STITCH TELLS A STORY
        </motion.p>
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <ChapterLabel id="promise" className="justify-center" />
        <h2 id="promise-title" className="sr-only">
          Our Promise
        </h2>

        <div className="mx-auto mt-10 flex items-center justify-center gap-5 text-gold">
          <motion.span style={{ scaleX: lineScale }} className="h-px w-16 origin-right bg-gold/60 sm:w-24" />
          <DressFormIcon className="h-9 w-9" />
          <motion.span style={{ scaleX: lineScale }} className="h-px w-16 origin-left bg-gold/60 sm:w-24" />
        </div>

        <blockquote className="mt-10">
          <p className="font-serif text-[clamp(1.85rem,4.1vw,3.55rem)] italic leading-[1.16] text-ink">
            <span aria-hidden className="mr-1 font-display not-italic text-gold">“</span>
            <MaskWords text={brand.promise} />
            <span aria-hidden className="ml-1 font-display not-italic text-gold">”</span>
          </p>
        </blockquote>

        <Reveal delay={0.35}>
          <p className="mx-auto mt-10 max-w-2xl text-lg font-light leading-relaxed text-muted">{brand.promiseFollowUp}</p>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-14">
            <span className="font-script text-6xl text-gold-deep">Racheal</span>
            <span className="mt-3 block font-display text-[0.62rem] tracking-[0.34em] text-muted">
              {brand.founder.toUpperCase()} · {brand.founderTitle.toUpperCase()}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
