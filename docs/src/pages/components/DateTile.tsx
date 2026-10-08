import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function DateTilePage() {
  return (
    <DocPage
      title='Date tile'
      lead='One page torn off a desk calendar: the month on a coloured band, the day big underneath, the weekday in pen. For event lists, deadlines and anything with a date people plan around.'
      importLine="import { DateTile } from 'officehut/react';"
      cssFile='officehut/css/components/date-tile.css'
    >
      <Example
        title='Sizes and bands'
        demo='school/date-tile/Basic'
        anatomy={[
          { selector: '.date-tile-month' },
          { selector: '.date-tile-day' },
          { selector: '.date-tile-weekday' },
        ]}
      >
        <p>
          <code>date</code> takes a <code>Date</code>, a timestamp or a date
          string. <code>size</code> is <code>sm</code> (no weekday),{' '}
          <code>md</code> or <code>lg</code>, and <code>band</code> is{' '}
          <code>red</code>, <code>blue</code>, <code>green</code> or{' '}
          <code>dark</code>.
        </p>
      </Example>
      <Note title='Time zones'>
        A bare <code>&apos;2026-10-14&apos;</code> is treated as a calendar day
        in the viewer&apos;s time zone (plain JavaScript would read it as
        midnight UTC — 13 October west of Greenwich). Full timestamps and{' '}
        <code>Date</code> objects are shown in local time, and the{' '}
        <code>datetime</code> attribute always matches the day on the tile.
      </Note>

      <Example title='Coming up' demo='school/date-tile/Events' scene>
        <p>
          Small tiles down the side of an events list on the intranet home page.
          The band colour groups events loosely (dark for deadlines); the badge
          says who they are for.
        </p>
      </Example>
      <Note title='Accessibility' tone='blue'>
        The tile is a <code>&lt;time&gt;</code> with a machine-readable{' '}
        <code>dateTime</code> and a full <code>aria-label</code> such as
        &ldquo;Wednesday 14 October 2026&rdquo;. The three short pieces inside
        are hidden, so a screen reader hears one date, not &ldquo;Oct 14
        Wed&rdquo;.
      </Note>

      <Example title='Languages' demo='school/date-tile/Locales'>
        <p>
          Month and weekday names come from <code>Intl.DateTimeFormat</code>.
          Pass <code>locale</code> (a BCP 47 tag) or leave it out to use the
          browser&apos;s language. Arabic gets Arabic digits.
        </p>
      </Example>

      <Example title='Plain HTML' demo='school/date-tile/Html' center>
        <p>
          Without React, write the three spans yourself and put the full date in{' '}
          <code>aria-label</code> on the{' '}
          <code>&lt;time class=&quot;date-tile&quot;&gt;</code>.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='DateTile props'
        rows={[
          {
            name: 'date',
            type: 'Date | string | number',
            description: 'The date to show.',
          },
          {
            name: 'locale',
            type: 'string',
            description: 'BCP 47 locale for names. Defaults to the browser’s.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'sm hides the weekday.',
          },
          {
            name: 'band',
            type: "'red' | 'blue' | 'green' | 'dark'",
            default: "'red'",
            description: 'Colour of the month band.',
          },
          {
            name: 'aria-label',
            type: 'string',
            description: 'Overrides the generated full date.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.date-tile',
            description: 'The calendar page, with two binding rings.',
          },
          {
            name: '.date-tile-month / -day / -weekday',
            description: 'The three lines.',
          },
          { name: '.date-tile-sm / .date-tile-lg', description: 'Sizes.' },
          { name: '.date-tile-{blue|green|dark}', description: 'Band colour.' },
        ]}
      />
      <Ledger
        kind='var'
        title='Custom properties'
        rows={[
          {
            name: '--_band',
            description: 'Local: band colour, any CSS colour.',
          },
          {
            name: '--_w',
            description: 'Local: tile width; the day number scales with it.',
          },
        ]}
      />
    </DocPage>
  );
}
