---
id: signal-forms
title: The prompt is a typed model
eyebrow: Signal Forms · stable in Angular v22
layout: two-column
blocks:
  - type: code
    language: typescript
    title: One form for humans and agents
    code: |
      model = signal<SurrenderRequest>(
        { ...EMPTY_SURRENDER_REQUEST }
      );

      surrenderForm = form(
        this.model,
        f => {
          required(f.ownerName);
          required(f.animalName);
          required(f.reason);
        },
        {
          experimentalWebMcpTool: {
            name: 'submitSurrenderRequest',
            description: 'File a shelter surrender request.'
          }
        }
      );
  - type: chips
    items:
      - label: typed field tree
        tone: accent
      - label: schema validation
        tone: success
      - label: agent-callable
        tone: warn
---
Complex AI input is more than one textarea:

- structured fields, not free text
- centralized validation
- one submit contract

Signal Forms keeps values, validation, and field state in one reactive graph — plushelter even derives an experimental WebMCP tool from that same contract.
