import Image from 'next/image';
import Link from 'next/link';
import { categories, filters, footerGroups, gameImage, liveCategories, liveFilters, siteAsset, type Game } from '@/data/casino';
import { ActionButton, Rail } from './interactive';
import { ColorIcon, Icon } from './icon';
import { BrandMark } from './brand';

const external = (route: string) => route.startsWith('https://') ? route : `/${route}`;

export function Header() {
  return <header className="site-header">
    <ActionButton action="menu" className="button secondary square desktop-menu" aria-label="Navigation umschalten"><Icon name="burger" /></ActionButton>
    <Link href="/de" className="brand" aria-label="AXT Casino Startseite"><BrandMark /></Link>
    <nav className="header-navigation" aria-label="Hauptnavigation"><Link href="/de" className="button secondary selected"><Icon name="spade" className="green-icon" />Casino</Link><a href="/de/live" target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer" className="button secondary"><Icon name="roulette" />Live-Casino</a><ActionButton action="search" className="button outline"><Icon name="search" />Finden Sie Ihr Spiel</ActionButton></nav>
    <div className="header-actions"><ActionButton action="notifications" className="notification-button" aria-label="Benachrichtigungen"><Icon name="bell" /></ActionButton><ActionButton action="login" className="button secondary" aria-label="Anmelden"><Icon name="enter" /><span>Anmelden</span></ActionButton><ActionButton action="signup" className="button green" aria-label="Registrieren"><Icon name="createAccount" /><span>Registrieren</span></ActionButton><ActionButton action="languages" className="language-button"><Image src="/reference/cdn/i/flags/square/de.svg" width={28} height={28} alt="" unoptimized /><span>DE</span><Icon name="chevronDown" /></ActionButton></div>
  </header>;
}

