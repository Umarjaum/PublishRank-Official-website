import { createFileRoute } from "@tanstack/react-router";
import { PublisherPage } from "@/components/publisher-page";
import { FeatureCatalogView, ToolHighlights } from "@/components/feature-catalog-view";
import { ProductScreenshotGallery } from "@/components/product-screenshot-gallery";
import { publisherPages } from "@/lib/publisher-content";
import { pageSeo } from "@/lib/page-seo";
export const Route = createFileRoute("/features")({
  head: () =>
    pageSeo(
      "/features",
      "Beyond Basic SEO: Mastodon, Schema & llms.txt",
      publisherPages.features.description,
      {
        keywords:
          "Mastodon publishing, Schema Aggregator endpoint, llms.txt, AI discovery, WordPress SEO, news sitemap, newsroom workflow",
      },
    ),
  component: () => (
    <PublisherPage
      pageKey="features"
      after={
        <>
          <ToolHighlights />
          <ProductScreenshotGallery />
          <FeatureCatalogView />
        </>
      }
    />
  ),
});
