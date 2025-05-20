
export interface AffiliateOffer {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  tags: string[];
  imageHint?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  datePublished: string;
  tags: string[];
  imageUrl: string;
  imageHint?: string;
}
