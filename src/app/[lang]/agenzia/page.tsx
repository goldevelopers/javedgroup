"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/useI18n';
import { useSiteLink } from '@/lib/useSiteLink';

export default function AgenziaHome() {
    const { t, loading } = useI18n('home');
    const l = useSiteLink('agenzia');

    useEffect(() => {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate-reveal').forEach(el => revealObserver.observe(el));
        return () => revealObserver.disconnect();
    }, [loading]);

    if (loading || !t) return <div className="min-h-screen bg-navy flex items-center justify-center text-white">Loading...</div>;

    return (
        <main>
            {/* Hero Section */}
            <section className="min-h-screen relative flex items-center pt-24 pb-32 overflow-hidden bg-gray-50/50">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-skyblue/5 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[10%] left-[5%] w-[600px] h-[600px] bg-navy/5 rounded-full blur-[120px]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-20 items-center">
                    <div className="animate-reveal">
                        <span className="inline-block py-2 px-4 bg-skyblue/10 border border-skyblue/20 rounded-full text-skyblue text-xs font-bold tracking-widest uppercase mb-8">
                            {t.hero.badge}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-navy leading-[1.1] mb-8 italic" dangerouslySetInnerHTML={{ __html: t.hero.title }}></h1>
                        <p className="text-xl text-gray-500 font-light leading-relaxed mb-12 max-w-xl">
                            {t.hero.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <Link href={l('/services')} className="btn-premium bg-navy text-white shadow-xl shadow-navy/20">
                                {t.hero.cta_primary}
                            </Link>
                            <Link href={l('/contact')} className="btn-premium border border-navy/10 text-navy hover:bg-navy/5 italic font-medium">
                                {t.hero.cta_secondary}
                            </Link>
                        </div>
                    </div>
                    <div className="hidden lg:block animate-reveal relative px-10">
                        <div className="absolute inset-0 bg-navy/5 rounded-[4rem] translate-x-6 translate-y-6 -z-10"></div>
                        <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80"
                            className="rounded-[4rem] shadow-premium h-[600px] w-full object-cover"
                            alt="Supporto Amministrativo" />
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24 animate-reveal">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 italic">{t.highlights.title}</h2>
                        <p className="text-gray-500 font-light text-lg max-w-2xl mx-auto">
                            {t.highlights.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {t.highlights.items.map((item: any, idx: number) => (
                            <div key={idx} className="p-12 rounded-[3.5rem] bg-gray-50 hover:bg-white hover:shadow-premium transition-all duration-500 group animate-reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
                                <div className={`w-16 h-16 ${idx === 0 ? 'bg-skyblue shadow-skyblue/20' : idx === 1 ? 'bg-navy shadow-navy/20' : 'bg-teal shadow-teal/20'} rounded-2xl flex items-center justify-center mb-10 text-white shadow-lg`}>
                                    {idx === 0 ? (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                        </svg>
                                    ) : idx === 1 ? (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                        </svg>
                                    ) : (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z"></path>
                                        </svg>
                                    )}
                                </div>
                                <h3 className="text-3xl font-extrabold mb-6 italic">{item.title}</h3>
                                <p className="text-gray-500 font-light mb-8 group-hover:text-gray-600 transition-colors">
                                    {item.description}
                                </p>
                                <Link href={l('/services')} className={`${idx === 0 ? 'text-skyblue border-skyblue' : idx === 1 ? 'text-navy border-navy' : 'text-teal border-teal'} font-bold text-xs uppercase tracking-widest border-b pb-1`}>
                                    {item.link} &rarr;
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-navy">
                <div className="max-w-5xl mx-auto px-6 text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-10 italic animate-reveal">
                        {t.cta.title}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6 animate-reveal">
                        <a href="tel:+390331245274" className="btn-premium bg-skyblue text-white text-lg px-12">
                            {t.cta.phone_label}
                        </a>
                        <Link href={l('/contact')} className="btn-premium bg-white text-navy text-lg px-12 italic">
                            {t.cta.button}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
