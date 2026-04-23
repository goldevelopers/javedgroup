"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/useI18n';
import { useSiteLink } from '@/lib/useSiteLink';

export default function KiwiServices() {
    const { t, loading } = useI18n('services');
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
        <main className="pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-5xl md:text-7xl font-black mb-12 italic text-center animate-reveal text-navy">
                    {t.hero.title}
                </h1>
                <p className="text-xl text-gray-500 text-center max-w-2xl mx-auto font-light leading-relaxed mb-20 animate-reveal">
                    {t.hero.subtitle}
                </p>

                <div className="space-y-12">
                    {t.items.map((item: any, idx: number) => (
                        <div key={idx}
                            className={`p-12 rounded-[3rem] animate-reveal grid md:grid-cols-3 gap-10 items-center border ${
                                item.theme === 'dark' ? 'bg-navy text-white' : 
                                item.theme === 'skyblue' ? 'bg-skyblue/10 border-skyblue/20' : 
                                'bg-gray-50 border-gray-100'
                            }`}
                            style={{ transitionDelay: `${idx * 0.1}s` }}>
                            <div className="md:col-span-1">
                                <span className={`text-4xl font-black italic ${item.theme === 'dark' ? 'text-lime' : item.theme === 'skyblue' ? 'text-skyblue' : 'text-lime'}`}>
                                    {item.cat}
                                </span>
                                <h3 className={`text-3xl font-bold mt-4 italic ${item.theme === 'dark' ? 'text-white' : 'text-navy'}`}>
                                    {item.title}
                                </h3>
                            </div>
                            <div className={`md:col-span-1 font-light ${item.theme === 'dark' ? 'text-white/70' : 'text-gray-500'}`}>
                                {item.description}
                            </div>
                            <div className="md:col-span-1 flex justify-end">
                                <Link href={l('/contact')} 
                                    className={`btn-premium text-sm ${
                                        item.theme === 'dark' ? 'bg-lime text-navy' : 
                                        item.theme === 'skyblue' ? 'bg-skyblue text-white' : 
                                        'bg-navy text-white'
                                    }`}>
                                    {item.cta}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
