# CLAUDE.md

Rules for working on **officehut**: a small UI kit (plain CSS + tiny vanilla JS + typed React bindings) published as one npm package, with its docs site in `docs/`. Everything here applies to humans too. [CONTRIBUTING.md](CONTRIBUTING.md) has the same component checklist in more detail.

## Commands

```bash
pnpm dev              # docs site with hot reload (docs/vite.config.ts)
pnpm test             # vitest + testing-library + axe
pnpm typecheck        # library + docs
pnpm lint             # eslint + stylelint
pnpm build            # dist/: css, js, react, iife, types
pnpm docs:build       # docs/dist (static site)
pnpm verify           # everything CI runs — must pass before any commit series ends
pnpm format           # prettier
```

pnpm only (version pinned in `packageManager`). Never add `package-lock.json` or `yarn.lock`.

## Layout

| Path          | What                                                                                                |
| ------------- | --------------------------------------------------------------------------------------------------- |
| `src/scss/`   | The CSS kit: `_config.scss` (all `!default`), abstracts, base, layout, components, utilities        |
| `src/js/`     | Vanilla behaviours: `core/` (Component base, data API), `components/`, `index.ts`, `auto.ts` (IIFE) |
| `src/react/`  | One folder per component, plus `hooks/` and `utils/`; `index.ts` exports everything                 |
| `src/shared/` | Used by both JS and React: tokens, `cx`, focus trap, positioning                                    |
| `docs/src/`   | Docs app: `pages/`, `demos/<name>/`, `components/` (Example, Bench, Ledger…), `content/nav.ts`      |
| `scripts/`    | `build-css.ts` (run by Node type stripping), `clean.ts`                                             |
| `tests/`      | Vitest setup and the axe helper                                                                     |

`docs` aliases `officehut`, `officehut/react` and `officehut/tokens` to `src/`, so docs always run against the source, never `dist/`.

## Design identity (non-negotiable)

The look is a **school exercise book on an office desk**. It must never look AI-generated.

- **Never:** purple/blue gradients, glassmorphism, gradient text, emoji headings, a "Build faster ✨" hero with a three-card grid, everything `rounded-2xl` with huge blurred shadows, lorem ipsum.
- **Use:** blue ruled lines with text sitting on them, the red margin rule, punched holes, textbook-numbered headings (6.1, 6.2), highlighter for active states, stamps (`PAID`, `OVERDUE`), manila folder tabs, stacked paper, ledger tables with a red double rule, a chalkboard for code.
- **Readability first.** Paper effects stay at the edges. Long text and code never have lines behind them; code sits on the chalkboard, not on ruled paper.
- **Handwriting is seasoning.** `--oh-font-hand` (Patrick Hand) is for a few words: margin numbers, notes, captions. Never body copy, labels or buttons.
- **Night shift** is the same book under a desk lamp. Every component is designed and checked in both themes.
- **Real office content** in every demo: invoices, rotas, room bookings, leave requests, vendors. No placeholders.
- Inside `.notebook`, text and controls must land on the ruling. Use the existing baseline maths; don't eyeball offsets.

## CSS rules

- Sass modules only (`@use` / `@forward`, `sass:list`, `sass:map`, `sass:math`). No `@import`, no deprecated globals (`nth`, `if()`, `append`).
- Public tokens are `--oh-*` custom properties. Component internals use local variables (`--_bg`, `--_fg`, `--_c*`). Colour variants go through `@include tone($name)` / `tones('prefix')`.
- Derived tones use `color-mix()` and are re-declared on `[data-oh-theme]`, so a theme can be scoped to a subtree. Keep it that way.
- **Logical properties only** (`margin-inline-start`, `inset-inline-end`, `border-start-start-radius`) so RTL works. Physical transforms need an `[dir='rtl']` counterpart.
- Respect `prefers-reduced-motion` and keep print styles working (`print-color-adjust: exact` for meaningful colour).
- Every component partial must compile on its own: `dist/css/components/<name>.css` is a public, cherry-pickable file.
- Register new partials in `src/scss/components/_index.scss`.
- Keep vendor prefixes that stylelint would strip, using `/* stylelint-disable-line property-no-vendor-prefix -- reason */`.

## TypeScript / JS rules

