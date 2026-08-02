# AGENTS.md

## What this is
Personal portfolio site for Varun Sinha. Single-page, recruiting-focused. Sections: Hero, Finance LLM Router (flagship project), Selected Work (Spatio Labs, RIIS, LungIQ), Experience, About, Contact.

Do not turn this into a multi-page app or add routes beyond what's explicitly requested. It's one scrollable page plus room for a future `/writing` route — don't build that route until asked.

## Stack
- Next.js 15, App Router
- TypeScript
- Tailwind v4
- shadcn/ui — minimal component set only (button, badge, separator). Don't pull in components that aren't used.
- Deployed on Vercel

## Design constraints — do not deviate without asking
- No Inter font. No purple gradients. No glassmorphism. No centered hero with two CTA buttons. No floating blob shapes. No shadow-on-every-card look.
- Two typefaces only: one display/distinctive face for names and section headers, one monospace face reserved specifically for metadata (dates, stack tags, metrics, labels). The contrast between these two is the core design language — don't introduce a third typeface.
- One ink color + one background color. One accent color, used sparingly. No gradients anywhere.
- Grid discipline: consistent column widths and vertical rhythm across sections. Minimal should read as deliberate, not empty.
- Design tokens (color, type scale, spacing) live in a central config, not scattered as inline Tailwind values across components.

## Content
- The Finance LLM Router section is the visual anchor of the page. It should carry more weight and space than the Selected Work cards — don't give all projects equal visual treatment.
- Selected Work cards are intentionally compact: one-line pitch, stack tags, links. No long-form narrative in these cards.
- Experience section is text-forward, not card-based — visually quieter than Selected Work.
- Copy is final when provided directly by Varun. Don't rewrite it into marketing language. No "passionate about," no em dashes, no corporate phrasing.

## Workflow notes
- Use the frontend-design skill for base layout/token conventions.
- After any layout or section change, use Playwright MCP to screenshot at 1440px and 390px widths before considering the change done.
- Don't invent personal copy (bio details, positioning statements) — leave a clearly marked placeholder and flag it instead of generating filler.