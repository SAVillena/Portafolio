import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as Icons from '../icons';
import useKeyboardNavigation from '../hooks/useKeyboardNavigation';

/* ─── Slide/Fade Animation Variants ──────────────────────────────────────── */
const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 60 : -60,
        opacity: 0,
        scale: 0.98,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction) => ({
        x: direction > 0 ? -60 : 60,
        opacity: 0,
        scale: 0.98,
    }),
};

const slideTransition = {
    x: { type: 'spring', stiffness: 320, damping: 30 },
    opacity: { duration: 0.2 },
    scale: { duration: 0.2 },
};

/* ─── usePreloadImages ──────────────────────────────────────────────────────
   Precarga imágenes adyacentes (prev/next) en el caché del navegador.
─────────────────────────────────────────────────────────────────────────── */
const usePreloadImages = (images, currentIndex) => {
    useEffect(() => {
        const preload = (src) => {
            if (!src) return;
            const img = new Image();
            img.src = src;
        };

        const len = images.length;
        if (len <= 1) return;

        preload(images[(currentIndex + 1) % len].src);
        preload(images[(currentIndex - 1 + len) % len].src);

        if (len >= 3) {
            preload(images[(currentIndex + 2) % len].src);
        }
    }, [images, currentIndex]);
};

const accentMap = {
    rose: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
    amber: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
    blue: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
    emerald: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
    teal: 'border-teal-500/40 text-teal-300 bg-teal-500/10',
};

const spotlightByAccent = {
    rose: 'rgba(244, 63, 94, 0.14)',
    amber: 'rgba(245, 158, 11, 0.14)',
    blue: 'rgba(59, 130, 246, 0.15)',
    emerald: 'rgba(16, 185, 129, 0.14)',
    teal: 'rgba(20, 184, 166, 0.14)',
};

const projectCategories = [
    { id: 'all', label: 'Todos los Casos (6)' },
    { id: 'laravel-infra', label: 'Cloud (Oracle), CI/CD & Infraestructura', match: ['proxmox', 'duocore'] },
    { id: 'gis', label: 'Spring Boot, GIS & Telemetría', match: ['dustsense', 'solidarity-map'] },
    { id: 'ia-web', label: 'Full Stack Web & Integraciones', match: ['duocore', 'gruas-ams', 'peluqueria'] },
];

/* ─── ImageStage ────────────────────────────────────────────────────────────
   Escenario limpio sin viñetas oscuras que tapen bordes, adaptable a
   capturas panorámicas (desktop) y verticales (móvil).
─────────────────────────────────────────────────────────────────────────── */
const ImageStage = ({ src, alt, className = '', imageClassName = '', loading = 'eager' }) => (
    <div className={`relative overflow-hidden bg-slate-950 flex items-center justify-center ${className}`}>
        {/* Fondo ambiental sutil para rellenar proporciones dispares sin cortar la captura */}
        <img
            src={src}
            alt=""
            aria-hidden="true"
            loading={loading}
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-2xl pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-slate-950/50 pointer-events-none" />
        <img
            src={src}
            alt={alt}
            loading={loading}
            draggable={false}
            className={`relative z-10 max-h-full max-w-full object-contain rounded-lg shadow-2xl ${imageClassName}`}
        />
    </div>
);

