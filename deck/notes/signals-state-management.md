---
slide: signals-state-management
---
Lead with `@Service()` itself — it's new in Angular v22 and most of the room hasn't seen it yet. It drops the `@Injectable({ providedIn: 'root' })` boilerplate for a root-singleton service.

Then widen to the pattern: mutation methods stay private, only `asReadonly()` is exposed. Components derive filtered views without gaining write access.

Map to AI: one store can own transcript, model configuration, and active run state. Split stores only when lifetimes diverge.

Reference: https://angular.dev/api/core/Service

