---
slide: signals-intro
---
Start with the contract: a signal always has a current value, and reading it registers a dependency.

Walk the plushelter agent state from private writable signals to public read-only views. `set()` replaces; `update()` derives the next value from the previous one.

AI connection: token streams are unpredictable, but state transitions do not have to be. Signals remove subscription bookkeeping for local UI state.

Reference: https://angular.dev/guide/signals

