import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, Boxes, GraduationCap, Library, Mail, Workflow } from 'lucide-react';

import { InteractiveCanvas } from '@/components/ui/interactive-canvas';
import { neoButtonClasses } from '@/components/ui/neo-button';
import { StickyNote } from '@/components/ui/sticky-note';
import { TapedImage } from '@/components/ui/taped-image';
import { useExperience } from '@/data/experience';
import { useLang, usePageMeta, type StringKey } from '@/i18n';

// About page ("Me" tab), pinboard style like the project pages — no panels:
// on the dotted board, a taped photo card and post-its for the intro, stats,
// what I do and my journey, and a taped index card per role. Everything is
// stuck on a little crooked, in handwriting. Scrollable, fully translated.

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

/** Post-it colors and crooked placements, cycled through so nothing lines up. */
const PAPERS = ['#fff3a3', '#ffd6e0', '#d4ecff', '#dcf5c9', '#ffe3c2', '#e8dcff'];
const TILTS = [-2.6, 2.2, -1.6, 3, -2.2, 1.8];
const SHIFTS = [8, -12, 14, -6, 10, -14];

/** A handwritten heading written straight on the board. */
function BoardHeading({ children, tilt = -1.5 }: { children: React.ReactNode; tilt?: number }) {
  return (
    <h2
      className='font-scrawl text-5xl leading-none font-bold text-neutral-900 md:text-6xl'
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {children}
    </h2>
  );
}

function Me() {
  const { t } = useLang();
  const experience = useExperience();
  usePageMeta(
    'About — AI Engineer in Paris | Ahmad Touqeer',
    'Agentic AI, RAG and automation delivered for Allianz France, Havas Group, KHOME and Sopra Steria. MSc Machine Learning, Université Paris Cité.'
  );

  return (
    <div className='relative h-full w-full bg-white'>
      <InteractiveCanvas />

      {/* Back to home */}
      <Link
        to='/'
        className='fixed top-6 left-6 z-50 flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-md transition-colors hover:bg-white/80'
      >
        <ArrowLeft className='h-4 w-4' />
        {t('home')}
      </Link>

      {/* Full-viewport scroller above the board; overflow-x hidden because
          tilted corners poke past narrow screens */}
      <div className='absolute inset-0 z-10 overflow-x-hidden overflow-y-auto'>
        <div className='mx-auto flex w-full max-w-[1100px] flex-col gap-24 px-6 pt-28 pb-28'>
          {/* Intro: taped photo card + the big post-it */}
          <section className='flex flex-col items-center gap-14 md:flex-row md:items-start md:gap-12'>
            {/* Photo placeholder — drop a real photo here later */}
            <TapedImage tilt={-4} shift={-4} className='shrink-0'>
              <div className='flex h-52 w-44 flex-col items-center justify-center gap-3 px-4'>
                <span className='text-6xl font-extrabold tracking-tight text-neutral-300'>AT</span>
                <span className='font-scrawl text-2xl leading-none font-bold text-neutral-700'>{t('meLabel')}</span>
              </div>
            </TapedImage>

            <StickyNote paper={PAPERS[0]} tilt={1.6} shift={6} className='w-full' paperClassName='px-7 pt-8 pb-9 md:px-10'>
              <h1 className='font-scrawl text-6xl leading-[0.9] font-bold break-words text-neutral-900 md:text-7xl'>
                Ahmad <span className='text-neutral-600'>Touqeer</span>
              </h1>
              <p className='mt-2 font-hand text-sm tracking-wider text-neutral-600 uppercase'>{t('meRole')}</p>
              <p className='mt-5 font-hand text-base leading-relaxed text-neutral-800'>{t('meIntro')}</p>
              <div className='mt-7 flex flex-wrap items-center gap-4'>
                <Link to='/projects' className={neoButtonClasses()}>
                  {t('meViewProjects')}
                </Link>
                <Link to='/contact' className={neoButtonClasses({ variant: 'neutral' })}>
                  <Mail />
                  {t('contactLabel')}
                </Link>
              </div>
            </StickyNote>
          </section>

          {/* Stats: four small post-its */}
          <section className='grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10'>
            {STATS.map((stat, i) => (
              <StickyNote
                key={stat.labelKey}
                paper={PAPERS[(i + 1) % PAPERS.length]}
                tilt={TILTS[(i + 1) % TILTS.length]}
                paperClassName='px-4 py-6 text-center'
              >
                <p className='font-scrawl text-5xl leading-none font-bold text-neutral-900'>{stat.value}</p>
                <p className='mt-2 font-hand text-sm leading-snug text-neutral-700'>{t(stat.labelKey)}</p>
              </StickyNote>
            ))}
          </section>

          {/* What I do: a heading on the board + four post-its */}
          <section>
            <BoardHeading>{t('meWhatIDo')}</BoardHeading>
            <div className='mt-14 grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2'>
              {PILLARS.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <StickyNote
                    key={pillar.titleKey}
                    paper={PAPERS[(i + 2) % PAPERS.length]}
                    tilt={TILTS[(i + 2) % TILTS.length]}
                    shift={SHIFTS[i % SHIFTS.length]}
                  >
                    <Icon className='h-7 w-7 text-neutral-800' />
                    <h3 className='mt-3 font-scrawl text-3xl leading-none font-bold text-neutral-900'>{t(pillar.titleKey)}</h3>
                    <p className='mt-3 font-hand text-[15px] leading-relaxed text-neutral-800'>{t(pillar.textKey)}</p>
                  </StickyNote>
                );
              })}
            </div>
          </section>

          {/* Work history — one taped index card per role, newest first */}
          <section>
            <BoardHeading tilt={1.2}>{t('meTimelineTitle')}</BoardHeading>
            <ol className='mt-16 flex flex-col gap-16'>
              {experience.map((entry, i) => (
                <li key={entry.id} className={i % 2 ? 'md:ml-16' : 'md:mr-16'}>
                  <TapedImage tilt={TILTS[i % TILTS.length] * 0.6} shift={SHIFTS[i % SHIFTS.length]}>
                    <div className='px-6 pt-8 pb-6 md:px-8'>
                      <div className='flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6'>
                        <h3 className='font-scrawl text-3xl leading-none font-bold text-neutral-900'>
                          {entry.title}
                          <span className='font-hand text-lg font-normal text-neutral-500'> · {entry.org}</span>
                        </h3>
                        <p className='shrink-0 font-hand text-sm whitespace-nowrap text-neutral-500'>{entry.period}</p>
                      </div>
                      <p className='mt-2 flex items-center gap-1.5 font-hand text-sm text-neutral-500'>
                        {entry.kind === 'education' ? (
                          <GraduationCap className='h-3.5 w-3.5' />
                        ) : (
                          <Boxes className='h-3.5 w-3.5' />
                        )}
                        {entry.location}
                      </p>
                      <p className='mt-3 font-hand text-[15px] leading-relaxed text-neutral-800'>{entry.description}</p>
                    </div>
                  </TapedImage>
                </li>
              ))}
            </ol>
          </section>

          {/* Journey: one long post-it */}
          <section>
            <BoardHeading>{t('meJourneyTitle')}</BoardHeading>
            <StickyNote paper={PAPERS[5]} tilt={-1.2} shift={10} className='mt-12' paperClassName='px-7 pt-8 pb-9 md:px-10'>
              <p className='font-hand text-base leading-relaxed text-neutral-800'>{t('meJourneyText')}</p>
            </StickyNote>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Me;
