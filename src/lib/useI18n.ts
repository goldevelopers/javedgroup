"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { useSite } from './SiteContext';

/**
 * useI18n — loads translation JSON for the current site + locale.
 *
 * @param namespace  The JSON file name without extension (e.g. 'home', 'header').
 * @param siteOverride  Optional: force a specific site key (rarely needed).
 */
export const useI18n = (namespace: string, siteOverride?: string) => {
  const { locale } = useLanguage();
  const contextSite = useSite();
  const site = siteOverride ?? contextSite;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [t, setT] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const mod = await import(`@/data/${site}/${locale}/${namespace}.json`);
        if (cancelled) return;
        const data = mod.default;
        setT(data);

        // Update document metadata client-side (SSR metadata is set via generateMetadata)
        if (data?.metadata) {
          if (data.metadata.title) document.title = data.metadata.title;
          if (data.metadata.description) {
            let meta = document.querySelector('meta[name="description"]');
            if (!meta) {
              meta = document.createElement('meta');
              meta.setAttribute('name', 'description');
              document.head.appendChild(meta);
            }
            meta.setAttribute('content', data.metadata.description);
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.error(`[useI18n] Failed to load ${site}/${locale}/${namespace}.json`, err);
          setT(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [locale, site, namespace]);

  return { t, loading };
};
