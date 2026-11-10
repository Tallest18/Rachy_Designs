import clsx from 'clsx'
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { contact, gallery, type GalleryItem } from '../../content'
import { pad2 } from '../../lib/format'
import { EASE } from '../../lib/motion'
import { lockScroll, unlockScroll } from '../../lib/scroll'
import { ChapterLabel } from '../ui/ChapterLabel'
import { InstagramIcon } from '../ui/Icons'
import { MaskWords, Reveal } from '../ui/Reveal'

const shapeClass: Record<GalleryItem['shape'], string> = {
  tall: 'aspect-[3/4.4]',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
}

export function Work() {
  const [index, setIndex] = useState<number | null>(null)
  const close = useCallback(() => setIndex(null), [])
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + gallery.length) % gallery.length)),
    [],
  )

  return (
    <section id="work" aria-labelledby="work-title" className="relative bg-ivory py-28 md:py-40">
      <div className="container-luxe">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <ChapterLabel id="work" />
            <h2 id="work-title" className="mt-6 font-display text-[clamp(2.1rem,5vw,4.2rem)] leading-[1.04] text-ink">
              <MaskWords text="Our Work" className="block" />
              <MaskWords
                text="stitched with intention"
                delay={0.15}
                className="block font-serif font-normal italic normal-case text-gold-deep"
              />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <a
              href={contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 font-display text-[0.68rem] tracking-[0.26em] text-ink"
            >
              <InstagramIcon className="h-5 w-5" />
              <span className="border-b border-ink/30 pb-1 transition-colors group-hover:border-gold group-hover:text-gold-deep">
                MORE ON INSTAGRAM
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {gallery.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.1} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden rounded-[22px] bg-sand text-left"
                aria-label={`View ${item.title}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className={clsx(
                    'w-full object-cover object-top transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.06]',
                    shapeClass[item.shape],
                  )}
                />
                <span className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/0 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <span>
                    <span className="block font-display text-[0.58rem] tracking-[0.34em] text-gold-light">
                      {item.category.toUpperCase()}
                    </span>
                    <span className="mt-1 block font-serif text-2xl italic leading-tight text-ivory">{item.title}</span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 translate-y-2 place-items-center rounded-full bg-ivory/90 text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <Expand className="h-4 w-4" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}

          {/* Call-to-action tile */}
          <Reveal className="break-inside-avoid">
            <a
              href={contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex aspect-[3/2.4] flex-col justify-between overflow-hidden rounded-[22px] bg-ink p-7 text-ivory"
            >
              <span className="font-display text-[0.6rem] tracking-[0.34em] text-gold-light">FOLLOW THE JOURNEY</span>
              <span>
                <span className="block font-serif text-3xl italic leading-tight">
                  See more of our pieces on Instagram
                </span>
                <span className="mt-4 inline-flex items-center gap-2 font-display text-xs tracking-[0.2em] text-gold-light">
                  {contact.instagram.handle}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </span>
              <InstagramIcon className="absolute -right-6 -top-6 h-36 w-36 text-white/[0.04] transition-transform duration-700 group-hover:rotate-12" />
            </a>
          </Reveal>
        </div>
      </div>

      <Lightbox index={index} onClose={close} onStep={step} />
    </section>
  )
}

function Lightbox({ index, onClose, onStep }: { index: number | null; onClose: () => void; onStep: (d: number) => void }) {
  const open = index !== null
  const closeRef = useRef<HTMLButtonElement>(null)
  const [dir, setDir] = useState(1)

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    lockScroll()
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') {
        setDir(1)
        onStep(1)
      }
      if (e.key === 'ArrowLeft') {
        setDir(-1)
        onStep(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      unlockScroll()
      previouslyFocused?.focus()
    }
  }, [open, onClose, onStep])

  const go = (d: number) => {
    setDir(d)
    onStep(d)
  }
  const item = index !== null ? gallery[index] : null

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title}: image ${index! + 1} of ${gallery.length}`}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex max-h-full flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-auto max-h-[76svh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
              <figcaption className="mt-5 text-center">
                <span className="block font-display text-[0.58rem] tracking-[0.34em] text-gold-light">
                  {item.category.toUpperCase()} · {pad2(index! + 1)} / {pad2(gallery.length)}
                </span>
                <span className="mt-1 block font-serif text-2xl italic text-ivory">{item.title}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-white/15 text-ivory transition hover:bg-white/10 sm:right-8 sm:top-8"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              go(-1)
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 text-ivory transition hover:bg-white/10 sm:left-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              go(1)
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 text-ivory transition hover:bg-white/10 sm:right-8"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
