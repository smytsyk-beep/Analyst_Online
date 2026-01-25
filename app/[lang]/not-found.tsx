'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n';

const MESSAGES: Record<
  Locale,
  {
    title: string;
    description: string;
    back: string;
  }
> = {
  ua: {
    title: 'Сторінку не знайдено',
    description:
      'Ми не знайшли цієї сторінки. Можливо, посилання застаріло або було введено з помилкою.',
    back: 'Повернутися на головну',
  },
  ru: {
    title: 'Страница не найдена',
    description: 'Мы не нашли эту страницу. Возможно, ссылка устарела или была введена с ошибкой.',
    back: 'Вернуться на главную',
  },
  ro: {
    title: 'Pagina nu a fost găsită',
    description: 'Nu am găsit această pagină. Probabil linkul este vechi sau introdus greșit.',
    back: 'Înapoi la pagina principală',
  },
};

export default function LangNotFound() {
  const params = useParams<{ lang?: string }>();

  const rawLang = (params?.lang ?? 'ru').toString();
  const lang: Locale = isLocale(rawLang) ? rawLang : 'ru';

  const t = MESSAGES[lang];

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <span className="text-sm font-medium text-muted-foreground">404</span>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">{t.title}</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">{t.description}</p>

      <Link
        href={`/${lang}`}
        className="mt-6 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
      >
        ← {t.back}
      </Link>
    </main>
  );
}
