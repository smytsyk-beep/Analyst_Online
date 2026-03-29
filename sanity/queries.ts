// sanity/queries.ts
import { groq } from 'next-sanity';

// ============================================================================
// Page queries
// ============================================================================

export const homePageQuery = groq`
  *[_type == "page" && slug.current == "home" && locale == $locale][0] {
    _id,
    title,
    description,
    body,
    locale
  }
`;

export const privacyPageQuery = groq`
  *[_type == "page" && slug.current == "privacy" && locale == $locale][0] {
    _id,
    title,
    description,
    body,
    locale
  }
`;

export const contactPageQuery = groq`
  *[_type == "page" && slug.current == "contact" && locale == $locale][0] {
    _id,
    title,
    description,
    body,
    locale
  }
`;

export const casesPageQuery = groq`
  *[_type == "page" && slug.current == "cases" && locale == $locale][0] {
    _id,
    title,
    description,
    body,
    locale
  }
`;

// ============================================================================
// Services queries
// ============================================================================

export const servicesQuery = groq`
  *[_type == "service" && locale == $locale] | order(order asc) {
    _id,
    slug,
    locale,
    title,
    description,
    icon,
    bullets,
    cta,
    featured,
    order
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug && locale == $locale][0] {
    _id,
    slug,
    locale,
    title,
    description,
    icon,
    bullets,
    cta,
    featured,
    order
  }
`;

// ============================================================================
// OmniDash queries
// ============================================================================

export const omnidashBlocksQuery = groq`
  *[_type == "omnidashBlock" && locale == $locale] | order(order asc) {
    _id,
    locale,
    blockType,
    content,
    order
  }
`;

// ============================================================================
// FAQ queries
// ============================================================================

export const faqQuery = groq`
  *[_type == "faq" && locale == $locale && category == $category] | order(order asc) {
    _id,
    locale,
    question,
    answer,
    category,
    order
  }
`;

export const allFaqQuery = groq`
  *[_type == "faq" && locale == $locale] | order(category asc, order asc) {
    _id,
    locale,
    question,
    answer,
    category,
    order
  }
`;

// ============================================================================
// Case Studies queries
// ============================================================================

export const caseStudiesListQuery = groq`
  *[_type == "caseStudy" && locale == $locale && defined(publishedAt)] 
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    client,
    industry,
    coverImage,
    metrics,
    tags,
    featured,
    publishedAt
  }
`;

export const featuredCasesQuery = groq`
  *[_type == "caseStudy" && locale == $locale && featured == true] 
  | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    client,
    industry,
    coverImage,
    metrics,
    publishedAt
  }
`;

export const caseStudyQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug && locale == $locale][0] {
    _id,
    title,
    slug,
    locale,
    client,
    industry,
    coverImage,
    challenge,
    solution,
    results,
    metrics,
    images,
    tags,
    publishedAt,
    featured
  }
`;

// ============================================================================
// Blog queries
// ============================================================================

export const blogListQuery = groq`
  *[_type == "blogPost" && locale == $locale && defined(publishedAt)]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    tags
  }
`;

export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug && locale == $locale][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    body,
    publishedAt,
    tags,
    seoTitle,
    seoDescription
  }
`;

// ============================================================================
// Sitemap queries
// ============================================================================

export const allPagesForSitemapQuery = groq`
  *[_type == "page" && defined(slug)] {
    "slug": slug.current,
    locale,
    _updatedAt
  }
`;

export const allServicesForSitemapQuery = groq`
  *[_type == "service" && defined(slug)] {
    "slug": slug.current,
    locale,
    _updatedAt
  }
`;

export const allCasesForSitemapQuery = groq`
  *[_type == "caseStudy" && defined(slug) && defined(publishedAt)] {
    "slug": slug.current,
    locale,
    publishedAt,
    _updatedAt
  }
`;

export const allBlogPostsForSitemapQuery = groq`
  *[_type == "blogPost" && defined(slug) && defined(publishedAt)] {
    "slug": slug.current,
    locale,
    publishedAt,
    _updatedAt
  }
`;
