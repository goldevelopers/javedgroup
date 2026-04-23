/**
 * i18nConfig.ts
 * Single source of truth for locale configuration.
 * Reads from NEXT_PUBLIC_ENABLED_LOCALES env var so languages can be
 * toggled without touching code.
 */

export type Locale = string; // kept flexible so new locales need no type changes

const raw = process.env.NEXT_PUBLIC_ENABLED_LOCALES ?? 'it';

/** All currently enabled locales, in order. */
export const locales: Locale[] = raw.split(',').map((l) => l.trim()).filter(Boolean);

/** The default locale — always the first in the list. */
export const defaultLocale: Locale = locales[0];

/** RTL locales — extend this array when adding RTL languages. */
export const rtlLocales: Locale[] = ['ur', 'ar', 'fa', 'he'];

export const isRTL = (locale: Locale) => rtlLocales.includes(locale);

/** True if the given string is a valid enabled locale. */
export const isValidLocale = (value: string): value is Locale =>
  locales.includes(value);
