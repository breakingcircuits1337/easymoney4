import { blogPosts } from '@/data/blog';
import { TagBadge } from '@/components/core/TagBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { CalendarDays, UserCircle } from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  { params }: BlogPostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found - Affiliate Ascent',
    };
  }

  return {
    title: `${post.title} - Affiliate Ascent`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.imageUrl, // Replace with actual image URL if available
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}


export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 text-muted-foreground">
          <div className="flex items-center">
            <UserCircle className="mr-2 h-5 w-5" />
            <span>By Affiliate Ascent Team</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-5 w-5" />
            <time dateTime={post.datePublished}>
              {new Date(post.datePublished).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </header>

      <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg mb-8">
        <Image
          src={post.imageUrl}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          priority
          data-ai-hint={post.imageHint}
        />
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground leading-relaxed">
        {/* Basic content rendering. For markdown, you'd use a library like react-markdown */}
        <p>{post.content}</p>
      </div>

      <footer className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-3 text-foreground">Tags:</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </footer>
    </article>
  );
}
