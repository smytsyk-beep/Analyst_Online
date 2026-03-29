// sanity/migrate.ts
/**
 * Migration script: content/*.copy.ts → Sanity CMS
 *
 * Usage:
 *   npm run migrate-content
 *
 * This script reads all .copy.ts files and creates corresponding documents in Sanity.
 * Safe to run multiple times — checks for existing documents before creating.
 */

import { createClient } from '@sanity/client';
import { homeCopy } from '../content/home.copy';
import { servicesCopy } from '../content/services.copy';
import { omniDashCopy } from '../content/omnidash.copy';
import type { Locale } from '../lib/i18n';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

const locales: Locale[] = ['ru', 'ua', 'ro'];

// ============================================================================
// Helper functions
// ============================================================================

async function documentExists(type: string, slug: string, locale: string): Promise<boolean> {
  const query = `*[_type == $type && slug.current == $slug && locale == $locale][0]._id`;
  const result = await client.fetch(query, { type, slug, locale });
  return !!result;
}

async function createOrSkip(doc: any, label: string) {
  const exists = await documentExists(doc._type, doc.slug.current, doc.locale);
  if (exists) {
    console.log(`⏭️  Skip: ${label} (already exists)`);
    return;
  }
  await client.create(doc);
  console.log(`✅ Created: ${label}`);
}

// ============================================================================
// Migrate Home page
// ============================================================================

async function migrateHomePage() {
  console.log('\n📄 Migrating Home page...');

  for (const locale of locales) {
    const copy = homeCopy[locale];

    const doc = {
      _type: 'page',
      slug: { _type: 'slug', current: 'home' },
      locale,
      title: copy.heroTitle,
      description: copy.heroSubtitle,
      body: [
        {
          _type: 'block',
          _key: 'hero',
          style: 'normal',
          children: [{ _type: 'span', text: copy.heroSubtitle }],
        },
      ],
    };

    await createOrSkip(doc, `Home (${locale})`);
  }
}

// ============================================================================
// Migrate Services
// ============================================================================

async function migrateServices() {
  console.log('\n🛠️  Migrating Services...');

  for (const locale of locales) {
    const copy = servicesCopy[locale];

    for (let i = 0; i < copy.services.length; i++) {
      const service = copy.services[i];

      const doc = {
        _type: 'service',
        slug: { _type: 'slug', current: service.id },
        locale,
        title: service.title,
        description: service.description,
        icon: '📊', // default icon
        bullets: service.bullets,
        cta: service.cta,
        featured: service.highlighted || false,
        order: i,
      };

      await createOrSkip(doc, `Service: ${service.id} (${locale})`);
    }
  }
}

// ============================================================================
// Migrate OmniDash blocks
// ============================================================================

