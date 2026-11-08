import { Hero } from "@/components/Hero";
import { Faq, PlanIt, Services, Ship, Statement, Team, Work } from "@/components/Home";
import { allFaqs } from "@/content/site";

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
