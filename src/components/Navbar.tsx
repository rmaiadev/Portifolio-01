import React from 'react';
import {
  Volume2,
  VolumeX,
  Globe,
  Terminal as TerminalIcon
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface NavbarProps {
  lang: 'pt' | 'en';
  setLang: (lang: 'pt' | 'en') => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  accent: string;
  setAccent: (color: string) => void;
  accentColors: { name: string; hex: string }[];
  onOpenTerminal: () => void;
  showAccentSwitcher?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  soundEnabled,
  setSoundEnabled,
  accent,
  setAccent,
  accentColors,
  onOpenTerminal,
  showAccentSwitcher = true
}) => {
  return (
    <header className="sticky top-0 z-[9999] bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo / Brand */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => playSound('click', soundEnabled)}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-white shadow-md transition-transform hover:scale-105"
            style={{ backgroundColor: accent }}
          >
            &lt;/&gt;
          </div>

          <div>
            <h1 className="text-lg font-extrabold text-obsidian tracking-tight leading-none">
              RENAN<span style={{ color: accent }}>.MAIA</span>
            </h1>

            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Desenvolvedor Front-End
            </p>
          </div>
        </div>

        {/* Quick Actions & Controls */}
        <div className="flex items-center gap-3">

          {/* Color Switcher — some/aparece conforme sai do Hero */}
          <div
            className={`hidden sm:flex items-center overflow-hidden rounded-lg border transition-all duration-300 ease-out ${
              showAccentSwitcher
                ? 'gap-1.5 px-2.5 py-2 max-w-xs opacity-100 bg-slate-100 border-slate-200'
                : 'gap-0 px-0 py-2 max-w-0 opacity-0 border-transparent pointer-events-none'
            }`}
          >
            {accentColors.map((col) => (
              <button
                key={col.hex}
                type="button"
                onClick={() => {
                  setAccent(col.hex);
                  playSound('click', soundEnabled);
                }}
                title={col.name}
                aria-label={`Selecionar cor ${col.name}`}
                className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                  accent === col.hex
                    ? 'scale-125 ring-2 ring-white ring-offset-1'
                    : 'hover:scale-110'
                }`}
                style={{ backgroundColor: col.hex }}
              />
            ))}
          </div>

          {/* CLI Terminal Trigger Button */}
          <button
            onClick={() => {
              playSound('command', soundEnabled);
              onOpenTerminal();
            }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-obsidian font-mono text-xs transition-all border border-slate-200"
            title="Abrir CLI Terminal"
          >
            <TerminalIcon
              size={14}
              style={{ color: accent }}
            />

            <span>Terminal CLI</span>

            <span className="px-1.5 py-0.5 rounded bg-white text-[10px] text-slate-500 shadow-xs border border-slate-200">
              ⌘K
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              playSound('click', next);
            }}
            className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-all"
            title={
              soundEnabled
                ? 'Desativar efeitos sonoros'
                : 'Ativar efeitos sonoros'
            }
          >
            {soundEnabled ? (
              <Volume2
                size={18}
                style={{ color: accent }}
              />
            ) : (
              <VolumeX
                size={18}
                className="text-slate-400"
              />
            )}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => {
              playSound('click', soundEnabled);
              setLang(lang === 'pt' ? 'en' : 'pt');
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-obsidian text-xs font-semibold transition-all border border-slate-200"
          >
            <Globe
              size={14}
              style={{ color: accent }}
            />

            <span className="uppercase">
              {lang}
            </span>
          </button>

        </div>
      </div>
    </header>
  );
};