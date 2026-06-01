import type { Locale } from '@/lib/i18n';

export type ContactPurpose = 'price' | 'question' | 'consultation';

export type SiteCopy = {
  nav: {
    home: string;
    services: string;
    aiTraining: string;
    cases: string;
    blog: string;
    contacts: string;
    privacy: string;
    ecommerceDashboards: string;
  };
  contact: {
    telegram: string;
    email: string;
    linkedin: string;
  };
  footer: {
    tagline: string;
    navigationTitle: string;
    contactTitle: string;
    rights: string;
  };
  purposes: Record<ContactPurpose, string>;
};

export const CONTACT_LINKS = {
  telegram: 'https://t.me/omnidash_ai',
  email: 'mailto:s.mytsyk@gmail.com',
  linkedin: 'https://www.linkedin.com/in/pavlo-mytsyk-04022a3b3/',
} as const;

export const siteCopy: Record<Locale, SiteCopy> = {
  ru: {
    nav: {
      home: 'Главная',
      services: 'Услуги',
      aiTraining: 'AI обучение',
      cases: 'Кейсы',
      blog: 'Блог',
      contacts: 'Контакты',
      privacy: 'Конфиденциальность',
      ecommerceDashboards: 'Дашборды для e-commerce',
    },
    contact: {
      telegram: 'Написать в Telegram',
      email: 'Написать на Email',
      linkedin: 'Открыть LinkedIn',
    },
    footer: {
      tagline: 'AI, аналитика и автоматизация для бизнеса.',
      navigationTitle: 'Навигация',
      contactTitle: 'Связь',
      rights: 'Все права защищены.',
    },
    purposes: {
      price: 'Узнать стоимость',
      question: 'Задать вопрос',
      consultation: 'Получить бесплатную консультацию',
    },
  },
  ua: {
    nav: {
      home: 'Головна',
      services: 'Послуги',
      aiTraining: 'AI навчання',
      cases: 'Кейси',
      blog: 'Блог',
      contacts: 'Контакти',
      privacy: 'Конфіденційність',
      ecommerceDashboards: 'Дашборди для e-commerce',
    },
    contact: {
      telegram: 'Написати в Telegram',
      email: 'Написати на Email',
      linkedin: 'Відкрити LinkedIn',
    },
    footer: {
      tagline: 'AI, аналітика й автоматизація для бізнесу.',
      navigationTitle: 'Навігація',
      contactTitle: "Зв'язок",
      rights: 'Усі права захищені.',
    },
    purposes: {
      price: 'Дізнатися вартість',
      question: 'Поставити запитання',
      consultation: 'Отримати безкоштовну консультацію',
    },
  },
  ro: {
    nav: {
      home: 'Acasă',
      services: 'Servicii',
      aiTraining: 'Training AI',
      cases: 'Cazuri',
      blog: 'Blog',
      contacts: 'Contact',
      privacy: 'Confidențialitate',
      ecommerceDashboards: 'Dashboard-uri e-commerce',
    },
    contact: {
      telegram: 'Scrie pe Telegram',
      email: 'Scrie pe Email',
      linkedin: 'Deschide LinkedIn',
    },
    footer: {
      tagline: 'AI, analytics și automatizare pentru business.',
      navigationTitle: 'Navigare',
      contactTitle: 'Contact',
      rights: 'Toate drepturile rezervate.',
    },
    purposes: {
      price: 'Află costul',
      question: 'Pune o întrebare',
      consultation: 'Primește o consultație gratuită',
    },
  },
};
