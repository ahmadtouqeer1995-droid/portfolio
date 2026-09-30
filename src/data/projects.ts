import { useLang, type Lang } from '@/i18n';

// 10 e-commerce builds from the freelance web-development years — kept as
// delivery proof now that the site leads with AI engineering. AI case studies
// live alongside these once their media is ready.
// All media lives in /public/projects:
//   <id>-1.png … <id>-N.png  (screenshots — picture 1 is the card preview)
//   <id>-video.mp4           (1920x1080 store walkthrough)
// All copy is localized: titles, dates, industries and every case-study
// paragraph follow the site language.

// ---- Navigation rule (applies to every project added from now on) ----
// /projects            → full screen, one big tile per category, each with a thumbnail
// category, 1 project  → the tile opens that project's details directly
// category, 2+ projects→ the tile opens /projects/<slug>: one project per screen,
//                        big thumbnail, click → /projects/<id> details
// To add a project: give it a `kind`, drop its pictures in /public/projects,
// and it lands in the right category automatically. A project id must never
// equal a category slug — the category route would hide the project page.

/** Which category tile a project lives under. */
export type ProjectKind = 'voice' | 'lead' | 'crm' | 'outreach' | 'web';

export const CATEGORIES: {
  kind: ProjectKind;
  slug: string;
  labelKey: 'tabVoice' | 'tabLead' | 'tabCrm' | 'tabOutreach' | 'tabWeb';
  introKey: 'projectsIntroVoice' | 'projectsIntroLead' | 'projectsIntroCrm' | 'projectsIntroOutreach' | 'projectsIntro';
}[] = [
  { kind: 'voice', slug: 'voice-agents', labelKey: 'tabVoice', introKey: 'projectsIntroVoice' },
  { kind: 'lead', slug: 'lead-generation', labelKey: 'tabLead', introKey: 'projectsIntroLead' },
  { kind: 'crm', slug: 'crm-automation', labelKey: 'tabCrm', introKey: 'projectsIntroCrm' },
  { kind: 'outreach', slug: 'linkedin-outreach', labelKey: 'tabOutreach', introKey: 'projectsIntroOutreach' },
  { kind: 'web', slug: 'shopify-websites', labelKey: 'tabWeb', introKey: 'projectsIntro' },
];

/** Where a category tile leads: straight to the project if it is alone, else the list. */
export function categoryPath(kind: ProjectKind, projects: Project[]): string {
  const inCategory = projects.filter((p) => p.kind === kind);
  if (inCategory.length === 1) return `/projects/${inCategory[0].id}`;
  return `/projects/${CATEGORIES.find((c) => c.kind === kind)!.slug}`;
}

export type Project = {
  id: string;
  kind: ProjectKind;
  title: string;
  category: string;
  date: string;
  published: string;
  services: string;
  client: string;
  industry: string;
  description: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  image: string;
  images: string[];
  /** Walkthrough video — AI case studies without one skip the video block. */
  video?: string;
  /** Tech stack table, one row per layer (AI case studies). */
  stack?: { layer: string; tools: string }[];
  /** Picture frame ratio, width/height — defaults to the store screenshots' 1122/1218. */
  aspect?: string;
  /** 'contain' shows the whole thumbnail in the 16:9 frame (very wide diagrams) instead of cropping it. */
  fit?: 'cover' | 'contain';
};

// ---- Store facts (language-independent) ----
type Store = {
  id: string;
  name: string;
  theme: string;
  client: string;
  date: [day: number, month: number, year: number];
  picCount: number;
};

const STORES: Store[] = [
  { id: 'hehku', name: 'Hehku', theme: 'Taiga', client: 'SmuutiSkin', date: [14, 3, 2023], picCount: 6 },
  { id: 'bubbly', name: 'Bubbly', theme: 'Taiga', client: 'Bubbly Drinks', date: [2, 7, 2023], picCount: 5 },
  { id: 'magic', name: 'Magic', theme: 'Maya', client: 'Maya Studio', date: [19, 10, 2023], picCount: 8 },
  { id: 'throne', name: 'Throne', theme: 'King', client: 'King Supply', date: [8, 1, 2024], picCount: 7 },
  { id: 'luxe', name: 'Luxe', theme: 'Luxe', client: 'La Fleur', date: [27, 4, 2024], picCount: 8 },
  { id: 'lensrappa', name: 'Lensrappa', theme: 'Luxe', client: 'Lensrappa', date: [15, 7, 2024], picCount: 5 },
  { id: 'amour', name: "L'Amour", theme: 'Reformation', client: "L'Amour", date: [3, 10, 2024], picCount: 8 },
  { id: 'radiance', name: 'Radiance', theme: 'Blockshop', client: 'Leselle', date: [21, 1, 2025], picCount: 7 },
  { id: 'phenomena', name: 'Phenomena', theme: 'Palo Alto', client: 'Phenomena Beauty', date: [9, 4, 2025], picCount: 8 },
  { id: 'noblesse', name: 'Noblesse', theme: 'Noblesse', client: 'Noblesse', date: [26, 6, 2025], picCount: 5 },
];

export const PROJECT_COUNT = STORES.length;

// ---- Localized copy ----
type Copy = {
  category: string;
  services: string;
  monthsShort: string[];
  monthsFull: string[];
  formatPublished: (day: number, monthFull: string, year: number) => string;
  industries: Record<string, string>;
  niches: Record<string, string>;
  descTpl: (name: string, niche: string, theme: string) => string;
  desc2: string;
  chal: string[];
  solTpl: (theme: string) => string;
  sol2: string;
  res: string[];
};

