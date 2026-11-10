import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { ServiceId } from '../content'
import { scrollToId } from '../lib/scroll'
import { BookingContext, emptyBooking, idleSubmission, type BookingData, type Submission } from './context'
import { bookingReference } from './notify'

export function BookingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BookingData>(emptyBooking)
  const [[step, direction], setPage] = useState<[number, 1 | -1]>([0, 1])
  const [reference, setReference] = useState(bookingReference)
  const [submission, setSubmission] = useState<Submission>(idleSubmission)

  const update = useCallback((patch: Partial<BookingData>) => setData((d) => ({ ...d, ...patch })), [])

  const goTo = useCallback((next: number) => setPage(([current]) => [next, next >= current ? 1 : -1]), [])

  const reset = useCallback(() => {
    setData(emptyBooking)
    setPage([0, -1])
    setSubmission(idleSubmission)
    setReference(bookingReference())
  }, [])

  const finished = submission.status !== 'idle' && submission.status !== 'submitting'

  const bookService = useCallback(
    (id?: ServiceId) => {
      if (finished) {
        // Starting over after a completed booking: clear the old details.
        setData({ ...emptyBooking, service: id ?? null })
        setReference(bookingReference())
        setSubmission(idleSubmission)
      } else if (id) {
        setData((d) => ({ ...d, service: id }))
      }
      setPage(([current]) => [0, current > 0 ? -1 : 1])
      scrollToId('book', { offset: -24 })
    },
    [finished],
  )

  const value = useMemo(
    () => ({ data, update, step, direction, goTo, reference, submission, setSubmission, bookService, reset }),
    [data, update, step, direction, goTo, reference, submission, bookService, reset],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}
