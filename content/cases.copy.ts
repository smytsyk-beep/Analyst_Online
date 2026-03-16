// content/cases.copy.ts
import type { Locale } from '@/lib/i18n';

export type CasesCopy = {
  pageTitle: string;
  pageSubtitle: string;
  comingSoonTitle: string;
  comingSoonText: string;
  ctaTitle: string;
  ctaText: string;
  ctaTelegram: string;
  ctaEmail: string;
};

export const casesCopy: Record<Locale, CasesCopy> = {
  ru: {
    pageTitle: 'Кейсы',
    pageSubtitle: 'Реальные примеры работы с клиентами.',
    comingSoonTitle: 'Кейсы готовятся к публикации',
    comingSoonText:
      'Сейчас мы оформляем реальные кейсы с данными и скриншотами. Если хотите увидеть примеры работы до публикации — напишите, покажем в личном сообщении.',
    ctaTitle: 'Хотите увидеть примеры?',
    ctaText: 'Напишите — покажем реальные дашборды и результаты.',
    ctaTelegram: 'Написать в Telegram',
    ctaEmail: 'Написать на Email',
  },

  ua: {
    pageTitle: 'Кейси',
    pageSubtitle: 'Реальні приклади роботи з клієнтами.',
    comingSoonTitle: 'Кейси готуються до публікації',
    comingSoonText:
      'Зараз ми оформлюємо реальні кейси з даними та скріншотами. Якщо хочете побачити приклади роботи до публікації — напишіть, покажемо в особистому повідомленні.',
    ctaTitle: 'Хочете побачити приклади?',
    ctaText: 'Напишіть — покажемо реальні дашборди та результати.',
    ctaTelegram: 'Написати в Telegram',
    ctaEmail: 'Написати на Email',
  },

  ro: {
    pageTitle: 'Cazuri',
    pageSubtitle: 'Exemple reale de lucru cu clienții.',
    comingSoonTitle: 'Cazurile se pregătesc pentru publicare',
    comingSoonText:
      'Acum pregătim cazuri reale cu date și screenshot-uri. Dacă vrei să vezi exemple de lucru înainte de publicare — scrie-ne, le arătăm în privat.',
    ctaTitle: 'Vrei să vezi exemple?',
    ctaText: 'Scrie — îți arătăm dashboard-uri și rezultate reale.',
    ctaTelegram: 'Scrie pe Telegram',
    ctaEmail: 'Scrie pe Email',
  },
};