const COPY: Record<Lang, Copy> = {
  en: {
    category: 'E-COMMERCE',
    services: 'E-COMMERCE DEVELOPMENT',
    monthsShort: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    formatPublished: (d, m, y) => `${d} ${m} ${y}`,
    industries: {
      hehku: 'Skincare & Beauty', bubbly: 'Food & Beverage', magic: 'Beauty & Skincare', throne: 'Audio & Electronics', luxe: 'Luxury Fragrance',
      lensrappa: 'Eyewear', amour: 'Bags & Luggage', radiance: 'Jewelry & Accessories', phenomena: 'Cosmetics & Makeup', noblesse: 'Coffee & Drinkware',
    },
    niches: {
      hehku: 'Nordic skincare brand with fresh, fruit-based formulas',
      bubbly: 'organic kombucha brand with bold, colorful flavors',
      magic: 'natural beauty and body-care brand with serums, creams and body butters',
      throne: 'consumer audio and tech brand — headphones, earbuds and smart speakers',
      luxe: 'French luxury fragrance house',
      lensrappa: 'premium eyewear label',
      amour: 'bags and luggage brand for travel and everyday carry',
      radiance: 'fine jewelry brand',
      phenomena: 'bold cosmetics and makeup brand',
      noblesse: 'premium coffee and drinkware brand for a refined morning ritual',
    },
    descTpl: (name, niche, theme) =>
      `${name} is a ${niche}, built on Shopify with the ${theme} theme customized in depth to match the brand's identity.`,
    desc2:
      'Every page was designed around conversion: fast loading, clear navigation and a shopping experience that feels effortless from the first visit to checkout.',
    chal: [
      'The brand needed more than an out-of-the-box template: a distinctive storefront that presents the catalog clearly, is easy to manage day to day, and turns visitors into customers.',
      'It also had to stay fast and flawless on mobile, where most of the traffic comes from, while leaving the team full freedom to update content without touching code.',
    ],
    solTpl: (theme) =>
      `I customized the ${theme} theme section by section — layout, typography and color system — and structured the collections, product pages and navigation around how customers actually shop.`,
    sol2:
      'On top of the storefront I configured the essential apps and automated the repetitive workflows, so orders, inventory and marketing run with minimal manual work.',
    res: [
      'The store launched quickly with excellent performance scores, a consistent brand experience on every device, and a clean, conversion-focused customer journey.',
      'The team can now manage products, content and campaigns autonomously — a storefront that grows with the brand instead of holding it back.',
    ],
  },
  fr: {
    category: 'E-COMMERCE',
    services: 'DÉVELOPPEMENT E-COMMERCE',
    monthsShort: ['JANV', 'FÉVR', 'MARS', 'AVR', 'MAI', 'JUIN', 'JUIL', 'AOÛT', 'SEPT', 'OCT', 'NOV', 'DÉC'],
    monthsFull: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    formatPublished: (d, m, y) => `${d} ${m} ${y}`,
    industries: {
      hehku: 'Soins & Beauté', bubbly: 'Boissons & Alimentation', magic: 'Beauté & Soins', throne: 'Audio & Électronique', luxe: 'Parfumerie de luxe',
      lensrappa: 'Lunetterie', amour: 'Maroquinerie & Bagages', radiance: 'Bijoux & Accessoires', phenomena: 'Cosmétiques & Maquillage', noblesse: 'Café & Accessoires',
    },
    niches: {
      hehku: 'marque de soins nordique aux formules fraîches et fruitées',
      bubbly: 'marque de kombucha bio aux saveurs vives et colorées',
      magic: 'marque de beauté naturelle et de soins du corps — sérums, crèmes et beurres corporels',
      throne: 'marque audio et tech — casques, écouteurs et enceintes connectées',
      luxe: 'maison de parfum française haut de gamme',
      lensrappa: 'marque de lunettes premium',
      amour: 'marque de sacs et bagages pour le voyage et le quotidien',
      radiance: 'marque de bijoux fins',
      phenomena: 'marque de cosmétiques audacieuse',
      noblesse: 'marque premium de café et d’accessoires pour un rituel du matin raffiné',
    },
    descTpl: (name, niche, theme) =>
      `${name} est une ${niche}, construite sur Shopify avec le thème ${theme} personnalisé en profondeur pour coller à l'identité de la marque.`,
    desc2:
      "Chaque page a été pensée pour la conversion : chargement rapide, navigation claire et une expérience d'achat fluide, de la première visite jusqu'au paiement.",
    chal: [
      "La marque avait besoin de plus qu'un template prêt à l'emploi : une boutique distinctive qui présente le catalogue clairement, se gère facilement au quotidien et transforme les visiteurs en clients.",
      "Elle devait aussi rester rapide et irréprochable sur mobile, d'où vient l'essentiel du trafic, tout en laissant à l'équipe une liberté totale pour mettre à jour le contenu sans toucher au code.",
    ],
    solTpl: (theme) =>
      `J'ai personnalisé le thème ${theme} section par section — mise en page, typographie et système de couleurs — et structuré les collections, les fiches produits et la navigation autour du parcours d'achat réel des clients.`,
    sol2:
      "En plus de la boutique, j'ai configuré les applications essentielles et automatisé les tâches répétitives : commandes, stocks et marketing tournent avec un minimum d'intervention manuelle.",
    res: [
      "La boutique a été lancée rapidement avec d'excellents scores de performance, une expérience de marque cohérente sur tous les écrans et un parcours client clair, orienté conversion.",
      "L'équipe gère désormais produits, contenus et campagnes en toute autonomie — une boutique qui accompagne la croissance de la marque au lieu de la freiner.",
    ],
  },
  es: {
    category: 'E-COMMERCE',
    services: 'DESARROLLO E-COMMERCE',
    monthsShort: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
    monthsFull: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    formatPublished: (d, m, y) => `${d} de ${m} de ${y}`,
    industries: {
      hehku: 'Cuidado de la piel y belleza', bubbly: 'Alimentación y bebidas', magic: 'Belleza y cuidado de la piel', throne: 'Audio y electrónica', luxe: 'Perfumería de lujo',
      lensrappa: 'Gafas', amour: 'Bolsos y equipaje', radiance: 'Joyería y accesorios', phenomena: 'Cosméticos y maquillaje', noblesse: 'Café y accesorios',
    },
    niches: {
      hehku: 'marca nórdica de cuidado de la piel con fórmulas frescas y afrutadas',
      bubbly: 'marca de kombucha ecológica de sabores vivos y coloridos',
      magic: 'marca de belleza natural y cuidado corporal — sérums, cremas y mantecas corporales',
      throne: 'marca de audio y tecnología — auriculares, earbuds y altavoces inteligentes',
      luxe: 'casa de perfumes francesa de alta gama',
      lensrappa: 'marca de gafas premium',
      amour: 'marca de bolsos y equipaje para viajar y para el día a día',
      radiance: 'marca de joyería fina',
      phenomena: 'marca de cosméticos atrevida',
      noblesse: 'marca premium de café y accesorios para un ritual matinal refinado',
    },
    descTpl: (name, niche, theme) =>
      `${name} es una ${niche}, construida en Shopify con el tema ${theme} personalizado a fondo para reflejar la identidad de la marca.`,
    desc2:
      'Cada página se diseñó pensando en la conversión: carga rápida, navegación clara y una experiencia de compra fluida desde la primera visita hasta el pago.',
    chal: [
      'La marca necesitaba más que una plantilla estándar: una tienda distintiva que presentara el catálogo con claridad, fuera fácil de gestionar a diario y convirtiera visitantes en clientes.',
      'Además, debía ser rápida e impecable en móvil, de donde llega la mayor parte del tráfico, dejando al equipo total libertad para actualizar contenidos sin tocar código.',
    ],
    solTpl: (theme) =>
      `Personalicé el tema ${theme} sección por sección — maquetación, tipografía y sistema de color — y estructuré colecciones, fichas de producto y navegación según cómo compran realmente los clientes.`,
    sol2:
      'Además de la tienda, configuré las aplicaciones esenciales y automaticé los flujos repetitivos: pedidos, inventario y marketing funcionan con el mínimo trabajo manual.',
    res: [
      'La tienda se lanzó rápido, con excelentes puntuaciones de rendimiento, una experiencia de marca coherente en todos los dispositivos y un recorrido de compra claro y orientado a la conversión.',
      'El equipo ahora gestiona productos, contenidos y campañas de forma autónoma: una tienda que crece con la marca en lugar de frenarla.',
    ],
  },
  it: {
    category: 'E-COMMERCE',
    services: 'SVILUPPO E-COMMERCE',
    monthsShort: ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC'],
    monthsFull: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
    formatPublished: (d, m, y) => `${d} ${m} ${y}`,
    industries: {
      hehku: 'Skincare e bellezza', bubbly: 'Cibo e bevande', magic: 'Bellezza e skincare', throne: 'Audio ed elettronica', luxe: 'Profumeria di lusso',
      lensrappa: 'Occhialeria', amour: 'Borse e valigie', radiance: 'Gioielli e accessori', phenomena: 'Cosmetici e make-up', noblesse: 'Caffè e accessori',
    },
    niches: {
      hehku: 'marchio nordico di skincare con formule fresche e fruttate',
      bubbly: 'marchio di kombucha biologico dai gusti vivaci e colorati',
      magic: 'marchio di bellezza naturale e cura del corpo — sieri, creme e burri corpo',
      throne: 'marchio di audio e tecnologia — cuffie, auricolari e speaker smart',
      luxe: 'marchio francese di profumeria di lusso',
      lensrappa: 'marchio di occhiali premium',
      amour: 'marchio di borse e valigie per i viaggi e la vita di tutti i giorni',
      radiance: 'marchio di gioielleria fine',
      phenomena: 'marchio di cosmetici audace',
      noblesse: 'marchio premium di caffè e accessori per un rituale mattutino raffinato',
    },
    descTpl: (name, niche, theme) =>
      `${name} è un ${niche}, costruito su Shopify con il tema ${theme} personalizzato a fondo per rispecchiare l'identità del brand.`,
    desc2:
      "Ogni pagina è stata progettata per la conversione: caricamento rapido, navigazione chiara e un'esperienza d'acquisto fluida dalla prima visita al checkout.",
    chal: [
      'Il brand aveva bisogno di più di un template standard: un negozio distintivo che presentasse il catalogo con chiarezza, fosse facile da gestire ogni giorno e trasformasse i visitatori in clienti.',
      'Doveva inoltre restare veloce e impeccabile su mobile, da cui arriva gran parte del traffico, lasciando al team piena libertà di aggiornare i contenuti senza toccare il codice.',
    ],
    solTpl: (theme) =>
      `Ho personalizzato il tema ${theme} sezione per sezione — layout, tipografia e sistema colori — e strutturato collezioni, pagine prodotto e navigazione attorno al modo in cui i clienti acquistano davvero.`,
    sol2:
      'Oltre al negozio, ho configurato le app essenziali e automatizzato i flussi ripetitivi: ordini, inventario e marketing girano con il minimo lavoro manuale.',
    res: [
      "Il negozio è stato lanciato in tempi rapidi con ottimi punteggi di performance, un'esperienza di brand coerente su ogni dispositivo e un percorso d'acquisto chiaro e orientato alla conversione.",
      'Il team ora gestisce prodotti, contenuti e campagne in autonomia: un negozio che cresce con il brand invece di rallentarlo.',
    ],
  },
  de: {
    category: 'E-COMMERCE',
    services: 'E-COMMERCE-ENTWICKLUNG',
    monthsShort: ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ'],
    monthsFull: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    formatPublished: (d, m, y) => `${d}. ${m} ${y}`,
    industries: {
      hehku: 'Hautpflege & Beauty', bubbly: 'Essen & Getränke', magic: 'Beauty & Hautpflege', throne: 'Audio & Elektronik', luxe: 'Luxusparfüm',
      lensrappa: 'Brillen', amour: 'Taschen & Gepäck', radiance: 'Schmuck & Accessoires', phenomena: 'Kosmetik & Make-up', noblesse: 'Kaffee & Zubehör',
    },
    niches: {
      hehku: 'nordische Hautpflegemarke mit frischen, fruchtigen Formeln',
      bubbly: 'Bio-Kombucha-Marke mit knalligen, bunten Sorten',
      magic: 'Marke für natürliche Beauty- und Körperpflege — Seren, Cremes und Body Butter',
      throne: 'Audio- und Tech-Marke — Kopfhörer, Earbuds und smarte Lautsprecher',
      luxe: 'französische Luxus-Parfümmarke',
      lensrappa: 'Premium-Brillenmarke',
      amour: 'Marke für Taschen und Gepäck für Reisen und Alltag',
      radiance: 'Marke für feinen Schmuck',
      phenomena: 'mutige Kosmetikmarke',
      noblesse: 'Premium-Marke für Kaffee und Zubehör für ein stilvolles Morgenritual',
    },
    descTpl: (name, niche, theme) =>
      `${name} ist eine ${niche}, aufgebaut auf Shopify mit einem tief angepassten ${theme}-Theme, das die Identität der Marke widerspiegelt.`,
    desc2:
      'Jede Seite wurde auf Conversion ausgelegt: schnelle Ladezeiten, klare Navigation und ein Einkaufserlebnis, das vom ersten Besuch bis zum Checkout mühelos wirkt.',
    chal: [
      'Die Marke brauchte mehr als ein Template von der Stange: einen unverwechselbaren Shop, der den Katalog klar präsentiert, sich im Alltag leicht pflegen lässt und Besucher zu Kunden macht.',
      'Er musste außerdem auf dem Smartphone — woher der Großteil des Traffics kommt — schnell und makellos bleiben und dem Team volle Freiheit lassen, Inhalte ohne Code zu aktualisieren.',
    ],
    solTpl: (theme) =>
      `Ich habe das ${theme}-Theme Sektion für Sektion angepasst — Layout, Typografie und Farbsystem — und Kollektionen, Produktseiten und Navigation danach strukturiert, wie Kunden wirklich einkaufen.`,
    sol2:
      'Zusätzlich habe ich die wichtigsten Apps eingerichtet und wiederkehrende Abläufe automatisiert: Bestellungen, Lagerbestand und Marketing laufen mit minimalem Handaufwand.',
    res: [
      'Der Shop ging schnell live — mit hervorragenden Performance-Werten, einem einheitlichen Markenerlebnis auf jedem Gerät und einer klaren, conversion-orientierten Customer Journey.',
      'Das Team verwaltet Produkte, Inhalte und Kampagnen jetzt eigenständig — ein Shop, der mit der Marke wächst, statt sie zu bremsen.',
    ],
  },
};

// ---- AI case studies ----
// Each one: id, category, pictures (/public/projects/<id>-1.png … -N.png),
// stack tools (language-independent) and localized copy in all 5 languages.
type StudyCopy = {
  category: string;
  services: string;
  client: string;
  industry: string;
  /** Stack layer labels, one per entry in `tools`. */
  layers: string[];
  description: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
};

