
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handshake, Mail, MapPin, MessageSquare, Phone, ShoppingCart, Star, Car, Lightbulb, Wrench, Fan, Cog, Droplets, Shield, Battery, Filter, Search, Calendar, Newspaper, Annoyed } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { Badge } from '@/components/ui/badge';
import Autoplay from "embla-carousel-autoplay";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type NewsItem = {
  id: string;
  date: string;
  imageId: string;
};


export default function Home() {
  const { t } = useLanguage();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  const actionItems = [
    { title: t('home.actions.dealer'), icon: Handshake, href: '/dealer' },
    { title: t('home.actions.shop'), icon: ShoppingCart, href: '/shop' },
    { title: t('home.actions.feedback'), icon: MessageSquare, href: '/feedback' },
  ];

  const brands = [
    { name: 'NAITE', icon: Search },
    { name: 'Bosch', icon: Wrench },
    { name: 'Denso', icon: Fan, comingSoon: true },
    { name: 'Castrol', icon: Droplets, comingSoon: true },
    { name: 'Valeo', icon: Lightbulb, comingSoon: true },
    { name: 'Mobil 1', icon: Droplets, comingSoon: true },
    { name: 'Hella', icon: Lightbulb },
    { name: 'Nissens', icon: Fan },
    { name: 'Liqui Moly', icon: Droplets, comingSoon: true },
    { name: 'Brembo', icon: Shield },
    { name: 'Mahle', icon: Filter },
    { name: 'Philips Automotive', icon: Lightbulb, comingSoon: true },
    { name: 'MANN-Filter', icon: Filter },
    { name: 'TRW', icon: Shield, comingSoon: true },
    { name: 'KYB', icon: Shield },
    { name: 'NGK', icon: Cog },
    { name: 'Shell Helix', icon: Droplets, comingSoon: true },
    { name: 'KoyoRad', icon: Fan },
    { name: 'Osram', icon: Lightbulb },
    { name: 'SKF', icon: Cog, comingSoon: true },
    { name: 'Sachs', icon: Cog, comingSoon: true },
  ];

  const testimonials = [
    {
      name: 'Aram P.',
      initials: 'AP',
      quote: t('home.testimonials.customer1.quote'),
      rating: 5,
    },
    {
      name: 'Sona G.',
      initials: 'SG',
      quote: t('home.testimonials.customer2.quote'),
      rating: 5,
    },
    {
      name: 'David M.',
      initials: 'DM',
      quote: t('home.testimonials.customer3.quote'),
      rating: 5,
    },
     {
      name: 'Lilit H.',
      initials: 'LH',
      quote: t('home.testimonials.customer4.quote'),
      rating: 4,
    },
  ];
  
  const newsItems: NewsItem[] = [
    {
      id: 'partnership',
      date: 'August 15, 2024',
      imageId: 'news-partnership',
    },
    {
      id: 'maintenance',
      date: 'August 10, 2024',
      imageId: 'news-maintenance',
    },
    {
      id: 'loyalty',
      date: 'August 5, 2024',
      imageId: 'news-loyalty',
    },
    {
      id: 'coming-soon-features',
      date: 'September 1, 2024',
      imageId: 'news-coming-soon',
    },
  ];
  

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative w-full text-white h-64 sm:h-80 md:h-96">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={t('home.hero.subtitle')}
              fill
              className="w-full h-auto object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
              Solution.am
            </h1>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              {t('home.hero.subtitle')}
            </p>
          </div>
        </section>
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-headline font-bold mb-4">{t('home.about.title')}</h2>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
              {t('home.about.description')}
            </p>
          </div>
        </section>
   

        <section className="py-12">
          <div className="container mx-auto px-4">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-4xl mx-auto"
            >
                <CarouselContent>
                    {actionItems.map((item, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card className="h-full">
                                    <CardContent className="flex flex-col items-center justify-center p-6 gap-4 text-center">
                                        <item.icon className="w-12 h-12 text-primary" />
                                        <span className="text-xl font-semibold">{item.title}</span>
                                        <Button asChild>
                                          <Link href={item.href}>{t('home.actions.learnMore')}</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
          </div>
        </section>

        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">{t('home.brands.title')}</h2>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                    dragFree: true,
                }}
                plugins={[
                    Autoplay({
                      delay: 2000,
                      stopOnInteraction: true,
                    }),
                ]}
                className="w-full max-w-6xl mx-auto"
            >
                <CarouselContent>
                    {brands.map((brand) => (
                        <CarouselItem key={brand.name} className="basis-1/4 sm:basis-1/5 md:basis-1/6 lg:basis-1/8">
                            <div className="p-2">
                                <Card className="overflow-hidden aspect-square relative group">
                                    {brand.comingSoon && (
                                      <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
                                        <div className="transform -rotate-12 border-2 border-dashed border-green-400 p-2">
                                          <span className="text-green-400 font-bold text-sm uppercase tracking-wider">Coming Soon</span>
                                        </div>
                                      </div>
                                    )}
                                    <CardContent className="flex flex-col items-center justify-center p-4 h-full w-full gap-2">
                                        <brand.icon className="w-12 h-12 text-muted-foreground" />
                                        <p className="text-sm font-medium text-muted-foreground">{brand.name}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center mb-12">{t('home.news.title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {newsItems.map((item, index) => {
                const image = PlaceHolderImages.find(img => img.id === item.imageId);
                return (
                    <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        {item.id === 'coming-soon-features' ? (
                          <div className="relative aspect-video bg-muted flex flex-col items-center justify-center gap-2">
                            <Newspaper className="w-16 h-16 text-muted-foreground/50" />
                          </div>
                        ) : image && (
                            <div className="relative aspect-video">
                                <Image 
                                    src={image.imageUrl} 
                                    alt={t(`home.news.${item.id}.title`)}
                                    fill 
                                    className="object-cover" 
                                    data-ai-hint={image.imageHint} 
                                />
                            </div>
                        )}
                        <CardContent className="p-6 flex flex-col flex-1">
                        <Badge variant="secondary" className="w-fit mb-2">{t(`home.news.${item.id}.category`)}</Badge>
                        <h3 className="text-xl font-bold font-headline mb-2">{t(`home.news.${item.id}.title`)}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{item.date}</span>
                        </div>
                        <p className="text-muted-foreground flex-1 mb-6">{t(`home.news.${item.id}.description`)}</p>
                        <Button variant="outline" className="w-fit" onClick={() => setSelectedNews(item)}>{t('home.news.readMore')}</Button>
                        </CardContent>
                    </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center mb-12">{t('home.testimonials.title')}</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-4 h-full">
                      <Card className="h-full flex flex-col shadow-lg">
                        <CardContent className="flex-1 flex flex-col justify-between text-center p-6 gap-6">
                            <div className='flex-1'>
                                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                            </div>
                            <div>
                                <div className="flex justify-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`} />
                                    ))}
                                </div>
                                <p className="font-bold text-lg">{testimonial.name}</p>
                            </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

      </main>

      {selectedNews && (
        <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <Badge variant="secondary" className="w-fit mb-2">{t(`home.news.${selectedNews.id}.category`)}</Badge>
              <DialogTitle className="text-2xl font-headline">{t(`home.news.${selectedNews.id}.title`)}</DialogTitle>
              <DialogDescription className="flex items-center text-sm pt-1">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{selectedNews.date}</span>
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                {(() => {
                    if (selectedNews.id === 'coming-soon-features') {
                      return (
                        <div className="relative aspect-video mb-6 rounded-lg overflow-hidden bg-muted flex flex-col items-center justify-center gap-2">
                          <Newspaper className="w-24 h-24 text-muted-foreground/50" />
                        </div>
                      )
                    }
                    const image = PlaceHolderImages.find(img => img.id === selectedNews.imageId);
                    if (image) {
                        return (
                            <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
                                <Image 
                                    src={image.imageUrl} 
                                    alt={t(`home.news.${selectedNews.id}.title`)} 
                                    fill 
                                    className="object-cover"
                                    data-ai-hint={image.imageHint}
                                />
                            </div>
                        )
                    }
                    return null;
                })()}
                <p className="whitespace-pre-wrap text-foreground/90">{t(`home.news.${selectedNews.id}.fullText`)}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <p className="font-bold text-lg">Solution.am</p>
                <p className="text-sm text-muted-foreground">{t('home.footer.tagline')}</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href="mailto:info@solution.am" className="text-sm hover:text-primary">info@solution.am</a>
                </div>
                 <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href="tel:+37491989595" className="text-sm hover:text-primary">+37491989595</a>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{t('home.footer.address')}</span>
                </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>{t('home.footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
