import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import FluidCursor from '@/components/FluidCursor';
import { FramerCarousel } from '@/components/ui/framer-carousel';
import { useLang, usePageMeta } from '@/i18n';
import { useProjects } from '@/data/projects';

// Case-study page, glass on white, one scrollable page:
// title → store video (16:9, kept as-is) → picture carousel with arrows
// (pictures never cropped) → Description / Challenges / Solutions / Results.

function Section({
  id,
  title,
  paragraphs,
  children,
}: {
  id: string;
  title: string;
  paragraphs: string[];
  children?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className='mt-6 scroll-mt-28 rounded-[2rem] border border-white/60 bg-white/40 p-8 shadow-sm backdrop-blur-md md:p-12'
    >
      <div className='grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12'>
        <h2 className='text-3xl font-bold tracking-tight text-neutral-900'>{title}</h2>
        <div>
          {paragraphs.map((text, i) => (
            <p key={i} className={`leading-relaxed text-neutral-600 ${i > 0 ? 'mt-5' : ''}`}>
              {text}
            </p>
          ))}
          {children}
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className='font-mono text-xs tracking-widest text-neutral-400 uppercase'>{label}</p>
      <p className='mt-1 font-mono text-sm tracking-wide text-neutral-800'>{value}</p>
    </div>
  );
}

function ProjectDetail() {
  const { id } = useParams();
  const { t } = useLang();
  const projects = useProjects();
  const project = projects.find((p) => p.id === id);

  usePageMeta(
    project ? `${project.title} — Ahmad Touqeer` : 'Projects — Ahmad Touqeer',
    project
      ? `${project.title} case study by Ahmad Touqeer — challenges, solutions and results.`
      : undefined
  );

  if (!project) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center gap-4 bg-white'>
        <p className='text-lg text-neutral-500'>{t('notFound')}</p>
        <Link to='/projects' className='font-medium text-neutral-900 underline'>
          {t('backToProjectsLink')}
        </Link>
      </div>
    );
  }

  const carouselItems = project.images.map((url, i) => ({
    id: i + 1,
    url,
    title: `${project.title} — ${i + 1}`,
  }));

  return (
    <div className='relative h-full w-full bg-white'>
      {/* Reactive fluid background — warm mix (red / orange / gold / pink) */}
      <FluidCursor hues={[0.99, 0.05, 0.11, 0.92]} />

      {/* Back to projects */}
      <Link
        to='/projects'
        className='fixed top-6 left-6 z-50 flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-md transition-colors hover:bg-white/70'
      >
        <ArrowLeft className='h-4 w-4' />
        {t('backToProjects')}
      </Link>

      {/* Full-viewport scroller above the background so the wheel works
          anywhere on the page, not just over the content column */}
      <div className='absolute inset-0 z-10 overflow-y-auto'>
      <div className='mx-auto w-full max-w-[1200px] px-4 pt-24 pb-20'>
        {/* Title stays hidden — only for SEO / screen readers */}
        <h1 className='sr-only'>{project.title}</h1>

        {/* Pictures first — arrows left/right. Frame matches the pictures'
            native ~1122x1218 pixels so they show full size, uncropped. */}
        <section className='rounded-[2rem] border border-white/60 bg-white/40 p-4 shadow-sm backdrop-blur-md md:p-6'>
          <div className='mx-auto w-full max-w-[1122px] aspect-[1122/1218]'>
            <FramerCarousel key={project.id} items={carouselItems} />
          </div>
        </section>

        {/* Video second — its own grid, exact 16:9 (1920x1080), playing
            immediately (muted autoplay), so no black bars ever show. */}
        <section className='mt-6 rounded-[2rem] border border-white/60 bg-white/40 p-4 shadow-sm backdrop-blur-md md:p-6'>
          <video
            src={project.video}
            controls
            autoPlay
            muted
            loop
            playsInline
            preload='auto'
            className='aspect-video w-full rounded-2xl'
          />
        </section>

        {/* Project Description + metadata */}
        <Section id='description' title={t('description')} paragraphs={project.description}>
          <div className='mt-8 grid grid-cols-2 gap-6 border-t border-neutral-200/70 pt-6 md:grid-cols-4'>
            <Meta label={t('published')} value={project.published} />
            <Meta label={t('services')} value={project.services} />
            <Meta label={t('client')} value={project.client} />
            <Meta label={t('industry')} value={project.industry} />
          </div>
        </Section>

        <Section id='challenges' title={t('challenges')} paragraphs={project.challenges} />
        <Section id='solutions' title={t('solutions')} paragraphs={project.solutions} />
        <Section id='results' title={t('results')} paragraphs={project.results} />
      </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
