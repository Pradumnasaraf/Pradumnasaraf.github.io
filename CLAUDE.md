# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal site at `pradumnasaraf.dev` — Next.js 16 (App Router) + Tailwind CSS, JavaScript (no TypeScript). Blog posts are file-based Markdown in `src/content/blog/`. Node `>=24` is required.

Path alias: `@/*` resolves to `./src/*` (see `jsconfig.json`).

## Commands

- `npm run dev` — Next dev server with Turbopack on http://localhost:3000.
- `npm run build` — runs `prebuild` first (`validate:images` then `validate:tags`), then `next build`. Either validator failing aborts the build.
- `npm start` — serve the production build.
- `npm run lint` / `npm run lint:fix` — ESLint over `.js/.jsx/.ts/.tsx`, `--max-warnings 0` (CI fails on warnings).
- `npm test` — runs the Node built-in test runner (`node --test`) over files in `tests/`. There is no jest/vitest.
  - Run a single file: `node --test tests/blog-lib.test.js`
  - Run a single test by name: `node --test --test-name-pattern="getAllPosts" tests/blog-lib.test.js`
- `npm run validate:tags` — enforces the blog tag taxonomy (see "Blog content" below).
- `npm run validate:images` — every local image referenced from `src/content/blog/**` (frontmatter `thumbnail` + `![](...)`) must exist under `public/`.
- `npm run format` — Prettier (also run on staged files via lint-staged).

Husky hooks: `pre-commit` runs `lint-staged`; `pre-push` runs `npm test`.

CI (`.github/workflows/quality-build.yml`) runs lint → validate:images → validate:tags → test → build on every push/PR. Mirror that order locally when debugging CI failures.

## Architecture

**Routing — App Router under `src/app/`.** Each top-level folder is a route segment (`blog/`, `projects/`, `photography/`, `links/`, `cv/`, `chat/`, `timeline/`, `toolkit/`, `speaking/`, `travel/`, `contact/`, `sitemap/`). Per-route metadata lives next to the route (e.g. `src/app/metadata.js`, `src/app/blog/metadata.js`). The root layout (`src/app/layout.js`) injects GTM, an inline pre-paint script that applies the saved `blog-theme` to `<html data-blog-theme>` before first paint (only meaningful inside `/blog`, where `.blog-theme-root` is scoped), the JSON-LD `Person` schema, and the global font (`League_Spartan`).

**Edge proxy at `src/proxy.js`.** This is Next 16's middleware (renamed from `middleware.js` in this project — keep it at `src/proxy.js`, export `proxy` and `config`). It 301-redirects any request hitting the `blog.pradumnasaraf.dev` host to the corresponding path under `pradumnasaraf.dev/blog`, stripping Hashnode-style `/@username/` prefixes. The `matcher` excludes `api`, `_next/static`, `_next/image`, and `favicon.ico`. Tests live in `tests/proxy.test.js`.

**Blog pipeline (`src/lib/blog.js`).** Reads `src/content/blog/*.md(x)`, parses frontmatter with `gray-matter`, sorts by `date` desc, filters out `draft: true`. Markdown → HTML uses `remark` → `remark-rehype` (with `allowDangerousHtml`) → `rehype-raw` → `rehype-highlight` (explicit language registry — only languages listed in `allLanguages` will highlight; add new ones there) → `rehype-sanitize` (custom schema permits `hljs-*` class names on `code`/`span`/`pre`, and `target`/`rel` on `a`, plus `loading`/`decoding`/`width`/`height` on `img`) → `rehype-stringify`. Reading time = `ceil(words/200)` minutes, computed off the raw markdown with code/links/markdown punctuation stripped.

**Redirects.** Persistent route redirects (`/monitoring`, `/newsletter`, `/getcv`, `/services*`, `/camera`) live in `next.config.mjs` `redirects()`. Host-based subdomain redirects live in `src/proxy.js`. Pick the right layer when adding a new one.

**Releases.** `.github/workflows/releases.yml` runs `conventional-changelog-action` on every push to `main`, bumps `package.json` + `package-lock.json`, and cuts a GitHub release. Commit messages **must** follow Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, …) — otherwise the version bump and changelog will be wrong.

## Blog content

A post is a single `.md` (or `.mdx`) file under `src/content/blog/` with this frontmatter shape:

```yaml
title: '...'
excerpt: '...'
date: 'YYYY-MM-DD'
author: 'Pradumna Saraf'
category: '...'
tags: ['docker', 'ci-cd', ...]   # see ALLOWED_TAGS
thumbnail: '/blog-images/<slug>/thumbnail.png'
canonical: 'https://...'          # optional
draft: false
```

The slug is the filename. Images go under `public/blog-images/<slug>/`.

**Tag taxonomy is closed.** `scripts/validate-blog-tags.js` defines an `ALLOWED_TAGS` set; tags must be lowercase kebab-case and must exist in that set. Reuse existing tags — do not expand `ALLOWED_TAGS` for a new post unless the user explicitly asks. The validator also rejects duplicates and empty values.

## Conventions

- ESLint flat config (`eslint.config.mjs`): React + react-hooks recommended rules, `no-unused-vars` ignores `_`-prefixed identifiers, `react/prop-types` off, `react-hooks/set-state-in-effect` is a warning (and CI runs `--max-warnings 0`, so a warning fails the build).
- Prettier governs formatting; `.prettierignore` and `.prettierrc` are committed. lint-staged runs `eslint --fix` + `prettier --write` on staged `.js/.jsx/.ts/.tsx` and `prettier --write` on `.css/.scss/.html`.
- Import internal modules via `@/...` (e.g. `@/components/GTMPageView`) rather than long relative paths.
- The codebase is plain `.js` with ES modules (`"type": "module"`). Don't introduce TypeScript without asking.
