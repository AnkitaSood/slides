---
id: build-with-ai
title: "Build With AI"
eyebrow: "Angular CLI MCP · Agent Skills"
layout: two-column
blocks:
  - type: code
    language: bash
    title: "Angular Skills"
    code: |
      npx skills add https://github.com/angular/skills
  - type: code
    language: bash
    title: "Angular MCP Server"
    code: |
      npx @angular/cli mcp
  - type: table
    columns:
      - Tool
      - Purpose
    rows:
      - ["`search_documentation`", "query official Angular docs"]
      - ["`get_best_practices`", "Angular's best-practices guide"]
      - ["`onpush_zoneless_migration`", "flags change-detection issues"]
      - ["`run_target`", "build / test / lint from the agent"]
---