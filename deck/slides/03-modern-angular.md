---
id: modern-angular
title: Modern Angular
layout: default
classes:
  - modern-angular-slide
blocks:
  - type: callout
    tone: templates
    title: Templates
    body: |
      - Built-in control flow (`@if`, `@for`, `@switch`)
      - Deferrable views (`@defer`)
      - `NgOptimizedImage` for preventing layout shifts.
  - type: callout
    tone: signals
    title: Signals
    body: |
      - Fine-grained reactivity model - sync and async apis.
      - Component specific apis - inputs, models, queries.
      - Signals 🤝 RxJS
  - type: callout
    tone: change-detection
    title: Change Detection
    body: |
      - Zoneless + OnPush is the new default.
      - Signal integration.
      - "Smarter" dom traversal.
  - type: callout
    tone: ssr
    title: SSR
    body: |
      - Seamless integration with `@defer`.
      - Configurable rendering modes.
      - Server-compatible components
---
