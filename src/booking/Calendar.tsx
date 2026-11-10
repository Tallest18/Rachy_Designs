import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { addMonths, formatLong, formatMonth, isSameDay, monthGrid, startOfMonth } from '../lib/date'

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

interface CalendarProps {
  value: Date | null
  onChange: (date: Date) => void
  min: Date
  max: Date
  invalid?: boolean
}

export function Calendar({ value, onChange, min, max, invalid }: CalendarProps) {
  const [view, setView] = useState(() => startOfMonth(value ?? min))
  const cells = monthGrid(view)
  const canPrev = view > startOfMonth(min)
  const canNext = addMonths(view, 1) <= max

  return (
    <div
      className={clsx(
        'rounded-3xl border bg-white/60 p-4 sm:p-5',
        invalid ? 'border-wine/50' : 'border-ink/10',
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setView((v) => addMonths(v, -1))}
          disabled={!canPrev}
          aria-label="Previous month"
          className="grid h-9 w-9 place-items-center rounded-full text-ink transition hover:bg-ink/5 disabled:opacity-25"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="font-display text-sm tracking-[0.18em] text-ink" aria-live="polite">
          {formatMonth(view)}
        </p>
        <button
          type="button"
          onClick={() => setView((v) => addMonths(v, 1))}
          disabled={!canNext}
          aria-label="Next month"
          className="grid h-9 w-9 place-items-center rounded-full text-ink transition hover:bg-ink/5 disabled:opacity-25"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center" aria-hidden="true">
        {WEEKDAYS.map((d) => (
          <span key={d} className="pb-2 font-display text-[0.6rem] tracking-[0.2em] text-muted">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <span key={`empty-${i}`} />
          const disabled = day < min || day > max
          const selected = isSameDay(day, value)
          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onChange(day)}
              aria-pressed={selected}
              aria-label={formatLong(day)}
              className={clsx(
                'relative aspect-square rounded-full text-sm transition-all duration-300',
                selected
                  ? 'bg-ink font-medium text-gold-light shadow-lg shadow-ink/20'
                  : disabled
                    ? 'cursor-not-allowed text-ink/20'
                    : 'text-ink hover:bg-gold-pale',
              )}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
