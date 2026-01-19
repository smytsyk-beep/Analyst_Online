const copy = {
  ua: { h1: 'Аналітика для бізнесу', p: 'Автоматизація, звіти, дашборди, навчання.' },
  ru: { h1: 'Аналитика для бизнеса', p: 'Автоматизация, отчеты, дашборды, обучение.' },
  ro: { h1: 'Analitică pentru afaceri', p: 'Automatizare, rapoarte, dashboard-uri, training.' },
} as const;

type Locale = keyof typeof copy;

export default async function LangHome({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = copy[lang] ?? copy.ru;

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">{t.h1}</h1>
      <p className="mt-4 text-lg opacity-80">{t.p}</p>
    </section>
  );
}
