import { Gem, Sparkles } from 'lucide-react'
import { motion, useMotionTemplate, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { brand } from '../../content'
import { ChapterLabel } from '../ui/ChapterLabel'
import { MaskWords, Reveal } from '../ui/Reveal'

const blocks = [
  { label: 'Our Mission', icon: Gem, text: brand.mission },
  { label: 'Our Vision', icon: Sparkles, text: brand.vision },
]

/** Wine panel that opens up from a framed card to full-bleed as it scrolls in. */
export function Purpose() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ['start end', 'start 0.2'] })
  const inset = useTransform(enter, [0, 1], [6, 0])
  const radius = useTransform(enter, [0, 1], [48, 0])
  const clipPath = useMotionTemplate`inset(0% ${inset}% round ${radius}px)`

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rowA = useTransform(scrollYProgress, [0, 1], ['4%', '-30%'])
  const rowB = useTransform(scrollYProgress, [0, 1], ['-30%', '4%'])

  return (
    <section id="purpose" ref={ref} aria-labelledby="purpose-title" className="relative bg-ivory">
      <motion.div style={{ clipPath }} className="relative overflow-hidden bg-wine-deep text-ivory">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,138,62,0.22),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(109,22,49,0.9),transparent_60%)]"
        />
        <div className="container-luxe relative pb-16 pt-28 md:pt-40">
          <ChapterLabel id="purpose" onDark />
          <h2 id="purpose-title" className="mt-7 font-display text-[clamp(2.1rem,4.8vw,4rem)] leading-[1.05]">
            <MaskWords text="Fashion is more than" className="block" />
            <MaskWords
              text="just wearing clothes"
              delay={0.2}
              className="block font-serif font-normal italic normal-case text-gold-light"
            />
          </h2>

          <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 md:mt-20 md:grid-cols-2">
            {blocks.map((b, i) => (
              <Reveal key={b.label} delay={i * 0.15} className="bg-wine-deep/95 p-8 md:p-12">
                <div className="flex items-center gap-3 text-gold-light">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-gold-light/30">
                    <b.icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display text-xs tracking-[0.35em]">{b.label.toUpperCase()}</h3>
                </div>
                <p className="mt-8 font-serif text-[clamp(1.45rem,2.3vw,2rem)] leading-snug text-ivory/90">{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Values moving in opposite directions */}
        <div aria-hidden className="select-none space-y-2 pb-20 pt-6 md:pb-28">
          <motion.p
            style={{ x: rowA }}
            className="whitespace-nowrap font-display text-[clamp(3.2rem,10vw,9rem)] leading-none text-outline-gold"
          >
            QUALITY · PRECISION · ELEGANCE · QUALITY · PRECISION · ELEGANCE
          </motion.p>
          <motion.p
            style={{ x: rowB }}
            className="whitespace-nowrap font-display text-[clamp(3.2rem,10vw,9rem)] leading-none text-ivory/[0.08]"
          >
            STYLE · ELEGANCE · PERFECTION · STYLE · ELEGANCE · PERFECTION
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}