type Study = {
  id: string;
  kind: ProjectKind;
  title: string;
  imageCount: number;
  date: [day: number, month: number, year: number];
  tools: string[];
  /** Screenshot ratio, width/height, for the detail-page carousel. */
  aspect: string;
  /** Picture file type — defaults to png. */
  ext?: 'png' | 'jpg';
  fit?: 'cover' | 'contain';
  copy: Record<Lang, StudyCopy>;
};

// ---- AXIOM voice agent ----
// Facts, numbers and stack come from the repo README, FEATURES.md and
// benchmarks/BENCHMARK_ANALYSIS_REPORT.md. Images: 3 UI screenshots, then
// architecture and benchmark charts. No walkthrough video in the repo.
const AXIOM_TOOLS = [
  'Web Audio (AudioWorklet) · Silero VAD · Sherpa-ONNX Parakeet 0.6B (INT8)',
  'SetFit · sentence-transformers · RapidFuzz',
  'Semantic RAG on in-memory NumPy embeddings · Ollama local LLM (GGUF, Q4)',
  'Kokoro-EN via Sherpa-ONNX · phonetic + safe text correctors',
  'Python · FastAPI · Uvicorn · WebSockets · SQLite',
  'HTML / JavaScript · Three.js · model-viewer (GLB, WebGL)',
];

const AXIOM_COPY: Record<Lang, StudyCopy> = {
  en: {
    category: 'AI · VOICE AGENT',
    services: 'VOICE AI · RAG · LOCAL LLM',
    client: 'Open source',
    industry: 'Robotics & Edge AI',
    layers: ['Speech in', 'Understanding', 'Knowledge & reasoning', 'Speech out', 'Backend', 'Frontend'],
    description: [
      'AXIOM is an offline voice assistant for a robotics lab. You speak, it answers out loud, and when you name a piece of equipment (a Unitree Go2, a Jetson Orin, a 6-DOF arm) its 3D model opens in a WebGL carousel next to the answer.',
      'The whole pipeline runs locally on one laptop GPU: speech recognition, intent detection, retrieval, a local LLM and speech synthesis. No cloud API, no cost per query, and no audio leaves the machine.',
    ],
    challenges: [
      'A voice agent feels broken after a second or two of silence, and cloud pipelines such as Whisper + GPT or hosted voice APIs often take 1 to 5 seconds. The goal was to answer faster than that, fully offline.',
      'Everything, including the LLM and the 3D models, had to fit in the 4 GB of VRAM on a GTX 1650. That ruled out Whisper (about 1.5 GB) and heavier TTS models, and every component had to earn its memory.',
    ],
    solutions: [
      'The browser streams microphone audio over a WebSocket to a FastAPI server. Silero VAD cuts it into speech segments, Sherpa-ONNX Parakeet (INT8) transcribes them, and a SetFit classifier tags the intent in about 5 ms.',
      'High-confidence intents skip the LLM and answer from 2,116 prepared templates. Everything else goes to semantic RAG over 1,806 technical facts, 325 project ideas and the equipment inventory, kept as in-memory NumPy embeddings instead of a vector database, and then to a quantized local LLM through Ollama.',
      'Before anything is spoken, two correctors clean the text: markdown and noise are stripped, units are expanded (5m becomes "5 meters") and robotics terms are normalized. Kokoro TTS reads it through a sequential queue so replies never overlap. The last five exchanges are stored in SQLite, so a follow-up like "does it support cameras?" knows what "it" is.',
    ],
    results: [
      'Measured on a GTX 1650 laptop: about 405 ms end to end on the template path and about 1.15 s on the RAG + LLM path. Voice detection takes 0.16 ms per audio chunk and intent classification 5 ms.',
      'The full system runs in about 3.6 GB of VRAM with zero cloud calls. 3D models load on demand with at most three in GPU memory at once, so the carousel stays smooth while the agent talks.',
    ],
  },
  fr: {
    category: 'IA · AGENT VOCAL',
    services: 'IA VOCALE · RAG · LLM LOCAL',
    client: 'Open source',
    industry: 'Robotique & Edge AI',
    layers: ['Entrée vocale', 'Compréhension', 'Connaissances & raisonnement', 'Sortie vocale', 'Backend', 'Frontend'],
    description: [
      "AXIOM est un assistant vocal hors ligne pour un laboratoire de robotique. On lui parle, il répond à voix haute, et quand on cite un équipement (un Unitree Go2, une Jetson Orin, un bras 6 axes), son modèle 3D s'ouvre dans un carrousel WebGL à côté de la réponse.",
      "Tout le pipeline tourne en local sur le GPU d'un seul portable : reconnaissance vocale, détection d'intention, recherche, LLM local et synthèse vocale. Aucune API cloud, aucun coût par requête, et aucun son ne quitte la machine.",
    ],
    challenges: [
      "Un agent vocal paraît cassé après une ou deux secondes de silence, et les pipelines cloud comme Whisper + GPT ou les API vocales hébergées mettent souvent 1 à 5 secondes. L'objectif : répondre plus vite, entièrement hors ligne.",
      "Tout, LLM et modèles 3D compris, devait tenir dans les 4 Go de VRAM d'une GTX 1650. Cela excluait Whisper (environ 1,5 Go) et les modèles TTS plus lourds : chaque composant devait justifier sa mémoire.",
    ],
    solutions: [
      "Le navigateur envoie l'audio du micro en WebSocket à un serveur FastAPI. Silero VAD découpe les segments de parole, Sherpa-ONNX Parakeet (INT8) les transcrit, et un classifieur SetFit identifie l'intention en 5 ms environ.",
      "Les intentions à forte confiance évitent le LLM et puisent dans 2 116 réponses préparées. Le reste passe par un RAG sémantique sur 1 806 faits techniques, 325 idées de projets et l'inventaire du labo, stockés en embeddings NumPy en mémoire plutôt que dans une base vectorielle, puis par un LLM local quantifié via Ollama.",
      "Avant la lecture, deux correcteurs nettoient le texte : markdown et bruit supprimés, unités développées (« 5m » devient « 5 mètres »), termes de robotique normalisés. Kokoro TTS lit la réponse via une file séquentielle pour que rien ne se chevauche. Les cinq derniers échanges sont gardés dans SQLite, donc une relance comme « il gère les caméras ? » sait de quoi on parle.",
    ],
    results: [
      "Mesuré sur un portable équipé d'une GTX 1650 : environ 405 ms de bout en bout sur le chemin des réponses préparées, environ 1,15 s sur le chemin RAG + LLM. La détection de voix prend 0,16 ms par segment audio, la classification d'intention 5 ms.",
      "Le système complet tient dans environ 3,6 Go de VRAM, sans aucun appel cloud. Les modèles 3D se chargent à la demande, trois au maximum en mémoire GPU, pour que le carrousel reste fluide pendant que l'agent parle.",
    ],
  },
  es: {
    category: 'IA · AGENTE DE VOZ',
    services: 'IA DE VOZ · RAG · LLM LOCAL',
    client: 'Código abierto',
    industry: 'Robótica y Edge AI',
    layers: ['Entrada de voz', 'Comprensión', 'Conocimiento y razonamiento', 'Salida de voz', 'Backend', 'Frontend'],
    description: [
      'AXIOM es un asistente de voz sin conexión para un laboratorio de robótica. Le hablas, responde en voz alta y, cuando nombras un equipo (un Unitree Go2, una Jetson Orin, un brazo de 6 ejes), su modelo 3D se abre en un carrusel WebGL junto a la respuesta.',
      'Todo el pipeline funciona en local en la GPU de un solo portátil: reconocimiento de voz, detección de intención, recuperación, un LLM local y síntesis de voz. Sin API en la nube, sin coste por consulta y sin que el audio salga del equipo.',
    ],
    challenges: [
      'Un agente de voz parece roto tras uno o dos segundos de silencio, y los pipelines en la nube como Whisper + GPT o las API de voz alojadas suelen tardar de 1 a 5 segundos. El objetivo era responder más rápido, totalmente sin conexión.',
      'Todo, incluido el LLM y los modelos 3D, tenía que caber en los 4 GB de VRAM de una GTX 1650. Eso descartó Whisper (unos 1,5 GB) y modelos TTS más pesados: cada componente tenía que justificar su memoria.',
    ],
    solutions: [
      'El navegador envía el audio del micrófono por WebSocket a un servidor FastAPI. Silero VAD separa los segmentos de voz, Sherpa-ONNX Parakeet (INT8) los transcribe y un clasificador SetFit detecta la intención en unos 5 ms.',
      'Las intenciones con alta confianza evitan el LLM y responden desde 2.116 plantillas preparadas. El resto pasa por un RAG semántico sobre 1.806 datos técnicos, 325 ideas de proyecto y el inventario del laboratorio, guardados como embeddings NumPy en memoria en lugar de una base vectorial, y después por un LLM local cuantizado mediante Ollama.',
      'Antes de hablar, dos correctores limpian el texto: se quitan el markdown y el ruido, se expanden las unidades («5m» pasa a «5 metros») y se normalizan los términos de robótica. Kokoro TTS lo lee con una cola secuencial para que las respuestas no se solapen. Los últimos cinco intercambios se guardan en SQLite, así que una pregunta como «¿admite cámaras?» sabe a qué se refiere.',
    ],
    results: [
      'Medido en un portátil con GTX 1650: unos 405 ms de extremo a extremo en la ruta de plantillas y unos 1,15 s en la ruta RAG + LLM. La detección de voz tarda 0,16 ms por fragmento de audio y la clasificación de intención 5 ms.',
      'El sistema completo funciona con unos 3,6 GB de VRAM y ninguna llamada a la nube. Los modelos 3D se cargan bajo demanda, con un máximo de tres en memoria de GPU, para que el carrusel siga fluido mientras el agente habla.',
    ],
  },
  it: {
    category: 'IA · AGENTE VOCALE',
    services: 'IA VOCALE · RAG · LLM LOCALE',
    client: 'Open source',
    industry: 'Robotica ed Edge AI',
    layers: ['Input vocale', 'Comprensione', 'Conoscenza e ragionamento', 'Output vocale', 'Backend', 'Frontend'],
    description: [
      'AXIOM è un assistente vocale offline per un laboratorio di robotica. Gli parli, risponde ad alta voce e, quando nomini un dispositivo (un Unitree Go2, una Jetson Orin, un braccio a 6 assi), il suo modello 3D si apre in un carosello WebGL accanto alla risposta.',
      "L'intera pipeline gira in locale sulla GPU di un solo portatile: riconoscimento vocale, rilevamento dell'intento, recupero, un LLM locale e sintesi vocale. Nessuna API cloud, nessun costo per richiesta e nessun audio lascia la macchina.",
    ],
    challenges: [
      "Un agente vocale sembra rotto dopo uno o due secondi di silenzio, e le pipeline cloud come Whisper + GPT o le API vocali ospitate impiegano spesso da 1 a 5 secondi. L'obiettivo era rispondere più in fretta, completamente offline.",
      'Tutto, LLM e modelli 3D compresi, doveva stare nei 4 GB di VRAM di una GTX 1650. Questo escludeva Whisper (circa 1,5 GB) e modelli TTS più pesanti: ogni componente doveva giustificare la propria memoria.',
    ],
    solutions: [
      "Il browser invia l'audio del microfono via WebSocket a un server FastAPI. Silero VAD separa i segmenti di parlato, Sherpa-ONNX Parakeet (INT8) li trascrive e un classificatore SetFit riconosce l'intento in circa 5 ms.",
      "Gli intenti ad alta confidenza saltano l'LLM e rispondono da 2.116 template preparati. Il resto passa a un RAG semantico su 1.806 fatti tecnici, 325 idee di progetto e l'inventario del laboratorio, tenuti come embedding NumPy in memoria invece che in un database vettoriale, e poi a un LLM locale quantizzato tramite Ollama.",
      'Prima della voce, due correttori puliscono il testo: markdown e rumore rimossi, unità espanse («5m» diventa «5 metri»), termini di robotica normalizzati. Kokoro TTS lo legge tramite una coda sequenziale, così le risposte non si sovrappongono. Gli ultimi cinque scambi restano in SQLite, quindi una domanda come «supporta le telecamere?» sa a cosa si riferisce.',
    ],
    results: [
      "Misurato su un portatile con GTX 1650: circa 405 ms end-to-end sul percorso dei template e circa 1,15 s sul percorso RAG + LLM. Il rilevamento vocale richiede 0,16 ms per blocco audio, la classificazione dell'intento 5 ms.",
      "L'intero sistema gira in circa 3,6 GB di VRAM, senza chiamate cloud. I modelli 3D si caricano su richiesta, al massimo tre in memoria GPU, così il carosello resta fluido mentre l'agente parla.",
    ],
  },
  de: {
    category: 'KI · SPRACHAGENT',
    services: 'VOICE AI · RAG · LOKALES LLM',
    client: 'Open Source',
    industry: 'Robotik & Edge AI',
    layers: ['Spracheingabe', 'Verständnis', 'Wissen & Reasoning', 'Sprachausgabe', 'Backend', 'Frontend'],
    description: [
      'AXIOM ist ein Offline-Sprachassistent für ein Robotik-Labor. Man spricht, er antwortet laut, und sobald man ein Gerät nennt (einen Unitree Go2, einen Jetson Orin, einen 6-Achs-Arm), öffnet sich dessen 3D-Modell in einem WebGL-Karussell neben der Antwort.',
      'Die gesamte Pipeline läuft lokal auf der GPU eines einzigen Laptops: Spracherkennung, Intent-Erkennung, Retrieval, ein lokales LLM und Sprachsynthese. Keine Cloud-API, keine Kosten pro Anfrage, und kein Audio verlässt den Rechner.',
    ],
    challenges: [
      'Ein Sprachagent wirkt nach ein bis zwei Sekunden Stille kaputt, und Cloud-Pipelines wie Whisper + GPT oder gehostete Voice-APIs brauchen oft 1 bis 5 Sekunden. Ziel war, schneller zu antworten, komplett offline.',
      'Alles, einschließlich LLM und 3D-Modellen, musste in die 4 GB VRAM einer GTX 1650 passen. Das schloss Whisper (rund 1,5 GB) und schwerere TTS-Modelle aus: Jede Komponente musste ihren Speicher rechtfertigen.',
    ],
    solutions: [
      'Der Browser streamt das Mikrofon-Audio per WebSocket an einen FastAPI-Server. Silero VAD trennt die Sprachsegmente, Sherpa-ONNX Parakeet (INT8) transkribiert sie, und ein SetFit-Klassifikator erkennt den Intent in etwa 5 ms.',
      'Intents mit hoher Konfidenz überspringen das LLM und antworten aus 2.116 vorbereiteten Templates. Alles andere geht an ein semantisches RAG über 1.806 technische Fakten, 325 Projektideen und das Laborinventar, gehalten als NumPy-Embeddings im Arbeitsspeicher statt in einer Vektordatenbank, und dann an ein quantisiertes lokales LLM über Ollama.',
      'Vor der Ausgabe säubern zwei Korrektoren den Text: Markdown und Störtokens werden entfernt, Einheiten ausgeschrieben („5m“ wird zu „5 Meter“) und Robotik-Begriffe normalisiert. Kokoro TTS liest ihn über eine sequenzielle Warteschlange vor, damit sich Antworten nie überlagern. Die letzten fünf Wechsel liegen in SQLite, sodass eine Nachfrage wie „unterstützt es Kameras?“ weiß, worum es geht.',
    ],
    results: [
      'Gemessen auf einem Laptop mit GTX 1650: etwa 405 ms Ende-zu-Ende auf dem Template-Pfad und etwa 1,15 s auf dem RAG- + LLM-Pfad. Die Spracherkennung braucht 0,16 ms pro Audio-Chunk, die Intent-Klassifikation 5 ms.',
      'Das komplette System läuft mit rund 3,6 GB VRAM und ohne einen einzigen Cloud-Aufruf. 3D-Modelle laden bei Bedarf, höchstens drei gleichzeitig im GPU-Speicher, damit das Karussell flüssig bleibt, während der Agent spricht.',
    ],
  },
};

