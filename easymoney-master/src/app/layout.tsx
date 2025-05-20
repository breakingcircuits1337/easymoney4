import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans'; // GeistSans is an object with .variable and .className properties
import './globals.css';
import { SiteHeader } from '@/components/core/SiteHeader';
import { SiteFooter } from '@/components/core/SiteFooter';
import { Toaster } from "@/components/ui/toaster";

// Removed the erroneous function call:
// const geistSans = GeistSans({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });
// GeistSans.variable already provides the necessary class for the CSS variable.

export const metadata: Metadata = {
  title: 'Affiliate Ascent - Your Path to Online Earnings',
  description: 'Discover top affiliate offers and insightful blog posts to boost your online presence and income.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/*
        Use GeistSans.variable directly.
        This string contains class names that will:
        1. Define the CSS custom property (e.g., --font-geist-sans).
        2. Apply the font family using that custom property.
        The globals.css already sets `body { font-family: var(--font-geist-sans), ... }`.
        The class from GeistSans.variable ensures the var is defined and might also apply the font directly.
      */}
      <body className={`${GeistSans.variable} antialiased flex flex-col min-h-screen`}>
        <SiteHeader />
        <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
