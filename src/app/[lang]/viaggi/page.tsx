"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/useI18n';
import { useSiteLink } from '@/lib/useSiteLink';

export default function ViaggiHome() {
    const { t, loading } = useI18n('home');
    const l = useSiteLink('viaggi');

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
                            <span className="inline-block py-2 px-4 bg-teal/10 border border-teal/20 rounded-full text-teal text-xs font-bold tracking-widest uppercase mb-8">
                                {t.hero.badge}
                            </span>
                            <h1 className="text-6xl md:text-8xl font-black text-navy leading-[1.0] mb-8 italic" dangerouslySetInnerHTML={{ __html: t.hero.title }}></h1>
                            <p className="text-xl text-gray-500 font-light leading-relaxed mb-12 max-w-xl">
                                {t.hero.subtitle}
                            </p>
                            <div className="flex flex-wrap gap-6">
                                <Link href={l('/services')} className="btn-premium bg-navy text-white shadow-xl shadow-navy/20">
                                    {t.hero.cta_primary}
                                </Link>
                                <Link href={l('/contact')} className="btn-premium border border-navy/10 text-navy hover:bg-navy/5 italic">
                                    {t.hero.cta_secondary}
                                </Link>
                            </div>
                        </div>
                        <div className="relative animate-reveal" style={{ transitionDelay: '0.2s' }}>
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal/10 rounded-full blur-[100px]"></div>
                            <div className="relative rounded-[4rem] overflow-hidden shadow-premium">
                                <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
                                    className="w-full h-[600px] object-cover" alt="Travel Landscape" />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Destinations */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 animate-reveal">
                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 italic">{t.featured.title}</h2>
                            <p className="text-gray-500 font-light text-lg">{t.featured.subtitle}</p>
                        </div>
                        <Link href={l('/services')} className="text-teal font-bold uppercase tracking-widest text-xs border-b-2 border-teal pb-2 mt-8 md:mt-0">
                            {t.featured.view_all} &rarr;
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {t.featured.items.map((item: any, idx: number) => (
                            <div key={idx} className="group cursor-pointer animate-reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
                                <div className="relative h-[450px] overflow-hidden rounded-[3rem] shadow-premium mb-8">
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent z-10"></div>
                                    <img src={item.image}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt={item.name} />
                                    <div className="absolute bottom-10 left-10 z-20">
                                        <span className="text-teal font-bold text-xs uppercase tracking-widest mb-2 block">{item.tag}</span>
                                        <h3 className="text-3xl font-bold text-white italic">{item.name}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-teal">
                <div className="max-w-5xl mx-auto px-6 text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-10 italic animate-reveal">
                        {t.cta.title}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6 animate-reveal">
                        <a href="tel:+390331781723" className="btn-premium bg-navy text-white text-lg px-12 italic tracking-tight">
                            {t.cta.phone_label}
                        </a>
                        <Link href={l('/contact')} className="btn-premium bg-white text-teal text-lg px-12 italic">
                            {t.cta.button}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
