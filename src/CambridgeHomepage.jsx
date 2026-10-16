/**
 * Cambridge Centre of English Modena - homepage.
 * File unico: dati, hook, sottocomponenti e sezioni.
 * Fatti: content/source-facts.md. Design: docs/design-package.md.
 *
 * Scelte di design (non fatti verificati): palette derivata (canvas, blu notte),
 * font del corpo e delle etichette, segno grafico C concentrica + raggi Union Jack,
 * titoli con sfumatura in tinte chiare di rosso e blu del logo (per il contrasto).
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, BookOpen, Building2, Check, ChevronDown, ClipboardCheck,
  Facebook, GraduationCap, Instagram, Mail, MapPin, Menu, Phone, School, User, Video, X,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Dati                                                                */
/* ------------------------------------------------------------------ */

const CONTACT = {
  tel: '+39 059 9782849', telHref: 'tel:+390599782849',
  mobile: '+39 347 8094826', mobileHref: 'tel:+393478094826',
  info: 'info@cambridgecentre.com', esami: 'esami@cambridgecentre.com',
  address: 'Via Nicolò Biondo 293, 41126 Modena',
  map: 'https://www.google.com/maps/search/?api=1&query=Via+Nicol%C3%B2+Biondo+293+Modena',
};

const LINKS = {
  corsi: 'https://cambridgecentre.com/corsi',
  aziendali: 'https://cambridgecentre.com/corsi-aziendali',
  test: 'https://cambridgecentre.com/test-your-english',
  privacy: 'https://cambridgecentre.com/privacy-policy',
  registrazione: 'https://cemsystem.it/modena/',
  facebook: 'https://www.facebook.com/cambridgecentremodena/',
  instagram: 'https://www.instagram.com/cambridgecentreofenglish/',
  tiktok: 'https://www.tiktok.com/@cambridgecentreofenglish',
  recensione: 'https://g.page/r/CZ679AbFLHaeEBM/review',
};

const NAV = [
  { href: '#corsi', label: 'Corsi' },
  { href: '#aziende', label: 'Aziende' },
  { href: '#scuole', label: 'Scuole' },
  { href: '#esami', label: 'Esami Cambridge' },
  { href: '#chi-siamo', label: 'Chi siamo' },
  { href: '#contatti', label: 'Contatti' },
];

const HERO = {
  chapters: [
    { id: 'london', kicker: 'LONDON', title: 'L’inglese non si studia. Si vive.', img: 'london' },
    { id: 'westminster', kicker: 'WESTMINSTER', title: 'Dalla prima parola alla certificazione.', img: 'westminster' },
  ],
  settle: {
    kicker: 'CAMBRIDGE',
    sub: 'Dal 1964 a Modena. Corsi per bambini, ragazzi, adulti e aziende, e centro d’esame autorizzato Cambridge Assessment English.',
  },
};

const SERVICES = [
  {
    id: 'corsi', tag: 'BAMBINI · RAGAZZI · ADULTI', title: 'Corsi di inglese', icon: BookOpen, img: '/img/corsi.webp',
    text: 'Cambridge Kids dai 6 agli 11 anni, Cambridge Teens fino ai 18, Cambridge Adults dai 18. Gruppi da 6 a 14 studenti, in presenza o online.',
    cta: 'Scopri i corsi', href: LINKS.corsi, extra: { label: 'Scopri il tuo livello con il test online', href: LINKS.test },
  },
  {
    id: 'aziende', tag: 'AZIENDE', title: 'Business English su misura', icon: Building2, img: '/img/aziende.webp',
    text: 'Individuale o in piccoli gruppi, in presenza o online, per le aziende di Modena e provincia. Prima un colloquio sul vostro settore, poi il progetto.',
    cta: 'Richiedi un preventivo', profile: 'azienda',
  },
  {
    id: 'esami', tag: 'ESAMI', title: 'Preparazione e iscrizione', icon: ClipboardCheck, img: '/img/esami.webp',
    text: 'Esami Cambridge English Qualifications Digital, in presenza nel nostro laboratorio informatico. Corsi di preparazione per PET, FCE, CAE e CPE.',
    cta: 'Scegli il tuo esame', href: '#esami',
  },
  {
    id: 'scuole', tag: 'SCUOLE STATALI E PARITARIE', title: 'Iscrizione in blocco per le scuole', icon: School, img: '/img/scuole.webp',
    text: 'Iscrivi i tuoi studenti agli esami Cambridge a nome della scuola, con un tutorial dedicato e il coordinamento esami a disposizione.',
    cta: 'Scrivi al coordinamento esami', profile: 'scuola',
  },
];

const EXAMS = [
  {
    id: 'yle', code: 'YLE', name: 'Starters, Movers, Flyers', group: 'Young Learners',
    who: 'Bambini dai 6 agli 11 anni.',
    prep: 'Corsi Cambridge Kids: 30 ore, in presenza, gruppi da 6 a 10 studenti.',
    format: 'Non in versione Digital, a differenza degli altri esami del centro.',
  },
  {
    id: 'ket', code: 'A2', name: 'A2 Key (KET) for Schools', group: 'Livello A2',
    who: 'Studenti della scuola secondaria che iniziano il percorso Cambridge.',
    prep: 'Corso Cambridge Teens: 46 ore, ottobre-aprile, in presenza oppure online.',
    format: 'Prova Digital in presenza, Speaking con esaminatore certificato.',
  },
  {
    id: 'pet', code: 'B1', name: 'B1 Preliminary (PET)', group: 'Livello B1',
    who: 'Ragazzi e adulti. Esiste anche la versione for Schools.',
    prep: 'Cambridge Teens (46 ore) oppure Exam Preparation per adulti (60 ore, serale, online).',
    format: 'Prova Digital in presenza, Speaking con esaminatore certificato.',
  },
  {
    id: 'fce', code: 'B2', name: 'B2 First (FCE)', group: 'Livello B2',
    who: 'Ragazzi e adulti. Esiste anche la versione for Schools.',
    prep: 'Cambridge Teens (46 ore) oppure Exam Preparation per adulti (60 ore, serale, online).',
    format: 'Prova Digital in presenza, Speaking con esaminatore certificato.',
  },
  {
    id: 'cae', code: 'C1', name: 'C1 Advanced (CAE)', group: 'Livello C1',
    who: 'Chi vuole un titolo ufficiale per lo studio e per la carriera.',
    prep: 'Cambridge Teens (46 ore) oppure Exam Preparation per adulti (60 ore, serale, online).',
    format: 'Prova Digital in presenza, Speaking con esaminatore certificato.',
  },
  {
    id: 'cpe', code: 'C2', name: 'C2 Proficiency (CPE)', group: 'Livello C2',
    who: 'Adulti che hanno già un inglese avanzato e vogliono certificarlo.',
    prep: 'Exam Preparation per adulti: 60 ore, serale, online.',
    format: 'Prova Digital in presenza, Speaking con esaminatore certificato.',
  },
];

const BUSINESS_COURSES = [
  ['General English', 'La preparazione standard per migliorare le competenze e aumentare di livello.'],
  ['Business with Pleasure', 'L’inglese utile per socializzare con i colleghi in un contesto semi-formale.'],
  ['Meeting across Cultures', 'Il linguaggio e le strategie per riunioni e altri contesti formali.'],
  ['Get your Message Across', 'Parlare in pubblico in modo efficace e convincente.'],
];

