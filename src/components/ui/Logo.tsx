import clsx from 'clsx'
import logoMark from '../../assets/brand/logo-mark.png'
import { anchorTo } from '../../lib/scroll'

/** The brand mark from the Rachy Designs flyer: the gold "R" with the dress form. */
export function LogoMark({ className }: { className?: string }) {
  return <img src={logoMark} alt="" aria-hidden="true" draggable={false} className={clsx('select-none', className)} />
}

export function Logo({ onDark, className, onNavigate }: { onDark?: boolean; className?: string; onNavigate?: () => void }) {
  return (
    <a
      href="#top"
      onClick={anchorTo('top', onNavigate)}
      className={clsx('group flex items-center gap-3', className)}
      aria-label="Rachy Designs, back to top"
    >
      <LogoMark className="h-11 w-auto transition-transform duration-700 ease-luxe group-hover:scale-105" />
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
