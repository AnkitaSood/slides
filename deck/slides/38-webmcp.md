---
id: webmcp
title: "Angular apps as agent tools"
eyebrow: "WebMCP · experimental"
layout: two-column
blocks:
  - type: code
    language: typescript
    title: "app.config.ts"
    code: |
      providers: [
        // ...
        provideExperimentalWebMcpForms(),
      ],
  - type: code
    language: typescript
    title: "surrender-flow.ts"
    code: |
      surrenderForm = form(this.model, f => {
        required(f.ownerName);
      }, {
        experimentalWebMcpTool: {
          name: 'submitSurrenderRequest',
          description: 'File a shelter surrender request.'
        }
      });
---
WebMCP lets a browser-native AI agent call a tool directly instead of driving a wizard through the DOM.

`provideExperimentalWebMcpForms()` turns any Signal Form into an agent-callable tool automatically — plushelter's surrender flow needs zero extra glue code.

Angular's own docs flag this as early and unstable: APIs can change outside major versions.
