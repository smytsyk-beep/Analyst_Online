import type { Locale } from '@/lib/i18n';

export type Service = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  href?: string;
  highlighted?: boolean;
};

export type ServicesCopy = {
  heroBadge: string;
  pageTitle: string;
  pageSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  primarySectionTitle: string;
  primarySectionSubtitle: string;
  supportSectionTitle: string;
  supportSectionSubtitle: string;
  services: Service[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimary: string;
};

export const servicesCopy: Record<Locale, ServicesCopy> = {
  ru: {
    heroBadge: 'Новая версия Analyst Online',
    pageTitle: 'AI, автоматизация и аналитика для бизнеса',
    pageSubtitle:
      'Команда Analyst Online помогает внедрять AI, автоматизировать отчёты, строить аналитику и закрывать регулярные задачи бизнеса без найма full-time специалиста.',
    heroPrimaryCta: 'Начать с AI обучения',
    heroSecondaryCta: 'Посмотреть направления',
    primarySectionTitle: 'Новые AI SEO направления',
    primarySectionSubtitle:
      'Отдельные страницы для обучения, AI-внедрения, автоматизации и работы с Google Sheets / Excel.',
    supportSectionTitle: 'Поддержка внедрения',
    supportSectionSubtitle:
      'Форматы, которые помогают довести AI, аналитику и отчётность до регулярной работы в команде.',
    services: [
      {
        id: 'ai-training',
        title: 'AI / ChatGPT обучение для бизнеса',
        description:
          'Проводим практическое онлайн-обучение для владельцев, сотрудников и команд с актуальной информацией по AI-инструментам.',
        bullets: [
          'Индивидуальные и групповые занятия',
          'Темы подбираются по задачам и уровню команды',
          'Без старых записей: только актуальная практика',
          'Показываем unit-экономику AI-моделей и внедрений',
        ],
        cta: 'Получить консультацию',
        href: '/obuchenie-ai',
        highlighted: true,
      },
      {
        id: 'ai-business',
        title: 'AI для бизнеса и сотрудников',
        description:
          'Помогаем командам встроить AI в ежедневную работу: документы, коммуникации, анализ, продажи, маркетинг и операционные процессы.',
        bullets: [
          'AI-сценарии для отделов и ролей',
          'Внутренние инструкции и playbook',
          'Безопасное использование AI в рабочих процессах',
          'Переход от разовых промптов к системному применению',
        ],
        cta: 'Обсудить внедрение',
        href: '/services/ai-dlya-biznesa',
      },
      {
        id: 'ai-automation',
        title: 'Автоматизация процессов с AI',
        description:
          'Снижаем ручную работу: автоматические отчёты, уведомления, генерация документов и простые внутренние workflow.',
        bullets: [
          'Автоматизация регулярных отчётов',
          'Telegram/email уведомления',
          'Генерация документов и сводок',
          'Оценка стоимости реализации до старта',
        ],
        cta: 'Узнать стоимость',
        href: '/services/avtomatizatsiya-ai',
      },
      {
        id: 'ai-sheets-excel',
        title: 'AI + Google Sheets / Excel',
        description:
          'Наводим порядок в таблицах, формулах и отчётах, а затем добавляем AI там, где он действительно экономит время.',
        bullets: [
          'Формулы, очистка данных и шаблоны отчётов',
          'AI-помощники для таблиц и документов',
          'Подготовка к Apps Script автоматизации',
          'Управленческая отчётность без хаоса',
        ],
        cta: 'Разобрать таблицы',
        href: '/services/ai-google-sheets-excel',
      },
      {
        id: 'apps-script',
        title: 'Google Sheets / Apps Script автоматизация',
        description:
          'Настраиваем скрипты, импорты, проверки, уведомления и другие процессы вокруг таблиц Google.',
        bullets: [
          'Scheduled imports и регулярные обновления',
          'Email/Telegram уведомления',
          'Автоматизация документов и таблиц',
          'Поддержка существующих файлов и скриптов',
        ],
        cta: 'Задать вопрос',
      },
      {
        id: 'dashboards-reports',
        title: 'Дашборды и отчёты',
        description:
          'Строим понятные отчёты в Looker Studio, Power BI и Google Sheets для продаж, маркетинга, финансов и руководителей.',
        bullets: [
          'KPI под модель бизнеса',
          'Маркетинг, продажи, финансы и операционные отчёты',
          'Интеграция данных из разных источников',
          'Передача команде сценария использования',
        ],
        cta: 'Узнать стоимость',
      },
      {
        id: 'analyst-outstaff',
        title: 'Part-time аналитик / outstaff',
        description:
          'Команда закрывает регулярные аналитические задачи бизнеса в проектном или частичном формате без найма full-time аналитика.',
        bullets: [
          'Регулярные отчёты и анализ',
          'Поддержка руководителей и команд',
          'Доработка дашбордов и процессов',
          'Формат под объём задач и бюджет',
        ],
        cta: 'Обсудить формат',
      },
      {
        id: 'omnidash',
        title: 'OmniDash — дашборды для e-commerce',
        description:
          'Отдельное продуктовое направление для интернет-магазинов: реклама, продажи, расходы и прибыль в одном управленческом дашборде.',
        bullets: [
          'Looker Studio + Google Sheets / BigQuery',
          'Реклама, продажи и расходы в одном месте',
          'Модель чистой прибыли',
          'Подходит как upsell после аудита или dashboard-запроса',
        ],
        cta: 'Смотреть OmniDash',
        href: '/omnidash',
      },
    ],
    ctaTitle: 'Не знаете, с чего начать?',
    ctaSubtitle:
      'Опишите задачу — команда предложит первый практичный шаг: консультацию, аудит, обучение или оценку автоматизации.',
    ctaPrimary: 'Получить бесплатную консультацию',
  },

  ua: {
    heroBadge: 'Нова версія Analyst Online',
    pageTitle: 'AI, автоматизація та аналітика для бізнесу',
    pageSubtitle:
      'Команда Analyst Online допомагає впроваджувати AI, автоматизувати звіти, будувати аналітику й закривати регулярні задачі бізнесу без найму full-time спеціаліста.',
    heroPrimaryCta: 'Почати з AI навчання',
    heroSecondaryCta: 'Переглянути напрями',
    primarySectionTitle: 'Нові AI SEO напрями',
    primarySectionSubtitle:
      'Окремі сторінки для навчання, AI-впровадження, автоматизації та роботи з Google Sheets / Excel.',
    supportSectionTitle: 'Підтримка впровадження',
    supportSectionSubtitle:
      'Формати, які допомагають довести AI, аналітику та звітність до регулярної роботи в команді.',
    services: [
      {
        id: 'ai-training',
        title: 'AI / ChatGPT навчання для бізнесу',
        description:
          'Проводимо практичне онлайн-навчання для власників, співробітників і команд з актуальною інформацією щодо AI-інструментів.',
        bullets: [
          'Індивідуальні та групові заняття',
          'Теми підбираються під задачі й рівень команди',
          'Без старих записів: тільки актуальна практика',
          'Пояснюємо unit-економіку AI-моделей і впроваджень',
        ],
        cta: 'Отримати консультацію',
        href: '/navchannia-ai',
        highlighted: true,
      },
      {
        id: 'ai-business',
        title: 'AI для бізнесу та співробітників',
        description:
          'Допомагаємо командам вбудувати AI у щоденну роботу: документи, комунікації, аналіз, продажі, маркетинг і операційні процеси.',
        bullets: [
          'AI-сценарії для відділів і ролей',
          'Внутрішні інструкції та playbook',
          'Безпечне використання AI в робочих процесах',
          'Перехід від разових промптів до системного застосування',
        ],
        cta: 'Обговорити впровадження',
        href: '/services/ai-dlya-biznesu',
      },
      {
        id: 'ai-automation',
        title: 'Автоматизація процесів з AI',
        description:
          'Зменшуємо ручну роботу: автоматичні звіти, повідомлення, генерація документів і прості внутрішні workflow.',
        bullets: [
          'Автоматизація регулярних звітів',
          'Telegram/email повідомлення',
          'Генерація документів і зведень',
          'Оцінка вартості реалізації до старту',
        ],
        cta: 'Дізнатися вартість',
        href: '/services/avtomatyzatsiya-ai',
      },
      {
        id: 'ai-sheets-excel',
        title: 'AI + Google Sheets / Excel',
        description:
          'Наводимо порядок у таблицях, формулах і звітах, а потім додаємо AI там, де він справді економить час.',
        bullets: [
          'Формули, очищення даних і шаблони звітів',
          'AI-помічники для таблиць і документів',
          'Підготовка до Apps Script автоматизації',
          'Управлінська звітність без хаосу',
        ],
        cta: 'Розібрати таблиці',
        href: '/services/ai-google-sheets-excel',
      },
      {
        id: 'apps-script',
        title: 'Google Sheets / Apps Script автоматизація',
        description:
          'Налаштовуємо скрипти, імпорти, перевірки, повідомлення та інші процеси навколо Google таблиць.',
        bullets: [
          'Scheduled imports і регулярні оновлення',
          'Email/Telegram повідомлення',
          'Автоматизація документів і таблиць',
          'Підтримка існуючих файлів і скриптів',
        ],
        cta: 'Поставити запитання',
      },
      {
        id: 'dashboards-reports',
        title: 'Дашборди та звіти',
        description:
          'Будуємо зрозумілі звіти в Looker Studio, Power BI та Google Sheets для продажів, маркетингу, фінансів і керівників.',
        bullets: [
          'KPI під модель бізнесу',
          'Маркетинг, продажі, фінанси й операційні звіти',
          'Інтеграція даних із різних джерел',
          'Передача команді сценарію використання',
        ],
        cta: 'Дізнатися вартість',
      },
      {
        id: 'analyst-outstaff',
        title: 'Part-time аналітик / outstaff',
        description:
          'Команда закриває регулярні аналітичні задачі бізнесу в проєктному або частковому форматі без найму full-time аналітика.',
        bullets: [
          'Регулярні звіти й аналіз',
          'Підтримка керівників і команд',
          'Доопрацювання дашбордів і процесів',
          'Формат під обсяг задач і бюджет',
        ],
        cta: 'Обговорити формат',
      },
      {
        id: 'omnidash',
        title: 'OmniDash — дашборди для e-commerce',
        description:
          'Окремий продуктовий напрям для інтернет-магазинів: реклама, продажі, витрати й прибуток в одному управлінському дашборді.',
        bullets: [
          'Looker Studio + Google Sheets / BigQuery',
          'Реклама, продажі й витрати в одному місці',
          'Модель чистого прибутку',
          'Підходить як upsell після аудиту або dashboard-запиту',
        ],
        cta: 'Дивитися OmniDash',
        href: '/omnidash',
      },
    ],
    ctaTitle: 'Не знаєте, з чого почати?',
    ctaSubtitle:
      'Опишіть задачу — команда запропонує перший практичний крок: консультацію, аудит, навчання або оцінку автоматизації.',
    ctaPrimary: 'Отримати безкоштовну консультацію',
  },

  ro: {
    heroBadge: 'Noua versiune Analyst Online',
    pageTitle: 'AI, automatizare și analytics pentru business',
    pageSubtitle:
      'Echipa Analyst Online ajută la implementarea AI, automatizarea rapoartelor, construirea analytics-ului și acoperirea sarcinilor recurente fără angajarea unui analist full-time.',
    heroPrimaryCta: 'Începe cu training AI',
    heroSecondaryCta: 'Vezi direcțiile',
    primarySectionTitle: 'Noile direcții AI SEO',
    primarySectionSubtitle:
      'Pagini separate pentru training, implementare AI, automatizare și lucru cu Google Sheets / Excel.',
    supportSectionTitle: 'Suport pentru implementare',
    supportSectionSubtitle:
      'Formate care ajută echipa să transforme AI, analytics-ul și raportarea în lucru recurent.',
    services: [
      {
        id: 'ai-training',
        title: 'Training AI / ChatGPT pentru business',
        description:
          'Facem training online practic pentru fondatori, angajați și echipe cu informații actuale despre instrumentele AI.',
        bullets: [
          'Sesiuni individuale și de grup',
          'Temele sunt adaptate sarcinilor și nivelului echipei',
          'Fără înregistrări vechi: doar practică actuală',
          'Explicăm unit economics pentru modele și implementări AI',
        ],
        cta: 'Primește consultație',
        href: '/curs-ai',
        highlighted: true,
      },
      {
        id: 'ai-business',
        title: 'AI pentru business și angajați',
        description:
          'Ajutăm echipele să includă AI în munca zilnică: documente, comunicare, analiză, vânzări, marketing și operațiuni.',
        bullets: [
          'Scenarii AI pentru departamente și roluri',
          'Instrucțiuni interne și playbook',
          'Utilizare sigură a AI în procesele de lucru',
          'Trecere de la prompturi izolate la utilizare sistemică',
        ],
        cta: 'Discută implementarea',
        href: '/services/ai-pentru-business',
      },
      {
        id: 'ai-automation',
        title: 'Automatizarea proceselor cu AI',
        description:
          'Reducem munca manuală: rapoarte automate, notificări, generare de documente și workflow-uri interne simple.',
        bullets: [
          'Automatizarea rapoartelor recurente',
          'Notificări Telegram/email',
          'Generare de documente și sumarizări',
          'Estimarea costului implementării înainte de start',
        ],
        cta: 'Află costul',
        href: '/services/automatizare-ai',
      },
      {
        id: 'ai-sheets-excel',
        title: 'AI + Google Sheets / Excel',
        description:
          'Punem ordine în tabele, formule și rapoarte, apoi adăugăm AI acolo unde economisește timp real.',
        bullets: [
          'Formule, curățare de date și template-uri de raportare',
          'Asistenți AI pentru tabele și documente',
          'Pregătire pentru automatizare Apps Script',
          'Raportare managerială fără haos',
        ],
        cta: 'Analizează tabelele',
        href: '/services/ai-google-sheets-excel',
      },
      {
        id: 'apps-script',
        title: 'Automatizare Google Sheets / Apps Script',
        description:
          'Configurăm scripturi, importuri, verificări, notificări și alte procese în jurul Google Sheets.',
        bullets: [
          'Scheduled imports și actualizări regulate',
          'Notificări Email/Telegram',
          'Automatizarea documentelor și tabelelor',
          'Suport pentru fișiere și scripturi existente',
        ],
        cta: 'Pune o întrebare',
      },
      {
        id: 'dashboards-reports',
        title: 'Dashboard-uri și rapoarte',
        description:
          'Construim rapoarte clare în Looker Studio, Power BI și Google Sheets pentru vânzări, marketing, finanțe și management.',
        bullets: [
          'KPI-uri pentru modelul tău de business',
          'Rapoarte de marketing, vânzări, finanțe și operațiuni',
          'Integrarea datelor din surse diferite',
          'Scenariu de utilizare pentru echipă',
        ],
        cta: 'Află costul',
      },
      {
        id: 'analyst-outstaff',
        title: 'Analist part-time / outstaff',
        description:
          'Echipa acoperă sarcini analitice recurente în format de proiect sau part-time, fără angajarea unui analist full-time.',
        bullets: [
          'Rapoarte regulate și analiză',
          'Suport pentru manageri și echipe',
          'Îmbunătățirea dashboard-urilor și proceselor',
          'Format adaptat volumului și bugetului',
        ],
        cta: 'Discută formatul',
      },
      {
        id: 'omnidash',
        title: 'OmniDash — dashboard-uri pentru e-commerce',
        description:
          'Direcție productizată pentru magazine online: reclamă, vânzări, cheltuieli și profit într-un dashboard managerial.',
        bullets: [
          'Looker Studio + Google Sheets / BigQuery',
          'Reclamă, vânzări și cheltuieli într-un singur loc',
          'Model de profit net',
          'Potrivit ca upsell după audit sau cerere de dashboard',
        ],
        cta: 'Vezi OmniDash',
        href: '/omnidash',
      },
    ],
    ctaTitle: 'Nu știi cu ce să începi?',
    ctaSubtitle:
      'Descrie sarcina — echipa propune primul pas practic: consultație, audit, training sau estimare de automatizare.',
    ctaPrimary: 'Primește o consultație gratuită',
  },
};
