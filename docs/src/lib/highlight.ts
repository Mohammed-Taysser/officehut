import type { HighlighterCore, ThemeRegistration } from 'shiki/core';

export type Lang = 'tsx' | 'html' | 'js' | 'scss' | 'bash' | 'json';

// "Ink on paper": two inks plus pencil grey. Colours come from CSS variables so
// the same highlighted HTML works in light and night themes.
const theme: ThemeRegistration = {
  name: 'officehut-ink',
  type: 'light',
  colors: {
    'editor.foreground': 'var(--code-fg)',
    'editor.background': 'transparent',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: 'var(--code-comment)', fontStyle: 'italic' },
    },
    {
      scope: ['string', 'string.quoted', 'attribute-value', 'string.template'],
      settings: { foreground: 'var(--code-string)' },
    },
    {
      scope: ['keyword', 'storage', 'keyword.control', 'storage.type'],
      settings: { foreground: 'var(--code-keyword)' },
    },
    {
      scope: [
        'entity.name.tag',
        'support.class.component',
        'entity.name.type',
        'support.type',
      ],
      settings: { foreground: 'var(--code-tag)' },
    },
    {
      scope: [
        'entity.other.attribute-name',
        'variable.parameter',
        'support.type.property-name',
        'meta.property-name',
      ],
      settings: { foreground: 'var(--code-attr)' },
    },
    {
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: 'var(--code-fn)' },
    },
    {
      scope: [
        'constant',
        'constant.numeric',
        'constant.language',
        'variable.other.constant',
      ],
      settings: { foreground: 'var(--code-const)' },
    },
    {
      scope: ['punctuation', 'meta.brace', 'punctuation.definition.tag'],
      settings: { foreground: 'var(--code-punct)' },
    },
  ],
};

let highlighter: Promise<HighlighterCore> | null = null;

function load() {
  highlighter ??= (async () => {
    const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] =
      await Promise.all([
        import('shiki/core'),
        import('shiki/engine/javascript'),
      ]);
    return createHighlighterCore({
      themes: [theme],
      langs: [
        import('shiki/langs/tsx.mjs'),
        import('shiki/langs/html.mjs'),
        import('shiki/langs/javascript.mjs'),
        import('shiki/langs/scss.mjs'),
        import('shiki/langs/bash.mjs'),
        import('shiki/langs/json.mjs'),
      ],
      engine: createJavaScriptRegexEngine(),
    });
  })();
  return highlighter;
}

const LANG_ID: Record<Lang, string> = {
  tsx: 'tsx',
  html: 'html',
  js: 'javascript',
  scss: 'scss',
  bash: 'bash',
  json: 'json',
};

export async function highlight(code: string, lang: Lang): Promise<string> {
  const h = await load();
  return h.codeToHtml(code, { lang: LANG_ID[lang], theme: 'officehut-ink' });
}
