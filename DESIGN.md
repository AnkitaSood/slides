---
name: Slide Deck Template
description: A single-deck-per-branch presentation engine with a chalk-on-blackboard visual voice
colors:
  blackboard-ink: "#111315"
  slate-panel: "#1a1e21"
  deep-slate: "#21272b"
  chalk-cream: "#f5efe1"
  faded-chalk: "rgba(245, 239, 225, 0.7)"
  ghost-chalk: "rgba(245, 239, 225, 0.45)"
  mint-marker: "#56d39b"
  blue-marker: "#74a7ff"
  coral-marker: "#eb7f67"
  chalk-line: "rgba(245, 239, 225, 0.14)"
  chalk-line-strong: "rgba(245, 239, 225, 0.28)"
  board-black: "#0f1214"
typography:
  display:
    fontFamily: "Caveat, Georgia, serif"
    fontSize: "clamp(2.8rem, 7vw, 5.8rem)"
    lineHeight: 0.95
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Caveat, Georgia, serif"
    fontSize: "clamp(1.8rem, 4vw, 3.2rem)"
    lineHeight: 1
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.55vw, 1.3rem)"
    lineHeight: 1.5
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontWeight: 700
    fontSize: "0.8rem"
    letterSpacing: "0.16em"
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.9rem"
rounded:
  sm: "6px"
  md: "18px"
  pill: "999px"
spacing:
  slide-pad: "clamp(1.8rem, 4vw, 4rem)"
  slide-gap: "1.2rem"
components:
  chip:
    backgroundColor: "{colors.mint-marker}"
    textColor: "{colors.board-black}"
    rounded: "1px"
    padding: "0.32rem 0.9rem"
  chip-success:
    backgroundColor: "{colors.mint-marker}"
  chip-accent:
    backgroundColor: "{colors.blue-marker}"
  chip-warn:
    backgroundColor: "{colors.coral-marker}"
  callout:
    backgroundColor: "{colors.slate-panel}"
    textColor: "{colors.chalk-cream}"
    rounded: "{rounded.md}"
    padding: "1rem 1.1rem"
  code-block:
    backgroundColor: "{colors.board-black}"
    textColor: "{colors.chalk-cream}"
    typography: "{typography.mono}"
    rounded: "{rounded.md}"
    padding: "1rem 1.1rem 1.15rem"
---

# Design System: Slide Deck Template

## 1. Overview

**Creative North Star: "The Late-Night Chalk Talk"**

This engine renders a talk the way a sharp speaker sketches an idea on a blackboard after hours: near-black stage, a handwritten headline in `Caveat` script, everything else set in a clean, confident grotesque. It's playful and energetic rather than corporate-safe — titles lean in with script character, chips and callouts read as tactile little objects placed on the board, and slide entrances move with purpose instead of sitting static. It explicitly rejects the feel of generic slideware (title-plus-bullets, template-shaped layouts) and the SaaS-marketing look (cream backgrounds, gradient text, tracked eyebrow labels stacked on every section, hero-metric cards) — this is a stage, not a landing page.

**The Theme Is Data Rule.** Every color, font, radius, and spacing value a deck uses lives in CSS custom properties (`--deck-*`, `--slide-*`), defined once in `src/styles/base.css` as the engine default and freely overridden per-talk in `deck/theme.css`. No component in `src/` may hardcode a color, font-family, or spacing value directly — everything routes through a variable. Customizability isn't a feature to add later; it's the mechanism this whole system is built on, and it must stay true for every new component or block type.

**Key Characteristics:**
- Near-black stage with warm chalk-cream text — high contrast, no cream/paper backgrounds.
- Script display type (`Caveat`) for titles and eyebrows-of-emphasis, paired with a clean grotesque (`Hanken Grotesk`) for body copy.
- Flat surfaces at rest; a single soft, wide shadow separates panels (callouts, code blocks, notes drawer, presenter panes) from the glowing background — the depth cue is functional, not decorative theater.
- Motion is part of the content: slide and block entrances stagger in with intent, never a uniform static cut.
- Every token is themeable per-deck; nothing about "this talk's look" is hardcoded in the engine.

## 2. Colors

A dark, high-contrast palette: one ink background, one warm chalk foreground, and three marker accents used sparingly and with distinct jobs (success/primary, informational/secondary, warning).

### Primary
- **Mint Marker** (`#56d39b`): the primary accent — eyebrows, active title accents, chip "success" tone, progress bar start, presenter/notes titles. This is the color of emphasis; it should read as the speaker's own marker color, not a generic brand green.

### Secondary
- **Blue Marker** (`#74a7ff`): informational accent — chip "accent" tone, `callout` info-tone borders, progress bar end. Pairs with Mint Marker in gradients (e.g. the progress bar) without competing for the same role.