const STATS = [
  { value: '1964', label: 'A Modena dal' },
  { value: '10', label: 'Esami Cambridge in calendario' },
  { value: '6-14', label: 'Studenti per gruppo' },
  { value: '10', label: 'Giorni lavorativi circa per i risultati Digital' },
];

/* DA VERIFICARE CON IL CLIENTE: nomi di scuole e aziende clienti e autorizzazione all'uso.
   Restano fuori pagina finché SHOW_CLIENT_NAMES è false. Solo testo, nessun logo di terzi. */
const SHOW_CLIENT_NAMES = false;
const CLIENT_SCHOOLS = ['Istituto Paradisi', 'Liceo Sigonio', 'Liceo Tassoni', 'IC 10 Modena'];
const CLIENT_COMPANIES = ['Opocrin', 'ISSAM', 'Ecor International'];

/* Hero: condizioni di hero statica, identiche a quelle del brief. */
const STATIC_QUERIES = [
  '(max-width: 720px)',
  '(orientation: portrait) and (max-width: 1024px)',
  '(orientation: portrait) and (pointer: coarse)',
  '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
  '(prefers-reduced-motion: reduce)',
];

// MP4 H.264 come primo formato, WebM VP9 per i browser senza H.264.
const VIDEO_SOURCES = [
  { src: '/hero/journey.mp4', type: 'video/mp4', probe: 'video/mp4; codecs="avc1.42E01E"', bytes: 6712650 },
  { src: '/hero/journey.webm', type: 'video/webm', probe: 'video/webm; codecs="vp9"', bytes: 5428236 },
];
const VIDEO_END = 0.88; // progresso di scroll in cui il video raggiunge Cambridge
// Bande [inizio rampa, piena, inizio uscita, fine uscita] in progresso di scroll 0-1
const BAND_LONDON = [-0.1, 0, 0.22, 0.27]; // già pieno a scroll 0: il titolo c'è prima di scorrere
const BAND_WESTMINSTER = [0.31, 0.35, 0.5, 0.55];
const BAND_SETTLE = [0.76, 0.84, 2, 3];

/* ------------------------------------------------------------------ */
/* Utilità e hook                                                      */
/* ------------------------------------------------------------------ */

const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
const smooth = (t) => t * t * (3 - 2 * t);
const trapezoid = (p, [a, b, c, d]) => {
  if (p <= a) return 0;
  if (p < b) return smooth((p - a) / (b - a));
  if (p <= c) return 1;
  if (p < d) return 1 - smooth((p - c) / (d - c));
  return 0;
};
const EASE = [0.22, 1, 0.36, 1];

function Icon({ as: Glyph, size = 20, className = '' }) {
  return <Glyph size={size} strokeWidth={1.5} aria-hidden="true" className={className} />;
}

/** True quando una delle cinque condizioni di hero statica è attiva, aggiornata dal vivo. */
function useStaticHero() {
  const read = () => typeof window !== 'undefined' && STATIC_QUERIES.some((q) => window.matchMedia(q).matches);
  const [value, setValue] = useState(read);
  useEffect(() => {
    const lists = STATIC_QUERIES.map((q) => window.matchMedia(q));
    const onChange = () => setValue(lists.some((m) => m.matches));
    lists.forEach((m) => m.addEventListener('change', onChange));
    onChange();
    return () => lists.forEach((m) => m.removeEventListener('change', onChange));
  }, []);
  return value;
}

/** Progresso 0-1 di un elemento durante lo scroll, per disegnare le linee del segno grafico. */
function useDraw(ref) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'end 0.55'] });
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return reduce ? 1 : drawn;
}

/* ------------------------------------------------------------------ */
/* Segno grafico: la C concentrica e i raggi della Union Jack          */
/* ------------------------------------------------------------------ */

function SignatureMark({ className = '', progress, inkClass = 'text-brand-ink', title }) {
  const reduce = useReducedMotion();
  const pl = reduce ? 1 : progress;
  const common = { fill: 'none' };
  return (
    <svg viewBox="0 0 120 120" className={`${className} ${inkClass}`} role={title ? 'img' : undefined} aria-hidden={title ? undefined : 'true'} aria-label={title}>
      <motion.path d="M96 28 A46 46 0 1 0 96 92" stroke="currentColor" strokeWidth="5" style={{ pathLength: pl }} {...common} />
      <motion.path d="M80 40 A28 28 0 1 0 80 80" stroke="currentColor" strokeWidth="5" style={{ pathLength: pl }} {...common} />
      <motion.path d="M58 12 L108 108" stroke="#E4002B" strokeWidth="4" style={{ pathLength: pl }} {...common} />
      <motion.path d="M108 12 L58 108" stroke="#036AAC" strokeWidth="4" style={{ pathLength: pl }} {...common} />
      <motion.path d="M30 60 H116" stroke="#E4002B" strokeWidth="3" style={{ pathLength: pl }} {...common} />
    </svg>
  );
}

/** Divisore di sezione: linea che si disegna allo scroll e chiude con un raggio. */
function Divider({ tone = 'light' }) {
  const ref = useRef(null);
  const draw = useDraw(ref);
  const reduce = useReducedMotion();
  const line = tone === 'light' ? '#5C6B7A' : '#9DB4C8';
  return (
    <div ref={ref} aria-hidden="true" className="mx-auto flex w-full max-w-7xl items-center px-5 sm:px-10 lg:px-16">
      <svg viewBox="0 0 1000 24" preserveAspectRatio="none" className="h-6 w-full">
        <motion.path d="M0 12 H940" stroke={line} strokeWidth="1" fill="none" style={{ pathLength: reduce ? 1 : draw }} />
        <motion.path d="M916 0 L940 12" stroke="#E4002B" strokeWidth="2" fill="none" style={{ pathLength: reduce ? 1 : draw }} />
        <motion.path d="M916 24 L940 12" stroke="#036AAC" strokeWidth="2" fill="none" style={{ pathLength: reduce ? 1 : draw }} />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Movimento                                                           */
/* ------------------------------------------------------------------ */

const REVEALS = {
  up: { hidden: { opacity: 0, y: 40 }, shown: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -48 }, shown: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 48 }, shown: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, shown: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, shown: { opacity: 1 } },
};

function Reveal({ as = 'div', variant = 'up', delay = 0, className = '', children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className} {...rest}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      variants={REVEALS[variant]}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Elemento vivo a bassissima intensità: respiro lento di opacità. */
function Breathe({ className = '', children, period = 9 }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{children}</span>;
  return (
    <motion.span className={className} animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: period, repeat: Infinity, ease: 'easeInOut' }}>
      {children}
    </motion.span>
  );
}