// ---- AI Lead Qualifier (lead generation) ----
// Facts and numbers from the repo README and PORTFOLIO.md. Images: workflow,
// CRM + alerts, live execution, error alert, lead form, real-LLM CRM view.
const LEAD_TOOLS = [
  'n8n Webhook · Gmail trigger · Tally, Typeform or any HTML form',
  'OpenAI-compatible LLM (OpenAI, Claude, Bedrock, OpenRouter) · JSON-schema validation',
  'HubSpot batch upsert · Airtable performUpsert · Google Sheets via Apps Script',
  'Telegram Bot API · Resend-compatible email API',
  'n8n Error Trigger workflow · retries on rate limits · cost per lead logged',
  'Node test runner · pytest · Python mock APIs and dashboard',
];

const LEAD_COPY: Record<Lang, StudyCopy> = {
  en: {
    category: 'AI · LEAD GENERATION',
    services: 'N8N · LLM SCORING · CRM AUTOMATION',
    client: 'Open source',
    industry: 'Sales & B2B services',
    layers: ['Lead intake', 'AI scoring', 'CRM', 'Alerts', 'Reliability', 'Testing'],
    description: [
      'AI Lead Qualifier is an n8n workflow that takes every inbound lead from a web form or email, scores it with an LLM from 0 to 100 with a written reason, and writes it to the CRM. Hot leads reach the sales team on Telegram and by email within seconds, with a first reply already drafted.',
      'One setting switches the CRM between HubSpot, Airtable and Google Sheets, and the model can be OpenAI, Claude or any OpenAI-compatible endpoint.',
    ],
    challenges: [
      "Leads came in from forms and email and waited hours for a reply. Spam took up the reps' time, and hot prospects went cold before anyone called.",
      'Putting an LLM in the loop adds its own risks: malformed output, rate limits and failing APIs can drop a lead without anyone noticing, and the cost per lead has to stay visible.',
    ],
    solutions: [
      'A webhook receives the lead, and a code node normalizes the fields, validates the email and derives the company domain. The LLM returns structured JSON: score, tier, reason, intent, budget, timeline and a suggested reply.',
      'Every answer is checked against a JSON schema. An invalid one gets a single strict retry, then falls back to a "Needs review" tier, so no lead is silently dropped. Records are upserted by email, so each contact exists once in HubSpot, Airtable or Google Sheets.',
      'Leads scoring 70 or more trigger a Telegram message and an email with name, company, score, reason and reply. A separate error workflow catches any failed node and posts it to Telegram and an Errors sheet, and a token cap plus a cost column keep spending in view.',
    ],
    results: [
      'With a real model (Kimi K3 on Amazon Bedrock), each lead costs about $0.008 and goes from form to CRM in 2 to 8 seconds, well under the 30-second target.',
      'The workflow is covered by 15 JavaScript unit tests, 18 Python contract tests and 6 end-to-end tests run against each of the 3 CRM targets, all passing.',
    ],
  },
  fr: {
    category: 'IA · GÉNÉRATION DE LEADS',
    services: 'N8N · SCORING LLM · AUTOMATISATION CRM',
    client: 'Open source',
    industry: 'Ventes & services B2B',
    layers: ['Collecte des leads', 'Scoring IA', 'CRM', 'Alertes', 'Fiabilité', 'Tests'],
    description: [
      "AI Lead Qualifier est un workflow n8n qui reçoit chaque lead entrant, depuis un formulaire web ou un e-mail, le note de 0 à 100 avec un LLM et une justification écrite, puis l'enregistre dans le CRM. Les leads chauds arrivent à l'équipe commerciale sur Telegram et par e-mail en quelques secondes, avec une première réponse déjà rédigée.",
      "Un seul réglage fait passer le CRM de HubSpot à Airtable ou Google Sheets, et le modèle peut être OpenAI, Claude ou n'importe quel endpoint compatible OpenAI.",
    ],
    challenges: [
      "Les leads arrivaient par formulaire et par e-mail et attendaient des heures une réponse. Le spam occupait les commerciaux, et les prospects chauds refroidissaient avant le premier appel.",
      "Mettre un LLM dans la boucle ajoute ses propres risques : réponse mal formée, limites de débit ou API en panne peuvent faire perdre un lead sans que personne ne le voie, et le coût par lead doit rester visible.",
    ],
    solutions: [
      "Un webhook reçoit le lead, et un nœud de code normalise les champs, vérifie l'e-mail et déduit le domaine de l'entreprise. Le LLM renvoie un JSON structuré : score, niveau, justification, intention, budget, délai et réponse suggérée.",
      "Chaque réponse est validée par un schéma JSON. Une réponse invalide a droit à une nouvelle tentative stricte, puis passe au niveau « À vérifier » : aucun lead n'est perdu en silence. Les fiches sont mises à jour par e-mail, donc chaque contact n'existe qu'une fois dans HubSpot, Airtable ou Google Sheets.",
      "Au-delà d'un score de 70, un message Telegram et un e-mail partent avec le nom, l'entreprise, le score, la justification et la réponse. Un workflow d'erreur séparé intercepte tout nœud en échec et le signale sur Telegram et dans une feuille Erreurs ; un plafond de tokens et une colonne de coût gardent les dépenses sous les yeux.",
    ],
    results: [
      "Avec un vrai modèle (Kimi K3 sur Amazon Bedrock), chaque lead coûte environ 0,008 $ et passe du formulaire au CRM en 2 à 8 secondes, bien en dessous de l'objectif de 30 secondes.",
      'Le workflow est couvert par 15 tests unitaires JavaScript, 18 tests de contrat Python et 6 tests de bout en bout exécutés sur chacune des 3 cibles CRM, tous au vert.',
    ],
  },
  es: {
    category: 'IA · GENERACIÓN DE LEADS',
    services: 'N8N · SCORING CON LLM · AUTOMATIZACIÓN CRM',
    client: 'Código abierto',
    industry: 'Ventas y servicios B2B',
    layers: ['Captación de leads', 'Scoring con IA', 'CRM', 'Alertas', 'Fiabilidad', 'Pruebas'],
    description: [
      'AI Lead Qualifier es un workflow de n8n que recibe cada lead entrante desde un formulario web o un correo, lo puntúa de 0 a 100 con un LLM y una justificación escrita, y lo guarda en el CRM. Los leads calientes llegan al equipo de ventas por Telegram y por correo en segundos, con una primera respuesta ya redactada.',
      'Un solo ajuste cambia el CRM entre HubSpot, Airtable y Google Sheets, y el modelo puede ser OpenAI, Claude o cualquier endpoint compatible con OpenAI.',
    ],
    challenges: [
      'Los leads llegaban por formularios y correo y esperaban horas una respuesta. El spam ocupaba a los comerciales y los prospectos calientes se enfriaban antes de la primera llamada.',
      'Meter un LLM en el proceso añade sus propios riesgos: una respuesta mal formada, límites de uso o una API caída pueden perder un lead sin que nadie lo note, y el coste por lead tiene que seguir a la vista.',
    ],
    solutions: [
      'Un webhook recibe el lead y un nodo de código normaliza los campos, valida el correo y obtiene el dominio de la empresa. El LLM devuelve un JSON estructurado: puntuación, nivel, motivo, intención, presupuesto, plazo y respuesta sugerida.',
      'Cada respuesta se valida con un esquema JSON. Una inválida tiene un único reintento estricto y después pasa al nivel «Revisar», así que ningún lead se pierde en silencio. Los registros se actualizan por correo, de modo que cada contacto existe una sola vez en HubSpot, Airtable o Google Sheets.',
      'Con 70 puntos o más se envían un mensaje de Telegram y un correo con nombre, empresa, puntuación, motivo y respuesta. Un workflow de errores aparte captura cualquier nodo que falle y lo avisa en Telegram y en una hoja de Errores; un tope de tokens y una columna de coste mantienen el gasto a la vista.',
    ],
    results: [
      'Con un modelo real (Kimi K3 en Amazon Bedrock), cada lead cuesta unos 0,008 $ y pasa del formulario al CRM en 2 a 8 segundos, muy por debajo del objetivo de 30 segundos.',
      'El workflow está cubierto por 15 pruebas unitarias en JavaScript, 18 pruebas de contrato en Python y 6 pruebas de extremo a extremo ejecutadas contra cada uno de los 3 CRM, todas en verde.',
    ],
  },
  it: {
    category: 'IA · LEAD GENERATION',
    services: 'N8N · SCORING LLM · AUTOMAZIONE CRM',
    client: 'Open source',
    industry: 'Vendite e servizi B2B',
    layers: ['Acquisizione lead', 'Scoring IA', 'CRM', 'Avvisi', 'Affidabilità', 'Test'],
    description: [
      "AI Lead Qualifier è un workflow n8n che riceve ogni lead in entrata da un modulo web o un'e-mail, gli dà un punteggio da 0 a 100 con un LLM e una motivazione scritta, e lo salva nel CRM. I lead caldi arrivano al team vendite su Telegram e via e-mail in pochi secondi, con una prima risposta già scritta.",
      "Una sola impostazione cambia il CRM tra HubSpot, Airtable e Google Sheets, e il modello può essere OpenAI, Claude o qualsiasi endpoint compatibile con OpenAI.",
    ],
    challenges: [
      'I lead arrivavano da moduli ed e-mail e aspettavano ore una risposta. Lo spam teneva occupati i commerciali e i prospect caldi si raffreddavano prima della prima chiamata.',
      "Inserire un LLM nel processo porta rischi propri: una risposta malformata, limiti di utilizzo o un'API che non risponde possono far perdere un lead senza che nessuno se ne accorga, e il costo per lead deve restare visibile.",
    ],
    solutions: [
      "Un webhook riceve il lead e un nodo di codice normalizza i campi, verifica l'e-mail e ricava il dominio aziendale. L'LLM restituisce un JSON strutturato: punteggio, livello, motivazione, intento, budget, tempistiche e risposta suggerita.",
      "Ogni risposta viene validata con uno schema JSON. Una risposta non valida ha un solo nuovo tentativo rigoroso, poi passa al livello «Da verificare», così nessun lead si perde in silenzio. I record vengono aggiornati per e-mail, quindi ogni contatto esiste una sola volta in HubSpot, Airtable o Google Sheets.",
      "Da 70 punti in su partono un messaggio Telegram e un'e-mail con nome, azienda, punteggio, motivazione e risposta. Un workflow di errore separato intercetta qualsiasi nodo fallito e lo segnala su Telegram e in un foglio Errori; un limite di token e una colonna dei costi tengono sotto controllo la spesa.",
    ],
    results: [
      "Con un modello reale (Kimi K3 su Amazon Bedrock) ogni lead costa circa 0,008 $ e passa dal modulo al CRM in 2-8 secondi, ben sotto l'obiettivo di 30 secondi.",
      'Il workflow è coperto da 15 test unitari JavaScript, 18 test di contratto Python e 6 test end-to-end eseguiti su ciascuno dei 3 CRM, tutti superati.',
    ],
  },
  de: {
    category: 'KI · LEADGENERIERUNG',
    services: 'N8N · LLM-SCORING · CRM-AUTOMATISIERUNG',
    client: 'Open Source',
    industry: 'Vertrieb & B2B-Dienstleistungen',
    layers: ['Lead-Eingang', 'KI-Scoring', 'CRM', 'Benachrichtigungen', 'Zuverlässigkeit', 'Tests'],
    description: [
      'AI Lead Qualifier ist ein n8n-Workflow, der jeden eingehenden Lead aus einem Webformular oder einer E-Mail annimmt, ihn per LLM mit 0 bis 100 Punkten samt schriftlicher Begründung bewertet und ins CRM schreibt. Heiße Leads landen innerhalb von Sekunden per Telegram und E-Mail beim Vertrieb, mit einer bereits formulierten ersten Antwort.',
      'Eine einzige Einstellung wechselt das CRM zwischen HubSpot, Airtable und Google Sheets, und als Modell dient OpenAI, Claude oder jeder OpenAI-kompatible Endpunkt.',
    ],
    challenges: [
      'Leads kamen über Formulare und E-Mail und warteten stundenlang auf eine Antwort. Spam band den Vertrieb, und heiße Interessenten kühlten ab, bevor jemand anrief.',
      'Ein LLM im Ablauf bringt eigene Risiken: fehlerhafte Ausgaben, Rate-Limits und ausgefallene APIs können einen Lead unbemerkt verlieren, und die Kosten pro Lead müssen sichtbar bleiben.',
    ],
    solutions: [
      'Ein Webhook nimmt den Lead an, ein Code-Node normalisiert die Felder, prüft die E-Mail und ermittelt die Firmendomain. Das LLM liefert strukturiertes JSON: Score, Stufe, Begründung, Absicht, Budget, Zeitrahmen und eine vorgeschlagene Antwort.',
      'Jede Antwort wird gegen ein JSON-Schema geprüft. Eine ungültige bekommt genau einen strengen zweiten Versuch und landet danach in der Stufe „Prüfen“, sodass kein Lead stillschweigend verloren geht. Datensätze werden per E-Mail upserted, jeder Kontakt existiert also nur einmal in HubSpot, Airtable oder Google Sheets.',
      'Ab 70 Punkten gehen eine Telegram-Nachricht und eine E-Mail mit Name, Firma, Score, Begründung und Antwort raus. Ein separater Fehler-Workflow fängt jeden fehlgeschlagenen Node ab und meldet ihn in Telegram und einem Fehler-Sheet; ein Token-Limit und eine Kostenspalte halten die Ausgaben im Blick.',
    ],
    results: [
      'Mit einem echten Modell (Kimi K3 auf Amazon Bedrock) kostet ein Lead rund 0,008 $ und ist in 2 bis 8 Sekunden vom Formular im CRM, deutlich unter dem Ziel von 30 Sekunden.',
      'Der Workflow ist durch 15 JavaScript-Unit-Tests, 18 Python-Vertragstests und 6 End-to-End-Tests abgedeckt, die gegen jedes der 3 CRM-Ziele laufen – alle grün.',
    ],
  },
};

