"use client";

import React, { useEffect } from 'react';
import { useI18n } from '@/lib/useI18n';

export default function AssicurazioniAbout() {
    const { t, loading } = useI18n('about');

    useEffect(() => {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate-reveal').forEach(el => revealObserver.observe(el));
        return () => revealObserver.disconnect();
    }, [loading]);

    if (loading || !t) return <div className="min-h-screen bg-navy flex items-center justify-center text-white">Loading...</div>;

    return (
        <main className="pt-32 pb-24">
            <section className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
                    <div className="animate-reveal">
                        <span className="text-teal font-bold uppercase tracking-widest text-xs mb-4 block italic">
                            {t.hero.badge}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-10 italic text-navy">
                            {t.hero.title}
                        </h1>
                        <p className="text-gray-500 text-xl font-light leading-relaxed mb-6">
                            {t.hero.p1}
                        </p>
                        <p className="text-gray-500 text-lg font-light leading-relaxed">
                            {t.hero.p2}
                        </p>
                    </div>
                    <div className="animate-reveal relative px-10">
                        <img src="/images/about/assicurazioni.png"
                            className="rounded-[4rem] shadow-premium h-[600px] w-full object-cover" alt="Elite Consulting Team" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-reveal">
                    <div className="p-12 bg-gray-50 rounded-[3rem] border border-gray-100">
                        <h3 className="text-2xl font-bold mb-6 italic text-teal">{t.sections.values.title}</h3>
                        <p className="text-gray-500 font-light leading-relaxed">{t.sections.values.text}</p>
                    </div>
                    <div className="p-12 bg-navy rounded-[3rem] text-white">
                        <h3 className="text-2xl font-bold mb-6 italic">{t.sections.integration.title}</h3>
                        <p className="text-white/80 font-light leading-relaxed">{t.sections.integration.text}</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
