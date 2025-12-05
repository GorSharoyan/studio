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
import { Plus, Minus, Package } from 'lucide-react';

export default function Shop() {
  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price)), []);
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [country, setCountry] = useState('all');
  const [productType, setProductType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dialogQuantity, setDialogQuantity] = useState(1);
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

  const handleOpenDialog = (product: Product) => {
    setSelectedProduct(product);
    setDialogQuantity(1);
  }

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
    toast({
      title: t('shop.cartToast.title'),
      description: t('shop.cartToast.description').replace('{productName}', product.name),
    });
    setSelectedProduct(null); // Close dialog on add to cart
  };

  const getPartNumber = (description: string) => {
    const match = description.match(/Part No: ([\w\d\/-]+)/);
    return match ? match[1] : null;
  }

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
                    <span>{priceRange[0]} ֏</span>
                    <span>{priceRange[1]} ֏</span>
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
                  const partNumber = getPartNumber(product.description);
                  return (
                    <Card key={product.id} className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                      <CardHeader className="p-0">
                        <div className="aspect-[4/3] relative bg-muted flex items-center justify-center">
                          <Package className="w-24 h-24 text-muted-foreground/50" />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 flex-1 flex flex-col justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                          <div className="mt-2 text-sm space-y-1">
                            <p><span className="font-semibold">Brand:</span> {product.brand}</p>
                            {partNumber && <p><span className="font-semibold">Part No:</span> {partNumber}</p>}
                          </div>
                        </div>
                        <div className="space-y-3">
                            <div className='text-right'>
                                <p className="font-bold text-primary text-2xl">{product.price} ֏</p>
                                <p className="text-xs text-muted-foreground">Dealer Price (With VAT)</p>
                            </div>
                            <Button variant="outline" className="w-full" onClick={() => handleOpenDialog(product)}>{t('shop.quickView')}</Button>
                        </div>
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
              <div className="relative aspect-[4/3] bg-muted flex items-center justify-center rounded-md">
                <Package className="w-24 h-24 text-muted-foreground/50" />
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
                <div className="flex items-center gap-4">
                    <div>
                        <p className="text-2xl font-bold text-primary">{selectedProduct.price} ֏</p>
                        <p className="text-xs text-muted-foreground">Dealer Price (With VAT)</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setDialogQuantity(q => Math.max(1, q - 1))}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <Input 
                            type="number" 
                            className="w-16 h-8 text-center" 
                            value={dialogQuantity} 
                            onChange={(e) => setDialogQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            min="1"
                        />
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setDialogQuantity(q => q + 1)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
              <Button size="lg" onClick={() => handleAddToCart(selectedProduct, dialogQuantity)}>{t('shop.addToCart')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
