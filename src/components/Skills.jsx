import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Bot, Code2, Globe, Receipt, Server } from '../icons';

const skillGroups = [
    {
        id: 'erp-contabilidad',
        category: 'erp-backend',
        icon: <Receipt className="w-6 h-6" />,
        color: 'sky',
        spotlight: 'rgba(14, 165, 233, 0.16)',
        tag: 'Core Empresarial',
        title: 'ERP & Facturación (DTE)',
        subtitle: 'Módulos contables, tributarios y control interno.',
        skills: [
            'Facturación Electrónica (DTE)',
            'Facturas y Boletas SII',
            'Contabilidad & Libro Mayor',
            'Integración Nubox',
            'Control Interno',
            'Integración Bases Lanix',
        ],
    },
    {
        id: 'backend-arquitectura',
        category: 'erp-backend',
        icon: <Code2 className="w-6 h-6" />,
        color: 'blue',
        spotlight: 'rgba(59, 130, 246, 0.16)',
        tag: 'Sistemas & APIs',
        title: 'Backend & Arquitectura',
        subtitle: 'Servicios escalables, desacoplados y seguros.',
        skills: [
            'PHP 8+',
            'Laravel',
            'Java (Spring Boot)',
            'Node.js',
            'Express',
            'Python',
            'APIs REST',
            'JWT Auth',
            'Arquitectura Limpia',
        ],
    },
    {
        id: 'data-gis',
        category: 'ia-datos',
        icon: <BarChart3 className="w-6 h-6" />,
        color: 'amber',
        spotlight: 'rgba(245, 158, 11, 0.15)',
        tag: 'Relacional & Espacial',
        title: 'Bases de Datos & GIS',
        subtitle: 'Modelado relacional, SQL avanzado y georreferenciación.',
        skills: [
            'PostgreSQL',
            'PostGIS',
            'MySQL',
            'Modelado Relacional',
            'Optimización SQL',
            'Procesos ETL',
            'Prisma ORM',
            'Eloquent ORM',
        ],
    },
    {
        id: 'frontend-seo',
        category: 'fullstack-cloud',
        icon: <Globe className="w-6 h-6" />,
        color: 'emerald',
        spotlight: 'rgba(16, 185, 129, 0.15)',
        tag: 'Interfaces & Web',
        title: 'Frontend & SEO Técnico',
        subtitle: 'Aplicaciones rápidas y optimizadas para conversión.',
        skills: [
            'React 19',
            'Next.js 15',
            'Astro',
            'TypeScript / JS',
            'Tailwind CSS',
            'SEO Técnico & Programático',
            'Git / GitHub',
            'SCRUM',
        ],
    },
    {
        id: 'infra-cloud',
        category: 'fullstack-cloud',
        icon: <Server className="w-6 h-6" />,
        color: 'purple',
        spotlight: 'rgba(168, 85, 247, 0.16)',
        tag: 'Cloud & Servidores',
        title: 'Infraestructura & Cloud',
        subtitle: 'Contenedores, nube y monitoreo de alta disponibilidad.',
        skills: [
            'Oracle Cloud (OCI)',
            'Docker & Compose',
            'Proxmox VE API',
            'Linux SysAdmin',
            'Shell Scripting',
            'Nginx Reverse Proxy',
            'VPS Hetzner',
        ],
    },
    {
        id: 'ai-automation',
        category: 'ia-datos',
        icon: <Bot className="w-6 h-6" />,
        color: 'rose',
        spotlight: 'rgba(244, 63, 94, 0.15)',
        tag: 'Integraciones & IA',
        title: 'IA Aplicada & Integraciones',
        subtitle: 'Agentes inteligentes y conexión de servicios externos.',
        skills: [
            'OpenAI API',
            'Gemini API',
            'Claude Code & LLMs',
            'Chatwoot CRM',
            'Evolution API (WhatsApp)',
            'Google Maps API',
            'Webhooks & Pipelines',
        ],
    },
];

