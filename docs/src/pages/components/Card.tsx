import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function CardPage() {
  return (
    <DocPage
      title='Card'
      lead='A card is a sheet of paper: hairline border, a darker bottom edge, no blur. It can carry a coloured status edge, sit on a stack of other sheets, or wear a folder tab.'
      importLine="import { Card } from 'officehut/react';"
      cssFile='officehut/css/components/card.css'
    >
      <Example
        title='Anatomy'
        demo='card/Basic'
        center
        anatomy={[
          { selector: '.card-header', label: '.card-header' },
          { selector: '.card-title' },
          { selector: '.card-actions' },
          { selector: '.card-body' },
          { selector: '.card-footer' },
        ]}
      >
        <p>
          Compose cards from parts: <code>Card.Header</code>,{' '}
          <code>Card.Title</code>, <code>Card.Actions</code>,{' '}
          <code>Card.Body</code>, <code>Card.Footer</code>. Press the target
          button above the preview to label each part.
        </p>
      </Example>

      <Example title='Shorthand props' demo='card/Shorthand' center>
        <p>
          For simple cards, pass <code>title</code>, <code>subtitle</code>,{' '}
          <code>header</code>, <code>footer</code> or <code>image</code>;
          children go into the body.
        </p>
      </Example>

      <Example title='Status edge' demo='card/Status'>
        <p>
          A 3px strip on any side. In HTML it's an empty{' '}
          <code>&lt;div class="card-status-top bg-danger"&gt;</code> as the
          first child — any <code>bg-*</code> utility works.
        </p>
      </Example>

      <Example title='Stacked & folder tab' demo='card/Paper' scene>
        <p>
          <code>stacked</code> adds two sheets underneath (pure box-shadow,
          nothing to clip). <code>tab</code> adds a manila folder tab above the
          card.
        </p>
      </Example>
      <Note title='Status vs. tab'>
        Use the status edge for <em>state</em> (overdue, healthy) and the tab
        for <em>category</em> (Contracts, Q3). Both on one card is usually too
        much.
      </Note>

      <Example title='Clickable cards' demo='card/Interactive'>
        <p>
          <code>interactive</code> lifts the card on hover. Put a{' '}
          <code>.stretched-link</code> inside so the whole card is one link —
          and screen readers still hear just the name.
        </p>
      </Example>

      <Example title='Horizontal' demo='card/Horizontal' center>
        <p>Image beside the content; it stacks on phones.</p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Card props'
        rows={[
          { name: 'status', type: 'Color', description: 'Coloured edge.' },
          {
            name: 'statusPosition',
            type: "'top' | 'bottom' | 'start' | 'end'",
            default: "'top'",
            description: 'Which edge.',
          },
          {
            name: 'stacked',
            type: 'boolean',
            description: 'Sheets underneath.',
          },
          {
            name: 'tab / tabColor',
            type: 'ReactNode / Color',
            description: 'Folder tab above the card.',
          },
          {
            name: 'interactive',
            type: 'boolean',
            description: 'Hover lift for clickable cards.',
          },
          {
            name: 'horizontal / reversed',
            type: 'boolean',
            description: 'Image beside the content.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Inner padding.',
          },
          {
            name: 'borderless',
            type: 'boolean',
            description: 'No border or edge.',
          },
          {
            name: 'title, subtitle, header, footer, image',
            type: 'ReactNode / string',
            description: 'Shorthands.',
          },
          {
            name: 'as',
            type: 'ElementType',
            default: "'div'",
            description: 'e.g. article, section, li.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.card', description: 'The sheet.' },
          { name: '.card-header / -body / -footer', description: 'Sections.' },
          {
            name: '.card-title / -subtitle / -text / -actions',
            description: 'Content parts.',
          },
          {
            name: '.card-img-top / -bottom / .card-img',
            description: 'Images.',
          },
          {
            name: '.card-status-{top|bottom|start|end}',
            description: 'Status edge; colour with bg-*.',
          },
          {
            name: '.card-stacked / .card-tab / .card-link',
            description: 'Paper effects.',
          },
          {
            name: '.card-horizontal(.is-reversed)',
            description: 'Image beside content.',
          },
          {
            name: '.card-sm / .card-lg / .card-borderless',
            description: 'Modifiers.',
          },
        ]}
      />
    </DocPage>
  );
}
