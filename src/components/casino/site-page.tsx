import Image from 'next/image';
import Link from 'next/link';
import { ActionButton, CasinoUI } from './interactive';
import { Filters, Footer, Header, MobileNavigation, Sidebar } from './content';
import { allGames, categories, gameImage, siteAsset, type Game } from '@/data/casino';
import { infoPages, pageTitles } from '@/data/pages';

const pretty = (value: string) => decodeURIComponent(value).replace(/([a-z])([A-Z])/g,'$1 $2').replaceAll('_', ' ').replaceAll('-', ' ').replace(/\b\w/g, letter => letter.toUpperCase());

function Shell({ children }: { children: React.ReactNode }) {
  return <CasinoUI><Header/><Sidebar/><main id="main-content" className="main-content inner-main">{children}<Footer/></main><MobileNavigation/></CasinoUI>;
}

function PageHero({ title, eyebrow, image, children }: { title: string; eyebrow?: string; image?: string; children?: React.ReactNode }) {
  return <section className="inner-hero">{image&&<Image src={image} alt="" fill priority unoptimized sizes="(max-width: 833px) 100vw, 80vw"/>}<div className="inner-hero-shade"/><div className="inner-hero-copy">{eyebrow&&<span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1>{children}</div></section>;
}

function GridCard({ game }: { game: Game }) {
  return <article className="library-card"><Link href={`/de/game/${game.id}`}><Image src={gameImage(game)} alt={game.name} width={220} height={293} unoptimized/><span className="library-card-copy"><strong>{game.name}</strong><small>{game.provider}</small></span></Link><div className="library-card-action"><ActionButton action="login" className="button green">Jetzt Spielen</ActionButton></div></article>;
}

function GameLibrary({ title, games = allGames }: { title: string; games?: Game[] }) {
  return <><PageHero title={title} eyebrow="AXT Casino" image={siteAsset('cms/promo/main-banner-live.webp')}><p>Entdecke die neuesten Titel und finde einen neuen Favoriten.</p></PageHero><div className="inner-content"><Filters/><div className="library-heading"><h2>{title}</h2><span>{games.length} Top-Spiele</span></div><div className="game-library">{games.map(game=><GridCard key={game.id} game={game}/>)}</div></div></>;
}

function PromotionsPage() {
  const cards=[{title:'Willkommenspaket',text:'Bis zu 3.750 EUR + 200 Freispiele',image:'cms/promo/main-banner-welcome.webp'},{title:'Täglicher Bonus',text:'Komm jeden Tag zurück für mehr Belohnungen',image:'cms/promo/main-banner-wins.webp'}];
  return <><PageHero title="Aktionen" eyebrow="Belohnungen" image={siteAsset('cms/promo/main-banner-welcome.webp')}><p>Entdecke aktuelle AXT Casino-Angebote.</p></PageHero><div className="inner-content promo-grid">{cards.map(card=><article className="promo-card" key={card.title}><Image src={siteAsset(card.image)} alt="" fill unoptimized sizes="(max-width: 767px) 100vw, 50vw"/><div><span className="eyebrow">Aktion</span><h2>{card.title}</h2><p>{card.text}</p><ActionButton action="signup" className="button green">Angebot sichern</ActionButton></div></article>)}</div></>;
}

function MissionsPage() {
  const features=['Starte deine erste Quest','Spiele Minispiele','Täglich frische Aufgaben','Besuche den In-Game-Shop','Steige schneller mit Missionen auf','Erreiche höhere Ränge'];
  return <><PageHero title="Starte deine große Reise in die Welt der Spiele" eyebrow="Missionen" image={siteAsset('cms/promo/main-banner-bgaming.webp')}><ActionButton action="signup" className="button green">Starte deine erste Quest</ActionButton></PageHero><div className="inner-content"><section className="mission-intro"><h2>Wozu brauchst du das?</h2><p>Erfülle Quests, sammle Erfahrung, schalte Level frei und entdecke Belohnungen im AXT Casino-Missions-Erlebnis.</p></section><div className="feature-grid">{features.map((title,index)=><article key={title}><span>{String(index+1).padStart(2,'0')}</span><h3>{title}</h3><p>Weiterspielen, Ziel erfüllen und Fortschritt im Missions-Dashboard verfolgen.</p></article>)}</div><section className="split-callout"><div><span className="eyebrow">Missionskategorien</span><h2>Frische Wege zum Fortschritt</h2><p>Tägliche Aktivitäten und längere Reisen machen es leicht, dein nächstes Ziel zu wählen.</p></div><div><span className="eyebrow">In-Game-Shop</span><h2>Freispiele und Cash-Boni</h2><p>Nutze verdiente Belohnungen, um neue Vorteile freizuschalten, während dein Level steigt.</p></div></section></div></>;
}

function TournamentPage() {
  const items=[{title:'Drops & Wins',prize:'12.000.000 EUR',image:'cms/tournaments/lady.webp'},{title:'Wöchentliches BGaming-Turnier',prize:'875 EUR + 800 FS',image:'cms/tournaments/tournament_bgaming.webp'},{title:'Tägliches Freispiel-Turnier',prize:'1210 FS',image:'cms/tournaments/tournament_daily.webp'}];
  return <><PageHero title="Turniere" eyebrow="Kämpfe um große Gewinne" image={siteAsset('cms/tournaments/lady.webp')}/><div className="inner-content tournament-list">{items.map(item=><article key={item.title}><Image src={siteAsset(item.image)} alt="" fill unoptimized sizes="(max-width: 767px) 100vw, 33vw"/><div><span className="eyebrow">Turnier</span><h2>{item.title}</h2><small>Preispool</small><strong>{item.prize}</strong><ActionButton action="signup" className="button green">Jetzt teilnehmen</ActionButton></div></article>)}</div></>;
}

function VipPage() {
  const levels=['Bronze','Silber','Gold','Platin','Diamant'];
  return <><PageHero title="Willkommen im AXT Casino VIP" eyebrow="VIP" image={siteAsset('cms/promo/main-banner-vip.webp')}><p>Schalte persönliche Belohnungen und bessere Vorteile frei, während du in den Levels aufsteigst.</p><ActionButton action="signup" className="button green">VIP werden</ActionButton></PageHero><div className="inner-content"><h2 className="content-title">VIP-Level</h2><div className="vip-levels">{levels.map((level,index)=><article key={level}><span>{index+1}</span><h3>{level}</h3><p>Level-Belohnungen</p><strong>{index*5+5}%</strong></article>)}</div><section className="article-panel"><h2>Alle VIP-Vorteile</h2><p>Exklusive Angebote, wöchentliche Belohnungen, persönlicher Support, schnellerer Fortschritt und levelbasierte Boni in einem einfachen Treue-Erlebnis.</p><ActionButton action="support" className="button primary">Noch Fragen?</ActionButton></section></div></>;
}

function PaymentsPage() {
  const methods=['visa','mastercard','maestro','bankTransfer','interac','bitcoin','ethereumCpp','litecoin','xrpCpp','usdcCpp','dogecoin'];
  return <><PageHero title="Zahlungen" eyebrow="Kasse"><p>Zahlungsmethoden und Abwicklungsinformationen durchsuchen.</p></PageHero><div className="inner-content payment-grid">{methods.map(name=><article key={name}><Image src={siteAsset(`cms/payments/icons/${name}.svg`)} width={88} height={48} alt="" unoptimized/><h2>{pretty(name.replace('Cpp',''))}</h2><dl><div><dt>Einzahlung</dt><dd>Sofort</dd></div><div><dt>Auszahlung</dt><dd>Bis zu 24h</dd></div><div><dt>Gebühr</dt><dd>0%</dd></div></dl><ActionButton action="login" className="button secondary">Weiter</ActionButton></article>)}</div></>;
}

function SupportPage() {
  return <><PageHero title="Wie können wir helfen?" eyebrow="Support"><p>Finde Antworten oder öffne die lokale Support-Demo.</p></PageHero><div className="inner-content support-layout"><section className="article-panel"><h2>Kontaktformular</h2><p>Unser Support ist rund um die Uhr bereit. Diese Bildungsversion behält jede Nachricht auf deinem Gerät und überträgt sie nicht.</p><ActionButton action="support" className="button primary">Live-Support öffnen</ActionButton></section><section className="article-panel"><h2>Beliebte Themen</h2><div className="support-links"><Link href="/de/faq">Häufige Fragen</Link><Link href="/de/payments">Zahlungen</Link><Link href="/de/responsible-gambling">Verantwortungsbewusstes Spielen</Link><Link href="/de/complaints">Beschwerden</Link></div></section></div></>;
}

function InfoPage({ slug }: { slug: string }) {
  const title=pageTitles[slug]??pretty(slug);
  const sections=infoPages[slug]??[{title:'Information',body:'Diese AXT Casino-Seite ist Teil der Bildungs-Frontend-Nachbildung.'}];
  return <><PageHero title={title} eyebrow="AXT Casino" image={slug==='about-us'?siteAsset('cms/promo/main-banner-live.webp'):undefined}/><article className="inner-content legal-content">{sections.map(section=><section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}</article></>;
}

function GameDetail({ parts }: { parts: string[] }) {
  const id=parts.slice(1).join('/');
  const game=allGames.find(item=>item.id.toLowerCase()===id.toLowerCase())??allGames[0];
  const requested=pretty(parts.at(-1)??game.name);
  return <div className="game-detail"><div className="game-preview"><Image src={gameImage(game)} alt="" fill priority unoptimized sizes="420px"/><div><span className="eyebrow">{game.provider}</span><h1>{requested}</h1><p>Öffne die lokale Anmelde-Demo, um fortzufahren. Echtgeldspiel ist nicht verbunden.</p><ActionButton action="login" className="button green">Jetzt Spielen</ActionButton><ActionButton action="login" className="button secondary">Demo</ActionButton></div></div><section className="inner-content"><div className="library-heading"><h2>Das könnte dir auch gefallen</h2></div><div className="game-library compact-library">{allGames.slice(0,6).map(item=><GridCard key={item.id} game={item}/>)}</div></section></div>;
}

export function SitePage({ parts }: { parts: string[] }) {
  const clean=parts.filter(Boolean);
  const locale=['de','en-AU','en-CA','en-NZ','fr-CA','no','it-CH','es'].includes(clean[0])?clean.slice(1):clean;
  const first=locale[0]??'all';
  let content:React.ReactNode;
  if(first==='game') content=<GameDetail parts={locale}/>;
  else if(first==='games'||first==='live') {
    const category=categories.find(item=>item.id===locale[1]);
    const provider=first==='games'&&locale[1]==='all'&&locale[2]?locale[2]:undefined;
    const providerGames=provider?allGames.filter(item=>item.provider.toLowerCase().replaceAll(' ','')===provider.toLowerCase().replaceAll('and','').replaceAll('+','')):undefined;
    let title:string;
    if(first==='live') title='Live-Casino';
    else if(provider) title=`${pretty(provider)} Spiele`;
    else if(locale[1]==='all') title='Alle Spiele';
    else title=category?.title??pretty(locale[1]??'Alle Spiele');
    const list=providerGames?.length?providerGames:category?.games??allGames;
    content=<GameLibrary title={title} games={list}/>;
  } else if(first==='promotions') content=<PromotionsPage/>;
  else if(first==='missions') content=<MissionsPage/>;
  else if(first==='tournaments') content=<TournamentPage/>;
  else if(first==='vip') content=<VipPage/>;
  else if(first==='payments') content=<PaymentsPage/>;
  else if(first==='support') content=<SupportPage/>;
  else content=<InfoPage slug={first}/>;
  return <Shell>{content}</Shell>;
}

export function titleForRoute(parts: string[]) {
  const clean=['de','en-AU','en-CA','en-NZ','fr-CA','no','it-CH','es'].includes(parts[0])?parts.slice(1):parts;
  const deMap: Record<string,string> = { 'about-us':'Über uns', support:'Hilfezentrum', faq:'Häufige Fragen', promotions:'Aktionen', missions:'Missionen', tournaments:'Turniere', vip:'VIP', payments:'Zahlungen', 'live':'Live-Casino' };
  if(clean[0]==='game') return pretty(clean.at(-1)??'Spiel');
  if(clean[0]==='games') return clean[2]?`${pretty(clean[2])} Spiele`:({'top':'Top-Spiele','new':'Neue Spiele','hot':'Beliebte Spiele','all':'Alle Spiele','jackpot':'Jackpots','slots':'Slots','megaways':'Megaways','instantwins':'Sofortgewinne','bonus_buy':'Bonuskauf'} as Record<string,string>)[clean[1]??'']??pretty(clean[1]??'Alle Spiele');
  if(clean[0]==='live') return 'Live-Casino';
  return deMap[clean[0]] ?? pageTitles[clean[0]]??pretty(clean[0]??'Casino');
}
