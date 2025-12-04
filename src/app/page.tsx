'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handshake, Mail, MapPin, MessageSquare, ShoppingCart, Star } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');
  const brandLogos = PlaceHolderImages.filter(img => img.id.startsWith('brand-logo'));
  
  const actionItems = [
    { title: 'Become a Dealer', icon: Handshake, href: '/dealer' },
    { title: 'Shop Now', icon: ShoppingCart, href: '/shop' },
    { title: 'Leave a Feedback', icon: MessageSquare, href: '/contacts' },
  ];

  const testimonials = [
    {
      name: 'Aram P.',
      initials: 'AP',
      quote: 'Solution.am has the best selection of parts. I found exactly what I needed for my car, and the quality was top-notch. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Sona G.',
      initials: 'SG',
      quote: "The customer service is outstanding. They helped me find the right part and it arrived faster than I expected. I'll definitely be a returning customer.",
      rating: 5,
    },
    {
      name: 'David M.',
      initials: 'DM',
      quote: "As a mechanic, I rely on quality parts. Solution.am delivers every time. Their creative solutions and reliable inventory make my job easier.",
      rating: 5,
    },
     {
      name: 'Lilit H.',
      initials: 'LH',
      quote: 'I was looking for a very specific part and they had it in stock! The website is easy to navigate and the whole process was seamless.',
      rating: 4,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="relative hero-section text-white py-20 md:py-32 rounded-lg overflow-hidden">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
              Solution.am
            </h1>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              As a leading importer of high-quality automobile parts in Armenia, Solution.am is dedicated to providing reliable and creative solutions for all your vehicle needs. This AI-powered tool helps you find solutions to common automotive problems.
            </p>
          </div>
        </div>

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
                                          <Link href={item.href}>Learn More</Link>
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
                        <CarouselItem key={logo.id} className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
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
            <h2 className="text-3xl font-headline font-bold text-center mb-12">What Our Customers Say</h2>
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
