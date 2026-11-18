// Public PublishRank feed: the machine-readable copy of this website's releases, news and notices.
// Served at /publishrank-feed.json and read by the WordPress plugin's News & What's New screen.
// Everything here is derived from the same modules the website renders, so nothing is duplicated.
import { z } from "zod";
import { newsroomArticles } from "@/lib/news-content";
import { latestRelease, releaseAnchor, releases, type ChangeKind } from "@/lib/releases";
import { SITE_URL } from "@/lib/site";

export const FEED_PATH = "/publishrank-feed.json";
export const FEED_SCHEMA_VERSION = 1;

const SITE_HOST = new URL(SITE_URL).host;

/** Official announcements. Keep them short; each links to a page on this website. */
export const announcements: {
  id: string;
  title: string;
  summary: string;
  level: "info" | "important" | "security";
  published_at: string;
  path: string;
}[] = [
  {
    id: "release-2-25-1",
    title: "PublishRank SEO 2.25.1 is available",
    summary:
      "Rebuilt Traffic Guard, 249-country controls, FAQ collections, Source Directory, SEO Inspector and custom schema, plus security fixes. Production-ready and free to use; all features have been tested on real websites by PublishRank Community with no errors reported.",
    level: "important",
    published_at: "2026-11-16T00:00:00Z",
    path: `/changelog#${releaseAnchor("2.25.1")}`,
  },
];

const officialUrl = z
  .string()
  .max(300)
  .url()
  .refine((value) => {
    const url = new URL(value);
    return url.protocol === "https:" && url.host === SITE_HOST && !url.username && !url.password;
  }, "must be an https URL on the official PublishRank website");

const id = z.string().regex(/^[a-z0-9][a-z0-9-]{0,79}$/);
const text = (max: number) =>
  z
    .string()
    .min(1)
    .max(max)
    .refine((value) => !/[<>]/.test(value), "plain text only");
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const isoDateTime = z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
const version = z.string().regex(/^\d+\.\d+\.\d+$/);
const changeKinds: [ChangeKind, ...ChangeKind[]] = [
  "feature",
  "improvement",
  "fix",
  "security",
  "compatibility",
];

/** The published contract. The plugin applies the same limits on its side. */
export const feedSchema = z
  .object({
    schema_version: z.literal(FEED_SCHEMA_VERSION),
    product: z.literal("PublishRank"),
    updated_at: isoDateTime,
    latest_version: version,
    website: officialUrl,
    releases: z
      .array(
        z
          .object({
            version,
            date: isoDate.nullable(),
            title: text(140),
            summary: text(400),
            url: officialUrl,
            minimum_wp: z.string().regex(/^\d+\.\d+$/),
            minimum_php: z.string().regex(/^\d+\.\d+$/),
            tested_up_to: z.string().regex(/^\d+\.\d+$/),
            changes: z
              .array(z.object({ type: z.enum(changeKinds), text: text(400) }).strict())
              .max(40),
          })
          .strict(),
      )
      .min(1)
      .max(30),
    news: z
      .array(
        z
          .object({
            id,
            title: text(160),
            summary: text(400),
            category: text(40),
            published_at: isoDateTime,
            url: officialUrl,
            featured: z.boolean(),
          })
          .strict(),
      )
      .max(30),
    announcements: z
      .array(
        z
          .object({
            id,
            title: text(140),
            summary: text(400),
            level: z.enum(["info", "important", "security"]),
            published_at: isoDateTime,
            url: officialUrl,
          })
          .strict(),
      )
      .max(10),
    links: z.array(z.object({ id, title: text(60), url: officialUrl }).strict()).max(12),
  })
  .strict();

export type PublishRankFeed = z.infer<typeof feedSchema>;

const toDateTime = (date: string) => `${date}T00:00:00Z`;

export function buildFeed(): PublishRankFeed {
  const news = newsroomArticles.slice(0, 12).map((article, index) => ({
    id: article.slug,
    title: article.title,
    summary: article.dek,
    category: article.category,
    published_at: toDateTime(article.published),
    url: `${SITE_URL}/news/${article.slug}`,
    featured: index === 0,
  }));
  // Deterministic timestamp (newest dated item), so the response and its ETag only change with content.
  const stamps = [
    ...releases.flatMap((r) => (r.date ? [toDateTime(r.date)] : [])),
    ...news.map((n) => n.published_at),
    ...announcements.map((a) => a.published_at),
  ].sort();
  const feed: PublishRankFeed = {
    schema_version: FEED_SCHEMA_VERSION,
    product: "PublishRank",
    updated_at: stamps[stamps.length - 1] ?? "2026-01-01T00:00:00Z",
    latest_version: latestRelease.version,
    website: `${SITE_URL}/`,
    releases: releases.map((release) => ({
      version: release.version,
      date: release.date,
      title: release.title,
      summary: release.summary,
      url: `${SITE_URL}/changelog#${releaseAnchor(release.version)}`,
      minimum_wp: release.minimumWp,
      minimum_php: release.minimumPhp,
      tested_up_to: release.testedUpTo,
      changes: release.changes.map((change) => ({ type: change.kind, text: change.text })),
    })),
    news,
    announcements: announcements.map(({ path, ...rest }) => ({
      ...rest,
      url: `${SITE_URL}${path}`,
    })),
    links: [
      { id: "documentation", title: "Documentation", url: `${SITE_URL}/documentation` },
      { id: "video", title: "Product video", url: `${SITE_URL}/video` },
      { id: "changelog", title: "Full release history", url: `${SITE_URL}/changelog` },
      { id: "download", title: "Download", url: `${SITE_URL}/download` },
      { id: "support", title: "Support", url: `${SITE_URL}/support` },
      { id: "security", title: "Security", url: `${SITE_URL}/security` },
    ],
  };
  // Never publish a feed that breaks the contract.
  return feedSchema.parse(feed);
}
