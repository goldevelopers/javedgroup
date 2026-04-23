"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import { useI18n } from '@/lib/useI18n';

export default function AssicurazioniServices() {
    const { t, loading } = useI18n('services');

    useEffect(() => {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate-reveal').forEach(el => revealObserver.observe(el));
        return () => revealObserver.disconnect();
    }, [loading]);

    if (loading || !t) return <div className="min-h-screen bg-navy flex items-center justify-center text-white">Loading...</div>;

    return (
        <main className="pt-32 pb-24 text-navy">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-5xl md:text-7xl font-black mb-12 italic text-center animate-reveal">
                    {t.hero.title}
                </h1>
                <p className="text-xl text-gray-500 text-center max-w-2xl mx-auto font-light leading-relaxed mb-20 animate-reveal">
                    {t.hero.subtitle}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {t.groups.map((group: any, idx: number) => (
                        <div key={idx} 
                            className={`p-12 rounded-[4rem] animate-reveal ${group.theme === 'dark' ? 'bg-navy text-white' : 'bg-gray-50 border border-gray-100'}`}
                            style={{ transitionDelay: `${idx * 0.1}s` }}>
                            <h3 className="text-3xl font-black mb-8 italic text-teal">{group.title}</h3>
                            <ul className={`space-y-4 font-light text-lg ${group.theme === 'dark' ? 'text-white/70' : 'text-gray-500'}`}>
                                {group.items.map((item: string, iIdx: number) => (
                                    <li key={iIdx} className="flex items-center gap-3">
                                        <span className={`w-1.5 h-1.5 bg-teal rounded-full`}></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
