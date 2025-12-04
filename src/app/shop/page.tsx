'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';

const products: Product[] = [
  { id: 1, name: 'Brake Pads', price: 50, country: 'Germany', type: 'Brakes', imageId: 'product-1' },
  { id: 2, name: 'Oil Filter', price: 15, country: 'USA', type: 'Engine', imageId: 'product-2' },
  { id: 3, name: 'Air Filter', price: 25, country: 'Japan', type: 'Engine', imageId: 'product-3' },
  { id: 4, name: 'Spark Plugs', price: 30, country: 'Germany', type: 'Engine', imageId: 'product-4' },
  { id: 5, name: 'Suspension Kit', price: 250, country: 'USA', type: 'Suspension', imageId: 'product-5' },
  { id: 6, name: 'Headlight Bulb', price: 10, country: 'China', type: 'Lighting', imageId: 'product-6' },
  { id: 7, name: 'Brake Rotor', price: 80, country: 'Germany', type: 'Brakes', imageId: 'product-7' },
  { id: 8, name: 'Battery', price: 120, country: 'South Korea', type: 'Electrical', imageId: 'product-8' },
];

const productImages = [
    { id: 'product-1', url: 'https://picsum.photos/seed/p1/400/300', hint: 'brake pads' },
    { id: 'product-2', url: 'https://picsum.photos/seed/p2/400/300', hint: 'oil filter' },
    { id: 'product-3', url: 'https://picsum.photos/seed/p3/400/300', hint: 'air filter' },
    { id: 'product-4', url: 'https://picsum.photos/seed/p4/400/300', hint: 'spark plugs' },
    { id: 'product-5', url: 'https://picsum.photos/seed/p5/400/300', hint: 'suspension' },
    { id: 'product-6', url: 'https://picsum.photos/seed/p6/400/300', hint: 'light bulb' },
    { id: 'product-7', url: 'https://picsum.photos/seed/p7/400/300', hint: 'brake rotor' },
    { id: 'product-8', url: 'https://picsum.photos/seed/p8/400/300', hint: 'car battery' },
]

export default function Shop() {
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [country, setCountry] = useState('all');
  const [productType, setProductType] = useState('all');
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { t } = useLanguage();

  const countries = useMemo(() => ['all', ...new Set(products.map(p => p.country))], []);
  const productTypes = useMemo(() => ['all', ...new Set(products.map(p => p.type))], []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const [minPrice, maxPrice] = priceRange;
      const isPriceMatch = product.price >= minPrice && product.price <= maxPrice;
      const isCountryMatch = country === 'all' || product.country === country;
      const isTypeMatch = productType === 'all' || product.type === productType;
      return isPriceMatch && isCountryMatch && isTypeMatch;
    });
  }, [priceRange, country, productType]);

  const getProductImage = (imageId: string) => {
      return productImages.find(img => img.id === imageId) || { url: 'https://placehold.co/400x300', hint: 'placeholder'};
  }
  
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: t('shop.cartToast.title'),
      description: t('shop.cartToast.description').replace('{productName}', product.name),
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-4xl font-headline font-bold mb-8">{t('shop.title')}</h1>
        <div className="grid md:grid-cols-4 gap-8">
          {/* Filters */}
          <aside className="md:col-span-1 bg-card p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">{t('shop.filters.title')}</h2>
            <div className="space-y-6">
              <div>
                <label className="text-lg font-medium">{t('shop.filters.priceRange')}</label>
                <div className="mt-2">
                  <Slider
                    min={0}
                    max={300}
                    step={10}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value)}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <label htmlFor="country-select" className="text-lg font-medium">{t('shop.filters.country')}</label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger id="country-select" className="mt-2">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(c => <SelectItem key={c} value={c}>{c === 'all' ? t('shop.filters.allCountries') : c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div>
                <label htmlFor="type-select" className="text-lg font-medium">{t('shop.filters.productType')}</label>
                <Select value={productType} onValueChange={setProductType}>
                  <SelectTrigger id="type-select" className="mt-2">
                    <SelectValue placeholder="Select a product type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map(type => <SelectItem key={type} value={type}>{type === 'all' ? t('shop.filters.allTypes') : type}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </aside>

          {/* Products */}
          <section className="md:col-span-3">
            {filteredProducts.length > 0 ? (
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {filteredProducts.map(product => {
                            const image = getProductImage(product.imageId);
                            return (
                                <CarouselItem key={product.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                                <div className="p-1 h-full">
                                    <Card className="h-full flex flex-col">
                                        <CardHeader>
                                            <div className="aspect-[4/3] relative rounded-t-lg overflow-hidden">
                                                <Image 
                                                    src={image.url}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                    data-ai-hint={image.hint}
                                                />
                                            </div>
                                        </CardHeader>
                                        <CardContent className="flex-1 flex flex-col justify-between">
                                          <div>
                                              <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                                              <p className="font-bold text-primary text-lg">${product.price}</p>
                                              <p className="text-sm text-muted-foreground">{product.type} from {product.country}</p>
                                          </div>
                                          <Button className="w-full mt-4" onClick={() => handleAddToCart(product)}>{t('shop.addToCart')}</Button>
                                        </CardContent>
                                    </Card>
                                </div>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2" />
                    <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2" />
                </Carousel>
            ) : (
                <div className="flex items-center justify-center h-full bg-card rounded-lg shadow-sm p-8">
                    <p className="text-muted-foreground text-lg">{t('shop.noProducts')}</p>
                </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
