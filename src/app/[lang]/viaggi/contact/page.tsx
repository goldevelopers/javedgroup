"use client";

import React, { useEffect } from 'react';
import { useI18n } from '@/lib/useI18n';

export default function ViaggiContact() {
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
        <main className="pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-start">
                <div className="animate-reveal">
                    <h1 className="text-5xl md:text-7xl font-black mb-12 italic text-navy leading-[1.1]" dangerouslySetInnerHTML={{ __html: t.hero.title }}></h1>
                    <div className="space-y-12">
                        <div className="group flex items-start gap-6">
                            <div className="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-white transition-all duration-300">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3 italic">{t.info.office.title}</h3>
                                <p className="text-gray-500 mb-4 font-light">{t.info.office.address}</p>
                            </div>
                        </div>
                        <div className="group flex items-start gap-6">
                            <div className="w-14 h-14 bg-skyblue/10 rounded-2xl flex items-center justify-center text-skyblue group-hover:bg-skyblue group-hover:text-white transition-all duration-300">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3 italic">{t.info.contacts.title}</h3>
                                <p className="text-gray-500 font-light flex flex-col gap-2">
                                    <span className="text-navy font-semibold hover:text-teal transition-colors cursor-pointer">
                                        {t.info.contacts.phone}
                                    </span>
                                    <span className="text-navy font-semibold hover:text-teal transition-colors cursor-pointer">
                                        {t.info.contacts.email}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="animate-reveal">
                    <div className="bg-gray-50 p-10 md:p-14 rounded-[3rem] border border-gray-100 shadow-premium">
                        <h2 className="text-3xl font-extrabold mb-8">{t.form.title}</h2>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <input type="text" placeholder={t.form.name} className="contact-input" />
                                <input type="text" placeholder={t.form.email} className="contact-input" />
                            </div>
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
                            <button className="w-full btn-premium bg-teal text-white shadow-xl shadow-teal/20">
                                {t.form.submit}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
