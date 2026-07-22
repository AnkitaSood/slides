---
id: signals-apis
title: One reactive vocabulary
eyebrow: Read · derive · synchronize · communicate
layout: two-column
blocks:
  - type: code
    title: Editable AI result
    code: |
      triageResource = httpResource<CaseFile>(() => {
        const photo = this.uploadedPhoto();
        if (!photo) return undefined;
        return {
          url: '/api/intake-triage',
          method: 'POST',
          body: { photoBase64: photo.base64 }
        };
      });

      caseFile = linkedSignal<CaseFile>(() =>
        this.triageResource.value() ?? EMPTY_CASE_FILE
      );

      intakeForm = form(this.caseFile);
  - type: callout
    tone: info
    title: linkedSignal() 🤝 AI
    body: A new model result resets the draft. Human edits remain writable until the upstream result changes again.
---
| Primitive | Job |
|---|---|
| `signal()` | writable source |
| `linkedSignal()` | derived **and** editable |
| `effect()` | sync to non-reactive APIs |

One mental model from model response to editable, human-correctable UI.
