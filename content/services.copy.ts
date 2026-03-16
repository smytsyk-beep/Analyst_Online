// content/services.copy.ts
import type { Locale } from '@/lib/i18n';

export type Service = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  highlighted?: boolean;
};

export type ServicesCopy = {
  pageTitle: string;
  pageSubtitle: string;
  services: Service[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimary: string;
};

export const servicesCopy: Record<Locale, ServicesCopy> = {
  ru: {
    pageTitle: 'Услуги',
    pageSubtitle:
      'Помогаю малому и среднему бизнесу видеть данные, принимать решения и экономить время на аналитике.',
    services: [
      {
        id: 'omnidash',
        title: 'OmniDash — готовая аналитика для e-commerce',
        description:
          'Реклама, продажи и расходы в одном дашборде. Видите не только выручку, но и реальную прибыль.',
        bullets: [
          'Интеграция рекламных кабинетов и магазина',
          'Модель чистой прибыли с учётом всех расходов',
          'Looker Studio дашборд с ключевыми KPI',
          'Настройка от €99, подписка от €49/мес',
        ],
        cta: 'Узнать подробнее',
        highlighted: true,
      },
      {
        id: 'audit',
        title: 'Аналитический аудит',
        description:
          'Разбираю текущую аналитику, рекламу и данные. Показываю, где теряете деньги и что можно улучшить.',
        bullets: [
          'Аудит рекламных кампаний и ROAS',
          'Проверка качества данных и отчётов',
          'Рекомендации по оптимизации',
          'Дорожная карта улучшений',
        ],
        cta: 'Заказать аудит',
      },
      {
        id: 'automation',
        title: 'Автоматизация отчётов',
        description:
          'Избавляю от ручной работы: автоматические отчёты в Telegram, PDF, Google Sheets или Email.',
        bullets: [
          'Google Sheets / Apps Script',
          'ETL и интеграции источников',
          'PDF-отчёты в Telegram',
          'Scheduled reports',
        ],
        cta: 'Обсудить задачу',
      },
      {
        id: 'dashboards',
        title: 'Дашборды на заказ',
        description:
          'Собираю кастомные дашборды под вашу бизнес-модель: Power BI, Looker Studio, Tableau.',
        bullets: [
          'KPI и метрики под ваш бизнес',
          'Воронки, когорты, LTV',
          'Интеграция любых источников',
          'Обучение команды работе с дашбордом',
        ],
        cta: 'Запросить оценку',
      },
      {
        id: 'consulting',
        title: 'Консалтинг и обучение',
        description:
          'Помогаю разобраться в аналитике, настроить процессы или обучить команду работе с данными.',
        bullets: [
          'Консультации по аналитике и метрикам',
          'Обучение Google Sheets / SQL / BI',
          'Настройка аналитических процессов',
          'Поддержка по конкретным задачам',
        ],
        cta: 'Записаться на консультацию',
      },
      {
        id: 'parttime',
        title: 'Part-time аналитик',
        description: 'Работаю как ваш аналитик на проектной основе или несколько часов в неделю.',
        bullets: [
          'Регулярная поддержка по аналитике',
          'Разбор данных и рекомендации',
          'Доработка дашбордов и отчётов',
          'Гибкий формат сотрудничества',
        ],
        cta: 'Обсудить формат',
      },
    ],
    ctaTitle: 'Не нашли нужную услугу?',
    ctaSubtitle: 'Напишите — обсудим вашу задачу и найдём решение.',
    ctaPrimary: 'Написать в Telegram',
  },

  ua: {
    pageTitle: 'Послуги',
    pageSubtitle:
      'Допомагаю малому та середньому бізнесу бачити дані, ухвалювати рішення та економити час на аналітиці.',
    services: [
      {
        id: 'omnidash',
        title: 'OmniDash — готова аналітика для e-commerce',
        description:
          'Реклама, продажі та витрати в одному дашборді. Бачите не лише виручку, а й реальний прибуток.',
        bullets: [
          'Інтеграція рекламних кабінетів і магазину',
          'Модель чистого прибутку з урахуванням усіх витрат',
          'Looker Studio дашборд із ключовими KPI',
          'Налаштування від €99, підписка від €49/міс',
        ],
        cta: 'Дізнатися більше',
        highlighted: true,
      },
      {
        id: 'audit',
        title: 'Аналітичний аудит',
        description:
          'Розбираю поточну аналітику, рекламу та дані. Показую, де втрачаєте гроші і що можна покращити.',
        bullets: [
          'Аудит рекламних кампаній і ROAS',
          'Перевірка якості даних і звітів',
          'Рекомендації з оптимізації',
          'Дорожня карта покращень',
        ],
        cta: 'Замовити аудит',
      },
      {
        id: 'automation',
        title: 'Автоматизація звітів',
        description:
          'Позбавляю від ручної роботи: автоматичні звіти в Telegram, PDF, Google Sheets або Email.',
        bullets: [
          'Google Sheets / Apps Script',
          'ETL та інтеграції джерел',
          'PDF-звіти в Telegram',
          'Scheduled reports',
        ],
        cta: 'Обговорити задачу',
      },
      {
        id: 'dashboards',
        title: 'Дашборди на замовлення',
        description:
          'Збираю кастомні дашборди під вашу бізнес-модель: Power BI, Looker Studio, Tableau.',
        bullets: [
          'KPI та метрики під ваш бізнес',
          'Воронки, когорти, LTV',
          'Інтеграція будь-яких джерел',
          'Навчання команди роботі з дашбордом',
        ],
        cta: 'Запитати оцінку',
      },
      {
        id: 'consulting',
        title: 'Консалтинг і навчання',
        description:
          'Допомагаю розібратися в аналітиці, налаштувати процеси або навчити команду роботі з даними.',
        bullets: [
          'Консультації з аналітики та метрик',
          'Навчання Google Sheets / SQL / BI',
          'Налаштування аналітичних процесів',
          'Підтримка по конкретних задачах',
        ],
        cta: 'Записатися на консультацію',
      },
      {
        id: 'parttime',
        title: 'Part-time аналітик',
        description: 'Працюю як ваш аналітик на проєктній основі або кілька годин на тиждень.',
        bullets: [
          'Регулярна підтримка з аналітики',
          'Розбір даних і рекомендації',
          'Доопрацювання дашбордів і звітів',
          'Гнучкий формат співпраці',
        ],
        cta: 'Обговорити формат',
      },
    ],
    ctaTitle: 'Не знайшли потрібну послугу?',
    ctaSubtitle: 'Напишіть — обговоримо вашу задачу і знайдемо рішення.',
    ctaPrimary: 'Написати в Telegram',
  },

  ro: {
    pageTitle: 'Servicii',
    pageSubtitle:
      'Ajut business-urile mici și medii să vadă datele, să ia decizii și să economisească timp pe analytics.',
    services: [
      {
        id: 'omnidash',
        title: 'OmniDash — analytics gata pentru e-commerce',
        description:
          'Reclama, vânzările și cheltuielile într-un singur dashboard. Vezi nu doar venitul, ci și profitul real.',
        bullets: [
          'Integrarea conturilor de advertising și magazinului',
          'Model de profit net cu toate cheltuielile',
          'Dashboard Looker Studio cu KPI cheie',
          'Configurare de la €99, abonament de la €49/lună',
        ],
        cta: 'Află mai multe',
        highlighted: true,
      },
      {
        id: 'audit',
        title: 'Audit analitic',
        description:
          'Analizez analytics-ul, reclama și datele curente. Arăt unde pierzi bani și ce poate fi îmbunătățit.',
        bullets: [
          'Audit campanii publicitare și ROAS',
          'Verificarea calității datelor și rapoartelor',
          'Recomandări de optimizare',
          'Roadmap de îmbunătățiri',
        ],
        cta: 'Comandă audit',
      },
      {
        id: 'automation',
        title: 'Automatizarea rapoartelor',
        description:
          'Te scap de munca manuală: rapoarte automate în Telegram, PDF, Google Sheets sau Email.',
        bullets: [
          'Google Sheets / Apps Script',
          'ETL și integrări de surse',
          'Rapoarte PDF în Telegram',
          'Scheduled reports',
        ],
        cta: 'Discută sarcina',
      },
      {
        id: 'dashboards',
        title: 'Dashboard-uri personalizate',
        description:
          'Construiesc dashboard-uri custom pentru modelul tău de business: Power BI, Looker Studio, Tableau.',
        bullets: [
          'KPI și metrici pentru business-ul tău',
          'Funnel-uri, cohorte, LTV',
          'Integrarea oricăror surse',
          'Instruirea echipei în lucrul cu dashboard-ul',
        ],
        cta: 'Cere estimare',
      },
      {
        id: 'consulting',
        title: 'Consultanță și training',
        description:
          'Te ajut să înțelegi analytics-ul, să configurezi procesele sau să instruiești echipa în lucrul cu datele.',
        bullets: [
          'Consultanță pe analytics și metrici',
          'Training Google Sheets / SQL / BI',
          'Configurarea proceselor analitice',
          'Suport pe sarcini specifice',
        ],
        cta: 'Programează consultanță',
      },
      {
        id: 'parttime',
        title: 'Analist part-time',
        description: 'Lucrez ca analistul tău pe bază de proiect sau câteva ore pe săptămână.',
        bullets: [
          'Suport regulat pe analytics',
          'Analiză de date și recomandări',
          'Îmbunătățiri dashboard-uri și rapoarte',
          'Format flexibil de colaborare',
        ],
        cta: 'Discută formatul',
      },
    ],
    ctaTitle: 'Nu ai găsit serviciul potrivit?',
    ctaSubtitle: 'Scrie — discutăm sarcina ta și găsim o soluție.',
    ctaPrimary: 'Scrie pe Telegram',
  },
};
