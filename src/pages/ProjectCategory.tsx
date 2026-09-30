import { ScreenFrameList } from '@/components/ScreenFrameList';
import { CATEGORIES, useProjects, type ProjectKind } from '@/data/projects';
import { useLang, usePageMeta } from '@/i18n';

// Category page: one project per screen in a 16:9 frame (shared layout).
// Click a project → its case study.

function ProjectCategory({ kind }: { kind: ProjectKind }) {
  const { t } = useLang();
  const projects = useProjects().filter((p) => p.kind === kind);
  const category = CATEGORIES.find((c) => c.kind === kind)!;

  usePageMeta(`${t(category.labelKey)} — Ahmad Touqeer`, t(category.introKey));

  return (
    <ScreenFrameList
      back={{ to: '/projects', label: t('projectsTitle') }}
      heading={t(category.labelKey)}
      items={projects.map((p) => ({
        key: p.id,
        to: `/projects/${p.id}`,
        title: p.title,
        meta: `${p.category} · ${p.date}`,
        image: p.image,
        video: p.video,
        fit: p.fit,
      }))}
    />
  );
}

export default ProjectCategory;
