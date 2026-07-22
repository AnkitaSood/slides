---
id: loading-states
title: Loading is data
eyebrow: resource() + httpResource()
layout: two-column
blocks:
  - type: code
    title: "faq-store.ts"
    code: |
      @Service()
      export class FaqStore {
        readonly faq = httpResource<FaqCategory[]>(
          () => '/api/faq'
        );
      }
      // faq.isLoading() / faq.value() / faq.error()
---
| API | Best fit |
|---|---|
| `resource()` | custom async loaders, fetch, SDKs |
| `httpResource()` | reactive HTTP reads + interceptors |

No hand-rolled `loading = true / false`.

The request, value, error, and cancellation lifecycle move as one unit—ideal for AI calls and background-job polling.
