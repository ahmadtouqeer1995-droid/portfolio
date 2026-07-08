import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import FluidCursor from '@/components/FluidCursor';
import { useProjects, type Project } from '@/data/projects';
import { useLang, usePageMeta } from '@/i18n';

// Projects page: scrollable grid of glass cards. Every preview is picture 1
// of its store, shown at the pictures' native ~1122x1218 ratio so nothing
// gets cut — all previews the exact same size.

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button
      type='button'
      onClick={onOpen}
      aria-label={`Open ${project.title}`}
      className='group flex w-full cursor-pointer flex-col rounded-3xl border border-white/60 bg-white/40 p-6 text-left shadow-sm backdrop-blur-md transition-colors hover:bg-white/60'
    >
      <h3 className='text-2xl font-semibold tracking-tight text-neutral-900'>{project.title}</h3>
      <div className='mt-3 flex items-center justify-between font-mono text-xs tracking-widest text-neutral-500'>
        <span>{project.category}</span>
        <span>{project.date}</span>
      </div>
      <div className='mt-4 overflow-hidden rounded-2xl bg-white'>
        <img
          src={project.image}
          alt={project.title}
          loading='lazy'
          className='aspect-[1122/1218] w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]'
          draggable={false}
        />
      </div>
    </button>
  );
}

function Projects() {
  const navigate = useNavigate();
  const { t } = useLang();
  const projects = useProjects();

  usePageMeta(
    'Shopify Store Case Studies — Ahmad Touqeer',
    '10 real Shopify builds — skincare, audio, jewelry, fashion and more — each with a video walkthrough, screenshots, challenges, solutions and results.'
  );

  return (
    <div className='relative h-full w-full bg-white'>
      {/* Reactive fluid background — greens / teals / lime mix */}
      <FluidCursor hues={[0.22, 0.3, 0.38, 0.45, 0.14]} />

      {/* Full-viewport scroller above the background so the wheel works
          anywhere on the page, not just over the content column */}
      <div className='absolute inset-0 z-10 overflow-y-auto'>
      <div className='mx-auto w-full max-w-[1200px] px-6 pt-6 pb-20'>
        {/* Back to home */}
        <Link
          to='/'
          className='flex w-fit items-center gap-2 rounded-full border border-white/50 bg-white/40 px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-md transition-colors hover:bg-white/70'
        >
          <ArrowLeft className='h-4 w-4' />
          {t('home')}
        </Link>

        {/* Title — top left, 100px below the home button */}
        <h1 className='mt-[60px] text-4xl font-bold tracking-tight text-neutral-900 sm:mt-[100px] sm:text-5xl md:text-6xl'>
          <span className='italic font-light'>{t('projectsTitle')}</span>
        </h1>

        {/* Scrollable grid — picture 1 of every store, same size, uncropped */}
        <div className='mt-10 grid grid-cols-1 gap-6 md:grid-cols-2'>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => navigate(`/projects/${project.id}`)}
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Projects;
