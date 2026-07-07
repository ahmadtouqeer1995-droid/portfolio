'use client';

import { useState } from 'react';
import { motion, useTime, useTransform } from 'framer-motion';

export type OrbitSkill = {
  name: string;
  /** simpleicons.org slug; the logo is loaded from cdn.simpleicons.org.
   *  Swap `iconUrl` in for a local file in /public to use your own logo. */
  slug: string;
  iconUrl?: string;
};

export type OrbitRingConfig = {
  radius: number;
  /** Seconds for a full revolution */
  duration: number;
  reverse?: boolean;
  items: OrbitSkill[];
};

function initials(name: string) {
  return name
    .split(/\s|\//)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

function SkillNode({ skill }: { skill: OrbitSkill }) {
  const [failed, setFailed] = useState(false);
  const src = skill.iconUrl ?? `https://cdn.simpleicons.org/${skill.slug}`;

  return (
    <div className='group pointer-events-auto relative flex h-[72px] w-[72px] items-center justify-center'>
      <div className='flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm transition-transform duration-200 group-hover:scale-110'>
        {failed ? (
          <span className='text-base font-bold text-neutral-600'>{initials(skill.name)}</span>
        ) : (
          <img
            src={src}
            alt={skill.name}
            loading='lazy'
            className='h-11 w-11'
            onError={() => setFailed(true)}
          />
        )}
      </div>
      {/* Tooltip: skill name revealed on hover */}
      <span className='pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium whitespace-nowrap text-neutral-800 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100'>
        {skill.name}
      </span>
    </div>
  );
}

function OrbitRing({ radius, duration, reverse = false, items }: OrbitRingConfig) {
  const time = useTime();
  const rotate = useTransform(time, (t) => ((t / 1000 / duration) * 360 * (reverse ? -1 : 1)) % 360);
  const counterRotate = useTransform(rotate, (v) => -v);

  return (
    <div
      className='pointer-events-none absolute top-1/2 left-1/2'
      style={{
        width: radius * 2,
        height: radius * 2,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Orbit line */}
      <motion.div
        style={{ rotate }}
        className='relative h-full w-full rounded-full border border-neutral-200/90'
      >
        {items.map((skill, i) => {
          const angle = (i / items.length) * 360;
          return (
            <div
              key={skill.name}
              className='absolute top-1/2 left-1/2 h-0 w-0'
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div className='h-0 w-0' style={{ transform: `translateY(${-radius}px)` }}>
                <div className='h-0 w-0' style={{ transform: `rotate(${-angle}deg)` }}>
                  {/* Counter-rotation keeps the logo upright while orbiting */}
                  <motion.div style={{ rotate: counterRotate }} className='h-0 w-0'>
                    <div className='-translate-x-1/2 -translate-y-1/2'>
                      <SkillNode skill={skill} />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function MultiOrbitSemiCircle({ rings }: { rings: OrbitRingConfig[] }) {
  return (
    <div className='pointer-events-none absolute inset-x-0 bottom-0 h-full overflow-hidden'>
      {/* Blurred radial glow behind the orbits, light-theme version */}
      <div
        aria-hidden
        className='absolute top-1/2 left-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl'
        style={{
          background:
            'radial-gradient(circle at center, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.04) 40%, transparent 70%)',
        }}
      />
      {rings.map((ring) => (
        <OrbitRing key={ring.radius} {...ring} />
      ))}
    </div>
  );
}
