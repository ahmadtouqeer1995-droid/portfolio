import { useState } from 'react';

import { ToolDockTile, type ToolDockItem } from '@/components/ui/techstack';
import type { Project } from '@/data/projects';

// Brand logos for the techstack dock: the home page's headline stack, and on
// each case study the tools that project actually used, found by matching
// its Stack text. Logos come from cdn.simpleicons.org/<slug> unless a full
// URL is given; a logo that fails to load falls back to the tool's initials.

function LogoImage({ label, src, fit }: { label: string; src: string; fit: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    const initials = label
      .split(/[\s.+-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]!.toUpperCase())
      .join('');
    return <span className='text-sm font-bold text-neutral-700'>{initials}</span>;
  }
  return (
    <img
      src={src.startsWith('http') ? src : `https://cdn.simpleicons.org/${src}`}
      alt=''
      draggable={false}
      onError={() => setFailed(true)}
      className={`${fit} object-contain`}
    />
  );
}

/** A brand logo on a white app-icon tile. Default source: cdn.simpleicons.org/<slug>. */
export function logo(label: string, src: string, fit = 'size-[56%]'): ToolDockItem {
  return {
    label,
    icon: (
      <ToolDockTile>
        <LogoImage label={label} src={src} fit={fit} />
      </ToolDockTile>
    ),
  };
}

/** Every tool a project can show: its logo and the words that name it in a Stack line. */
const TECH: { label: string; src: string; match: RegExp; fit?: string }[] = [
  // Frontend
  { label: 'Next.js', src: 'nextdotjs', match: /next\.js/i },
  { label: 'React', src: 'react', match: /\breact\b/i },
  { label: 'TypeScript', src: 'typescript', match: /typescript/i },
  { label: 'JavaScript', src: 'javascript', match: /javascript/i },
  { label: 'HTML', src: 'html5', match: /\bhtml\b(?! form)/i },
  { label: 'CSS', src: 'css', match: /(?<!tailwind )\bcss\b/i },
  { label: 'Tailwind CSS', src: 'tailwindcss', match: /tailwind/i },
  { label: 'GSAP', src: 'greensock', match: /gsap/i },
  { label: 'Three.js', src: 'threedotjs', match: /three\.js/i },
  { label: 'Shopify', src: 'shopify', match: /shopify/i },
  // Backend & data
  { label: 'Python', src: 'python', match: /python/i, fit: 'size-[62%]' },
  { label: 'FastAPI', src: 'fastapi', match: /fastapi/i },
  { label: 'Node.js', src: 'nodedotjs', match: /\bnode\b/i },
  { label: 'Prisma', src: 'prisma', match: /prisma/i },
  { label: 'Drizzle', src: 'drizzle', match: /drizzle/i },
  { label: 'Zod', src: 'zod', match: /\bzod\b/i },
  { label: 'Supabase', src: 'supabase', match: /supabase/i },
  { label: 'PostgreSQL', src: 'postgresql', match: /postgres/i },
  { label: 'SQLite', src: 'sqlite', match: /sqlite/i },
  { label: 'NumPy', src: 'numpy', match: /numpy/i },
  // its brand color is white, invisible on the white tile
  { label: 'Better Auth', src: 'betterauth/000000', match: /better auth/i },
  // AI
  { label: 'Claude', src: 'claude', match: /claude/i },
  { label: 'Anthropic', src: 'anthropic', match: /anthropic/i },
  // dropped from simple-icons; the last release that has it
  { label: 'OpenAI', src: 'https://cdn.jsdelivr.net/npm/simple-icons@9.21.0/icons/openai.svg', match: /openai/i },
  { label: 'Ollama', src: 'ollama', match: /ollama/i },
  { label: 'Hugging Face', src: 'huggingface', match: /sentence-transformers|setfit|hugging face/i, fit: 'size-[66%]' },
  { label: 'Workers AI', src: 'cloudflareworkers', match: /workers ai/i },
  // Automation & integrations
  { label: 'n8n', src: 'n8n', match: /\bn8n\b/i, fit: 'size-[62%]' },
  { label: 'HubSpot', src: 'hubspot', match: /hubspot/i },
  { label: 'Airtable', src: 'airtable', match: /airtable/i },
  { label: 'Google Sheets', src: 'googlesheets', match: /google sheets/i },
  { label: 'Gmail', src: 'gmail', match: /gmail/i },
  { label: 'Typeform', src: 'typeform', match: /typeform/i },
  { label: 'Telegram', src: 'telegram', match: /telegram/i },
  { label: 'Resend', src: 'resend', match: /resend/i },
  // Payments
  { label: 'Stripe', src: 'stripe', match: /stripe/i },
  { label: 'Revolut', src: 'revolut', match: /revolut/i },
  // Real time & media
  { label: 'Pusher', src: 'pusher', match: /pusher/i },
  { label: 'Cloudflare R2', src: 'cloudflare', match: /\br2\b/i },
  // Hosting & tooling
  { label: 'Cloudflare', src: 'cloudflare', match: /cloudflare(?! r2| ai)/i },
  { label: 'Cloudflare Workers', src: 'cloudflareworkers', match: /workers via|cloudflare workers(?! ai)/i },
  { label: 'Vercel', src: 'vercel', match: /vercel/i },
  { label: 'Docker', src: 'docker', match: /docker/i },
  { label: 'GitHub Actions', src: 'githubactions', match: /github actions/i },
  { label: 'GitHub', src: 'github', match: /github(?! actions)/i, fit: 'size-[62%]' },
  { label: 'Sentry', src: 'sentry', match: /sentry/i },
  { label: 'Vitest', src: 'vitest', match: /vitest/i },
  { label: 'pytest', src: 'pytest', match: /pytest/i },
];

/** The Shopify builds have no Stack table; this is what every one of them used. */
const SHOPIFY_STACK = 'Shopify · HTML · CSS · JavaScript';

/** The project's tools as dock tiles, in the order its Stack first names them. */
export function techLogos(project: Project): ToolDockItem[] {
  const text = project.stack ? project.stack.map((row) => row.tools).join(' · ') : SHOPIFY_STACK;
  const seen = new Set<string>();
  return TECH.map((tech) => ({ tech, at: text.search(tech.match) }))
    .filter(({ at }) => at >= 0)
    .sort((a, b) => a.at - b.at)
    .filter(({ tech }) => {
      // two names can share one logo (Cloudflare, Workers AI): keep the one named first
      if (seen.has(tech.src)) return false;
      seen.add(tech.src);
      return true;
    })
    .map(({ tech }) => logo(tech.label, tech.src, tech.fit));
}
