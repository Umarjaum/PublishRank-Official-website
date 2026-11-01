import { Link } from '@tanstack/react-router';
import { useState, type ReactNode } from 'react';
import { ArrowRight, Download, Menu, X, Heart, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/publishrank-reference-logo.png.asset.json';
import { DownloadLink } from '@/components/download-link';
import { LOGO_GIF, REPO_URL } from '@/lib/site';

export const navigation = [
  ['/features', 'Features'], ['/documentation', 'Documentation'], ['/comparisons', 'Comparisons'], ['/resources', 'Resources'], ['/support', 'Support'], ['/contact', 'Contact'],
] as const;
export function Logo() {
  return <Link to="/" aria-label="PublishRank home" className="shrink-0"><img src={logo.url} alt="PublishRank — SEO for Publishers" width={220} height={54} className="brand-logo" /></Link>;
}
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="site-width flex flex-wrap items-center justify-between gap-4 py-5">
    <Logo />
    <nav aria-label="Main navigation" className="hidden items-center gap-5 text-sm font-semibold lg:flex">{navigation.map(([to, label]) => <Link key={to} to={to} activeProps={{ className: 'text-brand' }} className="hover:text-brand">{label}</Link>)}</nav>
    <Button asChild className="hidden rounded-full lg:inline-flex"><DownloadLink><Download />Download PublishRank</DownloadLink></Button>
    <Button variant="outline" size="icon" className="lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    {open && <nav aria-label="Mobile navigation" className="mobile-nav grid w-full gap-1 border-t pt-3 lg:hidden">{navigation.map(([to, label]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="py-2 font-semibold transition-colors hover:text-brand">{label}</Link>)}<DownloadLink className="py-2 font-bold text-brand">Download PublishRank</DownloadLink></nav>}
  </div></header>;
}
const footerLinks = [
  ['/features', 'Features'], ['/documentation', 'Documentation'], ['/comparisons', 'Comparisons'], ['/resources', 'Resources'], ['/support', 'Support'], ['/about', 'About'], ['/contact', 'Contact'], ['/download', 'Download'],
] as const;
const legalLinks = [
  ['/privacy', 'Privacy'], ['/terms', 'Terms'], ['/cookies', 'Cookies'], ['/disclaimer', 'Disclaimer'], ['/security', 'Security'], ['/accessibility', 'Accessibility'],
] as const;
export function SiteFooter() {
  return <footer className="bg-ink text-primary-foreground"><div className="site-width grid gap-8 py-10 md:grid-cols-[1fr_2fr]">
    <div><Logo /><div className="mt-4 flex items-center gap-3"><img src={LOGO_GIF} alt="PublishRank animated logo mark" width={48} height={48} loading="lazy" className="h-12 w-12 rounded-xl" /><a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"><Github className="h-4 w-4" />PublishRank on GitHub</a></div><p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/75">WordPress SEO for the people who publish. Built around stories, authors and the life of an editorial archive.</p></div>
    <div className="grid gap-8 sm:grid-cols-2"><nav aria-label="Footer navigation"><p className="mb-3 text-xs font-extrabold uppercase text-primary-foreground/60">Explore</p><ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">{footerLinks.map(([to, label]) => <li key={to}><Link to={to} className="hover:underline">{label}</Link></li>)}</ul></nav>
    <nav aria-label="Legal"><p className="mb-3 text-xs font-extrabold uppercase text-primary-foreground/60">Legal</p><ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">{legalLinks.map(([to, label]) => <li key={to}><Link to={to} className="hover:underline">{label}</Link></li>)}</ul></nav></div>
  </div><div className="site-width flex flex-wrap items-center justify-between gap-3 border-t border-primary-foreground/20 py-5 text-xs"><span>© 2026 PublishRank. All rights reserved.</span><span>SEO powered by PublishRank</span><span className="flex items-center gap-2">For journalism. Not for profit. <Heart className="h-3 w-3 text-brand-soft" /></span></div></footer>;
}
export function PageFrame({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background font-sans text-foreground"><SiteHeader /><main>{children}</main><SiteFooter /></div>;
}
export function PageCta() {
  return <section className="bg-brand text-primary-foreground"><div className="site-width flex flex-wrap items-center justify-between gap-6 py-10"><div><h2 className="text-2xl font-extrabold">A stronger publishing workflow.</h2><p className="mt-2 text-primary-foreground/85">Start with the guide. Build a better foundation for every story.</p></div><div className="flex flex-wrap gap-3"><Button variant="secondary" asChild><Link to="/documentation">Read the documentation<ArrowRight /></Link></Button><Button variant="secondary" asChild><DownloadLink><Download />Download PublishRank</DownloadLink></Button></div></div></section>;
}
