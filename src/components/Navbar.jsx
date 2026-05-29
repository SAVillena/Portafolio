import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-50% 0px -50% 0px' }
        );

        document.querySelectorAll('section[id]').forEach((section) => {
            observer.observe(section);
        });

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const navLinks = [
        { name: 'Inicio', href: '#inicio' },
        { name: 'Habilidades', href: '#habilidades' },
        { name: 'Proyectos', href: '#proyectos' },
        { name: 'Experiencia', href: '#trayectoria' },
        { name: 'Contacto', href: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <a href="#inicio" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/50 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all duration-300">
                            <Terminal className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors">Sergio Villena</span>
                    </a>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.slice(0, 4).map((link) => {
                            const isActive = activeSection === link.href.substring(1);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`relative px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    {link.name}
                                </a>
                            );
                        })}
                        <div className="pl-4">
                            <a
                                href="#contact"
                                className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-300 glass-card rounded-lg hover:text-white hover:border-blue-500/50 transition-all"
                            >
                                Hablemos
                            </a>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-slate-300 hover:text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-6 text-xs font-bold uppercase tracking-widest">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`transition-colors flex items-center ${activeSection === link.href.substring(1) ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {activeSection === link.href.substring(1) && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
