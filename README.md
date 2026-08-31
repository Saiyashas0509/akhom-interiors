# Architectural Serenity

AKHOM INTERIORS — PREMIUM WEBSITE REDESIGN

"Build a single full-viewport marketing landing page for **Boomerang**, a conversational AI platform for financial institutions. Tech: React + TypeScript + Vite + Tailwind CSS + Lucide React (`ArrowRight` only). No other UI libraries.

---

### Fonts (exact)

Load in `index.html`:

1. **Display / serif:** `P22 Mackinac W01 Book`  
   `https://db.onlinewebfonts.com/c/9d4d074c9335825a23cce178ee03b498?family=P22+Mackinac+W01+Book`

2. **UI / sans:** Inter weights 300, 400, 500, 600  
   `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap`

Tailwind `fontFamily`:
- `sans: ['Inter', 'sans-serif']`
- `serif: ['P22 Mackinac W01 Book', 'Georgia', 'serif']`

Body: `font-family: 'Inter', sans-serif` with antialiased smoothing. Page title: `Build Lasting Relationships`. Background: pure white `#FFFFFF`. Primary text/chrome: `#191919`.

---

### CloudFront video (exact URL — required)

```
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_090628_7052d8a6-a094-4341-a4a2-ad58493a67a9.mp4
```

---

### Hero video background — boomerang playback (critical behavior)

Implement a `BoomerangVideoBg` absolute full-bleed background (`absolute inset-0 z-0`) with:

1. Wrapper: `scale-[1.15] origin-top overflow-hidden` (slightly oversized, anchored from top).
2. Hidden/capture ``: `src` = CloudFront URL above, `muted`, `playsInline`, `preload="auto"`, `crossOrigin="anonymous"`, `className="w-full h-full object-cover object-top"`.
3. On load: play once (no native loop). While playing, capture every frame to offscreen canvases (prefer `requestVideoFrameCallback`, else `requestAnimationFrame`). Cap capture width at **960px**, scale height proportionally. Deduplicate by `currentTime`.
4. On `ended`: stop capture, store frames, switch from video to a display `

` (`w-full h-full object-cover object-top`).
5. Canvas playback: ping-pong / boomerang at **30fps** (`interval = 1000/30`). Advance frame index forward to last, then reverse to first, forever.
6. While frames aren’t ready, show the live video; once ready, hide video (`display: none`) and show canvas.

This is the main motion: a soft looping forward→reverse background video behind the hero.

---

### Logo (exact SVG)

Custom SVG mark (not Lucide), `viewBox="0 0 256 256"`, `fill="currentColor"`:

```
M 144 256 L 27.598 256 L 144 139.598 Z
M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z
M 0 204.402 L 0 112 L 92.402 112 Z
```

Navbar size: `w-6 h-6 text-[#191919]`. Wordmark beside it: “Boomerang”, `font-semibold text-base tracking-tight text-[#191919]`, gap `2.5`.

---

### Fixed navbar

- `fixed top-0 left-0 right-0 z-50`
- Padding: `px-6 sm:px-10 md:px-14`, `py-4 sm:py-5`
- Three zones: logo left | center links (hidden below `md`) | CTA right
- Links: Product, Solutions, Pricing, Company — `text-sm text-[#191919]/70`, hover to full `#191919`, `transition-colors duration-200`, hrefs `#product` `#solutions` `#pricing` `#company`
- CTA button: “Book A Demo” — `px-5 py-2.5 bg-[#191919] text-white text-sm font-medium rounded-lg hover:bg-[#191919]/90 transition-colors duration-200`
- No nav background / blur / border — transparent over the video

---

### Hero section (first viewport = full screen)

- `relative flex flex-col items-center overflow-hidden h-screen`
- Video bg at `z-0`; content at `z-10`

**Hero copy block** (centered):
- Top padding: `pt-24 sm:pt-26 md:pt-32`, horizontal `px-4 sm:px-6`
- H1 (serif Mackinac):  
  `Build lasting` + line break + `relationships.`  
  Classes: `font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tighter text-[#191919] font-normal`
- Subcopy max-width `max-w-sm sm:max-w-md`, `mt-5 sm:mt-6 md:mt-8`, `text-sm md:text-base text-[#191919]/70 leading-relaxed`:  
  “Conversational AI platform for modern financial institutions — agents that handle the full borrower lifecycle across email, SMS, and voice.”
