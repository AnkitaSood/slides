import MarkdownIt from 'markdown-it';
import { highlightCode } from './highlightCode';

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight: highlightCode,
});

const slideModules = import.meta.glob('/deck/slides/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const noteModules = import.meta.glob('/deck/notes/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const themeModules = import.meta.glob('/deck/theme.css', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const deckModules = import.meta.glob('/deck/deck.json', {
  eager: true,
  import: 'default',
});

export function loadDeck() {
  const deck = Object.values(deckModules)[0] ?? {};
  const notesById = buildNotesMap(noteModules);
  const slides = Object.entries(slideModules)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([path, source], index) => {
      const parsed = parseFrontmatter(source);
      const id = parsed.data.id ?? deriveId(path, index);
      return {
        id,
        order: index,
        title: parsed.data.title ?? '',
        eyebrow: parsed.data.eyebrow ?? '',
        layout: parsed.data.layout ?? 'default',
        animate: parsed.data.animate ?? 'ease-in',
        classes: parsed.data.classes ?? [],
        blocks: normalizeBlocks(parsed.data.blocks ?? []),
        bodyHtml: markdown.render(parsed.content),
        notesHtml: notesById.get(id) ?? '<p>No notes for this slide yet.</p>',
      };
    });

  return {
    meta: {
      title: deck.title ?? 'Untitled Deck',
      author: deck.author ?? '',
      description: deck.description ?? '',
      presenterShortcut: deck.presenterShortcut ?? 'p',
    },
    themeCss: Object.values(themeModules)[0] ?? '',
    slides,
  };
}

function buildNotesMap(modules) {
  const notes = new Map();

  for (const [path, source] of Object.entries(modules)) {
    const parsed = parseFrontmatter(source);
    const id = parsed.data.slide ?? deriveId(path);
    notes.set(id, markdown.render(parsed.content));
  }

  return notes;
}

function deriveId(path, index = 0) {
  const file = path.split('/').at(-1)?.replace(/\.md$/, '') ?? `slide-${index + 1}`;
  return file.replace(/^\d+-/, '');
}

function normalizeBlocks(blocks) {
  return blocks.map((block) => ({
    type: block.type ?? 'text',
    ...block,
  }));
}

function parseFrontmatter(source) {
  const trimmed = source.replace(/^\uFEFF/, '');

  if (!trimmed.startsWith('---\n') && !trimmed.startsWith('---\r\n')) {
    return { data: {}, content: trimmed };
  }

  const match = trimmed.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: trimmed };
  }

  return {
    data: parseYamlLikeObject(match[1]),
    content: match[2].trimStart(),
  };
}

function parseYamlLikeObject(input) {
  const lines = input.replace(/\r\n/g, '\n').split('\n');
  const root = {};
  const stack = [{ indent: -1, type: 'object', value: root }];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim()) continue;

    const indent = countIndent(line);
    const trimmed = line.trim();

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];

    if (trimmed.startsWith('- ')) {
      if (parent.type !== 'array') {
        throw new Error(`Invalid frontmatter list item near "${trimmed}"`);
      }

      const itemText = trimmed.slice(2).trim();
      if (!itemText) {
        const item = {};
        parent.value.push(item);
        stack.push({ indent, type: 'object', value: item });
        continue;
      }

      if (itemText.includes(':')) {
        const item = {};
        parent.value.push(item);
        const [key, rest] = splitKeyValue(itemText);
        item[key] = parseScalar(rest);
        stack.push({ indent, type: 'object', value: item });
        continue;
      }

      parent.value.push(parseScalar(itemText));
      continue;
    }

    const [key, rawValue] = splitKeyValue(trimmed);

    if (rawValue === '|') {
      const block = [];
      index += 1;
      while (index < lines.length) {
        const nextLine = lines[index];
        if (!nextLine.trim()) {
          block.push('');
          index += 1;
          continue;
        }

        const nextIndent = countIndent(nextLine);
        if (nextIndent <= indent) {
          index -= 1;
          break;
        }

        block.push(nextLine.slice(indent + 2));
        index += 1;
      }

      parent.value[key] = block.join('\n');
      continue;
    }

    if (rawValue === '') {
      const nextLine = lines[index + 1] ?? '';
      const nextTrimmed = nextLine.trim();
      const container = nextTrimmed.startsWith('- ') ? [] : {};
      parent.value[key] = container;
      stack.push({
        indent,
        type: Array.isArray(container) ? 'array' : 'object',
        value: container,
      });
      continue;
    }

    parent.value[key] = parseScalar(rawValue);
  }

  return root;
}

function splitKeyValue(line) {
  const separatorIndex = line.indexOf(':');
  if (separatorIndex === -1) {
    throw new Error(`Invalid frontmatter line "${line}"`);
  }

  return [
    line.slice(0, separatorIndex).trim(),
    line.slice(separatorIndex + 1).trim(),
  ];
}

function countIndent(line) {
  const match = line.match(/^ */);
  return match ? match[0].length : 0;
}

function parseScalar(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);

  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map(parseScalar);
  }

  return value;
}
