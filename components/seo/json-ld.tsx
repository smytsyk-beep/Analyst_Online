// components/seo/json-ld.tsx

type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Renders a <script type="application/ld+json"> tag with the given structured data.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