async function migrateOmniDashBlocks() {
  console.log('\n🎯 Migrating OmniDash blocks...');

  for (const locale of locales) {
    const copy = omniDashCopy[locale];

    // Hero block
    const heroDoc = {
      _type: 'omnidashBlock',
      locale,
      blockType: 'hero',
      content: {
        badge: copy.heroBadge,
        title: copy.heroTitle,
        subtitle: copy.heroSubtitle,
        ctaPrimary: copy.heroCtaPrimary,
        ctaSecondary: copy.heroCtaSecondary,
        stats: copy.heroStats,
      },
      order: 0,
    };

    // Check if exists by blockType + locale (no slug for omnidashBlock)
    const heroExists = await client.fetch(
      `*[_type == "omnidashBlock" && blockType == "hero" && locale == $locale][0]._id`,
      { locale },
    );

    if (!heroExists) {
      await client.create(heroDoc);
      console.log(`✅ Created: OmniDash Hero (${locale})`);
    } else {
      console.log(`⏭️  Skip: OmniDash Hero (${locale}) (already exists)`);
    }

    // Pain points block
    const painDoc = {
      _type: 'omnidashBlock',
      locale,
      blockType: 'pain',
      content: {
        title: copy.painTitle,
        subtitle: copy.painSubtitle,
        pains: copy.pains,
      },
      order: 1,
    };

    const painExists = await client.fetch(
      `*[_type == "omnidashBlock" && blockType == "pain" && locale == $locale][0]._id`,
      { locale },
    );

    if (!painExists) {
      await client.create(painDoc);
      console.log(`✅ Created: OmniDash Pain (${locale})`);
    } else {
      console.log(`⏭️  Skip: OmniDash Pain (${locale}) (already exists)`);
    }

    // Features block
    const featuresDoc = {
      _type: 'omnidashBlock',
      locale,
      blockType: 'features',
      content: {
        title: copy.featuresTitle,
        subtitle: copy.featuresSubtitle,
        features: copy.features,
        advancedTitle: copy.featuresAdvancedTitle,
        advanced: copy.featuresAdvanced,
      },
      order: 2,
    };

    const featuresExists = await client.fetch(
      `*[_type == "omnidashBlock" && blockType == "features" && locale == $locale][0]._id`,
      { locale },
    );

    if (!featuresExists) {
      await client.create(featuresDoc);
      console.log(`✅ Created: OmniDash Features (${locale})`);
    } else {
      console.log(`⏭️  Skip: OmniDash Features (${locale}) (already exists)`);
    }

    // How it works block
    const howDoc = {
      _type: 'omnidashBlock',
      locale,
      blockType: 'how',
      content: {
        title: copy.howTitle,
        subtitle: copy.howSubtitle,
        steps: copy.steps,
      },
      order: 3,
    };

    const howExists = await client.fetch(
      `*[_type == "omnidashBlock" && blockType == "how" && locale == $locale][0]._id`,
      { locale },
    );

    if (!howExists) {
      await client.create(howDoc);
      console.log(`✅ Created: OmniDash How (${locale})`);
    } else {
      console.log(`⏭️  Skip: OmniDash How (${locale}) (already exists)`);
    }

    // Pricing block
    const pricingDoc = {
      _type: 'omnidashBlock',
      locale,
      blockType: 'pricing',
      content: {
        title: copy.pricingTitle,
        subtitle: copy.pricingSubtitle,
        note: copy.pricingNote,
        plans: copy.plans,
      },
      order: 4,
    };

    const pricingExists = await client.fetch(
      `*[_type == "omnidashBlock" && blockType == "pricing" && locale == $locale][0]._id`,
      { locale },
    );

    if (!pricingExists) {
      await client.create(pricingDoc);
      console.log(`✅ Created: OmniDash Pricing (${locale})`);
    } else {
      console.log(`⏭️  Skip: OmniDash Pricing (${locale}) (already exists)`);
    }

    // CTA block
    const ctaDoc = {
      _type: 'omnidashBlock',
      locale,
      blockType: 'cta',
      content: {
        title: copy.ctaTitle,
        subtitle: copy.ctaSubtitle,
        ctaPrimary: copy.ctaPrimary,
        ctaSecondary: copy.ctaSecondary,
      },
      order: 5,
    };

    const ctaExists = await client.fetch(
      `*[_type == "omnidashBlock" && blockType == "cta" && locale == $locale][0]._id`,
      { locale },
    );

    if (!ctaExists) {
      await client.create(ctaDoc);
      console.log(`✅ Created: OmniDash CTA (${locale})`);
    } else {
      console.log(`⏭️  Skip: OmniDash CTA (${locale}) (already exists)`);
    }
  }
}

// ============================================================================
// Migrate OmniDash FAQ
// ============================================================================

async function migrateOmniDashFAQ() {
  console.log('\n❓ Migrating OmniDash FAQ...');

  for (const locale of locales) {
    const copy = omniDashCopy[locale];

    for (let i = 0; i < copy.faqs.length; i++) {
      const faq = copy.faqs[i];

      // Check if exists by question + locale
      const exists = await client.fetch(
        `*[_type == "faq" && question == $question && locale == $locale][0]._id`,
        { question: faq.q, locale },
      );

      if (exists) {
        console.log(`⏭️  Skip: FAQ "${faq.q.substring(0, 40)}..." (${locale})`);
        continue;
      }

      const doc = {
        _type: 'faq',
        locale,
        question: faq.q,
        answer: faq.a,
        category: 'omnidash',
        order: i,
      };

      await client.create(doc);
      console.log(`✅ Created: FAQ "${faq.q.substring(0, 40)}..." (${locale})`);
    }
  }
}

