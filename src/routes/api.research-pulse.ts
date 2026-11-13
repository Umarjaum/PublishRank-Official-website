import { createFileRoute } from "@tanstack/react-router";
import { parseOfficialRss, type ResearchSource } from "@/lib/research-feed";

type FeedDefinition = ResearchSource & { feedUrl: string };

const FEEDS: readonly FeedDefinition[] = [
  {
    key: "google-search-central",
    name: "Google Search Central",
    allowedHost: "developers.google.com",
    feedUrl: "https://feeds.feedburner.com/blogspot/amDG",
  },
  {
    key: "google-search-docs",
    name: "Google Search documentation updates",
    allowedHost: "developers.google.com",
    feedUrl: "https://developers.google.com/search/updates/search_docs_updates.rss",
  },
  {
    key: "wordpress-developer",
    name: "WordPress Developer Blog",
    allowedHost: "developer.wordpress.org",
    feedUrl: "https://developer.wordpress.org/news/feed/",
  },
  {
    key: "wordpress-news",
    name: "WordPress News",
    allowedHost: "wordpress.org",
    feedUrl: "https://wordpress.org/news/feed/",
  },
];

const MAX_RESPONSE_CHARACTERS = 750_000;
const PUBLIC_CACHE_CONTROL = "public, max-age=0, s-maxage=900, stale-while-revalidate=3600";

function jsonResponse(body: unknown, status: number, cacheControl: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": cacheControl,
      "x-content-type-options": "nosniff",
    },
  });
}

async function readFeed(feed: FeedDefinition) {
  const response = await fetch(feed.feedUrl, {
    headers: {
      accept: "application/rss+xml, application/xml, text/xml;q=0.9",
      "user-agent": "PublishRankResearchPulse/1.0 (+https://publishrankseo.vercel.app/)",
    },
    signal: AbortSignal.timeout(6500),
  });
  if (!response.ok) throw new Error(`Source request failed: ${feed.key}`);
  const contentLength = Number(response.headers.get("content-length") ?? 0);
  if (contentLength > MAX_RESPONSE_CHARACTERS)
    throw new Error(`Source response too large: ${feed.key}`);
  const xml = await response.text();
  if (xml.length > MAX_RESPONSE_CHARACTERS)
    throw new Error(`Source response too large: ${feed.key}`);
  return parseOfficialRss(xml, feed);
}

export const Route = createFileRoute("/api/research-pulse")({
  server: {
    handlers: {
      GET: async () => {
        const results = await Promise.all(
          FEEDS.map(async (feed) => {
            try {
              return { ok: true, items: await readFeed(feed) };
            } catch {
              return { ok: false, items: [] };
            }
          }),
        );
        const sourcesAvailable = results.filter((result) => result.ok).length;
        const items = results
          .flatMap((result) => result.items)
          .sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt));
        const uniqueItems = Array.from(
          new Map(items.map((item) => [item.id, item])).values(),
        ).slice(0, 48);

        if (sourcesAvailable === 0 || uniqueItems.length === 0) {
          return jsonResponse(
            { error: "The official research feeds are temporarily unavailable." },
            503,
            "no-store",
          );
        }

        return jsonResponse(
          {
            items: uniqueItems,
            checkedAt: new Date().toISOString(),
            sourcesAvailable,
            sourcesTotal: FEEDS.length,
          },
          200,
          PUBLIC_CACHE_CONTROL,
        );
      },
    },
  },
});
