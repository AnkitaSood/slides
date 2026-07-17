---
id: intro
title: Build the deck once. Author talks in Markdown.
eyebrow: Slide Engine Starter
layout: default
animate: ease-in
blocks:
  - type: chips
    items:
      - label: Markdown slides
        tone: success
      - label: Theme CSS
        tone: accent
      - label: Presenter mode
        tone: warn
  - type: callout
    tone: info
    title: Authoring model
    body: |
      Each branch carries one deck. Content lives in `deck/slides`, notes in `deck/notes`,
      assets in `deck/assets`, and visual identity in `deck/theme.css`.
---
This starter keeps the runtime behavior in Vue and the editable content in simple files.
