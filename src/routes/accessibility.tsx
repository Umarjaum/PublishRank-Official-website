import { createFileRoute } from '@tanstack/react-router';
import { PublisherPage } from '@/components/publisher-page';
import { publisherPages } from '@/lib/publisher-content';
import { pageSeo } from '@/lib/page-seo';
export const Route = createFileRoute('/accessibility')({
  head: () => pageSeo('/accessibility', 'Accessibility Statement', publisherPages.accessibility.description),
  component: () => <PublisherPage pageKey="accessibility" />,
});
