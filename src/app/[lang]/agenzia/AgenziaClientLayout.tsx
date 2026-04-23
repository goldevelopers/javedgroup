"use client";

import React from 'react';
import { useI18n } from '@/lib/useI18n';
import { useSite } from '@/lib/SiteContext';
import DivisionalHeader from '@/components/DivisionalHeader';
import DivisionalFooter from '@/components/DivisionalFooter';

export default function AgenziaClientLayout({ children }: { children: React.ReactNode }) {
  const { t: headerT, loading: headerLoading } = useI18n('header');
  const { t: footerT, loading: footerLoading } = useI18n('footer');
  const site = useSite();

  if (headerLoading || footerLoading || !headerT || !footerT) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center text-white text-3xl font-black animate-pulse italic">
        Agenzia Javed
      </div>
    );
  }

  // On subdomain: /services  |  On group site: /agenzia/services
  const base = site === 'group' ? '/agenzia' : '';

  const navItems = [
    { label: headerT.home,     href: base || '/' },
    { label: headerT.services, href: `${base}/services` },
    { label: headerT.about,    href: `${base}/about` },
    { label: headerT.contact,  href: `${base}/contact` },
  ];

  return (
    <>
      <DivisionalHeader
        logo="/logos/Agenzia_Javed.svg"
        divisionName="Agenzia Javed"
        navItems={navItems}
        ctaText={headerT.cta}
        accentColor="skyblue"
        backToGroupLabel={headerT.back_to_group}
      />
      {children}
      <DivisionalFooter
        logo="/logos/Agenzia_Javed.svg"
        divisionName="Agenzia Javed"
        description={footerT.description}
        linksTitle={footerT.links_title}
        links={footerT.links.map((l: { href: string; label: string }) => ({
          ...l,
          // Strip /agenzia prefix from legacy hrefs if present
          href: l.href.replace(/^\/agenzia/, base),
        }))}
        copyright={footerT.copyright}
        accentColor="skyblue"
      />
    </>
  );
}
