---
slide: loading-states
---
Contrast the old shape — three booleans plus try/catch/finally — with one resource lifecycle.

`FaqStore` is a root-singleton service whose entire body is one `httpResource()` line. No manual fetch, no subscription, no loading flag — `isLoading()`, `value()`, and `error()` come for free.

This is the reads case. The AI triage flow (slide 09) shows the async-loader case with `resource()` — same lifecycle, different data source.

References: https://angular.dev/guide/signals/resource and https://angular.dev/guide/http/http-resource

