---
slide: build-with-ai
---
This is the dev-tooling side of "AI-powered Angular" — how AI builds the app, not how the app talks to AI agents (that's next).

Live-demo the command if possible: `npx @angular/cli mcp` starts a server any MCP-capable coding agent can attach to. Walk `search_documentation` and `onpush_zoneless_migration` as the two tools most relevant to this talk.

Agent Skills are a separate, newer mechanism: `npx skills add https://github.com/angular/skills` installs Angular-maintained skill files so an agent gets architectural guidance instead of generic code.

Reference: https://angular.dev/ai/mcp and https://angular.dev/ai/agent-skills
