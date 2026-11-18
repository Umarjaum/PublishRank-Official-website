import { describe, expect, it } from "vitest";
import { buildFeed, feedSchema } from "@/lib/publishrank-feed";
import { releases } from "@/lib/releases";

const compare = (a: string, b: string) => {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
};

describe("PublishRank JSON feed", () => {
  it("publishes 2.25.1 as the latest version", () => {
    const feed = buildFeed();
    expect(feed.latest_version).toBe("2.25.1");
    expect(feed.releases[0]?.version).toBe("2.25.1");
    expect(feed.releases[0]?.date).toBe("2026-11-17");
    expect(feed.announcements[0]?.summary).toContain("Production-ready");
    expect(feed.announcements[0]?.summary).toContain("no errors reported");
    expect(feed.links.find((link) => link.id === "video")?.url).toBe(
      "https://publishrankseo.vercel.app/video",
    );
  });

  it("lists releases newest first", () => {
    for (let i = 1; i < releases.length; i++) {
      expect(compare(releases[i - 1]?.version ?? "", releases[i]?.version ?? "")).toBeGreaterThan(
        0,
      );
    }
  });

  it("only links to https pages on the official website", () => {
    const feed = buildFeed();
    const urls = [
      feed.website,
      ...feed.releases.map((r) => r.url),
      ...feed.news.map((n) => n.url),
      ...feed.announcements.map((a) => a.url),
      ...feed.links.map((l) => l.url),
    ];
    for (const url of urls) expect(url.startsWith("https://publishrankseo.vercel.app/")).toBe(true);
  });

  it("links the release announcement to the 2.25.1 release notes", () => {
    const feed = buildFeed();
    expect(feed.announcements[0]?.url).toBe("https://publishrankseo.vercel.app/changelog#v2-25-1");
  });

  it("rejects a link to another website", () => {
    const feed = buildFeed();
    const bad = { ...feed, links: [{ id: "x", title: "X", url: "https://example.com/" }] };
    expect(feedSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects a plain http link on the official host", () => {
    const feed = buildFeed();
    const bad = {
      ...feed,
      links: [{ id: "x", title: "X", url: "http://publishrankseo.vercel.app/" }],
    };
    expect(feedSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects HTML in text fields", () => {
    const feed = buildFeed();
    const bad = {
      ...feed,
      releases: feed.releases.map((r) => ({ ...r, title: "<script>x</script>" })),
    };
    expect(feedSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects unknown fields", () => {
    const feed = buildFeed();
    expect(feedSchema.safeParse({ ...feed, run: "code" }).success).toBe(false);
  });
});
