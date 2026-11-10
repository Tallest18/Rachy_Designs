import { ArrowUp } from 'lucide-react'
import { brand, contact, services, showReviews } from '../../content'
import { anchorTo, scrollToId } from '../../lib/scroll'
import { enquiryLink } from '../../lib/whatsapp'
import { useBooking } from '../../booking/context'
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from '../ui/Icons'
import { Logo } from '../ui/Logo'

const YEAR = new Date().getFullYear()

const explore = [
  { id: 'story', label: 'Our Story' },
  { id: 'process', label: 'The Process' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Our Work' },
  ...(showReviews ? [{ id: 'reviews', label: 'Reviews' }] : []),
  { id: 'book', label: 'Book a Fitting' },
]

const socials = [
  { label: 'Instagram', href: contact.instagram.url, icon: InstagramIcon },
  { label: 'TikTok', href: contact.tiktok.url, icon: TikTokIcon },
  { label: 'Facebook', href: contact.facebook.url, icon: FacebookIcon },
  { label: 'WhatsApp', href: enquiryLink, icon: WhatsAppIcon },
]

const headingClass = 'font-display text-[0.62rem] tracking-[0.34em] text-gold-light'

export function Footer() {
  const { bookService } = useBooking()
  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <div className="container-luxe relative pb-10 pt-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo onDark />
            <p className="mt-7 max-w-sm font-serif text-2xl italic leading-snug text-ivory/80">{brand.slogan}.</p>
            <ul className="mt-8 flex gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-ivory/80 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    <s.icon className="h-4.5 w-4.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className={headingClass}>EXPLORE</p>
            <ul className="mt-6 space-y-3">
              {explore.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} onClick={anchorTo(l.id)} className="text-ivory/65 transition hover:text-gold-light">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className={headingClass}>SERVICES</p>
            <ul className="mt-6 space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <button type="button" onClick={() => bookService(s.id)} className="text-left text-ivory/65 transition hover:text-gold-light">
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
            <p className={`${headingClass} mt-10`}>STUDIO</p>
            <p className="mt-4 text-ivory/65">{contact.location.full}</p>
            <a href={contact.phoneHref} className="mt-2 inline-block text-ivory transition hover:text-gold-light">
              {contact.phoneDisplay}
            </a>
          </div>
        </div>

        <p className="mt-20 text-center font-script text-[clamp(2rem,4vw,3rem)] text-gold-light">{brand.closing} ♡</p>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm text-ivory/45 md:flex-row">
          <p>
            © {YEAR} {brand.name}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => scrollToId('top')}
            className="group inline-flex items-center gap-3 font-display text-[0.6rem] tracking-[0.3em] text-ivory/60 transition hover:text-gold-light"
          >
            BACK TO TOP
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition group-hover:-translate-y-1 group-hover:border-gold">
              <ArrowUp className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none -mb-[0.22em] select-none text-center font-display text-[24vw] leading-none text-outline-ivory"
      >
        RACHY
      </p>
    </footer>
  )
}
