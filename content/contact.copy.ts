// content/contact.copy.ts
import type { Locale } from '@/lib/i18n';

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
  formNameLabel: string;
  formNamePlaceholder: string;
  formEmailLabel: string;
  formEmailPlaceholder: string;
  formMessageLabel: string;
  formMessagePlaceholder: string;
  formSubmit: string;
  formSending: string;
  formSuccessTitle: string;
  formSuccessMessage: string;
  formErrorTitle: string;
  formErrorMessage: string;
};

export const contactCopy: Record<Locale, ContactCopy> = {
  ru: {
    pageTitle: 'Контакты',
    pageSubtitle: 'Напишите — обсудим вашу задачу и найдём решение.',
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
    formSubtitle: 'Опишите задачу — отвечу в течение 24 часов.',

    formNameLabel: 'Имя',
    formNamePlaceholder: 'Как к вам обращаться',
    formEmailLabel: 'Email',
    formEmailPlaceholder: 'your@email.com',
    formMessageLabel: 'Сообщение',
    formMessagePlaceholder: 'Опишите вашу задачу или вопрос...',
    formSubmit: 'Отправить',
    formSending: 'Отправляю...',
    formSuccessTitle: 'Спасибо!',
    formSuccessMessage: 'Ваше сообщение отправлено. Отвечу в течение 24 часов.',
    formErrorTitle: 'Ошибка',
    formErrorMessage:
      'Не удалось отправить сообщение. Попробуйте ещё раз или напишите напрямую в Telegram.',
  },

  ua: {
    pageTitle: 'Контакти',
    pageSubtitle: 'Напишіть — обговоримо вашу задачу і знайдемо рішення.',
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
    formSubtitle: 'Опишіть задачу — відповім протягом 24 годин.',

    formNameLabel: "Ім'я",
    formNamePlaceholder: 'Як до вас звертатися',
    formEmailLabel: 'Email',
    formEmailPlaceholder: 'your@email.com',
    formMessageLabel: 'Повідомлення',
    formMessagePlaceholder: 'Опишіть вашу задачу або питання...',
    formSubmit: 'Надіслати',
    formSending: 'Надсилаю...',
    formSuccessTitle: 'Дякую!',
    formSuccessMessage: 'Ваше повідомлення надіслано. Відповім протягом 24 годин.',
    formErrorTitle: 'Помилка',
    formErrorMessage:
      'Не вдалося надіслати повідомлення. Спробуйте ще раз або напишіть безпосередньо в Telegram.',
  },

  ro: {
    pageTitle: 'Contact',
    pageSubtitle: 'Scrie — discutăm sarcina ta și găsim o soluție.',
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
    formSubtitle: 'Descrie sarcina — răspund în 24 de ore.',

    formNameLabel: 'Nume',
    formNamePlaceholder: 'Cum să te adresez',
    formEmailLabel: 'Email',
    formEmailPlaceholder: 'your@email.com',
    formMessageLabel: 'Mesaj',
    formMessagePlaceholder: 'Descrie sarcina sau întrebarea ta...',
    formSubmit: 'Trimite',
    formSending: 'Trimit...',
    formSuccessTitle: 'Mulțumesc!',
    formSuccessMessage: 'Mesajul tău a fost trimis. Răspund în 24 de ore.',
    formErrorTitle: 'Eroare',
    formErrorMessage: 'Nu am putut trimite mesajul. Încearcă din nou sau scrie direct pe Telegram.',
  },
};
