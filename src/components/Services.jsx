import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowUpRight,
    Bot,
    CheckCircle2,
    Globe,
    Receipt,
    ServerCog,
    ShieldCheck,
    Workflow,
    Zap,
} from '../icons';

const servicesList = [
    {
        id: 'erp-dte',
        topic: 'Sistema ERP / Facturación DTE',
        badge: 'ERP & Finanzas',
        title: 'Sistemas ERP y Facturación Electrónica (DTE)',
        description:
            'Desarrollo de módulos contables, libro mayor, control interno e integración de documentos tributarios (facturas y boletas) con Nubox y bases de datos empresariales.',
        deliverables: [
            'Módulos de contabilidad, libro mayor y control interno en Laravel',
            'Emisión y gestión de Facturación Electrónica (DTE) e integración Nubox',
            'Conexión y sincronización segura con bases de datos preexistentes',
        ],
        metric: '100% Trazable',
        metricLabel: 'Operación y contabilidad',
        icon: Receipt,
        accent: 'sky',
        spotlight: 'rgba(14, 165, 233, 0.16)',
    },
    {
        id: 'web-seo',
        topic: 'Desarrollo Web Full Stack / Reservas / SEO',
        badge: 'Plataformas Web & SEO',
        title: 'Aplicaciones Full Stack, Reservas y SEO Técnico',
        description:
            'Plataformas a medida (React / Next.js + Spring Boot / Node.js) con agendamiento online sin cruces, paneles autogestionables y posicionamiento en Google.',
        deliverables: [
            'Sistemas de reserva online y paneles administrativos a medida',
            'Arquitectura desacoplada (React + Spring Boot / Node.js) con JWT',
            'Estrategia SEO técnica y velocidad de carga optimizada (<1.5s)',
        ],
        metric: '<1.5s Carga',
        metricLabel: 'Agendamiento 100% digital',
        icon: Globe,
        accent: 'emerald',
        spotlight: 'rgba(16, 185, 129, 0.15)',
    },
    {
        id: 'ai-automation',
        topic: 'Automatización de Procesos / Agentes IA',
        badge: 'IA & Automatización',
        title: 'Automatización Operativa y Atención con IA 24/7',
        description:
            'Flujos inteligentes y agentes conversacionales en WhatsApp que cotizan, responden y generan reportes operativos automáticamente sin intervención manual.',
        deliverables: [
            'Atención y cotización automática 24/7 integrada con WhatsApp y CRM',
            'Pipelines automatizados de reportes y procesamiento de datos',
            'Integración con APIs de OpenAI, Gemini y Google Maps',
        ],
        metric: '-40% Carga',
        metricLabel: 'Respuesta en <5 segundos',
        icon: Bot,
        accent: 'rose',
        spotlight: 'rgba(244, 63, 94, 0.15)',
    },
    {
        id: 'gis-infra',
        topic: 'Sistemas GIS / Monitoreo / Cloud',
        badge: 'GIS, Datos & Cloud',
        title: 'Sistemas Geoespaciales (GIS) e Infraestructura',
        description:
            'Mapas interactivos y telemetría en tiempo real con PostgreSQL/PostGIS, junto con monitoreo automatizado de servidores (Proxmox VE, Docker y Oracle Cloud).',
        deliverables: [
            'Georreferenciación, búsqueda por radio y mapas en tiempo real (PostGIS)',
            'Auditoría y monitoreo de clústers y máquinas virtuales vía API',
            'Despliegue en Linux, contenedores Docker y nube OCI',
        ],
        metric: '99.9% Uptime',
        metricLabel: 'Monitoreo continuo',
        icon: ServerCog,
        accent: 'violet',
        spotlight: 'rgba(139, 92, 246, 0.16)',
    },
];

const processSteps = [
    { step: '01', title: 'Diagnóstico', desc: 'Identificamos el cuello de botella operativo o contable.' },
    { step: '02', title: 'Arquitectura', desc: 'Diseño técnico claro (ERP, API o plataforma web).' },
    { step: '03', title: 'Desarrollo', desc: 'Construcción ágil con avances visibles cada semana.' },
    { step: '04', title: 'Producción', desc: 'Despliegue seguro, pruebas reales y soporte.' },
];

