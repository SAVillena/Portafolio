import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Check,
    Copy,
    Download,
    Github,
    Linkedin,
    Mail,
    MapPin,
    Send,
} from '../icons';

const contactLinks = [
    {
        label: 'Email Directo',
        value: 'sergio.villena.vergara@gmail.com',
        href: 'mailto:sergio.villena.vergara@gmail.com',
        icon: Mail,
        copyable: true,
    },
    {
        label: 'LinkedIn',
        value: 'linkedin.com/in/sergio-villena-vergara',
        href: 'https://www.linkedin.com/in/sergio-villena-vergara/',
        icon: Linkedin,
    },
    {
        label: 'GitHub',
        value: 'github.com/SAVillena',
        href: 'https://github.com/SAVillena',
        icon: Github,
    },
    {
        label: 'Ubicación & Modalidad',
        value: 'Concepción, Chile · Remoto / Híbrido',
        icon: MapPin,
    },
];

const quickTopics = [
    {
        label: '💼 Reclutamiento / Rol TI',
        subject: 'Oportunidad Laboral / Proceso de Selección',
        placeholder:
            'Hola Sergio, te escribo por una oportunidad para el rol de... (Modalidad y stack principal).',
    },
    {
        label: '🧾 Sistema ERP / Facturación DTE',
        subject: 'Sistema ERP / Facturación DTE',
        placeholder:
            'Necesitamos desarrollar o integrar módulos ERP / facturación electrónica (DTE, Nubox o Laravel) para nuestra empresa...',
    },
    {
        label: '🌐 Desarrollo Web / Reservas / SEO',
        subject: 'Desarrollo Web Full Stack / Reservas / SEO',
        placeholder:
            'Queremos crear o modernizar nuestra plataforma web / sistema de reservas y posicionamiento en Google...',
    },
    {
        label: '🤖 Automatización / Integración API',
        subject: 'Automatización de Procesos / Agentes IA',
        placeholder:
            'Buscamos automatizar nuestra atención, cotizaciones o flujo de reportes operativos...',
    },
    {
        label: '☁️ Cloud (Oracle) / CI/CD / GIS',
        subject: 'Cloud (Oracle) / CI/CD / GIS',
        placeholder:
            'Necesitamos arquitectura cloud (Oracle OCI), automatización de despliegues CI/CD o sistemas GIS (PostGIS)...',
    },
];

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [selectedTopic, setSelectedTopic] = useState('');
    const [copied, setCopied] = useState(false);
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        const handleExternalTopic = (event) => {
            const topicText = event.detail;
            if (topicText) {
                setSelectedTopic(topicText);
                setFormData((prev) => ({ ...prev, subject: topicText }));
            }
        };

        window.addEventListener('select-contact-topic', handleExternalTopic);
        return () => window.removeEventListener('select-contact-topic', handleExternalTopic);
    }, []);

    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic.subject);
        setFormData((prev) => ({
            ...prev,
            subject: topic.subject,
        }));
    };

    const handleCopyEmail = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText('sergio.villena.vergara@gmail.com');
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            window.location.href = 'mailto:sergio.villena.vergara@gmail.com';
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    access_key: import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY,
                    subject: `Portafolio: ${formData.subject}`,
                    from_name: formData.name,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            });

            const result = await response.json();
            if (response.ok && result.success === true) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setSelectedTopic('');
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 4000);
            }
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const activeTopicObj = quickTopics.find((t) => t.subject === selectedTopic);
    const dynamicPlaceholder =
        activeTopicObj?.placeholder ||
        'Cuéntame brevemente sobre el rol, proyecto o sistema que necesitas...';

    return (
        <section id="contact" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-12 max-w-2xl"
                >
                    <p className="mb-2.5 text-xs font-black uppercase tracking-[0.24em] text-blue-400">
                        Contacto Directo
                    </p>
                    <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                        Hablemos de tu <span className="title-frame">próximo proyecto</span>
                    </h2>
                    <p className="mt-3 text-base text-slate-400">
                        Disponible para oportunidades laborales (Backend / Full Stack) y desarrollo de software a medida.
                    </p>
                </motion.div>

                <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] items-start">
                    {/* ── Columna Izquierda: Tarjetas de Contacto + Copiar Email + CV ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        {contactLinks.map((item) => {
                            const Icon = item.icon;
                            const content = (
                                <div className="spotlight-card rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-blue-400/40">
                                    <div className="relative z-10 flex items-center justify-between gap-4">
                                        <div className="flex items-start gap-4 min-w-0">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-400/25 text-blue-300">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                                                    {item.label}
                                                </p>
                                                <p className="mt-1 break-all text-sm font-semibold text-white">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </div>

                                        {item.copyable && (
                                            <button
                                                type="button"
                                                onClick={handleCopyEmail}
                                                className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-slate-900/90 px-3 py-2 text-[11px] font-black uppercase tracking-wider text-slate-200 hover:border-sky-400/50 hover:text-white transition"
                                                title="Copiar correo al portapapeles"
                                            >
                                                {copied ? (
                                                    <>
                                                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                                                        <span className="text-emerald-300">Copiado</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-3.5 h-3.5 text-sky-400" />
                                                        <span>Copiar</span>
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );

                            return item.href ? (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target={item.href.startsWith('http') ? '_blank' : undefined}
                                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="block"
                                >
                                    {content}
                                </a>
                            ) : (
                                <div key={item.label}>{content}</div>
                            );
                        })}

                        <a
                            href="/cv/sergio-villena-cv.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-white px-5 py-4 text-xs sm:text-sm font-black uppercase tracking-widest text-slate-950 transition hover:scale-[1.01] hover:bg-sky-50 shadow-xl"
                        >
                            <Download className="h-4 w-4" />
                            Descargar CV Actualizado (PDF)
                        </a>
                    </motion.div>

                    {/* ── Columna Derecha: Formulario Guiado ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="rounded-3xl border border-white/10 bg-slate-900/55 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
                    >
                        <div className="mb-5">
                            <p className="mb-2.5 text-xs font-black uppercase tracking-widest text-sky-400">
                                ¿Sobre qué conversamos? (Opcional)
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {quickTopics.map((topic) => {
                                    const isSelected = formData.subject === topic.subject;
                                    return (
                                        <button
                                            key={topic.label}
                                            type="button"
                                            onClick={() => handleTopicSelect(topic)}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                                                isSelected
                                                    ? 'bg-sky-500/20 border-sky-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                                                    : 'bg-slate-950/70 border-white/10 text-slate-300 hover:border-white/25 hover:text-white'
                                            }`}
                                        >
                                            {topic.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="block">
                                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-400">
                                        Nombre / Empresa
                                    </span>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-sky-400"
                                        placeholder="Tu nombre o empresa"
                                    />
                                </label>
                                <label className="block">
                                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-400">
                                        Email
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-sky-400"
                                        placeholder="tu@empresa.cl"
                                    />
                                </label>
                            </div>

                            <label className="block">
                                <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-400">
                                    Asunto
                                </span>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-sky-400"
                                    placeholder="Motivo del mensaje"
                                />
                            </label>

                            <label className="block">
                                <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-400">
                                    Mensaje
                                </span>
                                <textarea
                                    name="message"
                                    rows="4"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-sky-400"
                                    placeholder={dynamicPlaceholder}
                                />
                            </label>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all duration-300 ${
                                    status === 'sending'
                                        ? 'bg-blue-600/50 cursor-not-allowed shadow-none'
                                        : status === 'success'
                                        ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-600/20'
                                        : status === 'error'
                                        ? 'bg-rose-500 hover:bg-rose-400 shadow-rose-600/20'
                                        : 'bg-blue-500 hover:bg-blue-400 shadow-blue-600/25'
                                }`}
                            >
                                <Send className="h-4 w-4" />
                                {status === 'idle' && 'Enviar mensaje'}
                                {status === 'sending' && 'Enviando...'}
                                {status === 'success' && '¡Mensaje Enviado!'}
                                {status === 'error' && 'Error al enviar'}
                            </button>

                            {status === 'success' && (
                                <p className="mt-3 text-center text-xs font-bold text-emerald-400 animate-pulse">
                                    ¡Mensaje enviado con éxito! Te responderé pronto.
                                </p>
                            )}
                            {status === 'error' && (
                                <p className="mt-3 text-center text-xs font-bold text-rose-400">
                                    Hubo un error al enviar. Escríbeme directamente a sergio.villena.vergara@gmail.com.
                                </p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
