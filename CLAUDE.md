# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A single-deck-per-branch slide presentation framework (Vue 3 + Vite). Each branch is expected to hold exactly one talk; Netlify branch deploys are the deployment model.

**Read `AGENTS.md` before making changes** — it defines the authoring contract (which files are safe to edit for a new talk vs. which are engine/platform code) in detail. `DECK_AUTHORING_GUIDE.md` covers the same split with more authoring examples (frontmatter, block types, layouts). Don't duplicate content changes into `src/`, and don't add platform logic to `deck/`.

## Commands

```bash
npm install
npm run dev       # Vite dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
```

There is no test suite, lint script, or typecheck configured in `package.json` — verification is done by running the dev server and checking slide flow, notes, and presenter mode manually (see "Local Workflow" in `DECK_AUTHORING_GUIDE.md`).

## Architecture

Two layers, and the first question for any change is which one it belongs to: **is this about this talk, or about how all talks work?**

- `deck/` — content layer for the current talk: `deck.json` (metadata), `theme.css` (CSS variable overrides), `slides/*.md`, `notes/*.md`, `assets/*`.
- `src/` — the reusable engine (Vue app, components, parsing/sync logic). Only touch this when a change should apply to every future deck.

### Content loading (`src/lib/deckContent.js`)

- Deck files are picked up via Vite's `import.meta.glob('/deck/**/*', { eager: true, query: '?raw' })` — slides, notes, theme CSS, and `deck.json` are all bundled at build time. There is no runtime fetch; adding a deck file requires it to match these glob patterns to be discovered.
- Slides are sorted by filename (`localeCompare`), so slide order is controlled entirely by numeric filename prefixes (`01-intro.md`, `02-...`).
- Slide `id` defaults to the filename with the numeric prefix and `.md` stripped (`deriveId`); notes are matched to slides by the `slide:` frontmatter field against that same `id`.
- Frontmatter is **not** parsed with a YAML library — `parseYamlLikeObject` is a small hand-rolled parser supporting a subset of YAML (nested maps/lists, `|` block scalars, quoted/boolean/number/inline-array scalars). Don't assume full YAML semantics (anchors, multi-line flow, etc.) will work here.
- Markdown bodies/notes are rendered via `markdown-it` (`html: false`, so raw HTML in slide/notes markdown is stripped, not rendered).

### Runtime (`src/App.vue`)

- `loadDeck()` runs once at startup; `currentIndex` (a ref) drives which `SlideView` is `active`.
- Presenter mode is a second browser window/tab, not a separate route: opened via `window.open` with `?presenter=1` in the URL, and `App.vue` conditionally renders `PresenterView` instead of the normal deck chrome based on that query param.
- Cross-window sync (`src/lib/presenterSync.js`) uses `BroadcastChannel` when available, with a `localStorage` + `storage` event fallback for browsers/contexts without it. Both windows publish/read the same `{ index, updatedAt }` state shape.
- Speaker notes have a *third* surface: a popout plain-HTML window (`renderNotesDocument`/`syncNotesPopout` in `App.vue`) written directly via `document.write`, independent of the Vue component tree — it's updated imperatively by ID lookup (`notes-title`, `notes-body`), not reactively.
- Keyboard shortcuts are handled by a single global `keydown` listener in `App.vue`; the presenter-open shortcut key is configurable per-deck via `deck.json`'s `presenterShortcut`, everything else is fixed.

### Components (`src/components/`)

`SlideView` (renders one slide + layout), `SlideBlock` (renders one structured block: `text`/`chips`/`callout`/`code`/`table`), `DeckChrome` (progress/nav chrome), `NotesDrawer` (in-window notes panel), `PresenterView` (presenter window layout). Adding a new block `type` or slide `layout` means extending `SlideBlock.vue` / `SlideView.vue` respectively — this is an engine change per `AGENTS.md`.
