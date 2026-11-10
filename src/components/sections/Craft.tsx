import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { brand, images, pillars } from '../../content'
import { ChapterLabel } from '../ui/ChapterLabel'
import { MaskWords, Reveal } from '../ui/Reveal'

export function Craft() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const backY = useTransform(scrollYProgress, [0, 1], ['8%', '-10%'])
  const frontY = useTransform(scrollYProgress, [0, 1], ['24%', '-22%'])
  const backScale = useTransform(scrollYProgress, [0, 1], [1.15, 1])
  const scriptRotate = useTransform(scrollYProgress, [0, 1], [-14, 8])

  return (
    <section id="craft" ref={ref} aria-labelledby="craft-title" className="relative overflow-hidden bg-cream py-28 md:py-40">
      <div className="container-luxe grid items-center gap-20 lg:grid-cols-12 lg:gap-12">
        {/* Layered images with parallax */}
        <div className="relative h-[480px] sm:h-[600px] lg:col-span-6 lg:h-[680px]">
          <motion.div
            style={{ y: backY }}
            className="absolute left-0 top-0 aspect-[3/4] w-[66%] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(18,16,14,0.5)]"
          >
            <motion.img
              src={images.custom}
              alt="Emerald cape gown with gold embellishment"
              style={{ scale: backScale }}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            style={{ y: frontY }}
            className="absolute bottom-0 right-0 aspect-[3/4] w-[50%] overflow-hidden rounded-t-[999px] rounded-b-[24px] border-[6px] border-cream shadow-[0_40px_80px_-30px_rgba(18,16,14,0.55)]"
          >
            <img
              src={images.ready}
              alt="Magenta wrap dress with balloon sleeves"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>
          <motion.p
            aria-hidden
            style={{ rotate: scriptRotate }}
            className="absolute right-[4%] top-[6%] font-script text-5xl text-gold-deep sm:text-6xl"
          >
            handmade
          </motion.p>
        </div>

        {/* Copy */}
        <div className="lg:col-span-6 lg:pl-8">
          <ChapterLabel id="craft" />
          <h2 id="craft-title" className="mt-7 font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.08] text-ink">
            <MaskWords text="Beautifully tailored." className="block" />
            <MaskWords
              text="Thoughtfully made."
              delay={0.2}
              className="block font-serif font-normal italic normal-case text-gold-deep"
            />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-muted">{brand.craft}</p>
          </Reveal>

          <ul className="mt-12 border-t border-ink/10">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.1 + i * 0.12} className="flex items-start gap-5 border-b border-ink/10 py-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/40 bg-ivory text-gold-deep">
                  <p.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-display text-sm tracking-[0.2em] text-ink">{p.title.toUpperCase()}</h3>
                  <p className="mt-1.5 text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
