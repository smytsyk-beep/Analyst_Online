import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const copy = {
  ua: {
    hero: {
      title: 'Аналітика для бізнесу',
      subtitle: 'Автоматизація, звіти, дашборди, навчання.',
      ctaPrimary: 'Обговорити задачу',
      ctaSecondary: 'Подивитись послуги',
      bullets: ['3–7 днів до першого результату', 'Працюю “під ключ”', 'Зрозумілою мовою'],
    },
    uiKit: { title: 'shadcn/ui працює ✅', desc: 'Button + Card підключені' },
    services: {
      title: 'Services',
      items: [
        {
          title: 'Автоматизація звітів',
          desc: 'Знімаю рутину з команди.',
          points: [
            'Google Sheets / Apps Script',
            'ETL / інтеграції',
            'Регулярні PDF-звіти в Telegram',
          ],
        },
        {
          title: 'Дашборди та метрики',
          desc: 'Прозора картина бізнесу.',
          points: ['Power BI / Looker', 'KPI / воронки', 'Когортний аналіз / LTV'],
        },
        {
          title: 'AI-боти для процесів',
          desc: 'Підказки, класифікація, контроль якості.',
          points: ['Telegram-боти', 'RAG / пошук по базі знань', 'Перевірки / алерти'],
        },
      ],
    },
    cases: {
      title: 'Cases',
      items: [
        {
          title: 'ETL + щоденний репорт',
          desc: 'Збір → обробка → PDF → відправка в Telegram.',
          kpi: '−70% ручної роботи',
        },
        {
          title: 'Дашборд для керівника',
          desc: 'KPI, тренди, проблемні зони, зрозуміла структура.',
          kpi: '+ швидше рішення',
        },
      ],
    },
    contact: {
      title: 'Contact',
      subtitle: 'Напиши коротко: ніша, джерело даних, що болить — відповім з планом.',
      cta: 'Написати в Telegram',
      email: 'Email',
    },
  },
  ru: {
    hero: {
      title: 'Аналитика для бизнеса',
      subtitle: 'Автоматизация, отчеты, дашборды, обучение.',
      ctaPrimary: 'Обсудить задачу',
      ctaSecondary: 'Посмотреть услуги',
      bullets: ['3–7 дней до первого результата', 'Работаю “под ключ”', 'Понятным языком'],
    },
    uiKit: { title: 'shadcn/ui работает ✅', desc: 'Button + Card подключены' },
    services: {
      title: 'Services',
      items: [
        {
          title: 'Автоматизация отчетов',
          desc: 'Снимаю рутину с команды.',
          points: [
            'Google Sheets / Apps Script',
            'ETL / интеграции',
            'Регулярные PDF-отчеты в Telegram',
          ],
        },
        {
          title: 'Дашборды и метрики',
          desc: 'Прозрачная картина бизнеса.',
          points: ['Power BI / Looker', 'KPI / воронки', 'Когортный анализ / LTV'],
        },
        {
          title: 'AI-боты для процессов',
          desc: 'Подсказки, классификация, контроль качества.',
          points: ['Telegram-боты', 'RAG / поиск по базе знаний', 'Проверки / алерты'],
        },
      ],
    },
    cases: {
      title: 'Cases',
      items: [
        {
          title: 'ETL + ежедневный репорт',
          desc: 'Сбор → обработка → PDF → отправка в Telegram.',
          kpi: '−70% ручной работы',
        },
        {
          title: 'Дашборд для руководителя',
          desc: 'KPI, тренды, проблемные зоны, понятная структура.',
          kpi: '+ быстрее решения',
        },
      ],
    },
    contact: {
      title: 'Contact',
      subtitle: 'Напиши кратко: ниша, источник данных, что болит — отвечу с планом.',
      cta: 'Написать в Telegram',
      email: 'Email',
    },
  },
  ro: {
    hero: {
      title: 'Analitică pentru afaceri',
      subtitle: 'Automatizare, rapoarte, dashboard-uri, training.',
      ctaPrimary: 'Discută o sarcină',
      ctaSecondary: 'Vezi servicii',
      bullets: ['3–7 zile până la primul rezultat', 'End-to-end', 'Explic simplu'],
    },
    uiKit: { title: 'shadcn/ui funcționează ✅', desc: 'Button + Card sunt conectate' },
    services: {
      title: 'Services',
      items: [
        {
          title: 'Automatizare rapoarte',
          desc: 'Reduc munca manuală.',
          points: [
            'Google Sheets / Apps Script',
            'ETL / integrări',
            'PDF-uri regulate în Telegram',
          ],
        },
        {
          title: 'Dashboard-uri & KPI',
          desc: 'Claritate pentru decizii.',
          points: ['Power BI / Looker', 'KPI / funnel', 'Cohort / LTV'],
        },
        {
          title: 'AI bots pentru procese',
          desc: 'Sugestii, clasificare, QC.',
          points: ['Telegram bots', 'RAG / căutare', 'Verificări / alerte'],
        },
      ],
    },
    cases: {
      title: 'Cases',
      items: [
        {
          title: 'ETL + raport zilnic',
          desc: 'Colectare → procesare → PDF → Telegram.',
          kpi: '−70% muncă manuală',
        },
        {
          title: 'Dashboard pentru manager',
          desc: 'KPI, trenduri, zone de risc.',
          kpi: '+ decizii mai rapide',
        },
      ],
    },
    contact: {
      title: 'Contact',
      subtitle: 'Scrie: nișă, sursa datelor, problema — îți răspund cu un plan.',
      cta: 'Scrie pe Telegram',
      email: 'Email',
    },
  },
} as const;

type Locale = keyof typeof copy;

export const dynamicParams = false;

export default async function LangHome({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params; // ✅ фикс ошибки "params is a Promise"
  const t = copy[lang];

  return (
    <div className="page space-y-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{t.hero.title}</h1>
            <p className="text-lg text-white/70 md:text-xl">{t.hero.subtitle}</p>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={`/${lang}#contact`}>{t.hero.ctaPrimary}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={`/${lang}#services`}>{t.hero.ctaSecondary}</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/60">
              {t.hero.bullets.map((b) => (
                <span key={b}>• {b}</span>
              ))}
            </div>
          </div>

          {/* UI KIT DEMO (аккуратно, не “вне контекста”) */}
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-base">{t.uiKit.title}</CardTitle>
              <CardDescription className="text-white/60">{t.uiKit.desc}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{t.services.title}</h2>
          <p className="text-white/60">Что делаю чаще всего — и как это выглядит на практике.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {t.services.items.map((s) => (
            <Card key={s.title} className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-lg">{s.title}</CardTitle>
                <CardDescription className="text-white/60">{s.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-sm text-white/70">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{t.cases.title}</h2>
          <p className="text-white/60">Пара типовых кейсов (с фокусом на результат).</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {t.cases.items.map((c) => (
            <Card key={c.title} className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-lg">{c.title}</CardTitle>
                <CardDescription className="text-white/60">{c.desc}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-white/70">
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  KPI: {c.kpi}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-xl">{t.contact.title}</CardTitle>
            <CardDescription className="text-white/60">{t.contact.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild>
              <a href="https://t.me/" target="_blank" rel="noreferrer">
                {t.contact.cta}
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="mailto:hello@example.com">{t.contact.email}</a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
