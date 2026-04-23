"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/useI18n';
import { assetPath } from '@/lib/assetPath';
import { useLanguage } from '@/lib/LanguageContext';

export default function ServicesPage() {
    const { t, loading } = useI18n('services');
    const { locale } = useLanguage();
    const l = (path: string) => `/${locale}${path}`;

    useEffect(() => {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate-reveal').forEach(el => revealObserver.observe(el));
        return () => revealObserver.disconnect();
    }, [loading]);

    if (loading || !t) return <div className="min-h-screen bg-navy flex items-center justify-center text-white">Loading...</div>;

    return (
        <main className="pt-20">
            <section className="bg-navy py-24 relative overflow-hidden text-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal/10 rounded-full blur-[120px]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 animate-reveal">{t.hero.title}</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light animate-reveal">{t.hero.subtitle}</p>
                </div>
            </section>

            {/* Viaggi */}
            <section id="viaggi" className="service-section py-32 border-b border-gray-50 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
                    <div className="animate-reveal">
                        <div className="h-24 w-auto mb-8 relative">
                            <img src={assetPath("/logos/Javed_Viaggi.svg")} width={200} height={80} className="h-full w-auto object-contain" alt="Javed Viaggi" />
                        </div>
                        <h2 className="text-4xl font-extrabold mb-8 italic">{t.viaggi.title}</h2>
                        <p className="text-gray-500 text-lg leading-relaxed mb-10 font-light">{t.viaggi.description}</p>
                        <div className="flex flex-wrap gap-4">
                            <a href="tel:+390331781723" className="btn-premium bg-navy text-white hover:bg-teal transition-all shadow-lg shadow-navy/10">
                                {t.viaggi.cta_call}
                            </a>
                            <Link href={l('/viaggi')} className="btn-premium border border-navy/10 text-navy hover:bg-navy/5 italic">
                                {t.viaggi.cta_visit}
                            </Link>
                        </div>
                    </div>
                    <div className="animate-reveal">
                        <img src={assetPath("/assets/viaggi.png")} width={600} height={400} className="rounded-[3rem] shadow-2xl transition-transform duration-700 hover:scale-[1.02]" alt="Javed Viaggi" />
                    </div>
                </div>
            </section>

            {/* Agenzia */}
            <section id="agenzia" className="service-section py-32 bg-gray-50/50 border-b border-gray-50 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse gap-20 items-center">
                    <div className="md:w-1/2 animate-reveal">
                        <div className="h-24 w-auto mb-8 relative">
                            <img src={assetPath("/logos/Agenzia_Javed.svg")} width={200} height={80} className="h-full w-auto object-contain" alt="Agenzia Javed" />
                        </div>
                        <h2 className="text-4xl font-extrabold mb-8 italic">{t.agenzia.title}</h2>
                        <p className="text-gray-500 text-lg leading-relaxed mb-10 font-light">{t.agenzia.description}</p>
                        <div className="flex flex-wrap gap-4">
                            <a href="tel:+390331245274" className="btn-premium bg-skyblue text-white shadow-xl shadow-skyblue/20 transition-all">
                                {t.agenzia.cta_call}
                            </a>
                            <Link href={l('/agenzia')} className="btn-premium border border-navy/10 text-navy hover:bg-navy/5 italic">
                                {t.agenzia.cta_visit}
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 animate-reveal">
                        <img src={assetPath("/assets/agenzia.png")} width={600} height={400} className="rounded-[3rem] shadow-2xl transition-transform duration-700 hover:scale-[1.02]" alt="Agenzia Javed" />
                    </div>
                </div>
            </section>

            {/* Kiwi */}
            <section id="autoscuola" className="service-section py-32 border-b border-gray-50 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
                    <div className="animate-reveal">
                        <div className="h-24 w-auto mb-8 relative">
                            <img src={assetPath("/logos/Autoscuole_Kiwi.svg")} width={250} height={80} className="h-full w-auto object-contain" alt="Autoscuole Kiwi" />
                        </div>
                        <h2 className="text-4xl font-extrabold mb-8 italic">{t.kiwi.title}</h2>
                        <p className="text-gray-500 text-lg leading-relaxed mb-10 font-light">{t.kiwi.description}</p>
                        <div className="flex flex-wrap gap-4">
                            <a href="tel:0331797139" className="btn-premium bg-lime text-navy shadow-lg shadow-lime/20 transition-all">
                                {t.kiwi.cta_call}
                            </a>
                            <Link href={l('/kiwi')} className="btn-premium border border-navy/10 text-navy hover:bg-navy/5 italic">
                                {t.kiwi.cta_visit}
                            </Link>
                        </div>
                    </div>
                    <div className="animate-reveal">
                        <img src={assetPath("/assets/kiwi.png")} width={600} height={400} className="rounded-[3rem] shadow-2xl transition-transform duration-700 hover:scale-[1.02]" alt="Autoscuole Kiwi" />
                    </div>
                </div>
            </section>

            {/* Assicurazioni */}
            <section id="assicurazioni" className="service-section py-32 bg-navy text-white scroll-mt-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse gap-20 items-center">
                    <div className="md:w-1/2 animate-reveal">
                        <div className="h-24 w-auto mb-8 brightness-0 invert relative">
                            <img src={assetPath("/logos/JB_Agency.svg")} width={200} height={80} className="h-full w-auto object-contain" alt="JB Agency" />
                        </div>
                        <h2 className="text-4xl font-extrabold mb-8 italic">{t.assicurazioni.title}</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light">{t.assicurazioni.description}</p>
                        <div className="flex flex-wrap gap-4">
                            <a href="tel:0331701610" className="btn-premium bg-teal text-white shadow-xl shadow-teal/20 transition-all">
                                {t.assicurazioni.cta_call}
                            </a>
                            <Link href={l('/assicurazioni')} className="btn-premium border border-white/20 text-white hover:bg-white/5 italic">
                                {t.assicurazioni.cta_visit}
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 animate-reveal">
                        <img src={assetPath("/assets/jb_agency.png")} width={600} height={400} className="rounded-[3rem] opacity-90 border border-white/5 transition-transform duration-700 hover:scale-[1.02]" alt="JB Agency" />
                    </div>
                </div>
            </section>
        </main>
    );
}
