import { createContext, useContext, type Dispatch, type SetStateAction } from 'react'
import type { ServiceId } from '../content'

export type AppointmentMode = 'in-person' | 'remote'
export type FabricStatus = 'have' | 'need' | 'unsure'
export type SlotId = 'morning' | 'afternoon' | 'evening'

export interface BookingData {
  service: ServiceId | null
  occasion: string | null
  mode: AppointmentMode
  date: Date | null
  slot: SlotId | null
  name: string
  phone: string
  email: string
  neededBy: string
  fabric: FabricStatus | null
  notes: string
}

export const emptyBooking: BookingData = {
  service: null,
  occasion: null,
  mode: 'in-person',
  date: null,
  slot: null,
  name: '',
  phone: '',
  email: '',
  neededBy: '',
  fabric: null,
  notes: '',
}

export const STEPS = ['Service', 'Schedule', 'Details', 'Confirm'] as const

/**
 * - idle: still filling in the form
 * - submitting: emailing the booking to Rachy
 * - notified: Rachy has the booking in her inbox (WhatsApp is optional follow-up)
 * - whatsapp-only: email alerts aren't set up; the client must press send in WhatsApp
 * - failed: the email couldn't be delivered; the client is asked to send it on WhatsApp
 */
export type SubmissionStatus = 'idle' | 'submitting' | 'notified' | 'whatsapp-only' | 'failed'

export interface Submission {
  status: SubmissionStatus
  reference: string | null
  error?: string
}

export const idleSubmission: Submission = { status: 'idle', reference: null }

export interface BookingContextValue {
  data: BookingData
  update: (patch: Partial<BookingData>) => void
  step: number
  direction: 1 | -1
  goTo: (step: number) => void
  /** Reference code for the booking in progress, e.g. RD-7K3QF. */
  reference: string
  submission: Submission
  setSubmission: Dispatch<SetStateAction<Submission>>
  /** Pre-select a service, reset the flow and scroll to the booking section. */
  bookService: (id?: ServiceId) => void
  reset: () => void
}

export const BookingContext = createContext<BookingContextValue | null>(null)

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>')
  return ctx
}
