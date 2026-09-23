import { readFile, writeFile, mkdir, copyFile, access } from 'node:fs/promises';
import path from 'node:path';
const root = 'C:/Users/MARKFR~1/AppData/Local/Temp/browser-use/assets/188d4c19-017f-418b-a967-1dc9a87aa675';
const manifest = JSON.parse(await readFile(path.join(root,'manifest.json'),'utf8'));
const inventory = JSON.parse(await readFile('reference/assets.json','utf8'));
for (const a of manifest.assets) {
  const u = new URL(a.url);
  if (a.kind !== 'image' || !['www.axecasino.com','cdn.a8r.games'].includes(u.hostname)) continue;
  const local = '/reference/' + (u.hostname === 'cdn.a8r.games' ? 'cdn' : 'site') + u.pathname;
  await mkdir(path.dirname('public'+local), {recursive:true});
  await copyFile(a.path,'public'+local);
  if (!inventory.some(e=>e.source===a.url)) inventory.push({source:a.url,local});
}
const substitutions = { search:'search', chevronDown:'chevron-down', arrowRight:'chevron-right', top:'award-fill', slots:'dice-5-fill', axe_original:'lightning-fill', tournamentsTrophy:'trophy-fill', instantwins:'lightning-charge-fill', newGames:'stars', bonus_buy:'gift-fill', jackpot:'gem', burger:'list', gift:'gift-fill', close:'x-lg' };
await Promise.all(Object.entries(substitutions).map(async ([name, fallback])=>{
 const local = `/reference/site/icons/${name}.svg`;
 try {await access('public'+local);return;} catch {}
 let url=`https://www.axecasino.com/icons/${name}.svg`;
 let r=await fetch(url,{signal:AbortSignal.timeout(20000)}).catch(()=>null);
 if(!r?.ok){url=`https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/icons/${fallback}.svg`;r=await fetch(url,{signal:AbortSignal.timeout(30000)});}
 if(!r.ok) throw new Error(`${url}: ${r.status}`);
 await writeFile('public'+local,Buffer.from(await r.arrayBuffer())); inventory.push({source:url,local});
}));
for (const name of ['login-image.webp','cms/promotion-cms/welcome_first_notification.webp','cms/promotion-cms/promotions_hero.webp','cms/missions/hero.webp','cms/vip/vip_page_background.webp','cms/about/about_us_background.webp']) {
 const url='https://www.axecasino.com/'+name;
 const r=await fetch(url,{signal:AbortSignal.timeout(30000)});
 if(r.ok){const local='/reference/site/'+name;await mkdir(path.dirname('public'+local),{recursive:true});await writeFile('public'+local,Buffer.from(await r.arrayBuffer()));inventory.push({source:url,local});}else console.log('Unavailable',url,r.status);
}
await writeFile('reference/assets.json',JSON.stringify(inventory,null,2));
console.log('Saved',inventory.length,'assets');
