---
slide: signals-state-management
---
Do not lead with a state library. Lead with ownership.

The plushelter store keeps mutation methods inside the service and exposes only `asReadonly()`. Components can derive filtered views without gaining permission to mutate shared state.

Map the pattern to AI: one store can own transcript, model configuration, context budget, active run, and errors. Split stores when those responsibilities gain different lifetimes or persistence needs.

The point is maintainability: explicit write boundaries and targeted reactive reads.

