'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/use-language';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const { t } = useLanguage();
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  return (
    <section className="relative text-foreground py-20 md:py-32 rounded-lg overflow-hidden mb-16">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
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
    </section>
  );
}
