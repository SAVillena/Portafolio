import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as Icons from '../icons';
import useKeyboardNavigation from '../hooks/useKeyboardNavigation';

/* ─── Slide/Fade Animation Variants ──────────────────────────────────────── */
const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 80 : -80,
        opacity: 0,
        scale: 0.96,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction) => ({
        x: direction > 0 ? -80 : 80,
        opacity: 0,
        scale: 0.96,
    }),
};

const slideTransition = {
    x: { type: 'spring', stiffness: 300, damping: 30 },
    opacity: { duration: 0.25 },
    scale: { duration: 0.25 },
};

/* ─── usePreloadImages ──────────────────────────────────────────────────────
   Precarga imágenes adyacentes (prev/next) en el caché del navegador para
   que las transiciones slide/fade no tengan parpadeos de carga.
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

        // Precargar siguiente e imagen anterior (con wrap-around)
        preload(images[(currentIndex + 1) % len].src);
        preload(images[(currentIndex - 1 + len) % len].src);

        // Si hay 3+ imágenes, también precargar 2 pasos adelante
        if (len >= 3) {
            preload(images[(currentIndex + 2) % len].src);
        }
    }, [images, currentIndex]);
};

const accentMap = {
    rose: 'border-rose-500/40 text-rose-300 bg-slate-950/80 backdrop-blur-md',
    amber: 'border-amber-500/40 text-amber-300 bg-slate-950/80 backdrop-blur-md',
    blue: 'border-blue-500/40 text-blue-300 bg-slate-950/80 backdrop-blur-md',
    emerald: 'border-emerald-500/40 text-emerald-300 bg-slate-950/80 backdrop-blur-md',
    teal: 'border-teal-500/40 text-teal-300 bg-slate-950/80 backdrop-blur-md',
};

/* ─── ImageFrame ────────────────────────────────────────────────────────────
   Contenedor de imagen con fondo blur decorativo.
─────────────────────────────────────────────────────────────────────────── */
const ImageFrame = ({ src, alt, className = '', imageClassName = '', loading = 'eager' }) => (
    <div className={`relative overflow-hidden bg-slate-950 ${className}`}>
        <img
            src={src}
            alt=""
            aria-hidden="true"
            loading={loading}
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-xl pointer-events-none"
        />
        <div className="absolute inset-0 bg-slate-950/45 pointer-events-none" />
        <img
            src={src}
            alt={alt}
            loading={loading}
            className={`relative z-10 h-full w-full object-contain ${imageClassName}`}
        />
        <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_24px_rgba(2,6,23,0.85)] sm:shadow-[inset_0_0_36px_rgba(2,6,23,0.95)] opacity-90" />
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

    /* Reset zoom y rastrear dirección al cambiar de imagen */
    useEffect(() => {
        setDirection(currentIndex > prevIndexRef.current ? 1 : -1);
        prevIndexRef.current = currentIndex;
        setZoomed(false);
    }, [currentIndex]);

    useKeyboardNavigation({
        onEscape: onClose,
        onArrowLeft: () => onNavigate(-1),
        onArrowRight: () => onNavigate(1)
    });

    /* Bloquear scroll del body */
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, []);

    const handleDoubleClick = () => setZoomed((z) => !z);

    const handleDragEnd = (e, { offset, velocity }) => {
        const swipe = offset.x;
        if (swipe < -50) {
            onNavigate(1);
        } else if (swipe > 50) {
            onNavigate(-1);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Visor de imagen en pantalla completa"
            onClick={onClose}
        >
            {/* Cerrar */}
            <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
                aria-label="Cerrar visor"
            >
                <Icons.X className="h-5 w-5" />
            </button>

            {/* Contador */}
            <div className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Flecha izquierda */}
            {images.length > 1 && (
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}
                    className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/25 active:scale-95 sm:left-6 sm:p-4"
                    aria-label="Imagen anterior"
                >
                    <Icons.ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
            )}

            {/* Flecha derecha */}
            {images.length > 1 && (
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onNavigate(1); }}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/25 active:scale-95 sm:right-6 sm:p-4"
                    aria-label="Imagen siguiente"
                >
                    <Icons.ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
            )}

            {/* Imagen con slide/fade y Drag */}
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
                    onClick={(e) => { e.stopPropagation(); handleDoubleClick(); }}
                >
                    <motion.img
                        src={images[currentIndex].src}
                        alt={images[currentIndex].label}
                        animate={{ scale: zoomed ? 2 : 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        drag={!zoomed ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.8}
                        onDragEnd={handleDragEnd}
                        className={`max-h-[85vh] max-w-[92vw] select-none object-contain sm:max-h-[88vh] sm:max-w-[90vw] ${zoomed ? 'cursor-zoom-out' : 'cursor-grab active:cursor-grabbing'}`}
                        draggable={false}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Label */}
            <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-white backdrop-blur">
                {images[currentIndex].label}
            </div>
        </motion.div>
    );
};