- Second “Book A Demo” button: `mt-6 sm:mt-8 md:mt-10 px-6 sm:px-8 py-3 sm:py-3.5` same black pill styling as nav CTA

**Bottom info panel** (`mt-auto`, sits on bottom of viewport):
- Outer: `w-full max-w-5xl px-4 sm:px-6`
- Card: `bg-white/90 backdrop-blur-sm border border-gray-200 border-b-0 pt-8 sm:pt-12 md:pt-16 px-5 sm:px-8 md:px-12 pb-0 shadow-sm` — flush to bottom (no bottom border/radius)
- **Row 1 — 2 cols** (`md:grid-cols-2`, gaps `6 / 8 / 16`):
  - Left: micro-label `WHAT DO WE DO?` — `text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium`  
    then H2 serif: “Conversations that / build momentum” — `mt-3 text-2xl sm:text-3xl md:text-4xl font-serif font-normal leading-tight tracking-tight` (line break from `sm` up)
  - Right: body bottom-aligned — `text-sm md:text-[15px] text-[#191919]/70 leading-relaxed`:  
    “Conversational AI built for regulated financial institutions. Agents that hold a real conversation, plug into the systems you run, and show their work.”
- **Hairline divider:** `mt-6 sm:mt-8 md:mt-10 h-px bg-gray-200 w-full`
- **Row 2 — 3 interactive rows** (`sm:grid-cols-3`, gap `2` / `3`):
  - Items:
    - `01 / Conversational`
    - `02 / Connected`
    - `03 / Compliant`
  - Each: `bg-[#F4F3F3] hover:bg-[#eaeaea] transition-all duration-200 cursor-pointer`, `px-4 sm:px-6 py-3.5 sm:py-4`, flex space-between
  - Number: `text-[#191919]/40`; slash: `mx-2 text-[#191919]/30`; label: `font-medium`
  - Lucide `ArrowRight` `w-4 h-4 text-gray-400`; on group hover: `text-gray-700` + `translate-x-0.5`, `transition-all duration-200`

---

### Layout / motion summary

- Page: `min-h-screen bg-white overflow-x-hidden`
- Only intentional motions:
  1. Boomerang video ping-pong on canvas
  2. Color transitions on nav links & buttons (200ms)
  3. Feature-row hover bg + arrow nudge (200ms)
- No purple, no cards-as-hero, no stat strips, no floating badges. One composition: brand + headline + one sentence + CTA + full-bleed video, with the “What do we do?” panel anchored at the bottom of the first viewport.
- Responsive: nav links hide below `md`; feature rows stack on mobile; typography scales as specified.

Reproduce pixel-faithfully: same copy, colors (`#191919`, `#F4F3F3`, white/90 glass panel), fonts, CloudFront URL, and the capture→boomerang canvas video technique.

---"

Build a premium, cinematic, architecture-led website for AKHOM INTERIORS.

Use the attached reference image as the primary visual design reference for layout, mood, composition, spacing, typography hierarchy, photography treatment and premium feel.

Do not create a generic interior design website.

The result should feel like a combination of:

Luxury architecture studio × editorial magazine × premium interior portfolio.

TECH STACK

Build with:

 React

 TypeScript

 Tailwind CSS

 Lucide React icons only

 Fully responsive

 Production-quality layout

Use clean reusable components.

BRAND

Brand Name

AKHOM INTERIORS

Tagline:

Timeless Designs. Thoughtful Spaces.

Brand personality:

 Elegant

 Warm

 Architectural

 Timeless

 Calm

 Premium

 Material-led

 Highly considered

The visual direction should feel like a beautifully finished luxury interior: calm, spacious and proportionate.

COLOUR PALETTE

Use these colours consistently:

--architectural-black: #0B0B0B;
--akhom-stone: #D8D0C5;
--akhom-ivory: #F3EFE8;
--warm-taupe: #9A8D80;
--muted-bronze: #9A7654;
--deep-olive: #687064;

Primary background:

#F3EFE8

Primary dark background:

#0B0B0B

Bronze should only be used as a subtle accent.

Avoid gradients, neon colours and excessive decorative effects.

TYPOGRAPHY

Use:

Headlines

A refined editorial serif.

Preferred:

Cormorant Garamond

Headlines should feel:

 Architectural

 Editorial

 Luxury

 Elegant

UI + Body

Inter

