import { affiliateOffers } from '@/data/offers';
import { blogPosts } from '@/data/blog';
import { OfferCard } from '@/components/core/OfferCard';
import { BlogPostCard } from '@/components/core/BlogPostCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// For demonstration, feature the first few items. In a real app, this might be dynamic.
const featuredOffers = affiliateOffers.slice(0, 3);
const featuredBlogPosts = blogPosts.slice(0, 2);

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-secondary/50 rounded-lg shadow">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
            WELCOME TO THE EASYMONEY.SITE
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground">
            Explore top-tier affiliate offers and insightful articles designed to elevate your online journey.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/offers">Explore Offers</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">Read Our Blog <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">Featured Offers</h2>
          <Button variant="link" asChild>
            <Link href="/offers">View All Offers <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">Latest Posts</h2>
          <Button variant="link" asChild>
            <Link href="/blog">View All Posts <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {featuredBlogPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