const colorMap = {
    sky: {
        bg: 'bg-sky-500/15 border border-sky-400/25',
        icon: 'text-sky-400',
        badge: 'bg-sky-500/10 text-sky-200 border border-sky-500/20 hover:border-sky-400/50',
        tag: 'text-sky-400',
    },
    blue: {
        bg: 'bg-blue-500/15 border border-blue-400/25',
        icon: 'text-blue-400',
        badge: 'bg-blue-500/10 text-blue-200 border border-blue-500/20 hover:border-blue-400/50',
        tag: 'text-blue-400',
    },
    emerald: {
        bg: 'bg-emerald-500/15 border border-emerald-400/25',
        icon: 'text-emerald-400',
        badge: 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/20 hover:border-emerald-400/50',
        tag: 'text-emerald-400',
    },
    purple: {
        bg: 'bg-purple-500/15 border border-purple-400/25',
        icon: 'text-purple-400',
        badge: 'bg-purple-500/10 text-purple-200 border border-purple-500/20 hover:border-purple-400/50',
        tag: 'text-purple-400',
    },
    amber: {
        bg: 'bg-amber-500/15 border border-amber-400/25',
        icon: 'text-amber-400',
        badge: 'bg-amber-500/10 text-amber-200 border border-amber-500/20 hover:border-amber-400/50',
        tag: 'text-amber-400',
    },
    rose: {
        bg: 'bg-rose-500/15 border border-rose-400/25',
        icon: 'text-rose-400',
        badge: 'bg-rose-500/10 text-rose-200 border border-rose-500/20 hover:border-rose-400/50',
        tag: 'text-rose-400',
    },
};

const filterTabs = [
    { id: 'all', label: 'Todo el Stack (6)' },
    { id: 'erp-backend', label: 'ERP, DTE & Backend' },
    { id: 'fullstack-cloud', label: 'Frontend, SEO & Cloud' },
    { id: 'ia-datos', label: 'SQL, PostGIS & IA' },
];

const Skills = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredGroups =
        activeFilter === 'all'
            ? skillGroups
            : skillGroups.filter((g) => g.category === activeFilter);

    const handleMouseMove = (e, spotlight) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        if (spotlight) {
            e.currentTarget.style.setProperty('--spotlight-color', spotlight);
        }
    };

    return (
        <section id="habilidades" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6"
                >
                    <div className="max-w-2xl">
                        <p className="mb-2.5 text-xs font-black uppercase tracking-[0.24em] text-blue-400">
                            Stack Técnico
                        </p>
                        <h2 className="text-3xl sm:text-5xl font-black text-white mb-3 tracking-tight leading-none">
                            Habilidades <span className="title-frame">Técnicas</span>
                        </h2>
                        <p className="text-slate-400 text-base font-normal">
                            Foco en desarrollo Backend (PHP/Laravel, Java Spring Boot), sistemas ERP/DTE, bases de datos y aplicaciones Full Stack.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <div className="px-4 py-2 rounded-xl border border-white/10 bg-slate-900/60 text-xs font-bold uppercase tracking-widest text-slate-300">
                            Español: Nativo
                        </div>
                        <div className="px-4 py-2 rounded-xl border border-blue-500/25 bg-blue-500/10 text-xs font-bold uppercase tracking-widest text-blue-300">
                            Inglés: B2 Técnico
                        </div>
                    </div>
                </motion.div>

                {/* ── Filtros Interactivos ── */}
                <div className="flex flex-wrap items-center gap-2 mb-8">
                    {filterTabs.map((tab) => {
                        const isActive = activeFilter === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveFilter(tab.id)}
                                className={`relative px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                                    isActive
                                        ? 'text-slate-950 bg-white shadow-lg shadow-blue-500/15'
                                        : 'text-slate-400 bg-slate-900/60 border border-white/10 hover:text-white hover:border-white/25'
                                }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* ── Grid Animado ── */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredGroups.map((group) => {
                            const c = colorMap[group.color];
                            return (
                                <motion.div
                                    layout
                                    key={group.id}
                                    initial={{ opacity: 0, scale: 0.95, y: 16 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    onMouseMove={(e) => handleMouseMove(e, group.spotlight)}
                                    className="spotlight-card p-6 rounded-[2rem] flex flex-col justify-between"
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between gap-3 mb-4">
                                            <div className={`w-11 h-11 ${c.bg} rounded-2xl flex items-center justify-center ${c.icon}`}>
                                                {group.icon}
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-[0.18em] ${c.tag}`}>
                                                {group.tag}
                                            </span>
                                        </div>

                                        <h3 className="text-white font-black text-lg mb-1 tracking-tight">
                                            {group.title}
                                        </h3>
                                        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                                            {group.subtitle}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5">
                                            {group.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className={`px-2.5 py-1 ${c.badge} rounded-lg text-xs font-semibold transition-colors`}
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
