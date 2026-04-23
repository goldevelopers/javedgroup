"use client";

import React, { useEffect } from 'react';
import { useI18n } from '@/lib/useI18n';

export default function KiwiContact() {
    const { t, loading } = useI18n('contact');

    useEffect(() => {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate-reveal').forEach(el => revealObserver.observe(el));
        return () => revealObserver.disconnect();
    }, [loading]);

    if (loading || !t) return <div className="min-h-screen bg-navy flex items-center justify-center text-white">Loading...</div>;

    return (
        <main className="pt-40 pb-32">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
                <div className="animate-reveal">
                    <h1 className="text-5xl font-black mb-10 italic text-navy leading-[1.1]" dangerouslySetInnerHTML={{ __html: t.hero.title }}></h1>
                    <div className="mb-12">
                        <h3 className="text-xl font-bold mb-4 italic text-lime">{t.info.office.title}</h3>
                        <p className="text-gray-500 font-light text-lg whitespace-pre-line">
                            {t.info.office.address}
                        </p>
                    </div>
                    <div className="mb-12">
                        <h3 className="text-xl font-bold mb-4 italic text-lime">{t.info.emergency.title}</h3>
                        <p className="text-gray-500 font-light text-lg">
                            {t.info.emergency.phone}<br />
                            {t.info.emergency.email}
                        </p>
                    </div>
                    <div className="p-8 bg-navy rounded-[2.5rem] text-white italic">
                        <p className="font-light">&ldquo;{t.info.quote}&rdquo;</p>
                    </div>
                </div>
                <div className="animate-reveal">
                    <div className="bg-gray-50 p-12 rounded-[3.5rem] border border-gray-100 shadow-premium">
                        <h2 className="text-2xl font-bold mb-8 italic">{t.form.title}</h2>
                        <form className="space-y-6">
                            <input type="text" placeholder={t.form.name} className="contact-input" />
                            <input type="email" placeholder={t.form.email} className="contact-input" />
                            <div className="relative">
                                <select className="contact-input appearance-none w-full">
                                    <option>{t.form.type_placeholder}</option>
                                    {t.form.types.map((type: string, idx: number) => (
                                        <option key={idx}>{type}</option>
                                    ))}
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                            <textarea placeholder={t.form.message} className="contact-input h-40"></textarea>
                            <button className="w-full btn-premium bg-lime text-navy shadow-xl shadow-lime/20 uppercase tracking-widest text-sm">
                                {t.form.submit}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
