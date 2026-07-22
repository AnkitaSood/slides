---
id: debounced
title: "Debounce the signal, not the call site"
eyebrow: "debounced() · experimental in Angular v22"
layout: two-column
blocks:
  - type: code
    language: typescript
    title: "roster.ts"
    code: |
      protected readonly searchQuery = signal('');

      protected readonly debouncedQuery =
        debounced(this.searchQuery, 400);

      protected readonly searchResults = resource({
        params: () =>
          (this.debouncedQuery.value() ?? '').trim()
            || undefined,
        loader: async ({ params, abortSignal }) => { /* … */ },
      });
  - type: chips
    items:
      - label: signal in, signal out
        tone: accent
      - label: no RxJS import needed
        tone: success
---
`debounced()` wraps a signal and settles to a new value only after a quiet window — here, 400ms.

The AI payoff: `resource()` reads the debounced signal, not the raw keystrokes, so a Gemini call doesn't fire on every character typed.

plushelter uses the same pattern for surrender-risk assessment (600ms) — an experimental primitive, but already load-bearing in two features.
