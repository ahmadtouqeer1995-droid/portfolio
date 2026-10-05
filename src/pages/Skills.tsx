import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import FluidCursor from '@/components/FluidCursor';
import { ToolDock, ToolDockTile, type ToolDockItem } from '@/components/ui/techstack';
import { useLang, usePageMeta, type Lang } from '@/i18n';

// Skills page: one Techstack dock per category, same component as the home
// page's bottom row. Logos come from cdn.simpleicons.org by slug; pass a full
// URL (or a /public path via BASE_URL) for anything simple-icons lacks.

/** A brand logo on a white app-icon tile. */
function logo(label: string, src: string, fit = 'size-[58%]'): ToolDockItem {
  const url = src.includes('/') ? src : `https://cdn.simpleicons.org/${src}`;
  return {
    label,
    icon: (
      <ToolDockTile>
        <img src={url} alt='' draggable={false} className={`${fit} object-contain`} />
      </ToolDockTile>
    ),
  };
}

type CategoryId =
  | 'ai'
  | 'automation'
  | 'languages'
  | 'frontend'
  | 'styling'
  | 'backend'
  | 'database'
  | 'cloud';

const CATEGORIES: { id: CategoryId; items: ToolDockItem[] }[] = [
  {
    id: 'ai',
    items: [
      logo('LangChain', 'langchain', 'size-[66%]'),
      // official mark is #7FC8FF — too light on white, so use LangChain's dark brand color
      logo('LangGraph', 'https://cdn.simpleicons.org/langgraph/1C3C3C', 'size-[66%]'),
      logo('CrewAI', 'crewai'),
      logo('MCP', 'modelcontextprotocol'),
      logo('Hugging Face', 'huggingface', 'size-[68%]'),
      logo('Claude Code', 'claude'),
      logo('OpenAI', 'https://cdn.jsdelivr.net/npm/simple-icons@11/icons/openai.svg'),
      logo('Gemini', 'googlegemini'),
    ],
  },
  {
    id: 'automation',
    items: [
      logo('n8n', 'n8n', 'size-[64%]'),
      logo('Make', 'make'),
      logo('Zapier', 'zapier'),
      // no simple-icons entry — served from /public (BASE_URL covers the /portfolio/ prefix)
      logo('Lovable', `${import.meta.env.BASE_URL}lovable-color.svg`),
      logo('Shopify', 'shopify'),
    ],
  },
  {
    id: 'languages',
    items: [
      logo('Python', 'python', 'size-[64%]'),
      logo('TypeScript', 'typescript'),
      logo('JavaScript', 'javascript'),
    ],
  },
  {
    id: 'frontend',
    items: [
      logo('React', 'react'),
      logo('Next.js', 'nextdotjs'),
      logo('Vue.js', 'vuedotjs'),
    ],
  },
  {
    id: 'styling',
    items: [
      logo('HTML5', 'html5'),
      logo('CSS', 'css'),
      logo('Tailwind CSS', 'tailwindcss'),
    ],
  },
  {
    id: 'backend',
    items: [
      logo('FastAPI', 'fastapi'),
      logo('Node.js', 'nodedotjs'),
      logo('REST APIs', 'postman'),
      logo('Stripe', 'stripe'),
    ],
  },
  {
    id: 'database',
    items: [
      logo('PostgreSQL', 'postgresql'),
      logo('Supabase', 'supabase'),
      logo('Airtable', 'airtable'),
    ],
  },
  {
    id: 'cloud',
    items: [
      logo('Docker', 'docker', 'size-[64%]'),
      logo('Git', 'git'),
      logo('GitHub', 'github'),
      logo(
        'AWS',
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
        'size-[70%]'
      ),
      logo('Azure', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg'),
      logo('Google Cloud', 'googlecloud'),
      logo('Vercel', 'vercel', 'size-[50%]'),
      logo('Cloudflare', 'cloudflare', 'size-[66%]'),
    ],
  },
];

const HEADINGS: Record<Lang, Record<CategoryId, string>> = {
  en: {
    ai: 'AI & Agents',
    automation: 'Automation & No-code',
    languages: 'Languages',
    frontend: 'Frontend',
    styling: 'Styling',
    backend: 'Backend & APIs',
    database: 'Databases',
    cloud: 'Cloud & DevOps',
  },
  fr: {
    ai: 'IA & Agents',
    automation: 'Automatisation & No-code',
    languages: 'Langages',
    frontend: 'Frontend',
    styling: 'Style',
    backend: 'Backend & API',
    database: 'Bases de données',
    cloud: 'Cloud & DevOps',
  },
  es: {
    ai: 'IA y agentes',
    automation: 'Automatización y no-code',
    languages: 'Lenguajes',
    frontend: 'Frontend',
    styling: 'Estilos',
    backend: 'Backend y APIs',
    database: 'Bases de datos',
    cloud: 'Cloud y DevOps',
  },
  it: {
    ai: 'IA e agenti',
    automation: 'Automazione e no-code',
    languages: 'Linguaggi',
    frontend: 'Frontend',
    styling: 'Stile',
    backend: 'Backend e API',
    database: 'Database',
    cloud: 'Cloud e DevOps',
  },
  de: {
    ai: 'KI & Agenten',
    automation: 'Automatisierung & No-Code',
    languages: 'Sprachen',
    frontend: 'Frontend',
    styling: 'Styling',
    backend: 'Backend & APIs',
    database: 'Datenbanken',
    cloud: 'Cloud & DevOps',
  },
};

// Grid order: the two 8-logo groups first (half width each), then the rest
// three to a row.
const ORDER: CategoryId[] = [
  'ai',
  'cloud',
  'automation',
  'backend',
  'languages',
  'frontend',
  'styling',
  'database',
];
CATEGORIES.sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

function Skills() {
  const { t, lang } = useLang();
  usePageMeta(
    'AI Engineering Skills & Stack — Ahmad Touqeer',
    'LangChain, LangGraph, CrewAI, MCP, Hugging Face, n8n, Make and Zapier, on top of Python, TypeScript, React, Next.js, FastAPI, PostgreSQL, Docker, Azure and Google Cloud.'
  );

  return (
    <div className='relative h-full w-full bg-white'>
      {/* Reactive fluid background — cool mix (blues / purples / magenta) */}
      <FluidCursor hues={[0.55, 0.62, 0.7, 0.78, 0.85]} />

      {/* Back to home */}
      <Link
        to='/'
        className='fixed top-6 left-6 z-50 flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-md transition-colors hover:bg-white/70'
      >
        <ArrowLeft className='h-4 w-4' />
        {t('home')}
      </Link>

      {/* One screen on desktop: 3 rows of docks, no cards. Phones scroll. */}
      <div className='absolute inset-0 z-10 overflow-y-auto md:overflow-hidden'>
        <div className='mx-auto flex min-h-full w-full max-w-[1200px] flex-col justify-center px-4 pt-20 pb-6'>
          <h1 className='text-center text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl'>
            {t('skillsTitle')}
          </h1>

          {/* 6-column grid: the two 8-logo groups share row 1, the rest pair up 3 per row */}
          <div className='mt-2 grid grid-cols-1 gap-x-8 md:grid-cols-6'>
            {CATEGORIES.map((category) => (
              <section
                key={category.id}
                className={category.items.length > 5 ? 'md:col-span-3' : 'md:col-span-2'}
              >
                <ToolDock items={category.items} size={56} label={HEADINGS[lang][category.id]} />
                <h2 className='mt-2 text-center font-mono text-xs tracking-widest text-neutral-500 uppercase'>
                  {HEADINGS[lang][category.id]}
                </h2>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
