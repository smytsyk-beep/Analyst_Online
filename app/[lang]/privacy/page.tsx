// app/[lang]/privacy/page.tsx
// TODO: Sprint 4 — Privacy policy page
import type { Locale } from '@/lib/i18n';

export default async function PrivacyPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  return (
    <div className="page">
      <h1 className="text-4xl font-semibold">Privacy Policy</h1>
      <p className="mt-4 opacity-80">[{lang}] — Privacy policy. Coming in Sprint 4.</p>
    </div>
  );
}
