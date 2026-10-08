import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function SkeletonPage() {
  return (
    <DocPage
      title='Skeleton'
      lead='Placeholders drawn like faint pencil marks — light graphite hatching with a slow sheen — so the page keeps its shape while data loads.'
      importLine="import { Skeleton, SkeletonText } from 'officehut/react';"
      cssFile='officehut/css/components/skeleton.css'
    >
      <Example title='Shapes' demo='skeleton/Basic' center>
        <p>
          <code>text</code> lines (default), <code>circle</code> for avatars and{' '}
          <code>rect</code> for images and charts. <code>SkeletonText</code>{' '}
          draws a paragraph whose last line stops short.
        </p>
      </Example>

      <Example title='On ruled paper' demo='skeleton/Ruled'>
        <p>
          <code>ruled</code> sits each pencil line on a blue exercise-book rule.{' '}
          <code>static</code> turns the sheen off.
        </p>
      </Example>

      <Example title='Loading a list' demo='skeleton/Invoices' scene center>
        <p>
          Mirror the real layout closely so nothing jumps when the data arrives.
        </p>
      </Example>
      <Note title='Accessibility'>
        Skeletons are <code>aria-hidden</code>. Put{' '}
        <code>aria-busy="true"</code> on the region that is loading and remove
        it when the content lands, so screen readers announce the real thing
        once.
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Skeleton props'
        rows={[
          {
            name: 'variant',
            type: "'text' | 'circle' | 'rect'",
            default: "'text'",
            description: 'Shape.',
          },
          {
            name: 'width / height',
            type: 'string | number',
            description: 'CSS length; numbers are px. Circles use width.',
          },
          { name: 'static', type: 'boolean', description: 'No sheen.' },
        ]}
      />
      <Ledger
        title='SkeletonText props'
        rows={[
          {
            name: 'lines',
            type: 'number',
            default: '3',
            description: 'Number of lines.',
          },
          {
            name: 'ruled',
            type: 'boolean',
            description: 'Draw exercise-book ruling behind.',
          },
          { name: 'static', type: 'boolean', description: 'No sheen.' },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.skeleton',
            description: 'Base placeholder. Size with --_w / --_h.',
          },
          { name: '.skeleton-text / -circle / -rect', description: 'Shapes.' },
          {
            name: '.skeleton-paragraph',
            description: 'Column of lines; the last is 62% wide.',
          },
          { name: '.skeleton-ruled', description: 'Lines sit on blue ruling.' },
          { name: '.skeleton-static', description: 'No animation.' },
        ]}
      />
    </DocPage>
  );
}
