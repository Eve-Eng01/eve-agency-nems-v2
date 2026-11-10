import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { caseKind, cases, formatMetric, getCase } from "@/content/cases";
import { getService } from "@/content/services";
import { share } from "@/lib/share";
import { PageHero } from "@/components/PageHero";
import { ArtFrame } from "@/components/ArtFrame";
import { WorkPic } from "@/components/WorkPic";
import { CaseGallery } from "@/components/CaseGallery";
import { site } from "@/content/site";

export const dynamicParams = false;
export const generateStaticParams = () => cases.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCase((await params).slug);
  if (!c) return {};
  const title = `${c.client}: ${c.sector[0].toLowerCase() + c.sector.slice(1)} ${c.sample ? "sample project" : "case study"}`.replace(/: ai /i, ": AI ");
  return { title, description: c.summary, ...share(`/work/${c.slug}/`, `${title} | Eve Studio`, c.summary) };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCase((await params).slug);
  if (!c) notFound();
  const i = cases.findIndex((x) => x.slug === c.slug);
  const next = cases[(i + 1) % cases.length];
  const svc = getService(c.services[0]);
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
          { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/work/` },
          { "@type": "ListItem", position: 3, name: c.client, item: `${site.url}/work/${c.slug}/` },
        ],
      }) }} />
      <PageHero
        title={c.client}
        lead={c.summary}
        kicker={<><span className={c.sample ? "tag" : "tag tag--live"}>{caseKind(c)}</span><span>{c.sector}</span><span>{c.tags.join(", ")}</span></>}
      >
        {c.live && <a className="btn btn--primary" href={c.live} target="_blank" rel="noreferrer">Visit joineve.app <ArrowUpRight size={18} weight="bold" aria-hidden="true" /></a>}
      </PageHero>
      <div className="wrap">
        <div className="case__hero" data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <WorkPic pic={c.pic} art={c.art} sizes="(min-width: 760px) calc(100vw - 96px), 100vw" describe early />
        </div>
      </div>
      <section className="case">
        <div className="wrap case__grid">
          <h2 className="h-5">The problem</h2>
          <p className="case__lead">{c.challenge}</p>
          <h2 className="h-5">What we did</h2>
          <ol className="case__steps">{c.approach.map((a) => <li key={a}>{a}</li>)}</ol>
          <h2 className="h-5">What it did</h2>
          <div>
            <p className="case__lead">{c.outcome}</p>
            {!c.live && <ul className="case__metrics">{c.metrics.map((m) => <li key={m.label}><b>{formatMetric(m)}</b> {m.label}</li>)}</ul>}
            <p className="case__dur">{c.when ?? `Time: ${c.duration}`}</p>
          </div>
        </div>
        {/* Eve's second screen lists real venues and cities, which the site does not show */}
        {c.pic2
          ? <div className="wrap"><div className="case__art" data-reveal><WorkPic pic={c.pic2} art={c.art2} sizes="(min-width: 760px) calc(100vw - 96px), 100vw" describe /></div></div>
          : c.sample && <div className="wrap"><div className="case__art" data-reveal><ArtFrame id={c.art2} /></div></div>}
      </section>
      {c.gallery && <CaseGallery rows={c.gallery} client={c.client} />}
      <section className="case__next">
        <div className="wrap case__nextgrid">
          <div>
            <h2 className="h-3" data-split>Want something like this?</h2>
            <p className="lead">Book thirty minutes and leave with a scope and a start date{svc ? ` for your ${svc.name.toLowerCase()} project` : ""}. A fixed quote follows before any work starts.</p>
            <Link href={`/contact/${svc ? `?service=${svc.slug}` : ""}`} className="btn btn--primary">Book a call <ArrowRight size={18} weight="bold" aria-hidden="true" /></Link>
          </div>
          <Link href={`/work/${next.slug}/`} className="case__nextlink">
            <span className="muted">Next project</span>
            <span className="h-3">{next.client} <ArrowRight size={28} weight="bold" aria-hidden="true" /></span>
          </Link>
        </div>
      </section>
    </article>
  );
}
