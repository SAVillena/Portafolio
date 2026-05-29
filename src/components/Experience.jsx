import React from 'react';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, GraduationCap, ServerCog, Sparkles } from 'lucide-react';

const timeline = [
  {
    date: 'Mar 2025 - Presente',
    title: 'Software Engineer Freelance',
    description: 'Diseño e implementación de ecosistemas digitales: automatización logística 24/7 con n8n e IA para Grúas AMS, SEO local programático y sistemas de reserva para negocios.',
    tags: ['n8n', 'OpenAI API', 'Next.js', 'Automatización'],
    icon: Sparkles,
  },
  {
    date: 'Dic 2024 - Mar 2025',
    title: 'Ingeniero de Software y Encargado de TI | INNTECH',
    description: 'Desarrollo de DustSense, plataforma privada de monitoreo ambiental geoespacial para minería, con telemetría PM2.5/PM10, alertas y visualización territorial.',
    tags: ['PERN', 'PostGIS', 'Telemetría', 'Minería'],
    icon: BriefcaseBusiness,
  },
  {
    date: 'Nov 2023 - Feb 2024',
    title: 'Desarrollador de Software e Infraestructura Core | Mundo Pacífico',
    description: 'Automatización del inventario de infraestructura Proxmox para auditar clústers, nodos, VMs, CPU, RAM y almacenamiento físico a escala empresarial.',
    tags: ['Laravel', 'Proxmox API', 'MySQL', 'Infraestructura'],
    icon: ServerCog,
  },
];

const Experience = () => {
  return (
    <section id="trayectoria" className="py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-blue-400">Trayectoria</p>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Experiencia conectada con sistemas reales.
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="relative rounded-lg border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-blue-300">{item.date}</p>
                      <h3 className="mt-2 text-xl font-black text-white">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded-md bg-white/[0.06] px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-300">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {index === 0 && <span className="absolute right-4 top-4 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-300">actual</span>}
                </article>
              );
            })}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-lg border border-white/10 bg-slate-900/45 p-6"
          >
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-emerald-300">Formación</p>
                <h3 className="mt-2 text-2xl font-black text-white">Ingeniería Civil en Informática</h3>
                <p className="mt-2 text-sm font-semibold text-slate-400">Universidad del Bío-Bío</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Perfil orientado a construir productos completos: backend, frontend, bases de datos, infraestructura, automatización y visualización de información para operaciones reales.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                ['Full-stack', 'producto completo'],
                ['GIS', 'PostGIS y mapas'],
                ['IA', 'flujos automatizados'],
                ['Infra', 'Proxmox y Docker'],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-lg bg-white/[0.04] p-4">
                  <p className="font-black text-white">{title}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{detail}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Experience;
