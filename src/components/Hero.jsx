import React from 'react';
import { ArrowDown, Download, Github, Linkedin, Mail, MapPin } from '../icons';
import useMagnetic from '../hooks/useMagnetic';

const MagneticWrapper = ({ children }) => {
    const magneticRef = useMagnetic();
    return React.cloneElement(children, { ref: magneticRef });
};

const proofPoints = [
    { value: 'Full Stack', label: 'Desarrollo Web' },
    { value: 'IA Aplicada', label: 'Agentes y Flujos' },
    { value: 'GIS / Mapas', label: 'Datos Espaciales' },
    { value: 'DevOps / Cloud', label: 'Infraestructura' },
];

const Hero = () => {
    return (
        <section id="inicio" className="relative min-h-screen pt-28 pb-12 lg:pt-36 lg:pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    <div
                        className="lg:col-span-7 opacity-0 animate-fade-in-up"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-premium text-[11px] font-black uppercase tracking-[0.18em] mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                            Full Stack · IA aplicada · GIS · Infraestructura
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.0] text-gradient break-words">
                            Construyo sistemas digitales que automatizan operaciones reales.
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed font-light">
                            Soy Sergio Villena, Ingeniero Civil en Informática. Desarrollo plataformas full-stack, flujos con IA, sistemas geoespaciales y herramientas de monitoreo para negocios e infraestructura crítica.
                        </p>

                        <div className="flex flex-wrap gap-4 sm:gap-5 mb-8">
                            <MagneticWrapper>
                                <a href="#proyectos" className="inline-flex items-center justify-center gap-2 px-6 py-4 sm:px-8 bg-white text-slate-950 font-black rounded-2xl hover:scale-105 transition-transform shadow-2xl text-sm sm:text-base w-full sm:w-auto">
                                    Ver casos reales
                                    <ArrowDown className="w-4 h-4" aria-hidden="true" />
                                </a>
                            </MagneticWrapper>
                            <MagneticWrapper>
                                <a href="/cv/sergio-villena-cv.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-4 sm:px-8 bg-slate-900/60 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all border border-white/10 backdrop-blur text-sm sm:text-base w-full sm:w-auto">
                                    Descargar CV
                                    <Download className="w-4 h-4" aria-hidden="true" />
                                </a>
                            </MagneticWrapper>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                            <a className="inline-flex items-center gap-2 hover:text-white transition-colors" href="mailto:sergio.villena.vergara@gmail.com">
                                <Mail className="w-4 h-4" aria-hidden="true" />
                                Email
                            </a>
                            <a className="inline-flex items-center gap-2 hover:text-white transition-colors" href="https://www.linkedin.com/in/sergio-villena-vergara/" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="w-4 h-4" aria-hidden="true" />
                                LinkedIn
                            </a>
                            <a className="inline-flex items-center gap-2 hover:text-white transition-colors" href="https://github.com/SAVillena" target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4" aria-hidden="true" />
                                GitHub
                            </a>
                            <span className="inline-flex items-center gap-2">
                                <MapPin className="w-4 h-4" aria-hidden="true" />
                                Chile
                            </span>
                        </div>
                    </div>

                    <div
                        className="lg:col-span-5 opacity-0 animate-fade-in-scale"
                    >
                        <div className="flex flex-col gap-4">
                            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/50 shadow-2xl shadow-blue-950/40">
                                <img
                                    src="/profile/sergio-villena-portrait.webp"
                                    alt="Sergio Villena"
                                    className="h-[380px] sm:h-[420px] w-full object-cover object-[center_8%]"
                                    loading="eager"
                                />
                            </div>
                            {/* Stats panel – flujo normal, sin superposición */}
                            <div className="rounded-2xl border border-white/10 bg-slate-950/85 p-4 backdrop-blur-xl shadow-2xl">
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                    {proofPoints.map((item) => (
                                        <div key={item.value} className="rounded-xl bg-white/[0.04] p-3 text-center flex flex-col justify-center min-h-[72px]">
                                            <p className="text-[13px] sm:text-sm font-black text-white leading-tight">{item.value}</p>
                                            <p className="mt-1 text-[9px] font-bold uppercase leading-snug tracking-wider text-slate-500">{item.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Separator line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-1.5 h-1.5 rounded-full bg-blue-500/50" />
            </div>
        </section>
    );
};

export default Hero;
