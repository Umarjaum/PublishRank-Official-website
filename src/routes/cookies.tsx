import { createFileRoute } from '@tanstack/react-router';
import { PublisherPage } from '@/components/publisher-page';
import { publisherPages } from '@/lib/publisher-content';
import { pageSeo } from '@/lib/page-seo';
export const Route = createFileRoute('/cookies')({
  head: () => pageSeo('/cookies', 'Cookie Policy', publisherPages.cookies.description),
  component: () => <PublisherPage pageKey="cookies" />,
});
