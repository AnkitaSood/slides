---
id: zoneless
title: Zoneless
eyebrow: Angular's default since v21
layout: two-column
blocks:
  - type: callout
    tone: info
    title: Impact on Change Detection
    body: Replaces global top-down checking with notification-driven updates. Angular re-evaluates only targeted consuming views when Signals or events emit.
---
- **No more Zone.js:** removes ~30–40 KB and its startup monkey-patching.
- **Targeted updates:** Signals and events notify only the views that actually changed.
- **Better responsiveness:** less main-thread work per async event, better INP.
