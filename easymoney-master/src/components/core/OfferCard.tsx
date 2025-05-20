import type { AffiliateOffer } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TagBadge } from './TagBadge';
import { ArrowRight } from 'lucide-react';

interface OfferCardProps {
  offer: AffiliateOffer;
}

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl h-full">
      <div className="relative w-full h-48">
        <Image
          src={offer.imageUrl}
          alt={offer.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={offer.imageHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-semibold leading-tight">{offer.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm text-muted-foreground mb-4 min-h-[60px]">{offer.description}</CardDescription>
        <div className="flex flex-wrap gap-2">
          {offer.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="default">
          <Link href={offer.url} target="_blank" rel="noopener noreferrer">
            View Offer <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
