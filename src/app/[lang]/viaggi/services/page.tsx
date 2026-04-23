"use client";

import React, { useEffect } from 'react';
import { useI18n } from '@/lib/useI18n';

export default function ViaggiServices() {
    const { t, loading } = useI18n('services');

    useEffect(() => {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate-reveal').forEach(el => revealObserver.observe(el));
        return () => revealObserver.disconnect();
    }, [loading]);

    if (loading || !t) return <div className="min-h-screen bg-navy flex items-center justify-center text-white">Loading...</div>;

    const services = [
        {
            data: t.flights,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
            ),
            theme: 'bg-teal shadow-teal/20 text-white',
            cardTheme: 'bg-gray-50 border-gray-100'
        },
        {
            data: t.visas,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            ),
            theme: 'bg-white text-navy shadow-white/10',
            cardTheme: 'bg-navy border-white/5 text-white',
            listTheme: 'text-gray-300'
        },
        {
            data: t.packages,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"></path>
                </svg>
            ),
            theme: 'bg-skyblue shadow-skyblue/20 text-white',
            cardTheme: 'bg-gray-50 border-gray-100'
        },
        {
            data: t.emergency,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            ),
            theme: 'bg-lime shadow-lime/20 text-navy',
            cardTheme: 'bg-gray-50 border-gray-100'
        }
    ];

    return (
        <main className="pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24 animate-reveal">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 italic text-navy leading-tight">
                        {t.hero.title}
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                        {t.hero.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {services.map((service, idx) => (
                        <div key={idx} className={`${service.cardTheme} rounded-[3rem] p-12 border animate-reveal`} style={{ transitionDelay: `${idx * 0.1}s` }}>
                            <div className={`w-16 h-16 ${service.theme} rounded-2xl flex items-center justify-center mb-8 shadow-lg`}>
                                {service.icon}
                            </div>
                            <h3 className="text-3xl font-extrabold mb-6 italic">{service.data.title}</h3>
                            <p className={`${service.listTheme || 'text-gray-500'} font-light leading-relaxed mb-8`}>
                                {service.data.description}
                            </p>
                            <ul className={`space-y-4 ${service.listTheme || 'text-gray-500'} font-light italic`}>
                                {service.data.features.map((feature: string, fidx: number) => (
                                    <li key={fidx} className="flex items-center gap-3">
                                        <span className={`w-1.5 h-1.5 rounded-full ${idx === 3 ? 'bg-lime' : idx === 2 ? 'bg-skyblue' : 'bg-teal'}`}></span>
                                        {feature}
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
