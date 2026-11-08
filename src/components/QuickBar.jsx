import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Download, Send, Zap } from '../icons';

const QuickBar = () => {
    const [visible, setVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 520);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText('sergio.villena.vergara@gmail.com');
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        } catch {
            window.location.href = 'mailto:sergio.villena.vergara@gmail.com';
        }
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-3 w-auto max-w-[95vw]"
                >
                    <div className="flex items-center gap-1.5 sm:gap-2 rounded-2xl border border-white/15 bg-slate-950/90 p-1.5 backdrop-blur-2xl shadow-[0_16px_40px_rgba(2,6,23,0.85),0_0_25px_rgba(59,130,246,0.18)]">
                        <a
                            href="/cv/sergio-villena-cv.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-slate-950 text-[11px] font-black uppercase tracking-wider hover:bg-sky-50 transition-colors whitespace-nowrap"
                            title="Abrir o descargar CV actualizado"
                        >
                            <Download className="w-3.5 h-3.5" />
                            <span>CV PDF</span>
                        </a>

                        <a
                            href="#servicios"
                            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors whitespace-nowrap"
                        >
                            <Zap className="w-3.5 h-3.5 text-sky-400" />
                            <span>Servicios TI</span>
                        </a>

                        <button
                            type="button"
                            onClick={handleCopyEmail}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors whitespace-nowrap"
                            title="Copiar correo electrónico"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-300">Email Copiado</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5 text-blue-400" />
                                    <span>Copiar Email</span>
                                </>
                            )}
                        </button>

                        <a
                            href="#contact"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-500/20 border border-blue-400/30 text-sky-300 hover:bg-blue-500/30 hover:text-white text-[11px] font-black uppercase tracking-wider transition-colors whitespace-nowrap"
                        >
                            <Send className="w-3.5 h-3.5" />
                            <span>Contacto</span>
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default QuickBar;

