import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { ServiceId } from '../content'
import { scrollToId } from '../lib/scroll'
import { BookingContext, emptyBooking, type BookingData } from './context'

export function BookingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BookingData>(emptyBooking)
  const [[step, direction], setPage] = useState<[number, 1 | -1]>([0, 1])
  const [sent, setSent] = useState(false)

  const update = useCallback((patch: Partial<BookingData>) => setData((d) => ({ ...d, ...patch })), [])

  const goTo = useCallback((next: number) => setPage(([current]) => [next, next >= current ? 1 : -1]), [])

  const reset = useCallback(() => {
    setData(emptyBooking)
    setPage([0, -1])
    setSent(false)
  }, [])

  const bookService = useCallback((id?: ServiceId) => {
    if (id) setData((d) => ({ ...d, service: id }))
    setSent(false)
    setPage(([current]) => [0, current > 0 ? -1 : 1])
    scrollToId('book', { offset: -24 })
  }, [])

  const value = useMemo(
    () => ({ data, update, step, direction, goTo, sent, setSent, bookService, reset }),
    [data, update, step, direction, goTo, sent, bookService, reset],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}
