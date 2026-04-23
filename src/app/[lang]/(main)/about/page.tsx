"use client";

import React, { useEffect } from 'react';
import { useI18n } from '@/lib/useI18n';
import { assetPath } from '@/lib/assetPath';

export default function About() {
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
        <main className="pt-20">
            <section className="bg-[#f8fafc] py-24 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-reveal">{t.hero.title}</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light animate-reveal">{t.hero.subtitle}</p>
                </div>
            </section>

            <section className="py-32">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
                    <div className="animate-reveal">
                        <h2 className="text-3xl font-bold mb-8 italic text-navy">{t.story.title}</h2>
                        <p className="text-gray-500 text-lg leading-relaxed mb-6 font-light">{t.story.p1}</p>
                        <p className="text-gray-500 text-lg leading-relaxed font-light">{t.story.p2}</p>
                    </div>
                    <div className="animate-reveal bg-teal/5 p-12 rounded-[3rem] border border-teal/10">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-4xl font-extrabold text-teal mb-2">2013</div>
                                <div className="text-gray-400 text-sm uppercase font-bold tracking-widest">{t.stats.foundation}</div>
                            </div>
                            <div>
                                <div className="text-4xl font-extrabold text-navy mb-2">4+</div>
                                <div className="text-gray-400 text-sm uppercase font-bold tracking-widest">{t.stats.business}</div>
                            </div>
                            <div>
                                <div className="text-4xl font-extrabold text-navy mb-2">5k+</div>
                                <div className="text-gray-400 text-sm uppercase font-bold tracking-widest">{t.stats.clients}</div>
                            </div>
                            <div>
                                <div className="text-4xl font-extrabold text-lime mb-2">100%</div>
                                <div className="text-gray-400 text-sm uppercase font-bold tracking-widest">{t.stats.commitment}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20 animate-reveal">
                        <h2 className="text-3xl font-bold italic mb-6">{t.ecosystem.title}</h2>
                        <p className="text-gray-500 font-light">{t.ecosystem.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 items-center justify-items-center opacity-60 hover:opacity-100 transition-opacity duration-700 animate-reveal">
                        <img src={assetPath("/logos/Javed_Viaggi.svg")} width={150} height={60} className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-500" alt="Javed Viaggi" />
                        <img src={assetPath("/logos/Agenzia_Javed.svg")} width={150} height={60} className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-500" alt="Agenzia Javed" />
                        <img src={assetPath("/logos/Autoscuole_Kiwi.svg")} width={200} height={60} className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-500" alt="Autoscuole Kiwi" />
                        <img src={assetPath("/logos/JB_Agency.svg")} width={150} height={50} className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-500" alt="JB Agency" />
                    </div>
                </div>
            </section>
        </main>
    );
}
