import { Filters, Footer, GameSections, Header, MobileNavigation, Sidebar } from '@/components/casino/content';
import { CasinoUI, Hero, WinnerList } from '@/components/casino/interactive';

export default function Home() {
  return <CasinoUI><Header/><Sidebar/><main id="main-content" className="main-content"><div className="homepage-content"><div className="homepage-top"><Hero/><Filters/><WinnerList/></div><GameSections/></div><Footer/></main><MobileNavigation/></CasinoUI>;
}
