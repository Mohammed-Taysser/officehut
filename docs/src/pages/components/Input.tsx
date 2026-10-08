import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function InputPage() {
  return (
    <DocPage
      title='Input'
      lead='Text fields, selects and text areas are slots pressed into the page — a hairline box with a recessed top edge, where buttons have a raised bottom one. The line variant is a ruled line to write on, and it snaps to the exercise-book ruling.'
      importLine="import { Field, Input, Select, Textarea } from 'officehut/react';"
      cssFile='officehut/css/components/form.css'
    >
      <Example title='Expense claim' demo='forms/ExpenseClaim' scene>
        <p>
          A whole claim written on a <code>.notebook</code> page. Line inputs
          are exactly one ruled line tall, so their underline lands on the
          printed blue rule; labels and hints share the same rhythm. The
          approver's reminder is a <code>remark</code>, pencilled in by hand.
        </p>
      </Example>

      <Example
        title='Anatomy'
        demo='forms/FieldAnatomy'
        center
        anatomy={[
          { selector: '.label', label: '.label' },
          { selector: '.label-required' },
          { selector: '.input' },
          { selector: '.field-hint' },
          { selector: '.field-remark' },
          { selector: '.field-error' },
        ]}
      >
        <p>
          <code>Field</code> draws the label, hint, remark and error, and hands
          the control an id, <code>aria-describedby</code> (error first, then
          hint and remark), <code>aria-invalid</code>, <code>required</code> and{' '}
          <code>disabled</code> through context. Any officehut control inside
          picks them up — you never write an id by hand.
        </p>
      </Example>
      <Note title='Accessibility'>
        The red asterisk is hidden from screen readers; the control's own{' '}
        <code>required</code> is what gets announced. Put <code>id</code> on the{' '}
        <code>Field</code>, not the control, or the label will lose its target.
      </Note>

      <Example title='Controls' demo='forms/Controls'>
        <p>
          Thin wrappers over native elements: every prop, <code>ref</code>,{' '}
          <code>value</code> / <code>defaultValue</code> and event goes straight
          through, so they work controlled or uncontrolled. <code>Select</code>{' '}
          takes <code>options</code> and a <code>placeholder</code> shorthand;{' '}
          <code>readOnly</code> fields get a dashed, pre-printed look. Add{' '}
          <code>font-mono</code> for codes and account numbers.
        </p>
      </Example>

      <Example title='Validation' demo='forms/Validation'>
        <p>
          Pass <code>error</code> to the <code>Field</code> and the control
          turns red with <code>aria-invalid</code>; the message is written like
          a correction in the margin. <code>valid</code> gives a quiet green
          border once a value has been checked. In plain HTML, set{' '}
          <code>aria-invalid="true"</code> (or <code>.is-invalid</code>)
          yourself.
        </p>
      </Example>
      <Note title='When to show errors' tone='pink'>
        Validate on blur or submit, not on every keystroke — nobody wants a red
        line while they're still typing an invoice number. Keep the hint visible
        next to the error; it usually explains the fix.
      </Note>

      <Example title='Sizes' demo='forms/Sizes' center>
        <p>
          <code>size</code> follows the control-height tokens, so compact
          density shrinks every field at once.
        </p>
      </Example>

      <Example title='Lines & signature' demo='forms/Lines'>
        <p>
          <code>variant='line'</code> drops the box and keeps only the rule, in
          the exercise book's blue; focus inks it in.{' '}
          <code>variant='signature'</code> adds a red "×" and writes the name in
          handwriting — for acknowledgements, delivery notes and timesheet
          sign-off.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Field props'
        rows={[
          {
            name: 'label',
            type: 'ReactNode',
            description: 'Linked to the control with for/id.',
          },
          {
            name: 'hint',
            type: 'ReactNode',
            description: 'Help text under the control (aria-describedby).',
          },
          {
            name: 'remark',
            type: 'ReactNode',
            description: 'Handwritten note in blue ink (aria-describedby).',
          },
          {
            name: 'error',
            type: 'ReactNode',
            description: 'Marks the control invalid; read out first.',
          },
          {
            name: 'required',
            type: 'boolean',
            description: 'Asterisk on the label + required on the control.',
          },
          {
            name: 'optional',
            type: 'boolean | string',
            description: "Quiet 'optional' after the label.",
          },
          {
            name: 'invalid / disabled',
            type: 'boolean',
            description: 'Passed down to the control.',
          },
          {
            name: 'id',
            type: 'string',
            default: 'useId()',
            description: "The control's id.",
          },
          {
            name: 'horizontal',
            type: 'boolean',
            description: 'Label beside the control from md up.',
          },
        ]}
      />
      <Ledger
        title='Input, Textarea & Select props'
        rows={[
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Height follows the density tokens.',
          },
          {
            name: 'variant',
            type: "'box' | 'line' | 'signature'",
            default: "'box'",
            description: 'Signature is Input only.',
          },
          {
            name: 'invalid / valid',
            type: 'boolean',
            description: 'Red or green state. invalid defaults to the Field.',
          },
          {
            name: 'icon / iconEnd',
            type: 'ReactNode',
            description: 'Input only: icon inside the field (see Input group).',
          },
          {
            name: 'options',
            type: 'SelectOption[]',
            description: 'Select only: strings or { value, label, disabled }.',
          },
          {
            name: 'placeholder',
            type: 'string',
            description: 'Select: an empty first option shown in grey.',
          },
          {
            name: 'rows',
            type: 'number',
            description: 'Select: native size attribute (visible rows).',
          },
          {
            name: '…rest',
            type: 'native props',
            description:
              'value, defaultValue, onChange, ref and the rest go to the element.',
          },
        ]}
      />
      <Ledger
        title='Fieldset props'
        rows={[
          {
            name: 'legend',
            type: 'ReactNode',
            description: 'Section name on the top rule.',
          },
          {
            name: 'plain',
            type: 'boolean',
            description: 'No box — just groups and names the controls.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.field / .field-horizontal',
            description: 'Wrapper: stacked, or label beside the control.',
          },
          {
            name: '.label (.label-required, .label-optional)',
            description: 'Label and its markers.',
          },
          {
            name: '.field-hint / .field-error / .field-remark',
            description: 'Help text, error, handwritten remark.',
          },
          { name: '.input', description: 'Input, textarea or select.' },
          { name: '.input-sm / .input-lg', description: 'Sizes.' },
          {
            name: '.input-line / .input-signature',
            description: 'Ruled line; signature line with a × mark.',
          },
          {
            name: '.is-invalid / [aria-invalid=true] / .is-valid',
            description: 'Validation states.',
          },
          {
            name: '.fieldset (.fieldset-plain)',
            description: 'Boxed form section with a legend.',
          },
          {
            name: '.notebook .input-line',
            description: 'Snaps to the exercise-book ruling.',
          },
        ]}
      />
      <Ledger
        kind='var'
        title='Local custom properties'
        rows={[
          { name: '--_h / --_px', description: 'Height and inline padding.' },
          {
            name: '--_bg / --_bd / --_bd-hover',
            description: 'Background and border colours.',
          },
          {
            name: '--_ring',
            description: 'Focus ring (and focus underline for line inputs).',
          },
          {
            name: '--_label-w',
            description: 'Label column width in .field-horizontal (11rem).',
          },
        ]}
      />
    </DocPage>
  );
}
