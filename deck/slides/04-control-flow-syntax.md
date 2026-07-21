---
id: control-flow-syntax
title: Control Flow Syntax
eyebrow: Modern Angular
layout: two-column
blocks:
  - type: table
    columns:
      - Before
      - After
    rows:
      - ["`*ngFor`", "`@for`"]
      - ["`*ngIf`", "`@if`"]
      - ["`*ngSwitch`", "`@switch`"]
  - type: code
    title: Code Example
    code: |
      @for (user of users(); track user.id) {
        <p>{{ user.name }}</p>
      }
---
