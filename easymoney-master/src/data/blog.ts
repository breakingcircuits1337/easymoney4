
import type { BlogPost } from '@/types';
import { slugify } from '@/lib/utils';

const rawBlogPosts: Omit<BlogPost, 'id' | 'slug' | 'imageUrl' | 'imageHint' | 'excerpt' | 'datePublished'>[] = [
  {
    title: 'Getting Started with Affiliate Marketing',
    content: "Affiliate marketing is a great way to earn money online by promoting products or services and earning a commission for each sale made through your referral. To get started, choose a niche you're passionate about and sign up for affiliate programs like Amazon Associates, ShareASale, or CJ Affiliate. Create content around your niche on a blog, social media, or YouTube, and include your affiliate links. Focus on providing value to your audience to build trust and increase conversions.",
    tags: ['affiliate marketing', 'make money online'],
  },
  {
    title: 'Maximizing Your Affiliate Earnings',
    content: "To maximize your earnings from affiliate links, diversify your promotional strategies. Use SEO to drive organic traffic to your content, leverage email marketing to reach your audience directly, and engage with your followers on social media. Additionally, consider using paid advertising to reach a larger audience. Always track your performance with analytics tools to understand what's working and optimize your campaigns accordingly.",
    tags: ['affiliate marketing', 'make money online', 'seo', 'email marketing'],
  },
  {
    title: 'AI in Healthcare: Revolutionizing Patient Care',
    content: "Artificial Intelligence is transforming healthcare by improving diagnostics, personalizing treatment plans, and streamlining administrative tasks. AI algorithms can analyze medical images, detect diseases early, and predict patient outcomes. Additionally, AI-powered chatbots provide 24/7 patient support, reducing the burden on healthcare professionals. As AI continues to advance, it promises to enhance the efficiency and effectiveness of healthcare services.",
    tags: ['AI', 'health', 'technology'],
  },
  {
    title: 'The Future of AI in Everyday Life',
    content: "AI is becoming increasingly integrated into our daily lives, from virtual assistants like Siri and Alexa to smart home devices that learn our preferences. In the future, AI could manage our schedules, optimize our energy consumption, and even drive our cars. The potential for AI to improve our quality of life is vast, but it also raises important ethical and privacy considerations that need to be addressed.",
    tags: ['AI', 'technology', 'future'],
  },
  {
    title: 'Building Genuine Connections to Attract a Lady',
    content: "Attracting a lady starts with building a genuine connection. Show interest in her thoughts, feelings, and experiences. Listen actively and engage in meaningful conversations. Be authentic and true to yourself, as confidence and sincerity are attractive qualities. Remember, respect and kindness go a long way in forming a strong bond.",
    tags: ['relationship advice', 'dating', 'connection'],
  },
  {
    title: 'The Importance of Confidence and Humor in Attraction',
    content: "Confidence is key when it comes to attracting a lady. Believe in yourself and your worth, and this self-assurance will shine through. Additionally, a good sense of humor can make interactions more enjoyable and memorable. Be playful and light-hearted, and don't be afraid to show your fun side. A combination of confidence and humor can make you more appealing and approachable.",
    tags: ['relationship advice', 'dating', 'confidence', 'humor'],
  },
  {
    title: 'Investing in Precious Metals: A Safe Haven',
    content: "Precious metals like gold, silver, and platinum have long been considered safe investment options. They provide a hedge against inflation and economic uncertainty. Investing in precious metals can diversify your portfolio and protect your wealth. Consider purchasing physical metals, ETFs, or mining stocks to gain exposure to this asset class. Always research and consult with a financial advisor to make informed investment decisions.",
    tags: ['investing', 'finance', 'precious metals', 'gold'],
  },
  {
    title: 'Sustainable Fashion: The Future of Style',
    content: "Sustainable fashion is gaining popularity as consumers become more environmentally conscious. This trend focuses on eco-friendly materials, ethical production processes, and reducing waste. Brands are increasingly adopting sustainable practices, offering stylish and durable clothing options. Embrace this trend by supporting brands that prioritize sustainability and incorporating timeless pieces into your wardrobe. Sustainable fashion not only benefits the planet but also promotes a more mindful approach to style.",
    tags: ['fashion', 'sustainability', 'eco-friendly', 'style'],
  },
];

export const blogPosts: BlogPost[] = rawBlogPosts.map((post, index) => {
  const slug = slugify(post.title);
  // Basic excerpt: first 150 characters
  const excerpt = post.content.substring(0, 150) + '...';
  // Mock date, older for older posts
  const date = new Date();
  date.setDate(date.getDate() - (rawBlogPosts.length - index) * 7); // Roughly a week apart

  // Assign image hints based on tags or title
  let imageHint = 'abstract concept';
  if (post.tags.includes('affiliate marketing') || post.tags.includes('make money online')) imageHint = 'business growth';
  if (post.tags.includes('AI')) imageHint = 'artificial intelligence';
  if (post.tags.includes('relationship advice')) imageHint = 'happy couple';
  if (post.tags.includes('investing')) imageHint = 'financial chart';
  if (post.tags.includes('fashion')) imageHint = 'stylish clothing';
  
  return {
    ...post,
    id: slug,
    slug,
    excerpt,
    datePublished: date.toISOString().split('T')[0],
    imageUrl: `/images/blog/${slug}.png`, // Updated path
    imageHint: imageHint,
  };
});