// ---- AI Lead Routing & CRM Automation ----
// Facts from the repo README. Its demo results come from the built-in mock
// analyzer (no live model), and the copy says so. Images: workflow canvas,
// demo execution, CRM record output.
const CRM_TOOLS = [
  'n8n Webhook · field aliases for any form · lead normalization',
  'Anthropic Messages API or any OpenAI-compatible API · deterministic mock analyzer for demos',
  'Rule-based 0–100 score · n8n Switch router (HOT, WARM, COLD, SPAM, DUPLICATE, NEEDS_REVIEW)',
  'AI-drafted replies with placeholders · scanned for prices, dates and guarantees',
  'n8n Data Tables · Google Sheets · HubSpot · any CRM API',
  'Prompt-injection flags · data minimization · offline Node tests · Docker end-to-end run',
];

const CRM_COPY: Record<Lang, StudyCopy> = {
  en: {
    category: 'AI · CRM AUTOMATION',
    services: 'N8N · LEAD ROUTING · CRM',
    client: 'Open source',
    industry: 'Sales operations',
    layers: ['Intake', 'AI analysis', 'Scoring & routing', 'Follow-up', 'CRM output', 'Safety & testing'],
    description: [
      'An n8n workflow that takes incoming sales leads, cleans them up, scores and classifies them, routes them by quality, drafts a follow-up where one makes sense, assigns an owner and returns a CRM-ready record.',
      'Every decision is explainable: each lead gets a 0–100 score with a line-by-line breakdown, a route with priority, SLA and owner, and a draft reply for a person to review and send.',
    ],
    challenges: [
      'Inbound leads arrive from forms, chat widgets and ads in inconsistent shapes. Sales teams lose time on spam and duplicates, good leads wait hours for a reply, and nobody can explain why a lead was marked "hot".',
      "Lead text is written by strangers, so it can't be trusted: a message can try to give the AI instructions, and a drafted reply must never promise prices or dates on its own.",
    ],
    solutions: [
      'The AI rates six dimensions (budget, authority, need, urgency, service fit and company fit), and deterministic business rules turn those ratings into the score and the route. Spam, duplicates, missing fields and security flags override the score.',
      'Duplicates are caught by email, or by company plus last name. HOT leads go to senior sales with a 15–30 minute SLA, WARM leads within 4 hours, COLD leads to a nurture queue, and anything doubtful to Sales Ops for review.',
      'Lead text is treated as data, never as instructions: injection attempts are flagged, the AI only sees the email domain, and it can add risk flags but never clear them. There is no email node, so every follow-up stays a draft until a person sends it.',
    ],
    results: [
      'In a real n8n run on 7 test leads (using the built-in mock analyzer), every case landed where it should: an enterprise buyer scored 96 (HOT), a seed-stage SaaS 74 (WARM), a vague enquiry 34 (COLD), backlink spam 0 (SPAM), a repeat contact was marked DUPLICATE, and an incomplete lead and a prompt-injection attempt both went to review.',
      'If the AI is missing, fails or returns invalid output, the lead falls back to NEEDS_REVIEW with the raw data preserved, so nothing is lost.',
    ],
  },
  fr: {
    category: 'IA · AUTOMATISATION CRM',
    services: 'N8N · ROUTAGE DES LEADS · CRM',
    client: 'Open source',
    industry: 'Opérations commerciales',
    layers: ['Entrée', 'Analyse IA', 'Score & routage', 'Relance', 'Sortie CRM', 'Sécurité & tests'],
    description: [
      "Un workflow n8n qui reçoit les leads commerciaux, les nettoie, les note et les classe, les route selon leur qualité, rédige une relance quand elle a du sens, attribue un responsable et renvoie une fiche prête pour le CRM.",
      "Chaque décision est explicable : chaque lead reçoit un score de 0 à 100 détaillé ligne par ligne, une route avec priorité, délai de traitement et responsable, et un brouillon de réponse qu'une personne relit avant envoi.",
    ],
    challenges: [
      "Les leads arrivent des formulaires, des chats et des publicités dans des formats hétérogènes. Les commerciaux perdent du temps avec le spam et les doublons, les bons leads attendent des heures, et personne ne sait expliquer pourquoi un lead a été classé « chaud ».",
      "Le texte d'un lead est écrit par un inconnu, on ne peut donc pas s'y fier : un message peut tenter de donner des instructions à l'IA, et un brouillon ne doit jamais promettre de prix ou de date de lui-même.",
    ],
    solutions: [
      "L'IA évalue six critères (budget, pouvoir de décision, besoin, urgence, adéquation au service et à l'entreprise), puis des règles métier déterministes en tirent le score et la route. Spam, doublons, champs manquants et alertes de sécurité l'emportent sur le score.",
      "Les doublons sont détectés par e-mail, ou par entreprise et nom de famille. Les leads CHAUDS vont aux commerciaux seniors avec un délai de 15 à 30 minutes, les TIÈDES sous 4 heures, les FROIDS dans une séquence de nurturing, et tout cas douteux à l'équipe Sales Ops.",
      "Le texte du lead est traité comme une donnée, jamais comme une instruction : les tentatives d'injection sont signalées, l'IA ne voit que le domaine de l'e-mail, et elle peut ajouter des alertes sans jamais les retirer. Il n'y a aucun nœud d'envoi : chaque relance reste un brouillon jusqu'à ce qu'une personne l'envoie.",
    ],
    results: [
      "Lors d'une vraie exécution n8n sur 7 leads de test (avec l'analyseur simulé intégré), chaque cas a été bien classé : un grand compte noté 96 (CHAUD), une SaaS en amorçage 74 (TIÈDE), une demande vague 34 (FROID), du spam de backlinks 0 (SPAM), un contact en double marqué DOUBLON, et un lead incomplet comme une tentative d'injection envoyés en revue.",
      "Si l'IA est absente, échoue ou renvoie une réponse invalide, le lead passe en revue manuelle avec ses données brutes conservées : rien n'est perdu.",
    ],
  },
  es: {
    category: 'IA · AUTOMATIZACIÓN CRM',
    services: 'N8N · ENRUTAMIENTO DE LEADS · CRM',
    client: 'Código abierto',
    industry: 'Operaciones de ventas',
    layers: ['Entrada', 'Análisis con IA', 'Puntuación y enrutamiento', 'Seguimiento', 'Salida al CRM', 'Seguridad y pruebas'],
    description: [
      'Un workflow de n8n que recibe los leads de ventas, los limpia, los puntúa y clasifica, los enruta según su calidad, redacta un seguimiento cuando tiene sentido, asigna un responsable y devuelve un registro listo para el CRM.',
      'Cada decisión se puede explicar: cada lead recibe una puntuación de 0 a 100 desglosada línea por línea, una ruta con prioridad, plazo y responsable, y un borrador de respuesta que una persona revisa y envía.',
    ],
    challenges: [
      'Los leads llegan de formularios, chats y anuncios en formatos distintos. El equipo de ventas pierde tiempo con spam y duplicados, los buenos leads esperan horas y nadie sabe explicar por qué un lead se marcó como «caliente».',
      'El texto de un lead lo escribe un desconocido, así que no es fiable: un mensaje puede intentar dar instrucciones a la IA, y un borrador nunca debe prometer precios ni fechas por su cuenta.',
    ],
    solutions: [
      'La IA valora seis dimensiones (presupuesto, poder de decisión, necesidad, urgencia, encaje con el servicio y con la empresa), y unas reglas de negocio deterministas convierten esas valoraciones en la puntuación y la ruta. El spam, los duplicados, los campos vacíos y las alertas de seguridad se imponen a la puntuación.',
      'Los duplicados se detectan por correo, o por empresa y apellido. Los leads CALIENTES van a ventas sénior con un plazo de 15 a 30 minutos, los TEMPLADOS en 4 horas, los FRÍOS a una secuencia de nurturing y cualquier caso dudoso a Sales Ops para revisión.',
      'El texto del lead se trata como datos, nunca como instrucciones: los intentos de inyección se marcan, la IA solo ve el dominio del correo y puede añadir alertas pero nunca quitarlas. No hay nodo de envío, así que cada seguimiento queda como borrador hasta que una persona lo envía.',
    ],
    results: [
      'En una ejecución real de n8n con 7 leads de prueba (usando el analizador simulado incluido), cada caso quedó donde debía: un gran cliente con 96 (CALIENTE), una SaaS en fase semilla con 74 (TEMPLADO), una consulta vaga con 34 (FRÍO), spam de enlaces con 0 (SPAM), un contacto repetido marcado como DUPLICADO, y un lead incompleto y un intento de inyección enviados a revisión.',
      'Si la IA falta, falla o devuelve una respuesta no válida, el lead pasa a revisión manual con sus datos originales intactos, así que no se pierde nada.',
    ],
  },
  it: {
    category: 'IA · AUTOMAZIONE CRM',
    services: 'N8N · INSTRADAMENTO LEAD · CRM',
    client: 'Open source',
    industry: 'Operazioni di vendita',
    layers: ['Ingresso', 'Analisi IA', 'Punteggio e instradamento', 'Follow-up', 'Output CRM', 'Sicurezza e test'],
    description: [
      "Un workflow n8n che riceve i lead commerciali, li ripulisce, li valuta e li classifica, li instrada in base alla qualità, scrive un follow-up quando ha senso, assegna un responsabile e restituisce un record pronto per il CRM.",
      "Ogni decisione è spiegabile: ogni lead riceve un punteggio da 0 a 100 dettagliato riga per riga, un percorso con priorità, tempi di risposta e responsabile, e una bozza di risposta che una persona rivede e invia.",
    ],
    challenges: [
      "I lead arrivano da moduli, chat e annunci in formati diversi. Il team vendite perde tempo con spam e duplicati, i lead buoni aspettano ore e nessuno sa spiegare perché un lead è stato segnato come «caldo».",
      "Il testo di un lead lo scrive uno sconosciuto, quindi non è affidabile: un messaggio può cercare di dare istruzioni all'IA, e una bozza non deve mai promettere prezzi o date di sua iniziativa.",
    ],
    solutions: [
      "L'IA valuta sei dimensioni (budget, potere decisionale, esigenza, urgenza, adeguatezza al servizio e all'azienda), e regole di business deterministiche trasformano queste valutazioni nel punteggio e nel percorso. Spam, duplicati, campi mancanti e segnalazioni di sicurezza prevalgono sul punteggio.",
      "I duplicati vengono riconosciuti per e-mail, oppure per azienda e cognome. I lead CALDI vanno ai commerciali senior con tempi di 15-30 minuti, i TIEPIDI entro 4 ore, i FREDDI in una sequenza di nurturing e ogni caso dubbio al team Sales Ops per la verifica.",
      "Il testo del lead è trattato come dato, mai come istruzione: i tentativi di injection vengono segnalati, l'IA vede solo il dominio dell'e-mail e può aggiungere segnalazioni ma mai rimuoverle. Non c'è alcun nodo di invio, quindi ogni follow-up resta una bozza finché una persona non lo invia.",
    ],
    results: [
      "In un'esecuzione reale di n8n su 7 lead di prova (con l'analizzatore simulato incluso), ogni caso è finito al posto giusto: un grande cliente con 96 (CALDO), una SaaS in fase seed con 74 (TIEPIDO), una richiesta vaga con 34 (FREDDO), spam di backlink con 0 (SPAM), un contatto ripetuto segnato come DUPLICATO, e un lead incompleto e un tentativo di injection mandati in verifica.",
      "Se l'IA manca, fallisce o restituisce un output non valido, il lead passa alla verifica manuale con i dati originali conservati, quindi non si perde nulla.",
    ],
  },
  de: {
    category: 'KI · CRM-AUTOMATISIERUNG',
    services: 'N8N · LEAD-ROUTING · CRM',
    client: 'Open Source',
    industry: 'Vertriebsoperationen',
    layers: ['Eingang', 'KI-Analyse', 'Scoring & Routing', 'Follow-up', 'CRM-Ausgabe', 'Sicherheit & Tests'],
    description: [
      'Ein n8n-Workflow, der eingehende Vertriebsleads annimmt, bereinigt, bewertet und einordnet, nach Qualität weiterleitet, bei Bedarf ein Follow-up entwirft, einen Verantwortlichen zuweist und einen CRM-fertigen Datensatz zurückgibt.',
      'Jede Entscheidung ist nachvollziehbar: Jeder Lead erhält einen Score von 0 bis 100 mit Aufschlüsselung Zeile für Zeile, eine Route mit Priorität, Reaktionszeit und Verantwortlichem sowie einen Antwortentwurf, den ein Mensch prüft und versendet.',
    ],
    challenges: [
      'Leads kommen aus Formularen, Chat-Widgets und Anzeigen in uneinheitlichen Formaten. Der Vertrieb verliert Zeit mit Spam und Dubletten, gute Leads warten stundenlang, und niemand kann erklären, warum ein Lead als „heiß“ markiert wurde.',
      'Lead-Texte schreiben Fremde, man kann ihnen also nicht trauen: Eine Nachricht kann versuchen, der KI Anweisungen zu geben, und ein Antwortentwurf darf nie von sich aus Preise oder Termine zusagen.',
    ],
    solutions: [
      'Die KI bewertet sechs Dimensionen (Budget, Entscheidungsbefugnis, Bedarf, Dringlichkeit, Passung zum Service und zum Unternehmen), und deterministische Geschäftsregeln machen daraus Score und Route. Spam, Dubletten, fehlende Felder und Sicherheitsmarker haben Vorrang vor dem Score.',
      'Dubletten werden per E-Mail oder über Firma plus Nachname erkannt. HEISSE Leads gehen mit 15–30 Minuten Reaktionszeit an den Senior-Vertrieb, WARME innerhalb von 4 Stunden, KALTE in eine Nurturing-Sequenz und alles Zweifelhafte zur Prüfung an Sales Ops.',
      'Lead-Text wird als Daten behandelt, nie als Anweisung: Injection-Versuche werden markiert, die KI sieht nur die E-Mail-Domain und kann Risikomarker setzen, aber nie entfernen. Es gibt keinen Versand-Node, jedes Follow-up bleibt ein Entwurf, bis ein Mensch es abschickt.',
    ],
    results: [
      'In einem echten n8n-Lauf mit 7 Testleads (mit dem eingebauten Mock-Analyzer) landete jeder Fall richtig: ein Enterprise-Käufer mit 96 (HEISS), ein SaaS-Start-up mit 74 (WARM), eine vage Anfrage mit 34 (KALT), Backlink-Spam mit 0 (SPAM), ein wiederholter Kontakt als DUBLETTE markiert, und ein unvollständiger Lead sowie ein Prompt-Injection-Versuch gingen zur Prüfung.',
      'Fehlt die KI, schlägt sie fehl oder liefert eine ungültige Antwort, geht der Lead mit unveränderten Rohdaten in die manuelle Prüfung – es geht nichts verloren.',
    ],
  },
};

