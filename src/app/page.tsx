'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { PromptForm } from '@/components/PromptForm';
import { SolutionsList } from '@/components/SolutionsList';
import type { Solution } from '@/app/actions';
import { generate, improve } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BrainCircuit, Mail, MapPin } from 'lucide-react';

export default function Home() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isImproving, setIsImproving] = useState<number | null>(null);
  const { toast } = useToast();

  const handleGenerate = async (newPrompt: string) => {
    setIsLoading(true);
    setError(null);
    setSolutions([]);
    setPrompt(newPrompt);

    const result = await generate(newPrompt);

    setIsLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSolutions(result.solutions);
    }
  };

  const handleFeedback = async (index: number, feedback: string) => {
    setIsImproving(index);
    const solutionToImprove = solutions[index];
    if (!solutionToImprove) {
      setIsImproving(null);
      return;
    }

    const result = await improve(prompt, solutionToImprove.original, feedback);

    const newSolutions = [...solutions];
    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Feedback Error',
        description: result.error,
      });
    } else {
      newSolutions[index] = { ...newSolutions[index], improved: result.improvedSolution || 'Could not improve.', feedback };
    }
    setSolutions(newSolutions);
    setIsImproving(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex-1 px-4 pb-12">
        <div className="py-8 md:py-12 text-center">
          <div className="flex items-center justify-center gap-4">
            <BrainCircuit className="h-10 w-10 text-primary" />
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              PromptSolutions
            </h1>
          </div>
          <p className="mt-4 text-lg text-muted-foreground">
            Your AI-powered partner for creative problem-solving.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <PromptForm onSubmit={handleGenerate} isLoading={isLoading} />
          {error && (
            <Alert variant="destructive" className="mt-8">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <SolutionsList 
            solutions={solutions} 
            isLoading={isLoading} 
            onFeedback={handleFeedback} 
            isImproving={isImproving}
          />
        </div>
      </main>
      <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <p className="font-bold text-lg">Solution.am</p>
                <p className="text-sm text-muted-foreground">Creative Solutions for Modern Problems</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href="mailto:contact@solution.am" className="text-sm hover:text-primary">contact@solution.am</a>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">123 Innovation Drive, Tech City</span>
                </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Solution.am. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
