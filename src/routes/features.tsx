import { createFileRoute } from "@tanstack/react-router";
import { PublisherPage } from "@/components/publisher-page";
import {
  FeatureCatalogView,
  LocalBusinessOverview,
  ToolHighlights,
} from "@/components/feature-catalog-view";
import { ProductScreenshotGallery } from "@/components/product-screenshot-gallery";
import { publisherPages } from "@/lib/publisher-content";
import { pageSeo } from "@/lib/page-seo";
export const Route = createFileRoute("/features")({
  head: () =>
    pageSeo(
      "/features",
      "WordPress SEO for Every Website and Business",
      publisherPages.features.description,
      {
        keywords:
          "business SEO, local SEO, 134 business types, WordPress SEO for every website, LocalBusiness schema, service area business, SEO metadata, sitemaps, newsroom workflow",
      },
    ),
  component: () => (
    <PublisherPage
      pageKey="features"
      children={<LocalBusinessOverview />}
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
