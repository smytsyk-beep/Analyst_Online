import Link from 'next/link';

const LOCALES = ['ua', 'ru', 'ro'] as const;
type Locale = (typeof LOCALES)[number];

export default function Header({ lang }: { lang: Locale }) {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href={`/${lang}`} className="font-semibold">
          Analyst Online
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href={`/${lang}#services`} className="opacity-80 hover:opacity-100">
            Services
          </Link>
          <Link href={`/${lang}#cases`} className="opacity-80 hover:opacity-100">
            Cases
          </Link>
          <Link href={`/${lang}#contact`} className="opacity-80 hover:opacity-100">
            Contact
          </Link>

          <div className="ml-4 flex gap-2">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className={`rounded-md border px-2 py-1 ${
                  l === lang ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
