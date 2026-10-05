import type { Lang } from '@/i18n';
import type { Study, StudyCopy } from '@/data/projects';

// Live web apps and multi-site stores, built and run as my own products.
// Facts and stack come from each repo (README, HANDOFF, wrangler config,
// package.json). Media in /public/projects:
//   <id>-1.jpg  desktop hero (1440x900) — the card thumbnail
//   <id>-2.jpg  desktop full page (scrolls inside the carousel frame)
//   <id>-3.jpg  mobile hero
//   <id>-video.mp4  landing-page walkthrough, cropped to 16:9

type Layer = 'front' | 'back' | 'pay' | 'jobs' | 'ai' | 'host' | 'media';

const LAYER_LABELS: Record<Lang, Record<Layer, string>> = {
  en: { front: 'Frontend', back: 'Backend & data', pay: 'Payments', jobs: 'Fulfilment & jobs', ai: 'AI', host: 'Hosting & deploy', media: 'Media & real time' },
  fr: { front: 'Frontend', back: 'Backend & données', pay: 'Paiements', jobs: 'Traitement & tâches', ai: 'IA', host: 'Hébergement & déploiement', media: 'Médias & temps réel' },
  es: { front: 'Frontend', back: 'Backend y datos', pay: 'Pagos', jobs: 'Procesamiento y tareas', ai: 'IA', host: 'Hosting y despliegue', media: 'Medios y tiempo real' },
  it: { front: 'Frontend', back: 'Backend e dati', pay: 'Pagamenti', jobs: 'Evasione e job', ai: 'IA', host: 'Hosting e deploy', media: 'Media e tempo reale' },
  de: { front: 'Frontend', back: 'Backend & Daten', pay: 'Zahlungen', jobs: 'Abwicklung & Jobs', ai: 'KI', host: 'Hosting & Deployment', media: 'Medien & Echtzeit' },
};

type Text = Omit<StudyCopy, 'layers'>;

/** Builds the per-language copy; layers are shared labels in a fixed order. */
function copy(layers: Layer[], texts: Record<Lang, Text>): Record<Lang, StudyCopy> {
  const out = {} as Record<Lang, StudyCopy>;
  for (const lang of Object.keys(texts) as Lang[]) {
    out[lang] = { ...texts[lang], layers: layers.map((l) => LAYER_LABELS[lang][l]) };
  }
  return out;
}

// ---- Shared labels ----
const CAT: Record<Lang, { panel: string; store: string; dating: string }> = {
  en: { panel: 'WEB APP · RESELLER PLATFORM', store: 'WEB APP · E-COMMERCE', dating: 'WEB APP · DATING PLATFORM' },
  fr: { panel: 'APPLICATION WEB · PLATEFORME REVENDEUR', store: 'APPLICATION WEB · E-COMMERCE', dating: 'APPLICATION WEB · RENCONTRE' },
  es: { panel: 'APLICACIÓN WEB · PLATAFORMA DE REVENTA', store: 'APLICACIÓN WEB · E-COMMERCE', dating: 'APLICACIÓN WEB · CITAS' },
  it: { panel: 'APP WEB · PIATTAFORMA RIVENDITORI', store: 'APP WEB · E-COMMERCE', dating: 'APP WEB · INCONTRI' },
  de: { panel: 'WEB-APP · RESELLER-PLATTFORM', store: 'WEB-APP · E-COMMERCE', dating: 'WEB-APP · DATING-PLATTFORM' },
};
const OWN: Record<Lang, string> = { en: 'Own product', fr: 'Produit personnel', es: 'Producto propio', it: 'Prodotto proprio', de: 'Eigenes Produkt' };
const SMM: Record<Lang, string> = {
  en: 'Social Media Marketing', fr: 'Marketing des réseaux sociaux', es: 'Marketing en redes sociales', it: 'Social media marketing', de: 'Social-Media-Marketing',
};
const DATING: Record<Lang, string> = { en: 'Online Dating', fr: 'Rencontre en ligne', es: 'Citas en línea', it: 'Incontri online', de: 'Online-Dating' };

// ---- Tools (language-independent) ----
const PANEL_FRONT = 'Next.js 15 (App Router) · React · TypeScript · Tailwind CSS v4';
const PANEL_AI = "Claude API: a support-ticket agent that answers from the customer's own orders and balance";
const PANEL_CF_TOOLS = [
  PANEL_FRONT,
  'Prisma (pg adapter) · Supabase Postgres shared by every brand · Zod · JWT sessions',
  'Revolut Merchant API + webhooks',
  'Cloudflare Cron Triggers for catalogue, order and email sync · SMMWest + SMM Turk APIs · Resend',
  PANEL_AI,
  'Cloudflare Workers via OpenNext · Wrangler · GitHub Actions',
];
const PANEL_CF_LAYERS: Layer[] = ['front', 'back', 'pay', 'jobs', 'ai', 'host'];

const SF_FRONT = 'HTML · CSS · vanilla JavaScript · GSAP + Lenis';
const SF_BACK = 'Cloudflare Pages Functions · Cloudflare KV (orders, refill queue)';
const SF_REVOLUT = 'Revolut Merchant API: embedded card field + signed webhooks';
const SF_JOBS = 'SMMWest API for automatic fulfilment · refill cron · Resend email drip';
const SF_AI = 'Cloudflare Workers AI support chat';
const SF_HOST = 'Node build scripts (catalogue, pages, multi-site deploy) · Cloudflare Pages · GitHub auto-deploy';

// ---- Panel copy (the three Cloudflare brands share the engine story) ----
type PanelBrand = { name: string; extra: Record<Lang, string> };

