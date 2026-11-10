import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { buttonClass, type ButtonVariant } from './button-class'

interface Common {
  variant?: ButtonVariant
  className?: string
  children: ReactNode
}

export function Button({ variant, className, children, type = 'button', ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClass(variant, className)} {...rest}>
      <span className="relative inline-flex items-center gap-3">{children}</span>
    </button>
  )
}

export function ButtonLink({ variant, className, children, ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={buttonClass(variant, className)} {...rest}>
      <span className="relative inline-flex items-center gap-3">{children}</span>
    </a>
  )
}
