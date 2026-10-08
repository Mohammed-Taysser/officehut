# Contributing to officehut

Thanks for helping. This file is the checklist we actually use.

## Setup

```bash
corepack enable          # uses the pnpm version pinned in package.json
pnpm install
pnpm dev                 # docs site on http://localhost:5173
```

Node 20.19+ (see `.nvmrc`).

## Where things live

| Path                  | What                                                                                                     |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| `src/scss/`           | The CSS kit. `_config.scss` (Sass options), `base/_root.scss` (CSS variables), `components/_<name>.scss` |
| `src/js/`             | Vanilla behaviours and the `data-oh-*` API                                                               |
| `src/react/`          | React components, one folder each                                                                        |
| `src/shared/`         | Code used by both: tokens, `cx`, positioning, focus helpers                                              |
| `docs/`               | The docs site (Vite + React). Pages in `docs/src/pages`, demos in `docs/src/demos`                       |
| `playground/vanilla/` | A plain HTML page that loads the built package                                                           |
| `tests/`              | Test setup and the axe helper                                                                            |

## Adding a component

A component is done when all of these exist:

1. **SCSS** — `src/scss/components/_<name>.scss`, registered in `components/_index.scss`.
   - Use component-local variables (`--_bg`, `--_fg`…) and tones (`@include tone($name)`).
   - Logical properties only (`margin-inline-start`, not `margin-left`) so RTL works.
   - Respect the ruling: if it sits in a `.notebook`, text should land on the lines.
2. **Vanilla JS** (only if it's interactive) — `src/js/components/<name>.ts`, extend `Component`,
   emit `oh:*` events, hook a `data-oh-toggle` handler in `core/data-api.ts`.
3. **React** — `src/react/components/<Name>/<Name>.tsx` + `index.ts`, exported from `src/react/index.ts`.
   - React 19 style: `ref` is a normal prop, no `forwardRef`, no `defaultProps`.
   - Same class names as the CSS — React is a thin layer, not a second design.
4. **Tests** — behaviour + `expectNoA11yViolations` for anything with roles or labels.
5. **Docs** — `docs/src/pages/components/<Name>.tsx`, demos under `docs/src/demos/<name>/`,
   an entry in `docs/src/content/nav.ts`. Use realistic office content, never lorem ipsum.
6. **Changeset** — `pnpm changeset`.

## Before you push

```bash
pnpm verify   # lint, typecheck, tests, build, publint + attw, size-limit
```

Commits run `lint-staged` through Husky.

Deploying the docs and publishing to npm: see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Style

- Prettier + EditorConfig (2 spaces, single quotes).
- Conventional Commits, one line each, one commit per component or docs page (see [CLAUDE.md](CLAUDE.md)).
- Write docs like you'd explain it to a colleague: short, specific, no hype.
