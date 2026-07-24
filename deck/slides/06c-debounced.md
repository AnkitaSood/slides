---
id: debounced
title: "debounced()"
eyebrow: "Experimental in Angular v22"
layout: two-column
blocks:
  - type: code
    language: typescript
    title: "search"
    code: |
      protected readonly searchQuery = signal('');

      protected readonly debouncedQuery =
        debounced(this.searchQuery, 400);

      protected readonly searchResults = resource({
        params: () =>
          (this.debouncedQuery.value() ?? '').trim()
            || undefined,
        loader: async ({ params, abortSignal }) => { /* … */ },
      });
---
Delays updating a value until user input stops.