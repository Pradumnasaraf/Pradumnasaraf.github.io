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

**Blog pipeline (`src/lib/blog.js`).** Reads `src/content/blog/*.md(x)`, parses frontmatter with `gray-matter`, sorts by `date` desc, filters out `draft: true`. Markdown → HTML uses `remark` → `remark-rehype` (with `allowDangerousHtml`) → `rehype-raw` → `rehype-highlight` (explicit language registry — only languages listed in `allLanguages` will highlight; add new ones there) → `rehype-sanitize` (custom schema permits `hljs-*` class names on `code`/`span`/`pre`, and `target`/`rel` on `a`, plus `loading`/`decoding`/`width`/`height` on `img`) → `rehype-stringify`. Reading time = `ceil(words/200)` minutes via `readingStats()`, computed off the raw markdown with code/links/markdown punctuation stripped. Drafts are excluded everywhere, including `getAllPostSlugs()` and `getPostBySlug()` (a draft returns null, so its URL 404s). The post page wraps `getPostBySlug` in React `cache()` so metadata and the page render the markdown once. Post headings start at `##` (the page title is the h1) and step down one level at a time.

The HTML transformation is exposed separately as `processMarkdown(content)` — a pure function that takes a markdown string and returns the sanitized/highlighted HTML. Use it for testing the pipeline without writing fixture files into `src/content/blog/` (test temp files there would be picked up by `validate:tags`/`validate:images`).

**Site constants (`src/lib/constants.js`).** Exports `SITE_URL`, `BLOG_SUBDOMAIN_HOST`, `OG_IMAGE_URL`, `TWITTER_HANDLE`, `GTM_ID`, `SOCIAL` (GitHub, X, LinkedIn URLs) and `EMAIL`. Used by every metadata file, route handler, the proxy, the layout (GTM tags, JSON-LD), and the blog post page. **Never hardcode any of these** — a rebrand or analytics swap should be a single-file edit.

**Tailwind CSS v4.** Imported once globally via `@import 'tailwindcss'` in `src/app/globals.css` (which is loaded from `layout.js`). There is no `tailwind.config.mjs`; design tokens live in a `@theme` block at the top of `globals.css`:

- `--color-surface` (`#ffffff`)
- `--color-fg` (`#1a1a1a`)
- `--color-fg-secondary` (`#333333`)
- `--color-fg-muted` (`#666666`)
- `--color-fg-strong` (`#000000`)

v4 makes each token available both as a CSS variable (`var(--color-fg)`) and as a Tailwind utility (`text-fg`, `bg-surface`, etc.). Per-route `style.css` files use the variables; JSX can use either. `src/app/blog/style.css` keeps its own (dark-mode-aware) palette and is not part of this token system.

**Container-query foundation.** Three grid wrappers declare `container-type: inline-size` and a `container-name`: `.blog-container` (parent of `.blog-posts`), `.blog-post-footer-content` (parent of `.related-posts-grid`), `.toolkit-container` (parent of `.toolkit-grid`; toolkit content lives in `src/app/toolkit/toolkit.json`, ask the user before adding or removing items). The existing `@media` rules are deliberately viewport-driven and were left intact; new responsive rules on these grids can use `@container (name <op> ...)` queries.

**Redirects.** Persistent route redirects (`/monitoring`, `/newsletter`, `/getcv`, `/services*`, `/camera`) live in `next.config.mjs` `redirects()`. Host-based subdomain redirects live in `src/proxy.js`. Pick the right layer when adding a new one.

**Releases.** `.github/workflows/releases.yml` runs `conventional-changelog-action` on every push to `main`, bumps `package.json` + `package-lock.json`, and cuts a GitHub release. Commit messages **must** follow Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, …). Major version bumps require a `!` after the type (e.g. `chore!:`) or a `BREAKING CHANGE:` footer somewhere in the commit range — otherwise even a Tailwind major upgrade will only bump as minor/patch.

## Page-local data sources

These pages are data-driven. Edit the data file, not the component:

