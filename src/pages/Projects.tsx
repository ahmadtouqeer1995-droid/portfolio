import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import FluidCursor from '@/components/FluidCursor';
import { NeoButton } from '@/components/ui/neo-button';
import { PROJECT_GROUPS, useProjects } from '@/data/projects';
import { useLang, usePageMeta } from '@/i18n';

// Projects: ONE screen, no scrolling — just four neobrutalism buttons, one
// per group (AI agents, automations, websites, Shopify stores). A button
// opens that group's board (/projects/<group>), where each project is a
// taped thumbnail with a post-it title. See the rule in data/projects.ts.

function Projects() {
  const { t } = useLang();
  const navigate = useNavigate();
  const projects = useProjects();

  usePageMeta(
    'Projects & Case Studies — Ahmad Touqeer',
    'AI agents (an offline voice agent, a Claude-directed video ad pipeline), n8n + LLM automations for lead qualification, CRM routing and LinkedIn outreach, 10 live websites and web apps on Next.js, Supabase and Cloudflare, and 10 Shopify stores, with screenshots, challenges, solutions and results.'
  );

  return (
    <div className='relative h-full w-full overflow-hidden bg-white'>
      <FluidCursor hues={[0.22, 0.3, 0.38, 0.45, 0.14]} />

      {/* Back + where we are */}
      <div className='fixed top-4 left-4 z-50 flex items-center gap-3 md:top-6 md:left-6'>
        <Link
          to='/'
          className='flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-md transition-colors hover:bg-white/80'
        >
          <ArrowLeft className='h-4 w-4' />
          {t('home')}
        </Link>
        <h1 className='rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm backdrop-blur-md'>
          {t('projectsTitle')}
        </h1>
      </div>

      {/* The four buttons, centred on the screen */}
      <nav
        aria-label={t('projectsTitle')}
        className='absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 px-6 sm:flex-row sm:flex-wrap sm:gap-8'
      >
        {PROJECT_GROUPS.map((g) => {
          const count = projects.filter((p) => g.kinds.includes(p.kind)).length;
          return (
            <NeoButton
              key={g.slug}
              size='lg'
              className='h-14 w-64 text-base sm:w-auto'
              onClick={() => navigate(`/projects/${g.slug}`)}
            >
              {t(g.labelKey)}
              <span className='rounded-full border-2 border-black bg-white px-2 text-xs leading-5'>{count}</span>
            </NeoButton>
          );
        })}
      </nav>
    </div>
  );
}

export default Projects;
