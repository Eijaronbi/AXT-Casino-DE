'use client';

import { createContext, useContext, useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import Image from 'next/image';
import { allGames, categories, filters, gameImage, promotions, siteAsset } from '@/data/casino';
import { ColorIcon, Icon } from './icon';
import { BrandMark } from './brand';

type Panel = 'login' | 'signup' | 'search' | 'providers' | 'languages' | 'notifications' | 'support' | 'forgot' | null;
type UIState = { open: (panel: Panel, category?: string) => void; toggleMenu: () => void };
const UI = createContext<UIState | null>(null);
const accountUrl = 'https://axecasmedia.com/amkddsgyl';
export const AFFILIATE_URL = accountUrl;
function openAffiliateNoReferrer(url: string) {
  // Referrer komplett verbergen: Anker mit rel=noreferrer noopener + referrerPolicy=no-referrer
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noreferrer noopener';
  a.referrerPolicy = 'no-referrer';
  document.body.appendChild(a);
  a.click();
  a.remove();
}
function useUI() {
  const value = useContext(UI);
  if (!value) throw new Error('Casino controls require CasinoUI');
  return value;
}

export function ActionButton({ action, category, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { action: Panel | 'menu'; category?: string }) {
  const ui = useUI();
  if (action === 'login' || action === 'signup') {
    // Echter Anker statt Button: Arthurs Affiliate-Link steht sichtbar im DOM (Hover/Quelltext),
    // Referrer bleibt durch rel + referrerPolicy verborgen.
    const { type: _type, onClick: _onClick, ...anchorProps } = props;
    return <a {...(anchorProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)} href={accountUrl} target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer">{children}</a>;
  }
  return <button {...props} type="button" onClick={() => {
    if (action === 'menu') ui.toggleMenu();
    else ui.open(action, category);
  }}>{children}</button>;
}

export function CasinoUI({ children }: { children: ReactNode }) {
  const [panel, setPanel] = useState<Panel>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menu, setMenu] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  function close() { setPanel(null); }
  function open(next: Panel, category = 'all') {
    previousFocus.current = document.activeElement as HTMLElement;
    setMenu(false);
    setSelectedCategory(category);
    setPanel(next);
  }
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (panel) {
      element.showModal();
      const before = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { element.close(); document.body.style.overflow = before; previousFocus.current?.focus(); };
    }
  }, [panel]);
  useEffect(() => {
    if (!menu) return;
    const focused = document.activeElement as HTMLElement | null;
    const sidebar = document.querySelector<HTMLElement>('.sidebar');
    const background = [...document.querySelectorAll<HTMLElement>('.site-header, .main-content, .mobile-navigation, .support-launcher')];
    background.forEach(element => { element.inert = true; });
    sidebar?.querySelector<HTMLElement>('button')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenu(false);
      if (event.key !== 'Tab' || !sidebar) return;
      const targets = [...sidebar.querySelectorAll<HTMLElement>('a, button, summary')].filter(element => element.getClientRects().length > 0);
      const first = targets[0];
      const last = targets.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    const before = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = before; background.forEach(element => { element.inert = false; }); focused?.focus(); };
  }, [menu]);
  const toggleMenu = () => {
    if (window.matchMedia('(min-width: 834px)').matches) setCollapsed(value => !value);
    else setMenu(value => !value);
  };
  const titles: Record<NonNullable<Panel>, string> = { login: 'Anmelden', signup: 'Registrieren', search: 'Suche', providers: 'Suche', languages: 'Sprachen', notifications: 'Benachrichtigungen', support: 'Live-Support', forgot: 'Passwort vergessen?' };
  return <UI.Provider value={{ open, toggleMenu }}>
    <div className={`casino-app${menu ? ' menu-open' : ''}${collapsed ? ' sidebar-collapsed' : ''}`}>
      {menu && <button className="menu-scrim" aria-label="Close menu" onClick={() => setMenu(false)} />}
      {children}
      <CookieNotice />
      <button className="support-launcher" aria-label="Nachrichtenfenster öffnen" onClick={() => open('support')}><Image src="/reference/chat.svg" alt="" width={24} height={24} /></button>
      <dialog ref={dialog} className={`site-dialog ${panel === 'login' || panel === 'signup' ? 'auth-dialog' : ''} ${panel === 'support' ? 'support-dialog' : ''} ${panel === 'notifications' ? 'notification-dialog' : ''}`} aria-label={panel ? titles[panel] : 'Dialog'} onCancel={close} onClick={event => { if (event.target === event.currentTarget) close(); }}>
        {panel && <div className="dialog-surface">
          <button className="dialog-close" aria-label="Dialog schließen" onClick={close}><Icon name="close" /></button>
          {(panel === 'login' || panel === 'signup') ? <AuthForm mode={panel} onMode={setPanel} /> : <>
            <h2>{titles[panel]}</h2>
            {(panel === 'search' || panel === 'providers') && <Search initialTab={panel === 'providers' ? 'providers' : 'games'} category={selectedCategory} onPlay={close} />}
            {panel === 'languages' && <Languages />}
            {panel === 'notifications' && <a className="notification-card" href="https://axecasmedia.com/amkddsgyl" target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer"><Image src={siteAsset('cms/promotion-cms/welcome_first_notification.webp')} alt="Ersteinzahlungsbonus" width={608} height={180} unoptimized /><span><small>ERSTEINZAHLUNGSBONUS</small><strong>100% BIS ZU 1000 EUR<br />+ 50 FS</strong></span></a>}
            {panel === 'forgot' && <DemoForm label="E-Mail" button="Passwort zurücksetzen" />}
            {panel === 'support' && <div className="support-body"><small>Support-Team</small><p className="support-message">Hallo! Lass uns wissen, wie wir dir heute helfen können ✨</p><DemoForm label="Wie können wir helfen?" button="Senden" /></div>}
          </>}
        </div>}
      </dialog>
    </div>
  </UI.Provider>;
}

