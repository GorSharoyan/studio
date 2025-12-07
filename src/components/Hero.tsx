'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/hooks/use-language';
import { cn } from '@/lib/utils';

type HeroProps = {
  className?: string;
  width?: number;
  height?: number;
}

export function Hero({ className, width = 1920, height = 600 }: HeroProps) {
  const { t } = useLanguage();
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  return (
    <div className={cn("relative text-foreground flex justify-center items-center overflow-hidden", className)}>
      {heroImage && (
        <Image
          src="/assets/solution.am_background.jpg"
          alt={heroImage.description}
          width={width}
          height={height}
          className="object-cover z-0"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative container mx-auto px-4 text-center z-20">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl text-white">
          {t('home.hero.title')}
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-white/80">
          {t('home.hero.subtitle')}
        </p>
      </div>
    </div>
  );
}
