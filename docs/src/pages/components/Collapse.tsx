import { Link } from 'react-router';
import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function CollapsePage() {
  return (
    <DocPage
      title='Collapse'
      lead='Show and hide a region with a height animation. The animation is pure CSS (grid rows from 0fr to 1fr), so nothing is measured in JavaScript and content can change size while open.'
      importLine="import { Collapse, useDisclosure } from 'officehut/react';"
      cssFile='officehut/css/components/collapse.css'
    >
      <Example title='Basic' demo='collapse/Basic'>
        <p>
          <code>Collapse</code> is controlled: you keep the <code>open</code>{' '}
          state, usually with <code>useDisclosure()</code>. The trigger is yours
          too, so give it <code>aria-expanded</code> and{' '}
          <code>aria-controls</code>.
        </p>
      </Example>

      <Example
        title='Without React'
        demo='collapse/DataApi'
        anatomy={[
          { selector: '[data-oh-toggle]', label: 'trigger' },
          { selector: '.collapse', label: '.collapse' },
        ]}
      >
        <p>
          A trigger with <code>data-oh-toggle=&quot;collapse&quot;</code> and a
          target. The region needs exactly one inner wrapper; that wrapper is
          what gets clipped during the animation.
        </p>
      </Example>

      <Example title='One open at a time' demo='collapse/Parent'>
        <p>
          <code>data-oh-parent</code> on each region names a container. Opening
          one region closes the others inside it. For plain question lists, the{' '}
          <Link to='/docs/components/accordion'>Accordion</Link> does this with
          no JavaScript at all.
        </p>
      </Example>
      <Note title='Accessibility'>
        A closed region is <code>visibility: hidden</code>, so its links and
        fields are skipped by Tab and by screen readers. The React component
        also sets <code>inert</code>. Point the trigger at the region with{' '}
        <code>aria-controls</code> and keep <code>aria-expanded</code> current;
        the vanilla API updates it for triggers found by{' '}
        <code>data-oh-target</code> or <code>href</code>.
      </Note>

      <Example title='Filter panel' demo='collapse/Filters' scene>
        <p>A filter bar that folds out of a card header.</p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Collapse props'
        rows={[
          {
            name: 'open',
            type: 'boolean',
            description: 'Required. Controlled open state.',
          },
          {
            name: '...div props',
            type: 'ComponentProps<"div">',
            description: 'id, className and so on, on the outer region.',
          },
        ]}
      />
      <Ledger
        title='useDisclosure(initial = false)'
        rows={[
          { name: 'open', type: 'boolean', description: 'Current state.' },
          {
            name: 'onOpen / onClose / onToggle',
            type: '() => void',
            description: 'Stable callbacks.',
          },
          {
            name: 'setOpen',
            type: 'Dispatch<boolean>',
            description: 'Set directly.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.collapse',
            description: 'The region. Needs one child element.',
          },
          {
            name: '.collapse.is-open',
            description: 'Open state; you can set it in HTML to start open.',
          },
        ]}
      />
      <Ledger
        kind='attr'
        title='Data API'
        rows={[
          { name: 'data-oh-toggle="collapse"', description: 'On the trigger.' },
          {
            name: 'data-oh-target',
            description:
              'Selector of the region. href="#id" or aria-controls also work.',
          },
          {
            name: 'data-oh-parent',
            description:
              'On the region. Selector of a container; siblings in it close.',
          },
        ]}
      />
      <Ledger
        kind='event'
        rows={[
          {
            name: 'oh:show / oh:hide',
            type: 'cancelable',
            description: 'On the region, before it changes.',
          },
          {
            name: 'oh:shown / oh:hidden',
            description:
              'After the class changes (the CSS transition then runs).',
          },
        ]}
      />
    </DocPage>
  );
}
