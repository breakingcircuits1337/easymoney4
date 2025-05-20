import { FeaturedSuggestionsForm } from './components/FeaturedSuggestionsForm';

export const metadata = {
  title: 'Admin: Featured Content Suggestions - Affiliate Ascent',
  description: 'Use AI to get suggestions on which content to feature.',
};

export default function AdminFeaturedSuggestionsPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Featured Content Suggestions</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Leverage AI to optimize your content strategy.
        </p>
      </header>
      <FeaturedSuggestionsForm />
    </div>
  );
}
