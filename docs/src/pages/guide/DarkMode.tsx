import { CodeBlock } from '../../components/CodeBlock';
import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

const HTML = `<html lang="en" data-oh-theme="auto">`;

const NO_FLASH = `<head>
  <!-- Before the stylesheet, so the first paint already has the right theme. -->
  <script>
    try {
      document.documentElement.setAttribute(
        'data-oh-theme',
        localStorage.getItem('oh-theme') || 'auto'
      );
    } catch (e) {}
  </script>
  <link rel="stylesheet" href="/officehut.min.css">
</head>`;

const REACT = `import { useTheme, type Theme } from 'officehut/react';

function ThemeMenu() {
  const [theme, setTheme] = useTheme(); // 'light' | 'dark' | 'auto'
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
      <option value="light">Day</option>
      <option value="dark">Night shift</option>
      <option value="auto">Follow system</option>
    </select>
  );
}`;

export default function DarkModePage() {
  return (
    <DocPage
      title='Dark mode & density'
      lead='Two attributes control how a page looks: data-oh-theme picks day or night shift, data-oh-density picks comfortable or compact. Both work on <html> or on any element inside it.'
    >
      <H2 id='themes'>Day and night shift</H2>
      <p>
        The dark theme is called night shift: a charcoal desk under a lamp
        rather than pure black, with warm off-white ink. Palette colours are
        lifted slightly so they keep their contrast. Set the theme on the root
        element:
      </p>
      <CodeBlock code={HTML} lang='html' />
      <Ledger
        kind='attr'
        title='data-oh-theme values'
        rows={[
          {
            name: 'light',
            description: 'Day. Also what you get with no attribute at all.',
          },
          { name: 'dark', description: 'Night shift.' },
          {
            name: 'auto',
            description:
              'Follows the operating system through prefers-color-scheme.',
          },
        ]}
      />

      <Example title='Theme a part of the page' demo='darkmode/Scoped'>
        <p>
          Surfaces, inks and every derived tint are re-declared on each element
          that has <code>data-oh-theme</code>, so a subtree can use the other
          theme. That element also paints its own background and text colour.
          Useful for a dark preview pane, or a print preview that must stay
          light.
        </p>
      </Example>

      <Example
        title='Theme switch without React'
        demo='darkmode/ThemeButtons'
        center
      >
        <p>
          <code>data-oh-toggle=&quot;theme&quot;</code> with a{' '}
          <code>data-oh-value</code> sets that theme; without a value it flips
          between light and dark. The choice is saved to{' '}
          <code>localStorage</code> under <code>oh-theme</code>. Try it: these
          buttons change this whole site.
        </p>
      </Example>

      <H2 id='no-flash'>Avoiding a flash on load</H2>
      <p>
        <code>restoreTheme()</code> reads the saved value, but if it runs after
        the first paint the page blinks from day to night. Put a tiny inline
        script in <code>&lt;head&gt;</code> instead:
      </p>
      <CodeBlock code={NO_FLASH} lang='html' />

      <Example title='React: useTheme' demo='darkmode/UseTheme'>
        <p>
          <code>useTheme()</code> returns the current theme of{' '}
          <code>&lt;html&gt;</code> and a setter. It watches the attribute, so
          it stays correct when the theme is changed by a vanilla toggle,
          another component, or another tab of your app.
        </p>
      </Example>
      <CodeBlock code={REACT} lang='tsx' label='ThemeMenu.tsx' />
      <Note title='Things that render into body'>
        React dropdown menus, React tooltips and toasts are placed directly in{' '}
        <code>&lt;body&gt;</code>, so they follow the theme of{' '}
        <code>&lt;html&gt;</code>, not of a themed subtree. If you theme only a
        panel, its menus will still use the page theme.
      </Note>

      <H2 id='density'>Compact density</H2>
      <p>
        Timesheets, ledgers and long admin forms often need more rows on screen.{' '}
        <code>data-oh-density=&quot;compact&quot;</code> shrinks control
        heights, inline padding, the grid gutter and the base font size. Like
        the theme, it can go on <code>&lt;html&gt;</code> or on one panel.
      </p>
      <Example title='Comfortable and compact' demo='darkmode/Density'>
        <p>
          The same toolbar twice. In JavaScript, call{' '}
          <code>setDensity(&apos;compact&apos;)</code>; pass an element as the
          second argument to scope it.
        </p>
      </Example>
      <Note title='Font size in scoped density' tone='blue'>
        Compact sets <code>--oh-font-size</code>, which buttons and menus read
        directly. Plain text inside a compact panel keeps the body font size
        unless you also set <code>font-size: var(--oh-font-size)</code> on that
        panel.
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        kind='prop'
        title='Theme functions (officehut)'
        rows={[
          {
            name: 'setTheme(theme, { root?, persist? })',
            type: 'void',
            description:
              'Set the attribute. Persists by default only when the root is <html>. Fires oh:theme.',
          },
          {
            name: 'toggleTheme(root?)',
            type: 'Theme',
            description:
              'Flip light/dark based on what is painted now, so auto resolves first.',
          },
          {
            name: 'getTheme(root?)',
            type: 'Theme',
            description:
              "The attribute value; 'light' when missing or unknown.",
          },
          {
            name: 'resolvedTheme(root?)',
            type: "'light' | 'dark'",
            description:
              'What is actually painted, with auto resolved against the OS.',
          },
          {
            name: "restoreTheme(fallback = 'light')",
            type: 'Theme',
            description: 'Apply the saved theme to <html>, or the fallback.',
          },
          {
            name: 'setDensity(density, root?)',
            type: 'void',
            description:
              "'comfortable' removes the attribute, 'compact' sets it.",
          },
          {
            name: 'useTheme()',
            type: '[Theme, (t: Theme) => void]',
            description: 'React hook (officehut/react) for the <html> theme.',
          },
        ]}
      />
      <Ledger
        kind='event'
        rows={[
          {
            name: 'oh:theme',
            description: (
              <>
                Fired on the themed root by <code>setTheme</code> and{' '}
                <code>toggleTheme</code>. Bubbles.{' '}
                <code>event.detail.theme</code> is the new value.
              </>
            ),
          },
        ]}
      />
    </DocPage>
  );
}
