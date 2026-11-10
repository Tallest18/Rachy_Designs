import clsx from 'clsx'
import { ArrowRight, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { services } from '../../content'
import { useBooking } from '../../booking/context'
import { pad2 } from '../../lib/format'
import { EASE } from '../../lib/motion'
import { ChapterLabel } from '../ui/ChapterLabel'
import { MaskWords, Reveal } from '../ui/Reveal'

export function Services() {
  const { bookService } = useBooking()
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const shown = services[hovered ?? active]

  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-ivory py-28 md:py-40">
      <div className="container-luxe">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <ChapterLabel id="services" />
            <h2 id="services-title" className="mt-6">
              <MaskWords text="I sew" className="block font-script text-[clamp(3.2rem,7vw,5.8rem)] leading-[1] text-gold-deep" />
              <MaskWords
                text="All kinds of clothes"
                delay={0.15}
                className="block font-display text-[clamp(1.9rem,4.6vw,4rem)] leading-[1.05] text-ink"
              />
            </h2>
          </div>
          <Reveal delay={0.2} className="max-w-sm">
            <p className="text-lg font-light leading-relaxed text-muted">
              From everyday wear to statement pieces. Choose a service to see more, then book it in a tap.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Accordion list */}
          <ul className="border-t border-ink/10 lg:col-span-7" onMouseLeave={() => setHovered(null)}>
            {services.map((svc, i) => {
              const isActive = i === active
              return (
                <li key={svc.id} className="border-b border-ink/10" onMouseEnter={() => setHovered(i)}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-expanded={isActive}
                      aria-controls={`service-${svc.id}`}
                      className="group flex w-full items-center gap-5 py-6 text-left md:gap-8 md:py-8"
                    >
                      <span className="w-7 font-display text-xs text-gold-deep">{pad2(i + 1)}</span>
                      <span
                        className={clsx(
                          'flex-1 font-display text-[clamp(1.35rem,2.8vw,2.35rem)] tracking-[0.04em] transition-colors duration-500',
                          isActive ? 'text-ink' : 'text-ink/35 group-hover:text-ink/75',
                        )}
                      >
                        {svc.title}
                      </span>
                      <span
                        className={clsx(
                          'grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-500',
                          isActive ? 'rotate-45 border-ink bg-ink text-gold-light' : 'border-ink/15 text-ink group-hover:border-ink/40',
                        )}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        id={`service-${svc.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.65, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="pb-9 md:pl-[3.75rem]">
                          <img
                            src={svc.image}
                            alt={svc.alt}
                            loading="lazy"
                            className="mb-6 aspect-[4/3] w-full rounded-2xl object-cover object-top lg:hidden"
                          />
                          <p className="font-serif text-2xl italic text-gold-deep">{svc.kicker}</p>
                          <p className="mt-3 max-w-xl leading-relaxed text-muted">{svc.description}</p>
                          <button
                            type="button"
                            onClick={() => bookService(svc.id)}
                            className="group/book mt-7 inline-flex items-center gap-3 border-b border-ink pb-1.5 font-display text-[0.68rem] tracking-[0.26em] text-ink transition-colors hover:border-gold hover:text-gold-deep"
                          >
                            BOOK THIS SERVICE
                            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover/book:translate-x-1" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>

          {/* Sticky preview (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-sand shadow-[0_40px_80px_-40px_rgba(18,16,14,0.5)]">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={shown.id}
                    src={shown.image}
                    alt={shown.alt}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    initial={{ opacity: 0, scale: 1.12, clipPath: 'inset(0% 0% 100% 0%)' }}
                    animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/0 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-ivory/15 text-gold-light backdrop-blur-md">
                    <shown.icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="font-display text-[0.6rem] tracking-[0.35em] text-gold-light">RACHY DESIGNS</p>
                    <p className="font-serif text-2xl italic text-ivory">{shown.short}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
