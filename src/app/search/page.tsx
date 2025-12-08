
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, ShoppingBag, Newspaper } from 'lucide-react';
import type { Product } from '@/lib/types';
import Image from 'next/image';

type NewsItem = {
  id: string;
  date: string;
  imageId: string;
};

const newsItems: NewsItem[] = [
  { id: 'partnership', date: 'August 15, 2024', imageId: 'news-partnership' },
  { id: 'maintenance', date: 'August 10, 2024', imageId: 'news-maintenance' },
  { id: 'loyalty', date: 'August 5, 2024', imageId: 'news-loyalty' },
  { id: 'coming-soon-features', date: 'September 1, 2024', imageId: 'news-coming-soon' },
];

const staticPages = [
    { type: 'page', titleKey: 'header.contacts', descriptionKey: 'contacts.description', href:'/contacts'},
    { type: 'page', titleKey: 'header.dealer', descriptionKey: 'dealer.description', href:'/dealer'},
    { type: 'page', titleKey: 'header.feedback', descriptionKey: 'feedback.description', href:'/feedback'},
    { type: 'page', titleKey: 'header.shop', descriptionKey: 'shop.title', href:'/shop'},
];

function SearchResults() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const lowerCaseQuery = query.toLowerCase();

  const productResults = products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery)
  );

  const newsResults = newsItems.filter((item) => {
      const title = t(`home.news.${item.id}.title`);
      const description = t(`home.news.${item.id}.description`);
      const fullText = t(`home.news.${item.id}.fullText`);
      return title.toLowerCase().includes(lowerCaseQuery) ||
             description.toLowerCase().includes(lowerCaseQuery) ||
             fullText.toLowerCase().includes(lowerCaseQuery);
  });

  const pageResults = staticPages.filter(page => {
      const title = t(page.titleKey);
      const description = t(page.descriptionKey);
      return title.toLowerCase().includes(lowerCaseQuery) || description.toLowerCase().includes(lowerCaseQuery);
  });

  const totalResults = productResults.length + newsResults.length + pageResults.length;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <h1 className="text-4xl font-headline font-bold mb-2">
          {t('search.title')}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
            {totalResults > 0 
                ? `${totalResults} ${t('search.resultsFoundFor')} "${query}"`
                : `${t('search.noResultsFoundFor')} "${query}"`
            }
        </p>

        <div className="space-y-12">
            {productResults.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold font-headline mb-6 flex items-center gap-2"><ShoppingBag/> {t('search.products')} ({productResults.length})</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {productResults.map((product) => (
                             <Card key={product.id} className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                                <CardHeader>
                                    <CardTitle className="text-lg">{product.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col justify-between">
                                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1 mb-4">{product.description}</p>
                                    <Button asChild variant="outline">
                                        <Link href={`/shop?q=${encodeURIComponent(product.name)}`}>{t('search.viewProduct')}</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

            {newsResults.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold font-headline mb-6 flex items-center gap-2"><Newspaper/> {t('search.news')} ({newsResults.length})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {newsResults.map((item) => (
                           <Card key={item.id}>
                               <CardHeader>
                                   <Badge variant="secondary" className="w-fit mb-2">{t(`home.news.${item.id}.category`)}</Badge>
                                   <CardTitle>{t(`home.news.${item.id}.title`)}</CardTitle>
                                   <CardDescription>{t(`home.news.${item.id}.description`)}</CardDescription>
                               </CardHeader>
                               <CardContent>
                                   <Button asChild variant="outline">
                                       <Link href="/">{t('search.readMore')}</Link>
                                   </Button>
                               </CardContent>
                           </Card>
                       ))}
                    </div>
                </section>
            )}

             {pageResults.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold font-headline mb-6 flex items-center gap-2"><FileText/> {t('search.pages')} ({pageResults.length})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {pageResults.map((page) => (
                           <Card key={page.href}>
                               <CardHeader>
                                   <CardTitle>{t(page.titleKey)}</CardTitle>
                                   <CardDescription>{t(page.descriptionKey)}</CardDescription>
                               </CardHeader>
                               <CardContent>
                                   <Button asChild variant="outline">
                                       <Link href={page.href}>{t('search.goToPage')}</Link>
                                   </Button>
                               </CardContent>
                           </Card>
                       ))}
                    </div>
                </section>
            )}

        </div>
      </main>
    </div>
  );
}


export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading search results...</div>}>
            <SearchResults />
        </Suspense>
    )
}
