import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PageFrame, PageCta } from '@/components/site-shell';
import { publisherPages, type PublisherPageKey } from '@/lib/publisher-content';
import newsroom from '@/assets/publishrank-newsroom.jpg.asset.json';
import writing from '@/assets/publishrank-writing.jpg.asset.json';
import developer from '@/assets/publishrank-developer.jpg.asset.json';
const images = { newsroom, writing, developer };
const alts = { newsroom: 'Bright modern editorial workspace with desks and plants', writing: 'Writer making handwritten editorial notes', developer: 'Laptop and desktop development workspace' };
export function PublisherPage({ pageKey, children, after }: { pageKey: PublisherPageKey; children?: ReactNode; after?: ReactNode }) {
  const page = publisherPages[pageKey];
  if (!page) return null;
  return <PageFrame><section className="border-b bg-brand-soft"><div className="site-width py-8"><Link to="/" className="text-sm text-muted-foreground hover:text-brand">Home</Link><span className="mx-2 text-muted-foreground">/</span><span className="text-sm">{page.eyebrow}</span><p className="mt-8 text-xs font-extrabold uppercase text-brand">{page.eyebrow}</p><h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">{page.title}</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{page.intro}</p>{page.updated && <p className="mt-4 text-sm text-muted-foreground">Last updated: {page.updated}</p>}</div></section>
    {children && <div className="site-width py-10">{children}</div>}
    <div className="site-width grid gap-10 py-10 lg:grid-cols-[240px_minmax(0,1fr)]"><aside><nav aria-label="On this page" className="sticky top-6 border-l-2 border-brand pl-5"><p className="mb-4 text-xs font-extrabold uppercase text-brand">On this page</p>{page.sections.map((section, i) => <a className="mb-3 block text-sm leading-relaxed hover:text-brand" href={`#section-${i}`} key={section.title}>{section.title}</a>)}</nav></aside>
    <div className="min-w-0"><img src={images[page.image].url} alt={alts[page.image]} width={1500} height={700} className="mb-9 aspect-[2.2/1] w-full rounded-lg object-cover" fetchPriority="high" />{page.sections.map((section, i) => <section id={`section-${i}`} key={section.title} className="scroll-mt-6 border-b py-7 first:pt-0"><h2 className="text-2xl font-extrabold">{section.title}</h2>{section.paragraphs.map(p => <p key={p} className="mt-4 max-w-3xl leading-8 text-muted-foreground">{p}</p>)}{section.bullets && <ul className="mt-5 grid gap-3">{section.bullets.map(b => <li key={b} className="flex items-start gap-3 text-sm font-semibold"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{b}</li>)}</ul>}</section>)}<div className="mt-8 flex flex-wrap gap-6"><Link to="/features" className="inline-flex items-center gap-2 font-bold text-brand">Explore features<ArrowRight className="h-4 w-4" /></Link><Link to="/documentation" className="inline-flex items-center gap-2 font-bold text-brand">Read the handbook<ArrowRight className="h-4 w-4" /></Link><Link to="/contact" className="inline-flex items-center gap-2 font-bold text-brand">Contact us<ArrowRight className="h-4 w-4" /></Link></div></div></div>{after}<PageCta /></PageFrame>;
}
