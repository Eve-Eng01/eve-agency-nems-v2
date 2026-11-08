import type { Metadata } from "next";
import { share } from "@/lib/share";
import { Hero } from "@/components/Hero";
import { Faq, PlanIt, Services, Ship, Statement, Team, Work } from "@/components/Home";
import { allFaqs } from "@/content/site";

export const metadata: Metadata = share("/", "From idea to launch day | Eve Studio", "Apps, websites, brands and launch campaigns for founders, planned together and shipped on one date. One plan and a fixed quote before work starts.");

const ld = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Work />
      <Ship />
      <Services />
      <Team />
      <PlanIt />
      <Faq />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
