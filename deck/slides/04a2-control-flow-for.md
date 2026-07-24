---
id: control-flow-for
title: Control Flow Syntax
eyebrow: Modern Angular
layout: default
blocks:
  - type: code
    language: angular
    title: for
    code: |
      @for (s of speciesOptions(); track s) {
        <option [value]="s">{{ s }}</option>
      }
---
