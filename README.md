# AXT Casino — Deutsche Version

German-market front end for the AXT Casino brand, implemented directly in this folder with Next.js App Router, TypeScript, and Tailwind CSS. Localized end-to-end against the live DE reference experience, with `<html lang="de">` throughout.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production: `npm run build`, then `npm start`.

Copy `.env.example` to `.env` and set `NEXT_PUBLIC_GA_ID` to enable analytics.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

## Implementation

- `src/app/page.tsx` composes the homepage as a React Server Component.
- `src/components/casino/content.tsx` renders the header, sidebar, game cards, tournaments, and footer on the server — fully translated (navigation, categories, promotions, legal groups).
- `src/components/casino/interactive.tsx` contains the interactive islands: carousel, horizontal rails, navigation drawer, German search, auth dialogs, and cookie notice.
- `src/data/casino.ts` holds the German footer groups, localized category titles, filters, and promotions.
- `src/data/pages.ts` holds the localized legal and info content (Über uns, FAQ, Bonusbedingungen, Datenschutz, AGB).
- `src/app/layout.tsx` sets the DE metadata, analytics placeholder (`NEXT_PUBLIC_GA_ID`), and declares German as the default locale — visitors land on native copy and may translate freely.
- `public/reference/cdn/i/flags/square/de.svg` adds the missing DE flag to the existing locale-asset pipeline.
- `public/reference` contains locally stored images, SVGs, and Montserrat. No source assets are hotlinked at runtime.

Only Next.js, React, TypeScript, Tailwind/PostCSS, and ESLint dependencies are installed. No component library, authentication backend, database, wallet, or payment integration is included.

## Scope

This is a frontend-only German market adaptation. It includes the homepage; casino and live-casino listings; category, provider, locale (`/de/…`), and game-detail routes; promotions; missions; tournaments; VIP; payments; support; FAQ; company information; and policy pages. All entry points — header, hero, game cards, winner cards, mobile nav, inner pages — route to the operator's account pages as native links with secure outbound attributes. Forms demonstrate local UI states. The cookie notice stores only its dismissal preference in local storage.

Game search uses the sample catalog rather than the complete inventory. Winners and tournament values are captured examples rather than live feeds. The language dialog demonstrates selection across locales. A short recreation note is added to the footer, and search indexing is disabled.

## Reference assets

The DE experience at https://www.axecasino.com/de/ served as the visual and structural reference for this localization. All runtime imagery is bundled locally under `public/reference`.

Game artwork, provider trademarks, and brand assets belong to their respective owners. Obtain the relevant permissions before publishing or reusing them commercially. Bootstrap Icons are MIT licensed. Montserrat is distributed under the SIL Open Font License.
