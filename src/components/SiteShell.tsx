"use client";

/**
 * SiteShell
 * Renders the correct chrome (header + footer) based on which site is active.
 *
 * - group site  → group Header + Footer wrapping <main>
 * - divisional  → no wrapper (each divisional layout provides its own header/footer)
 */

import React from 'react';
import type { SiteKey } from '@/lib/siteConfig';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Props {
  site: SiteKey;
  children: React.ReactNode;
}

export default function SiteShell({ site, children }: Props) {
  if (site === 'group') {
    return (
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    );
  }

  // Divisional sites manage their own header/footer inside their layout
  return <>{children}</>;
}
