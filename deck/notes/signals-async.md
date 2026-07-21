---
slide: signals-async
---
`resource()` is the bridge between synchronous signals and asynchronous work.

Walk the four parts in order: debounced query becomes `params`; the loader runs; Angular passes an `AbortSignal`; the resource exposes the result and lifecycle.

The AI-specific win is race safety. If the user changes the query while Gemini is still answering, the stale request is aborted and cannot casually overwrite the newest result.

Mention that Resources are stable in Angular v22.

Reference: https://angular.dev/guide/signals/resource

