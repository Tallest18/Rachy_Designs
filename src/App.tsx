import Lenis from 'lenis'
import { MotionConfig, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { BookingProvider } from './booking/BookingProvider'
import { BookingSection } from './booking/BookingSection'
import { ChapterRail, FloatingWhatsApp, Grain, ScrollProgress } from './components/Chrome'
import { Navbar } from './components/Navbar'
import { Preloader } from './components/Preloader'
import { Contact } from './components/sections/Contact'
import { Craft } from './components/sections/Craft'
import { Footer } from './components/sections/Footer'
import { Hero } from './components/sections/Hero'
import { Marquee } from './components/sections/Marquee'
import { OurPromise } from './components/sections/OurPromise'
import { Process } from './components/sections/Process'
import { Purpose } from './components/sections/Purpose'
import { Reviews } from './components/sections/Reviews'
import { Services } from './components/sections/Services'
import { Story } from './components/sections/Story'
import { Work } from './components/sections/Work'
import { showReviews } from './content'
import { registerLenis } from './lib/scroll'

const INTRO_KEY = 'rd-intro-seen'

function introAlreadySeen() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1'
  } catch {
    return false
  }
}

function rememberIntro() {
  try {
    sessionStorage.setItem(INTRO_KEY, '1')
  } catch {
    /* storage unavailable: the intro simply plays again next time */
  }
}

export default function App() {
  const reduce = useReducedMotion()
  const [skipIntro] = useState(() => !!reduce || introAlreadySeen())
  const [ready, setReady] = useState(skipIntro)
  const [showPreloader, setShowPreloader] = useState(!skipIntro)

  // Smooth, weighted scrolling (disabled for visitors who prefer reduced motion)
  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09, wheelMultiplier: 1 })
    registerLenis(lenis)
    return () => {
      registerLenis(null)
      lenis.destroy()
    }
  }, [reduce])

  const handleReveal = useCallback(() => {
    rememberIntro()
    setReady(true)
  }, [])
  const handleDone = useCallback(() => setShowPreloader(false), [])

  return (
    <MotionConfig reducedMotion="user">
      <BookingProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-ivory"
        >
          Skip to content
        </a>

        {showPreloader && <Preloader onReveal={handleReveal} onDone={handleDone} />}
        <ScrollProgress />
        <Navbar ready={ready} />
        <ChapterRail />

        <main id="main">
          <Hero ready={ready} />
          <Marquee />
          <Story />
          <Craft />
          <Process />
          <Services />
          <Purpose />
          <Work />
          <OurPromise />
          {showReviews && <Reviews />}
          <BookingSection />
          <Contact />
        </main>

        <Footer />
        <FloatingWhatsApp />
        <Grain />
      </BookingProvider>
    </MotionConfig>
  )
}
