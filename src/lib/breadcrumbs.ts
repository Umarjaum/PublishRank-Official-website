export type BreadcrumbItem = {
  label: string;
  href: string;
  current: boolean;
};

const routeLabels: Record<string, string> = {
  about: "About",
  accessibility: "Accessibility",
  comparisons: "Plugin comparisons",
  contact: "Contact",
  cookies: "Cookies",
  disclaimer: "Disclaimer",
  documentation: "Documentation",
  download: "Download",
  enterprise: "Enterprise publishing",
  features: "Features",
  news: "Newsroom",
  privacy: "Privacy",
  resources: "Resources",
  security: "Security",
  support: "Support",
  terms: "Terms",
  "wordpress-org-release": "WordPress.org release",
};

const acronymLabels: Record<string, string> = {
  ai: "AI",
  seo: "SEO",
  xml: "XML",
};

function readableSegment(segment: string) {
  return (
    routeLabels[segment] ??
    segment
      .split("-")
      .map((word) => acronymLabels[word] ?? word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const routePath = (pathname.split(/[?#]/, 1)[0] ?? "").replace(/\/+$/, "") || "/";
  const segments = routePath.split("/").filter(Boolean);

  if (segments.length === 0) return [];

  return [
    { label: "Home", href: "/", current: false },
    ...segments.map((segment, index) => ({
      label: readableSegment(segment),
      href: `/${segments.slice(0, index + 1).join("/")}`,
      current: index === segments.length - 1,
    })),
  ];
}
