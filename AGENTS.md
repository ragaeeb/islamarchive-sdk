# Agent Guidelines

## Scope
These instructions apply to the entire repository.

## Repository overview
### Key modules
- **Public surface (`src/index.ts`):** Exposes the SDK helpers (`getBook`, `getBookmarks`, `getPage`). These are the only exported functions. Keep transformations here small and deterministic, and guard inputs with descriptive errors.
- **HTTP layer (`src/api.ts`):** Hosts the low-level wrappers around the islamarchive REST endpoints (currently `getBookPage` and `getBookTree`). All network requests and query parameters belong in this file so the public helpers can stay pure.
- **Shared types (`src/types.ts`):** Central place for REST payload definitions and the refined SDK types. Extend these definitions instead of sprinkling inline object literals.
- **Tests (`src/*.test.ts`):** Bun-powered suites colocated with the modules they cover. `src/index.test.ts` fully mocks `fetch`; `src/api.test.ts` verifies URL construction. Keep any new tests alongside their subjects.

### Supporting files
| Path | Purpose |
| --- | --- |
| `tsdown.config.ts` | Source of truth for bundling + `.d.ts` generation. The config targets Node 20 ESM, uses minification, cleans `dist/`, and emits declarations. |
| `tsconfig.json` | Declaration-only TypeScript config invoked by tsdown. |
| `biome.json` | Formatting/linting defaults (4-space indentation, 120-char lines). Uses the latest schema URL. |
| `bun.lock` | Captures the dependency graph for Bun. Never edit by hand—regenerate with `bun install`/`bun update`. |
| `package.json` | Script entry points (`build`, `test`, `lint`) and dependency manifest. Scripts are expected to run the toolchain directly—do not create `scripts/*` helpers. |
| `README.md` | Describes features, usage, and the developer workflow table. Update it whenever the public API or tooling changes. |
| `AGENTS.md` | This document. Expand it whenever you add new conventions or top-level directories. |
| `release.config.mjs` | Semantic Release configuration. |
| `LICENSE.MD` | MIT license text. |

## Tooling
- **Dependency management:** Run `bun install` after editing `package.json`. When instructed to upgrade, use `bun update --latest` so Bun refreshes `bun.lock` too. Mention any network failures in your summary.
- **Builds:** `bun run build` removes `dist/` and invokes `tsdown` through `bun x tsdown`, ensuring the CLI and the `tsdown.config.ts` settings stay authoritative. No fallback scripts are allowed.
- **Tests:** `bun run test` (alias for `bun test`) runs every suite in `src/*.test.ts`. Keep tests hermetic by mocking `fetch` unless you explicitly need a live API call.
- **Linting/formatting:** `bun run lint` executes `bun x biome check .` with the repo `biome.json`. Fix any reported issues before committing.
- **Docs reference:** When you need to confirm `tsdown` behaviour, use the official site (`https://tsdown.dev/llms.txt` or `/llms-full.txt`) as the source of truth for CLI/config options.

## Coding conventions
- Maintain 4-space indentation, LF endings, and 120-character max lines (Biome enforces this).
- Every exported helper and HTTP wrapper must include up-to-date JSDoc covering params, returns, and thrown errors.
- Prefer descriptive parameter names (`bookId`, `pageId`) over single letters. Convert string IDs from the API to numbers before exposing them publicly.
- Keep helpers pure: no I/O, no global mutation, and no reliance on environment variables. All network access flows through `src/api.ts`.
- Validate inputs early and throw `Error` objects with actionable messages if a consumer misuses an API.
- Whenever you touch runtime behaviour, update or add matching unit tests plus README documentation.
- Document any new config flags (tsdown, tsconfig, biome, semantic-release) directly in this file and the README project layout table.

## Development workflow
1. Ensure Bun ≥ 1.2.14 is installed (matches `package.json#engines`).
2. Install or update dependencies with `bun install` (or `bun update --latest` when upgrading).
3. Implement changes inside `src/`, updating shared types or configs as needed.
4. Run `bun run lint`, `bun run test`, and `bun run build`—in that order—to keep formatting, correctness, and bundle output in sync.
5. Update `README.md`, `AGENTS.md`, and any relevant config tables when you change tooling, commands, or exported helpers.
6. Commit logically grouped changes with descriptive messages and include the command output you ran in your PR body.

## Contribution tips
- When adding an endpoint, start by writing API-level tests that assert the request URL/query params. Follow up with higher-level tests for the public helper that transforms the data.
- Avoid reformatting unrelated code. If Biome needs to touch multiple files, mention it in your summary.
- Keep `dist/` out of git. Always regenerate via `bun run build` rather than manually editing compiled output.
- If you add tooling (e.g., additional tsdown options), link to the relevant section of the tsdown docs in your commit/PR summary so reviewers can trace the rationale.
