import type { MetadataRoute } from "next";
import { brand } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/blog", "/contact"];
  return routes.map((route) => ({
    url: new URL(route, brand.siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
