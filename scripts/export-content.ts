// scripts/export-content.ts
import { sanityClient } from '../sanity/client';
import { groq } from 'next-sanity';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

interface ExportRow {
  id: string;
  type: string;
  locale: string;
  title: string;
  slug: string;
  description: string;
  body: string;
  seoTitle: string;
  seoDescription: string;
  featuredImage: string;
  featuredImageAlt: string;
  ctaBlocks: string;
  ogMetadata: string;
  additionalData: string;
}

function stringifyForExport(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function normalizeOmnidashContent(content: unknown): string {
  if (!content || typeof content !== 'object') {
    return stringifyForExport(content);
  }

  // Support both formats:
  // 1) New: content = { title, subtitle, ... }
  // 2) Legacy: content = { data: "<json>" | "text" }
  if ('data' in content) {
    const data = (content as { data?: unknown }).data;
    if (typeof data === 'string') {
      const trimmed = data.trim();
      if (!trimmed) return '';
      try {
        return stringifyForExport(JSON.parse(trimmed));
      } catch {
        return trimmed;
      }
    }
    return stringifyForExport(data);
  }

  return stringifyForExport(content);
}

// Helper to convert Portable Text to plain text
function portableTextToPlain(blocks: unknown): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  try {
    return blocks
      .map((block: { _type?: string; children?: { text?: string }[]; alt?: string }) => {
        if (block._type === 'block') {
          return block.children?.map((child) => child.text).join('') || '';
        }
        if (block._type === 'image') {
          return `[Image: ${block.alt || 'no alt'}]`;
        }
        return '';
      })
      .filter(Boolean)
      .join('\n');
  } catch (error) {
    console.error('Error converting portable text:', error);
    return '';
  }
}

