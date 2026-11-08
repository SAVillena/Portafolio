import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowDown,
    ArrowUpRight,
    Building2,
    CheckCircle2,
    Download,
    Github,
    Linkedin,
    Mail,
    MapPin,
    UserCheck,
} from '../icons';
import useMagnetic from '../hooks/useMagnetic';

const MagneticWrapper = ({ children }) => {
    const magneticRef = useMagnetic();
    return React.cloneElement(children, { ref: magneticRef });
};

const audienceModes = {
    recruiter: {
        id: 'recruiter',
        tabLabel: 'Para Reclutadores',
        icon: UserCheck,
        badge: 'Ingeniero Civil en Informática · Backend & Full Stack',
        titleStart: 'Desarrollo sistemas ',
        titleFramed: 'ERP y Backend',
        titleEnd: ' listos para producción.',
        description:
            'Especializado en PHP/Laravel, Java (Spring Boot) y React. Construyo sistemas ERP, facturación electrónica (DTE), despliegues con CI/CD, QA y arquitectura en la nube (Oracle).',
        highlights: [
            'Actual: Full Stack Developer (PHP/Laravel · ERP & DTE) en Pacifik',
            'Despliegue con CI/CD, QA y Arquitectura en la Nube (Oracle OCI / Docker)',
            'Ingeniero Civil en Informática (UBB) · Certificaciones Oracle ONE & OCI',
        ],
        primaryCta: {
            label: 'Descargar CV',
            href: '/cv/sergio-villena-cv.pdf',
            external: true,
            icon: Download,
        },
        secondaryCta: {
            label: 'Ver Trayectoria',
            href: '#trayectoria',
            icon: ArrowDown,
        },
    },
    client: {
        id: 'client',
        tabLabel: 'Servicios Informáticos',
        icon: Building2,
        badge: 'Desarrollo de Software & Consultoría TI a Medida',
        titleStart: 'Software a medida que ',
        titleFramed: 'ordena y escala',
        titleEnd: ' la operación de tu negocio.',
        description:
            'Desarrollo e integro sistemas ERP, facturación electrónica (DTE), plataformas web de reservas y automatización de atención para empresas que buscan resultados rápidos.',
        highlights: [
            'Módulos ERP, contabilidad y Facturación Electrónica (DTE / Nubox)',
            'Aplicaciones web rápidas, reservas online sin cruces y posicionamiento SEO',
            'Integración de sistemas, paneles de control y atención automatizada 24/7',
        ],
        primaryCta: {
            label: 'Ver Servicios TI',
            href: '#servicios',
            external: false,
            icon: ArrowDown,
        },
        secondaryCta: {
            label: 'Cotizar Proyecto',
            href: '#contact',
            icon: ArrowUpRight,
        },
    },
};

const proofPoints = [
    { value: 'ERP & DTE', label: 'Laravel · Contabilidad', accent: 'text-sky-400' },
    { value: 'Full Stack', label: 'React · Spring Boot', accent: 'text-white' },
    { value: 'Oracle Cloud', label: 'Arquitectura · CI/CD · QA', accent: 'text-emerald-400' },
    { value: '+200 VMs', label: 'Infraestructura & GIS', accent: 'text-blue-400' },
];

