import React from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    Award,
    BriefcaseBusiness,
    CheckCircle2,
    Download,
    GraduationCap,
    Receipt,
    ServerCog,
    ShieldCheck,
    Sparkles,
} from '../icons';

const timeline = [
    {
        date: 'Agosto 2025 – Presente',
        role: 'Desarrollador Full Stack (PHP/Laravel)',
        company: 'Pacifik — Cliente: Importadora Giorgio, Durban y Vergio',
        location: 'Concepción',
        current: true,
        icon: Receipt,
        highlights: [
            'Desarrollo de módulos sobre ERP en Laravel integrado con bases de datos Lanix.',
            'Módulos de contabilidad, libro mayor, DTE (facturas y boletas) e integración Nubox.',
            'Flujos de control interno, QA, despliegue continuo (CI/CD) y mantenimiento evolutivo.',
        ],
        tags: ['PHP 8+', 'Laravel', 'ERP', 'DTE', 'Nubox', 'CI/CD', 'QA'],
    },
    {
        date: 'Marzo 2025 – Presente',
        role: 'Ingeniero de Software Full Stack (Freelance)',
        company: 'Consultoría y Desarrollo de Soluciones Tecnológicas',
        location: 'Concepción',
        current: true,
        icon: Sparkles,
        highlights: [
            'Aplicaciones Full Stack desacopladas (React + Spring Boot / Node.js) con JWT.',
            'Automatización de reportes y flujos operativos (-40% de carga manual).',
            'Desarrollo de plataformas web corporativas, reservas online y estrategia SEO.',
        ],
        tags: ['React', 'Spring Boot', 'Node.js', 'SEO Técnico', 'Automatización', 'JWT'],
    },
    {
        date: 'Diciembre 2024 – Marzo 2025',
        role: 'Ingeniero de Software y Encargado de TI',
        company: 'INNTECH',
        location: 'Concepción',
        current: false,
        icon: BriefcaseBusiness,
        highlights: [
            'Puesta en marcha de sistema GIS en tiempo real para infraestructura energética.',
            'Supervisión de flujos de datos en terreno manteniendo 99.9% de disponibilidad.',
        ],
        tags: ['GIS', 'PostGIS', 'Tiempo Real', '99.9% Uptime'],
    },
    {
        date: 'Marzo 2024 – Noviembre 2024',
        role: 'Desarrollador Full Stack (Proyecto de Título)',
        company: 'INNTECH',
        location: 'Concepción',
        current: false,
        icon: Activity,
        highlights: [
            'Diseño y desarrollo de DustSense: monitoreo ambiental minero (PM2.5/PM10) con stack PERN y PostGIS.',
        ],
        tags: ['PostgreSQL', 'PostGIS', 'Express', 'React', 'Node.js'],
    },
    {
        date: 'Noviembre 2023 – Febrero 2024',
        role: 'Ingeniero de Virtualización y Monitoreo',
        company: 'Mundo OyM (Mundo Pacífico)',
        location: 'Concepción',
        current: false,
        icon: ServerCog,
        highlights: [
            'Integración de API Proxmox VE en Laravel para auditar +200 máquinas virtuales y automatizar reportes.',
        ],
        tags: ['PHP / Laravel', 'Proxmox VE API', 'MySQL', '+200 VMs'],
    },
];

const certifications = [
    {
        title: 'Ingeniería Civil en Informática',
        institution: 'Universidad del Bío-Bío',
        period: '2020 – 2024',
        badge: 'Título Profesional',
    },
    {
        title: 'Especialización Backend Developer',
        institution: 'Oracle Next Education (ONE)',
        period: '2026',
        badge: 'Especialización',
    },
    {
        title: 'Certificación Arquitectura Cloud (OCI): Fundamentos Clave',
        institution: 'Oracle Cloud Infrastructure · Alura LATAM',
        period: '2026',
        badge: 'Arquitectura Cloud',
    },
];

const engineeringPractices = [
    'Despliegue continuo con pipelines CI/CD y control de versiones Git',
    'Aseguramiento de calidad (QA), validación funcional y control interno',
    'Arquitectura en la nube (Oracle OCI), contenedores Docker y Linux',
    'Integración tributaria (DTE / Nubox) y bases de datos relacionales/espaciales',
];

