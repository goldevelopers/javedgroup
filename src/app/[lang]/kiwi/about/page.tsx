"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import { useI18n } from '@/lib/useI18n';
import { assetPath } from '@/lib/assetPath';

export default function KiwiAbout() {
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
                        <span className="text-lime font-bold uppercase tracking-widest text-xs mb-4 block italic">
                            {t.hero.badge}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-10 italic text-navy underline decoration-lime decoration-8 underline-offset-8">
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
                        <img src={assetPath("/images/about/kiwi.png")}
                            className="rounded-[3.5rem] shadow-premium h-[600px] w-full object-cover" alt="Driving Lesson" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-reveal text-center">
                    {t.features.map((feature: any, idx: number) => (
                        <div key={idx} className={`p-12 rounded-[3rem] border border-gray-100 ${idx === 1 ? 'bg-navy text-white' : 'bg-gray-50 text-navy'}`}>
                            <div className="text-4xl mb-6">{feature.icon}</div>
                            <h3 className="text-2xl font-black mb-4 italic">{feature.title}</h3>
                            <p className={`${idx === 1 ? 'text-white/70' : 'text-gray-500'} font-light leading-relaxed`}>
                                {feature.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