/** Livello di sfondo fisso: grana leggera e bagliore blu che deriva molto lentamente. */
function PageBackground() {
  const reduce = useReducedMotion();
  const grain = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")";
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute -left-1/4 top-1/4 h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(3,106,172,0.14),transparent)]"
        animate={reduce ? undefined : { x: ['0%', '24%', '0%'], y: ['0%', '-12%', '0%'] }}
        transition={{ duration: 80, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply" style={{ backgroundImage: grain }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pulsanti e piccoli elementi                                         */
/* ------------------------------------------------------------------ */

const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red';
const BTN = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium transition-colors duration-300 ${FOCUS}`;
const BTN_PRIMARY = `${BTN} bg-brand-red text-white hover:bg-red-deep`;
const BTN_OUTLINE_DARK = `${BTN} border border-white/70 text-white hover:bg-white/10`;
const BTN_OUTLINE_LIGHT = `${BTN} border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white`;

function Kicker({ children, tone = 'light', className = '' }) {
  const color = tone === 'dark' ? 'text-mist' : 'text-brand-blue';
  return <p className={`font-mono text-xs uppercase tracking-[0.2em] ${color} ${className}`}>{children}</p>;
}

function GradientWords({ children }) {
  return <span className="bg-gradient-to-r from-[#FF5A75] to-[#7FB3DC] bg-clip-text text-transparent">{children}</span>;
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

function Header({ scrolled }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    const panel = panelRef.current;
    const focusables = () => panel.querySelectorAll('a[href], button:not([disabled])');
    focusables()[0]?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      buttonRef.current?.focus();
    };
  }, [open]);

  const solid = scrolled || open;
  const tone = solid ? 'text-brand-ink' : 'text-white';
  const link = `rounded-full px-3 py-2 text-[15px] transition-colors ${FOCUS} ${solid ? 'hover:text-brand-blue' : 'hover:text-white/80'}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${tone} ${
        solid ? 'bg-canvas/95 shadow-soft backdrop-blur-md' : 'border-b border-white/10 bg-night/25 backdrop-blur-md'
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-10 lg:px-16 ${scrolled ? 'py-2' : 'py-4'}`}>
        <a href="#top" aria-label="Cambridge Centre of English Modena, torna in alto" className={`rounded-full ${FOCUS}`}>
          <img
            src="/logo.webp" alt="Cambridge Centre of English Modena" width="150" height="150"
            className={`rounded-full bg-white p-0.5 shadow-lg transition-all duration-500 ${scrolled ? 'h-11 w-11' : 'h-14 w-14'}`}
          />
        </a>

        <nav aria-label="Principale" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={link}>{n.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* DA VERIFICARE CON IL CLIENTE: il sito attuale non ha una versione inglese. Selettore solo come stato UI. */}
          <div className="hidden items-center gap-1 font-mono text-xs sm:flex" role="group" aria-label="Lingua">
            <span aria-current="true" className="rounded-full px-2 py-1 font-medium">IT</span>
            <span aria-disabled="true" title="Non ancora disponibile" className="rounded-full px-2 py-1 opacity-60">EN</span>
          </div>
          <a href="#esami" className={`${BTN_PRIMARY} hidden sm:inline-flex`}>Prenota un esame</a>
          <button
            ref={buttonRef} type="button" onClick={() => setOpen((v) => !v)}
            aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${FOCUS}`}
          >
            <Icon as={open ? X : Menu} size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile" ref={panelRef}
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute inset-x-0 top-full h-[calc(100svh-4.5rem)] overflow-y-auto bg-canvas px-5 pb-10 pt-4 text-brand-ink lg:hidden"
          >
            <nav aria-label="Menu mobile" className="flex flex-col">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className={`border-b border-line/30 py-4 font-display text-2xl ${FOCUS}`}>{n.label}</a>
              ))}
            </nav>
            <a href="#esami" onClick={() => setOpen(false)} className={`${BTN_PRIMARY} mt-8 w-full`}>Prenota un esame</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero: viaggio scrub a tre capitoli                                  */
/* ------------------------------------------------------------------ */

function HeroActions({ enabled = true }) {
  const tab = enabled ? 0 : -1;
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <a href="#contatti" tabIndex={tab} className={BTN_PRIMARY}>Richiedi una consulenza <Icon as={ArrowRight} /></a>
      <a href="#esami" tabIndex={tab} className={BTN_OUTLINE_DARK}>Prenota il tuo esame</a>
    </div>
  );
}

const SHADOW = '[text-shadow:0_2px_28px_rgba(11,30,48,0.6)]';

function Headline({ as: Tag = 'h1', children }) {
  return <Tag className={`mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl xl:text-6xl ${SHADOW}`}>{children}</Tag>;
}

function KickerPill({ children }) {
  return (
    <span className="inline-block rounded-full border border-white/15 bg-night/45 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-white backdrop-blur-md">
      {children}
    </span>
  );
}

