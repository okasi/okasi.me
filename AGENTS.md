# AGENTS.md

## Overview

okasi.me is a Next.js App Router site with a static homepage and an MDX blog. Tailwind CSS provides styling, Fumadocs builds the blog tree and search index, and Playwright verifies user flows.

## Structure

- `src/app/layout.tsx`: global metadata, Inter font, and idle favicon/screensaver effects.
- `src/app/(home)/page.tsx`: server-rendered homepage content.
- `src/components/home/`: the client-only starfield and pointer crosshair.
- `src/components/social-links.tsx`: shared social URLs and SVG icons.
- `src/app/blog/`: Fumadocs layout, theme/search provider, index, and post route.
- `src/lib/blog-source.ts`: generated MDX source loader and shared date formatting.
- `src/content/blog/`: blog metadata and MDX posts.
- `src/app/api/search/route.ts`: Fumadocs search endpoint.
- `tests/e2e/site.spec.ts`: homepage, idle mode, blog, search, theme, responsive, redirect, asset, and failure-path coverage.

## Data Flow

1. `source.config.ts` defines the blog schema.
2. Fumadocs generates `.source` from `src/content/blog`.
3. `blogSource` feeds the blog page tree, post routes, static params, and search endpoint.
4. Server components render content; only browser API effects cross a `"use client"` boundary.

## Development

Use Node.js 22 or newer and npm.

```bash
npm install
npm run dev
npm run check
```

Do not edit `.source`, `.next`, or `*.tsbuildinfo`; they are generated. `npm run check` is the required final validation: lint, type checking, production build, and Playwright.

## Guidance

- Keep content and layout server-rendered unless a browser API requires a client component.
- Reuse `socialLinks` and `SocialIcon`; do not duplicate social metadata.
- Let Fumadocs and `next-themes` own blog search, sidebar, and theme state.
- Keep component and route-adjacent filenames lowercase and descriptive.
- Put static metadata images under `src/app` and imported content images under `src/assets`.
- Preserve `/blog/ssg-with-sveltekit` as a redirect when changing blog routing.
- Extend the existing end-to-end suite when changing visible behavior or interaction paths.
