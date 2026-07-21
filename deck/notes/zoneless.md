---
slide: zoneless
---

Angular historically relied on **Zone.js** — a library that monkey-patched every async API in the browser (setTimeout, Promises, XHR, fetch) just so Angular could know *when* something might have changed and trigger a re-render of the whole component tree. It worked, but it was expensive and invisible.

Going **zoneless** means Angular drops that dependency entirely. UI updates are now driven by **Signals** — a reactive primitive that tracks exactly which parts of the UI depend on which pieces of state. Only those parts re-render when state changes.

Zone.js was security cameras watching every door in the house, just in case. Zoneless with Signals is motion sensors — only the room that actually moved gets a notification.

---

## Why this matters for AI applications specifically

AI APIs (Gemini, OpenAI, etc.) stream responses as **Server-Sent Events** — hundreds of token chunks per second. With Zone.js, every chunk could trigger a full change detection cycle across the component tree. That's an enormous, unnecessary cost.

With zoneless + Signals:
- Only the signal holding the streamed text gets updated
- Only the template nodes bound to that signal re-render
- Everything else stays untouched

This makes AI chat UIs, live summarization, and copilot interfaces feel **smooth and responsive** rather than janky or CPU-heavy.

---

## The big picture: Angular's AI journey

Zoneless isn't just a performance tweak — it's a foundational shift that makes Angular's reactivity model **precise enough** to power real-time AI interfaces. Signals + zoneless is the combination that makes streaming UIs, live AI feedback loops, and reactive copilot experiences practical to build in Angular at scale.