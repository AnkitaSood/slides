---
id: control-flow-switch
title: Control Flow Syntax
eyebrow: Modern Angular
layout: default
blocks:
  - type: code
    language: angular
    title: switch
    code: |
      @switch (role()) {
        @case ('admin') {
          <app-admin-panel />
        }
        @case ('user') {
          <app-user-profile />
        }
        @default {
          <app-guest-view />
        }
      }
---
