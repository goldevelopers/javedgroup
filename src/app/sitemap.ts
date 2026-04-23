import { MetadataRoute } from 'next';

const BASE_URL = 'https://javedgroup.it';
const locales = ['it', 'en', 'ur'] as const;

// Group-level pages
const groupPages = ['', '/about', '/services', '/contact', '/privacy', '/cookies', '/terms'];

// Divisional pages
const divisions = ['viaggi', 'agenzia', 'kiwi', 'assicurazioni'] as const;
const divisionPages = ['', '/services', '/about', '/contact', '/privacy', '/cookies', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Group pages
  for (const page of groupPages) {
    const alternates: Record<string, string> = {};
    for (const locale of locales) {
      alternates[locale] = `${BASE_URL}/${locale}${page}`;
    }
    entries.push({
      url: `${BASE_URL}/it${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: { languages: alternates },
    });
  }

  // Divisional pages
  for (const division of divisions) {
    for (const page of divisionPages) {
      const alternates: Record<string, string> = {};
      for (const locale of locales) {
        alternates[locale] = `${BASE_URL}/${locale}/${division}${page}`;
      }
      entries.push({
        url: `${BASE_URL}/it/${division}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 0.9 : 0.7,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