Weights:

300
400
500
600

Typography should have strong contrast:

Large expressive serif headlines + restrained clean sans-serif UI.

NAVIGATION

Create a fixed transparent navigation.

Layout:

Left

AKHOM INTERIORS logo.

Use the supplied logo asset exactly. Do not redraw or distort it.

Center Navigation

RESIDENTIAL
CORPORATE
SERVICES
PROJECTS
OUR PROCESS
ABOUT

Right

Outlined CTA:

BOOK A CONSULTATION

Navbar behaviour:

 Transparent over hero

 On scroll, transition to #F3EFE8 with subtle transparency

 Very thin bottom border

 Smooth 300ms transition

Desktop navigation should feel minimal and architectural.

Mobile:

 Logo

 Menu icon

 Full-screen navigation overlay

HERO SECTION

The first viewport must feel cinematic and premium.

Use a full-screen luxury interior photograph as the background.

Image direction:

 Warm natural daylight

 Stone

 Walnut

 Bronze accents

 Architectural lines

 Premium furniture

 Deep shadows

 Tactile materials

 Calm composition

Add only a subtle dark overlay.

Do not darken the image excessively.

HERO COPY

Small eyebrow:

AKHOM INTERIORS / HYDERABAD

Large headline:

Timeless designs.

Thoughtful spaces.

Use very large serif typography.

Desktop:

font-size: clamp(64px, 8vw, 130px);
line-height: 0.92;
letter-spacing: -0.04em;

Supporting copy:

Premium residential and commercial interiors,
designed with intention and delivered with complete accountability.

Maximum width:

420px

HERO CTA

Primary button:

BOOK A CONSULTATION →

Style:

 Ivory background

 Black text

 Square or very slightly rounded corners

 Uppercase

 Wide letter spacing

 Clean architectural proportions

Secondary CTA:

VIEW PROJECTS

Text-only with a subtle underline.

HERO BOTTOM INFORMATION

At the bottom of the hero, add a thin horizontal information area.

Three columns.

01

DESIGN
Spaces shaped around how you live and work.

02

DETAIL
Materials, proportions and finishes considered carefully.

03

EXECUTION
One accountable team from concept to handover.

Style:

 Thin white top border

 Transparent background

 Minimal typography

 Spacious columns

This should feel integrated into the architecture of the hero, not like floating cards.

SECTION 2 — OUR APPROACH

Background:

AKHOM IVORY #F3EFE8

Large whitespace.

Desktop two-column layout.

Left:

Small bronze label:

OUR APPROACH

Large serif statement:

We design spaces

where every

detail belongs.

Below a thin bronze line.

Supporting text:

AKHOM brings together design thinking, material understanding,
custom craftsmanship and turnkey execution to create spaces that
feel considered from the first concept to the final handover.

Add small statement:

Timeless by design. Lasting by execution.

Right side:

Do not add cards.

Keep the right side spacious or use a subtle material image.

SECTION 3 — RESIDENTIAL + CORPORATE

Create two large side-by-side photographic panels.

No card styling.

Panel 1

01 / RESIDENTIAL

Headline:

Spaces designed

around you.

Categories:

LUXURY VILLAS
APARTMENTS
INDEPENDENT HOMES
FARMHOUSES
KITCHENS & WARDROBES

Bottom CTA:

EXPLORE RESIDENTIAL →

Panel 2

02 / CORPORATE & COMMERCIAL

Headline:

Spaces built

to perform.

Categories:

CORPORATE OFFICES
GCC & WORKSPACES
RETAIL
SHOWROOMS
EXPERIENCE CENTRES

Bottom CTA:

EXPLORE CORPORATE →

Use cinematic photography.

Hover:

 Image scales slightly

 Overlay subtly darkens

 Arrow moves right

Transition:

700ms ease-out

SECTION 4 — SELECTED WORK

Background:

#0B0B0B

Text:

#F3EFE8

Small label:

SELECTED WORK

Large serif headline:

Spaces with

a point of view.

Create an editorial portfolio grid.

Do NOT use equal-sized cards.

Use:

 Large feature project

 Smaller secondary project

 Asymmetrical grid

 Full-bleed photography

 Generous spacing

Each project caption:

PROJECT NAME
RESIDENTIAL / CORPORATE
HYDERABAD
↗

On hover:

image scale: 1.03

No excessive UI.

SECTION 5 — WHY AKHOM

