"use client";

/**
 * useSiteLink
 * Returns a helper that builds locale-prefixed, site-aware hrefs.
 *
 * On subdomain sites:  useSiteLink()('/contact')  → '/it/contact'
 * On group site:       useSiteLink('agenzia')('/contact') → '/it/agenzia/contact'
 */

import { useLanguage } from './LanguageContext';

export function useSiteLink(divisionSlug?: string) {
  const { locale } = useLanguage();

  return (path: string): string => {
    // On subdomain routing mode, the division is handled by the subdomain — no prefix needed.
    // On path routing mode (GitHub Pages / single hostname), prefix with the division slug.
    if (process.env.NEXT_PUBLIC_ROUTING_MODE !== 'path') {
      return `/${locale}${path}`;
    }
    // On path mode, prefix with the division slug
    const slug = divisionSlug ?? '';
    const base = slug ? `/${slug}` : '';
    return `/${locale}${base}${path}`;
  };
}
