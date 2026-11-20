import { describe, expect, it } from "vitest";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import { publicPaths } from "@/routes/sitemap[.]xml";

describe("visible breadcrumb links", () => {
  it.each(publicPaths.filter((path) => path !== "/"))(
    "links %s back to Home and identifies the current page",
    (path) => {
      const items = buildBreadcrumbs(path);
      const expectedPath = `/${path.split("/").filter(Boolean).join("/")}`;

      expect(items[0]).toEqual({ label: "Home", href: "/", current: false });
      expect(items.at(-1)).toMatchObject({ href: expectedPath, current: true });
    },
  );

  it("uses the friendly label for the installation guide", () => {
    expect(buildBreadcrumbs("/install").at(-1)).toMatchObject({
      label: "Installation guide",
      href: "/install",
      current: true,
    });
  });

  it("builds a parent path for a newsroom article", () => {
    expect(buildBreadcrumbs("/news/seo-for-publishers")).toEqual([
      { label: "Home", href: "/", current: false },
      { label: "Newsroom", href: "/news", current: false },
      { label: "SEO For Publishers", href: "/news/seo-for-publishers", current: true },
    ]);
  });

  it("does not render a redundant breadcrumb on Home", () => {
    expect(buildBreadcrumbs("/")).toEqual([]);
  });
});
