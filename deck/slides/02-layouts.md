---
id: layouts
title: Structured slide blocks without custom coding
eyebrow: Supported Content
layout: two-column
animate: ease-in
blocks:
  - type: table
    columns:
      - Need
      - Block Type
    rows:
      - ["Narrative text", "`text` or body markdown"]
      - ["Pills / tags", "`chips`"]
      - ["Warnings or emphasis", "`callout`"]
      - ["Examples", "`code`"]
      - ["Comparisons", "`table`"]
  - type: code
    title: Frontmatter block example
    code: |
      blocks:
        - type: chips
          items:
            - label: Reusable
              tone: success
        - type: callout
          tone: warning
          title: Watch this
          body: Keep slides data-driven.
---
You can mix body markdown with frontmatter blocks so the authoring experience stays mostly text-first.
