import type { BlogPost } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TagBadge } from './TagBadge';
import { ArrowRight, CalendarDays } from 'lucide-react';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl h-full">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative w-full h-48">
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={post.imageHint}
          />
        </div>
      </Link>
      <CardHeader>
        <Link href={`/blog/${post.slug}`} className="block">
          <CardTitle className="text-xl font-semibold leading-tight hover:text-primary transition-colors">{post.title}</CardTitle>
        </Link>
        <div className="text-xs text-muted-foreground mt-1 flex items-center">
          <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
          {new Date(post.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4 min-h-[60px]">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/blog/${post.slug}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
