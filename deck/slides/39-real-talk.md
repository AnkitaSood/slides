---
id: real-talk
title: "Real talk: what's safe to ship"
eyebrow: "Adoption guidance"
layout: two-column
blocks:
  - type: table
    columns:
      - Ship today
      - Watch first
    rows:
      - ["Zoneless — default since v21", "`debounced()` — experimental"]
      - ["`resource()` / `httpResource()` / `rxResource()` — stable v22", "WebMCP — experimental spec"]
      - ["Signal Forms — stable v22", "`@Service()` — new; worth a small pilot"]
---
Every claim in this talk was checked against Angular's live API-reference stability badges, not memory or blog posts — badges change with point releases, so re-check before you ship.

"Stable since v22" earns a place in production code today. "Experimental" earns a spike branch and a follow-up date.

The best AI feature is still the one your users never notice — it just feels fast.
