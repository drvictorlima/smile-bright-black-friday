import { describe, expect, it } from "vitest";
import { getRouter } from "../router";
import { sitemapStaticPaths, sitemapXML } from "../lib/sitemap";

describe("public campaign sitemap", () => {
  it("includes the campaign but excludes thank-you and sitemap endpoints", () => {
    expect(sitemapStaticPaths(getRouter())).toEqual(["/"]);
  });
  it("uses the public domain without inventing modification dates", () => {
    const xml = sitemapXML("https://megadescontoblackfriday.com", [{ path: "/" }]);
    expect(xml).toContain("<loc>https://megadescontoblackfriday.com/</loc>");
    expect(xml).not.toContain("<lastmod>");
  });
});