import clsx from 'clsx'
import {
  ArrowLeft,
  ArrowRight,
  CalendarPlus,
  Check,
  Info,
  LoaderCircle,
  MailCheck,
  MapPin,
  Phone,
  Pencil,
  RotateCcw,
  Sun,
  Sunrise,
  Sunset,
  Video,
} from 'lucide-react'
import { AnimatePresence, motion, type Variants } from 'motion/react'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Button, ButtonLink } from '../components/ui/Button'
import { WhatsAppIcon } from '../components/ui/Icons'
import { appointmentModes, contact, occasions, services, timeSlots } from '../content'
import { addDays, formatLong, startOfDay, toInputDate } from '../lib/date'
import { EASE } from '../lib/motion'
import { scrollToId } from '../lib/scroll'
import { whatsappLink } from '../lib/whatsapp'
import { Calendar } from './Calendar'
import { STEPS, useBooking, type BookingData, type Submission } from './context'
import {
  buildBookingMessage,
  downloadCalendarFile,
  fabricLabels,
  formatNeededBy,
  modeInfo,
  serviceTitle,
  slotInfo,
} from './message'
import { notificationsEnabled, notifyOwner } from './notify'

/** Submissions completed faster than this are almost certainly bots. */
const MIN_HUMAN_MS = 4000

type Errors = Partial<Record<keyof BookingData, string>>

function validate(step: number, data: BookingData): Errors {
  const e: Errors = {}
  if (step === 0 && !data.service) e.service = 'Please choose a service to continue.'
  if (step === 1) {
    if (!data.date) e.date = 'Pick your preferred date.'
    if (!data.slot) e.slot = 'Pick a preferred time of day.'
  }
  if (step === 2) {
    if (data.name.trim().length < 2) e.name = 'Please tell us your name.'
    const digits = data.phone.replace(/\D/g, '')
    if (digits.length < 10 || digits.length > 14) e.phone = 'Enter a valid phone / WhatsApp number.'
    if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      e.email = 'That email doesn’t look quite right.'
  }
  return e
}

const slide: Variants = {
  enter: (d: number) => ({ opacity: 0, x: d * 28 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
  exit: (d: number) => ({ opacity: 0, x: d * -28, transition: { duration: 0.25, ease: EASE } }),
}

const slotIcons = { morning: Sunrise, afternoon: Sun, evening: Sunset }
const modeIcons = { 'in-person': MapPin, remote: Video }

/* ───────────────────────── Small building blocks ───────────────────────── */

const labelClass = 'font-display text-[0.64rem] uppercase tracking-[0.24em] text-ink'

function Optional() {
  return <span className="ml-2 font-sans text-[0.7rem] normal-case tracking-normal text-muted">(optional)</span>
}

function FieldError({ id, message }: { id?: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          id={id}
          role="alert"
          className="mt-2 text-sm text-wine"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

const inputClass = (invalid: boolean) =>
  clsx(
    'w-full border-0 border-b bg-transparent px-0 py-3 text-base text-ink transition-[border-color,box-shadow] duration-300 placeholder:text-ink/30 focus:outline-none focus-visible:outline-none',
    invalid
      ? 'border-wine shadow-[0_1px_0_0_var(--color-wine)]'
      : 'border-ink/20 focus:border-gold focus:shadow-[0_1px_0_0_var(--color-gold)]',
  )

function Field({
  label,
  required,
  error,
  className,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  className?: string
  children: (props: { id: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }) => ReactNode
}) {
  const id = useId()
  const errorId = `${id}-error`
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? <span className="ml-1 text-gold-deep">*</span> : <Optional />}
      </label>
      {children({ id, 'aria-invalid': error ? true : undefined, 'aria-describedby': error ? errorId : undefined })}
      <FieldError id={errorId} message={error} />
    </div>
  )
}

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={clsx(
        'rounded-full border px-4 py-2 text-sm transition-all duration-300',
        selected ? 'border-ink bg-ink text-ivory' : 'border-ink/15 bg-white/40 text-ink/80 hover:border-ink/40',
      )}
    >
      {children}
    </button>
  )
}

