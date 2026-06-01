// content/contact.copy.ts
import type { Locale } from '@/lib/i18n';
import type { ContactPurpose } from '@/content/site.copy';

export type ContactChannel = {
  id: string;
  label: string;
  value: string;
  href: string;
  description: string;
};

export type ContactCopy = {
  pageTitle: string;
  pageSubtitle: string;
  channelsTitle: string;
  channels: ContactChannel[];
  formTitle: string;
  formSubtitle: string;
  formPurposeLabel: string;
  formPurposeOptions: Record<ContactPurpose, string>;
  formNameLabel: string;
  formNamePlaceholder: string;
  formEmailLabel: string;
  formEmailPlaceholder: string;
  formMessengerLabel: string;
  formMessengerPlaceholder: string;
  formContactHint: string;
  formMessageLabel: string;
  formMessagePlaceholder: string;
  formSubmit: string;
  formSending: string;
  formSuccessTitle: string;
  formSuccessMessage: string;
  formAgain: string;
  formErrorTitle: string;
  formErrorMessage: string;
};

export const contactCopy: Record<Locale, ContactCopy> = {
  ru: {
    pageTitle: 'Контакты',
    pageSubtitle: 'Напишите — команда разберёт задачу и предложит следующий шаг.',
    channelsTitle: 'Как связаться',
    channels: [
      {
        id: 'telegram',
        label: 'Telegram',
        value: '@omnidash_ai',
        href: 'https://t.me/omnidash_ai',
        description: 'Быстрый ответ, удобно для обсуждения задач',
      },
      {
        id: 'email',
        label: 'Email',
        value: 's.mytsyk@gmail.com',
        href: 'mailto:s.mytsyk@gmail.com',
        description: 'Для официальных запросов и документов',
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        value: 'Pavlo Mytsyk',
        href: 'https://www.linkedin.com/in/pavlo-mytsyk-04022a3b3/',
        description: 'Профессиональная сеть и портфолио',
      },
    ],
    formTitle: 'Или оставьте сообщение',
    formSubtitle: 'Выберите цель обращения и опишите задачу — команда ответит в течение 24 часов.',
    formPurposeLabel: 'Что нужно сделать',
    formPurposeOptions: {
      price: 'Узнать стоимость',
      question: 'Задать вопрос',
      consultation: 'Получить бесплатную консультацию',
    },

    formNameLabel: 'Имя',
    formNamePlaceholder: 'Как к вам обращаться',
    formEmailLabel: 'Email',
    formEmailPlaceholder: 'your@email.com',
    formMessengerLabel: 'Tel / Messenger',
    formMessengerPlaceholder: '+380..., @telegram или WhatsApp',
    formContactHint: 'Укажите email или Tel / Messenger.',
    formMessageLabel: 'Сообщение',
    formMessagePlaceholder: 'Опишите вашу задачу или вопрос...',
    formSubmit: 'Отправить',
    formSending: 'Отправляю...',
    formSuccessTitle: 'Спасибо!',
    formSuccessMessage: 'Ваше сообщение отправлено. Команда ответит в течение 24 часов.',
    formAgain: 'Отправить ещё одно сообщение',
    formErrorTitle: 'Ошибка',
    formErrorMessage:
      'Не удалось отправить сообщение. Попробуйте ещё раз или напишите напрямую в Telegram.',
  },

  ua: {
    pageTitle: 'Контакти',
    pageSubtitle: 'Напишіть — команда розбере задачу і запропонує наступний крок.',
    channelsTitle: "Як зв'язатися",
    channels: [
      {
        id: 'telegram',
        label: 'Telegram',
        value: '@omnidash_ai',
        href: 'https://t.me/omnidash_ai',
        description: 'Швидка відповідь, зручно для обговорення задач',
      },
      {
        id: 'email',
        label: 'Email',
        value: 's.mytsyk@gmail.com',
        href: 'mailto:s.mytsyk@gmail.com',
        description: 'Для офіційних запитів і документів',
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        value: 'Pavlo Mytsyk',
        href: 'https://www.linkedin.com/in/pavlo-mytsyk-04022a3b3/',
        description: 'Професійна мережа та портфоліо',
      },
    ],
    formTitle: 'Або залиште повідомлення',
    formSubtitle: 'Оберіть мету звернення й опишіть задачу — команда відповість протягом 24 годин.',
    formPurposeLabel: 'Що потрібно зробити',
    formPurposeOptions: {
      price: 'Дізнатися вартість',
      question: 'Поставити запитання',
      consultation: 'Отримати безкоштовну консультацію',
    },

    formNameLabel: "Ім'я",
    formNamePlaceholder: 'Як до вас звертатися',
    formEmailLabel: 'Email',
    formEmailPlaceholder: 'your@email.com',
    formMessengerLabel: 'Tel / Messenger',
    formMessengerPlaceholder: '+380..., @telegram або WhatsApp',
    formContactHint: 'Вкажіть email або Tel / Messenger.',
    formMessageLabel: 'Повідомлення',
    formMessagePlaceholder: 'Опишіть вашу задачу або питання...',
    formSubmit: 'Надіслати',
    formSending: 'Надсилаю...',
    formSuccessTitle: 'Дякую!',
    formSuccessMessage: 'Ваше повідомлення надіслано. Команда відповість протягом 24 годин.',
    formAgain: 'Надіслати ще одне повідомлення',
    formErrorTitle: 'Помилка',
    formErrorMessage:
      'Не вдалося надіслати повідомлення. Спробуйте ще раз або напишіть безпосередньо в Telegram.',
  },

  ro: {
    pageTitle: 'Contact',
    pageSubtitle: 'Scrie — echipa analizează sarcina și propune următorul pas.',
    channelsTitle: 'Cum să iei legătura',
    channels: [
      {
        id: 'telegram',
        label: 'Telegram',
        value: '@omnidash_ai',
        href: 'https://t.me/omnidash_ai',
        description: 'Răspuns rapid, convenabil pentru discuții',
      },
      {
        id: 'email',
        label: 'Email',
        value: 's.mytsyk@gmail.com',
        href: 'mailto:s.mytsyk@gmail.com',
        description: 'Pentru cereri oficiale și documente',
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        value: 'Pavlo Mytsyk',
        href: 'https://www.linkedin.com/in/pavlo-mytsyk-04022a3b3/',
        description: 'Rețea profesională și portofoliu',
      },
    ],
    formTitle: 'Sau lasă un mesaj',
    formSubtitle: 'Alege scopul mesajului și descrie sarcina — echipa răspunde în 24 de ore.',
    formPurposeLabel: 'Ce ai nevoie',
    formPurposeOptions: {
      price: 'Află costul',
      question: 'Pune o întrebare',
      consultation: 'Primește o consultație gratuită',
    },

    formNameLabel: 'Nume',
    formNamePlaceholder: 'Cum să te adresez',
    formEmailLabel: 'Email',
    formEmailPlaceholder: 'your@email.com',
    formMessengerLabel: 'Tel / Messenger',
    formMessengerPlaceholder: '+40..., @telegram sau WhatsApp',
    formContactHint: 'Completează email sau Tel / Messenger.',
    formMessageLabel: 'Mesaj',
    formMessagePlaceholder: 'Descrie sarcina sau întrebarea ta...',
    formSubmit: 'Trimite',
    formSending: 'Trimit...',
    formSuccessTitle: 'Mulțumesc!',
    formSuccessMessage: 'Mesajul tău a fost trimis. Echipa răspunde în 24 de ore.',
    formAgain: 'Trimite încă un mesaj',
    formErrorTitle: 'Eroare',
    formErrorMessage: 'Nu am putut trimite mesajul. Încearcă din nou sau scrie direct pe Telegram.',
  },
};
