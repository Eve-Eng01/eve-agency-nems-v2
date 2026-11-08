import type { Metadata } from "next";

/* One share card for every page: a plain PNG, so any static host serves it with the right type.
   (It was drawn by the old src/app/opengraph-image.tsx, which is in the git history.) */
const image = { url: "/og.png", width: 1200, height: 630, alt: "Eve Studio. From idea to launch day.", type: "image/png" };

export function share(path: string, title: string, description: string): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  return {
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: "Eve Studio", locale: "en_GB", url: path, title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
