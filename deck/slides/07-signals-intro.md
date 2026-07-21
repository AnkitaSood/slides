---
id: signals
title: Signals
layout: default
blocks:
  - type: chips
    items:
      - label: RxJS Optional
        tone: info
  - type: code
    title: Code Example
    code: |
      @defer (on viewport) {
        <large-component />
      } @loading (after 100ms; minimum 1s){
        <img alt="loading..." src="loading.gif" />
      } @placeholder {
        <p>Placeholder content</p>
      }
      @error {
        <p>Failed to load large component.</p>
      }
---
