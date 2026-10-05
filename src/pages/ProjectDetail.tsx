import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

import { InteractiveCanvas } from '@/components/ui/interactive-canvas';
import { StickyNote } from '@/components/ui/sticky-note';
import { ToolDock } from '@/components/ui/techstack';
import { techLogos } from '@/data/tech-logos';
import { TapedImage } from '@/components/ui/taped-image';
import { useLang, usePageMeta } from '@/i18n';
import { groupOf, useProjects } from '@/data/projects';

// Case-study page, two columns on wide screens:
// left  → the video, then every picture at full width and natural height,
//         taped to the page (no carousel, no frame, never cropped)
// right → one handwritten post-it per section (title, Description,
//         Challenges, Solutions, Stack, Results), stuck on crooked;
//         it flows with the page, no inner scrolling.
// Phones stack the two: pictures first, then the text.

function Section({
  title,
  paragraphs,
  children,
}: {
  title: string;
  paragraphs: string[];
  children?: React.ReactNode;
}) {
  return (
    <section>
      <h2 className='text-center font-scrawl text-4xl leading-none font-bold text-neutral-900'>{title}</h2>
      {paragraphs.map((text, i) => (
        <p key={i} className='mt-3 font-hand text-[15px] leading-relaxed text-neutral-800'>
          {text}
        </p>
      ))}
      {children}
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className='font-scrawl text-lg leading-tight font-bold text-neutral-600'>{label}</p>
      <p className='font-hand text-sm leading-snug text-neutral-800'>{value}</p>
    </div>
  );
}

/** Each picture's tilt (deg) and sideways nudge (px) — uneven on purpose,
 *  so they look taped up by hand. */
const PHOTO_LOOKS = [
  { tilt: -2.6, shift: 10 },
  { tilt: 2.2, shift: -14 },
  { tilt: -1.8, shift: 16 },
  { tilt: 2.8, shift: -8 },
  { tilt: -2.3, shift: 12 },
];
/** A full-page screenshot is many screens tall: the same angle would swing
 *  its bottom far sideways, so it leans this fraction of the angle. */
const TALL_TILT_FACTOR = 0.3;

/** Each post-it's paper, tilt (deg) and sideways nudge (px). */
const NOTE_LOOKS = [
  { paper: '#fff3a3', tilt: -3.4, shift: 12 },
  { paper: '#ffd6e0', tilt: 2.8, shift: -18 },
  { paper: '#d4ecff', tilt: -2.2, shift: 22 },
  { paper: '#dcf5c9', tilt: 3.6, shift: -8 },
  { paper: '#ffe3c2', tilt: -3, shift: 16 },
  { paper: '#e8dcff', tilt: 2.4, shift: -20 },
];

