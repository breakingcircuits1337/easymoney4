"use client";

import type { SuggestFeaturedContentInput, SuggestFeaturedContentOutput } from '@/ai/flows/suggest-featured-content';
import { suggestFeaturedContent } from '@/ai/flows/suggest-featured-content';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { affiliateOffers as allOffers } from '@/data/offers';
import { blogPosts as allPosts } from '@/data/blog';
import React, { useState, useTransition } from 'react';
import { Loader2 } from 'lucide-react';

const defaultTrendingSearches = "how to make money online, best manifestation techniques, attract women fast, wordpress themes, AI tools";
const defaultTagPopularity = "make money online:0.9, manifestation:0.8, relationship advice:0.7, AI:0.6, wordpress:0.5";


export function FeaturedSuggestionsForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [result, setResult] = useState<SuggestFeaturedContentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [trendingSearches, setTrendingSearches] = useState(defaultTrendingSearches);
  const [tagPopularityInput, setTagPopularityInput] = useState(defaultTagPopularity);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    const parsedTagPopularity: Record<string, number> = {};
    tagPopularityInput.split(',').forEach(pair => {
      const [key, value] = pair.split(':');
      if (key && value && !isNaN(parseFloat(value))) {
        parsedTagPopularity[key.trim()] = parseFloat(value.trim());
      }
    });

    const input: SuggestFeaturedContentInput = {
      trendingSearches: trendingSearches.split(',').map(s => s.trim()).filter(s => s),
      tagPopularity: parsedTagPopularity,
      affiliateOffers: allOffers.map(o => o.title),
      blogPostTitles: allPosts.map(p => p.title),
    };

    startTransition(async () => {
      try {
        const response = await suggestFeaturedContent(input);
        setResult(response);
        toast({
          title: "Suggestions Generated!",
          description: "AI has provided content suggestions.",
        });
      } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        setError(errorMessage);
        toast({
          title: "Error Generating Suggestions",
          description: errorMessage,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AI Content Feature Suggestions</CardTitle>
        <CardDescription>
          Get AI-powered recommendations for which affiliate offers and blog posts to feature based on trends and popularity.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="trendingSearches">Trending Searches (comma-separated)</Label>
            <Textarea
              id="trendingSearches"
              value={trendingSearches}
              onChange={(e) => setTrendingSearches(e.target.value)}
              placeholder="e.g., make money online, best cryptocurrency"
              rows={3}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagPopularity">Tag Popularity (tag:score, comma-separated)</Label>
            <Input
              id="tagPopularity"
              value={tagPopularityInput}
              onChange={(e) => setTagPopularityInput(e.target.value)}
              placeholder="e.g., crypto:0.9, AI:0.85, health:0.7"
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              Provide a comma-separated list of tags and their popularity scores (0.0 to 1.0).
            </p>
          </div>
          <div className="space-y-2">
            <Label>Available Affiliate Offers ({allOffers.length})</Label>
            <p className="text-sm text-muted-foreground truncate h-10 overflow-y-auto border p-2 rounded-md">
              {allOffers.map(o => o.title).join(', ')}
            </p>
          </div>
          <div className="space-y-2">
            <Label>Available Blog Posts ({allPosts.length})</Label>
             <p className="text-sm text-muted-foreground truncate h-10 overflow-y-auto border p-2 rounded-md">
              {allPosts.map(p => p.title).join(', ')}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-4">
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Get Suggestions
          </Button>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {result && (
            <div className="mt-6 p-4 border rounded-md bg-muted/50 w-full space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Suggestions:</h3>
              <div>
                <h4 className="font-medium text-primary">Featured Affiliate Offers:</h4>
                {result.featuredAffiliateOffers.length > 0 ? (
                  <ul className="list-disc list-inside text-sm">
                    {result.featuredAffiliateOffers.map((offer, index) => <li key={`offer-${index}`}>{offer}</li>)}
                  </ul>
                ) : <p className="text-sm text-muted-foreground">No specific offers suggested.</p>}
              </div>
              <div>
                <h4 className="font-medium text-primary">Featured Blog Posts:</h4>
                {result.featuredBlogPosts.length > 0 ? (
                  <ul className="list-disc list-inside text-sm">
                    {result.featuredBlogPosts.map((post, index) => <li key={`post-${index}`}>{post}</li>)}
                  </ul>
                ) : <p className="text-sm text-muted-foreground">No specific blog posts suggested.</p>}
              </div>
              <div>
                <h4 className="font-medium text-primary">Reasoning:</h4>
                <p className="text-sm whitespace-pre-wrap">{result.reasoning}</p>
              </div>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
