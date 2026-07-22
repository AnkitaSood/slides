<template>
  <div class="block" :class="[`block-${block.type}`, `tone-${block.tone ?? 'default'}`]">
    <div v-if="block.type === 'text'" class="markdown" v-html="renderMarkdown(block.body ?? '')"></div>

    <div v-else-if="block.type === 'chips'" class="chips">
      <span
        v-for="item in block.items ?? []"
        :key="item.label"
        class="chip"
        :class="`chip-${item.tone ?? 'default'}`"
      >
        {{ item.label }}
      </span>
    </div>

    <div v-else-if="block.type === 'callout'" class="callout">
      <div v-if="block.title" class="callout-title">{{ block.title }}</div>
      <div class="markdown" v-html="renderMarkdown(block.body ?? '')"></div>
    </div>

    <div v-else-if="block.type === 'code'" class="code-wrap">
      <div v-if="block.title" class="code-title">{{ block.title }}</div>
      <pre><code class="hljs" v-html="renderCode(block.code ?? '', block.language)"></code></pre>
    </div>

    <div v-else-if="block.type === 'table'" class="table-wrap">
      <table>
        <thead>
          <tr>
            <th v-for="column in block.columns ?? []" :key="column">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in block.rows ?? []" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex" v-html="renderMarkdownInline(cell)"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import MarkdownIt from 'markdown-it';
import { highlightCode } from '../lib/highlightCode';

const inlineMarkdown = new MarkdownIt({ html: false, linkify: true, typographer: true });
const blockMarkdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight: highlightCode,
});

defineProps({
  block: { type: Object, required: true },
});

function renderMarkdown(content) {
  return blockMarkdown.render(content);
}

function renderMarkdownInline(content) {
  return inlineMarkdown.renderInline(content);
}

function renderCode(content, language) {
  return highlightCode(content, language);
}
</script>

<style scoped>
.block {
  width: 100%;
}

.markdown :deep(p) {
  margin: 0.75rem 0 0;
}

.markdown :deep(p:first-child) {
  margin-top: 0;
}

.markdown :deep(ul),
.markdown :deep(ol) {
  margin: 0.8rem 0 0;
  padding-left: 1.4rem;
}

.chips {
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
}

.chip {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.32rem 0.9rem;
  border-radius: 1px;
  background: var(--chip-tone, var(--deck-accent));
  color: var(--deck-code);
  font-family: var(--deck-font-mono);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.32),
    0 6px 14px rgba(0, 0, 0, 0.32);
  transform: rotate(var(--chip-tilt, 0deg));
  transition: transform 220ms cubic-bezier(0.2, 0.9, 0.2, 1), box-shadow 220ms ease;
}

.chip::after {
  content: '';
  position: absolute;
  inset: 0 0 auto auto;
  width: 0.65rem;
  height: 0.65rem;
  background: linear-gradient(135deg, transparent 50%, rgba(0, 0, 0, 0.22) 51%);
  border-radius: 0 1px 0 8px;
}

.chip:nth-of-type(3n + 1) {
  --chip-tilt: -2.6deg;
}

.chip:nth-of-type(3n + 2) {
  --chip-tilt: 2deg;
}

.chip:nth-of-type(3n + 3) {
  --chip-tilt: -1.4deg;
}

.chip:hover {
  transform: rotate(0deg) translateY(-3px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.32),
    0 10px 22px rgba(0, 0, 0, 0.4);
}

.chip-success {
  --chip-tone: var(--deck-accent);
}

.chip-accent {
  --chip-tone: var(--deck-accent-2);
}

.chip-warn {
  --chip-tone: var(--deck-warn);
}

@media (prefers-reduced-motion: reduce) {
  .chip {
    transition: box-shadow 220ms ease;
  }

  .chip:hover {
    transform: rotate(var(--chip-tilt, 0deg));
  }
}

.callout,
.code-wrap,
.table-wrap {
  border: 1px solid var(--deck-line-strong);
  border-radius: var(--deck-radius);
  background: color-mix(in srgb, var(--deck-surface) 88%, black);
  box-shadow: var(--deck-shadow);
  overflow: hidden;
}

.callout {
  padding: 1rem 1.1rem;
}

.callout-title {
  margin-bottom: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--deck-text);
}

.code-title {
  padding: 0.85rem 1.1rem 0.45rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--deck-text);
}

.tone-info.callout {
  border-color: color-mix(in srgb, var(--deck-accent-2) 45%, transparent);
}

.tone-warning.callout {
  border-color: color-mix(in srgb, var(--deck-warn) 45%, transparent);
}

pre {
  margin: 0;
  padding: 1rem 1.1rem 1.15rem;
  overflow: auto;
  border-radius: inherit;
  background: var(--deck-code);
  color: var(--deck-text);
  font-size: 0.9rem;
  line-height: 1.6;
}

.code-title + pre {
  padding-top: 0.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.8rem 0.95rem;
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid var(--deck-line);
}

th {
  font-size: 0.8rem;
  color: var(--deck-faint);
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

tbody tr:last-child td {
  border-bottom: 0;
}
</style>
