const VOID = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
]);
const INLINE = new Set([
  'a',
  'abbr',
  'b',
  'code',
  'em',
  'i',
  'kbd',
  'mark',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'time',
]);

/**
 * Pretty-print a DOM subtree as HTML for the "HTML" tab. Strips React-only
 * noise (generated ids, empty style attributes) so the snippet is copyable.
 */
export function formatHtml(root: Element): string {
  const lines: string[] = [];

  const attrs = (el: Element) =>
    [...el.attributes]
      .filter((a) => !(a.name === 'style' && !a.value.trim()))
      .map((a) => {
        let v = a.value.replace(
          /«r[0-9a-z]+»|:r[0-9a-z]+:|_r_[0-9a-z]+_/g,
          'x',
        );
        if (a.name === 'style') v = v.replace(/transform:[^;]+;?/g, '').trim();
        return v === '' &&
          [
            'open',
            'disabled',
            'hidden',
            'checked',
            'inert',
            'required',
            'readonly',
            'selected',
          ].includes(a.name)
          ? ` ${a.name}`
          : ` ${a.name}="${v}"`;
      })
      .join('');

  const inline = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE)
      return (node.textContent ?? '').replace(/\s+/g, ' ');
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    const el = node as Element;
    const tag = el.tagName.toLowerCase();
    if (VOID.has(tag)) return `<${tag}${attrs(el)} />`;
    return `<${tag}${attrs(el)}>${[...el.childNodes].map(inline).join('')}</${tag}>`;
  };

  const isInlineOnly = (el: Element) =>
    [...el.childNodes].every(
      (n) =>
        n.nodeType === Node.TEXT_NODE ||
        (n.nodeType === Node.ELEMENT_NODE &&
          (INLINE.has((n as Element).tagName.toLowerCase()) ||
            (n as Element).tagName.toLowerCase() === 'svg')),
    );

  const walk = (node: Node, depth: number) => {
    const pad = '\t'.repeat(depth);
    if (node.nodeType === Node.TEXT_NODE) {
      const t = (node.textContent ?? '').trim();
      if (t) lines.push(pad + t.replace(/\s+/g, ' '));
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as Element;
    const tag = el.tagName.toLowerCase();
    if (VOID.has(tag)) {
      lines.push(`${pad}<${tag}${attrs(el)} />`);
      return;
    }
    if (tag === 'svg' || isInlineOnly(el)) {
      const text =
        tag === 'svg' ? `<svg${attrs(el)}>…</svg>` : inline(el).trim();
      lines.push(pad + text);
      return;
    }
    lines.push(`${pad}<${tag}${attrs(el)}>`);
    el.childNodes.forEach((c) => walk(c, depth + 1));
    lines.push(`${pad}</${tag}>`);
  };

  root.childNodes.forEach((c) => walk(c, 0));
  return lines.join('\n');
}
