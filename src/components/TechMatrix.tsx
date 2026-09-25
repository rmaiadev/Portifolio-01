import React, { useMemo, useState } from 'react';
import { SKILLS, TechSkill } from '../data/portfolioData';
import { playSound } from '../utils/audio';
import {
  ArrowDown,
  ArrowRight,
  Braces,
  Check,
  Code2,
  Cpu,
  Database,
  Globe2,
  Layers3,
  Network,
  Server,
  Terminal,
  Zap,
} from 'lucide-react';

interface TechMatrixProps {
  lang: 'pt' | 'en';
  accent: string;
  soundEnabled: boolean;
}

/* ==========================================================================
   Helpers
   ========================================================================== */

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const getTechIcon = (name: string) => {
  const tech = normalize(name);

  if (tech.includes('react')) return Code2;
  if (tech.includes('typescript')) return Braces;
  if (tech.includes('javascript')) return Braces;
  if (tech.includes('wordpress')) return Globe2;
  if (tech.includes('php')) return Server;
  if (tech.includes('mysql')) return Database;
  if (tech.includes('sql')) return Database;
  if (tech.includes('html')) return Globe2;
  if (tech.includes('css')) return Layers3;
  if (tech.includes('bootstrap')) return Layers3;

  return Code2;
};

const getLayer = (skill: TechSkill) => {
  const value = normalize(`${skill.name} ${skill.category}`);

  if (
    value.includes('react') ||
    value.includes('javascript') ||
    value.includes('typescript') ||
    value.includes('html') ||
    value.includes('css') ||
    value.includes('frontend')
  ) {
    return 'frontend';
  }

  if (
    value.includes('php') ||
    value.includes('backend') ||
    value.includes('api') ||
    value.includes('server')
  ) {
    return 'backend';
  }

  if (
    value.includes('wordpress') ||
    value.includes('cms') ||
    value.includes('woocommerce')
  ) {
    return 'cms';
  }

  return 'core';
};

const layerLabels = {
  pt: {
    frontend: 'FRONTEND',
    backend: 'BACKEND',
    cms: 'CMS / CONTENT',
    core: 'CORE / TOOLING',
  },
  en: {
    frontend: 'FRONTEND',
    backend: 'BACKEND',
    cms: 'CMS / CONTENT',
    core: 'CORE / TOOLING',
  },
};

/* ==========================================================================
   Component
   ========================================================================== */

