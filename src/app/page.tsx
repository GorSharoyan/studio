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
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>Built by Firebase Studio.</p>
      </footer>
    </div>
  );
}
