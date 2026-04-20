import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MessageCircle, ExternalLink,
  ArrowDown, Send, Code2, Database, Globe, Server,
  Terminal as TerminalIcon, Layers, Smartphone, Cloud,
  ChevronRight, Zap, Coffee
} from 'lucide-react';
import './App.css';

/* Custom SVG icons for brands (lucide doesn't include brand icons) */
const GithubIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */
const SKILLS = {
  frontend: [
    { name: 'React / Next.js', level: 92, icon: '⚛️' },
    { name: 'TypeScript', level: 85, icon: '🔷' },
    { name: 'HTML / CSS', level: 95, icon: '🎨' },
    { name: 'Tailwind CSS', level: 88, icon: '💨' },
    { name: 'GSAP / Framer Motion', level: 80, icon: '✨' },
  ],
  backend: [
    { name: 'Node.js / Express', level: 90, icon: '🟢' },
    { name: 'Python / Django', level: 78, icon: '🐍' },
    { name: 'PostgreSQL', level: 82, icon: '🐘' },
    { name: 'MongoDB', level: 80, icon: '🍃' },
    { name: 'REST & GraphQL APIs', level: 88, icon: '🔗' },
  ],
  devops: [
    { name: 'Git / GitHub', level: 92, icon: '📦' },
    { name: 'Docker', level: 75, icon: '🐳' },
    { name: 'Linux / CLI', level: 80, icon: '🐧' },
    { name: 'Vercel / AWS', level: 78, icon: '☁️' },
    { name: 'CI/CD Pipelines', level: 70, icon: '🔄' },
  ]
};

