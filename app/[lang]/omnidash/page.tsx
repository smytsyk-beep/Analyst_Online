// app/[lang]/omnidash/page.tsx
// TODO: Sprint 2 — OmniDash product landing page
import type { Locale } from '@/lib/i18n';

export default async function OmniDashPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  return (
    <div className="page">
      <h1 className="text-4xl font-semibold">OmniDash</h1>
      <p className="mt-4 opacity-80">[{lang}] — Product landing page. Coming in Sprint 2.</p>
    </div>
  );
}
