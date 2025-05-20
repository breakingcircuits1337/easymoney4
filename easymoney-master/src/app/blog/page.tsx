import { blogPosts } from '@/data/blog';
import { BlogPostCard } from '@/components/core/BlogPostCard';

export const metadata = {
  title: 'Blog - Affiliate Ascent',
  description: 'Read our latest articles on affiliate marketing, online business, and more.',
};

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">THE EASYMONEY.SITE</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Insights, tips, and strategies for your online success.
        </p>
      </header>
      
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
