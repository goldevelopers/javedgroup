"use client";

/**
 * useSiteLink
 * Returns a helper that builds locale-prefixed, site-aware hrefs.
 *
 * On subdomain sites:  useSiteLink()('/contact')  → '/it/contact'
 * On group site:       useSiteLink('agenzia')('/contact') → '/it/agenzia/contact'
 */

import { useLanguage } from './LanguageContext';
import { useSite } from './SiteContext';

export function useSiteLink(divisionSlug?: string) {
  const { locale } = useLanguage();
  const site = useSite();

  return (path: string): string => {
    // On subdomain the site IS the division — no prefix needed
    if (site !== 'group') {
      return `/${locale}${path}`;
    }
    // On group site, prefix with the division slug
    const slug = divisionSlug ?? '';
    const base = slug ? `/${slug}` : '';
    return `/${locale}${base}${path}`;
  };
}
