import { createFileRoute } from "@tanstack/react-router";
import { PublisherPage } from "@/components/publisher-page";
import { publisherPages } from "@/lib/publisher-content";
import { pageSeo } from "@/lib/page-seo";
export const Route = createFileRoute("/documentation")({
  head: () =>
    pageSeo(
      "/documentation",
      "Documentation & Setup Guide",
      publisherPages.documentation.description,
    ),
  component: () => <PublisherPage pageKey="documentation" />,
});
