import { useLang, type Lang } from '@/i18n';

// 10 Shopify store projects. All media lives in /public/projects:
//   <id>-1.png … <id>-N.png  (screenshots — picture 1 is the card preview)
//   <id>-video.mp4           (1920x1080 store walkthrough)
// All copy is localized: titles, dates, industries and every case-study
// paragraph follow the site language.

export type Project = {
  id: string;
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
  video: string;
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
    category: 'SHOPIFY STORE',
    services: 'SHOPIFY DEVELOPMENT',
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
    category: 'BOUTIQUE SHOPIFY',
    services: 'DÉVELOPPEMENT SHOPIFY',
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
    category: 'TIENDA SHOPIFY',
    services: 'DESARROLLO SHOPIFY',
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
    category: 'NEGOZIO SHOPIFY',
    services: 'SVILUPPO SHOPIFY',
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
    category: 'SHOPIFY-SHOP',
    services: 'SHOPIFY-ENTWICKLUNG',
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

// Media lives in /public — prefix with the deploy base ('/portfolio/' on GitHub Pages)
const BASE = import.meta.env.BASE_URL;

export function getProjects(lang: Lang): Project[] {
  const copy = COPY[lang];
  return STORES.map((store) => {
    const [day, month, year] = store.date;
    const images = Array.from(
      { length: store.picCount },
      (_, i) => `${BASE}projects/${store.id}-${i + 1}.png`
    );
    return {
      id: store.id,
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
}

/** Projects in the currently selected site language. */
export function useProjects() {
  const { lang } = useLang();
  return getProjects(lang);
}
