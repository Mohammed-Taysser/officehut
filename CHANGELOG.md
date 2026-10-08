# Changelog

All notable changes to this project are documented here. This project follows
[Semantic Versioning](https://semver.org) and entries are generated with
[Changesets](https://github.com/changesets/changesets).

## 0.1.0 — unreleased

The first release as a standalone library. The old Create React App demo was
rebuilt from scratch.

### Added

- Standalone SCSS core with `--oh-*` custom properties: no Bootstrap
  dependency. Light, night-shift (`data-oh-theme="dark"`) and `auto` themes;
  compact density; logical properties throughout for RTL.
- School exercise-book identity: `.notebook` ruled pages (text snaps to the
  lines), red margin, punched holes, handwritten margin notes; plus a
  "Paper & school" kit — Sticky, Marker, Grade, Sticker, Timetable,
  Corkboard / Pinned / paper clip, Checklist, DateTile, Chalkboard, binder
  tabs, PencilLoader and ErrorBoundary / ErrorSheet.
- Vanilla JS (`officehut`, `officehut/iife`): delegated `data-oh-*` API for
  collapse, dropdown, modal (native `<dialog>`), tabs, dismiss, tooltip,
  theme; `toast()`; `oh:*` events.
- Typed React components (`officehut/react`) rendering the same markup.
- Docs site with folder-tab examples (Preview / HTML / React / Vanilla JS),
  bench controls (theme, density, RTL, width), anatomy overlay and a prop
  switchboard.

### Changed (from the CRA prototype)

- Components derive class names during render (they used to build them once
  in `useEffect`, so prop changes were ignored).
- `sm` / `lg` booleans → `size`; one shared `Color` union.
- `Badge` renders a `<span>`; `Card` only renders a status edge when asked.

### Removed

- Bootstrap, react-scripts, react-icons (library), web-vitals, PropTypes.
