import type Lenis from 'lenis'

/**
 * Tiny bridge between React components and the single Lenis smooth-scroll
 * instance. Falls back to native scrolling when Lenis is off (reduced motion).
 */
let lenis: Lenis | null = null
let locks = 0

export function registerLenis(instance: Lenis | null) {
  lenis = instance
  if (lenis && locks > 0) lenis.stop()
}

export function scrollToId(id: string, { offset = 0, immediate = false } = {}) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, {
      offset,
      immediate,
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' })
  }
}

/** Reference-counted scroll lock (menus, lightbox, preloader). */
export function lockScroll() {
  locks += 1
  lenis?.stop()
  document.documentElement.style.overflow = 'hidden'
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1)
  if (locks === 0) {
    lenis?.start()
    document.documentElement.style.overflow = ''
  }
}

/** onClick handler for in-page anchor links. */
export function anchorTo(id: string, after?: () => void) {
  return (e: { preventDefault: () => void }) => {
    e.preventDefault()
    after?.()
    scrollToId(id)
  }
}
