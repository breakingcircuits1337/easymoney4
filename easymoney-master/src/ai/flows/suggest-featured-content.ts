'use server';

/**
 * @fileOverview An AI agent to suggest which affiliate offers and blog posts to feature prominently.
 *
 * - suggestFeaturedContent - A function that suggests content to feature.
 * - SuggestFeaturedContentInput - The input type for the suggestFeaturedContent function.
 * - SuggestFeaturedContentOutput - The return type for the suggestFeaturedContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFeaturedContentInputSchema = z.object({
  trendingSearches: z
    .array(z.string())
    .describe('A list of trending search queries.'),
  tagPopularity: z
    .record(z.string(), z.number())
    .describe('A map of tags to their popularity scores.'),
  affiliateOffers: z
    .array(z.string())
    .describe('A list of available affiliate offer names.'),
  blogPostTitles: z
    .array(z.string())
    .describe('A list of available blog post titles.'),
});
export type SuggestFeaturedContentInput = z.infer<
  typeof SuggestFeaturedContentInputSchema
>;

const SuggestFeaturedContentOutputSchema = z.object({
  featuredAffiliateOffers: z
    .array(z.string())
    .describe('A list of affiliate offers to feature.'),
  featuredBlogPosts: z
    .array(z.string())
    .describe('A list of blog posts to feature.'),
  reasoning: z
    .string()
    .describe('The AI reasoning for the suggestions made.'),
});
export type SuggestFeaturedContentOutput = z.infer<
  typeof SuggestFeaturedContentOutputSchema
>;

export async function suggestFeaturedContent(
  input: SuggestFeaturedContentInput
): Promise<SuggestFeaturedContentOutput> {
  return suggestFeaturedContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFeaturedContentPrompt',
  input: {schema: SuggestFeaturedContentInputSchema},
  output: {schema: SuggestFeaturedContentOutputSchema},
  prompt: `You are an AI assistant helping a website admin choose which affiliate offers and blog posts to feature on their homepage.

  Consider the following trending searches:
  {{#each trendingSearches}}- {{this}}\n{{/each}}

  And the following tag popularity scores:
  {{#each tagPopularity}}
  - Tag: {{@key}}, Popularity: {{this}}
  {{/each}}

  Available affiliate offers:
  {{#each affiliateOffers}}- {{this}}\n{{/each}}

  Available blog posts:
  {{#each blogPostTitles}}- {{this}}\n{{/each}}

  Based on this data, which affiliate offers and blog posts should be featured prominently to maximize click-through rates? Explain your reasoning.
  `,
});

const suggestFeaturedContentFlow = ai.defineFlow(
  {
    name: 'suggestFeaturedContentFlow',
    inputSchema: SuggestFeaturedContentInputSchema,
    outputSchema: SuggestFeaturedContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
