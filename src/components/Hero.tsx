'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/use-language';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const { t } = useLanguage();
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  return (
    <section className="relative w-full text-white max-h-[600px] overflow-hidden">
      {heroImage && (
        <Image
          src="/assets/solution.am_background.jpg"
          alt={t('home.hero.subtitle')}
          width={1920}
          height={1080}
          className="w-full h-auto object-cover max-h-[600px]"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
          {t('home.hero.title')}
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          {t('home.hero.subtitle')}
        </p>
      </div>
    </section>
  );
}
