import type { MetadataRoute } from "next";
import { cases } from "@/content/cases";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/work/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    ...cases.map((c) => ({ url: `${site.url}/work/${c.slug}/`, lastModified: now, changeFrequency: "yearly" as const, priority: c.sample ? 0.4 : 0.7 })),
  ];
}
