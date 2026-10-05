import * as React from 'react';

import { cn } from '@/lib/utils';

// 21st.dev "Button" by ekmas (neobrutalism). Adapted: the neobrutalism theme
// tokens (bg-main, border-border, shadow-shadow, boxShadowX/Y) written out as
// plain Tailwind values, and no radix Slot / cva dependency. `pressed` keeps
// a button pushed in — the selected one in a group.

const SHADOW = 'shadow-[4px_4px_0px_0px_#000]';
const PUSH = 'translate-x-[4px] translate-y-[4px] shadow-none';

const VARIANTS = {
  default: `bg-[#88aaee] text-black border-2 border-black ${SHADOW} hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none`,
  noShadow: 'bg-[#88aaee] text-black border-2 border-black',
  neutral: `bg-white text-black border-2 border-black ${SHADOW} hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none`,
  reverse:
    'bg-[#88aaee] text-black border-2 border-black hover:-translate-x-[4px] hover:-translate-y-[4px] hover:shadow-[4px_4px_0px_0px_#000]',
};

const SIZES = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 px-3',
  lg: 'h-11 px-8',
  icon: 'h-10 w-10',
};

export interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  /** Shown pushed in (no shadow), e.g. the selected option. */
  pressed?: boolean;
}

export const NeoButton = React.forwardRef<HTMLButtonElement, NeoButtonProps>(
  ({ className, variant = 'default', size = 'default', pressed, ...props }, ref) => (
    <button
      ref={ref}
      aria-pressed={pressed}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-[5px] text-sm font-semibold whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
        VARIANTS[variant],
        SIZES[size],
        pressed && PUSH,
        className
      )}
      {...props}
    />
  )
);
NeoButton.displayName = 'NeoButton';
