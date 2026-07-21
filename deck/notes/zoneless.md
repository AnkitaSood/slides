---
slide: zoneless
---
Open with precision: zoneless became the default in Angular v21, so every v22 app starts there unless it opts back into Zone-based change detection.

Zone.js patched browser async APIs because Angular needed a hint that state might have changed. The hint was broad: async work could trigger synchronization even when application state stayed the same.

Now Angular relies on explicit notifications such as a signal written after each SSE token. That reduces unnecessary synchronization, removes Zone.js payload/startup overhead, and makes async debugging easier.

Do not claim Angular renders a single text node. The accurate claim is that signal writes notify Angular which consuming views need attention.

Reference: https://angular.dev/guide/zoneless
