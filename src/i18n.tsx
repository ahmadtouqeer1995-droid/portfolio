import { createContext, useContext, useEffect, useState } from 'react';

// Lightweight i18n: UI text in EN / FR / ES / IT / DE. The language is picked
// from the switcher in the home top menu; every visit starts in English.

export type Lang = 'en' | 'fr' | 'es' | 'it' | 'de';

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
  { code: 'de', label: 'Deutsch' },
];

const STRINGS = {
  en: {
    home: 'Home',
    projectsTitle: 'Projects',
    backToProjects: 'Projects',
    notFound: 'Project not found.',
    backToProjectsLink: 'Back to projects',
    meLabel: 'Me',
    meRole: 'Full Stack Web Developer',
    meIntro: 'Freelance Shopify developer in Paris with 8 years of experience — 100+ stores built and 50+ themes sold over 1,000 times. I build e-commerce stores that convert, web apps that scale, and AI agents and automations that save you hours every week.',
    meViewProjects: 'View my projects',
    meStatsYears: 'Years of Shopify experience',
    meStatsAI: 'Years building AI & automation',
    meStatsProjects: 'Stores delivered',
    meStatsThemes: 'Theme copies sold',
    meWhatIDo: 'What I do',
    meShopTitle: 'Shopify & E-commerce',
    meShopText: 'Custom storefronts, theme development and store optimization — from new builds to redesigns of existing stores.',
    meWebTitle: 'Full-Stack Web Apps',
    meWebText: 'Modern web applications with React, TypeScript and Node.js, plus the databases and cloud infrastructure behind them.',
    meAiTitle: 'AI Agents & Automation',
    meAiText: 'Chatbots, AI agents and automated workflows with n8n and LangGraph — for websites, Shopify stores and business operations.',
    meContentTitle: 'AI Content Creation',
    meContentText: 'AI-generated product photos, videos and UGC-style content that gives brands scroll-stopping visuals at a fraction of the cost.',
    meJourneyTitle: 'My journey',
    meJourneyText: "I've been freelancing for 8 years, building Shopify stores and web apps for startups, business owners and e-commerce brands. For the last two years I've specialized in AI: agents, chatbots and automated workflows with n8n and LangGraph, plus AI-generated product visuals and UGC. Based in Paris and fully bilingual in English and French, I'm serious and passionate about my craft — I take the time to deliver quality. I work best with startups, owners of one or many Shopify stores, and any business that wants automation or AI working for it.",
    contactLabel: 'Contact me',
    contactHeading: "Let's work",
    contactHeadingItalic: 'together',
    contactText: 'Tell me about your store, web app or automation project — in English or French. A short message is enough to get started.',
    scanWhatsapp: 'Scan for WhatsApp',
    description: 'Project Description',
    challenges: 'Challenges',
    solutions: 'Solutions',
    results: 'Results',
    published: 'Published',
    services: 'Services',
    client: 'Client',
    industry: 'Industry',
  },
  fr: {
    home: 'Accueil',
    projectsTitle: 'Projets',
    backToProjects: 'Projets',
    notFound: 'Projet introuvable.',
    backToProjectsLink: 'Retour aux projets',
    meLabel: 'Moi',
    meRole: 'Développeur Web Full Stack',
    meIntro: "Développeur Shopify freelance à Paris, 8 ans d'expérience — plus de 100 boutiques créées et 50+ thèmes vendus à plus de 1 000 exemplaires. Je construis des boutiques e-commerce qui convertissent, des applications web qui tiennent la charge, et des agents IA qui vous font gagner des heures chaque semaine.",
    meViewProjects: 'Voir mes projets',
    meStatsYears: "Années d'expérience Shopify",
    meStatsAI: 'Années en IA & automatisation',
    meStatsProjects: 'Boutiques livrées',
    meStatsThemes: 'Exemplaires de thèmes vendus',
    meWhatIDo: 'Ce que je fais',
    meShopTitle: 'Shopify & E-commerce',
    meShopText: 'Boutiques sur mesure, développement de thèmes et optimisation — de la création complète à la refonte de boutiques existantes.',
    meWebTitle: 'Applications Web Full-Stack',
    meWebText: "Des applications web modernes avec React, TypeScript et Node.js, ainsi que les bases de données et l'infrastructure cloud derrière.",
    meAiTitle: 'Agents IA & Automatisation',
    meAiText: 'Chatbots, agents IA et flux automatisés avec n8n et LangGraph — pour sites web, boutiques Shopify et opérations métier.',
    meContentTitle: 'Création de contenu IA',
    meContentText: 'Photos produits, vidéos et contenus type UGC générés par IA : des visuels percutants pour les marques, à une fraction du coût.',
    meJourneyTitle: 'Mon parcours',
    meJourneyText: "Freelance depuis 8 ans, je construis des boutiques Shopify et des applications web pour des startups, des entrepreneurs et des marques e-commerce. Depuis deux ans, je me suis spécialisé dans l'IA : agents, chatbots et flux automatisés avec n8n et LangGraph, ainsi que visuels produits et UGC générés par IA. Basé à Paris et parfaitement bilingue anglais-français, je suis sérieux et passionné par mon métier — je prends le temps de livrer un travail de qualité. Je travaille au mieux avec des startups, des propriétaires d'une ou plusieurs boutiques Shopify, et toute entreprise qui veut mettre l'automatisation ou l'IA à son service.",
    contactLabel: 'Contactez-moi',
    contactHeading: 'Travaillons',
    contactHeadingItalic: 'ensemble',
    contactText: "Parlez-moi de votre boutique, application web ou projet d'automatisation — en français ou en anglais. Un court message suffit pour commencer.",
    scanWhatsapp: 'Scannez pour WhatsApp',
    description: 'Description du projet',
    challenges: 'Défis',
    solutions: 'Solutions',
    results: 'Résultats',
    published: 'Publié',
    services: 'Services',
    client: 'Client',
    industry: 'Secteur',
  },
  es: {
    home: 'Inicio',
    projectsTitle: 'Proyectos',
    backToProjects: 'Proyectos',
    notFound: 'Proyecto no encontrado.',
    backToProjectsLink: 'Volver a proyectos',
    meLabel: 'Yo',
    meRole: 'Desarrollador Web Full Stack',
    meIntro: 'Desarrollador Shopify freelance en París con 8 años de experiencia: más de 100 tiendas creadas y 50+ temas vendidos más de 1.000 veces. Construyo tiendas que convierten, aplicaciones web que escalan y agentes de IA que te ahorran horas cada semana.',
    meViewProjects: 'Ver mis proyectos',
    meStatsYears: 'Años de experiencia en Shopify',
    meStatsAI: 'Años en IA y automatización',
    meStatsProjects: 'Tiendas entregadas',
    meStatsThemes: 'Copias de temas vendidas',
    meWhatIDo: 'Qué hago',
    meShopTitle: 'Shopify y E-commerce',
    meShopText: 'Tiendas a medida, desarrollo de temas y optimización — desde creaciones nuevas hasta rediseños de tiendas existentes.',
    meWebTitle: 'Aplicaciones Web Full-Stack',
    meWebText: 'Aplicaciones web modernas con React, TypeScript y Node.js, además de las bases de datos y la infraestructura cloud detrás.',
    meAiTitle: 'Agentes de IA y Automatización',
    meAiText: 'Chatbots, agentes de IA y flujos automatizados con n8n y LangGraph — para webs, tiendas Shopify y operaciones de negocio.',
    meContentTitle: 'Creación de contenido con IA',
    meContentText: 'Fotos de producto, vídeos y contenido tipo UGC generados con IA: visuales impactantes para las marcas a una fracción del coste.',
    meJourneyTitle: 'Mi trayectoria',
    meJourneyText: 'Llevo 8 años como freelance construyendo tiendas Shopify y aplicaciones web para startups, empresarios y marcas de e-commerce. En los últimos dos años me he especializado en IA: agentes, chatbots y flujos automatizados con n8n y LangGraph, además de visuales de producto y UGC generados con IA. Con base en París y totalmente bilingüe en inglés y francés, soy serio y apasionado con mi trabajo: me tomo el tiempo de entregar calidad. Trabajo mejor con startups, dueños de una o varias tiendas Shopify y cualquier negocio que quiera poner la automatización o la IA a trabajar.',
    contactLabel: 'Contáctame',
    contactHeading: 'Trabajemos',
    contactHeadingItalic: 'juntos',
    contactText: 'Cuéntame sobre tu tienda, aplicación web o proyecto de automatización — en inglés o francés. Un mensaje corto basta para empezar.',
    scanWhatsapp: 'Escanea para WhatsApp',
    description: 'Descripción del proyecto',
    challenges: 'Desafíos',
    solutions: 'Soluciones',
    results: 'Resultados',
    published: 'Publicado',
    services: 'Servicios',
    client: 'Cliente',
    industry: 'Industria',
  },
  it: {
    home: 'Home',
    projectsTitle: 'Progetti',
    backToProjects: 'Progetti',
    notFound: 'Progetto non trovato.',
    backToProjectsLink: 'Torna ai progetti',
    meLabel: 'Io',
    meRole: 'Sviluppatore Web Full Stack',
    meIntro: 'Sviluppatore Shopify freelance a Parigi con 8 anni di esperienza: oltre 100 negozi realizzati e 50+ temi venduti più di 1.000 volte. Costruisco negozi e-commerce che convertono, app web che scalano e agenti IA che ti fanno risparmiare ore ogni settimana.',
    meViewProjects: 'Guarda i miei progetti',
    meStatsYears: 'Anni di esperienza Shopify',
    meStatsAI: 'Anni in IA e automazione',
    meStatsProjects: 'Negozi consegnati',
    meStatsThemes: 'Copie di temi vendute',
    meWhatIDo: 'Cosa faccio',
    meShopTitle: 'Shopify ed E-commerce',
    meShopText: 'Negozi su misura, sviluppo temi e ottimizzazione — dalle nuove creazioni ai redesign di negozi esistenti.',
    meWebTitle: 'App Web Full-Stack',
    meWebText: "Applicazioni web moderne con React, TypeScript e Node.js, più i database e l'infrastruttura cloud dietro le quinte.",
    meAiTitle: 'Agenti IA e Automazione',
    meAiText: 'Chatbot, agenti IA e flussi automatizzati con n8n e LangGraph — per siti web, negozi Shopify e processi aziendali.',
    meContentTitle: 'Contenuti generati con IA',
    meContentText: "Foto prodotto, video e contenuti in stile UGC generati con IA: visual d'impatto per i brand a una frazione del costo.",
    meJourneyTitle: 'Il mio percorso',
    meJourneyText: "Lavoro come freelance da 8 anni, costruendo negozi Shopify e applicazioni web per startup, imprenditori e brand e-commerce. Negli ultimi due anni mi sono specializzato nell'IA: agenti, chatbot e flussi automatizzati con n8n e LangGraph, oltre a visual di prodotto e UGC generati con IA. Con base a Parigi e perfettamente bilingue inglese-francese, sono serio e appassionato del mio mestiere: mi prendo il tempo di consegnare qualità. Do il meglio con startup, proprietari di uno o più negozi Shopify e qualsiasi azienda che voglia mettere al lavoro automazione e IA.",
    contactLabel: 'Contattami',
    contactHeading: 'Lavoriamo',
    contactHeadingItalic: 'insieme',
    contactText: 'Raccontami del tuo negozio, della tua app web o del tuo progetto di automazione — in inglese o francese. Basta un breve messaggio per iniziare.',
    scanWhatsapp: 'Scansiona per WhatsApp',
    description: 'Descrizione del progetto',
    challenges: 'Sfide',
    solutions: 'Soluzioni',
    results: 'Risultati',
    published: 'Pubblicato',
    services: 'Servizi',
    client: 'Cliente',
    industry: 'Settore',
  },
  de: {
    home: 'Startseite',
    projectsTitle: 'Projekte',
    backToProjects: 'Projekte',
    notFound: 'Projekt nicht gefunden.',
    backToProjectsLink: 'Zurück zu den Projekten',
    meLabel: 'Ich',
    meRole: 'Full-Stack-Webentwickler',
    meIntro: 'Freiberuflicher Shopify-Entwickler in Paris mit 8 Jahren Erfahrung — über 100 Shops gebaut und 50+ Themes mehr als 1.000-mal verkauft. Ich baue E-Commerce-Shops, die konvertieren, Web-Apps, die skalieren, und KI-Agenten, die dir jede Woche Stunden sparen.',
    meViewProjects: 'Meine Projekte ansehen',
    meStatsYears: 'Jahre Shopify-Erfahrung',
    meStatsAI: 'Jahre KI & Automatisierung',
    meStatsProjects: 'Gelieferte Shops',
    meStatsThemes: 'Verkaufte Theme-Kopien',
    meWhatIDo: 'Was ich mache',
    meShopTitle: 'Shopify & E-Commerce',
    meShopText: 'Maßgeschneiderte Shops, Theme-Entwicklung und Optimierung — vom Neuaufbau bis zum Redesign bestehender Stores.',
    meWebTitle: 'Full-Stack-Web-Apps',
    meWebText: 'Moderne Webanwendungen mit React, TypeScript und Node.js — plus die Datenbanken und Cloud-Infrastruktur dahinter.',
    meAiTitle: 'KI-Agenten & Automatisierung',
    meAiText: 'Chatbots, KI-Agenten und automatisierte Workflows mit n8n und LangGraph — für Websites, Shopify-Shops und Geschäftsprozesse.',
    meContentTitle: 'KI-Content-Erstellung',
    meContentText: 'KI-generierte Produktfotos, Videos und UGC-Content: auffällige Visuals für Marken zu einem Bruchteil der Kosten.',
    meJourneyTitle: 'Mein Werdegang',
    meJourneyText: 'Seit 8 Jahren arbeite ich freiberuflich und baue Shopify-Shops und Web-Apps für Startups, Unternehmer und E-Commerce-Marken. In den letzten zwei Jahren habe ich mich auf KI spezialisiert: Agenten, Chatbots und automatisierte Workflows mit n8n und LangGraph, dazu KI-generierte Produktvisuals und UGC. Ansässig in Paris und komplett zweisprachig (Englisch/Französisch), bin ich ernsthaft und leidenschaftlich bei der Sache — ich nehme mir die Zeit für Qualität. Am besten arbeite ich mit Startups, Inhabern eines oder mehrerer Shopify-Stores und jedem Unternehmen, das Automatisierung oder KI für sich arbeiten lassen will.',
    contactLabel: 'Kontaktiere mich',
    contactHeading: 'Lass uns',
    contactHeadingItalic: 'zusammenarbeiten',
    contactText: 'Erzähl mir von deinem Shop, deiner Web-App oder deinem Automatisierungsprojekt — auf Englisch oder Französisch. Eine kurze Nachricht genügt für den Anfang.',
    scanWhatsapp: 'Für WhatsApp scannen',
    description: 'Projektbeschreibung',
    challenges: 'Herausforderungen',
    solutions: 'Lösungen',
    results: 'Ergebnisse',
    published: 'Veröffentlicht',
    services: 'Leistungen',
    client: 'Kunde',
    industry: 'Branche',
  },
} as const;

export type StringKey = keyof (typeof STRINGS)['en'];

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: StringKey) => string;
}>({
  lang: 'en',
  setLang: () => {},
  t: (key) => STRINGS.en[key],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always land in English; the switcher changes it for the current visit only.
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: StringKey) => STRINGS[lang][key];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

/** Sets the document title + meta description for the current page (SEO). */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}
