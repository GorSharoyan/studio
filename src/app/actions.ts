'use server';

import { generateSolutions } from '@/ai/flows/generate-solutions-from-prompts';
import { summarizeSolutions } from '@/ai/flows/summarize-solutions-for-quick-review';
import { improveSolutionsBasedOnFeedback } from '@/ai/flows/improve-solutions-based-on-feedback';
import { askChatbot } from '@/ai/flows/site-chatbot';

export type Solution = {
  original: string;
  summary: string;
  improved?: string;
  feedback?: string;
};

export async function generate(prompt: string): Promise<{ solutions: Solution[], error: string | null }> {
  if (!prompt || prompt.length < 10) {
    return { solutions: [], error: "Prompt must be at least 10 characters long." };
  }

  try {
    const genSolutionsResult = await generateSolutions({ prompt });
    const solutions = genSolutionsResult.solutions;
    
    if (!solutions || solutions.length === 0) {
      return { solutions: [], error: 'Could not generate solutions. Please try a different prompt.' };
    }

    const { summaries } = await summarizeSolutions({ solutions });

    const combined: Solution[] = solutions.map((solution, index) => ({
      original: solution,
      summary: summaries[index] || 'Summary not available.',
    }));

    return { solutions: combined, error: null };
  } catch (error) {
    console.error(error);
    return { solutions: [], error: 'An unexpected error occurred. Please try again.' };
  }
}

export async function improve(prompt: string, solution: string, feedback: string): Promise<{ improvedSolution: string | null, error: string | null }> {
    if (!feedback || feedback.length < 5) {
        return { improvedSolution: null, error: "Feedback must be at least 5 characters long." };
    }
    
    try {
        const { improvedSolution } = await improveSolutionsBasedOnFeedback({
            prompt: prompt,
            generatedSolution: solution,
            feedback: feedback
        });
        return { improvedSolution, error: null };
    } catch (error) {
        console.error(error);
        return { improvedSolution: null, error: 'Failed to improve solution. Please try again.' };
    }
}

export async function chat(message: string): Promise<{ response: string | null, error: string | null }> {
  if (!message) {
    return { response: null, error: "Message cannot be empty." };
  }
  try {
    const { response } = await askChatbot({ message });
    return { response, error: null };
  } catch (error) {
    console.error(error);
    return { response: null, error: "I'm sorry, I encountered an error. Please try again." };
  }
}
