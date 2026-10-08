import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function AccordionPage() {
  return (
    <DocPage
      title='Accordion'
      lead='A stack of questions or steps that open in place. It is built on <details> and <summary>, so it works without JavaScript and the browser handles the keyboard.'
      importLine="import { Accordion } from 'officehut/react';"
      cssFile='officehut/css/components/collapse.css'
    >
      <Example
        title='Basic'
        demo='accordion/Basic'
        anatomy={[
          { selector: '.accordion', label: '.accordion' },
          { selector: '.accordion-item[open] > summary', label: 'summary' },
          { selector: '.accordion-body' },
        ]}
      >
        <p>
          Each <code>Accordion.Item</code> takes a <code>title</code> and its
          content. Items open independently. <code>defaultOpen</code> opens one
          on first render.
        </p>
      </Example>

      <Example title='One at a time' demo='accordion/Exclusive'>
        <p>
          <code>exclusive</code> gives every item the same <code>name</code>,
          and the browser closes the open item when you open another. Good for
          steps of a form; less good for FAQs, where people like to compare
          answers.
        </p>
      </Example>
      <Note title='Older browsers' tone='blue'>
        Browsers without support for <code>&lt;details name&gt;</code> let
        several items open at once. Nothing breaks. The same goes for the height
        animation: without <code>interpolate-size</code>, items open instantly.
      </Note>

      <Example title='Inside a card' demo='accordion/Flush'>
        <p>
          <code>flush</code> drops the outer border and background so the
          accordion sits flat inside a card. A title can hold any inline
          content, like a count badge.
        </p>
      </Example>

      <Example title='Staff handbook' demo='accordion/Handbook' scene>
        <p>
          The same thing in plain HTML: <code>.accordion</code>, then{' '}
          <code>&lt;details class=&quot;accordion-item&quot;&gt;</code> with a{' '}
          <code>&lt;summary&gt;</code> and an <code>.accordion-body</code>. The
          shared <code>name=&quot;wfh&quot;</code> makes it exclusive.
        </p>
      </Example>
      <Note title='Accessibility'>
        The summary is the button. Keep it a short question or step name, and
        don't put links or buttons inside it; they would be nested inside
        another interactive element.
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Accordion props'
        rows={[
          {
            name: 'exclusive',
            type: 'boolean',
            description: 'One item open at a time, via <details name>.',
          },
          {
            name: 'name',
            type: 'string',
            description: 'Group name for exclusive mode. Generated if omitted.',
          },
          {
            name: 'flush',
            type: 'boolean',
            description: 'No outer border, background or shadow.',
          },
          {
            name: '...div props',
            type: 'ComponentProps<"div">',
            description: 'Passed to the wrapper.',
          },
        ]}
      />
      <Ledger
        title='Accordion.Item props'
        rows={[
          {
            name: 'title',
            type: 'ReactNode',
            description: 'Content of the <summary>.',
          },
          {
            name: 'defaultOpen',
            type: 'boolean',
            description: 'Open on first render (uncontrolled).',
          },
          {
            name: '...details props',
            type: 'ComponentProps<"details">',
            description: 'e.g. onToggle to react to opening.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.accordion',
            description: 'Paper wrapper with a border and edge.',
          },
          { name: '.accordion-item', description: 'On each <details>.' },
          {
            name: '.accordion-body',
            description: 'Padded, muted content area.',
          },
          {
            name: '.accordion-flush',
            description: 'Flat version for use inside cards.',
          },
        ]}
      />
    </DocPage>
  );
}