export function Sidebar() {
  return <aside className="sidebar" aria-label="Website-Navigation">
    <div className="drawer-heading"><BrandMark /><ActionButton action="menu" aria-label="Navigation schließen"><Icon name="close" /></ActionButton></div>
    <nav className="sidebar-links">
      <a className="promo-link" href="/de/promotions" target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer"><span>Aktionen</span><Image src={siteAsset('navigation/gift.png')} alt="" width={100} height={80} unoptimized /></a>
      <a className="promo-link" href="/de/missions" target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer"><span>Missionen</span><Image src={siteAsset('navigation/missions.png')} alt="" width={100} height={80} unoptimized /></a>
      <details className="side-group"><summary className="side-item active"><ColorIcon name="seven" /><span>Casino</span><Icon name="chevronDown" /></summary><div className="side-submenu">{[['Neu','new'],['Jackpot','jackpot'],['Megaways','megaways'],['Sofortgewinne','instantwins'],['Hold & Win','hold_and_win'],['Alle Spiele','all']].map(([title,id])=><ActionButton key={id} action="search" category={id}>{title}</ActionButton>)}</div></details>
      <details className="side-group"><summary className="side-item"><ColorIcon name="chip2" /><span>Live-Casino</span><Icon name="chevronDown" /></summary><div className="side-submenu">{[['Live','live/games'],['Blackjack','live/games/blackjack'],['Roulette','live/games/roulette'],['Spielshows','live/games/game_show'],['Baccarat','live/games/baccarat'],['Poker','live/games/poker'],['Karten','live/games/cards']].map(([title,route])=><a key={title} href={external(`de/${route}`)} target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer">{title}</a>)}</div></details>
      {[['Turniere','de/tournaments','golden'],['VIP','de/vip','crown'],['Zahlungen','de/payments','cash']].map(([title,route,icon])=><a className="side-item" href={external(route)} target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer" key={route}><ColorIcon name={icon}/><span>{title}</span></a>)}
    </nav>
    <div className="sidebar-bottom"><ActionButton action="languages" className="drawer-language button secondary"><Image src="/reference/cdn/i/flags/square/de.svg" width={24} height={24} alt="" unoptimized />Deutsch<Icon name="chevronDown" /></ActionButton></div>
  </aside>;
}

export function Filters() {
  return <nav className="catalog-filters" aria-label="Spielkategorien"><div className="filter-scroll">{filters.map(([id,title,icon])=><ActionButton action="search" category={id} className="button secondary filter-button" key={id}><ColorIcon name={icon} />{title}</ActionButton>)}</div><div className="providers-wrap"><ActionButton action="providers" className="button primary"><Icon name="app" />Anbieter</ActionButton></div></nav>;
}

export function LiveFilters() {
  return <nav className="catalog-filters" aria-label="Live-Kategorien"><div className="filter-scroll">{liveFilters.map(([id,title,icon])=><a href={id==='live'?'/de/live':`/de/live/games/${id}`} target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer" className="button secondary filter-button" key={id}><ColorIcon name={icon} />{title}</a>)}</div><div className="providers-wrap"><ActionButton action="providers" className="button primary"><Icon name="app" />Anbieter</ActionButton></div></nav>;
}

function GameCard({game,priority=false}:{game:Game;priority?:boolean}) {
  return <article className="game-card"><Image className="game-art" src={gameImage(game)} alt={game.name} width={200} height={267} unoptimized loading={priority?'eager':'lazy'} /><div className="game-badges">{game.hot&&<span className="badge hot" title="Heiß"><Icon name="hot"/></span>}{game.fresh&&<span className="badge fresh" title="Neu"><Icon name="iconNew"/></span>}</div><div className="game-overlay"><strong>{game.name}</strong><ActionButton action="login" className="button green" aria-label={`${game.name} jetzt spielen`}>Jetzt Spielen</ActionButton><ActionButton action="login" className="button secondary" aria-label={`${game.name} Demo`}>Demo</ActionButton><small>{game.provider}</small></div></article>;
}

export function GameSections() {
  return <div className="game-sections">{categories.map((category,index)=><div className="section-group" key={category.id}><Rail title={category.title} count={category.count} icon={category.icon} category={category.id}>{category.games.map(game=><GameCard key={game.id} game={game} priority={index===0}/>)}</Rail>{index===3&&<Tournaments/>}</div>)}</div>;
}

export function LiveSections() {
  return <div className="game-sections">{liveCategories.map((category,index)=><div className="section-group" key={category.id}><Rail title={category.title} count={category.count} icon={category.icon} category={category.id} href={`/de/live/games/${category.id}`}>{category.games.slice(0,8).map(game=><GameCard key={game.id} game={game} priority={index===0}/>)}</Rail>{index===3&&<Tournaments/>}</div>)}</div>;
}

function Tournaments() {
  const items=[{badge:'Netzwerk',title:'Drops & Wins',image:'lady.webp',prize:'30.000.000 EUR',time:['101','12','45','28'],link:'/de/tournaments/drops-and-wins-2025'},{badge:'Wöchentlich',title:'Wöchentliches BGaming-Turnier',image:'tournament_bgaming.webp',prize:'875 EUR + 800 FS',time:['5','13','30','28'],link:'/de/tournaments/weekly-bgaming-tournament'},{badge:'Monatlich',title:'Live-Turnier',image:'lady.webp',prize:'1.000 EUR',time:['21','08','15','40'],link:'/de/tournaments/live-casino-tournament'},{badge:'Täglich',title:'Tägliches Freispiel-Turnier',image:'tournament_daily.webp',prize:'1210 FS',time:['0','13','30','28'],link:'/de/tournaments/daily-free-spins-tournament'}];
  return <Rail title="Turniere" icon="tournamentsTrophy" tournament href="/de/tournaments">{items.map(item=><article className="tournament-card" key={item.title}><Image src={siteAsset('cms/tournaments/'+item.image)} alt="" fill unoptimized sizes="(max-width:767px) 320px, 33vw"/><div className="tournament-copy"><span className="eyebrow">{item.badge}</span><h3>{item.title}</h3><span className="tournament-label">Verbleibende Zeit</span><div className="countdown">{item.time.map((value,i)=><span key={i}><b>{value}</b><small>{['T','S','M','S'][i]}</small></span>)}</div><span className="tournament-label">Preispool</span><strong className="prize">{item.prize}</strong><a href={item.link} target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer" className="button secondary">Details</a></div></article>)}</Rail>;
}

export function Footer() {
  const payments=['visa','maestro','mastercard','bankTransfer','interac','bitcoin','ethereumCpp','litecoin','xrpCpp','usdcCpp','dogecoin'];
  return <footer className="site-footer"><div className="footer-desktop-groups">{footerGroups.map(group=><section key={group.title}><h3>{group.title}</h3><ul>{group.links.map(([label,route])=><li key={label}><a href={external(route)} target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer">{label}</a></li>)}</ul></section>)}</div><div className="footer-mobile-groups">{footerGroups.map(group=><details key={group.title}><summary>{group.title}<Icon name="chevronDown"/></summary><ul>{group.links.map(([label,route])=><li key={label}><a href={external(route)} target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer">{label}</a></li>)}</ul></details>)}</div><div className="payments-row"><div className="payment-logos">{payments.map(name=><Image src={siteAsset(`cms/payments/icons/${name}.svg`)} alt={name} width={76} height={38} key={name} unoptimized />)}</div><a href="/de/payments" target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer" className="button secondary small">Alle anzeigen</a></div><div className="responsible-logos"><a href="https://gordonmoody.org.uk/" target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer"><Image src={siteAsset('legal/gordonMoody.svg')} width={130} height={42} alt="Gordon Moody" unoptimized /></a><a href="/de/responsible-gambling" target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer"><Image src={siteAsset('legal/icon18.svg')} width={42} height={42} alt="18+" unoptimized /></a></div><p className="copyright">Copyright © 2026 AXT Casino. Alle Rechte vorbehalten.</p><p className="replica-note">AXT Casino — Bildungsnachbildung der Startseite. Kein Echtgeldspiel, keine Konten.</p></footer>;
}

export function MobileNavigation() {
  return <nav className="mobile-navigation" aria-label="Mobile Navigation"><ActionButton action="menu"><Icon name="burger"/><span>Menü</span></ActionButton><ActionButton action="search" category="slots"><Icon name="slots"/><span>Spiele</span></ActionButton><ActionButton action="login" className="mobile-login"><span className="button green square"><Icon name="enter"/></span><span>Anmelden</span></ActionButton><ActionButton action="search"><Icon name="search"/><span>Suche</span></ActionButton><a href="/de/promotions" target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer"><Icon name="gift"/><span>Promo</span></a></nav>;
}
