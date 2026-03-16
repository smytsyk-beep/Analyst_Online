// content/home.copy.ts
import type { Locale } from '@/lib/i18n';

export type HomeCopy = {
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;

  // Flagship product (OmniDash)
  flagshipBadge: string;
  flagshipTitle: string;
  flagshipSubtitle: string;
  flagshipBullets: readonly string[];
  flagshipCta: string;

  // Services preview
  servicesTitle: string;
  servicesSubtitle: string;
  servicesLinkAll: string;
  services: readonly {
    title: string;
    description: string;
  }[];

  // Social proof placeholder
  socialProofTitle: string;
  socialProofSubtitle: string;
  socialProofNote: string;

  // CTA section
  ctaTitle: string;
  ctaSubtitle: string;
  ctaTelegram: string;
  ctaEmail: string;
  ctaOmniDash: string;
};

export const homeCopy: Record<Locale, HomeCopy> = {
  ru: {
    heroTitle: 'Аналитика, дашборды и автоматизация для бизнеса',
    heroSubtitle:
      'Помогаю малому и среднему бизнесу видеть данные, принимать решения и экономить время на аналитике.',
    ctaPrimary: 'Обсудить задачу',
    ctaSecondary: 'Смотреть услуги',

    flagshipBadge: 'Flagship продукт',
    flagshipTitle: 'OmniDash — готовая аналитика для e-commerce',
    flagshipSubtitle:
      'Реклама, продажи и расходы в одном дашборде. Видите не только выручку, но и реальную прибыль.',
    flagshipBullets: [
      'Настройка от €99, подписка от €49/мес',
      'Запуск за 1–2 недели',
      'Looker Studio + интеграции',
      'Модель чистой прибыли',
    ],
    flagshipCta: 'Узнать подробнее',

    servicesTitle: 'Другие услуги',
    servicesSubtitle: 'Дашборды, автоматизация, консалтинг и обучение.',
    servicesLinkAll: 'Все услуги →',
    services: [
      {
        title: 'Аналитический аудит',
        description: 'Разбираю текущую аналитику и показываю, где теряете деньги.',
      },
      {
        title: 'Автоматизация отчётов',
        description: 'Избавляю от ручной работы: отчёты в Telegram, PDF, Google Sheets.',
      },
      {
        title: 'Дашборды на заказ',
        description: 'Собираю кастомные дашборды: Power BI, Looker Studio, Tableau.',
      },
      {
        title: 'Консалтинг и обучение',
        description: 'Помогаю разобраться в аналитике или обучить команду.',
      },
    ],

    socialProofTitle: 'Кейсы и результаты',
    socialProofSubtitle: 'Реальные примеры работы появятся здесь в ближайшее время.',
    socialProofNote:
      'Сейчас собираю кейсы и скриншоты. Если хотите увидеть примеры работы — напишите, покажу в личке.',

    ctaTitle: 'Готовы обсудить задачу?',
    ctaSubtitle: 'Напишите — разберём вашу ситуацию и найдём решение.',
    ctaTelegram: 'Написать в Telegram',
    ctaEmail: 'Написать на Email',
    ctaOmniDash: 'Узнать про OmniDash',
  },

  ua: {
    heroTitle: 'Аналітика, дашборди та автоматизація для бізнесу',
    heroSubtitle:
      'Допомагаю малому та середньому бізнесу бачити дані, ухвалювати рішення та економити час на аналітиці.',
    ctaPrimary: 'Обговорити задачу',
    ctaSecondary: 'Дивитись послуги',

    flagshipBadge: 'Flagship продукт',
    flagshipTitle: 'OmniDash — готова аналітика для e-commerce',
    flagshipSubtitle:
      'Реклама, продажі та витрати в одному дашборді. Бачите не лише виручку, а й реальний прибуток.',
    flagshipBullets: [
      'Налаштування від €99, підписка від €49/міс',
      'Запуск за 1–2 тижні',
      'Looker Studio + інтеграції',
      'Модель чистого прибутку',
    ],
    flagshipCta: 'Дізнатися більше',

    servicesTitle: 'Інші послуги',
    servicesSubtitle: 'Дашборди, автоматизація, консалтинг і навчання.',
    servicesLinkAll: 'Всі послуги →',
    services: [
      {
        title: 'Аналітичний аудит',
        description: 'Розбираю поточну аналітику і показую, де втрачаєте гроші.',
      },
      {
        title: 'Автоматизація звітів',
        description: 'Позбавляю від ручної роботи: звіти в Telegram, PDF, Google Sheets.',
      },
      {
        title: 'Дашборди на замовлення',
        description: 'Збираю кастомні дашборди: Power BI, Looker Studio, Tableau.',
      },
      {
        title: 'Консалтинг і навчання',
        description: 'Допомагаю розібратися в аналітиці або навчити команду.',
      },
    ],

    socialProofTitle: 'Кейси та результати',
    socialProofSubtitle: "Реальні приклади роботи з'являться тут найближчим часом.",
    socialProofNote:
      'Зараз збираю кейси та скріншоти. Якщо хочете побачити приклади роботи — напишіть, покажу в особистих повідомленнях.',

    ctaTitle: 'Готові обговорити задачу?',
    ctaSubtitle: 'Напишіть — розберемо вашу ситуацію і знайдемо рішення.',
    ctaTelegram: 'Написати в Telegram',
    ctaEmail: 'Написати на Email',
    ctaOmniDash: 'Дізнатися про OmniDash',
  },

  ro: {
    heroTitle: 'Analytics, dashboard-uri și automatizare pentru business',
    heroSubtitle:
      'Ajut business-urile mici și medii să vadă datele, să ia decizii și să economisească timp pe analytics.',
    ctaPrimary: 'Discută sarcina',
    ctaSecondary: 'Vezi servicii',

    flagshipBadge: 'Produs flagship',
    flagshipTitle: 'OmniDash — analytics gata pentru e-commerce',
    flagshipSubtitle:
      'Reclama, vânzările și cheltuielile într-un singur dashboard. Vezi nu doar venitul, ci și profitul real.',
    flagshipBullets: [
      'Configurare de la €99, abonament de la €49/lună',
      'Lansare în 1–2 săptămâni',
      'Looker Studio + integrări',
      'Model de profit net',
    ],
    flagshipCta: 'Află mai multe',

    servicesTitle: 'Alte servicii',
    servicesSubtitle: 'Dashboard-uri, automatizare, consultanță și training.',
    servicesLinkAll: 'Toate serviciile →',
    services: [
      {
        title: 'Audit analitic',
        description: 'Analizez analytics-ul curent și arăt unde pierzi bani.',
      },
      {
        title: 'Automatizarea rapoartelor',
        description: 'Te scap de munca manuală: rapoarte în Telegram, PDF, Google Sheets.',
      },
      {
        title: 'Dashboard-uri personalizate',
        description: 'Construiesc dashboard-uri custom: Power BI, Looker Studio, Tableau.',
      },
      {
        title: 'Consultanță și training',
        description: 'Te ajut să înțelegi analytics-ul sau să instruiești echipa.',
      },
    ],

    socialProofTitle: 'Cazuri și rezultate',
    socialProofSubtitle: 'Exemple reale de lucru vor apărea aici în curând.',
    socialProofNote:
      'Acum colectez cazuri și screenshot-uri. Dacă vrei să vezi exemple de lucru — scrie, îți arăt în privat.',

    ctaTitle: 'Gata să discutăm sarcina?',
    ctaSubtitle: 'Scrie — analizăm situația ta și găsim o soluție.',
    ctaTelegram: 'Scrie pe Telegram',
    ctaEmail: 'Scrie pe Email',
    ctaOmniDash: 'Află despre OmniDash',
  },
};
