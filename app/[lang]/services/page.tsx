// app/[lang]/services/page.tsx
// TODO: Sprint 3 — Services catalog page
import type { Locale } from '@/lib/i18n';

export default async function ServicesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  return (
    <div className="page">
      <h1 className="text-4xl font-semibold">Services</h1>
      <p className="mt-4 opacity-80">[{lang}] — Services catalog. Coming in Sprint 3.</p>
    </div>
  );
}
