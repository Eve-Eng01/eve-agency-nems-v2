import type { Metadata, Viewport } from "next";
import { Archivo, Geist } from "next/font/google";
import "./globals.css";
import { Smooth } from "@/components/Smooth";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";

const sans = Geist({ subsets: ["latin"], display: "swap", variable: "--font-sans", weight: ["400", "500", "600"] });
/* Archivo's width axis gives the expanded uppercase display voice */
const display = Archivo({ subsets: ["latin"], display: "swap", variable: "--font-display", axes: ["wdth"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Eve Studio: apps, websites, brands and launch campaigns", template: "%s | Eve Studio" },
  description: "Eve Studio designs and builds apps, websites, brands and launch campaigns for founders. One plan and a fixed quote before any work starts.",
  icons: { icon: "/logo/eve-mark.png" },
  openGraph: { siteName: "Eve Studio", type: "website", title: "From idea to launch day.", description: "Apps, websites, brands and launch campaigns for founders, planned together and shipped on one date." },
  twitter: { card: "summary_large_image" },
  other: { "page-type": "service", "site-kind": "other" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" data-type="service" className={`${sans.variable} ${display.variable}`}>
      <body>
        <Smooth />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
