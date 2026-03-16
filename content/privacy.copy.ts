// content/privacy.copy.ts
import type { Locale } from '@/lib/i18n';

export type PrivacyCopy = {
  pageTitle: string;
  pageSubtitle: string;
  lastUpdated: string;
  sections: {
    title: string;
    content: string;
  }[];
};

export const privacyCopy: Record<Locale, PrivacyCopy> = {
  ru: {
    pageTitle: 'Политика конфиденциальности',
    pageSubtitle:
      'Эта страница описывает, как Analyst Online обрабатывает данные посетителей сайта.',
    lastUpdated: 'Последнее обновление: март 2026',
    sections: [
      {
        title: '1. Кто мы',
        content:
          'Analyst Online — это бренд, под которым Павел Мыцык предоставляет услуги аналитики, дашбордов и автоматизации для бизнеса. Основной продукт — OmniDash. Контактный email: s.mytsyk@gmail.com.',
      },
      {
        title: '2. Какие данные мы собираем',
        content:
          'Мы можем собирать следующие данные: имя и email (при заполнении контактной формы), данные об использовании сайта (страницы, время визита), IP-адрес и приблизительная геолокация (для определения языка интерфейса), cookies для корректной работы сайта.',
      },
      {
        title: '3. Как мы используем данные',
        content:
          'Данные используются для: ответа на ваши запросы, улучшения работы сайта, определения языка интерфейса на основе геолокации, аналитики посещаемости сайта.',
      },
      {
        title: '4. Cookies',
        content:
          'Сайт использует технические cookies для корректной работы (например, определение страны для выбора языка). Аналитические cookies могут использоваться для понимания поведения пользователей. Вы можете отключить cookies в настройках браузера.',
      },
      {
        title: '5. Передача данных третьим лицам',
        content:
          'Мы не продаём и не передаём ваши персональные данные третьим лицам, за исключением случаев, когда это необходимо для предоставления услуг (например, хостинг на Vercel, аналитика).',
      },
      {
        title: '6. Хранение данных',
        content:
          'Данные контактных форм хранятся до момента обработки запроса. Аналитические данные хранятся в агрегированном виде.',
      },
      {
        title: '7. Ваши права',
        content:
          'Вы имеете право запросить доступ к вашим данным, их исправление или удаление. Для этого напишите на s.mytsyk@gmail.com.',
      },
      {
        title: '8. Контакты',
        content:
          'По вопросам конфиденциальности обращайтесь: s.mytsyk@gmail.com или Telegram: @omnidash_ai.',
      },
    ],
  },

  ua: {
    pageTitle: 'Політика конфіденційності',
    pageSubtitle: 'Ця сторінка описує, як Analyst Online обробляє дані відвідувачів сайту.',
    lastUpdated: 'Останнє оновлення: березень 2026',
    sections: [
      {
        title: '1. Хто ми',
        content:
          'Analyst Online — це бренд, під яким Павло Мицик надає послуги аналітики, дашбордів та автоматизації для бізнесу. Основний продукт — OmniDash. Контактний email: s.mytsyk@gmail.com.',
      },
      {
        title: '2. Які дані ми збираємо',
        content:
          "Ми можемо збирати такі дані: ім'я та email (при заповненні контактної форми), дані про використання сайту (сторінки, час візиту), IP-адресу та приблизну геолокацію (для визначення мови інтерфейсу), cookies для коректної роботи сайту.",
      },
      {
        title: '3. Як ми використовуємо дані',
        content:
          'Дані використовуються для: відповіді на ваші запити, покращення роботи сайту, визначення мови інтерфейсу на основі геолокації, аналітики відвідуваності сайту.',
      },
      {
        title: '4. Cookies',
        content:
          'Сайт використовує технічні cookies для коректної роботи (наприклад, визначення країни для вибору мови). Аналітичні cookies можуть використовуватися для розуміння поведінки користувачів. Ви можете вимкнути cookies в налаштуваннях браузера.',
      },
      {
        title: '5. Передача даних третім особам',
        content:
          'Ми не продаємо і не передаємо ваші персональні дані третім особам, за винятком випадків, коли це необхідно для надання послуг (наприклад, хостинг на Vercel, аналітика).',
      },
      {
        title: '6. Зберігання даних',
        content:
          'Дані контактних форм зберігаються до моменту обробки запиту. Аналітичні дані зберігаються в агрегованому вигляді.',
      },
      {
        title: '7. Ваші права',
        content:
          'Ви маєте право запросити доступ до ваших даних, їх виправлення або видалення. Для цього напишіть на s.mytsyk@gmail.com.',
      },
      {
        title: '8. Контакти',
        content:
          'З питань конфіденційності звертайтесь: s.mytsyk@gmail.com або Telegram: @omnidash_ai.',
      },
    ],
  },

  ro: {
    pageTitle: 'Politica de confidențialitate',
    pageSubtitle:
      'Această pagină descrie modul în care Analyst Online procesează datele vizitatorilor site-ului.',
    lastUpdated: 'Ultima actualizare: martie 2026',
    sections: [
      {
        title: '1. Cine suntem',
        content:
          'Analyst Online este un brand sub care Pavlo Mytsyk oferă servicii de analytics, dashboard-uri și automatizare pentru business. Produsul principal — OmniDash. Email de contact: s.mytsyk@gmail.com.',
      },
      {
        title: '2. Ce date colectăm',
        content:
          'Putem colecta următoarele date: numele și email-ul (la completarea formularului de contact), date despre utilizarea site-ului (pagini, durata vizitei), adresa IP și geolocația aproximativă (pentru determinarea limbii interfeței), cookies pentru funcționarea corectă a site-ului.',
      },
      {
        title: '3. Cum folosim datele',
        content:
          'Datele sunt utilizate pentru: răspunsul la solicitările dumneavoastră, îmbunătățirea funcționării site-ului, determinarea limbii interfeței pe baza geolocației, analiza traficului site-ului.',
      },
      {
        title: '4. Cookies',
        content:
          'Site-ul folosește cookies tehnice pentru funcționarea corectă (de exemplu, determinarea țării pentru alegerea limbii). Cookies analitice pot fi utilizate pentru înțelegerea comportamentului utilizatorilor. Puteți dezactiva cookies din setările browserului.',
      },
      {
        title: '5. Transmiterea datelor către terți',
        content:
          'Nu vindem și nu transmitem datele dumneavoastră personale către terți, cu excepția cazurilor în care este necesar pentru furnizarea serviciilor (de exemplu, hosting pe Vercel, analytics).',
      },
      {
        title: '6. Stocarea datelor',
        content:
          'Datele din formularele de contact sunt stocate până la procesarea solicitării. Datele analitice sunt stocate în formă agregată.',
      },
      {
        title: '7. Drepturile dumneavoastră',
        content:
          'Aveți dreptul de a solicita accesul la datele dumneavoastră, corectarea sau ștergerea lor. Pentru aceasta, scrieți la s.mytsyk@gmail.com.',
      },
      {
        title: '8. Contact',
        content:
          'Pentru întrebări legate de confidențialitate contactați: s.mytsyk@gmail.com sau Telegram: @omnidash_ai.',
      },
    ],
  },
};
