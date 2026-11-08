import type { MetadataRoute } from "next";
import { cases } from "@/content/cases";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/work/", "/contact/", ...cases.map((c) => `/work/${c.slug}/`)].map((p) => ({ url: `${site.url}${p}` }));
}