// Escape CSV field
function escapeCSV(value: string | null | undefined): string {
  if (!value) return '';
  const str = String(value);
  // Escape quotes and wrap in quotes if contains comma, newline, or quote
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function exportContent() {
  console.log('🚀 Starting content export from Sanity...\n');

  const rows: ExportRow[] = [];

  // 1. Export Pages
  console.log('📄 Exporting pages...');
  const pages = await sanityClient.fetch(
    groq`*[_type == "page"]{
      _id,
      title,
      "slug": slug.current,
      locale,
      description,
      body,
      seoTitle,
      seoDescription
    }`,
  );
  console.log(`   Found ${pages.length} pages`);

  for (const page of pages) {
    rows.push({
      id: page._id,
      type: 'page',
      locale: page.locale || '',
      title: page.title || '',
      slug: page.slug || '',
      description: page.description || '',
      body: portableTextToPlain(page.body),
      seoTitle: page.seoTitle || '',
      seoDescription: page.seoDescription || '',
      featuredImage: '',
      featuredImageAlt: '',
      ctaBlocks: '',
      ogMetadata: '',
      additionalData: '',
    });
  }

  // 2. Export Services
  console.log('🛠️  Exporting services...');
  const services = await sanityClient.fetch(
    groq`*[_type == "service"]{
      _id,
      title,
      "slug": slug.current,
      locale,
      description,
      icon,
      order,
      featured
    }`,
  );
  console.log(`   Found ${services.length} services`);

  for (const service of services) {
    rows.push({
      id: service._id,
      type: 'service',
      locale: service.locale || '',
      title: service.title || '',
      slug: service.slug || '',
      description: service.description || '',
      body: '',
      seoTitle: '',
      seoDescription: '',
      featuredImage: '',
      featuredImageAlt: '',
      ctaBlocks: '',
      ogMetadata: '',
      additionalData: JSON.stringify({
        icon: service.icon,
        order: service.order,
        featured: service.featured,
      }),
    });
  }

  // 3. Export Case Studies
  console.log('📊 Exporting case studies...');
  const caseStudies = await sanityClient.fetch(
    groq`*[_type == "caseStudy"]{
      _id,
      title,
      "slug": slug.current,
      locale,
      client,
      industry,
      "coverImage": coverImage.asset->url,
      "coverImageAlt": coverImage.alt,
      challenge,
      solution,
      results,
      metrics,
      images,
      tags,
      publishedAt,
      featured
    }`,
  );
  console.log(`   Found ${caseStudies.length} case studies`);

  for (const caseStudy of caseStudies) {
    rows.push({
      id: caseStudy._id,
      type: 'caseStudy',
      locale: caseStudy.locale || '',
      title: caseStudy.title || '',
      slug: caseStudy.slug || '',
      description: caseStudy.challenge || '',
      body: `Challenge:\n${caseStudy.challenge}\n\nSolution:\n${caseStudy.solution}\n\nResults:\n${portableTextToPlain(caseStudy.results)}`,
      seoTitle: '',
      seoDescription: '',
      featuredImage: caseStudy.coverImage || '',
      featuredImageAlt: caseStudy.coverImageAlt || '',
      ctaBlocks: '',
      ogMetadata: JSON.stringify({
        image: caseStudy.coverImage,
        type: 'article',
      }),
      additionalData: JSON.stringify({
        client: caseStudy.client,
        industry: caseStudy.industry,
        metrics: caseStudy.metrics,
        tags: caseStudy.tags,
        publishedAt: caseStudy.publishedAt,
        featured: caseStudy.featured,
      }),
    });
  }

  // 4. Export Blog Posts
  console.log('📝 Exporting blog posts...');
  const blogPosts = await sanityClient.fetch(
    groq`*[_type == "blogPost"]{
      _id,
      title,
      "slug": slug.current,
      locale,
      excerpt,
      "coverImage": coverImage.asset->url,
      "coverImageAlt": coverImage.alt,
      body,
      publishedAt,
      tags,
      author,
      seoTitle,
      seoDescription
    }`,
  );
  console.log(`   Found ${blogPosts.length} blog posts`);

  for (const post of blogPosts) {
    rows.push({
      id: post._id,
      type: 'blogPost',
      locale: post.locale || '',
      title: post.title || '',
      slug: post.slug || '',
      description: post.excerpt || '',
      body: portableTextToPlain(post.body),
      seoTitle: post.seoTitle || '',
      seoDescription: post.seoDescription || '',
      featuredImage: post.coverImage || '',
      featuredImageAlt: post.coverImageAlt || '',
      ctaBlocks: '',
      ogMetadata: JSON.stringify({
        image: post.coverImage,
        type: 'article',
        publishedTime: post.publishedAt,
      }),
      additionalData: JSON.stringify({
        tags: post.tags,
        author: post.author,
        publishedAt: post.publishedAt,
      }),
    });
  }

  // 5. Export FAQ
  console.log('❓ Exporting FAQ...');
  const faqs = await sanityClient.fetch(
    groq`*[_type == "faq"]{
      _id,
      question,
      answer,
      locale,
      category,
      order
    }`,
  );
  console.log(`   Found ${faqs.length} FAQs`);

  for (const faq of faqs) {
    rows.push({
      id: faq._id,
      type: 'faq',
      locale: faq.locale || '',
      title: faq.question || '',
      slug: '',
      description: faq.answer || '',
      body: '',
      seoTitle: '',
      seoDescription: '',
      featuredImage: '',
      featuredImageAlt: '',
      ctaBlocks: '',
      ogMetadata: '',
      additionalData: JSON.stringify({
        category: faq.category,
        order: faq.order,
      }),
    });
  }

  // 6. Export OmniDash Blocks
  console.log('🎨 Exporting OmniDash blocks...');
  const omnidashBlocks = await sanityClient.fetch(
    groq`*[_type == "omnidashBlock"]{
      _id,
      blockType,
      locale,
      content,
      order
    }`,
  );
  console.log(`   Found ${omnidashBlocks.length} OmniDash blocks`);

  for (const block of omnidashBlocks) {
    const contentData = normalizeOmnidashContent(block.content);
    rows.push({
      id: block._id,
      type: 'omnidashBlock',
      locale: block.locale || '',
      title: block.blockType || '',
      slug: '',
      description: '',
      body: contentData,
      seoTitle: '',
      seoDescription: '',
      featuredImage: '',
      featuredImageAlt: '',
      ctaBlocks: contentData,
      ogMetadata: '',
      additionalData: JSON.stringify({
        blockType: block.blockType,
        order: block.order,
      }),
    });
  }

  // 7. Export Contact Info
  console.log('📬 Exporting contact info...');
  const contactInfos = await sanityClient.fetch(
    groq`*[_type == "contactInfo"]{
      _id,
      locale,
      pageTitle,
      pageSubtitle,
      channelsTitle,
      channels,
      formTitle,
      formSubtitle,
      formNameLabel,
      formNamePlaceholder,
      formEmailLabel,
      formEmailPlaceholder,
      formMessageLabel,
      formMessagePlaceholder,
      formSubmit,
      formSending,
      formSuccessTitle,
      formSuccessMessage,
      formErrorTitle,
      formErrorMessage
    }`,
  );
  console.log(`   Found ${contactInfos.length} contact info documents`);

  for (const info of contactInfos) {
    const formFields = {
      formTitle: info.formTitle,
      formSubtitle: info.formSubtitle,
      formNameLabel: info.formNameLabel,
      formNamePlaceholder: info.formNamePlaceholder,
      formEmailLabel: info.formEmailLabel,
      formEmailPlaceholder: info.formEmailPlaceholder,
      formMessageLabel: info.formMessageLabel,
      formMessagePlaceholder: info.formMessagePlaceholder,
      formSubmit: info.formSubmit,
      formSending: info.formSending,
      formSuccessTitle: info.formSuccessTitle,
      formSuccessMessage: info.formSuccessMessage,
      formErrorTitle: info.formErrorTitle,
      formErrorMessage: info.formErrorMessage,
    };

    rows.push({
      id: info._id,
      type: 'contactInfo',
      locale: info.locale || '',
      title: info.pageTitle || '',
      slug: 'contact',
      description: info.pageSubtitle || '',
      body: stringifyForExport({
        channelsTitle: info.channelsTitle,
        channels: info.channels,
        ...formFields,
      }),
      seoTitle: '',
      seoDescription: '',
      featuredImage: '',
      featuredImageAlt: '',
      ctaBlocks: stringifyForExport({
        channelsTitle: info.channelsTitle,
        channels: info.channels,
        formTitle: info.formTitle,
        formSubtitle: info.formSubtitle,
        formSubmit: info.formSubmit,
        formSending: info.formSending,
      }),
      ogMetadata: '',
      additionalData: stringifyForExport(formFields),
    });
  }

  // Generate CSV
  console.log('\n📦 Generating CSV...');
  const headers = [
    'ID',
    'Type',
    'Locale',
    'Title',
    'Slug',
    'Description',
    'Body',
    'SEO Title',
    'SEO Description',
    'Featured Image',
    'Featured Image Alt',
    'CTA Blocks',
    'OG Metadata',
    'Additional Data',
  ];

  const csvLines = [headers.join(',')];

  for (const row of rows) {
    const line = [
      escapeCSV(row.id),
      escapeCSV(row.type),
      escapeCSV(row.locale),
      escapeCSV(row.title),
      escapeCSV(row.slug),
      escapeCSV(row.description),
      escapeCSV(row.body),
      escapeCSV(row.seoTitle),
      escapeCSV(row.seoDescription),
      escapeCSV(row.featuredImage),
      escapeCSV(row.featuredImageAlt),
      escapeCSV(row.ctaBlocks),
      escapeCSV(row.ogMetadata),
      escapeCSV(row.additionalData),
    ].join(',');
    csvLines.push(line);
  }

  const csv = csvLines.join('\n');

  // Save to file
  const docsDir = join(process.cwd(), 'docs', 'content');
  mkdirSync(docsDir, { recursive: true });
  const filePath = join(docsDir, 'content_export.csv');
  writeFileSync(filePath, csv, 'utf-8');

  console.log(`\n✅ Export complete!`);
  console.log(`📁 File saved to: ${filePath}`);
  console.log(`📊 Total rows: ${rows.length}`);
  console.log('\n📈 Summary by type:');
  const summary = rows.reduce(
    (acc, row) => {
      acc[row.type] = (acc[row.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  Object.entries(summary).forEach(([type, count]) => {
    console.log(`   ${type}: ${count}`);
  });

  console.log('\n📍 Summary by locale:');
  const localeSummary = rows.reduce(
    (acc, row) => {
      acc[row.locale] = (acc[row.locale] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  Object.entries(localeSummary).forEach(([locale, count]) => {
    console.log(`   ${locale}: ${count}`);
  });
}

// Run export
exportContent().catch((error) => {
  console.error('❌ Export failed:', error);
  process.exit(1);
});
