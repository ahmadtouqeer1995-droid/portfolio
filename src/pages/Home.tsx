import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BriefcaseBusiness,
  Laugh,
  Layers,
  UserRoundSearch,
} from 'lucide-react';

import FluidCursor from '@/components/FluidCursor';
import { AnimatedTabBar } from '@/components/ui/animated-tab-bar';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Robot } from '@/components/ui/robot-hero';
import { usePageMeta } from '@/i18n';

// Same items, icons and colors as toukoum.fr's quick-question buttons
const data = [
  { title: 'Me', color: '#329696', icon: Laugh, path: '/me' },
  { title: 'Projects', color: '#3E9858', icon: BriefcaseBusiness, path: '/projects' },
  { title: 'Skills', color: '#856ED9', icon: Layers, path: '/skills' },
  { title: 'Contact', color: '#C19433', icon: UserRoundSearch, path: '/contact' },
];

function Home() {
  const navigate = useNavigate();
  const pendingNav = useRef<ReturnType<typeof setTimeout> | null>(null);

  usePageMeta(
    'Shopify Developer in Paris — Ahmad Touqeer',
    'Freelance Shopify developer in Paris — 100+ stores built, 50+ themes sold 1,000+ times. Storefronts that convert, plus AI agents and automation.'
  );

  // Navigate AFTER the tab animation (0.7s) has played — navigating right
  // away unmounts the tab bar before the bump/color ever move.
  const handleTabChange = (index: number) => {
    if (pendingNav.current) clearTimeout(pendingNav.current);
    const path = data[index].path;
    if (path) {
      pendingNav.current = setTimeout(() => navigate(path), 800);
    }
  };

  useEffect(() => {
    return () => {
      if (pendingNav.current) clearTimeout(pendingNav.current);
    };
  }, []);

  return (
    <>
      {/* Page h1 for SEO — visually the page is the watermark + robot */}
      <h1 className='sr-only'>Ahmad Touqeer — Shopify Developer in Paris, Full Stack & AI Automation</h1>

      {/* Name watermark — sits under the fluid canvas so the fluid paints over it */}
      <div className='pointer-events-none fixed bottom-0 left-1/2 -translate-x-1/2 translate-y-[28%] select-none'>
        <span className='text-[18vw] leading-none font-extrabold tracking-tight text-neutral-200'>
          Touqeer
        </span>
      </div>

      {/* Reactive fluid background */}
      <FluidCursor />

      {/* 3D robot companion — follows the cursor, click it for heart eyes */}
      <div className='absolute inset-0 z-20'>
        <Robot />
      </div>

      {/* Glass tab-bar menu + language switcher — top right. Home page only. */}
      <div className='absolute top-6 right-6 z-50 flex items-start gap-3'>
        <AnimatedTabBar
          items={data.map((item) => {
            const Icon = item.icon;
            return { icon: <Icon className='icon' />, color: item.color };
          })}
          onTabChange={handleTabChange}
        />
        <LanguageSwitcher />
      </div>
    </>
  );
}

export default Home;
