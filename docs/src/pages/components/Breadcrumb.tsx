import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function BreadcrumbPage() {
  return (
    <DocPage
      title='Breadcrumb'
      lead='Where this page sits in the filing cabinet: department, drawer, folder. It helps people climb back up in deep admin sections.'
      importLine="import { Breadcrumb } from 'officehut/react';"
      cssFile='officehut/css/components/breadcrumb.css'
    >
      <Example
        title='Basic'
        demo='breadcrumb/Basic'
        anatomy={[
          { selector: '.breadcrumb' },
          {
            selector: '.breadcrumb-item[aria-current]',
            label: '[aria-current=page]',
          },
        ]}
      >
        <p>
          Pass <code>items</code>. The last item is the current page: it
          isn&apos;t a link and gets <code>aria-current=&quot;page&quot;</code>.
          Set <code>current</code> on another item if your trail ends somewhere
          else.
        </p>
      </Example>

      <Example title='Dividers' demo='breadcrumb/Dividers'>
        <p>
          <code>slash</code> by default, <code>arrow</code> (›) and{' '}
          <code>dot</code> (·) built in, or any string. Dividers are drawn with
          CSS from the <code>--divider</code> variable, so screen readers
          don&apos;t read them.
        </p>
      </Example>

      <Example title='Router links' demo='breadcrumb/RouterLinks'>
        <p>
          <code>linkAs</code> swaps the <code>&lt;a&gt;</code> for your
          router&apos;s link. Breadcrumb passes <code>href</code>, so wrap a
          link that expects <code>to</code>.
        </p>
      </Example>
      <Note title='Accessibility'>
        The trail is a{' '}
        <code>&lt;nav aria-label=&quot;Breadcrumb&quot;&gt;</code> around an
        ordered list. If your page is not in English, translate the label with
        the <code>label</code> prop.
      </Note>

      <Example title='In a page header' demo='breadcrumb/PageHeader' scene>
        <p>
          Breadcrumbs sit above the page title in <code>.page-header</code>,
          with the actions on the end side.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Breadcrumb props'
        rows={[
          {
            name: 'items',
            type: '{ label, href?, current? }[]',
            description: 'The trail, outermost first.',
          },
          {
            name: 'divider',
            type: "'slash' | 'arrow' | 'dot' | string",
            default: "'slash'",
            description: 'Separator.',
          },
          {
            name: 'linkAs',
            type: 'ElementType',
            default: "'a'",
            description: 'Link component. Receives href.',
          },
          {
            name: 'label',
            type: 'string',
            default: "'Breadcrumb'",
            description: 'aria-label of the nav.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.breadcrumb', description: 'On the <ol>.' },
          {
            name: '.breadcrumb-item',
            description:
              'On each <li>. Mark the last with aria-current="page" (or .active).',
          },
          {
            name: '.breadcrumb-arrows / .breadcrumb-dots',
            description: 'Built-in dividers.',
          },
        ]}
      />
      <Ledger
        kind='var'
        rows={[
          {
            name: '--divider',
            default: "'/'",
            description:
              'Set on .breadcrumb for a custom separator, e.g. style="--divider: \'→\'".',
          },
        ]}
      />
    </DocPage>
  );
}
