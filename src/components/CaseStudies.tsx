import React, { useState } from 'react';
import {
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Layers3,
  MessageCircle,
} from 'lucide-react';

import { playSound } from '../utils/audio';
import projeto01 from '../img/react+typescript.png';
import projeto02 from '../img/woocomerce.png';
import projeto03 from '../img/api-react-ts.png';
import projeto04 from '../img/w-php-js-acf.png';

interface CaseStudyItem {
  id: string;

  title: string;

  subtitle: {
    pt: string;
    en: string;
  };

  category: string;

  image: string;

  summary: {
    pt: string;
    en: string;
  };

  techs: string[];

  link?: string;
}

const PROJECTS: CaseStudyItem[] = [
  {
    id: 'project-001',

    title: 'Projeto 01',

    subtitle: {
      pt: 'Uma experiência digital construída para transformar uma ideia em produto.',
      en: 'A digital experience built to turn an idea into a product.',
    },

    category: 'Web Experience',

    image: projeto01,

    summary: {
      pt: 'Uma interface moderna, responsiva e pensada para criar uma experiência simples e envolvente para quem utiliza o produto.',

      en: 'A modern, responsive interface designed to create a simple and engaging experience for the people using the product.',
    },

    techs: ['React', 'TypeScript', 'TailwindCSS'],

    link: '#',
  },

  {
    id: 'project-002',

    title: 'Projeto 02',

    subtitle: {
      pt: 'Uma experiência de e-commerce pensada para facilitar a jornada de compra.',
      en: 'An e-commerce experience designed to simplify the buying journey.',
    },

    category: 'E-Commerce',

    image: projeto02,

    summary: {
      pt: 'Interface desenvolvida com foco em navegação, apresentação dos produtos e uma experiência de compra mais fluida.',

      en: 'An interface focused on navigation, product presentation and a smoother shopping experience.',
    },

    techs: ['React', 'TypeScript', 'WooCommerce', 'PHP'],

    link: '#',
  },

  {
    id: 'project-003',

    title: 'Projeto 03',

    subtitle: {
      pt: 'Uma plataforma digital criada para tornar informações complexas mais fáceis de explorar.',
      en: 'A digital platform created to make complex information easier to explore.',
    },

    category: 'Platform',

    image: projeto03,

    summary: {
      pt: 'O projeto combina conteúdo, interação e navegação para criar uma experiência digital mais clara e intuitiva.',

      en: 'The project combines content, interaction and navigation to create a clearer and more intuitive digital experience.',
    },

    techs: ['React', 'TypeScript', 'API'],

    link: '#',
  },

  {
    id: 'project-004',

    title: 'Projeto 04',

    subtitle: {
      pt: 'Um ecossistema de conteúdo construído para conectar informação e experiência.',
      en: 'A content ecosystem built to connect information and experience.',
    },

    category: 'Digital Experience',

    image: projeto04,

    summary: {
      pt: 'Projeto desenvolvido para organizar grandes volumes de conteúdo sem abrir mão de uma experiência visual moderna.',

      en: 'A project designed to organize large amounts of content without sacrificing a modern visual experience.',
    },

    techs: ['WordPress', 'PHP', 'JavaScript', 'ACF'],

    link: '#',
  },
];

interface CaseStudiesProps {
  lang: 'pt' | 'en';
  accent: string;
  soundEnabled: boolean;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({
  lang,
  accent,
  soundEnabled,
}) => {
  const isPT = lang === 'pt';

  const [activeProject, setActiveProject] =
    useState<CaseStudyItem>(PROJECTS[0]);

  const activeIndex = PROJECTS.findIndex(
    (project) => project.id === activeProject.id
  );

  const handleProjectSelect = (project: CaseStudyItem) => {
    setActiveProject(project);

    playSound('click', soundEnabled);
  };

  return (
    <section
      id="cases-studio"
      className="relative overflow-hidden px-4 py-28 sm:px-6 lg:px-8"
    >
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${accent} 1px, transparent 1px),
            linear-gradient(to bottom, ${accent} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-10"
        style={{
          backgroundColor: accent,
        }}
      />

      <div className="relative mx-auto max-w-7xl">

        {/* =========================================================
            HEADER
        ========================================================= */}

        <div className="mb-14 max-w-3xl">

          <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 shadow-sm">

            <Layers3
              size={13}
              strokeWidth={2}
              style={{ color: accent }}
            />

            <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-slate-600">
              {isPT ? 'TRABALHO // PROJETOS' : 'WORK // PROJECTS'}
            </span>

            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ backgroundColor: accent }}
            />

