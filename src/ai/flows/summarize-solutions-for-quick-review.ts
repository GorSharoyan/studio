'use server';

/**
 * @fileOverview Summarizes generated solutions for quick review.
 *
 * - summarizeSolutions - A function that summarizes solutions.
 * - SummarizeSolutionsInput - The input type for the summarizeSolutions function.
 * - SummarizeSolutionsOutput - The return type for the summarizeSolutions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSolutionsInputSchema = z.object({
  solutions: z.array(z.string()).describe('An array of generated solutions.'),
});
export type SummarizeSolutionsInput = z.infer<typeof SummarizeSolutionsInputSchema>;

const SummarizeSolutionsOutputSchema = z.object({
  summaries: z.array(z.string()).describe('An array of summaries for the solutions.'),
});
export type SummarizeSolutionsOutput = z.infer<typeof SummarizeSolutionsOutputSchema>;

export async function summarizeSolutions(input: SummarizeSolutionsInput): Promise<SummarizeSolutionsOutput> {
  return summarizeSolutionsFlow(input);
}

const summarizeSolutionPrompt = ai.definePrompt({
  name: 'summarizeSolutionPrompt',
  input: {schema: z.object({solution: z.string()})},
  output: {schema: z.object({summary: z.string()})},
  prompt: `Summarize the following solution in one sentence:\n\n{{solution}}`,
});

const summarizeSolutionsFlow = ai.defineFlow(
  {
    name: 'summarizeSolutionsFlow',
    inputSchema: SummarizeSolutionsInputSchema,
    outputSchema: SummarizeSolutionsOutputSchema,
  },
  async input => {
    const summaries = [];
    for (const solution of input.solutions) {
      const {output} = await summarizeSolutionPrompt({solution});
      summaries.push(output!.summary);
    }
    return {summaries};
  }
);
