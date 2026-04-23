# Javed Group - Multilingual Portal Ecosystem

This project is a high-performance Next.js application hosting five distinct brand portals under the Javed Group umbrella.

- **Javed Group** (Main Site)
- **Javed Travel** (Viaggi)
- **Javed Agency** (Agenzia)
- **Autoscuole Kiwi** (Kiwi)
- **JB Agency** (Assicurazioni)

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the project.

### Production Build
```bash
npm run build
```

## 🌐 Localization & Data Management

The project uses a site-independent, nested data architecture. Each division manages its own content separately.

**Location**: `src/data/[site]/[locale]/[namespace].json`

### Supported Languages
- **IT**: Italian (Default)
- **EN**: English
- **UR**: Urdu (With full RTL support)

### How to Update Content
To modify text:
1. Navigate to `src/data/[portal]/[lang]/`.
2. Open the relevant file (e.g., `home.json` for main content, `header.json` for navigation).
3. The UI will update automatically reflecting the JSON keys.

## 🏗️ Technical Architecture
- **Framework**: Next.js 14 (App Router)
- **i18n**: Custom hook `useI18n(site, namespace)` with dynamic JSON imports.
- **Layouts**: Modular layout strategy for brand isolation.
- **Legals**: Standardized legal page component catering to all divisions.

---
For more details on the migration process, see [MIGRATION_SUMMARY.md](file:///Users/user/Sites/javedgroup-1/MIGRATION_SUMMARY.md).


cp -r /Users/user/Sites/javedgroup-1/out/ /Users/user/Sites/javedgroup-1/staticbuild/