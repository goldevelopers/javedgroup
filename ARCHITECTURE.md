# Javed Group — Multi-Site Architecture

## Overview

One Next.js app serves all five sites. Middleware reads the `Host` header to determine which site to render. No separate deployments needed — a single build handles everything.

**Sites:**

| Host (local) | Host (production) | Site key |
|---|---|---|
| `javedgroup.local` | `javedgroup.com` | `group` |
| `agenzia.javedgroup.local` | `agenzia.javedgroup.com` | `agenzia` |
| `assicurazioni.javedgroup.local` | `assicurazioni.javedgroup.com` | `assicurazioni` |
| `kiwi.javedgroup.local` | `kiwi.javedgroup.com` | `kiwi` |
| `viaggi.javedgroup.local` | `viaggi.javedgroup.com` | `viaggi` |

---

## URL Structure

### Main group site
```
javedgroup.local/          → redirects to /it (default locale)
javedgroup.local/it        → Italian home
javedgroup.local/en        → English home
javedgroup.local/ur        → Urdu home
javedgroup.local/it/about
javedgroup.local/en/contact
```

### Divisional subdomains (same pattern for all)
```
agenzia.javedgroup.local/          → redirects to /it
agenzia.javedgroup.local/it        → Italian home
agenzia.javedgroup.local/en        → English home
agenzia.javedgroup.local/ur        → Urdu home
agenzia.javedgroup.local/it/contact
agenzia.javedgroup.local/en/services
agenzia.javedgroup.local/ur/about
```

The middleware rewrites `/contact` → `/it/contact` (default locale redirect). The `[lang]` route segment handles the rest.

---

## How It Works

### 1. Middleware (`src/middleware.ts`)
- Reads the `Host` header on every request
- Calls `getSiteFromHost()` to resolve the site key
- If no locale prefix is present in the URL, redirects to `/{defaultLocale}{path}`
- Injects an `x-site` request header so server components can read the site key
- Static assets, `_next/`, `api/`, and media files are bypassed

### 2. Site resolution (`src/lib/siteConfig.ts`)
- `SITE_DOMAIN_MAP` env var maps hostnames to site keys
- `getSiteFromHost(host)` strips the port, looks up the map, falls back to `'group'`
- `siteBaseUrls` provides canonical base URLs per site (for SEO alternates / sitemap)

### 3. i18n config (`src/lib/i18nConfig.ts`)
- `NEXT_PUBLIC_ENABLED_LOCALES` env var (comma-separated) controls which locales are active
- First locale in the list is the default
- `isValidLocale()` is used by middleware to detect locale prefixes in URLs
- RTL locales (`ur`, `ar`, `fa`, `he`) automatically set `dir="rtl"` on `<html>`

### 4. Layout injection (`src/app/[lang]/layout.tsx`)
- Server component reads `host` header → resolves site key
- Wraps the tree with `<SiteProvider site={site}>` and `<LanguageProvider>`
- `SiteShell` renders group chrome (Header + Footer) on the group site only; divisional sites render their own chrome inside their layouts

### 5. SiteContext (`src/lib/SiteContext.tsx`)
- Provides `useSite()` hook to any client component
- Returns the current site key (`'group' | 'agenzia' | ...`)

### 6. LanguageContext (`src/lib/LanguageContext.tsx`)
- Provides `locale`, `setLocale`, `isRTL`, and `availableLocales`
- `availableLocales` comes from `i18nConfig.ts` (env-driven), so disabled languages automatically disappear from the language switcher
- `setLocale()` guards against switching to a disabled locale

### 7. `useI18n(namespace, siteOverride?)` (`src/lib/useI18n.ts`)
- Loads `src/data/{site}/{locale}/{namespace}.json` dynamically
- `site` comes from `SiteContext` — no need to pass it manually
- `siteOverride` is only needed in edge cases (e.g. `LegalPage` which accepts a `site` prop for backward compatibility)

### 8. `useSiteLink(divisionSlug?)` (`src/lib/useSiteLink.ts`)
- Builds locale-prefixed, site-aware hrefs
- On a subdomain: `useSiteLink('kiwi')('/contact')` → `/it/contact`
- On the group site: `useSiteLink('kiwi')('/contact')` → `/it/kiwi/contact`

