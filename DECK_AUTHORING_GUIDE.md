# Slide Deck Authoring Guide

This document explains how to create a new slide deck with this app, what content is expected to change for each talk, and what should generally remain part of the shared slide engine.

The repo is designed for **one deck per branch**.

## Mental Model

There are two layers:

- **Deck content layer**: the part you change for each presentation
- **Deck engine layer**: the reusable Vue/Vite app that renders slides, handles navigation, presenter mode, notes, and animations

If you are making a new talk, you should mostly work inside the `deck/` folder.

## What You Change For A New Deck

These files and folders are the intended authoring surface for a new presentation.

### `deck/deck.json`

Use this for deck-level metadata.

Safe to change:

- `title`
- `author`
- `description`
- `presenterShortcut`

Do not add application logic here. This file is metadata only.

### `deck/theme.css`

Use this to define the visual identity for the current talk.

Safe to change:

- CSS variables under `:root`
- fonts
- colors
- spacing tokens
- shadows
- talk-specific styling refinements

Typical use cases:

- brand a new talk
- switch typography
- adjust card treatment
- tune code block colors
- change background atmosphere

Prefer changing **CSS variables first** before overriding component styles.

### `deck/slides/*.md`

Each slide is one Markdown file with frontmatter.

Safe to change:

- slide order, by filename prefix
- frontmatter fields
- markdown body
- block definitions

This is the main content authoring surface.

### `deck/notes/*.md`

Each notes file maps to one slide by `slide:` in frontmatter.

Safe to change:

- notes content
- slide-to-notes mapping

Notes should stay Markdown-only. Do not rely on raw HTML formatting.

### `deck/assets/*`

Use this for local images and talk-specific static assets.

Safe to change:

- images
- diagrams
- logos
- other local static assets used by the deck

Keep assets for the current talk here rather than spreading them across the app.

## What Usually Should Not Change

These files are part of the reusable slide app and should only be changed if you are intentionally extending the platform.

### App runtime

- `src/App.vue`
- `src/lib/presenterSync.js`
- `src/lib/deckContent.js`

These files control:

- slide loading
- presenter window sync
- navigation behavior
- notes drawer behavior
- fullscreen behavior
- keyboard shortcuts

Do not edit them just to create a new deck.

### Shared components

- `src/components/SlideView.vue`
- `src/components/SlideBlock.vue`
- `src/components/DeckChrome.vue`
- `src/components/NotesDrawer.vue`
- `src/components/PresenterView.vue`

These are reusable rendering primitives.

Do not edit them for normal copy changes, theme changes, or slide reordering.

Only change these when:

- you need a **new kind of slide block**
- you need a **new shared layout**
- you are intentionally changing the shared UX of the deck engine

### Base styling

- `src/styles/base.css`

This defines system-wide defaults and fallback design tokens.

Do not edit this for talk branding unless the change is intended to affect all future decks.

## Folder Contract

The app expects this structure:

```text
deck/
  deck.json
  theme.css
  assets/
  slides/
    01-intro.md
    02-topic.md
  notes/
    intro.md
    topic.md
```

## Creating A New Deck

Use this process when starting a new talk in a new branch.

1. Create a new branch for the talk.
2. Update `deck/deck.json` with the new deck metadata.
3. Replace the contents of `deck/theme.css` with the new talk theme.
4. Remove the sample slide Markdown files in `deck/slides/` and create your own.
5. Remove the sample notes files in `deck/notes/` and create your own.
6. Add any local images or assets to `deck/assets/`.
7. Run the deck locally and verify slide flow, notes, and presenter mode.

## Slide Ordering

Slides are loaded from `deck/slides/*.md` and sorted by filename.

Use numeric prefixes to control order:

- `01-intro.md`
- `02-problem.md`
- `03-solution.md`

If you rename files, slide order changes.

## Slide File Format

Each slide file contains frontmatter plus Markdown body.

Example:

```md
---
id: intro
title: Build the deck once
eyebrow: Slide Engine Starter
layout: default
animate: ease-in
blocks:
  - type: chips
    items:
      - label: Markdown slides
        tone: success
  - type: callout
    tone: info
    title: Authoring model
    body: One slide per markdown file.
---
This is the body markdown for the slide.
```

## Supported Frontmatter Fields

These fields are currently supported by the app:

- `id`: unique slide id
- `title`: slide title
- `eyebrow`: small label above title
- `layout`: currently `default` or `two-column`
- `animate`: currently `ease-in`
- `classes`: optional CSS classes array
- `blocks`: structured content blocks

## Body Content

The Markdown body is rendered as the main narrative content for the slide.

Use it for:

- speaker-facing framing text
- intro copy
- explanatory text
- short lists

