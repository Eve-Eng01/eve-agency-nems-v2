import type { Metadata, Viewport } from "next";
import { Archivo, Geist } from "next/font/google";
import "./globals.css";
import { Smooth } from "@/components/Smooth";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";
import { services } from "@/content/services";

if (!site.urlReady) console.warn("[seo] NEXT_PUBLIC_SITE_URL is not set: canonical links, the sitemap and share cards point at " + site.url);

const sans = Geist({ subsets: ["latin"], display: "swap", variable: "--font-sans", weight: ["400", "500", "600"] });
/* Archivo's width axis gives the expanded uppercase display voice */
const display = Archivo({ subsets: ["latin"], display: "swap", variable: "--font-display", axes: ["wdth"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Eve Studio: apps, websites, brands and launch campaigns", template: "%s | Eve Studio" },
  description: site.description,
  applicationName: "Eve Studio",
  authors: [{ name: "Eve Studio", url: site.url }],
  creator: "Eve Studio",
  publisher: "Eve Studio",
  category: "design and development studio",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: "/logo/eve-mark.png", apple: "/logo/eve-mark.png" },
  formatDetection: { telephone: false, email: false, address: false },
  /* default share card for pages without their own (privacy, terms) */
  openGraph: { siteName: "Eve Studio", type: "website", locale: "en_GB", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Eve Studio. From idea to launch day." }] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  other: { "page-type": "service", "site-kind": "other" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#ffffff" };

/* who the studio is and what it offers, for search engines. No prices here: the ones on the page are samples. */
const ld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#org`,
      name: "Eve Studio",
      url: site.url,
      logo: `${site.url}/logo/eve-mark.png`,
      description: site.description,
      ...(site.emailReady ? { email: site.email } : {}),
      ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {}),
      knowsAbout: ["App development", "AI apps", "Mobile apps", "Web design", "Brand identity", "Logo design", "Marketing", "Motion design", "UGC video"],
      makesOffer: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.intro, provider: { "@id": `${site.url}/#org` } } })),
    },
    { "@type": "WebSite", "@id": `${site.url}/#site`, name: "Eve Studio", url: site.url, publisher: { "@id": `${site.url}/#org` }, inLanguage: "en-GB" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" data-type="service" className={`${sans.variable} ${display.variable}`}>
      <body>
        <Smooth />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </body>
    </html>
  );
}
