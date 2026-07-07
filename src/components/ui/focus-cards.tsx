'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

import type { Project } from '@/data/projects';

// Aceternity UI "Focus Cards" — hover one card to focus it, the rest blur.
// Adapted: full-page 5x2 grid, 10px gaps, cards are clickable buttons.
export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    onSelect,
  }: {
    card: Project;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onSelect: () => void;
  }) => (
    <button
      type='button'
      onClick={onSelect}
      aria-label={`Open ${card.title}`}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(index)}
      onBlur={() => setHovered(null)}
      className={cn(
        'relative h-full w-full cursor-pointer overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ease-out dark:bg-neutral-900',
        hovered !== null && hovered !== index && 'scale-[0.98] blur-sm'
      )}
    >
      <img src={card.image} alt={card.title} className='absolute inset-0 h-full w-full object-cover' />
      <div
        className={cn(
          'absolute inset-0 flex items-end bg-black/50 px-4 py-8 transition-opacity duration-300',
          hovered === index ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className='bg-gradient-to-b from-neutral-50 to-neutral-200 bg-clip-text text-xl font-medium text-transparent md:text-2xl'>
          {card.title}
        </div>
      </div>
    </button>
  )
);

Card.displayName = 'Card';

export function FocusCards({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect?: (id: string) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className='grid h-full w-full grid-cols-5 grid-rows-2 gap-[10px] p-[10px] select-none'>
      {projects.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          onSelect={() => onSelect?.(card.id)}
        />
      ))}
    </div>
  );
}
