import { Link } from 'react-router';
import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function TypographyPage() {
  return (
    <DocPage
      title='Typography'
      lead='Body text is 14px Ubuntu at a 1.5 line height, because dashboards hold a lot of words. Headings are short and firm; the smallest heading reads like a label on a filing drawer.'
      cssFile='officehut/css/core.css'
    >
      <Example title='Headings' demo='typography/Headings'>
        <p>
          Plain <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code> are styled,
          and the <code>.h1</code>…<code>.h6</code> classes give any element the
          same look without changing the document outline. The reset removes
          their margins; space them with <code>.stack</code> or margin
          utilities.
        </p>
      </Example>
      <Note title='Pick the level by structure'>
        Choose <code>h2</code> or <code>h3</code> for where the heading sits in
        the page, then use a class if it should look bigger or smaller. Screen
        reader users jump between headings by level.
      </Note>

      <Example title='Body text' demo='typography/Text'>
        <p>
          <code>.eyebrow</code> sits above a title (a date, a category).{' '}
          <code>.lead</code> is the opening sentence of a page. Inline{' '}
          <code>code</code>, <code>kbd</code>, <code>mark</code> and{' '}
          <code>abbr</code> are styled; consecutive paragraphs get a small gap.
        </p>
      </Example>

      <Example title='Lists' demo='typography/Lists'>
        <p>
          Lists keep their markers and a small indent.{' '}
          <code>.list-unstyled</code> drops them; <code>.list-inline</code> lays
          items out in a wrapping row.
        </p>
      </Example>

      <Example title='On lined paper' demo='typography/Memo' scene>
        <p>
          Inside a <Link to='/docs/components/notebook'>.notebook</Link> page,
          text snaps to the blue ruling and headings take two lines. A date in
          the margin, a teacher&apos;s tick and a handwritten aside are all
          classes.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        kind='class'
        title='Headings'
        rows={[
          {
            name: 'h1, .h1',
            type: '2rem / 1.2',
            description:
              'Bold. Page titles in marketing-ish pages; use .page-title in the app shell.',
          },
          { name: 'h2, .h2', type: '1.5rem / 1.25', description: 'Bold.' },
          { name: 'h3, .h3', type: '1.25rem / 1.3', description: 'Semibold.' },
          { name: 'h4, .h4', type: '1rem / 1.4', description: 'Semibold.' },
          {
            name: 'h5, .h5',
            type: '0.875rem / 1.4',
            description: 'Semibold, body size.',
          },
          {
            name: 'h6, .h6',
            type: '0.75rem / 1.4',
            description: 'Uppercase, spaced, muted. A section label.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Text'
        rows={[
          { name: '.lead', description: '1rem, muted, 1.6 line height.' },
          {
            name: '.eyebrow',
            description: 'Small uppercase label above a title.',
          },
          { name: 'small, .small', description: '--oh-text-sm.' },
          {
            name: '.handwriting',
            description:
              'The hand font (--oh-font-hand) at 1.15em, for notes and asides.',
          },
          {
            name: 'code, kbd, samp, pre',
            description:
              'Monospace at 0.9em; code and pre sit on the sunken surface.',
          },
          { name: 'blockquote', description: 'Start-side rule, muted text.' },
          {
            name: 'mark',
            description: 'Highlighter yellow, from --oh-warning.',
          },
          {
            name: '.list-unstyled / .list-inline',
            description: 'Lists without markers; inline wraps with a gap.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Text utilities'
        rows={[
          {
            name: '.fs-{xs|sm|base|md|lg|xl|2xl}',
            description: 'Font size from the type scale.',
          },
          {
            name: '.fw-{light|normal|medium|semibold|bold}',
            description: '300 to 700.',
          },
          {
            name: '.text-muted / .text-subtle / .text-ink',
            description: 'Ink levels 2, 3 and 1.',
          },
          {
            name: '.text-{color}',
            description: 'Palette ink, readable on the page.',
          },
          {
            name: '.text-start / -center / -end',
            description: 'Alignment; responsive variants like .text-md-end.',
          },
          {
            name: '.text-truncate / .text-nowrap / .text-wrap-balance',
            description: 'Overflow and wrapping.',
          },
          {
            name: '.font-mono / .tabular-nums',
            description: 'For IDs and for columns of numbers.',
          },
          { name: '.lh-1 / .lh-sm', description: 'Tighter line heights.' },
        ]}
      />
      <Ledger
        kind='var'
        title='Tokens'
        rows={[
          {
            name: '--oh-font-sans / --oh-font-mono / --oh-font-hand',
            description: 'Font stacks.',
          },
          {
            name: '--oh-font-size',
            default: '0.875rem',
            description: 'Body size; smaller in compact density.',
          },
          {
            name: '--oh-line-height',
            default: '1.5',
            description: 'Body line height.',
          },
          {
            name: '--oh-text-{xs…2xl}',
            description: '0.75, 0.8125, 0.875, 1, 1.25, 1.5, 2rem.',
          },
        ]}
      />
    </DocPage>
  );
}
