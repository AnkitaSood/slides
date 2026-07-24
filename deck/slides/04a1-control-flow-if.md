---
id: control-flow-if
title: Control Flow Syntax
eyebrow: Modern Angular
layout: default
blocks:
  - type: code
    language: angular
    title: if / else
    code: |
      @if (status() === 'running') {
        <app-button type="button" variant="secondary" (click)="cancel()">Stop</app-button>
      } @else {
        <app-button type="submit" [disabled]="!draft().trim()">Send</app-button>
      }
---
