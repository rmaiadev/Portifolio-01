import { aiProfile } from '../data/aiProfile';

export interface AIResponse {
  type?: 'ai' | 'success' | 'error' | 'system';
  response: string;
}

const normalize = (text: string) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

const containsAny = (text: string, words: string[]) => {
  return words.some((word) => text.includes(normalize(word)));
};

export const getTerminalAIResponse = (
  message: string,
  visitorName?: string
): AIResponse => {
  const text = normalize(message);

  // ============================================================
  // IDENTIDADE
  // ============================================================

  if (
    containsAny(text, [
      'quem e voce',
      'quem e vc',
      'quem e o renan',
      'quem e renan',
      'fale sobre o renan',
      'sobre o renan',
      'me fale sobre ele',
      'quem desenvolveu isso'
    ])
  ) {
    return {
      response: `[AI]

Sou o assistente virtual deste portfólio.

Meu trabalho é apresentar o desenvolvedor por trás desta interface.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOME
${aiProfile.name}

ÁREA
${aiProfile.role}

LOCALIZAÇÃO
${aiProfile.location}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${aiProfile.shortBio}

Quer descobrir mais?

Você pode perguntar sobre:
→ stack
→ experiência
→ projetos
→ serviços
→ WordPress
→ React
→ contato`
    };
  }

  // ============================================================
  // SAUDAÇÃO
  // ============================================================

  if (
    containsAny(text, [
      'oi',
      'ola',
      'hello',
      'hey',
      'bom dia',
      'boa tarde',
      'boa noite'
    ])
  ) {
    return {
      response: `[AI]

Olá${visitorName ? `, ${visitorName}` : ''}.

Sou o assistente virtual do portfólio do ${aiProfile.name}.

Pode perguntar qualquer coisa sobre o desenvolvedor.

Dica:
Tente perguntar "quem é o Renan?" ou "o que ele sabe fazer?".`
    };
  }

  // ============================================================
  // STACK
  // ============================================================

  if (
    containsAny(text, [
      'stack',
      'tecnologias',
      'tecnologia',
      'linguagens',
      'programacao',
      'programação',
      'ferramentas',
      'o que ele usa',
      'o que voce usa'
    ])
  ) {
    return {
      response: `[AI]

STACK DETECTED

${aiProfile.stack.map((item) => `→ ${item}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Principais áreas:

${aiProfile.expertise.map((item) => `→ ${item}`).join('\n')}`
    };
  }

  // ============================================================
  // REACT
  // ============================================================

  if (
    containsAny(text, [
      'react',
      'typescript',
      'frontend',
      'front end',
      'javascript'
    ])
  ) {
    return {
      response: `[AI]

Sim.

React, TypeScript e JavaScript fazem parte da stack
do ${aiProfile.name}.

A utilização dessas tecnologias está principalmente
relacionada ao desenvolvimento de interfaces modernas,
componentes reutilizáveis e experiências responsivas.

STACK:

→ React
→ TypeScript
→ JavaScript
→ HTML5
→ CSS3`
    };
  }

  // ============================================================
  // WORDPRESS
  // ============================================================

  if (
    containsAny(text, [
      'wordpress',
      'wp',
      'acf',
      'gutenberg',
      'elementor',
      'tema wordpress'
    ])
  ) {
    return {
      response: `[AI]

WORDPRESS MODULE: ONLINE

Sim. WordPress é uma das principais áreas de atuação.

Experiência com:

→ WordPress
→ PHP
→ ACF
→ Gutenberg
→ Elementor
→ Customização de temas
→ Templates personalizados
→ Desenvolvimento de componentes
→ Integração de layouts

O objetivo não é apenas instalar um WordPress.

É transformar o CMS em uma solução personalizada para cada projeto.`
    };
  }

  // ============================================================
  // SERVIÇOS
  // ============================================================

  if (
    containsAny(text, [
      'servicos',
      'serviço',
      'servicos oferece',
      'o que ele faz',
      'o que voce faz',
      'o que ele desenvolve',
      'o que desenvolve'
    ])
  ) {
    return {
      response: `[AI]

AVAILABLE SERVICES

${aiProfile.services.map((item, index) => {
        return `${String(index + 1).padStart(2, '0')} — ${item}`;
      }).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Precisa de algo que não está nessa lista?

Pode perguntar. Talvez eu consiga encontrar uma solução.`
    };
  }

  // ============================================================
  // PROJETOS
  // ============================================================

  if (
    containsAny(text, [
      'projetos',
      'projeto',
      'portfolio',
      'portfólio',
      'o que ja fez',
      'o que ja desenvolveu',
      'trabalhos'
    ])
  ) {
    return {
      response: `[AI]

PROJECT DATABASE

${aiProfile.projects
        .map(
          (project, index) =>
            `${String(index + 1).padStart(2, '0')} — ${project.name}\n    ${project.description}`
        )
        .join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Alguns projetos podem ser explorados diretamente
pela interface principal deste portfólio.`
    };
  }

  // ============================================================
  // EXPERIÊNCIA
  // ============================================================

  if (
    containsAny(text, [
      'experiencia',
      'experiência',
      'historico',
      'histórico',
      'carreira',
      'background'
    ])
  ) {
    return {
      response: `[AI]

EXPERIENCE DATABASE

${aiProfile.experience}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CORE AREAS

${aiProfile.expertise.map((item) => `→ ${item}`).join('\n')}`
    };
  }

  // ============================================================
  // CONTATO
  // ============================================================

  if (
    containsAny(text, [
      'contato',
      'contact',
      'email',
      'e-mail',
      'whatsapp',
      'telefone',
      'contratar',
      'hire',
      'falar com renan'
    ])
  ) {
    return {
      response: `[AI]

CONTACT PROTOCOL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WhatsApp
${aiProfile.contact.whatsappDisplay}

Email
${aiProfile.contact.email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Se quiser iniciar uma conversa profissional,
o WhatsApp provavelmente é o caminho mais rápido.`
    };
  }

  // ============================================================
  // SOBRE O USUÁRIO
  // ============================================================

  if (
    containsAny(text, [
      'meu nome',
      'me chamo',
      'sou o',
      'sou a',
      'pode me chamar'
    ])
  ) {
    const match = message.match(
      /(?:meu nome é|me chamo|pode me chamar de|sou o|sou a)\s+(.+)/i
    );

    if (match?.[1]) {
      const name = match[1].trim();

      return {
        response: `[AI]

Prazer, ${name}.

Nome registrado nesta sessão.

Agora você já pode continuar explorando o portfólio do ${aiProfile.name}.`
      };
    }
  }

  // ============================================================
  // EASTER EGG — SUDO
  // ============================================================

  if (
    text === 'sudo hire renan' ||
    text === 'sudo contratar renan'
  ) {
    return {
      type: 'success',
      response: `[SYSTEM]

Initializing hiring protocol...

[████████████████████] 100%

✓ Developer found
✓ Portfolio analyzed
✓ Skills verified
✓ Coffee dependency detected

ACCESS GRANTED.

Você provavelmente quer falar com o Renan.

→ WhatsApp: ${aiProfile.contact.whatsappDisplay}
→ Email: ${aiProfile.contact.email}`
    };
  }

  // ============================================================
  // EASTER EGG — COFFEE
  // ============================================================

  if (
    text === 'coffee' ||
    text === 'cafe' ||
    text === 'café'
  ) {
    return {
      response: `[AI]

COFFEE STATUS

██████████████████░░ 90%

Developer operational.

Recommendation:
Refill coffee and continue coding. ☕`
    };
  }

  // ============================================================
  // EASTER EGG — MATRIX
  // ============================================================

  if (text === 'matrix') {
    return {
      response: `[SYSTEM]

Wake up, developer...

The Matrix has detected this portfolio.

There is no spoon.

There is only code.`
    };
  }

  // ============================================================
  // EASTER EGG — HACK
  // ============================================================

  if (
    text === 'hack' ||
    text === 'hacker' ||
    text === 'hackear'
  ) {
    return {
      response: `[SYSTEM]

Scanning portfolio security...

████████████████████ 100%

✓ No suspicious activity detected.

Nice try. 😎`
    };
  }

  // ============================================================
  // FALLBACK
  // ============================================================

  return {
    type: 'error',
    response: `[AI]

Não consegui interpretar essa pergunta.

Mas eu consigo falar sobre o ${aiProfile.name}.

Experimente:

→ "Quem é o Renan?"
→ "Quais tecnologias ele usa?"
→ "Ele trabalha com WordPress?"
→ "Quais projetos ele desenvolve?"
→ "Quais serviços ele oferece?"
→ "Como posso entrar em contato?"

Ou digite "help".`
  };
};