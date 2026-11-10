import { createContext, useContext } from 'react'
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

export interface BookingContextValue {
  data: BookingData
  update: (patch: Partial<BookingData>) => void
  step: number
  direction: 1 | -1
  goTo: (step: number) => void
  sent: boolean
  setSent: (sent: boolean) => void
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