const PROJECTS = [
  {
    id: 13,
    name: 'Lumina Analytics Engine: Arquitetura SaaS Escalonável com Processamento Massivo de Dados',
    desc: 'Desenvolvi do zero um Motor Analítico Desacoplado capaz de injetar e processar instantaneamente dados de assinaturas ao longo de um período de 3 anos (Data Modeling robusto). Utilizei a força nativa do banco de dados relacional e a flexibilidade do GraphQL para plugar um Frontend reativo moderno e blindado desenhado para o modelo corporativo.',
    tags: ['React', 'TypeScript', 'Python', 'Django', 'PostgreSQL', 'GraphQL', 'Docker', 'GitHub Actions', 'CI/CD', 'Linux / CLI'],
    image: '/lumina_analytics_cover.png',
    imageStyle: { objectFit: 'cover', objectPosition: 'top center' },
    live: 'https://marketing-site-black-pi.vercel.app',
    github: 'https://github.com/silvajeanderson165-creator/Lumina-Booking-SaaS',
    featured: true
  },
  {
    id: 14,
    name: 'NEXUS PORTAL — Experiência 3D Interativa com WebGL & Shaders Customizados',
    desc: 'Construí do zero uma experiência web 3D imersiva com Three.js e React Three Fiber. O artefato central é um TorusKnot com ShaderMaterial GLSL customizado (iridescência Fresnel + simplex noise) renderizado via EffectComposer com UnrealBloomPass. Implementei controle orbital com coordenadas esféricas, sistema de partículas instanciadas (InstancedMesh) com golden angle, e arquitetura de estado Zustand para bridge DOM↔R3F. Pipeline de post-processing manual com bloom adaptativo e scroll suave Lenis.',
    tags: [
      'React 19', 'TypeScript', 'Three.js', 'React Three Fiber',
      'GLSL Shaders', 'WebGL', 'Zustand', 'GSAP', 'Lenis',
      'Post-Processing', 'Vite', 'Tailwind CSS'
    ],
    image: '/nexus_portal_cover.png',
    imageStyle: { objectFit: 'cover', objectPosition: 'center' },
    live: 'https://nexus-portal-xxx.vercel.app',
    github: 'https://github.com/silvajeanderson165-creator/nexus-portal',
    featured: true
  },
  {
    id: 12,
    name: 'Nord Nails Studio',
    desc: 'Landing page premium para estúdio de unhas e beleza. Foco em estética minimalista, alta conversão e agendamento prático.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    image: '/nord_nails_cover.jpg',
    imageStyle: { objectFit: 'cover', objectPosition: 'center' },
    live: 'https://nord-nails.vercel.app',
    github: 'https://github.com/silvajeanderson165-creator/nord-nails',
  },
  {
    id: 11,
    name: 'Restaurante La Maison',
    desc: 'Site de restaurante de alta gastronomia com design cinematográfico e premium. Experiência de usuário fluida e interativa com animações avançadas.',
    tags: ['React', 'TypeScript', 'Vite', 'GSAP', 'Framer Motion', 'Zustand', 'Tailwind CSS'],
    image: '/la_maison_cover.png',
    imageStyle: { objectFit: 'cover', objectPosition: 'center' },
    live: 'https://sitemd-sooty.vercel.app',
    github: 'https://github.com/silvajeanderson165-creator/la-maison-restaurant-site',
  },
  {
    id: 10,
    name: 'Dasheborde para Você se Organizar',
    desc: 'Dashboard completo e profissional de gerenciamento de tarefas, com autenticação JWT, banco de dados em tempo real e design premium em Dark Mode.',
    tags: [
      'React v19', 'Vite', 'Node.js', 'Express.js v5', 'MongoDB Atlas', 'JWT', 'Axios', 'Lucide React', 'Vercel Serverless'
    ],
    image: '/organiza_cover.jpeg',
    imageStyle: { objectFit: 'cover', objectPosition: 'center' },
    live: 'https://organiza-dashboard-full.vercel.app/login',
    github: 'https://github.com/silvajeanderson165-creator/organiza-dashboard-full',
  },
  {
    id: 9,
    name: 'Mario Bros',
    desc: 'Recriação de interface interativa inspirada no clássico jogo Super Mario Bros, focando em animações, responsividade e engajamento visual. Desenvolvido para aprimorar habilidades fundamentais de frontend.',
    tags: ['HTML5', 'CSS3 Web Animation', 'JavaScript Vanilla', 'DOM Manipulation'],
    image: '/mario_cover.jpg',
    imageStyle: { objectFit: 'cover', objectPosition: 'center' },
    live: 'https://mario-bros-seven.vercel.app',
    github: 'https://github.com/silvajeanderson165-creator/mario-bros',
  },
  {
    id: 8,
    name: 'Tradutor Online',
    desc: 'Tradutor inteligente com suporte a múltiplos idiomas, detecção automática e histórico. Interface elegante com tema claro e escuro, além de layout responsivo.',
    tags: ['HTML5', 'CSS3', 'JavaScript Avançado (Vanilla JS - ES6+)', 'Uso de Variáveis CSS (:root)', 'APIs'],
    image: '/print_tradutor.jpg',
    imageStyle: { objectFit: 'cover', objectPosition: 'center' },
    live: 'https://pj-tradutor.vercel.app',
    github: 'https://github.com/silvajeanderson165-creator/pj-tradutor',
  },
  {
    id: 7,
    name: 'Gerador de Miniaturas do YouTube',
    desc: 'Criador de miniaturas virais com Inteligência Artificial para alavancar taxa de cliques (CTR). Backend integrado para geração de imagens rápido e design responsivo.',
    tags: [
      'React v19', 'Vite v8', 'JS/JSX ES6+', 'HTML5', 'CSS3 Vanilla',
      'Node.js', 'Express v5', 'Cors', '@fal-ai/client',
      'Lucide-React', 'ESLint', 'Git/GitHub', 'Vercel'
    ],
    image: '/esaa_cover.jpg',
    live: 'https://thumbnail-forge-one.vercel.app',
    github: 'https://github.com/silvajeanderson165-creator/thumbnail-forge',
  },

];

