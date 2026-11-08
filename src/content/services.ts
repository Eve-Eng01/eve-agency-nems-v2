import type { ArtId } from "@/art/draw";

export type Service = {
  slug: string;
  name: string;
  line: string;
  intro: string;
  deliverables: string[];
  timeline: string;
  from: string;
  art: ArtId;
  caseSlug: string;
  steps: { title: string; body: string }[];
};

/* Prices and timelines are samples, tagged in the interface. Replace before launch. */
export const services: Service[] = [
  {
    slug: "ai-apps",
    name: "AI apps",
    line: "Assistants and automations built on your own data.",
    intro: "We build AI features people trust at work: they read your documents, draft the routine parts and hand the hard calls to a person.",
    deliverables: ["Model testing on your real data", "Review screens with human sign-off", "Web or mobile app", "Usage and cost reporting"],
    timeline: "6 to 10 weeks",
    from: "$7,500",
    art: "dash",
    caseSlug: "zuriko",
    steps: [
      { title: "Test on real data", body: "We measure the model on your documents before anything gets designed." },
      { title: "Design the review step", body: "Every uncertain answer goes to a person, and the screen makes that quick." },
      { title: "Ship and measure", body: "We launch to a small group and track accuracy and cost every week." },
    ],
  },
  {
    slug: "mobile-apps",
    name: "Mobile apps",
    line: "iOS and Android, light enough for the phones your customers own.",
    intro: "One codebase for iOS and Android, tested on average phones and patchy networks, and submitted to both stores by us.",
    deliverables: ["Product design and prototype", "iOS and Android build", "Store listing and submission", "Crash and usage reporting"],
    timeline: "8 to 14 weeks",
    from: "$9,500",
    art: "eve-events",
    caseSlug: "eve",
    steps: [
      { title: "Prototype the main task", body: "You test one real journey on your own phone in week two." },
      { title: "Build for real conditions", body: "We test on cheap phones and slow networks from the first sprint." },
      { title: "Launch in both stores", body: "We handle the listings, the reviews and the first update." },
    ],
  },
  {
    slug: "web-and-product",
    name: "Web and product",
    line: "Marketing sites, web apps and the systems behind them.",
    intro: "Fast sites your team can update on their own, and web products with the accounts, payments and admin screens you actually need.",
    deliverables: ["Design system", "Next.js build", "CMS your team can edit", "Analytics with conversion events"],
    timeline: "4 to 10 weeks",
    from: "$3,500",
    art: "palm-detail",
    caseSlug: "palmgate",
    steps: [
      { title: "Write the page first", body: "We start from what your buyer asks, then design around those answers." },
      { title: "Build on real content", body: "No placeholder text. You see your own words from the first review." },
      { title: "Hand over the keys", body: "We train your team on the CMS and pass you every account." },
    ],
  },
  {
    slug: "brand-and-logo",
    name: "Brand and logo",
    line: "A name, a mark and rules your team can follow.",
    intro: "A logo that survives a 12 mm stamp, with the colours, type and templates to use it well once we're gone.",
    deliverables: ["Logo and mark in every format", "Colour and type system", "Packaging or deck templates", "A short brand guide"],
    timeline: "3 to 6 weeks",
    from: "$2,000",
    art: "logo",
    caseSlug: "ashgrove",
    steps: [
      { title: "Workshop", body: "Two hours with the people who sell your product every day." },
      { title: "Three routes", body: "Three real directions on real packaging or screens, never on a blank page." },
      { title: "Build the system", body: "We finish one route and hand over every file and rule." },
    ],
  },
  {
    slug: "marketing",
    name: "Marketing",
    line: "Launch plans and paid campaigns, reported as one number.",
    intro: "We plan the launch, make the assets and run the ads. Every Friday you get one number and what we're changing because of it.",
    deliverables: ["Launch plan", "Campaign creative", "Paid social and search", "A weekly report with one number"],
    timeline: "From 4 weeks, then monthly",
    from: "$1,500",
    art: "campaign",
    caseSlug: "tolumi",
    steps: [
      { title: "Pick the one number", body: "Usually cost per sale or cost per booked call." },
      { title: "Test small", body: "We test hooks on small budgets before you pay to scale them." },
      { title: "Report weekly", body: "You see what ran, what it cost and what happens next." },
    ],
  },
  {
    slug: "motion-design",
    name: "Motion design",
    line: "Explainers and product films that shorten the sales call.",
    intro: "Short films that show the product doing its job, cut for your website, sales deck and social feeds.",
    deliverables: ["Script and storyboard", "Animation and sound", "Cuts for web and social", "Source files"],
    timeline: "3 to 6 weeks",
    from: "$1,800",
    art: "motion",
    caseSlug: "quillbay",
    steps: [
      { title: "Write the script", body: "Sixty seconds, one idea, read aloud before anything gets drawn." },
      { title: "Board and approve", body: "You sign off every frame before we animate, so there are no surprises." },
      { title: "Animate and cut", body: "One master film, then cuts for every place it will run." },
    ],
  },
  {
    slug: "video-and-ugc",
    name: "Video and UGC",
    line: "Creator videos and AI video, made in monthly batches.",
    intro: "Real customers on their own phones, plus AI video for product shots and fast hook tests. Delivered as a monthly batch, ready to run.",
    deliverables: ["Creator casting and briefs", "UGC filming and editing", "AI product video", "Captions and every ad size"],
    timeline: "2 weeks, then monthly",
    from: "$1,000",
    art: "ugc",
    caseSlug: "tolumi",
    steps: [
      { title: "Brief and cast", body: "A one page brief, real customers, fair pay and clear usage rights." },
      { title: "Film and generate", body: "Phone footage for trust, AI video for product shots and tests." },
      { title: "Cut and rotate", body: "We retire the ads that stop working and replace them every month." },
    ],
  },
  {
    slug: "project-management",
    name: "Project management",
    line: "One roadmap, one lead, one weekly review.",
    intro: "A named project lead who owns the plan, including any suppliers you already have. Take it alone or with any other service.",
    deliverables: ["One shared roadmap", "A weekly review", "Supplier coordination", "A written decision log"],
    timeline: "Length of your project",
    from: "$750 a month",
    art: "roadmap",
    caseSlug: "quillbay",
    steps: [
      { title: "Map the whole job", body: "Every workstream and supplier goes on one roadmap in week one." },
      { title: "Review every week", body: "Thirty minutes: what shipped, what's late and who decides what." },
      { title: "Keep the record", body: "Every decision is written down, so nobody argues it twice." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const processSteps = [
  { name: "Discover", time: "Week 1", body: "A workshop, your data and your buyers. You get a written scope, a fixed quote and a start date.", get: "Scope, quote and roadmap", art: "roadmap" as ArtId },
  { name: "Design", time: "Weeks 2 to 3", body: "Brand and product design side by side, on your real content. You review every Friday.", get: "Approved designs", art: "logo" as ArtId },
  { name: "Build", time: "Weeks 3 to 7", body: "Engineers sit in the same reviews as the designers. You test working software from the first sprint.", get: "Working product", art: "palm-detail" as ArtId },
  { name: "Launch", time: "Week 8", body: "Store listings, launch film, ads and press go out on one date, run by one project lead.", get: "Live product and campaign", art: "motion" as ArtId },
  { name: "Grow", time: "Monthly", body: "We watch one number with you, fix what it shows and make the next batch of ads.", get: "A weekly report with one number", art: "dash" as ArtId },
];
