import { ArrowUpRight, MapPin, Navigation } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { contact } from '../../content'
import { enquiryLink } from '../../lib/whatsapp'
import { Eyebrow } from '../ui/ChapterLabel'
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from '../ui/Icons'
import { MaskWords, Reveal } from '../ui/Reveal'

const channels: { label: string; value: string; href: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { label: 'WhatsApp', value: 'Chat with Rachy', href: enquiryLink, icon: WhatsAppIcon },
  { label: 'Instagram', value: contact.instagram.handle, href: contact.instagram.url, icon: InstagramIcon },
  { label: 'TikTok', value: contact.tiktok.handle, href: contact.tiktok.url, icon: TikTokIcon },
  { label: 'Facebook', value: contact.facebook.handle, href: contact.facebook.url, icon: FacebookIcon },
]

const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(contact.location.mapQuery)}&z=15&output=embed`
const mapsDirections = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.location.mapQuery)}`

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-ivory py-28 md:py-36">
      <div className="container-luxe grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <Eyebrow>Contact Us</Eyebrow>
          <h2 id="contact-title" className="mt-7 font-display text-[clamp(2.2rem,4.8vw,4rem)] leading-[1.04] text-ink">
            <MaskWords text="Let’s bring your" className="block" />
            <MaskWords
              text="ideas to life"
              delay={0.15}
              className="block font-serif font-normal italic normal-case text-gold-deep"
            />
          </h2>

          <Reveal delay={0.2}>
            <a
              href={contact.phoneHref}
              className="group mt-10 inline-flex items-center gap-4 font-display text-[clamp(1.7rem,3.6vw,2.8rem)] tracking-[0.06em] text-ink transition-colors hover:text-gold-deep"
            >
              {contact.phoneDisplay}
              <ArrowUpRight className="h-7 w-7 text-gold transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <p className="mt-2 text-muted">Call or WhatsApp · {contact.person}</p>
          </Reveal>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={0.1 + i * 0.08}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-white/50 p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_20px_40px_-25px_rgba(18,16,14,0.4)]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-gold-light transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[0.6rem] tracking-[0.28em] text-muted">{c.label.toUpperCase()}</span>
                    <span className="block truncate text-ink">{c.value}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-ink/30 transition-all duration-500 group-hover:text-gold-deep" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6">
          <div className="relative h-full min-h-[440px] overflow-hidden rounded-[28px] border border-ink/10 bg-sand">
            <iframe
              title={`Map showing ${contact.location.full}`}
              src={mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full grayscale-[55%] sepia-[20%]"
            />
            <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center gap-4 rounded-2xl bg-ivory/90 p-5 shadow-xl backdrop-blur-md sm:inset-x-6 sm:bottom-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-gold-light">
                <MapPin className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[0.6rem] tracking-[0.28em] text-muted">VISIT THE STUDIO</span>
                <span className="block text-ink">{contact.location.full}</span>
              </span>
              <a
                href={mapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-display text-[0.6rem] tracking-[0.2em] text-ink transition hover:border-ink hover:bg-ink hover:text-ivory"
              >
                <Navigation className="h-3.5 w-3.5" /> DIRECTIONS
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
