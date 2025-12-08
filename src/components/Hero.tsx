'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/use-language';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full text-white">
        <Image
            src="/assets/solution.am_background.jpg"
            alt="Solution.am Background"
            width={1920}
            height={1080}
            className="object-contain w-full h-auto"
            priority
        />
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
