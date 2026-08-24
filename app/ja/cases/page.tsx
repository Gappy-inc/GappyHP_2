import ProjectsPage from '@/components/site/ProjectsPage'
import { localizedPageMetadata } from '@/lib/metadata'

export const metadata = localizedPageMetadata('ja', 'projects')

export default function Page() {
  return <ProjectsPage locale="ja" />
}
