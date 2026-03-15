// app/[lang]/contact/page.tsx
// TODO: Sprint 3 — Contact page with form and channels
import type { Locale } from '@/lib/i18n';

export default async function ContactPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  return (
    <div className="page">
      <h1 className="text-4xl font-semibold">Contact</h1>
      <p className="mt-4 opacity-80">[{lang}] — Contact page with form. Coming in Sprint 3.</p>
    </div>
  );
}
