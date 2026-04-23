"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import { useSite } from '@/lib/SiteContext';
import { siteBaseUrls } from '@/lib/siteConfig';

interface NavItem {
  label: string;
  /** Path relative to site root, e.g. '/services', '/contact' */
  href: string;
}

interface DivisionalHeaderProps {
  logo: string;
  divisionName: string;
  navItems: NavItem[];
  ctaText: string;
  accentColor?: string;
  backToGroupLabel: string;
}

const bgAccentClasses: Record<string, string> = {
  teal: 'bg-teal shadow-teal/20',
  lime: 'bg-lime shadow-lime/20',
  skyblue: 'bg-skyblue shadow-skyblue/20',
  navy: 'bg-navy shadow-navy/20',
};

const DivisionalHeader = ({
  logo,
  divisionName,
  navItems,
  ctaText,
  accentColor = 'teal',
  backToGroupLabel,
}: DivisionalHeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale, setLocale, isRTL, availableLocales } = useLanguage();
  const site = useSite();

  // On subdomain sites, links are /{lang}/services etc.
  // On the group site (fallback), links are /{lang}/{division}/services etc.
  const isSubdomain = site !== 'group';
  const l = (path: string) => `/${locale}${path}`;

  // "Back to group" points to the group site's base URL
  const groupUrl = siteBaseUrls['group'];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((v) => !v);
    document.body.classList.toggle('mobile-menu-open', !isMenuOpen);
  };

  const bg = bgAccentClasses[accentColor] ?? bgAccentClasses.teal;

  return (
    <>
      <nav id="navbar" className={`fixed top-0 inset-x-0 z-50 glass ${scrolled ? 'scrolled' : ''}`}>
        <div className={`max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
          <Link href={l('')} className="flex items-center gap-4 group">
            <Image src={logo} alt={divisionName} width={150} height={40} className="h-10 w-auto object-contain" />
          </Link>

          <div className="hidden lg:flex items-center gap-8 font-bold">
            {navItems.map((item, idx) => (
              <Link key={idx} href={l(item.href)} className="text-xs uppercase tracking-widest hover:text-teal transition-colors">
                {item.label}
              </Link>
            ))}

            <div className="h-4 w-[1px] bg-gray-200" />

            {/* Back to group — external link on subdomain, internal on group site */}
            {isSubdomain ? (
              <a href={`${groupUrl}/${locale}`} className="text-gray-400 hover:text-teal transition-colors lowercase italic font-normal text-sm">
                {isRTL ? '→' : '←'} {backToGroupLabel}
              </a>
            ) : (
              <Link href={l('')} className="text-gray-400 hover:text-teal transition-colors lowercase italic font-normal text-sm">
                {isRTL ? '→' : '←'} {backToGroupLabel}
              </Link>
            )}

            {/* Dynamic language switcher */}
            <div className="flex gap-2 text-[10px] uppercase tracking-tighter border-x border-gray-100 px-4">
              {availableLocales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocale(loc)}
                  className={locale === loc ? 'text-teal underline' : 'text-gray-400 hover:text-navy'}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>

            <Link href={l('/contact')} className={`btn-premium ${bg} text-white text-xs shadow-sm`}>
              {ctaText}
            </Link>
          </div>

          <button onClick={toggleMenu} className="lg:hidden p-2 text-navy hover:text-teal transition-colors focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-[40] bg-navy/95 backdrop-blur-xl transition-transform duration-500 lg:hidden flex flex-col items-center justify-center text-white p-12 ${isMenuOpen ? 'translate-x-0' : isRTL ? '-translate-x-full' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-8 text-center">
          {navItems.map((item, idx) => (
            <Link key={idx} href={l(item.href)} onClick={toggleMenu} className="text-2xl font-bold hover:text-teal transition-colors">
              {item.label}
            </Link>
          ))}
          <div className="h-[1px] w-12 bg-white/20 mx-auto" />
          {isSubdomain ? (
            <a href={`${groupUrl}/${locale}`} onClick={toggleMenu} className="text-lg font-medium text-gray-400 italic">
              {backToGroupLabel}
            </a>
          ) : (
            <Link href={l('')} onClick={toggleMenu} className="text-lg font-medium text-gray-400 italic">
              {backToGroupLabel}
            </Link>
          )}

          <div className="flex justify-center gap-6 mt-4">
            {availableLocales.map((loc) => (
              <button
                key={loc}
                onClick={() => { setLocale(loc); toggleMenu(); }}
                className={locale === loc ? 'text-teal font-bold border-b-2 border-teal pb-1' : 'text-gray-400 font-bold'}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>

          <Link href={l('/contact')} onClick={toggleMenu} className={`btn-premium ${bg} text-white mt-4`}>
            {ctaText}
          </Link>
        </div>
      </div>
    </>
  );
};

export default DivisionalHeader;
