import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

// Captured through the browser's pageAssets capability, not guessed asset URLs.
const bundles = ['2808e724-9cda-4e4b-9879-5f076ebc5b87', '03c8cecd-2f68-42e5-b33a-9dc9118dc9e0', 'a1f773c2-c758-48c0-b69f-68a4ea5458ee'];
const bundleRoot = 'C:/Users/MARKFR~1/AppData/Local/Temp/browser-use/assets';
const entries = new Map();
for (const id of bundles) {
  const manifest = JSON.parse(await readFile(path.join(bundleRoot, id, 'manifest.json'), 'utf8'));
  for (const asset of manifest.assets) {
    if (asset.kind !== 'image') continue;
    const url = new URL(asset.url);
    if (!['www.axecasino.com', 'cdn.a8r.games'].includes(url.hostname)) continue;
    const local = '/reference/' + (url.hostname === 'cdn.a8r.games' ? 'cdn' : 'site') + url.pathname;
    const destination = path.join('public', local);
    await mkdir(path.dirname(destination), { recursive: true });
    await copyFile(asset.path, destination);
    entries.set(asset.url, { source: asset.url, local });
  }
}

// These exact paths were observed in the rendered DOM and downloaded CSS.
const icons = ['spade', 'roulette', 'search', 'bell', 'enter', 'createAccount', 'chevronDown', 'telegram', 'instagram', 'arrowRight', 'trophy', 'app', 'hot', 'arrowLeft', 'iconNew', 'top', 'slots', 'axe_original', 'tournamentsTrophy', 'instantwins', 'newGames', 'bonus_buy', 'jackpot', 'burger', 'gift', 'close'];
const urls = [
  ...icons.map(name => `https://www.axecasino.com/icons/${name}.svg`),
  ...['welcome', 'live', 'wins', 'bgaming', 'vip'].map(name => `https://www.axecasino.com/cms/promo/main-banner-${name}-mob.webp`),
  'https://www.axecasino.com/cms/promotion-cms/welcome_first_notification.webp',
  'https://fonts.gstatic.com/s/montserrat/v31/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2',
];
const failures = [];
for (let i=0; i<urls.length; i+=4) {
  await Promise.all(urls.slice(i,i+4).map(async source => {
    if (entries.has(source)) return;
    try {
      const url = new URL(source);
      const local = url.hostname === 'fonts.gstatic.com' ? '/reference/fonts/montserrat-latin.woff2' : '/reference/site' + url.pathname;
      const response = await fetch(source, { signal: AbortSignal.timeout(60000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const destination = path.join('public', local);
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, Buffer.from(await response.arrayBuffer()));
      entries.set(source, { source, local });
    } catch (error) { failures.push({ source, reason: String(error) }); }
  }));
}
await mkdir('reference', { recursive: true });
await writeFile('reference/assets.json', JSON.stringify([...entries.values()], null, 2));
await copyFile(path.join(bundleRoot, bundles[0], 'ef974cf963e330f6.css'), 'reference/source.css');
console.log(JSON.stringify({ assets: entries.size, failures }, null, 2));
if (failures.length) process.exitCode = 1;
