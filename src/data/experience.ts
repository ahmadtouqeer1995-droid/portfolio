import { useLang, type Lang } from '@/i18n';

// Work history and education, mirroring resume/cv-en.html. Roles still held
// (null `end`) sort above finished ones, newest start first within each group,
// so moving an entry is a date change and nothing else. Dates are 'YYYY-MM'
// (or 'YYYY').
// Months stay numeric so periods read the same in all five site languages;
// titles and descriptions are translated.

export type ExperienceEntry = {
  id: string;
  org: string;
  location: string;
  period: string;
  kind: 'work' | 'education';
  title: string;
  description: string;
};

// ---- Facts (language-independent) ----
type Entry = {
  id: string;
  org: string;
  location: string;
  start: string;
  end: string | null;
  kind: 'work' | 'education';
};

const ENTRIES: Entry[] = [
  { id: 'freelance', org: 'Freelance | Self-Employed', location: 'Paris, France · Remote', start: '2023-11', end: null, kind: 'work' },
  { id: 'sopra', org: 'Sopra Steria', location: 'Toulouse, France', start: '2026-08', end: null, kind: 'work' },
  { id: 'khome', org: 'KHOME', location: 'Paris, France', start: '2026-01', end: '2026-07', kind: 'work' },
  { id: 'havas', org: 'Havas Group', location: 'Paris, France', start: '2025-02', end: '2025-11', kind: 'work' },
  { id: 'allianz', org: 'Allianz France', location: 'Paris, France', start: '2024-01', end: '2025-01', kind: 'work' },
  { id: 'decode', org: '.decode', location: 'Paris, France', start: '2021-10', end: '2023-07', kind: 'education' },
  { id: 'parisCite', org: 'Université Paris Cité', location: 'Paris, France', start: '2014', end: '2018', kind: 'education' },
];

/** A bare 'YYYY' sorts as January of that year. */
const sortKey = (period: string) => (period.length === 4 ? `${period}-01` : period);

/** '2026-08' -> '08/2026'; a bare '2014' stays '2014'. */
const formatPart = (period: string) =>
  period.length === 4 ? period : `${period.slice(5)}/${period.slice(0, 4)}`;

// ---- Localized copy ----
type Copy = {
  /** Shown in place of an end date for the role currently held. */
  present: string;
  titles: Record<string, string>;
  descriptions: Record<string, string>;
};

