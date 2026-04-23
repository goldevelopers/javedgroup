"use client";

import React from 'react';
import { useI18n } from '@/lib/useI18n';
import DivisionalHeader from '@/components/DivisionalHeader';
import DivisionalFooter from '@/components/DivisionalFooter';

export default function ViaggiClientLayout({ children }: { children: React.ReactNode }) {
  const { t: headerT, loading: headerLoading } = useI18n('header');
  const { t: footerT, loading: footerLoading } = useI18n('footer');

  if (headerLoading || footerLoading || !headerT || !footerT) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center text-white text-3xl font-black animate-pulse italic">
        Javed Viaggi
      </div>
    );
  }

  const base = process.env.NEXT_PUBLIC_ROUTING_MODE === 'path' ? '/viaggi' : '';

  const navItems = [
    { label: headerT.home,     href: base || '/' },
    { label: headerT.services, href: `${base}/services` },
    { label: headerT.about,    href: `${base}/about` },
    { label: headerT.contact,  href: `${base}/contact` },
  ];

  return (
    <>
      <DivisionalHeader
        logo="/logos/Javed_Viaggi.svg"
        divisionName="Javed Viaggi"
        navItems={navItems}
        ctaText={headerT.cta}
        accentColor="teal"
        backToGroupLabel={headerT.back_to_group}
      />
      {children}
      <DivisionalFooter
        logo="/logos/Javed_Viaggi.svg"
        divisionName="Javed Viaggi"
        description={footerT.description}
        linksTitle={footerT.links_title}
        links={footerT.links.map((l: { href: string; label: string }) => ({
          ...l,
          href: l.href.replace(/^\/viaggi/, base),
        }))}
        copyright={footerT.copyright}
        accentColor="teal"
      />
    </>
  );
}
