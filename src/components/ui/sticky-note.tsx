import * as React from 'react';

import { cn } from '@/lib/utils';

// A post-it stuck to the dotted board: colored paper, a touch darker toward
// the bottom, uneven corners, its bottom-right corner lifting off the board
// (a deeper shadow down and right), and placed crooked by hand.

/** Slightly uneven corners, so the paper doesn't look machine-cut. */
const PAPER_RADIUS = '3px 6px 4px 8px / 6px 3px 7px 4px';

export function StickyNote({
  children,
  paper = '#fff3a3',
  tilt = 0,
  shift = 0,
  className,
  paperClassName = 'px-6 pt-7 pb-7 md:px-8',
}: {
  children: React.ReactNode;
  /** Post-it color. */
  paper?: string;
  /** Rotation in degrees. */
  tilt?: number;
  /** Sideways nudge in px, so the notes don't line up. */
  shift?: number;
  className?: string;
  /** Padding inside the paper — smaller for a label-sized note. */
  paperClassName?: string;
}) {
  return (
    <div className={cn('relative', className)} style={{ transform: `translateX(${shift}px) rotate(${tilt}deg)` }}>
      <div
        className={paperClassName}
        style={{
          borderRadius: PAPER_RADIUS,
          background: `linear-gradient(172deg, color-mix(in srgb, ${paper} 72%, white) 0%, ${paper} 30%, color-mix(in srgb, ${paper} 90%, black) 100%)`,
          // The lifted bottom-right corner is drawn by the paper's own shadow,
          // pushed down and right. A separate shadow strip behind the paper
          // poked out below some notes as a second sheet.
          boxShadow:
            '0 1px 1px rgba(0,0,0,0.06), 0 6px 12px -8px rgba(0,0,0,0.25), 10px 14px 16px -12px rgba(0,0,0,0.35)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
