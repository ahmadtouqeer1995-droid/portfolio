import type { Lang } from '@/i18n';
import type { ProjectKind, Study, StudyCopy } from '@/data/projects';

// n8n automations. Facts come from automation.md (one section per workflow).
// Media in /public/projects: <id>-1.png — the n8n canvas, sidebar and side
// panel cropped off. All five sit on the Automations board.

type Layer = 'trigger' | 'ai' | 'data' | 'media' | 'review' | 'delivery' | 'orchestration';

const LAYER_LABELS: Record<Lang, Record<Layer, string>> = {
  en: { trigger: 'Trigger', ai: 'AI', data: 'Data & storage', media: 'Media generation', review: 'Human review', delivery: 'Delivery', orchestration: 'Orchestration' },
  fr: { trigger: 'Déclencheur', ai: 'IA', data: 'Données & stockage', media: 'Génération de médias', review: 'Validation humaine', delivery: 'Diffusion', orchestration: 'Orchestration' },
  es: { trigger: 'Disparador', ai: 'IA', data: 'Datos y almacenamiento', media: 'Generación de medios', review: 'Revisión humana', delivery: 'Entrega', orchestration: 'Orquestación' },
  it: { trigger: 'Trigger', ai: 'IA', data: 'Dati e archiviazione', media: 'Generazione media', review: 'Revisione umana', delivery: 'Consegna', orchestration: 'Orchestrazione' },
  de: { trigger: 'Auslöser', ai: 'KI', data: 'Daten & Speicher', media: 'Mediengenerierung', review: 'Menschliche Freigabe', delivery: 'Auslieferung', orchestration: 'Orchestrierung' },
};

const CATEGORY: Record<Lang, string> = {
  en: 'AUTOMATION · N8N',
  fr: 'AUTOMATISATION · N8N',
  es: 'AUTOMATIZACIÓN · N8N',
  it: 'AUTOMAZIONE · N8N',
  de: 'AUTOMATISIERUNG · N8N',
};

const CLIENT: Record<Lang, string> = {
  en: 'Automation project',
  fr: "Projet d'automatisation",
  es: 'Proyecto de automatización',
  it: 'Progetto di automazione',
  de: 'Automatisierungsprojekt',
};

type Text = { services: string; industry: string; description: string[]; challenges: string[]; solutions: string[]; results: string[] };

type Automation = {
  id: string;
  kind: ProjectKind;
  title: string;
  /** Cropped canvas size, width/height. */
  aspect: string;
  stack: [Layer, string][];
  text: Record<Lang, Text>;
};

function study(a: Automation): Study {
  const copy = {} as Record<Lang, StudyCopy>;
  for (const lang of Object.keys(a.text) as Lang[]) {
    copy[lang] = {
      category: CATEGORY[lang],
      client: CLIENT[lang],
      layers: a.stack.map(([layer]) => LAYER_LABELS[lang][layer]),
      ...a.text[lang],
    };
  }
  return {
    id: a.id,
    kind: a.kind,
    title: a.title,
    imageCount: 1,
    aspect: a.aspect,
    fit: 'contain',
    tools: a.stack.map(([, tools]) => tools),
    copy,
  };
}

const N8N = 'n8n';

