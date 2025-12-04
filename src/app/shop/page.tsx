'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { products } from '@/lib/products';

export default function Shop() {
  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price)), []);
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [country, setCountry] = useState('all');
  const [productType, setProductType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { t } = useLanguage();

  const countries = useMemo(() => ['all', ...Array.from(new Set(products.map(p => p.country)))], []);
  const productTypes = useMemo(() => ['all', ...Array.from(new Set(products.map(p => p.type)))], []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const [minPrice, maxPrice] = priceRange;
      const isPriceMatch = product.price >= minPrice && product.price <= maxPrice;
      const isCountryMatch = country === 'all' || product.country === country;
      const isTypeMatch = productType === 'all' || product.type === productType;
      const isSearchMatch = searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return isPriceMatch && isCountryMatch && isTypeMatch && isSearchMatch;
    });
  }, [priceRange, country, productType, searchTerm]);

  const getProductImage = (imageId: string) => {
    return PlaceHolderImages.find(img => img.id === imageId) || { imageUrl: 'https://placehold.co/400x300', imageHint: 'placeholder' };
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: t('shop.cartToast.title'),
      description: t('shop.cartToast.description').replace('{productName}', product.name),
    });
    setSelectedProduct(null); // Close dialog on add to cart
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-4xl font-headline font-bold mb-8">{t('shop.title')}</h1>
        <div className="grid md:grid-cols-4 gap-8">
          {/* Filters */}
          <aside className="md:col-span-1 bg-card p-6 rounded-lg shadow-sm h-fit sticky top-20">
            <h2 className="text-2xl font-semibold mb-6">{t('shop.filters.title')}</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="search-input" className="text-lg font-medium">{t('shop.filters.searchByName')}</label>
                <Input
                  id="search-input"
                  placeholder={t('shop.filters.searchPlaceholder')}
                  className="mt-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Separator />
              <div>
                <label className="text-lg font-medium">{t('shop.filters.priceRange')}</label>
                <div className="mt-2">
                  <Slider
                    min={0}
                    max={maxPrice}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => {
                  const image = getProductImage(product.imageId);
                  return (
                    <Card key={product.id} className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer flex flex-col" onClick={() => setSelectedProduct(product)}>
                      <CardHeader className="p-0">
                        <div className="aspect-[4/3] relative">
                          <Image
                            src={image.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                          <p className="font-bold text-primary text-lg">${product.price}</p>
                        </div>
                        <Button variant="outline" className="w-full mt-4">{t('shop.quickView')}</Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full bg-card rounded-lg shadow-sm p-8">
                <p className="text-muted-foreground text-lg">{t('shop.noProducts')}</p>
              </div>
            )}
          </section>
        </div>
      </main>

      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={(isOpen) => !isOpen && setSelectedProduct(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{selectedProduct.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="relative aspect-[4/3]">
                <Image
                  src={getProductImage(selectedProduct.imageId).imageUrl}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover rounded-md"
                  data-ai-hint={getProductImage(selectedProduct.imageId).imageHint}
                />
              </div>
              <div className="flex flex-col">
                <DialogDescription className="text-base text-foreground flex-1">
                  {selectedProduct.description}
                </DialogDescription>
                <div className="text-sm text-muted-foreground mt-4">
                  <p><span className="font-semibold">{t('shop.modal.brand')}:</span> {selectedProduct.brand}</p>
                  <p><span className="font-semibold">{t('shop.modal.origin')}:</span> {selectedProduct.country}</p>
                </div>
              </div>
            </div>
            <DialogFooter className="sm:justify-between items-center">
              <p className="text-2xl font-bold text-primary">${selectedProduct.price}</p>
              <Button size="lg" onClick={() => handleAddToCart(selectedProduct)}>{t('shop.addToCart')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
