---
id: loading-states
title: Loading is data
eyebrow: resource() + httpResource()
layout: two-column
blocks:
  - type: code
    title: plushelter · reactive AI triage
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

      triageResource.isLoading();
      triageResource.value();
      triageResource.error();
  - type: callout
    tone: warning
    title: Keep mutations explicit
    body: Angular recommends `httpResource` for reactive reads. Use `HttpClient` or a `resource()` loader for state-changing POST/PUT work. An inference POST should behave like an idempotent read.
---
| API | Best fit |
|---|---|
| `resource()` | custom async loaders, fetch, SDKs |
| `httpResource()` | reactive HTTP reads + interceptors |

No hand-rolled `loading = true / false`.

The request, value, error, and cancellation lifecycle move as one unit—ideal for AI calls and background-job polling.
