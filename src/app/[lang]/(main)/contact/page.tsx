"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/useI18n';

export default function Contact() {
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
        <main className="pt-20">
            <section className="py-24 bg-navy relative overflow-hidden text-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal/10 rounded-full blur-[120px]"></div>
                    <Image src="/assets/contact.png" fill className="object-cover mix-blend-overlay opacity-20" alt="Contact Hero" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 animate-reveal">{t.hero.title}</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light animate-reveal">{t.hero.subtitle}</p>
                </div>
            </section>

            <section className="py-32">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-start">
                    <div className="animate-reveal">
                        <h2 className="text-3xl font-extrabold mb-12 italic">{t.offices.title}</h2>
                        <div className="space-y-12">
                            <div className="group flex items-start gap-6">
                                <div className="w-20 h-20 bg-teal/5 rounded-[2rem] flex items-center justify-center p-4 group-hover:bg-teal/10 transition-all duration-300 relative">
                                    <Image src="/logos/Javed_Viaggi.svg" width={60} height={60} className="h-full w-full object-contain" alt="Javed Viaggi" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3 italic">{t.offices.parini.title}</h3>
                                    <p className="text-gray-500 mb-4 font-light">{t.offices.parini.address}</p>
                                    <div className="flex flex-col gap-2">
                                        <a href="tel:+390331781723" className="text-navy font-semibold hover:text-teal">{t.offices.parini.viaggi}</a>
                                        <a href="tel:+390331245274" className="text-navy font-semibold hover:text-teal">{t.offices.parini.agenzia}</a>
                                    </div>
                                </div>
                            </div>
                            <div className="group flex items-start gap-6">
                                <div className="w-20 h-20 bg-lime/5 rounded-[2rem] flex items-center justify-center p-4 group-hover:bg-lime/10 transition-all duration-300 relative">
                                    <Image src="/logos/Autoscuole_Kiwi.svg" width={60} height={60} className="h-full w-full object-contain" alt="Autoscuole Kiwi" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3 italic">{t.offices.buonarroti.title}</h3>
                                    <p className="text-gray-500 mb-4 font-light">{t.offices.buonarroti.address}</p>
                                    <div className="flex flex-col gap-2">
                                        <a href="tel:0331797139" className="text-navy font-semibold hover:text-lime">{t.offices.buonarroti.kiwi}</a>
                                        <a href="tel:0331701610" className="text-navy font-semibold hover:text-lime">{t.offices.buonarroti.assicurazioni}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="animate-reveal">
                        <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-premium border border-gray-50">
                            <h2 className="text-3xl font-extrabold mb-4">{t.form.title}</h2>
                            <form className="space-y-6 mt-8">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input type="text" placeholder={t.form.name} className="contact-input" />
                                    <input type="text" placeholder={t.form.surname} className="contact-input" />
                                </div>
                                <select className="contact-input appearance-none">
                                    <option>{t.form.area_select}</option>
                                    <option value="viaggi">{t.form.areas.viaggi}</option>
                                    <option value="agenzia">{t.form.areas.agenzia}</option>
                                    <option value="kiwi">{t.form.areas.kiwi}</option>
                                    <option value="assicurazioni">{t.form.areas.assicurazioni}</option>
                                </select>
                                <textarea placeholder={t.form.message} className="contact-input h-40"></textarea>
                                <button type="button" className="w-full btn-premium bg-teal text-white shadow-xl shadow-teal/20">{t.form.submit}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
