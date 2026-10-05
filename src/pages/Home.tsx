import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BriefcaseBusiness, Laugh, Layers, UserRoundSearch } from 'lucide-react';

import FluidCursor from '@/components/FluidCursor';
import { AnimatedTabBar } from '@/components/ui/animated-tab-bar';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Robot } from '@/components/ui/robot-hero';
import { ToolDock, type ToolDockItem } from '@/components/ui/techstack';
import { logo } from '@/data/tech-logos';
import { useLang, usePageMeta, type StringKey } from '@/i18n';

// Same items, icons and colors as toukoum.fr's quick-question buttons
const data: { labelKey: StringKey; color: string; icon: typeof Laugh; path: string }[] = [
  { labelKey: 'meLabel', color: '#329696', icon: Laugh, path: '/me' },
  { labelKey: 'projectsTitle', color: '#3E9858', icon: BriefcaseBusiness, path: '/projects' },
  { labelKey: 'skillsTitle', color: '#856ED9', icon: Layers, path: '/skills' },
  { labelKey: 'navContact', color: '#C19433', icon: UserRoundSearch, path: '/contact' },
];

// The headline skills from the Skills page, grouped left to right by layer.
const stack: ToolDockItem[] = [
  // AI & agents
  logo('Claude Code', 'claude'),
  logo('Hugging Face', 'huggingface', 'size-[72%]'),
  // official mark is #7FC8FF — too light on white, so use LangChain's dark brand color
  logo('LangGraph', 'https://cdn.simpleicons.org/langgraph/1C3C3C', 'size-[64%]'),
  logo('MCP', 'modelcontextprotocol'),
  // Automation
  logo('n8n', 'n8n', 'size-[62%]'),
  logo('Zapier', 'zapier'),
  // no simple-icons entry — served from /public (BASE_URL covers the /portfolio/ prefix)
  logo('Lovable', `${window.location.origin}${import.meta.env.BASE_URL}lovable-color.svg`),
  // Frontend
  logo('TypeScript', 'typescript'),
  logo('React', 'react'),
  logo('Next.js', 'nextdotjs'),
  // Backend
  logo('Python', 'python', 'size-[68%]'),
  logo('FastAPI', 'fastapi'),
  // Data
  logo('PostgreSQL', 'postgresql'),
  logo('Supabase', 'supabase'),
  // Cloud & DevOps
  logo('GitHub', 'github', 'size-[68%]'),
  logo('Docker', 'docker'),
  logo(
    'AWS',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
    'size-[76%]'
  ),
  logo('Azure', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg'),
];

function Home() {
  const navigate = useNavigate();
  const { t } = useLang();
  const pendingNav = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Top tab bar: navigate AFTER its animation (0.7s) has played — navigating
  // right away unmounts the tab bar before the bump/color ever move.
  const handleTabChange = (index: number) => {
    if (pendingNav.current) clearTimeout(pendingNav.current);
    pendingNav.current = setTimeout(() => navigate(data[index].path), 800);
  };

  useEffect(() => {
    return () => {
      if (pendingNav.current) clearTimeout(pendingNav.current);
    };
  }, []);

  usePageMeta(
    'AI Engineer — Agents, Automations & SaaS | Ahmad Touqeer',
    'Freelance AI engineer in Paris. AI agents and agentic workflows with LangChain and LangGraph, automation with n8n, Make and Zapier, SaaS products, CRM automation and AI-powered websites.'
  );

  return (
    <>
      {/* Page h1 for SEO — visually the page is the watermark + robot */}
      <h1 className='sr-only'>
        Ahmad Touqeer — AI Engineer in Paris: agents, automation workflows, SaaS and AI-powered
        websites
      </h1>

      {/* Name watermark — z-10: above the fluid canvas (z-0), below the robot (z-20).
          Centered on the robot head, which renders 4.6% below screen center
          (camera at y=0.2, fov 40, distance 6 → 0.2 / 4.37 of the view height). */}
      <div className='pointer-events-none fixed top-[calc(54.6%_-_70px)] z-10 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none'>
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

      {/* Tech stack — bottom of the page */}
      <div className='pointer-events-none fixed right-0 bottom-[66px] left-0 z-30 px-4 sm:bottom-[74px]'>
        <ToolDock items={stack} size={60} label='Tech stack' />
      </div>

      {/* Glass tab-bar menu + language switcher — top right. Home page only.
          Stacks vertically on phones so nothing overflows. */}
      <div className='absolute top-4 right-4 z-50 flex flex-col items-end gap-2 sm:top-6 sm:right-6 sm:flex-row sm:items-start sm:gap-3'>
        <AnimatedTabBar
          items={data.map((item) => {
            const Icon = item.icon;
            return { icon: <Icon className='icon' />, color: item.color, label: t(item.labelKey) };
          })}
          onTabChange={handleTabChange}
        />
        <LanguageSwitcher />
      </div>
    </>
  );
}

export default Home;
