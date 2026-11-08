import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { cases, formatMetric, getCase } from "@/content/cases";
import { getService } from "@/content/services";
import { PageHero } from "@/components/PageHero";
import { ArtFrame } from "@/components/ArtFrame";

export const dynamicParams = false;
export const generateStaticParams = () => cases.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCase((await params).slug);
  return c ? { title: c.client, description: c.summary } : {};
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCase((await params).slug);
  if (!c) notFound();
  const i = cases.findIndex((x) => x.slug === c.slug);
  const next = cases[(i + 1) % cases.length];
  const svc = getService(c.services[0]);
  return (
    <article>
      <PageHero
        title={c.client}
        lead={c.summary}
        kicker={<>{c.sample ? <span className="tag">Sample project</span> : <span className="tag tag--live">Live product</span>}<span>{c.sector}</span><span>{c.tags.join(", ")}</span></>}
      >
        {c.live && <a className="btn btn--primary" href={c.live} target="_blank" rel="noreferrer">Visit joineve.app <ArrowUpRight size={18} weight="bold" aria-hidden="true" /></a>}
      </PageHero>
      <div className="wrap">
        <div className="case__hero" data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {c.slug === "eve" ? <img src="/work/eve-home.jpg" alt="Eve's home screen: every night starts on Eve, with go out, host and get booked" /> : <ArtFrame id={c.art} />}
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
            <p className="case__dur">Time: {c.duration}</p>
          </div>
        </div>
        {/* Eve's second screen lists real venues and cities, which the site does not show */}
        {c.slug !== "eve" && <div className="wrap"><div className="case__art" data-reveal><ArtFrame id={c.art2} /></div></div>}
      </section>
      <section className="case__next">
        <div className="wrap case__nextgrid">
          <div>
            <h2 className="h-3" data-split>Want something like this?</h2>
            <p className="lead">{svc ? `${svc.name} starts from ${svc.from}. ` : ""}Book thirty minutes and leave with a scope, a price range and a start date.</p>
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
