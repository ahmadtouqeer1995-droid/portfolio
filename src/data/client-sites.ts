import type { Lang } from '@/i18n';
import type { Study, StudyCopy } from '@/data/projects';

// Client websites I built full stack: frontend, backend and database.
// Shown without dates. Media in /public/projects:
//   <id>-1  desktop hero — the card thumbnail
//   <id>-2  desktop full page
//   <id>-3  mobile hero
//   <id>-video.mp4  landing-page walkthrough, 16:9

const CATEGORY: Record<Lang, string> = {
  en: 'WEBSITE · CLIENT PROJECT',
  fr: 'SITE WEB · PROJET CLIENT',
  es: 'SITIO WEB · PROYECTO DE CLIENTE',
  it: 'SITO WEB · PROGETTO CLIENTE',
  de: 'WEBSITE · KUNDENPROJEKT',
};

const SERVICES: Record<Lang, string> = {
  en: 'FULL STACK · FRONTEND · DATABASE',
  fr: 'FULL-STACK · FRONTEND · BASE DE DONNÉES',
  es: 'FULL-STACK · FRONTEND · BASE DE DATOS',
  it: 'FULL-STACK · FRONTEND · DATABASE',
  de: 'FULL-STACK · FRONTEND · DATENBANK',
};

const UI_DESIGN: Record<Lang, string> = { en: 'UI DESIGN', fr: 'DESIGN UI', es: 'DISEÑO UI', it: 'UI DESIGN', de: 'UI-DESIGN' };

const LAYERS: Record<Lang, string[]> = {
  en: ['Frontend', 'Backend', 'Database'],
  fr: ['Frontend', 'Backend', 'Base de données'],
  es: ['Frontend', 'Backend', 'Base de datos'],
  it: ['Frontend', 'Backend', 'Database'],
  de: ['Frontend', 'Backend', 'Datenbank'],
};

const TOOLS = [
  'Responsive pages, components and animations',
  'APIs, forms, sign-ups and integrations',
  'Leads, users and site content',
];

/** What each side of the stack does — the same three layers on every site. */
const SIDES: Record<Lang, { challenges: string[]; solutions: string[]; results: (domain?: string) => string }> = {
  en: {
    challenges: [
      'The site had to explain a complex product in a few seconds, load fast on every device and connect every form and sign-up to the data behind it.',
    ],
    solutions: [
      'Frontend: the pages, components and animations visitors see, responsive from phone to desktop.',
      'Backend: the APIs, forms and integrations that handle demo requests, sign-ups and content.',
      'Database: stores leads, users and site content, so every request is saved and reaches the right team.',
    ],
    results: (d) => `Live${d ? ` on ${d}` : ''}, with the frontend, backend and database built as one stack.`,
  },
  fr: {
    challenges: [
      'Le site devait expliquer un produit complexe en quelques secondes, charger vite sur tous les appareils et relier chaque formulaire et inscription aux données derrière.',
    ],
    solutions: [
      'Frontend : les pages, composants et animations que voit le visiteur, adaptés du mobile au desktop.',
      'Backend : les API, formulaires et intégrations qui gèrent demandes de démo, inscriptions et contenus.',
      'Base de données : elle stocke leads, utilisateurs et contenus, pour que chaque demande soit enregistrée et arrive à la bonne équipe.',
    ],
    results: (d) => `En ligne${d ? ` sur ${d}` : ''}, frontend, backend et base de données construits comme une seule stack.`,
  },
  es: {
    challenges: [
      'El sitio tenía que explicar un producto complejo en segundos, cargar rápido en cualquier dispositivo y conectar cada formulario y registro con los datos que hay detrás.',
    ],
    solutions: [
      'Frontend: las páginas, componentes y animaciones que ve el visitante, adaptados del móvil al escritorio.',
      'Backend: las API, formularios e integraciones que gestionan solicitudes de demo, registros y contenido.',
      'Base de datos: guarda leads, usuarios y contenido, para que cada solicitud quede registrada y llegue al equipo correcto.',
    ],
    results: (d) => `En línea${d ? ` en ${d}` : ''}, con frontend, backend y base de datos construidos como un solo stack.`,
  },
  it: {
    challenges: [
      'Il sito doveva spiegare un prodotto complesso in pochi secondi, caricarsi in fretta su ogni dispositivo e collegare ogni modulo e iscrizione ai dati che ci sono dietro.',
    ],
    solutions: [
      'Frontend: le pagine, i componenti e le animazioni che vede il visitatore, adattati dallo smartphone al desktop.',
      'Backend: le API, i moduli e le integrazioni che gestiscono richieste di demo, iscrizioni e contenuti.',
      'Database: conserva lead, utenti e contenuti, così ogni richiesta viene salvata e arriva al team giusto.',
    ],
    results: (d) => `Online${d ? ` su ${d}` : ''}, con frontend, backend e database costruiti come un unico stack.`,
  },
  de: {
    challenges: [
      'Die Website sollte ein komplexes Produkt in Sekunden erklären, auf jedem Gerät schnell laden und jedes Formular und jede Anmeldung mit den Daten dahinter verbinden.',
    ],
    solutions: [
      'Frontend: die Seiten, Komponenten und Animationen, die Besucher sehen, responsiv vom Smartphone bis zum Desktop.',
      'Backend: die APIs, Formulare und Integrationen für Demo-Anfragen, Anmeldungen und Inhalte.',
      'Datenbank: speichert Leads, Nutzer und Inhalte, damit jede Anfrage gesichert wird und beim richtigen Team ankommt.',
    ],
    results: (d) => `Live${d ? ` auf ${d}` : ''}, Frontend, Backend und Datenbank als ein Stack gebaut.`,
  },
};

