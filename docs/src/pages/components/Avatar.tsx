import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function AvatarPage() {
  return (
    <DocPage
      title='Avatar'
      lead='A small square for a person or an organisation: a photo, their initials, or an icon. Squares are the default because they line up with the rest of the paper; add circle when you want the classic look.'
      importLine="import { Avatar, AvatarList } from 'officehut/react';"
      cssFile='officehut/css/components/avatar.css'
    >
      <Example title='Photos, initials and icons' demo='avatar/Basic' center>
        <p>
          Give it a <code>name</code> and you get initials in a colour picked
          from the name, so Mona keeps the same colour on every screen. A{' '}
          <code>src</code> shows a photo; if it fails to load, the initials come
          back. Use <code>icon</code> for vendors, rooms or unassigned slots.
        </p>
      </Example>

      <Example title='Sizes' demo='avatar/Sizes' center>
        <p>
          <code>xs</code> (24px) for table cells, <code>sm</code> for lists,{' '}
          <code>md</code> default, <code>lg</code> and <code>xl</code> for
          profile headers. Initials scale with the box.
        </p>
      </Example>

      <Example
        title='Presence'
        demo='avatar/Presence'
        anatomy={[
          { selector: 'li:first-child .avatar', label: '.avatar' },
          {
            selector: 'li:first-child .avatar-presence',
            label: '.avatar-presence',
          },
        ]}
      >
        <p>
          A dot in the bottom corner: <code>online</code>, <code>busy</code>,{' '}
          <code>away</code> or <code>offline</code>. Pair it with words; the dot
          alone is easy to miss.
        </p>
      </Example>
      <Note title='Accessibility'>
        An initials avatar is announced as the person&apos;s name. When the name
        is already written next to it, as above, add <code>aria-hidden</code> so
        it isn&apos;t read twice.
      </Note>

      <Example title='Groups' demo='avatar/List'>
        <p>
          <code>AvatarList</code> lays avatars in a row; <code>stacked</code>{' '}
          overlaps them like cards in a hand. <code>max</code> cuts the list and
          adds a &ldquo;+N&rdquo; chip; pass the same <code>size</code> as your
          avatars so the chip matches.
        </p>
      </Example>

      <Example title='Meeting invite' demo='avatar/Meeting' scene />

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Avatar props'
        rows={[
          {
            name: 'name',
            type: 'string',
            description:
              'Used for initials, the accessible label, the title tooltip and the default colour.',
          },
          {
            name: 'src',
            type: 'string',
            description: 'Photo. Falls back to initials on error.',
          },
          {
            name: 'icon',
            type: 'ReactNode',
            description: 'Shown instead of initials.',
          },
          {
            name: 'size',
            type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
            default: "'md'",
            description: '24, 32, 40, 56 and 80px.',
          },
          {
            name: 'color',
            type: 'Color',
            description: 'Defaults to a stable colour derived from name.',
          },
          {
            name: 'circle',
            type: 'boolean',
            description: 'Round instead of square.',
          },
          {
            name: 'presence',
            type: "'online' | 'busy' | 'away' | 'offline'",
            description: 'Status dot.',
          },
        ]}
      />
      <Ledger
        title='AvatarList props'
        rows={[
          {
            name: 'stacked',
            type: 'boolean',
            description: 'Overlap the avatars.',
          },
          {
            name: 'max',
            type: 'number',
            description: 'Show this many, then a +N chip.',
          },
          {
            name: 'size',
            type: 'AvatarSize',
            default: "'md'",
            description: 'Size of the +N chip.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.avatar',
            description: 'The box. Put an <img>, initials or an <svg> inside.',
          },
          { name: '.avatar-{xs|sm|lg|xl}', description: 'Sizes.' },
          {
            name: '.avatar-{color}',
            description: 'Tone for the background and initials.',
          },
          { name: '.avatar-circle', description: 'Round.' },
          {
            name: '.avatar-presence.is-{online|busy|away}',
            description: 'Status dot; grey without a modifier.',
          },
          {
            name: '.avatar-list / .avatar-list-stacked',
            description: 'Groups.',
          },
          { name: '.avatar-more', description: 'The dashed +N chip.' },
        ]}
      />
      <p>
        <code>initials()</code> and <code>colorFor()</code> are exported from
        both <code>officehut</code> and <code>officehut/react</code> if you
        build avatars yourself.
      </p>
    </DocPage>
  );
}
