// components/blog/post-header.tsx
import Image from 'next/image';
import { urlFor } from '@/sanity/image';
import type { Locale } from '@/lib/i18n';

type BlogImageAsset = {
  _id?: string;
  _ref?: string;
  url?: string;
};

type BlogCoverImage = {
  asset?: BlogImageAsset;
  alt?: string;
};

type PostHeaderProps = {
  title: string;
  publishedAt: string;
  coverImage?: BlogCoverImage;
  tags?: string[];
  lang: Locale;
};

function getCoverImageUrl(coverImage: BlogCoverImage | undefined): string | undefined {
  if (!coverImage) return undefined;

  if (coverImage.asset?.url) {
    return coverImage.asset.url;
  }

  if (!coverImage.asset?._id && !coverImage.asset?._ref) {
    return undefined;
  }

  try {
    return urlFor(coverImage).width(1200).height(675).url();
  } catch {
    return undefined;
  }
}

export default function PostHeader({
  title,
  publishedAt,
  coverImage,
  tags,
  lang,
}: PostHeaderProps) {
  const coverImageUrl = getCoverImageUrl(coverImage);
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

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={publishedAt}>{formattedDate}</time>

          {tags && tags.length > 0 && (
            <>
              <span>•</span>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border/70 bg-card/60 px-3 py-1 text-xs text-foreground/70 backdrop-blur-xl"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {coverImageUrl && (
        <div className="glass-card relative aspect-video w-full overflow-hidden rounded-lg p-2">
          <Image
            src={coverImageUrl}
            alt={coverImage?.alt || title}
            width={1200}
            height={675}
            className="h-full w-full rounded-md object-cover"
            priority
          />
        </div>
      )}
    </header>
  );
}
