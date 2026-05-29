import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-slate-950 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-white">Sergio Villena</h2>
                        <p className="mt-2 text-sm text-slate-500">Ingeniero Civil en Informática · Chile</p>
                    </div>

                    <div className="flex gap-3">
                        <a href="mailto:sergio.villena.vergara@gmail.com" className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-blue-400/50 hover:text-blue-300" aria-label="Email">
                            <Mail className="h-5 w-5" />
                        </a>
                        <a href="https://www.linkedin.com/in/sergio-villena-vergara/" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-blue-400/50 hover:text-blue-300" aria-label="LinkedIn">
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a href="https://github.com/SAVillena" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-blue-400/50 hover:text-white" aria-label="GitHub">
                            <Github className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-2 border-t border-white/5 pt-6 text-xs font-semibold uppercase tracking-widest text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                    <span>Portafolio · 2026</span>
                    <span>Full-stack · IA aplicada · GIS · Infraestructura</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
