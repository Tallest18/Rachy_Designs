import { CalendarDays, MapPin, MessageCircle, Phone } from 'lucide-react'
import { contact } from '../content'
import { ChapterLabel } from '../components/ui/ChapterLabel'
import { WhatsAppIcon } from '../components/ui/Icons'
import { LogoMark } from '../components/ui/Logo'
import { MaskWords, Reveal } from '../components/ui/Reveal'
import { enquiryLink } from '../lib/whatsapp'
import { BookingWizard } from './BookingWizard'

const expectations = [
  { icon: CalendarDays, title: 'Pick a date that suits you', body: 'Choose your service, preferred day and time window.' },
  { icon: MessageCircle, title: 'Confirmed on WhatsApp', body: 'Rachy replies personally to confirm availability and the exact time.' },
  { icon: MapPin, title: `Studio at ${contact.location.short}`, body: 'Come in for measurements, or consult remotely if you’re away.' },
]

export function BookingSection() {
  return (
    <section id="book" aria-labelledby="book-title" className="relative overflow-hidden bg-ink py-28 text-ivory md:py-40">
      <div aria-hidden className="pointer-events-none absolute -right-60 -top-60 h-[700px] w-[700px] rounded-full bg-gold/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-72 -left-40 h-[600px] w-[600px] rounded-full bg-wine/40 blur-3xl" />
      <LogoMark className="pointer-events-none absolute -left-28 top-24 hidden w-[560px] opacity-[0.06] lg:block" />

      <div className="container-luxe relative grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5 lg:pt-6">
          <ChapterLabel id="book" onDark />
          <h2 id="book-title" className="mt-7 font-display text-[clamp(2.3rem,4.8vw,4rem)] leading-[1.02]">
            <MaskWords text="Begin your" className="block" />
            <MaskWords
              text="chapter"
              delay={0.15}
              className="block font-script text-[1.5em] font-normal normal-case leading-[0.95] text-gold-light"
            />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-ivory/65">
              Book a consultation or fitting in under a minute. Your request goes straight to Rachy, and she confirms
              every appointment personally.
            </p>
          </Reveal>

          <ul className="mt-12 space-y-7">
            {expectations.map((e, i) => (
              <Reveal as="li" key={e.title} delay={0.25 + i * 0.1} className="flex gap-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/30 text-gold-light">
                  <e.icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-display text-xs tracking-[0.2em]">{e.title.toUpperCase()}</p>
                  <p className="mt-1.5 text-ivory/55">{e.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.5}>
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-8 text-sm text-ivory/60">
              <span>Prefer to talk?</span>
              <a href={contact.phoneHref} className="inline-flex items-center gap-2 text-ivory transition hover:text-gold-light">
                <Phone className="h-4 w-4" /> {contact.phoneDisplay}
              </a>
              <a
                href={enquiryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ivory transition hover:text-gold-light"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" y={50}>
          <BookingWizard />
        </Reveal>
      </div>
    </section>
  )
}
