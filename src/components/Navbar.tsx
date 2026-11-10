import clsx from 'clsx'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { contact, showReviews } from '../content'
import { useActiveSection } from '../hooks/useActiveSection'
import { EASE, EASE_IN_OUT } from '../lib/motion'
import { anchorTo, lockScroll, unlockScroll } from '../lib/scroll'
import { enquiryLink } from '../lib/whatsapp'
import { ButtonLink } from './ui/Button'
import { InstagramIcon, WhatsAppIcon } from './ui/Icons'
import { Logo } from './ui/Logo'

const links = [
  { id: 'story', label: 'Story' },
  { id: 'process', label: 'Process' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Our Work' },
  ...(showReviews ? [{ id: 'reviews', label: 'Reviews' }] : []),
  { id: 'contact', label: 'Contact' },
]
const linkIds = links.map((l) => l.id)

export function Navbar({ ready }: { ready: boolean }) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(linkIds)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > previous && y > 480)
  })

  useEffect(() => {
    if (!open) return
    lockScroll()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      unlockScroll()
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -110 }}
        animate={{ y: !ready || (hidden && !open) ? -110 : 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div
          className={clsx(
            'transition-[background-color,box-shadow,border-color] duration-500',
            open
              ? 'border-b border-transparent bg-transparent'
              : scrolled
                ? 'border-b border-ink/[0.06] bg-ivory/80 shadow-[0_10px_40px_-20px_rgba(18,16,14,0.25)] backdrop-blur-xl'
                : 'border-b border-transparent bg-transparent',
          )}
        >
          <nav aria-label="Main" className="container-luxe flex h-20 items-center justify-between">
            <Logo onNavigate={close} />

            <ul className="hidden items-center gap-9 lg:flex">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={anchorTo(link.id)}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={clsx(
                      'group relative py-2 font-display text-[0.68rem] uppercase tracking-[0.26em] transition-colors duration-300',
                      active === link.id ? 'text-ink' : 'text-ink/60 hover:text-ink',
                    )}
                  >
                    {link.label}
                    <span
                      className={clsx(
                        'absolute -bottom-0.5 left-0 h-px w-full bg-gold transition-transform duration-500 ease-luxe',
                        active === link.id
                          ? 'origin-left scale-x-100'
                          : 'origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100',
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <ButtonLink href="#book" onClick={anchorTo('book')} className="px-6! py-3!">
                  Book a Fitting
                </ButtonLink>
              </div>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="grid h-12 w-12 place-items-center rounded-full text-ink transition hover:bg-ink/5 lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ivory px-5 pb-10 pt-28 sm:px-8 lg:hidden"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.75, ease: EASE_IN_OUT }}
          >
            <ul className="flex flex-1 flex-col justify-center gap-2">
              {[...links, { id: 'book', label: 'Book a Fitting' }].map((link, i) => (
                <li key={link.id} className="overflow-hidden">
                  <motion.a
                    href={`#${link.id}`}
                    onClick={anchorTo(link.id, close)}
                    className="flex items-baseline gap-4 py-2 font-display text-[clamp(1.9rem,8vw,3rem)] tracking-[0.06em] text-ink"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.06 }}
                  >
                    <span className="font-sans text-xs tracking-normal text-gold-deep">0{i + 1}</span>
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="flex items-center justify-between border-t border-ink/10 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <a href={contact.phoneHref} className="font-display text-sm tracking-[0.15em] text-ink">
                {contact.phoneDisplay}
              </a>
              <div className="flex gap-2">
                <a
                  href={enquiryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink/15"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
                <a
                  href={contact.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink/15"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

