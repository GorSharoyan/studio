
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import Image from 'next/image';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { useLanguage, languages } from '@/hooks/use-language';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getProductImage = (imageId: string) => {
    return PlaceHolderImages.find(img => img.id === imageId) || { imageUrl: 'https://placehold.co/64x64', imageHint: 'placeholder'};
}

export function Header() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();

  const handleCheckout = () => {
    toast({
      title: t('header.cart.checkoutUnavailable.title'),
      description: t('header.cart.checkoutUnavailable.description'),
    });
    clearCart();
    router.push('/contacts');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
                src="/assets/solution.am_logo.png"
                alt="Solution.am Logo"
                width={140}
                height={40}
                className="object-contain"
            />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t('header.home')}
            </Link>
            <Link
              href="/shop"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t('header.shop')}
            </Link>
            <Link
              href="/contacts"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              {t('header.contacts')}
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center rounded-full p-0 text-xs">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </Badge>
              )}
              <span className="sr-only">{t('header.cart.title')}</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{t('header.cart.title')}</SheetTitle>
            </SheetHeader>
            {cart.length > 0 ? (
              <>
                <ScrollArea className="h-[calc(100vh-150px)] pr-4">
                  <div className="flex flex-col gap-4 py-4">
                    {cart.map(item => {
                      const image = getProductImage(item.product.imageId);
                      return (
                        <div key={item.product.id} className="flex items-center gap-4">
                          <Image src={image.imageUrl} alt={item.product.name} width={64} height={64} className="rounded-md object-cover" />
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.product.name}</h4>
                            <p className="text-sm text-muted-foreground">${item.product.price}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</Button>
                              <span>{item.quantity}</span>
                              <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</Button>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => removeFromCart(item.product.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
                <SheetFooter className="mt-4 pt-4 border-t">
                  <div className="w-full">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>{t('header.cart.total')}</span>
                      <span>${getTotalPrice()}</span>
                    </div>
                    <SheetClose asChild>
                      <Button className="w-full mt-4" onClick={handleCheckout}>{t('header.cart.checkout')}</Button>
                    </SheetClose>
                  </div>
                </SheetFooter>
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">{t('header.cart.empty')}</p>
              </div>
            )}
            
          </SheetContent>
        </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span>{language.flag}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map(lang => (
                <DropdownMenuItem
                  key={lang.code}
                  onSelect={() => setLanguage(lang.code)}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

    
