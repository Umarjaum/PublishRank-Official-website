import { createFileRoute } from '@tanstack/react-router';
import { PublisherPage } from '@/components/publisher-page';
import { publisherPages } from '@/lib/publisher-content';
import { pageSeo } from '@/lib/page-seo';
export const Route = createFileRoute('/privacy')({
  head: () => pageSeo('/privacy', 'Privacy Policy', publisherPages.privacy.description),
  component: () => <PublisherPage pageKey="privacy" />,
});
