"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/lib/useI18n';
import { useLanguage } from '@/lib/LanguageContext';

export default function Home() {
  const { t, loading } = useI18n('home');
  const { locale } = useLanguage();
  const l = (path: string) => `/${locale}${path}`;

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-reveal').forEach(el => revealObserver.observe(el));
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
    };
  }, [loading]);

  if (loading || !t) return (
    <div className="min-h-screen bg-navy flex items-center justify-center text-white text-3xl font-black animate-pulse italic">
        JAVED GROUP
    </div>
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-teal/20 rounded-full blur-[120px] animate-pulse duration-[10s]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-skyblue/10 rounded-full blur-[100px] animate-pulse duration-[15s]"></div>
          <Image
            src="/assets/hero_bg.png"
            alt="Hero Background"
            fill
            className="object-cover mix-blend-overlay opacity-30 scale-110"
            style={{ transform: `translateY(${scrollY * 0.1}px) scale(1.1)` }}
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="animate-reveal">
              <span className="inline-block px-4 py-1.5 bg-teal/10 text-teal-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-teal/20">
                {t.hero.badge}
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8"
                dangerouslySetInnerHTML={{ __html: t.hero.title }}>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl font-light">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link href={l('/services')} className="btn-premium bg-lime text-navy text-lg shadow-xl shadow-lime/20 hover:scale-105">
                  {t.hero.cta_primary}
                </Link>
                <Link href={l('/contact')} className="btn-premium bg-white/5 border border-white/20 text-white text-lg backdrop-blur-md hover:bg-white/10">
                  {t.hero.cta_secondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-20 bg-white border-b border-gray-50 italic">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 font-black text-center">
          <div className="animate-reveal">
            <div className="text-5xl mb-2 text-navy">{t.stats.values.foundation}</div>
            <div className="text-xs uppercase tracking-widest text-gray-400">{t.stats.foundation}</div>
          </div>
          <div className="animate-reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="text-5xl mb-2 text-teal">{t.stats.values.business}</div>
            <div className="text-xs uppercase tracking-widest text-gray-400">{t.stats.business}</div>
          </div>
          <div className="animate-reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="text-5xl mb-2 text-navy">{t.stats.values.clients}</div>
            <div className="text-xs uppercase tracking-widest text-gray-400">{t.stats.clients}</div>
          </div>
          <div className="animate-reveal" style={{ transitionDelay: '0.3s' }}>
            <div className="text-5xl mb-2 text-lime">{t.stats.values.commitment}</div>
            <div className="text-xs uppercase tracking-widest text-gray-400">{t.stats.commitment}</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servizi" className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 animate-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 italic">{t.services.title}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">{t.services.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Viaggi */}
            <div className="service-card animate-reveal bg-white text-navy group">
              <div className="h-16 w-auto mb-8 transition-transform duration-500 group-hover:scale-110 relative">
                <Image src="/logos/Javed_Viaggi.svg" alt="Javed Viaggi" width={150} height={60} className="h-full w-auto object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t.services.viaggi.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">{t.services.viaggi.description}</p>
              <Link href={l('/viaggi')} className="text-navy font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-teal transition-colors">
                {t.services.view_site} &rarr;
              </Link>
            </div>

            {/* Agenzia */}
            <div className="service-card animate-reveal bg-white text-navy group">
              <div className="h-16 w-auto mb-8 transition-transform duration-500 group-hover:scale-110 relative">
                <Image src="/logos/Agenzia_Javed.svg" alt="Agenzia Javed" width={150} height={60} className="h-full w-auto object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t.services.agenzia.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">{t.services.agenzia.description}</p>
              <Link href={l('/agenzia')} className="text-navy font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-skyblue transition-colors">
                {t.services.view_site} &rarr;
              </Link>
            </div>

            {/* Kiwi */}
            <div className="service-card animate-reveal bg-white text-navy group">
              <div className="h-16 w-auto mb-8 transition-transform duration-500 group-hover:scale-110 relative">
                <Image src="/logos/Autoscuole_Kiwi.svg" alt="Autoscuole Kiwi" width={200} height={60} className="h-full w-auto object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t.services.kiwi.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">{t.services.kiwi.description}</p>
              <Link href={l('/kiwi')} className="text-navy font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-lime transition-colors">
                {t.services.view_site} &rarr;
              </Link>
            </div>

            {/* Assicurazioni */}
            <div className="service-card animate-reveal bg-white text-navy group">
              <div className="h-16 w-auto mb-8 transition-transform duration-500 group-hover:scale-110 relative">
                <Image src="/logos/JB_Agency.svg" alt="JB Agency" width={150} height={60} className="h-full w-auto object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t.services.assicurazioni.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">{t.services.assicurazioni.description}</p>
              <Link href={l('/assicurazioni')} className="text-navy font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-teal transition-colors">
                {t.services.view_site} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