function panelCopy(b: PanelBrand): Record<Lang, StudyCopy> {
  return copy(PANEL_CF_LAYERS, {
    en: {
      category: CAT.en.panel, services: 'FULL-STACK · PAYMENTS · AI SUPPORT', client: OWN.en, industry: SMM.en,
      description: [
        `${b.name} is a reseller panel: customers top up a prepaid balance, pick from about 8,000 services and paste a public link. Each order is forwarded to the right supplier over its API and tracked until it finishes.`,
        b.extra.en,
      ],
      challenges: [
        'Several brands had to run on one engine without leaking into each other: one database and one set of supplier accounts, but separate customers, emails, branding and order sync for each site.',
      ],
      solutions: [
        'The Next.js app runs on Cloudflare Workers through OpenNext. Every customer and order carries the site it came from, so the shared Supabase database stays partitioned by brand. Revolut takes card payments, and cron triggers resync the catalogue twice a day, poll order status and send the email sequences.',
        'Support tickets go to a Claude agent that reads the customer’s orders and balance before it answers and passes anything that needs a decision to me. Cancelled and partial orders refund themselves, so most tickets never need opening.',
      ],
      results: [
        'The brand runs live on its own domain with its own look and copy, sharing a tested backend with its sister sites. A new brand takes days, not a new codebase.',
      ],
    },
    fr: {
      category: CAT.fr.panel, services: 'FULL-STACK · PAIEMENTS · SUPPORT IA', client: OWN.fr, industry: SMM.fr,
      description: [
        `${b.name} est un panel revendeur : le client recharge un solde prépayé, choisit parmi environ 8 000 services et colle un lien public. Chaque commande part chez le bon fournisseur via son API et est suivie jusqu'à la fin.`,
        b.extra.fr,
      ],
      challenges: [
        "Plusieurs marques devaient tourner sur un seul moteur sans se mélanger : une base et un jeu de comptes fournisseurs, mais des clients, e-mails, identités et synchronisations de commandes séparés pour chaque site.",
      ],
      solutions: [
        "L'application Next.js tourne sur Cloudflare Workers via OpenNext. Chaque client et chaque commande portent le site d'origine, donc la base Supabase partagée reste cloisonnée par marque. Revolut encaisse les cartes, et des tâches planifiées resynchronisent le catalogue deux fois par jour, suivent les commandes et envoient les séquences d'e-mails.",
        "Les tickets passent par un agent Claude qui lit les commandes et le solde du client avant de répondre, et me transmet tout ce qui demande une décision. Les commandes annulées ou partielles se remboursent seules : la plupart des tickets n'ont jamais lieu.",
      ],
      results: [
        "La marque est en ligne sur son propre domaine, avec son identité et ses textes, sur un backend éprouvé partagé avec ses sites jumeaux. Une nouvelle marque prend quelques jours, pas un nouveau code.",
      ],
    },
    es: {
      category: CAT.es.panel, services: 'FULL-STACK · PAGOS · SOPORTE CON IA', client: OWN.es, industry: SMM.es,
      description: [
        `${b.name} es un panel de reventa: el cliente recarga un saldo prepago, elige entre unos 8.000 servicios y pega un enlace público. Cada pedido se envía al proveedor correcto por su API y se sigue hasta terminar.`,
        b.extra.es,
      ],
      challenges: [
        'Varias marcas debían funcionar sobre un solo motor sin mezclarse: una base de datos y unas cuentas de proveedor, pero clientes, correos, imagen y sincronización de pedidos separados para cada sitio.',
      ],
      solutions: [
        'La app Next.js corre en Cloudflare Workers con OpenNext. Cada cliente y pedido lleva su sitio de origen, así que la base Supabase compartida queda separada por marca. Revolut cobra con tarjeta y tareas programadas resincronizan el catálogo dos veces al día, siguen los pedidos y envían las secuencias de correo.',
        'Los tickets los atiende un agente Claude que lee los pedidos y el saldo del cliente antes de responder y me pasa lo que requiere una decisión. Los pedidos cancelados o parciales se reembolsan solos, así que la mayoría de tickets nunca llega a abrirse.',
      ],
      results: [
        'La marca funciona en su propio dominio, con su imagen y sus textos, sobre un backend probado que comparte con sus sitios hermanos. Una marca nueva lleva días, no un código nuevo.',
      ],
    },
    it: {
      category: CAT.it.panel, services: 'FULL-STACK · PAGAMENTI · SUPPORTO IA', client: OWN.it, industry: SMM.it,
      description: [
        `${b.name} è un pannello per rivenditori: il cliente ricarica un saldo prepagato, sceglie tra circa 8.000 servizi e incolla un link pubblico. Ogni ordine va al fornitore giusto tramite la sua API e viene seguito fino alla fine.`,
        b.extra.it,
      ],
      challenges: [
        'Più marchi dovevano girare su un solo motore senza mescolarsi: un database e un set di account fornitore, ma clienti, email, grafica e sincronizzazione ordini separati per ogni sito.',
      ],
      solutions: [
        "L'app Next.js gira su Cloudflare Workers tramite OpenNext. Ogni cliente e ordine porta il sito di provenienza, così il database Supabase condiviso resta separato per marchio. Revolut incassa le carte e job pianificati risincronizzano il catalogo due volte al giorno, seguono gli ordini e inviano le sequenze email.",
        "I ticket passano a un agente Claude che legge ordini e saldo del cliente prima di rispondere e mi gira ciò che richiede una decisione. Gli ordini annullati o parziali si rimborsano da soli, quindi la maggior parte dei ticket non viene mai aperta.",
      ],
      results: [
        'Il marchio è online sul proprio dominio, con grafica e testi propri, su un backend collaudato condiviso con i siti gemelli. Un nuovo marchio richiede giorni, non un nuovo codice.',
      ],
    },
    de: {
      category: CAT.de.panel, services: 'FULL-STACK · ZAHLUNGEN · KI-SUPPORT', client: OWN.de, industry: SMM.de,
      description: [
        `${b.name} ist ein Reseller-Panel: Kunden laden ein Prepaid-Guthaben auf, wählen aus rund 8.000 Services und fügen einen öffentlichen Link ein. Jede Bestellung geht über die API an den passenden Lieferanten und wird bis zum Abschluss verfolgt.`,
        b.extra.de,
      ],
      challenges: [
        'Mehrere Marken sollten auf einer Engine laufen, ohne sich zu vermischen: eine Datenbank und ein Satz Lieferantenkonten, aber getrennte Kunden, E-Mails, Branding und Bestellsynchronisierung pro Website.',
      ],
      solutions: [
        'Die Next.js-App läuft über OpenNext auf Cloudflare Workers. Jeder Kunde und jede Bestellung trägt die Herkunftsseite, sodass die gemeinsame Supabase-Datenbank nach Marke getrennt bleibt. Revolut nimmt Kartenzahlungen an, und Cron-Trigger synchronisieren den Katalog zweimal täglich, verfolgen Bestellungen und versenden die E-Mail-Sequenzen.',
        'Support-Tickets beantwortet ein Claude-Agent, der vorher Bestellungen und Guthaben des Kunden liest und alles, was eine Entscheidung braucht, an mich weitergibt. Stornierte und teilweise gelieferte Bestellungen werden automatisch erstattet, die meisten Tickets entstehen gar nicht erst.',
      ],
      results: [
        'Die Marke läuft live auf eigener Domain mit eigenem Look und Text, auf einem erprobten Backend, das sie mit ihren Schwesterseiten teilt. Eine neue Marke dauert Tage, nicht eine neue Codebasis.',
      ],
    },
  });
}

// ---- Social Fame store copy ----
type StoreText = Record<Lang, { description: string[]; challenges: string[]; solutions: string[]; results: string[] }>;

function storeCopy(layers: Layer[], services: Record<Lang, string>, t: StoreText): Record<Lang, StudyCopy> {
  const texts = {} as Record<Lang, Text>;
  for (const lang of Object.keys(t) as Lang[]) {
    texts[lang] = { category: CAT[lang].store, services: services[lang], client: OWN[lang], industry: SMM[lang], ...t[lang] };
  }
  return copy(layers, texts);
}

const STORE_SERVICES: Record<Lang, string> = {
  en: 'E-COMMERCE · SERVERLESS · PAYMENTS',
  fr: 'E-COMMERCE · SERVERLESS · PAIEMENTS',
  es: 'E-COMMERCE · SERVERLESS · PAGOS',
  it: 'E-COMMERCE · SERVERLESS · PAGAMENTI',
  de: 'E-COMMERCE · SERVERLESS · ZAHLUNGEN',
};

// ---- Dating copy ----
const DATING_SERVICES: Record<Lang, string> = {
  en: 'FULL-STACK · REAL TIME · MEMBERSHIPS',
  fr: 'FULL-STACK · TEMPS RÉEL · ABONNEMENTS',
  es: 'FULL-STACK · TIEMPO REAL · MEMBRESÍAS',
  it: 'FULL-STACK · TEMPO REALE · ABBONAMENTI',
  de: 'FULL-STACK · ECHTZEIT · MITGLIEDSCHAFTEN',
};

const APP = { imageCount: 3, aspect: '1440/900', ext: 'jpg' as const, video: true };

