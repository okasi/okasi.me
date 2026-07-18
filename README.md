# Oka Si - Personal Website

Welcome to the personal website and blog of **Okan** (Oka Si). This project serves as a portfolio, a blog, and a playground for modern web development technologies.

## Tech Stack

This project is built using:
- **[Next.js](https://nextjs.org/)** - React framework for server-side rendering and static site generation.
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development.
- **[Fumadocs](https://fumadocs.vercel.app/)** - Documentation and blog framework for Next.js.
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter for JavaScript/TypeScript.
- **[TypeScript](https://www.typescriptlang.org/)** - Strongly typed programming language.

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (preferably via `nvm` to match the project's node version) along with `npm` or `pnpm`.

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Development

To start the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the application for production.
- `npm run start` - Starts the production server.
- `npm run format` - Formats the codebase using Biome.
- `npm run lint` - Lints the codebase using Biome.

## Code Quality

This repository uses **Biome** to ensure code consistency and maintainability, drastically reducing technical debt.
A Git hook is configured using `simple-git-hooks` and `lint-staged` to automatically format all files prior to any commits.

## License

This project is open-source and available under the [MIT License](LICENSE).
