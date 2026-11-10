import { appointmentModes, brand, contact, services, timeSlots } from '../content'
import { formatLong, fromInputDate } from '../lib/date'
import type { BookingData } from './context'

export const fabricLabels = {
  have: 'I have my fabric',
  need: 'I need help sourcing fabric',
  unsure: 'Not sure yet',
} as const

export const serviceTitle = (data: BookingData) => services.find((s) => s.id === data.service)?.title ?? ''
export const slotInfo = (data: BookingData) => timeSlots.find((t) => t.id === data.slot)
export const modeInfo = (data: BookingData) => appointmentModes.find((m) => m.id === data.mode)

export function formatNeededBy(value: string) {
  const d = fromInputDate(value)
  return d ? formatLong(d) : ''
}

/**
 * Converts a Nigerian phone number as typed by a client (0801 234 5678,
 * +234 801…, 234801…) into the digits-only international form wa.me needs.
 */
export function toWhatsAppNumber(phone: string) {
  let digits = phone.replace(/\D/g, '')
  if (digits.startsWith('00')) digits = digits.slice(2)
  if (digits.startsWith('234')) return digits
  if (digits.startsWith('0') && digits.length === 11) return `234${digits.slice(1)}`
  if (digits.length === 10 && /^[789]/.test(digits)) return `234${digits}`
  return digits
}

const shortDate = (d: Date) => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })

/**
 * Fields for the email Rachy receives for every booking. Web3Forms shows each
 * field as a row; `subject`, `from_name` and `replyto` are special fields.
 */
export function ownerEmailFields(data: BookingData, reference: string): Record<string, string> {
  const slot = slotInfo(data)
  const name = data.name.trim()
  const firstName = name.split(/\s+/)[0] ?? name
  const replyText = `Hello ${firstName}, this is Rachy Designs about your booking ${reference} for ${serviceTitle(data)}. `
  const submittedAt = new Date().toLocaleString('en-GB', {
    timeZone: 'Africa/Lagos',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const fields: Record<string, string> = {
    subject: `New booking ${reference}: ${serviceTitle(data)}${data.date ? `, ${shortDate(data.date)}` : ''} (${name})`,
    from_name: `${brand.name} Website`,
    'Booking reference': reference,
    'Client name': name,
    'Client phone': data.phone.trim(),
    'Reply on WhatsApp': `https://wa.me/${toWhatsAppNumber(data.phone)}?text=${encodeURIComponent(replyText)}`,
    'Client email': data.email.trim() || 'Not provided',
    Service: serviceTitle(data),
    Occasion: data.occasion ?? 'Not specified',
    Appointment: `${modeInfo(data)?.title ?? ''}${data.mode === 'in-person' ? ` (${contact.location.short})` : ''}`,
    'Preferred date': data.date ? formatLong(data.date) : 'Not specified',
    'Preferred time': slot ? `${slot.label} (${slot.range})` : 'Not specified',
    'Outfit needed by': data.neededBy ? formatNeededBy(data.neededBy) : 'Not specified',
    Fabric: data.fabric ? fabricLabels[data.fabric] : 'Not specified',
    'Notes / ideas': data.notes.trim() || 'None',
    'Submitted at': `${submittedAt} (Nigeria time)`,
  }
  if (data.email.trim()) fields.replyto = data.email.trim()
  return fields
}

/** WhatsApp message sent to Rachy Designs. Uses WhatsApp *bold* formatting. */
export function buildBookingMessage(data: BookingData, reference?: string) {
  const slot = slotInfo(data)
  const lines = [
    `Hello ${brand.name}! ✨ I’d like to book an appointment.`,
    reference && `*Booking ref:* ${reference}`,
    '',
    `*Service:* ${serviceTitle(data)}`,
    data.occasion && `*Occasion:* ${data.occasion}`,
    `*Appointment:* ${modeInfo(data)?.title ?? ''}${data.mode === 'in-person' ? ` (${contact.location.short})` : ''}`,
    data.date && `*Preferred date:* ${formatLong(data.date)}`,
    slot && `*Preferred time:* ${slot.label} (${slot.range})`,
    data.neededBy && `*Outfit needed by:* ${formatNeededBy(data.neededBy)}`,
    data.fabric && `*Fabric:* ${fabricLabels[data.fabric]}`,
    '',
    `*Name:* ${data.name.trim()}`,
    `*Phone:* ${data.phone.trim()}`,
    data.email.trim() && `*Email:* ${data.email.trim()}`,
    data.notes.trim() && ['', `*Notes / ideas:*`, data.notes.trim()].join('\n'),
    '',
    'Please let me know if this time works. Thank you!',
  ]
  return lines
    .filter((l): l is string => typeof l === 'string')
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
}

/** Creates a calendar (.ics) file so the client can save the requested slot. */
export function downloadCalendarFile(data: BookingData) {
  const slot = slotInfo(data)
  if (!data.date || !slot) return

  const stamp = (d: Date, hour: number) =>
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}T${String(hour).padStart(2, '0')}0000`
  const now = new Date()
  const utcStamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const escape = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Rachy Designs//Booking//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${now.getTime()}@rachydesigns`,
    `DTSTAMP:${utcStamp}`,
    `DTSTART:${stamp(data.date, slot.start)}`,
    `DTEND:${stamp(data.date, slot.end)}`,
    `SUMMARY:${escape(`${brand.name}: ${serviceTitle(data)} (awaiting confirmation)`)}`,
    `LOCATION:${escape(data.mode === 'in-person' ? contact.location.full : 'WhatsApp call')}`,
    `DESCRIPTION:${escape(`Requested ${slot.label.toLowerCase()} window (${slot.range}). ${brand.name} will confirm the exact time on WhatsApp: ${contact.phoneDisplay}.`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'rachy-designs-appointment.ics'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
