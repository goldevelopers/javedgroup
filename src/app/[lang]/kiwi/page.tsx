"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/useI18n';
import { useSiteLink } from '@/lib/useSiteLink';

export default function KiwiHome() {
    const { t, loading } = useI18n('home');
    const l = useSiteLink('kiwi');

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
            <section className="min-h-screen relative flex items-center pt-32 pb-32 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="animate-reveal">
                            <span className="inline-block py-2 px-4 bg-lime/10 border border-lime/20 rounded-full text-lime text-xs font-bold tracking-widest uppercase mb-8">
                                {t.hero.badge}
                            </span>
                            <h1 className="text-6xl md:text-9xl font-black text-navy leading-[1.0] mb-8 italic" dangerouslySetInnerHTML={{ __html: t.hero.title }}></h1>
                            <p className="text-xl text-gray-500 font-light leading-relaxed mb-12 max-w-xl">
                                {t.hero.subtitle}
                            </p>
                            <div className="flex flex-wrap gap-6">
                                <Link href={l('/services')} className="btn-premium bg-navy text-white shadow-xl shadow-navy/20">
                                    {t.hero.cta_primary}
                                </Link>
                                <Link href={l('/contact')} className="btn-premium border border-navy/10 text-navy hover:bg-navy/5 italic text-sm px-10">
                                    {t.hero.cta_secondary}
                                </Link>
                            </div>
                        </div>
                        <div className="relative animate-reveal" style={{ transitionDelay: '0.2s' }}>
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-lime/10 rounded-full blur-[100px]"></div>
                            <div className="relative rounded-[4rem] overflow-hidden shadow-premium">
                                <img src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80"
                                    className="w-full h-[600px] object-cover" alt="Driving Lesson" />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white border-b border-gray-100 italic">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 font-black text-center">
                    {t.stats.map((stat: any, idx: number) => (
                        <div key={idx} className="animate-reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
                            <div className={`text-5xl mb-2 ${idx % 2 === 0 ? 'text-navy' : idx === 1 ? 'text-lime' : 'text-teal'}`}>{stat.value}</div>
                            <div className="text-xs uppercase tracking-widest text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Patenti Section */}
            <section className="py-32 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 animate-reveal">
                        <h2 className="text-4xl md:text-6xl font-black italic text-navy">{t.patenti.title}</h2>
                        <p className="text-gray-500 font-light max-w-md mt-6 md:mt-0">
                            {t.patenti.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {t.patenti.items.map((item: any, idx: number) => (
                            <div key={idx} className="group bg-white p-10 rounded-[3rem] shadow-premium hover:bg-lime transition-all duration-500 animate-reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
                                <div className={`text-5xl font-black mb-8 ${item.color} group-hover:text-navy transition-colors italic`}>
                                    {item.cat}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 italic group-hover:text-navy">{item.title}</h3>
                                <p className="text-gray-500 font-light group-hover:text-navy/70 transition-colors">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