### Tertiary
- **Coral Marker** (`#eb7f67`): warning/attention accent — chip "warn" tone, `callout` warning-tone borders. Reserved for things that need to stand out as caution, not general decoration.

### Neutral
- **Blackboard Ink** (`#111315`): the base stage background — the void everything sits on.
- **Slate Panel** (`#1a1e21`) / **Deep Slate** (`#21272b`): surface tiers for panels, callouts, code blocks, and the notes drawer, composited via `color-mix()` against black rather than used flat (e.g. `color-mix(in srgb, var(--deck-surface) 88%, black)`).
- **Board Black** (`#0f1214`): dedicated background for code blocks — always darker than the surrounding panel so code reads as its own recessed surface.
- **Chalk Cream** (`#f5efe1`): primary text color.
- **Faded Chalk** (`rgba(245,239,225,0.7)`): secondary/body-muted text (slide body copy, notes content, presenter notes).
- **Ghost Chalk** (`rgba(245,239,225,0.45)`): tertiary/faint text (chrome hints, counters, table headers, eyebrow labels on panels).
- **Chalk Line** (`rgba(245,239,225,0.14)`) / **Chalk Line Strong** (`rgba(245,239,225,0.28)`): hairline dividers and borders, layered by strength rather than by hue.

### Named Rules
**The One Ink Rule.** There is exactly one background hue family (the blackboard ink neutrals). Color only enters through the three marker accents, and each accent keeps one job — don't introduce a fourth accent hue without retiring one of these three.

## 3. Typography

**Display Font:** Caveat (with Georgia, serif fallback)
**Body Font:** Hanken Grotesk (with system-ui, sans-serif fallback)
**Label/Mono Font:** JetBrains Mono

**Character:** The script/grotesque pairing is the entire personality of this system — Caveat carries every moment that needs warmth and voice (titles, presenter/notes headings), Hanken Grotesk carries everything that needs to be read quickly and cleanly (body copy, chips, table cells), and JetBrains Mono marks anything literal (code, keyboard hints, the slide counter).

### Hierarchy
- **Display** (Caveat, `clamp(2.8rem, 7vw, 5.8rem)`, line-height 0.95): slide titles. The single largest, most expressive element on any slide.
- **Headline** (Caveat, `clamp(1.8rem, 4vw, 3.2rem)`, line-height 1): reserved secondary heading tier (`--slide-subtitle-size`) — available for a new layout or block that needs a heading below the main title without inventing a new token.
- **Body** (Hanken Grotesk, `clamp(1rem, 1.55vw, 1.3rem)`, line-height 1.5, max-width 58rem): slide narrative copy, notes content, presenter notes/preview text.
- **Label** (Hanken Grotesk, 700 weight, 0.76–0.84rem, uppercase, letter-spacing 0.16–0.18em): eyebrows, panel section labels ("Speaker Notes", "Current Slide"), table headers.
- **Mono** (JetBrains Mono, ~0.72–0.9rem): code blocks, chip text, the slide counter, keyboard-hint `kbd` elements.

### Named Rules
**The Script-Is-Scarce Rule.** Caveat is reserved for titles and panel headings only — never body copy, never chips, never code. Its rarity is what makes it read as a voice rather than a font choice.

## 4. Elevation

The deck is flat by default. Depth exists for one reason: separating an object from the background behind it, not to simulate physical stacking or theatrical lighting. There are exactly two shadow scales — one for large panels, one for small tactile objects like sticky notes — never a bigger shadow used as a decoration or hierarchy signal.

### Shadow Vocabulary
- **Panel separation** (`box-shadow: 0 28px 80px rgba(0, 0, 0, 0.35)`, token `--deck-shadow`): applied to callouts, code blocks, tables, the notes drawer, and presenter panes.
- **Small-object lift** (`box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.32), 0 6px 14px rgba(0, 0, 0, 0.32)`): applied to chips/sticky notes — a tighter, smaller-radius shadow scaled to a small paper-sized object, plus an inset top highlight to sell a physical paper surface. On hover this deepens to `0 10px 22px rgba(0, 0, 0, 0.4)` as the note lifts 3px.

### Named Rules
**The Flat-By-Default Rule.** Nothing lifts on hover or gets a heavier shadow to signal importance or hierarchy — hover-lift on chips is a physical "peeling off the board" cue tied to that one component, not a general pattern to reuse elsewhere. If a panel needs to stand out, that's a color or border job (see the tone-specific colors in Components), not a bigger shadow.

## 5. Components

Every component reads as a deliberate, sturdy object placed on the board — tactile and confident, not a thin overlay.

