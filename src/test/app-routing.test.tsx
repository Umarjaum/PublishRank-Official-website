import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { publicPaths } from "@/routes/sitemap[.]xml";
import { PUBLISHRANK_WORDPRESS_PLUGIN_URL } from "@/lib/site";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it.each([
    "/features",
    "/documentation",
    "/comparisons",
    "/resources",
    "/support",
    "/about",
    "/enterprise",
    "/website-creation",
    "/news",
    "/privacy",
    "/terms",
    "/download",
    "/wordpress-org-release",
    "/contact",
    "/cookies",
    "/disclaimer",
    "/security",
    "/accessibility",
  ])("matches the public content page %s", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const expectedRouteId = path === "/news" ? "/news/" : path;
    expect(router.matchRoutes(path).at(-1)?.routeId).toBe(expectedRouteId);
  });

  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches the contact and currency-rate API routes", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/api/contact").at(-1)?.routeId).toBe("/api/contact");
    expect(router.matchRoutes("/api/currency-rates").at(-1)?.routeId).toBe("/api/currency-rates");
  });

  it("matches the sitemap server route at /sitemap.xml", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/sitemap.xml");

    expect(matches.at(-1)?.routeId).toBe("/sitemap.xml");
  });

  it("matches the Google News sitemap server route", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/news-sitemap.xml").at(-1)?.routeId).toBe("/news-sitemap.xml");
  });

  it("matches a newsroom article through the nested slug route", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(
      router.matchRoutes("/news/enterprise-publisher-seo-operating-model").at(-1)?.routeId,
    ).toContain("$slug");
  });

  it("lists every public page in the sitemap", () => {
    expect(publicPaths).toEqual(
      expect.arrayContaining([
        "/",
        "/features",
        "/documentation",
        "/comparisons",
        "/resources",
        "/support",
        "/about",
        "/enterprise",
        "/website-creation",
        "/news",
        "/download",
        "/wordpress-org-release",
        "/privacy",
        "/terms",
        "/contact",
        "/cookies",
        "/disclaimer",
        "/security",
        "/accessibility",
      ]),
    );
    expect(publicPaths).toContain("/enterprise");
    expect(publicPaths).toContain("/wordpress-org-release");
    expect(publicPaths).toContain("/news");
    expect(publicPaths.some((path) => path.startsWith("/news/"))).toBe(true);
  });

  it("links to the official PublishRank WordPress.org plugin listing", () => {
    expect(PUBLISHRANK_WORDPRESS_PLUGIN_URL).toBe("https://wordpress.org/plugins/publishrank/");
  });
});
