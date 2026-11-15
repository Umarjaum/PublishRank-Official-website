import { createFileRoute, Link } from '@tanstack/react-router';
import { PublisherPage } from '@/components/publisher-page';
import { publisherPages } from '@/lib/publisher-content';
import { pageSeo } from '@/lib/page-seo';

export const Route = createFileRoute('/support')({
  head: () => pageSeo('/support', 'Help, Troubleshooting & Support', publisherPages.support.description),
  component: () => (
    <PublisherPage
      pageKey="support"
      after={
        <div className="site-width pb-8 md:pb-10">
          <div className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
              Keep going
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold text-brand">
              <Link to="/documentation">Read the handbook</Link>
              <Link to="/features">Review available features</Link>
              <Link to="/download">Download PublishRank</Link>
              <Link to="/contact">Contact the team</Link>
            </div>
          </div>
        </div>
      }
    />
  ),
});