---

## Data Structure

Each site has its own translation folder:

```
src/data/
  group/
    it/   en/   ur/
      home.json  about.json  services.json  contact.json
      header.json  footer.json  legal.json
  agenzia/
    it/   en/   ur/
      home.json  about.json  services.json  contact.json
      header.json  footer.json  legal.json
  assicurazioni/ ...
  kiwi/ ...
  viaggi/ ...
```

---

## Adding a New Language

1. Add the locale code to `NEXT_PUBLIC_ENABLED_LOCALES` in `.env.local`:
   ```
   NEXT_PUBLIC_ENABLED_LOCALES=it,en,ur,fr
   ```
2. Create the JSON translation files for **every site**:
   ```
   src/data/{site}/fr/{namespace}.json
   ```
3. No code changes required. The language switcher, middleware redirects, and `generateStaticParams` all pick up the new locale automatically.

---

## Disabling a Language

Remove the locale code from `NEXT_PUBLIC_ENABLED_LOCALES`:
```
NEXT_PUBLIC_ENABLED_LOCALES=it,en
```
`ur` will no longer appear in the language switcher, and middleware will no longer treat `/ur/...` as a valid locale path (redirecting to the default instead). No code changes needed.

---

## Adding a New Site / Subdomain

1. Create the data folder: `src/data/newsite/{it,en,ur}/*.json`
2. Add the new site key to `SiteKey` type in `src/lib/siteConfig.ts`
3. Add the hostname mappings in `.env.local`:
   ```
   SITE_DOMAIN_MAP=...,newsite.javedgroup.local:newsite,newsite.javedgroup.com:newsite
   ```
4. Add the base URL:
   ```
   BASE_URL_NEWSITE=https://newsite.javedgroup.com
   ```
5. Update `siteBaseUrls` and `siteDisplayNames` in `siteConfig.ts`
6. Create the route folder `src/app/[lang]/newsite/` with pages and a client layout
test
---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_ENABLED_LOCALES` | Active locales, first = default | `it,en,ur` |
| `SITE_DOMAIN_MAP` | `hostname:siteKey` pairs | `javedgroup.local:group,...` |
| `BASE_URL_GROUP` | Canonical URL for group site | `https://javedgroup.com` |
| `BASE_URL_AGENZIA` | Canonical URL for agenzia | `https://agenzia.javedgroup.com` |
| `BASE_URL_ASSICURAZIONI` | Canonical URL for assicurazioni | `https://assicurazioni.javedgroup.com` |
| `BASE_URL_KIWI` | Canonical URL for kiwi | `https://kiwi.javedgroup.com` |
| `BASE_URL_VIAGGI` | Canonical URL for viaggi | `https://viaggi.javedgroup.com` |

Copy `.env.example` to `.env.local` and update values before running locally.

---

## Local Development Setup

### Prerequisites
- Add virtual host entries to `/etc/hosts`:
  ```
  127.0.0.1  javedgroup.local
  127.0.0.1  agenzia.javedgroup.local
  127.0.0.1  assicurazioni.javedgroup.local
  127.0.0.1  kiwi.javedgroup.local
  127.0.0.1  viaggi.javedgroup.local
  ```
- Configure your local web server (Nginx/Caddy/etc.) or use a tool like [hotel](https://github.com/typicode/hotel) to proxy all `*.javedgroup.local` traffic to `localhost:3000`

### Run the dev server
```bash
cp .env.example .env.local
# Edit .env.local as needed
npm run dev
```

Then visit `http://agenzia.javedgroup.local:3000` (or port 80 if proxied).

---

## Template Architecture

Each divisional site uses **one template** (one set of components) shared across all languages. The template renders based on the active locale from `LanguageContext`. There are no per-language component variants — only per-language JSON data files.

- `AgenziaClientLayout.tsx` — agenzia chrome (header + footer), shared across `it/en/ur`
- `ViaggiClientLayout.tsx` — viaggi chrome
- `KiwiClientLayout.tsx` — kiwi chrome
- `AssicurazioniClientLayout.tsx` — assicurazioni chrome

All page components (`page.tsx`) use `useI18n('namespace')` which automatically loads the correct language file based on the current locale and site context.
