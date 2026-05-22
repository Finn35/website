# Lumeq — lumeq.eu

Boutique web studio website voor Nederlandse ondernemers.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **next/font** — Cormorant Garamond + DM Sans

## Brand

| Token     | Value     |
| --------- | --------- |
| Burgundy  | `#4A1825` |
| Cream     | `#F7F3EE` |
| Gold      | `#C9A96E` |
| Ink (dark)| `#0D0A09` |

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.tsx        # root layout + fonts + metadata
  page.tsx          # composes all sections
  globals.css       # tailwind base + brand styles
components/
  Navbar.tsx
  Hero.tsx          # cursor spotlight, floating orbs, animated counters
  Marquee.tsx
  Services.tsx
  Process.tsx
  Pricing.tsx
  FAQ.tsx
  CtaBanner.tsx
  Footer.tsx
  ui/
    Button.tsx      # gold / burgundy / ghost variants
    Container.tsx
    Reveal.tsx      # framer-motion in-view reveal
    SectionLabel.tsx
lib/
  cn.ts             # className helper
```
