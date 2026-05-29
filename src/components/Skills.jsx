import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Server, BarChart3, Bot, Wrench } from 'lucide-react';

const Skills = () => {
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const skillGroups = [
        {
            icon: <Code2 className="w-7 h-7" />,
            color: 'blue',
            title: 'Lenguajes',
            skills: ['JavaScript', 'TypeScript', 'Java (Spring)', 'Python', 'C++', 'PHP'],
        },
        {
            icon: <Globe className="w-7 h-7" />,
            color: 'emerald',
            title: 'Web Stack',
            skills: ['React.JS', 'Next.js 15', 'Node.js', 'Express', 'Angular', 'Laravel', 'Shadcn UI', 'Tailwind CSS'],
        },
        {
            icon: <Server className="w-7 h-7" />,
            color: 'purple',
            title: 'Infra & DevOps',
            skills: ['Proxmox VE', 'Docker', 'Docker Compose', 'Linux Admin', 'VPS Hetzner', 'Nginx Proxy'],
        },
        {
            icon: <BarChart3 className="w-7 h-7" />,
            color: 'amber',
            title: 'Data & GIS',
            skills: ['PostgreSQL', 'PostGIS', 'MySQL', 'Prisma ORM', 'Google Sheets API', 'Telemetría'],
        },
        {
            icon: <Bot className="w-7 h-7" />,
            color: 'rose',
            title: 'AI & Automation',
            skills: ['n8n Workflows', 'OpenAI API', 'Gemini API', 'Function Calling', 'Chatwoot', 'Evolution API', 'Google Maps API'],
        },
        {
            icon: <Wrench className="w-7 h-7" />,
            color: 'teal',
            title: 'Tools & SEO',
            skills: ['Git / GitHub', 'Vite', 'JWT Auth', 'REST APIs', 'JSON-LD Schemas', 'SEO Programático', 'Cloudinary'],
        },
    ];

    const colorMap = {
        blue:   { bg: 'bg-blue-600/10',   icon: 'text-blue-500',   badge: 'bg-blue-500/10 text-blue-300' },
        emerald:{ bg: 'bg-emerald-600/10', icon: 'text-emerald-500',badge: 'bg-emerald-500/10 text-emerald-300' },
        purple: { bg: 'bg-purple-600/10',  icon: 'text-purple-500', badge: 'bg-purple-500/10 text-purple-300' },
        amber:  { bg: 'bg-amber-600/10',   icon: 'text-amber-500',  badge: 'bg-amber-500/10 text-amber-300' },
        rose:   { bg: 'bg-rose-600/10',    icon: 'text-rose-500',   badge: 'bg-rose-500/10 text-rose-300' },
        teal:   { bg: 'bg-teal-600/10',    icon: 'text-teal-500',   badge: 'bg-teal-500/10 text-teal-300' },
    };

    return (
        <section id="habilidades" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6"
                >
                    <div className="max-w-2xl">
                        <h3 className="text-3xl sm:text-5xl font-black text-white mb-6 tracking-tight leading-none italic uppercase">
                            Habilidades <br /><span className="text-blue-500">Técnicas</span>
                        </h3>
                        <p className="text-slate-400 text-lg font-light">Dominio del ciclo completo de desarrollo: producto, automatización, datos geoespaciales e infraestructura.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-4 py-2 glass-card rounded-lg text-xs font-bold uppercase tracking-widest text-slate-300">Español: Nativo</div>
                        <div className="px-4 py-2 glass-card rounded-lg text-xs font-bold uppercase tracking-widest text-blue-400">Inglés: Técnico</div>
                    </div>
                </motion.div>

                {/* Featured: AI & Automation badge */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[11px] font-black uppercase tracking-[0.2em]">
                        <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                        Nuevas capacidades: AI & Workflow Automation con n8n
                    </div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {skillGroups.map((group) => {
                        const c = colorMap[group.color];
                        return (
                            <motion.div
                                key={group.title}
                                variants={cardVariants}
                                className="glass-card p-6 sm:p-8 rounded-[2.5rem] group hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className={`w-14 h-14 ${c.bg} rounded-2xl flex items-center justify-center ${c.icon} mb-7`}>
                                    {group.icon}
                                </div>
                                <h4 className="text-white font-black text-base mb-5 uppercase tracking-wider">{group.title}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {group.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className={`px-3 py-1 ${c.badge} rounded-lg text-xs font-medium`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
