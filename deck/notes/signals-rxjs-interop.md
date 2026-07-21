---
slide: signals-rxjs-interop
---
This is not Signals versus RxJS. They solve different layers.

`toSignal()` gives an Observable a synchronous current value for templates. It also cleans up its subscription with the injection context. `toObservable()` sends signal state into operators such as `debounceTime`, `switchMap`, and retry logic.

plushelter uses the third bridge: `rxResource()`. Its SSE parser stays an Observable, `scan` accumulates tokens, and the component reads resource state through signals.

Reference: https://angular.dev/ecosystem/rxjs-interop

