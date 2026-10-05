import * as React from 'react';

import { cn } from '@/lib/utils';

// A picture (or any media) pinned to the page with two strips of translucent
// tape across its top corners, scrapbook style. No frame, no crop: the child
// shows at its natural aspect ratio and full width.

/** Torn ends on both short sides of a tape strip. */
const TORN_EDGES =
  'polygon(3% 0%, 97% 0%, 100% 12%, 96% 25%, 100% 40%, 97% 55%, 100% 70%, 96% 85%, 99% 100%, 2% 100%, 0% 88%, 4% 72%, 0% 58%, 3% 45%, 0% 30%, 4% 15%)';

function Tape({ className }: { className: string }) {
  return (
    <span
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute z-10 h-7 w-24 bg-amber-100/75 shadow-[0_1px_3px_rgba(0,0,0,0.12)] backdrop-blur-[1px] md:h-8 md:w-28',
        className
      )}
      style={{ clipPath: TORN_EDGES }}
    />
  );
}

export function TapedImage({
  children,
  tilt = 0,
  shift = 0,
  className,
}: {
  children: React.ReactNode;
  /** Rotation in degrees, for a hand-placed look. */
  tilt?: number;
  /** Sideways nudge in px, so the pictures don't line up. */
  shift?: number;
  className?: string;
}) {
  return (
    <figure
      className={cn('relative', className)}
      style={{ transform: `translateX(${shift}px) rotate(${tilt}deg)`, transition: 'transform 0.4s ease' }}
    >
      <Tape className='-top-3 -left-6 -rotate-[38deg] md:-left-7' />
      <Tape className='-top-3 -right-6 rotate-[38deg] md:-right-7' />
      <div className='overflow-hidden rounded-sm bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]'>{children}</div>
    </figure>
  );
}
