import { createFileRoute } from '@tanstack/react-router';
import { PublisherPage } from '@/components/publisher-page';
import { publisherPages } from '@/lib/publisher-content';
import { pageSeo } from '@/lib/page-seo';
export const Route = createFileRoute('/disclaimer')({
  head: () => pageSeo('/disclaimer', 'Disclaimer', publisherPages.disclaimer.description),
  component: () => <PublisherPage pageKey="disclaimer" />,
});