// ---- AI LinkedIn & Email Outreach ----
// Facts from the repo README (5 n8n workflows). Images: one workflow capture
// per stage — lead sourcing, personalization, outreach, new-connection
// messages, AI reply bot. The repo's branded banner is left out.
const OUTREACH_TOOLS = [
  'Apollo (ideal-customer search) · Apify (profile scraping) · Google Sheets',
  'SerpAPI web research · OpenAI agents with structured output parsers',
  'Unipile LinkedIn API (invites and messages) · Gmail API · randomized wait nodes',
  'Webhooks for accepted invites and new messages · AI reply bot',
  'Google Sheets status columns · PostgreSQL invite and email history · n8n on Docker or cloud',
];

const OUTREACH_COPY: Record<Lang, StudyCopy> = {
  en: {
    category: 'AI · LINKEDIN OUTREACH',
    services: 'N8N · AI PERSONALIZATION · LINKEDIN + EMAIL',
    client: 'Open source',
    industry: 'B2B sales & partnerships',
    layers: ['Lead sourcing', 'Research & personalization', 'Outreach', 'Engagement', 'Tracking'],
    description: [
      'A five-workflow n8n system that runs B2B outreach end to end: it finds leads that match the ideal customer profile, researches each person, writes a personalized LinkedIn invite and email, sends both, messages new connections and answers replies with AI.',
      'Each phase is its own workflow, so a failure in one step does not stop the others, and every action is logged.',
    ],
    challenges: [
      "Manual LinkedIn outreach doesn't scale: finding the right people, researching them and writing a message that doesn't read like a template takes most of a rep's day.",
      'Automating it has its own risks. Sending in bursts looks robotic, generic AI messages get ignored, and without tracking nobody knows who was contacted, who accepted and who replied.',
    ],
    solutions: [
      'Lead sourcing builds an Apollo search from the ideal customer profile, scrapes the matching profiles with Apify and stores them in Google Sheets.',
      'For each lead, one OpenAI agent researches the person through SerpAPI, a second writes an icebreaker and a third drafts the LinkedIn and email intro. Structured output parsers keep every answer in a fixed format.',
      'The outreach workflow sends the invite through Unipile and the email through Gmail, with a random wait between leads so the pace looks human. Webhooks pick up accepted invites and incoming messages: new connections get a first message, and replies go to an AI reply bot.',
    ],
    results: [
      'Every step writes its status back to Google Sheets (invite sent, invite accepted, email sent, number of messages), and invite and email history is stored in PostgreSQL, so the whole pipeline can be audited.',
      'The five phases cover the full cycle, from finding a lead to holding a conversation, and each one runs, fails and retries on its own.',
    ],
  },
  fr: {
    category: 'IA · PROSPECTION LINKEDIN',
    services: 'N8N · PERSONNALISATION IA · LINKEDIN + E-MAIL',
    client: 'Open source',
    industry: 'Ventes & partenariats B2B',
    layers: ['Sourcing des leads', 'Recherche & personnalisation', 'Prospection', 'Engagement', 'Suivi'],
    description: [
      "Un système de cinq workflows n8n qui gère la prospection B2B de bout en bout : il trouve les leads qui correspondent au client idéal, se renseigne sur chaque personne, rédige une invitation LinkedIn et un e-mail personnalisés, envoie les deux, écrit aux nouvelles connexions et répond aux messages avec l'IA.",
      "Chaque phase est un workflow à part : une erreur à une étape n'arrête pas les autres, et chaque action est journalisée.",
    ],
    challenges: [
      "La prospection LinkedIn à la main ne passe pas à l'échelle : trouver les bonnes personnes, se renseigner sur elles et écrire un message qui ne sonne pas comme un modèle prend l'essentiel de la journée d'un commercial.",
      "L'automatiser comporte ses propres risques. Des envois en rafale paraissent robotiques, les messages IA génériques sont ignorés, et sans suivi personne ne sait qui a été contacté, qui a accepté et qui a répondu.",
    ],
    solutions: [
      "Le sourcing construit une recherche Apollo à partir du profil client idéal, récupère les profils correspondants avec Apify et les enregistre dans Google Sheets.",
      "Pour chaque lead, un premier agent OpenAI se renseigne sur la personne via SerpAPI, un deuxième écrit une accroche et un troisième rédige l'introduction LinkedIn et e-mail. Des parseurs de sortie structurée gardent chaque réponse au même format.",
      "Le workflow de prospection envoie l'invitation via Unipile et l'e-mail via Gmail, avec une pause aléatoire entre deux leads pour garder un rythme humain. Des webhooks captent les invitations acceptées et les messages reçus : les nouvelles connexions reçoivent un premier message, et les réponses passent par un bot de réponse IA.",
    ],
    results: [
      "Chaque étape inscrit son statut dans Google Sheets (invitation envoyée, invitation acceptée, e-mail envoyé, nombre de messages), et l'historique des invitations et e-mails est stocké dans PostgreSQL : tout le pipeline est traçable.",
      "Les cinq phases couvrent tout le cycle, de la découverte d'un lead jusqu'à la conversation, et chacune s'exécute, échoue et relance indépendamment.",
    ],
  },
  es: {
    category: 'IA · PROSPECCIÓN EN LINKEDIN',
    services: 'N8N · PERSONALIZACIÓN CON IA · LINKEDIN + CORREO',
    client: 'Código abierto',
    industry: 'Ventas y alianzas B2B',
    layers: ['Captación de leads', 'Investigación y personalización', 'Prospección', 'Interacción', 'Seguimiento'],
    description: [
      'Un sistema de cinco workflows de n8n que gestiona la prospección B2B de principio a fin: encuentra leads que encajan con el cliente ideal, investiga a cada persona, redacta una invitación de LinkedIn y un correo personalizados, envía ambos, escribe a las nuevas conexiones y responde a los mensajes con IA.',
      'Cada fase es un workflow independiente, así que un fallo en un paso no detiene a los demás, y cada acción queda registrada.',
    ],
    challenges: [
      'La prospección manual en LinkedIn no escala: encontrar a las personas adecuadas, investigarlas y escribir un mensaje que no suene a plantilla ocupa casi toda la jornada de un comercial.',
      'Automatizarla tiene sus propios riesgos. Los envíos en ráfaga parecen de robot, los mensajes genéricos de IA se ignoran y, sin seguimiento, nadie sabe a quién se contactó, quién aceptó y quién respondió.',
    ],
    solutions: [
      'La captación crea una búsqueda en Apollo a partir del perfil de cliente ideal, extrae los perfiles que encajan con Apify y los guarda en Google Sheets.',
      'Para cada lead, un agente de OpenAI investiga a la persona con SerpAPI, otro escribe un rompehielos y un tercero redacta la presentación para LinkedIn y correo. Los parsers de salida estructurada mantienen cada respuesta en un formato fijo.',
      'El workflow de prospección envía la invitación con Unipile y el correo con Gmail, con una espera aleatoria entre leads para que el ritmo parezca humano. Los webhooks detectan invitaciones aceptadas y mensajes nuevos: las nuevas conexiones reciben un primer mensaje y las respuestas pasan a un bot de respuesta con IA.',
    ],
    results: [
      'Cada paso anota su estado en Google Sheets (invitación enviada, invitación aceptada, correo enviado, número de mensajes) y el historial de invitaciones y correos se guarda en PostgreSQL, así que todo el proceso es auditable.',
      'Las cinco fases cubren el ciclo completo, desde encontrar un lead hasta mantener una conversación, y cada una se ejecuta, falla y reintenta por su cuenta.',
    ],
  },
  it: {
    category: 'IA · OUTREACH SU LINKEDIN',
    services: 'N8N · PERSONALIZZAZIONE IA · LINKEDIN + E-MAIL',
    client: 'Open source',
    industry: 'Vendite e partnership B2B',
    layers: ['Ricerca lead', 'Ricerca e personalizzazione', 'Outreach', 'Engagement', 'Tracciamento'],
    description: [
      "Un sistema di cinque workflow n8n che gestisce l'outreach B2B dall'inizio alla fine: trova i lead in linea con il cliente ideale, raccoglie informazioni su ogni persona, scrive un invito LinkedIn e un'e-mail personalizzati, li invia, scrive ai nuovi collegamenti e risponde ai messaggi con l'IA.",
      "Ogni fase è un workflow a sé, quindi un errore in un passaggio non blocca gli altri, e ogni azione viene registrata.",
    ],
    challenges: [
      "L'outreach manuale su LinkedIn non scala: trovare le persone giuste, informarsi su di loro e scrivere un messaggio che non sembri un modello occupa gran parte della giornata di un commerciale.",
      "Automatizzarlo comporta rischi propri. Gli invii a raffica sembrano robotici, i messaggi IA generici vengono ignorati e, senza tracciamento, nessuno sa chi è stato contattato, chi ha accettato e chi ha risposto.",
    ],
    solutions: [
      "La ricerca lead costruisce una ricerca Apollo dal profilo del cliente ideale, estrae i profili corrispondenti con Apify e li salva in Google Sheets.",
      "Per ogni lead, un agente OpenAI si informa sulla persona tramite SerpAPI, un secondo scrive un rompighiaccio e un terzo prepara l'introduzione per LinkedIn e per e-mail. I parser di output strutturato mantengono ogni risposta in un formato fisso.",
      "Il workflow di outreach invia l'invito con Unipile e l'e-mail con Gmail, con un'attesa casuale tra un lead e l'altro perché il ritmo sembri umano. I webhook rilevano gli inviti accettati e i nuovi messaggi: i nuovi collegamenti ricevono un primo messaggio e le risposte passano a un bot di risposta IA.",
    ],
    results: [
      "Ogni passaggio registra il proprio stato in Google Sheets (invito inviato, invito accettato, e-mail inviata, numero di messaggi) e lo storico di inviti ed e-mail è salvato in PostgreSQL, così l'intera pipeline è verificabile.",
      "Le cinque fasi coprono l'intero ciclo, dal trovare un lead al portare avanti una conversazione, e ognuna si esegue, fallisce e riprova in autonomia.",
    ],
  },
  de: {
    category: 'KI · LINKEDIN-OUTREACH',
    services: 'N8N · KI-PERSONALISIERUNG · LINKEDIN + E-MAIL',
    client: 'Open Source',
    industry: 'B2B-Vertrieb & Partnerschaften',
    layers: ['Lead-Suche', 'Recherche & Personalisierung', 'Outreach', 'Engagement', 'Tracking'],
    description: [
      'Ein System aus fünf n8n-Workflows, das B2B-Outreach von Anfang bis Ende abwickelt: Es findet Leads, die zum idealen Kundenprofil passen, recherchiert jede Person, schreibt eine persönliche LinkedIn-Einladung und E-Mail, verschickt beides, schreibt neuen Kontakten und beantwortet Nachrichten mit KI.',
      'Jede Phase ist ein eigener Workflow, ein Fehler in einem Schritt stoppt also nicht die anderen, und jede Aktion wird protokolliert.',
    ],
    challenges: [
      'Manueller LinkedIn-Outreach skaliert nicht: Die richtigen Leute finden, sie recherchieren und eine Nachricht schreiben, die nicht nach Vorlage klingt, kostet den Großteil eines Vertriebstages.',
      'Die Automatisierung hat eigene Risiken. Massenversand wirkt robotisch, generische KI-Nachrichten werden ignoriert, und ohne Tracking weiß niemand, wer kontaktiert wurde, wer angenommen und wer geantwortet hat.',
    ],
    solutions: [
      'Die Lead-Suche baut aus dem idealen Kundenprofil eine Apollo-Suche, liest die passenden Profile mit Apify aus und speichert sie in Google Sheets.',
      'Für jeden Lead recherchiert ein OpenAI-Agent die Person über SerpAPI, ein zweiter schreibt einen Eisbrecher, ein dritter entwirft die Einleitung für LinkedIn und E-Mail. Structured Output Parser halten jede Antwort in einem festen Format.',
      'Der Outreach-Workflow verschickt die Einladung über Unipile und die E-Mail über Gmail, mit einer zufälligen Pause zwischen den Leads, damit das Tempo menschlich wirkt. Webhooks erfassen angenommene Einladungen und neue Nachrichten: Neue Kontakte bekommen eine erste Nachricht, Antworten gehen an einen KI-Antwort-Bot.',
    ],
    results: [
      'Jeder Schritt schreibt seinen Status zurück in Google Sheets (Einladung gesendet, Einladung angenommen, E-Mail gesendet, Anzahl der Nachrichten), und der Verlauf von Einladungen und E-Mails liegt in PostgreSQL – die ganze Pipeline ist nachvollziehbar.',
      'Die fünf Phasen decken den gesamten Zyklus ab, vom Finden eines Leads bis zum Gespräch, und jede läuft, scheitert und wiederholt eigenständig.',
    ],
  },
};

