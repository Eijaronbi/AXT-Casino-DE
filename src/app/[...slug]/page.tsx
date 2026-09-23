import type { Metadata } from 'next';
import { SitePage, titleForRoute } from '@/components/casino/site-page';

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug }=await params;
  return { title:titleForRoute(slug), description:'Entdecke AXT Casino Spiele, Aktionen, Belohnungen, Zahlungen und Support — 3750 EUR + 200 FS.' };
}

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug }=await params;
  return <SitePage parts={slug}/>;
}