function ScrubHero({ onFail }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const b1 = useRef(null); const b2 = useRef(null); const b3 = useRef(null);
  const sc1 = useRef(null); const sc2 = useRef(null); const sc3 = useRef(null);
  const cue = useRef(null); const bar = useRef(null);
  const rail = useRef([]);
  const [load, setLoad] = useState(0);
  const [ready, setReady] = useState(false);
  const [settleOn, setSettleOn] = useState(false);
  const st = useRef({ target: 0, cur: 0, run: false, seeking: false, pending: null, dur: 0, raf: 0, settle: false, ready: false });

  const seek = useCallback((t) => {
    const s = st.current; const v = videoRef.current;
    if (!v) return;
    if (s.seeking) { s.pending = t; return; }
    s.seeking = true;
    try { v.currentTime = t; } catch (e) { s.seeking = false; }
  }, []);

  const setBand = (el, o, mid, p, hide = true) => {
    if (!el) return;
    const y = p < mid ? (1 - o) * 24 : -(1 - o) * 24;
    el.style.opacity = String(o);
    el.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`;
    if (hide) el.style.visibility = o < 0.01 ? 'hidden' : 'visible';
  };

  const apply = useCallback((p) => {
    const s = st.current; const v = videoRef.current;
    if (v && s.ready && s.dur) {
      const t = clamp(p / VIDEO_END, 0, 1) * (s.dur - 0.05);
      if (Math.abs(t - v.currentTime) > 0.02) seek(t);
    }
    const o1 = trapezoid(p, BAND_LONDON);
    const o2 = trapezoid(p, BAND_WESTMINSTER);
    const o3 = trapezoid(p, BAND_SETTLE);
    setBand(b1.current, o1, 0.145, p);
    setBand(b2.current, o2, 0.425, p);
    setBand(b3.current, o3, 0.9, p, false);
    if (sc1.current) sc1.current.style.opacity = String(o1 * 0.95);
    if (sc2.current) sc2.current.style.opacity = String(o2 * 0.95);
    if (sc3.current) sc3.current.style.opacity = String(o3 * 0.95);
    if (cue.current) cue.current.style.opacity = String(1 - clamp(p / 0.03, 0, 1));
    if (bar.current) bar.current.style.transform = `scaleY(${clamp(p / VIDEO_END, 0, 1).toFixed(4)})`;
    const active = p < 0.285 ? 0 : p < 0.7 ? 1 : 2;
    rail.current.forEach((el, i) => { if (el) el.style.opacity = i === active ? '1' : '0.45'; });
    const on = p >= 0.8;
    if (on !== s.settle) { s.settle = on; setSettleOn(on); }
  }, [seek]);

  const kick = useCallback(() => {
    const s = st.current;
    if (s.run) return;
    s.run = true;
    const tick = () => {
      s.cur += (s.target - s.cur) * 0.16;
      if (Math.abs(s.target - s.cur) < 0.0005) { s.cur = s.target; s.run = false; }
      apply(s.cur);
      if (s.run) s.raf = requestAnimationFrame(tick);
    };
    s.raf = requestAnimationFrame(tick);
  }, [apply]);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      st.current.target = clamp(-r.top / total, 0, 1);
      kick();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(st.current.raf);
      st.current.run = false;
    };
  }, [kick]);

  // Il video si scarica come Blob (nessun HTTP Range necessario) con anello di avanzamento onesto.
  useEffect(() => {
    const v = videoRef.current;
    const s = st.current;
    const ctrl = new AbortController();
    let objectUrl = null;
    let lastPct = -1;

    const onSeeked = () => {
      s.seeking = false;
      if (s.pending !== null) {
        const t = s.pending; s.pending = null;
        if (Math.abs(t - v.currentTime) > 0.02) seek(t);
      }
    };
    const onError = () => { s.seeking = false; if (!s.ready) onFail(); };
    v.addEventListener('seeked', onSeeked);
    v.addEventListener('error', onError);

    (async () => {
      try {
        const source = VIDEO_SOURCES.find((x) => v.canPlayType(x.probe));
        if (!source) throw new Error('formato video non supportato');
        const res = await fetch(source.src, { signal: ctrl.signal });
        if (!res.ok) throw new Error('video non disponibile');
        let blob;
        if (res.body && res.body.getReader) {
          const total = Number(res.headers.get('content-length')) || source.bytes;
          const reader = res.body.getReader();
          const chunks = []; let got = 0;
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value); got += value.length;
            const pct = Math.floor(Math.min(1, got / total) * 20);
            if (pct !== lastPct) { lastPct = pct; setLoad(pct / 20); }
          }
          blob = new Blob(chunks, { type: source.type });
        } else {
          blob = await res.blob();
        }
        objectUrl = URL.createObjectURL(blob);
        v.addEventListener('loadedmetadata', () => {
          s.dur = v.duration; s.ready = true;
          v.pause();
          setReady(true);
          apply(s.cur);
        }, { once: true });
        v.src = objectUrl;
        v.load();
      } catch (e) {
        if (!ctrl.signal.aborted) onFail();
      }
    })();

    return () => {
      ctrl.abort();
      v.removeEventListener('seeked', onSeeked);
      v.removeEventListener('error', onError);
      v.removeAttribute('src');
      v.load();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      s.ready = false;
    };
  }, [apply, onFail, seek]);

  const railLabels = ['LONDON', 'WESTMINSTER', 'CAMBRIDGE'];

  return (
    <section ref={sectionRef} id="top" aria-label="Il viaggio da Londra a Cambridge" className="relative h-[1000vh] bg-night">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <img src="/hero/london.webp" alt="" width="1920" height="1080" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <video
          ref={videoRef} muted playsInline preload="auto" aria-hidden="true" tabIndex={-1}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Legibilità, livello 1: scrim radiale sempre attivo */}
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(11,30,48,0.5)_100%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night/60 to-transparent" />
        {/* Livello 2: scrim per banda, visibile solo mentre il suo testo è visibile */}
        <div ref={sc1} aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,30,48,0.7)_0%,rgba(11,30,48,0.7)_42%,transparent_80%)]" style={{ opacity: 0.95 }} />
        <div ref={sc2} aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_left,rgba(11,30,48,0.7)_0%,rgba(11,30,48,0.7)_42%,transparent_80%)] opacity-0" />
        <div ref={sc3} aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,30,48,0.7)_0%,rgba(11,30,48,0.7)_42%,transparent_80%)] opacity-0" />

        {/* Capitolo 1 */}
        <div ref={b1} className="absolute inset-y-0 left-0 flex w-full items-center px-5 sm:px-10 md:w-1/2 lg:px-16" style={{ opacity: 1, visibility: 'visible' }}>
          <div className="max-w-xl">
            <KickerPill>{HERO.chapters[0].kicker}</KickerPill>
            <Headline as="p">{HERO.chapters[0].title}</Headline>
          </div>
        </div>
        {/* Capitolo 2 */}
        <div ref={b2} className="absolute inset-y-0 right-0 flex w-full items-center justify-end px-5 opacity-0 sm:px-10 md:w-[55%] md:pr-52 lg:pr-56" style={{ visibility: 'hidden' }}>
          <div className="max-w-xl md:text-right">
            <KickerPill>{HERO.chapters[1].kicker}</KickerPill>
            <Headline as="p">{HERO.chapters[1].title}</Headline>
          </div>
        </div>
        {/* Capitolo 3, fermo finale */}
        <div ref={b3} className="absolute inset-y-0 left-0 flex w-full items-center px-5 opacity-0 sm:px-10 md:w-[55%] lg:px-16" style={{ pointerEvents: settleOn ? 'auto' : 'none' }}>
          <div className="max-w-xl">
            <KickerPill>{HERO.settle.kicker}</KickerPill>
            <Headline>Il tuo inglese, fino a <GradientWords>Cambridge</GradientWords>.</Headline>
            <p className={`mt-5 max-w-[34ch] text-lg leading-relaxed text-white ${SHADOW}`}>{HERO.settle.sub}</p>
            <HeroActions enabled={settleOn} />
          </div>
        </div>

        {/* Guida ai capitoli e indicatore di avanzamento */}
        <div aria-hidden="true" className="pointer-events-none absolute bottom-10 right-5 top-28 hidden w-40 items-stretch justify-end gap-4 md:flex lg:right-10">
          <ul className={`flex flex-col justify-between py-1 text-right font-mono text-[11px] uppercase tracking-[0.2em] text-white ${SHADOW}`}>
            {railLabels.map((l, i) => (
              <li key={l} ref={(el) => { rail.current[i] = el; }} className="opacity-45 transition-opacity duration-500">{l}</li>
            ))}
          </ul>
          <div className="relative w-px bg-white/25">
            <div ref={bar} className="absolute inset-0 origin-top bg-brand-red" style={{ transform: 'scaleY(0)' }} />
          </div>
        </div>

        <div ref={cue} aria-hidden="true" className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white">
          Scorri
          <Breathe period={3}><Icon as={ChevronDown} size={20} /></Breathe>
        </div>

        {!ready && (
          <div role="progressbar" aria-label="Caricamento del viaggio" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(load * 100)} className="absolute bottom-6 right-5 flex items-center gap-3 rounded-full border border-white/15 bg-night/55 py-2 pl-2 pr-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur-md sm:right-10">
            <svg viewBox="0 0 44 44" className="h-8 w-8 -rotate-90" aria-hidden="true">
              <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
              <circle cx="22" cy="22" r="18" fill="none" stroke="#E4002B" strokeWidth="3" strokeLinecap="round" strokeDasharray="113" strokeDashoffset={113 * (1 - load)} />
            </svg>
            Carico il viaggio
          </div>
        )}
      </div>
    </section>
  );
}

/** Hero statica: poster composto e i tre capitoli in sequenza. Nessun video viene richiesto. */
function StaticHero() {
  return (
    <section id="top" aria-label="Cambridge Centre of English Modena" className="bg-night text-white">
      <div className="relative flex min-h-[100svh] items-end overflow-hidden">
        <picture>
          <source media="(min-width: 721px)" srcSet="/hero/cambridge.webp" />
          <img src="/hero/cambridge-sm.webp" alt="" width="960" height="540" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[65%_50%]" />
        </picture>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/10" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-night/70 to-transparent" />
        <div className="relative w-full px-5 pb-14 pt-32 sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            <KickerPill>{HERO.settle.kicker}</KickerPill>
            <Headline>Il tuo inglese, fino a <GradientWords>Cambridge</GradientWords>.</Headline>
            <p className={`mt-5 max-w-[38ch] text-lg leading-relaxed ${SHADOW}`}>{HERO.settle.sub}</p>
            <HeroActions />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-10 lg:px-16">
        <Kicker tone="dark">Il viaggio</Kicker>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {[...HERO.chapters, { id: 'cambridge', kicker: HERO.settle.kicker, title: 'Un esame Cambridge al termine del percorso.', img: 'cambridge' }].map((c) => (
            <li key={c.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <img src={`/hero/${c.img}-sm.webp`} alt="" width="960" height="540" loading="lazy" className="aspect-[16/9] w-full object-cover" />
              <div className="p-5">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-mist">{c.kicker}</p>
                <p className="mt-2 font-display text-xl leading-snug">{c.title}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Vetrina servizi: bento asimmetrico                                  */
/* ------------------------------------------------------------------ */

function TileFrame() {
  const draw = 'fill-none [stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-[900ms] ease-out group-hover:[stroke-dashoffset:0] group-focus-within:[stroke-dashoffset:0]';
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
      <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="16" pathLength="1" stroke="#E4002B" strokeWidth="2" className={draw} />
      <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="16" pathLength="1" stroke="#036AAC" strokeWidth="2" className={`${draw} [transform:scale(-1,-1)] [transform-origin:center]`} />
    </svg>
  );
}

function ServiceTile({ s, className, wide = false, onPickProfile, delay }) {
  const content = (
    <>
      <div className={`overflow-hidden ${wide ? 'md:w-5/12' : 'h-44 sm:h-56 lg:h-auto lg:flex-1'}`}>
        <img
          src={s.img} alt="" width="1200" height="800" loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06] ${s.id === 'corsi' ? 'object-[40%_60%]' : ''}`}
        />
      </div>
      <div className={`flex flex-col p-6 sm:p-8 ${wide ? 'md:w-7/12 md:justify-center' : ''}`}>
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-blue">{s.tag}</p>
          <Icon as={s.icon} size={28} className="shrink-0 text-brand-blue" />
        </div>
        <h3 className="mt-4 font-display text-2xl leading-tight sm:text-3xl">{s.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.text}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          {s.profile ? (
            <button type="button" onClick={() => onPickProfile(s.profile)} className={`inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-brand-blue ${FOCUS}`}>
              {s.cta} <Icon as={ArrowRight} size={16} />
            </button>
          ) : (
            <a href={s.href} {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-brand-blue ${FOCUS}`}>
              {s.cta} <Icon as={s.href.startsWith('http') ? ArrowUpRight : ArrowRight} size={16} />
            </a>
          )}
          {s.extra && (
            <a href={s.extra.href} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-[44px] items-center gap-2 text-[15px] text-muted underline decoration-line/40 underline-offset-4 hover:text-brand-ink ${FOCUS}`}>
              {s.extra.label}
            </a>
          )}
        </div>
      </div>
    </>
  );
  return (
    <Reveal variant="up" delay={delay} className={`group relative flex overflow-hidden rounded-2xl bg-white shadow-soft ${wide ? 'flex-col md:flex-row' : 'flex-col'} ${className}`}>
      {content}
      <TileFrame />
    </Reveal>
  );
}

