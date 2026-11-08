import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, Terminal, X } from '../icons';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-45% 0px -45% 0px' }
        );

        document.querySelectorAll('section[id]').forEach((section) => {
            observer.observe(section);
        });

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const navLinks = [
        { name: 'Inicio', href: '#inicio' },
        { name: 'Experiencia', href: '#trayectoria' },
        { name: 'Proyectos', href: '#proyectos' },
        { name: 'Habilidades', href: '#habilidades' },
        { name: 'Servicios TI', href: '#servicios' },
        { name: 'Contacto', href: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/85 backdrop-blur-xl border-b border-white/[0.07] shadow-lg shadow-slate-950/50' : 'bg-transparent py-3'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <a href="#inicio" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center text-blue-400 group-hover:text-sky-300 group-hover:border-blue-500/40 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all duration-300">
                            <Terminal className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-base sm:text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors leading-none">
                                Sergio Villena
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mt-0.5 hidden sm:block">
                                Full Stack · ERP · IA
                            </span>
                        </div>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-1 rounded-2xl border border-white/[0.06] bg-slate-900/50 p-1 backdrop-blur-md">
                        {navLinks.slice(0, 5).map((link) => {
                            const isActive = activeSection === link.href.substring(1);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`relative px-3.5 py-2 text-[11px] font-black uppercase tracking-widest transition-colors rounded-xl ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-blue-500/15 border border-blue-400/30 rounded-xl shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </a>
                            );
                        })}
                    </div>

                    {/* Desktop Action Buttons (Recruiter CV + Client Contact) */}
                    <div className="hidden md:flex items-center gap-2.5">
                        <a
                            href="/cv/sergio-villena-cv.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-2 text-[11px] font-black uppercase tracking-widest text-slate-300 rounded-xl border border-white/10 bg-slate-900/70 hover:text-white hover:border-blue-400/40 transition-all"
                            title="Ver o descargar CV actualizado en PDF"
                        >
                            <Download className="w-3.5 h-3.5 text-blue-400" />
                            <span>CV PDF</span>
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-slate-950 bg-white rounded-xl hover:bg-blue-50 hover:scale-[1.03] transition-all shadow-lg shadow-blue-500/10"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Hablemos
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-slate-300 hover:text-white p-2 rounded-xl border border-white/10 bg-slate-900/60"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-5 gap-4 text-xs font-bold uppercase tracking-widest">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`py-2 px-3 rounded-xl transition-colors flex items-center ${activeSection === link.href.substring(1) ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white'}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {activeSection === link.href.substring(1) && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2.5 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
                                    {link.name}
                                </a>
                            ))}
                            <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-3">
                                <a
                                    href="/cv/sergio-villena-cv.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/15 bg-slate-900 text-white text-[11px] font-black"
                                >
                                    <Download className="w-3.5 h-3.5 text-blue-400" />
                                    Descargar CV
                                </a>
                                <a
                                    href="#contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-slate-950 text-[11px] font-black"
                                >
                                    Contactar
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
