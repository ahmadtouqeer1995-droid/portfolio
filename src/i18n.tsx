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
    skillsTitle: 'Skills',
    navContact: 'Contact',
    projectsTitle: 'Projects',
    projectsIntro:
      'Ten e-commerce builds from my freelance web development years. Every one shipped, each with a video walkthrough, the constraints I worked under and what came out of it.',
    projectsIntroVoice:
      'Voice agents that listen, understand and answer out loud: speech recognition, intent detection, retrieval and speech synthesis, running on a local AI stack.',
    tabVoice: 'Voice Agents',
    tabLead: 'Lead Generation',
    tabCrm: 'CRM Automation',
    tabOutreach: 'LinkedIn Outreach',
    tabAds: 'AI Video Ads',
    projectsIntroAds:
      'Pipelines where Claude directs image and video models to turn one product photo into a finished ad, with approval checkpoints before any credits are spent.',
    projectsIntroCrm:
      'Workflows that score, route and assign every lead, draft the follow-up and hand sales a clean CRM record.',
    projectsIntroOutreach:
      'Outreach systems that find the right people, research them, write personal LinkedIn and email messages and keep the conversation going.',
    projectsIntroLead:
      'Automations that capture every inbound lead, score it with an LLM, write it to the CRM and alert sales on the hot ones within seconds.',
    tabWeb: 'Shopify Stores & Websites',
    projectOne: 'project',
    projectMany: 'projects',
    backToProjects: 'Projects',
    notFound: 'Project not found.',
    backToProjectsLink: 'Back to projects',
    meLabel: 'Me',
    meRole: 'AI Engineer — Agents, Automations & SaaS',
    meIntro:
      'AI engineer in Paris, working on agentic AI, generative AI, RAG and LLM applications. I have built production AI for Allianz France, Havas Group, KHOME and Sopra Steria — agents that reach into enterprise systems, RAG pipelines over regulatory and property documents, and automation that takes work off people’s desks. Alongside that, years of freelance web work: 100+ projects delivered and products of my own sold over a thousand times.',
    meViewProjects: 'View my projects',
    meStatsClients: 'Enterprise teams delivered for',
    meStatsAI: 'Years in AI & automation',
    meStatsProjects: 'Projects delivered',
    meStatsThemes: 'Copies of my products sold',
    meWhatIDo: 'What I do',
    meShopTitle: 'AI Agents & Multi-Agent Workflows',
    meShopText: 'Agents that call tools, reach your APIs and make decisions — LangChain, LangGraph, LangSmith, CrewAI and MCP, with memory, human-in-the-loop checkpoints and evaluation to keep them reliable.',
    meWebTitle: 'RAG & Knowledge Systems',
    meWebText: 'Document ingestion, chunking, embeddings and semantic search over your own content, on PostgreSQL with pgvector or Pinecone — and retrieval evaluated properly, not assumed to work.',
    meAiTitle: 'Business Automation',
    meAiText: 'n8n, Make, Zapier, Power Automate and Copilot Studio, plus custom REST integrations, webhooks and OAuth when the off-the-shelf node runs out. CRM automation, reporting, internal ops.',
    meContentTitle: 'SaaS, Apps & AI Websites',
    meContentText: 'Full products, not prototypes: React and Next.js on the front, FastAPI or Node and PostgreSQL behind, shipped with Docker, CI/CD, logging and cost monitoring on Azure or Vercel.',
    meJourneyTitle: 'My journey',
    meJourneyText:
      'I hold a Master’s in Machine Learning for Data Science from Université Paris Cité, then trained in no-code, automation and AI at .decode. Since then I have built AI in production: automation and generative AI at Allianz France, agentic solutions at Havas Group, RAG pipelines over property and regulatory documents at KHOME, and agentic and RAG architectures at Sopra Steria, where I am now. Running alongside that, years of freelance web work: 100+ e-commerce and web projects, and products of my own sold more than a thousand times. I care about the unglamorous half of this job — data confidentiality, GDPR, access control, and actually validating what a model produces before it reaches a user. Based in Paris, working in English and French, and I also speak Urdu and Hindi.',
    meTimelineTitle: 'Where I have worked',
    contactLabel: 'Contact me',
    contactHeading: "Let's work",
    contactHeadingItalic: 'together',
    contactText: 'Tell me about the agent, automation, SaaS product or website you have in mind — in English or French. A short message is enough to get started.',
    scanWhatsapp: 'Scan for WhatsApp',
    downloadCv: 'Download my CV',
    description: 'Project Description',
    challenges: 'Challenges',
    solutions: 'Solutions',
    results: 'Results',
    published: 'Published',
    services: 'Services',
    client: 'Client',
    industry: 'Industry',
    stack: 'Stack',
  },
  fr: {
    home: 'Accueil',
    skillsTitle: 'Compétences',
    navContact: 'Contact',
    projectsTitle: 'Projets',
    projectsIntro:
      "Dix projets e-commerce issus de mes années de développement web en freelance. Tous livrés, chacun avec une vidéo de présentation, les contraintes du projet et ce qui en est sorti.",
    projectsIntroVoice:
      'Des agents vocaux qui écoutent, comprennent et répondent à voix haute : reconnaissance vocale, détection d’intention, recherche et synthèse vocale, sur une stack IA locale.',
    tabVoice: 'Agents vocaux',
    tabLead: 'Génération de leads',
    tabCrm: 'Automatisation CRM',
    tabOutreach: 'Prospection LinkedIn',
    tabAds: 'Publicités vidéo IA',
    projectsIntroAds:
      'Des pipelines où Claude pilote des modèles d\'image et de vidéo pour transformer une photo produit en publicité finie, avec des validations avant toute dépense de crédits.',
    projectsIntroCrm:
      'Des workflows qui notent, routent et attribuent chaque lead, rédigent la relance et livrent aux commerciaux une fiche CRM propre.',
    projectsIntroOutreach:
      'Des systèmes de prospection qui trouvent les bonnes personnes, se renseignent sur elles, rédigent des messages LinkedIn et e-mail personnels et entretiennent la conversation.',
    projectsIntroLead:
      'Des automatisations qui captent chaque lead entrant, le notent avec un LLM, l’enregistrent dans le CRM et alertent les commerciaux sur les leads chauds en quelques secondes.',
    tabWeb: 'Boutiques Shopify & sites web',
    projectOne: 'projet',
    projectMany: 'projets',
    backToProjects: 'Projets',
    notFound: 'Projet introuvable.',
    backToProjectsLink: 'Retour aux projets',
    meLabel: 'Moi',
    meRole: 'Ingénieur IA — Agents, Automatisations & SaaS',
    meIntro:
      "Ingénieur IA à Paris, spécialisé en IA agentique, IA générative, RAG et applications LLM. J'ai construit de l'IA en production pour Allianz France, Havas Group, KHOME et Sopra Steria — des agents qui vont chercher dans les systèmes de l'entreprise, des pipelines RAG sur des documents réglementaires et immobiliers, et de l'automatisation qui enlève du travail des bureaux. En parallèle, des années de web en freelance : plus de 100 projets livrés et mes propres produits vendus à plus d'un millier d'exemplaires.",
    meViewProjects: 'Voir mes projets',
    meStatsClients: 'Grandes entreprises servies',
    meStatsAI: 'Années en IA & automatisation',
    meStatsProjects: 'Projets livrés',
    meStatsThemes: 'Exemplaires de mes produits vendus',
    meWhatIDo: 'Ce que je fais',
    meShopTitle: 'Agents IA & Workflows multi-agents',
    meShopText: "Des agents qui appellent des outils, atteignent vos API et prennent des décisions — LangChain, LangGraph, LangSmith, CrewAI et MCP, avec mémoire, points de validation humaine et évaluation pour les garder fiables.",
    meWebTitle: 'RAG & Bases de connaissances',
    meWebText: "Ingestion de documents, découpage, embeddings et recherche sémantique sur vos propres contenus, sur PostgreSQL avec pgvector ou Pinecone — avec une évaluation réelle du retrieval, pas une supposition.",
    meAiTitle: 'Automatisation métier',
    meAiText: "n8n, Make, Zapier, Power Automate et Copilot Studio, plus des intégrations REST sur mesure, webhooks et OAuth quand le node standard ne suffit plus. Automatisation CRM, reporting, opérations internes.",
    meContentTitle: 'SaaS, applications & sites IA',
    meContentText: 'De vrais produits, pas des prototypes : React et Next.js côté front, FastAPI ou Node et PostgreSQL derrière, livrés avec Docker, CI/CD, logs et suivi des coûts sur Azure ou Vercel.',
    meJourneyTitle: 'Mon parcours',
    meJourneyText:
      "Je suis titulaire d'un Master Machine Learning pour la Science des Données de l'Université Paris Cité, puis je me suis formé au no-code, à l'automatisation et à l'IA chez .decode. Depuis, je construis de l'IA en production : automatisation et IA générative chez Allianz France, solutions agentiques chez Havas Group, pipelines RAG sur des documents immobiliers et réglementaires chez KHOME, et architectures agentiques et RAG chez Sopra Steria, où je suis aujourd'hui. En parallèle, des années de web en freelance : plus de 100 projets e-commerce et web, et mes propres produits vendus à plus d'un millier d'exemplaires. Je tiens à la moitié ingrate de ce métier — confidentialité des données, RGPD, contrôle des accès, et la validation réelle de ce qu'un modèle produit avant que ça n'arrive chez un utilisateur. Basé à Paris, je travaille en anglais et en français, et je parle aussi ourdou et hindi.",
    meTimelineTitle: 'Où j’ai travaillé',
    contactLabel: 'Contactez-moi',
    contactHeading: 'Travaillons',
    contactHeadingItalic: 'ensemble',
    contactText: "Parlez-moi de l'agent, de l'automatisation, du produit SaaS ou du site que vous avez en tête — en français ou en anglais. Un court message suffit pour commencer.",
    scanWhatsapp: 'Scannez pour WhatsApp',
    downloadCv: 'Télécharger mon CV',
    description: 'Description du projet',
    challenges: 'Défis',
    solutions: 'Solutions',
    results: 'Résultats',
    published: 'Publié',
    services: 'Services',
    client: 'Client',
    industry: 'Secteur',
    stack: 'Stack',
  },
  es: {
    home: 'Inicio',
    skillsTitle: 'Habilidades',
    navContact: 'Contacto',
    projectsTitle: 'Proyectos',
    projectsIntro:
      'Diez proyectos de e-commerce de mis años de desarrollo web freelance. Todos entregados, cada uno con un vídeo de recorrido, las restricciones del proyecto y el resultado.',
    projectsIntroVoice:
      'Agentes de voz que escuchan, entienden y responden en voz alta: reconocimiento de voz, detección de intención, recuperación y síntesis de voz, sobre una stack de IA local.',
    tabVoice: 'Agentes de voz',
    tabLead: 'Generación de leads',
    tabCrm: 'Automatización CRM',
    tabOutreach: 'Prospección en LinkedIn',
    tabAds: 'Anuncios en vídeo con IA',
    projectsIntroAds:
      'Pipelines en los que Claude dirige modelos de imagen y vídeo para convertir una foto de producto en un anuncio terminado, con aprobaciones antes de gastar créditos.',
    projectsIntroCrm:
      'Workflows que puntúan, enrutan y asignan cada lead, redactan el seguimiento y entregan a ventas un registro limpio en el CRM.',
    projectsIntroOutreach:
      'Sistemas de prospección que encuentran a las personas adecuadas, las investigan, escriben mensajes personales por LinkedIn y correo y mantienen viva la conversación.',
    projectsIntroLead:
      'Automatizaciones que captan cada lead entrante, lo puntúan con un LLM, lo guardan en el CRM y avisan a ventas de los leads calientes en segundos.',
    tabWeb: 'Tiendas Shopify y sitios web',
    projectOne: 'proyecto',
    projectMany: 'proyectos',
    backToProjects: 'Proyectos',
    notFound: 'Proyecto no encontrado.',
    backToProjectsLink: 'Volver a proyectos',
    meLabel: 'Yo',
    meRole: 'Ingeniero de IA — Agentes, Automatizaciones y SaaS',
    meIntro:
      'Ingeniero de IA en París, especializado en IA agéntica, IA generativa, RAG y aplicaciones LLM. He construido IA en producción para Allianz France, Havas Group, KHOME y Sopra Steria: agentes que llegan hasta los sistemas de la empresa, pipelines RAG sobre documentos regulatorios e inmobiliarios, y automatización que quita trabajo de encima. En paralelo, años de web como freelance: más de 100 proyectos entregados y productos propios vendidos más de mil veces.',
    meViewProjects: 'Ver mis proyectos',
    meStatsClients: 'Grandes empresas atendidas',
    meStatsAI: 'Años en IA y automatización',
    meStatsProjects: 'Proyectos entregados',
    meStatsThemes: 'Copias de mis productos vendidas',
    meWhatIDo: 'Qué hago',
    meShopTitle: 'Agentes de IA y flujos multiagente',
    meShopText: 'Agentes que llaman herramientas, alcanzan tus APIs y toman decisiones: LangChain, LangGraph, LangSmith, CrewAI y MCP, con memoria, puntos de validación humana y evaluación para mantenerlos fiables.',
    meWebTitle: 'RAG y Bases de conocimiento',
    meWebText: 'Ingesta de documentos, chunking, embeddings y búsqueda semántica sobre tus propios contenidos, en PostgreSQL con pgvector o Pinecone, y con el retrieval evaluado de verdad, no dado por supuesto.',
    meAiTitle: 'Automatización de negocio',
    meAiText: 'n8n, Make, Zapier, Power Automate y Copilot Studio, más integraciones REST a medida, webhooks y OAuth cuando el nodo estándar se queda corto. Automatización de CRM, reporting, operaciones internas.',
    meContentTitle: 'SaaS, apps y webs con IA',
    meContentText: 'Productos completos, no prototipos: React y Next.js en el front, FastAPI o Node y PostgreSQL detrás, entregados con Docker, CI/CD, logging y control de costes en Azure o Vercel.',
    meJourneyTitle: 'Mi trayectoria',
    meJourneyText:
      'Tengo un Máster en Machine Learning para Ciencia de Datos por la Université Paris Cité, y después me formé en no-code, automatización e IA en .decode. Desde entonces construyo IA en producción: automatización e IA generativa en Allianz France, soluciones agénticas en Havas Group, pipelines RAG sobre documentos inmobiliarios y regulatorios en KHOME, y arquitecturas agénticas y RAG en Sopra Steria, donde estoy ahora. En paralelo, años de web como freelance: más de 100 proyectos de e-commerce y web, y productos propios vendidos más de mil veces. Me importa la mitad ingrata de este oficio: confidencialidad de los datos, RGPD, control de accesos y validar de verdad lo que produce un modelo antes de que llegue a un usuario. Con base en París, trabajo en inglés y francés, y también hablo urdu e hindi.',
    meTimelineTitle: 'Dónde he trabajado',
    contactLabel: 'Contáctame',
    contactHeading: 'Trabajemos',
    contactHeadingItalic: 'juntos',
    contactText: 'Cuéntame sobre el agente, la automatización, el producto SaaS o la web que tienes en mente — en inglés o francés. Un mensaje corto basta para empezar.',
    scanWhatsapp: 'Escanea para WhatsApp',
    downloadCv: 'Descargar mi CV',
    description: 'Descripción del proyecto',
    challenges: 'Desafíos',
    solutions: 'Soluciones',
    results: 'Resultados',
    published: 'Publicado',
    services: 'Servicios',
    client: 'Cliente',
    industry: 'Industria',
    stack: 'Stack',
  },
  it: {
    home: 'Home',
    skillsTitle: 'Competenze',
    navContact: 'Contatti',
    projectsTitle: 'Progetti',
    projectsIntro:
      'Dieci progetti e-commerce dai miei anni di sviluppo web freelance. Tutti consegnati, ognuno con un video di presentazione, i vincoli del progetto e il risultato.',
    projectsIntroVoice:
      'Agenti vocali che ascoltano, capiscono e rispondono ad alta voce: riconoscimento vocale, rilevamento dell’intento, recupero e sintesi vocale, su uno stack IA locale.',
    tabVoice: 'Agenti vocali',
    tabLead: 'Lead generation',
    tabCrm: 'Automazione CRM',
    tabOutreach: 'Outreach su LinkedIn',
    tabAds: 'Video pubblicitari IA',
    projectsIntroAds:
      'Pipeline in cui Claude guida modelli di immagini e video per trasformare una foto prodotto in uno spot finito, con approvazioni prima di spendere crediti.',
    projectsIntroCrm:
      'Workflow che valutano, instradano e assegnano ogni lead, scrivono il follow-up e consegnano alle vendite un record CRM pulito.',
    projectsIntroOutreach:
      'Sistemi di outreach che trovano le persone giuste, si informano su di loro, scrivono messaggi personali su LinkedIn e via e-mail e portano avanti la conversazione.',
    projectsIntroLead:
      'Automazioni che acquisiscono ogni lead in entrata, lo valutano con un LLM, lo salvano nel CRM e avvisano le vendite dei lead caldi in pochi secondi.',
    tabWeb: 'Negozi Shopify e siti web',
    projectOne: 'progetto',
    projectMany: 'progetti',
    backToProjects: 'Progetti',
    notFound: 'Progetto non trovato.',
    backToProjectsLink: 'Torna ai progetti',
    meLabel: 'Io',
    meRole: 'Ingegnere IA — Agenti, Automazioni e SaaS',
    meIntro:
      "Ingegnere IA a Parigi, specializzato in IA agentica, IA generativa, RAG e applicazioni LLM. Ho costruito IA in produzione per Allianz France, Havas Group, KHOME e Sopra Steria: agenti che arrivano dentro i sistemi aziendali, pipeline RAG su documenti normativi e immobiliari, e automazione che toglie lavoro dalle scrivanie. In parallelo, anni di web da freelance: oltre 100 progetti consegnati e prodotti miei venduti più di mille volte.",
    meViewProjects: 'Guarda i miei progetti',
    meStatsClients: 'Grandi aziende servite',
    meStatsAI: 'Anni in IA e automazione',
    meStatsProjects: 'Progetti consegnati',
    meStatsThemes: 'Copie dei miei prodotti vendute',
    meWhatIDo: 'Cosa faccio',
    meShopTitle: 'Agenti IA e flussi multi-agente',
    meShopText: "Agenti che chiamano strumenti, raggiungono le tue API e prendono decisioni: LangChain, LangGraph, LangSmith, CrewAI e MCP, con memoria, punti di validazione umana e valutazione per tenerli affidabili.",
    meWebTitle: 'RAG e Basi di conoscenza',
    meWebText: 'Ingestione di documenti, chunking, embedding e ricerca semantica sui tuoi contenuti, su PostgreSQL con pgvector o Pinecone — con il retrieval valutato davvero, non dato per scontato.',
    meAiTitle: 'Automazione aziendale',
    meAiText: 'n8n, Make, Zapier, Power Automate e Copilot Studio, più integrazioni REST su misura, webhook e OAuth quando il nodo standard non basta più. Automazione CRM, reporting, operazioni interne.',
    meContentTitle: 'SaaS, app e siti con IA',
    meContentText: 'Prodotti veri, non prototipi: React e Next.js sul front, FastAPI o Node e PostgreSQL dietro, consegnati con Docker, CI/CD, logging e monitoraggio dei costi su Azure o Vercel.',
    meJourneyTitle: 'Il mio percorso',
    meJourneyText:
      "Ho una laurea magistrale in Machine Learning per la Data Science all'Université Paris Cité, poi mi sono formato in no-code, automazione e IA presso .decode. Da allora costruisco IA in produzione: automazione e IA generativa in Allianz France, soluzioni agentiche in Havas Group, pipeline RAG su documenti immobiliari e normativi in KHOME, e architetture agentiche e RAG in Sopra Steria, dove sono oggi. In parallelo, anni di web da freelance: oltre 100 progetti e-commerce e web, e prodotti miei venduti più di mille volte. Mi interessa la metà ingrata di questo mestiere: riservatezza dei dati, GDPR, controllo degli accessi e la validazione vera di ciò che un modello produce prima che arrivi a un utente. Con base a Parigi, lavoro in inglese e francese, e parlo anche urdu e hindi.",
    meTimelineTitle: 'Dove ho lavorato',
    contactLabel: 'Contattami',
    contactHeading: 'Lavoriamo',
    contactHeadingItalic: 'insieme',
    contactText: "Raccontami dell'agente, dell'automazione, del prodotto SaaS o del sito che hai in mente — in inglese o francese. Basta un breve messaggio per iniziare.",
    scanWhatsapp: 'Scansiona per WhatsApp',
    downloadCv: 'Scarica il mio CV',
    description: 'Descrizione del progetto',
    challenges: 'Sfide',
    solutions: 'Soluzioni',
    results: 'Risultati',
    published: 'Pubblicato',
    services: 'Servizi',
    client: 'Cliente',
    industry: 'Settore',
    stack: 'Stack',
  },
  de: {
    home: 'Startseite',
    skillsTitle: 'Skills',
    navContact: 'Kontakt',
    projectsTitle: 'Projekte',
    projectsIntro:
      'Zehn E-Commerce-Projekte aus meinen Jahren als freiberuflicher Webentwickler. Alle ausgeliefert, jedes mit Video-Walkthrough, den Rahmenbedingungen und dem Ergebnis.',
    projectsIntroVoice:
      'Sprachagenten, die zuhören, verstehen und laut antworten: Spracherkennung, Intent-Erkennung, Retrieval und Sprachsynthese auf einem lokalen KI-Stack.',
    tabVoice: 'Sprachagenten',
    tabLead: 'Leadgenerierung',
    tabCrm: 'CRM-Automatisierung',
    tabOutreach: 'LinkedIn-Outreach',
    tabAds: 'KI-Videoanzeigen',
    projectsIntroAds:
      'Pipelines, in denen Claude Bild- und Videomodelle steuert, um aus einem Produktfoto eine fertige Anzeige zu machen – mit Freigaben, bevor Credits ausgegeben werden.',
    projectsIntroCrm:
      'Workflows, die jeden Lead bewerten, weiterleiten und zuweisen, das Follow-up entwerfen und dem Vertrieb einen sauberen CRM-Datensatz liefern.',
    projectsIntroOutreach:
      'Outreach-Systeme, die die richtigen Leute finden, recherchieren, persönliche LinkedIn- und E-Mail-Nachrichten schreiben und das Gespräch am Laufen halten.',
    projectsIntroLead:
      'Automatisierungen, die jeden eingehenden Lead erfassen, per LLM bewerten, ins CRM schreiben und den Vertrieb bei heißen Leads innerhalb von Sekunden benachrichtigen.',
    tabWeb: 'Shopify-Shops & Websites',
    projectOne: 'Projekt',
    projectMany: 'Projekte',
    backToProjects: 'Projekte',
    notFound: 'Projekt nicht gefunden.',
    backToProjectsLink: 'Zurück zu den Projekten',
    meLabel: 'Ich',
    meRole: 'KI-Ingenieur — Agenten, Automatisierungen & SaaS',
    meIntro:
      'KI-Ingenieur in Paris, spezialisiert auf agentische KI, generative KI, RAG und LLM-Anwendungen. Ich habe KI in Produktion gebracht für Allianz France, Havas Group, KHOME und Sopra Steria — Agenten, die bis in die Unternehmenssysteme reichen, RAG-Pipelines über Regulierungs- und Immobiliendokumente und Automatisierung, die Arbeit von den Schreibtischen nimmt. Parallel dazu Jahre freiberuflicher Webarbeit: über 100 gelieferte Projekte und eigene Produkte, mehr als tausendmal verkauft.',
    meViewProjects: 'Meine Projekte ansehen',
    meStatsClients: 'Großunternehmen betreut',
    meStatsAI: 'Jahre in KI & Automatisierung',
    meStatsProjects: 'Gelieferte Projekte',
    meStatsThemes: 'Verkaufte Kopien meiner Produkte',
    meWhatIDo: 'Was ich mache',
    meShopTitle: 'KI-Agenten & Multi-Agenten-Workflows',
    meShopText: 'Agenten, die Tools aufrufen, deine APIs erreichen und Entscheidungen treffen: LangChain, LangGraph, LangSmith, CrewAI und MCP, mit Memory, menschlichen Freigabepunkten und Evaluation, die sie zuverlässig halten.',
    meWebTitle: 'RAG & Wissenssysteme',
    meWebText: 'Dokumenten-Ingestion, Chunking, Embeddings und semantische Suche über deine eigenen Inhalte, auf PostgreSQL mit pgvector oder Pinecone — und Retrieval, das wirklich evaluiert und nicht vorausgesetzt wird.',
    meAiTitle: 'Geschäftsautomatisierung',
    meAiText: 'n8n, Make, Zapier, Power Automate und Copilot Studio, dazu maßgeschneiderte REST-Integrationen, Webhooks und OAuth, wenn der Standard-Node nicht mehr reicht. CRM-Automatisierung, Reporting, interne Abläufe.',
    meContentTitle: 'SaaS, Apps & KI-Websites',
    meContentText: 'Fertige Produkte statt Prototypen: React und Next.js im Frontend, FastAPI oder Node und PostgreSQL dahinter, ausgeliefert mit Docker, CI/CD, Logging und Kostenüberwachung auf Azure oder Vercel.',
    meJourneyTitle: 'Mein Werdegang',
    meJourneyText:
      'Ich habe einen Master in Machine Learning für Data Science der Université Paris Cité und mich anschließend bei .decode in No-Code, Automatisierung und KI weitergebildet. Seitdem bringe ich KI in Produktion: Automatisierung und generative KI bei Allianz France, agentische Lösungen bei Havas Group, RAG-Pipelines über Immobilien- und Regulierungsdokumente bei KHOME und agentische sowie RAG-Architekturen bei Sopra Steria, wo ich heute bin. Parallel dazu Jahre freiberuflicher Webarbeit: über 100 E-Commerce- und Web-Projekte und eigene Produkte, mehr als tausendmal verkauft. Mir liegt die unglamouröse Hälfte dieses Berufs am Herzen — Datenvertraulichkeit, DSGVO, Zugriffskontrolle und das echte Validieren dessen, was ein Modell ausgibt, bevor es bei einem Nutzer landet. Ansässig in Paris, ich arbeite auf Englisch und Französisch und spreche außerdem Urdu und Hindi.',
    meTimelineTitle: 'Wo ich gearbeitet habe',
    contactLabel: 'Kontaktiere mich',
    contactHeading: 'Lass uns',
    contactHeadingItalic: 'zusammenarbeiten',
    contactText: 'Erzähl mir von dem Agenten, der Automatisierung, dem SaaS-Produkt oder der Website, die dir vorschwebt — auf Englisch oder Französisch. Eine kurze Nachricht genügt für den Anfang.',
    scanWhatsapp: 'Für WhatsApp scannen',
    downloadCv: 'Meinen Lebenslauf herunterladen',
    description: 'Projektbeschreibung',
    challenges: 'Herausforderungen',
    solutions: 'Lösungen',
    results: 'Ergebnisse',
    published: 'Veröffentlicht',
    services: 'Leistungen',
    client: 'Kunde',
    industry: 'Branche',
    stack: 'Stack',
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
