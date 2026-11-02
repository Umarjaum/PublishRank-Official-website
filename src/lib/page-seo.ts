import { OG_IMAGE, OG_IMAGE_ALT, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

type PageSeoOptions = {
  /** Page-specific JSON-LD nodes appended after WebPage + BreadcrumbList. */
  extraSchema?: Record<string, unknown>[];
  /** Use for utility pages that should not be indexed. */
  noindex?: boolean;
  /** Use the title as-is (no "— PublishRank" suffix). */
  rawTitle?: boolean;
  keywords?: string;
  /** Use article previews and story-specific imagery on editorial pages. */
  ogType?: "website" | "article";
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  articleAuthor?: string;
};

export function pageSeo(
  path: string,
  title: string,
  description: string,
  options: PageSeoOptions = {},
) {
  const fullTitle = options.rawTitle ? title : `${title} — ${SITE_NAME}`;
  const url = absoluteUrl(path);
  const image = options.image ? absoluteUrl(options.image) : OG_IMAGE;
  const imageAlt = options.imageAlt ?? OG_IMAGE_ALT;
  const imageWidth = options.imageWidth ?? 1200;
  const imageHeight = options.imageHeight ?? 640;
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
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: image,
        width: imageWidth,
        height: imageHeight,
      },
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
    { property: "og:type", content: options.ogType ?? "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: image },
    { property: "og:image:secure_url", content: image },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:image:width", content: String(imageWidth) },
    { property: "og:image:height", content: String(imageHeight) },
    { property: "og:image:alt", content: imageAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: imageAlt },
    ...(options.publishedTime
      ? [{ property: "article:published_time", content: options.publishedTime }]
      : []),
    ...(options.modifiedTime
      ? [{ property: "article:modified_time", content: options.modifiedTime }]
      : []),
    ...(options.articleSection
      ? [{ property: "article:section", content: options.articleSection }]
      : []),
    ...(options.articleAuthor
      ? [{ property: "article:author", content: options.articleAuthor }]
      : []),
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
