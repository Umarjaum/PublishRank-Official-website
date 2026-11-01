import { createFileRoute } from '@tanstack/react-router';
import { PublisherPage } from '@/components/publisher-page';
import { publisherPages } from '@/lib/publisher-content';
import { pageSeo } from '@/lib/page-seo';
export const Route = createFileRoute('/resources')({
  head: () => pageSeo('/resources', 'News SEO Resources & Guides', publisherPages.resources.description),
  component: () => <PublisherPage pageKey="resources" />,
});
