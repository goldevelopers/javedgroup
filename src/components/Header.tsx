"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/useI18n';
import { useLanguage } from '@/lib/LanguageContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale, setLocale, availableLocales } = useLanguage();
  const { t, loading } = useI18n('header');

  const l = (path: string) => `/${locale}${path}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((v) => !v);
    document.body.classList.toggle('mobile-menu-open', !isMenuOpen);
  };

  if (loading || !t) return null;

  return (
    <>
      <nav id="navbar" className={`fixed top-0 inset-x-0 z-50 glass ${scrolled ? 'scrolled' : ''}`}>
        <div className={`max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
          <Link href={l('')} className="flex items-center gap-3 group">
            <div className="h-10 w-10 bg-navy rounded-xl flex items-center justify-center group-hover:bg-teal transition-all duration-500">
              <span className="text-white font-extrabold text-xl">J</span>
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase">JAVED <span className="text-teal">GROUP</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <Link href={l('')} className="text-sm font-semibold hover:text-teal transition-colors">{t.nav.home}</Link>
            <Link href={l('/services')} className="text-sm font-semibold hover:text-teal transition-colors">{t.nav.services}</Link>
            <Link href={l('/about')} className="text-sm font-semibold hover:text-teal transition-colors">{t.nav.about}</Link>
            <Link href={l('/contact')} className="text-sm font-semibold hover:text-teal transition-colors">{t.nav.contact}</Link>

            {/* Dynamic language switcher — only shows enabled locales */}
            <div className="flex gap-2 text-[10px] font-bold uppercase tracking-tighter border-x border-gray-100 px-4">
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

            <Link href={l('/contact')} className="btn-premium bg-lime text-navy text-sm shadow-sm hover:shadow-lime/20">
              {t.cta}
            </Link>
          </div>

          <button onClick={toggleMenu} className="md:hidden p-2 text-navy hover:text-teal transition-colors focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-[40] bg-navy/95 backdrop-blur-xl transition-transform duration-500 md:hidden flex flex-col items-center justify-center text-white ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-10 text-center">
          <Link href={l('')} onClick={toggleMenu} className="text-3xl font-bold hover:text-teal transition-colors">{t.nav.home}</Link>
          <Link href={l('/about')} onClick={toggleMenu} className="text-3xl font-bold hover:text-teal transition-colors">{t.nav.about}</Link>
          <Link href={l('/services')} onClick={toggleMenu} className="text-3xl font-bold hover:text-teal transition-colors">{t.nav.services}</Link>
          <Link href={l('/contact')} onClick={toggleMenu} className="text-3xl font-bold hover:text-teal transition-colors">{t.nav.contact}</Link>

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

          <Link href={l('/contact')} onClick={toggleMenu} className="btn-premium bg-lime text-navy text-xl mt-4">{t.cta}</Link>
        </div>
      </div>
    </>
  );
};

export default Header;