const accentStyles = {
    sky: {
        badge: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
        iconBg: 'bg-sky-500/15 text-sky-400 border-sky-400/25',
        metric: 'text-sky-400',
        btn: 'hover:border-sky-400/50 hover:bg-sky-500/10 text-sky-300',
    },
    rose: {
        badge: 'bg-rose-500/10 text-rose-300 border-rose-500/25',
        iconBg: 'bg-rose-500/15 text-rose-400 border-rose-400/25',
        metric: 'text-rose-400',
        btn: 'hover:border-rose-400/50 hover:bg-rose-500/10 text-rose-300',
    },
    emerald: {
        badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
        iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-400/25',
        metric: 'text-emerald-400',
        btn: 'hover:border-emerald-400/50 hover:bg-emerald-500/10 text-emerald-300',
    },
    violet: {
        badge: 'bg-violet-500/10 text-violet-300 border-violet-500/25',
        iconBg: 'bg-violet-500/15 text-violet-400 border-violet-400/25',
        metric: 'text-violet-400',
        btn: 'hover:border-violet-400/50 hover:bg-violet-500/10 text-violet-300',
    },
};

const Services = () => {
    const handleSelectService = (topic) => {
        window.dispatchEvent(new CustomEvent('select-contact-topic', { detail: topic }));
        const contactEl = document.getElementById('contact');
        if (contactEl) {
            contactEl.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleMouseMove = (e, spotlightColor) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        if (spotlightColor) {
            e.currentTarget.style.setProperty('--spotlight-color', spotlightColor);
        }
    };

    return (
        <section id="servicios" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ── Encabezado Breve y Directo ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6"
                >
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[11px] font-black uppercase tracking-[0.2em] mb-4">
                            <Zap className="w-3.5 h-3.5" />
                            Soluciones para Empresas
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.08]">
                            Servicios TI que <span className="title-frame">optimizan tu operación</span>
                        </h2>
                        <p className="mt-3 text-base text-slate-400 font-normal">
                            Soluciones llave en mano para digitalizar procesos contables, plataformas web e infraestructura.
                        </p>
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-300 text-xs font-black uppercase tracking-wider self-start lg:self-auto">
                        <ShieldCheck className="w-4 h-4" />
                        Trato directo con el ingeniero
                    </div>
                </motion.div>

                {/* ── Grid de 4 Servicios Concisos ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    {servicesList.map((service, idx) => {
                        const Icon = service.icon;
                        const style = accentStyles[service.accent];
                        return (
                            <motion.article
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: idx * 0.07 }}
                                viewport={{ once: true, margin: '-40px' }}
                                onMouseMove={(e) => handleMouseMove(e, service.spotlight)}
                                className="spotlight-card rounded-[2rem] p-6 sm:p-7 flex flex-col justify-between"
                            >
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between gap-4 mb-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${style.iconBg}`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${style.badge}`}>
                                                {service.badge}
                                            </span>
                                        </div>

                                        <div className="text-right">
                                            <p className={`text-sm font-black ${style.metric}`}>{service.metric}</p>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                {service.metricLabel}
                                            </p>
                                        </div>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2.5">
                                        {service.title}
                                    </h3>

                                    <p className="text-sm text-slate-400 leading-relaxed mb-5">
                                        {service.description}
                                    </p>

                                    <div className="space-y-2 mb-6 pt-4 border-t border-white/[0.06]">
                                        {service.deliverables.map((item) => (
                                            <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                                                <CheckCircle2 className={`w-4 h-4 shrink-0 ${style.metric}`} />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                        Desarrollo a medida
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleSelectService(service.topic)}
                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-white/[0.04] text-xs font-black uppercase tracking-wider transition-all ${style.btn}`}
                                    >
                                        Cotizar
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>

                {/* ── Proceso en 4 Pasos Breves ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="rounded-3xl border border-white/10 bg-slate-900/45 p-6 backdrop-blur-xl relative overflow-hidden"
                >
                    <div className="hidden lg:block absolute top-[4rem] left-16 right-16 h-px bg-white/10 overflow-hidden pointer-events-none">
                        <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-data-stream" />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                        <div className="flex items-center gap-2">
                            <Workflow className="w-4 h-4 text-sky-400" />
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-sky-400">
                                Cómo trabajamos juntos
                            </h3>
                        </div>
                        <a
                            href="#contact"
                            onClick={() => handleSelectService('Consultoría / Nuevo Proyecto')}
                            className="text-xs font-black uppercase tracking-widest text-white hover:text-sky-400 transition-colors inline-flex items-center gap-1.5"
                        >
                            Iniciar conversación
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                        {processSteps.map((item) => (
                            <div
                                key={item.step}
                                className="rounded-2xl border border-white/[0.07] bg-slate-950/75 p-4 hover:border-sky-500/30 transition-colors"
                            >
                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-400/30 text-xs font-black text-sky-300 mb-2.5">
                                    {item.step}
                                </span>
                                <h4 className="text-sm font-black text-white mb-1">{item.title}</h4>
                                <p className="text-xs leading-relaxed text-slate-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
