import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion';
import * as React from 'react';

import { cn } from '@/lib/utils';

// Techstack dock, from 21st.dev (carolinaraulino/techstack).
// Adapted: shadcn color tokens replaced with the site's glass styling, and
// items can take an `onSelect` so the same dock doubles as the home menu.
// Clicks are resolved from the pointer position (nearest tile), like hover,
// so the swelling tiles never flicker; keyboard users get a real button.

export type ToolDockItem = {
  /** Shown in the tooltip and read out by screen readers. */
  label: string;
  /** Fills the tile. It is decorative: give images `alt=""`. */
  icon: React.ReactNode;
  /** Makes the tile clickable (menu use). */
  onSelect?: () => void;
};

export type ToolDockProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  items: ToolDockItem[];
  /** Largest tile size in px. The row shrinks to fit a narrower container. */
  size?: number;
  /** How far each tile tucks under the one before it, as a share of its width. Negative leaves a gap. */
  overlap?: number;
  /** How much the tile under the pointer grows: 0.28 is 28%. */
  magnification?: number;
  /** Lean each tile its own way at rest. */
  tilt?: boolean;
  /** Accessible name for the list. */
  label?: string;
  /** `vertical` stacks the tiles top to bottom, sized to fit the screen height. */
  orientation?: 'horizontal' | 'vertical';
  /** Vertical only: the screen edge the dock sits on. Tiles pop out and the
   *  tooltip shows on the opposite side, toward the middle of the screen. */
  side?: 'left' | 'right';
};

/** Fixed per position, so the row leans the same way on every render. */
const TILT = [-7, 5, -4, 8, -6, 4, -8, 6, -3, 7, -5, 6];
/** How many tile widths either side of the pointer still swell. */
const REACH = 1.2;
/** How far a fully swollen tile rises, in tile heights. */
const LIFT = 0.19;
/** Quick to settle, with no wobble. */
const SPRING = { stiffness: 520, damping: 40, mass: 0.5 };

/** Each slot's resting centre along the row, measured without transforms. */
type Layout = { centers: number[]; width: number };

/** How swollen tile `k` is with the pointer at `x`, from 0 to 1. */
function swellAt({ centers, width }: Layout, k: number, x: number) {
  const center = centers[k];
  if (!Number.isFinite(x) || center === undefined || !width) return 0;
  return Math.max(0, 1 - Math.abs(x - center) / width / REACH) ** 2;
}

/** Tiles deal themselves in, left to right, when the row mounts. */
const deal: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.94, filter: 'blur(3px)' },
  shown: ({ index, still }: { index: number; still: boolean }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: still
      ? { duration: 0 }
      : { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 },
    transitionEnd: { filter: 'none' },
  }),
};

type DockTileProps = {
  item: ToolDockItem;
  index: number;
  count: number;
  pointer: MotionValue<number>;
  layout: React.RefObject<Layout>;
  still: boolean;
  overlap: number;
  magnification: number;
  tilt: boolean;
  vertical: boolean;
  onLeft: boolean;
};

/**
 * One tile. Everything it does is worked out from the pointer's position along
 * the row against the tile's resting centre, never from what is under the
 * pointer, so the hovered tile never changes as tiles grow.
 */