function CookieNotice() {
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      try { setDismissed(localStorage.getItem('axtcasino-cookie-notice') === 'accepted'); } catch { /* Storage is optional. */ }
      setReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  if (!ready || dismissed) return null;
  return <aside className="cookie-notice" aria-label="Cookie-Hinweis"><p>AXT Casino verwendet Cookies, um deine Erfahrung zu verbessern. Durch die Nutzung unserer Website akzeptierst du unsere <a href="/de/cookie-policy" target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer">Cookie-Richtlinie.</a></p><button className="button primary small" onClick={() => { setDismissed(true); try { localStorage.setItem('axtcasino-cookie-notice', 'accepted'); } catch { /* Dismiss remains effective for this visit. */ } }}>Akzeptieren</button></aside>;
}

export function Hero() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setSlide(value => (value + 1) % promotions.length), 7000);
    return () => clearInterval(timer);
  }, [paused]);
  const choose = (index: number) => { setSlide((index + promotions.length) % promotions.length); setPaused(true); };
  return <section className="hero-carousel" aria-roledescription="carousel" aria-label="Aktionen" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)}>
    <div className="hero-stage">
      {promotions.map((promo, index) => <div className={`hero-slide${index === slide ? ' active' : ''}`} aria-hidden={index !== slide} key={promo.image}>
        <picture>
          <source media="(max-width:559px)" srcSet={siteAsset(`cms/promo/main-banner-${promo.image}-mob.webp`)} />
          <img src={siteAsset(`cms/promo/main-banner-${promo.image}.webp`)} alt={promo.label} width={1520} height={736} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} />
        </picture>
        <div className="hero-shade" />
        <div className="hero-copy"><span className="eyebrow">{promo.label}</span><h1 className={index !== slide ? 'inactive-heading' : ''}>{promo.title}</h1></div>
        <ActionButton action="signup" className="button green hero-cta" tabIndex={index === slide ? 0 : -1}>Registrieren</ActionButton>
      </div>)}
    </div>
    <button className="hero-arrow previous" aria-label="Vorherige Aktion" onClick={() => choose(slide - 1)}><Icon name="arrowLeft" /></button>
    <button className="hero-arrow next" aria-label="Nächste Aktion" onClick={() => choose(slide + 1)}><Icon name="arrowRight" /></button>
    <div className="hero-dots">{promotions.map((promo, index) => <button key={promo.image} className={index === slide ? 'active' : ''} aria-label={`${promo.label} anzeigen`} aria-pressed={index === slide} onClick={() => choose(index)} />)}</div>
    <div className="hero-progress"><span style={{ transform: `translateX(${slide * 100}%)` }} /></div>
  </section>;
}

