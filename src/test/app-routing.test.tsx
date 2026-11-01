import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { publicPaths } from "@/routes/sitemap[.]xml";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it.each(["/features", "/documentation", "/comparisons", "/resources", "/support", "/about", "/privacy", "/terms", "/download", "/contact", "/cookies", "/disclaimer", "/security", "/accessibility"])("matches the public content page %s", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes(path).at(-1)?.routeId).toBe(path);
  });

  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches the contact API route", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/api/contact").at(-1)?.routeId).toBe("/api/contact");
  });

  it("matches the sitemap server route at /sitemap.xml", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/sitemap.xml");

    expect(matches.at(-1)?.routeId).toBe("/sitemap.xml");
  });

  it("lists every public page in the sitemap", () => {
    expect(publicPaths).toEqual(
      expect.arrayContaining(["/", "/features", "/documentation", "/comparisons", "/resources", "/support", "/about", "/download", "/privacy", "/terms", "/contact", "/cookies", "/disclaimer", "/security", "/accessibility"]),
    );
    expect(publicPaths).toHaveLength(15);
  });
});
