# Javed Group Migration Summary

This document provides a comprehensive overview of the Next.js migration project completed for the Javed Group website. It serves as a context hand-off for future development.

## Project Overview
**Goal**: Migrate the legacy Javed Group website and its four divisional portals to a modern, performant Next.js SSG architecture with full multi-language (i18n) support for Italian, English, and Urdu.

## Technology Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS (with custom "premium" design system)
- **Internationalization**: 
  - Custom `LanguageContext` and `useI18n` hook.
  - Granular JSON message files per page/division.
  - Full RTL (Right-to-Left) support for Urdu.
- **Components**: Framer Motion / CSS Transitions for entrance animations.

## Key Architecture Patterns

### 1. Divisional Persistence
Divisions (**Viaggi**, **Agenzia**, **Kiwi**, **Assicurazioni**) are nested under `/src/app/`. Each uses a nested layout strategy to enforce its specific branding (colors, logos) without bloating the root layout.

### 2. UI Conflict Resolution
To allow shared group-level pages and independent divisional portals, we use:
- **`ConditionalWrapper`**: A logic-driven wrapper in `RootLayout` that disables the main site header/footer when the user is within a divisional route.
- **Server/Client Layouts**: Split layouts to support SEO Metadata (Server) and Localization/UI logic (Client).

### 3. Localization Scaling Strategy
- **File Structure**: `/src/data/[site]/[locale]/[namespace].json`
- **Hook**: Updated `useI18n(site, namespace)` for dynamic, granular translation loading.
- **Independence**: Each division (Viaggi, Agenzia, Kiwi, Assicurazioni) now has its own isolated data directory, allowing for future independent deployment.

## Migration Timeline & Phases

### Phase 1: Foundation
- Established `LanguageContext` and `i18n` infrastructure.
- Built reusable premium components (`DivisionalHeader`, `DivisionalFooter`, `StatsSection`, `ServiceCard`).
- Implemented the "Elite" design system with teal, lime, and skyblue accent tokens.

### Phase 2: Main Group Site
- Migrated Home, About, Services, and Contact for the primary Javed Group site.
- Implemented the group-level division selector.

### Phase 3: Divisional Portals (Parity)
Migrated each division with full parity to legacy content:
- **Viaggi**: Travel booking, visa services, and holiday packages.
- **Agenzia**: CAF, Patronato, and fiscal consulting.
- **Kiwi**: Driving license categories (A, B, C, D) and nautical licenses.
- **Assicurazioni (JB Agency)**: Life/Car insurance and corporate risk management.

### Phase 4: Final Polish & Audit
- Enabled SEO Metadata for all divisions.
- Fixed UI duplication issues.
- Optimized RTL behavior for Urdu (e.g., mirrored arrows and mobile menu transitions).

### Phase 5: Portal Independence & Data Refactoring
- Moved all translations to a site-independent nested structure (`src/data`).
- Split monolithic JSON files into granular namespaces (header, footer, home, etc.).
- Refactored `useI18n` for dynamic brand-specific content loading.
- Standardized Legal Pages (`privacy`, `terms`, `cookies`) across all 5 portal sites.

## Current Project Status
- **Progress**: 100% Migration Complete.
- **Localization**: Full parity for IT, EN, and UR across all divisions.
- **Pages**: 30+ routes fully localized and responsive.
- **Ready for**: Static export (`npm run build`).

---
**Handover Context for Future Sprints:**
- Translation data is in `/src/data/`.
- New components are in `/src/components/`.
- The `useI18n` hook is the primary interface for content; always pass `site` and `namespace`.
- Legacy `src/messages` folder is deprecated and should be removed.
