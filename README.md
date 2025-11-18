# islamarchive-sdk

[![wakatime](https://wakatime.com/badge/user/a0b906ce-b8e7-4463-8bce-383238df6d4b/project/57c9dece-28ca-4558-8df4-607c87d2b610.svg)](https://wakatime.com/badge/user/a0b906ce-b8e7-4463-8bce-383238df6d4b/project/57c9dece-28ca-4558-8df4-607c87d2b610)
[![Node.js CI](https://github.com/ragaeeb/islamarchive-sdk/actions/workflows/build.yml/badge.svg)](https://github.com/ragaeeb/islamarchive-sdk/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/ragaeeb/islamarchive-sdk/graph/badge.svg?token=A5VAYO2TCT)](https://codecov.io/gh/ragaeeb/islamarchive-sdk)
![GitHub License](https://img.shields.io/github/license/ragaeeb/islamarchive-sdk)
![GitHub Release](https://img.shields.io/github/v/release/ragaeeb/islamarchive-sdk)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label&color=blue)
![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
[![Size](https://deno.bundlejs.com/badge?q=islamarchive-sdk@latest&badge=detailed)](https://bundlejs.com/?q=islamarchive-sdk%40latest)

SDK for interacting with the [islamarchive.cc](https://islamarchive.cc) API using modern TypeScript and Bun tooling.

## Features

- 📚 Fetch detailed metadata for books hosted on islamarchive.
- 📄 Retrieve and normalise individual book pages, including hadith indices when available.
- 🔖 Load the hierarchical bookmark tree for quick navigation.
- 🧪 Comprehensive test coverage for all public helpers and their underlying HTTP utilities.
- 🛠️ Zero-config build powered by `tsdown.config.ts` and the upstream `tsdown` CLI.

## Installation

```bash
bun add islamarchive-sdk
```

## Usage

```ts
import { getBook, getBookmarks, getPage } from 'islamarchive-sdk';

const book = await getBook(2034);
// {
//   id: 2034,
//   name: 'الوجيز في أسباب ونتائج قتل عثمان',
//   firstPageId: 1310008,
//   lastPageId: 1310139
// }

const page = await getPage(1201, 4924708);
// {
//   id: 4924708,
//   index: 2754,
//   title: '58 - باب الوضوء مما غيرت النار',
//   text: '...'
// }

const bookmarks = await getBookmarks(33022);
// [
//   { id: '5086294_33022', link: '1_5086294', text: 'مجموعة فتاوى ومؤيدات للكتاب' },
//   ...
// ]
```

All helpers perform type-safe conversions so that you interact with the API using numeric identifiers while still receiving rich string metadata.

## Project layout

| Path | Purpose |
| --- | --- |
| `src/api.ts` | Low-level HTTP helpers that mirror the islamarchive endpoints. |
| `src/index.ts` | Public SDK surface that normalises payloads into ergonomic structures. |
| `src/*.test.ts` | Bun-powered unit tests; the index tests are fully mocked to avoid hitting the API. |
| `tsdown.config.ts` | Source of truth for the bundle/dts options when the official CLI is available. |

## Development

| Command | Description |
| --- | --- |
| `bun run build` | Runs the official `tsdown` command defined in `tsdown.config.ts`. |
| `bun run test` | Alias for `bun test`, ensuring Bun executes all colocated unit tests. |
| `bun run lint` | Executes Biome with this repository's configuration. |

All commands rely on the checked-in configs, so every contributor sees identical output as long as they install the dependencies with `bun install`.

## License

`islamarchive-sdk` is released under the MIT License. See the [LICENSE.MD](./LICENSE.MD) file for more details.

## Author

Ragaeeb Haq

---

Built with TypeScript and Bun. Uses the ECMAScript module format.