const DockTile = React.memo(function DockTile({
  item,
  index,
  count,
  pointer,
  layout,
  still,
  overlap,
  magnification,
  tilt,
  vertical,
  onLeft,
}: DockTileProps) {
  const lean = tilt ? TILT[index % TILT.length] : 0;
  const room = Math.max(0, overlap + magnification / 2);

  const near = useTransform(pointer, (x) => (still ? 0 : swellAt(layout.current, index, x)));
  const push = useTransform(pointer, (x) => {
    if (still) return 0;
    const { centers, width } = layout.current;
    let shift = 0;
    for (let k = 0; k < centers.length; k++) {
      if (k !== index) {
        shift += swellAt(layout.current, k, x) * (k < index ? 1 : -1);
      }
    }
    return shift * width * room;
  });

  const swell = useSpring(near, SPRING);
  const slide = useSpring(push, SPRING);
  const scale = useTransform(swell, (v) => 1 + v * magnification);
  const lift = useTransform(swell, (v) => -v * LIFT * layout.current.width);
  // Along the row the neighbours make room; across it the tile pops out
  // (upward for a horizontal row, toward the screen's middle for a vertical one).
  const out = useTransform(lift, (v) => (onLeft ? -v : v));
  const x = vertical ? out : slide;
  const y = vertical ? slide : lift;
  const rotate = useTransform(swell, (v) => lean * (1 - v));

  const tile = (
    <motion.div
      role={item.onSelect ? undefined : 'img'}
      aria-label={item.onSelect ? undefined : item.label}
      style={{ x, y, scale, rotate }}
      className={cn(
        'size-(--tool-dock-size) will-change-transform select-none',
        vertical ? (onLeft ? 'origin-left' : 'origin-right') : 'origin-bottom'
      )}
    >
      {item.icon}
    </motion.div>
  );

  return (
    <motion.li
      data-slot='tool-dock-item'
      custom={{ index, still }}
      variants={deal}
      className='pointer-events-none relative flex'
      style={{
        zIndex: count - index,
        [vertical ? 'marginTop' : 'marginLeft']: index === 0 ? 0 : `calc(var(--tool-dock-size) * ${-overlap})`,
      }}
    >
      {item.onSelect ? (
        // Pointer clicks are handled on the row; this button is for keyboards.
        <button
          type='button'
          aria-label={item.label}
          onClick={item.onSelect}
          className='rounded-[23%] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-500'
        >
          {tile}
        </button>
      ) : (
        tile
      )}
    </motion.li>
  );
});