const EXPERIENCE = [
  {
    role: 'Desenvolvedor Web Full Stack',
    company: 'Projetos Autorais',
    desc: 'Desenvolvedor Full Stack de produtos digitais imersivos e escaláveis. Projetos autorais: Miniatura Forja AI (integração IA + Node/Express), Tradutor Online (arquitetura avançada de APIs) e Portfólio cinematográfico (terminal interativo + GSAP). Do backend robusto às interfaces marcantes - domínio completo do ciclo de desenvolvimento. Stack: React v19, Node.js, Express, REST APIs, IA, GSAP, Tailwind CSS, JavaScript ES6+, Git.',
    active: true,
  },
  {
    role: 'Frontend Developer',
    company: 'Especialização em Frontend & UI/UX',
    desc: 'Desenvolvimento intensivo de projetos web focados em UX/UI modernas. Criação de portfólios interativos, componentes reutilizáveis e interfaces responsivas. Implementação de animações CSS avançadas, otimização de performance e boas práticas de acessibilidade. Conquistas: +10 projetos desenvolvidos, domínio de animações CSS, design responsivo mobile-first',
    active: false,
  },
  {
    role: 'Desenvolvedor Web em Formação',
    company: 'Estudos Autodidatas & Primeiros Projetos',
    desc: 'Início da jornada em desenvolvimento web com foco em fundamentos sólidos. Criação de projetos práticos incluindo landing pages, componentes animados e interfaces responsivas. Participação ativa em comunidades de desenvolvedores e contribuição em projetos open-source educacionais. Aprendizados: HTML semântico, CSS moderno, JavaScript, Git/GitHub, Responsive Design',
    active: false,
  },
];

const TERMINAL_COMMANDS = {
  help: [
    '  Tecnologias que dão vida a esta página:',
    '  ──────────────────────────────────────────',
    '  <span class="accent-text">1. React (JS/JSX)</span> → O cérebro do sistema. Ele constrói a estrutura e controla a lógica (como este próprio terminal).',
    '  <span class="accent-text">2. CSS3 / HTML5</span>   → A roupagem e o esqueleto. Todo o visual Dark moderno, com cores neon e caixas arredondadas.',
    '  <span class="accent-text">3. GSAP 3</span>         → O "Animador Chefe". Ele que coordena o robô flutuante e a entrada mágica dos blocos ao rolar a página.',
    '  <span class="accent-text">4. Vite</span>           → O Motor de Combustão. Trabalha nos bastidores pra que o site renderize ultra-rápido no seu navegador.',
    '  <span class="accent-text">5. Lucide React</span>   → A coleção dos ícones vetoriais afiados e profissionais que vemos nos botões e painéis.',
    '  ──────────────────────────────────────────',
    '  Outros comandos disponíveis: whoami, skills, contact, projects, clear',
    '',
    '  <span class="accent-text highlight">Eu sou o mestre dos Codigos 😏😎</span>',
  ],
  whoami: [
    '  Jeanderson Silva',
    '  Desenvolvedor Full Stack | Brasil 🇧🇷',
    '  Apaixonado por criar experiências digitais',
    '  que impressionam e resolvem problemas reais.',
  ],
  skills: [
    '  {',
    '    <span class="accent-text">"frontend"</span>: ["React", "Next.js", "TypeScript", "Tailwind"],',
    '    <span class="accent-text">"backend"</span>:  ["Node.js", "Python", "Express", "Django"],',
    '    <span class="accent-text">"database"</span>: ["PostgreSQL", "MongoDB", "Firebase"],',
    '    <span class="accent-text">"devops"</span>:   ["Docker", "Git", "Vercel", "AWS"]',
    '  }',
  ],
  contact: [
    '  📧 Email: jeanderson@email.com',
    '  💬 WhatsApp: disponível',
    '  🐙 GitHub: github.com/jeanderson',
    '  🔗 LinkedIn: linkedin.com/in/jeanderson',
  ],
  projects: [
    '  Total de projetos: <span class="accent-text">20+</span>',
    '  Projetos em destaque: <span class="accent-text">6</span>',
    '  Clientes atendidos: <span class="accent-text">15+</span>',
  ],
  'sudo hire-me': [
    '',
    '  🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉',
    '',
    '  ✅ CONTRATAÇÃO APROVADA COM SUCESSO!',
    '',
    '  Parabéns! Você fez a melhor escolha.',
    '  Entre em contato para começarmos! 🚀',
    '',
    '  🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉',
    '',
  ],
};

/* ═══════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════ */

