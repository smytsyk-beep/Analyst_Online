// content/omnidash.copy.ts
import type { Locale } from '@/lib/i18n';

export type PainPoint = {
  title: string;
  text: string;
};

export type Feature = {
  title: string;
  text: string;
};

export type Step = {
  number: string;
  title: string;
  text: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type PricingPlan = {
  label: string;
  price: string;
  period: string;
  note: string;
  items: string[];
  cta: string;
  highlighted: boolean;
};

export type OmniDashCopy = {
  // Hero
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroStats: { value: string; label: string }[];

  // Pain points
  painTitle: string;
  painSubtitle: string;
  pains: PainPoint[];

  // Features
  featuresTitle: string;
  featuresSubtitle: string;
  features: Feature[];
  featuresAdvancedTitle: string;
  featuresAdvanced: string[];

  // How it works
  howTitle: string;
  howSubtitle: string;
  steps: Step[];

  // Pricing
  pricingTitle: string;
  pricingSubtitle: string;
  pricingNote: string;
  plans: PricingPlan[];

  // FAQ
  faqTitle: string;
  faqs: FaqItem[];

  // CTA bottom
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const omniDashCopy: Record<Locale, OmniDashCopy> = {
  ru: {
    heroBadge: 'Аналитика для e-commerce',
    heroTitle: 'Видите выручку. Но не видите прибыль.',
    heroSubtitle:
      'OmniDash собирает рекламу, продажи и расходы в один понятный дашборд — чтобы вы быстро видели, что работает, а что сжигает бюджет.',
    heroCtaPrimary: 'Обсудить в Telegram',
    heroCtaSecondary: 'Смотреть демо',
    heroStats: [
      { value: '1–2 нед', label: 'до запуска' },
      { value: '€49/мес', label: 'подписка' },
      { value: '€99', label: 'настройка' },
    ],

    painTitle: 'Узнаёте себя?',
    painSubtitle: 'Типичные проблемы малого e-commerce, которые решает OmniDash.',
    pains: [
      {
        title: 'Реклама тратит, но непонятно что приносит',
        text: 'Деньги уходят в Meta и Google, но какие кампании реально окупаются — неизвестно.',
      },
      {
        title: 'Разные кабинеты — разные цифры',
        text: 'Meta Ads, Google Ads, CRM и магазин показывают разное. Непонятно, кому верить.',
      },
      {
        title: 'Выручка есть, прибыли нет',
        text: 'После комиссий, доставки, возвратов и себестоимости оказывается, что зарабатываете гораздо меньше.',
      },
      {
        title: 'Часы на ручную сборку отчётов',
        text: 'Вместо управления бизнесом — перенос цифр из кабинетов в таблицы. Каждую неделю.',
      },
      {
        title: 'Узнаёте о проблемах слишком поздно',
        text: 'Реклама ушла в минус неделю назад, а вы узнали только сейчас. Бюджет уже потрачен.',
      },
      {
        title: 'Нет единой картины бизнеса',
        text: 'Продажи, реклама, расходы и прибыль — в разных системах. Целостной картины нет.',
      },
    ],

    featuresTitle: 'Что входит в OmniDash',
    featuresSubtitle: 'Готовая система, а не просто красивый отчёт.',
    features: [
      {
        title: 'Единый бизнес-дашборд',
        text: 'Looker Studio дашборд с ключевыми KPI: выручка, расходы на рекламу, ROAS / ROI, чистый результат, динамика по дням и каналам.',
      },
      {
        title: 'Интеграция рекламных источников',
        text: 'Подключаем Meta Ads, Google Ads и другие кабинеты. Все расходы, клики и конверсии — в одном месте.',
      },
      {
        title: 'Интеграция магазина / платформы',
        text: 'Shopify, WooCommerce, eMAG или другой согласованный источник продаж в рамках выбранного пакета.',
      },
      {
        title: 'Модель чистой прибыли',
        text: 'Учитываем не только выручку, но и себестоимость, доставку, комиссии, возвраты и налоги.',
      },
      {
        title: 'Детализация до кампании',
        text: 'Видите, какие кампании, объявления или группы товаров работают лучше всего — и где нужно остановить слив.',
      },
      {
        title: 'Актуальность данных',
        text: 'В дашборде всегда видно, когда данные обновлялись в последний раз. Решения на основе свежей картины.',
      },
    ],
    featuresAdvancedTitle: 'Дополнительно / по запросу',
    featuresAdvanced: [
      'Когортный анализ и повторные покупки',
      'Анализ воронки и брошенных корзин',
      'Алерты по проблемным зонам',
      'BigQuery / DWH setup',
      'Доработка под вашу бизнес-модель',
    ],

    howTitle: 'Как это работает',
    howSubtitle: 'От первого разговора до готового дашборда — 4 шага.',
    steps: [
      {
        number: '01',
        title: 'Короткий аудит',
        text: 'Разбираемся в вашей модели бизнеса, каналах продаж и рекламы. Определяем, какие цифры для вас самые важные.',
      },
      {
        number: '02',
        title: 'Подключение источников',
        text: 'Подключаем рекламные кабинеты и источник продаж. Настраиваем сбор данных и базовую логику расчётов.',
      },
      {
        number: '03',
        title: 'Сборка OmniDash',
        text: 'Собираем ваш дашборд, настраиваем ключевые KPI, прибыльность и нужные срезы для управления бизнесом.',
      },
      {
        number: '04',
        title: 'Запуск и передача',
        text: 'Вы получаете ссылку на дашборд, объяснение по чтению цифр и сценарий использования в ежедневной работе.',
      },
    ],

    pricingTitle: 'Стоимость',
    pricingSubtitle: 'Прозрачная цена без скрытых платежей.',
    pricingNote: 'Все цены в EUR. Настройка оплачивается один раз при старте.',
    plans: [
      {
        label: 'Настройка',
        price: '€99',
        period: 'единоразово',
        note: 'Оплачивается один раз при старте',
        items: [
          'Подключение рекламных источников',
          'Интеграция платформы продаж',
          'Сборка дашборда в Looker Studio',
          'Модель чистой прибыли',
          'Передача и объяснение',
        ],
        cta: 'Начать',
        highlighted: false,
      },
      {
        label: 'Подписка',
        price: '€49',
        period: 'в месяц',
        note: 'Поддержка и актуальность системы',
        items: [
          'Поддержание работы интеграций',
          'Обновление дашборда при изменениях',
          'Ответы на вопросы по данным',
          'Мелкие доработки по запросу',
        ],
        cta: 'Подключиться',
        highlighted: true,
      },
      {
        label: 'Аудит кампаний',
        price: '€150',
        period: 'в месяц',
        note: '4 разбора в месяц, 1 раз в неделю',
        items: [
          'Еженедельный разбор рекламных кампаний',
          'Рекомендации по оптимизации',
          'Анализ ROAS / ROI по каналам',
          'Выявление неэффективных кампаний',
        ],
        cta: 'Узнать подробнее',
        highlighted: false,
      },
    ],

    faqTitle: 'Частые вопросы',
    faqs: [
      {
        q: 'Безопасно ли давать доступы?',
        a: 'Да. Мы запрашиваем доступы по принципу минимально необходимого и, где возможно, работаем в режиме чтения. Заранее согласовываем, какие именно доступы нужны.',
      },
      {
        q: 'У меня небольшой магазин. Это для меня?',
        a: 'Да. Для малого e-commerce OmniDash особенно полезен: когда рекламный бюджет ограничен, ошибка в аналитике стоит дороже.',
      },
      {
        q: 'Что я получаю: просто дашборд или ещё и настройку?',
        a: 'Настроенную систему: подключение источников, логику расчёта показателей, дашборд и передачу в работу. Не просто красивый отчёт.',
      },
      {
        q: 'Чем это лучше встроенной аналитики в Shopify / Meta Ads?',
        a: 'Встроенные кабинеты показывают только свою часть. OmniDash даёт целостную картину: реклама + продажи + расходы + чистый результат.',
      },
      {
        q: 'Сколько времени занимает запуск?',
        a: 'Обычно от нескольких дней до 1–2 недель — в зависимости от количества источников и качества исходных данных.',
      },
      {
        q: 'Если у меня нет CRM или идеального учёта расходов, можно стартовать?',
        a: 'Да. Начинаем с упрощённой модели и постепенно улучшаем точность по мере подключения новых данных.',
      },
      {
        q: 'Что нужно от меня на старте?',
        a: 'Короткий бриф, доступы к нужным системам и информация о модели расходов: себестоимость, доставка, комиссии.',
      },
      {
        q: 'Кому принадлежат данные и дашборд?',
        a: 'Данные клиента остаются данными клиента. Формат доступа и владения определяется выбранным пакетом работы.',
      },
    ],

    ctaTitle: 'Перестаньте смотреть на выручку вслепую',
    ctaSubtitle:
      'Подключим рекламу, продажи и расходы в одну систему — чтобы вы видели не просто оборот, а чистую картину бизнеса.',
    ctaPrimary: 'Обсудить в Telegram',
    ctaSecondary: 'Написать на Email',
  },

  ua: {
    heroBadge: 'Аналітика для e-commerce',
    heroTitle: 'Бачите виручку. Але не бачите прибуток.',
    heroSubtitle:
      'OmniDash збирає рекламу, продажі та витрати в один зрозумілий дашборд — щоб ви швидко бачили, що працює, а що спалює бюджет.',
    heroCtaPrimary: 'Обговорити в Telegram',
    heroCtaSecondary: 'Дивитись демо',
    heroStats: [
      { value: '1–2 тиж', label: 'до запуску' },
      { value: '€49/міс', label: 'підписка' },
      { value: '€99', label: 'налаштування' },
    ],

    painTitle: 'Впізнаєте себе?',
    painSubtitle: 'Типові проблеми малого e-commerce, які вирішує OmniDash.',
    pains: [
      {
        title: 'Реклама витрачає, але незрозуміло що приносить',
        text: 'Гроші йдуть у Meta і Google, але які кампанії реально окупаються — невідомо.',
      },
      {
        title: 'Різні кабінети — різні цифри',
        text: 'Meta Ads, Google Ads, CRM і магазин показують різне. Незрозуміло, кому вірити.',
      },
      {
        title: 'Виручка є, прибутку немає',
        text: 'Після комісій, доставки, повернень і собівартості виявляється, що заробляєте значно менше.',
      },
      {
        title: 'Години на ручне складання звітів',
        text: 'Замість управління бізнесом — перенесення цифр із кабінетів у таблиці. Щотижня.',
      },
      {
        title: 'Дізнаєтесь про проблеми надто пізно',
        text: 'Реклама пішла в мінус тиждень тому, а ви дізналися тільки зараз. Бюджет вже витрачено.',
      },
      {
        title: 'Немає єдиної картини бізнесу',
        text: 'Продажі, реклама, витрати та прибуток — у різних системах. Цілісної картини немає.',
      },
    ],

    featuresTitle: 'Що входить в OmniDash',
    featuresSubtitle: 'Готова система, а не просто гарний звіт.',
    features: [
      {
        title: 'Єдиний бізнес-дашборд',
        text: 'Looker Studio дашборд із ключовими KPI: виручка, витрати на рекламу, ROAS / ROI, чистий результат, динаміка за днями та каналами.',
      },
      {
        title: 'Інтеграція рекламних джерел',
        text: 'Підключаємо Meta Ads, Google Ads та інші кабінети. Всі витрати, кліки та конверсії — в одному місці.',
      },
      {
        title: 'Інтеграція магазину / платформи',
        text: 'Shopify, WooCommerce, eMAG або інше погоджене джерело продажів у межах обраного пакета.',
      },
      {
        title: 'Модель чистого прибутку',
        text: 'Враховуємо не лише виручку, а й собівартість, доставку, комісії, повернення та податки.',
      },
      {
        title: 'Деталізація до кампанії',
        text: 'Бачите, які кампанії, оголошення або групи товарів працюють найкраще — і де потрібно зупинити злив.',
      },
      {
        title: 'Актуальність даних',
        text: 'У дашборді завжди видно, коли дані оновлювалися востаннє. Рішення на основі свіжої картини.',
      },
    ],
    featuresAdvancedTitle: 'Додатково / за запитом',
    featuresAdvanced: [
      'Когортний аналіз і повторні покупки',
      'Аналіз воронки та покинутих кошиків',
      'Алерти по проблемних зонах',
      'BigQuery / DWH setup',
      'Доопрацювання під вашу бізнес-модель',
    ],

    howTitle: 'Як це працює',
    howSubtitle: 'Від першої розмови до готового дашборду — 4 кроки.',
    steps: [
      {
        number: '01',
        title: 'Короткий аудит',
        text: 'Розбираємося у вашій моделі бізнесу, каналах продажів і реклами. Визначаємо, які цифри для вас найважливіші.',
      },
      {
        number: '02',
        title: 'Підключення джерел',
        text: 'Підключаємо рекламні кабінети та джерело продажів. Налаштовуємо збір даних і базову логіку розрахунків.',
      },
      {
        number: '03',
        title: 'Збірка OmniDash',
        text: 'Збираємо ваш дашборд, налаштовуємо ключові KPI, прибутковість і потрібні зрізи для управління бізнесом.',
      },
      {
        number: '04',
        title: 'Запуск і передача',
        text: 'Ви отримуєте посилання на дашборд, пояснення щодо читання цифр і сценарій використання в щоденній роботі.',
      },
    ],

    pricingTitle: 'Вартість',
    pricingSubtitle: 'Прозора ціна без прихованих платежів.',
    pricingNote: 'Всі ціни в EUR. Налаштування оплачується один раз при старті.',
    plans: [
      {
        label: 'Налаштування',
        price: '€99',
        period: 'одноразово',
        note: 'Оплачується один раз при старті',
        items: [
          'Підключення рекламних джерел',
          'Інтеграція платформи продажів',
          'Збірка дашборду в Looker Studio',
          'Модель чистого прибутку',
          'Передача і пояснення',
        ],
        cta: 'Почати',
        highlighted: false,
      },
      {
        label: 'Підписка',
        price: '€49',
        period: 'на місяць',
        note: 'Підтримка та актуальність системи',
        items: [
          'Підтримання роботи інтеграцій',
          'Оновлення дашборду при змінах',
          'Відповіді на питання по даних',
          'Дрібні доопрацювання за запитом',
        ],
        cta: 'Підключитися',
        highlighted: true,
      },
      {
        label: 'Аудит кампаній',
        price: '€150',
        period: 'на місяць',
        note: '4 розбори на місяць, 1 раз на тиждень',
        items: [
          'Щотижневий розбір рекламних кампаній',
          'Рекомендації з оптимізації',
          'Аналіз ROAS / ROI по каналах',
          'Виявлення неефективних кампаній',
        ],
        cta: 'Дізнатися більше',
        highlighted: false,
      },
    ],

    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Чи безпечно давати вам доступи?',
        a: 'Так. Ми запитуємо доступи за принципом мінімально необхідного і, де можливо, працюємо в режимі читання. Заздалегідь погоджуємо, які саме доступи потрібні.',
      },
      {
        q: 'У мене невеликий магазин. Це для мене?',
        a: 'Так. Для малого e-commerce OmniDash особливо корисний: коли рекламний бюджет обмежений, помилка в аналітиці коштує дорожче.',
      },
      {
        q: 'Що я отримую: просто дашборд чи ще й налаштування?',
        a: 'Налаштовану систему: підключення джерел, логіку розрахунку показників, дашборд і передачу в роботу. Не просто гарний звіт.',
      },
      {
        q: 'Чим це краще за вбудовану аналітику в Shopify / Meta Ads?',
        a: 'Вбудовані кабінети показують лише свою частину. OmniDash дає цілісну картину: реклама + продажі + витрати + чистий результат.',
      },
      {
        q: 'Скільки часу займає запуск?',
        a: 'Зазвичай від кількох днів до 1–2 тижнів — залежно від кількості джерел і якості вихідних даних.',
      },
      {
        q: 'Якщо в мене немає CRM або ідеального обліку витрат, можна стартувати?',
        a: 'Так. Починаємо зі спрощеної моделі й поступово покращуємо точність у міру підключення нових даних.',
      },
      {
        q: 'Що потрібно від мене на старті?',
        a: 'Короткий бриф, доступи до потрібних систем і інформація про модель витрат: собівартість, доставка, комісії.',
      },
      {
        q: 'Кому належать дані та дашборд?',
        a: 'Дані клієнта залишаються даними клієнта. Формат доступу і володіння визначається обраним пакетом роботи.',
      },
    ],

    ctaTitle: 'Перестаньте дивитися на виручку навмання',
    ctaSubtitle:
      'Підключимо рекламу, продажі та витрати в одну систему — щоб ви бачили не просто оборот, а чисту картину бізнесу.',
    ctaPrimary: 'Обговорити в Telegram',
    ctaSecondary: 'Написати на Email',
  },

  ro: {
    heroBadge: 'Analytics pentru e-commerce',
    heroTitle: 'Vezi venitul. Dar nu vezi profitul.',
    heroSubtitle:
      'OmniDash adună reclama, vânzările și cheltuielile într-un singur dashboard clar — ca să vezi rapid ce funcționează și ce consumă bugetul.',
    heroCtaPrimary: 'Discută pe Telegram',
    heroCtaSecondary: 'Vezi demo',
    heroStats: [
      { value: '1–2 săpt', label: 'până la lansare' },
      { value: '€49/lună', label: 'abonament' },
      { value: '€99', label: 'configurare' },
    ],

    painTitle: 'Te recunoști?',
    painSubtitle: 'Probleme tipice ale e-commerce-ului mic pe care le rezolvă OmniDash.',
    pains: [
      {
        title: 'Reclama cheltuiește, dar nu știi ce aduce',
        text: 'Banii merg în Meta și Google, dar ce campanii se rentabilizează cu adevărat — nu se știe.',
      },
      {
        title: 'Platforme diferite — cifre diferite',
        text: 'Meta Ads, Google Ads, CRM-ul și magazinul arată rezultate diferite. Nu e clar în ce să ai încredere.',
      },
      {
        title: 'Există venit, dar nu există profit',
        text: 'După comisioane, livrare, retururi și costul produsului se dovedește că câștigi mult mai puțin.',
      },
      {
        title: 'Ore pierdute pe rapoarte manuale',
        text: 'În loc să gestionezi business-ul — muți cifre din conturi în tabele. În fiecare săptămână.',
      },
      {
        title: 'Afli despre probleme prea târziu',
        text: 'Reclama a mers pe minus acum o săptămână, iar tu ai aflat abia acum. Bugetul e deja cheltuit.',
      },
      {
        title: 'Nu există o imagine unică a business-ului',
        text: 'Vânzările, reclama, cheltuielile și profitul — în sisteme separate. Nu există o imagine de ansamblu.',
      },
    ],

    featuresTitle: 'Ce include OmniDash',
    featuresSubtitle: 'Un sistem gata, nu doar un raport frumos.',
    features: [
      {
        title: 'Dashboard unic de business',
        text: 'Dashboard Looker Studio cu KPI esențiali: venit, cheltuieli de publicitate, ROAS / ROI, rezultat net, dinamică pe zile și canale.',
      },
      {
        title: 'Integrarea surselor de publicitate',
        text: 'Conectăm Meta Ads, Google Ads și alte conturi. Toate costurile, clickurile și conversiile — într-un singur loc.',
      },
      {
        title: 'Integrarea magazinului / platformei',
        text: 'Shopify, WooCommerce, eMAG sau altă sursă de vânzări agreată, în funcție de pachetul ales.',
      },
      {
        title: 'Model de profit net',
        text: 'Luăm în calcul nu doar venitul, ci și costul produsului, livrarea, comisioanele, retururile și taxele.',
      },
      {
        title: 'Detaliere până la campanie',
        text: 'Vezi ce campanii, anunțuri sau grupe de produse funcționează cel mai bine — și unde trebuie să oprești risipa.',
      },
      {
        title: 'Actualitatea datelor',
        text: 'În dashboard se vede mereu când datele au fost actualizate ultima dată. Decizii pe baza unei imagini recente.',
      },
    ],
    featuresAdvancedTitle: 'Suplimentar / la cerere',
    featuresAdvanced: [
      'Analiză cohortă și cumpărări repetate',
      'Analiză de funnel și coșuri abandonate',
      'Alerte pentru zonele problematice',
      'BigQuery / DWH setup',
      'Adaptare la modelul tău de business',
    ],

    howTitle: 'Cum funcționează',
    howSubtitle: 'De la prima discuție până la dashboard-ul gata — 4 pași.',
    steps: [
      {
        number: '01',
        title: 'Audit scurt',
        text: 'Înțelegem modelul tău de business, canalele de vânzări și publicitate. Stabilim ce cifre sunt cele mai importante pentru tine.',
      },
      {
        number: '02',
        title: 'Conectarea surselor',
        text: 'Conectăm conturile de advertising și sursa de vânzări. Setăm colectarea datelor și logica de bază a calculelor.',
      },
      {
        number: '03',
        title: 'Construirea OmniDash',
        text: 'Construim dashboard-ul tău, setăm KPI-urile cheie, profitabilitatea și segmentele necesare pentru management.',
      },
      {
        number: '04',
        title: 'Lansare și predare',
        text: 'Primești linkul către dashboard, o explicație despre cum se citesc cifrele și un scenariu de utilizare zilnică.',
      },
    ],

    pricingTitle: 'Prețuri',
    pricingSubtitle: 'Preț transparent, fără plăți ascunse.',
    pricingNote: 'Toate prețurile în EUR. Configurarea se plătește o singură dată la start.',
    plans: [
      {
        label: 'Configurare',
        price: '€99',
        period: 'o singură dată',
        note: 'Se plătește o dată la start',
        items: [
          'Conectarea surselor de publicitate',
          'Integrarea platformei de vânzări',
          'Construirea dashboard-ului în Looker Studio',
          'Model de profit net',
          'Predare și explicații',
        ],
        cta: 'Începe',
        highlighted: false,
      },
      {
        label: 'Abonament',
        price: '€49',
        period: 'pe lună',
        note: 'Suport și menținerea sistemului',
        items: [
          'Menținerea integrărilor funcționale',
          'Actualizarea dashboard-ului la modificări',
          'Răspunsuri la întrebări despre date',
          'Ajustări minore la cerere',
        ],
        cta: 'Abonează-te',
        highlighted: true,
      },
      {
        label: 'Audit campanii',
        price: '€150',
        period: 'pe lună',
        note: '4 analize pe lună, 1 pe săptămână',
        items: [
          'Analiză săptămânală a campaniilor',
          'Recomandări de optimizare',
          'Analiză ROAS / ROI pe canale',
          'Identificarea campaniilor ineficiente',
        ],
        cta: 'Află mai multe',
        highlighted: false,
      },
    ],

    faqTitle: 'Întrebări frecvente',
    faqs: [
      {
        q: 'Este sigur să vă ofer acces?',
        a: 'Da. Solicităm acces după principiul minimului necesar și, acolo unde este posibil, lucrăm în regim read-only. Stabilim din start ce tip de acces este necesar.',
      },
      {
        q: 'Am un magazin mic. Este potrivit și pentru mine?',
        a: 'Da. Tocmai pentru e-commerce-ul mic OmniDash este foarte util: când bugetul de reclamă este limitat, o greșeală în analytics costă mai mult.',
      },
      {
        q: 'Ce primesc: doar un dashboard sau și configurarea?',
        a: 'Un sistem configurat: conectarea surselor, logica indicatorilor, dashboard-ul și transferul în lucru. Nu doar un raport frumos.',
      },
      {
        q: 'Cu ce este mai bun decât analytics-ul din Shopify / Meta Ads?',
        a: 'Dashboard-urile standard arată doar partea lor. OmniDash oferă imaginea completă: reclamă + vânzări + cheltuieli + rezultat net.',
      },
      {
        q: 'Cât durează lansarea?',
        a: 'De obicei de la câteva zile până la 1–2 săptămâni, în funcție de numărul surselor și calitatea datelor inițiale.',
      },
      {
        q: 'Dacă nu am CRM sau o evidență perfectă a costurilor, putem începe?',
        a: 'Da. Începem cu un model simplificat și îmbunătățim treptat precizia pe măsură ce conectăm surse noi.',
      },
      {
        q: 'Ce aveți nevoie de la mine la început?',
        a: 'Un brief scurt, acces la sistemele necesare și informații despre modelul de costuri: costul produsului, livrare, comisioane.',
      },
      {
        q: 'Cui aparțin datele și dashboard-ul?',
        a: 'Datele clientului rămân ale clientului. Formatul de acces și ownership se definește în funcție de pachetul ales.',
      },
    ],

    ctaTitle: 'Nu mai privi venitul „în orb"',
    ctaSubtitle:
      'Conectăm reclama, vânzările și cheltuielile într-un singur sistem — ca să vezi nu doar cifra de afaceri, ci imaginea reală a business-ului.',
    ctaPrimary: 'Discută pe Telegram',
    ctaSecondary: 'Scrie pe Email',
  },
};
