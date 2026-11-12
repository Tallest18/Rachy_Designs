# Rachy Designs: Website

**Wear Your Confidence.** This is the official website for **Rachy Designs**, a fashion and tailoring brand in UNIBEN, Benin City, Nigeria.

The website tells the brand's story as visitors scroll down, shows the services and finished outfits, and lets clients **book an appointment in under a minute**. Every booking reaches the business by **email** and **WhatsApp**.

> **You do not need to be a programmer to read this guide.** Every technical word is explained the first time it appears, and there is a [Glossary](#11-glossary) at the end. Developers will find the technical details in [Part 10](#10-for-developers-technical-reference).

---

## How to use this guide

| If you are… | Read these parts |
| --- | --- |
| **The business owner** who wants to understand the website and keep it up to date | 1, 2, 3, then 5 whenever you want to change something |
| **Curious about how the website is built** | 4: a guided tour of the code in plain language |
| **Putting the website online or saving changes** | 6, 7 and 8 |
| **Stuck** | 9: Troubleshooting |
| **A developer** joining the project | 4 for the big picture, then 10 |

---

## Contents

1. [The website at a glance](#1-the-website-at-a-glance)
2. [How booking works](#2-how-booking-works)
3. [Checklist before going live](#3-checklist-before-going-live)
4. [A guided tour of the code (plain language)](#4-a-guided-tour-of-the-code-plain-language)
5. [How to change things on the website](#5-how-to-change-things-on-the-website)
6. [How to open the website on your computer](#6-how-to-open-the-website-on-your-computer)
7. [How to put the website online](#7-how-to-put-the-website-online)
8. [Saving your changes to GitHub](#8-saving-your-changes-to-github)
9. [Troubleshooting](#9-troubleshooting)
10. [For developers: technical reference](#10-for-developers-technical-reference)
11. [Glossary](#11-glossary)

---

## 1. The website at a glance

The website is **one long page** that tells the Rachy Designs story in **chapters**, like a magazine. Pictures and words move and appear as the visitor scrolls.

### What visitors see, from top to bottom

| Part of the page | What the visitor sees |
| --- | --- |
| **Opening** | A black screen. The gold Rachy Designs logo appears, the word "RACHY" rises letter by letter, then a curtain lifts. It lasts about 2½ seconds and plays once per visit. |
| **Hero** (the first screen) | "Wear your Confidence" beside the gown on the dress form. As you scroll, the photo and words drift at different speeds, which gives a feeling of depth. |
| **Ribbon** | A gold band of moving text listing the services. It speeds up when you scroll faster and changes direction when you scroll back up. |
| **Chapter I: Our Story** | The brand story lights up word by word while a gold needle and thread "sew" across the screen. |
| **Chapter II: The Craft** | What makes the work special: craftsmanship, quality fabrics, designed for you. Two photos. |
| **Chapter III: The Process** | Six steps from first idea to finished outfit. The cards slide sideways while you scroll down. |
| **Chapter IV: The Collection** | The five services. Tap one to see its photo, description and a **Book this service** button. |
| **Chapter V: Our Purpose** | The Mission and Vision on a rich wine-coloured panel. |
| **Chapter VI: Our Work** | A gallery of finished outfits, including a video. Tap any photo to see it full-screen. |
| **Chapter VII: Our Promise** | "Every stitch tells a story…", signed by Racheal. |
| **Chapter VIII: Kind Words** | Client reviews. *Hidden on the live site until real reviews are added (see [Add real reviews](#add-real-reviews)).* |
| **Chapter IX: Your Chapter** | **The booking form.** *While reviews are hidden, this becomes Chapter VIII. The numbers update by themselves.* |
| **Contact** | Phone, WhatsApp, Instagram, TikTok, Facebook and a map of the studio with a "Get directions" link. |
| **Footer** (the bottom strip) | Quick links, the services (each one starts a booking), social links and copyright. |

### Always on screen

- **A green WhatsApp button** in the bottom corner, so visitors can send a message at any time. It hides itself while the booking form is on screen, so it doesn't cover the form.
- **A thin gold line** across the very top that fills up as you scroll down the page.
- **A menu bar** at the top. It slides away when you scroll down and comes back when you scroll up. On phones it opens a full-screen menu.
- **A side list of chapters** on large screens, showing where you are in the story.

### Works for everyone

- It adjusts itself to **phones, tablets and computers**.
- People whose phone or computer is set to **"reduce motion"** (an accessibility setting for those who feel unwell with moving screens) automatically get a calm version with fewer animations.
- Blind visitors using **screen readers** (software that reads the page aloud) hear a description of every photo.

---

## 2. How booking works

The client fills in a short form in **four steps**. A progress bar at the top of the form shows which step they are on.

| Step | What the client does | What the website checks |
| --- | --- | --- |
| **1. Service** | Chooses what they want made (e.g. *Bespoke Tailoring*) and, if they like, the occasion (*Wedding, Owambe, Convocation…*). | A service must be chosen. |
| **2. Schedule** | Chooses **in person** or **remote**, a **date** from a calendar, and a **time of day** (morning, afternoon or evening). | Date and time must be chosen. Dates run from tomorrow up to about 4 months ahead. |
| **3. Details** | Name, phone/WhatsApp number, email (optional), when the outfit is needed, whether they have fabric, and their ideas. | The name must be filled in. The phone number must have 10 to 14 digits. If an email is given, it must look like a real email. |
| **4. Confirm** | Reads a summary of everything and presses **Confirm booking**. | Nothing new. They can go back to any step to fix something. |

If something is missing, a short friendly message appears under that box in red, and the form won't move on until it is fixed.

Each booking gets a short **reference code** like `RD-7K3QF`. The code leaves out letters and numbers that look alike (O and 0, I and 1), so it is easy to read out over the phone.

### What Rachy receives

```
   Client presses "Confirm booking"
                 │
                 ▼
   📧  An EMAIL arrives in Rachy's inbox straight away
       Subject: New booking RD-7K3QF: Bespoke Tailoring, Sun 15 Nov (Ada Okafor)
       All the details + a "Reply on WhatsApp" link that opens a chat with the client
                 │
                 ▼
   💬  The client can also continue on WHATSAPP
       (the message is already written for them, with the same reference code)
                 │
                 ▼
   📅  The client can save the appointment to their own phone calendar
```

- **The email is the safety net.** Even if the client never sends the WhatsApp message, Rachy still gets the booking.
- **If the email can't be sent** (for example, the internet drops), the website tries again once by itself. If it still fails, it asks the client to send the booking on WhatsApp and offers a **Try again** button. The booking is never lost silently.
- **Until email alerts are switched on** (see the checklist below), bookings are delivered through **WhatsApp only**. The client must press "send" in WhatsApp for Rachy to receive them.

> A booking is a **request**. The appointment is confirmed when Rachy replies to the client. The website tells clients this clearly.

### Protection against spam

Automated "robot" programs roam the internet filling in forms. The booking form has two quiet traps for them:

1. **An invisible box.** Real people never see it, so they never fill it in. Robots fill in every box they find. If it has something in it, the booking is ignored.
2. **A speed check.** Nobody can genuinely complete four steps in under 4 seconds. Robots can. Bookings that fast are ignored.

The robot is shown a normal "thank you" screen, so it has no reason to try again. Real clients never notice any of this.

---

## 3. Checklist before going live

These must be done before the website is shared with the public:

- [ ] **Confirm the WhatsApp number.** The flyer and the original notes listed three different numbers (0813 583 **7929**, 0813 583 **7229** and 0813 583 **4929**). The site currently uses **0813 583 7929**. *Every booking goes to this number, so it must be right.* → [How to change it](#change-the-phone--whatsapp-number)
- [ ] **Switch on email alerts for bookings** (free, takes about 2 minutes). → [Step-by-step](#switch-on-email-alerts-for-bookings)
- [ ] **Make a test booking** on the live site and check that the email arrives. Check the Spam folder the first time and mark it "Not spam".
- [ ] **Add real client reviews**, or leave the Reviews section hidden. → [How](#add-real-reviews)
- [x] **Add the Instagram, TikTok and Facebook links.** Done: @racheal_samuel0 on Instagram, @ra_chea_l on TikTok, plus the Facebook page. → [How to change them](#change-social-media-links)
- [ ] **Check two details:** Racheal is described as *"Founder, Rachy Designs"*, and the booking form offers a *"Remote"* option (consult over WhatsApp and send measurements). Change or remove either if it isn't right.

---

## 4. A guided tour of the code (plain language)

This part explains **how the website is made**: what each folder and file is for, and how they work together. You don't need to understand it to update the website (Part 5 covers that), but it helps you know where things are and what is safe to touch.

### 4.1 First, what is "code"?

A website is a set of **written instructions** that a web browser (Chrome, Safari, Edge…) follows to draw the page on the screen. Those instructions are called **code**. They are just text files, and you can open them in any text editor.

A tailoring workshop is a good way to picture it:

| In a tailoring workshop | In this website |
| --- | --- |
| The **client's brief**: names, measurements, fabric choice | **`src/content.ts`**: all the words, photos, phone numbers and services |
| The **patterns** for each piece of the garment | The **component files** (`.tsx`). Each one draws one part of the page |
| The **sewing machine, scissors and tape measure** | The **outside tools (libraries)** the code uses, such as React and Tailwind |
| **Sewing the pieces together** into the finished garment | **Building** the website (`npm run build`), which produces the `dist` folder |
| The **shop window** where people see the garment | **Hosting** (Netlify or Vercel), which puts the website on the internet |
| The **order book** that records every change | **Git and GitHub**, which keep the full history of the code |

The most important idea: **the words and the design are kept apart.** The words live in one file (`content.ts`). The design and the moving parts live in other files. So the owner can change the text without touching any of the complicated parts.

### 4.2 What happens when someone opens the website

```
 1. A visitor types the website address, or taps a link
        │
        ▼
 2. The hosting service (Netlify / Vercel) sends back the finished website files
        │
        ▼
 3. index.html    The "shell" of the page: the title shown in the browser tab,
                  the description Google shows, the little tab icon,
                  and one empty box called "root"
        │
        ▼
 4. main.tsx      Loads the fonts and the colours, then switches the website on
                  inside that empty "root" box
        │
        ▼
 5. App.tsx       The running order. It lists every section of the page in order
                  (Hero, Story, Craft, … Booking, Contact) and adds the
                  things that are always on screen (menu, WhatsApp button…)
        │
        ▼
 6. Each section  Hero.tsx, Story.tsx, Services.tsx and the others each draw their own
                  part of the page, taking the words and photos from content.ts
        │
        ▼
 7. The visitor scrolls. The animation tools watch how far down the page they are
    and move, fade or reveal things to match.
```

All of this happens in the visitor's own browser in a fraction of a second. **There is no server or database** (a computer that stores information) behind this website. The only time it talks to another service is when a booking is emailed (see [4.6](#46-the-booking-system-file-by-file)).

### 4.3 The project folder, item by item

When you open the `Rachy_Designs` folder, this is what you see:

| Item | What it is | Should you edit it? |
| --- | --- | --- |
| `README.md` | **This guide.** `.md` means "Markdown", plain text with simple formatting. GitHub shows it on the project's front page. | Yes, freely |
| `index.html` | **The shell of the page** (step 3 above). It holds the browser tab title, the description Google shows in search results, the preview used when the link is shared on WhatsApp or Facebook, and business details for Google (phone, address, social links). | Only the text parts, with care |
| `src/` | **The source code**: everything that makes up the website. Short for "source". Explained in [4.4](#44-inside-src-the-rooms-of-the-workshop). | `src/content.ts` yes; the rest is for developers |
| `public/` | Files copied onto the website exactly as they are: the **little icons** shown in the browser tab and on a phone's home screen. | Only to replace the icons |
| `package.json` | **The shopping list.** It names every outside tool the website needs, and defines the short commands (`npm run dev`, `npm run build`). | Developers only |
| `package-lock.json` | The **exact version** of every tool on the shopping list, so every computer installs identical copies. Written automatically. | Never by hand |
| `node_modules/` | **The downloaded tools themselves.** Created when you run `npm install`. It is very large, so it isn't stored on GitHub. | Never. Delete it and run `npm install` again if it ever gets broken |
| `dist/` | **The finished website**, created by `npm run build`. This is what gets uploaded to the internet. It is recreated on every build and isn't stored on GitHub. | Never. It is overwritten every time |
| `vite.config.ts` | Settings for **Vite**, the tool that previews and builds the website. It switches on React and Tailwind. | Developers only |
| `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` | Settings for **TypeScript**, a checker that catches mistakes in the code before visitors ever see them. | Developers only |
| `eslint.config.js` | Rules for **ESLint**, a proofreader that points out sloppy or risky code. | Developers only |
| `.gitignore` | The list of things Git should **not** save to GitHub (such as `node_modules` and `dist`). | Rarely |
| `.git/` *(hidden)* | Git's private record of every saved change. | Never |

### 4.4 Inside `src`: the rooms of the workshop

```
src/
├── content.ts      ⭐ THE CONTROL PANEL: all words, contacts, services, photos, reviews, booking options
├── App.tsx         The running order of the page
├── main.tsx        The on switch
├── index.css       Colours, fonts and shared styles
│
├── assets/         Photos, the video and the logo
├── components/     The parts of the page you see (menu, sections, buttons…)
├── booking/        Everything to do with the booking form and delivering bookings
├── lib/            Small helper tools shared by other files
└── hooks/          A reusable "watcher" that notices which chapter is on screen
```

**What the file endings mean:**

| Ending | Kind of file | In plain words |
| --- | --- | --- |
| `.ts` | TypeScript | Information and logic: lists, settings, calculations. `content.ts` is one. |
| `.tsx` | TypeScript with page layout | A file that **draws something on the page**. Its layout parts look a lot like HTML. |
| `.css` | Style sheet | Colours, fonts and other looks. |
| `.webp`, `.png`, `.jpeg` | Images | `.webp` is a modern photo format that keeps quality but loads much faster. |
| `.mp4` | Video | The gallery video. |

#### The four main files

| File | Its job |
| --- | --- |
| [`src/content.ts`](src/content.ts) | **The control panel.** Every word a visitor reads, the phone number, social links, the five services, the gallery list, the reviews, the booking options (occasions, time slots) and the chapter names. If you only ever open one file, open this one. [Part 5](#5-how-to-change-things-on-the-website) explains how to edit it. |
| [`src/App.tsx`](src/App.tsx) | **The running order.** Lists every section in the order it appears. It also decides whether to play the opening curtain, switches on smooth scrolling, and adds a hidden "Skip to content" link for keyboard users. To move a whole section up or down the page, a developer changes the order here. |
| [`src/main.tsx`](src/main.tsx) | **The on switch.** Loads the four fonts and the style sheet, then starts the website inside `index.html`'s empty box. |
| [`src/index.css`](src/index.css) | **The colour and font book.** At the top (under `@theme`) are the brand colours (ivory, gold, wine, ink…), the four fonts and the gentle "ease" used by every animation. |

#### `src/assets/`: photos, video and logo

| Folder | What's inside |
| --- | --- |
| `assets/images/` | The outfit photos as `.webp` files, for example `pinstripe-suit.webp` and `gown-detail.webp`. The original `WhatsApp Image …jpeg` and `WhatsApp Video …mp4` files you sent are kept here as backups. The website doesn't use them, and they can be deleted if you have copies elsewhere. |
| `assets/videos/` | `teal-lace-corset-dress.mp4` and its **poster** (`…-poster.webp`), the still picture shown before the video plays. |
| `assets/brand/` | `logo-mark.png`: the gold "R" with the dress form, cut out from the flyer with a see-through background. |

### 4.5 Each part of the page and the file that makes it

Every visible part of the page has its own file in `src/components/`. Each file is called a **component**: a self-contained building block, like one piece of a garment pattern.

| What you see | File | What the code does, in plain words |
| --- | --- | --- |
| Opening curtain | `components/Preloader.tsx` | Shows the logo on black, raises the letters R-A-C-H-Y, draws a gold thread, then lifts the curtain. It freezes scrolling while it plays and remembers that you've seen it, so reloading the page skips it. |
| Top menu | `components/Navbar.tsx` | Logo, chapter links and a "Book a Fitting" button. It watches the scroll direction to hide or show itself, and underlines the chapter you're reading. On phones it opens a full-screen menu, closed with the ✕ or the Esc key. |
| Hero | `components/sections/Hero.tsx` | The big headline and the gown photo. As you scroll, it moves the words and photo at different speeds and slowly zooms the photo. The circling gold badge comes from `ui/SpinningBadge.tsx`. |
| Moving ribbon | `components/sections/Marquee.tsx` | Repeats the service names in a band that slides forever. It measures how fast you scroll and speeds up or reverses to match. |
| Our Story | `components/sections/Story.tsx` | This section is extra tall (about three screens), but the text stays still while you scroll through it. As you go, each word goes from faint to full colour, the key words (creativity, passion…) turn gold, and a needle follows a thread being drawn across the screen. |
| The Craft | `components/sections/Craft.tsx` | The craft paragraph, the three "why choose us" points and two photos that drift gently. |
| The Process | `components/sections/Process.tsx` | Six cards in a row. While you scroll **down**, the row slides **sideways**, so you see each step in turn. A **Start yours** button takes the visitor to the booking form. |
| The Collection | `components/sections/Services.tsx` | The five services as a list. Tap one and it opens to show its photo and description. **Book this service** fills in step 1 of the booking form for the client and glides down to it. |
| Our Purpose | `components/sections/Purpose.tsx` | Mission and Vision side by side on the wine panel. |
| Our Work | `components/sections/Work.tsx` | The gallery grid. Tapping a photo opens a full-screen viewer (a "lightbox"). You can move through it with the on-screen arrows or the keyboard's ← → keys, and close it with ✕ or Esc. The video only downloads and plays while it's on screen, to save the visitor's data. |
| Our Promise | `components/sections/OurPromise.tsx` | The promise quote, with "Racheal" in a handwriting font as a signature. |
| Kind Words | `components/sections/Reviews.tsx` | The client reviews. It only appears on the live site once `reviewsArePlaceholders` is set to `false` in `content.ts`. |
| Your Chapter | `booking/BookingSection.tsx` | The dark panel around the booking form, with three short notes on how it works: pick a date, Rachy confirms on WhatsApp, and the studio location. The form itself is explained in [4.6](#46-the-booking-system-file-by-file). |
| Contact | `components/sections/Contact.tsx` | Cards for phone, WhatsApp, Instagram, TikTok and Facebook, an embedded Google map of UNIBEN, and a "Get directions" link. |
| Footer | `components/sections/Footer.tsx` | Logo, links, the list of services (each one starts a booking), social icons and copyright. It also has a "Back to top" button. |
| Always-on extras | `components/Chrome.tsx` | Four small things: the **gold progress line** at the top, the **chapter list** on the side, the **floating WhatsApp button** (which hides while the booking form is on screen) and a faint **film-grain texture** that gives the page a printed, magazine feel. |

#### Small shared pieces: `src/components/ui/`

These are like buttons, zips and labels: small pieces used again and again across the page, so they look the same everywhere.

| File | What it is |
| --- | --- |
| `ui/Button.tsx` and `ui/button-class.ts` | The rounded buttons in their four styles (dark, gold, outlined, and light for dark backgrounds). On hover, a colour sweeps up from the bottom. |
| `ui/Logo.tsx` | The logo picture plus the "RACHY — DESIGNS —" lettering. Clicking it scrolls back to the top. |
| `ui/Icons.tsx` | Hand-drawn icons for WhatsApp, Instagram, TikTok, Facebook and a dress form. (The icon pack the site uses doesn't include brand logos.) |
| `ui/Reveal.tsx` | Makes things **fade and rise into view** as you scroll to them. `MaskWords` makes headings appear word by word. |
| `ui/ChapterLabel.tsx` | The small gold labels like "Chapter IV · The Collection". The number is worked out automatically from the chapter list in `content.ts`. |
| `ui/SpinningBadge.tsx` | The slowly turning circular gold badge in the Hero. |

### 4.6 The booking system, file by file

Think of the booking system as a **receptionist**: it takes the client's details, checks they make sense, writes them up neatly, and passes them to Rachy by email and WhatsApp.

All its files are in `src/booking/`:

| File | Its role | In plain words |
| --- | --- | --- |
| `context.ts` | **The booking form's blank template** | Lists every piece of information a booking holds (service, date, name, phone…), the four step names, and the possible outcomes (sending, emailed, WhatsApp only, failed). |
| `BookingProvider.tsx` | **The shared notepad** | Keeps the booking-in-progress in memory so that **any part of the page** can use it. That's how a "Book this service" button in the Collection, Process or Footer can fill in the form further down the page. It also creates the reference code. |
| `BookingWizard.tsx` | **The form itself** | Draws the four steps, checks each answer (see the table in [Part 2](#2-how-booking-works)), sets the spam traps, sends the booking when the client confirms, and shows the right "finished" screen. It is the biggest file in the project. |
| `Calendar.tsx` | **The date picker** | Draws a month calendar (weeks start on Monday). Past dates and dates more than about 4 months away can't be chosen. It works with a mouse, a finger or the keyboard. |
| `message.ts` | **The writer** | Writes up the booking three ways: the **WhatsApp message** the client sends, the **email** Rachy receives (with a one-tap "Reply on WhatsApp" link and the time in Nigerian time), and a **calendar file** the client can save to their phone. It also tidies phone numbers: `0801 234 5678` becomes `2348012345678`, the format WhatsApp needs. |
| `notify.ts` | **The messenger** | Sends the email through **Web3Forms**, a free email-delivery service (see [4.9](#49-the-outside-tools-libraries-the-website-uses)). It gives up after 15 seconds instead of hanging, tries once more if the internet or the service had a hiccup, and keeps sending even if the client closes the tab straight away. |
| `BookingSection.tsx` | **The reception desk** | The section that holds the form on the page (described in [4.5](#45-each-part-of-the-page-and-the-file-that-makes-it)). |

**What happens, step by step, when a client presses "Confirm booking":**

1. The form checks the spam traps. If it looks like a robot, it pretends to succeed and stops there.
2. `message.ts` writes up the email, and `notify.ts` sends it to Web3Forms with Rachy's access key.
3. Web3Forms emails the booking to Rachy's inbox.
4. The client sees **"Rachy has your booking"** with their reference code, a button to continue on WhatsApp (message pre-written), and a button to add the date to their calendar.
5. If sending failed twice, the client sees **"Send your booking on WhatsApp"** instead, with a WhatsApp button and **Try again**. The reference code stays the same, so Rachy can match them up.

### 4.7 The helper files: `src/lib/` and `src/hooks/`

These are the small tools in the workshop drawer. Other files borrow them so the same job isn't written out many times.

| File | What it does |
| --- | --- |
| `lib/scroll.ts` | Glides the page to a chosen section (used by every menu link and "Book" button). It also **freezes scrolling** while the menu, the photo viewer or the opening curtain is open, and unfreezes it afterwards. |
| `lib/whatsapp.ts` | Builds WhatsApp links (`wa.me/234…`) with a ready-written message. |
| `lib/date.ts` | Date helpers: "tomorrow", "4 months from now", the days of a month for the calendar, and writing dates nicely ("Sunday, 15 November 2026"). |
| `lib/format.ts` | Turns numbers into Roman numerals (4 → IV) for the chapter labels. |
| `lib/motion.ts` | The shared animation "feel": how fast things move and how they slow down, so every animation on the site moves the same way. |
| `hooks/useActiveSection.ts` | A **watcher** that notices which section is crossing the middle of the screen, so the menu and the chapter list can highlight it. ("Hook" is React's word for a reusable piece of behaviour.) |

### 4.8 How the pieces work together

```
                       ┌──────────────────────────────┐
                       │          content.ts          │
                       │  words · photos · contacts · │
                       │  services · gallery · reviews│
                       └──────────────┬───────────────┘
                                      │  every part of the page reads from here
        ┌──────────────┬──────────────┼──────────────┬──────────────┐
        ▼              ▼              ▼              ▼              ▼
     Navbar     Hero · Story ·    Services        Booking form    Contact ·
                Craft · Work…   "Book this ──┐    (BookingWizard)  Footer
                                  service"   │         ▲
                                             ▼         │
                                     ┌───────────────────────┐
                                     │   BookingProvider     │
                                     │  (the shared notepad) │
                                     └───────────────────────┘
                                                 │ on "Confirm"
                                                 ▼
                                   message.ts writes it up ─► notify.ts sends it
                                                 │
                                 ┌───────────────┴────────────────┐
                                 ▼                                ▼
                       📧 Web3Forms → Rachy's inbox    💬 WhatsApp → Rachy's phone
```

Three ideas hold it all together:

1. **One source of truth.** Words and contact details are written **once**, in `content.ts`. Change the phone number there and it updates in the menu, the contact cards, the footer, the WhatsApp buttons and the booking messages, all at the same time.
2. **One building block per job.** Each section is its own file, so a change to the gallery can't accidentally break the booking form.
3. **A shared notepad for bookings.** `BookingProvider` sits around the whole page, so any button anywhere can start a booking.

### 4.9 The outside tools (libraries) the website uses

Nobody builds a website entirely from scratch, just as a tailor doesn't make their own sewing machine. These ready-made tools, called **libraries** or **packages**, are listed in `package.json` and downloaded by `npm install`. All of them are free.

| Tool | Its job, like a workshop tool | Website |
| --- | --- | --- |
| **React** | **The sewing machine.** It builds the page out of components and redraws the right parts when something changes (for example, when the client picks a date). | [react.dev](https://react.dev) |
| **TypeScript** | **The tape measure: measure twice, cut once.** It checks the code for mistakes, such as a misspelt name or a missing piece of information, before the website is built. | [typescriptlang.org](https://www.typescriptlang.org) |
| **Vite** | **The workshop assistant.** It shows a live preview while you work (`npm run dev`) and packs the finished website into `dist` (`npm run build`). | [vite.dev](https://vite.dev) |
| **Tailwind CSS** | **The swatch book.** A shorthand for styling. In the code, `bg-ivory` means "ivory background" and `text-gold` means "gold text". | [tailwindcss.com](https://tailwindcss.com) |
| **Motion** | **The choreographer.** All the movement: fading in, sliding, words lighting up, the needle and thread. | [motion.dev](https://motion.dev) |
| **Lenis** | **The silk lining.** Makes scrolling feel smooth and weighted instead of jumpy. It switches itself off for visitors who prefer reduced motion. | [lenis.darkroom.engineering](https://lenis.darkroom.engineering) |
| **Lucide** | **The box of embroidered badges.** A set of clean icons (calendar, ruler, scissors, arrows…). | [lucide.dev](https://lucide.dev) |
| **Fontsource** | **The thread rack.** The four fonts, stored inside the website so they always load: **Cinzel** (headings in capitals), **Cormorant Garamond** (elegant body text), **Jost** (clean small text) and **Pinyon Script** (handwriting). | [fontsource.org](https://fontsource.org) |
| **clsx** | **A pin cushion.** A tiny helper that combines styles neatly. | |
| **ESLint** | **The proofreader.** Flags risky or untidy code. Used only while developing; it isn't part of the live website. | [eslint.org](https://eslint.org) |
| **Web3Forms** *(an online service, not a download)* | **The postman.** Receives each booking from the website and emails it to Rachy. No account or password needed, just an access key. | [web3forms.com](https://web3forms.com) |

### 4.10 How to read a code file

Code looks strange at first, but most of it follows a few simple patterns. Here is a **real** piece of `src/content.ts`:

```ts
/* ─── Brand ─────────────────────────────── */
export const brand = {
  name: 'Rachy Designs',
  tagline: 'Wear Your Confidence',
  motto: ['Style', 'Elegance', 'Perfection'],
  founder: 'F. Racheal Samuel',
}
```

| Piece | What it means |
| --- | --- |
| `/* … */` or `// …` | A **comment**: a note for humans. The computer ignores it. `content.ts` is full of helpful comments. |
| `export const brand = {` | "Here is a bundle of information called **brand**, and other files may use it (*export*)." `const` means it's a fixed value. |
| `name: 'Rachy Designs',` | A **label** (`name`) and its **value** (`'Rachy Designs'`). Text always sits inside quote marks, and each line ends with a comma. |
| `['Style', 'Elegance', 'Perfection']` | Square brackets hold a **list**. |
| `}` | Closes the bundle that `{` opened. Brackets always come in pairs. |

And here is a **simplified** example of a component, the kind of file that draws part of the page:

```tsx
import { brand } from '../../content'

export function Purpose() {
  return (
    <section id="purpose">
      <h2>Our Mission</h2>
      <p>{brand.mission}</p>
    </section>
  )
}
```

1. `import { brand } from '../../content'`: "borrow the `brand` bundle from `content.ts`." (`../` means "go up one folder".)
2. `export function Purpose()`: "this building block is called **Purpose**."
3. `<section>`, `<h2>`, `<p>`: page **tags**, like those in a normal web page: a section, a heading and a paragraph.
4. `{brand.mission}`: curly brackets mean **"insert a value here"**. This one puts the mission text from `content.ts` into the paragraph.

The real files also contain `className="…"` (the Tailwind styling) and `motion.` tags (the animations), but the idea is the same.

### 4.11 What's safe to edit

| | Files | Why |
| --- | --- | --- |
| 🟢 **Safe** | `src/content.ts`, photos in `src/assets/images/`, videos in `src/assets/videos/`, `README.md` | Made for everyday changes. Follow the [golden rules](#the-one-file-you-need-srccontentts). |
| 🟡 **With care** | `index.html` (text only), the colours at the top of `src/index.css`, the logo and tab icons | Small, simple changes are fine. Keep a copy first. |
| 🔴 **Developers only** | `src/components/`, `src/booking/`, `src/lib/`, `src/hooks/`, `App.tsx`, `main.tsx`, and the settings files (`package.json`, `vite.config.ts`, `tsconfig…`, `eslint.config.js`) | These hold the logic. A small slip can break the page or stop bookings arriving. |
| ⛔ **Never by hand** | `node_modules/`, `dist/`, `package-lock.json`, `.git/` | Created by the tools themselves and overwritten automatically. |

**Made a mistake?** Nothing is permanent. Press Ctrl + Z to undo. If changes have already been saved with Git, every earlier version is still on GitHub and can be brought back (see [Part 8](#8-saving-your-changes-to-github)).

---

## 5. How to change things on the website

### The one file you need: `src/content.ts`

**Almost everything a visitor reads lives in one file: [`src/content.ts`](src/content.ts).** Text, phone numbers, services, photos, reviews and booking options are all there, with notes explaining each part.

You can edit it in any text editor. We recommend the free **[Visual Studio Code](https://code.visualstudio.com/)** ("VS Code").

**Golden rules when editing:**

1. **Only change the words between the quote marks.** For example, in `tagline: 'Wear Your Confidence',` change only `Wear Your Confidence`.
2. **Keep the quote marks and the comma at the end of the line.**
3. **Apostrophes:** if your text contains an apostrophe, use the curly one `’` (as in `Rachy’s`) instead of the straight one `'`. A straight `'` inside the quotes ends the text early and breaks the line.
4. **Save the file** (Ctrl + S on Windows, Cmd + S on Mac). If the website is open on your computer (see [Part 6](#6-how-to-open-the-website-on-your-computer)), it updates by itself within a second.
5. **If the page goes blank or shows a red error**, press Ctrl + Z to undo your last change and save again.

### Where to find things in `content.ts`

Use **Ctrl + F** (Cmd + F on Mac) in your editor to search for these:

| What you want to change | Search for |
| --- | --- |
| Hero photo and "The Craft" photos | `export const images` |
| Tagline, slogan, story, mission, vision, promise, founder's name | `export const brand` |
| Phone, WhatsApp, social links, location | `export const contact` |
| Email alerts key | `export const bookingNotifications` |
| The five services (name, description, photo) | `export const services` |
| The three "why choose us" points | `export const pillars` |
| The six process steps | `export const processSteps` |
| Gallery photos and video | `export const gallery` |
| Reviews | `export const reviews` |
| Occasions, time slots, in person / remote | `export const occasions`, `export const timeSlots`, `export const appointmentModes` |
| Chapter names | `const allChapters` |

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
5. Save, put the updated website online ([Part 7](#7-how-to-put-the-website-online)), then **make a test booking from your phone or computer browser** and check the inbox.

Good to know:

- The key is **safe to have in the website's code**. It can only deliver messages to your inbox.
- On the **free plan, Web3Forms handles around 250 submissions a month**. Check their website for current limits.
- Turn on **email notifications on Rachy's phone** (e.g. in the Gmail app) so new bookings pop up straight away.
- Web3Forms blocks automated "robot" traffic, so **always test with a real browser**, not with testing software.

### Change any text (story, mission, vision, promise, services)

Find the right part using the table in [Where to find things](#where-to-find-things-in-contentts), then change the words between the quote marks.

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
   - `alt`: a short description of the photo. **Screen readers read it aloud to blind visitors, and Google uses it.**
   - `shape`: `'tall'`, `'portrait'` or `'square'`, to vary the gallery layout.

**To add a video**, put the `.mp4` in `src/assets/videos/`, import it the same way, and add `video: yourVideoName,` to the entry. Keep `src:` pointing at a still image to show before it plays. See the *Teal Lace Corset Dress* entry for an example.

**To remove a photo**, delete its whole `{ … },` block from the list.

### Change a service photo or the hero image

- **Service photos:** in `export const services`, change the `image:` of that service to another imported photo.
- **Hero and "The Craft" photos:** change them in `export const images` near the top of the file.

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

While it says `true`, the Reviews section only shows on your own computer, never on the live site. That way sample reviews are never published by accident. When it becomes `false`, the chapter numbers update themselves (Kind Words becomes Chapter VIII and Booking becomes Chapter IX).

### Change social media links

The links live in the **Contact** part of `src/content.ts`:

```ts
  instagram: { handle: '@racheal_samuel0', url: 'https://www.instagram.com/racheal_samuel0' },
  tiktok: { handle: '@ra_chea_l', url: 'https://www.tiktok.com/@ra_chea_l' },
  facebook: { handle: 'Rachy Designs', url: 'https://www.facebook.com/share/1Dv9h7aKnD/' },
```

- `handle` is the name shown on the page, and `url` is where the link goes.
- When copying a link from the Instagram or TikTok app, remove anything after a `?` (e.g. `?psln=…` or `?igsh=…`). It's only tracking information.
- Also update the same links in [`index.html`](index.html) (the `"sameAs"` list) so Google connects the profiles to the website.

### Change the logo

The logo file is `src/assets/brand/logo-mark.png` (the gold "R" with the dress form, taken from the flyer). Replace it with a new image of the **same name**. A PNG with a see-through background works best. The small icons shown in browser tabs are `public/favicon.png` and `public/apple-touch-icon.png`.

### Change colours or fonts

Colours and fonts are set at the top of [`src/index.css`](src/index.css), under `@theme`. For example, `--color-gold: #b88a3e;` is the main gold. The `#b88a3e` is a **colour code**. You can find codes for any colour by searching "colour picker" on Google. This is best left to a developer, because colours affect how readable the text is.

---

## 6. How to open the website on your computer

You only need this to **preview changes** before putting them online.

**One-time setup:**

1. Install **Node.js** from **https://nodejs.org** and choose the **LTS** version. This is the free engine that runs the website's tools.
2. Open the project folder in **Visual Studio Code**.
3. Open the built-in terminal: menu **Terminal → New Terminal**.
4. Type this and press Enter. It downloads the website's tools into `node_modules`, which takes a minute:
   ```
   npm install
   ```

**Every time you want to preview:**

1. In the terminal, type:
   ```
   npm run dev
   ```
2. Open **http://localhost:5173** in your browser. ("localhost" means "this computer". Only you can see it.)
3. Edit and save files. The page updates automatically.
4. To stop, click in the terminal and press **Ctrl + C**.

---

## 7. How to put the website online

The website must be **built** into a ready-to-publish folder called `dist`, then uploaded to a **hosting service** (a company that keeps websites online). Both options below are **free** for a site like this.

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

## 8. Saving your changes to GitHub

**Git** keeps a history of every change to the code, like a "track changes" for the whole project. **GitHub** is the website that stores that history safely online. Your repository is **https://github.com/Tallest18/Rachy_Designs**.

Each saved change is called a **commit** and comes with a short note describing it. Sending your commits up to GitHub is called a **push**.

**The easy way:** install **[GitHub Desktop](https://desktop.github.com/)**, open this folder, type a short note about what you changed, then click **Commit** and **Push**.

**From the terminal:**

```
git add -A
git commit -m "Describe what you changed, e.g. Added three new gallery photos"
git push
```

If the site is connected to Netlify or Vercel ([Option A](#option-a-automatic-updates-from-github-recommended)), the live website updates a minute or two after you push.

**Going back to an earlier version:** on GitHub, open the repository and click **Commits** to see every change ever made. GitHub Desktop's **History** tab lets you undo ("revert") any of them.

---

## 9. Troubleshooting

| Problem | What to do |
| --- | --- |
| `npm` is not recognised | Node.js isn't installed, or the terminal was open during installation. Install Node.js ([Part 6](#6-how-to-open-the-website-on-your-computer)), then close and reopen VS Code. |
| The page is blank or shows a red error after an edit | Undo your last change (Ctrl + Z) and save. Usually a quote mark or comma went missing. |
| Booking emails don't arrive | Check that the key is in `src/content.ts` and that the updated site is online. Look in **Spam**. Test from a normal browser. Check the monthly limit on web3forms.com. |
| WhatsApp opens the wrong number | Fix `whatsapp:` in `src/content.ts` (international format, no `+` or spaces). |
| The live site still shows old content | Wait a couple of minutes after pushing, then hard-refresh the page (Ctrl + Shift + R, or Cmd + Shift + R on Mac). |
| The browser tab still shows an old icon | Browsers keep tab icons for a while. Hard-refresh, or open the site in a private window. |
| A photo looks blurry | Use a larger photo (at least 1000 pixels tall). |
| Reviews don't show on the live site | Set `reviewsArePlaceholders` to `false` once real reviews are added. |
| The opening curtain doesn't play again | It plays once per visit. Close the tab and open the site in a new one to see it again. |
| Something seems broken after installing | Delete the `node_modules` folder, then run `npm install` again. |

---

## 10. For developers: technical reference

### Tech stack

| Tool | Version | Used for |
| --- | --- | --- |
| [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org) | React 19, TS ~6 | UI and type safety (strict mode) |
| [Vite](https://vite.dev) | 8 | Dev server and production build. Requires Node `^20.19` or `>=22.12` |
| [Tailwind CSS](https://tailwindcss.com) | v4 via `@tailwindcss/vite` | Styling. Tokens in `src/index.css` under `@theme`, custom utilities via `@utility` |
| [Motion](https://motion.dev) (`motion/react`) | 14 | Scroll-linked (`useScroll`, `useTransform`, `useVelocity`), entrance, layout and presence animations |
| [Lenis](https://lenis.darkroom.engineering) | 1.3 | Smooth scrolling (`autoRaf`), disabled for `prefers-reduced-motion` |
| [Lucide](https://lucide.dev) | `lucide-react` v1 | Icons. v1 dropped brand icons, so WhatsApp/Instagram/TikTok/Facebook are custom SVGs in `ui/Icons.tsx` |
| [Fontsource](https://fontsource.org) | 5 | Self-hosted Cinzel, Cormorant Garamond, Jost, Pinyon Script |
| [Web3Forms](https://web3forms.com) | REST | Emails each booking to the owner. No backend |
| ESLint + `eslint-plugin-react-hooks` | 10 / 7 | Linting, including the React Compiler rules (no `setState` in effects, pure updaters) |

### Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at http://localhost:5173 |
| `npm run build` | Type-check (`tsc -b`) and build the production site into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

### Folder structure

```
Rachy_Designs/
├── index.html                 Title, meta description, Open Graph tags, JSON-LD (ClothingStore), favicons
├── public/                    Copied as-is: favicon.png, apple-touch-icon.png
└── src/
    ├── content.ts             ⭐ Single source of truth: copy, contacts, services, gallery, reviews, booking options, chapters
    ├── App.tsx                Composition: preloader, navbar, sections in order, floating UI; Lenis setup; MotionConfig
    ├── main.tsx               Entry: fonts, global CSS, mounts <App />
    ├── index.css              Tailwind import, @theme tokens (colours, fonts, easings, keyframes), custom utilities
    ├── assets/
    │   ├── brand/             logo-mark.png (transparent, extracted from the flyer)
    │   ├── images/            Optimised .webp photos (+ original WhatsApp uploads, unused)
    │   └── videos/            Gallery video + poster frame
    ├── booking/
    │   ├── context.ts         BookingData, STEPS, SubmissionStatus, useBooking()
    │   ├── BookingProvider.tsx  Booking state: data, [step, direction], reference, submission; bookService()
    │   ├── BookingSection.tsx Section layout around the wizard
    │   ├── BookingWizard.tsx  4-step form, validate(), honeypot + MIN_HUMAN_MS, confirm/retry/handoff, finished screens
    │   ├── Calendar.tsx       Month grid of labelled day buttons (Monday-first, min/max dates, aria-pressed)
    │   ├── message.ts         WhatsApp text, owner email fields, toWhatsAppNumber(), .ics download
    │   └── notify.ts          Web3Forms POST: FormData, keepalive, 15 s abort, one retry on network/5xx/429
    ├── components/
    │   ├── Navbar.tsx         Hide-on-scroll-down, active-section underline, full-screen mobile menu
    │   ├── Preloader.tsx      Opening curtain (sessionStorage flag, skipped for reduced motion)
    │   ├── Chrome.tsx         ScrollProgress, ChapterRail, FloatingWhatsApp, Grain
    │   ├── sections/          Hero, Marquee, Story, Craft, Process, Services, Purpose, Work, OurPromise, Reviews, Contact, Footer
    │   └── ui/                Button/ButtonLink, Reveal/MaskWords, ChapterLabel/Eyebrow, Logo/LogoMark, Icons, SpinningBadge
    ├── hooks/
    │   └── useActiveSection.ts  IntersectionObserver with a -50% rootMargin (section crossing viewport centre)
    └── lib/
        ├── scroll.ts          Lenis bridge: registerLenis(), scrollToId(), anchorTo(), ref-counted lockScroll()/unlockScroll()
        ├── motion.ts          EASE curves, shared variants (fadeUp, riseIn), wrap()
        ├── date.ts            startOfDay, addDays, monthGrid, formatters
        ├── format.ts          toRoman(), pad2()
        └── whatsapp.ts        whatsappLink(), enquiryLink
```

### Conventions

- **All copy goes in `content.ts`.** Components import from it and never hard-code business details. `chapters` derives Roman numerals and drops "Kind Words" when reviews are hidden.
- **Scrolling goes through `lib/scroll.ts`**, never `window.scrollTo` directly, so it works with and without Lenis. Anything that freezes the page (menu, lightbox, preloader) uses `lockScroll()`/`unlockScroll()`, which are reference-counted so overlapping locks don't release early.
- **Motion** is configured with `<MotionConfig reducedMotion="user">` at the root. Pinned or scroll-driven sections check `useReducedMotion()` and fall back to normal layouts.
- **Tailwind v4 syntax:** important uses the suffix form (`px-6!`), gradients are `bg-linear-to-*`, and tokens are referenced as `bg-gold`, `text-wine`, `font-display`, `ease-luxe`.
- **React Compiler lint rules** are enforced: derive values instead of syncing state in effects, and keep state updaters pure.

### How the scroll storytelling works

- **Chapters:** `chapters` in `content.ts` numbers the sections (I, II, III…). `ChapterLabel` renders the label, `ChapterRail` is the side navigation, and `useActiveSection` drives the highlight.
- **Hero parallax (`Hero.tsx`):** `useScroll({ target, offset })` progress is mapped with `useTransform` to the text's `y`/opacity, the frame's `y`, and the image scale.
- **Word-by-word story (`Story.tsx`):** a 320vh section with a sticky inner panel. Each word's opacity is mapped from `scrollYProgress`. The gold thread is an SVG path drawn with `pathLength`, and the needle is positioned along it with `getPointAtLength`.
- **Horizontal process (`Process.tsx`):** section height = `100svh + track overflow`, and the track's `x` follows vertical scroll progress. A `ResizeObserver` keeps it correct on resize.
- **Velocity marquee (`Marquee.tsx`):** `useVelocity(scrollY)` feeds `useAnimationFrame`, which speeds the ribbon up and flips its direction.
- **Reduced motion:** Lenis is not created, the preloader is skipped, and the pinned sections render as static layouts.

### Booking delivery in detail

1. `BookingWizard` validates each step with `validate(step, data)`. A hidden honeypot input (`company_website`) and `MIN_HUMAN_MS = 4000` silently drop bots. They get a fake `notified` status, and no request is sent.
2. On **Confirm**, `notifyOwner()` POSTs `FormData` to `https://api.web3forms.com/submit`: a "simple" CORS request (no preflight) with `keepalive`, a 15-second `AbortController` timeout, and one retry after 1.5 s on network errors, 5xx or 429.
3. On success the status becomes `notified`. On failure it becomes `failed`: the client sees a pre-filled WhatsApp link and a **Try again** button that reuses the same reference. Late responses are ignored if the reference has changed.
4. Without a key, the final button is a direct `wa.me` link (status `whatsapp-only`). In development a reminder banner appears, and in production a console warning is logged.
5. The key can also be supplied at build time as `VITE_WEB3FORMS_ACCESS_KEY`, which takes priority over `content.ts`.
6. Web3Forms rejects server-side and headless requests (403), so delivery can only be verified from a real browser.

### Accessibility and performance

- Semantic landmarks and headings, a skip link, labelled form fields with `aria-invalid` and error messages, a calendar of labelled buttons, a keyboard-operable lightbox (←/→/Esc), and visible focus styles.
- `prefers-reduced-motion` is respected throughout.
- Photos are compressed WebP files and lazy-loaded below the fold. The gallery video only loads and plays while in view.
- Fonts are self-hosted, so there are no requests to Google Fonts.

---

## 11. Glossary

| Word | Meaning |
| --- | --- |
| **Access key** | A code from Web3Forms that tells it which inbox to email bookings to. |
| **Alt text** | A short written description of a photo, read aloud for blind visitors and used by Google. |
| **Animation** | Anything that moves on the page: fading in, sliding, zooming. |
| **Browser** | The app used to visit websites: Chrome, Safari, Edge, Firefox. |
| **Build** | Turning the source code into the final, fast website files (the `dist` folder). |
| **Code** | Written instructions that tell the browser how to draw the page. |
| **Commit** | A saved snapshot of your changes, with a short note. |
| **Component** | One self-contained building block of the page, such as the menu, the gallery or a button. Each lives in its own `.tsx` file. |
| **Deploy / hosting** | Putting the built website on the internet so anyone can visit it. Netlify and Vercel are hosting services. |
| **Export / import** | One file offering information to others (*export*), and another file borrowing it (*import*). |
| **Favicon** | The tiny icon shown in the browser tab. |
| **Folder / directory** | The same thing: a container for files. |
| **Git / GitHub** | Git records every change to the code. GitHub stores that record safely online. |
| **Honeypot** | An invisible form box that only robots fill in, used to catch spam. |
| **Hook** | In React, a reusable piece of behaviour, such as "watch which section is on screen". |
| **HTML** | The basic language of web pages. It describes headings, paragraphs, images and links. |
| **Lightbox** | The full-screen photo viewer that opens when a gallery photo is tapped. |
| **Library / package** | A ready-made tool written by someone else that the website uses, such as React or Motion. |
| **localhost** | "This computer". The preview at `http://localhost:5173` is only visible to you. |
| **Node.js / npm** | Node.js is the free engine that runs the website's tools. npm installs those tools and runs the commands. |
| **Parallax** | Things moving at different speeds while you scroll, which creates a sense of depth. |
| **Push** | Uploading your commits to GitHub. |
| **Reduced motion** | A phone or computer setting for people who prefer less movement on screen. The website respects it. |
| **Repository (repo)** | The project folder stored on GitHub, with its full history. |
| **Responsive** | Adjusting the layout to fit any screen size, from phone to large monitor. |
| **Screen reader** | Software that reads a page aloud for people who are blind or have low vision. |
| **SEO** | "Search engine optimisation": helping Google understand the website and show it in results. |
| **Source code (`src`)** | The original, editable files the website is built from. |
| **State** | What the website is "remembering" right now, such as which step of the booking form the client is on. |
| **Structured data** | Hidden business details in `index.html` (phone, address, social links) written in a format Google reads. |
| **Terminal** | A window where you type commands (in VS Code: Terminal → New Terminal). |
| **TypeScript** | A version of JavaScript (the language browsers run) that checks for mistakes before the website is built. |
| **WebP** | A modern image format that looks as good as JPEG but loads faster. |

---

© Rachy Designs. All rights reserved. Photos and logo belong to Rachy Designs and may not be reused without permission.