type Site = {
  id: string;
  title: string;
  url?: string;
  imageCount: number;
  aspect: string;
  ext: 'png' | 'jpg';
  video: boolean;
  uiDesign?: boolean;
  /** What the company's product does, per language. */
  about: Record<Lang, string>;
  industry: Record<Lang, string>;
};

function study(s: Site): Study {
  const domain = s.url && new URL(s.url).hostname.replace(/^www\./, '');
  const copy = {} as Record<Lang, StudyCopy>;
  for (const lang of Object.keys(SIDES) as Lang[]) {
    copy[lang] = {
      category: CATEGORY[lang],
      services: s.uiDesign ? `${UI_DESIGN[lang]} · ${SERVICES[lang]}` : SERVICES[lang],
      client: s.title,
      industry: s.industry[lang],
      layers: LAYERS[lang],
      description: [s.about[lang]],
      challenges: SIDES[lang].challenges,
      solutions: SIDES[lang].solutions,
      results: [SIDES[lang].results(domain)],
    };
  }
  return {
    id: s.id,
    kind: 'apps',
    title: s.title,
    url: s.url,
    imageCount: s.imageCount,
    aspect: s.aspect,
    ext: s.ext,
    video: s.video,
    tools: TOOLS,
    copy,
  };
}

const SITES: Site[] = [
  {
    id: 'synthflow',
    title: 'Synthflow',
    url: 'https://synthflow.ai',
    imageCount: 3, aspect: '1440/900', ext: 'jpg', video: true,
    about: {
      en: 'Synthflow is a no-code platform for building AI voice agents that answer and make phone calls for businesses.',
      fr: 'Synthflow est une plateforme no-code pour créer des agents vocaux IA qui passent et reçoivent les appels des entreprises.',
      es: 'Synthflow es una plataforma no-code para crear agentes de voz con IA que atienden y hacen llamadas para empresas.',
      it: 'Synthflow è una piattaforma no-code per creare agenti vocali IA che rispondono e fanno telefonate per le aziende.',
      de: 'Synthflow ist eine No-Code-Plattform für KI-Sprachagenten, die für Unternehmen Anrufe annehmen und tätigen.',
    },
    industry: { en: 'AI Voice Agents', fr: 'Agents vocaux IA', es: 'Agentes de voz con IA', it: 'Agenti vocali IA', de: 'KI-Sprachagenten' },
  },
  {
    id: 'servicenow',
    title: 'ServiceNow',
    url: 'https://www.servicenow.com',
    imageCount: 2, aspect: '1440/900', ext: 'jpg', video: false,
    about: {
      en: 'ServiceNow is an enterprise platform that runs IT, HR and customer-service workflows, with AI agents that act on them.',
      fr: "ServiceNow est une plateforme d'entreprise qui fait tourner les workflows IT, RH et service client, avec des agents IA qui les exécutent.",
      es: 'ServiceNow es una plataforma empresarial que gestiona los flujos de TI, RR. HH. y atención al cliente, con agentes de IA que los ejecutan.',
      it: 'ServiceNow è una piattaforma enterprise che gestisce i flussi IT, HR e assistenza clienti, con agenti IA che li eseguono.',
      de: 'ServiceNow ist eine Unternehmensplattform für IT-, HR- und Kundenservice-Workflows, mit KI-Agenten, die sie ausführen.',
    },
    industry: { en: 'Enterprise Software', fr: "Logiciel d'entreprise", es: 'Software empresarial', it: 'Software enterprise', de: 'Unternehmenssoftware' },
  },
  {
    id: 'bland',
    title: 'Bland AI',
    url: 'https://bland.ai',
    imageCount: 9, aspect: '16/9', ext: 'png', video: true,
    about: {
      en: 'Bland AI builds AI phone agents for enterprises that handle inbound and outbound calls at scale.',
      fr: 'Bland AI conçoit des agents téléphoniques IA pour les entreprises, qui gèrent appels entrants et sortants à grande échelle.',
      es: 'Bland AI crea agentes telefónicos con IA para empresas, que gestionan llamadas entrantes y salientes a gran escala.',
      it: 'Bland AI crea agenti telefonici IA per le aziende, che gestiscono chiamate in entrata e in uscita su larga scala.',
      de: 'Bland AI baut KI-Telefonagenten für Unternehmen, die eingehende und ausgehende Anrufe in großem Umfang abwickeln.',
    },
    industry: { en: 'AI Phone Agents', fr: 'Agents téléphoniques IA', es: 'Agentes telefónicos con IA', it: 'Agenti telefonici IA', de: 'KI-Telefonagenten' },
  },
  {
    id: 'clay',
    title: 'Clay',
    url: 'https://www.clay.com',
    imageCount: 3, aspect: '16/9', ext: 'jpg', video: true,
    about: {
      en: 'Clay is a data platform for sales and growth teams: it pulls company and contact data from over 100 sources and uses AI agents to research and enrich every lead.',
      fr: "Clay est une plateforme de données pour les équipes commerciales et growth : elle récupère les données d'entreprises et de contacts dans plus de 100 sources et enrichit chaque lead avec des agents IA.",
      es: 'Clay es una plataforma de datos para equipos de ventas y growth: reúne datos de empresas y contactos de más de 100 fuentes y enriquece cada lead con agentes de IA.',
      it: 'Clay è una piattaforma dati per team sales e growth: raccoglie dati su aziende e contatti da oltre 100 fonti e arricchisce ogni lead con agenti IA.',
      de: 'Clay ist eine Datenplattform für Sales- und Growth-Teams: Sie zieht Firmen- und Kontaktdaten aus über 100 Quellen und reichert jeden Lead mit KI-Agenten an.',
    },
    industry: { en: 'Sales & Data Enrichment', fr: 'Vente & enrichissement de données', es: 'Ventas y enriquecimiento de datos', it: 'Vendite e arricchimento dati', de: 'Vertrieb & Datenanreicherung' },
  },
  {
    id: 'durable',
    title: 'Durable',
    url: 'https://durable.co',
    imageCount: 3, aspect: '16/9', ext: 'jpg', video: true,
    about: {
      en: 'Durable is an AI website builder for small businesses: it generates a full site in seconds and adds tools to run the business, like a CRM and invoicing.',
      fr: 'Durable est un créateur de sites IA pour les petites entreprises : il génère un site complet en quelques secondes et ajoute des outils de gestion, comme un CRM et la facturation.',
      es: 'Durable es un creador de sitios web con IA para pequeñas empresas: genera un sitio completo en segundos y añade herramientas de gestión, como un CRM y facturación.',
      it: 'Durable è un website builder IA per piccole imprese: genera un sito completo in pochi secondi e aggiunge strumenti di gestione, come un CRM e la fatturazione.',
      de: 'Durable ist ein KI-Website-Baukasten für kleine Unternehmen: Er erstellt in Sekunden eine komplette Website und bringt Werkzeuge wie CRM und Rechnungen mit.',
    },
    industry: { en: 'AI Website Builder', fr: 'Création de sites IA', es: 'Creador de sitios con IA', it: 'Website builder IA', de: 'KI-Website-Baukasten' },
  },
  {
    id: 'framer-ai',
    title: 'Framer',
    url: 'https://www.framer.com',
    imageCount: 3, aspect: '16/9', ext: 'jpg', video: true,
    about: {
      en: 'Framer is a website builder for designers and teams, with AI that drafts and edits pages and one-click publishing from the canvas.',
      fr: 'Framer est un outil de création de sites pour designers et équipes, avec une IA qui génère et modifie les pages et une publication en un clic depuis le canevas.',
      es: 'Framer es un creador de sitios web para diseñadores y equipos, con IA que genera y edita páginas y publicación en un clic desde el lienzo.',
      it: 'Framer è un website builder per designer e team, con un’IA che crea e modifica le pagine e pubblicazione in un clic dalla canvas.',
      de: 'Framer ist ein Website-Baukasten für Designer und Teams, mit KI, die Seiten entwirft und bearbeitet, und Veröffentlichung per Klick aus dem Canvas.',
    },
    industry: { en: 'Website Builder', fr: 'Création de sites web', es: 'Creador de sitios web', it: 'Website builder', de: 'Website-Baukasten' },
  },
  {
    id: 'harvey',
    title: 'Harvey',
    url: 'https://www.harvey.ai',
    imageCount: 3, aspect: '16/9', ext: 'png', video: true,
    about: {
      en: 'Harvey is a generative AI platform for law firms and legal teams, used for research, drafting and document review.',
      fr: "Harvey est une plateforme d'IA générative pour les cabinets d'avocats et les directions juridiques : recherche, rédaction et revue de documents.",
      es: 'Harvey es una plataforma de IA generativa para despachos y equipos legales, usada para investigar, redactar y revisar documentos.',
      it: 'Harvey è una piattaforma di IA generativa per studi legali e uffici legali, usata per ricerca, redazione e revisione di documenti.',
      de: 'Harvey ist eine Plattform für generative KI für Kanzleien und Rechtsabteilungen, für Recherche, Entwürfe und Dokumentenprüfung.',
    },
    industry: { en: 'Legal AI', fr: 'IA juridique', es: 'IA legal', it: 'IA legale', de: 'Legal-KI' },
  },
  {
    id: 'speculo',
    title: 'Speculo',
    imageCount: 3, aspect: '16/9', ext: 'jpg', video: true,
    uiDesign: true,
    about: {
      en: 'Speculo is AI lead engagement for real-estate agents: its AI calls every new lead within a minute, so no inquiry waits for a callback.',
      fr: "Speculo engage les leads des agents immobiliers par IA : son IA appelle chaque nouveau lead en moins d'une minute, pour qu'aucune demande n'attende un rappel.",
      es: 'Speculo atiende los leads de agentes inmobiliarios con IA: llama a cada nuevo lead en menos de un minuto, para que ninguna consulta espere una devolución de llamada.',
      it: 'Speculo gestisce i lead degli agenti immobiliari con l’IA: chiama ogni nuovo lead in meno di un minuto, così nessuna richiesta aspetta di essere richiamata.',
      de: 'Speculo übernimmt mit KI die Lead-Ansprache für Immobilienmakler: Die KI ruft jeden neuen Lead in unter einer Minute an, damit keine Anfrage auf einen Rückruf wartet.',
    },
    industry: { en: 'Real Estate AI', fr: 'IA immobilière', es: 'IA inmobiliaria', it: 'IA immobiliare', de: 'Immobilien-KI' },
  },
];

export const CLIENT_SITES: Study[] = SITES.map(study);