const Hero = () => {
    const [mode, setMode] = useState('recruiter');
    const activeContent = audienceModes[mode];

    const handleCardMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    return (
        <section id="inicio" className="relative min-h-screen pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* ── Selector Interactivo de Audiencia ── */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.06]">
                    <div className="inline-flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Selecciona tu perfil de visita
                        </span>
                    </div>

                    <div
                        className="inline-flex p-1 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl self-start sm:self-auto"
                        role="tablist"
                        aria-label="Seleccionar enfoque del portafolio"
                    >
                        {Object.values(audienceModes).map((item) => {
                            const TabIcon = item.icon;
                            const isSelected = mode === item.id;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isSelected}
                                    onClick={() => setMode(item.id)}
                                    className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
                                        isSelected ? 'text-slate-950' : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    {isSelected && (
                                        <motion.div
                                            layoutId="hero-mode-pill"
                                            className="absolute inset-0 rounded-xl bg-white shadow-lg"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <TabIcon className={`w-3.5 h-3.5 relative z-10 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                                    <span className="relative z-10">{item.tabLabel}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    {/* ── Columna Izquierda: Limpia, Directa y Rápida de Escanear ── */}
                    <div className="lg:col-span-7 opacity-0 animate-fade-in-up">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeContent.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                            >
                                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full badge-premium text-[11px] font-black uppercase tracking-[0.16em] mb-5">
                                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 glow-dot" />
                                    {activeContent.badge}
                                </div>

                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 tracking-tight leading-[1.08]">
                                    {activeContent.titleStart}
                                    <span className="title-frame">{activeContent.titleFramed}</span>
                                    <span className="text-slate-300 font-light">{activeContent.titleEnd}</span>
                                </h1>

                                <p className="text-base sm:text-lg text-slate-300 max-w-xl mb-6 leading-relaxed font-normal">
                                    {activeContent.description}
                                </p>

                                <ul className="space-y-2.5 mb-8 max-w-xl">
                                    {activeContent.highlights.map((point) => (
                                        <li key={point} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                                            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTAs */}
                                <div className="flex flex-wrap gap-3.5 mb-7">
                                    <MagneticWrapper>
                                        <a
                                            href={activeContent.primaryCta.href}
                                            target={activeContent.primaryCta.external ? '_blank' : undefined}
                                            rel={activeContent.primaryCta.external ? 'noopener noreferrer' : undefined}
                                            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 bg-white text-slate-950 font-black rounded-2xl hover:scale-[1.03] transition-transform shadow-2xl shadow-blue-500/20 text-xs sm:text-sm uppercase tracking-wider w-full sm:w-auto"
                                        >
                                            {activeContent.primaryCta.label}
                                            <activeContent.primaryCta.icon className="w-4 h-4" aria-hidden="true" />
                                        </a>
                                    </MagneticWrapper>

                                    <MagneticWrapper>
                                        <a
                                            href={activeContent.secondaryCta.href}
                                            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 bg-slate-900/75 text-white font-bold rounded-2xl hover:bg-slate-800/90 hover:border-blue-400/40 transition-all border border-white/15 backdrop-blur text-xs sm:text-sm uppercase tracking-wider w-full sm:w-auto"
                                        >
                                            {activeContent.secondaryCta.label}
                                            <activeContent.secondaryCta.icon className="w-4 h-4 text-sky-400" aria-hidden="true" />
                                        </a>
                                    </MagneticWrapper>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Contacto rápido */}
                        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 pt-3 border-t border-white/[0.06]">
                            <a className="inline-flex items-center gap-2 hover:text-white transition-colors" href="mailto:sergio.villena.vergara@gmail.com">
                                <Mail className="w-4 h-4 text-sky-400" aria-hidden="true" />
                                Email
                            </a>
                            <a className="inline-flex items-center gap-2 hover:text-white transition-colors" href="https://www.linkedin.com/in/sergio-villena-vergara/" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="w-4 h-4 text-sky-400" aria-hidden="true" />
                                LinkedIn
                            </a>
                            <a className="inline-flex items-center gap-2 hover:text-white transition-colors" href="https://github.com/SAVillena" target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 text-sky-400" aria-hidden="true" />
                                GitHub
                            </a>
                            <span className="inline-flex items-center gap-1.5 text-slate-400">
                                <MapPin className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                                Concepción, Chile
                            </span>
                        </div>
                    </div>

                    {/* ── Columna Derecha: Retrato Limpio + Indicadores Clave ── */}
                    <div className="lg:col-span-5 opacity-0 animate-fade-in-scale">
                        <div className="flex flex-col gap-4 relative">
                            {/* Portrait Frame sin tarjetas flotantes ni láser distractor */}
                            <div className="hud-frame overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900/60 shadow-2xl shadow-blue-950/50">
                                <div className="hud-corner-tl" />
                                <div className="hud-corner-tr" />
                                <div className="hud-corner-bl" />
                                <div className="hud-corner-br" />

                                <img
                                    src="/profile/sergio-villena-portrait.webp"
                                    alt="Sergio Villena — Ingeniero Civil en Informática"
                                    className="h-[360px] sm:h-[400px] w-full object-cover object-[center_8%]"
                                    loading="eager"
                                />

                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 pt-10 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-emerald-400 glow-dot" />
                                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-200">
                                            Pacifik · Full Stack PHP/Laravel
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 border border-sky-400/20 px-2.5 py-1 rounded-full">
                                        Concepción, CL
                                    </span>
                                </div>
                            </div>

                            {/* Stats Panel */}
                            <div
                                onMouseMove={handleCardMouseMove}
                                className="spotlight-card rounded-2xl border border-white/10 bg-slate-950/90 p-3.5 backdrop-blur-xl shadow-2xl"
                            >
                                <div className="relative z-10 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                                    {proofPoints.map((item) => (
                                        <div
                                            key={item.value}
                                            className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-3 text-center flex flex-col justify-center min-h-[70px]"
                                        >
                                            <p className={`text-[13px] sm:text-sm font-black leading-tight ${item.accent}`}>
                                                {item.value}
                                            </p>
                                            <p className="mt-1 text-[9px] font-bold uppercase leading-snug tracking-wider text-slate-400">
                                                {item.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Separator line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500/35 to-transparent" />
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_12px_#38bdf8]" />
            </div>
        </section>
    );
};

export default Hero;
