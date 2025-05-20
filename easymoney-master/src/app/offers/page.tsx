import { affiliateOffers } from '@/data/offers';
import { OfferCard } from '@/components/core/OfferCard';

export const metadata = {
  title: 'Affiliate Offers - Affiliate Ascent',
  description: 'Browse our curated list of high-converting affiliate offers.',
};

export default function OffersPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Our Affiliate Offers</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover a range of opportunities to boost your earnings.
        </p>
      </header>
      
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {affiliateOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
}
