import { createFileRoute } from '@tanstack/react-router';
import { PublisherPage } from '@/components/publisher-page';
import { publisherPages } from '@/lib/publisher-content';
import { pageSeo } from '@/lib/page-seo';
export const Route = createFileRoute('/about')({
  head: () => pageSeo('/about', 'About PublishRank', publisherPages.about.description),
  component: () => <PublisherPage pageKey="about" />,
});