- `src/app/projects/projects.json` — projects grid (curated; newest featured near the top). Each entry: `id`, `name`, `category` (`ai` | `learning` | `backend` | `apps`, matching `GROUPS` in `projects/page.js`), optional `featured: true` (shown as large cards at the top, sorted by stars, and left out of their group), `stars` (cached), `repoUrl`, `url` (where the project lives: Marketplace, PyPI, npm, Go package, live site; the card labels it by host, see `destinationLabel`), `problem` (description), `technologies` (array, shown as plain text). **Whenever touching this file, always:** (1) refresh **all** `stars` to live counts, and (2) check GitHub for new repos worth featuring — the list is curated, so surface candidates and let the user pick which to add, don't auto-add. Use `gh` (authed as `Pradumnasaraf`):
  ```sh
  # live stars + metadata for every source repo:
  gh repo list Pradumnasaraf --source --limit 200 --json name,stargazerCount,description,primaryLanguage,homepageUrl
  # then match each existing entry by repoUrl basename (case-insensitive) and overwrite `stars`.
  ```
- `src/app/timeline/timeline.json` — career timeline, ordered newest-first (add a new milestone at the top, in date order). Each entry: `title`, `date` (e.g. `"July, 2026"`), `description` (first-person, plain, no marketing fluff — match the surrounding entries), `image` (`{ src, alt }`), and optional `link` (`{ href, ariaLabel }`); entries without a `link` render no source button. Logos live in `public/timeline-logo/` and render in a fixed 45×45 rounded box, so square logos look best. The staggered fade-in delay is computed inline in `page.js` from the entry index and `LINE_DURATION` (which must stay equal to the `moveline` animation duration in `style.css`), spreading the stagger across the line's draw time so the last card lands as the line finishes. This scales automatically with any number of entries — **do not** re-introduce per-entry `.container:nth-child(n)` delay rules. When updating the timeline, **ask the user for new achievements** (talks, awards, features, milestones) — these aren't derivable from the repo and usually come from the user's LinkedIn/X.
- `src/app/speaking/speaking.json` — speaking entries. Talks with a `recording` URL automatically appear in `sitemap-videos.xml` (the route handler parses YouTube IDs from any common URL shape and derives a publication date from the `date` string).
- `src/app/photography/images.json`: gallery image list. Each entry is `{ src, alt, country? }` where `src` is a Google Drive thumbnail URL (`https://drive.google.com/thumbnail?id=<fileId>&sz=w2500`). Notes for future updates:
  - **Source of truth is a Drive folder** ("Personal Website Images", folder id `14AqocmrFs3lpcx0RN7WsnBg4M_RTFYGW`, owned by the user). The gallery is a curated mirror of that folder, not auto-generated.
  - **Enumerating the folder reliably:** the normal folder web page only ships a partial file list (Google lazy-loads the rest), so do not scrape it. Use the embedded listing instead, which returns every file id plus filename in plain HTML: `curl -sL "https://drive.google.com/embeddedfolderview?id=<folderId>#list"`, then parse `id="entry-<fileId>"` and the `flip-entry-title` filename. This is how the full 90-image sync was reconciled (compare folder ids against the `id=` in each `src`).
  - **Ordering convention (newest first):** camera-original HEIC files (`IMG_####.heic`) go on top, then the older `image##.jpg` set below in its existing order. Within the HEICs, the most recently added photo is pinned first, then the rest by filename number descending. Caveat: the `IMG_####` numbers are **not** reliably chronological (a lower number can be a newer photo), and Drive "date added" is not readable without the API, so true recency has to come from the user; new additions otherwise go to the top.
  - **Country flags:** `country` is an ISO code shown as a small flag on hover (always visible on touch screens) and in the full-screen viewer. Never guess it from the picture. Read the GPS tag from the original file (a ranged request for the first 256 KB of `https://drive.usercontent.google.com/download?id=<fileId>&export=download` holds the EXIF block in these HEICs), match the coordinates to the nearest place in `travel/travel.json` (within about 300 km), and use that place's flag. If no travel place is that close, use the country the coordinates fall in (for example the Paris and Dubai photos). Photos without GPS get no `country` unless the user tags them by hand; `GLOBE` is a special value the user picks for shots with no single country (shown as 🌐 Somewhere, the globe scaled down to match the flags). A new country also needs its name added to `COUNTRY_NAMES` in `photography/page.js` (fixed names, because `Intl.DisplayNames` differs between Node and browsers and breaks hydration).
  - **Grid vs full size:** `src` stays the full-size `sz=w2500` URL (used by the full-screen viewer). The grid swaps it to `sz=w800` through `gridSrc()` in `photography/page.js` (about 8x lighter), and the first row loads eagerly.
  - **Phone photos only:** the gallery is for shots taken on the user's phone. Photos taken on a DSLR or other camera are removed when spotted (the oleander close-up and the smartphone-on-a-ledge sunset were removed for this reason).
  - **Adding photos:** add only the files the user links, not everything new in the Drive folder. Each new one goes in the order the user sends them.
  - **Alt text policy:** never reuse a boilerplate alt (the gallery previously had the same `"Photography by Pradumna Saraf"` on every image, which is bad for screen readers). Write a distinct, honest one-line description per photo by actually viewing it: fetch a lighter copy (`&sz=w800`) and open it with the Read tool. Do not assert specific city, country, landmark, or person names you cannot verify from the image alone; describe generically. No `"image of"`/`"photo of"` prefixes.
  - **Dead Drive files:** an entry whose Drive file was deleted returns a sign-in HTML page from the `thumbnail?id=` endpoint (not an image) and a `404` from `https://drive.google.com/file/d/<id>/view`. Those tiles render broken on the live site. Detect and remove/replace them; do not invent alt text for images you cannot fetch.
  - **Loading:** photos go through `next/image`, so Vercel fetches each one from Drive once, caches it for a month (`images.minimumCacheTTL` in `next.config.mjs`) and serves resized WebP/AVIF copies; visitors never hit Drive directly. The grid asks for the `sz=w800` copy (`gridSrc()`), the viewer for `sz=w2500`. If a tile still fails, `ImageItem` retries up to `MAX_IMAGE_RETRIES` times, then keeps its place and shows a tap-to-retry button so the masonry grid never collapses. Locally the dev server can still be throttled by Drive after many reloads; that is not a production bug.
