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

import ankaraRuffleImg from './assets/images/ankara-ruffle-top.webp'
import beadedCorsetImg from './assets/images/beaded-corset-ankara.webp'
import loungeSetImg from './assets/images/chocolate-lounge-set.webp'
import gownImg from './assets/images/gown-detail.webp'
import limeTwoPieceImg from './assets/images/lime-two-piece.webp'
import pinstripeImg from './assets/images/pinstripe-suit.webp'
import printBlouseImg from './assets/images/print-blouse-wide-leg.webp'
import tasselPortraitImg from './assets/images/tassel-pinafore-portrait.webp'
import tasselSeatedImg from './assets/images/tassel-pinafore-seated.webp'
import tealLacePoster from './assets/videos/teal-lace-corset-dress-poster.webp'
import tealLaceVideo from './assets/videos/teal-lace-corset-dress.mp4'
import { toRoman } from './lib/format'

/* ─── Photos ──────────────────────────────────────────────────────────────────
 * Drop new photos into src/assets/images and import them here.
 * Tip: export photos at least 1000px on the long edge (.webp or .jpg).
 */
export const images = {
  /** Hero: draped gown on a dress form with a tailor's tape */
  gown: gownImg,
  /** "The Craft" section: large image + small arched image */
  craftMain: tasselPortraitImg,
  craftAccent: loungeSetImg,
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
  instagram: { handle: '@racheal_samuel0', url: 'https://www.instagram.com/racheal_samuel0' },
  tiktok: { handle: '@ra_chea_l', url: 'https://www.tiktok.com/@ra_chea_l' },
  facebook: { handle: 'Rachy Designs', url: 'https://www.facebook.com/share/1Dv9h7aKnD/' },
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
    image: beadedCorsetImg,
    alt: 'Black beaded corset top with cap sleeves, paired with a floral Ankara pencil skirt',
    icon: Crown,
  },
  {
    id: 'ready-to-wear',
    title: 'Ready-to-Wear',
    kicker: 'Effortless style, every day',
    short: 'Trendy pieces for everyday life',
    description:
      'Trendy, stylish and comfortable pieces made to fit your everyday life. Easy to wear and impossible to ignore.',
    image: loungeSetImg,
    alt: 'Chocolate-brown oversized shirt and wide-leg trouser set',
    icon: Shirt,
  },
  {
    id: 'corporate-casual',
    title: 'Corporate & Casual',
    kicker: 'Command the room, own the weekend',
    short: 'Sharp workwear & relaxed casuals',
    description:
      'Sharp, professional outfits that command confidence and elevate your brand, plus polished casual wear that keeps you looking put-together off the clock.',
    image: pinstripeImg,
    alt: 'Tailored pinstripe trouser suit with wide-leg trousers',
    icon: Briefcase,
  },
  {
    id: 'custom',
    title: 'Custom Designs',
    kicker: 'Your idea, brought to life',
    short: 'Made-to-measure, designed around you',
    description:
      'Made-to-measure outfits designed around your style, measurements and preferences. Bring a picture, a sketch or just a feeling and we’ll create it together.',
    image: tasselSeatedImg,
    alt: 'Black pinafore dress decorated with gold tassels, worn over a sky-blue shirt',
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
 * Photos of finished pieces. Add more by importing a photo above and adding
 * an entry here. `shape` controls the tile proportions in the masonry grid.
 * For a video tile, set `video` to an imported .mp4 and `src` to a cover image.
 */
export interface GalleryItem {
  src: string
  title: string
  category: string
  alt: string
  shape: 'tall' | 'portrait' | 'square'
  video?: string
}

export const gallery: GalleryItem[] = [
  {
    src: tasselSeatedImg,
    title: 'Tasselled Pinafore Dress',
    category: 'Custom',
    alt: 'Black pinafore dress decorated with gold tassels over a sky-blue shirt, model seated on a stool',
    shape: 'tall',
  },
  {
    src: pinstripeImg,
    title: 'The Pinstripe Suit',
    category: 'Corporate',
    alt: 'Tailored pinstripe trouser suit with wide-leg trousers, worn with white heels',
    shape: 'portrait',
  },
  {
    src: beadedCorsetImg,
    title: 'Beaded Corset & Ankara Skirt',
    category: 'Bespoke',
    alt: 'Black beaded corset top with cap sleeves and a floral Ankara pencil skirt, with matching head wrap',
    shape: 'portrait',
  },
  {
    src: tealLacePoster,
    video: tealLaceVideo,
    title: 'Teal Lace Corset Dress',
    category: 'In motion',
    alt: 'Teal lace dress with a structured corset bodice of Ankara-print panels',
    shape: 'tall',
  },
  {
    src: limeTwoPieceImg,
    title: 'Lime Zip Jacket & Skirt',
    category: 'Corporate',
    alt: 'Lime-green zip-front cropped jacket with a matching pencil skirt and black top',
    shape: 'portrait',
  },
  {
    src: loungeSetImg,
    title: 'Chocolate Two-Piece',
    category: 'Ready-to-Wear',
    alt: 'Chocolate-brown oversized shirt and wide-leg trouser set',
    shape: 'square',
  },
  {
    src: printBlouseImg,
    title: 'Cowl Blouse & Wide-Leg Trousers',
    category: 'Casual',
    alt: 'Orange and black abstract-print cowl-neck blouse with high-waisted red wide-leg trousers',
    shape: 'tall',
  },
  {
    src: ankaraRuffleImg,
    title: 'Ankara Ruffle Top',
    category: 'Custom',
    alt: 'Geometric Ankara print top with ruffled side panels over a black skirt',
    shape: 'portrait',
  },
  {
    src: gownImg,
    title: 'On the Dress Form',
    category: 'In the studio',
    alt: 'One-shoulder draped gown with beaded embroidery on a dress form with a measuring tape',
    shape: 'square',
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