export function Rail({ title, count, icon, category, children, tournament = false }: { title: string; count?: number; icon: string; category?: string; children: ReactNode; tournament?: boolean }) {
  const rail = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  function move(direction: number) {
    const element = rail.current;
    if (!element) return;
    const card = element.firstElementChild as HTMLElement | null;
    const distance = card ? card.offsetWidth + parseFloat(getComputedStyle(element).gap || '10') : 210;
    const end = element.scrollWidth - element.clientWidth;
    const next = element.scrollLeft + direction * distance;
    element.scrollTo({ left: next > end + 2 ? 0 : next < -2 ? end : next, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  return <section className={`game-section${tournament ? ' tournament-section' : ''}`} id={category || 'tournaments'}>
    <div className="section-heading"><h2><Icon name={icon} className="green-icon" />{title}{count !== undefined && <span>{count}</span>}</h2><div className="section-controls"><ActionButton action="search" category={category} className="button secondary small show-all">Alle anzeigen</ActionButton>{!tournament && <div className="rail-arrows"><button className="button secondary square small" aria-label={`Vorherige ${title}-Spiele`} onClick={() => move(-1)}><Icon name="arrowLeft" /></button><button className="button secondary square small" aria-label={`Nächste ${title}-Spiele`} onClick={() => move(1)}><Icon name="arrowRight" /></button></div>}</div></div>
    <div className="rail-window"><div ref={rail} className={`card-rail${tournament ? ' tournament-rail' : ''}`} onScroll={() => { const element = rail.current; if (element) setProgress(element.scrollLeft / Math.max(1, element.scrollWidth - element.clientWidth)); }}>{children}</div></div>
    <div className="rail-progress"><span style={{ left: `${progress * 96}%` }} /></div>
  </section>;
}

export function WinnerList() {
  const winners = [
    { name: 'Nathan', amount: '8 AUD', game: 'Elvis Frog in Vegas', image: 'inout/ChickenRoad2' },
    { name: 'Christopher', amount: '5.4 NZD', game: 'Gold Rush with Johnny Cash', image: 'pragmaticexternal/BigBassBonanza1000' },
    { name: 'Elsa', amount: '4.2 AUD', game: 'Mystic Reels', image: 'bsg/GoodGirlBadGirl2' },
    { name: 'Jordan', amount: '18.91 NZD', game: 'True Grit Redemption 2', image: 'pragmaticexternal/MummysJewels100' },
  ];
  return <aside className="winners"><h2><Icon name="trophy" className="green-icon" />Letzte Gewinner</h2><div className="winner-list">{winners.map(winner => <ActionButton className="winner-card" action="login" key={winner.image}><Image src={`/reference/cdn/axecasino/i/s3/${winner.image}.webp`} alt="" width={72} height={72} unoptimized /><span><span className="winner-name">{winner.name}</span><strong>{winner.amount}</strong><span className="winner-game">in <b>{winner.game}</b></span></span></ActionButton>)}</div><div className="rail-progress"><span /></div></aside>;
}

function Search({ initialTab, category, onPlay }: { initialTab: string; category: string; onPlay: () => void }) {
  const [tab, setTab] = useState(initialTab);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(category);
  const source = activeCategory === 'all' ? allGames : categories.find(item => item.id === activeCategory)?.games ?? allGames;
  const games = source.filter(item => `${item.name} ${item.provider}`.toLowerCase().includes(query.toLowerCase()));
  const providers = [...new Set(allGames.map(game => game.provider))].filter(name => name.toLowerCase().includes(query.toLowerCase()));
  const matchingCategories = filters.filter(([, name]) => name.toLowerCase().includes(query.toLowerCase()));
  return <div className="search-content">
    <label className="search-input"><Icon name="search" /><input type="search" aria-label="Finden Sie Ihr Spiel" placeholder="Finden Sie Ihr Spiel" value={query} onChange={event => setQuery(event.target.value)} /></label>
    <div className="search-tabs" role="tablist" aria-label="Suchtypen">{[['games', 'Spiele', query ? games.length : 16429], ['categories', 'Kategorien', query ? matchingCategories.length : 22], ['providers', 'Anbieter', query ? providers.length : 123]].map(([id, name, count]) => <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(String(id))}>{name}<span>{count}</span></button>)}</div>
    <div className="search-results" role="tabpanel" aria-label={tab}>
      {tab === 'games' && <><h3>{query ? 'Ergebnisse' : category === 'all' ? 'Beliebt' : categories.find(item => item.id === category)?.title ?? 'Spiele'}</h3>{games.length ? games.map(game => <a className="search-game" key={game.id} href={accountUrl} target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer" onClick={onPlay}><Image src={gameImage(game)} alt="" width={60} height={60} unoptimized /><span><strong>{game.name}</strong><small>{game.provider}</small></span></a>) : <p className="empty-results">Keine Spiele gefunden. Versuche eine andere Suche.</p>}</>}
      {tab === 'categories' && <div className="result-grid">{matchingCategories.map(([id, name, icon]) => <button key={id} onClick={() => { setActiveCategory(id); setQuery(''); setTab('games'); }}><ColorIcon name={icon} />{name}</button>)}</div>}
      {tab === 'providers' && <div className="result-grid">{providers.map(name => <button key={name} onClick={() => { setActiveCategory('all'); setQuery(name); setTab('games'); }}>{name}<small>{allGames.filter(game => game.provider === name).length}</small></button>)}</div>}
    </div>
  </div>;
}

function AuthForm({ mode, onMode }: { mode: 'login' | 'signup'; onMode: (panel: Panel) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const signup = mode === 'signup';
  return <div className="auth-layout">
    <div className="auth-art"><BrandMark /><span className="eyebrow">Willkommenspaket</span><strong>3,750 EUR<span>+ 200 FS</span></strong></div>
    <div className="auth-body"><div className="auth-mobile-logo"><BrandMark /></div>{signup && <div className="auth-mobile-offer"><span className="eyebrow">Willkommenspaket</span><strong>3,750 EUR + 200 FS</strong></div>}
      <h2>{signup ? 'Registrieren' : 'Anmelden'}</h2><p className="auth-intro">{signup ? 'Erstelle ein AXT Casino-Konto und genieße alles, was wir bieten' : 'Melde dich bei deinem AXT Casino-Konto an, um weiterzuspielen'}</p>
      <div className="auth-tabs" role="tablist" aria-label="Kontoformulare"><button role="tab" aria-selected={!signup} onClick={() => { setMessage(''); onMode('login'); }}>Anmelden</button><button role="tab" aria-selected={signup} onClick={() => { setMessage(''); onMode('signup'); }}>Registrieren</button></div>
      <form onSubmit={event => { event.preventDefault(); openAffiliateNoReferrer(accountUrl); }}>
        <label className="field">E-Mail<input type="email" autoComplete="off" required /></label>
        <label className="field">Passwort<span className="password-field"><input type={showPassword ? 'text' : 'password'} autoComplete="off" minLength={8} required /><button type="button" className="password-toggle" aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'} onClick={() => setShowPassword(value => !value)}>{showPassword ? 'Verbergen' : 'Anzeigen'}</button></span></label>
        {signup && <><div className="country-fields"><label className="field">Land<select required defaultValue=""><option value="" disabled>Land</option>{['Deutschland', 'Österreich', 'Schweiz', 'Australien', 'Kanada', 'Neuseeland', 'Norwegen'].map(country => <option key={country}>{country}</option>)}</select></label><label className="field">Währung<select defaultValue="EUR">{['EUR', 'CAD', 'AUD', 'NZD', 'USD'].map(currency => <option key={currency}>{currency}</option>)}</select></label></div><label className="terms-check"><input type="checkbox" required /><span>Ich bin 18 Jahre alt und akzeptiere die Allgemeinen Geschäftsbedingungen<br /><a href="/de/terms-and-conditions" target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer">Allgemeine Geschäftsbedingungen</a> und <a href="/de/privacy-policy" target="_blank" rel="noreferrer noopener" referrerPolicy="no-referrer">Datenschutzrichtlinie</a></span></label></>}
        <button className="button green full" type="submit">{signup ? 'Registrieren' : 'Anmelden'}</button>
        <button className="button secondary full google-button" type="button" onClick={() => openAffiliateNoReferrer(accountUrl)}><span className="google-letter">G</span>{signup ? 'Mit Google registrieren' : 'Mit Google anmelden'}</button>
        {!signup && <button className="forgot-link" type="button" onClick={() => onMode('forgot')}>Passwort vergessen?</button>}
        {message && <p className="form-message" role="status">{message}</p>}
      </form>
    </div>
  </div>;
}

function DemoForm({ label, button }: { label: string; button: string }) {
  const [submitted, setSubmitted] = useState(false);
  return <form className="demo-form" onSubmit={event => { event.preventDefault(); event.currentTarget.reset(); setSubmitted(true); }}><label className="field">{label}<input required type={label === 'E-Mail' ? 'email' : 'text'} autoComplete="off" /></label><button className="button primary" type="submit">{button}</button>{submitted && <p className="form-message" role="status">Dies ist eine lokale Bildungsdemo. Deine Nachricht wurde nicht gesendet.</p>}</form>;
}

function Languages() {
  const [selected, setSelected] = useState('Deutsch');
  return <div className="language-list">{['Deutsch', 'English', 'English - Australia', 'English - Canada', 'English - New Zealand', 'Français - Canada', 'Norsk', 'Italiano - Schweiz'].map(language => <button key={language} className={selected === language ? 'selected' : ''} onClick={() => setSelected(language)}>{language === 'Deutsch' && <Image src="/reference/cdn/i/flags/square/de.svg" alt="" width={28} height={28} unoptimized />}{language}</button>)}<p className="language-note">Diese Startseiten-Nachbildung ist auf Deutsch verfügbar.</p></div>;
}
