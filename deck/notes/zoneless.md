---
slide: zoneless
---
Zoneless has been the default since v21 — don't oversell it as v22-new, but every app in this talk (including plushelter) runs on it.

The AI tie-in: a fast SSE token stream used to make Zone.js re-check the whole component tree on every chunk. Zoneless means only the signal-consuming views update.

plushelter has no `zone.js` dependency at all — not even a polyfill entry — which is the real-world shape of "zoneless by default."

Reference: https://angular.dev/guide/zoneless
