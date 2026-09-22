import type { Metadata } from 'next';
import { SitePage, titleForRoute } from '@/components/casino/site-page';

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug }=await params;
  return { title:titleForRoute(slug), description:'Explore AxeBonanza Casino games, promotions, rewards, payments, and support.' };
}

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug }=await params;
  return <SitePage parts={slug}/>;
}
