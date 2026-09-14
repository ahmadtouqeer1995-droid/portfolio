import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, Boxes, GraduationCap, Library, Mail, Workflow } from 'lucide-react';

import FluidCursor from '@/components/FluidCursor';
import { useExperience } from '@/data/experience';
import { useLang, usePageMeta, type StringKey } from '@/i18n';

// About page ("Me" tab) — glass on white, scrollable, fully translated.

const PILLARS: { icon: typeof Bot; titleKey: StringKey; textKey: StringKey }[] = [
  { icon: Bot, titleKey: 'meShopTitle', textKey: 'meShopText' },
  { icon: Library, titleKey: 'meWebTitle', textKey: 'meWebText' },
  { icon: Workflow, titleKey: 'meAiTitle', textKey: 'meAiText' },
  { icon: Boxes, titleKey: 'meContentTitle', textKey: 'meContentText' },
];

const STATS: { value: string; labelKey: StringKey }[] = [
  { value: '5+', labelKey: 'meStatsAI' },
  { value: '4', labelKey: 'meStatsClients' },
  { value: '100+', labelKey: 'meStatsProjects' },
  { value: '1,000+', labelKey: 'meStatsThemes' },
];

function Me() {
  const { t } = useLang();
  const experience = useExperience();
  usePageMeta(
    'About — AI Engineer in Paris | Ahmad Touqeer',
    'Agentic AI, RAG and automation delivered for Allianz France, Havas Group, KHOME and Sopra Steria. MSc Machine Learning, Université Paris Cité.'
  );

  return (
    <div className='relative h-full w-full bg-white'>
      {/* Reactive fluid background — cyan / blue mix */}
      <FluidCursor hues={[0.5, 0.56, 0.62]} />

      {/* Back to home */}
      <Link
        to='/'
        className='fixed top-6 left-6 z-50 flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-md transition-colors hover:bg-white/70'
      >
        <ArrowLeft className='h-4 w-4' />
        {t('home')}
      </Link>

      {/* Full-viewport scroller above the background so the wheel works
          anywhere on the page, not just over the content column */}
      <div className='absolute inset-0 z-10 overflow-y-auto'>
      <div className='mx-auto w-full max-w-[1100px] px-4 pt-24 pb-20'>
        {/* Hero */}
        <section className='rounded-[2.5rem] border border-white/60 bg-white/30 p-8 shadow-lg shadow-black/5 backdrop-blur-md md:p-12'>
          <div className='flex flex-col items-start gap-8 md:flex-row md:items-center'>
            {/* Photo placeholder — drop a real photo here later */}
            <div className='flex h-40 w-40 shrink-0 items-center justify-center rounded-3xl border border-white/60 bg-white/60 shadow-sm'>
              <span className='text-5xl font-extrabold tracking-tight text-neutral-300'>AT</span>
            </div>

            <div>
              <p className='font-mono text-xs tracking-widest text-neutral-500 uppercase'>
                {t('meLabel')}
              </p>
              <h1 className='mt-2 text-4xl font-bold tracking-tight break-words text-neutral-900 sm:text-5xl md:text-6xl'>
                Ahmad <span className='italic font-light'>Touqeer</span>
              </h1>
              <p className='mt-2 font-mono text-sm tracking-widest text-neutral-500 uppercase'>
                {t('meRole')}
              </p>
            </div>
          </div>

          <p className='mt-8 max-w-[720px] leading-relaxed text-neutral-600'>{t('meIntro')}</p>

          <div className='mt-8 flex flex-wrap items-center gap-3'>
            <Link
              to='/projects'
              className='rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700'
            >
              {t('meViewProjects')}
            </Link>
            <Link
              to='/contact'
              className='flex items-center gap-2 rounded-full border border-white/60 bg-white/40 px-6 py-3 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-md transition-colors hover:bg-white/70'
            >
              <Mail className='h-4 w-4' />
              {t('contactLabel')}
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className='mt-6 grid grid-cols-2 gap-4 md:grid-cols-4'>
          {STATS.map((stat) => (
            <div
              key={stat.labelKey}
              className='rounded-3xl border border-white/60 bg-white/40 p-8 text-center shadow-sm backdrop-blur-md'
            >
              <p className='text-4xl font-bold tracking-tight text-neutral-900'>{stat.value}</p>
              <p className='mt-2 font-mono text-xs tracking-widest text-neutral-500 uppercase'>
                {t(stat.labelKey)}
              </p>
            </div>
          ))}
        </section>

        {/* What I do */}
        <section className='mt-6 rounded-[2rem] border border-white/60 bg-white/40 p-8 shadow-sm backdrop-blur-md md:p-12'>
          <h2 className='text-3xl font-bold tracking-tight text-neutral-900'>{t('meWhatIDo')}</h2>
          <div className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.titleKey}
                  className='rounded-3xl border border-white/60 bg-white/50 p-6 shadow-sm'
                >
                  <Icon className='h-7 w-7 text-neutral-800' />
                  <h3 className='mt-4 text-lg font-semibold text-neutral-900'>
                    {t(pillar.titleKey)}
                  </h3>
                  <p className='mt-2 text-sm leading-relaxed text-neutral-600'>
                    {t(pillar.textKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Work history — roles and education from the CV, newest first */}
        <section className='mt-6 rounded-[2rem] border border-white/60 bg-white/40 p-8 shadow-sm backdrop-blur-md md:p-12'>
          <h2 className='text-3xl font-bold tracking-tight text-neutral-900'>
            {t('meTimelineTitle')}
          </h2>

          <ol className='mt-8 space-y-4'>
            {experience.map((entry) => (
              <li
                key={entry.id}
                className='rounded-3xl border border-white/60 bg-white/50 p-6 shadow-sm'
              >
                <div className='flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6'>
                  <h3 className='text-lg font-semibold text-neutral-900'>
                    {entry.title}
                    <span className='font-normal text-neutral-500'> · {entry.org}</span>
                  </h3>
                  <p className='shrink-0 font-mono text-xs tracking-widest whitespace-nowrap text-neutral-500'>
                    {entry.period}
                  </p>
                </div>

                <p className='mt-1 flex items-center gap-1.5 font-mono text-xs tracking-widest text-neutral-500 uppercase'>
                  {entry.kind === 'education' ? (
                    <GraduationCap className='h-3.5 w-3.5' />
                  ) : (
                    <Boxes className='h-3.5 w-3.5' />
                  )}
                  {entry.location}
                </p>

                <p className='mt-3 text-sm leading-relaxed text-neutral-600'>{entry.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Journey */}
        <section className='mt-6 rounded-[2rem] border border-white/60 bg-white/40 p-8 shadow-sm backdrop-blur-md md:p-12'>
          <div className='grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12'>
            <h2 className='text-3xl font-bold tracking-tight text-neutral-900'>
              {t('meJourneyTitle')}
            </h2>
            <p className='leading-relaxed text-neutral-600'>{t('meJourneyText')}</p>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}

export default Me;