function ProjectDetail() {
  const { id } = useParams();
  const { t } = useLang();
  const projects = useProjects();
  const project = projects.find((p) => p.id === id);
  // Pictures far taller than wide (full-page screenshots), found on load
  const [tall, setTall] = useState<Set<string>>(new Set());

  // Case studies carry a stack table; the Shopify builds don't. Web apps
  // have a stack too, so the label comes from the category.
  const label = project?.kind === 'apps' ? 'Web App' : project?.stack ? 'AI' : 'E-commerce';
  usePageMeta(
    project
      ? `${project.title} — ${label} Case Study | Ahmad Touqeer`
      : 'Projects & Case Studies — Ahmad Touqeer',
    project
      ? project.stack
        ? `${project.title} (${project.industry}) — how it works, the stack and the results, with ${project.video ? 'video and ' : ''}screenshots.`
        : `${project.title}, an e-commerce build in ${project.industry.toLowerCase()} — the challenge, the build and the results, with video and screenshots.`
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

  // One post-it per section, in reading order
  const notes: { key: string; content: React.ReactNode }[] = [
    {
      key: 'title',
      content: (
        <>
          <p className='text-center font-hand text-xs tracking-wider text-neutral-500 uppercase'>{project.category}</p>
          <h1 className='mt-1 text-center font-scrawl text-5xl leading-none font-bold text-neutral-900'>
            {project.url ? (
              <a
                href={project.url}
                target='_blank'
                rel='noopener noreferrer'
                className='underline decoration-neutral-900/30 decoration-2 underline-offset-4 transition-colors hover:decoration-neutral-900'
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h1>
          {/* the live address, written out so visitors see where it goes */}
          {project.url && (
            <a
              href={project.url}
              target='_blank'
              rel='noopener noreferrer'
              className='mx-auto mt-2 flex w-fit items-center gap-1 font-hand text-base text-blue-800 hover:underline'
            >
              {new URL(project.url).hostname}
              <ArrowUpRight className='h-4 w-4' />
            </a>
          )}
          <div className='mt-5 grid grid-cols-2 gap-x-5 gap-y-3'>
            <Meta label={t('published')} value={project.published} />
            <Meta label={t('services')} value={project.services} />
            <Meta label={t('client')} value={project.client} />
            <Meta label={t('industry')} value={project.industry} />
          </div>
        </>
      ),
    },
    { key: 'description', content: <Section title={t('description')} paragraphs={project.description} /> },
    { key: 'challenges', content: <Section title={t('challenges')} paragraphs={project.challenges} /> },
    { key: 'solutions', content: <Section title={t('solutions')} paragraphs={project.solutions} /> },
    ...(project.stack
      ? [
          {
            key: 'stack',
            content: (
              <Section title={t('stack')} paragraphs={[]}>
                <dl className='mt-3 flex flex-col gap-3'>
                  {project.stack.map((row) => (
                    <div key={row.layer}>
                      <dt className='font-scrawl text-xl leading-tight font-bold text-neutral-700'>{row.layer}</dt>
                      <dd className='font-hand text-[15px] leading-relaxed text-neutral-800'>{row.tools}</dd>
                    </div>
                  ))}
                </dl>
              </Section>
            ),
          },
        ]
      : []),
    { key: 'results', content: <Section title={t('results')} paragraphs={project.results} /> },
  ];

  return (
    <div className='relative h-full w-full bg-white'>
      {/* White board with grey dots that react to the cursor — the taped
          pictures read as pinned to it */}
      <InteractiveCanvas />

      {/* Back to projects */}
      <Link
        to={`/projects/${groupOf(project.kind).slug}`}
        className='fixed top-6 left-6 z-50 flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-md transition-colors hover:bg-white/70'
      >
        <ArrowLeft className='h-4 w-4' />
        {t('backToProjects')}
      </Link>

      {/* Full-viewport scroller above the background so the wheel works
          anywhere on the page, not just over the content */}
      {/* overflow-x hidden: the tape on the pictures pokes past narrow screens */}
      <div className='absolute inset-0 z-10 overflow-x-hidden overflow-y-auto'>
        {/* The home page's techstack dock, with this project's tools */}
        <div className='mx-auto w-full max-w-[1500px] px-6 pt-10 lg:px-12'>
          <ToolDock items={techLogos(project)} size={52} label={`${project.title} tech stack`} />
        </div>

        <div className='mx-auto grid w-full max-w-[1500px] gap-16 px-6 pt-16 pb-24 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-40 lg:px-12'>
          {/* Left: video, then every picture full size */}
          <div className='flex flex-col gap-20'>
            {project.video && (
              <TapedImage tilt={PHOTO_LOOKS[0].tilt} shift={PHOTO_LOOKS[0].shift}>
                <video
                  src={project.video}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload='auto'
                  className='block w-full'
                />
              </TapedImage>
            )}
            {project.images.map((url, i) => {
              const look = PHOTO_LOOKS[(i + (project.video ? 1 : 0)) % PHOTO_LOOKS.length];
              return (
                <TapedImage
                  key={url}
                  tilt={tall.has(url) ? look.tilt * TALL_TILT_FACTOR : look.tilt}
                  shift={look.shift}
                >
                  <img
                    src={url}
                    alt={`${project.title} — ${i + 1}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      if (img.naturalHeight > img.naturalWidth * 2) setTall((prev) => new Set(prev).add(url));
                    }}
                    className='block h-auto w-full select-none'
                  />
                </TapedImage>
              );
            })}
          </div>

          {/* Right: one post-it per section, stuck to the board crooked, as
              if by hand. The column flows with the page — no scroll box. */}
          <aside className='flex flex-col gap-20 pt-4'>
            {notes.map((note, i) => {
              const look = NOTE_LOOKS[i % NOTE_LOOKS.length];
              return (
                <StickyNote key={note.key} paper={look.paper} tilt={look.tilt} shift={look.shift}>
                  {note.content}
                </StickyNote>
              );
            })}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
