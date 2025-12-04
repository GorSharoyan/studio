'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handshake, Mail, MapPin, MessageSquare, ShoppingCart } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');
  const brandLogos = PlaceHolderImages.filter(img => img.id.startsWith('brand-logo'));
  
  const actionItems = [
    { title: 'Become a Dealer', icon: Handshake },
    { title: 'Shop Now', icon: ShoppingCart },
    { title: 'Leave a Feedback', icon: MessageSquare },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex-1 px-4 pb-12">
        <div className="relative hero-section text-white py-20 md:py-32 my-8 rounded-lg overflow-hidden">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
              Solution.am
            </h1>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              As a leading importer of high-quality automobile parts in Armenia, Solution.am is dedicated to providing reliable and creative solutions for all your vehicle needs. This AI-powered tool helps you find solutions to common automotive problems.
            </p>
          </div>
        </div>

        <section className="py-12">
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
                                    <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                                        <item.icon className="w-12 h-12 text-primary" />
                                        <span className="text-xl font-semibold">{item.title}</span>
                                        <Button>Learn More</Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>

        <section className="py-16">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">Our Brands</h2>
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
                        <CarouselItem key={logo.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                            <div className="p-2">
                                <Card className="overflow-hidden">
                                    <CardContent className="flex aspect-square items-center justify-center p-4">
                                    <Image 
                                        src={logo.imageUrl}
                                        alt={logo.description}
                                        width={150}
                                        height={150}
                                        className="object-contain w-full h-full"
                                        data-ai-hint={logo.imageHint}
                                    />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>

      </main>
      <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <p className="font-bold text-lg">Solution.am</p>
                <p className="text-sm text-muted-foreground">Creative Solutions for Modern Problems</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href="mailto:contact@solution.am" className="text-sm hover:text-primary">contact@solution.am</a>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">123 Innovation Drive, Tech City</span>
                </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Solution.am. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
