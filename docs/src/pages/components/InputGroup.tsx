import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function InputGroupPage() {
  return (
    <DocPage
      title='Input group'
      lead='Inputs joined to printed cells and buttons, like the "EGP ______" boxes on a claim form. Or an icon tucked inside the field itself.'
      importLine="import { Input, InputGroup } from 'officehut/react';"
      cssFile='officehut/css/components/input-group.css'
    >
      <Example
        title='Addons'
        demo='forms/Addons'
        anatomy={[
          { selector: '.input-group', label: '.input-group' },
          { selector: '.input-group-text' },
          { selector: '.input' },
        ]}
      >
        <p>
          <code>InputGroup.Text</code> is a tinted cell for currencies, units
          and domains. Corners are only rounded at the two ends, and the focused
          piece rises so its ring is never cut off.
        </p>
      </Example>
      <Note title='Accessibility'>
        The addon text is not part of the input's name. If the unit matters
        ("hours", "EGP"), say it in the label too, or link the addon with{' '}
        <code>aria-describedby</code>. Wrap the group in a <code>Field</code>;
        don't put the Field inside the group.
      </Note>

      <Example title='With buttons' demo='forms/WithButtons'>
        <p>
          Any <code>Button</code> joins the strip. Buttons drop their raised
          edge inside a group so the row reads as one piece.
        </p>
      </Example>

      <Example title='Icons inside the field' demo='forms/Icons'>
        <p>
          <code>icon</code> and <code>iconEnd</code> wrap the input in{' '}
          <code>.input-icon</code> and pad the text clear of them. Start icons
          are decorative (<code>aria-hidden</code>); an end slot can hold a real
          button, such as show / hide password.
        </p>
      </Example>

      <Example title='Sizes' demo='forms/GroupSizes' center>
        <p>
          <code>size</code> on the group sizes every input, addon and button
          inside.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='InputGroup props'
        rows={[
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Applied to every piece.',
          },
          {
            name: '…rest',
            type: 'div props',
            description: 'Rendered on the wrapper.',
          },
        ]}
      />
      <Ledger
        title='Input icon props'
        rows={[
          {
            name: 'icon',
            type: 'ReactNode',
            description: 'Decorative icon at the start.',
          },
          {
            name: 'iconEnd',
            type: 'ReactNode',
            description: 'Icon or button at the end.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.input-group', description: 'The strip.' },
          { name: '.input-group-text', description: 'Printed addon cell.' },
          {
            name: '.input-group-sm / -lg',
            description: 'Sizes for every piece.',
          },
          {
            name: '.input-icon',
            description: 'Wrapper for an input with icons inside.',
          },
          {
            name: '.input-icon-addon',
            description:
              'The icon slot; first child = start, last child = end.',
          },
        ]}
      />
    </DocPage>
  );
}
