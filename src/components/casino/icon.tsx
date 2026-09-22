import type { CSSProperties } from 'react';
import { siteAsset } from '@/data/casino';

export function Icon({ name, className = '' }: { name: string; className?: string }) {
  return <span aria-hidden="true" className={`icon ${className}`} style={{ '--icon': `url("${siteAsset(`icons/${name}.svg`)}")` } as CSSProperties} />;
}

export function ColorIcon({ name }: { name: string }) {
  // Small, already optimized source assets; no additional image transformation needed.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="color-icon" src={siteAsset(`icons/color/${name}.webp`)} alt="" width={22} height={22} />;
}
