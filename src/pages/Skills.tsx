import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import FluidCursor from '@/components/FluidCursor';
import {
  MultiOrbitSemiCircle,
  type OrbitRingConfig,
} from '@/components/ui/multi-orbit-semi-circle';
import { useLang, usePageMeta } from '@/i18n';

// Logos come from cdn.simpleicons.org by slug. To use your own logo for any
// skill, drop a file in /public and set `iconUrl: '/your-logo.svg'` on it.
// Inner ring is the AI/automation stack — it reads first and orbits fastest.
// Outer rings carry the application stack and the data/cloud layer under it.
const rings: OrbitRingConfig[] = [
  {
    radius: 260,
    duration: 45,
    items: [
      { name: 'LangChain', slug: 'langchain' },
      {
        name: 'LangGraph',
        slug: 'langgraph',
        // official mark is #7FC8FF — too light on white, so use LangChain's dark brand color
        iconUrl: 'https://cdn.simpleicons.org/langgraph/1C3C3C',
      },
      { name: 'CrewAI', slug: 'crewai' },
      { name: 'MCP', slug: 'modelcontextprotocol' },
      { name: 'Hugging Face', slug: 'huggingface' },
      { name: 'n8n', slug: 'n8n' },
      { name: 'Make', slug: 'make' },
      { name: 'Zapier', slug: 'zapier' },
      { name: 'Claude Code', slug: 'claude' },
      {
        name: 'OpenAI',
        slug: 'openai',
        iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@11/icons/openai.svg',
      },
      { name: 'Gemini', slug: 'googlegemini' },
      // LangSmith, LlamaIndex, Pinecone and Power Automate have no
      // simple-icons entry — they'd render as letter tiles, so they live in
      // the About page copy instead.
    ],
  },
  {
    radius: 410,
    duration: 60,
    reverse: true,
    items: [
      { name: 'Python', slug: 'python' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'React', slug: 'react' },
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'Vue.js', slug: 'vuedotjs' },
      { name: 'FastAPI', slug: 'fastapi' },
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'HTML5', slug: 'html5' },
      { name: 'CSS', slug: 'css' },
      { name: 'Git', slug: 'git' },
    ],
  },
  {
    radius: 560,
    duration: 75,
    items: [
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'REST APIs', slug: 'postman' },
      { name: 'Supabase', slug: 'supabase' },
      { name: 'Docker', slug: 'docker' },
      { name: 'Airtable', slug: 'airtable' },
      {
        name: 'AWS',
        slug: 'amazonwebservices',
        iconUrl:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
      },
      {
        name: 'Azure',
        slug: 'microsoftazure',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
      },
      { name: 'Google Cloud', slug: 'googlecloud' },
      { name: 'Vercel', slug: 'vercel' },
      { name: 'Cloudflare', slug: 'cloudflare' },
      { name: 'GitHub', slug: 'github' },
      { name: 'Stripe', slug: 'stripe' },
      {
        name: 'Lovable',
        slug: 'lovable',
        // no simple-icons entry — served from /public (BASE_URL covers the
        // '/portfolio/' prefix GitHub Pages deploys under)
        iconUrl: `${import.meta.env.BASE_URL}lovable-color.svg`,
      },
      { name: 'Shopify', slug: 'shopify' },
    ],
  },
];

// The orbit is drawn at a fixed size: the outer ring's diameter (2 × 560) plus
// the 72px logo tile that straddles it, 36px sticking out each side.
const ORBIT_SIZE = 2 * 560 + 72;
/** Breathing room kept clear above and below the orbit. */
const ORBIT_GUTTER = 200;

/** Largest scale that still leaves ORBIT_GUTTER free top and bottom, and keeps
 *  the orbit inside the viewport width. Never scales past 1:1. */
function useOrbitScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () => {
      const byHeight = (window.innerHeight - ORBIT_GUTTER * 2) / ORBIT_SIZE;
      const byWidth = (window.innerWidth - 48) / ORBIT_SIZE;
      setScale(Math.max(0.2, Math.min(1, byHeight, byWidth)));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return scale;
}

function Skills() {
  const { t } = useLang();
  const scale = useOrbitScale();
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
        className='absolute top-6 left-6 z-50 flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-md transition-colors hover:bg-white/70'
      >
        <ArrowLeft className='h-4 w-4' />
        {t('home')}
      </Link>

      {/* Orbiting skill logos — hover a logo to reveal the skill name. The box
          is exactly orbit-sized and centered, so scaling it never clips a ring. */}
      <div
        className='absolute top-1/2 left-1/2 z-10'
        style={{
          width: ORBIT_SIZE,
          height: ORBIT_SIZE,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <MultiOrbitSemiCircle rings={rings} />
      </div>
    </div>
  );
}

export default Skills;
