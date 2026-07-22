---
slide: defer
---
`@defer` splits a component's code out of the initial bundle and loads it on a trigger — here, viewport visibility.

Smaller initial payload means a faster first paint. Call out LCP and TTFB as the Core Web Vitals this most directly helps.

It's stable since v17 — not a v22-only feature, but essential context before the async/signals sections.