          </div>

          <h2 className="max-w-3xl text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
            {isPT ? (
              <>
                IDEIAS QUE SE TORNAM<br />
                <span style={{ color: accent }}>
                  PRODUTOS.
                </span>
              </>
            ) : (
              <>
                IDEAS INTO<br />
                <span style={{ color: accent }}>
                  PRODUCTS.
                </span>
              </>
            )}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            {isPT
              ? 'Projetos que transformaram ideias em experiências digitais.'
              : 'Projects that turned ideas into digital experiences.'}
          </p>

        </div>

        {/* =========================================================
            PROJECT EXPLORER
        ========================================================= */}

        <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)_310px]">

          {/* =====================================================
              PROJECT MENU
          ===================================================== */}

          <aside className="lg:sticky lg:top-24 lg:self-start">

            <div className="mb-4 flex items-center gap-2">

              <Layers3
                size={14}
                style={{ color: accent }}
              />

              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {isPT ? 'PROJETOS' : 'PROJECTS'}
              </span>

            </div>

            <div className="space-y-2">

              {PROJECTS.map((project, index) => {

                const active =
                  activeProject.id === project.id;

                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() =>
                      handleProjectSelect(project)
                    }
                    className="
                      group
                      relative
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      border
                      px-3
                      py-4
                      text-left
                      transition-all
                      duration-300
                    "
                    style={{
                      borderColor: active
                        ? `${accent}55`
                        : 'rgba(15,23,42,0.08)',

                      backgroundColor: active
                        ? `${accent}08`
                        : 'rgba(255,255,255,0.65)',
                    }}
                  >

                    {/* ACTIVE INDICATOR */}

                    <span
                      className="absolute left-0 top-1/2 h-7 w-[2px] -translate-y-1/2 rounded-full transition-opacity duration-300"
                      style={{
                        backgroundColor: accent,
                        opacity: active ? 1 : 0,
                      }}
                    />

                    {/* NUMBER */}

                    <span
                      className="w-6 shrink-0 font-mono text-[10px] font-bold"
                      style={{
                        color: active
                          ? accent
                          : '#94a3b8',
                      }}
                    >
                      0{index + 1}
                    </span>

                    {/* TITLE */}

                    <span className="min-w-0 flex-1">

                      <span
                        className={`
                          block
                          truncate
                          text-sm
                          font-bold
                          transition-colors
                          duration-300
                          ${active
                            ? 'text-slate-950'
                            : 'text-slate-500 group-hover:text-slate-900'
                          }
                        `}
                      >
                        {project.title}
                      </span>

                      <span className="mt-1 block truncate font-mono text-[8px] uppercase tracking-wider text-slate-400">
                        {project.category}
                      </span>

                    </span>

                    <ChevronRight
                      size={14}
                      className="shrink-0 transition-all duration-300"
                      style={{
                        color: active
                          ? accent
                          : '#cbd5e1',

                        transform: active
                          ? 'translateX(2px)'
                          : 'translateX(0)',
                      }}
                    />

                  </button>
                );

              })}

            </div>

          </aside>

          {/* =====================================================
              PROJECT IMAGE
          ===================================================== */}

          <div
            key={activeProject.id}
            className="group min-w-0"
          >

            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-slate-100
                shadow-[0_30px_80px_rgba(15,23,42,0.10)]
              "
              style={{
                boxShadow: `0 30px 80px ${accent}12`,
              }}
            >

              {/* WINDOW BAR */}

              <div className="flex h-10 items-center justify-between border-b border-slate-200 bg-white px-4">

                <div className="flex items-center gap-1.5">

                  <span className="h-2 w-2 rounded-full bg-slate-300" />

                  <span className="h-2 w-2 rounded-full bg-slate-300" />

                  <span className="h-2 w-2 rounded-full bg-slate-300" />

                </div>

                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-300">
                  {activeProject.category}
                </span>

              </div>

              {/* IMAGE */}

              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">

                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="
                    h-full
                    w-full
                    object-contain
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.015]
                  "
                />

                {/* IMAGE OVERLAY */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                  style={{
                    background: `
                      linear-gradient(
                        135deg,
                        ${accent}08,
                        transparent 45%
                      )
                    `,
                  }}
                />

                {/* PROJECT NUMBER */}

                <div
                  className="
                    absolute
                    bottom-4
                    left-4
                    rounded-lg
                    border
                    px-3
                    py-2
                    backdrop-blur-md
                  "
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.82)',
                    borderColor: `${accent}30`,
                  }}
                >

                  <span
                    className="font-mono text-[9px] font-bold tracking-[0.2em]"
                    style={{ color: accent }}
                  >
                    PROJECT 0{activeIndex + 1}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* =====================================================
              PROJECT INFORMATION
          ===================================================== */}

          <div
            key={`info-${activeProject.id}`}
            className="
              flex
              min-h-full
              flex-col
              rounded-2xl
              border
              border-slate-200
              bg-white/70
              p-6
              backdrop-blur-sm
            "
          >

            {/* CATEGORY */}

            <div className="mb-5 flex items-center gap-3">

              <span
                className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                {activeProject.category}
              </span>

              <span className="h-px flex-1 bg-slate-200" />

              <span className="font-mono text-[9px] text-slate-400">
                0{activeIndex + 1}
              </span>

            </div>

            {/* TITLE */}

            <h3 className="text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">

              {activeProject.title}

            </h3>

            {/* SUBTITLE */}

            <p className="mt-4 text-sm font-medium leading-6 text-slate-700">

              {activeProject.subtitle[lang]}

            </p>

            {/* DIVIDER */}

            <div className="my-6 h-px bg-slate-200" />

            {/* SUMMARY */}

            <div>

              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {isPT ? 'SOBRE O PROJETO' : 'ABOUT THE PROJECT'}
              </span>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {activeProject.summary[lang]}
              </p>

            </div>

            {/* TECH */}

            <div className="mt-7">

              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {isPT ? 'TECNOLOGIAS' : 'TECHNOLOGIES'}
              </span>

              <div className="mt-3 flex flex-wrap gap-2">

                {activeProject.techs.map((tech) => (

                  <span
                    key={tech}
                    className="
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      px-2.5
                      py-1.5
                      font-mono
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-500
                    "
                  >
                    {tech}
                  </span>

                ))}

              </div>

            </div>

            {/* CTA */}

            <div className="mt-auto pt-8">

