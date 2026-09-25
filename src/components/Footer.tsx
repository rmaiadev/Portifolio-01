import React, { useEffect, useState } from 'react';
import {
    ArrowUpRight,
    Check,
    Command,
    Github,
    Linkedin,
    Mail,
    MessageCircle,
    Radio,
    Terminal,
    Zap,
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface FooterProps {
    lang: 'pt' | 'en';
    accent: string;
    soundEnabled: boolean;
    onOpenTerminal: () => void;
    onOpenContact: () => void;
}

interface TechParticle {
    id: number;
    label: string;
    sublabel: string;
    x: number;
    delay: number;
    duration: number;
    rotation: number;
    size: 'sm' | 'md' | 'lg';
}

const TECH_PARTICLES: TechParticle[] = [
    {
        id: 1,
        label: 'JS',
        sublabel: 'JavaScript',
        x: 8,
        delay: 0,
        duration: 7.5,
        rotation: -18,
        size: 'md',
    },
    {
        id: 2,
        label: 'TS',
        sublabel: 'TypeScript',
        x: 27,
        delay: 2.2,
        duration: 8,
        rotation: 16,
        size: 'lg',
    },
    {
        id: 3,
        label: '⚛',
        sublabel: 'React',
        x: 48,
        delay: 1,
        duration: 9,
        rotation: -12,
        size: 'md',
    },
    {
        id: 4,
        label: 'TW',
        sublabel: 'Tailwind',
        x: 67,
        delay: 3.5,
        duration: 7,
        rotation: 22,
        size: 'sm',
    },
    {
        id: 5,
        label: 'HTML',
        sublabel: 'Markup',
        x: 83,
        delay: 0.8,
        duration: 8.5,
        rotation: -25,
        size: 'sm',
    },
    {
        id: 6,
        label: 'CSS',
        sublabel: 'Styles',
        x: 16,
        delay: 5,
        duration: 9,
        rotation: 28,
        size: 'sm',
    },
    {
        id: 7,
        label: 'GIT',
        sublabel: 'Versioning',
        x: 57,
        delay: 6,
        duration: 8,
        rotation: -30,
        size: 'sm',
    },
    {
        id: 8,
        label: 'API',
        sublabel: 'Integration',
        x: 92,
        delay: 4.2,
        duration: 9,
        rotation: 18,
        size: 'md',
    },
];

export function Footer({
    lang,
    accent,
    soundEnabled,
    onOpenTerminal,
    onOpenContact,
}: FooterProps) {
    const [time, setTime] = useState(new Date());
    const [hovered, setHovered] = useState<string | null>(null);
    const [collision, setCollision] = useState(0);

    const isPT = lang === 'pt';

    useEffect(() => {
        const clock = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(clock);
    }, []);

    /*
     * Cria pequenos "eventos" de colisão em intervalos diferentes.
     * Não interfere na interface — serve apenas para dar vida
     * ao campo tecnológico no background.
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setCollision((value) => value + 1);
        }, 2800);

        return () => clearInterval(interval);
    }, []);

    const handleHover = () => {
        playSound('hover', soundEnabled);
    };

    const handleClick = (action: () => void) => {
        playSound('click', soundEnabled);
        action();
    };

    const socialLinks = [
        {
            id: 'github',
            label: 'GITHUB',
            href: 'https://github.com/rmaiadev',
            icon: Github,
        },
        {
            id: 'linkedin',
            label: 'LINKEDIN',
            href: 'https://www.linkedin.com/in/renan-maia-dev/',
            icon: Linkedin,
        },
        {
            id: 'email',
            label: 'EMAIL',
            href: 'mailto:renan-contato@hotmail.com',
            icon: Mail,
        },
    ];

    const getTechSize = (size: TechParticle['size']) => {
        if (size === 'lg') {
            return 'h-14 min-w-14 px-4 text-sm';
        }

        if (size === 'md') {
            return 'h-11 min-w-11 px-3 text-xs';
        }

        return 'h-9 min-w-9 px-2.5 text-[9px]';
    };

    return (
        <footer
            className="relative overflow-hidden border-t border-slate-200 bg-slate-950 text-white"
            style={
                {
                    '--footer-accent': accent,
                } as React.CSSProperties
            }
        >
            {/* ============================================================
          BACKGROUND
         ============================================================ */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">

                {/* Grid técnico */}
                <div
                    className="absolute inset-0 opacity-[0.055]"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, ${accent} 1px, transparent 1px),
              linear-gradient(to bottom, ${accent} 1px, transparent 1px)
            `,
                        backgroundSize: '48px 48px',
                    }}
                />

                {/* Glow principal */}
                <div
                    className="absolute -right-60 -top-60 h-[650px] w-[650px] rounded-full blur-3xl opacity-[0.13]"
                    style={{ backgroundColor: accent }}
                />

                <div
                    className="absolute -bottom-60 -left-60 h-[600px] w-[600px] rounded-full blur-3xl opacity-[0.08]"
                    style={{ backgroundColor: accent }}
                />

                {/* ========================================================
            TECH COLLISION FIELD
           ======================================================== */}

                <div className="absolute inset-0">

                    {TECH_PARTICLES.map((tech) => (
                        <div
                            key={tech.id}
                            className="footer-tech-particle absolute"
                            style={{
                                left: `${tech.x}%`,
                                animationDelay: `${tech.delay}s`,
                                animationDuration: `${tech.duration}s`,
                            }}
                        >
                            <div
                                className={`footer-tech-object ${getTechSize(tech.size)}`}
                                style={{
                                    transform: `rotate(${tech.rotation}deg)`,
                                    borderColor: `${accent}35`,
                                    backgroundColor: `${accent}08`,
                                }}
                            >
                                <span
                                    className="font-mono font-black tracking-tight"
                                    style={{
                                        color: accent,
                                        textShadow: `0 0 14px ${accent}35`,
                                    }}
                                >
                                    {tech.label}
                                </span>

                                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.15em] text-slate-700 opacity-0 transition-opacity duration-300">
                                    {tech.sublabel}
                                </span>
                            </div>

                            {/* rastro */}
                            <div
                                className="footer-tech-trail absolute left-1/2 top-full h-16 w-px -translate-x-1/2"
                                style={{
                                    background: `linear-gradient(to bottom, ${accent}45, transparent)`,
                                }}
                            />
                        </div>
                    ))}

                    {/* ======================================================
              COLISÕES
             ====================================================== */}

                    <div
                        key={collision}
                        className="footer-impact footer-impact-one"
                        style={{
                            borderColor: `${accent}55`,
                        }}
                    >
                        <span
                            style={{
                                backgroundColor: accent,
                                boxShadow: `0 0 18px ${accent}`,
                            }}
                        />
                    </div>

                    <div
                        key={`second-${collision}`}
                        className="footer-impact footer-impact-two"
                        style={{
                            borderColor: `${accent}35`,
                        }}
                    >
                        <span
                            style={{
                                backgroundColor: accent,
                                boxShadow: `0 0 14px ${accent}`,
                            }}
                        />
                    </div>

                    {/* linhas de trajetória */}
                    <div
                        className="footer-orbit-line footer-orbit-one"
                        style={{
                            borderColor: `${accent}20`,
                        }}
                    />

                    <div
                        className="footer-orbit-line footer-orbit-two"
                        style={{
                            borderColor: `${accent}12`,
                        }}
                    />

                </div>

                {/* Scan line */}
                <div
                    className="footer-scan-line absolute left-0 right-0 h-px opacity-25"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                    }}
                />

                {/* Máscara para manter o centro legível */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
              radial-gradient(
                ellipse at center,
                rgba(2, 6, 23, 0.92) 0%,
                rgba(2, 6, 23, 0.76) 38%,
                rgba(2, 6, 23, 0.48) 70%,
                rgba(2, 6, 23, 0.72) 100%
              )
            `,
                    }}
                />
            </div>

            {/* ============================================================
          CONTENT
         ============================================================ */}

            <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

                {/* SYSTEM BAR */}

                <div className="mb-16 flex flex-col gap-4 border-b border-white/10 pb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">

                        <span
                            className="flex h-2 w-2 rounded-full"
                            style={{
                                backgroundColor: accent,
                                boxShadow: `0 0 12px ${accent}`,
                            }}
                        />

                        <span>
                            SYSTEM / FOOTER
                        </span>

                        <span className="text-slate-700">
                            /
                        </span>

                        <span className="text-slate-400">
                            FINAL_OUTPUT
                        </span>

                    </div>

                    <div className="flex items-center gap-3">
                        <span>
                            LOCAL_TIME
                        </span>

                        <span className="text-slate-300">
                            {time.toLocaleTimeString('pt-BR', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })}
                        </span>
                    </div>

                </div>

                {/* STATUS */}

                <div className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em]">

                    <span
                        className="flex items-center gap-2 rounded-full border px-3 py-1.5"
                        style={{
                            borderColor: `${accent}45`,
                            backgroundColor: `${accent}10`,
                            color: accent,
                        }}
                    >
                        <Radio
                            size={12}
                            className="animate-pulse"
                        />

                        {isPT
                            ? 'Disponível para novos projetos'
                            : 'Available for new projects'}
                    </span>

                </div>

                {/* ========================================================
            MAIN MESSAGE
           ======================================================== */}

                <div className="grid gap-12 lg:grid-cols-12 lg:items-end">

                    <div className="lg:col-span-8">

                        <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                            {isPT ? 'Próximo build' : 'Next build'}
                        </p>

                        <h2 className="max-w-5xl text-5xl font-black leading-[0.88] tracking-[-0.055em] sm:text-6xl lg:text-8xl">

                            {isPT ? (
                                <>
                                    VAMOS
                                    <br />

                                    <span
                                        style={{
                                            color: accent,
                                            textShadow: `0 0 40px ${accent}35`,
                                        }}
                                    >
                                        CONSTRUIR.
                                    </span>
                                </>
                            ) : (
                                <>
                                    LET'S
                                    <br />

                                    <span
                                        style={{
                                            color: accent,
                                            textShadow: `0 0 40px ${accent}35`,
                                        }}
                                    >
                                        BUILD.
                                    </span>
                                </>
                            )}

                        </h2>

                        <p className="mt-8 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
                            {isPT
                                ? 'Do primeiro insight ao deploy. Se existe um problema para resolver, existe um próximo build para começar.'
                                : 'From the first insight to deployment. If there is a problem to solve, there is a next build to start.'}
                        </p>

                    </div>

                    {/* SYSTEM CORE */}

                    <div className="lg:col-span-4">

                        <div
                            className="relative overflow-hidden rounded-2xl border bg-white/[0.025] p-5 backdrop-blur-sm"
                            style={{
                                borderColor: `${accent}30`,
                            }}
                        >

                            <div
                                className="absolute right-0 top-0 h-16 w-16"
                                style={{
                                    borderRight: `1px solid ${accent}`,
                                    borderTop: `1px solid ${accent}`,
                                    opacity: 0.5,
                                }}
                            />

                            <div className="mb-6 flex items-center justify-between">

                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                    SYSTEM_CORE
                                </span>

                                <Zap
                                    size={15}
                                    style={{ color: accent }}
                                />

                            </div>

                            <div className="space-y-4">

                                {[
                                    ['DESIGN', 'READY'],
                                    ['CODE', 'READY'],
                                    ['INTEGRATION', 'READY'],
                                    ['DEPLOY', 'READY'],
                                ].map(([name, status]) => (

                                    <div
                                        key={name}
                                        className="flex items-center justify-between border-b border-white/5 pb-3 font-mono text-[10px]"
                                    >

                                        <span className="text-slate-500">
                                            {name}
                                        </span>

                                        <span className="flex items-center gap-2 text-slate-300">

                                            <span
                                                className="h-1.5 w-1.5 rounded-full"
                                                style={{
                                                    backgroundColor: accent,
                                                    boxShadow: `0 0 8px ${accent}`,
                                                }}
                                            />

                                            {status}

                                        </span>

                                    </div>

                                ))}

                            </div>

                            <div className="mt-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-slate-600">

                                <span>
                                    BUILD_PIPELINE
                                </span>

                                <span>
                                    06 / 06
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================================================
            CTA
           ======================================================== */}

                <div className="mt-16 flex flex-col gap-4 sm:flex-row">

                    <a
                        href="https://wa.me/5511954816957?text=Olá%20Renan!%20Vi%20seu%20portfólio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={handleHover}
                        onClick={() => playSound('click', soundEnabled)}
                        className="group inline-flex items-center justify-center gap-3 rounded-xl px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.15em] text-slate-950 transition-all duration-300 hover:scale-[1.02]"
                        style={{
                            backgroundColor: accent,
                            boxShadow: `0 0 0 1px ${accent}30, 0 12px 40px ${accent}20`,
                        }}
                    >
                        <MessageCircle size={16} />

                        {isPT
                            ? 'Falar sobre um projeto'
                            : 'Talk about a project'}

                        <ArrowUpRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </a>

                    <button
                        onClick={() => handleClick(onOpenTerminal)}
                        onMouseEnter={handleHover}
                        className="group inline-flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.15em] text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                    >

                        <Terminal size={15} />

                        {isPT
                            ? 'Explorar CLI'
                            : 'Explore CLI'}

                        <Command
                            size={13}
                            className="text-slate-600"
                        />

                        <span className="text-slate-600">
                            K
                        </span>

                    </button>

                </div>

                {/* ========================================================
            SOCIAL
           ======================================================== */}

                <div className="mt-24 grid gap-3 sm:grid-cols-3">

                    {socialLinks.map((item) => {

                        const Icon = item.icon;
                        const isHovered = hovered === item.id;

                        return (
                            <a
                                key={item.id}
                                href={item.href}
                                target={item.id !== 'email' ? '_blank' : undefined}
                                rel={
                                    item.id !== 'email'
                                        ? 'noopener noreferrer'
                                        : undefined
                                }
                                onMouseEnter={() => {
                                    setHovered(item.id);
                                    handleHover();
                                }}
                                onMouseLeave={() => setHovered(null)}
                                className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5"
                                style={{
                                    borderColor: isHovered
                                        ? `${accent}50`
                                        : undefined,

                                    backgroundColor: isHovered
                                        ? `${accent}08`
                                        : undefined,
                                }}
                            >

                                <div className="flex items-center gap-4">

                                    <Icon
                                        size={17}
                                        className="transition-colors duration-300"
                                        style={{
                                            color: isHovered
                                                ? accent
                                                : '#94a3b8',
                                        }}
                                    />

                                    <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-slate-400">
                                        {item.label}
                                    </span>

                                </div>

                                <ArrowUpRight
                                    size={14}
                                    className="text-slate-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    style={{
                                        color: isHovered
                                            ? accent
                                            : undefined,
                                    }}
                                />

                                <div
                                    className="absolute bottom-0 left-0 h-px transition-all duration-500"
                                    style={{
                                        width: isHovered
                                            ? '100%'
                                            : '0%',

                                        backgroundColor: accent,
                                    }}
                                />

                            </a>
                        );
                    })}

                </div>

                {/* ========================================================
            TERMINAL
           ======================================================== */}

                <div className="mt-20 overflow-hidden rounded-xl border border-white/10 bg-black/30">

                    <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">

                        <span className="h-2 w-2 rounded-full bg-red-400/70" />
                        <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                        <span className="h-2 w-2 rounded-full bg-green-400/70" />

                        <span className="ml-3 font-mono text-[9px] text-slate-600">
                            renan@portfolio:~
                        </span>

                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-5 py-4 font-mono text-[10px]">

                        <span style={{ color: accent }}>
                            $
                        </span>

                        <span className="text-slate-300">
                            system
                        </span>

                        <span className="text-slate-600">
                            --status
                        </span>

                        <span className="flex items-center gap-2 text-slate-400">

                            <Check
                                size={12}
                                style={{ color: accent }}
                            />

                            {isPT
                                ? 'Sistema pronto para o próximo projeto.'
                                : 'System ready for the next project.'}

                        </span>

                        <span
                            className="h-3 w-1 animate-pulse"
                            style={{
                                backgroundColor: accent,
                            }}
                        />

                    </div>

                </div>

                {/* ========================================================
            BOTTOM
           ======================================================== */}

                <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        RENAN MAIA / WEB DEVELOPER
                    </div>

                    <div className="flex flex-wrap items-center gap-4">

                        <span>
                            © {new Date().getFullYear()}
                        </span>

                        <span className="text-slate-800">
                            •
                        </span>

                        <span>
                            REACT / TYPESCRIPT / TAILWIND
                        </span>

                        <span className="text-slate-800">
                            •
                        </span>

                        <span
                            className="font-bold"
                            style={{
                                color: accent,
                            }}
                        >
                            BUILD. SHIP. EVOLVE.
                        </span>

                    </div>

                </div>

            </div>

            {/* ============================================================
          ANIMATIONS
         ============================================================ */}

            <style>{`

        /*
         * TECHNOLOGY FALL
         * ----------------
         * Cada tecnologia entra pelo topo em uma trajetória
         * diferente. A rotação evita aparência de lista.
         */

        @keyframes footerTechFall {

          0% {
            transform:
              translate3d(0, -140px, 0)
              rotate(0deg)
              scale(0.75);

            opacity: 0;
          }

          8% {
            opacity: 1;
          }

          35% {
            transform:
              translate3d(55px, 230px, 0)
              rotate(85deg)
              scale(1);
          }

          50% {
            transform:
              translate3d(-35px, 390px, 0)
              rotate(155deg)
              scale(1.04);
          }

          68% {
            transform:
              translate3d(65px, 570px, 0)
              rotate(230deg)
              scale(0.94);
          }

          82% {
            opacity: 0.75;
          }

          100% {
            transform:
              translate3d(-40px, 820px, 0)
              rotate(330deg)
              scale(0.65);

            opacity: 0;
          }

        }

        .footer-tech-particle {
          top: -80px;
          z-index: 1;
          animation-name: footerTechFall;
          animation-timing-function: cubic-bezier(.22,.61,.36,1);
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }

        .footer-tech-object {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border-width: 1px;
          border-style: solid;
          border-radius: 12px;
          backdrop-filter: blur(8px);
          background: rgba(15, 23, 42, 0.72);
          box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.25),
            inset 0 0 20px rgba(255, 255, 255, 0.02);
        }

        /*
         * Pequena deformação visual no momento em que os
         * objetos atravessam a região central.
         */

        .footer-tech-particle:nth-child(2n) .footer-tech-object {
          animation: footerObjectSpin 7s ease-in-out infinite;
        }

        .footer-tech-particle:nth-child(3n) .footer-tech-object {
          animation: footerObjectSpinReverse 8s ease-in-out infinite;
        }

        @keyframes footerObjectSpin {

          0%,
          100% {
            transform: rotate(-12deg) scale(1);
          }

          48% {
            transform: rotate(8deg) scale(1.03);
          }

          54% {
            transform: rotate(-2deg) scale(0.92);
          }

          62% {
            transform: rotate(14deg) scale(1);
          }

        }

        @keyframes footerObjectSpinReverse {

          0%,
          100% {
            transform: rotate(15deg) scale(1);
          }

          48% {
            transform: rotate(-5deg) scale(1.02);
          }

          54% {
            transform: rotate(3deg) scale(0.9);
          }

          62% {
            transform: rotate(-15deg) scale(1);
          }

        }

        /*
         * Rastro das tecnologias
         */

        .footer-tech-trail {
          opacity: 0.45;
          filter: blur(0.3px);
        }

        /*
         * IMPACTOS
         */

        @keyframes footerImpact {

          0% {
            transform: translate(-50%, -50%) scale(0.1);
            opacity: 0;
          }

          18% {
            opacity: 0.9;
          }

          55% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.55;
          }

          100% {
            transform: translate(-50%, -50%) scale(2.8);
            opacity: 0;
          }

        }

        .footer-impact {
          position: absolute;
          width: 48px;
          height: 48px;
          border: 1px solid;
          border-radius: 999px;
          animation: footerImpact 2.4s ease-out infinite;
        }

        .footer-impact span {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 4px;
          height: 4px;
          border-radius: 999px;
          transform: translate(-50%, -50%);
        }

        .footer-impact-one {
          left: 34%;
          top: 45%;
        }

        .footer-impact-two {
          left: 68%;
          top: 58%;
          animation-delay: 1.1s;
        }

        /*
         * Pequenas partículas que saem do impacto.
         */

        .footer-impact::before,
        .footer-impact::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 2px;
          height: 18px;
          background: var(--footer-accent);
          opacity: 0.5;
          transform-origin: center bottom;
        }

        .footer-impact::before {
          transform: translate(-50%, -50%) rotate(45deg);
        }

        .footer-impact::after {
          transform: translate(-50%, -50%) rotate(-45deg);
        }

        /*
         * Órbitas / trajetórias.
         */

        .footer-orbit-line {
          position: absolute;
          width: 280px;
          height: 120px;
          border: 1px solid;
          border-radius: 50%;
          opacity: 0.25;
        }

        .footer-orbit-one {
          left: 15%;
          top: 35%;
          transform: rotate(-18deg);
        }

        .footer-orbit-two {
          right: 5%;
          top: 55%;
          transform: rotate(22deg);
        }

        /*
         * SCAN LINE
         */

        @keyframes footerScan {

          0% {
            transform: translateY(-100%);
            opacity: 0;
          }

          10% {
            opacity: 1;
          }

          50% {
            opacity: 0.7;
          }

          90% {
            opacity: 1;
          }

          100% {
            transform: translateY(100vh);
            opacity: 0;
          }

        }

        .footer-scan-line {
          animation: footerScan 8s linear infinite;
        }

        /*
         * REDUCED MOTION
         */

        @media (prefers-reduced-motion: reduce) {

          .footer-tech-particle,
          .footer-impact,
          .footer-scan-line,
          .footer-tech-object {
            animation: none !important;
          }

          .footer-tech-particle {
            opacity: 0.35;
            transform: none !important;
          }

        }

        /*
         * MOBILE
         */

        @media (max-width: 640px) {

          .footer-tech-particle:nth-child(n + 6) {
            display: none;
          }

          .footer-orbit-line {
            opacity: 0.12;
          }

          .footer-impact {
            transform: translate(-50%, -50%) scale(0.8);
          }

        }

      `}</style>
        </footer>
    );
}