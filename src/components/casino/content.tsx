import Image from 'next/image';
import Link from 'next/link';
import { categories, filters, footerGroups, gameImage, siteAsset, type Game } from '@/data/casino';
import { ActionButton, Rail } from './interactive';
import { ColorIcon, Icon } from './icon';
import { BrandMark } from './brand';

const external = (route: string) => route.startsWith('https://') ? route : `/${route}`;

export function Header() {
  return <header className="site-header">
    <ActionButton action="menu" className="button secondary square desktop-menu" aria-label="Toggle navigation"><Icon name="burger" /></ActionButton>
    <Link href="/" className="brand" aria-label="AxeBonanza Casino homepage"><BrandMark /></Link>
    <nav className="header-navigation" aria-label="Main navigation"><Link href="/" className="button secondary selected"><Icon name="spade" className="green-icon" />Casino</Link><a href={external('live')} target="_blank" rel="noreferrer" className="button secondary"><Icon name="roulette" />Live Casino</a><ActionButton action="search" className="button outline"><Icon name="search" />Find your game</ActionButton></nav>
    <div className="header-actions"><ActionButton action="notifications" className="notification-button" aria-label="Notifications"><Icon name="bell" /></ActionButton><ActionButton action="login" className="button secondary" aria-label="Login"><Icon name="enter" /><span>Login</span></ActionButton><ActionButton action="signup" className="button green" aria-label="Sign Up"><Icon name="createAccount" /><span>Sign Up</span></ActionButton><ActionButton action="languages" className="language-button"><Image src="/reference/cdn/i/flags/square/en.svg" width={28} height={28} alt="" unoptimized /><span>EN</span><Icon name="chevronDown" /></ActionButton></div>
  </header>;
}

export function Sidebar() {
  return <aside className="sidebar" aria-label="Site navigation">
    <div className="drawer-heading"><BrandMark /><ActionButton action="menu" aria-label="Close navigation"><Icon name="close" /></ActionButton></div>
    <nav className="sidebar-links">
      <a className="promo-link" href={external('promotions')} target="_blank" rel="noreferrer"><span>Promotions</span><Image src={siteAsset('navigation/gift.png')} alt="" width={100} height={80} unoptimized /></a>
      <a className="promo-link" href={external('missions')} target="_blank" rel="noreferrer"><span>Missions</span><Image src={siteAsset('navigation/missions.png')} alt="" width={100} height={80} unoptimized /></a>
      <details className="side-group"><summary className="side-item active"><ColorIcon name="seven" /><span>Casino</span><Icon name="chevronDown" /></summary><div className="side-submenu">{[['New','new'],['Jackpot','jackpot'],['Megaways','megaways'],['Instant Wins','instantwins'],['Hold & Win','hold_and_win'],['All Games','all']].map(([title,id])=><ActionButton key={id} action="search" category={id}>{title}</ActionButton>)}</div></details>
      <details className="side-group"><summary className="side-item"><ColorIcon name="chip2" /><span>Live Casino</span><Icon name="chevronDown" /></summary><div className="side-submenu">{['Live','Blackjack','Roulette','Game Shows','Baccarat','Poker','Cards'].map(title=><a key={title} href={external(`live/games/${title.toLowerCase().replace(' ','_')}`)} target="_blank" rel="noreferrer">{title}</a>)}</div></details>
      {[['Tournaments','tournaments','golden'],['VIP','vip','crown'],['Payments','payments','cash']].map(([title,route,icon])=><a className="side-item" href={external(route)} target="_blank" rel="noreferrer" key={route}><ColorIcon name={icon}/><span>{title}</span></a>)}
    </nav>
    <div className="sidebar-bottom"><ActionButton action="languages" className="drawer-language button secondary"><Image src="/reference/cdn/i/flags/square/en.svg" width={24} height={24} alt="" unoptimized />English<Icon name="chevronDown" /></ActionButton><div className="social-links"><a className="button secondary square" href="https://t.me/axecasino/" target="_blank" rel="noreferrer" aria-label="Telegram"><Icon name="telegram" /></a><a className="button secondary square" href="https://www.instagram.com/axe_casino/" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" /></a></div></div>
  </aside>;
}

export function Filters() {
  return <nav className="catalog-filters" aria-label="Game categories"><div className="filter-scroll">{filters.map(([id,title,icon])=><ActionButton action="search" category={id} className="button secondary filter-button" key={id}><ColorIcon name={icon} />{title}</ActionButton>)}</div><div className="providers-wrap"><ActionButton action="providers" className="button primary"><Icon name="app" />Providers</ActionButton></div></nav>;
}