function Servizi({ onPickProfile }) {
  return (
    <section id="corsi" className="relative z-10 scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Kicker>I percorsi</Kicker>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.16] tracking-tight sm:text-5xl">Non sai da dove iniziare?</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-[44ch] text-lg leading-relaxed text-muted">Quattro percorsi, un unico centro. Scegli il tuo punto di partenza e ti diciamo come proseguire.</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          <ServiceTile s={SERVICES[0]} className="lg:col-span-7 lg:row-span-2" onPickProfile={onPickProfile} delay={0} />
          <ServiceTile s={SERVICES[1]} className="lg:col-span-5" onPickProfile={onPickProfile} delay={0.1} />
          <ServiceTile s={SERVICES[2]} className="lg:col-span-5" onPickProfile={onPickProfile} delay={0.2} />
          <ServiceTile s={SERVICES[3]} wide className="lg:col-span-12" onPickProfile={onPickProfile} delay={0.1} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Esami Cambridge: selettore di livello                               */
/* ------------------------------------------------------------------ */

function Esami({ onRequestDates }) {
  const [active, setActive] = useState(3);
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const draw = useDraw(sectionRef);
  const tabRefs = useRef([]);
  const exam = EXAMS[active];

  const onKey = (e) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = (active + keys[e.key] + EXAMS.length) % EXAMS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="esami" ref={sectionRef} className="relative z-10 scroll-mt-20 overflow-hidden bg-night py-24 text-white sm:py-32">
      <SignatureMark progress={draw} inkClass="text-white/20" className="pointer-events-none absolute -right-24 -top-16 h-[36rem] w-[36rem] sm:-right-10" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
        <Reveal variant="left">
          <Kicker tone="dark">Esami Cambridge</Kicker>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.16] tracking-tight sm:text-5xl">
            Scegli il livello, vedi il <GradientWords>percorso</GradientWords>.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <Reveal variant="left" delay={0.1} className="min-w-0 lg:col-span-4">
            <div role="tablist" aria-label="Livelli degli esami Cambridge" aria-orientation="vertical" onKeyDown={onKey} className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {EXAMS.map((e, i) => (
                <button
                  key={e.id} ref={(el) => { tabRefs.current[i] = el; }} role="tab" type="button"
                  id={`tab-${e.id}`} aria-selected={i === active} aria-controls="panel-esame" tabIndex={i === active ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`flex min-h-[56px] shrink-0 items-center gap-4 rounded-2xl border px-5 py-3 text-left transition-colors duration-300 ${FOCUS} ${
                    i === active ? 'border-white bg-white text-brand-ink' : 'border-white/30 text-white hover:border-white/70'
                  }`}
                >
                  <span className={`font-display text-xl font-bold ${i === active ? 'text-brand-red' : 'text-white'}`}>{e.code}</span>
                  <span className="text-[15px]">{e.name}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal variant="right" delay={0.2} className="min-w-0 lg:col-span-8">
            <div id="panel-esame" role="tabpanel" aria-labelledby={`tab-${exam.id}`} tabIndex={0} className={`rounded-2xl border border-white/15 bg-white/[0.04] p-6 sm:p-10 ${FOCUS}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={exam.id}
                  initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-mist">{exam.group}</p>
                  <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                    <span aria-hidden="true" className="font-display text-7xl font-bold leading-none text-brand-red sm:text-8xl">{exam.code}</span>
                    <h3 className="font-display text-2xl leading-tight sm:text-3xl">{exam.name}</h3>
                  </div>
                  <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                    {[['A chi è adatto', exam.who], ['Come ti prepari', exam.prep], ['Come si svolge', exam.format], ['Risultati e certificato', 'Risultati Digital in circa 10 giorni lavorativi. Certificato cartaceo al centro entro 1 mese.']].map(([dt, dd]) => (
                      <div key={dt}>
                        <dt className="font-mono text-xs uppercase tracking-[0.2em] text-mist">{dt}</dt>
                        <dd className="mt-2 text-[15px] leading-relaxed text-white">{dd}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <a href={LINKS.registrazione} target="_blank" rel="noopener noreferrer" className={BTN_PRIMARY}>Prenota questa sessione <Icon as={ArrowUpRight} /></a>
                    <button type="button" onClick={() => onRequestDates(exam.name)} className={BTN_OUTLINE_DARK}>Richiedi date e quote</button>
                  </div>
                  <p className="mt-4 text-sm text-mist">L’iscrizione passa dal sito di registrazione del centro: ti registri, scegli la sessione e compili il modulo con i dati per il pagamento.</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Chi siamo, numeri, scuole e aziende                                 */
/* ------------------------------------------------------------------ */

function Numeri() {
  const ref = useRef(null);
  const draw = useDraw(ref);
  const reduce = useReducedMotion();
  return (
    <div ref={ref} className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((n, i) => (
        <Reveal key={n.label} variant="scale" delay={i * 0.08}>
          <p className="font-display text-6xl font-bold leading-none tracking-tight text-brand-ink sm:text-7xl">{n.value}</p>
          <svg viewBox="0 0 100 6" className="mt-4 h-1.5 w-full" preserveAspectRatio="none" aria-hidden="true">
            <motion.path d="M0 3 H100" stroke={i % 2 ? '#036AAC' : '#E4002B'} strokeWidth="2" fill="none" style={{ pathLength: reduce ? 1 : draw }} />
          </svg>
          <p className="mt-3 text-[15px] leading-snug text-muted">{n.label}</p>
        </Reveal>
      ))}
    </div>
  );
}

function ChiSiamo() {
  return (
    <section id="chi-siamo" className="relative z-10 scroll-mt-24 pb-8 pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
        <Reveal variant="fade">
          <Kicker>Chi siamo</Kicker>
        </Reveal>
        <div className="mt-6 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h2 className="font-display text-4xl font-bold leading-[1.16] tracking-tight sm:text-5xl">Scegliere di studiare inglese è una decisione importante. Prendila con noi.</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            {/* DA VERIFICARE CON IL CLIENTE: "oltre 60 anni" e "unico centro esami autorizzato" sono parole del sito attuale. */}
            <p className="text-lg leading-relaxed text-muted">
              Noi di Cambridge Centre of English, con oltre 60 anni di esperienza, aiutiamo i nostri studenti a individuare il corso più indicato sulla base delle singole esigenze e degli obiettivi prefissati.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Siamo il punto di riferimento per le scuole del territorio in quanto unico centro esami autorizzato Cambridge Assessment English.
            </p>
          </Reveal>
        </div>
        <div className="mt-16">
          <Numeri />
        </div>
      </div>
    </section>
  );
}

function Scuole({ onPickProfile }) {
  const points = [
    'Iscrizione in blocco a nome della scuola, per scuole statali e paritarie.',
    'Un tutorial dedicato alle scuole per iscrivere gli studenti passo dopo passo.',
    'Esami in versione Digital, in presenza nel nostro laboratorio informatico.',
    'Calendario separato per ogni esame, dagli Young Learners al livello C2.',
  ];
  return (
    <section id="scuole" className="relative z-10 scroll-mt-24 py-20 sm:py-28">
      {/* DA VERIFICARE CON IL CLIENTE: PCTO e formazione docenti non compaiono sul sito attuale, quindi non sono in pagina. */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-10 lg:grid-cols-12 lg:px-16">
        <Reveal variant="left" className="lg:col-span-5">
          <Kicker>Per le scuole</Kicker>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.16] tracking-tight sm:text-5xl">Gli esami dei tuoi studenti, in un’unica iscrizione.</h2>
          <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-muted">Il coordinamento esami segue le scuole statali e paritarie dall’iscrizione alla sessione.</p>
          <button type="button" onClick={() => onPickProfile('scuola')} className={`${BTN_OUTLINE_LIGHT} mt-8`}>Scrivi al coordinamento esami <Icon as={ArrowRight} /></button>
        </Reveal>
        <Reveal variant="right" delay={0.1} className="lg:col-span-7">
          <ul className="divide-y divide-line/30 rounded-2xl border border-line/40 bg-white/70 backdrop-blur-sm">
            {points.map((p, i) => (
              <li key={p} className="flex items-start gap-5 p-6">
                <span aria-hidden="true" className="font-mono text-sm text-brand-red">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-[17px] leading-relaxed">{p}</p>
              </li>
            ))}
          </ul>
          {SHOW_CLIENT_NAMES && (
            <p className="mt-6 text-[15px] text-muted">Hanno già scelto il centro: {CLIENT_SCHOOLS.join(', ')}.</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Aziende({ onPickProfile }) {
  return (
    <section id="aziende" className="relative z-10 scroll-mt-24 bg-white/60 py-20 backdrop-blur-sm sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Kicker>Per le aziende</Kicker>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.16] tracking-tight sm:text-5xl">Business English per i team di Modena e provincia.</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-muted">Un colloquio approfondito sul vostro settore, poi un corso progettato sulle trattative, sulle email commerciali e sulla gestione dei clienti.</p>
          </Reveal>
        </div>

        <ol className="mt-12 border-t border-line/40">
          {BUSINESS_COURSES.map(([name, text], i) => (
            <Reveal as="li" key={name} variant="right" delay={i * 0.08} className="grid gap-2 border-b border-line/40 py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6">
              <p className="font-display text-2xl sm:col-span-5">{name}</p>
              <p className="text-[16px] leading-relaxed text-muted sm:col-span-7">{text}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[56ch] text-[15px] leading-relaxed text-muted">In ogni corso: docenti madrelingua o bilingue, materiali didattici inclusi, report di progresso. Individuale o in piccoli gruppi, in presenza o online.</p>
          <button type="button" onClick={() => onPickProfile('azienda')} className={BTN_PRIMARY}>Richiedi un preventivo gratuito <Icon as={ArrowRight} /></button>
        </div>
        {SHOW_CLIENT_NAMES && <p className="mt-6 text-[15px] text-muted">Hanno già scelto il centro: {CLIENT_COMPANIES.join(', ')}.</p>}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Modulo di contatto                                                  */
/* ------------------------------------------------------------------ */

const PROFILES = [
  { id: 'scuola', label: 'Scuola', icon: GraduationCap },
  { id: 'azienda', label: 'Azienda', icon: Building2 },
  { id: 'privato', label: 'Privato', icon: User },
];

const LEVELS = ['Non lo so ancora', 'A2 Elementary', 'B1 Lower-Intermediate', 'B2 Upper-Intermediate', 'C1 Advanced', 'C2 Proficiency'];
const EMPTY = { nome: '', email: '', telefono: '', messaggio: '', istituto: '', ruolo: '', azienda: '', persone: '', livello: '', esame: '', consenso: false };

function validate(v, profile) {
  const e = {};
  if (!v.nome.trim()) e.nome = 'Scrivi il tuo nome.';
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = 'Controlla l’indirizzo email.';
  if (profile === 'scuola' && !v.istituto.trim()) e.istituto = 'Indica il nome dell’istituto.';
  if (profile === 'azienda' && !v.azienda.trim()) e.azienda = 'Indica il nome dell’azienda.';
  if (!v.consenso) e.consenso = 'Il consenso alla privacy è necessario per inviare la richiesta.';
  return e;
}

function buildMailto(v, profile) {
  const lines = [`Profilo: ${PROFILES.find((p) => p.id === profile).label}`, `Nome: ${v.nome}`, `Email: ${v.email}`];
  if (v.telefono) lines.push(`Telefono: ${v.telefono}`);
  if (profile === 'scuola') { lines.push(`Istituto: ${v.istituto}`); if (v.ruolo) lines.push(`Ruolo: ${v.ruolo}`); }
  if (profile === 'azienda') { lines.push(`Azienda: ${v.azienda}`); if (v.persone) lines.push(`Persone da formare: ${v.persone}`); }
  if (profile === 'privato') { if (v.livello) lines.push(`Livello attuale: ${v.livello}`); if (v.esame) lines.push(`Esame di interesse: ${v.esame}`); }
  if (v.messaggio) lines.push('', v.messaggio);
  lines.push('', 'Ho letto la privacy policy e acconsento al trattamento dei dati per essere ricontattato.');
  const to = profile === 'privato' && v.esame ? CONTACT.esami : CONTACT.info;
  const subject = `Richiesta dal sito: ${PROFILES.find((p) => p.id === profile).label}`;
  return { href: `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`, to };
}

const INPUT = `w-full rounded-xl border border-line bg-white px-4 py-3 text-[16px] text-brand-ink placeholder:text-muted/70 ${FOCUS}`;

function Field({ id, label, error, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-[14px] font-medium">
        {label}
        {optional && <span className="font-mono text-[11px] font-normal uppercase tracking-[0.15em] text-muted">Facoltativo</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-[14px] font-medium text-[#B00020]">{error}</p>}
    </div>
  );
}

function Contatti({ prefill }) {
  const [profile, setProfile] = useState('privato');
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [sent, setSent] = useState(null);

  useEffect(() => {
    if (!prefill.nonce) return;
    setProfile(prefill.profile);
    setV((old) => ({ ...old, esame: prefill.exam || old.esame }));
    setStatus('idle');
  }, [prefill]);

  const set = (k) => (e) => setV((old) => ({ ...old, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const err = (k) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `${k}-err` } : {});

  const onSubmit = (ev) => {
    ev.preventDefault();
    const found = validate(v, profile);
    setErrors(found);
    if (Object.keys(found).length) { setStatus('error'); return; }
    setStatus('sending');
    const mail = buildMailto(v, profile);
    setSent(mail);
    window.setTimeout(() => {
      window.location.href = mail.href;
      setStatus('success');
    }, 350);
  };

  const steps = [
    'Premi Invia nel tuo programma di posta: il messaggio è già scritto.',
    'La segreteria didattica prende in carico la tua richiesta.',
    'Ti contattiamo per proseguire, con un colloquio o un test di livello.',
  ];

  return (
    <section id="contatti" className="relative z-10 scroll-mt-24 py-24 sm:py-32">
      {/* DA VERIFICARE CON IL CLIENTE: destinazione del modulo (ora mailto), tempi di risposta e processo dopo l'invio. */}
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-10 lg:grid-cols-12 lg:px-16">
        <Reveal className="lg:col-span-5">
          <Kicker>Contatti</Kicker>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.16] tracking-tight sm:text-5xl">Raccontaci cosa ti serve.</h2>
          <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-muted">Scuola, azienda o privato: compila il modulo e ti rispondiamo con il percorso più adatto.</p>

          <ol className="mt-10 space-y-5">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4">
                {i === 0 ? (
                  <Breathe className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red font-mono text-sm text-white">1</Breathe>
                ) : (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line font-mono text-sm">{i + 1}</span>
                )}
                <p className="pt-1 text-[16px] leading-relaxed">{s}</p>
              </li>
            ))}
          </ol>

          <address className="mt-12 space-y-3 not-italic text-[16px]">
            <a href={CONTACT.telHref} className={`flex min-h-[44px] items-center gap-3 ${FOCUS}`}><Icon as={Phone} size={20} className="text-brand-blue" />{CONTACT.tel}</a>
            <a href={CONTACT.mobileHref} className={`flex min-h-[44px] items-center gap-3 ${FOCUS}`}><Icon as={Phone} size={20} className="text-brand-blue" />{CONTACT.mobile}</a>
            <a href={`mailto:${CONTACT.info}`} className={`flex min-h-[44px] items-center gap-3 ${FOCUS}`}><Icon as={Mail} size={20} className="text-brand-blue" />{CONTACT.info}</a>
            <a href={CONTACT.map} target="_blank" rel="noopener noreferrer" className={`flex min-h-[44px] items-center gap-3 ${FOCUS}`}><Icon as={MapPin} size={20} className="text-brand-blue" />{CONTACT.address}</a>
          </address>
          <p className="mt-6 text-[15px] text-muted">Non conosci il tuo livello? <a href={LINKS.test} target="_blank" rel="noopener noreferrer" className="text-brand-blue underline underline-offset-4">Fai il test online</a>.</p>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-7">
          <form onSubmit={onSubmit} noValidate className="rounded-2xl bg-white p-6 shadow-soft sm:p-10">
            <fieldset>
              <legend className="mb-3 text-[14px] font-medium">Sono una</legend>
              <div role="radiogroup" aria-label="Sono una" className="grid grid-cols-3 gap-2">
                {PROFILES.map((p) => (
                  <button
                    key={p.id} type="button" role="radio" aria-checked={profile === p.id} onClick={() => { setProfile(p.id); setErrors({}); setStatus('idle'); }}
                    className={`flex min-h-[48px] items-center justify-center gap-2 rounded-xl border px-3 py-3 text-[15px] transition-colors ${FOCUS} ${profile === p.id ? 'border-brand-blue bg-brand-blue text-white' : 'border-line text-brand-ink hover:border-brand-blue'}`}
                  >
                    <Icon as={p.icon} size={20} />{p.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field id="nome" label="Nome e cognome" error={errors.nome}><input id="nome" autoComplete="name" value={v.nome} onChange={set('nome')} className={INPUT} {...err('nome')} /></Field>
              <Field id="email" label="Email" error={errors.email}><input id="email" type="email" autoComplete="email" value={v.email} onChange={set('email')} className={INPUT} {...err('email')} /></Field>
              <Field id="telefono" label="Telefono" optional><input id="telefono" type="tel" autoComplete="tel" value={v.telefono} onChange={set('telefono')} className={INPUT} /></Field>

              {profile === 'scuola' && (
                <>
                  <Field id="istituto" label="Istituto" error={errors.istituto}><input id="istituto" value={v.istituto} onChange={set('istituto')} className={INPUT} {...err('istituto')} /></Field>
                  <Field id="ruolo" label="Il tuo ruolo" optional><input id="ruolo" value={v.ruolo} onChange={set('ruolo')} className={INPUT} /></Field>
                </>
              )}
              {profile === 'azienda' && (
                <>
                  <Field id="azienda" label="Azienda" error={errors.azienda}><input id="azienda" autoComplete="organization" value={v.azienda} onChange={set('azienda')} className={INPUT} {...err('azienda')} /></Field>
                  <Field id="persone" label="Persone da formare" optional><input id="persone" inputMode="numeric" value={v.persone} onChange={set('persone')} className={INPUT} /></Field>
                </>
              )}
              {profile === 'privato' && (
                <>
                  <Field id="livello" label="Livello attuale" optional>
                    <select id="livello" value={v.livello} onChange={set('livello')} className={INPUT}>
                      <option value="">Seleziona</option>
                      {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </Field>
                  <Field id="esame" label="Esame di interesse" optional>
                    <select id="esame" value={v.esame} onChange={set('esame')} className={INPUT}>
                      <option value="">Nessuno, cerco un corso</option>
                      {EXAMS.map((x) => <option key={x.id} value={x.name}>{x.name}</option>)}
                    </select>
                  </Field>
                </>
              )}
            </div>

            <div className="mt-5">
              <Field id="messaggio" label="Messaggio" optional><textarea id="messaggio" rows={4} value={v.messaggio} onChange={set('messaggio')} className={INPUT} /></Field>
            </div>

            <div className="mt-6">
              <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-[15px] leading-snug">
                <input type="checkbox" checked={v.consenso} onChange={set('consenso')} className="mt-0.5 h-5 w-5 shrink-0 accent-brand-blue" {...err('consenso')} />
                <span>Ho letto la <a href={LINKS.privacy} target="_blank" rel="noopener noreferrer" className="text-brand-blue underline underline-offset-4">privacy policy</a> e acconsento al trattamento dei miei dati per essere ricontattato.</span>
              </label>
              {errors.consenso && <p id="consenso-err" className="mt-1.5 text-[14px] font-medium text-[#B00020]">{errors.consenso}</p>}
            </div>

            <button type="submit" disabled={status === 'sending'} className={`${BTN_PRIMARY} mt-8 w-full disabled:opacity-70 sm:w-auto`}>
              {status === 'sending' ? 'Preparo il messaggio' : 'Apri la mail con la richiesta'} <Icon as={ArrowRight} />
            </button>

            <div aria-live="polite" role="status" className="mt-5 text-[15px]">
              {status === 'error' && <p className="font-medium text-[#B00020]">Controlla i campi segnalati: {Object.keys(errors).length === 1 ? 'manca 1 dato' : `mancano ${Object.keys(errors).length} dati`}.</p>}
              {status === 'success' && sent && (
                <div className="rounded-xl border border-brand-blue/40 bg-[#EAF3FA] p-4">
                  <p className="flex items-center gap-2 font-medium"><Icon as={Check} size={20} className="text-brand-blue" />Il messaggio è pronto nel tuo programma di posta.</p>
                  <p className="mt-2 leading-relaxed text-muted">Questo modulo non invia nulla da solo: premi Invia nel programma che si è aperto, verso {sent.to}. Se non si è aperto, <a href={sent.href} className="text-brand-blue underline underline-offset-4">riaprilo da qui</a> oppure chiama lo {CONTACT.tel}.</p>
                </div>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  const social = [
    { label: 'Facebook', href: LINKS.facebook, icon: Facebook },
    { label: 'Instagram', href: LINKS.instagram, icon: Instagram },
    { label: 'TikTok', href: LINKS.tiktok, icon: Video },
  ];
  return (
    <Reveal as="footer" variant="fade" className="relative z-10 bg-night text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-10 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-5">
          <img src="/logo.webp" alt="Cambridge Centre of English Modena" width="150" height="150" loading="lazy" className="h-16 w-16 rounded-full bg-white p-0.5" />
          <p className="mt-6 max-w-[36ch] font-display text-2xl leading-snug">Scuola di inglese a Modena dal 1964.</p>
          <div className="mt-6 flex gap-2">
            {social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 hover:border-white ${FOCUS}`}>
                <Icon as={s.icon} />
              </a>
            ))}
          </div>
        </div>
        <nav aria-label="Link rapidi" className="lg:col-span-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mist">Link rapidi</p>
          <ul className="mt-4 space-y-1">
            {[...NAV, { href: LINKS.privacy, label: 'Privacy policy' }].map((n) => (
              <li key={n.label}><a href={n.href} {...(n.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`inline-flex min-h-[44px] min-w-[44px] items-center text-[15px] hover:underline ${FOCUS}`}>{n.label}</a></li>
            ))}
            {/* DA VERIFICARE CON IL CLIENTE: il sito attuale non ha una pagina di cookie policy, quindi non c'è il link. */}
          </ul>
        </nav>
        <address className="space-y-1 not-italic text-[15px] lg:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mist">Sede e contatti</p>
          <p className="mt-4">{CONTACT.address}</p>
          <p><a href={CONTACT.telHref} className="hover:underline">{CONTACT.tel}</a> · <a href={CONTACT.mobileHref} className="hover:underline">{CONTACT.mobile}</a></p>
          <p>Segreteria didattica: <a href={`mailto:${CONTACT.info}`} className="hover:underline">{CONTACT.info}</a></p>
          <p>Coordinamento esami: <a href={`mailto:${CONTACT.esami}`} className="hover:underline">{CONTACT.esami}</a></p>
          <p><a href={LINKS.recensione} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Lasciaci una recensione</a></p>
        </address>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl space-y-2 px-5 py-6 text-[13px] leading-relaxed text-mist sm:px-10 lg:px-16">
          <p>Cambridge Centre of English Modena di Norris Elizabeth Kate e C. s.a.s. · C.F./P.IVA 00770620367 · Codice destinatario USAL8PV · PEC cambridgecentre@sicurezzapostale.it</p>
          {/* DA VERIFICARE CON IL CLIENTE: formula esatta della nota di non affiliazione. */}
          <p>Cambridge Centre of English è una scuola di Modena e non fa parte dell’Università di Cambridge.</p>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Pagina                                                              */
/* ------------------------------------------------------------------ */

export default function CambridgeHomepage() {
  const staticMode = useStaticHero();
  const [heroFailed, setHeroFailed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prefill, setPrefill] = useState({ profile: 'privato', exam: '', nonce: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goContact = useCallback((profile, exam = '') => {
    setPrefill((p) => ({ profile, exam, nonce: p.nonce + 1 }));
    document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);
  const onFail = useCallback(() => setHeroFailed(true), []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-canvas font-sans text-brand-ink antialiased">
      <PageBackground />
      <a href="#main" className="sr-only z-[60] rounded-full bg-white px-5 py-3 text-brand-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Vai al contenuto</a>
      <Header scrolled={scrolled} />
      <main id="main" className="relative">
        {staticMode || heroFailed ? <StaticHero /> : <ScrubHero onFail={onFail} />}
        <Servizi onPickProfile={(p) => goContact(p)} />
        <Divider />
        <Esami onRequestDates={(name) => goContact('privato', name)} />
        <ChiSiamo />
        <Scuole onPickProfile={(p) => goContact(p)} />
        <Aziende onPickProfile={(p) => goContact(p)} />
        <Divider />
        <Contatti prefill={prefill} />
      </main>
      <Footer />
    </div>
  );
}