/* ── Preloader ─────────────────────────────────────────────── */
function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('> initializing portfolio...');
  const [status, setStatus] = useState('loading modules');

  useEffect(() => {
    const messages = [
      { at: 20, text: '> loading assets...', status: 'fetching resources' },
      { at: 45, text: '> compiling components...', status: 'building UI' },
      { at: 70, text: '> establishing connection...', status: 'connecting' },
      { at: 90, text: '> almost there...', status: 'finalizing' },
      { at: 100, text: '> access granted.', status: 'ready' },
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 4 + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => onComplete(), 600);
      }
      setProgress(Math.min(current, 100));

      const msg = messages.find(m => current >= m.at && current < (m.at + 10));
      if (msg) {
        setText(msg.text);
        setStatus(msg.status);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="preloader" id="preloader">
      <div className="preloader-text">{text}</div>
      <div className="preloader-bar-container">
        <div className="preloader-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="preloader-status">{status} — {Math.round(progress)}%</div>
    </div>
  );
}

/* ── Stars Background ──────────────────────────────────────── */
function StarsBackground() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 3,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  return (
    <div className="hero-stars">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            '--duration': `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ── Navbar ─────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <a href="#hero" className="nav-logo" onClick={e => handleNavClick(e, 'hero')}>
        <span className="nav-logo-dot" />
        jeanderson.dev
      </a>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {['Sobre', 'Skills', 'Projetos', 'Experiência', 'Contato'].map(item => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
              className="nav-link"
              onClick={e => handleNavClick(e, item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))}
            >
              {item}
            </a>
          </li>
        ))}
        <li>
          <a href="#contato" className="nav-cta" onClick={e => handleNavClick(e, 'contato')}>
            <span>Fale Comigo</span>
          </a>
        </li>
      </ul>

      <button
        className={`nav-toggle ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */
function Hero() {
  const heroRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Full Stack Developer';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.to('.hero-video-wrapper', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to('.hero-badge', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .to('.hero-name', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .to('.hero-title-typed', { opacity: 1, duration: 0.5 }, '-=0.3')
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
        .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .to('.hero-scroll', { opacity: 1, duration: 0.5 }, '-=0.1');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <StarsBackground />
      <div className="hero-grid" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="hero-content">
        <div className="hero-text-column">
          <div className="hero-badge" style={{ opacity: 0, transform: 'translateY(10px)' }}>
            <span className="hero-badge-dot" />
            Disponível para projetos
          </div>

          <h1 className="hero-name" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            Jeanderson{' '}
            <span className="hero-name-gradient">Silva</span>
          </h1>

          <div className="hero-title-typed" style={{ opacity: 0 }}>
            {'> '}{typedText}
          </div>

          <p className="hero-subtitle" style={{ opacity: 0, transform: 'translateY(10px)' }}>
            Transformo ideias em experiências digitais de alto impacto.
            Código limpo, design cinematográfico, resultados reais.
          </p>
        </div>

        <div className="hero-visual-column">
          <div className="hero-video-wrapper" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className="hero-video-inner">
              <video
                src="/hero-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                className="hero-video"
              />
            </div>
          </div>

          <div className="hero-ctas" style={{ opacity: 0, transform: 'translateY(10px)' }}>
            <a href="#projetos" className="btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Meus Projetos
            </a>
            <a href="#contato" className="btn-secondary" onClick={e => { e.preventDefault(); document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Entre em Contato
            </a>
          </div>
        </div>

        <div className="hero-scroll" style={{ opacity: 0 }}>
          <span>scroll to explore</span>
          <div className="hero-scroll-line" />
        </div>
      </div>
    </section>
  );
}

/* ── Terminal (About) ──────────────────────────────────────── */
function InteractiveTerminal() {
  const [lines, setLines] = useState([
    { type: 'system', html: '  Bem-vindo ao terminal do Jeanderson! 🚀' },
    { type: 'system', html: '  Digite <span class="accent-text">help</span> para ver os comandos disponíveis.' },
    { type: 'empty' },
  ]);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);

  const handleCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines = [
      ...lines,
      { type: 'command', html: `<span class="prompt">jeanderson@portfolio:~$</span> <span class="command">${cmd}</span>` },
    ];

    if (trimmed === 'clear') {
      setLines([]);
      setInput('');
      return;
    }

    const response = TERMINAL_COMMANDS[trimmed];
    if (response) {
      response.forEach(line => {
        newLines.push({ type: 'output', html: line });
      });
    } else if (trimmed) {
      newLines.push({ type: 'output', html: `  <span class="accent-text">Comando não encontrado:</span> ${cmd}` });
      newLines.push({ type: 'output', html: '  Digite <span class="accent-text">help</span> para ver os comandos.' });
    }

    newLines.push({ type: 'empty' });
    setLines(newLines);
    setInput('');
  }, [lines]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-dot red" />
        <div className="terminal-dot yellow" />
        <div className="terminal-dot green" />
        <span className="terminal-title">jeanderson@portfolio:~</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {lines.map((line, i) => (
          <div key={i} className="terminal-line">
            {line.type === 'empty' ? <br /> : (
              <span dangerouslySetInnerHTML={{ __html: line.html }} />
            )}
          </div>
        ))}
        <div className="terminal-input-line">
          <span style={{ color: 'var(--accent-secondary)' }}>jeanderson@portfolio:~$</span>
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
            <input
              className="terminal-input"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder=" digite um comando..."
              autoComplete="off"
              spellCheck="false"
            />
            {input.length === 0 && <span className="terminal-cursor">|</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-text > *', {
        scrollTrigger: { trigger: '.about-grid', start: 'top 75%' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out'
      });
      gsap.from('.terminal', {
        scrollTrigger: { trigger: '.terminal', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
      });
    }, aboutRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="sobre" ref={aboutRef}>
      <div className="section-header">
        <span className="section-label">// Sobre mim</span>
        <h2 className="section-title">Quem está por trás do código</h2>
      </div>
      <div className="about-grid">
        <div className="about-text">
          <h3>Olá! Eu sou o <span className="highlight">Jeanderson</span> 👋</h3>
          <p>
            Desenvolvedor Full Stack apaixonado por construir produtos digitais que fazem a diferença.
            Especializado em criar interfaces modernas e funcionais combinando <span className="highlight">design intuitivo,
              performance otimizada e código de qualidade.</span>
          </p>
          <p>
            Minha abordagem é centrada no usuário: cada funcionalidade, cada animação e cada linha
            de código existe para melhorar a experiência de quem vai usar. Do frontend ao backend, trabalho
            com código limpo e <span className="highlight">semântico, versionamento Git, metodologias ágeis, testes automatizados e
              design responsivo mobile-first</span> — práticas essenciais para entregar soluções escaláveis e sustentáveis.
          </p>
          <p>
            Acredito no poder da tecnologia para resolver problemas reais. Por isso, estou sempre estudando,
            experimentando e evoluindo como desenvolvedor. Busco projetos desafiadores onde possa aplicar
            minhas habilidades e continuar crescendo.
          </p>
          <p>
            Pronto para transformar ideias em realidade digital. <span style={{ color: '#00D4AA', fontWeight: '600' }}>Vamos construir algo incrível juntos? 🎯</span>
          </p>
        </div>
        <InteractiveTerminal />
      </div>
    </section>
  );
}

