import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { playSound } from '../utils/audio';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'pt' | 'en';
  accent: string;
  soundEnabled: boolean;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  lang,
  accent,
  soundEnabled
}) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('success', soundEnabled);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-6 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-obsidian rounded-xl hover:bg-slate-100"
        >
          <X size={18} />
        </button>

        <div>
          <h3 className="text-2xl font-extrabold text-obsidian">
            {lang === 'pt' ? 'Vamos Construir Juntos?' : 'Let’s Build Something Great'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'pt' ? 'Preencha os campos abaixo para conversar sobre novos projetos.' : 'Fill out the form below to discuss frontend engineering opportunities.'}
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle size={48} className="mx-auto text-emerald-500 animate-bounce" />
            <h4 className="text-lg font-bold text-obsidian">
              {lang === 'pt' ? 'Mensagem Enviada!' : 'Message Sent!'}
            </h4>
            <p className="text-xs text-slate-500">
              {lang === 'pt' ? 'Obrigado pelo contato. Retornarei em breve.' : 'Thank you! I will reply shortly.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {lang === 'pt' ? 'Seu Nome' : 'Your Name'}
              </label>
              <input
                required
                type="text"
                placeholder="Ex: Ana Silva"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-obsidian text-sm text-obsidian"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">E-mail</label>
              <input
                required
                type="email"
                placeholder="ana@empresa.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-obsidian text-sm text-obsidian"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {lang === 'pt' ? 'Detalhes do Projeto' : 'Project Details'}
              </label>
              <textarea
                required
                rows={3}
                placeholder={lang === 'pt' ? 'Descreva brevemente sua necessidade...' : 'Tell me a bit about your project...'}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-obsidian text-sm text-obsidian resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-white transition-opacity hover:opacity-95 flex items-center justify-center gap-2 shadow-lg"
              style={{ backgroundColor: accent }}
            >
              <Send size={16} />
              <span>{lang === 'pt' ? 'Enviar Mensagem' : 'Send Message'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};