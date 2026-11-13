import { describe, expect, it } from "vitest";
import {
  chooseDifferentResearchItem,
  parseOfficialRss,
  type ResearchItem,
  type ResearchSource,
} from "@/lib/research-feed";

const SOURCE: ResearchSource = {
  key: "google-search-central",
  name: "Google Search Central",
  allowedHost: "developers.google.com",
};
const NOW = Date.parse("2026-11-11T12:00:00.000Z");

function itemXml({
  title = "",
  href = "",
  date = "Tue, 10 Nov 2026 12:00:00 +0000",
  description = "",
}: {
  title?: string;
  href?: string;
  date?: string;
  description?: string;
}) {
  return `<item><title>${title}</title><link>${href}</link><pubDate>${date}</pubDate><description>${description}</description></item>`;
}

describe("official research feeds", () => {
  it("parses and bounds a current official source item", () => {
    const xml = `<rss version="2.0"><channel>${itemXml({
      title: "Google &amp; publishers",
      href: "https://developers.google.com/search/blog/update?a=1&amp;b=2",
      description: "<![CDATA[<p>Source-authored <strong>excerpt</strong>.</p>]]>",
    })}</channel></rss>`;
    const items = parseOfficialRss(xml, SOURCE, NOW);
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      title: "Google & publishers",
      excerpt: "Source-authored excerpt.",
      href: "https://developers.google.com/search/blog/update?a=1&b=2",
      source: SOURCE.name,
      publishedAt: "2026-11-10T12:00:00.000Z",
    });
  });

  it("rejects untrusted, stale, future-dated and undated article links", () => {
    const xml = `<rss version="2.0"><channel>
      ${itemXml({ title: "External", href: "https://example.com/story" })}
      ${itemXml({ title: "Old", href: "https://developers.google.com/old", date: "Wed, 01 Jan 2020 00:00:00 +0000" })}
      ${itemXml({ title: "Future", href: "https://developers.google.com/future", date: "Wed, 20 Nov 2026 00:00:00 +0000" })}
      ${itemXml({ title: "No date", href: "https://developers.google.com/no-date", date: "not a date" })}
    </channel></rss>`;
    expect(parseOfficialRss(xml, SOURCE, NOW)).toEqual([]);
  });

  it("rejects invalid or oversized RSS documents and de-duplicates links", () => {
    const valid = itemXml({ title: "One", href: "https://developers.google.com/same" });
    const duplicated = `<rss version="2.0"><channel>${valid}${valid}</channel></rss>`;
    expect(parseOfficialRss("<html>not a feed</html>", SOURCE, NOW)).toEqual([]);
    expect(parseOfficialRss(`<rss>${" ".repeat(1_000_001)}</rss>`, SOURCE, NOW)).toEqual([]);
    expect(parseOfficialRss(duplicated, SOURCE, NOW)).toHaveLength(1);
  });

  it("chooses a different research item when another citation is available", () => {
    const items: ResearchItem[] = [
      {
        id: "one",
        title: "One",
        excerpt: "",
        href: "https://developers.google.com/1",
        source: SOURCE.name,
        publishedAt: "2026-11-10T12:00:00.000Z",
      },
      {
        id: "two",
        title: "Two",
        excerpt: "",
        href: "https://developers.google.com/2",
        source: SOURCE.name,
        publishedAt: "2026-11-10T12:00:00.000Z",
      },
    ];
    expect(chooseDifferentResearchItem(items, "one", () => 0)?.id).toBe("two");
    expect(chooseDifferentResearchItem(items, null, () => 0.9)?.id).toBe("two");
    expect(chooseDifferentResearchItem([], null)).toBeNull();
  });
});