/* ── Skills ─────────────────────────────────────────────────── */
function Skills() {
  const [activeTab, setActiveTab] = useState('frontend');
  const skillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-bar', {
        scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' },
        y: 20, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out'
      });
    }, skillsRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animate skill bars on tab change
    const fills = document.querySelectorAll('.skill-progress-fill');
    fills.forEach(fill => {
      fill.style.width = '0%';
      setTimeout(() => {
        fill.style.width = fill.dataset.level + '%';
      }, 100);
    });
  }, [activeTab]);

  const tabs = [
    { key: 'frontend', label: 'Frontend', icon: <Globe size={14} /> },
    { key: 'backend', label: 'Backend', icon: <Server size={14} /> },
    { key: 'devops', label: 'DevOps & Tools', icon: <Cloud size={14} /> },
  ];

  return (
    <section className="skills" id="skills" ref={skillsRef}>
      <div className="section-header">
        <span className="section-label">// Tech Stack</span>
        <h2 className="section-title">Minhas Tecnologias</h2>
        <p className="section-subtitle">As ferramentas que uso para transformar ideias em código</p>
      </div>

      <div className="skills-tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`skills-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="skills-grid">
        {SKILLS[activeTab].map((skill, i) => (
          <div className="skill-bar" key={skill.name} style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="skill-bar-header">
              <span className="skill-name">{skill.icon} {skill.name}</span>
              <span className="skill-level">{skill.level}%</span>
            </div>
            <div className="skill-progress">
              <div
                className="skill-progress-fill"
                data-level={skill.level}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Projects ──────────────────────────────────────────────── */
function Projects() {
  const projectsRef = useRef(null);

  useEffect(() => {
    // const ctx = gsap.context(() => {
    //   gsap.from('.project-card', {
    //     scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' },
    //     y: 50, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out'
    //   });
    // }, projectsRef);
    // return () => ctx.revert();
  }, []);

  return (
    <section className="projects" id="projetos" ref={projectsRef}>
      <div className="section-header">
        <span className="section-label">// Portfólio</span>
        <h2 className="section-title">Projetos em Destaque</h2>
        <p className="section-subtitle">Alguns dos projetos que construí — cada um com desafios únicos</p>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((project, i) => (
          <div className={`project-card ${project.featured ? 'project-featured' : ''}`} key={project.id}>
            <div className="project-image-container">
              <img src={project.image} alt={project.name} className="project-image" style={project.imageStyle || {}} loading="lazy" />
              <div className="project-image-overlay">
                <a href={project.live} className="project-overlay-btn" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={12} /> Live
                </a>
                <a href={project.github} className="project-overlay-btn" target="_blank" rel="noopener noreferrer">
                  <GithubIcon size={12} /> Code
                </a>
              </div>
            </div>
            <div className="project-info">
              <div className="project-number">Projeto {String(i + 1).padStart(2, '0')}</div>
              <h3 className="project-name">{project.name}</h3>
              <p className="project-desc">{project.desc}</p>
              <div className="project-tags">
                {project.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── User Provided Robot (Replacing Stats) ───────────────── */
function Stats() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.robot-slider',
        { x: '-20vw' },
        {
          x: '105vw',
          duration: 15,
          ease: 'linear',
          repeat: -1,
          repeatDelay: 0.5
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="robot-section-container" id="stats" ref={sectionRef}>
      <div className="robot-slider" style={{ position: 'absolute', left: 0, height: '100%', display: 'flex', alignItems: 'center' }}>
        <div className="robot-container">
          {/* Sombra */}
          <div className="robot-shadow"></div>

          {/* Antena */}
          <div className="robot-antenna">
            <div className="robot-antenna-top"></div>
          </div>

          {/* Cabeça */}
          <div className="robot-head">
            <div className="robot-head-inner">
              {/* Olhos */}
              <div className="robot-eyes">
                <div className="robot-eye">
                  <div className="robot-eye-white"></div>
                </div>
                <div className="robot-eye">
                  <div className="robot-eye-white"></div>
                </div>
              </div>

              {/* Boca */}
              <div className="robot-mouth"></div>
            </div>

            {/* Orelhas */}
            <div className="robot-ear left">
              <div className="robot-ear-inner"></div>
            </div>
            <div className="robot-ear right">
              <div className="robot-ear-inner"></div>
            </div>
          </div>

          {/* Corpo */}
          <div className="robot-body">
            <div className="robot-chest-screen">
              <div className="robot-screen-light"></div>
            </div>
            <div className="robot-buttons">
              <div className="robot-button"></div>
              <div className="robot-button"></div>
              <div className="robot-button"></div>
            </div>
          </div>

          {/* Braços */}
          <div className="robot-arm left">
            <div className="robot-arm-upper"></div>
            <div className="robot-arm-lower">
              <div className="robot-hand"></div>
            </div>
          </div>

          <div className="robot-arm right">
            <div className="robot-arm-upper"></div>
            <div className="robot-arm-lower">
              <div className="robot-hand"></div>
            </div>
          </div>

          {/* Pernas */}
          <div className="robot-legs">
            <div>
              <div className="robot-leg"></div>
              <div className="robot-foot"></div>
            </div>
            <div>
              <div className="robot-leg"></div>
              <div className="robot-foot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Experience ────────────────────────────────────────────── */
function Experience() {
  const expRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-item', {
        scrollTrigger: { trigger: '.timeline', start: 'top 80%' },
        x: -30, opacity: 0, stagger: 0.2, duration: 0.7, ease: 'power3.out'
      });
    }, expRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="experience" id="experiencia" ref={expRef}>
      <div className="section-header">
        <span className="section-label">// Trajetória</span>
        <h2 className="section-title">Experiência Profissional</h2>
        <p className="section-subtitle">Minha jornada até aqui — cada passo me trouxe novas skills</p>
      </div>

      <div className="timeline">
        {EXPERIENCE.map((exp, i) => (
          <div className="timeline-item" key={i}>
            <div className={`timeline-dot ${exp.active ? 'active' : ''}`} />
            <div className="timeline-card">
              <div className="timeline-role">{exp.role}</div>
              <div className="timeline-company">{exp.company}</div>
              <div className="timeline-desc">{exp.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Contact ───────────────────────────────────────────────── */
function Contact() {
  const contactRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-info > *', {
        scrollTrigger: { trigger: '.contact', start: 'top 75%' },
        y: 30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out'
      });
      gsap.from('.contact-form-container', {
        scrollTrigger: { trigger: '.contact-form-container', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.7, ease: 'power3.out'
      });
    }, contactRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("https://formsubmit.co/ajax/Silvajeanderson165@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nome: formState.name,
          email: formState.email,
          mensagem: formState.message,
          _subject: "Nova mensagem do Portfólio!",
          _template: "box"
        })
      });
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      alert("Houve um erro ao enviar sua mensagem. Tente novamente.");
    }
  };

  return (
    <section className="contact" id="contato" ref={contactRef}>
      <div className="section-header">
        <span className="section-label">// Contato</span>
        <h2 className="section-title">Vamos Construir Algo Incrível</h2>
        <p className="section-subtitle">Tem um projeto em mente? Vamos conversar sobre como posso ajudar</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h3>Vamos trabalhar <span className="highlight">juntos?</span></h3>
          <p>
            Estou sempre aberto a novas oportunidades e projetos desafiadores.
            Se você busca um desenvolvedor que entrega qualidade e se importa com
            cada pixel, você está no lugar certo.
          </p>

          <div className="contact-socials">
            <a href="https://wa.me/5575997067931" className="social-link" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} />
              <span>WhatsApp</span>
              <ChevronRight size={14} style={{ marginLeft: 'auto' }} />
            </a>
            <a href="https://github.com/silvajeanderson165-creator" className="social-link" target="_blank" rel="noopener noreferrer">
              <GithubIcon size={18} />
              <span>GitHub</span>
              <ChevronRight size={14} style={{ marginLeft: 'auto' }} />
            </a>
            <a href="https://www.linkedin.com/in/jeanderson-silva-9a8844386/" className="social-link" target="_blank" rel="noopener noreferrer">
              <LinkedinIcon size={18} />
              <span>LinkedIn</span>
              <ChevronRight size={14} style={{ marginLeft: 'auto' }} />
            </a>
          </div>
        </div>

        <div className="contact-form-container">
          <div className="contact-form-header">
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">// seu nome</label>
              <input
                id="name"
                type="text"
                placeholder="Como posso te chamar?"
                value={formState.name}
                onChange={e => setFormState({ ...formState, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">// seu email</label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formState.email}
                onChange={e => setFormState({ ...formState, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">// sua mensagem</label>
              <textarea
                id="message"
                placeholder="Conte-me sobre seu projeto..."
                value={formState.message}
                onChange={e => setFormState({ ...formState, message: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="form-submit">
              {sent ? "Mensagem Enviada!" : "Enviar Mensagem"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ────────────────────────────────────────────────── */
function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h4>Jeanderson Silva</h4>
          <p>Desenvolvedor Full Stack construindo experiências digitais que impressionam. Cada projeto é uma oportunidade de criar algo extraordinário.</p>
        </div>
        <div className="footer-column">
          <h5>Navegação</h5>
          <a href="#sobre">Sobre</a>
          <a href="#skills">Skills</a>
          <a href="#projetos">Projetos</a>
          <a href="#experiencia">Experiência</a>
          <a href="#contato">Contato</a>
        </div>
        <div className="footer-column">
          <h5>Social</h5>
          <a href="https://wa.me/5575997067931" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="https://github.com/silvajeanderson165-creator" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/jeanderson-silva-9a8844386/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-status">
          <span className="status-dot" />
          System Operational — {time}
        </div>
        <div className="footer-copy">
          Designed & Coded with <Coffee size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> by Jeanderson Silva — {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════ */
function App() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Stats />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