/* ─── ProjectModal ──────────────────────────────────────────────────────────
   Modal de detalle de proyecto con galería, flechas y lightbox.
─────────────────────────────────────────────────────────────────────────── */
const ProjectModal = ({ project, onClose }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const activeImage = project.images[activeIndex];

    /* Precargar imágenes del proyecto al abrir el modal */
    usePreloadImages(project.images, activeIndex);

    /* Navegación de imágenes con dirección */
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
        [project.images.length],
    );

    /* Navegación del lightbox */
    const navigateLightbox = useCallback(
        (delta) => {
            setLightboxIndex((prev) => {
                const next = prev + delta;
                if (next < 0) return project.images.length - 1;
                if (next >= project.images.length) return 0;
                return next;
            });
        },
        [project.images.length],
    );

    /* Teclado para el modal */
    useKeyboardNavigation({
        onEscape: onClose,
        onArrowLeft: () => navigateImage(-1),
        onArrowRight: () => navigateImage(1)
    }, !lightboxOpen);

    /* Bloquear scroll del body */
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

    const Icon = Icons[project.icon] || Icons.Bot;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`Detalle del proyecto: ${project.title}`}
            onClick={onClose}
        >
            {/* Fondo oscuro */}
            <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl" />

            {/* Panel principal del modal */}
            <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="relative z-10 w-full max-w-7xl max-h-[92vh] overflow-y-auto lg:overflow-hidden rounded-xl border border-white/10 bg-slate-950 shadow-2xl
                           flex flex-col lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(360px,0.85fr)]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ── Columna izquierda: galería de imágenes ── */}
                <div className="flex flex-col lg:overflow-y-auto modal-scroll border-b border-white/10 lg:border-b-0 lg:border-r lg:max-h-[92vh]">
                    {/* Imagen principal con flechas y slide animation */}
                    <div className="relative flex-shrink-0 group/gallery">
                        <div className="h-[38vh] sm:h-[45vh] lg:h-[52vh] lg:min-h-[340px] lg:max-h-[520px] w-full relative overflow-hidden bg-slate-950">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={activeImage.src}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={slideTransition}
                                    className="absolute inset-0"
                                >
                                    <ImageFrame
                                        src={activeImage.src}
                                        alt={activeImage.label}
                                        className="h-full w-full cursor-pointer"
                                        imageClassName="cursor-pointer"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Label sobre la imagen */}
                        <div className="absolute left-4 top-4 z-20 rounded-lg bg-slate-950/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
                            {activeImage.label}
                        </div>

                        {/* Indicador de imagen actual */}
                        <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-slate-950/70 px-2.5 py-1 text-[10px] font-bold text-white/70 backdrop-blur">
                            {activeIndex + 1} / {project.images.length}
                        </div>

                        {/* Botón expandir / fullscreen */}
                        <button
                            type="button"
                            onClick={() => openLightbox(activeIndex)}
                            className="absolute right-14 top-4 z-20 rounded-lg bg-slate-950/70 p-2 text-slate-300 backdrop-blur transition hover:bg-slate-950/90 hover:text-white lg:hidden"
                            aria-label="Ver en pantalla completa"
                        >
                            <Icons.Maximize2 className="h-5 w-5" />
                        </button>

                        {/* Flecha izquierda */}
                        {project.images.length > 1 && (
                            <button
                                type="button"
                                onClick={() => navigateImage(-1)}
                                className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-slate-950/60 p-2 text-white/80 backdrop-blur transition opacity-0 group-hover/gallery:opacity-100 hover:bg-slate-950/80 hover:text-white active:scale-95 sm:left-3 sm:p-2.5"
                                aria-label="Imagen anterior"
                            >
                                <Icons.ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                        )}

                        {/* Flecha derecha */}
                        {project.images.length > 1 && (
                            <button
                                type="button"
                                onClick={() => navigateImage(1)}
                                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-slate-950/60 p-2 text-white/80 backdrop-blur transition opacity-0 group-hover/gallery:opacity-100 hover:bg-slate-950/80 hover:text-white active:scale-95 sm:right-4 sm:p-2.5 lg:right-4"
                                aria-label="Imagen siguiente"
                            >
                                <Icons.ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                        )}

                        {/* Botón cerrar visible en mobile */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute right-4 top-4 z-20 rounded-lg bg-slate-950/70 p-2 text-slate-300 backdrop-blur transition hover:bg-slate-950/90 hover:text-white lg:hidden"
                            aria-label="Cerrar"
                        >
                            <Icons.X className="h-5 w-5" />
                        </button>

                        {/* Click en imagen abre lightbox (solo desktop) */}
                        <button
                            type="button"
                            onClick={() => openLightbox(activeIndex)}
                            className="absolute inset-0 z-[14] hidden cursor-pointer bg-transparent lg:block"
                            aria-label="Abrir en pantalla completa"
                        />
                    </div>

                    {/* Thumbnails – grid adaptativo según cantidad de imágenes */}
                    <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-shrink-0">
                        {project.images.map((image, idx) => (
                            <button
                                key={image.src}
                                type="button"
                                onClick={() => { setDirection(idx > activeIndex ? 1 : -1); setActiveIndex(idx); }}
                                aria-label={`Ver captura: ${image.label}`}
                                aria-pressed={activeIndex === idx}
                                className={`overflow-hidden rounded-lg border text-left transition ${
                                    activeIndex === idx
                                        ? 'border-white/60 ring-1 ring-white/20'
                                        : 'border-white/10 hover:border-white/30'
                                }`}
                            >
                                <ImageFrame src={image.src} alt={image.label} className="aspect-video w-full" />
                                <span className="block truncate px-2 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400" aria-hidden="true">
                                    {image.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Columna derecha: detalle del proyecto ── */}
                <div className="lg:overflow-y-auto modal-scroll bg-slate-950 p-5 sm:p-7">
                    <div className="mb-6 flex items-start justify-between gap-4">
                        <div>
                            <div className={`mb-3 inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${accentMap[project.accent]}`}>
                                <Icon className="h-3.5 w-3.5" />
                                {project.status}
                            </div>
                            <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{project.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.subtitle}</p>
                        </div>
                        {/* Botón cerrar visible en desktop */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="hidden lg:flex rounded-lg bg-white/5 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                            aria-label="Cerrar"
                        >
                            <Icons.X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-3">
                        {project.metrics.map(([value, label]) => (
                            <div key={`${value}-${label}`} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                                <p className="text-xl font-black text-white">{value}</p>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-5 text-sm leading-relaxed text-slate-300">
                        <div>
                            <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-500">Problema</p>
                            <p>{project.problem}</p>
                        </div>
                        <div>
                            <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-500">Solución</p>
                            <p>{project.solution}</p>
                        </div>
                        <div>
                            <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-500">Rol</p>
                            <p>{project.role}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="mb-3 text-xs font-black uppercase tracking-widest text-slate-500">Stack</p>
                        <div className="flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                                <span key={tech} className="rounded-md bg-white/[0.06] px-2.5 py-1 text-[11px] font-bold text-slate-300">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3 pb-2">
                        {project.links.length > 0
                            ? project.links.map((link) => {
                                  const LinkIcon = Icons[link.icon] || Icons.Bot;
                                  if (!link.href) {
                                      return (
                                          <span key={link.label} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-slate-400">
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
                                          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-black text-slate-950 transition hover:scale-[1.02]"
                                      >
                                          <LinkIcon className="h-4 w-4" />
                                          {link.label}
                                      </a>
                                  );
                              })
                            : (
                                <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-slate-400">
                                    <Icons.Lock className="h-4 w-4" />
                                    {project.noLinksNote ?? 'Repo privado / información sensible'}
                                </span>
                              )}
                    </div>
                </div>
            </motion.div>

            {/* Fullscreen Lightbox */}
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
   Tarjeta de proyecto en la lista.
─────────────────────────────────────────────────────────────────────────── */
const ProjectCard = ({ project, onOpen }) => {
    const Icon = Icons[project.icon] || Icons.Bot;

    return (
        <motion.article
            layout
            className={`group overflow-hidden rounded-xl border border-white/10 bg-slate-900/35 transition hover:border-white/25 ${
                project.featured ? 'lg:col-span-2' : ''
            }`}
        >
            <div className={`flex flex-col ${project.featured ? 'lg:grid lg:grid-cols-[1.1fr_0.9fr]' : ''}`}>
                {/* ── Bloque imagen ── */}
                <div className="relative overflow-hidden bg-slate-900 flex-shrink-0">
                    <ImageFrame
                        src={project.cover}
                        alt={project.title}
                        className={project.featured ? 'h-56 sm:h-72 lg:h-full lg:min-h-[380px]' : 'h-52 sm:h-64'}
                        imageClassName="transition duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                    <div className={`absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${accentMap[project.accent]}`}>
                        <Icon className="h-3.5 w-3.5" />
                        {project.type}
                    </div>
                </div>

                {/* ── Bloque texto ── */}
                <div className="flex flex-col p-5 sm:p-7 bg-slate-900/35">
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                            <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-500">{project.status}</p>
                            <h3 className="text-2xl font-black tracking-tight text-white">{project.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.subtitle}</p>
                        </div>
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-2">
                        {project.metrics.slice(0, project.featured ? 4 : 2).map(([value, label]) => (
                            <div key={`${project.id}-${value}-${label}`} className="rounded-lg bg-white/[0.04] p-3">
                                <p className="text-lg font-black text-white">{value}</p>
                                <p className="text-[10px] font-semibold uppercase leading-snug tracking-wider text-slate-500">{label}</p>
                            </div>
                        ))}
                    </div>

                    <p className="mb-6 text-sm leading-relaxed text-slate-400">{project.solution}</p>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                            {project.stack.slice(0, 5).map((tech) => (
                                <span key={tech} className="rounded-md bg-white/[0.06] px-2 py-1 text-[10px] font-bold text-slate-300">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => onOpen(project)}
                            aria-label={`Ver caso completo: ${project.title}`}
                            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-950 transition hover:scale-[1.02] active:scale-100"
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

    return (
        <section id="proyectos" className="py-28 bg-slate-900/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
                >
                    <div className="max-w-3xl">
                        <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-blue-400">Trabajo probado</p>
                        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                            Proyectos con sistema, contexto e impacto.
                        </h2>
                        <p className="mt-4 text-lg leading-relaxed text-slate-400">
                            Una selección de productos reales y prototipos funcionales: automatización con IA, reservas, GIS, monitoreo ambiental e infraestructura virtualizada.
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                        {[
                            ['5', 'casos'],
                            ['3', 'entornos reales'],
                            ['0', 'placeholders'],
                        ].map(([value, label]) => (
                            <div key={label} className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
                                <p className="text-2xl font-black text-white">{value}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {projects && projects.map((project) => (
                        <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
                    ))}
                </div>
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
