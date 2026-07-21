---
id: zoneless
title: Zoneless Change Detection
eyebrow: Modern Angular
layout: default
blocks:
  - type: chips
    items:
      - label: No Zone.js
        tone: success
      - label: Signal-driven updates
        tone: success
      - label: Built for AI streaming
        tone: info
  - type: callout
    tone: info
    title: Why it matters for AI
    body: AI streams tokens continuously — zoneless apps update only what changed, not the whole tree.
---
- Angular no longer monkey-patches async
- Updates are **explicit** and **fine-grained**
- Smaller bundle · faster startup · SSR-safe
