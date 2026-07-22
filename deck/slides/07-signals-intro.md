---
id: signals-intro
title: Signals
eyebrow: Fine-grained reactivity
layout: two-column
blocks:
  - type: code
    title: Agent state
    code: |
      private readonly _transcript = signal<AgentEntry[]>([]);
      private readonly _status = signal<AgentStatus>('idle');

      readonly transcript = this._transcript.asReadonly();
      readonly status = this._status.asReadonly();

      this._status.set('running');
      this._transcript.update(list => [...list, entry]);
---
A reactive primitive that represents a value.

- Read it in a template, and Angular starts tracking it automatically
- Change it, and only the parts of the page that use it update
- No subscriptions to set up, and none to remember to clean up

That's what makes a chat transcript that updates constantly easy to work with — the status badge and the growing reply update on their own, without wiring any of it by hand.