// Media lives in /public — prefix with the deploy base ('/portfolio/' on GitHub Pages)
const BASE = import.meta.env.BASE_URL;

// AI work leads; order here is the order on the site
const STUDIES: Study[] = [
  {
    id: 'axiom',
    kind: 'voice',
    title: 'AXIOM Voice Agent',
    imageCount: 8,
    date: [4, 2, 2026],
    tools: AXIOM_TOOLS,
    // Landscape UI screenshots (1848x962)
    aspect: '1848/962',
    copy: AXIOM_COPY,
  },
  {
    id: 'lead-qualifier',
    kind: 'lead',
    title: 'AI Lead Qualifier',
    imageCount: 6,
    date: [29, 9, 2026],
    tools: LEAD_TOOLS,
    // n8n / dashboard screenshots (3200x1800)
    aspect: '16/9',
    copy: LEAD_COPY,
  },
  {
    id: 'crm-lead-routing',
    kind: 'crm',
    title: 'AI Lead Routing & CRM Automation',
    imageCount: 3,
    date: [29, 9, 2026],
    tools: CRM_TOOLS,
    // n8n editor screenshots (~1919x931)
    aspect: '1919/931',
    ext: 'jpg',
    copy: CRM_COPY,
  },
  {
    id: 'ai-linkedin-outreach',
    kind: 'outreach',
    title: 'AI LinkedIn & Email Outreach',
    imageCount: 5,
    date: [25, 5, 2026],
    tools: OUTREACH_TOOLS,
    // Wide n8n workflow captures (~1600x620), one per pipeline stage
    aspect: '1600/620',
    fit: 'contain',
    copy: OUTREACH_COPY,
  },
];

