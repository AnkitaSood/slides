---
id: signals-apis
title: One reactive vocabulary
eyebrow: Read · derive · synchronize · communicate
layout: two-column
blocks:
  - type: code
    title: plushelter · editable AI result
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
    title: Why linkedSignal fits AI
    body: A new model result resets the draft. Human edits remain writable until the upstream result changes again.
---
| Primitive | Job |
|---|---|
| `signal()` | writable source |
| `computed()` | read-only derivation |
| `linkedSignal()` | derived **and** editable |
| `effect()` | sync to non-reactive APIs |
| `input()` / `output()` | component boundary |

One mental model from model response to editable UI to child component.
