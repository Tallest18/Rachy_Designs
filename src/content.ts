/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  RACHY DESIGNS: SITE CONTENT
 *  Everything a client sees (text, contacts, services, photos, reviews) lives
 *  here. Edit this file to update the website; no other code changes needed.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { LucideIcon } from 'lucide-react'
import {
  Briefcase,
  Crown,
  Gem,
  MessageCircle,
  Package,
  Palette,
  PencilRuler,
  Ruler,
  Scissors,
  Shirt,
  Sparkles,
  Spool,
} from 'lucide-react'

import bespokeImg from './assets/images/bespoke.webp'
import corporateImg from './assets/images/corporate.webp'
import customImg from './assets/images/custom.webp'
import gownImg from './assets/images/gown-detail.webp'
import readyImg from './assets/images/ready-to-wear.webp'
import { toRoman } from './lib/format'

/* ─── Photos ──────────────────────────────────────────────────────────────────
 * Drop new photos into src/assets/images and import them here.
 * Tip: export photos at least 1200px on the long edge (.webp or .jpg).
 */
export const images = {
  bespoke: bespokeImg,
  corporate: corporateImg,
  custom: customImg,
  gown: gownImg,
  ready: readyImg,
}

/* ─── Brand ─────────────────────────────────────────────────────────────── */
export const brand = {
  name: 'Rachy Designs',
  tagline: 'Wear Your Confidence',
  motto: ['Style', 'Elegance', 'Perfection'],
  slogan: 'Stitching your style, creating confidence',
  closing: 'Because you deserve to look and feel amazing.',
  founder: 'F. Racheal Samuel',
  founderTitle: 'Founder, Rachy Designs',

  story:
    'Rachy Designs is a fashion and tailoring brand built on creativity, passion, elegance and commitment to quality. We believe fashion is more than just wearing clothes. It is a beautiful way of expressing personality, confidence and individuality.',
  storyHighlights: ['creativity', 'passion', 'elegance', 'quality', 'personality', 'confidence', 'individuality'],

  craft:
    'Our brand is dedicated to creating beautifully tailored outfits that combine style, comfort and sophistication. From elegant casual wear to stunning occasion outfits and corporate designs, we bring every fashion idea to life with attention to detail and excellent craftsmanship.',

  mission:
    'To provide exceptional fashion and tailoring services by creating unique, stylish and beautifully fitted outfits that make every customer feel confident and comfortable.',
  vision:
    'To become a recognised fashion brand known for creativity, quality craftsmanship, customer satisfaction and timeless elegance.',

  promise:
    'Every stitch tells a story of dedication, and every outfit is an opportunity to create something beautiful.',
  promiseFollowUp:
    'Your style, our creativity and our craftsmanship come together to give you a look worth remembering.',
}

/* ─── Contact ───────────────────────────────────────────────────────────────
 * ⚠️  CONFIRM THE PHONE NUMBER. The flyer and the brief list different numbers
 *     (0813 583 7929 / 0813 583 7229 / 0813 583 4929). Booking requests are
 *     sent to `whatsapp` below, so it must be the correct WhatsApp number.
 */
export const contact = {
  person: 'F. Racheal Samuel',
  phoneDisplay: '0813 583 7929',
  phoneHref: 'tel:+2348135837929',
  /** International format, digits only (234 + number without the leading 0). */
  whatsapp: '2348135837929',
  instagram: { handle: '@rachy_designs', url: 'https://www.instagram.com/rachy_designs' },
  // Replace these two search links with the exact profile URLs once confirmed.
  tiktok: { handle: 'Rachy Designs', url: 'https://www.tiktok.com/search?q=Rachy%20Designs' },
  facebook: { handle: 'Rachy Designs', url: 'https://www.facebook.com/search/top?q=Rachy%20Designs' },
  location: {
    short: 'UNIBEN, Benin City',
    full: 'University of Benin (UNIBEN), Benin City, Edo State, Nigeria',
    mapQuery: 'University of Benin, Benin City, Nigeria',
  },
}

/* ─── Booking notifications ─────────────────────────────────────────────────
 * When a client confirms a booking, the full details are EMAILED to Rachy
 * instantly, even if the client never presses "send" in WhatsApp.
 *
 * ONE-TIME SETUP (free, about 2 minutes, no account needed):
 *   1. Go to https://web3forms.com and enter the email address that should
 *      receive bookings (for example Rachy's Gmail).
 *   2. Web3Forms emails an "Access Key" to that address. Paste it below.
 *   3. Make a test booking on the site and check the inbox (and Spam folder
 *      the first time; mark it "Not spam").
 *
 * The key is safe to keep in website code: it can only deliver to that inbox.
 * It can also be supplied at build time as VITE_WEB3FORMS_ACCESS_KEY.
 * Until a key is added, bookings are handed over to WhatsApp only.
 */
