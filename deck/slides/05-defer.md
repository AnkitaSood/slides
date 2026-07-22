---
id: defer
title: Defer
eyebrow: Modern Angular
layout: default
blocks:
  - type: chips
    items:
      - label: Improve Core Web Vitals
        tone: success
      - label: Shrink JS Payload
        tone: accent
      - label: Template-level lazy loading 
        tone: success
  - type: code
    language: angular
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
