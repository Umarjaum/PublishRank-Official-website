import { createFileRoute, Link } from '@tanstack/react-router';
import { BookOpen, Github, Mail } from 'lucide-react';
import { PageFrame } from '@/components/site-shell';
import { ContactForm } from '@/components/contact-form';
import { pageSeo } from '@/lib/page-seo';
import { ISSUES_URL, LOGO_GIF } from '@/lib/site';

export const Route = createFileRoute('/contact')({
  head: () => pageSeo('/contact', 'Contact PublishRank', 'Send a question, bug report, feature request or partnership enquiry to the PublishRank team, or open an issue on GitHub.', {
    extraSchema: [{ '@type': 'ContactPage', name: 'Contact PublishRank', url: 'https://publishrankseo.vercel.app/contact' }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return <PageFrame showBreadcrumbs={false}><section className="border-b bg-brand-soft"><div className="site-width py-8"><nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground"><Link to="/" className="hover:text-brand">Home</Link><span aria-hidden="true">/</span><span aria-current="page" className="font-semibold text-foreground">Contact</span></nav><div className="mt-8 flex flex-wrap items-center gap-6"><img src={LOGO_GIF} alt="PublishRank animated logo" width={88} height={88} className="rounded-2xl shadow-[var(--shadow-card)]" style={{ width: 88, height: 88 }} /><div><p className="text-xs font-extrabold uppercase text-brand">Contact</p><h1 className="mt-2 text-4xl font-extrabold leading-tight md:text-5xl">Talk to the team.</h1></div></div><p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">Questions, installation help, bug reports or partnership ideas — send a message and we will get back to you.</p></div></section>
    <div className="site-width grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr]">
      <ContactForm />
      <aside className="grid content-start gap-5">
        <div className="rounded-lg border bg-card p-6"><Github className="h-7 w-7 text-brand" /><h2 className="mt-3 text-lg font-extrabold">Bugs and feature requests</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">Open a GitHub issue so other publishers can follow along and add details.</p><a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-bold text-brand">Open an issue →</a></div>
        <div className="rounded-lg border bg-card p-6"><BookOpen className="h-7 w-7 text-brand" /><h2 className="mt-3 text-lg font-extrabold">Check the handbook first</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">The documentation includes an error reference for installation, sitemaps, schema and crawl settings.</p><Link to="/documentation" className="mt-3 inline-block text-sm font-bold text-brand">Read the documentation →</Link></div>
        <div className="rounded-lg border bg-brand-soft p-6"><Mail className="h-7 w-7 text-brand" /><h2 className="mt-3 text-lg font-extrabold">Before you write</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">Never send passwords or API keys. We read every message but cannot promise a response time. Security reports: start your message with SECURITY.</p></div>
      </aside>
    </div></PageFrame>;
}
