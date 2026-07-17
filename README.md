# Slide Deck Template

Single-deck-per-branch slide framework built with Vue and Vite.

## Authoring Model

- `deck/deck.json`: deck-level metadata
- `deck/theme.css`: talk-specific theme variables and styling
- `deck/slides/*.md`: one slide per file
- `deck/notes/*.md`: one notes file per slide id
- `deck/assets/*`: local images and static assets

Each branch should contain exactly one deck. Netlify branch deploys are the simplest fit for that workflow.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Keyboard Shortcuts

- `ArrowRight` / `Space` / `PageDown`: next slide
- `ArrowLeft` / `PageUp`: previous slide
- `Home` / `End`: first or last slide
- `F`: toggle fullscreen
- `P`: open presenter window
- `N`: toggle notes drawer in the main window

## Slide Frontmatter

```md
---
id: intro
title: Build talks without rebuilding the engine
eyebrow: Reusable deck system
layout: default
animate: ease-in
blocks:
  - type: chips
    items:
      - label: Markdown
        tone: accent
      - label: Presenter mode
        tone: success
  - type: callout
    tone: info
    title: Authoring model
    body: One slide per markdown file.
---
Body markdown goes here.
```

## Supported Block Types

- `text`
- `table`
- `chips`
- `callout`
- `code`

## Presenter Mode

- Opens in a second window with `P`
- Shows current slide notes
- Shows next slide preview as a stretch-goal baseline already wired in
- Syncs slide index between windows using `BroadcastChannel`, with `localStorage` fallback
