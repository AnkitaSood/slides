---
slide: debounced
---
Flag this explicitly as experimental — it's new in Angular v22 and the stability badge says so, unlike `resource()`/`httpResource()`/Signal Forms right before it.

The old way was `debounceTime()` in an RxJS pipeline. `debounced()` gets you the same behavior as a plain signal, so it composes directly with `resource()` without an interop bridge.

plushelter uses it twice: the roster AI search (400ms) and the surrender-risk assessment (600ms) — both exist to stop a network call from firing on every keystroke.

Reference: https://angular.dev/api/core/debounced