const Experience = () => {
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    return (
        <section id="trayectoria" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
                >
                    <div className="max-w-2xl">
                        <p className="mb-2.5 text-xs font-black uppercase tracking-[0.24em] text-blue-400">
                            Trayectoria Profesional
                        </p>
                        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                            Experiencia en <span className="title-frame">entornos reales</span>
                        </h2>
                        <p className="mt-3 text-base text-slate-400 font-normal">
                            Desarrollo de sistemas ERP, facturación electrónica, plataformas Full Stack e infraestructura crítica.
                        </p>
                    </div>

                    <a
                        href="/cv/sergio-villena-cv.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white text-slate-950 text-xs font-black uppercase tracking-widest hover:scale-[1.03] transition-transform shadow-xl self-start lg:self-auto shrink-0"
                    >
                        <Download className="w-4 h-4" />
                        Descargar CV (PDF)
                    </a>
                </motion.div>

                <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] items-start">
                    {/* ── Columna Izquierda: Línea de Tiempo Concisa ── */}
                    <div className="relative pl-4 sm:pl-8 before:absolute before:left-[7px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-sky-400 before:via-blue-500/40 before:to-transparent space-y-5">
                        {timeline.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.article
                                    key={`${item.role}-${item.date}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.45, delay: index * 0.06 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    onMouseMove={handleMouseMove}
                                    className="spotlight-card relative rounded-2xl border border-white/10 p-5 sm:p-6"
                                >
                                    <div
                                        className={`absolute -left-[21px] sm:-left-[29px] top-6 w-3.5 h-3.5 rounded-full border-2 border-slate-950 ${
                                            item.current
                                                ? 'bg-emerald-400 shadow-[0_0_12px_#34d399]'
                                                : 'bg-blue-400 shadow-[0_0_8px_#60a5fa]'
                                        }`}
                                    />

                                    <div className="relative z-10">
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                                            <span className="text-xs font-black uppercase tracking-widest text-sky-400">
                                                {item.date}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[11px] font-semibold text-slate-400">
                                                    {item.location}
                                                </span>
                                                {item.current && (
                                                    <span className="rounded-full bg-emerald-400/15 border border-emerald-400/30 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-emerald-300">
                                                        Actual
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3.5 mb-3.5">
                                            <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-300 mt-0.5">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-white leading-snug">
                                                    {item.role}
                                                </h3>
                                                <p className="text-xs font-semibold text-slate-400 mt-0.5">
                                                    {item.company}
                                                </p>
                                            </div>
                                        </div>

                                        <ul className="space-y-1.5 mb-4">
                                            {item.highlights.map((bullet) => (
                                                <li key={bullet} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-slate-300">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-1" />
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                                            {item.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-md bg-white/[0.06] border border-white/[0.05] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-200"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>

                    {/* ── Columna Derecha: Formación, Certificaciones & Prácticas de Ingeniería ── */}
                    <div className="space-y-5 lg:sticky lg:top-24">
                        <motion.aside
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            onMouseMove={handleMouseMove}
                            className="spotlight-card rounded-2xl border border-white/10 p-6"
                        >
                            <div className="relative z-10">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-400/25 text-emerald-300">
                                        <GraduationCap className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                                            Credenciales
                                        </p>
                                        <h3 className="text-lg font-black text-white">
                                            Formación y Certificaciones
                                        </h3>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {certifications.map((cert) => (
                                        <div
                                            key={cert.title}
                                            className="rounded-xl border border-white/[0.07] bg-slate-950/60 p-3.5 hover:border-emerald-400/30 transition-colors"
                                        >
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-300">
                                                    <Award className="w-3.5 h-3.5" />
                                                    {cert.badge}
                                                </span>
                                                <span className="text-xs font-black text-slate-400">
                                                    {cert.period}
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-black text-white leading-snug">
                                                {cert.title}
                                            </h4>
                                            <p className="text-xs font-medium text-slate-400 mt-0.5">
                                                {cert.institution}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.aside>

                        {/* Tarjeta de Estándares de Ingeniería (sin botón de CV duplicado) */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            onMouseMove={handleMouseMove}
                            className="spotlight-card rounded-2xl border border-white/10 p-6"
                        >
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-400/25 flex items-center justify-center text-sky-400">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-sky-400">
                                            Estándares de Trabajo
                                        </span>
                                        <h4 className="text-base font-black text-white">
                                            Calidad, Despliegue y Nube
                                        </h4>
                                    </div>
                                </div>

                                <ul className="space-y-2">
                                    {engineeringPractices.map((practice) => (
                                        <li key={practice} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                            <span>{practice}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