- `src/app/travel/travel.json` — only places the user actually explored go on the globe; airport transits (for example Paris or Dubai layovers) never get added, even when a photo was taken there. Some entries are regions named by state (`Quintana Roo, Mexico`, `Yucatán, Mexico`) rather than a city; keep them that way. Places plotted on the interactive 3D globe (`cobe`) plus the SSR fallback list. Each entry: `id`, `place`, `country`, `flag`, `date`, `note`, `photo`, `lat`, `lng`. Conventions: an entry only becomes a globe marker if both `lat` and `lng` are numbers (others still show in the screen-reader list); `place` may carry the region inline (e.g. `"Mumbai, Maharashtra"`); leave `country` empty when the `flag` already conveys it (the callout reads `place` then `, country` only if set). The globe (`Globe.js`) auto-rotates with delta-time easing, pauses on hover/touch with a grace period, runs an ambient "spotlight" that highlights a random front-facing place, and latches the callout on tap for touch devices — animation/timing knobs are the constants at the top of `Globe.js` and its effect.
- `src/app/sitemap/data.js` — static-page list driving both `/sitemap` (UI) and `sitemap.xml` (XML). A `lastmod` field per entry is optional; falls back to the current build date.

## Blog content

A post is a single `.md` (or `.mdx`) file under `src/content/blog/` with this frontmatter shape:

