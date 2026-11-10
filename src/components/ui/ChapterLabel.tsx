import clsx from 'clsx'
import { chapters } from '../../content'

interface ChapterLabelProps {
  id: string
  onDark?: boolean
  className?: string
}

/** "Chapter IV · The Collection": the storytelling thread across sections. */
export function ChapterLabel({ id, onDark, className }: ChapterLabelProps) {
  const chapter = chapters.find((c) => c.id === id)
  if (!chapter) return null
  return (
    <p
      className={clsx(
        'flex items-center gap-3 font-display text-[0.66rem] uppercase tracking-[0.34em]',
        onDark ? 'text-gold-light' : 'text-gold-deep',
        className,
      )}
    >
      <span aria-hidden className="h-px w-10 bg-current opacity-60" />
      <span>Chapter {chapter.numeral}</span>
      <span aria-hidden className="opacity-50">
        ·
      </span>
      <span>{chapter.title}</span>
    </p>
  )
}

/** Simple eyebrow label for sections that aren't chapters. */
export function Eyebrow({ children, onDark, className }: { children: string; onDark?: boolean; className?: string }) {
  return (
    <p
      className={clsx(
        'flex items-center gap-3 font-display text-[0.66rem] uppercase tracking-[0.34em]',
        onDark ? 'text-gold-light' : 'text-gold-deep',
        className,
      )}
    >
      <span aria-hidden className="h-px w-10 bg-current opacity-60" />
      {children}
    </p>
  )
}
