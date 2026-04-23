"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import { useI18n } from '@/lib/useI18n';

interface LegalPageProps {
    type: 'privacy' | 'terms' | 'cookies';
    site?: string;
}

export default function LegalPage({ type, site = 'group' }: LegalPageProps) {
    const { t, loading } = useI18n('legal', site);

    useEffect(() => {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate-reveal').forEach(el => revealObserver.observe(el));
        return () => revealObserver.disconnect();
    }, [loading]);

    if (loading || !t) return <div className="min-h-screen bg-navy flex items-center justify-center text-white">Loading...</div>;

    const content = t[type];

    return (
        <main className="pt-40 pb-32 bg-gray-50/30">
            <div className="max-w-4xl mx-auto px-6 bg-white p-12 md:p-20 rounded-[3rem] shadow-premium border border-gray-100 animate-reveal">
                <h1 className="text-4xl font-extrabold mb-10 italic text-navy">{content.title}</h1>
                <div className="prose prose-navy max-w-none text-gray-500 font-light leading-relaxed space-y-6">
                    <p className="text-xl italic text-teal/80 mb-10">{content.subtitle}</p>
                    
                    {content.sections.map((section: any, idx: number) => (
                        <div key={idx} className="mb-10">
                            <h2 className="text-xl font-bold text-navy mt-10 mb-4">{section.title}</h2>
                            <p className="font-light">{section.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
