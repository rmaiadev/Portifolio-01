export interface TechSkill {
    name: string;
    category: 'frontend' | 'cms' | 'backend' | 'lang';
    experience: string;
    proficiency: number;
    snippet: string;
    description: { pt: string; en: string };
  }
  
  export interface CaseStudy {
    id: string;
    title: string;
    tagline: { pt: string; en: string };
    metrics: { label: string; value: string }[];
    arch: string;
    techs: string[];
    description: { pt: string; en: string };
    lighthouse: number;
  }
  
  export const SKILLS: TechSkill[] = [
    {
      name: 'React.js',
      category: 'frontend',
      experience: '1+ anos',
      proficiency: 98,
      snippet: `const MicroFrontend = React.lazy(() => import('App/Dashboard'));\n\nexport const CoreEngine = () => (\n  <Suspense fallback={<SkeletonLoader />}>\n    <MicroFrontend config={{ cache: 'stale-while-revalidate' }} />\n  </Suspense>\n);`,
      description: {
        pt: 'Criação de SPAs/SSR reativos com controle rígido de re-renders e arquitetura baseada em Hooks avançados e Contexts.',
        en: 'Creation of reactive SPAs/SSR with strict re-render controls, custom hooks, and state context optimization.'
      }
    },
    {
      name: 'TypeScript',
      category: 'lang',
      experience: '1+ anos',
      proficiency: 95,
      snippet: `type StrictAPIResponse<T> = \n  | { status: 'success'; data: T; timestamp: number }\n  | { status: 'error'; message: string; code: number };\n\ntype UserState = Readonly<StrictAPIResponse<UserData>>;`,
      description: {
        pt: 'Tipagem estática avançada com Generics, Utility Types e validação em tempo de compilação sem runtime overhead.',
        en: 'Advanced static typing using Generics, Utility Types, and zero-runtime overhead compile-time validation.'
      }
    },
    {
      name: 'WordPress Headless',
      category: 'cms',
      experience: '3+ anos',
      proficiency: 96,
      snippet: `// GraphQL / WP Engine Query\nquery GetHybridPosts {\n  posts(first: 10) {\n    nodes {\n      id title slug\n      acfSEO { targetKeywords renderPriority }\n    }\n  }\n}`,
      description: {
        pt: 'WordPress desacoplado rodando como Headless CMS via GraphQL/REST API integrado com React/Next.js.',
        en: 'Decoupled WordPress running as a Headless CMS via GraphQL/REST API serving React frontend applications.'
      }
    },
    {
      name: 'PHP 8+ & Custom Engines',
      category: 'backend',
      experience: '2+ anos',
      proficiency: 92,
      snippet: `final readonly class HeadlessEndpoint {\n  public function __construct(\n    private WPGraphQLResolver $resolver\n  ) {}\n\n  public function dispatch(): JsonResponse {\n    return new JsonResponse($this->resolver->resolve());\n  }\n}`,
      description: {
        pt: 'Desenvolvimento de plugins sob medida, APIs orientadas a objeto e otimização de queries MySQL pesadas.',
        en: 'Custom plugin development, OOP REST architectures, and high-performance MySQL query optimization.'
      }
    },
    {
      name: 'JavaScript (ES Next)',
      category: 'lang',
      experience: '2+ anos',
      proficiency: 99,
      snippet: `const pipeline = (...fns) => (x) => fns.reduce((v, f) => f(v), x);\nconst auditDOM = pipeline(\n  sanitizeTree,\n  applyVirtualDOMDiff,\n  triggerSynthesizedAudio\n);`,
      description: {
        pt: 'Domínio do JavaScript moderno, Event Loop, Closures e otimizações de performance no V8/DOM.',
        en: 'Deep mastery of modern JS, Event Loop, Closures, and critical-path DOM performance tuning.'
      }
    }
  ];
  
  export const PROJECTS: CaseStudy[] = [
    {
      id: 'headless-wp-react',
      title: 'Enterprise Headless Platform',
      tagline: {
        pt: 'React Frontend integrado via GraphQL com WordPress WP-Engine backend.',
        en: 'React Frontend integrated via GraphQL with WordPress WP-Engine backend.'
      },
      metrics: [
        { label: 'Core Web Vitals', value: '100 / 100' },
        { label: 'Tempo de Carregamento', value: '0.4s' },
        { label: 'Taxa de Conversão', value: '+42%' }
      ],
      arch: 'React 18 + WP GraphQL + Redis Cache + Tailwind',
      techs: ['React', 'TypeScript', 'WordPress', 'PHP 8', 'GraphQL', 'Tailwind'],
      description: {
        pt: 'Substituição de uma estrutura monolítica lenta por uma arquitetura moderna Headless. O cliente manteve a facilidade do painel do WordPress enquanto o usuário ganhou performance instantânea em React.',
        en: 'Replaced a slow legacy monolithic architecture with a modern Headless layout. The client retained WP admin familiarity while users enjoyed sub-second React rendering.'
      },
      lighthouse: 100
    },
    {
      id: 'custom-wp-plugin-suite',
      title: 'High-Scale Custom PHP Engine',
      tagline: {
        pt: 'Plugin WordPress proprietário para processamento de alto volume.',
        en: 'Proprietary WordPress plugin for high-volume data dynamic processing.'
      },
      metrics: [
        { label: 'Requisições/min', value: '15.000+' },
        { label: 'Redução de LCP', value: '-65%' },
        { label: 'Uso de Memória', value: '12MB' }
      ],
      arch: 'PHP 8.2 Object-Oriented + Custom REST + React Admin UI',
      techs: ['PHP 8', 'WordPress', 'React', 'REST API', 'MySQL'],
      description: {
        pt: 'Desenvolvimento de uma suite de plugins PHP com React incorporado no wp-admin, reduzindo o tempo de resposta do servidor de 1.8s para apenas 120ms.',
        en: 'Custom PHP plugin suite with embedded React components in wp-admin, cutting server response times from 1.8s down to 120ms.'
      },
      lighthouse: 98
    }
  ];