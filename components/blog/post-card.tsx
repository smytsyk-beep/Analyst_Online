// components/blog/post-card.tsx
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/image';
import type { Locale } from '@/lib/i18n';

type PostCardProps = {
  post: {
    title: string;
    slug: { current: string };
    excerpt?: string;
    coverImage?: Record<string, unknown>;
    publishedAt: string;
    tags?: string[];
  };
  lang: Locale;
};

export default function PostCard({ post, lang }: PostCardProps) {
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
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/30 transition-all hover:border-white/20 hover:bg-neutral-950/50"
    >
      {post.coverImage && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={urlFor(post.coverImage).width(600).height(340).url()}
            alt={post.title}
            width={600}
            height={340}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <time dateTime={post.publishedAt}>{formattedDate}</time>
          {post.tags && post.tags.length > 0 && (
            <>
              <span>•</span>
              <span>{post.tags[0]}</span>
            </>
          )}
        </div>

        <h3 className="text-xl font-semibold leading-tight transition-colors group-hover:text-blue-400">
          {post.title}
        </h3>

        {post.excerpt && <p className="line-clamp-2 text-sm opacity-70">{post.excerpt}</p>}

        <div className="pt-2 text-sm text-blue-400 transition-colors group-hover:text-blue-300">
          Читать далее →
        </div>
      </div>
    </Link>
  );
}
