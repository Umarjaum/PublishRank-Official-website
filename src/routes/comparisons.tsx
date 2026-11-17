import { createFileRoute } from "@tanstack/react-router";
import { PublisherPage } from "@/components/publisher-page";
import { publisherPages } from "@/lib/publisher-content";
import { pageSeo } from "@/lib/page-seo";
export const Route = createFileRoute("/comparisons")({
  head: () =>
    pageSeo(
      "/comparisons",
      "PublishRank vs Yoast SEO, Rank Math, SEOPress & AIOSEO",
      publisherPages.comparisons.description,
    ),
  component: () => <PublisherPage pageKey="comparisons" />,
});
