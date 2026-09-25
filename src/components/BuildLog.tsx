import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Boxes,
  Check,
  ChevronRight,
  Code2,
  Compass,
  Cpu,
  Database,
  GitBranch,
  Gauge,
  Layers3,
  MousePointer2,
  Network,
  Rocket,
  Search,
  Server,
  Settings2,
  Terminal,
  Workflow,
  Zap,
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface BuildLogProps {
  lang: 'pt' | 'en';
  accent: string;
  soundEnabled: boolean;
}

interface BuildPhase {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  icon: React.ElementType;
  command: string;
  status: string;
  metrics: {
    value: string;
    label: string;
  }[];
  actions: string[];
  stack: string[];
}

const BUILD_PHASES: BuildPhase[] = [
  {
    id: 'discovery',
    number: '01',
    label: 'DESCOBERTA',
    title: 'Entender antes de construir',
    description:
      'Antes de escrever código, entendo o objetivo do produto, o público, a estrutura de conteúdo e os problemas que a interface precisa resolver.',
    icon: Compass,
    command: 'analyze --project --requirements',
    status: 'ANALISANDO',
    metrics: [
      { value: '01', label: 'objetivo' },
      { value: '03+', label: 'inputs' },
      { value: '100%', label: 'contexto' },
    ],
    actions: [
      'Entendimento do projeto',
      'Mapeamento de conteúdo',
      'Identificação de requisitos',
      'Definição de prioridades',
    ],
    stack: ['UX', 'Content', 'Requirements'],
  },
  {
    id: 'architecture',
    number: '02',
    label: 'ARQUITETURA',
    title: 'Desenhar antes de programar',
    description:
      'Transformo requisitos em uma estrutura técnica clara: componentes, páginas, dados, integrações e responsabilidades de cada camada.',
    icon: GitBranch,
    command: 'architecture --define --system',
    status: 'PROJETANDO',
    metrics: [
      { value: 'N', label: 'components' },
      { value: '03', label: 'layers' },
      { value: '∞', label: 'possibilities' },
    ],
    actions: [
      'Arquitetura de componentes',
      'Estrutura de páginas',
      'Modelagem de dados',
      'Definição das integrações',
    ],
    stack: ['React', 'WordPress', 'PHP', 'APIs'],
  },
  {
    id: 'development',
    number: '03',
    label: 'DESENVOLVIMENTO',
    title: 'Transformar arquitetura em produto',
    description:
      'É onde a estrutura ganha vida. Construo componentes reutilizáveis, interfaces responsivas e interações mantendo o código organizado e sustentável.',
    icon: Code2,
    command: 'build --components --responsive',
    status: 'BUILDING',
    metrics: [
      { value: '24+', label: 'modules' },
      { value: '04', label: 'breakpoints' },
      { value: '100%', label: 'responsive' },
    ],
    actions: [
      'Componentização',
      'Desenvolvimento responsivo',
      'Estados e interações',
      'Integração com dados',
    ],
    stack: ['React', 'TypeScript', 'JavaScript', 'CSS'],
  },
  {
    id: 'integration',
    number: '04',
    label: 'INTEGRAÇÃO',
    title: 'Fazer todas as partes conversarem',
    description:
      'Conecto interface, CMS, APIs e banco de dados para transformar componentes isolados em uma experiência digital realmente funcional.',
    icon: Workflow,
    command: 'connect --frontend --backend --cms',
    status: 'CONNECTING',
    metrics: [
      { value: '03+', label: 'layers' },
      { value: 'REST', label: 'protocol' },
      { value: 'LIVE', label: 'data' },
    ],
    actions: [
      'Integração com APIs',
      'CMS e conteúdo dinâmico',
      'Formulários e dados',
      'Comunicação entre camadas',
    ],
    stack: ['REST API', 'WordPress', 'PHP', 'MySQL'],
  },
  {
    id: 'optimization',
    number: '05',
    label: 'OTIMIZAÇÃO',
    title: 'Fazer funcionar melhor',
    description:
      'Depois de funcionar, vem a parte que muita gente ignora: revisar carregamento, estrutura, responsividade, acessibilidade e experiência.',
    icon: Gauge,
    command: 'optimize --performance --ux',
    status: 'OTIMIZANDO',
    metrics: [
      { value: 'UX', label: 'priority' },
      { value: 'A11Y', label: 'accessibility' },
      { value: 'WEB', label: 'performance' },
    ],
    actions: [
      'Otimização de carregamento',
      'Ajustes de UX',
      'Responsividade',
      'Acessibilidade',
    ],
    stack: ['Performance', 'UX', 'SEO', 'A11Y'],
  },
  {
    id: 'deploy',
    number: '06',
    label: 'DEPLOY',
    title: 'Colocar o produto no mundo',
    description:
      'A entrega não termina quando o código funciona localmente. Acompanho a publicação e verifico se o produto continua funcionando no ambiente real.',
    icon: Rocket,
    command: 'deploy --production --verify',
    status: 'READY',
    metrics: [
      { value: 'PROD', label: 'environment' },
      { value: 'LIVE', label: 'status' },
      { value: '24/7', label: 'available' },
    ],
    actions: [
      'Publicação',
      'Validação em produção',
      'Correções pós-deploy',
      'Manutenção evolutiva',
    ],
    stack: ['Git', 'Hosting', 'Production', 'Maintenance'],
  },
];

