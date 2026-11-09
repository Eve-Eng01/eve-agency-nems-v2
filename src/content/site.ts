export const site = {
  name: "Eve Studio",
  short: "Eve",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://evestudio.example",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@evestudio.example",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
  booking: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  /* the Cal.com event the contact page embeds; set NEXT_PUBLIC_CAL_LINK to change it, or to "" for none */
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "nwakeze-anthony-eve-studio/30min",
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",
  plausible: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
  /* Add real accounts here: { label: "Instagram", href: "https://..." }. Empty until supplied. */
  socials: [] as { label: string; href: string }[],
  /* false while the email is still the .example placeholder: the address is then never printed */
  get emailReady() { return !this.email.endsWith(".example"); },
  description:
    "Eve Studio designs and builds apps, websites, brands and launch campaigns for founders. One plan and a fixed quote before any work starts.",
  /* true once NEXT_PUBLIC_SITE_URL holds the real domain; canonical links, the sitemap and share cards all use it */
  get urlReady() { return !this.url.includes(".example"); },
};

export const nav = [
  { href: "/work/", label: "Work" },
  { href: "/services/", label: "Services" },
  { href: "/team/", label: "Team" },
  { href: "/process/", label: "Process" },
];

export const faqs = [
  {
    q: "How soon can we start?",
    a: "Usually within two weeks of the discovery call. We tell you the exact start date in the proposal, and it does not move once you sign.",
  },
  {
    q: "How is a project priced?",
    a: "With a fixed quote for the scope we agree on the call, sent before any work starts. The number only changes if you change the scope.",
  },
  {
    q: "Do I have to buy everything from you?",
    a: "No. Plenty of clients start with one service, like a logo or a website, and add more later. You still get one project lead and one timeline.",
  },
  {
    q: "Who owns the work when we finish?",
    a: "You do. Source files, code repositories and accounts are handed over in your name when the final invoice is paid.",
  },
  {
    q: "Can you work with my existing team?",
    a: "Yes. We can take the whole build or just the parts your team can't cover. Your people join the same weekly review as ours.",
  },
  {
    q: "How do you use AI?",
    a: "We build AI features for clients and use AI tools for drafts and video. A person on the team reviews everything before you see it.",
  },
];

/* Sample quotes: invented, tagged in the interface. Plan rule: person, role, company, service and one result. */
export const quotes = [
  {
    quote: "They ran the videos, the ads and the reporting as one job. Our cost per sale fell 29% in eight weeks, and I stopped chasing three different suppliers.",
    name: "Temi Lawal",
    role: "Cofounder, Tolumi",
    service: "UGC and AI video",
    result: "Cost per sale down 29%",
    slug: "tolumi",
    art: "ugc",
  },
  {
    quote: "We had one person to call for the app, the brand and the launch. We went live in seven weeks, and our bookkeepers stopped typing invoices by hand.",
    name: "Amaka Obi",
    role: "Founder, Zuriko",
    service: "AI app",
    result: "Launched in 7 weeks",
    slug: "zuriko",
    art: "ai-app",
  },
  {
    quote: "The new site went up with the listings already moved over. Enquiries were up 41% by the end of the first quarter, and fewer of them wasted our time.",
    name: "Kunle Adebayo",
    role: "Managing director, Palmgate Lettings",
    service: "Website",
    result: "Enquiries up 41%",
    slug: "palmgate",
    art: "website",
  },
] as const;

/* The two questions most callers ask first, then the rest. */
export const allFaqs = [
  { q: "What happens on the call?", a: "Thirty minutes with the founder. You talk us through the idea, we ask about buyers and dates, and you leave with a scope and a start date. Your fixed quote follows before any work starts." },
  { q: "We only have an idea. Is that too early?", a: "No. Most projects start as a paragraph. The first week turns it into a written scope you can take anywhere, including to other studios." },
  ...faqs,
];
