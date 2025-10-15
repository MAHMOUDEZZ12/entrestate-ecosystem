
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { DataIntelligenceService } from '@/services/data-intelligence';
import { getMarketTrends } from '../market-intelligence/get-market-trends';

const WhatsMAPInputSchema = z.object({
  query: z.string().describe('The user\'s query.'),
  isPublic: z.boolean().optional().describe('Whether the query is from a public-facing chat.'),
});
type WhatsMAPInput = z.infer<typeof WhatsMAPInputSchema>;

const WhatsMAPOutputSchema = z.object({
  response: z.array(z.object({
    type: z.string().describe('The type of content to render.'),
    data: z.any().describe('The data for the content.'),
  })).describe('The rich, interactive response.'),
});
type WhatsMAPOutput = z.infer<typeof WhatsMAPOutputSchema>;

const whatsmapFlow = ai.defineFlow(
  {
    name: 'whatsmapFlow',
    inputSchema: WhatsMAPInputSchema,
    outputSchema: WhatsMAPOutputSchema,
  },
  async (input) => {
    const dataService = DataIntelligenceService.getInstance();

    const prompt = `You are the AI brain of the Entrestate Intelligence Operating System. Your name is WhatsMAP. You are a friendly, expert, and professional guide for real estate agents. Your task is to understand a user's query, determine their intent, and then generate a rich, interactive response.

      **User Query:** ${input.query}

      **Available Intents:**
      - **get_project_info:** The user is asking for information about a specific project.
      - **get_market_trends:** The user is asking for the latest market trends.
      - **create_listing_flow:** The user wants to see how a listing is created.
      - **onboard_user:** The user is a visitor who should be encouraged to sign up.

      **Instructions:**
      1.  Determine the user's intent from their query.
      2.  If the intent is 'get_project_info', find the project in the database and return a 'project-showcase' component.
      3.  If the intent is 'get_market_trends', call the getMarketTrends flow and return a 'market-trends' component.
      4.  If the intent is 'create_listing_flow', return a 'flow-showcase' component that demonstrates how to create a listing.
      5.  If the user is a public visitor (isPublic is true), and they ask a real estate question, answer their question and then return an 'onboarding' component.
      6.  Your response should be a JSON object that contains a list of components to be rendered by the client.
      `;

    const model = ai.getmodel('gemini-pro');
    const result = await model.generate(prompt);
    
    // In a real application, we would use a more sophisticated intent classification model.
    // For now, we'll use a simple heuristic.
    if (input.query.toLowerCase().includes('emaar')) {
        const project = dataService.getProjectById('dxboffplan-emaar-beachfront');
        return {
            response: [
                { type: 'text', data: { text: "Of course! Emaar is one of the top developers in Dubai. Here's a look at one of their most popular projects, Emaar Beachfront:" } },
                { type: 'project-showcase', data: { project } },
                { type: 'text', data: { text: "You can use this information to create a new listing, generate a brochure, or even launch a marketing campaign. Here's a quick example of how you could create a new listing for this project:" } },
                { type: 'flow-showcase', data: { flow: 'create-listing' } },
            ],
        };
    }
    
    if (input.isPublic) {
        return {
            response: [
                { type: 'text', data: { text: "I can help you with that. But first, let's get you set up with a free Entrestate membership so I can provide you with the best possible service." } },
                { type: 'onboarding', data: {} },
            ],
        };
    }

    return {
      response: [
          { type: 'text', data: { text: "I'm sorry, I don't understand that command. Try 'tell me about Emaar' or 'what are the latest market trends?'." } }
      ],
    };
  }
);

export async function runWhatsMAP(input: WhatsMAPInput): Promise<WhatsMAPOutput> {
    return whatsmapFlow(input);
}
