import type { Metadata } from 'next';
import React from 'react';
import '../globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';
import { SiteProvider } from '@/lib/SiteContext';
import { locales, defaultLocale } from '@/lib/i18nConfig';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = params?.lang ?? defaultLocale;
  try {
    const data = await import(`@/data/group/${lang}/home.json`);
    const meta = data.default?.metadata;
    return {
      title: meta?.title ?? 'Javed Group',
      description: meta?.description ?? '',
    };
  } catch {
    return { title: 'Javed Group' };
  }
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = params?.lang ?? defaultLocale;

  return (
    <html lang={lang} className="scroll-smooth">
      <body className="font-sans">
        <SiteProvider site="group">
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </SiteProvider>
      </body>
    </html>
  );
}

