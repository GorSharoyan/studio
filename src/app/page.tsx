
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handshake, Mail, MapPin, MessageSquare, Phone, ShoppingCart, Star } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export default function Home() {
  const { t } = useLanguage();
  const brandLogos = PlaceHolderImages.filter(img => img.id.startsWith('brand-logo'));
  
  const actionItems = [
    { title: t('home.actions.dealer'), icon: Handshake, href: '/dealer' },
    { title: t('home.actions.shop'), icon: ShoppingCart, href: '/shop' },
    { title: t('home.actions.feedback'), icon: MessageSquare, href: '/feedback' },
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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="text-foreground py-20 md:py-32 rounded-lg overflow-hidden bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl text-primary">
              {t('home.hero.title')}
            </h1>
            <p className="mt-4 text-lg max-w-2xl mx-auto text-foreground/80">
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

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">{t('home.brands.title')}</h2>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                    dragFree: true,
                }}
                className="w-full max-w-6xl mx-auto"
            >
                <CarouselContent>
                    {brandLogos.map((logo) => (
                        <CarouselItem key={logo.id} className="basis-1/4 sm:basis-1/5 md:basis-1/6 lg:basis-1/8">
                            <div className="p-2">
                                <Card className="overflow-hidden aspect-square">
                                    <CardContent className="flex items-center justify-center p-4 h-full w-full">
                                    <Image 
                                        src={logo.imageUrl}
                                        alt={logo.description}
                                        width={150}
                                        height={150}
                                        className="object-contain max-h-full max-w-full"
                                        data-ai-hint={logo.imageHint}
                                    />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
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