export const bookingNotifications = {
  web3formsAccessKey: '',
}

/* ─── Services ─────────────────────────────────────────────────────────── */
export type ServiceId = 'bespoke' | 'ready-to-wear' | 'corporate-casual' | 'custom' | 'alterations'

export interface Service {
  id: ServiceId
  title: string
  kicker: string
  short: string
  description: string
  image: string
  alt: string
  icon: LucideIcon
}

export const services: Service[] = [
  {
    id: 'bespoke',
    title: 'Bespoke Tailoring',
    kicker: 'One of one, made for your moment',
    short: 'One-of-a-kind occasion pieces',
    description:
      'Exquisite, one-of-a-kind creations tailored to perfection for life’s most special moments: weddings, owambe, galas and milestone celebrations.',
    image: bespokeImg,
    alt: 'Champagne lace off-shoulder gown with a flowing train',
    icon: Crown,
  },
  {
    id: 'ready-to-wear',
    title: 'Ready-to-Wear',
    kicker: 'Effortless style, every day',
    short: 'Trendy pieces for everyday life',
    description:
      'Trendy, stylish and comfortable pieces made to fit your everyday life. Easy to wear and impossible to ignore.',
    image: readyImg,
    alt: 'Magenta wrap dress with dramatic balloon sleeves',
    icon: Shirt,
  },
  {
    id: 'corporate-casual',
    title: 'Corporate & Casual',
    kicker: 'Command the room, own the weekend',
    short: 'Sharp workwear & relaxed casuals',
    description:
      'Sharp, professional outfits that command confidence and elevate your brand, plus polished casual wear that keeps you looking put-together off the clock.',
    image: corporateImg,
    alt: 'Tailored burgundy trouser suit worn with a black blouse',
    icon: Briefcase,
  },
  {
    id: 'custom',
    title: 'Custom Designs',
    kicker: 'Your idea, brought to life',
    short: 'Made-to-measure, designed around you',
    description:
      'Made-to-measure outfits designed around your style, measurements and preferences. Bring a picture, a sketch or just a feeling and we’ll create it together.',
    image: customImg,
    alt: 'Emerald green cape gown with gold embellishment',
    icon: Palette,
  },
  {
    id: 'alterations',
    title: 'Alterations',
    kicker: 'The perfect fit, restored',
    short: 'Resizing, hemming & adjustments',
    description:
      'Expert alterations and clothing adjustments (resizing, tapering, hemming and refitting) so the clothes you already love fit like they were made for you.',
    image: gownImg,
    alt: 'Draped gown on a dress form with a tailor’s measuring tape',
    icon: Scissors,
  },
]

/* ─── Why clients choose us (from the flyer) ─────────────────────────────── */
export const pillars: { title: string; body: string; icon: LucideIcon }[] = [
  { title: 'Expert Craftsmanship', body: 'Every stitch is made with care and attention to detail.', icon: Spool },
  { title: 'Premium Quality Fabrics', body: 'We use the finest materials for lasting beauty and comfort.', icon: Gem },
  { title: 'Designed For You', body: 'Your vision, your style, our passion.', icon: Sparkles },
]

/* ─── The process (horizontal scroll section) ───────────────────────────── */
export const processSteps: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: 'Consultation',
    body: 'Tell us about the occasion, your inspiration and how you want to feel. Bring pictures, sketches or simply an idea.',
    icon: MessageCircle,
  },
  {
    title: 'Measurements',
    body: 'Precise body measurements are taken so your outfit is cut for you and nobody else.',
    icon: Ruler,
  },
  {
    title: 'Fabric & Design',
    body: 'Together we settle the details: fabric, silhouette, finishing and the little touches that make it yours.',
    icon: Palette,
  },
  {
    title: 'Cutting & Sewing',
    body: 'Your piece is carefully cut and sewn, with attention given to every seam, hem and embellishment.',
    icon: Scissors,
  },
  {
    title: 'Fitting',
    body: 'You try it on and we refine the fit until it sits exactly the way it should.',
    icon: PencilRuler,
  },
  {
    title: 'Delivery',
    body: 'Your finished outfit, pressed and ready. All that’s left is to wear your confidence.',
    icon: Package,
  },
]

