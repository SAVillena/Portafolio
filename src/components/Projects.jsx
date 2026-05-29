import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Activity,
    ArrowUpRight,
    Bot,
    Github,
    Lock,
    MapPin,
    Server,
    Sparkles,
    X,
} from 'lucide-react';

const projects = [
    {
        id: 'gruas-ams',
        title: 'Grúas AMS',
        subtitle: 'Ecosistema de automatización logística e inteligencia territorial',
        type: 'Freelance',
        status: 'Live',
        role: 'Ingeniero de Software e IA / Diseñador e implementador del ecosistema full stack',
        icon: Bot,
        accent: 'rose',
        featured: true,
        cover: '/projects/gruas-ams/gruas-ams-card.webp',
        images: [
            { src: '/projects/gruas-ams/gruas-ams-hero.webp', label: 'Landing principal' },
            { src: '/projects/gruas-ams/gruas-ams-automation-flow.webp', label: 'Flujo n8n anonimizado' },
            { src: '/projects/gruas-ams/gruas-ams-home-mobile.webp', label: 'Hero móvil' },
            { src: '/projects/gruas-ams/gruas-ams-coverage-mobile.webp', label: 'Cobertura territorial' },
        ],
        problem: 'Fuga de ventas nocturnas por atención manual lenta en WhatsApp, cálculo tarifario complejo y bajo rendimiento SEO móvil en búsquedas de emergencia por comuna.',
        solution: 'Arquitectura self-hosted con n8n, Chatwoot, Evolution API, agentes IA, Google Maps y landing pages programáticas para respuesta, cotización y despacho 24/7.',
        metrics: [
            ['<5s', 'respuesta automática'],
            ['40%', 'menos carga manual'],
            ['13.9s → <1.5s', 'mejora LCP'],
            ['32', 'landings por comuna'],
        ],
        stack: ['n8n', 'OpenAI API', 'Gemini API', 'Chatwoot', 'Evolution API', 'Google Maps API', 'Next.js 15', 'Docker', 'Google Sheets API'],
        links: [],
    },
    {
        id: 'peluqueria',
        title: 'Sistema de Reservas Premium',
        subtitle: 'Agenda digital, catálogo y panel autogestionable para peluquería',
        type: 'Freelance',
        status: 'Demo / próxima puesta en marcha',
        role: 'Desarrollador full-stack: arquitectura, diseño UI/UX y desarrollo',
        icon: Sparkles,
        accent: 'amber',
        cover: '/projects/peluqueria/peluqueria-card.webp',
        images: [
            { src: '/projects/peluqueria/peluqueria-hero.webp', label: 'Sitio público' },
            { src: '/projects/peluqueria/peluqueria-booking.webp', label: 'Reserva online' },
            { src: '/projects/peluqueria/peluqueria-confirmation.webp', label: 'Confirmación y WhatsApp' },
            { src: '/projects/peluqueria/peluqueria-dashboard.webp', label: 'Panel administrativo' },
        ],
        problem: 'La coordinación manual generaba cruces de horarios, exceso de mensajes y una experiencia poco clara para mostrar servicios, precios y disponibilidad.',
        solution: 'Plataforma PERN con reserva online, validación de disponibilidad, confirmación de hora, catálogo administrable e imágenes gestionadas en Cloudinary.',
        metrics: [
            ['100%', 'agendamiento online'],
            ['0%', 'cruces de horario'],
            ['inmediato', 'edición de precios'],
        ],
        stack: ['React 19', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Prisma ORM', 'Cloudinary', 'JWT', 'Bcrypt'],
        links: [],
    },
    {
        id: 'solidarity-map',
        title: 'Solidarity Map',
        subtitle: 'Plataforma GIS para logística de emergencia',
        type: 'Innovación / Personal',
        status: 'Prototipo funcional / listo para piloto',
        role: 'Diseñador y desarrollador autónomo de la arquitectura',
        icon: MapPin,
        accent: 'blue',
        cover: '/projects/solidarity-map/solidarity-map-card.webp',
        images: [
            { src: '/projects/solidarity-map/solidarity-map-map.webp', label: 'Mapa interactivo' },
            { src: '/projects/solidarity-map/solidarity-map-list.webp', label: 'Lista por cercanía' },
            { src: '/projects/solidarity-map/solidarity-map-admin.webp', label: 'Panel de administración' },
            { src: '/projects/solidarity-map/solidarity-map-location-modal.webp', label: 'Selección de ubicación' },
            { src: '/projects/solidarity-map/solidarity-map-suggest-modal.webp', label: 'Sugerir centro' },
        ],
        problem: 'Durante emergencias, coordinar centros de acopio y veterinarias requiere datos confiables, georreferenciados y fáciles de consultar por cercanía.',
        solution: 'Sistema con mapa, filtros, modo cercanía, sugerencias revisables e importación masiva de centros sobre una base espacial PostgreSQL/PostGIS.',
        metrics: [
            ['36', 'centros demo'],
            ['radio', 'búsqueda por cercanía'],
            ['admin', 'gestión de centros'],
        ],
        stack: ['Java', 'Spring Boot', 'PostgreSQL', 'PostGIS'],
        links: [{ label: 'GitHub', href: 'https://github.com/SAVillena/Solidarity-Map', icon: Github }],
    },
    {
        id: 'dustsense',
        title: 'DustSense',
        subtitle: 'Monitoreo ambiental geoespacial para minería',
        type: 'Empresa · INNTECH',
        status: 'Privado / producción interna',
        role: 'Ingeniero de Software y Encargado de TI',
        icon: Activity,
        accent: 'emerald',
        cover: '/projects/dustsense/dustsense-card.webp',
        images: [
            { src: '/projects/dustsense/dustsense-alerts.webp', label: 'Panel de alertas' },
            { src: '/projects/dustsense/dustsense-monitoring-map.webp', label: 'Mapa geoespacial' },
            { src: '/projects/dustsense/dustsense-charts.webp', label: 'Gráficos de series temporales' },
        ],
        problem: 'La faena necesitaba centralizar telemetría ambiental para medir, mapear y monitorear concentraciones de polvo PM2.5 y PM10 en tiempo real.',
        solution: 'Arquitectura PERN con PostGIS para capturar flujos de sensores, espacializar datos, visualizar métricas críticas y activar alertas tempranas.',
        metrics: [
            ['tiempo real', 'telemetría ambiental'],
            ['PM2.5 / PM10', 'umbrales críticos'],
            ['PostGIS', 'datos geoespaciales'],
        ],
        stack: ['PostgreSQL', 'Express', 'React', 'Node.js', 'PostGIS', 'Datos georreferenciados'],
        links: [{ label: 'Uso privado', icon: Lock }],
    },
    {
        id: 'proxmox',
        title: 'Inventario Automatizado Proxmox',
        subtitle: 'Monitoreo de infraestructura virtualizada para Mundo Pacífico',
        type: 'Empresa · Mundo Pacífico',
        status: 'Live interno / demo de respaldo',
        role: 'Desarrollador de software e infraestructura core en contexto de práctica profesional',
        icon: Server,
        accent: 'teal',
        cover: '/projects/proxmox/proxmox-card.webp',
        images: [
            { src: '/projects/proxmox/proxmox-summary.webp', label: 'Resumen ejecutivo' },
            { src: '/projects/proxmox/proxmox-clusters.webp', label: 'Clústers' },
            { src: '/projects/proxmox/proxmox-storage.webp', label: 'Storage' },
        ],
        problem: 'Supervisar manualmente clústers, nodos, VMs y crecimiento de recursos consumía demasiado tiempo y dificultaba auditorías mensuales.',
        solution: 'Sistema Laravel que consume la API de Proxmox VE, centraliza métricas críticas y automatiza reportes de capacidad física y virtual.',
        metrics: [
            ['~400', 'VMs monitoreadas'],
            ['10', 'clústers'],
            ['38', 'nodos'],
            ['2408', 'CPU cores'],
            ['517.4TB', 'storage físico'],
        ],
        stack: ['PHP', 'Laravel', 'Eloquent ORM', 'Guzzle HTTP', 'MySQL', 'Blade', 'JavaScript', 'Proxmox VE API', 'Ubuntu Server', 'Apache'],
        links: [{ label: 'GitHub', href: 'https://github.com/SAVillena/Proxmox', icon: Github }],
    },
];

const accentMap = {
    rose: 'border-rose-500/40 text-rose-300 bg-slate-950/80 backdrop-blur-md',
    amber: 'border-amber-500/40 text-amber-300 bg-slate-950/80 backdrop-blur-md',
    blue: 'border-blue-500/40 text-blue-300 bg-slate-950/80 backdrop-blur-md',
    emerald: 'border-emerald-500/40 text-emerald-300 bg-slate-950/80 backdrop-blur-md',
    teal: 'border-teal-500/40 text-teal-300 bg-slate-950/80 backdrop-blur-md',
};

/* ─── ImageFrame ────────────────────────────────────────────────────────────
   Contenedor de imagen con fondo blur decorativo.
   IMPORTANTE: el contenedor usa overflow-hidden para que la imagen blur
   no se filtre al exterior. El z-index relativo garantiza que la imagen
   principal esté encima de la capa de desenfoque.
─────────────────────────────────────────────────────────────────────────── */
const ImageFrame = ({ src, alt, className = '', imageClassName = '' }) => (
    <div className={`relative overflow-hidden bg-slate-950 ${className}`}>
        {/* Fondo decorativo borroso – no puede sobresalir del overflow-hidden */}
        <img
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-xl pointer-events-none"
        />
        {/* Capa oscura */}
        <div className="absolute inset-0 bg-slate-950/45 pointer-events-none" />
        {/* Imagen real – z-10 garantiza que esté por encima de las capas decorativas */}
        <img
            src={src}
            alt={alt}
            className={`relative z-10 h-full w-full object-contain ${imageClassName}`}
        />
        {/* Viñeta/Sombra interna para suavizar bordes duros de capturas claras */}
        <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_24px_rgba(2,6,23,0.85)] sm:shadow-[inset_0_0_36px_rgba(2,6,23,0.95)] opacity-90" />
    </div>
);