export const TechMatrix: React.FC<TechMatrixProps> = ({
  lang,
  accent,
  soundEnabled,
}) => {
  const [selectedSkill, setSelectedSkill] = useState<TechSkill>(SKILLS[0]);

  const groupedSkills = useMemo(() => {
    return {
      frontend: SKILLS.filter((skill) => getLayer(skill) === 'frontend'),
      backend: SKILLS.filter((skill) => getLayer(skill) === 'backend'),
      cms: SKILLS.filter((skill) => getLayer(skill) === 'cms'),
      core: SKILLS.filter((skill) => getLayer(skill) === 'core'),
    };
  }, []);

  const selectedIcon = getTechIcon(selectedSkill.name);
  const SelectedIcon = selectedIcon;

  const selectSkill = (skill: TechSkill) => {
    setSelectedSkill(skill);
    playSound('hover', soundEnabled);
  };

  const renderTechNode = (skill: TechSkill) => {
    const Icon = getTechIcon(skill.name);
    const isSelected = selectedSkill.name === skill.name;

    return (
      <button
        key={skill.name}
        type="button"
        onClick={() => selectSkill(skill)}
        className={`
          group relative w-full text-left
          rounded-xl border
          px-4 py-3
          transition-all duration-300
          overflow-hidden
          ${
            isSelected
              ? 'border-slate-900 bg-slate-950 text-white shadow-lg'
              : 'border-slate-200 bg-white hover:border-slate-400 hover:-translate-y-0.5'
          }
        `}
      >
        {/* active glow */}
        {isSelected && (
          <span
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 20% 20%, ${accent}, transparent 60%)`,
            }}
          />
        )}

        <div className="relative flex items-center gap-3">
          <div
            className={`
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-lg border
              transition-all
              ${
                isSelected
                  ? 'border-white/10 bg-white/10'
                  : 'border-slate-200 bg-slate-50 group-hover:bg-slate-100'
              }
            `}
          >
            <Icon
              size={17}
              style={{
                color: isSelected ? accent : undefined,
              }}
              className={!isSelected ? 'text-slate-700' : ''}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div
              className={`font-semibold text-sm truncate ${
                isSelected ? 'text-white' : 'text-slate-900'
              }`}
            >
              {skill.name}
            </div>

            <div
              className={`text-[10px] font-mono uppercase tracking-wider ${
                isSelected ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {skill.experience}
            </div>
          </div>

          {isSelected && (
            <Check
              size={15}
              style={{ color: accent }}
              className="shrink-0"
            />
          )}
        </div>
      </button>
    );
  };

  const renderLayer = (
    title: string,
    skills: TechSkill[],
    icon: React.ReactNode,
  ) => {
    if (!skills.length) return null;

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="text-slate-400">{icon}</div>

          <span className="text-[10px] font-mono font-bold tracking-[0.18em] text-slate-500">
            {title}
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="space-y-2">
          {skills.map(renderTechNode)}
        </div>
      </div>
    );
  };

  return (
    <section
      id="tech-matrix"
      className="relative overflow-hidden border-t border-slate-200/70 bg-[#f7f8fa] px-6 py-24"
    >
      {/* ==========================================================================
          Background system
          ========================================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-[8%] top-[8%] h-72 w-72 rounded-full blur-3xl opacity-[0.08]"
          style={{ backgroundColor: accent }}
        />

        <div className="absolute inset-0 opacity-[0.025]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, #0f172a 1px, transparent 1px),
                linear-gradient(to bottom, #0f172a 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ==========================================================================
            Header
            ========================================================================== */}

        <div className="mb-16 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
            <Network size={13} style={{ color: accent }} />

            <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-slate-600">
              {lang === 'pt'
                ? 'TECH STACK // O QUE EU USO'
                : 'TECH STACK // WHAT I USE'}
            </span>

            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: accent }}
            />
          </div>

          <h2 className="max-w-3xl text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
            {lang === 'pt' ? (
              <>
                Tecnologias que fazem parte
                <br />

                <span style={{ color: accent }}>
                  do meu trabalho.
                </span>
              </>
            ) : (
              <>
                Technologies I use
                <br />

                <span style={{ color: accent }}>
                  in my work.
                </span>
              </>
            )}
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            {lang === 'pt'
              ? 'Ferramentas que uso no dia a dia para criar interfaces, sites e experiências digitais.'
              : 'Tools I use every day to create interfaces, websites and digital experiences.'}
          </p>
        </div>

        {/* ==========================================================================
            Architecture flow
            ========================================================================== */}

        <div className="mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-950 px-5 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={14} style={{ color: accent }} />

                <span className="font-mono text-[10px] font-bold tracking-[0.15em] text-slate-300">
                  HOW_IT_WORKS
                </span>
              </div>

              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
                workflow.map()
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5">
            {[
              {
                label: lang === 'pt' ? 'IDEIA' : 'IDEA',
                icon: Globe2,
              },
              {
                label: 'INTERFACE',
                icon: Code2,
              },
              {
                label: lang === 'pt' ? 'DESENVOLVIMENTO' : 'DEVELOPMENT',
                icon: Server,
              },
              {
                label: lang === 'pt' ? 'CONTEÚDO' : 'CONTENT',
                icon: Database,
              },
              {
                label: lang === 'pt' ? 'RESULTADO' : 'RESULT',
                icon: Zap,
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <React.Fragment key={item.label}>
                  <div className="relative flex min-h-[105px] items-center justify-center border-b border-slate-200 p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                    <div className="text-center">
                      <div
                        className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: `${accent}12`,
                          color: accent,
                        }}
                      >
                        <Icon size={17} />
                      </div>

                      <span className="font-mono text-[9px] font-bold tracking-[0.15em] text-slate-600">
                        {item.label}
                      </span>
                    </div>

                    {index < 4 && (
                      <ArrowRight
                        size={14}
                        className="absolute right-[-8px] top-1/2 z-10 hidden -translate-y-1/2 bg-white text-slate-300 md:block"
                      />
                    )}

                    {index < 4 && (
                      <ArrowDown
                        size={14}
                        className="absolute bottom-[-8px] left-1/2 z-10 -translate-x-1/2 bg-white text-slate-300 md:hidden"
                      />
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ==========================================================================
            Main Architecture
            ========================================================================== */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* ----------------------------------------------------------------------
              Stack layers
              ---------------------------------------------------------------------- */}

          <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="font-mono text-[9px] font-bold tracking-[0.18em] text-slate-400">
                  TECHNOLOGIES
                </div>

                <h3 className="mt-1 text-lg font-bold text-slate-950">
                  {lang === 'pt'
                    ? 'Tecnologias que uso'
                    : 'Technologies I use'}
                </h3>
              </div>

              <div className="flex items-center gap-2 rounded-md bg-slate-100 px-2 py-1">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />

                <span className="font-mono text-[9px] text-slate-500">
                  {SKILLS.length.toString().padStart(2, '0')} TECHS
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {renderLayer(
                layerLabels[lang].frontend,
                groupedSkills.frontend,
                <Code2 size={14} />,
              )}

              {renderLayer(
                layerLabels[lang].backend,
                groupedSkills.backend,
                <Server size={14} />,
              )}

              {renderLayer(
                layerLabels[lang].cms,
                groupedSkills.cms,
                <Database size={14} />,
              )}

              {renderLayer(
                layerLabels[lang].core,
                groupedSkills.core,
                <Cpu size={14} />,
              )}
            </div>
          </div>

          {/* ----------------------------------------------------------------------
              Inspector
              ---------------------------------------------------------------------- */}

          <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            {/* terminal header */}

            <div className="flex items-center justify-between bg-slate-950 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-400/80" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                  <span className="h-2 w-2 rounded-full bg-green-400/80" />
                </div>

                <div className="ml-2 flex items-center gap-2">
                  <Terminal size={13} style={{ color: accent }} />

                  <span className="font-mono text-[10px] text-slate-400">
                    technology.details
                  </span>
                </div>
              </div>

              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
                {getLayer(selectedSkill)}
              </span>
            </div>

            <div className="p-6 md:p-8">
              {/* selected technology */}

              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border"
                    style={{
                      borderColor: `${accent}40`,
                      backgroundColor: `${accent}10`,
                      color: accent,
                    }}
                  >
                    <SelectedIcon size={25} />
                  </div>

                  <div>
                    <div className="mb-1 font-mono text-[9px] font-bold tracking-[0.18em] text-slate-400">
                      {lang === 'pt'
                        ? 'TECNOLOGIA'
                        : 'TECHNOLOGY'}
                    </div>

                    <h3 className="text-2xl font-black tracking-tight text-slate-950">
                      {selectedSkill.name}
                    </h3>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] uppercase text-slate-500">
                        {selectedSkill.category}
                      </span>

                      <span className="text-slate-300">•</span>

                      <span
                        className="font-mono text-[10px] font-bold"
                        style={{ color: accent }}
                      >
                        {selectedSkill.experience}
                      </span>
                    </div>
                  </div>
                </div>

                {/* proficiency */}

                <div className="min-w-[110px]">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
                      {lang === 'pt'
                        ? 'EXPERIÊNCIA'
                        : 'EXPERIENCE'}
                    </span>

                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: accent }}
                    >
                      {selectedSkill.proficiency}%
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${selectedSkill.proficiency}%`,
                        backgroundColor: accent,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* description */}

              <div className="mt-8 max-w-2xl">
                <p className="text-sm leading-7 text-slate-600">
                  {selectedSkill.description[lang]}
                </p>
              </div>

              {/* connection diagram */}

              <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Network size={14} style={{ color: accent }} />

                  <span className="font-mono text-[9px] font-bold tracking-[0.18em] text-slate-500">
                    {lang === 'pt'
                      ? 'COMO EU USO'
                      : 'HOW I USE IT'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <span className="font-mono text-[10px] text-slate-500">
                      {lang === 'pt' ? 'IDEIA' : 'IDEA'}
                    </span>
                  </div>

                  <ArrowRight size={13} className="text-slate-300" />

                  <div
                    className="rounded-lg border px-3 py-2"
                    style={{
                      borderColor: `${accent}50`,
                      backgroundColor: `${accent}08`,
                    }}
                  >
                    <span
                      className="font-mono text-[10px] font-bold"
                      style={{ color: accent }}
                    >
                      {selectedSkill.name}
                    </span>
                  </div>

                  <ArrowRight size={13} className="text-slate-300" />

                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <span className="font-mono text-[10px] text-slate-500">
                      INTERFACE
                    </span>
                  </div>

                  <ArrowRight size={13} className="text-slate-300" />

                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <span className="font-mono text-[10px] text-slate-500">
                      {lang === 'pt' ? 'RESULTADO' : 'RESULT'}
                    </span>
                  </div>
                </div>
              </div>

              {/* code */}

              <div className="mt-8">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 size={13} className="text-slate-400" />

                    <span className="font-mono text-[9px] font-bold tracking-[0.15em] text-slate-500">
                      {lang === 'pt'
                        ? 'EXEMPLO_DE_CODIGO'
                        : 'CODE_EXAMPLE'}
                    </span>
                  </div>

                  <span className="font-mono text-[9px] text-slate-400">
                    {selectedSkill.name
                      .toLowerCase()
                      .replace(/[^a-z0-9]/g, '_')}
                    .tsx
                  </span>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full opacity-10 blur-3xl">
                    <div
                      className="h-full w-full"
                      style={{ backgroundColor: accent }}
                    />
                  </div>

                  <pre className="relative max-h-[280px] overflow-x-auto p-5 font-mono text-[11px] leading-6 text-slate-300">
                    <code>{selectedSkill.snippet}</code>
                  </pre>
                </div>
              </div>

              {/* footer */}

              <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: accent }}
                  />

                  <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
                    status: active
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-[9px] text-slate-400">
                  <span>
                    {lang === 'pt'
                      ? 'experiência'
                      : 'experience'}
                  </span>

                  <span className="text-slate-300">/</span>

                  <span className="font-bold text-slate-600">
                    {selectedSkill.experience}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================================
            Bottom statement
            ========================================================================== */}

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              number: '01',
              title:
                lang === 'pt'
                  ? 'Interface'
                  : 'Interface',
              text:
                lang === 'pt'
                  ? 'Interfaces modernas, responsivas e pensadas para quem vai usar.'
                  : 'Modern, responsive interfaces designed for the people who use them.',
              icon: Code2,
            },
            {
              number: '02',
              title:
                lang === 'pt'
                  ? 'Sites'
                  : 'Websites',
              text:
                lang === 'pt'
                  ? 'Projetos digitais claros, funcionais e fáceis de navegar.'
                  : 'Clear, functional digital projects that are easy to navigate.',
              icon: Network,
            },
            {
              number: '03',
              title:
                lang === 'pt'
                  ? 'Experiência'
                  : 'Experience',
              text:
                lang === 'pt'
                  ? 'Design, código e facilidade de uso trabalhando juntos.'
                  : 'Design, code and usability working together.',
              icon: Zap,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                className="group rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-slate-300">
                    {item.number}
                  </span>

                  <Icon
                    size={17}
                    className="text-slate-300 transition-colors"
                  />
                </div>

                <h4 className="font-bold text-slate-950">
                  {item.title}
                </h4>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};