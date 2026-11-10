import clsx from 'clsx'
import { anchorTo } from '../../lib/scroll'
import { Monogram } from './Icons'

export function Logo({ onDark, className, onNavigate }: { onDark?: boolean; className?: string; onNavigate?: () => void }) {
  return (
    <a
      href="#top"
      onClick={anchorTo('top', onNavigate)}
      className={clsx('group flex items-center gap-3', className)}
      aria-label="Rachy Designs, back to top"
    >
      <Monogram className="h-10 w-10 transition-transform duration-700 ease-luxe group-hover:rotate-[360deg]" />
      <span className="leading-none">
        <span className={clsx('block font-display text-[1.05rem] tracking-[0.3em]', onDark ? 'text-ivory' : 'text-ink')}>
          RACHY
        </span>
        <span className="mt-1.5 flex items-center gap-1.5 font-display text-[0.5rem] tracking-[0.48em] text-gold">
          <span className="h-px w-3 bg-gold/70" />
          DESIGNS
          <span className="h-px w-3 bg-gold/70" />
        </span>
      </span>
    </a>
  )
}
