import type { Locale } from '@/lib/i18n';

export type OfferPageCopy = {
  path: string;
  title: string;
  metaTitle: string;
  description: string;
  badge: string;
  ctaPrimary: string;
  ctaSecondary: string;
  intro: string;
  includedTitle: string;
  included: string[];
  whyTitle: string;
  why: string[];
  processTitle: string;
  process: { title: string; text: string }[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
};

const ruTrainingWhy = [
  'Только актуальная информация на текущий момент, без устаревших записей.',
  'Все встречи проходят онлайн и не заменяются видеозаписями.',
  'В индивидуальном формате вы сами выбираете вопросы и темы обучения.',
  'Групповые занятия подбираются по уровню знаний и требуемой тематике студентов.',
  'При внедрении AI мы объясняем unit-экономику моделей и стоимость реализации проектов.',
];

const uaTrainingWhy = [
  'Тільки актуальна інформація на поточний момент, без застарілих записів.',
  'Усі зустрічі проходять онлайн і не замінюються відеозаписами.',
  'В індивідуальному форматі ви самі обираєте питання й теми навчання.',
  'Групові заняття підбираються за рівнем знань і потрібною тематикою студентів.',
  'Під час впровадження AI ми пояснюємо unit-економіку моделей і вартість реалізації проєктів.',
];

const roTrainingWhy = [
  'Doar informații actuale la momentul trainingului, fără înregistrări vechi.',
  'Toate întâlnirile sunt online și nu sunt înlocuite cu lecții înregistrate.',
  'În format individual alegi singur întrebările și temele de învățare.',
  'Sesiunile de grup sunt potrivite după nivelul de cunoștințe și tematica necesară.',
  'Pentru implementarea AI explicăm unit economics al modelelor și costul proiectelor.',
];

export const offerPages: Record<Locale, Record<string, OfferPageCopy>> = {
  ru: {
    'obuchenie-ai': {
      path: 'obuchenie-ai',
      title: 'AI / ChatGPT обучение для бизнеса',
      metaTitle: 'AI обучение для бизнеса — Analyst Online',
      description:
        'Практическое онлайн-обучение AI и ChatGPT для сотрудников, руководителей и команд.',
      badge: 'AI Training',
      ctaPrimary: 'Получить бесплатную консультацию',
      ctaSecondary: 'Узнать стоимость',
      intro:
        'Команда Analyst Online помогает разобраться, где AI реально экономит время, как использовать инструменты в ежедневной работе и сколько будет стоить внедрение.',
      includedTitle: 'Что входит',
      included: [
        'Разбор задач команды и текущего уровня знаний.',
        'Практические сценарии для документов, писем, анализа, продаж и маркетинга.',
        'Индивидуальные или групповые онлайн-занятия.',
        'Материалы, prompts и рабочие инструкции под вашу ситуацию.',
      ],
      whyTitle: 'Почему обучение с нами',
      why: ruTrainingWhy,
      processTitle: 'Как проходит обучение',
      process: [
        {
          title: 'Диагностика',
          text: 'Определяем роли, задачи, уровень подготовки и ожидания от AI.',
        },
        {
          title: 'Программа',
          text: 'Собираем темы под бизнес-задачи, а не под универсальную запись курса.',
        },
        {
          title: 'Практика',
          text: 'Проводим онлайн-встречи с упражнениями, примерами и разбором вопросов.',
        },
        {
          title: 'Внедрение',
          text: 'Фиксируем сценарии, оцениваем unit-экономику и следующие шаги автоматизации.',
        },
      ],
      faqTitle: 'Частые вопросы',
      faqs: [
        {
          q: 'Можно обучить только одного сотрудника?',
          a: 'Да. Индивидуальный формат подходит, когда нужно быстро закрыть конкретные вопросы и темы.',
        },
        {
          q: 'Есть ли записи занятий?',
          a: 'Нет. Встречи проходят онлайн, чтобы работать с актуальной информацией и вашими реальными вопросами.',
        },
      ],
    },
    'services/ai-dlya-biznesa': {
      path: 'services/ai-dlya-biznesa',
      title: 'AI для бизнеса и сотрудников',
      metaTitle: 'AI для бизнеса и сотрудников — Analyst Online',
      description:
        'Помогаем компаниям внедрять AI в ежедневные процессы сотрудников и руководителей.',
      badge: 'AI Implementation',
      ctaPrimary: 'Получить бесплатную консультацию',
      ctaSecondary: 'Задать вопрос',
      intro:
        'Команда помогает перейти от случайного использования ChatGPT к понятным рабочим сценариям, правилам и внутренним инструкциям.',
      includedTitle: 'Что настраиваем',
      included: [
        'AI-сценарии для менеджеров, продаж, маркетинга, финансов и операций.',
        'Внутренние правила использования AI и prompts под роли.',
        'Проверку задач, где AI экономит время, а где не окупается.',
        'Оценку стоимости инструментов и моделей до внедрения.',
      ],
      whyTitle: 'Почему это полезно',
      why: [
        'Сотрудники получают понятные сценарии вместо хаотичных экспериментов.',
        'Команда видит ограничения, риски и стоимость AI-решений.',
        'AI становится частью процессов, а не отдельной игрушкой.',
      ],
      processTitle: 'Как работаем',
      process: [
        { title: 'Аудит задач', text: 'Собираем повторяющиеся процессы и точки ручной работы.' },
        { title: 'AI-карта', text: 'Выбираем сценарии, где AI даст практичный эффект.' },
        { title: 'Настройка', text: 'Готовим prompts, инструкции и рабочие шаблоны.' },
        { title: 'Передача', text: 'Объясняем команде, как использовать решения безопасно.' },
      ],
      faqTitle: 'Частые вопросы',
      faqs: [
        {
          q: 'Можно начать без большого проекта?',
          a: 'Да. Обычно достаточно короткого аудита и пилотного сценария для одной команды или процесса.',
        },
      ],
    },
    'services/avtomatizatsiya-ai': {
      path: 'services/avtomatizatsiya-ai',
      title: 'Автоматизация бизнес-процессов с AI',
      metaTitle: 'Автоматизация AI для бизнеса — Analyst Online',
      description:
        'Автоматизируем отчёты, уведомления, документы и внутренние workflow с использованием AI.',
      badge: 'AI Automation',
      ctaPrimary: 'Узнать стоимость',
      ctaSecondary: 'Задать вопрос',
      intro:
        'Команда помогает убрать ручную работу там, где автоматизация экономит время и понятна по стоимости поддержки.',
      includedTitle: 'Что можно автоматизировать',
      included: [
        'Регулярные отчёты и сводки.',
        'Telegram/email уведомления.',
        'Генерацию документов, писем и резюме встреч.',
        'Сбор данных из таблиц, API и согласованных источников.',
      ],
      whyTitle: 'Как оцениваем проект',
      why: [
        'Сначала считаем ручное время и ожидаемый эффект.',
        'Подбираем простые инструменты без лишней enterprise-архитектуры.',
        'Объясняем стоимость AI-моделей, API и поддержки.',
      ],
      processTitle: 'Этапы',
      process: [
        { title: 'Разбор', text: 'Описываем текущий процесс и частоту повторения.' },
        { title: 'Оценка', text: 'Считаем стоимость реализации и поддержки.' },
        { title: 'Сборка', text: 'Настраиваем автоматизацию и тестируем на реальных данных.' },
        { title: 'Запуск', text: 'Передаём инструкции и фиксируем мониторинг.' },
      ],
      faqTitle: 'Частые вопросы',
      faqs: [
        {
          q: 'Вы делаете n8n/Make отдельной услугой?',
          a: 'Нет. Эти инструменты могут использоваться внутри автоматизации, но отдельной первой SEO-услугой не выделяются.',
        },
      ],
    },
    'services/ai-google-sheets-excel': {
      path: 'services/ai-google-sheets-excel',
      title: 'AI + Google Sheets / Excel',
      metaTitle: 'AI, Google Sheets и Excel автоматизация — Analyst Online',
      description:
        'Наводим порядок в таблицах, формулах и отчётах, добавляя AI там, где он реально экономит время.',
      badge: 'Sheets + AI',
      ctaPrimary: 'Узнать стоимость',
      ctaSecondary: 'Задать вопрос',
      intro:
        'Команда помогает превратить нестабильные таблицы в рабочие отчёты, шаблоны и основу для дальнейшей автоматизации.',
      includedTitle: 'Что входит',
      included: [
        'Аудит текущих таблиц и формул.',
        'Очистка данных, шаблоны отчётов и контроль ошибок.',
        'AI-помощники для текстов, классификации и анализа.',
        'Подготовка к Google Apps Script автоматизации.',
      ],
      whyTitle: 'Когда это нужно',
      why: [
        'Файлы стали слишком сложными и ломаются при обновлении.',
        'Команда тратит время на копирование данных и ручные проверки.',
        'Нужно быстро получить управленческий отчёт без полноценного BI-проекта.',
      ],
      processTitle: 'Этапы',
      process: [
        { title: 'Аудит файла', text: 'Находим слабые места в структуре и формулах.' },
        { title: 'Схема данных', text: 'Упрощаем логику и разделяем ввод, расчёты и вывод.' },
        {
          title: 'AI/автоматизация',
          text: 'Добавляем AI или Apps Script только там, где это оправдано.',
        },
        { title: 'Передача', text: 'Документируем правила работы для команды.' },
      ],
      faqTitle: 'Частые вопросы',
      faqs: [
        {
          q: 'Можно доработать существующий файл?',
          a: 'Да. Обычно мы начинаем с текущих таблиц, чтобы не ломать привычный процесс без причины.',
        },
      ],
    },
  },

  ua: {
    'navchannia-ai': {
      path: 'navchannia-ai',
      title: 'AI / ChatGPT навчання для бізнесу',
      metaTitle: 'AI навчання для бізнесу — Analyst Online',
      description:
        'Практичне онлайн-навчання AI та ChatGPT для співробітників, керівників і команд.',
      badge: 'AI Training',
      ctaPrimary: 'Отримати безкоштовну консультацію',
      ctaSecondary: 'Дізнатися вартість',
      intro:
        'Команда Analyst Online допомагає зрозуміти, де AI реально економить час, як використовувати інструменти в щоденній роботі і скільки коштуватиме впровадження.',
      includedTitle: 'Що входить',
      included: [
        'Розбір задач команди й поточного рівня знань.',
        'Практичні сценарії для документів, листів, аналізу, продажів і маркетингу.',
        'Індивідуальні або групові онлайн-заняття.',
        'Матеріали, prompts і робочі інструкції під вашу ситуацію.',
      ],
      whyTitle: 'Чому навчання з нами',
      why: uaTrainingWhy,
      processTitle: 'Як проходить навчання',
      process: [
        {
          title: 'Діагностика',
          text: 'Визначаємо ролі, задачі, рівень підготовки й очікування від AI.',
        },
        {
          title: 'Програма',
          text: 'Збираємо теми під бізнес-задачі, а не під універсальний запис курсу.',
        },
        {
          title: 'Практика',
          text: 'Проводимо онлайн-зустрічі з вправами, прикладами й розбором питань.',
        },
        {
          title: 'Впровадження',
          text: 'Фіксуємо сценарії, оцінюємо unit-економіку й наступні кроки автоматизації.',
        },
      ],
      faqTitle: 'Часті питання',
      faqs: [
        {
          q: 'Можна навчити одного співробітника?',
          a: 'Так. Індивідуальний формат підходить, коли потрібно швидко закрити конкретні питання й теми.',
        },
        {
          q: 'Чи є записи занять?',
          a: 'Ні. Зустрічі проходять онлайн, щоб працювати з актуальною інформацією і вашими реальними питаннями.',
        },
      ],
    },
    'services/ai-dlya-biznesu': {
      path: 'services/ai-dlya-biznesu',
      title: 'AI для бізнесу та співробітників',
      metaTitle: 'AI для бізнесу та співробітників — Analyst Online',
      description: 'Допомагаємо компаніям впроваджувати AI у щоденні процеси команд.',
      badge: 'AI Implementation',
      ctaPrimary: 'Отримати безкоштовну консультацію',
      ctaSecondary: 'Поставити запитання',
      intro:
        'Команда допомагає перейти від випадкового використання ChatGPT до зрозумілих робочих сценаріїв, правил і внутрішніх інструкцій.',
      includedTitle: 'Що налаштовуємо',
      included: [
        'AI-сценарії для менеджерів, продажів, маркетингу, фінансів і операцій.',
        'Внутрішні правила використання AI та prompts під ролі.',
        'Перевірку задач, де AI економить час, а де не окупається.',
        'Оцінку вартості інструментів і моделей до впровадження.',
      ],
      whyTitle: 'Чому це корисно',
      why: [
        'Співробітники отримують зрозумілі сценарії замість хаотичних експериментів.',
        'Команда бачить обмеження, ризики й вартість AI-рішень.',
        'AI стає частиною процесів, а не окремою іграшкою.',
      ],
      processTitle: 'Як працюємо',
      process: [
        { title: 'Аудит задач', text: 'Збираємо повторювані процеси й точки ручної роботи.' },
        { title: 'AI-карта', text: 'Обираємо сценарії, де AI дасть практичний ефект.' },
        { title: 'Налаштування', text: 'Готуємо prompts, інструкції та робочі шаблони.' },
        { title: 'Передача', text: 'Пояснюємо команді, як використовувати рішення безпечно.' },
      ],
      faqTitle: 'Часті питання',
      faqs: [
        {
          q: 'Можна почати без великого проєкту?',
          a: 'Так. Часто достатньо короткого аудиту й пілотного сценарію для однієї команди або процесу.',
        },
      ],
    },
    'services/avtomatyzatsiya-ai': {
      path: 'services/avtomatyzatsiya-ai',
      title: 'Автоматизація бізнес-процесів з AI',
      metaTitle: 'AI автоматизація для бізнесу — Analyst Online',
      description: 'Автоматизуємо звіти, повідомлення, документи й внутрішні workflow з AI.',
      badge: 'AI Automation',
      ctaPrimary: 'Дізнатися вартість',
      ctaSecondary: 'Поставити запитання',
      intro:
        'Команда допомагає прибрати ручну роботу там, де автоматизація економить час і зрозуміла за вартістю підтримки.',
      includedTitle: 'Що можна автоматизувати',
      included: [
        'Регулярні звіти та зведення.',
        'Telegram/email повідомлення.',
        'Генерацію документів, листів і резюме зустрічей.',
        'Збір даних із таблиць, API та погоджених джерел.',
      ],
      whyTitle: 'Як оцінюємо проєкт',
      why: [
        'Спочатку рахуємо ручний час і очікуваний ефект.',
        'Підбираємо прості інструменти без зайвої enterprise-архітектури.',
        'Пояснюємо вартість AI-моделей, API та підтримки.',
      ],
      processTitle: 'Етапи',
      process: [
        { title: 'Розбір', text: 'Описуємо поточний процес і частоту повторення.' },
        { title: 'Оцінка', text: 'Рахуємо вартість реалізації та підтримки.' },
        { title: 'Збірка', text: 'Налаштовуємо автоматизацію й тестуємо на реальних даних.' },
        { title: 'Запуск', text: 'Передаємо інструкції та фіксуємо моніторинг.' },
      ],
      faqTitle: 'Часті питання',
      faqs: [
        {
          q: 'Чи робите n8n/Make окремою послугою?',
          a: 'Ні. Ці інструменти можуть використовуватись всередині автоматизації, але окремою першою SEO-послугою не виділяються.',
        },
      ],
    },
    'services/ai-google-sheets-excel': {
      path: 'services/ai-google-sheets-excel',
      title: 'AI + Google Sheets / Excel',
      metaTitle: 'AI, Google Sheets та Excel автоматизація — Analyst Online',
      description:
        'Наводимо порядок у таблицях, формулах і звітах, додаючи AI там, де він реально економить час.',
      badge: 'Sheets + AI',
      ctaPrimary: 'Дізнатися вартість',
      ctaSecondary: 'Поставити запитання',
      intro:
        'Команда допомагає перетворити нестабільні таблиці на робочі звіти, шаблони й основу для подальшої автоматизації.',
      includedTitle: 'Що входить',
      included: [
        'Аудит поточних таблиць і формул.',
        'Очищення даних, шаблони звітів і контроль помилок.',
        'AI-помічники для текстів, класифікації й аналізу.',
        'Підготовка до Google Apps Script автоматизації.',
      ],
      whyTitle: 'Коли це потрібно',
      why: [
        'Файли стали занадто складними й ламаються при оновленні.',
        'Команда витрачає час на копіювання даних і ручні перевірки.',
        'Потрібно швидко отримати управлінський звіт без повного BI-проєкту.',
      ],
      processTitle: 'Етапи',
      process: [
        { title: 'Аудит файлу', text: 'Знаходимо слабкі місця в структурі й формулах.' },
        { title: 'Схема даних', text: 'Спрощуємо логіку й розділяємо ввід, розрахунки та вивід.' },
        {
          title: 'AI/автоматизація',
          text: 'Додаємо AI або Apps Script тільки там, де це виправдано.',
        },
        { title: 'Передача', text: 'Документуємо правила роботи для команди.' },
      ],
      faqTitle: 'Часті питання',
      faqs: [
        {
          q: 'Можна доопрацювати існуючий файл?',
          a: 'Так. Зазвичай ми починаємо з поточних таблиць, щоб не ламати звичний процес без причини.',
        },
      ],
    },
  },

  ro: {
    'curs-ai': {
      path: 'curs-ai',
      title: 'Training AI / ChatGPT pentru business',
      metaTitle: 'Training AI pentru business — Analyst Online',
      description: 'Training online practic AI și ChatGPT pentru angajați, manageri și echipe.',
      badge: 'AI Training',
      ctaPrimary: 'Primește o consultație gratuită',
      ctaSecondary: 'Află costul',
      intro:
        'Echipa Analyst Online ajută să înțelegi unde AI economisește timp real, cum se folosesc instrumentele în munca zilnică și cât costă implementarea.',
      includedTitle: 'Ce include',
      included: [
        'Analiza sarcinilor echipei și a nivelului actual.',
        'Scenarii practice pentru documente, emailuri, analiză, vânzări și marketing.',
        'Sesiuni online individuale sau de grup.',
        'Materiale, prompts și instrucțiuni adaptate situației tale.',
      ],
      whyTitle: 'De ce training cu noi',
      why: roTrainingWhy,
      processTitle: 'Cum decurge trainingul',
      process: [
        {
          title: 'Diagnostic',
          text: 'Definim rolurile, sarcinile, nivelul și așteptările de la AI.',
        },
        {
          title: 'Program',
          text: 'Construim temele după sarcini de business, nu după un curs generic înregistrat.',
        },
        {
          title: 'Practică',
          text: 'Facem întâlniri online cu exerciții, exemple și întrebări reale.',
        },
        {
          title: 'Implementare',
          text: 'Fixăm scenarii, estimăm unit economics și următorii pași de automatizare.',
        },
      ],
      faqTitle: 'Întrebări frecvente',
      faqs: [
        {
          q: 'Se poate instrui un singur angajat?',
          a: 'Da. Formatul individual este potrivit când trebuie clarificate rapid întrebări și teme concrete.',
        },
        {
          q: 'Există înregistrări?',
          a: 'Nu. Întâlnirile sunt online pentru a lucra cu informații actuale și întrebări reale.',
        },
      ],
    },
    'services/ai-pentru-business': {
      path: 'services/ai-pentru-business',
      title: 'AI pentru business și angajați',
      metaTitle: 'AI pentru business și angajați — Analyst Online',
      description: 'Ajutăm companiile să implementeze AI în procesele zilnice ale echipelor.',
      badge: 'AI Implementation',
      ctaPrimary: 'Primește o consultație gratuită',
      ctaSecondary: 'Pune o întrebare',
      intro:
        'Echipa ajută la trecerea de la utilizare întâmplătoare a ChatGPT la scenarii clare, reguli și instrucțiuni interne.',
      includedTitle: 'Ce configurăm',
      included: [
        'Scenarii AI pentru management, vânzări, marketing, finanțe și operațiuni.',
        'Reguli interne de utilizare AI și prompts pe roluri.',
        'Verificarea sarcinilor unde AI economisește timp și unde nu se justifică.',
        'Estimarea costului instrumentelor și modelelor înainte de implementare.',
      ],
      whyTitle: 'De ce este util',
      why: [
        'Angajații primesc scenarii clare în loc de experimente haotice.',
        'Echipa vede limitele, riscurile și costul soluțiilor AI.',
        'AI devine parte din procese, nu o unealtă izolată.',
      ],
      processTitle: 'Cum lucrăm',
      process: [
        { title: 'Audit sarcini', text: 'Colectăm procese recurente și puncte de muncă manuală.' },
        { title: 'Hartă AI', text: 'Alegem scenarii unde AI aduce efect practic.' },
        { title: 'Configurare', text: 'Pregătim prompts, instrucțiuni și template-uri.' },
        { title: 'Predare', text: 'Explicăm echipei cum să folosească soluțiile în siguranță.' },
      ],
      faqTitle: 'Întrebări frecvente',
      faqs: [
        {
          q: 'Putem începe fără proiect mare?',
          a: 'Da. De obicei este suficient un audit scurt și un scenariu pilot pentru o echipă sau un proces.',
        },
      ],
    },
    'services/automatizare-ai': {
      path: 'services/automatizare-ai',
      title: 'Automatizarea proceselor de business cu AI',
      metaTitle: 'Automatizare AI pentru business — Analyst Online',
      description: 'Automatizăm rapoarte, notificări, documente și workflow-uri interne cu AI.',
      badge: 'AI Automation',
      ctaPrimary: 'Află costul',
      ctaSecondary: 'Pune o întrebare',
      intro:
        'Echipa ajută la eliminarea muncii manuale acolo unde automatizarea economisește timp și are cost de suport clar.',
      includedTitle: 'Ce putem automatiza',
      included: [
        'Rapoarte și sumarizări recurente.',
        'Notificări Telegram/email.',
        'Generare de documente, emailuri și rezumate de întâlniri.',
        'Colectare de date din tabele, API-uri și surse agreate.',
      ],
      whyTitle: 'Cum estimăm proiectul',
      why: [
        'Mai întâi calculăm timpul manual și efectul așteptat.',
        'Alegem instrumente simple fără arhitectură enterprise inutilă.',
        'Explicăm costul modelelor AI, API-urilor și suportului.',
      ],
      processTitle: 'Etape',
      process: [
        { title: 'Analiză', text: 'Descriem procesul curent și frecvența repetării.' },
        { title: 'Estimare', text: 'Calculăm costul implementării și suportului.' },
        { title: 'Construire', text: 'Configurăm automatizarea și testăm pe date reale.' },
        { title: 'Lansare', text: 'Predăm instrucțiuni și fixăm monitorizarea.' },
      ],
      faqTitle: 'Întrebări frecvente',
      faqs: [
        {
          q: 'Faceți n8n/Make ca serviciu separat?',
          a: 'Nu. Aceste instrumente pot fi folosite în automatizare, dar nu sunt o primă pagină SEO separată.',
        },
      ],
    },
    'services/ai-google-sheets-excel': {
      path: 'services/ai-google-sheets-excel',
      title: 'AI + Google Sheets / Excel',
      metaTitle: 'AI, Google Sheets și Excel automatizare — Analyst Online',
      description:
        'Punem ordine în tabele, formule și rapoarte, adăugând AI acolo unde economisește timp real.',
      badge: 'Sheets + AI',
      ctaPrimary: 'Află costul',
      ctaSecondary: 'Pune o întrebare',
      intro:
        'Echipa transformă tabele instabile în rapoarte, template-uri și bază pentru automatizare ulterioară.',
      includedTitle: 'Ce include',
      included: [
        'Auditul tabelelor și formulelor existente.',
        'Curățare date, template-uri de rapoarte și control al erorilor.',
        'Asistenți AI pentru texte, clasificare și analiză.',
        'Pregătire pentru automatizare Google Apps Script.',
      ],
      whyTitle: 'Când este necesar',
      why: [
        'Fișierele sunt prea complexe și se strică la actualizare.',
        'Echipa pierde timp cu copiere de date și verificări manuale.',
        'Ai nevoie rapid de un raport managerial fără proiect BI complet.',
      ],
      processTitle: 'Etape',
      process: [
        { title: 'Audit fișier', text: 'Găsim punctele slabe în structură și formule.' },
        {
          title: 'Schema datelor',
          text: 'Simplificăm logica și separăm input, calcule și output.',
        },
        { title: 'AI/automatizare', text: 'Adăugăm AI sau Apps Script doar unde este justificat.' },
        { title: 'Predare', text: 'Documentăm regulile de lucru pentru echipă.' },
      ],
      faqTitle: 'Întrebări frecvente',
      faqs: [
        {
          q: 'Putem îmbunătăți un fișier existent?',
          a: 'Da. De obicei începem cu tabelele existente pentru a nu rupe procesul obișnuit fără motiv.',
        },
      ],
    },
  },
};

const alternateGroups: Record<Locale, string>[] = [
  { ru: 'obuchenie-ai', ua: 'navchannia-ai', ro: 'curs-ai' },
  {
    ru: 'services/ai-dlya-biznesa',
    ua: 'services/ai-dlya-biznesu',
    ro: 'services/ai-pentru-business',
  },
  {
    ru: 'services/avtomatizatsiya-ai',
    ua: 'services/avtomatyzatsiya-ai',
    ro: 'services/automatizare-ai',
  },
  {
    ru: 'services/ai-google-sheets-excel',
    ua: 'services/ai-google-sheets-excel',
    ro: 'services/ai-google-sheets-excel',
  },
];

export function getOfferAlternates(path: string): Record<Locale, string> {
  return (
    alternateGroups.find((group) => Object.values(group).includes(path)) ?? {
      ru: path,
      ua: path,
      ro: path,
    }
  );
}

export function getOfferPage(lang: Locale, path: string): OfferPageCopy | null {
  return offerPages[lang][path] ?? null;
}

export function getAllOfferPages() {
  return Object.entries(offerPages).flatMap(([lang, pages]) =>
    Object.values(pages).map((page) => ({ lang: lang as Locale, page })),
  );
}