function GameCard({game,priority=false}:{game:Game;priority?:boolean}) {
  return <article className="game-card"><Image className="game-art" src={gameImage(game)} alt={game.name} width={200} height={267} unoptimized loading={priority?'eager':'lazy'} /><div className="game-badges">{game.hot&&<span className="badge hot" title="Hot"><Icon name="hot"/></span>}{game.fresh&&<span className="badge fresh" title="New"><Icon name="iconNew"/></span>}</div><div className="game-overlay"><strong>{game.name}</strong><ActionButton action="login" className="button green" aria-label={`Play ${game.name}`}>Play Now</ActionButton><ActionButton action="login" className="button secondary" aria-label={`Demo ${game.name}`}>Demo</ActionButton><small>{game.provider}</small></div></article>;
}

export function GameSections() {
  return <div className="game-sections">{categories.map((category,index)=><div className="section-group" key={category.id}><Rail title={category.title} count={category.count} icon={category.icon} category={category.id}>{category.games.map(game=><GameCard key={game.id} game={game} priority={index===0}/>)}</Rail>{index===3&&<Tournaments/>}</div>)}</div>;
}

function Tournaments() {
  const items=[{badge:'Network',title:'Drops & Wins',image:'lady.webp',prize:'30,000,000 EUR',time:['101','12','45','28']},{badge:'Weekly',title:'Weekly BGaming Tournament',image:'tournament_bgaming.webp',prize:'875 EUR + 800 FS',time:['5','13','30','28']},{badge:'Daily',title:'Daily Free Spins Tournament',image:'tournament_daily.webp',prize:'1210 FS',time:['0','13','30','28']}];
  return <Rail title="Tournaments" icon="tournamentsTrophy" tournament>{items.map(item=><article className="tournament-card" key={item.title}><Image src={siteAsset('cms/tournaments/'+item.image)} alt="" fill unoptimized sizes="(max-width:767px) 320px, 33vw"/><div className="tournament-copy"><span className="eyebrow">{item.badge}</span><h3>{item.title}</h3><span className="tournament-label">Time left</span><div className="countdown">{item.time.map((value,i)=><span key={i}><b>{value}</b><small>{['d','h','m','s'][i]}</small></span>)}</div><span className="tournament-label">Prize pool</span><strong className="prize">{item.prize}</strong><a href={external('tournaments')} target="_blank" rel="noreferrer" className="button secondary">Details</a></div></article>)}</Rail>;
}

export function Footer() {
  const payments=['visa','maestro','mastercard','bankTransfer','interac','bitcoin','ethereumCpp','litecoin','xrpCpp','usdcCpp','dogecoin'];
  return <footer className="site-footer"><div className="footer-desktop-groups">{footerGroups.map(group=><section key={group.title}><h3>{group.title}</h3><ul>{group.links.map(([label,route])=><li key={label}><a href={external(route)} target="_blank" rel="noreferrer">{label}</a></li>)}</ul></section>)}</div><div className="footer-mobile-groups">{footerGroups.map(group=><details key={group.title}><summary>{group.title}<Icon name="chevronDown"/></summary><ul>{group.links.map(([label,route])=><li key={label}><a href={external(route)} target="_blank" rel="noreferrer">{label}</a></li>)}</ul></details>)}</div><div className="payments-row"><div className="payment-logos">{payments.map(name=><Image src={siteAsset(`cms/payments/icons/${name}.svg`)} alt={name} width={76} height={38} key={name} unoptimized />)}</div><a href={external('payments')} target="_blank" rel="noreferrer" className="button secondary small">Show all</a></div><div className="responsible-logos"><a href="https://gordonmoody.org.uk/" target="_blank" rel="noreferrer"><Image src={siteAsset('legal/gordonMoody.svg')} width={130} height={42} alt="Gordon Moody" unoptimized /></a><a href={external('responsible-gambling')} target="_blank" rel="noreferrer"><Image src={siteAsset('legal/icon18.svg')} width={42} height={42} alt="18+" unoptimized /></a></div><p className="copyright">Copyright © 2026 AxeBonanza Casino. All rights reserved.</p><p className="replica-note">AxeBonanza Casino — educational homepage recreation. No real-money play or accounts.</p></footer>;
}

export function MobileNavigation() {
  return <nav className="mobile-navigation" aria-label="Mobile navigation"><ActionButton action="menu"><Icon name="burger"/><span>Menu</span></ActionButton><ActionButton action="search" category="slots"><Icon name="slots"/><span>Slots</span></ActionButton><ActionButton action="login" className="mobile-login"><span className="button green square"><Icon name="enter"/></span><span>Login</span></ActionButton><ActionButton action="search"><Icon name="search"/><span>Search</span></ActionButton><a href={external('promotions')} target="_blank" rel="noreferrer"><Icon name="gift"/><span>Promo</span></a></nav>;
}