const TELEMETRY_WIDTHS = [82, 91, 76];

export const BuildLog: React.FC<BuildLogProps> = ({
  lang,
  accent,
  soundEnabled,
}) => {
  const [activePhase, setActivePhase] = useState(2);
  const [showProcess, setShowProcess] = useState(false);

  const phase = BUILD_PHASES[activePhase];
  const PhaseIcon = phase.icon;

  const selectPhase = (index: number) => {
    setActivePhase(index);
    setShowProcess(false);
    playSound('hover', soundEnabled);
  };

  const previousPhase = () => {
    if (activePhase > 0) {
      setActivePhase((current) => current - 1);
      setShowProcess(false);
      playSound('hover', soundEnabled);
    }
  };

  const nextPhase = () => {
    if (activePhase < BUILD_PHASES.length - 1) {
      setActivePhase((current) => current + 1);
      setShowProcess(false);
      playSound('hover', soundEnabled);
    }
  };

  /*
   * ================================================================
   * VISUAL SCENES
   * ================================================================
   */

  const renderDiscovery = () => (
    <div className="relative flex h-[430px] items-center justify-center overflow-hidden bg-[#070b12]">
      {/* scan grid */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${accent} 1px, transparent 1px),
              linear-gradient(to bottom, ${accent} 1px, transparent 1px)
            `,
            backgroundSize: '38px 38px',
          }}
        />
      </div>

      {/* scan glow */}
      <div
        className="absolute h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: accent }}
      />

      {/* orbit */}
      <div
        className="absolute h-64 w-64 rounded-full border border-dashed opacity-30"
        style={{ borderColor: accent }}
      />

      <div
        className="absolute h-44 w-44 rounded-full border opacity-20"
        style={{ borderColor: accent }}
      />

      {/* central interface */}
      <div className="relative z-10 w-[310px] max-w-[80%] overflow-hidden rounded-xl border border-white/10 bg-[#101722] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400/60" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
            <span className="h-2 w-2 rounded-full bg-green-400/60" />
          </div>

          <span className="font-mono text-[12px] tracking-[0.18em] text-white/30">
            PROJECT_ANALYZER
          </span>
        </div>

        <div className="p-5">
          <div className="mb-5 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{
                backgroundColor: `${accent}18`,
                color: accent,
              }}
            >
              <Compass size={18} />
            </div>

            <div>
              <div className="font-mono text-[11px] text-white/30">
                INPUT
              </div>
              <div className="mt-1 text-sm font-bold text-white">
                produto_digital
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {['OBJETIVO', 'CONTEÚDO', 'USUÁRIOS', 'REQUESITOS'].map(
              (item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.025] px-3 py-2"
                  style={{
                    animation: `buildFadeUp .5s ease ${index * 120}ms both`,
                  }}
                >
                  <span className="font-mono text-[11px] text-white/40">
                    {item}
                  </span>

                  <Check size={11} style={{ color: accent }} />
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* scanner */}
      <div
        className="absolute left-1/2 top-1/2 z-20 h-[280px] w-[2px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `linear-gradient(to bottom, transparent, ${accent}, transparent)`,
          animation: 'buildScan 2.8s ease-in-out infinite',
        }}
      />

      <div
        className="absolute right-[16%] top-[20%] flex h-12 w-12 items-center justify-center rounded-xl border bg-[#0c121c]/90 shadow-lg"
        style={{
          borderColor: `${accent}35`,
          color: accent,
          animation: 'buildFloat 3s ease-in-out infinite',
        }}
      >
        <Search size={18} />
      </div>

      <div
        className="absolute bottom-[18%] left-[14%] flex h-11 w-11 items-center justify-center rounded-xl border bg-[#0c121c]/90 shadow-lg"
        style={{
          borderColor: `${accent}35`,
          color: accent,
          animation: 'buildFloat 3.5s ease-in-out infinite reverse',
        }}
      >
        <MousePointer2 size={16} />
      </div>

      <div className="absolute bottom-5 left-5 font-mono text-[11px] tracking-[0.18em] text-white/25">
        SCANNING_PROJECT_STRUCTURE...
      </div>

      <div className="absolute right-5 top-5 flex items-center gap-2">
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full"
          style={{ backgroundColor: accent }}
        />
        <span className="font-mono text-[11px] text-white/30">
          ANALYZING
        </span>
      </div>
    </div>
  );

  const renderArchitecture = () => {
    const nodes = [
      {
        label: 'UI',
        icon: Layers3,
        x: '10%',
        y: '22%',
      },
      {
        label: 'DATA',
        icon: Database,
        x: '10%',
        y: '68%',
      },
      {
        label: 'API',
        icon: Network,
        x: '50%',
        y: '18%',
      },
      {
        label: 'CMS',
        icon: Server,
        x: '50%',
        y: '70%',
      },
      {
        label: 'SYSTEM',
        icon: Cpu,
        x: '82%',
        y: '45%',
      },
    ];

    return (
      <div className="relative h-[430px] overflow-hidden bg-[#070b12]">
        <div className="absolute inset-0 opacity-[0.06]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, ${accent} 1px, transparent 1px),
                linear-gradient(to bottom, ${accent} 1px, transparent 1px)
              `,
              backgroundSize: '42px 42px',
            }}
          />
        </div>

        {/* connectors */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 430"
          preserveAspectRatio="none"
        >
          <line
            x1="150"
            y1="110"
            x2="500"
            y2="92"
            stroke={accent}
            strokeOpacity="0.25"
          />

          <line
            x1="150"
            y1="295"
            x2="500"
            y2="315"
            stroke={accent}
            strokeOpacity="0.25"
          />

          <line
            x1="500"
            y1="92"
            x2="820"
            y2="215"
            stroke={accent}
            strokeOpacity="0.3"
          />

          <line
            x1="500"
            y1="315"
            x2="820"
            y2="215"
            stroke={accent}
            strokeOpacity="0.3"
          />

          <line
            x1="150"
            y1="110"
            x2="150"
            y2="295"
            stroke={accent}
            strokeOpacity="0.12"
          />
        </svg>

        {/* animated packets */}
        <span
          className="absolute h-2 w-2 rounded-full"
          style={{
            backgroundColor: accent,
            boxShadow: `0 0 14px ${accent}`,
            left: '22%',
            top: '25%',
            animation: 'buildPacket1 2.5s linear infinite',
          }}
        />

        <span
          className="absolute h-2 w-2 rounded-full"
          style={{
            backgroundColor: accent,
            boxShadow: `0 0 14px ${accent}`,
            left: '52%',
            top: '25%',
            animation: 'buildPacket2 2.5s linear infinite',
          }}
        />

        {nodes.map((node, index) => {
          const Icon = node.icon;

          return (
            <div
              key={node.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: node.x,
                top: node.y,
                animation: `buildNodeIn .5s ease ${index * 120}ms both`,
              }}
            >
              <div
                className={`flex ${
                  node.label === 'SYSTEM'
                    ? 'h-24 w-24 rounded-2xl'
                    : 'h-16 w-20 rounded-xl'
                } flex-col items-center justify-center gap-2 border bg-[#101722]/95`}
                style={{
                  borderColor:
                    node.label === 'SYSTEM'
                      ? `${accent}70`
                      : 'rgba(255,255,255,.08)',
                  boxShadow:
                    node.label === 'SYSTEM'
                      ? `0 0 40px ${accent}15`
                      : 'none',
                }}
              >
                <Icon
                  size={node.label === 'SYSTEM' ? 22 : 16}
                  style={{ color: accent }}
                />

                <span className="font-mono text-[11px] font-bold tracking-wider text-white/50">
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}

        <div className="absolute bottom-5 left-5 font-mono text-[11px] tracking-[0.18em] text-white/25">
          SYSTEM_ARCHITECTURE // CONNECTING_NODES
        </div>
      </div>
    );
  };

  const renderDevelopment = () => (
    <div className="relative h-[430px] overflow-hidden bg-[#070b12]">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${accent}, transparent 38%)`,
        }}
      />

      <div className="absolute left-1/2 top-1/2 w-[78%] max-w-[680px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/10 bg-[#0c121c] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400/60" />
              <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
              <span className="h-2 w-2 rounded-full bg-green-400/60" />
            </div>

            <span className="font-mono text-[11px] text-white/30">
              component.tsx
            </span>
          </div>

          <span
            className="font-mono text-[11px]"
            style={{ color: accent }}
          >
            BUILDING...
          </span>
        </div>

        <div className="grid grid-cols-[42px_1fr]">
          <div className="border-r border-white/5 bg-black/10 py-5 text-right font-mono text-[11px] leading-[24px] text-white/15">
            01
            <br />
            02
            <br />
            03
            <br />
            04
            <br />
            05
            <br />
            06
            <br />
            07
            <br />
            08
          </div>

          <div className="space-y-2 p-5 font-mono text-[9px]">
            <div className="text-white/40">
              <span style={{ color: accent }}>const</span>{' '}
              Product = () =&gt; {'{'}
            </div>

            <div className="ml-5 text-white/50">
              <span style={{ color: accent }}>return</span> (
            </div>

            <div className="ml-10 text-white/40">
              &lt;<span style={{ color: accent }}>Interface</span>
            </div>

            <div className="ml-14 text-white/30">
              responsive=
              <span className="text-white/60">true</span>
            </div>

            <div className="ml-14 text-white/30">
              interactive=
              <span className="text-white/60">true</span>
            </div>

            <div className="ml-10 text-white/40">
              /&gt;
            </div>

            <div className="ml-5 text-white/50">);</div>

            <div className="text-white/40">{'}'}</div>

            <div
              className="mt-4 h-px w-1/2"
              style={{
                backgroundColor: accent,
                animation: 'buildCodeLine 1.8s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[11px] text-white/25">
              BUILD_PROGRESS
            </span>

            <span
              className="font-mono text-[11px]"
              style={{ color: accent }}
            >
              78%
            </span>
          </div>

          <div className="h-1 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full"
              style={{
                width: '78%',
                backgroundColor: accent,
                boxShadow: `0 0 12px ${accent}`,
                animation: 'buildProgress 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 font-mono text-[11px] tracking-[0.18em] text-white/25">
        COMPONENTS // CODE // INTERACTIONS
      </div>
    </div>
  );

  const renderIntegration = () => (
    <div className="relative h-[430px] overflow-hidden bg-[#070b12]">
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(${accent} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="absolute left-[8%] right-[8%] top-1/2 h-px -translate-y-1/2 bg-white/10" />

      <div className="absolute left-[8%] right-[8%] top-1/2 h-px -translate-y-1/2">
        <span
          className="absolute h-2 w-2 -translate-y-1/2 rounded-full"
          style={{
            backgroundColor: accent,
            boxShadow: `0 0 18px ${accent}`,
            animation: 'buildDataFlow 2.2s linear infinite',
          }}
        />

        <span
          className="absolute h-2 w-2 -translate-y-1/2 rounded-full"
          style={{
            backgroundColor: accent,
            boxShadow: `0 0 18px ${accent}`,
            animation: 'buildDataFlow 2.2s linear 1.1s infinite',
          }}
        />
      </div>

      <div className="absolute left-[8%] top-1/2 -translate-y-1/2">
        <div className="flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#101722]">
          <Code2 size={20} style={{ color: accent }} />
          <span className="font-mono text-[11px] text-white/40">
            FRONTEND
          </span>
        </div>
      </div>

      <div className="absolute left-1/2 top-[25%] -translate-x-1/2">
        <div className="flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#101722]">
          <Workflow size={20} style={{ color: accent }} />
          <span className="font-mono text-[11px] text-white/40">
            API
          </span>
        </div>
      </div>

      <div className="absolute left-1/2 bottom-[17%] -translate-x-1/2">
        <div className="flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#101722]">
          <Database size={20} style={{ color: accent }} />
          <span className="font-mono text-[11px] text-white/40">
            DATA
          </span>
        </div>
      </div>

      <div className="absolute right-[8%] top-1/2 -translate-y-1/2">
        <div
          className="flex h-24 w-24 flex-col items-center justify-center gap-2 rounded-2xl border bg-[#101722]"
          style={{
            borderColor: `${accent}60`,
            boxShadow: `0 0 45px ${accent}12`,
          }}
        >
          <Server size={22} style={{ color: accent }} />
          <span className="font-mono text-[11px] text-white/40">
            CMS
          </span>
          <span
            className="font-mono text-[7px]"
            style={{ color: accent }}
          >
            CONNECTED
          </span>
        </div>
      </div>

      <div className="absolute left-5 bottom-5 font-mono text-[11px] tracking-[0.18em] text-white/25">
        DATA_FLOW // FRONTEND ↔ API ↔ CMS
      </div>
    </div>
  );

  const renderOptimization = () => (
    <div className="relative h-[430px] overflow-hidden bg-[#070b12]">
      <div
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: accent }}
      />

      <div className="absolute left-1/2 top-1/2 grid w-[82%] max-w-[720px] -translate-x-1/2 -translate-y-1/2 grid-cols-2 gap-4">
        {/* before */}
        <div className="rounded-xl border border-white/10 bg-[#101722] p-5">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-mono text-[11px] tracking-[0.16em] text-white/30">
              Antes
            </span>

            <span className="font-mono text-[11px] text-red-300/60">
              REALIZAR_AJUSTES
            </span>
          </div>

          <div className="space-y-6">
            {[
              ['LOAD', 'slow'],
              ['UX', 'rough'],
              ['A11Y', 'partial'],
            ].map(([label, state]) => (
              <div key={label}>
                <div className="mb-2 flex justify-between">
                  <span className="font-mono text-[11px] text-white/30">
                    {label}
                  </span>

                  <span className="font-mono text-[11px] text-white/30">
                    {state}
                  </span>
                </div>

                <div className="h-1 rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-white/20"
                    style={{ width: label === 'LOAD' ? '38%' : '52%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* after */}
        <div
          className="rounded-xl border bg-[#101722] p-5"
          style={{
            borderColor: `${accent}45`,
            boxShadow: `0 0 50px ${accent}08`,
          }}
        >
          <div className="mb-6 flex items-center justify-between">
            <span
              className="font-mono text-[11px] tracking-[0.16em]"
              style={{ color: accent }}
            >
              DEPOIS
            </span>

            <span
              className="font-mono text-[11px]"
              style={{ color: accent }}
            >
              OTIMIZADO
            </span>
          </div>

          <div className="space-y-6">
            {[
              ['LOAD', 'optimized', '92%'],
              ['UX', 'smooth', '96%'],
              ['A11Y', 'ready', '94%'],
            ].map(([label, state, value], index) => (
              <div key={label}>
                <div className="mb-2 flex justify-between">
                  <span className="font-mono text-[11px] text-white/30">
                    {label}
                  </span>

                  <span
                    className="font-mono text-[11px]"
                    style={{ color: accent }}
                  >
                    {state} // {value}
                  </span>
                </div>

                <div className="h-1 rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: value,
                      backgroundColor: accent,
                      boxShadow: `0 0 10px ${accent}`,
                      animation: `buildOptimize 1.5s ease ${
                        index * 180
                      }ms both`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 font-mono text-[11px] tracking-[0.18em] text-white/25">
        PERFORMANCE // UX // ACCESSIBILITY
      </div>

      <div className="absolute right-5 top-5 flex items-center gap-2">
        <Gauge size={12} style={{ color: accent }} />
        <span
          className="font-mono text-[11px]"
          style={{ color: accent }}
        >
          OTIMIZANDO
        </span>
      </div>
    </div>
  );

  const renderDeploy = () => (
    <div className="relative h-[430px] overflow-hidden bg-[#070b12]">
      <div
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-15"
        style={{ backgroundColor: accent }}
      />

      {/* pipeline */}
      <div className="absolute left-[7%] right-[7%] top-[34%] h-px bg-white/10">
        <div
          className="h-px"
          style={{
            width: '100%',
            backgroundColor: accent,
            opacity: 0.25,
          }}
        />

        <span
          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
          style={{
            backgroundColor: accent,
            boxShadow: `0 0 20px ${accent}`,
            animation: 'buildDeploy 3s linear infinite',
          }}
        />
      </div>

      <div className="absolute left-[6%] top-[28%]">
        <div className="flex w-20 flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-[#101722]">
            <Code2 size={17} style={{ color: accent }} />
          </div>
          <span className="font-mono text-[11px] text-white/35">
            LOCAL
          </span>
        </div>
      </div>

      <div className="absolute left-[29%] top-[28%]">
        <div className="flex w-20 flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-[#101722]">
            <GitBranch size={17} style={{ color: accent }} />
          </div>
          <span className="font-mono text-[11px] text-white/35">
            BUILD
          </span>
        </div>
      </div>

      <div className="absolute left-[52%] top-[28%]">
        <div className="flex w-20 flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-[#101722]">
            <Server size={17} style={{ color: accent }} />
          </div>
          <span className="font-mono text-[11px] text-white/35">
            SERVER
          </span>
        </div>
      </div>

      {/* live */}
      <div className="absolute right-[6%] top-[22%]">
        <div className="flex w-28 flex-col items-center gap-2">
          <div
            className="flex h-20 w-28 items-center justify-center rounded-xl border bg-[#101722]"
            style={{
              borderColor: `${accent}70`,
              boxShadow: `0 0 40px ${accent}15`,
              animation: 'buildLivePulse 2s ease-in-out infinite',
            }}
          >
            <div className="w-[78px] overflow-hidden rounded-md border border-white/10 bg-white">
              <div className="h-2 bg-slate-200" />

              <div className="space-y-1 p-2">
                <div className="h-1.5 w-10 rounded bg-slate-200" />
                <div className="h-1.5 w-14 rounded bg-slate-100" />
                <div
                  className="mt-2 h-5 w-full rounded"
                  style={{ backgroundColor: `${accent}40` }}
                />
                <div className="h-1.5 w-12 rounded bg-slate-100" />
              </div>
            </div>
          </div>

          <span
            className="font-mono text-[11px] font-bold"
            style={{ color: accent }}
          >
            LIVE
          </span>
        </div>
      </div>

      {/* success */}
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2">
        <div
          className="flex items-center gap-3 rounded-full border px-5 py-3"
          style={{
            borderColor: `${accent}35`,
            backgroundColor: `${accent}08`,
          }}
        >
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full"
            style={{
              backgroundColor: accent,
              color: '#fff',
            }}
          >
            <Check size={14} />
          </div>

          <div>
            <div
              className="font-mono text-[11px] font-bold tracking-[0.18em]"
              style={{ color: accent }}
            >
              DEPLOY_REALIZADO
            </div>

            <div className="mt-0.5 font-mono text-[7px] text-white/30">
              PRODUCTION_READY
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 font-mono text-[11px] tracking-[0.18em] text-white/25">
        LOCAL → BUILD → SERVER → LIVE
      </div>
    </div>
  );

  const renderVisualScene = () => {
    switch (phase.id) {
      case 'discovery':
        return renderDiscovery();

      case 'architecture':
        return renderArchitecture();

      case 'development':
        return renderDevelopment();

      case 'integration':
        return renderIntegration();

      case 'optimization':
        return renderOptimization();

      case 'deploy':
        return renderDeploy();

      default:
        return null;
    }
  };

  return (
    <section
      id="build-log"
      className="relative overflow-hidden border-t border-slate-200/70 bg-white px-6 py-24"
    >
      {/* ================================================================
          ANIMATIONS
      ================================================================ */}

      <style>{`
        @keyframes buildFadeUp {
          from {
            opacity: 0;
            transform: translateY(11px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes buildFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes buildScan {
          0% {
            transform: translate(-50%, -160%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, 160%);
            opacity: 0;
          }
        }

        @keyframes buildNodeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes buildPacket1 {
          0% {
            left: 15%;
            top: 26%;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            left: 48%;
            top: 22%;
            opacity: 0;
          }
        }

        @keyframes buildPacket2 {
          0% {
            left: 50%;
            top: 23%;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            left: 80%;
            top: 48%;
            opacity: 0;
          }
        }

        @keyframes buildCodeLine {
          0%, 100% {
            width: 20%;
            opacity: .35;
          }
          50% {
            width: 72%;
            opacity: 1;
          }
        }

        @keyframes buildProgress {
          0% {
            width: 10%;
          }
          50% {
            width: 86%;
          }
          100% {
            width: 78%;
          }
        }

        @keyframes buildDataFlow {
          0% {
            left: 0%;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        @keyframes buildOptimize {
          from {
            width: 0;
          }
        }

        @keyframes buildDeploy {
          0% {
            left: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        @keyframes buildLivePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>

      {/* ================================================================
          BACKGROUND
      ================================================================ */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-[5%] top-[10%] h-96 w-96 rounded-full blur-3xl opacity-[0.06]"
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
              backgroundSize: '48px 48px',
            }}
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ================================================================
            HEADER
        ================================================================ */}

        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5">
              <Terminal size={13} style={{ color: accent }} />

              <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-slate-600">
                BUILD LOG // FROM IDEA TO PRODUCTION
              </span>

              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ backgroundColor: accent }}
              />
            </div>

            <h2 className="text-4xl font-black tracking-[-0.045em] text-slate-950 md:text-5xl">
              Não começo pelo código.
              <br />

              <span style={{ color: accent }}>
                Começo pelo problema.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              {lang === 'pt'
                ? 'Meu processo transforma uma ideia em um produto digital através de etapas claras — da descoberta à publicação.'
                : 'My process transforms an idea into a digital product through clear stages — from discovery to production.'}
            </p>
          </div>

          <div className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: `${accent}12`,
                  color: accent,
                }}
              >
                <Cpu size={18} />
              </div>

              <div>
                <div className="font-mono text-[9px] tracking-[0.16em] text-slate-400">
                  SYSTEM STATUS
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full"
                    style={{ backgroundColor: accent }}
                  />

                  <span className="font-mono text-xs font-bold text-slate-800">
                    ONLINE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================
            TIMELINE
        ================================================================ */}

        <div className="relative mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-400/70" />
                <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                <span className="h-2 w-2 rounded-full bg-green-400/70" />
              </div>

              <span className="font-mono text-[10px] text-slate-500">
                build.process
              </span>
            </div>

            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-slate-600">
              {String(activePhase + 1).padStart(2, '0')} / 06
            </span>
          </div>

          <div className="hidden px-6 py-8 md:block">
            <div className="relative">
              <div className="absolute left-[8%] right-[8%] top-5 h-px bg-white/10" />

              <div
                className="absolute left-[8%] top-5 h-px transition-all duration-700"
                style={{
                  width:
                    activePhase === 0
                      ? '0%'
                      : `${(activePhase / (BUILD_PHASES.length - 1)) * 84}%`,
                  backgroundColor: accent,
                  boxShadow: `0 0 12px ${accent}`,
                }}
              />

              <div className="relative grid grid-cols-6 gap-3">
                {BUILD_PHASES.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = index === activePhase;
                  const isCompleted = index < activePhase;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectPhase(index)}
                      className="group flex flex-col items-center text-center"
                    >
                      <div
                        className={`
                          relative z-10 flex h-10 w-10 items-center justify-center
                          rounded-full border transition-all duration-300
                          ${
                            isActive
                              ? 'scale-110 border-white bg-white'
                              : isCompleted
                                ? 'border-transparent'
                                : 'border-white/10 bg-slate-950'
                          }
                        `}
                        style={
                          isCompleted
                            ? {
                                backgroundColor: accent,
                              }
                            : undefined
                        }
                      >
                        {isCompleted ? (
                          <Check size={15} className="text-white" />
                        ) : (
                          <Icon
                            size={15}
                            className={
                              isActive ? 'text-slate-900' : 'text-slate-500'
                            }
                            style={
                              isActive
                                ? {
                                    color: accent,
                                  }
                                : undefined
                            }
                          />
                        )}
                      </div>

                      <span
                        className={`
                          mt-4 font-mono text-[12px] font-bold tracking-[0.12em]
                          transition-colors
                          ${
                            isActive
                              ? 'text-white'
                              : 'text-slate-600 group-hover:text-slate-400'
                          }
                        `}
                      >
                        {item.label}
                      </span>

                      <span className="mt-1 font-mono text-[11px] text-slate-700">
                        {item.number}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto p-4 md:hidden">
            {BUILD_PHASES.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activePhase;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectPhase(index)}
                  className={`
                    flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2
                    transition-all
                    ${
                      isActive
                        ? 'border-white bg-white'
                        : 'border-white/10 bg-white/5'
                    }
                  `}
                >
                  <Icon
                    size={13}
                    style={
                      isActive
                        ? {
                            color: accent,
                          }
                        : undefined
                    }
                    className={!isActive ? 'text-slate-500' : ''}
                  />

                  <span
                    className={`font-mono text-[9px] font-bold ${
                      isActive ? 'text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    {item.number} / {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================
            VISUAL PROCESS
        ================================================================ */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <div className="flex items-center gap-3">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-md"
                style={{
                  backgroundColor: `${accent}15`,
                  color: accent,
                }}
              >
                <PhaseIcon size={13} />
              </div>

              <div>
                <div className="font-mono text-[11px] tracking-[0.18em] text-white/25">
                  PHASE_{phase.number}
                </div>

                <div
                  className="font-mono text-[9px] font-bold tracking-[0.14em]"
                  style={{ color: accent }}
                >
                  {phase.status}
                </div>
              </div>
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <span className="font-mono text-[11px] text-white/20">
                process://{phase.id}
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-white/10" />

              <span className="font-mono text-[11px] text-white/20">
                LIVE
              </span>
            </div>
          </div>

          {renderVisualScene()}

          {/* minimal phase information */}
          <div className="border-t border-white/10 bg-[#0a0f17] px-5 py-5 md:px-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-1 font-mono text-[11px] tracking-[0.18em] text-white/25">
                  {phase.number} // {phase.label}
                </div>

                <h3 className="text-lg font-black tracking-tight text-white md:text-xl">
                  {phase.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {phase.stack.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[11px] font-bold text-white/40"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================
            TELEMETRY
        ================================================================ */}

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {phase.metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-end justify-between">
                <div
                  className="text-xl font-black tracking-tight"
                  style={{ color: accent }}
                >
                  {metric.value}
                </div>

                <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  {metric.label}
                </div>
              </div>

              <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${TELEMETRY_WIDTHS[index]}%`,
                    backgroundColor: accent,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ================================================================
            COMMAND
        ================================================================ */}

        <div className="mt-6 overflow-hidden rounded-xl bg-slate-950">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Terminal size={12} style={{ color: accent }} />

              <span className="font-mono text-[11px] tracking-[0.15em] text-white/30">
                EXECUTION
              </span>
            </div>

            <span className="font-mono text-[11px] text-white/20">
              {phase.status}
            </span>
          </div>

          <div className="overflow-x-auto px-4 py-4">
            <code className="whitespace-nowrap font-mono text-[10px] text-white/50">
              <span style={{ color: accent }}>$</span>{' '}
              {phase.command}
              <span
                className="ml-2 inline-block h-3 w-1 align-middle"
                style={{
                  backgroundColor: accent,
                  animation: 'buildFloat 1s ease-in-out infinite',
                }}
              />
            </code>
          </div>
        </div>

        {/* ================================================================
            NAVIGATION
        ================================================================ */}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={previousPhase}
            disabled={activePhase === 0}
            className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-mono text-[9px] font-bold tracking-widest text-slate-500 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← PREVIOUS_PHASE
          </button>

          <button
            type="button"
            onClick={() => {
              setShowProcess(!showProcess);
              playSound('hover', soundEnabled);
            }}
            className="group flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-mono text-[11px] font-bold tracking-widest text-white transition hover:brightness-110"
            style={{ backgroundColor: accent }}
          >
            {showProcess
              ? lang === 'pt'
                ? 'FECHAR PROCESSO'
                : 'CLOSE PROCESS'
              : lang === 'pt'
                ? 'INSPECIONAR PROCESSO'
                : 'INSPECT PROCESS'}

            <ChevronRight
              size={13}
              className={`transition-transform ${
                showProcess ? 'rotate-90' : ''
              }`}
            />
          </button>

          <button
            type="button"
            onClick={nextPhase}
            disabled={activePhase === BUILD_PHASES.length - 1}
            className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-mono text-[9px] font-bold tracking-widest text-slate-500 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-30"
          >
            NEXT_PHASE →
          </button>
        </div>

        {/* ================================================================
            PROCESS INSPECTOR
        ================================================================ */}

        {showProcess && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-xl">
            <div className="border-b border-white/10 px-5 py-3">
              <div className="flex items-center gap-2">
                <Terminal size={13} style={{ color: accent }} />

                <span className="font-mono text-[9px] font-bold tracking-[0.16em] text-slate-400">
                  PROCESS_INSPECTOR
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
              <div className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Layers3 size={14} style={{ color: accent }} />

                  <span className="font-mono text-[9px] tracking-widest text-slate-500">
                    INPUT
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {phase.actions.slice(0, 2).map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] text-white/40"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Workflow size={14} style={{ color: accent }} />

                  <span className="font-mono text-[9px] tracking-widest text-slate-500">
                    PROCESS
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {phase.actions.slice(2).map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] text-white/40"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Rocket size={14} style={{ color: accent }} />

                  <span className="font-mono text-[9px] tracking-widest text-slate-500">
                    OUTPUT
                  </span>
                </div>

                <div
                  className="flex items-center gap-2 rounded-lg border px-3 py-3"
                  style={{
                    borderColor: `${accent}25`,
                    backgroundColor: `${accent}08`,
                  }}
                >
                  <Check size={13} style={{ color: accent }} />

                  <span className="font-mono text-[11px] text-white/50">
                    {phase.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            FINAL OUTPUT
        ================================================================ */}

        <div className="mt-16 border-t border-slate-200 pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: `${accent}10`,
                  color: accent,
                }}
              >
                <Server size={16} />
              </div>

              <div>
                <div className="font-mono text-[9px] tracking-[0.16em] text-slate-400">
                  FINAL_OUTPUT
                </div>

                <div className="text-sm font-bold text-slate-900">
                  {lang === 'pt'
                    ? 'Ideia → Produto digital'
                    : 'Idea → Digital product'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] text-slate-400">
                06 PHASES
              </span>

              <div className="h-px w-12 bg-slate-200" />

              <span
                className="font-mono text-[9px] font-bold"
                style={{ color: accent }}
              >
                READY_TO_BUILD
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};