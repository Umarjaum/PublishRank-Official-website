import { createFileRoute, Link } from "@tanstack/react-router";
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
          <div className="site-width pb-8 md:pb-10">
            <div className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)]">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
                Keep exploring
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold text-brand">
                <Link to="/documentation">Read the handbook</Link>
                <Link to="/download">Download PublishRank</Link>
                <Link to="/support">Troubleshooting and support</Link>
                <Link to="/news">Publisher newsroom</Link>
              </div>
            </div>
          </div>
        </>
      }
    />
  ),
});
