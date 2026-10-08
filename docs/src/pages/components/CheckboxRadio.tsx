import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function CheckboxRadioPage() {
  return (
    <DocPage
      title='Checkbox & radio'
      lead='Boxes printed on a form. Checking one draws a pen tick, left to right, a little larger than the box; a radio fills its bubble like an answer sheet. Both are the native inputs underneath.'
      importLine="import { Checkbox, Radio, RadioGroup } from 'officehut/react';"
      cssFile='officehut/css/components/check.css'
    >
      <Example
        title='Checkboxes'
        demo='forms/Checkboxes'
        anatomy={[
          { selector: '.check', label: '.check' },
          { selector: '.check-input' },
          { selector: '.check-label' },
          { selector: '.check-hint' },
        ]}
      >
        <p>
          Children are the label. <code>hint</code> adds a quieter line
          underneath, linked with <code>aria-describedby</code> rather than read
          as part of the name. <code>className</code> goes on the wrapper;{' '}
          <code>ref</code> and every input prop go to the{' '}
          <code>&lt;input&gt;</code>.
        </p>
      </Example>

      <Example title='Select all' demo='forms/SelectAll'>
        <p>
          <code>indeterminate</code> draws a dash. It's a DOM property with no
          HTML attribute, so the component sets it after each render; keep it in
          state, because a click clears it.
        </p>
      </Example>

      <Example title='Radio group' demo='forms/Radios'>
        <p>
          <code>RadioGroup</code> is a{' '}
          <code>&lt;fieldset role="radiogroup"&gt;</code> whose legend names the
          group. Radios inside share a <code>name</code>, so arrow keys, Tab and
          form submission are the browser's own — there is no roving-focus
          script. Use <code>value</code> / <code>onChange</code> or{' '}
          <code>defaultValue</code>; add <code>inline</code> for a row.
        </p>
      </Example>
      <Note title='Accessibility'>
        Give a group of checkboxes a <code>Fieldset</code> with a legend too, so
        "Before you submit" is announced when focus enters. For a single
        checkbox inside a <code>Field</code>, the field's error and hint are
        linked automatically.
      </Note>

      <Example title='Option cards' demo='forms/OptionCards'>
        <p>
          <code>card</code> turns an option into a sheet you can click anywhere
          on — the label is stretched over it, so the hint is still a
          description, not part of the name. <code>aside</code> puts a detail
          (seats, price) on the far side.
        </p>
      </Example>

      <Example title='On a notebook page' demo='forms/Checklist' scene>
        <p>
          Inside <code>.notebook</code> each option takes exactly one ruled line
          and the box rests on it. Pair with <code>.handwriting</code> for a
          note to yourself.
        </p>
      </Example>

      <Example title='Ink, sizes & states' demo='forms/CheckStates'>
        <p>
          <code>color</code> changes the ink; <code>size</code> scales the box
          with the text. <code>invalid</code> outlines the box in red; disabled
          options fade their label too.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Checkbox & Radio props'
        rows={[
          { name: 'children', type: 'ReactNode', description: 'The label.' },
          {
            name: 'hint',
            type: 'ReactNode',
            description: 'Line under the label (aria-describedby).',
          },
          {
            name: 'indeterminate',
            type: 'boolean',
            description: 'Checkbox only: dash instead of tick.',
          },
          {
            name: 'value',
            type: 'string',
            description: 'Radio: matched against the group value.',
          },
          {
            name: 'color',
            type: 'Color',
            default: "'primary'",
            description: 'Ink colour.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Box and text size.',
          },
          {
            name: 'card / aside',
            type: 'boolean / ReactNode',
            description: 'Selectable card, with a detail on the far side.',
          },
          {
            name: 'invalid',
            type: 'boolean',
            description: 'Red box; Checkbox also takes it from a Field.',
          },
          {
            name: 'className / inputClassName',
            type: 'string',
            description: 'Wrapper / input classes.',
          },
        ]}
      />
      <Ledger
        title='RadioGroup props'
        rows={[
          { name: 'label', type: 'ReactNode', description: 'The legend.' },
          {
            name: 'value / defaultValue',
            type: 'string',
            description: 'Controlled / uncontrolled choice.',
          },
          {
            name: 'onChange',
            type: '(value, event) => void',
            description: 'Called with the chosen value.',
          },
          {
            name: 'name',
            type: 'string',
            default: 'useId()',
            description: 'Shared radio name.',
          },
          {
            name: 'hint / error',
            type: 'ReactNode',
            description: 'Linked to the group; error sets aria-invalid.',
          },
          {
            name: 'required',
            type: 'boolean',
            description: 'Asterisk + required on every radio.',
          },
          { name: 'inline', type: 'boolean', description: 'Options in a row.' },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.check',
            description: 'Wrapper: input · label · hint grid.',
          },
          {
            name: '.check-input',
            description: 'The box or bubble (checkbox or radio).',
          },
          {
            name: '.check-label / .check-hint',
            description: 'Label and description.',
          },
          { name: '.check-{color}', description: 'Ink colour.' },
          { name: '.check-sm / .check-lg', description: 'Sizes.' },
          {
            name: '.check-card (.check-card-aside)',
            description: 'Selectable card option.',
          },
          {
            name: '.check-group (.check-group-inline)',
            description: 'Fieldset of options, stacked or in a row.',
          },
        ]}
      />
    </DocPage>
  );
}
