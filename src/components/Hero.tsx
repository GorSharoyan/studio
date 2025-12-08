'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/hooks/use-language';

export function Hero() {
  const { t } = useLanguage();
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  return (
    <section className="mb-16 text-center">
        <div className="container mx-auto px-4 py-16 md:py-20">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
            {t('home.hero.title')}
            </h1>
            <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
            {t('home.hero.subtitle')}
            </p>
        </div>
      {heroImage && (
        <div className="container mx-auto px-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                />
            </div>
        </div>
      )}
    </section>
  );
}
