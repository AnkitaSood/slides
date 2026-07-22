import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

const AUTO_DETECT_LANGUAGES = ['typescript', 'javascript', 'xml', 'bash', 'css', 'json'];
const LANGUAGE_ALIASES = {
  angular: 'xml',
  html: 'xml',
  js: 'javascript',
  shell: 'bash',
  sh: 'bash',
  ts: 'typescript',
};

export function highlightCode(code, language) {
  const normalizedLanguage = LANGUAGE_ALIASES[language] ?? language;

  if (normalizedLanguage && hljs.getLanguage(normalizedLanguage)) {
    return hljs.highlight(code, {
      language: normalizedLanguage,
      ignoreIllegals: true,
    }).value;
  }

  return hljs.highlightAuto(code, AUTO_DETECT_LANGUAGES).value;
}
