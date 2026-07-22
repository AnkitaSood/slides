---
id: control-flow-syntax
title: Control Flow Syntax
eyebrow: Modern Angular · stable since v17
layout: two-column
blocks:
  - type: chips
    items:
      - label: No manual imports
        tone: success
      - label: Reduced bundle size
        tone: accent
  - type: table
    columns:
      - Before
      - After
    rows:
      - ["`*ngFor`", "`@for`"]
      - ["`*ngIf`", "`@if`"]
      - ["`*ngSwitch`", "`@switch`"]
  - type: code
    title: if/ else
    code: |
      @if (status() === 'running') {
        <app-button type="button" variant="secondary" (click)="cancel()">Stop</app-button>
      } @else {
        <app-button type="submit" [disabled]="!draft().trim()">Send</app-button>
      }
  - type: code
    title: for
    code: |
      @for (s of speciesOptions(); track s) {
        <option [value]="s">{{ s }}</option>
      }
---
