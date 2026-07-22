---
id: signals-rxjs-interop
title: Keep the RxJS pipeline
eyebrow: rxResource · stable in Angular v22
layout: two-column
blocks:
  - type: code
    language: typescript
    title: SSE Observable → Resource
    code: |
      chatStream = rxResource({
        params: () => this.pendingRequest(),
        stream: ({ params }) =>
          this.chatService.streamChat(params.message, {
            admittedCount: this.admittedAnimalsStore.admitted().length,
            adoptedCount: this.adoptedAnimalsStore.adoptions().length,
          }).pipe(scan((state, event) =>
            event.type === 'token'
              ? { ...state, text: state.text + event.token }
              : state,
            { text: '', done: false }
          )),
      });

      streamingText = computed(() =>
        this.chatStream.value()?.text ?? ''
      );
  - type: callout
    tone: info
    title: AI payoff
    body: Preserve cancellation, `scan`, retries, and stream parsing in RxJS. Expose the latest result as simple signal reads in the template.
---
| Bridge | Use it when… |
|---|---|
| `toSignal(stream$)` | an Observable feeds the UI |
| `toObservable(query)` | a Signal enters an RxJS pipeline |
| `rxResource({ stream })` | the stream also needs resource status |

Interop is a migration path—not a rewrite tax.
