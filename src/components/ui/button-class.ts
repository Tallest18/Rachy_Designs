import clsx from 'clsx'

export type ButtonVariant = 'primary' | 'gold' | 'ghost' | 'light'

const base =
  'group/btn relative isolate inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-4 font-display text-[0.7rem] font-medium uppercase tracking-[0.26em] transition-[color,box-shadow,border-color,background-color] duration-500 ease-luxe active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 ' +
  'before:absolute before:inset-0 before:-z-10 before:translate-y-[101%] before:rounded-full before:transition-transform before:duration-500 before:ease-luxe hover:before:translate-y-0'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-ink text-ivory hover:text-ink shadow-[0_14px_30px_-14px_rgba(18,16,14,0.6)] before:bg-gold-gradient',
  gold: 'bg-gold-gradient text-ink shadow-[0_16px_34px_-14px_rgba(184,138,62,0.75)] before:bg-ivory',
  ghost: 'border border-ink/15 text-ink hover:border-ink before:bg-ink hover:text-ivory',
  light: 'border border-ivory/25 text-ivory hover:border-gold-light hover:text-ink before:bg-gold-light',
}

export const buttonClass = (variant: ButtonVariant = 'primary', className?: string) =>
  clsx(base, variants[variant], className)