Background:

#D8D0C5

Large centered serif statement:

Designed with intention.

Built with accountability.

Create four large interactive rows.

01 / DESIGN
02 / DETAIL
03 / CUSTOM CRAFT
04 / EXECUTION

Each row should have:

 Large number

 Title

 Arrow

 Hidden supporting description

Hover behaviour:

 Bronze accent appears

 Description fades in

 Arrow moves slightly

Descriptions:

DESIGN

Thoughtful planning and spaces shaped around real needs.

DETAIL

Materials, proportions and finishes considered carefully.

CUSTOM CRAFT

Bespoke furniture, cabinetry and joinery designed for the space.

EXECUTION

One coordinated team from concept through handover.

SECTION 6 — SERVICES

Minimal editorial section.

Small label:

WHAT WE DO

Large headline:

From first idea

to final detail.

Create six horizontal rows:

01 Residential Interiors
02 Corporate & Commercial
03 Design Services
04 Turnkey Execution
05 Custom Furniture & Joinery
06 Renovation & Remodelling

Each row:

border-top
padding: 32px 0

Layout:

NUMBER | SERVICE NAME | SHORT DESCRIPTION | ARROW

No cards.

No boxed containers.

SECTION 7 — CUSTOM CRAFT

Full-width cinematic photography.

Focus on:

 Bespoke furniture

 Wood grain

 Stone

 Joinery

 Hardware

 Material details

Overlay copy:

CUSTOM CRAFT

Large headline:

Made for the

space it belongs to.

Supporting copy:

From bespoke furniture to architectural joinery,
every element is considered as part of a larger whole.

CTA:

DISCOVER CUSTOM CRAFT →

SECTION 8 — PROCESS

Background:

#F3EFE8

Heading:

A clear process.

A considered result.

Create a horizontal process timeline.

01 Consultation
02 Concept
03 Design Development
04 Materials
05 Execution
06 Quality
07 Handover

Desktop:

Horizontal.

Mobile:

Vertical.

Active hover state:

 Number changes to bronze

 Description appears

Keep everything minimal.

FINAL CTA

Background:

#0B0B0B

Large ivory serif text:

Let’s design

something lasting.

Supporting:

Tell us about your space,
and let's begin with a conversation.

Large CTA:

BOOK A CONSULTATION →

Secondary:

WHATSAPP US

FOOTER

Minimal black footer.

Use inverse AKHOM logo.

Columns:

EXPLORE

Residential
Corporate
Services
Projects
Our Process

CONNECT

Book a Consultation
WhatsApp
Email
Phone

LOCATION

Hyderabad
Telangana, India

Bottom:

© 2026 AKHOM INTERIORS

Large subtle brand statement:

DESIGNED AROUND YOU.

IMAGE DIRECTION — CRITICAL

Use imagery matching the uploaded reference.

Every image should feel:

 Architectural

 Editorial

 Warm

 Sophisticated

 Realistic

 Material-focused

 High-end

Preferred materials:

STONE
WALNUT
BRONZE
OLIVE
IVORY

Avoid:

 Bright white generic interiors

 Colourful furniture

 Cheap stock photography

 Overly staged rooms

 Excessively futuristic interiors

 Unrealistic AI-looking spaces

The visual direction should emphasise warm daylight, tactile textures, quiet compositions, architectural lines and premium finishes.

IMPORTANT DESIGN RULES

DO:

✓ Use generous whitespace
✓ Use large editorial typography
✓ Use asymmetrical grids
✓ Use premium interior photography
✓ Keep layouts calm
✓ Use thin borders
✓ Use bronze sparingly
✓ Prioritize project imagery

DON'T:

✗ Use rounded SaaS cards
✗ Use gradients
✗ Use glassmorphism everywhere
✗ Use colourful UI elements
✗ Use excessive animations
✗ Make it look like a modular kitchen website
✗ Make every section look like a card grid
✗ Add fake statistics or awards

FINAL INSTRUCTION

The homepage must visually feel like the attached generated reference image.

Prioritize this hierarchy:

Photography → Typography → Space → Architecture → Interaction

The result should immediately communicate:

AKHOM INTERIORS

Timeless Designs. Thoughtful Spaces.

A premium interior studio delivering:

Design · Detail · Custom Craft · Execution

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://akhom.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/733e0080-ff99-4487-9b9d-0b1471c383e2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
