import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { cases, caseTag, formatMetric } from "@/content/cases";
import { share } from "@/lib/share";
import { PageHero } from "@/components/PageHero";
import { WorkPic } from "@/components/WorkPic";

export const metadata: Metadata = {
  title: "Work: apps, websites, brands and campaigns",
  description: "Projects by Eve Studio: Eve, our live events platform, and sample projects in AI apps, websites, brand identity, UGC video and launch planning.",
  ...share("/work/", "Work | Eve Studio", "Eve, our live events platform, and sample projects in AI apps, websites, brand identity, UGC video and launch planning."),
};

export default function WorkIndex() {
  return (
    <>
      <PageHero title="The work" lead="Dreambot and Ufundi are client work, and Eve is our own product, live now. The other three are sample projects that show how we work, until more client work is cleared to publish." />
      <section className="wgrid" aria-label="All projects">
        <div className="wrap wgrid__in">
          {cases.map((c, i) => (
            <Link key={c.slug} href={`/work/${c.slug}/`} className={i === 0 ? "wcard wcard--wide" : "wcard"}>
              <span className="wcard__pic" data-reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <WorkPic pic={c.pic} art={c.art} sizes={i === 0 ? "(min-width: 760px) calc(100vw - 96px), 100vw" : "(min-width: 760px) 50vw, 100vw"} />
              </span>
              <span className="wcard__row">
                <span className="wcard__name">{c.client} <span className={c.sample ? "tag" : "tag tag--live"}>{caseTag(c)}</span></span>
                <ArrowUpRight size={22} weight="bold" aria-hidden="true" />
              </span>
              <span className="wcard__sum">{c.summary}</span>
              <span className="wcard__res">{c.live ? `Live at ${c.live.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}` : `${formatMetric(c.headline)} ${c.headline.label}`}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
