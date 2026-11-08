import type { ArtId } from "@/art/draw";

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
  challenge: string;
  approach: string[];
  outcome: string;
  duration: string;
  sample: boolean;
  live?: string;
};

/* Eve is real and live. Every other case is an invented sample, tagged in the interface. */
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
    slug: "ashgrove",
    client: "Ashgrove Roasters",
    sector: "Food and drink",
    services: ["brand-and-logo", "web-and-product"],
    tags: ["Brand", "Logo", "Packaging"],
    summary: "A new identity and packaging system for a small coffee roaster moving into wholesale.",
    headline: { value: 2.3, suffix: "x", decimals: 1, label: "wholesale accounts within six months" },
    metrics: [
      { value: 2.3, suffix: "x", decimals: 1, label: "wholesale accounts within six months" },
      { value: 14, label: "packaging lines rolled out in one run" },
      { value: 5, suffix: " weeks", label: "from first workshop to print files" },
    ],
    art: "brand",
    art2: "logo",
    challenge:
      "Ashgrove's coffee was winning tastings, but the bags looked homemade beside the competition on a café shelf. Buyers kept asking if they could supply at volume.",
    approach: [
      "We drew one ash leaf mark that still reads when stamped on a kraft bag at 12 mm.",
      "We built a colour code by roast, so a barista can spot the right bag across a room.",
      "We prepared a wholesale deck and order site in the same five weeks as the identity.",
    ],
    outcome: "Wholesale accounts grew 2.3 times in six months, and the new bags cost less to print than the old ones.",
    duration: "5 weeks",
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

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);

export const formatMetric = (m: Metric, v = m.value) =>
  `${m.prefix ?? ""}${v.toLocaleString("en-GB", {
    minimumFractionDigits: m.decimals ?? 0,
    maximumFractionDigits: m.decimals ?? 0,
  })}${m.suffix ?? ""}`;
