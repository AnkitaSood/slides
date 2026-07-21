---
id: interaction-patterns
title: Make latency legible
eyebrow: AI interaction patterns
layout: two-column
blocks:
  - type: table
    columns:
      - Phase
      - UI promise
    rows:
      - ["Waiting", "Acknowledge immediately"]
      - ["Streaming", "Show useful partial output"]
      - ["Acting", "Name the active tool or step"]
      - ["Recovering", "Preserve input + offer retry"]
      - ["Done", "Stabilize layout + restore focus"]
  - type: code
    title: plushelter · status has controls
    code: |
      @if (status() === 'running') {
        <app-button (click)="cancel()">Stop</app-button>
      } @else {
        <app-button [disabled]="!draft().trim()">
          Send
        </app-button>
      }
---
An LLM can take seconds. Silence feels broken.

- Stream into a stable container
- Show agent/tool status in plain language
- Give users a Stop action
- Reserve space before content arrives
- Keep partial work when recovery is possible

Perceived performance is a state-design problem.