export const WEB_APPS: Study[] = [
  {
    ...APP,
    id: 'xsmmpanel',
    url: 'https://xsmmpanel.uk',
    kind: 'apps',
    title: 'Xsmmpanel',
    date: [30, 9, 2026],
    tools: [
      PANEL_FRONT,
      'Next.js route handlers · Prisma · Supabase Postgres · Zod · JWT sessions',
      'Stripe Checkout + webhooks',
      'SMMWest + SMM Turk APIs · scheduled catalogue and order sync · Resend email',
      PANEL_AI,
      'Vercel (hosting + cron) · Vitest',
    ],
    copy: copy(['front', 'back', 'pay', 'jobs', 'ai', 'host'], {
      en: {
        category: CAT.en.panel, services: 'FULL-STACK · PAYMENTS · AI SUPPORT', client: OWN.en, industry: SMM.en,
        description: [
          'Xsmmpanel is the original reseller panel the other brands grew from. Customers buy prepaid credit, choose from two supplier catalogues (about 580 and 7,300 services) and paste a public link. The order is forwarded over the supplier’s API within seconds and tracked until it completes.',
          'It also exposes a reseller API at /api/v2 with the standard panel actions, so existing client scripts work after changing only the URL and key.',
        ],
        challenges: [
          'Panel operators usually rent a PHP script, reprice thousands of services by hand and spend their day answering the same tickets. The goal was a panel that keeps itself current and answers most support questions on its own.',
        ],
        solutions: [
          'The catalogue syncs from both suppliers twice a day and is repriced automatically. Services a supplier drops are deleted if nobody ordered them and switched off otherwise, so order history survives. Status, start count and remaining quantity are pulled back on a schedule, and partial or cancelled orders refund themselves.',
          'Stripe Checkout sells seven credit packages with the processing fee on its own line. A Claude agent answers each ticket within about a minute using the customer’s real orders and balance, and hands anything that needs a decision to me.',
        ],
        results: [
          'Live on xsmmpanel.uk with about 7,800 services kept current, a price list in 30 currencies and a reseller API. Its engine now runs three more brands on Cloudflare.',
        ],
      },
      fr: {
        category: CAT.fr.panel, services: 'FULL-STACK · PAIEMENTS · SUPPORT IA', client: OWN.fr, industry: SMM.fr,
        description: [
          "Xsmmpanel est le panel revendeur d'origine, dont les autres marques sont issues. Le client achète du crédit prépayé, choisit dans deux catalogues fournisseurs (environ 580 et 7 300 services) et colle un lien public. La commande part en quelques secondes via l'API du fournisseur et est suivie jusqu'au bout.",
          "Il expose aussi une API revendeur sur /api/v2 avec les actions standard des panels : un script client existant fonctionne en changeant seulement l'URL et la clé.",
        ],
        challenges: [
          "Les opérateurs de panels louent souvent un script PHP, reprisent des milliers de services à la main et passent leurs journées à répondre aux mêmes tickets. L'objectif : un panel qui se tient à jour seul et répond lui-même à la plupart des questions.",
        ],
        solutions: [
          "Le catalogue se synchronise deux fois par jour depuis les deux fournisseurs, avec un repricing automatique. Un service retiré est supprimé s'il n'a jamais été commandé, désactivé sinon, pour garder l'historique. Statut, compteur de départ et quantité restante remontent automatiquement, et les commandes partielles ou annulées se remboursent seules.",
          "Stripe Checkout vend sept packs de crédit, avec les frais sur une ligne à part. Un agent Claude répond à chaque ticket en une minute environ à partir des vraies commandes et du solde du client, et me transmet ce qui demande une décision.",
        ],
        results: [
          "En ligne sur xsmmpanel.uk, avec environ 7 800 services tenus à jour, une grille tarifaire en 30 devises et une API revendeur. Son moteur fait aujourd'hui tourner trois autres marques sur Cloudflare.",
        ],
      },
      es: {
        category: CAT.es.panel, services: 'FULL-STACK · PAGOS · SOPORTE CON IA', client: OWN.es, industry: SMM.es,
        description: [
          'Xsmmpanel es el panel de reventa original del que salieron las demás marcas. El cliente compra crédito prepago, elige entre dos catálogos de proveedores (unos 580 y 7.300 servicios) y pega un enlace público. El pedido sale en segundos por la API del proveedor y se sigue hasta completarse.',
          'También ofrece una API de reventa en /api/v2 con las acciones estándar de los paneles: un script de cliente existente funciona cambiando solo la URL y la clave.',
        ],
        challenges: [
          'Los operadores de paneles suelen alquilar un script PHP, ajustar miles de precios a mano y pasar el día respondiendo los mismos tickets. El objetivo era un panel que se mantenga al día solo y responda por sí mismo la mayoría de las dudas.',
        ],
        solutions: [
          'El catálogo se sincroniza con ambos proveedores dos veces al día y se reprecia automáticamente. Un servicio retirado se borra si nadie lo pidió y se desactiva si no, para conservar el historial. Estado, conteo inicial y cantidad restante se actualizan solos, y los pedidos parciales o cancelados se reembolsan automáticamente.',
          'Stripe Checkout vende siete paquetes de crédito con la comisión en una línea aparte. Un agente Claude responde cada ticket en un minuto aproximadamente con los pedidos y el saldo reales del cliente, y me pasa lo que requiere una decisión.',
        ],
        results: [
          'En línea en xsmmpanel.uk con unos 7.800 servicios actualizados, precios en 30 monedas y una API de reventa. Su motor ya impulsa otras tres marcas en Cloudflare.',
        ],
      },
      it: {
        category: CAT.it.panel, services: 'FULL-STACK · PAGAMENTI · SUPPORTO IA', client: OWN.it, industry: SMM.it,
        description: [
          "Xsmmpanel è il pannello rivenditori originale da cui sono nati gli altri marchi. Il cliente compra credito prepagato, sceglie da due cataloghi fornitore (circa 580 e 7.300 servizi) e incolla un link pubblico. L'ordine parte in pochi secondi tramite l'API del fornitore e viene seguito fino al completamento.",
          "Espone anche un'API per rivenditori su /api/v2 con le azioni standard dei pannelli: uno script cliente esistente funziona cambiando solo URL e chiave.",
        ],
        challenges: [
          "Chi gestisce un pannello di solito affitta uno script PHP, riprezza migliaia di servizi a mano e passa la giornata a rispondere agli stessi ticket. L'obiettivo era un pannello che si aggiorna da solo e risponde in autonomia alla maggior parte delle domande.",
        ],
        solutions: [
          "Il catalogo si sincronizza con entrambi i fornitori due volte al giorno e viene riprezzato in automatico. Un servizio ritirato viene eliminato se nessuno l'ha ordinato, altrimenti disattivato, così lo storico resta. Stato, conteggio iniziale e quantità residua tornano in automatico, e gli ordini parziali o annullati si rimborsano da soli.",
          "Stripe Checkout vende sette pacchetti di credito con la commissione su una riga separata. Un agente Claude risponde a ogni ticket in circa un minuto usando gli ordini e il saldo reali del cliente, e mi passa ciò che richiede una decisione.",
        ],
        results: [
          'Online su xsmmpanel.uk con circa 7.800 servizi aggiornati, listino in 30 valute e API per rivenditori. Il suo motore oggi fa girare altri tre marchi su Cloudflare.',
        ],
      },
      de: {
        category: CAT.de.panel, services: 'FULL-STACK · ZAHLUNGEN · KI-SUPPORT', client: OWN.de, industry: SMM.de,
        description: [
          'Xsmmpanel ist das ursprüngliche Reseller-Panel, aus dem die anderen Marken entstanden sind. Kunden kaufen Prepaid-Guthaben, wählen aus zwei Lieferantenkatalogen (rund 580 und 7.300 Services) und fügen einen öffentlichen Link ein. Die Bestellung geht in Sekunden über die Lieferanten-API raus und wird bis zum Abschluss verfolgt.',
          'Dazu gibt es eine Reseller-API unter /api/v2 mit den üblichen Panel-Aktionen: Bestehende Kundenskripte laufen, wenn man nur URL und Schlüssel tauscht.',
        ],
        challenges: [
          'Panel-Betreiber mieten meist ein PHP-Skript, passen Tausende Preise von Hand an und beantworten den ganzen Tag dieselben Tickets. Ziel war ein Panel, das sich selbst aktuell hält und die meisten Supportfragen allein beantwortet.',
        ],
        solutions: [
          'Der Katalog synchronisiert sich zweimal täglich mit beiden Lieferanten und wird automatisch neu bepreist. Ein gestrichener Service wird gelöscht, wenn ihn nie jemand bestellt hat, sonst deaktiviert, damit die Bestellhistorie bleibt. Status, Startzähler und Restmenge kommen automatisch zurück, und teilweise oder stornierte Bestellungen werden selbst erstattet.',
          'Stripe Checkout verkauft sieben Guthabenpakete mit der Gebühr als eigener Zeile. Ein Claude-Agent beantwortet jedes Ticket in etwa einer Minute anhand der echten Bestellungen und des Guthabens und gibt alles, was eine Entscheidung braucht, an mich weiter.',
        ],
        results: [
          'Live auf xsmmpanel.uk mit rund 7.800 aktuellen Services, Preisliste in 30 Währungen und Reseller-API. Seine Engine betreibt inzwischen drei weitere Marken auf Cloudflare.',
        ],
      },
    }),
  },
  {
    ...APP,
    id: 'frenchsmm',
    url: 'https://frenchsmm.org',
    kind: 'apps',
    title: 'FrenchSMM',
    date: [28, 9, 2026],
    tools: PANEL_CF_TOOLS,
    copy: panelCopy({
      name: 'FrenchSMM',
      extra: {
        en: 'It is the brand where the engine moved from Vercel to Cloudflare Workers and from Stripe to the Revolut Merchant API, and where one Supabase database started serving several brands.',
        fr: "C'est la marque sur laquelle le moteur est passé de Vercel à Cloudflare Workers et de Stripe à l'API Revolut Merchant, et où une seule base Supabase a commencé à servir plusieurs marques.",
        es: 'Es la marca con la que el motor pasó de Vercel a Cloudflare Workers y de Stripe a la API Revolut Merchant, y donde una sola base Supabase empezó a servir a varias marcas.',
        it: "È il marchio con cui il motore è passato da Vercel a Cloudflare Workers e da Stripe alla Revolut Merchant API, e dove un unico database Supabase ha iniziato a servire più marchi.",
        de: 'Mit dieser Marke zog die Engine von Vercel auf Cloudflare Workers und von Stripe auf die Revolut Merchant API um, und eine Supabase-Datenbank begann, mehrere Marken zu bedienen.',
      },
    }),
  },
  {
    ...APP,
    id: 'smmbieber',
    url: 'https://smmbieber.us',
    kind: 'apps',
    title: 'SMMBieber',
    date: [28, 9, 2026],
    tools: PANEL_CF_TOOLS,
    copy: panelCopy({
      name: 'SMMBieber',
      extra: {
        en: 'It targets the US market with its own name, playful identity and copy. It went live on the shared engine without a line of new backend code.',
        fr: "Elle vise le marché américain avec son propre nom, une identité ludique et ses propres textes. Elle a été mise en ligne sur le moteur partagé sans une ligne de nouveau code backend.",
        es: 'Apunta al mercado de EE. UU. con su propio nombre, una identidad desenfadada y sus propios textos. Salió en vivo sobre el motor compartido sin una línea nueva de backend.',
        it: 'Punta al mercato statunitense con nome, identità giocosa e testi propri. È andato online sul motore condiviso senza una riga di nuovo codice backend.',
        de: 'Sie richtet sich mit eigenem Namen, verspielter Identität und eigenen Texten an den US-Markt. Sie ging auf der gemeinsamen Engine live, ohne eine Zeile neuen Backend-Code.',
      },
    }),
  },
  {
    ...APP,
    id: 'smmgod',
    url: 'https://smmgod.uk',
    kind: 'apps',
    title: 'SMM God',
    date: [29, 9, 2026],
    tools: PANEL_CF_TOOLS,
    copy: panelCopy({
      name: 'SMM God',
      extra: {
        en: 'It serves the UK with a retro pixel-art identity drawn in code and its own transactional email templates for signup, receipts and order updates.',
        fr: "Elle cible le Royaume-Uni avec une identité pixel art rétro dessinée en code et ses propres modèles d'e-mails pour l'inscription, les reçus et le suivi des commandes.",
        es: 'Se dirige al Reino Unido con una identidad pixel art retro dibujada en código y sus propias plantillas de correo para registro, recibos y estado de pedidos.',
        it: 'Si rivolge al Regno Unito con un’identità pixel art retrò disegnata in codice e propri template email per iscrizione, ricevute e aggiornamenti degli ordini.',
        de: 'Sie richtet sich an Großbritannien, mit einer im Code gezeichneten Retro-Pixel-Art-Identität und eigenen E-Mail-Vorlagen für Anmeldung, Belege und Bestellstatus.',
      },
    }),
  },
  {
    ...APP,
    id: 'social-fame',
    url: 'https://social-fame.com',
    kind: 'apps',
    title: 'Social-Fame',
    date: [3, 10, 2026],
    tools: [SF_FRONT, SF_BACK, SF_REVOLUT, SF_JOBS, SF_AI, SF_HOST],
    copy: storeCopy(['front', 'back', 'pay', 'jobs', 'ai', 'host'], STORE_SERVICES, {
      en: {
        description: [
          'Social-Fame is a growth-services store that started on Shopify. I rebuilt it as a standalone site on Cloudflare Pages, keeping its design, animations and copy, and turned it into an engine that now runs five storefronts.',
          'Buyers pay in an embedded Revolut card field without leaving the site. Paid orders go straight to the supplier, and customers follow them from their own account.',
        ],
        challenges: [
          'The owner wanted to stop paying Shopify without losing the look, the catalogue of 80 products and 543 variants, or the SEO pages. They also wanted every paid order delivered with nobody touching it.',
        ],
        solutions: [
          'A build script turns the Shopify product CSV into the catalogue, server-side price table and platform pages. Serverless functions create the Revolut order, verify the signed webhook and forward the order to the SMMWest API. Orders and the refill queue live in Cloudflare KV, and a cron job reruns refills.',
          'Customers sign in by magic link or Google to see their orders. A Workers AI chat answers questions, Resend sends receipts and an email drip, and an admin panel shows orders, unpaid checkouts and supplier retries.',
        ],
        results: [
          'Live on social-fame.com in French and English, with no platform fee and no manual fulfilment. The same build system deploys the sister stores socialfame.co.uk and monetizeyoutube.com.',
        ],
      },
      fr: {
        description: [
          "Social-Fame est une boutique de services de croissance née sur Shopify. Je l'ai reconstruite en site autonome sur Cloudflare Pages en gardant design, animations et textes, puis transformée en moteur qui fait tourner cinq boutiques.",
          "L'acheteur paie dans un champ carte Revolut intégré, sans quitter le site. Les commandes payées partent directement chez le fournisseur et le client les suit depuis son compte.",
        ],
        challenges: [
          "Le propriétaire voulait arrêter de payer Shopify sans perdre le design, le catalogue de 80 produits et 543 variantes, ni les pages SEO. Il voulait aussi que chaque commande payée soit livrée sans intervention.",
        ],
        solutions: [
          "Un script de build transforme l'export CSV de Shopify en catalogue, en grille de prix côté serveur et en pages par plateforme. Des fonctions serverless créent la commande Revolut, vérifient le webhook signé et transmettent la commande à l'API SMMWest. Commandes et file de recharges vivent dans Cloudflare KV, et un cron relance les recharges.",
          "Le client se connecte par lien magique ou Google pour voir ses commandes. Un chat IA sur Workers AI répond aux questions, Resend envoie reçus et séquence d'e-mails, et un panneau admin montre commandes, paiements non finalisés et relances fournisseur.",
        ],
        results: [
          "En ligne sur social-fame.com en français et en anglais, sans abonnement plateforme ni traitement manuel. Le même système de build déploie les boutiques sœurs socialfame.co.uk et monetizeyoutube.com.",
        ],
      },
      es: {
        description: [
          'Social-Fame es una tienda de servicios de crecimiento que nació en Shopify. La reconstruí como sitio independiente en Cloudflare Pages, manteniendo diseño, animaciones y textos, y la convertí en un motor que hoy impulsa cinco tiendas.',
          'El comprador paga en un campo de tarjeta Revolut integrado sin salir del sitio. Los pedidos pagados van directo al proveedor y el cliente los sigue desde su cuenta.',
        ],
        challenges: [
          'El dueño quería dejar de pagar Shopify sin perder el diseño, el catálogo de 80 productos y 543 variantes ni las páginas SEO. También quería que cada pedido pagado se entregara sin intervención.',
        ],
        solutions: [
          'Un script de build convierte el CSV de Shopify en catálogo, tabla de precios del servidor y páginas por plataforma. Funciones serverless crean el pedido en Revolut, verifican el webhook firmado y envían el pedido a la API de SMMWest. Pedidos y cola de recargas viven en Cloudflare KV, y un cron relanza las recargas.',
          'El cliente entra con enlace mágico o Google para ver sus pedidos. Un chat con Workers AI responde dudas, Resend envía recibos y una secuencia de correos, y un panel de administración muestra pedidos, pagos sin completar y reintentos al proveedor.',
        ],
        results: [
          'En línea en social-fame.com en francés e inglés, sin cuota de plataforma ni gestión manual. El mismo sistema de build despliega las tiendas hermanas socialfame.co.uk y monetizeyoutube.com.',
        ],
      },
      it: {
        description: [
          'Social-Fame è un negozio di servizi di crescita nato su Shopify. L’ho ricostruito come sito autonomo su Cloudflare Pages mantenendo design, animazioni e testi, e l’ho trasformato in un motore che oggi gestisce cinque negozi.',
          'Chi compra paga in un campo carta Revolut integrato senza lasciare il sito. Gli ordini pagati vanno subito al fornitore e il cliente li segue dal proprio account.',
        ],
        challenges: [
          'Il proprietario voleva smettere di pagare Shopify senza perdere grafica, catalogo di 80 prodotti e 543 varianti o pagine SEO. Voleva anche che ogni ordine pagato fosse evaso senza interventi manuali.',
        ],
        solutions: [
          "Uno script di build trasforma il CSV di Shopify in catalogo, listino lato server e pagine per piattaforma. Funzioni serverless creano l'ordine Revolut, verificano il webhook firmato e inoltrano l'ordine all'API SMMWest. Ordini e coda delle ricariche stanno in Cloudflare KV, e un cron rilancia le ricariche.",
          'Il cliente accede con link magico o Google per vedere i suoi ordini. Una chat su Workers AI risponde alle domande, Resend invia ricevute e sequenze email, e un pannello admin mostra ordini, pagamenti non conclusi e tentativi verso il fornitore.',
        ],
        results: [
          'Online su social-fame.com in francese e inglese, senza canone di piattaforma né evasione manuale. Lo stesso sistema di build pubblica i negozi gemelli socialfame.co.uk e monetizeyoutube.com.',
        ],
      },
      de: {
        description: [
          'Social-Fame ist ein Shop für Wachstumsservices, der auf Shopify begann. Ich habe ihn als eigenständige Website auf Cloudflare Pages neu gebaut, Design, Animationen und Texte behalten und daraus eine Engine gemacht, die heute fünf Shops betreibt.',
          'Käufer zahlen in einem eingebetteten Revolut-Kartenfeld, ohne die Seite zu verlassen. Bezahlte Bestellungen gehen direkt an den Lieferanten, und Kunden verfolgen sie im eigenen Konto.',
        ],
        challenges: [
          'Der Inhaber wollte Shopify nicht mehr bezahlen, ohne Design, den Katalog mit 80 Produkten und 543 Varianten oder die SEO-Seiten zu verlieren. Außerdem sollte jede bezahlte Bestellung ohne Handarbeit ausgeliefert werden.',
        ],
        solutions: [
          'Ein Build-Skript macht aus dem Shopify-CSV den Katalog, die serverseitige Preistabelle und die Plattformseiten. Serverless-Funktionen legen die Revolut-Bestellung an, prüfen den signierten Webhook und leiten die Bestellung an die SMMWest-API weiter. Bestellungen und Nachfüll-Warteschlange liegen in Cloudflare KV, ein Cronjob stößt die Nachfüllungen an.',
          'Kunden melden sich per Magic Link oder Google an und sehen ihre Bestellungen. Ein Workers-AI-Chat beantwortet Fragen, Resend verschickt Belege und eine E-Mail-Strecke, und ein Admin-Panel zeigt Bestellungen, offene Zahlungen und Lieferanten-Wiederholungen.',
        ],
        results: [
          'Live auf social-fame.com auf Französisch und Englisch, ohne Plattformgebühr und ohne manuelle Abwicklung. Dasselbe Build-System deployt die Schwester-Shops socialfame.co.uk und monetizeyoutube.com.',
        ],
      },
    }),
  },
  {
    ...APP,
    id: 'socialfame-uk',
    url: 'https://socialfame.co.uk',
    kind: 'apps',
    title: 'Social Fame UK',
    date: [3, 10, 2026],
    tools: [SF_FRONT, SF_BACK, SF_REVOLUT, SF_JOBS, SF_AI, SF_HOST],
    copy: storeCopy(['front', 'back', 'pay', 'jobs', 'ai', 'host'], STORE_SERVICES, {
      en: {
        description: [
          'Social Fame UK is the British storefront of the Social-Fame engine. It has its own domain, layout and service grid, with an order card for every service on Instagram, TikTok, YouTube and Facebook.',
          'It is generated and deployed by the same build script as social-fame.com, as its own Cloudflare Pages project.',
        ],
        challenges: [
          'Each market needs its own domain, pages and search footprint. Maintaining a second codebase for each one would double every fix.',
        ],
        solutions: [
          'One site config (SITE_ID) drives the layout, copy, sitemap and platform pages, while checkout, fulfilment and accounts come from the shared serverless functions. Payments go through the embedded Revolut card field, and paid orders are sent to the supplier API automatically.',
          'The page leads with a platform switcher and a grid of order cards, followed by a reviews wall, an FAQ and a final call to action.',
        ],
        results: [
          'Live on socialfame.co.uk. A fix to the engine reaches every storefront on the next deploy.',
        ],
      },
      fr: {
        description: [
          "Social Fame UK est la vitrine britannique du moteur Social-Fame. Elle a son domaine, sa mise en page et sa grille de services, avec une carte de commande pour chaque service Instagram, TikTok, YouTube et Facebook.",
          "Elle est générée et déployée par le même script que social-fame.com, comme projet Cloudflare Pages distinct.",
        ],
        challenges: [
          "Chaque marché a besoin de son domaine, de ses pages et de sa présence dans les recherches. Maintenir un second code par marché doublerait chaque correction.",
        ],
        solutions: [
          "Une configuration de site (SITE_ID) pilote la mise en page, les textes, le sitemap et les pages par plateforme, tandis que paiement, traitement et comptes viennent des fonctions serverless partagées. Le paiement passe par le champ carte Revolut intégré et les commandes payées partent automatiquement vers l'API fournisseur.",
          "La page s'ouvre sur un sélecteur de plateforme et une grille de cartes de commande, suivis d'un mur d'avis, d'une FAQ et d'un dernier appel à l'action.",
        ],
        results: [
          "En ligne sur socialfame.co.uk. Une correction du moteur arrive sur toutes les vitrines au déploiement suivant.",
        ],
      },
      es: {
        description: [
          'Social Fame UK es la tienda británica del motor Social-Fame. Tiene su propio dominio, diseño y cuadrícula de servicios, con una tarjeta de pedido para cada servicio de Instagram, TikTok, YouTube y Facebook.',
          'La genera y despliega el mismo script que social-fame.com, como proyecto propio de Cloudflare Pages.',
        ],
        challenges: [
          'Cada mercado necesita su dominio, sus páginas y su presencia en buscadores. Mantener un segundo código para cada uno duplicaría cada arreglo.',
        ],
        solutions: [
          'Una configuración de sitio (SITE_ID) controla diseño, textos, sitemap y páginas por plataforma, mientras pago, procesamiento y cuentas vienen de las funciones serverless compartidas. Se paga con el campo de tarjeta Revolut integrado y los pedidos pagados van solos a la API del proveedor.',
          'La página abre con un selector de plataforma y una cuadrícula de tarjetas de pedido, seguidos de un muro de reseñas, una FAQ y una llamada final a la acción.',
        ],
        results: [
          'En línea en socialfame.co.uk. Un arreglo en el motor llega a todas las tiendas en el siguiente despliegue.',
        ],
      },
      it: {
        description: [
          'Social Fame UK è la vetrina britannica del motore Social-Fame. Ha dominio, layout e griglia di servizi propri, con una scheda d’ordine per ogni servizio Instagram, TikTok, YouTube e Facebook.',
          'Viene generata e pubblicata dallo stesso script di social-fame.com, come progetto Cloudflare Pages separato.',
        ],
        challenges: [
          'Ogni mercato ha bisogno di dominio, pagine e presenza nelle ricerche propri. Mantenere un secondo codice per ciascuno raddoppierebbe ogni correzione.',
        ],
        solutions: [
          "Una configurazione di sito (SITE_ID) governa layout, testi, sitemap e pagine per piattaforma, mentre pagamento, evasione e account vengono dalle funzioni serverless condivise. Si paga nel campo carta Revolut integrato e gli ordini pagati vanno da soli all'API del fornitore.",
          'La pagina si apre con un selettore di piattaforma e una griglia di schede d’ordine, seguiti da un muro di recensioni, una FAQ e una call to action finale.',
        ],
        results: [
          'Online su socialfame.co.uk. Una correzione al motore arriva su tutte le vetrine al deploy successivo.',
        ],
      },
      de: {
        description: [
          'Social Fame UK ist der britische Shop der Social-Fame-Engine, mit eigener Domain, eigenem Layout und einem Service-Raster mit einer Bestellkarte für jeden Instagram-, TikTok-, YouTube- und Facebook-Service.',
          'Er wird vom selben Build-Skript wie social-fame.com erzeugt und als eigenes Cloudflare-Pages-Projekt deployt.',
        ],
        challenges: [
          'Jeder Markt braucht eigene Domain, Seiten und Sichtbarkeit in der Suche. Eine zweite Codebasis pro Markt würde jeden Fix verdoppeln.',
        ],
        solutions: [
          'Eine Site-Konfiguration (SITE_ID) steuert Layout, Texte, Sitemap und Plattformseiten, während Checkout, Abwicklung und Konten aus den gemeinsamen Serverless-Funktionen kommen. Bezahlt wird im eingebetteten Revolut-Kartenfeld, und bezahlte Bestellungen gehen automatisch an die Lieferanten-API.',
          'Die Seite beginnt mit einem Plattform-Umschalter und einem Raster aus Bestellkarten, gefolgt von einer Bewertungswand, einem FAQ und einem letzten Call-to-Action.',
        ],
        results: [
          'Live auf socialfame.co.uk. Ein Fix an der Engine erreicht beim nächsten Deploy jeden Shop.',
        ],
      },
    }),
  },
  {
    ...APP,
    id: 'monetizeyoutube',
    url: 'https://monetizeyoutube.com',
    kind: 'apps',
    title: 'MonetizeYouTube',
    date: [3, 10, 2026],
    tools: [SF_FRONT, SF_BACK, SF_REVOLUT, SF_JOBS, SF_HOST],
    copy: storeCopy(['front', 'back', 'pay', 'jobs', 'host'], STORE_SERVICES, {
      en: {
        description: [
          'MonetizeYouTube is a single-niche landing site for YouTube creators, generated from the Social-Fame engine. One audience, one offer, and a page built to convert.',
          'Behind it sit dozens of generated per-service landing pages and a sitemap, all deployed by the shared build script.',
        ],
        challenges: [
          'A general store speaks to everyone and convinces nobody in particular. A niche domain needs copy and structure focused on one audience, without forking the backend.',
        ],
        solutions: [
          'The page follows a direct-response structure: a hero offer with one call to action, a three-step how-it-works section, a testimonial carousel, an FAQ and a closing call to action, with service links grouped by platform in the footer.',
          'The build script generates the service pages and sitemap from the shared catalogue. Checkout runs through Revolut, and paid orders are forwarded to the supplier API automatically.',
        ],
        results: [
          'Live on monetizeyoutube.com as its own storefront, sharing payments and fulfilment with the rest of the Social-Fame sites.',
        ],
      },
      fr: {
        description: [
          "MonetizeYouTube est un site de niche pour les créateurs YouTube, généré depuis le moteur Social-Fame. Une audience, une offre, et une page pensée pour convertir.",
          "Derrière, des dizaines de pages par service et un sitemap générés, tous déployés par le script de build partagé.",
        ],
        challenges: [
          "Une boutique généraliste parle à tout le monde et ne convainc personne en particulier. Un domaine de niche demande des textes et une structure centrés sur une audience, sans dupliquer le backend.",
        ],
        solutions: [
          "La page suit une structure de vente directe : une offre en ouverture avec un seul appel à l'action, une section en trois étapes, un carrousel de témoignages, une FAQ et un appel final, avec les services regroupés par plateforme en pied de page.",
          "Le script de build génère les pages de services et le sitemap à partir du catalogue partagé. Le paiement passe par Revolut et les commandes payées partent automatiquement vers l'API fournisseur.",
        ],
        results: [
          "En ligne sur monetizeyoutube.com comme vitrine à part entière, avec paiement et traitement partagés avec les autres sites Social-Fame.",
        ],
      },
      es: {
        description: [
          'MonetizeYouTube es un sitio de nicho para creadores de YouTube, generado desde el motor Social-Fame. Una audiencia, una oferta y una página pensada para convertir.',
          'Detrás hay decenas de páginas por servicio y un sitemap generados, todos desplegados por el script de build compartido.',
        ],
        challenges: [
          'Una tienda generalista le habla a todos y no convence a nadie en particular. Un dominio de nicho necesita textos y estructura centrados en una audiencia, sin duplicar el backend.',
        ],
        solutions: [
          'La página sigue una estructura de respuesta directa: oferta principal con una sola llamada a la acción, una sección de tres pasos, un carrusel de testimonios, una FAQ y una llamada final, con los servicios agrupados por plataforma en el pie.',
          'El script de build genera las páginas de servicio y el sitemap desde el catálogo compartido. El pago va por Revolut y los pedidos pagados se envían solos a la API del proveedor.',
        ],
        results: [
          'En línea en monetizeyoutube.com como tienda propia, compartiendo pagos y procesamiento con el resto de sitios Social-Fame.',
        ],
      },
      it: {
        description: [
          'MonetizeYouTube è un sito di nicchia per creator YouTube, generato dal motore Social-Fame. Un pubblico, un’offerta e una pagina costruita per convertire.',
          'Dietro ci sono decine di pagine per servizio e una sitemap generate, tutte pubblicate dallo script di build condiviso.',
        ],
        challenges: [
          'Un negozio generalista parla a tutti e non convince nessuno in particolare. Un dominio di nicchia richiede testi e struttura centrati su un pubblico, senza duplicare il backend.',
        ],
        solutions: [
          "La pagina segue una struttura a risposta diretta: offerta iniziale con una sola call to action, una sezione in tre passaggi, un carosello di testimonianze, una FAQ e una call to action finale, con i servizi raggruppati per piattaforma nel footer.",
          "Lo script di build genera le pagine di servizio e la sitemap dal catalogo condiviso. Il pagamento passa da Revolut e gli ordini pagati vanno da soli all'API del fornitore.",
        ],
        results: [
          'Online su monetizeyoutube.com come vetrina a sé, con pagamenti ed evasione condivisi con gli altri siti Social-Fame.',
        ],
      },
      de: {
        description: [
          'MonetizeYouTube ist eine Nischenseite für YouTube-Creator, erzeugt aus der Social-Fame-Engine. Eine Zielgruppe, ein Angebot und eine Seite, die auf Conversion gebaut ist.',
          'Dahinter stehen Dutzende generierte Service-Landingpages und eine Sitemap, alle vom gemeinsamen Build-Skript deployt.',
        ],
        challenges: [
          'Ein Gemischtwarenladen spricht alle an und überzeugt niemanden besonders. Eine Nischendomain braucht Text und Aufbau für eine Zielgruppe, ohne das Backend zu forken.',
        ],
        solutions: [
          'Die Seite folgt einem Direct-Response-Aufbau: Hero-Angebot mit einem einzigen Call-to-Action, ein Drei-Schritte-Abschnitt, ein Testimonial-Karussell, ein FAQ und ein letzter Call-to-Action, die Services nach Plattform im Footer gruppiert.',
          'Das Build-Skript erzeugt Service-Seiten und Sitemap aus dem gemeinsamen Katalog. Der Checkout läuft über Revolut, bezahlte Bestellungen gehen automatisch an die Lieferanten-API.',
        ],
        results: [
          'Live auf monetizeyoutube.com als eigener Shop, mit Zahlungen und Abwicklung gemeinsam mit den übrigen Social-Fame-Seiten.',
        ],
      },
    }),
  },
  {
    ...APP,
    id: 'socialfame-fr',
    url: 'https://socialfame.fr',
    kind: 'apps',
    title: 'Social Fame France',
    date: [29, 9, 2026],
    tools: [
      SF_FRONT,
      SF_BACK,
      'Stripe Checkout + signed webhooks',
      SF_JOBS,
      'Cloudflare Workers AI support chat (open-source Llama model)',
      'Catalogue generated from one master data file · Cloudflare Pages · GitHub auto-deploy',
    ],
    copy: storeCopy(['front', 'back', 'pay', 'jobs', 'ai', 'host'], STORE_SERVICES, {
      en: {
        description: [
          'Social Fame France is the French store of the brand: a separate Cloudflare Pages build with Stripe checkout, order-tracking accounts and an AI support chat.',
          'It covers ten platforms, from Instagram and TikTok to WhatsApp channels and Threads, with a landing page for every service.',
        ],
        challenges: [
          'The French market needed its own catalogue, copy and payment processor, kept apart from the Revolut stores, while delivering orders as automatically as the rest of the network.',
        ],
        solutions: [
          'The whole catalogue is generated from one master data file. Stripe Checkout takes payment, a signed webhook confirms it and the order goes to the supplier API. A refill queue in Cloudflare KV is worked through by a cron job.',
          'Customers track orders after a magic-link sign-in, with no password. A support chat runs on Cloudflare Workers AI with an open-source Llama model, so there is no per-message API bill.',
        ],
        results: [
          'Live on socialfame.fr, taking card payments through Stripe and fulfilling orders without manual work.',
        ],
      },
      fr: {
        description: [
          "Social Fame France est la boutique française de la marque : un build Cloudflare Pages séparé, avec paiement Stripe, comptes de suivi de commande et chat d'assistance IA.",
          "Elle couvre dix plateformes, d'Instagram et TikTok aux chaînes WhatsApp et Threads, avec une page dédiée à chaque service.",
        ],
        challenges: [
          "Le marché français demandait son propre catalogue, ses textes et son prestataire de paiement, séparés des boutiques Revolut, tout en livrant les commandes aussi automatiquement que le reste du réseau.",
        ],
        solutions: [
          "Tout le catalogue est généré à partir d'un seul fichier de données. Stripe Checkout encaisse, un webhook signé confirme le paiement et la commande part vers l'API fournisseur. Une file de recharges dans Cloudflare KV est traitée par une tâche planifiée.",
          "Le client suit ses commandes après une connexion par lien magique, sans mot de passe. Le chat d'assistance tourne sur Cloudflare Workers AI avec un modèle Llama open source, donc sans facture d'API par message.",
        ],
        results: [
          "En ligne sur socialfame.fr, avec paiement par carte via Stripe et livraison des commandes sans intervention manuelle.",
        ],
      },
      es: {
        description: [
          'Social Fame France es la tienda francesa de la marca: un build separado en Cloudflare Pages con pago por Stripe, cuentas de seguimiento de pedidos y un chat de soporte con IA.',
          'Cubre diez plataformas, de Instagram y TikTok a canales de WhatsApp y Threads, con una página para cada servicio.',
        ],
        challenges: [
          'El mercado francés necesitaba su propio catálogo, textos y procesador de pagos, separados de las tiendas con Revolut, entregando los pedidos tan automáticamente como el resto de la red.',
        ],
        solutions: [
          'Todo el catálogo se genera desde un único archivo de datos. Stripe Checkout cobra, un webhook firmado lo confirma y el pedido va a la API del proveedor. Una cola de recargas en Cloudflare KV la procesa una tarea programada.',
          'El cliente sigue sus pedidos tras entrar con un enlace mágico, sin contraseña. El chat de soporte corre en Cloudflare Workers AI con un modelo Llama de código abierto, así que no hay factura de API por mensaje.',
        ],
        results: [
          'En línea en socialfame.fr, cobrando con tarjeta por Stripe y entregando pedidos sin trabajo manual.',
        ],
      },
      it: {
        description: [
          'Social Fame France è il negozio francese del marchio: un build Cloudflare Pages separato con pagamento Stripe, account per seguire gli ordini e una chat di supporto IA.',
          'Copre dieci piattaforme, da Instagram e TikTok ai canali WhatsApp e Threads, con una pagina per ogni servizio.',
        ],
        challenges: [
          'Il mercato francese aveva bisogno di catalogo, testi e processore di pagamento propri, separati dai negozi Revolut, evadendo gli ordini in modo automatico come il resto della rete.',
        ],
        solutions: [
          "L'intero catalogo è generato da un unico file di dati. Stripe Checkout incassa, un webhook firmato conferma e l'ordine va all'API del fornitore. Una coda di ricariche in Cloudflare KV viene smaltita da un job pianificato.",
          'Il cliente segue gli ordini dopo un accesso con link magico, senza password. La chat di supporto gira su Cloudflare Workers AI con un modello Llama open source, quindi nessuna bolletta API per messaggio.',
        ],
        results: [
          'Online su socialfame.fr, con pagamenti con carta tramite Stripe ed evasione degli ordini senza lavoro manuale.',
        ],
      },
      de: {
        description: [
          'Social Fame France ist der französische Shop der Marke: ein eigener Cloudflare-Pages-Build mit Stripe-Checkout, Konten zur Bestellverfolgung und einem KI-Support-Chat.',
          'Er deckt zehn Plattformen ab, von Instagram und TikTok bis zu WhatsApp-Kanälen und Threads, mit einer Landingpage pro Service.',
        ],
        challenges: [
          'Der französische Markt brauchte eigenen Katalog, eigene Texte und einen eigenen Zahlungsanbieter, getrennt von den Revolut-Shops, bei ebenso automatischer Auslieferung wie im übrigen Netzwerk.',
        ],
        solutions: [
          'Der gesamte Katalog wird aus einer einzigen Datendatei erzeugt. Stripe Checkout kassiert, ein signierter Webhook bestätigt, und die Bestellung geht an die Lieferanten-API. Eine Nachfüll-Warteschlange in Cloudflare KV arbeitet ein Cronjob ab.',
          'Kunden verfolgen Bestellungen nach einer Anmeldung per Magic Link, ohne Passwort. Der Support-Chat läuft auf Cloudflare Workers AI mit einem Open-Source-Llama-Modell, also ohne API-Rechnung pro Nachricht.',
        ],
        results: [
          'Live auf socialfame.fr, mit Kartenzahlung über Stripe und Auslieferung ohne Handarbeit.',
        ],
      },
    }),
  },
  {
    ...APP,
    id: 'gloveri',
    url: 'https://gloveri.com',
    kind: 'apps',
    title: 'Gloveri',
    date: [4, 8, 2026],
    tools: [
      'Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4',
      'Neon Postgres · Drizzle ORM · Better Auth (database sessions)',
      'Cloudflare R2 for photos and ID checks · Pusher Channels for messaging',
      'Whop memberships · Stripe Billing built in behind a switch',
      'Cloudflare Workers via OpenNext · heartbeat cron Worker · Cloudflare Access for staging · Sentry · Resend',
    ],
    copy: copy(['front', 'back', 'media', 'pay', 'host'], {
      en: {
        category: CAT.en.dating, services: DATING_SERVICES.en, client: OWN.en, industry: DATING.en,
        description: [
          'Gloveri is a members-only luxury dating web app: verified members, browsing, profiles, private photos, real-time messaging and paid memberships, plus the safety, legal and marketing pages around them.',
          'I built it and run it. It has been public since August 2026, with nothing in the app running on mock data.',
        ],
        challenges: [
          'A dating product depends on trust. Fake profiles and unreviewed photos sink it, so verification and moderation had to be part of the core, not added later, on a stack that stays cheap to run.',
        ],
        solutions: [
          'Signups pass a verification gate with manual ID review. Every photo waits for human moderation, and members grant access to private photos one by one. Messaging runs over Pusher with read receipts, membership-tier gates and anti-spam checks, and search uses URL-driven filters with keyset pagination inside a 100 km radius.',
          'Reports, two-way blocking, a staff queue and bans cover safety. Memberships renew through Whop, with a full Stripe Billing integration ready behind a switch. A separate heartbeat Worker rotates the listing every five minutes so every profile gets its turn at the top.',
        ],
        results: [
          'Live on gloveri.com on one Cloudflare Worker, one Postgres database and one R2 bucket, with a staging copy behind Cloudflare Access and a deploy test suite that checks the setup before each release.',
        ],
      },
      fr: {
        category: CAT.fr.dating, services: DATING_SERVICES.fr, client: OWN.fr, industry: DATING.fr,
        description: [
          "Gloveri est une application de rencontre haut de gamme réservée aux membres : membres vérifiés, navigation, profils, photos privées, messagerie en temps réel et abonnements, avec les pages sécurité, légales et marketing autour.",
          "Je l'ai construite et je l'exploite. Elle est publique depuis août 2026, sans aucune donnée fictive dans l'application.",
        ],
        challenges: [
          "Un site de rencontre repose sur la confiance. Faux profils et photos non vérifiées le coulent : vérification et modération devaient faire partie du cœur du produit, sur une stack peu coûteuse à faire tourner.",
        ],
        solutions: [
          "L'inscription passe par une vérification d'identité relue à la main. Chaque photo attend une modération humaine et les membres ouvrent leurs photos privées une par une. La messagerie passe par Pusher avec accusés de lecture, accès selon l'abonnement et anti-spam, et la recherche utilise des filtres dans l'URL avec pagination par clé dans un rayon de 100 km.",
          "Signalements, blocage réciproque, file de modération et bannissements couvrent la sécurité. Les abonnements se renouvellent via Whop, avec une intégration Stripe Billing complète prête à activer. Un Worker séparé fait tourner la liste toutes les cinq minutes pour que chaque profil passe en tête.",
        ],
        results: [
          "En ligne sur gloveri.com avec un Worker Cloudflare, une base Postgres et un bucket R2, une copie de préproduction derrière Cloudflare Access et une suite de tests qui vérifie la configuration avant chaque mise en ligne.",
        ],
      },
      es: {
        category: CAT.es.dating, services: DATING_SERVICES.es, client: OWN.es, industry: DATING.es,
        description: [
          'Gloveri es una app de citas de lujo solo para miembros: miembros verificados, exploración, perfiles, fotos privadas, mensajería en tiempo real y membresías de pago, con las páginas de seguridad, legales y de marketing alrededor.',
          'La construí y la gestiono. Es pública desde agosto de 2026 y nada en la app funciona con datos de prueba.',
        ],
        challenges: [
          'Un producto de citas depende de la confianza. Los perfiles falsos y las fotos sin revisar lo hunden, así que la verificación y la moderación tenían que estar en el núcleo, sobre una stack barata de mantener.',
        ],
        solutions: [
          'El registro pasa por una verificación de identidad revisada a mano. Cada foto espera moderación humana y los miembros dan acceso a sus fotos privadas una a una. La mensajería va por Pusher con confirmación de lectura, acceso según membresía y antispam, y la búsqueda usa filtros en la URL con paginación por clave dentro de un radio de 100 km.',
          'Denuncias, bloqueo mutuo, una cola de moderación y expulsiones cubren la seguridad. Las membresías se renuevan con Whop, con una integración completa de Stripe Billing lista para activar. Un Worker aparte rota el listado cada cinco minutos para que todos los perfiles pasen por arriba.',
        ],
        results: [
          'En línea en gloveri.com con un Worker de Cloudflare, una base Postgres y un bucket R2, una copia de staging detrás de Cloudflare Access y una batería de tests que revisa la configuración antes de cada despliegue.',
        ],
      },
      it: {
        category: CAT.it.dating, services: DATING_SERVICES.it, client: OWN.it, industry: DATING.it,
        description: [
          'Gloveri è un’app di incontri di lusso riservata ai membri: membri verificati, navigazione, profili, foto private, messaggi in tempo reale e abbonamenti, con le pagine di sicurezza, legali e marketing attorno.',
          'L’ho costruita e la gestisco. È pubblica da agosto 2026 e nell’app non c’è alcun dato fittizio.',
        ],
        challenges: [
          'Un prodotto di incontri vive di fiducia. Profili falsi e foto non controllate lo affondano, quindi verifica e moderazione dovevano stare nel cuore del prodotto, su uno stack economico da gestire.',
        ],
        solutions: [
          "L'iscrizione passa da una verifica d'identità controllata a mano. Ogni foto attende una moderazione umana e i membri concedono l'accesso alle foto private una alla volta. I messaggi viaggiano su Pusher con conferme di lettura, accesso per livello di abbonamento e anti-spam, e la ricerca usa filtri nell'URL con paginazione a chiave entro 100 km.",
          'Segnalazioni, blocco reciproco, una coda di moderazione e ban coprono la sicurezza. Gli abbonamenti si rinnovano con Whop, con un’integrazione Stripe Billing completa pronta da attivare. Un Worker separato ruota l’elenco ogni cinque minuti, così ogni profilo passa in cima.',
        ],
        results: [
          'Online su gloveri.com con un Worker Cloudflare, un database Postgres e un bucket R2, una copia di staging dietro Cloudflare Access e una suite di test che verifica la configurazione prima di ogni rilascio.',
        ],
      },
      de: {
        category: CAT.de.dating, services: DATING_SERVICES.de, client: OWN.de, industry: DATING.de,
        description: [
          'Gloveri ist eine Luxus-Dating-Web-App nur für Mitglieder: verifizierte Mitglieder, Stöbern, Profile, private Fotos, Echtzeit-Nachrichten und bezahlte Mitgliedschaften, dazu Sicherheits-, Rechts- und Marketingseiten.',
          'Ich habe sie gebaut und betreibe sie. Sie ist seit August 2026 öffentlich, und nichts in der App läuft mit Testdaten.',
        ],
        challenges: [
          'Ein Dating-Produkt lebt von Vertrauen. Fake-Profile und ungeprüfte Fotos versenken es, also mussten Verifizierung und Moderation zum Kern gehören, auf einem Stack, der günstig im Betrieb bleibt.',
        ],
        solutions: [
          'Die Anmeldung läuft über eine manuell geprüfte Identitätsverifizierung. Jedes Foto wartet auf menschliche Moderation, und Mitglieder geben private Fotos einzeln frei. Nachrichten laufen über Pusher mit Lesebestätigungen, Mitgliedschaftsstufen und Spamschutz, die Suche nutzt URL-Filter mit Keyset-Pagination im Umkreis von 100 km.',
          'Meldungen, gegenseitiges Blockieren, eine Moderationswarteschlange und Sperren sorgen für Sicherheit. Mitgliedschaften verlängern sich über Whop, eine vollständige Stripe-Billing-Integration ist einsatzbereit. Ein separater Heartbeat-Worker rotiert die Liste alle fünf Minuten, damit jedes Profil nach oben kommt.',
        ],
        results: [
          'Live auf gloveri.com mit einem Cloudflare Worker, einer Postgres-Datenbank und einem R2-Bucket, einer Staging-Kopie hinter Cloudflare Access und einer Testsuite, die das Setup vor jedem Release prüft.',
        ],
      },
    }),
  },
  {
    ...APP,
    id: 'apoile',
    url: 'https://apoile.org',
    kind: 'apps',
    title: 'Apoile',
    date: [14, 9, 2026],
    tools: [
      'Next.js (App Router) · React · TypeScript · Tailwind CSS',
      'Postgres · Drizzle ORM · Better Auth',
      'Whop memberships',
      'Cloudflare Workers · Resend',
    ],
    copy: copy(['front', 'back', 'pay', 'host'], {
      en: {
        category: CAT.en.dating, services: DATING_SERVICES.en, client: OWN.en, industry: DATING.en,
        description: [
          'Apoile is a dating app for meeting people nearby, open in Canada and the United States. It is a second brand on the platform I built for Gloveri, with its own identity and a different idea of how people should meet.',
          'Its promise is simple: a conversation opens only when both people say yes, and a person reviews every photo before anyone sees it.',
        ],
        challenges: [
          'On most dating apps anyone can message anyone, and the inbox fills with messages nobody asked for. Apoile had to feel calmer and safer while reusing the existing platform instead of starting over.',
        ],
        solutions: [
          'Messaging stays locked until a mutual yes. Every account confirms its email, and photos go through human review before they are visible. Members filter by city, age and interests, and their profiles open with five things they care about.',
          'Safety tools, including blocking, unmatching and reporting to a moderator, are built in from the first screen. Memberships run through Whop on the same backend as Gloveri.',
        ],
        results: [
          'Live on apoile.org with its own brand, copy and landing page, launched on an existing codebase instead of a new build.',
        ],
      },
      fr: {
        category: CAT.fr.dating, services: DATING_SERVICES.fr, client: OWN.fr, industry: DATING.fr,
        description: [
          "Apoile est une application pour rencontrer des gens près de chez soi, ouverte au Canada et aux États-Unis. C'est une seconde marque sur la plateforme construite pour Gloveri, avec sa propre identité et une autre idée de la rencontre.",
          "Sa promesse est simple : une conversation ne s'ouvre que si les deux personnes disent oui, et une personne vérifie chaque photo avant que quiconque la voie.",
        ],
        challenges: [
          "Sur la plupart des applis, n'importe qui peut écrire à n'importe qui, et la boîte de réception déborde de messages non sollicités. Apoile devait paraître plus calme et plus sûre, en réutilisant la plateforme existante plutôt que de repartir de zéro.",
        ],
        solutions: [
          "La messagerie reste fermée jusqu'à un oui mutuel. Chaque compte confirme son e-mail et les photos passent par une modération humaine avant d'être visibles. Les membres filtrent par ville, âge et centres d'intérêt, et chaque profil s'ouvre sur cinq choses qui comptent pour la personne.",
          "Les outils de sécurité, blocage, retrait du match et signalement à un modérateur, sont là dès le premier écran. Les abonnements passent par Whop, sur le même backend que Gloveri.",
        ],
        results: [
          "En ligne sur apoile.org avec sa marque, ses textes et sa page d'accueil, lancée sur un code existant plutôt qu'un nouveau développement.",
        ],
      },
      es: {
        category: CAT.es.dating, services: DATING_SERVICES.es, client: OWN.es, industry: DATING.es,
        description: [
          'Apoile es una app de citas para conocer gente cercana, disponible en Canadá y Estados Unidos. Es una segunda marca sobre la plataforma que construí para Gloveri, con identidad propia y otra idea de cómo conocerse.',
          'Su promesa es simple: una conversación solo se abre cuando ambas personas dicen que sí, y una persona revisa cada foto antes de que nadie la vea.',
        ],
        challenges: [
          'En la mayoría de apps cualquiera puede escribir a cualquiera, y la bandeja se llena de mensajes que nadie pidió. Apoile tenía que sentirse más tranquila y segura reutilizando la plataforma existente en lugar de empezar de cero.',
        ],
        solutions: [
          'La mensajería queda bloqueada hasta un sí mutuo. Cada cuenta confirma su correo y las fotos pasan por revisión humana antes de ser visibles. Los miembros filtran por ciudad, edad e intereses, y cada perfil empieza con cinco cosas que le importan a la persona.',
          'Las herramientas de seguridad, bloquear, deshacer el match y denunciar a un moderador, están desde la primera pantalla. Las membresías van por Whop, sobre el mismo backend que Gloveri.',
        ],
        results: [
          'En línea en apoile.org con su marca, textos y página de inicio propios, lanzada sobre un código existente en lugar de un desarrollo nuevo.',
        ],
      },
      it: {
        category: CAT.it.dating, services: DATING_SERVICES.it, client: OWN.it, industry: DATING.it,
        description: [
          'Apoile è un’app per conoscere persone vicine, aperta in Canada e negli Stati Uniti. È un secondo marchio sulla piattaforma costruita per Gloveri, con identità propria e un’altra idea di come incontrarsi.',
          'La promessa è semplice: una conversazione si apre solo quando entrambe le persone dicono sì, e una persona controlla ogni foto prima che qualcuno la veda.',
        ],
        challenges: [
          'Sulla maggior parte delle app chiunque può scrivere a chiunque, e la casella si riempie di messaggi non richiesti. Apoile doveva risultare più tranquilla e sicura riutilizzando la piattaforma esistente invece di ripartire da zero.',
        ],
        solutions: [
          'I messaggi restano bloccati fino a un sì reciproco. Ogni account conferma l’email e le foto passano da una revisione umana prima di essere visibili. I membri filtrano per città, età e interessi, e ogni profilo si apre con cinque cose a cui la persona tiene.',
          'Gli strumenti di sicurezza, blocco, rimozione del match e segnalazione a un moderatore, ci sono dalla prima schermata. Gli abbonamenti passano da Whop, sullo stesso backend di Gloveri.',
        ],
        results: [
          'Online su apoile.org con marchio, testi e landing page propri, lanciata su un codice esistente invece di un nuovo sviluppo.',
        ],
      },
      de: {
        category: CAT.de.dating, services: DATING_SERVICES.de, client: OWN.de, industry: DATING.de,
        description: [
          'Apoile ist eine Dating-App, um Menschen in der Nähe kennenzulernen, verfügbar in Kanada und den USA. Sie ist eine zweite Marke auf der Plattform, die ich für Gloveri gebaut habe, mit eigener Identität und einer anderen Vorstellung vom Kennenlernen.',
          'Das Versprechen ist einfach: Ein Gespräch öffnet sich erst, wenn beide Ja sagen, und ein Mensch prüft jedes Foto, bevor es jemand sieht.',
        ],
        challenges: [
          'In den meisten Apps kann jeder jedem schreiben, und das Postfach füllt sich mit Nachrichten, um die niemand gebeten hat. Apoile sollte ruhiger und sicherer wirken und dabei die bestehende Plattform nutzen, statt neu anzufangen.',
        ],
        solutions: [
          'Nachrichten bleiben bis zu einem gegenseitigen Ja gesperrt. Jedes Konto bestätigt seine E-Mail, und Fotos durchlaufen eine menschliche Prüfung, bevor sie sichtbar sind. Mitglieder filtern nach Stadt, Alter und Interessen, und jedes Profil beginnt mit fünf Dingen, die der Person wichtig sind.',
          'Sicherheitswerkzeuge wie Blockieren, Match aufheben und Melden an einen Moderator sind ab dem ersten Bildschirm da. Mitgliedschaften laufen über Whop, auf demselben Backend wie Gloveri.',
        ],
        results: [
          'Live auf apoile.org mit eigener Marke, eigenen Texten und eigener Landingpage, gestartet auf bestehendem Code statt als Neuentwicklung.',
        ],
      },
    }),
  },
];
