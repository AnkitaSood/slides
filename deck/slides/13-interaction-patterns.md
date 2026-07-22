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
    title: Status has controls
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

Perceived performance is a state-design problem, not a spinner problem.
