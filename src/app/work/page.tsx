import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { cases, formatMetric } from "@/content/cases";
import { PageHero } from "@/components/PageHero";
import { ArtFrame } from "@/components/ArtFrame";

export const metadata: Metadata = { title: "Work", description: "Apps, brands, sites and campaigns by Eve Studio, with what each one did." };

export default function WorkIndex() {
  return (
    <>
      <PageHero title="The work" lead="Eve is our own product, and it is live. The other five are sample projects that show how we work, until client work is cleared to publish." />
      <section className="wgrid" aria-label="All projects">
        <div className="wrap wgrid__in">
          {cases.map((c, i) => (
            <Link key={c.slug} href={`/work/${c.slug}/`} className={i === 0 ? "wcard wcard--wide" : "wcard"}>
              <span className="wcard__pic" data-reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {c.slug === "eve" ? <img src="/work/eve-home-800.jpg" srcSet="/work/eve-home-800.jpg 800w, /work/eve-home.jpg 1600w" sizes="(min-width: 900px) 50vw, 100vw" alt="" width={1600} height={1000} loading="lazy" /> : <ArtFrame id={c.art} />}
              </span>
              <span className="wcard__row">
                <span className="wcard__name">{c.client} {c.sample ? <span className="tag">Sample</span> : <span className="tag tag--live">Live</span>}</span>
                <ArrowUpRight size={22} weight="bold" aria-hidden="true" />
              </span>
              <span className="wcard__sum">{c.summary}</span>
              <span className="wcard__res">{c.live ? "Live at joineve.app" : `${formatMetric(c.headline)} ${c.headline.label}`}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
