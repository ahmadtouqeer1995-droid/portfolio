import { ArrowRight } from 'lucide-react';

import type { Project } from '@/data/projects';

// Expanding accordion gallery: a centered row of panels with 10px gaps.
// Hovering (or keyboard-focusing) a panel smoothly widens it while the
// others share the remaining space. One motion, no other effects.
const GAP = 10;

export default function StackedPanels({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect?: (id: string) => void;
}) {
  return (
    <div className='flex h-full w-full select-none' style={{ padding: GAP, gap: GAP }}>
      {projects.map((project) => (
        <button
          key={project.id}
          type='button'
          onClick={() => onSelect?.(project.id)}
          aria-label={`Open ${project.title}`}
          className='group relative min-w-0 flex-1 cursor-pointer overflow-hidden rounded-2xl transition-[flex-grow] duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:flex-[5] focus-visible:flex-[5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900'
        >
          {/* Image */}
          <div
            className='absolute inset-0 bg-cover bg-center'
            style={{ backgroundImage: `url(${project.image})` }}
          />
          {/* Legibility gradient */}
          <div className='absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 via-black/25 to-transparent' />
          {/* Border */}
          <div className='absolute inset-0 rounded-[inherit] border border-white/25' />

          {/* Collapsed state: vertical title, always readable */}
          <span
            className='absolute bottom-6 left-1/2 -translate-x-1/2 text-base font-semibold whitespace-nowrap text-white opacity-100 drop-shadow-md transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0'
            style={{ writingMode: 'vertical-rl', transform: 'translateX(-50%) rotate(180deg)' }}
          >
            {project.title}
          </span>

          {/* Expanded state: title + clear call to action */}
          <div className='absolute right-6 bottom-6 left-6 flex items-end justify-between gap-4 opacity-0 transition-opacity delay-150 duration-300 group-hover:opacity-100 group-focus-visible:opacity-100'>
            <span className='truncate text-3xl font-bold text-white drop-shadow-md'>
              {project.title}
            </span>
            <span className='flex shrink-0 items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm'>
              View project
              <ArrowRight className='h-4 w-4' />
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
