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
import { Loader2, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { StarRating } from '@/components/StarRating';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/use-language';

export default function FeedbackPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  const formSchema = z.object({
    firstName: z.string().min(2, { message: t('feedback.validation.firstNameMin') }),
    lastName: z.string().min(2, { message: t('feedback.validation.lastNameMin') }),
    feedback: z.string().min(10, { message: t('feedback.validation.feedbackMin') }).max(500),
  });


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      feedback: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    console.log(values);
    setSubmittedName(values.firstName);
    setIsSubmitted(true);
  }

  const handleRatingSubmit = (rating: number) => {
    console.log(`Rating submitted: ${rating}`);
    toast({
      title: t('feedback.submitted.ratingSuccessTitle'),
      description: t('feedback.submitted.ratingSuccessDescription'),
    });
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-headline font-bold text-center">
              {isSubmitted ? t('feedback.submitted.title').replace('{name}', submittedName) : t('feedback.title')}
            </CardTitle>
            <CardDescription className="text-center text-lg text-muted-foreground pt-2">
              {isSubmitted ? t('feedback.submitted.description') : t('feedback.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center">
                <ThumbsUp className="h-16 w-16 mx-auto text-primary mb-4" />
                <p className="mb-6">{t('feedback.submitted.received')}</p>
                <StarRating onSubmit={handleRatingSubmit} />
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('feedback.form.firstName')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('feedback.form.firstNamePlaceholder')} {...field} />
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
                          <FormLabel>{t('feedback.form.lastName')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('feedback.form.lastNamePlaceholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="feedback"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('feedback.form.yourFeedback')}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t('feedback.form.yourFeedbackPlaceholder')}
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
                    {t('feedback.form.submit')}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
