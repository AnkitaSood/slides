---
id: build-with-ai
title: "Building Angular with AI"
eyebrow: "Angular CLI MCP · Agent Skills"
layout: two-column
blocks:
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
An AI agent that knows Angular's actual APIs beats one guessing from stale training data.

`npx @angular/cli mcp` exposes a live doc/build/lint surface to any MCP-capable agent — Claude Code, Cursor, Antigravity.

`npx skills add https://github.com/angular/skills` installs the `angular-developer` and `angular-new-app` skills for idiomatic scaffolding.
