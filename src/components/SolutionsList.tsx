import type { Solution } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FeedbackForm } from './FeedbackForm';
import { Separator } from './ui/separator';
import { Lightbulb } from 'lucide-react';

type SolutionsListProps = {
  solutions: Solution[];
  isLoading: boolean;
  onFeedback: (index: number, feedback: string) => void;
  isImproving: number | null;
};

export function SolutionsList({ solutions, isLoading, onFeedback, isImproving }: SolutionsListProps) {
  if (isLoading) {
    return (
      <div className="mt-12 space-y-6">
        <h2 className="text-3xl font-headline font-bold text-center">Generating solutions...</h2>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="shadow-md">
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-full mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (solutions.length === 0) {
    return (
      <div className="mt-12 text-center text-muted-foreground">
        <p>Your generated solutions will appear here.</p>
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-6">
      <h2 className="text-3xl font-headline font-bold text-center">Generated Solutions</h2>
      {solutions.map((solution, index) => (
        <Card key={index} className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-primary" />
              Solution #{index + 1}
            </CardTitle>
            <CardDescription>{solution.summary}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 whitespace-pre-wrap">{solution.original}</p>
            
            {solution.improved ? (
              <div>
                <Separator className="my-6" />
                <h4 className="font-semibold text-lg mb-2">Improved Solution</h4>
                <p className="text-sm text-muted-foreground mb-2">Based on your feedback: "{solution.feedback}"</p>
                <blockquote className="border-l-4 border-accent pl-4 py-2 bg-accent/10">
                  <p className="italic text-accent-foreground/90">{solution.improved}</p>
                </blockquote>
              </div>
            ) : (
              <>
                <Separator className="my-6" />
                <FeedbackForm 
                  onSubmit={(feedback) => onFeedback(index, feedback)} 
                  isLoading={isImproving === index}
                />
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