// ============================================================================
// Migrate Privacy page
// ============================================================================

async function migratePrivacyPage() {
  console.log('\n🔒 Migrating Privacy page...');

  for (const locale of locales) {
    const doc = {
      _type: 'page',
      slug: { _type: 'slug', current: 'privacy' },
      locale,
      title: locale === 'ru' ? 'Политика конфиденциальности' : locale === 'ua' ? 'Політика конфіденційності' : 'Politica de confidențialitate',
      description: locale === 'ru' ? 'Политика обработки персональных данных' : locale === 'ua' ? 'Політика обробки персональних даних' : 'Politica de prelucrare a datelor personale',
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: locale === 'ru' ? 'Содержимое политики конфиденциальности будет добавлено позже.' : locale === 'ua' ? 'Вміст політики конфіденційності буде додано пізніше.' : 'Conținutul politicii de confidențialitate va fi adăugat mai târziu.',
            },
          ],
        },
      ],
    };

    await createOrSkip(doc, `Privacy (${locale})`);
  }
}

// ============================================================================
// Migrate Contact page
// ============================================================================

async function migrateContactPage() {
  console.log('\n📧 Migrating Contact page...');

  for (const locale of locales) {
    const doc = {
      _type: 'page',
      slug: { _type: 'slug', current: 'contact' },
      locale,
      title: locale === 'ru' ? 'Контакты' : locale === 'ua' ? 'Контакти' : 'Contact',
      description: locale === 'ru' ? 'Свяжитесь со мной для обсуждения вашей задачи' : locale === 'ua' ? "Зв'яжіться зі мною для обговорення вашої задачі" : 'Contactează-mă pentru a discuta sarcina ta',
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: locale === 'ru' ? 'Форма обратной связи' : locale === 'ua' ? 'Форма зворотного зв\'язку' : 'Formular de contact',
            },
          ],
        },
      ],
    };

    await createOrSkip(doc, `Contact (${locale})`);
  }
}

// ============================================================================
// Migrate Cases page
// ============================================================================

async function migrateCasesPage() {
  console.log('\n📊 Migrating Cases page...');

  for (const locale of locales) {
    const doc = {
      _type: 'page',
      slug: { _type: 'slug', current: 'cases' },
      locale,
      title: locale === 'ru' ? 'Кейсы' : locale === 'ua' ? 'Кейси' : 'Cazuri',
      description: locale === 'ru' ? 'Примеры работы и результаты' : locale === 'ua' ? 'Приклади роботи та результати' : 'Exemple de lucru și rezultate',
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: locale === 'ru' ? 'Реальные кейсы появятся здесь в ближайшее время.' : locale === 'ua' ? 'Реальні кейси з\'являться тут найближчим часом.' : 'Cazuri reale vor apărea aici în curând.',
            },
          ],
        },
      ],
    };

    await createOrSkip(doc, `Cases (${locale})`);
  }
}

// ============================================================================
// Main migration function
// ============================================================================

async function migrate() {
  console.log('🚀 Starting content migration to Sanity CMS...\n');
  console.log(`Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}\n`);

  try {
    await migrateHomePage();
    await migrateServices();
    await migrateOmniDashBlocks();
    await migrateOmniDashFAQ();
    await migratePrivacyPage();
    await migrateContactPage();
    await migrateCasesPage();

    console.log('\n✅ Migration completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('  1. Open http://localhost:3000/studio to verify content');
    console.log('  2. Update pages to fetch from CMS instead of .copy.ts');
    console.log('  3. Test all pages with CMS data');
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrate();
