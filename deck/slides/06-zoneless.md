---
id: zoneless
title: Zoneless by default
eyebrow: Angular v22 · Modern primitives
layout: two-column
blocks:
  - type: code
    title: plushelter · every token is an explicit update
    code: |
      private appendToken(id: number, token: string) {
        this._transcript.update(entries =>
          entries.map(entry =>
            entry.id === id
              ? { ...entry, text: entry.text + token }
              : entry
          )
        );
      }
  - type: callout
    tone: info
    title: AI payoff
    body: A fast SSE stream no longer makes every patched async event a reason to synchronize the app. Signal writes tell Angular exactly when UI state changed.
---
**Zone.js:** patch browser APIs, then check whether anything changed.

**Zoneless:** render from explicit Angular notifications.

- Default since v21; standard in v22
- Less startup and payload overhead
- Cleaner async stack traces