function Tick({ on }: { on: boolean }) {
  return (
    <span
      className={clsx(
        'grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all duration-300',
        on ? 'border-ink bg-ink text-gold-light' : 'border-ink/20',
      )}
    >
      {on && <Check className="h-3.5 w-3.5" />}
    </span>
  )
}

function StepHeading({ eyebrow, title, focus, center }: { eyebrow: string; title: string; focus: boolean; center?: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (focus) ref.current?.focus({ preventScroll: true })
  }, [focus])
  return (
    <div className={clsx(center && 'text-center')}>
      <p className="font-display text-[0.6rem] tracking-[0.34em] text-gold-deep">{eyebrow.toUpperCase()}</p>
      <h3
        ref={ref}
        tabIndex={-1}
        className="mt-2 font-serif text-[clamp(1.7rem,3vw,2.3rem)] italic leading-tight text-ink focus:outline-none"
      >
        {title}
      </h3>
    </div>
  )
}

function Stepper({ step, onJump }: { step: number; onJump: (i: number) => void }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3" aria-label="Booking progress">
      {STEPS.map((label, i) => {
        const done = i < step
        const current = i === step
        return (
          <li key={label} className={clsx('flex items-center gap-2 sm:gap-3', i < STEPS.length - 1 && 'flex-1')}>
            <button
              type="button"
              disabled={!done}
              onClick={() => onJump(i)}
              aria-current={current ? 'step' : undefined}
              aria-label={`${label}${done ? ' (completed, edit)' : current ? ' (current step)' : ''}`}
              className="flex items-center gap-2.5 disabled:cursor-default"
            >
              <span
                className={clsx(
                  'grid h-8 w-8 shrink-0 place-items-center rounded-full border font-display text-[0.7rem] transition-all duration-500',
                  current
                    ? 'border-ink bg-ink text-gold-light'
                    : done
                      ? 'border-gold bg-gold text-ink'
                      : 'border-ink/15 text-ink/40',
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span
                className={clsx(
                  'hidden font-display text-[0.6rem] tracking-[0.2em] md:block',
                  current ? 'text-ink' : 'text-ink/45',
                )}
              >
                {label.toUpperCase()}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <span className="relative h-px flex-1 overflow-hidden bg-ink/10">
                <span
                  className="absolute inset-0 origin-left bg-gold transition-transform duration-700 ease-luxe"
                  style={{ transform: `scaleX(${done ? 1 : 0})` }}
                />
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}

function SummaryRow({ label, children, onEdit }: { label: string; children: ReactNode; onEdit?: () => void }) {
  return (
    <div className="flex items-start gap-4 px-5 py-4">
      <dt className="w-28 shrink-0 pt-0.5 font-display text-[0.6rem] tracking-[0.22em] text-muted sm:w-32">
        {label.toUpperCase()}
      </dt>
      <dd className="min-w-0 flex-1 break-words text-ink">{children}</dd>
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          aria-label={`Edit ${label}`}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition hover:bg-ink/5 hover:text-ink"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}

/* ───────────────────────── Finished screen ───────────────────────── */

function Finished({
  submission,
  data,
  whatsappHref,
  focus,
  retrying,
  onRetry,
  onReset,
}: {
  submission: Submission
  data: BookingData
  whatsappHref: string
  focus: boolean
  retrying: boolean
  onRetry: () => void
  onReset: () => void
}) {
  const [openedWhatsApp, setOpenedWhatsApp] = useState(false)
  const notified = submission.status === 'notified'
  const failed = submission.status === 'failed'
  const firstName = data.name.trim().split(/\s+/)[0]
  const ref = submission.reference ?? ''

  const copy = notified
    ? {
        eyebrow: `Booking received · ${ref}`,
        title: 'Rachy has your booking',
        body: `Thank you, ${firstName}! Your request is with Rachy Designs, and she’ll confirm your appointment on WhatsApp or by phone (${data.phone.trim()}) shortly.`,
      }
    : failed
      ? {
          eyebrow: `One last step · ${ref}`,
          title: 'Send your booking on WhatsApp',
          body: 'We couldn’t reach our booking inbox just now, so please send your booking on WhatsApp instead. Your details are already written for you; just press send.',
        }
      : {
          eyebrow: `One last step · ${ref}`,
          title: 'Press send in WhatsApp',
          body: 'WhatsApp has opened with your booking details already written. Press send so Rachy receives it, and she’ll confirm your appointment personally.',
        }

  return (
    <div className="py-2 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.15 }}
        className={clsx(
          'mx-auto mb-8 grid h-20 w-20 place-items-center rounded-full shadow-[0_20px_40px_-15px_rgba(184,138,62,0.8)]',
          notified ? 'bg-gold-gradient text-ink' : 'bg-whatsapp text-white',
        )}
      >
        {notified ? <MailCheck className="h-9 w-9" strokeWidth={1.6} /> : <WhatsAppIcon className="h-9 w-9" />}
      </motion.div>

      <StepHeading eyebrow={copy.eyebrow} title={copy.title} focus={focus} center />
      <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted" role="status">
        {copy.body}
      </p>
      {notified && (
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          Want to share pictures of styles you love? Continue the chat on WhatsApp.
        </p>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          variant={notified ? 'ghost' : 'gold'}
          onClick={() => setOpenedWhatsApp(true)}
        >
          <WhatsAppIcon className="h-4 w-4" />
          {notified ? 'Continue on WhatsApp' : failed ? 'Send on WhatsApp' : 'Open WhatsApp again'}
        </ButtonLink>
        {failed ? (
          <Button variant="ghost" onClick={onRetry} disabled={retrying} aria-busy={retrying}>
            {retrying ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
            {retrying ? 'Retrying…' : 'Try again'}
          </Button>
        ) : (
          <Button variant="ghost" onClick={() => downloadCalendarFile(data)}>
            <CalendarPlus className="h-4 w-4" /> Add to calendar
          </Button>
        )}
      </div>

      {!notified && openedWhatsApp && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-5 max-w-sm text-sm text-umber"
        >
          Sent it? You’re all set. Rachy will be in touch to confirm.
        </motion.p>
      )}

      <p className="mt-6 text-sm text-muted">
        Questions? Call{' '}
        <a href={contact.phoneHref} className="inline-flex items-center gap-1 text-ink underline-offset-4 hover:underline">
          <Phone className="h-3.5 w-3.5" /> {contact.phoneDisplay}
        </a>
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
      >
        <RotateCcw className="h-3.5 w-3.5" /> Start a new booking
      </button>
    </div>
  )
}

/* ───────────────────────── The wizard ───────────────────────── */

export function BookingWizard() {
  const { data, update, step, direction, goTo, reference, submission, setSubmission, reset } = useBooking()
  const [errors, setErrors] = useState<Errors>({})
  const [interacted, setInteracted] = useState(false)
  const [trap, setTrap] = useState('')
  const [startedAt] = useState(() => Date.now())
  const [retrying, setRetrying] = useState(false)
  const [today] = useState(() => startOfDay(new Date()))
  const minDate = addDays(today, 1)
  const maxDate = addDays(today, 120)
  const cardRef = useRef<HTMLDivElement>(null)

  const bringIntoView = () => {
    const top = cardRef.current?.getBoundingClientRect().top ?? 0
    if (top < 0) scrollToId('booking-card', { offset: -100 })
  }

  const set = (patch: Partial<BookingData>) => {
    update(patch)
    setErrors((prev) => {
      const next = { ...prev }
      for (const key of Object.keys(patch)) delete next[key as keyof BookingData]
      return next
    })
  }

  const jump = (i: number) => {
    setErrors({})
    setInteracted(true)
    goTo(i)
    bringIntoView()
  }

  const next = () => {
    const e = validate(step, data)
    setErrors(e)
    if (Object.keys(e).length) return
    jump(step + 1)
  }

  const submitting = submission.status === 'submitting'
  const done = submission.status !== 'idle' && !submitting
  const whatsappHref = whatsappLink(buildBookingMessage(data, reference))

  /** Emails the booking to Rachy. Only updates state if this booking is still the current one. */
  const deliver = async (): Promise<Submission> => {
    const looksLikeBot = trap.trim() !== '' || Date.now() - startedAt < MIN_HUMAN_MS
    if (looksLikeBot) return { status: 'notified', reference } // silently drop, but look successful
    const result = await notifyOwner(data, reference)
    return result.ok ? { status: 'notified', reference } : { status: 'failed', reference, error: result.error }
  }

  const confirm = async () => {
    if (submitting) return
    setInteracted(true)
    setSubmission({ status: 'submitting', reference })
    const outcome = await deliver()
    setSubmission((prev) => (prev.reference === reference && prev.status === 'submitting' ? outcome : prev))
  }

  const retry = async () => {
    if (retrying) return
    setRetrying(true)
    const outcome = await deliver()
    setRetrying(false)
    setSubmission((prev) => (prev.reference === reference ? outcome : prev))
  }

  /** Without email alerts configured, the WhatsApp message IS the booking. */
  const handOffToWhatsApp = () => {
    setInteracted(true)
    setSubmission({ status: 'whatsapp-only', reference })
  }

  const slot = slotInfo(data)

  return (
    <div
      id="booking-card"
      ref={cardRef}
      className="relative rounded-[32px] bg-ivory p-6 text-ink shadow-[0_60px_120px_-50px_rgba(0,0,0,0.85)] ring-1 ring-gold/20 sm:p-10"
    >
      {import.meta.env.DEV && !notificationsEnabled && (
        <p className="mb-6 rounded-2xl border border-dashed border-wine/40 px-4 py-3 text-xs leading-relaxed text-wine">
          <strong>Developer note:</strong> email alerts are off, so bookings only reach Rachy if the client presses
          send in WhatsApp. Add a Web3Forms key in <code>src/content.ts</code> (<code>bookingNotifications</code>).
          This note is never shown on the live site.
        </p>
      )}
      {!done && <Stepper step={step} onJump={(i) => !submitting && jump(i)} />}

      <div className={clsx(!done && 'mt-9')}>
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={done ? 'done' : step}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* ── Step 1: Service ── */}
            {!done && step === 0 && (
              <>
                <StepHeading eyebrow="Step 1 of 4" title="What would you like made?" focus={interacted} />
                <div role="radiogroup" aria-label="Service" className="mt-6 grid gap-3 sm:grid-cols-2">
                  {services.map((s) => {
                    const selected = data.service === s.id
                    return (
                      <button
                        key={s.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => set({ service: s.id })}
                        className={clsx(
                          'flex items-center gap-4 rounded-2xl border p-3 pr-4 text-left transition-all duration-300',
                          selected
                            ? 'border-gold bg-gold-pale/50 shadow-[0_14px_30px_-18px_rgba(184,138,62,0.8)]'
                            : 'border-ink/10 bg-white/50 hover:border-ink/30',
                        )}
                      >
                        <img src={s.image} alt="" className="h-16 w-14 shrink-0 rounded-xl object-cover object-top" />
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-[0.74rem] tracking-[0.12em]">{s.title}</span>
                          <span className="mt-1 block text-sm leading-snug text-muted">{s.short}</span>
                        </span>
                        <Tick on={selected} />
                      </button>
                    )
                  })}
                </div>
                <FieldError message={errors.service} />

                <fieldset className="mt-9">
                  <legend className={labelClass}>
                    What’s the occasion?
                    <Optional />
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {occasions.map((o) => (
                      <Chip key={o} selected={data.occasion === o} onClick={() => set({ occasion: data.occasion === o ? null : o })}>
                        {o}
                      </Chip>
                    ))}
                  </div>
                </fieldset>
              </>
            )}

            {/* ── Step 2: Schedule ── */}
            {!done && step === 1 && (
              <>
                <StepHeading eyebrow="Step 2 of 4" title="When suits you?" focus={interacted} />

                <div role="radiogroup" aria-label="Appointment type" className="mt-6 grid gap-3 sm:grid-cols-2">
                  {appointmentModes.map((m) => {
                    const selected = data.mode === m.id
                    const Icon = modeIcons[m.id]
                    return (
                      <button
                        key={m.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => set({ mode: m.id })}
                        className={clsx(
                          'flex items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300',
                          selected ? 'border-gold bg-gold-pale/50' : 'border-ink/10 bg-white/50 hover:border-ink/30',
                        )}
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-gold-light">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-[0.74rem] tracking-[0.14em]">{m.title.toUpperCase()}</span>
                          <span className="mt-1 block text-sm leading-snug text-muted">{m.body}</span>
                        </span>
                        <Tick on={selected} />
                      </button>
                    )
                  })}
                </div>

                <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_1fr]">
                  <div>
                    <p className={labelClass}>Preferred date</p>
                    <div className="mt-3">
                      <Calendar
                        value={data.date}
                        onChange={(d) => set({ date: d })}
                        min={minDate}
                        max={maxDate}
                        invalid={!!errors.date}
                      />
                    </div>
                    <FieldError message={errors.date} />
                  </div>
                  <div>
                    <p className={labelClass}>Preferred time</p>
                    <div role="radiogroup" aria-label="Preferred time" className="mt-3 grid gap-3">
                      {timeSlots.map((t) => {
                        const selected = data.slot === t.id
                        const Icon = slotIcons[t.id]
                        return (
                          <button
                            key={t.id}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => set({ slot: t.id })}
                            className={clsx(
                              'flex items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300',
                              selected ? 'border-gold bg-gold-pale/50' : 'border-ink/10 bg-white/50 hover:border-ink/30',
                              errors.slot && !selected && 'border-wine/40',
                            )}
                          >
                            <Icon className="h-5 w-5 text-gold-deep" strokeWidth={1.5} />
                            <span className="flex-1">
                              <span className="block font-display text-[0.7rem] tracking-[0.2em]">{t.label.toUpperCase()}</span>
                              <span className="text-sm text-muted">{t.range}</span>
                            </span>
                            <Tick on={selected} />
                          </button>
                        )
                      })}
                    </div>
                    <FieldError message={errors.slot} />
                    {data.date && (
                      <p className="mt-5 text-sm text-muted">
                        <span className="font-display text-[0.6rem] tracking-[0.2em] text-ink">SELECTED · </span>
                        {formatLong(data.date)}
                      </p>
                    )}
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      Rachy will confirm the exact time with you on WhatsApp.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* ── Step 3: Details ── */}
            {!done && step === 2 && (
              <>
                <StepHeading eyebrow="Step 3 of 4" title="Tell us about you" focus={interacted} />
                <div className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  <Field label="Full name" required error={errors.name}>
                    {(p) => (
                      <input
                        {...p}
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={data.name}
                        onChange={(e) => set({ name: e.target.value })}
                        className={inputClass(!!errors.name)}
                      />
                    )}
                  </Field>
                  <Field label="Phone / WhatsApp" required error={errors.phone}>
                    {(p) => (
                      <input
                        {...p}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="0801 234 5678"
                        value={data.phone}
                        onChange={(e) => set({ phone: e.target.value })}
                        className={inputClass(!!errors.phone)}
                      />
                    )}
                  </Field>
                  <Field label="Email" error={errors.email}>
                    {(p) => (
                      <input
                        {...p}
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={data.email}
                        onChange={(e) => set({ email: e.target.value })}
                        className={inputClass(!!errors.email)}
                      />
                    )}
                  </Field>
                  <Field label="Outfit needed by">
                    {(p) => (
                      <input
                        {...p}
                        type="date"
                        min={toInputDate(minDate)}
                        value={data.neededBy}
                        onChange={(e) => set({ neededBy: e.target.value })}
                        className={clsx(inputClass(false), '[color-scheme:light]')}
                      />
                    )}
                  </Field>

                  <fieldset className="sm:col-span-2">
                    <legend className={labelClass}>
                      Fabric
                      <Optional />
                    </legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(Object.keys(fabricLabels) as (keyof typeof fabricLabels)[]).map((k) => (
                        <Chip key={k} selected={data.fabric === k} onClick={() => set({ fabric: data.fabric === k ? null : k })}>
                          {fabricLabels[k]}
                        </Chip>
                      ))}
                    </div>
                  </fieldset>

                  <Field label="Your ideas & inspiration" className="sm:col-span-2">
                    {(p) => (
                      <textarea
                        {...p}
                        rows={4}
                        maxLength={1000}
                        placeholder="Describe the style, colours or fit you have in mind. You can send pictures on WhatsApp after booking."
                        value={data.notes}
                        onChange={(e) => set({ notes: e.target.value })}
                        className={clsx(inputClass(false), 'resize-none')}
                      />
                    )}
                  </Field>

                  {/* Honeypot: invisible to people, irresistible to spam bots. */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label>
                      Company website
                      <input
                        type="text"
                        name="company_website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={trap}
                        onChange={(e) => setTrap(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* ── Step 4: Confirm ── */}
            {!done && step === 3 && (
              <>
                <StepHeading eyebrow="Step 4 of 4" title="Review your booking" focus={interacted} />
                <dl className="mt-6 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white/50">
                  <SummaryRow label="Service" onEdit={() => jump(0)}>
                    {serviceTitle(data)}
                    {data.occasion && <span className="text-muted"> · {data.occasion}</span>}
                  </SummaryRow>
                  <SummaryRow label="When" onEdit={() => jump(1)}>
                    {data.date && formatLong(data.date)}
                    {slot && (
                      <span className="block text-sm text-muted">
                        {slot.label} ({slot.range}) · {modeInfo(data)?.title}
                      </span>
                    )}
                  </SummaryRow>
                  <SummaryRow label="Contact" onEdit={() => jump(2)}>
                    {data.name}
                    <span className="block text-sm text-muted">
                      {data.phone}
                      {data.email && ` · ${data.email}`}
                    </span>
                  </SummaryRow>
                  {data.neededBy && <SummaryRow label="Needed by">{formatNeededBy(data.neededBy)}</SummaryRow>}
                  {data.fabric && <SummaryRow label="Fabric">{fabricLabels[data.fabric]}</SummaryRow>}
                  {data.notes.trim() && (
                    <SummaryRow label="Notes">
                      <span className="whitespace-pre-line text-sm">{data.notes.trim()}</span>
                    </SummaryRow>
                  )}
                </dl>
                <p className="mt-6 flex gap-3 rounded-2xl bg-gold-pale/50 p-4 text-sm leading-relaxed text-umber">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                  {notificationsEnabled
                    ? 'Rachy is notified the moment you confirm. You can then continue the conversation on WhatsApp. Your appointment is confirmed once she replies.'
                    : 'The button below opens WhatsApp with your booking details ready. Press send in WhatsApp so Rachy receives it. Your appointment is confirmed once she replies.'}
                </p>
              </>
            )}

            {/* ── Finished ── */}
            {done && (
              <Finished
                submission={submission}
                data={data}
                whatsappHref={whatsappHref}
                focus={interacted}
                retrying={retrying}
                onRetry={retry}
                onReset={reset}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {!done && (
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => jump(step - 1)}
              disabled={submitting}
              className="inline-flex items-center gap-2 font-display text-[0.66rem] tracking-[0.24em] text-ink/65 transition hover:text-ink disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" /> BACK
            </button>
          ) : (
            <span className="text-sm text-muted">Takes less than a minute</span>
          )}
          {step < STEPS.length - 1 ? (
            <Button onClick={next}>
              Continue <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
            </Button>
          ) : notificationsEnabled ? (
            <Button variant="gold" onClick={confirm} disabled={submitting} aria-busy={submitting}>
              {submitting ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Confirm booking <Check className="h-4 w-4" />
                </>
              )}
            </Button>
          ) : (
            <ButtonLink
              variant="gold"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handOffToWhatsApp}
            >
              <WhatsAppIcon className="h-4 w-4" /> Send on WhatsApp
            </ButtonLink>
          )}
        </div>
      )}
    </div>
  )
}
