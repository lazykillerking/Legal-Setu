import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b border-white/10 bg-navy-950/80 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-gold-400/40 text-gold-300 font-serif text-sm">
            LS
          </span>
          <span className="font-serif text-lg tracking-wide">Legal Setu</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-white/70">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/chat" className="hover:text-white transition-colors">
            Chat
          </Link>
        </nav>
      </div>
    </header>
  );
}
