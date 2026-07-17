# Product

## Register

brand

## Users

A solo speaker who authors and presents their own talk. They write slides and notes as Markdown on a dedicated branch, then deliver the talk live — typically with a second presenter-view window/monitor showing current notes and the next slide. The audience only ever sees the main deck window; the speaker is the sole author and operator, so authoring ergonomics and delivery polish matter equally, but there's no multi-user collaboration to design for.

## Product Purpose

A reusable slide-deck engine where the deliverable **is** the presentation experience — the rendered deck is what an audience watches, so it's judged like a keynote, not an admin tool. Each branch holds exactly one talk's content (`deck/`) rendered through a shared Vue/Vite engine (`src/`). Success looks like: an audience-facing deck that feels crafted and alive (not templated), a speaker who can write content in plain Markdown without touching engine code, and a presenter workflow (notes, next-slide preview, cross-window sync) that stays invisible to the audience and reliable for the speaker.

## Brand Personality

Playful and energetic. Confident, a little witty, willing to move — punchy entrances, purposeful motion between and within slides, an accent color used with intent rather than restraint. Not sterile, not corporate-safe. The existing committed identity (near-black background, warm cream text, mint-green primary accent with a blue secondary, `Caveat` script for display moments against `Hanken Grotesk` body text) is the anchor: energetic shows up in motion and typographic confidence, not in replacing this palette.

## Anti-references

- Generic corporate slideware — no PowerPoint/Google-Slides-template feel, no bullet-and-clipart layouts, no title-plus-bullets-as-default slide shape.
- SaaS marketing site aesthetic bleeding into slide design — no cream/off-white body backgrounds, no gradient text, no small-caps tracked "eyebrow" labels above every slide, no generic hero-metric card layouts.
- Static, motion-less slides — a deck that just cuts between states without any purposeful transition reads as unfinished for this brand.

## Design Principles

1. **Motion is part of the content, not decoration on top of it.** Every slide/block entrance should be deliberate and tied to what it's revealing — not a uniform fade applied everywhere by reflex.
2. **Plain Markdown in, crafted presentation out.** The speaker should never need to write CSS or touch `src/` to get a slide that feels designed; the engine's supported blocks/layouts must carry the visual weight.
3. **The audience view and the presenter view are different contracts.** Whatever gets built should keep the audience-facing deck free of authoring/operational chrome, while the presenter surfaces (notes drawer, presenter window, notes popout) stay information-dense and low-latency.
4. **Modern CSS over motion libraries by default.** Favor native CSS techniques (transitions, `@starting-style`, `view-transitions`, scroll/animation timelines, `clip-path`, backdrop/mask effects) for slide and block motion; reach for a JS animation library only when a specific effect genuinely needs it.
5. **Accessible by construction, not by afterthought.** Contrast, reduced-motion alternatives, and keyboard operability are checked as part of building each slide/layout/block, not audited in later.

## Accessibility & Inclusion

WCAG AA is the floor and a strong, non-negotiable priority (not a follow-up pass): ≥4.5:1 contrast for body text and placeholder-equivalent copy, ≥3:1 for large/display text, full keyboard operability for navigation/presenter controls, and a `prefers-reduced-motion` alternative for every slide/block entrance and transition. Given the brand leans into motion, reduced-motion fallbacks (crossfade or instant state change) are treated as first-class, not optional trim.
