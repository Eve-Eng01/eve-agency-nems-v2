"use client";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Sparkle } from "@/components/icons";
import { caseKind, caseTag, cases } from "@/content/cases";
import { processSteps, services, type Service } from "@/content/services";
import { allFaqs, site } from "@/content/site";
import { team } from "@/content/team";
import { motion, reduced } from "@/lib/motion";
import { ArtFrame } from "./ArtFrame";
import { WorkPic } from "./WorkPic";
import { Voxel, type VoxelHandle } from "./Voxel";

/* Eve is real but not the headline: it sits third, among the work */
const WORK = [...cases.filter((c) => c.slug !== "eve").slice(0, 2), ...cases.filter((c) => c.slug === "eve"), ...cases.filter((c) => c.slug !== "eve").slice(2)];
const TONES = ["#8800ff", "#1a0b2e", "#b980ff", "#6a00cc", "#8800ff"];
const ask = (name: string) => (/^[A-Z][a-z]/.test(name) ? name[0].toLowerCase() + name.slice(1) : name);

/* The statement: what the studio closes, set large on a lilac artboard. The words ink in as you read. */
export function Statement() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (reduced()) return;
    const { gsap, SplitText } = motion();
    const el = ref.current!;
    const ctx = gsap.context(() => {
      const split = SplitText.create(el.querySelector(".state__t"), { type: "words" });
      gsap.fromTo(split.words, { opacity: 0.16 }, { opacity: 1, ease: "none", stagger: 0.08, scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 75%", scrub: 0.6 } });
      gsap.from(el.querySelectorAll(".state__draw .draw-g, .state__draw .draw-c"), { strokeDashoffset: 1, duration: 1.8, ease: "power3.inOut", stagger: 0.12, scrollTrigger: { trigger: el, start: "top 75%", once: true } });
      gsap.timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el.querySelector(".state__fig"), start: "top 80%", once: true } })
        .from(".state__fig", { opacity: 0, scale: 0.96, duration: 0.8 })
        .from(".state__tracks li", { x: -24, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.2)
        .from(".state__join .draw-j", { strokeDashoffset: 1, duration: 1, ease: "power3.inOut", stagger: 0.08 }, 0.6)
        .from(".state__day", { scale: 0.9, opacity: 0, duration: 0.7, ease: "back.out(2)" }, 1.3);
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="state panel panel--lilac" aria-label="What we do">
      <svg className="state__draw" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <line className="draw-g" x1="0" x2="1000" y1="150" y2="150" pathLength={1} />
        <line className="draw-g" x1="0" x2="1000" y1="470" y2="470" pathLength={1} />
        <line className="draw-g" x1="250" x2="250" y1="0" y2="600" pathLength={1} />
        <circle className="draw-c" cx="250" cy="310" r="160" pathLength={1} />
        {[[250, 150], [90, 310], [410, 310], [250, 470]].map(([x, y], i) => <rect key={i} className="draw-n" x={x - 6} y={y - 6} width={12} height={12} rx={1} />)}
      </svg>
      <div className="wrap state__in">
        <p className="state__t">Most launches stall somewhere between the idea and the first customer. We close that gap. The product, the brand and the campaign get planned together and go live on the same&nbsp;day.</p>
        {/* the sentence, drawn: three tracks selected together, joined into one launch day */}
        <div className="state__fig" aria-hidden="true">
          <i /><i /><i /><i />
          <ul className="state__tracks">
            <li>Product</li>
            <li>Brand</li>
            <li>Campaign</li>
          </ul>
          <svg className="state__join" viewBox="0 0 80 180" preserveAspectRatio="none">
            <path className="draw-j" d="M0 30 C 44 30, 36 90, 80 90" pathLength={1} />
            <path className="draw-j" d="M0 90 H 80" pathLength={1} />
            <path className="draw-j" d="M0 150 C 44 150, 36 90, 80 90" pathLength={1} />
          </svg>
          <span className="state__day">Launch day</span>
        </div>
      </div>
    </section>
  );
}