/** An overlapping, tilted row of tiles that swells around the pointer. */
export function ToolDock({
  items,
  size = 56,
  overlap = 0.12,
  magnification = 0.28,
  tilt = true,
  label = 'Tools',
  orientation = 'horizontal',
  side = 'right',
  className,
  ...props
}: ToolDockProps) {
  const rail = React.useRef<HTMLUListElement>(null);
  const layout = React.useRef<Layout>({ centers: [], width: 0 });
  const still = useReducedMotion() ?? false;
  const pointer = useMotionValue(Number.POSITIVE_INFINITY);
  const [active, setActive] = React.useState<number | null>(null);
  const current = React.useRef<number | null>(null);
  const [glide, setGlide] = React.useState(false);
  const [at, setAt] = React.useState(0);
  const [text, setText] = React.useState(items[0]?.label ?? '');
  const clickable = items.some((item) => item.onSelect);
  const vertical = orientation === 'vertical';
  const onLeft = vertical && side === 'left';

  React.useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const measure = () => {
      const slots = [...el.children] as HTMLElement[];
      layout.current = {
        centers: slots.map((li) =>
          vertical ? li.offsetTop + li.offsetHeight / 2 : li.offsetLeft + li.offsetWidth / 2
        ),
        width: slots[0]?.offsetWidth ?? 0,
      };
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [items.length, vertical]);

  /** The pointer's position along the row, from the row's start. */
  const along = (event: { clientX: number; clientY: number }) => {
    const box = rail.current!.getBoundingClientRect();
    return vertical ? event.clientY - box.top : event.clientX - box.left;
  };

  /** Index of the tile whose resting centre is nearest the pointer. */
  const nearestTo = (event: { clientX: number; clientY: number }) => {
    const el = rail.current;
    const { centers } = layout.current;
    if (!el || centers.length === 0) return null;
    const x = along(event);
    let nearest = 0;
    for (let i = 1; i < centers.length; i++) {
      if (Math.abs(x - centers[i]) < Math.abs(x - centers[nearest])) nearest = i;
    }
    return nearest;
  };

  const track = (event: { clientX: number; clientY: number }) => {
    if (!rail.current) return;
    pointer.set(along(event));
    const nearest = nearestTo(event);
    if (nearest === null || nearest === current.current) return;
    setGlide(current.current !== null);
    current.current = nearest;
    setActive(nearest);
    setText(items[nearest].label);
    setAt(layout.current.centers[nearest]);
  };

  const release = () => {
    pointer.set(Number.POSITIVE_INFINITY);
    current.current = null;
    setActive(null);
  };

  const span = 1 + (items.length - 1) * (1 - overlap) + 2 * Math.max(0, overlap + magnification / 2);
  const rise = LIFT + magnification;

  return (
    <div
      data-slot='tool-dock'
      className={cn(
        vertical
          ? cn('flex h-full flex-col justify-center', onLeft ? 'items-start' : 'items-end')
          : '@container flex w-full justify-center',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'relative w-fit',
          vertical
            ? onLeft
              ? 'pr-[calc(var(--tool-dock-size)*var(--tool-dock-rise)+0.75rem)]'
              : 'pl-[calc(var(--tool-dock-size)*var(--tool-dock-rise)+0.75rem)]'
            : 'pt-[calc(var(--tool-dock-size)*var(--tool-dock-rise)+2.75rem)]'
        )}
        style={
          {
            // vertical: fit the screen height minus a 1.5rem margin top and bottom
            '--tool-dock-size': vertical
              ? `min(${size}px, calc((100dvh - 3rem) / ${span}))`
              : `min(${size}px, calc((100cqw - 1rem) / ${span}))`,
            '--tool-dock-rise': rise,
          } as React.CSSProperties
        }
      >
        <span
          aria-hidden
          data-slot='tool-dock-tooltip'
          data-state={active === null ? 'closed' : 'open'}
          className={cn(
            'pointer-events-none absolute z-50 rounded-md border border-white/60 bg-white/80 px-2.5 py-1 text-[13px] font-medium whitespace-nowrap text-neutral-800 opacity-0 shadow-sm backdrop-blur-md ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=open]:opacity-100 motion-reduce:transition-none',
            vertical
              ? onLeft
                ? 'top-0 left-[calc(var(--tool-dock-size)*(1+var(--tool-dock-rise))+0.625rem)]'
                : 'top-0 right-[calc(var(--tool-dock-size)*(1+var(--tool-dock-rise))+0.625rem)]'
              : 'bottom-[calc(var(--tool-dock-size)*(1+var(--tool-dock-rise))+0.625rem)] left-0',
            glide ? 'transition-[translate,opacity] duration-300' : 'transition-opacity duration-200'
          )}
          style={{ translate: vertical ? `0 calc(${at}px - 50%)` : `calc(${at}px - 50%) 0` }}
        >
          {text}
          <span
            className={cn(
              'absolute size-[9px] rotate-45 border-white/60 bg-white/80',
              vertical
                ? onLeft
                  ? 'top-1/2 -left-[5px] -mt-[4.5px] rounded-bl-[2px] border-b border-l'
                  : 'top-1/2 -right-[5px] -mt-[4.5px] rounded-tr-[2px] border-t border-r'
                : 'left-1/2 -bottom-[5px] -ml-[4.5px] rounded-br-[2px] border-r border-b'
            )}
          />
        </span>

        <motion.ul
          ref={rail}
          role='list'
          aria-label={label}
          initial='hidden'
          // Deal in on mount. The original's whileInView could leave the tiles
          // invisible after a hot reload remounted the row.
          animate='shown'
          onPointerMove={track}
          onPointerDown={track}
          onPointerLeave={release}
          onPointerUp={(event) => {
            if (event.pointerType !== 'mouse') release();
          }}
          onPointerCancel={release}
          onClick={(event) => {
            // detail 0 = keyboard click, already handled by the tile's button
            if (event.detail === 0) return;
            const nearest = nearestTo(event);
            if (nearest !== null) items[nearest].onSelect?.();
          }}
          className={cn(
            'pointer-events-auto relative flex w-fit',
            vertical ? 'flex-col touch-pan-x' : 'touch-pan-y',
            clickable && 'cursor-pointer'
          )}
        >
          {items.map((item, index) => (
            <DockTile
              key={item.label}
              item={item}
              index={index}
              count={items.length}
              pointer={pointer}
              layout={layout}
              still={still}
              overlap={overlap}
              magnification={magnification}
              tilt={tilt}
              vertical={vertical}
              onLeft={onLeft}
            />
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

/** An app-icon tile: a rounded square with a soft lift and a hairline edge. Set its colour with `className`. */
export function ToolDockTile({ className, children, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      data-slot='tool-dock-tile'
      className={cn(
        'relative grid size-full place-items-center overflow-hidden rounded-[23%] bg-white shadow-[0_0_0_0.5px_rgb(0_0_0/0.08),0_1px_1.5px_rgb(0_0_0/0.16),0_0_0.5px_rgb(0_0_0/0.12)]',
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-linear-to-b after:from-white/15 after:to-transparent after:shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.14),inset_0_1px_0_rgb(255_255_255/0.3)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
