/**
 * siteConfig.ts
 * Maps hostnames → site keys and provides base URLs per site.
 * All values come from environment variables — no code changes needed
 * when adding/removing domains.
 */

export type SiteKey = 'group' | 'agenzia' | 'assicurazioni' | 'kiwi' | 'viaggi';

/** Parse SITE_DOMAIN_MAP env var into a lookup map. */
function buildDomainMap(): Record<string, SiteKey> {
  const raw = process.env.SITE_DOMAIN_MAP ?? '';
  const map: Record<string, SiteKey> = {};
  raw.split(',').forEach((pair) => {
    const [host, site] = pair.trim().split(':');
    if (host && site) map[host.trim()] = site.trim() as SiteKey;
  });
  return map;
}

export const domainMap = buildDomainMap();

/** Resolve a hostname to a site key. Falls back to 'group'. */
export function getSiteFromHost(host: string): SiteKey {
  // Strip port if present (e.g. localhost:3000)
  const hostname = host.split(':')[0];
  return domainMap[hostname] ?? 'group';
}

/** Base URLs per site for canonical / sitemap / hreflang. */
export const siteBaseUrls: Record<SiteKey, string> = {
  group:          process.env.BASE_URL_GROUP          ?? 'https://goldevelopers.github.io/javedgroup',
  agenzia:        process.env.BASE_URL_AGENZIA        ?? 'https://agenzia.javedgroup.com',
  assicurazioni:  process.env.BASE_URL_ASSICURAZIONI  ?? 'https://assicurazioni.javedgroup.com',
  kiwi:           process.env.BASE_URL_KIWI           ?? 'https://kiwi.javedgroup.com',
  viaggi:         process.env.BASE_URL_VIAGGI         ?? 'https://viaggi.javedgroup.com',
};

/** Human-readable display names per site. */
export const siteDisplayNames: Record<SiteKey, string> = {
  group:          'Javed Group',
  agenzia:        'Agenzia Javed',
  assicurazioni:  'JB Agency Assicurazioni',
  kiwi:           'Autoscuole Kiwi',
  viaggi:         'Javed Viaggi',
};
