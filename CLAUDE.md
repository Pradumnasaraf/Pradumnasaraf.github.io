# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal site at `pradumnasaraf.dev` — Next.js 16 (App Router) + Tailwind CSS v4, JavaScript (no TypeScript). Blog posts are file-based Markdown in `src/content/blog/`. Node `>=24` is required.

Path alias: `@/*` resolves to `./src/*` (see `jsconfig.json`). **Caveat:** the alias is resolved by Next.js at compile time only. Files imported by `node --test` (anything reachable from `tests/**`, which includes `src/proxy.js`, every `src/app/**/route.js`, and modules under `src/lib/`) must use relative imports. Files used exclusively by Next.js (pages, layouts, components, metadata) can use `@/`.

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

The HTML transformation is exposed separately as `processMarkdown(content)` — a pure function that takes a markdown string and returns the sanitized/highlighted HTML. Use it for testing the pipeline without writing fixture files into `src/content/blog/` (test temp files there would be picked up by `validate:tags`/`validate:images`).

**Site constants (`src/lib/constants.js`).** Exports `SITE_URL`, `BLOG_SUBDOMAIN_HOST`, `OG_IMAGE_URL`, `TWITTER_HANDLE`, `GTM_ID`. Used by every metadata file, route handler, the proxy, the layout (GTM tags, JSON-LD), and the blog post page. **Never hardcode any of these** — a rebrand or analytics swap should be a single-file edit.

**Tailwind CSS v4.** Imported once globally via `@import 'tailwindcss'` in `src/app/globals.css` (which is loaded from `layout.js`). There is no `tailwind.config.mjs`; design tokens live in a `@theme` block at the top of `globals.css`:

- `--color-surface` (`#ffffff`)
- `--color-fg` (`#1a1a1a`)
- `--color-fg-secondary` (`#333333`)
- `--color-fg-muted` (`#666666`)
- `--color-fg-strong` (`#000000`)

v4 makes each token available both as a CSS variable (`var(--color-fg)`) and as a Tailwind utility (`text-fg`, `bg-surface`, etc.). Per-route `style.css` files use the variables; JSX can use either. `src/app/blog/style.css` keeps its own (dark-mode-aware) palette and is not part of this token system.

**Container-query foundation.** Three grid wrappers declare `container-type: inline-size` and a `container-name`: `.blog-container` (parent of `.blog-posts`), `.blog-post-footer-content` (parent of `.related-posts-grid`), `.toolkit-container` (parent of `.toolkit-grid`). The existing `@media` rules are deliberately viewport-driven and were left intact; new responsive rules on these grids can use `@container (name <op> ...)` queries.

**Redirects.** Persistent route redirects (`/monitoring`, `/newsletter`, `/getcv`, `/services*`, `/camera`) live in `next.config.mjs` `redirects()`. Host-based subdomain redirects live in `src/proxy.js`. Pick the right layer when adding a new one.

**Releases.** `.github/workflows/releases.yml` runs `conventional-changelog-action` on every push to `main`, bumps `package.json` + `package-lock.json`, and cuts a GitHub release. Commit messages **must** follow Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, …). Major version bumps require a `!` after the type (e.g. `chore!:`) or a `BREAKING CHANGE:` footer somewhere in the commit range — otherwise even a Tailwind major upgrade will only bump as minor/patch.

## Page-local data sources

These pages are data-driven. Edit the data file, not the component:

- `src/app/projects/projects.json` — projects grid (curated; newest featured near the top). Each entry: `id`, `name`, `stars` (cached), `repoUrl`, `url` (live/package link; falls back to the repo), `problem` (description), `technologies` (array). **Whenever touching this file, always:** (1) refresh **all** `stars` to live counts, and (2) check GitHub for new repos worth featuring — the list is curated, so surface candidates and let the user pick which to add, don't auto-add. Use `gh` (authed as `Pradumnasaraf`):
  ```sh
  # live stars + metadata for every source repo:
  gh repo list Pradumnasaraf --source --limit 200 --json name,stargazerCount,description,primaryLanguage,homepageUrl
  # then match each existing entry by repoUrl basename (case-insensitive) and overwrite `stars`.
  ```
