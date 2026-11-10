export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
export const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1)

export function addDays(d: Date, days: number) {
  const next = new Date(d)
  next.setDate(next.getDate() + days)
  return next
}

export function addMonths(d: Date, months: number) {
  return new Date(d.getFullYear(), d.getMonth() + months, 1)
}

export const isSameDay = (a: Date | null, b: Date | null) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

/** Monday-first calendar grid for the month containing `month`; empty cells are null. */
export function monthGrid(month: Date): (Date | null)[] {
  const first = startOfMonth(month)
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
  const leading = (first.getDay() + 6) % 7
  const cells: (Date | null)[] = Array.from({ length: leading }, () => null)
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(first.getFullYear(), first.getMonth(), day))
  }
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export const formatLong = (d: Date) =>
  d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

export const formatMonth = (d: Date) => d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

/** yyyy-mm-dd in local time (for <input type="date">). */
export const toInputDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export function fromInputDate(value: string): Date | null {
  const [y, m, d] = value.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}
