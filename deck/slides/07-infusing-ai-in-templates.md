---
id: infusing-ai-in-templates
title: "Infusing AI in templates"
eyebrow: "Implementation Strategies"
layout: default
classes:
  - infusing-ai-slide
blocks:
  - type: callout
    tone: structured-data
    title: Structured Data
    body: |
      Force LLMs to return structured objects. Strongly typing these resources ensures type safety and enables editor autocompletion.
  - type: callout
    tone: reactive-state
    title: Reactive State
    body: |
      Use `computed` or `linkedSignal` to manage derived state. Access to prior values unlocks advanced UI patterns.
  - type: callout
    tone: ai-use-cases
    title: AI Use Cases
    body: |
      Leverage historical state to build ongoing chat histories and seamlessly preserve UI data while LLMs generate new content.
---
