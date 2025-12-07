

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handshake, Mail, MapPin, MessageSquare, Phone, ShoppingCart, Star, Car, Lightbulb, Wrench, Fan, Cog, Droplets, Shield, Battery, Filter, Search, Calendar, Newspaper } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { Badge } from '@/components/ui/badge';
import Autoplay from "embla-carousel-autoplay";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type NewsItem = {
  title: string;
  date: string;
  category: string;
  description: string;
  imageId: string;
  fullText: string;
};


export default function Home() {
  const { t } = useLanguage();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
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
    { name: 'Liqui Moly', icon: Droplets },
    { name: 'Brembo', icon: Shield },
    { name: 'Mahle', icon: Filter },
    { name: 'Philips Automotive', icon: Lightbulb },
    { name: 'MANN-Filter', icon: Filter },
    { name: 'TRW', icon: Shield },
    { name: 'KYB', icon: Shield },
    { name: 'NGK', icon: Cog },
    { name: 'Shell Helix', icon: Droplets },
    { name: 'KoyoRad', icon: Fan },
    { name: 'Osram', icon: Lightbulb },
    { name: 'SKF', icon: Cog },
    { name: 'Sachs', icon: Cog },
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
      title: 'New Partnership with Major European Supplier',
      date: 'August 15, 2024',
      category: 'Business',
      description: 'We are thrilled to announce a new partnership that will expand our inventory with high-quality European parts, bringing you even more options.',
      imageId: 'news-partnership',
      fullText: 'Solution.am is excited to announce a strategic partnership with one of Europe\'s leading automotive parts manufacturers. This collaboration will significantly broaden our inventory, bringing a wider range of high-quality, certified European parts to the Armenian market. Our customers can now expect an even greater selection of reliable components for brands like BMW, Mercedes-Benz, Audi, and Volkswagen. This partnership underscores our commitment to providing the best possible products and creative solutions to meet the evolving needs of modern vehicles. We believe this will solidify our position as the top choice for auto parts in the region.'
    },
    {
      title: 'Tips for Summer Car Maintenance',
      date: 'August 10, 2024',
      category: 'DIY',
      description: 'The summer heat can be tough on your vehicle. Read our top tips for keeping your car in perfect condition during the hottest months.',
      imageId: 'news-maintenance',
      fullText: 'Summer in Armenia can be demanding on any vehicle. To avoid unexpected breakdowns, it’s crucial to perform regular maintenance. Here are our top tips:\n\n1. **Check Your Coolant:** Your engine\'s cooling system works overtime in the heat. Ensure your coolant is at the correct level and is clean. We recommend a coolant flush every two years.\n2. **Inspect Your Tires:** Hot asphalt increases tire pressure. Check your tire pressure in the morning before driving and ensure it matches your vehicle\'s recommended PSI. Don\'t forget to inspect the tread for wear.\n3. **Test Your Battery:** High temperatures can accelerate battery degradation. Visit us for a free battery test to ensure it holds a charge properly.\n4. **Protect Your Interior:** Use a sunshade to protect your dashboard from cracking and to keep the cabin temperature down.\n\nFollowing these simple steps can save you from costly repairs and keep you safe on the road all summer long.'
    },
    {
        title: 'Announcing Our New Loyalty Program',
        date: 'August 5, 2024',
        category: 'Company',
        description: 'We are excited to launch our new loyalty program to reward our amazing customers. Start earning points on every purchase today!',
        imageId: 'news-loyalty',
        fullText: 'At Solution.am, we value our customers. To show our appreciation, we are thrilled to launch the new "Solution Rewards" loyalty program! Starting today, every purchase you make, whether in-store or online, will earn you points that can be redeemed for discounts on future purchases, exclusive merchandise, and special services. Signing up is free and easy. Simply create an account on our website or ask one of our team members in-store. As a welcome bonus, you\'ll receive 100 points just for joining! Thank you for being a part of the Solution.am family. We look forward to rewarding your loyalty.'
    },
  ];

  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background-2');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="relative text-foreground py-20 md:py-32 rounded-lg overflow-hidden">
        {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover z-0"
              data-ai-hint={heroImage.imageHint}
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
                                        <div className="absolute top-1 -right-8 z-10">
                                            <div className="w-28 transform rotate-45 bg-green-500 text-center text-white font-semibold py-0.5 text-[10px]">
                                                Coming Soon
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
            <h2 className="text-3xl font-headline font-bold text-center mb-12">Latest News</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {newsItems.map((item, index) => {
                const image = PlaceHolderImages.find(img => img.id === item.imageId);
                return (
                    <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        {image && (
                            <div className="relative aspect-video">
                                <Image 
                                    src={image.imageUrl} 
                                    alt={item.title} 
                                    fill 
                                    className="object-cover" 
                                    data-ai-hint={image.imageHint} 
                                />
                            </div>
                        )}
                        <CardContent className="p-6 flex flex-col flex-1">
                        <Badge variant="secondary" className="w-fit mb-2">{item.category}</Badge>
                        <h3 className="text-xl font-bold font-headline mb-2">{item.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{item.date}</span>
                        </div>
                        <p className="text-muted-foreground flex-1 mb-6">{item.description}</p>
                        <Button variant="outline" className="w-fit" onClick={() => setSelectedNews(item)}>Read More</Button>
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
              <Badge variant="secondary" className="w-fit mb-2">{selectedNews.category}</Badge>
              <DialogTitle className="text-2xl font-headline">{selectedNews.title}</DialogTitle>
              <DialogDescription className="flex items-center text-sm pt-1">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{selectedNews.date}</span>
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                {(() => {
                    const image = PlaceHolderImages.find(img => img.id === selectedNews.imageId);
                    if (image) {
                        return (
                            <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
                                <Image 
                                    src={image.imageUrl} 
                                    alt={selectedNews.title} 
                                    fill 
                                    className="object-cover"
                                    data-ai-hint={image.imageHint}
                                />
                            </div>
                        )
                    }
                    return null;
                })()}
                <p className="whitespace-pre-wrap text-foreground/90">{selectedNews.fullText}</p>
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
