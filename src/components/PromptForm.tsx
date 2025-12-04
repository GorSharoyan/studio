'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const formSchema = z.object({
  prompt: z.string().min(10, {
    message: 'Your prompt must be at least 10 characters long.',
  }).max(1000, {
    message: 'Your prompt must be less than 1000 characters.',
  }),
});

type PromptFormProps = {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
};

export function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values.prompt);
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Let's solve a problem</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Describe your problem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., How can I improve my team's remote collaboration and maintain high morale?"
                      className="min-h-[120px] resize-none text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full text-lg py-6">
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-5 w-5" />
              )}
              Generate Solutions
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
