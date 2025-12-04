'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import Image from 'next/image';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'am', name: 'Հայերեն', flag: '🇦🇲' },
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

const getProductImage = (imageId: string) => {
    return productImages.find(img => img.id === imageId) || { url: 'https://placehold.co/64x64', hint: 'placeholder'};
}


export function Header() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Solution.am
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Shop
            </Link>
            <Link
              href="/contacts"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Contacts
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
              <span className="sr-only">Shopping Cart</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Shopping Cart</SheetTitle>
            </SheetHeader>
            {cart.length > 0 ? (
              <>
                <ScrollArea className="h-[calc(100vh-150px)] pr-4">
                  <div className="flex flex-col gap-4 py-4">
                    {cart.map(item => {
                      const image = getProductImage(item.product.imageId);
                      return (
                        <div key={item.product.id} className="flex items-center gap-4">
                          <Image src={image.url} alt={item.product.name} width={64} height={64} className="rounded-md object-cover" />
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
                      <span>Total</span>
                      <span>${getTotalPrice()}</span>
                    </div>
                    <Button className="w-full mt-4">Checkout</Button>
                  </div>
                </SheetFooter>
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">Your cart is empty.</p>
              </div>
            )}
            
          </SheetContent>
        </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span>{selectedLanguage.flag}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map(lang => (
                <DropdownMenuItem
                  key={lang.code}
                  onSelect={() => setSelectedLanguage(lang)}
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