const COPY: Record<Lang, Copy> = {
  en: {
    present: 'Present',
    titles: {
      khome: 'Senior Data Scientist (Freelance)',
      havas: 'AI & Automation Engineer',
      allianz: 'Data, Automation & Artificial Intelligence',
      decode: 'No Code, Automation & AI',
      freelance: 'Generative AI Engineer',
      sopra: 'AI Engineer',
      parisCite: 'MSc Machine Learning for Data Science',
    },
    descriptions: {
      freelance:
        'Generative AI systems delivered for my own clients: AI agents, multi-agent workflows and RAG pipelines over business documents, business automation with n8n, Make, Zapier and Power Automate, and SaaS products and AI-powered websites on React, Next.js, FastAPI and PostgreSQL.',
      khome:
        'RAG pipelines over property and regulatory documents, plus LLM and retrieval features inside digital products — structured prompting, function calling and agent orchestration with LangGraph and CrewAI.',
      havas:
        'Generative AI and agentic solutions taken into production: agents that interact with enterprise applications, document repositories and APIs, wired into the information systems already in place.',
      allianz:
        'Automation, generative AI and agentic prototypes to simplify business processes — specialised agents, business assistants and orchestrated workflows across several data sources, with the efficiency gains actually measured.',
      decode:
        'n8n, Make, autonomous agents, multi-agent orchestration, RAG engineering, Supabase, Xano, APIs and webhooks.',
      sopra:
        'Prototyped retrieval and agent architectures connecting models to knowledge sources and executable tools, integrated AI into web and mobile applications, and evaluated how reliable those prototypes really were.',
      parisCite: 'Python, deep learning, NLP, generative AI, data engineering and cloud.',
    },
  },
  fr: {
    present: 'Aujourd’hui',
    titles: {
      khome: 'Data Scientist Senior (Freelance)',
      havas: 'Ingénieur IA & Automatisation',
      allianz: 'Data, Automatisation et Intelligence Artificielle',
      decode: 'No Code, Automatisation & IA',
      freelance: 'Ingénieur en IA générative',
      sopra: 'Ingénieur Intelligence Artificielle',
      parisCite: 'Master Machine Learning pour la Science des Données',
    },
    descriptions: {
      freelance:
        "Des systèmes d'IA générative livrés pour mes propres clients : agents IA, workflows multi-agents et pipelines RAG sur des documents métier, automatisation avec n8n, Make, Zapier et Power Automate, et des produits SaaS et sites web propulsés par IA sur React, Next.js, FastAPI et PostgreSQL.",
      khome:
        "Pipelines RAG sur des documents immobiliers et réglementaires, et intégration de capacités LLM et de recherche dans des produits digitaux — prompting structuré, function calling et orchestration d'agents avec LangGraph et CrewAI.",
      havas:
        "Solutions d'IA générative et agentiques mises en production : des agents qui dialoguent avec les applications métier, les bases documentaires et les API, branchés sur les systèmes d'information existants.",
      allianz:
        "Prototypes d'automatisation, d'IA générative et d'IA agentique pour simplifier les processus métier — agents spécialisés, assistants métier et workflows orchestrés reliant plusieurs sources de données, avec des gains d'efficacité réellement mesurés.",
      decode:
        "n8n, Make, agents autonomes, orchestration multi-agents, ingénierie RAG, Supabase, Xano, API et webhooks.",
      sopra:
        "Prototypage d'architectures de recherche et d'agents reliant les modèles à des bases de connaissances et à des outils exécutables, intégration de l'IA dans des applications web et mobiles, et évaluation de la fiabilité réelle de ces prototypes.",
      parisCite: 'Python, deep learning, NLP, IA générative, data engineering et cloud.',
    },
  },
  es: {
    present: 'Actualidad',
    titles: {
      khome: 'Data Scientist Senior (Freelance)',
      havas: 'Ingeniero de IA y Automatización',
      allianz: 'Datos, Automatización e Inteligencia Artificial',
      decode: 'No Code, Automatización e IA',
      freelance: 'Ingeniero de IA generativa',
      sopra: 'Ingeniero de Inteligencia Artificial',
      parisCite: 'Máster en Machine Learning para Ciencia de Datos',
    },
    descriptions: {
      freelance:
        'Sistemas de IA generativa entregados para mis propios clientes: agentes de IA, flujos multiagente y pipelines RAG sobre documentos de negocio, automatización con n8n, Make, Zapier y Power Automate, y productos SaaS y webs potenciadas con IA sobre React, Next.js, FastAPI y PostgreSQL.',
      khome:
        'Pipelines RAG sobre documentos inmobiliarios y regulatorios, además de funciones de LLM y recuperación dentro de productos digitales: prompting estructurado, function calling y orquestación de agentes con LangGraph y CrewAI.',
      havas:
        'Soluciones de IA generativa y agénticas llevadas a producción: agentes que interactúan con aplicaciones corporativas, repositorios documentales y APIs, conectados a los sistemas de información ya existentes.',
      allianz:
        'Prototipos de automatización, IA generativa e IA agéntica para simplificar procesos de negocio: agentes especializados, asistentes de negocio y flujos orquestados entre varias fuentes de datos, con las mejoras de eficiencia realmente medidas.',
      decode:
        'n8n, Make, agentes autónomos, orquestación multiagente, ingeniería RAG, Supabase, Xano, APIs y webhooks.',
      sopra:
        'Prototipos de arquitecturas de recuperación y de agentes que conectan modelos con fuentes de conocimiento y herramientas ejecutables, integración de IA en aplicaciones web y móviles, y evaluación de la fiabilidad real de esos prototipos.',
      parisCite: 'Python, deep learning, NLP, IA generativa, data engineering y cloud.',
    },
  },
  it: {
    present: 'Oggi',
    titles: {
      khome: 'Data Scientist Senior (Freelance)',
      havas: 'Ingegnere IA e Automazione',
      allianz: 'Dati, Automazione e Intelligenza Artificiale',
      decode: 'No Code, Automazione e IA',
      freelance: 'Ingegnere di IA generativa',
      sopra: 'Ingegnere Intelligenza Artificiale',
      parisCite: 'Laurea magistrale in Machine Learning per la Data Science',
    },
    descriptions: {
      freelance:
        'Sistemi di IA generativa consegnati per i miei clienti: agenti IA, flussi multi-agente e pipeline RAG su documenti aziendali, automazione con n8n, Make, Zapier e Power Automate, e prodotti SaaS e siti web potenziati dall’IA su React, Next.js, FastAPI e PostgreSQL.',
      khome:
        'Pipeline RAG su documenti immobiliari e normativi, più funzionalità LLM e di retrieval dentro prodotti digitali: prompting strutturato, function calling e orchestrazione di agenti con LangGraph e CrewAI.',
      havas:
        'Soluzioni di IA generativa e agentiche portate in produzione: agenti che dialogano con applicazioni aziendali, archivi documentali e API, collegati ai sistemi informativi già in uso.',
      allianz:
        "Prototipi di automazione, IA generativa e IA agentica per semplificare i processi aziendali: agenti specializzati, assistenti di business e workflow orchestrati su più fonti dati, con i guadagni di efficienza davvero misurati.",
      decode:
        'n8n, Make, agenti autonomi, orchestrazione multi-agente, ingegneria RAG, Supabase, Xano, API e webhook.',
      sopra:
        'Prototipi di architetture di retrieval e di agenti che collegano i modelli a fonti di conoscenza e strumenti eseguibili, integrazione dell’IA in applicazioni web e mobile, e valutazione dell’affidabilità reale di quei prototipi.',
      parisCite: 'Python, deep learning, NLP, IA generativa, data engineering e cloud.',
    },
  },
  de: {
    present: 'Heute',
    titles: {
      khome: 'Senior Data Scientist (freiberuflich)',
      havas: 'KI- & Automatisierungs-Ingenieur',
      allianz: 'Daten, Automatisierung und Künstliche Intelligenz',
      decode: 'No Code, Automatisierung & KI',
      freelance: 'Ingenieur für generative KI',
      sopra: 'KI-Ingenieur',
      parisCite: 'M.Sc. Machine Learning für Data Science',
    },
    descriptions: {
      freelance:
        'Generative KI-Systeme für eigene Kunden geliefert: KI-Agenten, Multi-Agenten-Workflows und RAG-Pipelines über Geschäftsdokumente, Automatisierung mit n8n, Make, Zapier und Power Automate sowie SaaS-Produkte und KI-gestützte Websites auf React, Next.js, FastAPI und PostgreSQL.',
      khome:
        'RAG-Pipelines über Immobilien- und Regulierungsdokumente, dazu LLM- und Retrieval-Funktionen in digitalen Produkten — strukturiertes Prompting, Function Calling und Agenten-Orchestrierung mit LangGraph und CrewAI.',
      havas:
        'Generative KI und agentische Lösungen in Produktion gebracht: Agenten, die mit Unternehmensanwendungen, Dokumentenablagen und APIs arbeiten, angebunden an die vorhandenen Informationssysteme.',
      allianz:
        'Prototypen für Automatisierung, generative KI und agentische KI zur Vereinfachung von Geschäftsprozessen — spezialisierte Agenten, Business-Assistenten und orchestrierte Workflows über mehrere Datenquellen, mit tatsächlich gemessenem Effizienzgewinn.',
      decode:
        'n8n, Make, autonome Agenten, Multi-Agenten-Orchestrierung, RAG-Engineering, Supabase, Xano, APIs und Webhooks.',
      sopra:
        'Prototypen von Retrieval- und Agenten-Architekturen, die Modelle mit Wissensquellen und ausführbaren Tools verbinden, KI-Integration in Web- und Mobile-Anwendungen sowie die Bewertung, wie zuverlässig diese Prototypen wirklich waren.',
      parisCite: 'Python, Deep Learning, NLP, generative KI, Data Engineering und Cloud.',
    },
  },
};

export function getExperience(lang: Lang): ExperienceEntry[] {
  const copy = COPY[lang];
  return [...ENTRIES]
    .sort((a, b) => {
      if (!a.end !== !b.end) return a.end ? 1 : -1;
      return sortKey(b.start).localeCompare(sortKey(a.start));
    })
    .map(({ start, end, ...entry }) => ({
      ...entry,
      period: `${formatPart(start)} – ${end ? formatPart(end) : copy.present}`,
      title: copy.titles[entry.id],
      description: copy.descriptions[entry.id],
    }));
}

/** Work history in the currently selected site language. */
export function useExperience() {
  const { lang } = useLang();
  return getExperience(lang);
}
