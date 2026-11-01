import { createFileRoute } from '@tanstack/react-router';
import { PublisherPage } from '@/components/publisher-page';
import { publisherPages } from '@/lib/publisher-content';
import { pageSeo } from '@/lib/page-seo';
export const Route = createFileRoute('/security')({
  head: () => pageSeo('/security', 'Security Policy', publisherPages.security.description),
  component: () => <PublisherPage pageKey="security" />,
});
