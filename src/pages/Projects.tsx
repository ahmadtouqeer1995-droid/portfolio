import { ScreenFrameList } from '@/components/ScreenFrameList';
import { CATEGORIES, categoryPath, useProjects } from '@/data/projects';
import { useLang, usePageMeta } from '@/i18n';

// Projects landing: one category per screen (voice agents / Shopify stores &
// websites), each in a 16:9 frame with its first project as the thumbnail.
// See the navigation rule in data/projects.ts for where each one leads.

function Projects() {
  const { t } = useLang();
  const projects = useProjects();

  usePageMeta(
    'Projects & Case Studies — Ahmad Touqeer',
    'An offline AI voice agent (local STT, RAG, LLM and TTS), n8n + LLM automations for lead qualification, CRM routing and LinkedIn outreach, plus 10 shipped e-commerce builds — skincare, audio, jewelry, fashion and more — with screenshots, challenges, solutions and results.'
  );

  const items = CATEGORIES.flatMap(({ kind, labelKey }) => {
    const inCategory = projects.filter((p) => p.kind === kind);
    const cover = inCategory[0];
    if (!cover) return [];
    const count = inCategory.length;
    return [
      {
        key: kind,
        to: categoryPath(kind, projects),
        title: t(labelKey),
        meta: `${count} ${t(count === 1 ? 'projectOne' : 'projectMany')}`,
        image: cover.image,
        video: cover.video,
        fit: cover.fit,
      },
    ];
  });

  return (
    <ScreenFrameList back={{ to: '/', label: t('home') }} heading={t('projectsTitle')} items={items} />
  );
}

export default Projects;
