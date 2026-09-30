import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

import FluidCursor from '@/components/FluidCursor';

// Shared layout for the Projects landing and the category pages: one item
// per screen, snap-scrolling, each in a YouTube-style 16:9 (1920x1080)
// frame sized to fit the screen. See the navigation rule in data/projects.ts.

export type FrameItem = {
  key: string;
  to: string;
  title: string;
  meta: string;
  image: string;
  video?: string;
  /** 'contain' fits the whole thumbnail in the frame (very wide diagrams). */
  fit?: 'cover' | 'contain';
};

/** How much of the next item stays visible below the current one. */
const PEEK = '7rem';

/** Muted looping video that only plays while it is on screen. */
function InViewVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.5 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload='metadata'
      className='relative h-full w-full object-cover'
    />
  );
}

export function ScreenFrameList({
  back,
  heading,
  items,
}: {
  back: { to: string; label: string };
  heading: string;
  items: FrameItem[];
}) {
  const total = String(items.length).padStart(2, '0');
  return (
    <div className='relative h-full w-full bg-white'>
      <FluidCursor hues={[0.22, 0.3, 0.38, 0.45, 0.14]} />

      {/* Back + where we are */}
      <div className='fixed top-6 left-4 z-50 flex items-center gap-3 md:left-6'>
        <Link
          to={back.to}
          className='flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-md transition-colors hover:bg-white/80'
        >
          <ArrowLeft className='h-4 w-4' />
          {back.label}
        </Link>
        <h1 className='rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm backdrop-blur-md'>
          {heading}
        </h1>
      </div>

      {/* Each item is a bit shorter than the screen (below the header), so
          the top of the next one peeks in and shows there is more to scroll */}
      <div
        className='absolute inset-0 z-10 snap-y snap-mandatory overflow-y-auto pt-20'
        style={{ scrollPaddingTop: '5rem', paddingBottom: PEEK }}
      >
        {items.map((item, i) => (
          <section
            key={item.key}
            className='snap-start px-4 pb-5 md:px-6'
            style={{ height: `calc(100% - ${PEEK})` }}
          >
            {/* Size container: the card is the largest 16:9 frame that fits
                the screen (width and height), plus its title row */}
            <div className='flex h-full items-center justify-center' style={{ containerType: 'size' }}>
              <Link
                to={item.to}
                aria-label={`Open ${item.title}`}
                style={{ width: 'min(100cqw, calc((100cqh - 96px) * 16 / 9 + 34px))' }}
                className='group flex flex-col rounded-[2rem] border border-white/60 bg-white/40 p-4 shadow-sm backdrop-blur-md transition-colors hover:bg-white/60'
              >
                <div className='flex items-center justify-between gap-4 px-2 pb-4'>
                  <div className='flex items-baseline gap-4'>
                    <span className='font-mono text-xs tracking-widest text-neutral-400'>
                      {String(i + 1).padStart(2, '0')} / {total}
                    </span>
                    <h2 className='text-2xl font-semibold tracking-tight text-neutral-900 md:text-4xl'>
                      {item.title}
                    </h2>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className='hidden font-mono text-xs tracking-widest text-neutral-500 uppercase sm:inline'>
                      {item.meta}
                    </span>
                    <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform duration-300 group-hover:rotate-45'>
                      <ArrowUpRight className='h-5 w-5' />
                    </span>
                  </div>
                </div>

                {/* 16:9 frame: the walkthrough video when there is one, over
                    the first screenshot (shown until the video paints) */}
                <div className='relative aspect-video w-full overflow-hidden rounded-2xl bg-black'>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    draggable={false}
                    className={`absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.02] ${
                      item.fit === 'contain' ? 'object-contain' : 'object-cover object-top'
                    }`}
                  />
                  {item.video && <InViewVideo src={item.video} />}
                </div>
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
