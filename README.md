# Rachy Designs: Website

**Wear Your Confidence.** The official website for **Rachy Designs**, a fashion and tailoring brand in UNIBEN, Benin City, Nigeria.

The site tells the brand's story as visitors scroll, shows the services and finished work, and lets clients **book an appointment in under a minute**. Every booking goes to the business by **email** and **WhatsApp**.

This guide is written so that **anyone can follow it, even with no coding experience.** The technical details for developers are near the end.

---

## Contents

1. [What the website does](#1-what-the-website-does)
2. [How booking works](#2-how-booking-works)
3. [Checklist before going live](#3-checklist-before-going-live)
4. [How to change things on the website](#4-how-to-change-things-on-the-website)
5. [How to open the website on your computer](#5-how-to-open-the-website-on-your-computer)
6. [How to put the website online](#6-how-to-put-the-website-online)
7. [Saving your changes to GitHub](#7-saving-your-changes-to-github)
8. [Troubleshooting](#8-troubleshooting)
9. [For developers: how the code is organised](#9-for-developers-how-the-code-is-organised)
10. [Glossary](#10-glossary)

---

## 1. What the website does

The website is one long page that tells the Rachy Designs story in **chapters**. Things move and appear as the visitor scrolls, like turning the pages of a magazine.

| Part of the page | What the visitor sees |
| --- | --- |
| **Opening** | A short black intro screen with the gold Rachy Designs logo, then a curtain lifts. |
| **Hero** | "Wear your Confidence" with the gown on the dress form. Pictures drift gently as you scroll. |
| **Ribbon** | A moving band listing the services. It speeds up when you scroll faster. |
| **Chapter I: Our Story** | The brand story lights up word by word while a gold needle and thread "sews" across the screen. |
| **Chapter II: The Craft** | What makes the work special: craftsmanship, quality fabrics, designed for you. |
| **Chapter III: The Process** | Six steps from first idea to finished outfit. The cards slide sideways as you scroll down. |
| **Chapter IV: The Collection** | The five services. Tap one to see a photo, description and a "Book this service" button. |
| **Chapter V: Our Purpose** | The Mission and Vision on a rich wine-coloured panel. |
| **Chapter VI: Our Work** | A gallery of finished outfits, including a video. Tap any photo to view it full-screen. |
| **Chapter VII: Our Promise** | "Every stitch tells a story…", signed by Racheal. |
| **Chapter VIII: Kind Words** | Client reviews. *Hidden on the live site until real reviews are added (see section 4).* |
| **Chapter IX: Your Chapter** | **The booking form.** |
| **Contact** | Phone number, WhatsApp, Instagram, TikTok, Facebook and a map of the studio. |

Also on every page:

- **A green WhatsApp button** in the bottom corner, so visitors can message at any time.
- **A thin gold line** across the top that fills up as you scroll down.
- **A side menu of chapters** on large screens.
- **A mobile menu** on phones.

The website works on phones, tablets and computers. Visitors whose devices are set to "reduce motion" automatically get a calmer version with fewer animations.

---

## 2. How booking works

The client fills in a short form in four steps:

1. **Service:** what they want made (e.g. Bespoke Tailoring), plus the occasion (Wedding, Owambe, Convocation…).
2. **Schedule:** in person or remote, a preferred **date** and a preferred **time of day** (morning, afternoon or evening).
3. **Details:** name, phone/WhatsApp number, email (optional), when the outfit is needed, fabric, and their ideas.
4. **Confirm:** they check everything and press **Confirm booking**.

Each booking gets a short **reference code** like `RD-7K3QF`, so it's easy to talk about.

### What Rachy receives

```
   Client presses "Confirm booking"
                 │
                 ▼
   📧  An EMAIL arrives in Rachy's inbox instantly
       Subject: New booking RD-7K3QF: Bespoke Tailoring, Sun 15 Nov (Ada Okafor)
       All the details + a "Reply on WhatsApp" link that opens a chat with the client
                 │
                 ▼
   💬  The client can also continue on WHATSAPP
       (the message is already written for them, with the same reference code)
```

- **The email is the safety net.** Even if the client never sends the WhatsApp message, Rachy still gets the booking.
- **If the email can't be sent** (for example, the internet drops), the website asks the client to send the booking on WhatsApp instead, so it is never lost.
- **Until email alerts are switched on** (see the checklist below), bookings are delivered through WhatsApp only. The client must press "send" in WhatsApp for Rachy to receive them.

> A booking is a **request**. The appointment is confirmed when Rachy replies to the client. The website tells clients this clearly.

---

## 3. Checklist before going live

These must be done before the website is shared with the public:

- [ ] **Confirm the WhatsApp number.** The flyer and the original notes listed three different numbers (0813 583 **7929**, 0813 583 **7229** and 0813 583 **4929**). The site currently uses **0813 583 7929**. *Every booking goes to this number, so it must be right.* → [How to change it](#change-the-phone--whatsapp-number)
- [ ] **Switch on email alerts for bookings** (free, takes about 2 minutes). → [Step-by-step](#switch-on-email-alerts-for-bookings)
- [ ] **Make a test booking** on the live site and check that the email arrives. Check the Spam folder the first time and mark it "Not spam".
- [ ] **Add real client reviews**, or leave the Reviews section hidden. → [How](#add-real-reviews)
- [ ] **Add the exact TikTok and Facebook page links.** For now they open a search for "Rachy Designs". → [How](#change-social-media-links)
- [ ] **Check two details:** Racheal is described as *"Founder, Rachy Designs"*, and the booking form offers a *"Remote"* option (consult over WhatsApp and send measurements). Change or remove either if it isn't right.

---

## 4. How to change things on the website

### The one file you need: `src/content.ts`

**Almost everything a visitor reads lives in one file: [`src/content.ts`](src/content.ts).** Think of it as the website's control panel. Text, phone numbers, services, photos, reviews and booking options are all there, with notes explaining each part.

You can edit it in any text editor. We recommend the free **[Visual Studio Code](https://code.visualstudio.com/)**.

**Golden rules when editing:**

1. **Only change the words between the quote marks.** For example, in `tagline: 'Wear Your Confidence',` change only `Wear Your Confidence`.
2. **Keep the quote marks and the comma at the end of the line.**
3. **Apostrophes:** if your text contains an apostrophe, use the curly one `’` (as in `Rachy’s`) instead of the straight one `'`. A straight `'` inside the quotes breaks the line.
4. **Save the file** (Ctrl + S on Windows, Cmd + S on Mac). If the website is open on your computer (see section 5), it updates by itself within a second.
5. **If the page goes blank or shows a red error**, press Ctrl + Z to undo your last change and save again.

---

### Change the phone / WhatsApp number

In `src/content.ts`, find the **Contact** part:

```ts
  phoneDisplay: '0813 583 7929',           // how the number is shown on the page
  phoneHref: 'tel:+2348135837929',         // used by the "call" button
  whatsapp: '2348135837929',               // where bookings and WhatsApp messages go
```

- `whatsapp` and `phoneHref` use the **international format**: drop the first `0` and put `234` in front. So `0813 583 7929` becomes `2348135837929`.
- Also update the number in [`index.html`](index.html) (the line with `"telephone"`). This helps Google show the right number.

### Switch on email alerts for bookings

The website uses a free service called **[Web3Forms](https://web3forms.com)** to email each booking. No account or password is needed.

1. Go to **https://web3forms.com**.
2. Enter the **email address where bookings should arrive** (for example, Rachy's Gmail) and request an **Access Key**.
3. Web3Forms emails you the key. It looks like `a1b2c3d4-e5f6-7890-abcd-ef1234567890`.
4. In `src/content.ts`, find **Booking notifications** and paste the key between the quotes:
   ```ts
   export const bookingNotifications = {
     web3formsAccessKey: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
   }
   ```
5. Save, put the updated website online (section 6), then **make a test booking from your phone or computer browser** and check the inbox.

Good to know:

- The key is **safe to have in the website's code**. It can only deliver messages to your inbox.
- On the **free plan, Web3Forms handles around 250 submissions a month**. Check their website for current limits.
- Turn on **email notifications on Rachy's phone** (e.g. in the Gmail app) so new bookings pop up straight away.
- Web3Forms blocks automated "robot" traffic, so **always test with a real browser**, not with testing software.

### Change any text (story, mission, vision, promise, services)

All in `src/content.ts`:

| What you want to change | Look for |
| --- | --- |
| Tagline, slogan, story, mission, vision, promise | `export const brand = {` |
| The five services (name, description, photo) | `export const services` |
| The three "why choose us" points | `export const pillars` |
| The six process steps | `export const processSteps` |
| Occasions and time slots in the booking form | `export const occasions` and `export const timeSlots` |
| Chapter names | `const allChapters` |

### Add a photo to the "Our Work" gallery

1. **Copy the photo** into the folder `src/assets/images/`.
   Give it a simple name: lowercase, no spaces, e.g. `red-owambe-gown.jpg`.
   *Tip: photos at least 1000 pixels tall look sharpest.*
2. **At the top of `src/content.ts`**, with the other `import` lines, add:
   ```ts
   import redOwambeGown from './assets/images/red-owambe-gown.jpg'
   ```
3. **Find `export const gallery`** and add a new entry inside the square brackets:
   ```ts
     {
       src: redOwambeGown,
       title: 'Red Owambe Gown',
       category: 'Bespoke',
       alt: 'Red lace gown with a long train and beaded bodice',
       shape: 'portrait',
     },
   ```
   - `title`: shown on the photo.
   - `category`: the small gold label (Bespoke, Corporate, Custom…).
   - `alt`: a short description of the photo. **Blind visitors' screen readers read it aloud, and Google uses it.**
   - `shape`: `'tall'`, `'portrait'` or `'square'`, to vary the gallery layout.

**To add a video**, put the `.mp4` in `src/assets/videos/`, import it the same way, and add `video: yourVideoName,` to the entry. Keep `src:` pointing at a still image to show before it plays. See the *Teal Lace Corset Dress* entry for an example.

**To remove a photo**, delete its whole `{ … },` block from the list.

### Change a service photo or the hero image

- **Service photos:** in `export const services`, change the `image:` of that service to another imported photo.
- **Hero and "The Craft" section photos:** change them in `export const images` near the top of the file.

### Add real reviews

1. Find `export const reviews` in `src/content.ts`.
2. Replace the sample text with real reviews (with the client's permission):
   ```ts
     {
       quote: 'The exact words from the client…',
       name: 'Adaeze O.',
       outfit: 'Bespoke wedding guest gown',
     },
   ```
3. Change `export const reviewsArePlaceholders = true` to **`false`**.

While it says `true`, the Reviews section only shows on your computer, never on the live site. That way sample reviews are never published by accident.

### Change social media links

In the **Contact** part of `src/content.ts`, replace the `url:` values with the real profile addresses, for example:

```ts
  tiktok: { handle: '@rachydesigns', url: 'https://www.tiktok.com/@rachydesigns' },
  facebook: { handle: 'Rachy Designs', url: 'https://www.facebook.com/rachydesigns' },
```

### Change the logo

The logo file is `src/assets/brand/logo-mark.png` (the gold "R" with the dress form, taken from the flyer). Replace it with a new image of the **same name**. A transparent PNG works best. The small icons shown in browser tabs are `public/favicon.png` and `public/apple-touch-icon.png`.

### Change colours or fonts

Colours and fonts are set at the top of [`src/index.css`](src/index.css), under `@theme`. For example, `--color-gold: #b88a3e;` is the main gold. This is best left to a developer.

---

## 5. How to open the website on your computer

You only need this to **preview changes** before putting them online.

**One-time setup:**

1. Install **Node.js** from **https://nodejs.org** and choose the **LTS** version. This is the free engine that runs the website's tools.
2. Open the project folder in **Visual Studio Code**.
3. Open the built-in terminal: menu **Terminal → New Terminal**.
4. Type this and press Enter. It downloads the website's building blocks, which takes a minute:
   ```
   npm install
   ```

**Every time you want to preview:**

1. In the terminal, type:
   ```
   npm run dev
   ```
2. Open **http://localhost:5173** in your browser.
3. Edit and save files. The page updates automatically.
4. To stop, click in the terminal and press **Ctrl + C**.

---

## 6. How to put the website online

The website must be "built" into a ready-to-publish folder called `dist`, then uploaded to a hosting service. Both options below are **free** for a site like this.

### Option A: Automatic updates from GitHub (recommended)

Connect the GitHub repository once. After that, the website updates itself every time changes are saved to GitHub.

1. Create a free account at **https://www.netlify.com** (or **https://vercel.com**), signing in with GitHub.
2. Choose **Add new site → Import an existing project**, then pick the `Rachy_Designs` repository.
3. Check these settings (they are usually filled in automatically):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy**. In about a minute you get a web address like `rachy-designs.netlify.app`.
5. Optional: connect your own domain (e.g. `rachydesigns.com`) under **Domain settings**.

### Option B: Drag and drop

1. In the terminal, run:
   ```
   npm run build
   ```
2. Go to **https://app.netlify.com/drop** and drag the **`dist`** folder onto the page.

You'll need to repeat this every time you make changes.

---

## 7. Saving your changes to GitHub

GitHub keeps a safe copy of the website and its full history of changes. Your repository is **https://github.com/Tallest18/Rachy_Designs**.

**The easy way:** install **[GitHub Desktop](https://desktop.github.com/)**, open this folder, type a short note about what you changed, then click **Commit** and **Push**.

**From the terminal:**

```
git add -A
git commit -m "Describe what you changed, e.g. Added three new gallery photos"
git push
```

If the site is connected to Netlify or Vercel (Option A), the live website updates a minute or two after you push.

---

## 8. Troubleshooting

| Problem | What to do |
| --- | --- |
| `npm` is not recognised | Node.js isn't installed, or the terminal was open during installation. Install Node.js (section 5), then close and reopen VS Code. |
| The page is blank or shows a red error after an edit | Undo your last change (Ctrl + Z) and save. Usually a quote mark or comma went missing. |
| Booking emails don't arrive | Check that the key is in `src/content.ts` and that the updated site is online. Look in **Spam**. Test from a normal browser. Check the monthly limit on web3forms.com. |
| WhatsApp opens the wrong number | Fix `whatsapp:` in `src/content.ts` (international format, no `+` or spaces). |
| The live site still shows old content | Wait a couple of minutes after pushing, then hard-refresh the page (Ctrl + Shift + R, or Cmd + Shift + R on Mac). |
| The browser tab still shows an old icon | Browsers keep tab icons for a while. Hard-refresh, or open the site in a private window. |
| A photo looks blurry | Use a larger photo (at least 1000 pixels tall). |
| Reviews don't show on the live site | Set `reviewsArePlaceholders` to `false` once real reviews are added. |

---

## 9. For developers: how the code is organised

### Tech stack

| Tool | What it's used for |
| --- | --- |
| [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) | User interface and type safety |
| [Vite](https://vite.dev) | Dev server and production build (requires Node `^20.19` or `>=22.12`) |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling. Design tokens live in `src/index.css` under `@theme` |
| [Motion](https://motion.dev) (`motion/react`) | All animation: scroll-linked (`useScroll`, `useTransform`), entrance and layout transitions |
| [Lenis](https://lenis.darkroom.engineering) | Smooth scrolling (switched off for `prefers-reduced-motion`) |
| [Lucide](https://lucide.dev) | Icons. Brand icons (WhatsApp, Instagram, TikTok, Facebook) are custom SVGs in `ui/Icons.tsx` |
| [Fontsource](https://fontsource.org) | Self-hosted fonts: Cinzel, Cormorant Garamond, Jost, Pinyon Script |
| [Web3Forms](https://web3forms.com) | Emails each booking to the owner. No backend needed |

### Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at http://localhost:5173 |
| `npm run build` | Type-check and build the production site into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint, including the React Compiler hooks rules |

### Folder structure

```
Rachy_Designs/
├── index.html                 Page title, SEO description, social preview tags, structured data, favicon
├── public/                    Copied as-is: favicon.png, apple-touch-icon.png
└── src/
    ├── content.ts             ⭐ Single source of truth for all copy, contacts, services, gallery, reviews, booking options
    ├── App.tsx                Composes the page: preloader, navbar, sections in order, floating UI; sets up Lenis
    ├── main.tsx               Entry point: loads fonts and global CSS, mounts <App />
    ├── index.css              Tailwind import, @theme tokens (colours, fonts, easings, keyframes), custom utilities
    ├── assets/
    │   ├── brand/             logo-mark.png (transparent, extracted from the flyer)
    │   ├── images/            Optimised .webp photos (plus the original WhatsApp uploads, which are not used)
    │   └── videos/            Gallery video + its poster frame
    ├── booking/
    │   ├── context.ts         Booking types, step list, submission states, useBooking() hook
    │   ├── BookingProvider.tsx  State for the booking flow (data, step, reference code, submission)
    │   ├── BookingSection.tsx The "Your Chapter" section layout
    │   ├── BookingWizard.tsx  The 4-step form, validation, honeypot, confirm/fallback and finished screens
    │   ├── Calendar.tsx       Accessible month calendar (Monday-first, min/max dates)
    │   ├── message.ts         WhatsApp message text, owner email fields, phone normalisation, .ics calendar file
    │   └── notify.ts          Web3Forms delivery: timeout, one retry on network/5xx, reference codes
    ├── components/
    │   ├── Navbar.tsx         Sticky nav: hides on scroll down, active-section underline, full-screen mobile menu
    │   ├── Preloader.tsx      Opening curtain (shown once per browser session)
    │   ├── Chrome.tsx         Scroll progress bar, chapter rail, floating WhatsApp button, film-grain overlay
    │   ├── sections/          One file per page section: Hero, Marquee, Story, Craft, Process, Services,
    │   │                      Purpose, Work (gallery + lightbox), OurPromise, Reviews, Contact, Footer
    │   └── ui/                Button, Reveal/MaskWords (scroll-in animations), ChapterLabel, Logo, Icons, SpinningBadge
    ├── hooks/
    │   └── useActiveSection.ts  IntersectionObserver: which section crosses the middle of the viewport
    └── lib/
        ├── scroll.ts          Lenis bridge: scrollToId(), reference-counted scroll lock
        ├── motion.ts          Shared easings and animation variants
        ├── date.ts            Calendar/date helpers
        ├── format.ts          Roman numerals, zero-padding
        └── whatsapp.ts        wa.me link builder
```

### How the scroll storytelling works

- **Chapters:** `chapters` in `content.ts` numbers the sections automatically (I, II, III…). `ChapterLabel` renders the label, and `ChapterRail` is the side navigation.
- **Word-by-word story (`Story.tsx`):** a 320vh section with a sticky inner panel. Each word's opacity is mapped from `scrollYProgress`, and the gold thread is an SVG path drawn with `pathLength`. The needle is positioned along the path with `getPointAtLength`.
- **Horizontal process (`Process.tsx`):** the section height is set to `100svh + track overflow`, and the track's `x` is driven by vertical scroll progress. A `ResizeObserver` keeps it correct on resize.
- **Velocity marquee (`Marquee.tsx`):** `useVelocity(scrollY)` speeds the ribbon up and flips its direction.
- **Reduced motion:** Lenis is disabled, and the pinned sections fall back to normal layouts.

### Booking delivery in detail

1. `BookingWizard` validates each step. A hidden honeypot field and a minimum time on the form silently drop spam bots.
2. On **Confirm**, `notifyOwner()` POSTs `FormData` to `https://api.web3forms.com/submit`: a "simple" CORS request with `keepalive`, a 15-second timeout, and one retry on network errors, 5xx or 429.
3. On success: status `notified`. On failure: status `failed`, and the client is shown a pre-filled WhatsApp link plus a **Try again** button that reuses the same reference code.
4. Without a key configured, the final button becomes a direct `wa.me` link (status `whatsapp-only`). In development a reminder banner appears. In production a console warning is logged.
5. The key can also be provided at build time as the environment variable `VITE_WEB3FORMS_ACCESS_KEY`.

### Accessibility and performance

- Semantic sections with headings, a skip link, labelled form fields with error messages, keyboard-operable gallery viewer (←/→/Esc) and visible focus styles.
- `prefers-reduced-motion` is respected throughout.
- Photos are compressed WebP files and load lazily. The gallery video only downloads and plays while on screen.
- Fonts are self-hosted, so the site doesn't depend on Google Fonts.

---

## 10. Glossary

| Word | Meaning |
| --- | --- |
| **Repository (repo)** | The project folder stored on GitHub, with its full history. |
| **Commit** | A saved snapshot of your changes, with a short note. |
| **Push** | Uploading your commits to GitHub. |
| **Terminal** | A window where you type commands (in VS Code: Terminal → New Terminal). |
| **Node.js / npm** | The free tool that installs and runs the website's building blocks. |
| **Build** | Turning the source code into the final, fast website files (the `dist` folder). |
| **Deploy / hosting** | Putting the built website on the internet so anyone can visit it. |
| **Access key** | A code from Web3Forms that tells it which inbox to email bookings to. |
| **Alt text** | A short written description of a photo, read aloud for blind visitors and used by Google. |

---

© Rachy Designs. All rights reserved. Photos and logo belong to Rachy Designs and may not be reused without permission.
