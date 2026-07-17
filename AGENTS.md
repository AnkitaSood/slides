# AGENTS.md

This repository is a **single-deck-per-branch** slide framework.

The purpose of this file is to tell any human or agent how to work in this repo without breaking the reusable slide engine.

## Core Rule

When creating or editing a presentation, work in `deck/` unless you are intentionally changing how **all future decks** should behave.

## Repo Model

There are two layers:

- `deck/` = talk-specific content and theme
- `src/` = shared slide engine

If the change is about **this talk**, edit `deck/`.

If the change is about **all talks**, edit `src/`, app config, or shared docs.

## Files Intended To Change For A New Deck

These are the normal authoring files:

- `deck/deck.json`
- `deck/theme.css`
- `deck/slides/*.md`
- `deck/notes/*.md`
- `deck/assets/*`

Safe changes include:

- deck title, author, description
- presenter shortcut in `deck.json`
- talk-specific theme variables and fonts
- slide order via filenames
- slide markdown body
- frontmatter fields
- notes markdown
- local images and talk assets

## Files Not Intended For Routine Deck Authoring

Do not edit these just to make a new talk:

- `src/App.vue`
- `src/lib/deckContent.js`
- `src/lib/presenterSync.js`
- `src/components/*`
- `src/styles/base.css`
- `vite.config.js`
- `netlify.toml`

Only change these when you are intentionally extending the platform.

## Authoring Contract

Expected deck structure:

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

Slides are loaded by filename order.

Use numeric prefixes to control sequence:

- `01-intro.md`
- `02-problem.md`
- `03-solution.md`

## Slide Format

Each slide is one Markdown file with frontmatter.

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
Body markdown goes here.
```

## Supported Frontmatter

Currently supported:

- `id`
- `title`
- `eyebrow`
- `layout`
- `animate`
- `classes`
- `blocks`

## Supported Layouts

Currently supported:

- `default`
- `two-column`

If another layout is needed, that is an engine change.

## Supported Block Types

Currently supported:

- `text`
- `chips`
- `callout`
- `code`
- `table`

If another block type is needed, that is an engine change.

## Notes Format

Each notes file is Markdown with a `slide:` frontmatter field matching the slide `id`.

Example:

```md
---
slide: intro
---
Open with the framing question.
```

Keep notes Markdown-only.

Do not depend on raw HTML authoring in notes.

## Theme Rules

Talk-specific visual design belongs in:

- `deck/theme.css`

Prefer:

- CSS variables
- font changes
- token updates
- talk-specific cosmetic refinements

Avoid changing `src/styles/base.css` for one talk unless the change should become a new global default.

## Presenter Mode

Presenter mode is shared engine behavior.

Current behavior:

- `P` opens presenter mode
- current slide notes are shown
- next slide preview is shown
- slide position syncs across windows

Do not rebuild presenter behavior per deck unless the change is meant for all future decks.

## Keyboard Shortcuts

Current defaults:

- `ArrowRight` / `Space` / `PageDown`: next
- `ArrowLeft` / `PageUp`: previous
- `Home`: first
- `End`: last
- `N`: toggle notes drawer
- `F`: fullscreen
- `P`: presenter mode

Changing the presenter shortcut in `deck/deck.json` is safe.

Changing general shortcut behavior is an engine change.

## Safe Changes

These are normal and expected:

- replacing all sample slides
- replacing all sample notes
- changing deck metadata
- changing theme variables
- adding local assets
- reordering slides
- changing block data
- choosing between supported layouts

## Engine Changes

These should be made carefully:

- new block types
- new layouts
- changing presenter sync
- changing Markdown parsing
- changing keyboard behavior
- changing fullscreen behavior
- changing notes drawer behavior
- changing slide load semantics

If the change affects **every deck**, it belongs to the engine.

## Workflow For Agents

When asked to create a new deck:

1. Update `deck/deck.json`.
2. Replace `deck/theme.css` with the new talk theme.
3. Replace `deck/slides/*` with the new talk slides.
4. Replace `deck/notes/*` with matching notes.
5. Add local assets to `deck/assets/`.
6. Verify the deck with local build/test commands.

When asked to add a capability:

1. Check whether existing layouts and block types already cover it.
2. If yes, stay in `deck/`.
3. If no, update the engine in `src/`.
4. Keep the change reusable.

## Do Not

- do not put talk-specific content into `src/`
- do not put talk-specific assets outside `deck/assets/`
- do not change engine code for simple copy or theme updates
- do not add one-off logic to shared components unless it is intentionally reusable
- do not let note ids drift from slide ids

## Preferred Decision Rule

Ask:

**Is this a deck change or a platform change?**

- If it is a deck change, edit `deck/`
- If it is a platform change, edit `src/` or config

## Related Docs

See also:

- `README.md`
- `DECK_AUTHORING_GUIDE.md`