/* ─── ProjectModal ──────────────────────────────────────────────────────────
   Modal de detalle de proyecto.

   Correcciones mobile:
   • En pantallas pequeñas el modal usa una sola columna con scroll vertical
     completo (overflow-y-auto en el contenedor raíz del panel).
   • En lg+ cambia a dos columnas, cada columna con su propio scroll.
   • El label de la imagen activa está encima de la imagen (z-20) para que
     nunca quede tapado por el ImageFrame.
─────────────────────────────────────────────────────────────────────────── */
const ProjectModal = ({ project, onClose }) => {
    const [activeImage, setActiveImage] = useState(project.images[0]);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const Icon = project.icon;

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
                {/* En mobile: flujo continuo; en lg: columna scrolleable independiente. */}
                <div className="flex flex-col lg:overflow-y-auto modal-scroll border-b border-white/10 lg:border-b-0 lg:border-r lg:max-h-[92vh]">
                    {/* Imagen principal */}
                    <div className="relative flex-shrink-0">
                        <ImageFrame
                            src={activeImage.src}
                            alt={activeImage.label}
                            className="h-[38vh] sm:h-[45vh] lg:h-[52vh] lg:min-h-[340px] lg:max-h-[520px] w-full"
                        />
                        {/* Label sobre la imagen – z-20 para superar el z-10 de ImageFrame */}
                        <div className="absolute left-4 top-4 z-20 rounded-lg bg-slate-950/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
                            {activeImage.label}
                        </div>
                        {/* Botón cerrar visible en mobile arriba a la derecha */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute right-4 top-4 z-20 rounded-lg bg-slate-950/70 p-2 text-slate-300 backdrop-blur transition hover:bg-slate-950/90 hover:text-white lg:hidden"
                            aria-label="Cerrar"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Thumbnails – grid adaptativo según cantidad de imágenes */}
                    <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-shrink-0">
                        {project.images.map((image) => (
                            <button
                                key={image.src}
                                type="button"
                                onClick={() => setActiveImage(image)}
                                aria-label={`Ver captura: ${image.label}`}
                                aria-pressed={activeImage.src === image.src}
                                className={`overflow-hidden rounded-lg border text-left transition ${
                                    activeImage.src === image.src
                                        ? 'border-white/60'
                                        : 'border-white/10 hover:border-white/30'
                                }`}
                            >
                                <ImageFrame src={image.src} alt={image.label} className="aspect-video w-full" />
                                {/* Label del thumbnail – fuera del ImageFrame, nunca tapado */}
                                <span className="block truncate px-2 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400" aria-hidden="true">
                                    {image.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Columna derecha: detalle del proyecto ── */}
                {/* lg:overflow-y-auto para scroll independiente en lg.
                    En mobile ya está dentro del flujo scrolleable del panel principal. */}
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
                            <X className="h-5 w-5" />
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
                                  const LinkIcon = link.icon;
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
                                    <Lock className="h-4 w-4" />
                                    Repo privado / información sensible
                                </span>
                              )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ─── ProjectCard ───────────────────────────────────────────────────────────
   Tarjeta de proyecto en la lista.

   Correcciones:
   • El div exterior de la tarjeta es `flex flex-col` en mobile para que
     la imagen quede ARRIBA y el texto ABAJO, sin superposición.
   • En featured + lg: se activa el grid de dos columnas.
   • El badge de tipo (Freelance / Empresa…) tiene z-10 explícito para
     garantizar que esté siempre visible sobre la imagen.
   • El gradiente que oscurece la imagen solo aplica cuando corresponde.
─────────────────────────────────────────────────────────────────────────── */
const ProjectCard = ({ project, onOpen }) => {
    const Icon = project.icon;

    return (
        <motion.article
            layout
            className={`group overflow-hidden rounded-xl border border-white/10 bg-slate-900/35 transition hover:border-white/25 ${
                project.featured ? 'lg:col-span-2' : ''
            }`}
        >
            {/* Layout: columna en mobile, dos columnas en featured+lg */}
            <div className={`flex flex-col ${project.featured ? 'lg:grid lg:grid-cols-[1.1fr_0.9fr]' : ''}`}>
                {/* ── Bloque imagen ── */}
                <div className="relative overflow-hidden bg-slate-900 flex-shrink-0">
                    <ImageFrame
                        src={project.cover}
                        alt={project.title}
                        className={project.featured ? 'h-56 sm:h-72 lg:h-full lg:min-h-[380px]' : 'h-52 sm:h-64'}
                        imageClassName="transition duration-500 group-hover:scale-[1.03]"
                    />
                    {/* Gradiente sutil en la base de la imagen – no superpone texto */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                    {/* Badge de tipo – z-10 para estar siempre encima del ImageFrame */}
                    <div className={`absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${accentMap[project.accent]}`}>
                        <Icon className="h-3.5 w-3.5" />
                        {project.type}
                    </div>
                </div>

                {/* ── Bloque texto ── separado de la imagen, nunca superpuesto */}
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
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

/* ─── Projects (sección) ──────────────────────────────────────────────────── */
const Projects = () => {
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
                    {projects.map((project) => (
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
