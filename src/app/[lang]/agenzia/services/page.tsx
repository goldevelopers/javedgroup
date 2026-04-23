"use client";

import React, { useEffect } from 'react';
import { useI18n } from '@/lib/useI18n';

export default function AgenziaServices() {
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
        <main className="pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-5xl md:text-7xl font-black mb-20 italic text-center animate-reveal text-navy">
                    {t.hero.title}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-gray-50 rounded-[3rem] p-12 animate-reveal border border-gray-100">
                        <h3 className="text-3xl font-extrabold mb-8 italic text-navy">{t.fiscale.title}</h3>
                        <ul className="space-y-6 text-gray-500 font-light text-lg">
                            {t.fiscale.items.map((item: string, idx: number) => (
                                <li key={idx} className="flex items-center gap-4">
                                    <span className="w-2 h-2 bg-skyblue rounded-full"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gray-50 rounded-[3rem] p-12 animate-reveal border border-gray-100">
                        <h3 className="text-3xl font-extrabold mb-8 italic text-navy">{t.previdenza.title}</h3>
                        <ul className="space-y-6 text-gray-500 font-light text-lg">
                            {t.previdenza.items.map((item: string, idx: number) => (
                                <li key={idx} className="flex items-center gap-4">
                                    <span className="w-2 h-2 bg-navy rounded-full"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gray-50 rounded-[3rem] p-12 animate-reveal md:col-span-2 border border-gray-100">
                        <h3 className="text-3xl font-extrabold mb-8 italic text-navy">{t.amministrative.title}</h3>
                        <div className="grid md:grid-cols-2 gap-10">
                            <p className="text-gray-500 font-light text-lg leading-relaxed">
                                {t.amministrative.description}
                            </p>
                            <ul className="space-y-4 text-gray-500 font-light italic text-lg">
                                {t.amministrative.items.map((item: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-4">
                                        <span className="w-2 h-2 bg-teal rounded-full"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
