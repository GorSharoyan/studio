'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, Send } from 'lucide-react';
import { CardDescription } from '@/components/ui/card';

const formSchema = z.object({
  feedback: z.string().min(5, {
    message: 'Feedback must be at least 5 characters.',
  }),
});

type FeedbackFormProps = {
  onSubmit: (feedback: string) => void;
  isLoading: boolean;
};

export function FeedbackForm({ onSubmit, isLoading }: FeedbackFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: '',
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values.feedback);
    form.reset();
  }

  return (
    <div>
        <h4 className="font-semibold text-lg mb-2">Provide Feedback</h4>
        <CardDescription className="mb-4">
            Was this solution helpful? Let us know how we can improve it.
        </CardDescription>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-start gap-2">
            <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
                <FormItem className="flex-1">
                <FormControl>
                    <Input placeholder="e.g., 'This is a good start, but can you make it more specific...'" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Submit feedback</span>
            </Button>
        </form>
        </Form>
    </div>
  );
}
