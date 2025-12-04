import { BrainCircuit } from 'lucide-react';

export function Header() {
  return (
    <header className="py-8 md:py-12">
      <div className="container mx-auto px-4 text-center">
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
    </header>
  );
}