const LIST: Automation[] = [
  {
    id: 'hn-video-content',
    kind: 'outreach',
    title: 'Hacker News to Video Content',
    aspect: '2352/1152',
    stack: [
      ['trigger', 'Manual trigger · Hacker News node · Limit + Loop Over Items'],
      ['ai', 'OpenAI GPT article analysis with a structured output parser'],
      ['media', 'Leonardo.ai images · RunwayML image-to-video · Creatomate render'],
      ['data', 'Dropbox · Google Drive · Microsoft OneDrive · MinIO'],
      ['delivery', 'YouTube · X · LinkedIn · Instagram'],
      ['orchestration', N8N],
    ],
    text: {
      en: {
        services: 'AI CONTENT · VIDEO GENERATION · N8N', industry: 'Content Marketing',
        description: [
          'This n8n workflow turns trending Hacker News articles into short videos. It pulls the top stories, decides which ones matter, and produces images, video clips and captions for each one.',
          'It is built for creators, educators and marketers who want a steady stream of tech content without researching and editing every piece by hand.',
        ],
        challenges: [
          'Turning an article into a video means reading it, judging if it fits the channel, writing prompts, generating images, animating them and posting the result. Doing that by hand for every story does not scale.',
        ],
        solutions: [
          'The workflow fetches stories, limits the batch and loops over each one. An OpenAI agent reads the article, summarizes it, checks if it is about AI or automation and returns structured output with image prompts. Off-topic stories are dropped.',
          'For the rest, Leonardo.ai generates images from improved prompts, RunwayML turns them into video clips and Creatomate assembles the final video. Wait nodes poll each API until the asset is ready. Files go to Dropbox, Google Drive, OneDrive or MinIO, and can be posted to YouTube, X, LinkedIn and Instagram.',
        ],
        results: [
          'One run takes a list of headlines to finished, captioned videos and newsletter blurbs, stored in the cloud and ready to post.',
        ],
      },
      fr: {
        services: 'CONTENU IA · GÉNÉRATION VIDÉO · N8N', industry: 'Marketing de contenu',
        description: [
          'Ce workflow n8n transforme les articles tendance de Hacker News en courtes vidéos. Il récupère les meilleures stories, décide lesquelles comptent et produit images, clips vidéo et légendes pour chacune.',
          "Il s'adresse aux créateurs, formateurs et marketeurs qui veulent un flux régulier de contenu tech sans rechercher ni monter chaque pièce à la main.",
        ],
        challenges: [
          "Transformer un article en vidéo, c'est le lire, juger s'il convient à la chaîne, écrire des prompts, générer des images, les animer et publier le résultat. À la main, pour chaque story, ça ne tient pas.",
        ],
        solutions: [
          "Le workflow récupère les stories, limite le lot et boucle sur chacune. Un agent OpenAI lit l'article, le résume, vérifie s'il parle d'IA ou d'automatisation et renvoie une sortie structurée avec des prompts d'image. Les stories hors sujet sont écartées.",
          "Pour les autres, Leonardo.ai génère des images à partir de prompts améliorés, RunwayML les transforme en clips et Creatomate assemble la vidéo finale. Des nœuds d'attente interrogent chaque API jusqu'à ce que le fichier soit prêt. Les fichiers partent vers Dropbox, Google Drive, OneDrive ou MinIO, avec publication possible sur YouTube, X, LinkedIn et Instagram.",
        ],
        results: [
          'Une exécution fait passer une liste de titres à des vidéos sous-titrées et des textes de newsletter, stockés dans le cloud et prêts à publier.',
        ],
      },
      es: {
        services: 'CONTENIDO IA · GENERACIÓN DE VÍDEO · N8N', industry: 'Marketing de contenidos',
        description: [
          'Este workflow de n8n convierte artículos destacados de Hacker News en vídeos cortos. Recoge las historias principales, decide cuáles importan y produce imágenes, clips de vídeo y textos para cada una.',
          'Está pensado para creadores, formadores y marketers que quieren un flujo constante de contenido tech sin investigar ni editar cada pieza a mano.',
        ],
        challenges: [
          'Convertir un artículo en vídeo implica leerlo, decidir si encaja en el canal, escribir prompts, generar imágenes, animarlas y publicar el resultado. Hacerlo a mano con cada historia no escala.',
        ],
        solutions: [
          'El workflow obtiene las historias, limita el lote y las recorre una a una. Un agente de OpenAI lee el artículo, lo resume, comprueba si trata de IA o automatización y devuelve una salida estructurada con prompts de imagen. Las historias fuera de tema se descartan.',
          'Para el resto, Leonardo.ai genera imágenes con prompts mejorados, RunwayML las convierte en clips y Creatomate monta el vídeo final. Nodos de espera consultan cada API hasta que el archivo está listo. Los archivos van a Dropbox, Google Drive, OneDrive o MinIO, y se pueden publicar en YouTube, X, LinkedIn e Instagram.',
        ],
        results: [
          'Una ejecución lleva una lista de titulares a vídeos con subtítulos y textos para newsletter, guardados en la nube y listos para publicar.',
        ],
      },
      it: {
        services: 'CONTENUTI IA · GENERAZIONE VIDEO · N8N', industry: 'Content marketing',
        description: [
          'Questo workflow n8n trasforma gli articoli di tendenza di Hacker News in brevi video. Prende le storie principali, decide quali contano e produce immagini, clip video e didascalie per ciascuna.',
          'È pensato per creator, formatori e marketer che vogliono un flusso costante di contenuti tech senza ricercare e montare ogni pezzo a mano.',
        ],
        challenges: [
          'Trasformare un articolo in un video significa leggerlo, capire se è adatto al canale, scrivere prompt, generare immagini, animarle e pubblicare il risultato. Farlo a mano per ogni storia non è sostenibile.',
        ],
        solutions: [
          'Il workflow recupera le storie, limita il lotto e le scorre una per una. Un agente OpenAI legge l’articolo, lo riassume, verifica se parla di IA o automazione e restituisce un output strutturato con i prompt per le immagini. Le storie fuori tema vengono scartate.',
          'Per le altre, Leonardo.ai genera immagini da prompt migliorati, RunwayML le trasforma in clip e Creatomate monta il video finale. Nodi di attesa interrogano ogni API finché il file è pronto. I file vanno su Dropbox, Google Drive, OneDrive o MinIO, con pubblicazione possibile su YouTube, X, LinkedIn e Instagram.',
        ],
        results: [
          'Un’esecuzione porta una lista di titoli a video con didascalie e testi per newsletter, salvati nel cloud e pronti da pubblicare.',
        ],
      },
      de: {
        services: 'KI-CONTENT · VIDEOGENERIERUNG · N8N', industry: 'Content-Marketing',
        description: [
          'Dieser n8n-Workflow macht aus angesagten Hacker-News-Artikeln kurze Videos. Er holt die Top-Storys, entscheidet, welche relevant sind, und erzeugt für jede Bilder, Videoclips und Texte.',
          'Er richtet sich an Creator, Lehrende und Marketer, die laufend Tech-Content wollen, ohne jedes Stück selbst zu recherchieren und zu schneiden.',
        ],
        challenges: [
          'Aus einem Artikel ein Video zu machen heißt: lesen, prüfen, ob er zum Kanal passt, Prompts schreiben, Bilder erzeugen, animieren und veröffentlichen. Von Hand für jede Story skaliert das nicht.',
        ],
        solutions: [
          'Der Workflow holt die Storys, begrenzt den Stapel und geht sie einzeln durch. Ein OpenAI-Agent liest den Artikel, fasst ihn zusammen, prüft, ob es um KI oder Automatisierung geht, und liefert strukturierte Ausgabe mit Bild-Prompts. Themenfremde Storys fallen raus.',
          'Für den Rest erzeugt Leonardo.ai Bilder aus verbesserten Prompts, RunwayML macht daraus Clips und Creatomate setzt das fertige Video zusammen. Wait-Nodes fragen jede API ab, bis die Datei fertig ist. Die Dateien landen in Dropbox, Google Drive, OneDrive oder MinIO und können auf YouTube, X, LinkedIn und Instagram gepostet werden.',
        ],
        results: [
          'Ein Durchlauf macht aus einer Liste von Schlagzeilen fertige Videos mit Untertiteln und Newsletter-Texte, in der Cloud gespeichert und bereit zum Posten.',
        ],
      },
    },
  },
  {
    id: 'linkedin-post-factcheck',
    kind: 'outreach',
    title: 'Fact-Checked LinkedIn Posts',
    aspect: '1855/1152',
    stack: [
      ['trigger', 'Daily schedule · Google Drive new-file trigger'],
      ['ai', 'Groq agents (topic choice, OCR clean-up, fact extraction, drafting, quality check) · Google Gemini strategist'],
      ['data', 'Supabase (topics, strategy contracts, review log, published posts) · Pinecone reference index with Gemini embeddings'],
      ['review', 'Slack Approve / Reject / Regenerate · Gmail fallback link + webhook'],
      ['delivery', 'LinkedIn API'],
      ['orchestration', N8N],
    ],
    text: {
      en: {
        services: 'AI CONTENT · RAG · HUMAN-IN-THE-LOOP', industry: 'Social Media / B2B',
        description: [
          'This n8n workflow writes and publishes LinkedIn posts that are checked before they go out. It picks a topic from a Supabase list or a file dropped into Google Drive, drafts the post with AI and only publishes after a person approves it in Slack.',
        ],
        challenges: [
          'AI-written posts are fast but often vague, off-brand or wrong. These posts had to stay grounded in the source material, follow a deliberate strategy and never leak private details.',
        ],
        solutions: [
          'The source is extracted whatever its type: OCR for images, text for PDFs, cleaned HTML for URLs, or plain text. A Groq agent pulls out facts, angles and privacy flags. A Gemini strategist checks proven post patterns in Pinecone and writes a strategy contract: angle, format, hook, structure, CTA and length.',
          'Groq drafts the post and a second Groq agent grades it for factual support, strategy fit, readability and privacy. The draft goes to Slack with Approve, Reject and Regenerate buttons. Approved posts are published and logged in Supabase. Rejected topics are archived, feedback triggers a rewrite, and if nobody answers, a Gmail link collects the decision.',
        ],
        results: [
          'Every post that reaches LinkedIn traces back to its source, follows a strategy and was approved by a person.',
        ],
      },
      fr: {
        services: 'CONTENU IA · RAG · VALIDATION HUMAINE', industry: 'Réseaux sociaux / B2B',
        description: [
          "Ce workflow n8n rédige et publie des posts LinkedIn vérifiés avant leur sortie. Il choisit un sujet dans une liste Supabase ou un fichier déposé dans Google Drive, rédige le post avec l'IA et ne publie qu'après validation humaine dans Slack.",
        ],
        challenges: [
          "Les posts écrits par l'IA sont rapides mais souvent vagues, hors ton ou faux. Ceux-ci devaient rester ancrés dans la source, suivre une stratégie claire et ne jamais divulguer d'informations privées.",
        ],
        solutions: [
          "La source est extraite quel que soit son type : OCR pour les images, texte pour les PDF, HTML nettoyé pour les URL, ou texte brut. Un agent Groq en tire faits, angles et alertes de confidentialité. Un stratège Gemini consulte des modèles de posts éprouvés dans Pinecone et rédige un contrat de stratégie : angle, format, accroche, structure, CTA et longueur.",
          "Groq rédige le post et un second agent Groq le note sur l'appui factuel, le respect de la stratégie, la lisibilité et la confidentialité. Le brouillon part dans Slack avec les boutons Approuver, Rejeter et Régénérer. Les posts approuvés sont publiés et enregistrés dans Supabase. Les sujets rejetés sont archivés, un retour relance la rédaction, et sans réponse, un lien Gmail recueille la décision.",
        ],
        results: [
          'Chaque post publié sur LinkedIn remonte à sa source, suit une stratégie et a été validé par une personne.',
        ],
      },
      es: {
        services: 'CONTENIDO IA · RAG · REVISIÓN HUMANA', industry: 'Redes sociales / B2B',
        description: [
          'Este workflow de n8n redacta y publica posts de LinkedIn que se revisan antes de salir. Elige un tema de una lista en Supabase o de un archivo subido a Google Drive, redacta el post con IA y solo publica tras la aprobación de una persona en Slack.',
        ],
        challenges: [
          'Los posts escritos por IA son rápidos pero a menudo vagos, fuera de tono o incorrectos. Estos tenían que basarse en la fuente, seguir una estrategia clara y no filtrar nunca datos privados.',
        ],
        solutions: [
          'La fuente se extrae sea cual sea su tipo: OCR para imágenes, texto para PDF, HTML limpio para URL o texto plano. Un agente de Groq saca hechos, enfoques y alertas de privacidad. Un estratega con Gemini consulta patrones de posts probados en Pinecone y escribe un contrato de estrategia: enfoque, formato, gancho, estructura, CTA y longitud.',
          'Groq redacta el post y un segundo agente de Groq lo evalúa en respaldo factual, ajuste a la estrategia, legibilidad y privacidad. El borrador llega a Slack con botones de Aprobar, Rechazar y Regenerar. Los aprobados se publican y quedan registrados en Supabase. Los temas rechazados se archivan, el feedback lanza una reescritura y, si nadie responde, un enlace por Gmail recoge la decisión.',
        ],
        results: [
          'Cada post que llega a LinkedIn se puede rastrear hasta su fuente, sigue una estrategia y fue aprobado por una persona.',
        ],
      },
      it: {
        services: 'CONTENUTI IA · RAG · REVISIONE UMANA', industry: 'Social media / B2B',
        description: [
          'Questo workflow n8n scrive e pubblica post LinkedIn verificati prima dell’uscita. Sceglie un argomento da una lista su Supabase o da un file caricato su Google Drive, scrive il post con l’IA e pubblica solo dopo l’approvazione di una persona su Slack.',
        ],
        challenges: [
          'I post scritti dall’IA sono veloci ma spesso vaghi, fuori tono o sbagliati. Questi dovevano restare ancorati alla fonte, seguire una strategia precisa e non rivelare mai dati privati.',
        ],
        solutions: [
          'La fonte viene estratta qualunque sia il tipo: OCR per le immagini, testo per i PDF, HTML ripulito per gli URL o testo semplice. Un agente Groq ne ricava fatti, angolazioni e segnalazioni di privacy. Uno stratega Gemini consulta schemi di post collaudati su Pinecone e scrive un contratto di strategia: angolazione, formato, hook, struttura, CTA e lunghezza.',
          'Groq scrive il post e un secondo agente Groq lo valuta su supporto fattuale, aderenza alla strategia, leggibilità e privacy. La bozza arriva su Slack con i pulsanti Approva, Rifiuta e Rigenera. I post approvati vengono pubblicati e registrati su Supabase. Gli argomenti rifiutati vengono archiviati, il feedback avvia una riscrittura e, se nessuno risponde, un link via Gmail raccoglie la decisione.',
        ],
        results: [
          'Ogni post che arriva su LinkedIn è riconducibile alla sua fonte, segue una strategia ed è stato approvato da una persona.',
        ],
      },
      de: {
        services: 'KI-CONTENT · RAG · MENSCHLICHE FREIGABE', industry: 'Social Media / B2B',
        description: [
          'Dieser n8n-Workflow schreibt und veröffentlicht LinkedIn-Posts, die vor dem Posten geprüft werden. Er wählt ein Thema aus einer Supabase-Liste oder einer in Google Drive abgelegten Datei, entwirft den Post mit KI und veröffentlicht erst nach menschlicher Freigabe in Slack.',
        ],
        challenges: [
          'KI-Posts sind schnell, aber oft vage, unpassend im Ton oder falsch. Diese Posts mussten auf der Quelle beruhen, einer klaren Strategie folgen und durften keine privaten Details preisgeben.',
        ],
        solutions: [
          'Die Quelle wird je nach Typ ausgelesen: OCR für Bilder, Text für PDFs, bereinigtes HTML für URLs oder reiner Text. Ein Groq-Agent zieht Fakten, Blickwinkel und Datenschutz-Hinweise heraus. Ein Gemini-Stratege prüft bewährte Post-Muster in Pinecone und schreibt einen Strategievertrag: Blickwinkel, Format, Hook, Aufbau, CTA und Länge.',
          'Groq schreibt den Entwurf, ein zweiter Groq-Agent bewertet Faktenbasis, Strategietreue, Lesbarkeit und Datenschutz. Der Entwurf geht mit Freigeben-, Ablehnen- und Neu-Buttons an Slack. Freigegebene Posts werden veröffentlicht und in Supabase protokolliert. Abgelehnte Themen werden archiviert, Feedback löst eine Neufassung aus, und bleibt eine Antwort aus, holt ein Gmail-Link die Entscheidung ein.',
        ],
        results: [
          'Jeder Post auf LinkedIn lässt sich auf seine Quelle zurückführen, folgt einer Strategie und wurde von einem Menschen freigegeben.',
        ],
      },
    },
  },
  {
    id: 'telegram-lead-capture',
    kind: 'lead',
    title: 'Telegram Sales Lead Capture',
    aspect: '1855/1152',
    stack: [
      ['trigger', 'Telegram trigger (messages + button taps) · daily 08:30 cron'],
      ['ai', 'Groq Whisper (voice notes) · Groq Vision (business cards) · Groq chat completions (lead extraction)'],
      ['data', 'Postgres: leads, interactions, pending notes, lead-score function'],
      ['delivery', 'Telegram replies with inline confirm buttons · daily follow-up digest'],
      ['orchestration', N8N],
    ],
    text: {
      en: {
        services: 'LEAD CAPTURE · VOICE AI · CRM', industry: 'Sales',
        description: [
          'This n8n workflow captures sales leads as fast as you can talk. Send a Telegram voice note, a typed line or a photo of a business card, and AI turns it into a structured lead. One tap saves it, and an 08:30 digest each morning lists who needs a follow-up.',
        ],
        challenges: [
          'Leads met at events or on calls get lost because typing them into a CRM takes too long. Notes come in as voice, scribbles and card photos, and the same person often gets added twice.',
        ],
        solutions: [
          'Each Telegram update is normalized and checked against an allowed chat list. Voice notes are transcribed with Groq Whisper, card photos are read with Groq Vision and typed text passes straight through. Groq then extracts contact, company, need, budget, urgency, follow-up date and stage, and the result is validated.',
          'Postgres is searched for up to three likely matches, and Telegram asks with inline buttons whether to update one, save a new lead or cancel. The tap creates or updates the lead, logs the interaction and replies with status, stage, score and follow-up date. /today or the morning cron sends a digest of due, overdue and cold leads and clears expired pending notes.',
        ],
        results: [
          'A lead goes from a voice note to a scored, de-duplicated CRM record in seconds, and no follow-up slips.',
        ],
      },
      fr: {
        services: 'CAPTURE DE LEADS · IA VOCALE · CRM', industry: 'Vente',
        description: [
          "Ce workflow n8n capte les leads commerciaux aussi vite que vous parlez. Envoyez sur Telegram un vocal, une ligne tapée ou la photo d'une carte de visite, et l'IA en fait un lead structuré. Un tap l'enregistre, et chaque matin à 8 h 30 un récapitulatif liste les relances à faire.",
        ],
        challenges: [
          'Les leads rencontrés en salon ou au téléphone se perdent parce que les saisir dans un CRM prend trop de temps. Les notes arrivent en vocal, en brouillon ou en photo de carte, et la même personne est souvent ajoutée deux fois.',
        ],
        solutions: [
          'Chaque message Telegram est normalisé et vérifié contre une liste de chats autorisés. Les vocaux sont transcrits avec Groq Whisper, les photos de cartes lues avec Groq Vision et le texte passe tel quel. Groq extrait ensuite contact, entreprise, besoin, budget, urgence, date de relance et étape, et le résultat est validé.',
          "Postgres cherche jusqu'à trois correspondances probables, et Telegram demande par boutons s'il faut en mettre une à jour, créer un nouveau lead ou annuler. Le tap crée ou met à jour le lead, journalise l'échange et répond avec statut, étape, score et date de relance. /today ou la tâche du matin envoie le récapitulatif des relances dues, en retard et des leads froids, et purge les notes en attente expirées.",
        ],
        results: [
          "Un lead passe d'un vocal à une fiche CRM notée et dédoublonnée en quelques secondes, et aucune relance n'est oubliée.",
        ],
      },
      es: {
        services: 'CAPTURA DE LEADS · IA DE VOZ · CRM', industry: 'Ventas',
        description: [
          'Este workflow de n8n captura leads de ventas tan rápido como hablas. Envía por Telegram una nota de voz, una línea escrita o la foto de una tarjeta de visita, y la IA la convierte en un lead estructurado. Un toque lo guarda y cada mañana a las 8:30 un resumen indica a quién hay que hacer seguimiento.',
        ],
        challenges: [
          'Los leads de eventos o llamadas se pierden porque meterlos en un CRM lleva demasiado tiempo. Las notas llegan como audios, apuntes y fotos de tarjetas, y la misma persona suele añadirse dos veces.',
        ],
        solutions: [
          'Cada mensaje de Telegram se normaliza y se comprueba contra una lista de chats permitidos. Las notas de voz se transcriben con Groq Whisper, las tarjetas se leen con Groq Vision y el texto pasa tal cual. Groq extrae contacto, empresa, necesidad, presupuesto, urgencia, fecha de seguimiento y etapa, y el resultado se valida.',
          'Postgres busca hasta tres coincidencias probables y Telegram pregunta con botones si actualizar una, guardar un lead nuevo o cancelar. El toque crea o actualiza el lead, registra la interacción y responde con estado, etapa, puntuación y fecha de seguimiento. /today o la tarea de la mañana envía el resumen de seguimientos pendientes, atrasados y leads fríos, y limpia las notas pendientes caducadas.',
        ],
        results: [
          'Un lead pasa de una nota de voz a un registro de CRM puntuado y sin duplicados en segundos, y ningún seguimiento se escapa.',
        ],
      },
      it: {
        services: 'RACCOLTA LEAD · IA VOCALE · CRM', industry: 'Vendite',
        description: [
          'Questo workflow n8n raccoglie i lead commerciali alla velocità con cui parli. Invia su Telegram un vocale, una riga scritta o la foto di un biglietto da visita e l’IA lo trasforma in un lead strutturato. Un tocco lo salva e ogni mattina alle 8:30 un riepilogo dice chi va ricontattato.',
        ],
        challenges: [
          'I lead incontrati agli eventi o al telefono si perdono perché inserirli in un CRM richiede troppo tempo. Le note arrivano come vocali, appunti e foto di biglietti, e spesso la stessa persona viene aggiunta due volte.',
        ],
        solutions: [
          'Ogni messaggio Telegram viene normalizzato e confrontato con una lista di chat autorizzate. I vocali vengono trascritti con Groq Whisper, i biglietti letti con Groq Vision e il testo passa così com’è. Groq estrae contatto, azienda, esigenza, budget, urgenza, data di follow-up e fase, e il risultato viene validato.',
          'Postgres cerca fino a tre corrispondenze probabili e Telegram chiede con pulsanti se aggiornarne una, salvare un nuovo lead o annullare. Il tocco crea o aggiorna il lead, registra l’interazione e risponde con stato, fase, punteggio e data di follow-up. /today o il job del mattino invia il riepilogo dei follow-up in scadenza, in ritardo e dei lead freddi, e ripulisce le note in sospeso scadute.',
        ],
        results: [
          'Un lead passa da un vocale a una scheda CRM con punteggio e senza duplicati in pochi secondi, e nessun follow-up va perso.',
        ],
      },
      de: {
        services: 'LEAD-ERFASSUNG · SPRACH-KI · CRM', industry: 'Vertrieb',
        description: [
          'Dieser n8n-Workflow erfasst Sales-Leads so schnell, wie man spricht. Schick per Telegram eine Sprachnachricht, eine getippte Zeile oder ein Foto einer Visitenkarte, und die KI macht daraus einen strukturierten Lead. Ein Tipp speichert ihn, und jeden Morgen um 8:30 listet ein Digest, wer nachgefasst werden muss.',
        ],
        challenges: [
          'Leads von Events oder Telefonaten gehen verloren, weil das Eintippen ins CRM zu lange dauert. Notizen kommen als Sprachnachricht, Stichworte oder Kartenfoto, und dieselbe Person landet oft doppelt im System.',
        ],
        solutions: [
          'Jede Telegram-Nachricht wird normalisiert und gegen eine Liste erlaubter Chats geprüft. Sprachnachrichten transkribiert Groq Whisper, Kartenfotos liest Groq Vision, getippter Text geht direkt weiter. Groq extrahiert Kontakt, Firma, Bedarf, Budget, Dringlichkeit, Follow-up-Datum und Phase, und das Ergebnis wird validiert.',
          'Postgres sucht bis zu drei wahrscheinliche Treffer, und Telegram fragt per Buttons, ob einer aktualisiert, ein neuer Lead gespeichert oder abgebrochen werden soll. Der Tipp legt den Lead an oder aktualisiert ihn, protokolliert den Kontakt und antwortet mit Status, Phase, Score und Follow-up-Datum. /today oder der Morgen-Cron schickt einen Digest fälliger, überfälliger und kalter Leads und räumt abgelaufene Notizen auf.',
        ],
        results: [
          'Ein Lead wird in Sekunden von der Sprachnachricht zum bewerteten, duplikatfreien CRM-Eintrag, und kein Follow-up geht verloren.',
        ],
      },
    },
  },
  {
    id: 'local-rag-chatbot',
    kind: 'crm',
    title: 'Local RAG Chatbot',
    aspect: '1855/1152',
    stack: [
      ['trigger', 'Form upload (PDF ingestion) · chat trigger'],
      ['ai', 'Ollama: Llama 3.2 chat model + mxbai-embed-large embeddings · n8n AI Agent with memory'],
      ['data', 'Qdrant vector store · recursive character text splitter'],
      ['orchestration', 'n8n self-hosted AI starter kit (n8n + Ollama + Qdrant)'],
    ],
    text: {
      en: {
        services: 'RAG · LOCAL LLM · VECTOR SEARCH', industry: 'Knowledge Management',
        description: [
          'A chatbot that answers questions about your own PDF files and runs 100% locally. It is built in n8n with Ollama and Qdrant, so no document or question leaves the machine.',
        ],
        challenges: [
          'Teams want to ask questions about contracts, manuals and reports, but many cannot send those files to a cloud AI. The answers also had to come from the documents, not from the model’s guesses.',
        ],
        solutions: [
          'Data ingestion: a form takes any number of PDFs. A data loader reads each one, a recursive character splitter cuts it into chunks, Ollama embeds them with mxbai-embed-large and Qdrant stores the vectors.',
          'Chatbot: a chat trigger feeds an n8n AI agent running Llama 3.2 on Ollama, with simple memory for follow-up questions. The agent uses the Qdrant store as a retrieval tool, pulls the relevant chunks and answers from them.',
        ],
        results: [
          'A private document assistant that runs on one machine, with no API bills and no data leaving the network.',
        ],
      },
      fr: {
        services: 'RAG · LLM LOCAL · RECHERCHE VECTORIELLE', industry: 'Gestion des connaissances',
        description: [
          'Un chatbot qui répond aux questions sur vos propres PDF et tourne à 100 % en local. Il est construit dans n8n avec Ollama et Qdrant : aucun document ni aucune question ne quitte la machine.',
        ],
        challenges: [
          'Les équipes veulent interroger contrats, manuels et rapports, mais beaucoup ne peuvent pas envoyer ces fichiers à une IA dans le cloud. Les réponses devaient aussi venir des documents, pas des suppositions du modèle.',
        ],
        solutions: [
          'Ingestion : un formulaire accepte autant de PDF que voulu. Un chargeur lit chacun, un découpeur récursif le coupe en morceaux, Ollama les vectorise avec mxbai-embed-large et Qdrant stocke les vecteurs.',
          "Chatbot : un déclencheur de chat alimente un agent IA n8n qui tourne sur Llama 3.2 via Ollama, avec une mémoire simple pour les questions de suivi. L'agent utilise Qdrant comme outil de recherche, récupère les passages utiles et répond à partir d'eux.",
        ],
        results: [
          "Un assistant documentaire privé qui tourne sur une seule machine, sans facture d'API et sans qu'aucune donnée ne quitte le réseau.",
        ],
      },
      es: {
        services: 'RAG · LLM LOCAL · BÚSQUEDA VECTORIAL', industry: 'Gestión del conocimiento',
        description: [
          'Un chatbot que responde preguntas sobre tus propios PDF y funciona 100 % en local. Está construido en n8n con Ollama y Qdrant, así que ningún documento ni pregunta sale de la máquina.',
        ],
        challenges: [
          'Los equipos quieren consultar contratos, manuales e informes, pero muchos no pueden enviar esos archivos a una IA en la nube. Además, las respuestas tenían que salir de los documentos, no de suposiciones del modelo.',
        ],
        solutions: [
          'Ingesta: un formulario acepta tantos PDF como quieras. Un cargador lee cada uno, un divisor recursivo lo corta en fragmentos, Ollama los convierte en embeddings con mxbai-embed-large y Qdrant guarda los vectores.',
          'Chatbot: un disparador de chat alimenta un agente de IA de n8n con Llama 3.2 en Ollama y memoria simple para preguntas de seguimiento. El agente usa Qdrant como herramienta de búsqueda, recupera los fragmentos relevantes y responde con ellos.',
        ],
        results: [
          'Un asistente de documentos privado que funciona en una sola máquina, sin facturas de API y sin que ningún dato salga de la red.',
        ],
      },
      it: {
        services: 'RAG · LLM LOCALE · RICERCA VETTORIALE', industry: 'Gestione della conoscenza',
        description: [
          'Un chatbot che risponde alle domande sui tuoi PDF e gira al 100% in locale. È costruito in n8n con Ollama e Qdrant, quindi nessun documento o domanda lascia la macchina.',
        ],
        challenges: [
          'I team vogliono interrogare contratti, manuali e report, ma molti non possono inviare quei file a un’IA nel cloud. Inoltre le risposte dovevano venire dai documenti, non dalle supposizioni del modello.',
        ],
        solutions: [
          'Ingestione: un modulo accetta quanti PDF vuoi. Un loader legge ciascuno, uno splitter ricorsivo lo divide in blocchi, Ollama crea gli embedding con mxbai-embed-large e Qdrant salva i vettori.',
          'Chatbot: un trigger di chat alimenta un agente IA n8n con Llama 3.2 su Ollama e una memoria semplice per le domande successive. L’agente usa Qdrant come strumento di ricerca, recupera i blocchi pertinenti e risponde da quelli.',
        ],
        results: [
          'Un assistente documentale privato che gira su una sola macchina, senza costi di API e senza che alcun dato esca dalla rete.',
        ],
      },
      de: {
        services: 'RAG · LOKALES LLM · VEKTORSUCHE', industry: 'Wissensmanagement',
        description: [
          'Ein Chatbot, der Fragen zu den eigenen PDF-Dateien beantwortet und zu 100 % lokal läuft. Er ist in n8n mit Ollama und Qdrant gebaut, kein Dokument und keine Frage verlässt den Rechner.',
        ],
        challenges: [
          'Teams wollen Verträge, Handbücher und Berichte befragen, dürfen diese Dateien aber oft nicht an eine Cloud-KI schicken. Außerdem mussten die Antworten aus den Dokumenten kommen, nicht aus Vermutungen des Modells.',
        ],
        solutions: [
          'Datenaufnahme: Ein Formular nimmt beliebig viele PDFs an. Ein Loader liest jedes ein, ein rekursiver Splitter zerlegt es in Abschnitte, Ollama erzeugt Embeddings mit mxbai-embed-large und Qdrant speichert die Vektoren.',
          'Chatbot: Ein Chat-Trigger speist einen n8n-KI-Agenten mit Llama 3.2 über Ollama und einfachem Gedächtnis für Nachfragen. Der Agent nutzt Qdrant als Such-Tool, holt die passenden Abschnitte und antwortet daraus.',
        ],
        results: [
          'Ein privater Dokumentenassistent auf einem einzigen Rechner, ohne API-Kosten und ohne dass Daten das Netzwerk verlassen.',
        ],
      },
    },
  },
  {
    id: 'ai-cv-screening',
    kind: 'lead',
    title: 'AI CV Screening',
    aspect: '2352/1152',
    stack: [
      ['trigger', 'n8n Form (name, email, PDF CV)'],
      ['ai', 'Mistral OCR (CV text) · Google Gemini 2.5 Flash Lite scoring · JSON output parser'],
      ['data', 'Google Sheets: candidate log + analysis'],
      ['orchestration', N8N],
    ],
    text: {
      en: {
        services: 'HR AUTOMATION · OCR · AI SCORING', industry: 'Recruiting',
        description: [
          'This n8n workflow screens job applications automatically. Candidates apply through a web form, AI reads each CV against the job description and the score lands in a Google Sheet.',
        ],
        challenges: [
          'Recruiters spend hours on the first pass of every opening, reading CVs that clearly do not fit. Some applicants also get lost when a step in the process fails.',
        ],
        solutions: [
          'A public form collects name, email and the CV as a PDF. The candidate is logged in Google Sheets straight away, so nobody is lost if a later step fails. Mistral OCR extracts the CV text.',
          'Gemini 2.5 Flash Lite acts as a hiring assistant: it scores the CV against the job requirements and explains the score. A JSON output parser keeps the result structured, and the score and explanation are written back to the candidate’s row.',
        ],
        results: [
          'Every applicant arrives in one sheet with a score and a written reason, so the recruiter starts with a ranked shortlist.',
        ],
      },
      fr: {
        services: 'AUTOMATISATION RH · OCR · NOTATION IA', industry: 'Recrutement',
        description: [
          "Ce workflow n8n trie automatiquement les candidatures. Les candidats postulent via un formulaire web, l'IA lit chaque CV au regard de la fiche de poste et le score arrive dans un Google Sheet.",
        ],
        challenges: [
          'Les recruteurs passent des heures sur le premier tri de chaque poste, à lire des CV qui ne correspondent clairement pas. Certains candidats se perdent aussi quand une étape échoue.',
        ],
        solutions: [
          "Un formulaire public recueille nom, e-mail et CV en PDF. Le candidat est inscrit tout de suite dans Google Sheets, donc personne n'est perdu si une étape suivante échoue. Mistral OCR extrait le texte du CV.",
          "Gemini 2.5 Flash Lite joue l'assistant de recrutement : il note le CV selon les exigences du poste et explique la note. Un parseur JSON garde le résultat structuré, et la note et l'explication sont écrites dans la ligne du candidat.",
        ],
        results: [
          "Chaque candidat arrive dans une seule feuille avec une note et une justification écrite : le recruteur part d'une shortlist classée.",
        ],
      },
      es: {
        services: 'AUTOMATIZACIÓN RR. HH. · OCR · PUNTUACIÓN CON IA', industry: 'Selección de personal',
        description: [
          'Este workflow de n8n filtra candidaturas automáticamente. Los candidatos se postulan con un formulario web, la IA lee cada CV frente a la descripción del puesto y la puntuación llega a una Google Sheet.',
        ],
        challenges: [
          'Los reclutadores pasan horas en el primer filtro de cada vacante leyendo CV que claramente no encajan. Además, algunos candidatos se pierden cuando falla un paso del proceso.',
        ],
        solutions: [
          'Un formulario público recoge nombre, correo y el CV en PDF. El candidato se registra al momento en Google Sheets, así nadie se pierde si falla un paso posterior. Mistral OCR extrae el texto del CV.',
          'Gemini 2.5 Flash Lite actúa como asistente de selección: puntúa el CV según los requisitos del puesto y explica la nota. Un parser de salida JSON mantiene el resultado estructurado, y la puntuación y la explicación se escriben en la fila del candidato.',
        ],
        results: [
          'Cada candidato llega a una sola hoja con una puntuación y una explicación escrita, así el reclutador empieza con una preselección ordenada.',
        ],
      },
      it: {
        services: 'AUTOMAZIONE HR · OCR · VALUTAZIONE IA', industry: 'Selezione del personale',
        description: [
          'Questo workflow n8n seleziona automaticamente le candidature. I candidati si candidano tramite un modulo web, l’IA legge ogni CV rispetto alla descrizione del ruolo e il punteggio finisce in un Google Sheet.',
        ],
        challenges: [
          'I recruiter passano ore sul primo screening di ogni posizione, leggendo CV chiaramente non in linea. Inoltre alcuni candidati si perdono quando un passaggio fallisce.',
        ],
        solutions: [
          'Un modulo pubblico raccoglie nome, email e CV in PDF. Il candidato viene registrato subito su Google Sheets, così nessuno si perde se un passaggio successivo fallisce. Mistral OCR estrae il testo del CV.',
          'Gemini 2.5 Flash Lite fa da assistente di selezione: valuta il CV rispetto ai requisiti del ruolo e spiega il punteggio. Un parser JSON mantiene il risultato strutturato, e punteggio e spiegazione vengono scritti nella riga del candidato.',
        ],
        results: [
          'Ogni candidato arriva in un unico foglio con punteggio e motivazione scritta, così il recruiter parte da una shortlist ordinata.',
        ],
      },
      de: {
        services: 'HR-AUTOMATISIERUNG · OCR · KI-BEWERTUNG', industry: 'Recruiting',
        description: [
          'Dieser n8n-Workflow sichtet Bewerbungen automatisch. Bewerber reichen ihre Unterlagen über ein Webformular ein, die KI liest jeden Lebenslauf gegen die Stellenbeschreibung und die Bewertung landet in einem Google Sheet.',
        ],
        challenges: [
          'Recruiter verbringen Stunden mit der ersten Sichtung jeder Stelle und lesen Lebensläufe, die offensichtlich nicht passen. Außerdem gehen Bewerber verloren, wenn ein Schritt fehlschlägt.',
        ],
        solutions: [
          'Ein öffentliches Formular erfasst Name, E-Mail und Lebenslauf als PDF. Der Bewerber wird sofort in Google Sheets eingetragen, damit niemand verloren geht, wenn ein späterer Schritt scheitert. Mistral OCR liest den Text aus.',
          'Gemini 2.5 Flash Lite arbeitet als Recruiting-Assistent: Es bewertet den Lebenslauf anhand der Anforderungen und begründet die Note. Ein JSON-Output-Parser hält das Ergebnis strukturiert, Note und Begründung werden in die Zeile des Bewerbers geschrieben.',
        ],
        results: [
          'Jeder Bewerber steht mit Bewertung und schriftlicher Begründung in einem Sheet, der Recruiter startet mit einer sortierten Shortlist.',
        ],
      },
    },
  },
];

export const AUTOMATIONS: Study[] = LIST.map(study);
