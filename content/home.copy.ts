import type { Locale } from '@/lib/i18n';

export type HomeCopy = {
  metaTitle: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaPrice: string;
  ctaQuestion: string;
  ctaConsultation: string;
  signalCards: { value: string; label: string }[];
  audienceTitle: string;
  audienceSubtitle: string;
  pains: { title: string; text: string }[];
  servicesTitle: string;
  servicesSubtitle: string;
  servicesLinkAll: string;
  services: { title: string; description: string; href?: string }[];
  trainingBadge: string;
  trainingTitle: string;
  trainingSubtitle: string;
  trainingPoints: string[];
  examplesTitle: string;
  examplesSubtitle: string;
  examples: { title: string; text: string }[];
  processTitle: string;
  processSubtitle: string;
  process: { step: string; title: string; text: string }[];
  proofTitle: string;
  proofSubtitle: string;
  proofTodo: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  finalTitle: string;
  finalSubtitle: string;
};

export const homeCopy: Record<Locale, HomeCopy> = {
  ru: {
    metaTitle: 'Analyst Online — AI, аналитика и автоматизация для бизнеса',
    heroBadge: 'AI, аналитика и автоматизация для малого бизнеса',
    heroTitle: 'AI, аналитика и автоматизация для бизнеса',
    heroSubtitle:
      'Команда Analyst Online помогает обучать сотрудников работе с AI, автоматизировать рутину, приводить в порядок отчёты и выстраивать управленческую аналитику.',
    ctaPrice: 'Узнать стоимость',
    ctaQuestion: 'Задать вопрос',
    ctaConsultation: 'Получить бесплатную консультацию',
    signalCards: [
      { value: 'AI', label: 'обучение и внедрение' },
      { value: 'Sheets', label: 'Excel, Google Sheets, Apps Script' },
      { value: 'BI', label: 'дашборды и отчёты' },
    ],
    audienceTitle: 'Когда стоит обратиться',
    audienceSubtitle:
      'Мы работаем с командами, которым нужна практичная помощь без тяжёлой enterprise-архитектуры.',
    pains: [
      {
        title: 'AI используется хаотично',
        text: 'Сотрудники пробуют ChatGPT, но нет понятных сценариев, правил и оценки пользы для бизнеса.',
      },
      {
        title: 'Отчёты собираются вручную',
        text: 'Данные живут в таблицах, рекламных кабинетах и CRM, а управленческая картина собирается слишком долго.',
      },
      {
        title: 'Нет аналитика в команде',
        text: 'Задачи по отчётам, автоматизации и анализу есть постоянно, но full-time специалист пока не окупается.',
      },
    ],
    servicesTitle: 'Основные направления',
    servicesSubtitle:
      'Услуги связаны между собой: обучение ведёт к внедрению, автоматизация — к отчётности, отчётность — к регулярной аналитической поддержке.',
    servicesLinkAll: 'Все услуги',
    services: [
      {
        title: 'AI / ChatGPT обучение',
        description: 'Практические онлайн-занятия для сотрудников, руководителей и команд.',
        href: '/obuchenie-ai',
      },
      {
        title: 'AI автоматизация',
        description: 'Автоматические отчёты, уведомления, документы и внутренние workflow.',
        href: '/services/avtomatizatsiya-ai',
      },
      {
        title: 'Google Sheets / Excel',
        description: 'Порядок в таблицах, формулах, шаблонах и управленческих отчётах.',
        href: '/services/ai-google-sheets-excel',
      },
      {
        title: 'Part-time аналитик',
        description: 'Регулярная аналитическая поддержка без найма full-time специалиста.',
      },
    ],
    trainingBadge: 'Почему обучение с нами',
    trainingTitle: 'Не курс из старых записей, а актуальная практическая работа',
    trainingSubtitle:
      'AI-инструменты меняются быстро, поэтому обучение строится вокруг текущих возможностей, ваших задач и стоимости внедрения.',
    trainingPoints: [
      'Только актуальная информация на текущий момент, без устаревших записей.',
      'Все встречи проходят онлайн и не заменяются видеозаписями.',
      'В индивидуальном формате вы сами выбираете вопросы и темы обучения.',
      'Группы подбираются по уровню знаний и нужной тематике студентов.',
      'При внедрении AI мы объясняем unit-экономику моделей и стоимость реализации проектов.',
    ],
    examplesTitle: 'Что можно автоматизировать',
    examplesSubtitle:
      'Начинаем с задач, которые быстро экономят время и дают понятный управленческий эффект.',
    examples: [
      {
        title: 'Отчёты и уведомления',
        text: 'Ежедневные или еженедельные сводки в Google Sheets, email или Telegram.',
      },
      {
        title: 'Документы и шаблоны',
        text: 'Генерация типовых документов, писем, резюме встреч и рабочих инструкций.',
      },
      {
        title: 'Дашборды',
        text: 'Looker Studio, Power BI или Google Sheets отчёты для продаж, рекламы и финансов.',
      },
    ],
    processTitle: 'Как мы работаем',
    processSubtitle: 'Короткий цикл от задачи до первого результата.',
    process: [
      {
        step: '01',
        title: 'Разбираем задачу',
        text: 'Фиксируем цель, текущие файлы/процессы, ограничения и ожидаемый результат.',
      },
      {
        step: '02',
        title: 'Предлагаем формат',
        text: 'Выбираем обучение, аудит, автоматизацию, dashboard или регулярную поддержку.',
      },
      {
        step: '03',
        title: 'Считаем реализацию',
        text: 'Оцениваем объём, инструменты, стоимость AI-моделей и поддержку после запуска.',
      },
      {
        step: '04',
        title: 'Запускаем и передаём',
        text: 'Настраиваем решение, объясняем команде сценарий использования и фиксируем следующие шаги.',
      },
    ],
    proofTitle: 'Кейсы и материалы',
    proofSubtitle:
      'Используем только реальные материалы, которые можно показать без выдуманных метрик.',
    proofTodo:
      'TODO: добавить реальные скриншоты, демо, кейсы и обучающие материалы после утверждения пользователем.',
    faqTitle: 'Частые вопросы',
    faqs: [
      {
        q: 'Можно начать с одной консультации?',
        a: 'Да. Команда может начать с короткого разбора задачи, чтобы определить полезный формат и оценить объём работ.',
      },
      {
        q: 'Вы делаете только обучение или внедрение тоже?',
        a: 'Мы можем провести обучение, помочь внедрить AI в процессы, автоматизировать отчёты и сопровождать аналитику дальше.',
      },
      {
        q: 'OmniDash остаётся частью проекта?',
        a: 'Да. OmniDash остаётся отдельным предложением для e-commerce дашбордов и подключается там, где клиенту нужна аналитика продаж, рекламы и прибыли.',
      },
    ],
    finalTitle: 'Хотите понять, что можно улучшить уже сейчас?',
    finalSubtitle:
      'Выберите цель обращения: узнать стоимость, задать вопрос или получить бесплатную консультацию.',
  },

  ua: {
    metaTitle: 'Analyst Online — AI, аналітика й автоматизація для бізнесу',
    heroBadge: 'AI, аналітика й автоматизація для малого бізнесу',
    heroTitle: 'AI, аналітика й автоматизація для бізнесу',
    heroSubtitle:
      'Команда Analyst Online допомагає навчати співробітників роботі з AI, автоматизувати рутину, наводити порядок у звітах і будувати управлінську аналітику.',
    ctaPrice: 'Дізнатися вартість',
    ctaQuestion: 'Поставити запитання',
    ctaConsultation: 'Отримати безкоштовну консультацію',
    signalCards: [
      { value: 'AI', label: 'навчання та впровадження' },
      { value: 'Sheets', label: 'Excel, Google Sheets, Apps Script' },
      { value: 'BI', label: 'дашборди та звіти' },
    ],
    audienceTitle: 'Коли варто звернутися',
    audienceSubtitle:
      'Ми працюємо з командами, яким потрібна практична допомога без важкої enterprise-архітектури.',
    pains: [
      {
        title: 'AI використовується хаотично',
        text: 'Співробітники пробують ChatGPT, але немає зрозумілих сценаріїв, правил і оцінки користі для бізнесу.',
      },
      {
        title: 'Звіти збираються вручну',
        text: 'Дані живуть у таблицях, рекламних кабінетах і CRM, а управлінська картина збирається занадто довго.',
      },
      {
        title: 'Немає аналітика в команді',
        text: 'Задачі щодо звітів, автоматизації й аналізу є постійно, але full-time спеціаліст поки не окупається.',
      },
    ],
    servicesTitle: 'Основні напрями',
    servicesSubtitle:
      'Послуги пов’язані між собою: навчання веде до впровадження, автоматизація — до звітності, звітність — до регулярної аналітичної підтримки.',
    servicesLinkAll: 'Усі послуги',
    services: [
      {
        title: 'AI / ChatGPT навчання',
        description: 'Практичні онлайн-заняття для співробітників, керівників і команд.',
        href: '/navchannia-ai',
      },
      {
        title: 'AI автоматизація',
        description: 'Автоматичні звіти, повідомлення, документи та внутрішні workflow.',
        href: '/services/avtomatyzatsiya-ai',
      },
      {
        title: 'Google Sheets / Excel',
        description: 'Порядок у таблицях, формулах, шаблонах та управлінських звітах.',
        href: '/services/ai-google-sheets-excel',
      },
      {
        title: 'Part-time аналітик',
        description: 'Регулярна аналітична підтримка без найму full-time спеціаліста.',
      },
    ],
    trainingBadge: 'Чому навчання з нами',
    trainingTitle: 'Не курс зі старих записів, а актуальна практична робота',
    trainingSubtitle:
      'AI-інструменти змінюються швидко, тому навчання будується навколо поточних можливостей, ваших задач і вартості впровадження.',
    trainingPoints: [
      'Тільки актуальна інформація на поточний момент, без застарілих записів.',
      'Усі зустрічі проходять онлайн і не замінюються відеозаписами.',
      'В індивідуальному форматі ви самі обираєте питання й теми навчання.',
      'Групи підбираються за рівнем знань і потрібною тематикою студентів.',
      'Під час впровадження AI ми пояснюємо unit-економіку моделей і вартість реалізації проєктів.',
    ],
    examplesTitle: 'Що можна автоматизувати',
    examplesSubtitle:
      'Починаємо із задач, які швидко економлять час і дають зрозумілий управлінський ефект.',
    examples: [
      {
        title: 'Звіти та повідомлення',
        text: 'Щоденні або щотижневі зведення в Google Sheets, email або Telegram.',
      },
      {
        title: 'Документи й шаблони',
        text: 'Генерація типових документів, листів, резюме зустрічей і робочих інструкцій.',
      },
      {
        title: 'Дашборди',
        text: 'Looker Studio, Power BI або Google Sheets звіти для продажів, реклами й фінансів.',
      },
    ],
    processTitle: 'Як ми працюємо',
    processSubtitle: 'Короткий цикл від задачі до першого результату.',
    process: [
      {
        step: '01',
        title: 'Розбираємо задачу',
        text: 'Фіксуємо ціль, поточні файли/процеси, обмеження й очікуваний результат.',
      },
      {
        step: '02',
        title: 'Пропонуємо формат',
        text: 'Обираємо навчання, аудит, автоматизацію, dashboard або регулярну підтримку.',
      },
      {
        step: '03',
        title: 'Рахуємо реалізацію',
        text: 'Оцінюємо обсяг, інструменти, вартість AI-моделей і підтримку після запуску.',
      },
      {
        step: '04',
        title: 'Запускаємо й передаємо',
        text: 'Налаштовуємо рішення, пояснюємо команді сценарій використання й фіксуємо наступні кроки.',
      },
    ],
    proofTitle: 'Кейси та матеріали',
    proofSubtitle:
      'Використовуємо тільки реальні матеріали, які можна показати без вигаданих метрик.',
    proofTodo:
      'TODO: додати реальні скриншоти, демо, кейси й навчальні матеріали після затвердження користувачем.',
    faqTitle: 'Часті питання',
    faqs: [
      {
        q: 'Можна почати з однієї консультації?',
        a: 'Так. Команда може почати з короткого розбору задачі, щоб визначити корисний формат і оцінити обсяг робіт.',
      },
      {
        q: 'Ви робите тільки навчання чи також впровадження?',
        a: 'Ми можемо провести навчання, допомогти впровадити AI в процеси, автоматизувати звіти й супроводжувати аналітику далі.',
      },
      {
        q: 'OmniDash залишається частиною проєкту?',
        a: 'Так. OmniDash залишається окремою пропозицією для e-commerce дашбордів і підключається там, де клієнту потрібна аналітика продажів, реклами й прибутку.',
      },
    ],
    finalTitle: 'Хочете зрозуміти, що можна покращити вже зараз?',
    finalSubtitle:
      'Оберіть мету звернення: дізнатися вартість, поставити запитання або отримати безкоштовну консультацію.',
  },

  ro: {
    metaTitle: 'Analyst Online — AI, analytics și automatizare pentru business',
    heroBadge: 'AI, analytics și automatizare pentru business-uri mici',
    heroTitle: 'AI, analytics și automatizare pentru business',
    heroSubtitle:
      'Echipa Analyst Online ajută companiile să instruiască angajații în AI, să automatizeze rutina, să structureze rapoartele și să construiască analytics managerial.',
    ctaPrice: 'Află costul',
    ctaQuestion: 'Pune o întrebare',
    ctaConsultation: 'Primește o consultație gratuită',
    signalCards: [
      { value: 'AI', label: 'training și implementare' },
      { value: 'Sheets', label: 'Excel, Google Sheets, Apps Script' },
      { value: 'BI', label: 'dashboard-uri și rapoarte' },
    ],
    audienceTitle: 'Când merită să ne contactezi',
    audienceSubtitle:
      'Lucrăm cu echipe care au nevoie de ajutor practic fără arhitectură enterprise grea.',
    pains: [
      {
        title: 'AI este folosit haotic',
        text: 'Angajații testează ChatGPT, dar nu există scenarii clare, reguli și estimare a beneficiului pentru business.',
      },
      {
        title: 'Rapoartele se fac manual',
        text: 'Datele sunt în tabele, conturi de ads și CRM, iar imaginea managerială se construiește prea lent.',
      },
      {
        title: 'Nu există analist în echipă',
        text: 'Există sarcini recurente de raportare, automatizare și analiză, dar un specialist full-time nu se justifică încă.',
      },
    ],
    servicesTitle: 'Direcții principale',
    servicesSubtitle:
      'Serviciile se conectează între ele: trainingul duce la implementare, automatizarea la raportare, raportarea la suport analitic recurent.',
    servicesLinkAll: 'Toate serviciile',
    services: [
      {
        title: 'Training AI / ChatGPT',
        description: 'Sesiuni online practice pentru angajați, manageri și echipe.',
        href: '/curs-ai',
      },
      {
        title: 'Automatizare AI',
        description: 'Rapoarte automate, notificări, documente și workflow-uri interne.',
        href: '/services/automatizare-ai',
      },
      {
        title: 'Google Sheets / Excel',
        description: 'Ordine în tabele, formule, template-uri și rapoarte manageriale.',
        href: '/services/ai-google-sheets-excel',
      },
      {
        title: 'Analist part-time',
        description: 'Suport analitic recurent fără angajarea unui specialist full-time.',
      },
    ],
    trainingBadge: 'De ce training cu noi',
    trainingTitle: 'Nu un curs din înregistrări vechi, ci lucru practic actual',
    trainingSubtitle:
      'Instrumentele AI se schimbă rapid, de aceea trainingul pornește de la posibilitățile actuale, sarcinile tale și costul implementării.',
    trainingPoints: [
      'Doar informații actuale la momentul trainingului, fără înregistrări vechi.',
      'Toate întâlnirile sunt online și nu sunt înlocuite cu lecții înregistrate.',
      'În format individual alegi singur întrebările și temele de învățare.',
      'Grupele sunt formate după nivelul de cunoștințe și tematica necesară studenților.',
      'Pentru implementarea AI explicăm unit economics al modelelor și costul proiectelor.',
    ],
    examplesTitle: 'Ce putem automatiza',
    examplesSubtitle: 'Începem cu sarcini care economisesc timp rapid și au efect managerial clar.',
    examples: [
      {
        title: 'Rapoarte și notificări',
        text: 'Sumare zilnice sau săptămânale în Google Sheets, email sau Telegram.',
      },
      {
        title: 'Documente și template-uri',
        text: 'Generare de documente tip, emailuri, rezumate de întâlniri și instrucțiuni.',
      },
      {
        title: 'Dashboard-uri',
        text: 'Rapoarte Looker Studio, Power BI sau Google Sheets pentru vânzări, ads și finanțe.',
      },
    ],
    processTitle: 'Cum lucrăm',
    processSubtitle: 'Un ciclu scurt de la sarcină la primul rezultat.',
    process: [
      {
        step: '01',
        title: 'Analizăm sarcina',
        text: 'Fixăm obiectivul, fișierele/procesele actuale, limitările și rezultatul așteptat.',
      },
      {
        step: '02',
        title: 'Propunem formatul',
        text: 'Alegem training, audit, automatizare, dashboard sau suport recurent.',
      },
      {
        step: '03',
        title: 'Estimăm implementarea',
        text: 'Estimăm volumul, instrumentele, costul modelelor AI și suportul după lansare.',
      },
      {
        step: '04',
        title: 'Lansăm și predăm',
        text: 'Configurăm soluția, explicăm echipei scenariul de folosire și fixăm pașii următori.',
      },
    ],
    proofTitle: 'Cazuri și materiale',
    proofSubtitle: 'Folosim doar materiale reale, fără metrici inventate.',
    proofTodo:
      'TODO: adăugăm screenshot-uri reale, demo-uri, cazuri și materiale de training după aprobarea utilizatorului.',
    faqTitle: 'Întrebări frecvente',
    faqs: [
      {
        q: 'Putem începe cu o singură consultație?',
        a: 'Da. Echipa poate începe cu o analiză scurtă a sarcinii pentru a defini formatul util și volumul de lucru.',
      },
      {
        q: 'Faceți doar training sau și implementare?',
        a: 'Putem face training, ajuta la implementarea AI în procese, automatiza rapoarte și susține analytics-ul în continuare.',
      },
      {
        q: 'OmniDash rămâne parte din proiect?',
        a: 'Da. OmniDash rămâne o ofertă separată pentru dashboard-uri e-commerce și este folosit acolo unde clientul are nevoie de analytics pentru vânzări, ads și profit.',
      },
    ],
    finalTitle: 'Vrei să înțelegi ce poate fi îmbunătățit deja acum?',
    finalSubtitle:
      'Alege scopul mesajului: află costul, pune o întrebare sau primește o consultație gratuită.',
  },
};
