import React from 'react';
import { Download, Github, Linkedin, Mail } from '../icons';

const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-slate-950 py-16 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-white">Sergio Villena</h2>
                        <p className="mt-2 text-sm text-slate-400">
                            Ingeniero Civil en Informática · Backend & Full Stack (PHP/Laravel · ERP & DTE · IA · GIS) · Concepción, Chile
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <a
                            href="/cv/sergio-villena-cv.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 text-xs font-black uppercase tracking-wider text-white transition hover:border-blue-400/50 hover:text-sky-300"
                        >
                            <Download className="h-4 w-4 text-sky-400" />
                            CV Actualizado
                        </a>
                        <a
                            href="/tarjeta"
                            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-xs font-bold uppercase tracking-wider text-slate-300 transition hover:border-blue-400/50 hover:text-white"
                        >
                            Tarjeta Digital
                        </a>
                        <a
                            href="mailto:sergio.villena.vergara@gmail.com"
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-blue-400/50 hover:text-blue-300"
                            aria-label="Email"
                        >
                            <Mail className="h-5 w-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/sergio-villena-vergara/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-blue-400/50 hover:text-blue-300"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a
                            href="https://github.com/SAVillena"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-blue-400/50 hover:text-white"
                            aria-label="GitHub"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-2 border-t border-white/5 pt-6 text-xs font-semibold uppercase tracking-widest text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                    <span>Sergio Villena · Portafolio 2026</span>
                    <span>ERP & Facturación DTE · Full Stack · Automatización IA · GIS</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
