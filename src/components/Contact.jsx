import React from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';

const contactLinks = [
  {
    label: 'Email',
    value: 'sergio.villena.vergara@gmail.com',
    href: 'mailto:sergio.villena.vergara@gmail.com',
    icon: Mail,
  },
  {
    label: 'LinkedIn',
    value: 'sergio-villena-vergara',
    href: 'https://www.linkedin.com/in/sergio-villena-vergara/',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    value: 'SAVillena',
    href: 'https://github.com/SAVillena',
    icon: Github,
  },
  {
    label: 'Ubicación',
    value: 'Chile',
    icon: MapPin,
  },
];
const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = React.useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch("https://formsubmit.co/ajax/sergio.villena.vergara@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Nombre: formData.name,
          Email: formData.email,
          Asunto: formData.subject || 'Contacto desde portafolio',
          Mensaje: formData.message
        })
      });

      const result = await response.json();
      if (response.ok && (result.success === "true" || result.success === true)) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 max-w-3xl"
        >
          <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-blue-400">Contacto</p>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Hablemos de sistemas que tengan impacto real.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            Estoy abierto a proyectos freelance, automatización de procesos, productos full-stack y roles donde pueda mezclar software, infraestructura y datos.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
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
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500">{item.label}</p>
                      <p className="mt-1 break-all text-sm font-semibold text-slate-200">{item.value}</p>
                    </div>
                  </div>
                </div>
              );

              return item.href ? (
                <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}

            <a href="/cv/sergio-villena-cv.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-4 text-sm font-black uppercase tracking-widest text-slate-950 transition hover:scale-[1.01]">
              <Download className="h-4 w-4" />
              Descargar CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-lg border border-white/10 bg-slate-900/45 p-5 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Nombre</span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-400"
                    placeholder="Tu nombre"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-400"
                    placeholder="tu@email.com"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Asunto</span>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-400"
                  placeholder="Proyecto, oportunidad o colaboración"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Mensaje</span>
                <textarea
                  name="message"
                  rows="6"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-400"
                  placeholder="Cuéntame qué necesitas construir, automatizar o mejorar..."
                />
              </label>
              <button
                type="submit"
                disabled={status === 'sending'}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all duration-300 ${
                  status === 'sending'
                    ? 'bg-blue-600/50 cursor-not-allowed shadow-none'
                    : status === 'success'
                    ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-600/20'
                    : status === 'error'
                    ? 'bg-rose-500 hover:bg-rose-400 shadow-rose-600/20'
                    : 'bg-blue-500 hover:bg-blue-400 shadow-blue-600/20'
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
                  ¡Mensaje enviado con éxito directamente a mi correo! Te responderé pronto.
                </p>
              )}
              {status === 'error' && (
                <p className="mt-3 text-center text-xs font-bold text-rose-400">
                  Hubo un error al enviar. Por favor, reintenta o escríbeme directamente a mi email.
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