Do not use the body for content that is better represented as structured blocks like tables or code samples.

## Supported Block Types

The app currently supports these block types:

### `text`

Use when you want an additional Markdown content block inside the block stack.

Example:

```yaml
- type: text
  body: |
    This is extra markdown content inside a block.
```

### `chips`

Use for short labels or category pills.

Example:

```yaml
- type: chips
  items:
    - label: Signals
      tone: success
    - label: Hooks
      tone: warn
```

Each chip item supports:

- `label`
- `tone`

### `callout`

Use for emphasis, warnings, notes, or highlighted framing.

Example:

```yaml
- type: callout
  tone: info
  title: Key point
  body: Prefer computed state first.
```

Supported fields:

- `tone`
- `title`
- `body`

### `code`

Use for code samples or config examples.

Example:

```yaml
- type: code
  title: Example
  code: |
    const value = computed(() => input());
```

Supported fields:

- `title`
- `code`

### `table`

Use for comparisons or decision frameworks.

Example:

```yaml
- type: table
  columns:
    - Need
    - Tool
  rows:
    - ["Derived state", "`computed()`"]
    - ["Imperative sync", "`effect()`"]
```

Supported fields:

- `columns`
- `rows`

## Layouts

The app currently supports these slide layouts:

### `default`

Single-column layout. Good for:

- title slides
- narrative slides
- stacked blocks

### `two-column`

Two-column layout with title/body on the left and block stack on the right.

Good for:

- explanation + example
- framing + table
- framing + code

If you need a new reusable layout, that is an engine change, not a deck-content change.

## Notes Format

Each notes file should look like this:

```md
---
slide: intro
---
Open with the framing question.

Keep this slide short.
```

The `slide:` value must match the slide `id`.

## Presenter Mode

Presenter mode is part of the shared app.

Current behavior:

- `P` opens the presenter window
- presenter view shows current slide notes
- presenter view shows a next-slide preview
- slide index stays in sync between windows

You generally should **not** rebuild presenter mode per deck.

## Keyboard Shortcuts

Default shortcuts:

- `ArrowRight` / `Space` / `PageDown`: next slide
- `ArrowLeft` / `PageUp`: previous slide
- `Home`: first slide
- `End`: last slide
- `N`: toggle notes drawer
- `F`: toggle fullscreen
- `P`: open presenter mode

You may change the presenter shortcut in `deck/deck.json`.

If you want to change general keyboard behavior, that is an engine change.

## Animation Rules

The current app animates active slide content with an ease-in entrance.

You can safely do:

- choose `animate: ease-in`
- refine animation feel through theme styling if the shared CSS structure supports it

You should not:

- add per-slide JavaScript animation logic in Markdown
- embed custom runtime logic in content files

If animation behavior needs to fundamentally change, update the shared components.

## Safe Changes vs Engine Changes

### Safe content-level changes

- new deck metadata
- new theme variables
- new fonts in `deck/theme.css`
- new slides
- reordered slides
- new notes
- local assets
- changing block data
- changing slide layout between supported layouts

### Engine-level changes

- adding a new block type
- adding a new slide layout
- changing presenter sync behavior
- changing keyboard handling
- changing how Markdown is parsed
- changing slide loading behavior
- changing progress, notes drawer, or fullscreen behavior

If your change affects how **all future decks** behave, it belongs in the engine.

## When To Add A New Block Type

Add a new block type only when all of these are true:

- the content repeats across multiple slides or decks
- it cannot be expressed cleanly with current blocks
- it should be reusable, not one-off

If it is only needed once, prefer using existing blocks or a new layout class before changing the engine.

## Common Mistakes

Avoid these:

- editing `src/` files just to change talk content
- putting talk assets outside `deck/assets/`
- letting notes ids drift from slide ids
- using body markdown for data that should be a `table` or `code` block
- adding deck-specific logic into shared components
- changing `src/styles/base.css` for one talk’s branding

## Local Workflow

Use:

```bash
npm run dev
```

Then verify:

- slide order
- keyboard navigation
- notes drawer
- presenter window
- fullscreen mode
- asset paths
- theme styling

For production verification:

```bash
npm run build
npm run preview
```

## Recommendation For Humans And Agents

When creating a new deck:

1. Stay inside `deck/` unless you are intentionally extending the platform.
2. Treat `src/` as framework code, not content.
3. Prefer theme variables over component overrides.
4. Prefer existing block types over new engine work.
5. Only change the engine when the change should benefit future decks too.

## Quick Decision Rule

Ask:

**"Is this change about this talk, or about how all talks should work?"**

If it is about **this talk**, change `deck/`.

If it is about **all talks**, change `src/` or app config.
