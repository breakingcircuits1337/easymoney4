import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-8 md:flex-row md:py-10">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} EASYMONEY.SITE. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground" prefetch={false}>
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
