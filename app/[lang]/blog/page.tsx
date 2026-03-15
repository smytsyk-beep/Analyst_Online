// app/[lang]/blog/page.tsx
// TODO: Sprint 8 — Blog infrastructure
import type { Locale } from '@/lib/i18n';

export default async function BlogPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  return (
    <div className="page">
      <h1 className="text-4xl font-semibold">Blog</h1>
      <p className="mt-4 opacity-80">[{lang}] — Blog coming soon.</p>
    </div>
  );
}
