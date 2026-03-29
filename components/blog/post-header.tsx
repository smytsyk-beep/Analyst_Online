// components/blog/post-header.tsx
import Image from 'next/image';
import { urlFor } from '@/sanity/image';
import type { Locale } from '@/lib/i18n';

type PostHeaderProps = {
  title: string;
  publishedAt: string;
  coverImage?: Record<string, unknown>;
  tags?: string[];
  lang: Locale;
};

export default function PostHeader({
  title,
  publishedAt,
  coverImage,
  tags,
  lang,
}: PostHeaderProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString(
    lang === 'ru' ? 'ru-RU' : lang === 'ua' ? 'uk-UA' : 'ro-RO',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  );

  return (
    <header className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-400">
          <time dateTime={publishedAt}>{formattedDate}</time>

          {tags && tags.length > 0 && (
            <>
              <span>•</span>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {coverImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
          <Image
            src={urlFor(coverImage).width(1200).height(675).url()}
            alt={title}
            width={1200}
            height={675}
            className="object-cover"
            priority
          />
        </div>
      )}
    </header>
  );
}
