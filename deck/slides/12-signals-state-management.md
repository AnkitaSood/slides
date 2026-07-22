---
id: signals-state-management
title: A store can stay boring
eyebrow: "@Service() · new in Angular v22"
layout: two-column
blocks:
  - type: code
    title: "admitted-animals-store.ts"
    code: |
      @Service()
      export class AdmittedAnimalsStore {
        private readonly _admitted = signal<Animal[]>([]);
        readonly admitted = this._admitted.asReadonly();

        admit(animal: Animal): void {
          this._admitted.update(list => [...list, animal]);
        }

        remove(animalId: Animal['id']): void {
          this._admitted.update(list =>
            list.filter(animal => animal.id !== animalId)
          );
        }
      }
  - type: chips
    items:
      - label: no @Injectable() boilerplate
        tone: accent
      - label: root singleton by default
        tone: success
---
`@Service()` replaces `@Injectable()` for root-singleton services — this store is real plushelter code, unedited.

The same pattern can own chat history, active token counts, or agent status: keep writes private, expose read-only signals, derive views with `computed()`.

Central state, targeted consumers — no event bus for every token.
