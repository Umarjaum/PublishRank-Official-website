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
      "WordPress SEO Features for News Publishers",
      publisherPages.features.description,
      {
        keywords:
          "news sitemap, schema markup, WordPress SEO plugin, newsroom workflow, breadcrumbs, llms.txt, redirects",
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
