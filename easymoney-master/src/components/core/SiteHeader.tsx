import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, MountainIcon } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">EASYMONEY.SITE</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/offers" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" prefetch={false}>
            Offers
          </Link>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" prefetch={false}>
            Blog
          </Link>
          <Link href="/admin/featured-suggestions" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" prefetch={false}>
            Admin Tools
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 p-4">
              <Link href="/" className="flex items-center gap-2 font-semibold" prefetch={false}>
                <MountainIcon className="h-5 w-5 text-primary" />
                <span>EASYMONEY.SITE</span>
              </Link>
              <nav className="grid gap-2">
                <Link href="/offers" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted" prefetch={false}>
                  Offers
                </Link>
                <Link href="/blog" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted" prefetch={false}>
                  Blog
                </Link>
                <Link href="/admin/featured-suggestions" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted" prefetch={false}>
                  Admin Tools
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