- `src/app/timeline/timeline.json` — career timeline, ordered newest-first (add a new milestone at the top, in date order). Each entry: `title`, `date` (e.g. `"July, 2026"`), `description` (first-person, plain, no marketing fluff — match the surrounding entries), `image` (`{ src, alt }`), and optional `link` (`{ href, ariaLabel }`); entries without a `link` render no source button. Logos live in `public/timeline-logo/` and render in a fixed 45×45 rounded box, so square logos look best. The staggered fade-in delay is computed inline in `page.js` from the entry index and `LINE_DURATION` (which must stay equal to the `moveline` animation duration in `style.css`), spreading the stagger across the line's draw time so the last card lands as the line finishes. This scales automatically with any number of entries — **do not** re-introduce per-entry `.container:nth-child(n)` delay rules. When updating the timeline, **ask the user for new achievements** (talks, awards, features, milestones) — these aren't derivable from the repo and usually come from the user's LinkedIn/X.
- `src/app/speaking/speaking.json` — speaking entries. Talks with a `recording` URL automatically appear in `sitemap-videos.xml` (the route handler parses YouTube IDs from any common URL shape and derives a publication date from the `date` string).
- `src/app/photography/images.json` — gallery image list (Google Drive thumbnail URLs).
- `src/app/travel/travel.json` — places plotted on the interactive 3D globe (`cobe`) plus the SSR fallback list. Each entry: `id`, `place`, `country`, `flag`, `date`, `note`, `photo`, `lat`, `lng`. Conventions: an entry only becomes a globe marker if both `lat` and `lng` are numbers (others still show in the screen-reader list); `place` may carry the region inline (e.g. `"Mumbai, Maharashtra"`); leave `country` empty when the `flag` already conveys it (the callout reads `place` then `, country` only if set). The globe (`Globe.js`) auto-rotates with delta-time easing, pauses on hover/touch with a grace period, runs an ambient "spotlight" that highlights a random front-facing place, and latches the callout on tap for touch devices — animation/timing knobs are the constants at the top of `Globe.js` and its effect.
- `src/app/sitemap/data.js` — static-page list driving both `/sitemap` (UI) and `sitemap.xml` (XML). A `lastmod` field per entry is optional; falls back to the current build date.

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

**Canonical rule.** `rss.xml` and `sitemap.xml` include a post only if `canonical` is unset or starts with `SITE_URL`. A cross-posted article whose canonical points elsewhere (dev.to, hashnode, etc.) is intentionally hidden from the on-site feeds.

**Tag taxonomy is closed.** `scripts/validate-blog-tags.js` defines an `ALLOWED_TAGS` set; tags must be lowercase kebab-case and must exist in that set. Reuse existing tags — do not expand `ALLOWED_TAGS` for a new post unless the user explicitly asks. The validator also rejects duplicates and empty values.

## Conventions

- ESLint flat config (`eslint.config.mjs`): React + react-hooks recommended rules, `no-unused-vars` ignores `_`-prefixed identifiers, `react/prop-types` off, `react-hooks/set-state-in-effect` is a warning (and CI runs `--max-warnings 0`, so a warning fails the build).
- Prettier governs formatting; `.prettierignore` and `.prettierrc` are committed. lint-staged runs `eslint --fix` + `prettier --write` on staged `.js/.jsx/.ts/.tsx` and `prettier --write` on `.css/.scss/.html`.
- Import internal modules via `@/...` for files compiled by Next.js. Use relative paths for anything reachable from `tests/**` (see the alias caveat in "Project overview").
- The codebase is plain `.js` with ES modules (`"type": "module"`). Don't introduce TypeScript without asking.
- `eslint-plugin-react`'s peer-deps cap ESLint at `^9.7`, so ESLint v10 is intentionally not upgraded. Revisit when the plugin ships v10 support.
- Keep comments minimal. Don't add comments that restate what the code already says; comment only non-obvious intent or cross-file coupling (e.g. a magic number that must match a value in another file).
- **Icons** come from `react-icons` (`fa`/`si`/`fi` sets). Never guess an export name, verify it exists before using it: `node -e "console.log(typeof require('react-icons/si').SiSwift)"` must log `function`. Tech badges on `/projects` are mapped in `techIconMap` (`projects/page.js`); add new technologies there with a verified icon, otherwise they render a 2-letter text fallback.
- **Links social icons** (`src/app/links/page.js`): each icon is tagged `social-icon-filled` or `social-icon-stroke` via a hardcoded `social.id` list. Filled marks (most `Fa*`/`Si*` brand icons) **must** have their `id` in the filled list, or the stroke CSS (`fill: none`) renders them invisible; outline `Fi*` icons use stroke. When switching an icon's style, update that list too. Display labels are the visitor-facing product name, not the repo slug (no dashes/lowercase).
- **OG images** live in `public/media/` as `<route>-og.png` (1200×630). Each `metadata.js` points `openGraph`/`twitter` at `${SITE_URL}/media/<route>-og.png`; routes without a dedicated image fall back to `OG_IMAGE_URL` (the generic `pradumna-saraf-og.png`). Never point one route at another route's OG image.
- Baseline security headers and `poweredByHeader: false` are set in `next.config.mjs` via `headers()`; `metadataBase` is set on the root metadata (`src/app/metadata.js`), so new metadata can use relative OG/canonical paths instead of hardcoding the origin. There is intentionally **no** CSP yet (would need careful allowlisting for GTM, the Cal.com embed, Google Drive images, and inline scripts).
