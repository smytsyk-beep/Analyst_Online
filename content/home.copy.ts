// content/home.copy.ts
import type { Locale } from '@/lib/i18n';

export type HomeCopy = {
  localeBadge: string;

  heroTitle: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  bullets: readonly string[];

  shadcnTitle: string;
  shadcnSubtitle: string;

  servicesTitle: string;
  servicesSubtitle: string;
  services: readonly {
    title: string;
    bullets: readonly string[];
  }[];

  casesTitle: string;
  casesSubtitle: string;
  cases: readonly {
    title: string;
    text: string;
    badge: string;
  }[];

  contactTitle: string;
  contactSubtitle: string;
  contactCtaTelegram: string;
  contactCtaEmail: string;
};

export const homeCopy: Record<Locale, HomeCopy> = {
  ru: {
    localeBadge: 'Locale: RU',
    heroTitle: 'Аналитика для бизнеса',
    heroSubtitle: 'Автоматизация, отчеты, дашборды, обучение.',
    ctaPrimary: 'Обсудить задачу',
    ctaSecondary: 'Посмотреть кейсы',
    bullets: ['3–7 дней до первого результата', 'End-to-end', 'Объясню просто'],

    shadcnTitle: 'shadcn/ui работает ✅',
    shadcnSubtitle: 'Button + Card подключены',

    servicesTitle: 'Services',
    servicesSubtitle: 'Что делаю чаще всего — и как это выглядит на практике.',
    services: [
      {
        title: 'Снижаю ручной труд',
        bullets: ['Google Sheets / Apps Script', 'ETL / интеграции', 'PDF-отчеты в Telegram'],
      },
      {
        title: 'Ясность для решений',
        bullets: ['Power BI / Looker', 'KPI / funnel', 'Cohort / LTV'],
      },
      {
        title: 'AI-помощники',
        bullets: ['Telegram bots', 'RAG / поиск', 'Проверки / алерты'],
      },
    ],

    casesTitle: 'Cases',
    casesSubtitle: 'Пара типовых кейсов (с фокусом на результат).',
    cases: [
      {
        title: 'Отчеты в Telegram',
        text: 'Collect → process → PDF → Telegram.',
        badge: 'KPI: −70% ручной работы',
      },
      {
        title: 'Дашборд для менеджмента',
        text: 'KPI, тренды, зоны риска.',
        badge: 'KPI: + решения быстрее',
      },
    ],

    contactTitle: 'Contact',
    contactSubtitle: 'Напиши: ниша, источник данных, проблема — отвечу планом.',
    contactCtaTelegram: 'Написать в Telegram',
    contactCtaEmail: 'Email',
  },

  ua: {
    localeBadge: 'Locale: UA',
    heroTitle: 'Аналітика для бізнесу',
    heroSubtitle: 'Автоматизація, звіти, дашборди, навчання.',
    ctaPrimary: 'Обговорити задачу',
    ctaSecondary: 'Подивитись кейси',
    bullets: ['3–7 днів до першого результату', 'End-to-end', 'Поясню просто'],

    shadcnTitle: 'shadcn/ui працює ✅',
    shadcnSubtitle: 'Button + Card підключені',

    servicesTitle: 'Services',
    servicesSubtitle: 'Що роблю найчастіше — і як це виглядає на практиці.',
    services: [
      {
        title: 'Зменшую ручну роботу',
        bullets: ['Google Sheets / Apps Script', 'ETL / інтеграції', 'PDF-звіти в Telegram'],
      },
      {
        title: 'Ясність для рішень',
        bullets: ['Power BI / Looker', 'KPI / funnel', 'Cohort / LTV'],
      },
      {
        title: 'AI-помічники',
        bullets: ['Telegram bots', 'RAG / пошук', 'Перевірки / алерти'],
      },
    ],

    casesTitle: 'Cases',
    casesSubtitle: 'Кілька типових кейсів (фокус на результат).',
    cases: [
      {
        title: 'Звіти в Telegram',
        text: 'Collect → process → PDF → Telegram.',
        badge: 'KPI: −70% ручної роботи',
      },
      {
        title: 'Дашборд для менеджменту',
        text: 'KPI, тренди, зони ризику.',
        badge: 'KPI: + рішення швидше',
      },
    ],

    contactTitle: 'Contact',
    contactSubtitle: 'Напиши: ніша, джерело даних, проблема — відповім планом.',
    contactCtaTelegram: 'Написати в Telegram',
    contactCtaEmail: 'Email',
  },

  ro: {
    localeBadge: 'Locale: RO',
    heroTitle: 'Analitică pentru afaceri',
    heroSubtitle: 'Automatizare, rapoarte, dashboard-uri, training.',
    ctaPrimary: 'Discută o sarcină',
    ctaSecondary: 'Vezi cazuri',
    bullets: ['3–7 zile până la primul rezultat', 'End-to-end', 'Explic simplu'],

    shadcnTitle: 'shadcn/ui funcționează ✅',
    shadcnSubtitle: 'Button + Card sunt conectate',

    servicesTitle: 'Services',
    servicesSubtitle: 'Ce fac cel mai des — și cum arată în practică.',
    services: [
      {
        title: 'Reduc munca manuală',
        bullets: ['Google Sheets / Apps Script', 'ETL / integrări', 'Rapoarte PDF în Telegram'],
      },
      {
        title: 'Claritate pentru decizii',
        bullets: ['Power BI / Looker', 'KPI / funnel', 'Cohort / LTV'],
      },
      {
        title: 'Asistenți AI',
        bullets: ['Telegram bots', 'RAG / căutare', 'Verificări / alerte'],
      },
    ],

    casesTitle: 'Cases',
    casesSubtitle: 'Câteva exemple tipice (focus pe rezultat).',
    cases: [
      {
        title: 'Rapoarte în Telegram',
        text: 'Collect → process → PDF → Telegram.',
        badge: 'KPI: −70% muncă manuală',
      },
      {
        title: 'Dashboard pentru management',
        text: 'KPI, trenduri, zone de risc.',
        badge: 'KPI: + decizii mai rapide',
      },
    ],

    contactTitle: 'Contact',
    contactSubtitle: 'Scrie: nișă, sursa datelor, problema — îți răspund cu un plan.',
    contactCtaTelegram: 'Scrie pe Telegram',
    contactCtaEmail: 'Email',
  },
};
