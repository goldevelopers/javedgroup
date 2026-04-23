"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/useI18n';
import { useSiteLink } from '@/lib/useSiteLink';

export default function AssicurazioniHome() {
    const { t, loading } = useI18n('home');
    const l = useSiteLink('assicurazioni');

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
            <section className="min-h-screen relative flex items-center pt-24 pb-32 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-20 items-center">
                    <div className="animate-reveal">
                        <span className="inline-block py-2 px-4 bg-teal/10 border border-teal/20 rounded-full text-teal text-xs font-bold tracking-widest uppercase mb-8">
                            {t.hero.badge}
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black text-navy leading-[0.9] mb-8 italic" dangerouslySetInnerHTML={{ __html: t.hero.title }}></h1>
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
                    <div className="hidden lg:block animate-reveal relative">
                        <div className="absolute -inset-10 bg-gray-50 rounded-[4rem] rotate-3 -z-10"></div>
                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
                            className="rounded-[4rem] shadow-premium h-[600px] w-full object-cover" alt="Elite Consulting" />
                        <div className="absolute bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl animate-bounce shadow-teal/10 border border-gray-100">
                            <div className="text-teal font-black text-3xl">100%</div>
                            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Client Satisfaction</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-32 bg-navy text-white rounded-[4rem] mx-6 mb-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24 animate-reveal">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 italic underline decoration-teal decoration-4 underline-offset-8">
                            {t.services_grid.title}
                        </h2>
                        <p className="text-gray-400 font-light text-xl max-w-2xl mx-auto">
                            {t.services_grid.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {t.services_grid.items.map((item: any, idx: number) => (
                            <div key={idx} className="p-12 rounded-[4rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 group animate-reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
                                <div className={`w-16 h-16 ${item.theme === 'teal' ? 'bg-teal' : 'bg-skyblue'} rounded-2xl flex items-center justify-center mb-10 text-white`}>
                                    {item.theme === 'teal' ? (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                        </svg>
                                    ) : (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                        </svg>
                                    )}
                                </div>
                                <h3 className="text-3xl font-extrabold mb-6 italic">{item.title}</h3>
                                <p className="text-gray-400 font-light text-lg mb-8">{item.description}</p>
                                <ul className="space-y-4 mb-10 text-gray-300 italic">
                                    {item.features.map((feat: string, fIdx: number) => (
                                        <li key={fIdx} className="flex items-center gap-3">
                                            <span className={`w-1.5 h-1.5 ${item.theme === 'teal' ? 'bg-teal' : 'bg-skyblue'} rounded-full`}></span>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                <Link href={l('/services')} className={`${item.theme === 'teal' ? 'text-teal border-teal' : 'text-skyblue border-skyblue'} font-bold uppercase tracking-widest text-xs border-b pb-1`}>
                                    {item.link_label} &rarr;
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Us Approach */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="animate-reveal">
                            <h2 className="text-5xl font-black mb-10 italic" dangerouslySetInnerHTML={{ __html: t.why_us.title }}></h2>
                            <p className="text-gray-500 text-xl font-light leading-relaxed mb-8">
                                {t.why_us.description}
                            </p>
                            <div className="space-y-6">
                                {t.why_us.steps.map((step: any, idx: number) => (
                                    <div key={idx} className="flex gap-6 items-start">
                                        <div className="text-teal font-black text-2xl tracking-tighter italic">{step.number}</div>
                                        <div>
                                            <h4 className="font-bold text-navy mb-2">{step.title}</h4>
                                            <p className="text-gray-400 text-sm font-light">{step.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="animate-reveal">
                            <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80"
                                className="rounded-[4rem] shadow-premium h-[500px] w-full object-cover" alt="Elite Consulting Approach" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
