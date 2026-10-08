import axe from 'axe-core';

/**
 * Run axe-core against a container and fail with readable messages.
 * Colour-contrast is skipped: jsdom has no layout or computed colours.
 */
export async function expectNoA11yViolations(
  container: Element,
): Promise<void> {
  const result = await axe.run(container, {
    rules: {
      'color-contrast': { enabled: false },
      region: { enabled: false },
    },
  });
  const messages = result.violations.map(
    (v) => `${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.html).join('\n  ')}`,
  );
  if (messages.length)
    throw new Error(
      `axe found ${messages.length} issue(s):\n${messages.join('\n')}`,
    );
}
