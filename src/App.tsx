import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechMatrix } from './components/TechMatrix';
import { CaseStudies } from './components/CaseStudies';
import { TerminalModal } from './components/Terminal';
import { ContactModal } from './components/ContactModal';
import { BuildLog } from './components/BuildLog';
import { Footer } from './components/Footer';

const ACCENT_COLORS = [
  { name: 'Cyan', hex: '#0EA5E9' },
  { name: 'Violet', hex: '#8B5CF6' },
  { name: 'Emerald', hex: '#10B981' },
  { name: 'Amber', hex: '#F59E0B' },
];

export default function App() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [accent, setAccent] = useState('#0EA5E9');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // ── Controla quando o color switcher aparece na Navbar ──
  // Fica escondido enquanto o Hero (que já tem seu próprio seletor) está visível.
  const heroRef = useRef<HTMLDivElement>(null);
  const [showAccentInNavbar, setShowAccentInNavbar] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowAccentInNavbar(!entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-porcelain text-obsidian selection:bg-slate-200">

      {/* Fixed Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        accent={accent}
        setAccent={setAccent}
        accentColors={ACCENT_COLORS}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        showAccentSwitcher={showAccentInNavbar}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <div ref={heroRef}>
          <Hero
            lang={lang}
            accent={accent}
            setAccent={setAccent}
            accentColors={ACCENT_COLORS}
            soundEnabled={soundEnabled}
            onOpenContact={() => setIsContactOpen(true)}
          />
        </div>

        <BuildLog
          lang={lang}
          accent={accent}
          soundEnabled={soundEnabled}
        />

        {/* Interactive Technology Inspector */}
        <TechMatrix
          lang={lang}
          accent={accent}
          soundEnabled={soundEnabled}
        />

        {/* Case Studies */}
        <CaseStudies
          lang={lang}
          accent={accent}
          soundEnabled={soundEnabled}
        />
      </main>

      <Footer
        lang={lang}
        accent={accent}
        soundEnabled={soundEnabled}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Interactive Modals */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        lang={lang}
        accent={accent}
        soundEnabled={soundEnabled}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        lang={lang}
        accent={accent}
        soundEnabled={soundEnabled}
      />

    </div>
  );
}