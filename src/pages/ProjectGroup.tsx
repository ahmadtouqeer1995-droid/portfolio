import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

import { InteractiveCanvas } from '@/components/ui/interactive-canvas';
import { StickyNote } from '@/components/ui/sticky-note';
import { TapedImage } from '@/components/ui/taped-image';
import { PROJECT_GROUPS, useProjects } from '@/data/projects';
import { useLang, usePageMeta } from '@/i18n';

// One group's board (opened from a button on /projects): the dotted canvas,
// and every project in the group as a big taped thumbnail with a post-it
// naming it, in a rough collage — left, right, then a bigger one centred —
// all placed crooked like the case-study pages. Click → case study.

/** The collage repeats left → right → big in the centre. On wide screens
 *  the right one rides up beside the left one, so the board feels pinned up
 *  by hand rather than laid out in rows. */
const SLOTS = [
  // post-its sit on the OUTER corner: the neighbour riding up beside a
  // picture covers its inner side
  { place: 'lg:mr-auto lg:w-[54%]', lift: '', note: '-left-4 lg:-left-10' },
  { place: 'lg:ml-auto lg:w-[52%]', lift: 'lg:-mt-48', note: '-right-4 lg:-right-10' },
  { place: 'lg:mx-auto lg:w-[76%]', lift: 'lg:mt-4', note: 'right-[8%]' },
];

/** Groups of three or fewer have room to spare: every picture is big, still
 *  pushed left / right / centre, stacked instead of riding up (at this size
 *  they would cover each other). */
const SLOTS_FEW = [
  { place: 'lg:mr-auto lg:w-[74%]', lift: '', note: '-left-4 lg:-left-10' },
  { place: 'lg:ml-auto lg:w-[74%]', lift: '', note: '-right-4 lg:-right-10' },
  { place: 'lg:mx-auto lg:w-[78%]', lift: '', note: 'right-[8%]' },
];

/** Each card's tilt (deg), sideways nudge (px) and post-it — uneven on purpose. */
const CARD_LOOKS = [
  { tilt: -3.6, shift: 18, note: '#fff3a3', noteTilt: 4 },
  { tilt: 3.2, shift: -22, note: '#ffd6e0', noteTilt: -3.6 },
  { tilt: -1.4, shift: 10, note: '#d4ecff', noteTilt: 2.8 },
  { tilt: 2.8, shift: 24, note: '#dcf5c9', noteTilt: -4.2 },
  { tilt: -3, shift: -16, note: '#ffe3c2', noteTilt: 3.4 },
  { tilt: 1.8, shift: -8, note: '#e8dcff', noteTilt: -2.6 },
];

function ProjectGroup({ slug }: { slug: string }) {
  const { t } = useLang();
  const group = PROJECT_GROUPS.find((g) => g.slug === slug)!;
  const projects = useProjects().filter((p) => group.kinds.includes(p.kind));

  usePageMeta(
    `${t(group.labelKey)} — Projects | Ahmad Touqeer`,
    `${t(group.labelKey)} by Ahmad Touqeer: ${projects.map((p) => p.title).join(', ')}.`
  );

  return (
    <div className='relative h-full w-full bg-white'>
      <InteractiveCanvas />

      {/* Back to the four buttons + where we are */}
      <div className='fixed top-6 left-6 z-50 flex items-center gap-3'>
        <Link
          to='/projects'
          className='flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-md transition-colors hover:bg-white/80'
        >
          <ArrowLeft className='h-4 w-4' />
          {t('projectsTitle')}
        </Link>
        <h1 className='rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm backdrop-blur-md'>
          {t(group.labelKey)}
        </h1>
      </div>

      {/* overflow-x hidden: tape and tilted corners poke past narrow screens */}
      <div className='absolute inset-0 z-10 overflow-x-hidden overflow-y-auto'>
        <div className='mx-auto flex w-full max-w-[1400px] flex-col gap-28 px-8 pt-32 pb-36 lg:px-16'>
          {projects.map((p, i) => {
            const look = CARD_LOOKS[i % CARD_LOOKS.length];
            const slots = projects.length <= 3 ? SLOTS_FEW : SLOTS;
            const slot = slots[i % slots.length];
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full ${slot.place} ${slot.lift}`}
              >
                {/* Two separate links, never one inside the other: the picture
                    and the title open the case study, the address opens the
                    live site. */}
                <div className='group relative transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]'>
                  <Link to={`/projects/${p.id}`} aria-label={`Open ${p.title}`} className='block'>
                    <TapedImage tilt={look.tilt} shift={look.shift}>
                      <img
                        src={p.image}
                        alt={p.title}
                        loading={i < 3 ? 'eager' : 'lazy'}
                        draggable={false}
                        className={`block aspect-[16/10] w-full select-none ${
                          p.fit === 'contain' ? 'object-contain' : 'object-cover object-top'
                        }`}
                      />
                    </TapedImage>
                  </Link>

                  {/* the post-it naming it, stuck over the bottom corner */}
                  <StickyNote
                    paper={look.note}
                    tilt={look.noteTilt}
                    paperClassName='px-5 py-4 md:px-6'
                    className={`absolute -bottom-14 w-[min(62%,340px)] ${slot.note}`}
                  >
                    <Link
                      to={`/projects/${p.id}`}
                      className='block font-scrawl text-3xl leading-none font-bold text-neutral-900 md:text-4xl'
                    >
                      {p.title}
                    </Link>
                    <p className='mt-1.5 truncate font-hand text-sm text-neutral-700'>
                      {p.industry} · {p.date}
                    </p>
                    {p.url && (
                      <a
                        href={p.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='mt-1 flex w-fit items-center gap-1 font-hand text-sm font-bold text-blue-800 hover:underline'
                      >
                        {new URL(p.url).hostname}
                        <ArrowUpRight className='h-3.5 w-3.5' />
                      </a>
                    )}
                  </StickyNote>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProjectGroup;