/* ─── FullscreenLightbox ────────────────────────────────────────────────────
   Visor de pantalla completa con navegación, zoom y soporte táctil.
─────────────────────────────────────────────────────────────────────────── */
const FullscreenLightbox = ({ images, currentIndex, onClose, onNavigate }) => {
    usePreloadImages(images, currentIndex);
    const [zoomed, setZoomed] = useState(false);
    const [direction, setDirection] = useState(1);
    const prevIndexRef = useRef(currentIndex);

    useEffect(() => {
        setDirection(currentIndex > prevIndexRef.current ? 1 : -1);
        prevIndexRef.current = currentIndex;
        setZoomed(false);
    }, [currentIndex]);

    useKeyboardNavigation({
        onEscape: onClose,
        onArrowLeft: () => onNavigate(-1),
        onArrowRight: () => onNavigate(1),
    });

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    const handleDoubleClick = () => setZoomed((z) => !z);

    const handleDragEnd = (e, { offset }) => {
        if (offset.x < -45) {
            onNavigate(1);
        } else if (offset.x > 45) {
            onNavigate(-1);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex flex-col bg-slate-950/95 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Visor de imagen en pantalla completa"
            onClick={onClose}
        >
            {/* Top Bar del Lightbox */}
            <div
                className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-950/80 z-20"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-3 min-w-0">
                    <span className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-black text-white">
                        {currentIndex + 1} / {images.length}
                    </span>
                    <span className="truncate text-xs sm:text-sm font-bold text-slate-200">
                        {images[currentIndex].label}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-wider text-white transition hover:bg-white/20"
                    aria-label="Cerrar visor"
                >
                    <span>Cerrar</span>
                    <Icons.X className="h-4 w-4" />
                </button>
            </div>

            {/* Contenedor Central */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-6">
                {images.length > 1 && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onNavigate(-1);
                        }}
                        className="absolute left-2 sm:left-5 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-slate-900/90 p-3 text-white shadow-xl backdrop-blur transition hover:bg-slate-800 active:scale-95"
                        aria-label="Imagen anterior"
                    >
                        <Icons.ArrowLeft className="h-5 w-5" />
                    </button>
                )}

                {images.length > 1 && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onNavigate(1);
                        }}
                        className="absolute right-2 sm:right-5 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-slate-900/90 p-3 text-white shadow-xl backdrop-blur transition hover:bg-slate-800 active:scale-95"
                        aria-label="Imagen siguiente"
                    >
                        <Icons.ArrowRight className="h-5 w-5" />
                    </button>
                )}

                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={images[currentIndex].src}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={slideTransition}
                        className="relative z-[5] flex items-center justify-center w-full h-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDoubleClick();
                        }}
                    >
                        <motion.img
                            src={images[currentIndex].src}
                            alt={images[currentIndex].label}
                            animate={{ scale: zoomed ? 1.85 : 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            drag={!zoomed ? 'x' : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.7}
                            onDragEnd={handleDragEnd}
                            className={`max-h-[82vh] max-w-[94vw] select-none object-contain rounded-lg shadow-2xl ${
                                zoomed ? 'cursor-zoom-out' : 'cursor-grab active:cursor-grabbing'
                            }`}
                            draggable={false}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

/* ─── ProjectModal ──────────────────────────────────────────────────────────
   Modal de detalle de proyecto optimizado para móvil y escritorio.
─────────────────────────────────────────────────────────────────────────── */
const ProjectModal = ({ project, onClose }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const activeImage = project.images[activeIndex];

    usePreloadImages(project.images, activeIndex);

    const navigateImage = useCallback(
        (delta) => {
            setDirection(delta);
            setActiveIndex((prev) => {
                const next = prev + delta;
                if (next < 0) return project.images.length - 1;
                if (next >= project.images.length) return 0;
                return next;
            });
        },
        [project.images.length]
    );

    const navigateLightbox = useCallback(
        (delta) => {
            setLightboxIndex((prev) => {
                const next = prev + delta;
                if (next < 0) return project.images.length - 1;
                if (next >= project.images.length) return 0;
                return next;
            });
        },
        [project.images.length]
    );

    useKeyboardNavigation(
        {
            onEscape: onClose,
            onArrowLeft: () => navigateImage(-1),
            onArrowRight: () => navigateImage(1),
        },
        !lightboxOpen
    );

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const handleModalDragEnd = (e, { offset }) => {
        if (offset.x < -45) {
            navigateImage(1);
        } else if (offset.x > 45) {
            navigateImage(-1);
        }
    };

    const handleRequestSimilar = () => {
        onClose();
        window.dispatchEvent(
            new CustomEvent('select-contact-topic', {
                detail: `Consulta sobre solución similar a ${project.title}`,
            })
        );
        const contactEl = document.getElementById('contact');
        if (contactEl) {
            contactEl.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const Icon = Icons[project.icon] || Icons.Bot;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`Detalle del proyecto: ${project.title}`}
            onClick={onClose}
        >
            <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl" />

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="relative z-10 w-full max-w-7xl max-h-[94vh] overflow-y-auto lg:overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-2xl
                           flex flex-col lg:grid lg:grid-cols-[minmax(0,1.32fr)_minmax(360px,0.85fr)] modal-scroll"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ── Barra Superior Sticky en Móvil (Siempre accesible al hacer scroll) ── */}
                <div className="sticky top-0 z-30 flex items-center justify-between gap-3 px-4 py-3 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 lg:hidden">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg border shrink-0 ${accentMap[project.accent]}`}>
                            <Icon className="h-3.5 w-3.5" />
                        </span>
                        <h3 className="text-sm font-black text-white truncate">{project.title}</h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-slate-900 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white hover:bg-slate-800 shrink-0"
                        aria-label="Cerrar caso"
                    >
                        <span>Cerrar</span>
                        <Icons.X className="h-4 w-4" />
                    </button>
                </div>

                {/* ── Columna Izquierda: Galería Interactiva ── */}
                <div className="flex flex-col lg:overflow-y-auto modal-scroll border-b border-white/10 lg:border-b-0 lg:border-r lg:max-h-[94vh] bg-slate-950">
                    {/* Barra de control del visor (evita tapar las capturas con badges flotantes) */}
                    <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-900/80 border-b border-white/10">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="hidden sm:flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                            </div>
                            <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-black text-sky-300 shrink-0">
                                {activeIndex + 1} / {project.images.length}
                            </span>
                            <span className="truncate text-xs font-bold text-slate-200">
                                {activeImage.label}
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                            {project.images.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => navigateImage(-1)}
                                        className="rounded-lg border border-white/10 bg-slate-950 px-2.5 py-1.5 text-slate-200 hover:border-sky-400/50 hover:text-white transition"
                                        aria-label="Captura anterior"
                                        title="Captura anterior"
                                    >
                                        <Icons.ArrowLeft className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigateImage(1)}
                                        className="rounded-lg border border-white/10 bg-slate-950 px-2.5 py-1.5 text-slate-200 hover:border-sky-400/50 hover:text-white transition"
                                        aria-label="Captura siguiente"
                                        title="Captura siguiente"
                                    >
                                        <Icons.ArrowRight className="h-3.5 w-3.5" />
                                    </button>
                                </>
                            )}
                            <button
                                type="button"
                                onClick={() => openLightbox(activeIndex)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-white/15 transition"
                                aria-label="Ampliar imagen a pantalla completa"
                            >
                                <Icons.Maximize2 className="h-3.5 w-3.5 text-sky-400" />
                                <span className="hidden sm:inline">Ampliar</span>
                            </button>
                        </div>
                    </div>

                    {/* Escenario de Imagen Principal (Soporta Swipe táctil y Click para ampliar en Móvil y Desktop) */}
                    <div className="relative flex-shrink-0 bg-slate-950 select-none">
                        <div className="h-[34vh] sm:h-[44vh] lg:h-[54vh] min-h-[240px] max-h-[540px] w-full relative overflow-hidden">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={activeImage.src}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={slideTransition}
                                    drag={project.images.length > 1 ? 'x' : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.5}
                                    onDragEnd={handleModalDragEnd}
                                    onClick={() => openLightbox(activeIndex)}
                                    className="absolute inset-0 cursor-zoom-in"
                                >
                                    <ImageStage
                                        src={activeImage.src}
                                        alt={activeImage.label}
                                        className="h-full w-full p-2.5 sm:p-5"
                                        imageClassName="border border-white/10"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Flechas laterales siempre visibles en móvil y desktop */}
                        {project.images.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => navigateImage(-1)}
                                    className="absolute left-2.5 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-slate-950/85 p-2 sm:p-2.5 text-white shadow-lg backdrop-blur transition hover:bg-slate-900 hover:border-sky-400/50 active:scale-95"
                                    aria-label="Imagen anterior"
                                >
                                    <Icons.ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigateImage(1)}
                                    className="absolute right-2.5 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-slate-950/85 p-2 sm:p-2.5 text-white shadow-lg backdrop-blur transition hover:bg-slate-900 hover:border-sky-400/50 active:scale-95"
                                    aria-label="Imagen siguiente"
                                >
                                    <Icons.ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Miniaturas: Carrusel horizontal compacto en Móvil / Grid limpio en Desktop */}
                    <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2.5 p-3 sm:p-4 bg-slate-900/40 border-t border-white/10 modal-scroll snap-x">
                        {project.images.map((image, idx) => {
                            const isSelected = activeIndex === idx;
                            return (
                                <button
                                    key={image.src}
                                    type="button"
                                    onClick={() => {
                                        setDirection(idx > activeIndex ? 1 : -1);
                                        setActiveIndex(idx);
                                    }}
                                    aria-label={`Ver captura: ${image.label}`}
                                    aria-pressed={isSelected}
                                    className={`w-36 sm:w-auto shrink-0 snap-start overflow-hidden rounded-xl border text-left transition-all ${
                                        isSelected
                                            ? 'border-sky-400 ring-2 ring-sky-400/25 bg-slate-900'
                                            : 'border-white/10 bg-slate-950/60 opacity-70 hover:opacity-100 hover:border-white/30'
                                    }`}
                                >
                                    <ImageStage
                                        src={image.src}
                                        alt={image.label}
                                        className="aspect-video w-full p-1"
                                        loading="lazy"
                                    />
                                    <span
                                        className={`block truncate px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
                                            isSelected ? 'text-sky-300' : 'text-slate-400'
                                        }`}
                                        aria-hidden="true"
                                    >
                                        {idx + 1}. {image.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Columna Derecha: Detalle del Caso ── */}
                <div className="lg:overflow-y-auto modal-scroll bg-slate-950 p-5 sm:p-7">
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                            <div className={`mb-2.5 inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${accentMap[project.accent]}`}>
                                <Icon className="h-3.5 w-3.5" />
                                {project.status}
                            </div>
                            <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                                {project.title}
                            </h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                                {project.subtitle}
                            </p>
                        </div>

                        {/* Botón cerrar en Desktop */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="hidden lg:flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-400 transition hover:bg-white/10 hover:text-white shrink-0"
                            aria-label="Cerrar"
                        >
                            <Icons.X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="mb-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2.5">
                        {project.metrics.map(([value, label]) => (
                            <div key={`${value}-${label}`} className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                                <p className="text-lg sm:text-xl font-black text-white">{value}</p>
                                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4 text-sm leading-relaxed text-slate-300">
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                            <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-sky-400">
                                Desafío
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300">{project.problem}</p>
                        </div>
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                            <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                                Solución Implementada
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300">{project.solution}</p>
                        </div>
                        <div className="px-1">
                            <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                Rol Técnico
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300">{project.role}</p>
                        </div>
                    </div>

                    <div className="mt-5">
                        <p className="mb-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            Stack Tecnológico
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {project.stack.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs font-semibold text-slate-200"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-3 pb-2">
                        {project.links.length > 0 ? (
                            project.links.map((link) => {
                                const LinkIcon = Icons[link.icon] || Icons.Bot;
                                if (!link.href) {
                                    return (
                                        <span
                                            key={link.label}
                                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-bold text-slate-400"
                                        >
                                            <LinkIcon className="h-4 w-4" />
                                            {link.label}
                                        </span>
                                    );
                                }
                                return (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-black uppercase tracking-wider text-slate-950 transition hover:scale-[1.02]"
                                    >
                                        <LinkIcon className="h-4 w-4" />
                                        {link.label}
                                    </a>
                                );
                            })
                        ) : (
                            <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-bold text-slate-400">
                                <Icons.Lock className="h-3.5 w-3.5" />
                                {project.noLinksNote ?? 'Repositorio privado'}
                            </span>
                        )}

                        <button
                            type="button"
                            onClick={handleRequestSimilar}
                            className="inline-flex items-center gap-2 rounded-xl border border-sky-400/35 bg-sky-500/15 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-sky-300 transition hover:bg-sky-500/25"
                        >
                            <Icons.Send className="h-3.5 w-3.5" />
                            Cotizar sistema similar
                        </button>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {lightboxOpen && (
                    <FullscreenLightbox
                        images={project.images}
                        currentIndex={lightboxIndex}
                        onClose={() => setLightboxOpen(false)}
                        onNavigate={navigateLightbox}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/* ─── ProjectCard ───────────────────────────────────────────────────────────
   Tarjeta de proyecto con marco de ventana limpio y proporción controlada
   tanto en móvil como en escritorio.
─────────────────────────────────────────────────────────────────────────── */
const ProjectCard = ({ project, onOpen, isFiltered }) => {
    const Icon = Icons[project.icon] || Icons.Bot;
    const isFeaturedSpan = project.featured && !isFiltered;

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        e.currentTarget.style.setProperty(
            '--spotlight-color',
            spotlightByAccent[project.accent] || 'rgba(59, 130, 246, 0.14)'
        );
    };

    return (
        <motion.article
            layout
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            className={`spotlight-card group rounded-3xl border border-white/10 ${
                isFeaturedSpan ? 'lg:col-span-2' : ''
            }`}
        >
            <div className={`relative z-10 flex flex-col h-full ${isFeaturedSpan ? 'lg:grid lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch' : ''}`}>
                {/* ── Bloque Imagen con Marco de Ventana ── */}
                <div
                    className={`relative flex flex-col bg-slate-950/90 border-b border-white/10 cursor-pointer overflow-hidden ${
                        isFeaturedSpan ? 'lg:border-b-0 lg:border-r' : ''
                    }`}
                    onClick={() => onOpen(project)}
                >
                    {/* Barra de ventana del proyecto */}
                    <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-slate-900/90 border-b border-white/[0.07]">
                        <div className="flex items-center gap-2 min-w-0">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-rose-500/60" />
                                <span className="w-2 h-2 rounded-full bg-amber-500/60" />
                                <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
                            </div>
                            <span className={`ml-1 inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${accentMap[project.accent]}`}>
                                <Icon className="h-3 w-3" />
                                {project.type}
                            </span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-sky-300 transition-colors">
                            {project.images.length} vistas · Explorar →
                        </span>
                    </div>

                    {/* Escenario de captura con relación de aspecto controlada */}
                    <div className="flex-1 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950">
                        <ImageStage
                            src={project.cover}
                            alt={project.title}
                            className="w-full aspect-[16/10] rounded-xl"
                            imageClassName="transition duration-500 group-hover:scale-[1.02] border border-white/10"
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* ── Bloque Texto ── */}
                <div className="flex flex-col flex-1 p-5 sm:p-7 justify-between">
                    <div>
                        <div className="mb-4">
                            <p className="mb-1.5 text-[11px] font-black uppercase tracking-widest text-sky-400">
                                {project.status}
                            </p>
                            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-sky-300 transition-colors">
                                {project.title}
                            </h3>
                            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-400">
                                {project.subtitle}
                            </p>
                        </div>

                        <div className="mb-5 grid grid-cols-2 gap-2">
                            {project.metrics.slice(0, isFeaturedSpan ? 4 : 2).map(([value, label]) => (
                                <div key={`${project.id}-${value}-${label}`} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
                                    <p className="text-base sm:text-lg font-black text-white">{value}</p>
                                    <p className="text-[10px] font-semibold uppercase leading-snug tracking-wider text-slate-400">
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <p className="mb-5 text-xs sm:text-sm leading-relaxed text-slate-300">
                            {project.solution}
                        </p>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
                        <div className="flex flex-wrap gap-1.5">
                            {project.stack.slice(0, 4).map((tech) => (
                                <span key={tech} className="rounded-md bg-white/[0.06] px-2 py-1 text-[10px] font-bold text-slate-300">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => onOpen(project)}
                            aria-label={`Ver caso completo: ${project.title}`}
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-950 transition hover:scale-[1.03] hover:bg-sky-50 active:scale-100"
                        >
                            Ver caso
                            <Icons.ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

/* ─── Projects (sección) ──────────────────────────────────────────────────── */
const Projects = ({ projects }) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProjects =
        activeCategory === 'all'
            ? projects
            : projects.filter((p) => {
                  const cat = projectCategories.find((c) => c.id === activeCategory);
                  return cat && cat.match && cat.match.includes(p.id);
              });

    return (
        <section id="proyectos" className="py-24 bg-slate-900/15 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
                >
                    <div className="max-w-2xl">
                        <p className="mb-2.5 text-xs font-black uppercase tracking-[0.24em] text-blue-400">
                            Casos Reales
                        </p>
                        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                            Proyectos con <span className="title-frame">impacto medible</span>
                        </h2>
                        <p className="mt-3 text-base leading-relaxed text-slate-400">
                            Sistemas en producción y arquitecturas completas: plataformas web, reservas online, monitoreo geoespacial (GIS) e infraestructura en Laravel.
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center shrink-0">
                        {[
                            ['5', 'casos reales'],
                            ['100%', 'arquitectura propia'],
                            ['0', 'placeholders'],
                        ].map(([value, label]) => (
                            <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                                <p className="text-2xl font-black text-white">{value}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Filtros de Categoría ── */}
                <div className="flex flex-wrap items-center gap-2 mb-10">
                    {projectCategories.map((cat) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                                    isActive
                                        ? 'bg-white text-slate-950 shadow-lg shadow-blue-500/15'
                                        : 'bg-slate-900/60 text-slate-400 border border-white/10 hover:text-white hover:border-white/25'
                                }`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                <motion.div layout className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects &&
                            filteredProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onOpen={setSelectedProject}
                                    isFiltered={activeCategory !== 'all'}
                                />
                            ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
