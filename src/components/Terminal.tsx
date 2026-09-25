import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Bot,
  Circle,
  CornerDownLeft,
  RotateCcw
} from 'lucide-react';

import { playSound } from '../utils/audio';
import { getTerminalAIResponse } from '../utils/terminalAI';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'pt' | 'en';
  accent: string;
  soundEnabled: boolean;
}

interface TerminalMessage {
  id: number;
  type: 'system' | 'user' | 'ai' | 'error' | 'success';
  content: string;
}

const INITIAL_MESSAGES: TerminalMessage[] = [
  {
    id: 1,
    type: 'system',
    content: 'DevOS v2.4.0 (Light Edition)'
  },
  {
    id: 2,
    type: 'system',
    content: 'AI PROFILE MODULE: ONLINE'
  },
  {
    id: 3,
    type: 'system',
    content:
      'Digite "help" para ver os comandos ou converse naturalmente com a IA.'
  }
];

export const TerminalModal: React.FC<TerminalProps> = ({
  isOpen,
  onClose,
  accent,
  soundEnabled
}) => {
  const [input, setInput] = useState('');
  const [visitorName, setVisitorName] = useState('');

  const [messages, setMessages] =
    useState<TerminalMessage[]>(INITIAL_MESSAGES);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ============================================================
  // RESET DA SESSÃO
  // ============================================================

  const resetTerminal = () => {
    setInput('');
    setVisitorName('');

    setMessages(
      INITIAL_MESSAGES.map((message) => ({
        ...message,
        id: Date.now() + Math.random()
      }))
    );
  };

  // ============================================================
  // FECHAR TERMINAL
  // ============================================================

  const handleClose = () => {
    resetTerminal();
    onClose();
  };

  // ============================================================
  // ADICIONAR MENSAGEM
  // ============================================================

  const addMessage = (
    type: TerminalMessage['type'],
    content: string
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        type,
        content
      }
    ]);
  };

    // ============================================================
  // PERFIL PESSOAL — RENAN / MAIA
  // ============================================================

  const handlePersonalProfile = () => {
    const personalText = `
[PERFIL PESSOAL]

Antes de ser desenvolvedor, existe uma pessoa.

Renan Maia é marido e pai de família, pai da Ayla e do Oliver.

É cristão e apaixonado pelas Escrituras. A fé não aparece apenas como
uma informação de perfil, mas como parte importante de quem ele é e da
forma como enxerga a vida, a família, o trabalho e seus propósitos.

Entre código, projetos e tecnologia, existe alguém que valoriza a família,
a presença, a responsabilidade e aquilo que permanece além da tela.

TECNOLOGIA É PARTE DO QUE ELE FAZ.
NÃO É TUDO O QUE ELE É.

[PERSONAL MODULE]
Family .............. ONLINE
Faith ............... ACTIVE
Scriptures .......... FAVORITE
Father .............. ACTIVE
Husband ............. ACTIVE
Developer ........... ONLINE
`;

    addMessage('success', personalText);
    setInput('');
  };

  // ============================================================
  // EXECUTAR COMANDO
  // ============================================================

  const handleCommand = (command: string) => {
    const cleanCommand = command.trim();

    if (!cleanCommand) return;

    playSound('command', soundEnabled);

    addMessage('user', `> ${cleanCommand}`);

    const normalized = cleanCommand
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

          // ============================================================
    // EASTER EGG — PERFIL PESSOAL
    // ============================================================

    const personalKeywords = [
      'renan',
      'maia',
      'quem e renan',
      'quem e o renan',
      'quem e renan maia',
      'quem e o renan maia',
      'fale sobre renan',
      'fale sobre o renan',
      'fale sobre maia',
      'fale sobre o maia'
    ];

    const isPersonalQuery =
      personalKeywords.includes(normalized) ||
      normalized.includes('quem e o renan') ||
      normalized.includes('quem e renan') ||
      normalized.includes('quem e o maia') ||
      normalized.includes('quem e maia');

    if (isPersonalQuery) {
      handlePersonalProfile();
      return;
    }

    // ============================================================
    // CLEAR
    // ============================================================

    if (normalized === 'clear') {
      setMessages([]);
      setInput('');
      return;
    }

    // ============================================================
    // RESET
    // ============================================================

    if (normalized === 'reset') {
      resetTerminal();
      return;
    }

    // ============================================================
    // EXIT
    // ============================================================

    if (normalized === 'exit') {
      handleClose();
      return;
    }

    // ============================================================
    // HELP
    // ============================================================

    if (normalized === 'help') {
      addMessage(
        'ai',
        `[AI]

COMANDOS DISPONÍVEIS

about       → Sobre o Renan
skills      → Habilidades
stack       → Tecnologias
projects    → Projetos
services    → Serviços
experience  → Experiência
contact     → Contato
clear       → Limpar terminal
reset       → Reiniciar sessão
exit        → Fechar terminal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ou simplesmente converse comigo.

EXEMPLOS:

"Quem é o Renan?"
"Quais tecnologias ele usa?"
"Ele trabalha com WordPress?"
"Quais projetos ele desenvolve?"
"Como posso entrar em contato?"`
      );

      setInput('');
      return;
    }

    // ============================================================
    // ABOUT
    // ============================================================

    if (normalized === 'about') {
      const response = getTerminalAIResponse(
        'quem é o Renan?',
        visitorName
      );

      addMessage(
        response.type || 'ai',
        response.response
      );

      setInput('');
      return;
    }

    // ============================================================
    // SKILLS
    // ============================================================

    if (normalized === 'skills') {
      const response = getTerminalAIResponse(
        'quais tecnologias ele usa?',
        visitorName
      );

      addMessage(
        response.type || 'ai',
        response.response
      );

      setInput('');
      return;
    }

    // ============================================================
    // STACK
    // ============================================================

    if (normalized === 'stack') {
      const response = getTerminalAIResponse(
        'qual é a stack?',
        visitorName
      );

      addMessage(
        response.type || 'ai',
        response.response
      );

      setInput('');
      return;
    }

    // ============================================================
    // PROJECTS
    // ============================================================

    if (normalized === 'projects') {
      const response = getTerminalAIResponse(
        'quais são os projetos?',
        visitorName
      );

      addMessage(
        response.type || 'ai',
        response.response
      );

      setInput('');
      return;
    }

    // ============================================================
    // SERVICES
    // ============================================================

    if (normalized === 'services') {
      const response = getTerminalAIResponse(
        'quais serviços ele oferece?',
        visitorName
      );

      addMessage(
        response.type || 'ai',
        response.response
      );

      setInput('');
      return;
    }

    // ============================================================
    // EXPERIENCE
    // ============================================================

    if (normalized === 'experience') {
      const response = getTerminalAIResponse(
        'qual a experiência dele?',
        visitorName
      );

      addMessage(
        response.type || 'ai',
        response.response
      );

      setInput('');
      return;
    }

    // ============================================================
    // CONTACT
    // ============================================================

    if (normalized === 'contact') {
      const response = getTerminalAIResponse(
        'como entrar em contato?',
        visitorName
      );

      addMessage(
        response.type || 'ai',
        response.response
      );

      setInput('');
      return;
    }

    // ============================================================
    // IA
    // ============================================================

    const response = getTerminalAIResponse(
      cleanCommand,
      visitorName
    );

    addMessage(
      response.type || 'ai',
      response.response
    );

    // ============================================================
    // DETECTAR NOME DO VISITANTE
    // ============================================================

    const nameMatch = cleanCommand.match(
      /(?:meu nome é|me chamo|pode me chamar de|sou o|sou a)\s+(.+)/i
    );

    if (nameMatch?.[1]) {
      setVisitorName(nameMatch[1].trim());
    }

    setInput('');
  };

  // ============================================================
  // AUTO SCROLL
  // ============================================================

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);

  // ============================================================
  // AUTO FOCUS
  // ============================================================

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // ============================================================
  // NÃO RENDERIZAR
  // ============================================================

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">

      <div className="w-full max-w-2xl bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs text-slate-200">

        {/* ======================================================
            TERMINAL HEADER
        ======================================================= */}

        <div className="px-4 py-3 bg-slate-900 flex items-center justify-between border-b border-slate-800">

          <div className="flex items-center gap-3">

            {/* ÍCONE DA IA */}

            <div className="relative">

              <Bot
                size={16}
                style={{ color: accent }}
              />

              <Circle
                size={5}
                fill="#22c55e"
                className="absolute -right-1 -top-1 text-green-500"
              />

            </div>

            {/* NOME */}

            <div className="flex flex-col">

              <span className="font-bold text-slate-300">
                dev-terminal // AI
              </span>

              <span className="text-[9px] text-green-500">
                AI PROFILE MODULE ONLINE
              </span>

            </div>

          </div>

          {/* CONTROLES */}

          <div className="flex items-center gap-1">

            {/* RESET */}

            <button
              onClick={resetTerminal}
              title="Resetar sessão"
              className="p-1.5 hover:bg-slate-800 rounded text-slate-500 hover:text-white transition"
            >
              <RotateCcw size={13} />
            </button>

            {/* FECHAR */}

            <button
              onClick={handleClose}
              title="Fechar terminal"
              className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition"
            >
              <X size={16} />
            </button>

          </div>

        </div>

        {/* ======================================================
            LOGS / MENSAGENS
        ======================================================= */}

        <div className="p-5 h-80 overflow-y-auto space-y-3 font-mono">

          {messages.map((message) => {

            const isUser =
              message.type === 'user';

            const isError =
              message.type === 'error';

            const isSuccess =
              message.type === 'success';

            const isSystem =
              message.type === 'system';

            return (
              <div
                key={message.id}
                className={`
                  whitespace-pre-wrap
                  leading-relaxed
                  ${
                    isUser
                      ? 'text-amber-400 font-bold'
                      : isError
                      ? 'text-red-400'
                      : isSuccess
                      ? 'text-green-400'
                      : isSystem
                      ? 'text-slate-400'
                      : 'text-slate-300'
                  }
                `}
              >

                {/* IDENTIFICAÇÃO DA IA */}

                {!isUser &&
                  !isSystem && (
                    <span
                      className="text-[10px] block mb-1 font-bold"
                      style={{
                        color: isSuccess
                          ? '#22c55e'
                          : accent
                      }}
                    >
                      {isSuccess
                        ? '[SYSTEM]'
                        : isError
                        ? '[AI ERROR]'
                        : '[AI]'}
                    </span>
                  )}

                {message.content}

              </div>
            );
          })}

          <div ref={bottomRef} />

        </div>

        {/* ======================================================
            INPUT
        ======================================================= */}

        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (input.trim()) {
              handleCommand(input);
            }
          }}
          className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
        >

          {/* PROMPT */}

          <span
            style={{ color: accent }}
            className="font-bold"
          >
            &gt;
          </span>

          {/* INPUT */}

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Pergunte qualquer coisa..."
            className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-500 font-mono text-xs"
            autoComplete="off"
          />

          {/* ENTER */}

          <button
            type="submit"
            className="text-slate-500 hover:text-white p-1 transition"
          >
            <CornerDownLeft size={14} />
          </button>

        </form>

        {/* ======================================================
            QUICK COMMANDS
        ======================================================= */}

        <div className="px-4 py-2 bg-slate-950 border-t border-slate-900 flex items-center gap-2 text-[10px] overflow-x-auto">

          <span className="text-slate-500 shrink-0">
            Atalhos:
          </span>

          {[
            'about',
            'stack',
            'projects',
            'services',
            'contact'
          ].map((btn) => (

            <button
              key={btn}
              onClick={() =>
                handleCommand(btn)
              }
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap transition"
            >
              {btn}
            </button>

          ))}

        </div>

      </div>

    </div>
  );
};