import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function SwitchPage() {
  return (
    <DocPage
      title='Switch'
      lead='A slide switch like the one on the back of a desk lamp: a recessed track and a paper key with a bottom edge. For settings that take effect the moment you flip them.'
      importLine="import { Switch } from 'officehut/react';"
      cssFile='officehut/css/components/switch.css'
    >
      <Example
        title='Basic'
        demo='forms/SwitchBasic'
        anatomy={[
          { selector: '.switch', label: '.switch' },
          { selector: '.switch-input' },
          { selector: '.switch-label' },
          { selector: '.switch-hint' },
        ]}
      >
        <p>
          A native <code>&lt;input type="checkbox" role="switch"&gt;</code>:
          Space toggles it, forms submit it, screen readers announce "on" or
          "off". Controlled or uncontrolled like any checkbox.
        </p>
      </Example>
      <Note title='Accessibility'>
        Name the setting, not the state — "Out of office", not "On". Don't use a
        switch for something that only applies after pressing Save; that's a
        checkbox.
      </Note>

      <Example title='Settings list' demo='forms/SettingsList'>
        <p>
          <code>reverse</code> puts the label first and the switch at the far
          edge, so a column of settings lines up.
        </p>
      </Example>

      <Example title='Marks, sizes & colours' demo='forms/SwitchMarks'>
        <p>
          <code>io</code> prints the I / O marks found on office equipment.{' '}
          <code>size</code> and <code>color</code> work as on every other
          control.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Switch props'
        rows={[
          { name: 'children', type: 'ReactNode', description: 'The label.' },
          {
            name: 'hint',
            type: 'ReactNode',
            description: 'Line under the label (aria-describedby).',
          },
          {
            name: 'color',
            type: 'Color',
            default: "'primary'",
            description: 'Track colour when on.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Track size.',
          },
          {
            name: 'reverse',
            type: 'boolean',
            description: 'Label first, switch at the far edge.',
          },
          {
            name: 'io',
            type: 'boolean',
            description: 'Print I / O marks on the track.',
          },
          {
            name: 'invalid',
            type: 'boolean',
            description: 'Red border; also taken from a Field.',
          },
          {
            name: 'className / inputClassName',
            type: 'string',
            description: 'Wrapper / input classes.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.switch',
            description: 'Wrapper: input · label · hint grid.',
          },
          {
            name: '.switch-input',
            description: 'The track; ::before is the key.',
          },
          {
            name: '.switch-label / .switch-hint',
            description: 'Label and description.',
          },
          { name: '.switch-{color}', description: 'Track colour.' },
          { name: '.switch-sm / .switch-lg', description: 'Sizes.' },
          { name: '.switch-reverse', description: 'Label first.' },
          { name: '.switch-io', description: 'I / O marks.' },
        ]}
      />
      <Ledger
        kind='var'
        title='Local custom properties'
        rows={[
          { name: '--_w / --_h', description: 'Track width and height.' },
          {
            name: '--_c',
            description: 'Track colour when on (set by .switch-{color}).',
          },
        ]}
      />
    </DocPage>
  );
}
