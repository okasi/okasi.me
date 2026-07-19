# okasi.me

Oka Si's personal homepage and MDX blog, built with Next.js, React, Tailwind CSS, and Fumadocs.

## Setup

Use Node.js 22 or newer and npm.

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`: start the local development server.
- `npm run build`: create the production build.
- `npm run start`: serve the production build.
- `npm run format`: format supported files with Biome.
- `npm run lint`: run Biome checks with warnings treated as failures.
- `npm run typecheck`: run TypeScript without emitting files.
- `npm run test:e2e`: run the Playwright browser suite.
- `npm run check`: run every required validation step.

Blog posts live in `src/content/blog`. Fumadocs generates `.source` during development and builds; do not edit generated files directly. See `AGENTS.md` for the current architecture and maintenance guidance.
