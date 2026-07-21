---
id: signals-intro
title: Signals: state with a map
eyebrow: Fine-grained reactivity
layout: two-column
blocks:
  - type: code
    title: plushelter · agent state
    code: |
      private readonly _transcript = signal<AgentEntry[]>([]);
      private readonly _status = signal<AgentStatus>('idle');

      readonly transcript = this._transcript.asReadonly();
      readonly status = this._status.asReadonly();

      this._status.set('running');
      this._transcript.update(list => [...list, entry]);
  - type: chips
    items:
      - label: read with ()
        tone: accent
      - label: set()
        tone: success
      - label: update()
        tone: success
---
A Signal is a value plus knowledge of **who reads it**.

- Synchronous current value
- Dependencies tracked at the read site
- No manual subscription for local UI state

For AI: prompt, transcript, status, and token text stay predictable—even while the network is not.
