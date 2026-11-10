import type { ArtId } from "@/art/draw";

/* A real picture of the work (used in place of a drawn sample when present) */
export type Pic = { src: string; src800: string; alt: string };

/* A finished render of the work in use, shown in the gallery on the project page */
export type Shot = { src: string; alt: string; label: string; w: number; h: number };

export type Metric = { value: number; prefix?: string; suffix?: string; decimals?: number; label: string };

export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  services: string[]; // service slugs
  tags: string[];
  summary: string;
  headline: Metric;
  metrics: Metric[];
  art: ArtId;
  art2: ArtId;
  pic?: Pic;
  pic2?: Pic;
  /* rows of renders; each row shares one height, so nothing is cropped */
  gallery?: Shot[][];
  challenge: string;
  approach: string[];
  outcome: string;
  duration: string;
  /* shown in place of the duration line when set, e.g. "Delivered November 2026" */
  when?: string;
  sample: boolean;
  live?: string;
};

/* Eve (our own product) and Dreambot (client work) are real. Every other case is an invented sample, tagged in the interface. */
export const cases: CaseStudy[] = [
  {
    slug: "eve",
    client: "Eve",
    sector: "Events",
    services: ["mobile-apps", "web-and-product", "brand-and-logo"],
    tags: ["Product", "Web and mobile", "Brand"],
    summary: "An event platform for going out, hosting and getting booked, with tickets, vendors and payments in one account.",
    headline: { value: 3, label: "sides of one market: guests, hosts and vendors" },
    metrics: [
      { value: 3, label: "sides of one market: guests, hosts and vendors" },
      { value: 17, label: "event categories, from music to summits" },
      { value: 1, suffix: " account", label: "for tickets, vendors and payments" },
    ],
    art: "eve-home",
    art2: "eve-events",
    pic: { src: "/work/eve-home.jpg", src800: "/work/eve-home-800.jpg", alt: "Eve's home screen: every night starts on Eve, with go out, host and get booked" },
    challenge:
      "Going out, hosting and getting booked usually happen across three different places. Guests need tickets, hosts need vendors, and vendors need to get paid.",
    approach: [
      "We built one account for all three sides, so a guest can become a host without starting again.",
      "We made buying simple: pick a city, a night and a price, then get a ticket on your phone in a minute.",
      "We designed the brand and the product together, so the logo, the site and the app read as one thing.",
    ],
    outcome: "Eve is live at joineve.app, with real events on sale.",
    duration: "Ongoing",
    sample: false,
    live: "https://www.joineve.app/",
  },
  {
    slug: "dreambot",
    client: "Dreambot",
    sector: "AI lead generation",
    services: ["brand-and-logo"],
    tags: ["Brand", "Logo", "Product UI"],
    summary: "Logo, colour, type and product UI for an AI platform whose agents find leads and book meetings overnight.",
    headline: { value: 46, label: "production files in the logo kit" },
    metrics: [
      { value: 3, label: "directions explored before one was chosen" },
      { value: 6, label: "colours, each with one job, every text pair measured" },
      { value: 46, label: "production files: SVG, PNG, web icons, a React component and CSS tokens" },
    ],
    art: "brand",
    art2: "logo",
    pic: { src: "/work/dreambot-hero.jpg", src800: "/work/dreambot-hero-800.jpg", alt: "The Dreambot logo over Overnight Drift, a generative pattern of blue traces drifting toward an orange sun at the horizon" },
    gallery: [
      [{ src: "/work/dreambot/dreambot-laptop.webp", label: "Website", alt: "A laptop on a white stone plinth showing the Dreambot website", w: 1400, h: 933 }, { src: "/work/dreambot/dreambot-billboard.webp", label: "Billboard", alt: "A lit Dreambot billboard on a steel frame at night", w: 1400, h: 1750 }, { src: "/work/dreambot/dreambot-phone.webp", label: "Product", alt: "Two phones: the overnight run report and a lock screen with a Dreambot notification", w: 1400, h: 1050 }],
      [{ src: "/work/dreambot/dreambot-cards.webp", label: "Business cards", alt: "Three Dreambot business cards floating over a pale blue ground", w: 1400, h: 1050 }, { src: "/work/dreambot/dreambot-posters.webp", label: "Posters", alt: "Four Dreambot posters on a dark street wall", w: 1400, h: 875 }, { src: "/work/dreambot/dreambot-sculpture.webp", label: "Symbol", alt: "The Daybreak D symbol as a solid navy object with an orange sun", w: 1400, h: 1050 }],
      [{ src: "/work/dreambot/dreambot-stationery.webp", label: "Stationery", alt: "Letterhead, notebook, envelope, business cards and a pen laid flat", w: 1400, h: 1050 }, { src: "/work/dreambot/dreambot-sign.webp", label: "Signage", alt: "The Dreambot logo as an illuminated sign on a dark wall", w: 1400, h: 875 }, { src: "/work/dreambot/dreambot-appicon.webp", label: "App icon", alt: "The Dreambot app icon as a solid rounded tile", w: 1400, h: 1050 }],
      [{ src: "/work/dreambot/dreambot-cups.webp", label: "Cups", alt: "Three Dreambot paper cups", w: 1400, h: 1050 }, { src: "/work/dreambot/dreambot-boxes.webp", label: "Welcome kit", alt: "A stack of Dreambot welcome kit boxes", w: 1400, h: 1050 }, { src: "/work/dreambot/dreambot-badge.webp", label: "Event badges", alt: "Two Dreambot event badges on lanyards", w: 1400, h: 1050 }],
    ],
    pic2: { src: "/work/dreambot-system.jpg", src800: "/work/dreambot-system-800.jpg", alt: "The Dreambot identity: the stacked logo on Night, six brand colours, the Daybreak D symbol from app icon down to 16px, and the two typefaces" },
    challenge:
      "Dreambot's agents find buyers, write to each one and handle replies while the team sleeps. The brand had to feel safe to trust with a company's inbox, not like another bot, for founders and growth leads at B2B companies of 10 to 200 people.",
    approach: [
      "We explored three directions and chose Night Shift: you sleep, it works, you wake to replies. Night ink with one sunrise orange.",
      "We drew the Daybreak D, a sun rising inside a D, on a 256 unit grid, with a heavier cut below 24px so it still reads on a 16px browser tab.",
      "We gave six colours one job each and measured every text pair, so orange only ever marks results. Bricolage Grotesque sets the headlines and Figtree the text, both free.",
      "We made Overnight Drift, a generative pattern that traces an overnight run, and shipped a 46 file logo kit ready to drop into the product.",
    ],
    outcome: "One symbol, six colours and two typefaces now carry Dreambot across the product, the website, a business card and social, with every file the team needs to build on.",
    duration: "",
    when: "Delivered November 2026",
    sample: false,
  },
  {
    slug: "zuriko",
    client: "Zuriko",
    sector: "Accounting software",
    services: ["ai-apps", "web-and-product", "project-management"],
    tags: ["AI app", "Product", "Project management"],
    summary: "An AI invoice assistant that reads supplier invoices and posts them to the books.",
    headline: { value: 91, suffix: "%", label: "of invoices posted with no edits" },
    metrics: [
      { value: 91, suffix: "%", label: "of invoices posted with no edits" },
      { value: 7, suffix: " weeks", label: "from first meeting to first paying customer" },
      { value: 4.5, suffix: " hours", decimals: 1, label: "saved per bookkeeper, per week" },
    ],
    art: "ai-app",
    art2: "dash",
    challenge:
      "Zuriko's bookkeepers typed every supplier invoice by hand, often from a blurred phone photo. The founder had a working model and no product around it.",
    approach: [
      "We tested the model on 2,400 real invoices first, so we knew which fields it could be trusted with.",
      "We designed one review screen: the invoice on the left, the fields on the right, and a field the model is unsure of always asks a person.",
      "One team shipped the web app, the accounting integrations and the launch site on the same timeline.",
    ],
    outcome: "Bookkeepers now review invoices instead of typing them. The first paying customer went live in week seven.",
    duration: "7 weeks",
    sample: true,
  },
  {
    slug: "palmgate",
    client: "Palmgate Lettings",
    sector: "Property",
    services: ["web-and-product", "brand-and-logo"],
    tags: ["Website", "Brand"],
    summary: "A lettings site where every listing shows the full monthly cost, with viewings booked online.",
    headline: { value: 41, suffix: "%", label: "more enquiries in the first quarter" },
    metrics: [
      { value: 41, suffix: "%", label: "more enquiries in the first quarter" },
      { value: 1.4, suffix: "s", decimals: 1, label: "largest paint on an average phone" },
      { value: 6, suffix: " weeks", label: "from first meeting to live" },
    ],
    art: "website",
    art2: "palm-detail",
    challenge:
      "Palmgate's listings lived on three portals and a WhatsApp group. Prices were out of date, and agents spent their mornings answering the same questions.",
    approach: [
      "We moved every listing into one simple CMS the agents could update from their phones.",
      "We put monthly rent, the agency fee and the deposit on every listing, so visitors see the full cost upfront.",
      "We replaced the phone queue with online viewing slots that sync to each agent's calendar.",
    ],
    outcome: "Enquiries rose 41%, and agents reported far fewer calls from people the property could not suit.",
    duration: "6 weeks",
    sample: true,
  },
  {
    slug: "tolumi",
    client: "Tolumi",
    sector: "Skincare",
    services: ["video-and-ugc", "marketing"],
    tags: ["UGC video", "AI video", "Campaign"],
    summary: "A monthly system of UGC and AI video for a skincare brand selling in two countries.",
    headline: { value: 29, suffix: "%", label: "lower cost per sale in eight weeks" },
    metrics: [
      { value: 29, suffix: "%", label: "lower cost per sale in eight weeks" },
      { value: 64, label: "video ads produced per month" },
      { value: 3.1, suffix: "x", decimals: 1, label: "return on ad spend by month three" },
    ],
    art: "campaign",
    art2: "ugc",
    challenge:
      "Tolumi was paying for one polished film a quarter, and it stopped working in about two weeks. They needed more ads, faster, without the brand falling apart.",
    approach: [
      "We cast twelve real customers and shot UGC on their own phones, with a simple brief and fair pay.",
      "We used AI video for product close-ups and to test hooks before paying for new shoots.",
      "We ran the ads and reported one number every Friday: cost per sale.",
    ],
    outcome: "Cost per sale fell 29% in eight weeks. Tolumi now retires any ad that stops paying its way within days.",
    duration: "Ongoing, from 8 weeks",
    sample: true,
  },
  {
    slug: "quillbay",
    client: "Quillbay",
    sector: "Logistics",
    services: ["motion-design", "project-management", "marketing"],
    tags: ["Motion design", "Roadmap", "Project management"],
    summary: "A product launch with four workstreams, one roadmap and an explainer that made sales calls shorter.",
    headline: { value: 11, suffix: " weeks", label: "to launch across four workstreams" },
    metrics: [
      { value: 11, suffix: " weeks", label: "to launch across four workstreams" },
      { value: 34, suffix: "%", label: "shorter first sales call" },
      { value: 0, label: "missed milestones" },
    ],
    art: "motion",
    art2: "roadmap",
    challenge:
      "Quillbay had a new routing product, four suppliers and a trade show date that could not move. Nobody owned the whole plan.",
    approach: [
      "Our project lead took over one roadmap with weekly reviews, and every supplier reported to it.",
      "We made a 60 second explainer showing a real delivery being rerouted, with no talking heads.",
      "Sales sent the film before the first call, so calls could start at pricing.",
    ],
    outcome: "The launch hit the trade show date with no missed milestones, and first sales calls got 34% shorter.",
    duration: "11 weeks",
    sample: true,
  },
];

/* how the interface labels a case */
export const caseTag = (c: CaseStudy) => (c.sample ? "Sample" : c.live ? "Live" : "Client work");
export const caseKind = (c: CaseStudy) => (c.sample ? "Sample project" : c.live ? "Live product" : "Client project");

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);

export const formatMetric = (m: Metric, v = m.value) =>
  `${m.prefix ?? ""}${v.toLocaleString("en-GB", {
    minimumFractionDigits: m.decimals ?? 0,
    maximumFractionDigits: m.decimals ?? 0,
  })}${m.suffix ?? ""}`;
