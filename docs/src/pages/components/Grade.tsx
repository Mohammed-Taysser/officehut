import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function GradePage() {
  return (
    <DocPage
      title='Grade'
      lead='A teacher’s mark, circled in pen and tilted a little: A+, B, 9/10. For vendor ratings, QA scores, audit results and review summaries — anywhere a score deserves a verdict.'
      importLine="import { Grade } from 'officehut/react';"
      cssFile='officehut/css/components/grade.css'
    >
      <Example
        title='Letters, numbers, fractions'
        demo='school/grade/Values'
        center
      >
        <p>
          <code>value</code> takes anything short. A string shaped like{' '}
          <code>&quot;x/y&quot;</code> is drawn as a fraction, numerator over a
          pen stroke. The pen is red by default;{' '}
          <code>pen=&apos;green&apos;</code> reads as a pass and{' '}
          <code>pen=&apos;blue&apos;</code> as a neutral ballpoint.
        </p>
      </Example>
      <Note title='Accessibility'>
        A grade is a single <code>role=&quot;img&quot;</code> with an{' '}
        <code>aria-label</code>; the drawn characters are hidden. Without a{' '}
        <code>label</code> it reads the value (&ldquo;B&rdquo;) or &ldquo;9 out
        of 10&rdquo; for fractions. Screen readers say &ldquo;C-&rdquo; as
        &ldquo;C&rdquo; or &ldquo;C dash&rdquo;, so pass{' '}
        <code>label=&apos;C minus&apos;</code>, and in tables include what is
        graded: <code>label=&apos;Giza Catering rating: C&apos;</code>.
      </Note>

      <Example
        title='Sizes and remarks'
        demo='school/grade/Remarks'
        anatomy={[
          { selector: '.grade' },
          { selector: '.grade-fraction' },
          { selector: '.grade-remark' },
        ]}
      >
        <p>
          <code>size</code> is <code>sm</code>, <code>md</code> or{' '}
          <code>lg</code>. <code>remark</code> writes a short comment beside the
          mark in red pen — keep it to a few words. The remark is ordinary text,
          so it is read after the grade.
        </p>
      </Example>

      <Example title='Vendor review' demo='school/grade/Vendors' scene>
        <p>
          Procurement&apos;s yearly vendor ratings as a report card: small
          grades in a table column, green for the vendors that are being
          renewed.
        </p>
      </Example>

      <Example title='QA scores' demo='school/grade/QaScores'>
        <p>
          Call-centre quality checks scored out of 50. The fraction form makes
          the scale obvious, and the card says &ldquo;Pass&rdquo; or what
          happens next in words — the pen colour alone isn&apos;t enough.
        </p>
      </Example>

      <Example title='Plain HTML' demo='school/grade/Html' center>
        <p>
          In HTML, put <code>role=&quot;img&quot;</code> and the label on the{' '}
          <code>.grade</code> span and hide the visible mark with{' '}
          <code>aria-hidden</code>. A remark goes in a sibling{' '}
          <code>.grade-remark</code>.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Grade props'
        rows={[
          {
            name: 'value',
            type: 'ReactNode',
            description:
              '"A+", 87, "9/10"… An "x/y" string renders as a fraction.',
          },
          {
            name: 'pen',
            type: "'red' | 'green' | 'blue'",
            default: "'red'",
            description: 'Ink colour.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: '2.1rem, 3rem or 4.5rem across.',
          },
          {
            name: 'remark',
            type: 'ReactNode',
            description: 'Short handwritten comment beside the grade.',
          },
          {
            name: 'label',
            type: 'string',
            description:
              'Spoken label. Defaults to the value, or "x out of y".',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.grade', description: 'The circled mark.' },
          { name: '.grade-sm / .grade-lg', description: 'Sizes.' },
          {
            name: '.grade-pass / .grade-blue',
            description: 'Green or blue pen.',
          },
          {
            name: '.grade-fraction',
            description: 'Two children: numerator and denominator.',
          },
          {
            name: '.grade-remark',
            description: 'Handwritten comment in red pen.',
          },
        ]}
      />
      <Ledger
        kind='var'
        title='Custom properties'
        rows={[
          {
            name: '--_pen',
            description: 'Local: ink colour. Defaults to --oh-pen-red.',
          },
          {
            name: '--_size',
            description: 'Local: diameter of the circle. Font size follows it.',
          },
        ]}
      />
    </DocPage>
  );
}