```yaml
title: '...'
excerpt: '...'
date: 'YYYY-MM-DD'
author: 'Pradumna Saraf'
category: '...'
tags: ['docker', 'ci-cd', ...] # see ALLOWED_TAGS
thumbnail: '/blog-images/<slug>/thumbnail.png'
canonical: 'https://...' # optional
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
- `eslint-plugin-react` (`^9.7`) and `eslint-plugin-jsx-a11y` (`^9`) peer-deps both cap ESLint at v9, so ESLint v10 is intentionally not upgraded (even though `eslint-plugin-react-hooks` already allows `^10`). Revisit when both of those plugins ship v10 support.
- Keep comments minimal. Don't add comments that restate what the code already says; comment only non-obvious intent or cross-file coupling (e.g. a magic number that must match a value in another file).
- **Icons** come from `react-icons` (`fa`/`si`/`fi` sets). Never guess an export name, verify it exists before using it: `node -e "console.log(typeof require('react-icons/si').SiSwift)"` must log `function`. Tech badges on `/speaking` are mapped in `techIconMap` (`speaking/page.js`); add new technologies there with a verified icon, otherwise they render a 2-letter text fallback.
- **Links social icons** (`src/app/links/page.js`): each icon is tagged `social-icon-filled` or `social-icon-stroke` via a hardcoded `social.id` list. Filled marks (most `Fa*`/`Si*` brand icons) **must** have their `id` in the filled list, or the stroke CSS (`fill: none`) renders them invisible; outline `Fi*` icons use stroke. When switching an icon's style, update that list too. Display labels are the visitor-facing product name, not the repo slug (no dashes/lowercase).
- **OG images** are generated per route by `opengraph-image.js` files (Next's file convention), all rendered through `renderOg()` in `src/lib/og.js` (League Spartan from `@fontsource/league-spartan`, 1200×630, built at deploy time from the route's own data). Add one next to any new route. `buildMetadata` no longer sets images unless you pass `ogImage`, so don't add static `*-og.png` files. Blog posts keep their own thumbnail as the OG image via `generateMetadata`; `public/media/pradumna-saraf-og.png` (`OG_IMAGE_URL`) stays only as the fallback for posts without a thumbnail and for `sitemap-videos.xml`.
- Baseline security headers and `poweredByHeader: false` are set in `next.config.mjs` via `headers()`; `metadataBase` is set on the root metadata (`src/app/metadata.js`), so new metadata can use relative OG/canonical paths instead of hardcoding the origin. There is intentionally **no** CSP yet (would need careful allowlisting for GTM, the Cal.com embed, Google Drive images, and inline scripts).

## Pages at a glance

- `/` home: server component; only the menu is client-side (`HomeNav`, built from one link list). Hero with social icons, title, one filled and one outline button, photo.
- `/blog`: listing (`BlogPostExplorer`): topic chips (top tags, `HIDDEN_TOP_TAGS` keeps narrower ones like `docker-compose` out), sort select, featured latest post, card grid, load more. Tags display through `tagLabel()`. Dark mode toggle and search (`BlogSearch`) in the top bar.
- `/blog/[slug]`: article with table of contents, reading progress, image lightbox, share buttons, previous/next post links (by date) and Continue Reading (related by shared tags). OG image is the post thumbnail.
- `/blog/tag/[tag]`: listing for one tag, titled with `tagLabel()`.
- `/projects`: featured cards (`featured: true`, sorted by stars) then groups by `category`; each card links where the project lives plus Source.
- `/speaking`: talks grouped by year in card grids, upcoming talk outlined.
- `/timeline`: vertical line with a year marker before each year's first milestone; cards fade in along the line.
- `/photography`: masonry grid (grayscale, colour on hover), country pill per photo, full-screen viewer with tap/click zones, swipe, arrow keys, counter and a once-per-visit hint. The viewer remounts the image per photo (so the previous one never shows under the next counter), shows "Loading photo…" and preloads the neighbours.
- `/travel`: `cobe` globe from `travel.json`.
- `/toolkit`: renders `toolkit.json` (cards for hardware and workspace, chip list for software).
- `/links`: link-in-bio page with social icons and a QR share popup.
- `/cv`, `/contact`, `/chat`: noindex, not in any sitemap. Contact opens a drafted email on load and offers copy and book-a-call; Chat embeds Cal.com with a loading line.
- `/sitemap`: human-readable list from `sitemap/data.js`; `sitemap.xml`, `sitemap-images.xml`, `sitemap-videos.xml`, `sitemap-index.xml` and `rss.xml` are route handlers.

## Settled decisions (do not re-ask)

These were decided with the user. Apply them; don't propose changing them or ask about them again.

- **CV, Contact and Chat stay out of search on purpose.** `/cv`, `/contact` and `/chat` use `robots: 'noindex'` and are deliberately missing from `src/app/sitemap/data.js`, `sitemap.xml` and the `/sitemap` page. Never add them back or flag it as a gap.
- **Keep the current design and polish it.** White background, League Spartan, ink text. No redesigns, no developer-jargon themes (terminal UIs, `docker ps` tables), nothing that looks like a generic AI-built site. No green anywhere in the palette. Never invent personal details (city, pronouns, stats) on a page.
- **Light mode is site-wide; dark mode exists only under `/blog`.** Don't propose site-wide dark mode.
- **Theme toggle animates only the icon** (`BlogThemeToggle.js`: the moon's shadow slides off and rays rotate in). No full-page or View Transition effects.
- **Timeline keeps its vertical line.** Projects is featured cards plus themed groups; Speaking is grouped by year. Don't switch these back.
- **Shared helpers:** social links and email (`SOCIAL`, `EMAIL` in `src/lib/constants.js`), page titles (`.page-header`, `.page-title`, `.page-subtitle` in `globals.css`), post dates (`formatPostDate`) and tag names (`tagLabel`) in `src/lib/blog-utils.js`, copy to clipboard (`src/lib/clipboard.js`), XML escaping (`src/lib/xml.js`), the back arrow (`BackArrowIcon`). Reuse these instead of writing new copies.
- **Toolkit:** content lives in `src/app/toolkit/toolkit.json`. Apply only the edits the user asks for. Any other addition or removal is a question first.
- **Every UI change must work on phones** and is checked at phone width before it is called done.
- **No easter eggs or games.** The Konami game was removed on purpose; don't add one back.
- **Polish work is not a breaking change.** Don't mark it with `!` or `BREAKING CHANGE`, and don't name branches after a major version.
- **Ask before pushing.** Work on a local branch; push or open a PR only when the user says so.

## UI patterns

Reuse these instead of inventing new styles.

- **Tokens** (in `globals.css` `@theme`): `--color-border` (#dcdcdc) for button and control borders, `--color-border-subtle` (#ececec) for card borders and dividers, `--color-hover` (#f7f7f7) for hover backgrounds.
- **Buttons and pills share one geometry.** The `:root .connect, :root .project-link, …` and `:root .blog-topic-chip, …` blocks at the end of `globals.css` set size, padding, font, border width and radius for every button and pill on the site; page CSS sets only colours. Add any new button or pill class to those lists instead of giving it its own padding. Colours: secondary = 1px `--color-border`, hover border `--color-fg` and background `--color-hover`; primary = filled `--color-fg` with white text, hover `#000`. No `translateY` hover lifts, no `transition: all`, no thick black outlines that flip to black on hover.
- **Page header:** use `<header className="page-header">` with `h1.page-title` and an optional `p.page-subtitle` (styles in `globals.css`; add `page-header-tight` for less space below). Don't write per-page title CSS.
- **Section heading:** `h2` at 1.5rem, weight 400, with a 1px `--color-border-subtle` bottom border.
- **Card grid:** `grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr))`, cards with a 1px subtle border, 14px radius, and a soft shadow on hover.
- **Centre text in pills by eye, not by equal padding.** League Spartan draws its letters high in the line box, so a pill or select with equal top and bottom padding shows extra space under the text. Use `line-height: 1` with slightly more top padding than bottom (for example `0.42rem 0.7rem 0.3rem`), and check the result zoomed in.
- **Spacing in page CSS, not Tailwind utilities.** The unlayered `* { padding: 0; margin: 0 }` reset in `globals.css` overrides Tailwind v4 spacing utilities (`p-*`, `m-*`, `mx-auto`), which is why the old sitemap rendered with no padding. Put layout spacing in the route's `style.css`.
- **Never read `public/` from server code at request time.** `next.config.mjs` excludes `public/` from function bundles (it used to fill Vercel's 10 GB Function Storage). Assets a server route needs go in `src/assets/` (for example `og-avatar.png` for OG images).

## Checking UI changes

The Chrome extension is often not connected, so check pages with headless Chrome against the dev server. Plain `--window-size` clamps below about 500px wide, so emulate phones through the DevTools protocol (`Emulation.setDeviceMetricsOverride` at 390x844, `mobile: true`). Also confirm `document.documentElement.scrollWidth <= innerWidth`, so nothing scrolls sideways.

For refactors that should not change the look, screenshot every page at 1440 and 390 wide before and after (disable animations, hide Drive photos and the Cal.com iframe, which vary between runs) and diff them pixel by pixel. Only the intended pages should differ. To check text is centred in a pill, zoom into it (6x clip) with text rendered black on white and measure the blank rows above and below the letters.
