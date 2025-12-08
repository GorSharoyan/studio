'use server';
/**
 * @fileOverview A simple chatbot that provides information about Solution.am.
 *
 * - askChatbot - A function that takes a user's question and returns an answer.
 * - ChatbotInput - The input type for the askChatbot function.
 * - ChatbotOutput - The return type for the askChatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatbotInputSchema = z.object({
  message: z.string().describe('The user\'s message or question to the chatbot.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the user\'s message.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function askChatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  return siteChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'siteChatbotPrompt',
  input: { schema: ChatbotInputSchema },
  output: { schema: ChatbotOutputSchema },
  prompt: `You are a friendly and helpful assistant for Solution.am, a leading reseller and importer of high-quality automobile parts in Armenia. Your goal is to answer user questions based on the information provided below. Keep your answers concise and directly related to the user's question.

  **About Solution.am:**
  - Established in 2015.
  - Leading reseller and importer of high-quality automobile parts in Armenia.
  - Slogan: "Creative Solutions for Modern Problems".
  - Contact: info@solution.am, +37491989595, Hakob Hakobyan St., 3 Building, Yerevan, Armenia.
  - Products: We sell a wide variety of car parts, including lamps (halogen, LED, xenon), filters, brake parts, and engine components. We carry brands like NAITE, Bosch, Hella, and Nissens.
  - Services: We help customers find the right parts, offer a loyalty program, and have a network of dealers.
  - How to become a dealer: Interested parties can fill out the form on our '/dealer' page.
  - How to give feedback: Customers can use the form on the '/feedback' page.
  - Shop: Our online shop is available at '/shop'.

  **Rules:**
  - If the question is not about Solution.am, its products, or services, politely state that you can only answer questions about the company.
  - Do not invent information. If you don't know the answer, say "I'm sorry, I don't have that information, but you can contact us at info@solution.am for more details."
  - Be friendly and professional.

  User Question: {{{message}}}
  Your Answer:
  `,
});

const siteChatbotFlow = ai.defineFlow(
  {
    name: 'siteChatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