<a
  href="https://wa.me/5511954816957?text=Olá!%20Vi%20seu%20portfólio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
  target="_blank"
  rel="noopener noreferrer"
  onClick={() =>
    playSound('click', soundEnabled)
  }
  className="
    group
    flex
    w-full
    items-center
    justify-between
    rounded-xl
    px-4
    py-3.5
    font-mono
    text-[9px]
    font-bold
    uppercase
    tracking-[0.15em]
    text-slate-950
    transition-all
    duration-300
    hover:scale-[1.015]
  "
  style={{
    backgroundColor: accent,
    boxShadow: `0 10px 30px ${accent}25`,
  }}
>

  <span className="flex items-center gap-2">

    <MessageCircle
      size={14}
      strokeWidth={2}
    />

    <span>
      {isPT
        ? 'FALAR SOBRE ESTE PROJETO'
        : 'TALK ABOUT THIS PROJECT'}
    </span>

  </span>

  <ArrowUpRight
    size={15}
    className="
      transition-transform
      duration-300
      group-hover:-translate-y-0.5
      group-hover:translate-x-0.5
    "
  />

</a>

</div>

          </div>

        </div>

        {/* =========================================================
            BOTTOM STATUS
        ========================================================= */}

        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">

          <div className="flex items-center gap-2">

            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: accent }}
            />

            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
              {isPT
                ? 'SELECIONE UM PROJETO'
                : 'SELECT A PROJECT'}
            </span>

          </div>

          <span className="font-mono text-[9px] text-slate-300">
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(PROJECTS.length).padStart(2, '0')}
          </span>

        </div>

      </div>
    </section>
  );
};