- Strict TypeScript, pinned to `~6.0.3`. **Do not upgrade to TS 7**: typescript-eslint and the declaration build don't support it yet.
- Relative imports in `src/` carry a `.js` extension (`./button.js`). The node16 ESM `.d.ts` resolution (attw) depends on it.
- Vanilla components extend `Component` (WeakMap registry), emit `oh:*` events (`oh:show`, `oh:shown`, `oh:hide`, `oh:hidden`, `oh:change`…), and get wired through the delegated `data-oh-*` API in `core/data-api.ts`. `initAll()` must stay idempotent and handle elements added later.
- Prefer native platform features: `<dialog>` for modals, `<details name>` for exclusive accordions.
- Positioning goes through `shared/position.ts` (`computePosition` with flip, shift and RTL). Read theme scope with `scopedTheme()`.

## React rules

- React 19+: `ref` is a normal prop. No `forwardRef`, no `defaultProps`, no PropTypes.
- Same class names as the CSS. React is a thin layer, never a second design.
- Respect the React Compiler lint rules: no ref reads or writes during render, no components created during render, no `setState` inside effects to sync props. Use state-backed nodes and `useControllableState`.
- Classes are derived during render with `cx()`, never built in an effect.
- Shared unions (`Color`, `Size`, `Placement`) come from `src/shared/tokens.ts`. The tokens-sync test checks them against `_config.scss`.

## Adding a component (definition of done)

1. SCSS partial, registered in `components/_index.scss`.
2. Vanilla module (only if interactive) plus data-API hook.
3. React component folder, exported from `src/react/index.ts`.
4. Tests: behaviour plus `expectNoA11yViolations`.
5. Docs: `docs/src/pages/components/<Name>.tsx`, demos in `docs/src/demos/<name>/` (`*.tsx`, plus an optional `*.vanilla.js`), and an entry in `docs/src/content/nav.ts`. The page name is derived from the nav title in PascalCase.
6. A changeset (`pnpm changeset`).
7. Check it in the browser: light, night shift, RTL, a narrow width, no horizontal scroll, no error slips.

## Docs site rules

- Each preview is wrapped in `ErrorBoundary variant='slip'` plus `Suspense` with `PencilLoader`. Loading states use `PencilLoader`, never a plain skeleton or spinner.
- Pages and demos are lazy (`import.meta.glob`). Don't import a demo eagerly.
- Routes use `createBrowserRouter` with `errorElement` on every level. The basename comes from `import.meta.env.BASE_URL` (`DOCS_BASE`).
- Use the docs building blocks (`DocPage`, `Example`, `Ledger`, `Note`, `Bench`, `Anatomy`, `Playground`) instead of one-off markup.

## Git rules

- **Conventional Commits, one line, no body, no `Co-Authored-By` or other trailers.** Examples: `feat(ribbon): add corner ribbon component`, `fix(toast): pause timer on focus`, `docs(card): add card page`, `chore: …`, `build: …`, `ci: …`, `test: …`.
- **One commit per part:** each component, docs page, config area or guide gets its own commit. Don't lump unrelated work together.
- Scopes are component names (`button`, `date-tile`) or areas (`scss`, `js`, `react`, `shared`, `docs`, `guide`, `examples`).
- The Husky pre-commit hook runs lint-staged. Never skip it with `--no-verify`.
- Never commit `dist/`, `docs/dist/`, `coverage/`, `.legacy/`, `.playwright-mcp/` or `.vercel/`.

## Ask first

- Publishing to npm, deploying (Vercel, GitHub Pages), pushing, or anything else that leaves this machine. Dry runs (`npm publish --dry-run`, `npm pack --dry-run`) are fine.
- Changing the user's own dotfiles: `.editorconfig`, `.prettierrc`, `.vscode/`, `.gitignore`.
- Adding a runtime dependency to the library. The published package has none, and React is an optional peer.
- Raising a size-limit budget.

## Formatting

Prettier (single quotes, JSX single quotes) plus EditorConfig (2 spaces, LF). Run `pnpm format` rather than hand-formatting.

## Releasing and deploying

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). In short: docs are a static build in `docs/dist`; Vercel needs the SPA rewrite in `vercel.json`; GitHub Pages needs `DOCS_BASE=/<repo>/` plus `pnpm docs:pages` (one HTML file per route); npm releases go through changesets.
