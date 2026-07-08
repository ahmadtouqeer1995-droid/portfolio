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
const rings: OrbitRingConfig[] = [
  {
    radius: 260,
    duration: 45,
    items: [
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'React', slug: 'react' },
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'HTML', slug: 'html5' },
      { name: 'CSS', slug: 'css' },
      { name: 'C++', slug: 'cplusplus' },
      { name: 'Git', slug: 'git' },
    ],
  },
  {
    radius: 410,
    duration: 60,
    reverse: true,
    items: [
      { name: 'GitHub', slug: 'github' },
      { name: 'MongoDB', slug: 'mongodb' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'Supabase', slug: 'supabase' },
      {
        name: 'Express.js',
        slug: 'express',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      },
      { name: 'Django', slug: 'django' },
      { name: 'Stripe', slug: 'stripe' },
      { name: 'Vercel', slug: 'vercel' },
      { name: 'Cloudflare', slug: 'cloudflare' },
      { name: 'Shopify', slug: 'shopify' },
    ],
  },
  {
    radius: 560,
    duration: 75,
    items: [
      { name: 'Claude Code', slug: 'claude' },
      {
        name: 'Codex',
        slug: 'openai',
        iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@11/icons/openai.svg',
      },
      { name: 'Google Cloud APIs', slug: 'googlecloud' },
      { name: 'LangChain', slug: 'langchain' },
      {
        name: 'LangGraph',
        slug: 'langgraph',
        // official mark is #7FC8FF — too light on white, so use LangChain's dark brand color
        iconUrl: 'https://cdn.simpleicons.org/langgraph/1C3C3C',
      },
      { name: 'n8n', slug: 'n8n' },
      {
        name: 'Slack',
        slug: 'slack',
        // slack was removed from simple-icons (404) — devicon has the real multicolor logo
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg',
      },
      { name: 'UI/UX', slug: 'figma' },
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
      { name: 'GSAP', slug: 'gsap' },
    ],
  },
];

function Skills() {
  const { t } = useLang();
  usePageMeta(
    'Web Development Skills & Stack — Ahmad Touqeer',
    'The stack behind 100+ Shopify stores: JavaScript, TypeScript, React, Node.js, PostgreSQL, AWS, n8n, LangGraph and more.'
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

      {/* Orbiting skill logos — hover a logo to reveal the skill name.
          orbit-scale shrinks the whole orbit to fit small screens. */}
      <div className='orbit-scale absolute inset-0 z-10'>
        <MultiOrbitSemiCircle rings={rings} />
      </div>
    </div>
  );
}

export default Skills;
