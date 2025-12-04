'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';

export default function DealerPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    firstName: z.string().min(2, { message: t('dealer.validation.firstNameMin') }),
    lastName: z.string().min(2, { message: t('dealer.validation.lastNameMin') }),
    companyName: z.string().min(2, { message: t('dealer.validation.companyNameMin') }),
    contactInfo: z.string().min(5, { message: t('dealer.validation.contactInfoMin') }),
    reason: z.string().min(10, { message: t('dealer.validation.reasonMin') }).max(500),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      companyName: '',
      contactInfo: '',
      reason: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    console.log(values);
    toast({
      title: t('dealer.form.successTitle'),
      description: t('dealer.form.successDescription'),
    });
    form.reset();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-headline font-bold text-center">{t('dealer.title')}</CardTitle>
            <CardDescription className="text-center text-lg text-muted-foreground pt-2">
              {t('dealer.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('dealer.form.firstName')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('dealer.form.firstNamePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('dealer.form.lastName')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('dealer.form.lastNamePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('dealer.form.companyName')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('dealer.form.companyNamePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('dealer.form.contactInfo')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('dealer.form.contactInfoPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('dealer.form.reason')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('dealer.form.reasonPlaceholder')}
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full text-lg py-6">
                  {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  {t('dealer.form.submit')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
