// components/blog/post-card.tsx
import Link from 'next/link';
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

type PostCardProps = {
  post: {
    title: string;
    slug: { current: string };
    excerpt?: string;
    coverImage?: BlogCoverImage;
    publishedAt: string;
    tags?: string[];
  };
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
    return urlFor(coverImage).width(600).height(340).url();
  } catch {
    return undefined;
  }
}

export default function PostCard({ post, lang }: PostCardProps) {
  const coverImageUrl = getCoverImageUrl(post.coverImage);
  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    lang === 'ru' ? 'ru-RU' : lang === 'ua' ? 'uk-UA' : 'ro-RO',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  );

  return (
    <Link
      href={`/${lang}/blog/${post.slug.current}`}
      className="group block overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md"
    >
      {coverImageUrl && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={coverImageUrl}
            alt={post.coverImage?.alt || post.title}
            width={600}
            height={340}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2 text-sm text-foreground/60">
          <time dateTime={post.publishedAt}>{formattedDate}</time>
          {post.tags && post.tags.length > 0 && (
            <>
              <span>•</span>
              <span>{post.tags[0]}</span>
            </>
          )}
        </div>

        <h3 className="text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        {post.excerpt && <p className="line-clamp-2 text-sm text-foreground/70">{post.excerpt}</p>}

        <div className="pt-2 text-sm font-semibold text-primary transition-colors group-hover:text-primary">
          Читать далее →
        </div>
      </div>
    </Link>
  );
}
