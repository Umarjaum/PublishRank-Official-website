import { OG_IMAGE, OG_IMAGE_ALT, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

type PageSeoOptions = {
  /** Page-specific JSON-LD nodes appended after WebPage + BreadcrumbList. */
  extraSchema?: Record<string, unknown>[];
  /** Use for utility pages that should not be indexed. */
  noindex?: boolean;
  /** Use the title as-is (no "— PublishRank" suffix). */
  rawTitle?: boolean;
  keywords?: string;
};

export function pageSeo(
  path: string,
  title: string,
  description: string,
  options: PageSeoOptions = {},
) {
  const fullTitle = options.rawTitle ? title : `${title} — ${SITE_NAME}`;
  const url = absoluteUrl(path);
  const robots = options.noindex
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const breadcrumbItems = [{ name: "Home", item: SITE_URL + "/" }];
  if (path !== "/") breadcrumbItems.push({ name: title, item: url });

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      name: fullTitle,
      description,
      url,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE, width: 1200, height: 630 },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: breadcrumbItems.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.item,
      })),
    },
    ...(options.extraSchema ?? []),
  ];

  const meta = [
    { title: fullTitle },
    { name: "description", content: description },
    { name: "robots", content: robots },
    { name: "generator", content: SITE_NAME },
    { name: "author", content: SITE_NAME },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:secure_url", content: OG_IMAGE },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: OG_IMAGE_ALT },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: OG_IMAGE },
    { name: "twitter:image:alt", content: OG_IMAGE_ALT },
    ...(options.keywords ? [{ name: "keywords", content: options.keywords }] : []),
  ];

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      },
    ],
  };
}
