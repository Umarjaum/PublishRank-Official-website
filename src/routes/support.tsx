import { createFileRoute } from '@tanstack/react-router';
import { PublisherPage } from '@/components/publisher-page';
import { publisherPages } from '@/lib/publisher-content';
import { pageSeo } from '@/lib/page-seo';
export const Route = createFileRoute('/support')({
  head: () => pageSeo('/support', 'Help, Troubleshooting & Support', publisherPages.support.description),
  component: () => <PublisherPage pageKey="support" />,
});
