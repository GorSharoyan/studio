import { config } from 'dotenv';
config();

import '@/ai/flows/generate-solutions-from-prompts.ts';
import '@/ai/flows/improve-solutions-based-on-feedback.ts';
import '@/ai/flows/summarize-solutions-for-quick-review.ts';
