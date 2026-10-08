import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function PencilLoaderPage() {
  return (
    <DocPage
      title='Pencil loader'
      lead='A pencil writing a line of joined-up handwriting across a ruled strip, lifting, and starting again. For waits long enough to notice: a report opening, a table filling, payslips being prepared.'
      importLine="import { PencilLoader } from 'officehut/react';"
      cssFile='officehut/css/components/loader.css'
    >
      <p>
        For a button or a short wait inside a small space, use a{' '}
        <a href='/docs/components/spinner'>Spinner</a>. For content whose shape
        you already know, a <a href='/docs/components/skeleton'>Skeleton</a> is
        calmer. The pencil is for the bigger waits.
      </p>

      <Example
        title='Sizes and labels'
        demo='school/pencil-loader/Sizes'
        center
        anatomy={[
          { selector: '.loader-pencil-art' },
          { selector: '.loader-pencil-label' },
        ]}
      >
        <p>
          <code>size</code> is <code>sm</code> (7rem), <code>md</code> (12rem)
          or <code>lg</code> (18rem). <code>label</code> is written underneath
          in the hand font, with three dots that come and go. Say what is
          loading — &ldquo;Loading timesheets&rdquo;, not just
          &ldquo;Loading&rdquo;.
        </p>
      </Example>
      <Note title='Accessibility'>
        The loader is <code>role=&quot;status&quot;</code> with{' '}
        <code>aria-live=&quot;polite&quot;</code>, so the label is announced
        once when it appears; the drawing is hidden. Under{' '}
        <code>prefers-reduced-motion: reduce</code> the pencil stops and the
        finished line is shown instead. Put <code>aria-busy</code> on the region
        that is loading.
      </Note>

      <Example title='Loading a table' demo='school/pencil-loader/TableLoading'>
        <p>
          Keep the header row and put a small loader in a single cell that spans
          the table, so the columns don&apos;t jump when the rows arrive. Press{' '}
          <em>Refresh</em> to see it again.
        </p>
      </Example>

      <Example title='Page loader' demo='school/pencil-loader/PageLoader' scene>
        <p>
          As the <code>&lt;Suspense&gt;</code> fallback for a whole page or
          route, centred in the content area. These docs use a small one while
          each example loads.
        </p>
      </Example>

      <Example title='Hidden label' demo='school/pencil-loader/Html' center>
        <p>
          <code>hideLabel</code> keeps the label for screen readers only, when
          the text beside the loader already says what is happening. Without
          React, copy the markup from the HTML tab: a{' '}
          <code>.loader-pencil</code> with <code>role=&quot;status&quot;</code>,
          the SVG, and a <code>.loader-pencil-label</code> (add{' '}
          <code>.visually-hidden</code> to hide it).
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='PencilLoader props'
        rows={[
          {
            name: 'label',
            type: 'string',
            default: "'Loading'",
            description: 'Visible label; always announced.',
          },
          {
            name: 'hideLabel',
            type: 'boolean',
            description: 'Hide the label visually.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Width of the drawing.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.loader-pencil',
            description: 'Wrapper (role="status"). Ink colour is --oh-pen.',
          },
          { name: '.loader-pencil-sm / -lg', description: 'Sizes.' },
          { name: '.loader-pencil-art', description: 'The SVG.' },
          {
            name: '.loader-pencil-rule / -margin / -ink / -tool',
            description: 'Parts of the SVG.',
          },
          {
            name: '.loader-pencil-label',
            description: 'Handwritten label with animated dots.',
          },
        ]}
      />
      <Ledger
        kind='var'
        title='Custom properties'
        rows={[
          {
            name: '--_w',
            default: '12rem',
            description: 'Local: width of the drawing.',
          },
          {
            name: '--_dur',
            default: '2.4s',
            description: 'Local: one stroke, lift and return.',
          },
        ]}
      />
    </DocPage>
  );
}
