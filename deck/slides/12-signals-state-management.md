---
id: signals-state-management
title: A store can stay boring
eyebrow: Signal-based state management
layout: two-column
blocks:
  - type: code
    title: plushelter · session-scoped store
    code: |
      @Service()
      export class AdmittedAnimalsStore {
        private readonly _admitted = signal<Animal[]>([]);
        readonly admitted = this._admitted.asReadonly();

        admit(animal: Animal) {
          this._admitted.update(list => [...list, animal]);
        }

        remove(id: Animal['id']) {
          this._admitted.update(list =>
            list.filter(animal => animal.id !== id)
          );
        }
      }
  - type: callout
    tone: info
    title: Scale by responsibility
    body: Keep writes private, expose read-only signals, and derive views with `computed()`. Add a library only when the app needs its extra guarantees.
---
The same service pattern can own:

- chat history
- active token and context counts
- selected model and tool policy
- agent status and errors

Central state; targeted consumers; no event bus for every token.