### Chips — "Sticky Notes"
- **Shape:** skinny sticky note, not a pill — near-square corners (1px radius), short vertical padding (0.32rem) against generous horizontal padding (0.9rem).
- **Style:** solid tone-color paper (no border, no tint-on-dark background) with dark ink text (Board Black) — the inverse of a translucent outline badge. Each note gets a subtle inner top highlight (`inset 0 1px 0 rgba(255,255,255,0.32)`) and a small folded-corner shade top-right (`linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.22) 51%)`) to read as a physical scrap of paper, plus the shared small-object shadow (`0 6px 14px rgba(0,0,0,0.32)` — see Elevation).
- **Placement:** each note carries its own small fixed tilt (alternating roughly -2.6°/2°/-1.4° by position) so a row of chips reads as scattered/stuck-up notes, not a uniform row of badges. On hover, a note un-rotates and lifts 3px with a deeper shadow; `prefers-reduced-motion` keeps the tilt but drops the rotate/lift transition.
- **Tone variants:** `chip-success` (Mint Marker paper), `chip-accent` (Blue Marker paper), `chip-warn` (Coral Marker paper) — text is always Board Black regardless of tone, never a colored-on-dark treatment.

### Named Rules
**The Paper-and-Ink Rule.** A sticky note's tone color is always a solid fill, never a tint or outline, and its text is always dark ink (Board Black), never the tone color itself. If a tag needs a fourth tone, it gets dark ink on a new solid paper color — it does not get colored text on a dark background.

### Callouts
- **Corner style:** 18px radius (`--deck-radius`).
- **Background:** Slate Panel mixed 88% against black.
- **Border:** 1px Chalk Line Strong at rest; `tone-info` shifts the border toward Blue Marker (45% mix), `tone-warning` toward Coral Marker (45% mix).
- **Shadow:** the single panel-separation shadow (see Elevation).
- **Internal padding:** `1rem 1.1rem`.
- **Title:** bold, 0.04em letter-spacing, Chalk Cream.

### Code Blocks
- **Corner style:** inherits the 18px radius from its wrapper.
- **Background:** Board Black — always darker than its surrounding panel.
- **Typography:** JetBrains Mono, 0.9rem, line-height 1.6.
- **Title:** same treatment as callout titles.

### Tables
- **Style:** no outer border or shadow of their own (they sit inside the shared `callout`/`code-wrap`/`table-wrap` panel treatment); row dividers are 1px Chalk Line, last row undivided.
- **Header:** Ghost Chalk, uppercase, 0.16em letter-spacing, 0.8rem — same label typography as panel eyebrows.

### Deck Chrome (signature component)
- Fixed, pointer-events-disabled overlay: keyboard hints (bottom-left) and slide counter (bottom-right) in Ghost Chalk/Chalk Muted, plus a 3px progress bar gradient from Mint Marker to Blue Marker across the bottom edge. This is the one place the two accent colors appear together in a single gradient — reserved for progress, not reused elsewhere.

### Notes Drawer & Presenter Panes
- **Corner style:** 18–20px radius.
- **Background:** Slate Panel mixed 88–92% against black.
- **Border:** 1px Chalk Line Strong.
- **Behavior:** the notes drawer is user-draggable by its title bar; presenter panes are static two-column layout. Both use Caveat for their heading (drawer title / "Current Slide" / "Next Slide Preview" title) at a size distinct from the main slide title, signaling "this is meta content about the deck," not the deck itself.

## 6. Do's and Don'ts

### Do:
- **Do** route every color, font, and spacing value through a `--deck-*` or `--slide-*` custom property, so a new `deck/theme.css` can restyle the entire talk without touching `src/`.
- **Do** keep Caveat scarce — titles and panel headings only.
- **Do** use the shared panel shadow (`--deck-shadow`) for large surfaces and the small-object sticky-note shadow only for chips; don't invent a third shadow value.
- **Do** build slide/block entrances as staggered, purposeful animations (see `SlideView.vue`'s `animate-item` + `--stagger` pattern) rather than static appearances.
- **Do** keep each marker accent (Mint/Blue/Coral) doing one job at a time — success/primary, informational, warning.
- **Do** give chips dark ink text on a solid paper background — never colored text on a tinted or transparent chip.

### Don't:
- **Don't** build generic corporate slideware — no title-plus-bullets-only slides, no clipart, no template-shaped "safe" layouts.
- **Don't** let the SaaS marketing aesthetic bleed in: no cream/off-white backgrounds, no gradient text, no tracked uppercase eyebrow label stacked above every single section, no hero-metric-card layouts.
- **Don't** hardcode a color, font-family, radius, or spacing value inside a `src/` component — if it's not themeable via a CSS variable, it's a bug, not a style choice.
- **Don't** ship a slide, block, or layout without a `prefers-reduced-motion` fallback — every entrance animation needs an instant/crossfade alternative, this is WCAG AA territory and non-negotiable per PRODUCT.md.
- **Don't** revert chips to a translucent outline-pill badge — the sticky-note treatment (solid paper, dark ink, scattered tilt) is the deliberate replacement for that generic pattern.