/* ─── Our Work gallery ──────────────────────────────────────────────────────
 * These are the looks from the flyer. Replace / add photos of finished pieces.
 * `shape` controls the tile proportions in the masonry grid.
 */
export interface GalleryItem {
  src: string
  title: string
  category: string
  alt: string
  shape: 'tall' | 'portrait' | 'square'
}

export const gallery: GalleryItem[] = [
  {
    src: bespokeImg,
    title: 'Champagne Lace Gown',
    category: 'Bespoke',
    alt: 'Champagne lace off-shoulder gown with a flowing satin train',
    shape: 'tall',
  },
  {
    src: corporateImg,
    title: 'The Burgundy Power Suit',
    category: 'Corporate',
    alt: 'Tailored burgundy trouser suit with a black blouse and gold belt',
    shape: 'portrait',
  },
  {
    src: customImg,
    title: 'Emerald Cape Gown',
    category: 'Custom',
    alt: 'Emerald green cape gown with gold appliqué on the bodice',
    shape: 'tall',
  },
  {
    src: gownImg,
    title: 'Draped Champagne Silk',
    category: 'In the studio',
    alt: 'One-shoulder draped gown with beaded embroidery on a dress form',
    shape: 'square',
  },
  {
    src: readyImg,
    title: 'Magenta Wrap Dress',
    category: 'Ready-to-Wear',
    alt: 'Magenta wrap dress with balloon sleeves and a side tie',
    shape: 'portrait',
  },
]

/* ─── Reviews ───────────────────────────────────────────────────────────────
 * ⚠️  PLACEHOLDERS: these are sample reviews to show the design.
 *     Replace them with real client reviews, then set
 *     `reviewsArePlaceholders` to false. While it is `true`, the Reviews
 *     section only appears in development and is hidden on the live site.
 */
export const reviewsArePlaceholders = true

export interface Review {
  quote: string
  name: string
  outfit: string
}

export const reviews: Review[] = [
  {
    quote:
      'I described what I wanted with a few screenshots and she brought it to life even better than I imagined. The fit was perfect from the first fitting.',
    name: 'Sample Client',
    outfit: 'Bespoke occasion gown',
  },
  {
    quote:
      'My corporate suits finally fit the way they should. Sharp, comfortable and finished beautifully. I get compliments every time I wear them.',
    name: 'Sample Client',
    outfit: 'Corporate two-piece',
  },
  {
    quote:
      'She altered a dress I had given up on and it now fits like it was made for me. Patient, detailed and delivered on time.',
    name: 'Sample Client',
    outfit: 'Alterations',
  },
]

export const showReviews = !reviewsArePlaceholders || import.meta.env.DEV

/* ─── Booking options ───────────────────────────────────────────────────── */
export const occasions = [
  'Wedding',
  'Owambe / Party',
  'Birthday',
  'Corporate / Work',
  'Church / Religious',
  'Convocation',
  'Everyday wear',
  'Other',
]

export const timeSlots = [
  { id: 'morning', label: 'Morning', range: '9am – 12pm', start: 9, end: 12 },
  { id: 'afternoon', label: 'Afternoon', range: '12pm – 4pm', start: 12, end: 16 },
  { id: 'evening', label: 'Evening', range: '4pm – 7pm', start: 16, end: 19 },
] as const

export const appointmentModes = [
  {
    id: 'in-person',
    title: 'In person',
    body: `Consultation & measurements at ${contact.location.short}`,
  },
  {
    id: 'remote',
    title: 'Remote',
    body: 'Consult over WhatsApp call or chat and send your measurements',
  },
] as const

/* ─── Chapters (storytelling labels + side navigation) ───────────────────── */
const allChapters = [
  { id: 'story', title: 'Our Story' },
  { id: 'craft', title: 'The Craft' },
  { id: 'process', title: 'The Process' },
  { id: 'services', title: 'The Collection' },
  { id: 'purpose', title: 'Our Purpose' },
  { id: 'work', title: 'Our Work' },
  { id: 'promise', title: 'Our Promise' },
  { id: 'reviews', title: 'Kind Words' },
  { id: 'book', title: 'Your Chapter' },
]

export const chapters = allChapters
  .filter((c) => c.id !== 'reviews' || showReviews)
  .map((c, i) => ({ ...c, numeral: toRoman(i + 1) }))
