import { createFileRoute } from "@tanstack/react-router";
import { PublisherPage } from "@/components/publisher-page";
import { publisherPages } from "@/lib/publisher-content";
import { pageSeo } from "@/lib/page-seo";
export const Route = createFileRoute("/terms")({
  head: () => pageSeo("/terms", "Terms of Use", publisherPages.terms.description),
  component: () => <PublisherPage pageKey="terms" />,
});
