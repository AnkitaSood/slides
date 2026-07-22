---
id: signals-async
title: Async state—not async spaghetti
eyebrow: Resource · stable in Angular v22
layout: two-column
blocks:
  - type: code
    language: typescript
    title: AI roster search
    code: |
      searchResults = resource({
        params: () => this.debouncedQuery.value()?.trim()
          || undefined,
        loader: async ({ params, abortSignal }) => {
          const res = await fetch('/api/roster-search', {
            method: 'POST',
            body: JSON.stringify({ query: params }),
            signal: abortSignal,
          });
          return res.json() as Promise<RosterSearchResult>;
        },
      });
  - type: chips
    items:
      - label: reactive params
        tone: accent
      - label: stale work aborted
        tone: success
      - label: status is a signal
        tone: success
---
`resource()` turns an async dependency into a reactive state machine.

- Signals produce the request params
- The loader runs, and stale requests are aborted automatically
- Value, loading, and error settle together

For AI search, the newest prompt wins — race handling is part of the primitive.