function getStudy(study: Study, lang: Lang): Project {
  const copy = study.copy[lang];
  const dates = COPY[lang];
  const [day, month, year] = study.date;
  const images = Array.from(
    { length: study.imageCount },
    (_, i) => `${BASE}projects/${study.id}-${i + 1}.${study.ext ?? 'png'}`
  );
  return {
    id: study.id,
    kind: study.kind,
    title: study.title,
    category: copy.category,
    date: `${dates.monthsShort[month - 1]} ${year}`,
    published: dates.formatPublished(day, dates.monthsFull[month - 1], year),
    services: copy.services,
    client: copy.client,
    industry: copy.industry,
    description: copy.description,
    challenges: copy.challenges,
    solutions: copy.solutions,
    results: copy.results,
    image: images[0],
    images,
    stack: copy.layers.map((layer, i) => ({ layer, tools: study.tools[i] })),
    aspect: study.aspect,
    fit: study.fit,
  };
}

export function getProjects(lang: Lang): Project[] {
  const copy = COPY[lang];
  const stores = STORES.map((store) => {
    const [day, month, year] = store.date;
    const images = Array.from(
      { length: store.picCount },
      (_, i) => `${BASE}projects/${store.id}-${i + 1}.png`
    );
    return {
      id: store.id,
      kind: 'web' as const,
      title: store.name,
      category: copy.category,
      date: `${copy.monthsShort[month - 1]} ${year}`,
      published: copy.formatPublished(day, copy.monthsFull[month - 1], year),
      services: copy.services,
      client: store.client,
      industry: copy.industries[store.id],
      description: [copy.descTpl(store.name, copy.niches[store.id], store.theme), copy.desc2],
      challenges: copy.chal,
      solutions: [copy.solTpl(store.theme), copy.sol2],
      results: copy.res,
      image: images[0],
      images,
      video: `${BASE}projects/${store.id}-video.mp4`,
    };
  });
  // AI work leads; the e-commerce builds follow as delivery proof
  return [...STUDIES.map((s) => getStudy(s, lang)), ...stores];
}

/** Projects in the currently selected site language. */
export function useProjects() {
  const { lang } = useLang();
  return getProjects(lang);
}