/* The work, two columns that sit out of step, the way prints get pinned to a wall. */
export function Work() {
  return (
    <section id="work" className="work" aria-labelledby="work-h">
      <div className="wrap">
        <header className="work__head">
          <h2 id="work-h" className="title" data-split>Selected work</h2>
          <p className="work__note">Dreambot, a brand for an AI startup, Ufundi, a live website for a home builder, Eve, our own product, and sample projects that show how we work.</p>
        </header>
        <ul className="work__grid">
          {WORK.map((c, n) => (
            <li key={c.slug}>
              <Link href={`/work/${c.slug}/`} className="wcard" aria-label={`${c.client}, ${caseKind(c).toLowerCase()}: ${c.sector}`}>
                <span className="wcard__pic">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <WorkPic pic={c.pic} art={c.art} early={n < 2} />
                </span>
                <span className="wcard__meta">{c.sector} · {c.tags.slice(0, 2).join(", ")} <span className={c.sample ? "tag" : "tag tag--live"}>{caseTag(c)}</span></span>
                <span className="wcard__row"><span className="wcard__name">{c.client}</span><ArrowUpRight size={24} weight="bold" aria-hidden="true" /></span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="work__more"><Link href="/work/" className="btn btn--ghost btn--lg">See all work <ArrowRight size={18} weight="bold" aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}

/* Sketch to ship: one phone, scrubbed by scroll from a pencil sketch to a launched app. */
export function Ship() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const { gsap } = motion();
    if (reduced()) { setStep(4); return; }
    const el = ref.current!;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      const paths = Array.from(el.querySelectorAll<SVGGeometryElement>(".sk path, .sk rect, .sk circle"));
      /* the sketch opens about half drawn, so the phone never sits empty; scrolling finishes it */
      paths.forEach((p) => { const L = p.getTotalLength(); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L * 0.5 }); });
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: el, start: "top top", end: "bottom bottom", scrub: 0.9,
          onUpdate: (s) => setStep([0.22, 0.49, 0.7, 0.85].filter((t) => s.progress >= t).length),
        },
      });
      tl.to(paths, { strokeDashoffset: 0, duration: 1, stagger: 0.05 })
        .to(q(".l-sketch"), { opacity: 0, duration: 0.4 }, 1.3)
        .from(q(".l-ui"), { opacity: 0, duration: 0.3 }, 1.3)
        .from(q(".l-ui .ui-b"), { scaleY: 0, transformOrigin: "top", duration: 0.5, stagger: 0.06 }, 1.35)
        .to(q(".l-ui"), { "--paint": 1, duration: 0.8 }, 2.1)
        .from(q(".l-ui .ui-row"), { x: 40, opacity: 0, duration: 0.5, stagger: 0.08 }, 2.9)
        .to(q(".ui-tap"), { scale: 2.6, opacity: 0, duration: 0.5 }, 3.4)
        .from(q(".ui-sheet"), { yPercent: 100, duration: 0.6 }, 3.5)
        .to(q(".phone"), { rotate: -6, y: -20, duration: 0.7 }, 4.2)
        .from(q(".note"), { y: 30, opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.15 }, 4.3)
        .from(q(".grow path"), { strokeDashoffset: 400, duration: 0.8 }, 5.1)
        .from(q(".grow"), { opacity: 0, y: 20, duration: 0.4 }, 5.0);
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} id="process" className="ship" aria-labelledby="ship-h">
      <div className="ship__pin">
        <div className="ship__grid wrap">
          <div className="ship__copy">
            <h2 id="ship-h" className="title title--md">From a sketch to launch&nbsp;day</h2>
            <ol className="ship__steps">
              {processSteps.map((s, i) => (
                <li key={s.name} className={i === step ? "on" : i < step ? "done" : ""}>
                  <span className="ship__name">{s.name}<small>{s.time}</small></span>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="ship__stage" aria-hidden="true">
            <svg className="ship__guide" viewBox="0 0 600 600"><circle cx="300" cy="300" r="270" /><line x1="0" x2="600" y1="300" y2="300" /><line x1="300" x2="300" y1="0" y2="600" /></svg>
            <div className="phone">
              <div className="screen">
                <svg className="l-sketch sk" viewBox="0 0 300 620">
                  <g fill="none" stroke="#3b3b3b" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M30 70 q50 -8 110 1" /><path d="M210 66 h50" />
                    <rect x="26" y="104" width="248" height="168" rx="14" />
                    <path d="M36 300 h170" /><path d="M36 328 h120" />
                    <rect x="26" y="364" width="118" height="96" rx="12" /><rect x="156" y="364" width="118" height="96" rx="12" />
                    <path d="M36 492 h200" /><path d="M36 520 h150" />
                    <circle cx="150" cy="578" r="20" />
                  </g>
                </svg>
                <div className="l-ui">
                  <div className="ui-b ui-top"><b>Tonight</b><span /></div>
                  <div className="ui-b ui-hero"><span className="ui-chip">Sold fast</span><b>Rooftop sessions</b><small>Doors at nine</small></div>
                  <div className="ui-row"><i /><span><b>Jazz in the yard</b><small>Friday</small></span><em>Get ticket</em></div>
                  <div className="ui-row"><i /><span><b>Founders night</b><small>Saturday</small></span><em>Get ticket</em></div>
                  <div className="ui-row"><i /><span><b>Film club</b><small>Sunday</small></span><em>Get ticket</em></div>
                  <span className="ui-tap" />
                  <div className="ui-sheet"><b>Ticket added</b><small>It is in your wallet</small></div>
                </div>
              </div>
            </div>
            <div className="ship__notes">
              <div className="note note--a">Live in both app stores</div>
              <div className="note note--b">Launch film and ads go out today</div>
            </div>
            <svg className="grow" viewBox="0 0 220 90"><path d="M6 80 C 50 76, 70 60, 100 52 S 160 22, 214 8" fill="none" stroke="#8800ff" strokeWidth="4" strokeLinecap="round" strokeDasharray="400" /><text x="6" y="16">One number, every Friday</text></svg>
            <p className="ship__ex">Example app, made up to show the steps</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Services: a dark panel where each service is a card that stacks on the last as you scroll.
   Once the big title has gone under the nav, a slim bar keeps the section's name and the card
   you are on in view for as long as the stack is on screen. */
export function Services() {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(0);
  const [bar, setBar] = useState(false);
  useEffect(() => {
    const { ScrollTrigger } = motion();
    const el = ref.current!;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".scard"));
    const barEl = el.querySelector<HTMLElement>(".svc__bar")!;
    const update = () => {
      /* the card on top is the last one that has reached its sticky line */
      /* (on phones the cards flow instead, and the one crossing mid screen counts) */
      const flow = getComputedStyle(cards[0]).position !== "sticky";
      const line = (c: HTMLElement) => (flow ? innerHeight * 0.5 : parseFloat(getComputedStyle(c).top));
      let k = 0;
      cards.forEach((c, i) => { if (c.getBoundingClientRect().top <= line(c) + 2) k = i; });
      setOn(k);
      /* shown while it is pinned, and gone as the last card starts to leave, so it never sits on it */
      const last = cards[cards.length - 1], lr = last.getBoundingClientRect();
      const leaving = flow ? lr.bottom < innerHeight * 0.4 : lr.top < line(last) - 2;
      setBar(barEl.getBoundingClientRect().top <= parseFloat(getComputedStyle(barEl).top) + 1 && !leaving);
    };
    const st = ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top", onUpdate: update, onRefresh: update });
    return () => st.kill();
  }, []);
  return (
    <section ref={ref} id="services" className="svc panel panel--deep" aria-labelledby="svc-h">
      <div className="wrap">
        <header className="svc__head">
          <h2 id="svc-h" className="title" data-split>Services</h2>
          <p className="svc__lead">Take one or take them all. Every project starts with a free call and a fixed quote, agreed before any work&nbsp;begins.</p>
        </header>
        <div className="svc__body">
        <div className={bar ? "svc__bar is-on" : "svc__bar"} aria-hidden="true">
          <span className="svc__barname">Services</span>
          <span className="svc__count"><b>{String(on + 1).padStart(2, "0")}</b> / {String(services.length).padStart(2, "0")}<span className="svc__now">{services[on].name}</span></span>
          <span className="svc__prog" style={{ "--prog": (on + 1) / services.length } as React.CSSProperties} />
        </div>
        <ol className="svc__stack">
          {services.map((x, k) => (
            <li key={x.slug} className="scard" style={{ "--k": k } as React.CSSProperties}>
              <div className="scard__text">
                <h3 className="scard__name">{x.name}</h3>
                <p className="scard__intro">{x.intro}</p>
                <ul className="scard__del">{x.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
                <dl className="scard__facts">
                  <div><dt>Timeline</dt><dd>{x.timeline}</dd></div>
                  <div><dt>Quote</dt><dd>Fixed, after a free call</dd></div>
                </dl>
                <Link href={`/contact/?service=${x.slug}`} className="link">Ask about {ask(x.name)} <ArrowRight size={16} weight="bold" aria-hidden="true" /></Link>
              </div>
              <div className="scard__art"><WorkPic pic={x.pic} art={x.art} sizes="(min-width: 900px) 45vw, 100vw" /></div>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}

/* The people, as pixel figures on one floor line. They wave once when the section arrives;
   hover or tap one and it does its thing. */
export function Team() {
  const ref = useRef<HTMLElement>(null);
  const figs = useRef<Record<string, VoxelHandle | null>>({});
  useEffect(() => {
    if (reduced()) return;
    const { gsap, ScrollTrigger } = motion();
    const el = ref.current!;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".mate"), {
        y: 80, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.1,
        scrollTrigger: { trigger: el.querySelector(".lineup"), start: "top 80%", once: true, onEnter: () => team.forEach((p, i) => setTimeout(() => figs.current[p.id]?.act("wave", 1800), 500 + i * 160)) },
      });
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} id="team" className="team" aria-labelledby="team-h">
      <div className="wrap">
        <header className="team__head">
          <h2 id="team-h" className="title title--md" data-split>Who you work with</h2>
          <p className="lead">The people on your first call are the people who ship your launch. Hover or tap to say&nbsp;hello.</p>
        </header>
        <ul className="lineup">
          {team.map((p, i) => (
            <li
              key={p.id}
              className="mate"
              style={{ "--tone": TONES[i] } as React.CSSProperties}
              onPointerEnter={(e) => { if (e.pointerType === "mouse") figs.current[p.id]?.act(p.action); }}
              onPointerLeave={() => figs.current[p.id]?.rest()}
            >
              {/* a real button, so keyboard and screen reader users can say hello too */}
              <button type="button" className="mate__fig" aria-label={`${p.role}: say hello`} onClick={() => figs.current[p.id]?.act(p.action)}>
                <Voxel ref={(h) => { figs.current[p.id] = h; }} figure={p.figure} size={560} lift={26} style={{ "--d": `${i * -0.45}s` } as React.CSSProperties} />
              </button>
              <div className="mate__floor" />
              <h3 className="mate__role">{p.role}</h3>
              <p className="mate__does">{p.does}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Idea to plan: type what you are launching and see what we would build, how long, and how to get a quote. */
const RULES: [RegExp, string][] = [
  [/\b(ai|gpt|assistant|automat|chatbot|model)/i, "ai-apps"],
  [/\b(app|ios|android|mobile)/i, "mobile-apps"],
  [/\b(brand|logo|identity|packag|name)/i, "brand-and-logo"],
  [/\b(ugc|creator|tiktok|reels?)\b/i, "video-and-ugc"],
  [/\b(film|explainer|animation|motion)/i, "motion-design"],
  [/\b(ads?|campaign|marketing|launch plan|growth)\b/i, "marketing"],
  [/\b(manage|roadmap|suppliers?|coordinat)/i, "project-management"],
];
const pick = (idea: string): Service => services.find((s) => s.slug === (RULES.find(([r]) => r.test(idea))?.[1] ?? "web-and-product"))!;

export function PlanIt() {
  const out = useRef<HTMLDivElement>(null);
  const [idea, setIdea] = useState("");
  /* opens on a worked example, so the section shows its answer before anyone types */
  const [plan, setPlan] = useState<{ idea: string; s: Service }>(() => ({ idea: "An events app for my city", s: pick("An events app for my city") }));
  const first = useRef(true);
  const [err, setErr] = useState("");
  const chips = ["An events app for my city", "A skincare brand", "An AI tool for accountants", "A launch campaign"];
  const run = (text: string) => {
    const t = text.trim();
    if (t.length < 4) { setErr("Add a few words about what you are launching."); return; }
    setErr("");
    setPlan({ idea: t, s: pick(t) });
  };
  const submit = (e: FormEvent) => { e.preventDefault(); run(idea); };
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (reduced()) return;
    const { gsap } = motion();
    gsap.fromTo(out.current!.querySelectorAll(".pcard"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.07 });
  }, [plan]);
  return (
    <section id="plan" className="planit panel panel--purple" aria-labelledby="plan-h">
      <div className="wrap">
        {/* title on the left, the controls on the right, so the question, the choices and the answer share one screen */}
        <div className="planit__head">
        <div>
        <h2 id="plan-h" className="title title--md" data-split>What are you launching?</h2>
        <p className="planit__lead">Pick one or type your own. You will see what we would build and how long it takes, before you book&nbsp;anything.</p>
        </div>
        <div>
        <div className="planit__chips">
          {chips.map((c) => <button key={c} type="button" aria-pressed={plan.idea === c} onClick={() => { setIdea(c); run(c); }}>{c}</button>)}
        </div>
        <form className="planit__form" onSubmit={submit}>
          <label htmlFor="idea" className="sr-only">What are you launching?</label>
          <input id="idea" value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="Or describe it in a line" autoComplete="off" aria-invalid={!!err || undefined} aria-describedby={err ? "idea-err" : undefined} />
          <button className="btn btn--ink"><Sparkle size={18} weight="fill" aria-hidden="true" /> Plan it</button>
        </form>
        {err && <p id="idea-err" className="field__err" role="alert">{err}</p>}
        </div>
        </div>
        <div ref={out} className="planit__out" aria-live="polite">
          <div className="pcard">
            <h3>What we would build</h3>
            <p className="pcard__big">{plan.s.name}</p>
            <ul>{plan.s.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
          <div className="pcard pcard--pic"><WorkPic key={plan.s.slug} pic={plan.s.pic} art={plan.s.art} sizes="(min-width: 1100px) 25vw, 50vw" /></div>
          <div className="pcard">
            <h3>How long</h3>
            <p className="pcard__big">{plan.s.timeline}</p>
            <ul>{plan.s.steps.map((x) => <li key={x.title}>{x.title}</li>)}</ul>
          </div>
          <div className="pcard pcard--price">
            <h3>Next step</h3>
            <p className="pcard__big">A free call</p>
            <p className="pcard__note">Thirty minutes to agree the scope. You get a fixed quote before any work starts.</p>
            <Link href={`/contact/?service=${plan.s.slug}&idea=${encodeURIComponent(plan.idea)}`} className="btn btn--primary">Get a quote <ArrowRight size={18} weight="bold" aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="questions" className="faq" aria-labelledby="faq-h">
      <div className="wrap faq__grid">
        <header>
          <h2 id="faq-h" className="title title--md" data-split>Questions</h2>
          <p className="lead">{site.emailReady
            ? <>Anything else, write to <a className="link" href={`mailto:${site.email}`}>{site.email}</a>.</>
            : <>Anything else, <Link className="link" href="/contact/">ask us on a free call</Link>.</>}</p>
        </header>
        <div className="faq__list">
          {allFaqs.map((f) => (
            <details key={f.q} className="faq__item">
              <summary><span>{f.q}</span><span className="faq__x" aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
