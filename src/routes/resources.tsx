import { createFileRoute, Link } from '@tanstack/react-router';
import { PublisherPage } from '@/components/publisher-page';
import { publisherPages } from '@/lib/publisher-content';
import { pageSeo } from '@/lib/page-seo';

export const Route = createFileRoute('/resources')({
  head: () =>
    pageSeo('/resources', 'News SEO Resources & Guides', publisherPages.resources.description),
  component: () => (
    <PublisherPage
      pageKey="resources"
      after={
        <div className="site-width pb-8 md:pb-10">
          <div className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
              Next steps
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold text-brand">
              <Link to="/features">Explore the feature catalog</Link>
              <Link to="/documentation">Read the setup handbook</Link>
              <Link to="/support">Troubleshooting and support</Link>
              <Link to="/news">Publisher newsroom</Link>
            </div>
          </div>
        </div>
      }
    />
  ),
});
