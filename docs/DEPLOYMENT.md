# Deploying and releasing

For maintainers. If you only want to _use_ officehut, the [README](../README.md) is all you need.

- [Deploy the docs to Vercel](#deploy-the-docs-to-vercel)
- [Deploy the docs to GitHub Pages](#deploy-the-docs-to-github-pages)
- [Publish to npm](#publish-to-npm)
- [Serve from jsDelivr and unpkg](#serve-from-jsdelivr-and-unpkg)
- [Tags and GitHub releases](#tags-and-github-releases)

## Deploy the docs to Vercel

The docs site is a static Vite build (`docs/dist`), so it runs on Vercel's free tier with no server code. [`vercel.json`](../vercel.json) at the repo root already holds the settings below, so the dashboard picks them up by itself.

| Setting          | Value                             |
| ---------------- | --------------------------------- |
| Framework preset | Vite                              |
| Root directory   | `./` (the repo root, not `docs/`) |
| Install command  | `pnpm install --frozen-lockfile`  |
| Build command    | `pnpm docs:build`                 |
| Output directory | `docs/dist`                       |
| Node.js version  | 24.x (matches `.nvmrc`)           |
| Env variable     | `ENABLE_EXPERIMENTAL_COREPACK=1`  |

### From the dashboard (recommended)

1. Push the repo to GitHub.
2. In Vercel, go to **Add New… → Project**, import the repo, and keep the root directory as `./`.
3. Under **Environment Variables**, add `ENABLE_EXPERIMENTAL_COREPACK` = `1`. Vercel then installs the exact pnpm pinned in `packageManager` instead of guessing a version from the lockfile.
4. Under **Settings → Build and Deployment**, set Node.js to **24.x**.
5. Click **Deploy**.

From then on, every push to `main` deploys to production and every pull request gets its own preview URL in a PR comment.

### From the CLI

```bash
pnpm dlx vercel login
pnpm dlx vercel link          # once: connects this folder to a Vercel project
pnpm dlx vercel               # preview deployment
pnpm dlx vercel --prod        # production deployment
```

To test the production build on your machine first, run `pnpm docs:build && pnpm docs:preview`.

### Things to know

- **Deep links rely on the rewrite.** The docs use React Router's browser history, so `/docs/components/button` only exists in JavaScript. The `rewrites` rule in `vercel.json` sends every unknown path to `index.html`, and the docs then show their own "No such page in the filing cabinet" 404. Without the rewrite, refreshing any inner page returns Vercel's 404.
- **Don't turn on `cleanUrls`.** It redirects `/index.html` to `/index`, so the catch-all rewrite never finds a file and every deep link returns 404 again.
- **Leave `DOCS_BASE` unset.** It only exists for sub-path hosting such as GitHub Pages (`/officehut/`); on Vercel the site lives at `/`.
- **Caching.** Files under `/assets/` have hashed names, so they're cached for a year; `index.html` is always revalidated, so a new deploy shows up right away.
- **Live site:** <https://officehut.vercel.app>. With a custom domain (added under **Settings → Domains**), also update the docs links at the top of the README and `homepage` in `package.json`.
- **No secrets needed.** The docs bundle its fonts (fontsource) and make no API calls, so there are no environment variables beyond the corepack one.
- **GitHub Pages is optional.** [`.github/workflows/docs.yml`](../.github/workflows/docs.yml) still publishes to GitHub Pages on push to `main`. Delete it if Vercel is the only host you want.

---

## Deploy the docs to GitHub Pages

GitHub Pages serves a project site from a sub-path (`https://<user>.github.io/officehut/`), so the docs have to be built with that path as their base. The `DOCS_BASE` variable does this. Vite prefixes every asset with it and React Router uses it as its `basename`.

### With GitHub Actions (recommended)

[`.github/workflows/docs.yml`](../.github/workflows/docs.yml) is already set up:

1. On GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Push to `main`, or run the **Docs** workflow by hand from the **Actions** tab.
3. The workflow builds with `DOCS_BASE=/<repo-name>/`, copies `index.html` to `404.html`, and publishes `docs/dist`. The site appears at `https://<user>.github.io/<repo-name>/`.

The `404.html` copy is the SPA fallback. GitHub Pages has no rewrites, so a refresh on `/officehut/docs/components/button` serves `404.html`, which is the docs app, and the router takes over from there. The page loads fine, but the HTTP status is still 404. For proper status codes, host on Vercel instead.

### With the `gh-pages` package (manual, from your machine)

This publishes to a `gh-pages` branch without Actions:

```bash
DOCS_BASE=/officehut/ pnpm docs:build
cp docs/dist/index.html docs/dist/404.html
pnpm dlx gh-pages -d docs/dist --nojekyll
```

Then, under **Settings → Pages**, set **Source** to **Deploy from a branch** and pick `gh-pages` / `root`.

### Things to know

- **Keep the slashes.** `DOCS_BASE` needs a leading and a trailing slash (`/officehut/`). Without them, assets load from the wrong folder and the page renders blank.
- **Renaming the repo changes the URL.** The workflow reads the repo name, but the manual command above doesn't, so update it there yourself.
- **Custom domain.** With a domain (for example `docs.officehut.dev`), the site lives at `/`. Build without `DOCS_BASE`, add a `docs/public/CNAME` file containing the domain, and set it under **Settings → Pages → Custom domain**.

---

## Publish to npm

The package is published as [`officehut`](https://www.npmjs.com/package/officehut). Only what `files` in `package.json` lists ships: `dist/`, `src/scss/`, the README, the license and the changelog. Docs, demos and tests never leave the repo.

### Before the first release

```bash
npm login                    # once per machine
npm whoami                   # check which account will publish
npm view officehut           # a 404 means the name is still free
```

The very first version, `0.1.0`, is already in `package.json` and `CHANGELOG.md`, so it needs no changeset. Change the heading `## 0.1.0 — unreleased` to `## 0.1.0`, commit, then run `pnpm release` and follow [Tags and GitHub releases](#tags-and-github-releases). Every later version goes through changesets.

### Check what will ship

```bash
pnpm verify                          # lint, types, tests, build, publint, attw, size-limit
npm pack --dry-run                   # lists every file that would go in the tarball
npm publish --dry-run                # the full publish, without uploading anything
```

To try the tarball in a real app before publishing, run `pnpm pack`, then in another project `pnpm add ../officehut/officehut-0.1.0.tgz`.

### Release with changesets (recommended)

Versions and the changelog come from [changesets](https://github.com/changesets/changesets), so nobody edits `version` or `CHANGELOG.md` by hand.

1. With each pull request, run `pnpm changeset`, pick **patch / minor / major**, and write one line for the changelog. Commit the generated `.changeset/*.md` file with the change.
2. When those reach `main`, the **Release** workflow ([`.github/workflows/release.yml`](../.github/workflows/release.yml)) opens a **"chore: release"** pull request that bumps the version and updates `CHANGELOG.md`.
3. Merging that pull request publishes to npm with [provenance](https://docs.npmjs.com/generating-provenance-statements) and tags the release on GitHub.

One-time setup for the workflow: create an npm **granular access token** that can publish `officehut`, and save it as the repository secret `NPM_TOKEN` under **Settings → Secrets and variables → Actions**. On npm, you can use **trusted publishing** for this repo and workflow instead, and drop the token.

### Release by hand

```bash
pnpm changeset              # describe the change
pnpm changeset version      # bump package.json and write CHANGELOG.md
git commit -am "chore: release v$(node -p "require('./package.json').version")"
pnpm release                # pnpm verify && changeset publish (asks for your 2FA code)
git push --follow-tags
```

`prepublishOnly` runs `pnpm build` again, so a plain `npm publish` can never upload a stale `dist/`.

### Version rules while below 1.0

- **patch**: bug fixes, docs and style tweaks that keep class names.
- **minor**: new components, new props or classes, and breaking changes, which are allowed before 1.0 and must be called out in the changeset.
- **1.0.0**: the class names, `data-oh-*` attributes and React props are frozen; from then on a breaking change means a major.

Published something by mistake? Within 72 hours, `npm unpublish officehut@<version>` removes it. After that, use `npm deprecate officehut@<version> "reason"` and publish a fix.

---

## Serve from jsDelivr and unpkg

There is nothing to deploy. [jsDelivr](https://www.jsdelivr.com/package/npm/officehut) and [unpkg](https://unpkg.com/officehut/) mirror every package on npm, so **publishing to npm is the CDN release**. A new version usually appears within a few minutes.

### What they serve

Every file in the published tarball has a URL. The ones CDN users need:

| File                   | jsDelivr                                                                  | unpkg                                                          |
| ---------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Full CSS (minified)    | `https://cdn.jsdelivr.net/npm/officehut@0.1/dist/css/officehut.min.css`   | `https://unpkg.com/officehut@0.1/dist/css/officehut.min.css`   |
| Core CSS only          | `https://cdn.jsdelivr.net/npm/officehut@0.1/dist/css/core.min.css`        | `https://unpkg.com/officehut@0.1/dist/css/core.min.css`        |
| One component's CSS    | `https://cdn.jsdelivr.net/npm/officehut@0.1/dist/css/components/card.css` | `https://unpkg.com/officehut@0.1/dist/css/components/card.css` |
| JS (IIFE, auto-init)   | `https://cdn.jsdelivr.net/npm/officehut@0.1/dist/officehut.iife.js`       | `https://unpkg.com/officehut@0.1/dist/officehut.iife.js`       |
| ES module (no bundler) | `https://cdn.jsdelivr.net/npm/officehut@0.1/+esm`                         | `https://unpkg.com/officehut@0.1/dist/js/index.js?module`      |

A bare `https://cdn.jsdelivr.net/npm/officehut` or `https://unpkg.com/officehut` serves the file named in the `jsdelivr` / `unpkg` fields of `package.json`, which is the IIFE build. The `style` field points CSS-aware tools at `dist/css/officehut.css`. If you move or rename the IIFE or the CSS, update those fields in the same commit.

### Checklist after a release

1. Open `https://cdn.jsdelivr.net/npm/officehut@<version>/` and `https://unpkg.com/officehut@<version>/`. Both list the files, and `dist/` must be there.
2. Load [`playground/vanilla/index.html`](../playground/vanilla/index.html) with its two tags pointed at the new CDN URLs, and click the dropdown, modal and toast.
3. If the docs' [Installation page](src/pages/guide/Installation.tsx) or the README pin a version that's now out of range (for example `@0.1` after a `0.2.0` release), update them.

### Version pins and caching

- **Pin at least the minor version** in every snippet we publish (`@0.1`). Before 1.0, a minor version can break class names. After 1.0, `@1` is enough.
- **Exact versions** (`@0.1.3`) are cached for good on both CDNs, so they're the safest for production pages.
- **Ranges and `@latest`** are cached for up to about 12 hours on jsDelivr (10 minutes on unpkg). If a range still serves the old version right after a release, purge it: `curl https://purge.jsdelivr.net/npm/officehut@0.1/dist/officehut.iife.js` (one call per file). unpkg has no purge; it catches up by itself.

### Subresource Integrity (optional)

For exact versions, users can lock the file contents with SRI. jsDelivr shows the hash on the package page (**Copy HTML + SRI**). You can also compute it yourself:

```bash
curl -s https://cdn.jsdelivr.net/npm/officehut@0.1.0/dist/officehut.iife.js \
  | openssl dgst -sha384 -binary | openssl base64 -A
```

```html
<script
  src="https://cdn.jsdelivr.net/npm/officehut@0.1.0/dist/officehut.iife.js"
  integrity="sha384-<hash>"
  crossorigin="anonymous"
  defer
></script>
```

SRI only works with exact versions. A range like `@0.1` changes content on every patch release and would then fail the check.

---

## Tags and GitHub releases

Every npm version gets a git tag (`v0.1.0`) and a GitHub release with that version's changelog as its notes. Tags are the source of truth: the version on npm, the tag and the release must always match.

### Automatic (changesets workflow)

Merging the **"chore: release"** pull request does all three steps. `changeset publish` publishes to npm and creates the `v<version>` tag, and [`changesets/action`](https://github.com/changesets/action) pushes the tag and opens a GitHub release whose notes are that version's `CHANGELOG.md` section. Nothing else to do.

The workflow needs **Settings → Actions → General → Workflow permissions** set to **Read and write**. It already asks for `contents: write`, but some organisations cap it.

### By hand

After `pnpm release` (see [Release by hand](#release-by-hand)), `changeset publish` has created the tag locally. Push it, then create the release:

```bash
git push --follow-tags                       # pushes the commit and the v<version> tag

VERSION=$(node -p "require('./package.json').version")
gh release create "v$VERSION" \
  --title "v$VERSION" \
  --notes "$(awk -v v="$VERSION" '$1=="##" && $2==v {f=1; next} /^## /{f=0} f' CHANGELOG.md)"
```

The `awk` command prints only this version's changelog section. Use `--generate-notes` instead to let GitHub list the merged pull requests.

If you published with plain `npm publish` and have no tag yet, create an annotated one on the release commit first:

```bash
git tag -a "v$VERSION" -m "v$VERSION"
git push origin "v$VERSION"
```

From the GitHub website, the steps are: **Releases → Draft a new release → Choose a tag**. Type `v0.1.0`; GitHub offers to create it on `main`. Paste the changelog section, then **Publish release**.

### Pre-releases

For a beta that shouldn't become `latest` on npm:

```bash
pnpm changeset pre enter beta    # versions become 0.2.0-beta.0, 0.2.0-beta.1 …
pnpm changeset version && pnpm release
pnpm changeset pre exit          # back to normal releases
```

On GitHub, tick **Set as a pre-release** (or pass `--prerelease` to `gh release create`). On npm, the beta is published under the `beta` dist-tag, so `pnpm add officehut` still installs the stable version.

### Rules

- Tag format is `v<semver>` (`v0.1.0`, `v0.2.0-beta.1`): no other prefixes or names.
- Never move or delete a pushed tag. If a release is broken, publish a new patch and note it in the next release.
- Tag the commit that bumped `package.json`, never a later one.
- Attaching files is optional. The tarball from `pnpm pack` can go on the release (`gh release upload v$VERSION officehut-$VERSION.tgz`), but npm and the CDNs remain the real distribution.
