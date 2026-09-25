import React from 'react';
import { Sparkles, Palette, Code2, ArrowRight } from 'lucide-react';
import { playSound } from '../utils/audio';

interface HeroProps {
  lang: 'pt' | 'en';
  accent: string;
  setAccent: (color: string) => void;
  accentColors: { name: string; hex: string }[];
  soundEnabled: boolean;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  accent,
  setAccent,
  accentColors,
  soundEnabled,
  onOpenContact
}) => {
  return (
    <section className="relative pt-16 pb-20 px-6 max-w-7xl mx-auto">
      {/* Background Subtle Ambient Glow */}
      <div
  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[600px] h-[300px] sm:h-[350px] blur-[100px] sm:blur-[120px] opacity-15 pointer-events-none transition-colors duration-700"
  style={{ backgroundColor: accent }}
/>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Column: Headline */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
            <Sparkles size={14} style={{ color: accent }} />
            <span className="text-xs font-semibold text-slate-700 tracking-wide">
              {lang === 'pt' ? 'Front-End Developer & WordPress Specialist' : 'Front-End Developer & WordPress Specialist'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-obsidian tracking-tight leading-[1.1]">
            {lang === 'pt' ? (
              <>Código que constrói. <span style={{ color: accent }}>Interfaces</span> que conectam.</>
            ) : (
              <>Code that builds. <span style={{ color: accent }}>Interfaces</span> that connect.</>
            )}
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            {lang === 'pt'
              ? 'Especialista em construir aplicações reativas de alta performance em React, TypeScript e arquitecturas Headless avançadas integradas com WordPress e PHP.'
              : 'Specialist in crafting high-performance, reactive interfaces using React, TypeScript, and modern Headless WordPress architectures.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://wa.me/5511954816957?text=Olá%20Renan!%20Vi%20seu%20portfólio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('success', soundEnabled)}
              className="px-6 py-3.5 rounded-xl font-bold text-white shadow-lg shadow-slate-200/50 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
              style={{ backgroundColor: accent }}
            >
              <span>{lang === 'pt' ? 'Iniciar Conversa' : 'Start Project'}</span>
              <ArrowRight size={18} />
            </a>

            <a
              href="#tech-matrix"
              onClick={() => playSound('click', soundEnabled)}
              className="px-6 py-3.5 rounded-xl font-semibold bg-white hover:bg-slate-50 text-obsidian border border-slate-200 shadow-sm transition-all"
            >
              {lang === 'pt' ? 'Explorar Stack' : 'Explore Stack'}
            </a>
          </div>
        </div>

        {/* Right Column: Live Interactive Theme Studio Box */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-obsidian font-bold text-sm">
                <Palette size={16} style={{ color: accent }} />
                <span>{lang === 'pt' ? 'Estúdio de Design ao Vivo' : 'Live Design Engine'}</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200 font-semibold">
                SYSTEM ONLINE
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'pt'
                ? 'Altere a paleta de cores primária do portfólio em tempo real. Teste a harmonia dos componentes no tema claro de alabastro.'
                : 'Modify the primary accent theme in real time. Experience component contrast on alabaster light theme.'}
            </p>

            {/* Accent Selectors */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-700 block">
                {lang === 'pt' ? 'Cor de Destaque (Accent Color):' : 'Select Accent Color:'}
              </span>
              <div className="grid grid-cols-4 gap-2">
                {accentColors.map((col) => (
                  <button
                  key={col.hex}
                  onClick={() => {
                    setAccent(col.hex);
                    playSound('click', soundEnabled);
                  }}
                  className={`p-2.5 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all ${
                    accent === col.hex ? 'bg-slate-50 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                  }`}
                  style={accent === col.hex ? { borderColor: col.hex } : undefined}
                >
                  <span className="w-5 h-5 rounded-full shadow-inner" style={{ backgroundColor: col.hex }} />
                </button>
                ))}
              </div>
            </div>

            {/* Simulated Live Code Component Preview */}
            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-[10px] border-b border-slate-800 pb-1">
                <span>theme.config.ts</span>
                <Code2 size={12} />
              </div>
              <p className="text-slate-300">
                <span className="text-purple-400">const</span> theme = &#123;
              </p>
              <p className="pl-4 text-emerald-400">
                accent: <span className="text-amber-300">'{accent}'</span>,
              </p>
              <p className="pl-4 text-slate-400">mode: 'alabaster-light'</p>
              <p className="text-slate-300">&#125;;</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};