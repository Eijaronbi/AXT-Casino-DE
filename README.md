# AxeBonanza Casino

An educational recreation of the AXE Casino homepage for the AxeBonanza Casino brand, implemented directly in this folder with Next.js App Router, TypeScript, and Tailwind CSS.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production: `npm run build`, then `npm start`.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

## Implementation

- `src/app/page.tsx` composes the homepage as a React Server Component.
- `src/components/casino/content.tsx` renders the header, sidebar, game cards, tournaments, and footer on the server.
- `src/components/casino/interactive.tsx` contains the interactive islands: carousel, horizontal rails, navigation drawer, search, dialogs, and cookie notice.
- `src/data/casino.ts` contains the captured homepage content and game catalog sample.
- `src/app/globals.css` defines the source-derived responsive layout and visual tokens alongside Tailwind.
- `public/reference` contains locally stored images, SVGs, and Montserrat. No source assets are hotlinked at runtime.

Only the requested Next.js, React, TypeScript, Tailwind/PostCSS, and ESLint dependencies are installed. TypeScript 5.9 and ESLint 9 are pinned for compatibility with the installed Next.js ESLint configuration. No component library, authentication, database, analytics, wallet, or payment integration is included.

## Scope

This is a frontend-only multi-page recreation, not an operational casino. It includes the homepage; casino and live-casino listings; category, provider, locale, and game-detail routes; promotions; missions; tournaments; VIP; payments; support; FAQ; company information; and policy pages. Login, registration, password reset, Google sign-in, support, and game launch controls demonstrate local UI states. Forms do not transmit or persist entered information. The cookie notice stores only its dismissal preference in local storage.

Game search uses the captured sample catalog rather than the reference site's complete inventory. Winners and tournament values are captured examples rather than live feeds. Navigation outside the recreated homepage opens the original destination in a new tab. The language dialog demonstrates selection; translated pages are outside this build.

Source icons that could not be downloaded were replaced with local Bootstrap Icons SVGs; the exact sources are recorded in `reference/assets.json`. Provider names are displayed as text in the search results. A short educational-recreation note is added to the footer, and search indexing is disabled. These are documented differences from the live site.

## Reference assets

The source was inspected at https://www.axecasino.com/ on September 21–22, 2026. `reference/assets.json` records asset provenance; `reference/source.css` preserves the captured stylesheet for comparison. The scripts in `scripts/` document one-off collection from browser-exported bundles and are not required to build or run the site.

AXE Casino, provider trademarks, and game artwork belong to their respective owners. Reference assets are retained for the requested educational exercise; obtain the relevant permissions before publishing or reusing them commercially. Bootstrap Icons are MIT licensed. Montserrat is distributed under the SIL Open Font License.

See `design-qa.md` for browser verification status and remaining visual differences.
