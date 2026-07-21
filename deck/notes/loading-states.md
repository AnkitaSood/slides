---
slide: loading-states
---
Contrast the old shape—three booleans plus try/catch/finally—with one resource lifecycle.

In plushelter, the uploaded photo is the reactive request key. No photo returns `undefined`, so the resource stays idle. A new photo supersedes the old request. The template reads `isLoading()`, `value()`, and `error()` directly.

Important caveat: Angular recommends `httpResource` for reads, not state-changing mutations. plushelter's AI inference uses POST because the payload is large, but it should remain idempotent. Use explicit mutation APIs when the server changes durable state.

References: https://angular.dev/guide/signals/resource and https://angular.dev/guide/http/http-resource

