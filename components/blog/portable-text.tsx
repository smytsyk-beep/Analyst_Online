// components/blog/portable-text.tsx
import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import { urlFor } from '@/sanity/image';

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Blog image'}
            width={800}
            height={450}
            className="rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 text-3xl font-semibold tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 text-2xl font-semibold tracking-tight">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-4 text-xl font-semibold tracking-tight">{children}</h4>
    ),
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary/60 pl-4 italic text-foreground/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-4 list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="my-4 list-decimal space-y-2 pl-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : '';
      if (!href) {
        return <>{children}</>;
      }
      const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a
          href={href}
          rel={rel}
          className="text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary/90 hover:decoration-primary/50"
        >
          {children}
        </a>
      );
    },
  },
};

type Props = {
  value: PortableTextBlock[] | PortableTextBlock;
};

export default function BlogPortableText({ value }: Props) {
  return <PortableText value={value} components={portableTextComponents} />;
}
