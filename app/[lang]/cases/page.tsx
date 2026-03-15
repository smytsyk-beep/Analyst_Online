// app/[lang]/cases/page.tsx
// TODO: Sprint 4 — Cases page (real cases to be provided by client)
import type { Locale } from '@/lib/i18n';

export default async function CasesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  return (
    <div className="page">
      <h1 className="text-4xl font-semibold">Cases</h1>
      <p className="mt-4 opacity-80">[{lang}] — Real cases coming soon.</p>
    </div>
  );
}
