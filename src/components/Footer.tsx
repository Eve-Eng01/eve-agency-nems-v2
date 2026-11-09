"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUp, Check, Copy } from "@/components/icons";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { team } from "@/content/team";
import { motion, reduced } from "@/lib/motion";
import { idles, type Figure, type Pose } from "@/art/voxel";
import { Voxel, type VoxelHandle } from "./Voxel";
import { lenis } from "./Smooth";

export function CopyEmail() {
  const [done, setDone] = useState(false);
  if (!site.emailReady) return null;
  return (
    <button
      type="button"
      className="link link--btn"
      onClick={async () => {
        try { await navigator.clipboard.writeText(site.email); setDone(true); setTimeout(() => setDone(false), 1800); } catch { location.href = `mailto:${site.email}`; }
      }}
    >
      {done ? <><Check size={16} weight="bold" aria-hidden="true" /> Email copied</> : <><Copy size={16} weight="bold" aria-hidden="true" /> Copy {site.email}</>}
    </button>
  );
}

/* The close of every page, on the deep panel. A call to book, the links, and the studio's name
   drawn in outline across the whole width, like type converted to paths. The crew sits on it:
   the founder on the first E, technology typing on the S, design on the D, mobile balancing on
   the I and the creative director on the O, filming. A little figure walks the baseline toward the
   pointer. Letters fill with purple as the pointer passes over them. */

const WORD = "Eve Studio";
const MAN: Figure = { skin: "#7b4a2d", hair: "#17110d", hairStyle: "short", top: "#8800ff", legs: "#f4f0fb", shoe: "#ffffff", tool: "none", accent: "#b980ff" };
/* on the deep panel the darkest tops would vanish, so they lighten here */
const LIGHTER: Record<string, Partial<Figure>> = { founder: { top: "#f4f0fb" }, creative: { top: "#b980ff", legs: "#f4f0fb" } };
const by = (id: string) => { const f = team.find((p) => p.id === id)!.figure; return { ...f, ...LIGHTER[id] }; };

/* `at` is the letter index in "Eve Studio" (the space counts); on a phone the name sets on two lines */
type Seat = { id: string; figure: Figure; idle: (t: number) => Pose; act: "wave" | "tool" | "spin"; at: number; fx: number; k: number; face: 1 | -1 };
const CREW: Seat[] = [
  { id: "founder", figure: by("founder"), idle: idles.sit, act: "wave", at: 0, fx: 0.45, k: 0.66, face: 1 },
  { id: "technology", figure: by("technology"), idle: idles.type, act: "tool", at: 4, fx: 0.5, k: 0.66, face: 1 },
  { id: "design", figure: by("design"), idle: idles.sit, act: "tool", at: 7, fx: 0.42, k: 0.62, face: -1 },
  { id: "mobile", figure: by("mobile"), idle: idles.stand, act: "spin", at: 8, fx: 0.5, k: 0.56, face: 1 },
  { id: "creative", figure: by("creative"), idle: idles.film, act: "tool", at: 9, fx: 0.5, k: 0.68, face: -1 },
];

type Spot = { x: number; y: number; d: number };

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const walker = useRef<HTMLDivElement>(null);
  const figs = useRef<Record<string, VoxelHandle | null>>({});
  const [spots, setSpots] = useState<Record<string, Spot> | null>(null);

  /* measure the letters, so everyone sits on a real cap top and the walker on the baseline */
  useEffect(() => {
    const set = setRef.current!, word = wordRef.current!;
    const measure = () => {
      /* set the name to the panel's full width: on a phone the wider of its two lines decides */
      const narrow = innerWidth < 760;
      const ms = Array.from(word.querySelectorAll<HTMLElement>(".foot__m"));
      const sp = ms.findIndex((m) => m.classList.contains("foot__m--sp"));
      const sum = (a: HTMLElement[]) => a.reduce((t, m) => t + m.getBoundingClientRect().width, 0);
      const natural = narrow ? Math.max(sum(ms.slice(0, sp)), sum(ms.slice(sp + 1))) : sum(ms);
      const cur = parseFloat(getComputedStyle(word).fontSize);
      const fit = Math.min(cur * (word.clientWidth / natural), narrow ? 200 : 260);
      if (Math.abs(fit - cur) > 0.5) word.style.fontSize = `${fit}px`;
      const cs = getComputedStyle(word);
      const fs = parseFloat(cs.fontSize);
      const ctx = document.createElement("canvas").getContext("2d")!;
      ctx.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
      const fm = ctx.measureText("E");
      const asc = fm.fontBoundingBoxAscent || fs * 0.95, desc = fm.fontBoundingBoxDescent || fs * 0.25;
      const cap = fm.actualBoundingBoxAscent || fs * 0.72;
      const lh = parseFloat(cs.lineHeight) || fs;
      const boxes = Array.from(word.querySelectorAll<HTMLElement>(".foot__m")).map((m) => {
        const base = m.offsetTop + (lh - (asc + desc)) / 2 + asc;
        return { x: m.offsetLeft, w: m.offsetWidth, base, top: base - cap };
      });
      const base = Math.max(...boxes.map((b) => b.base));
      set.style.setProperty("--base", `${base}px`);
      const min = narrow ? 46 : 64;
      const out: Record<string, Spot> = {};
      CREW.forEach((s) => {
        const b = boxes[s.at];
        const d = Math.max(fs * s.k, min);
        out[s.id] = { x: b.x + b.w * s.fx - d / 2, y: b.top - d * 0.88, d };
      });
      const dm = Math.max(fs * 0.5, min * 0.9);
      out.walker = { x: narrow ? word.offsetWidth * 0.62 : boxes[3].x + boxes[3].w / 2 - dm / 2, y: base - dm * 0.9, d: dm };
      setSpots(out);
    };
    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(word);
    return () => ro.disconnect();
  }, []);

  const ready = !!spots;
  useEffect(() => {
    if (!ready) return;
    const { gsap } = motion();
    const el = root.current!, word = wordRef.current!, set = setRef.current!, man = walker.current!;
    gsap.set(man, { x: spots!.walker.x });
    if (reduced()) return;

    /* arrival: the outline rises letter by letter, the crew drops onto it and waves */
    let tl: gsap.core.Timeline | null = null;
    const ctx = gsap.context(() => {
      tl = gsap.timeline({ paused: true })
        .from(".foot__char", { yPercent: 105, duration: 1.3, ease: "expo.out", stagger: 0.05 }, 0)
        .from(".foot__floor", { scaleX: 0, duration: 1.4, ease: "expo.inOut" }, 0.1)
        .from(".foot__fig", { y: -140, opacity: 0, duration: 0.9, ease: "bounce.out", stagger: 0.14 }, 0.8)
        .call(() => CREW.forEach((s, i) => setTimeout(() => figs.current[s.id]?.act("wave", 1800), i * 160)), [], 1.7)
        .call(() => figs.current.walker?.act("wave", 2200), [], 2.4);
    }, el);
    const play = () => { tl?.play(); io.disconnect(); };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) play(); }, { threshold: 0.2 });
    io.observe(word);

    /* the pointer fills letters as it passes, the crew turns to face it, the little figure walks to it */
    const chars = Array.from(word.querySelectorAll<HTMLElement>(".foot__char"));
    const fills = chars.map((c) => gsap.quickTo(c, "--f", { duration: 0.6, ease: "power2.out" }));
    const mx = gsap.quickTo(man, "x", { duration: 1.6, ease: "power2.out" });
    const waved: Record<string, number> = {};
    let idle = 0, walking = false, face = 1;
    const move = (e: PointerEvent) => {
      const r = set.getBoundingClientRect();
      const near = e.clientY > r.top - 160 && e.clientY < r.bottom + 60;
      chars.forEach((c, i) => {
        const b = c.getBoundingClientRect();
        const d = near ? Math.hypot(e.clientX - (b.left + b.width / 2), e.clientY - (b.top + b.height / 2)) : 1e9;
        fills[i](Math.max(0, 1 - d / (b.height * 0.9)));
      });
      if (!near) return;
      el.querySelectorAll<HTMLElement>(".foot__fig[data-id]").forEach((f) => {
        const b = f.getBoundingClientRect();
        const cx = b.left + b.width / 2, cy = b.top + b.height / 2;
        const inn = f.firstElementChild as HTMLElement;
        if (Math.abs(e.clientX - cx) > b.width * 0.4) inn.style.setProperty("--face", e.clientX > cx ? "1" : "-1");
        const id = f.dataset.id!;
        if (Math.hypot(e.clientX - cx, e.clientY - cy) < Math.max(130, b.width) && performance.now() - (waved[id] ?? 0) > 3200) {
          waved[id] = performance.now();
          figs.current[id]?.act("wave", 1600);
        }
      });
      const target = gsap.utils.clamp(0, r.width - man.offsetWidth, e.clientX - r.left - man.offsetWidth / 2);
      const cur = gsap.getProperty(man, "x") as number;
      const dir = target > cur ? 1 : -1;
      if (Math.abs(target - cur) > 24 && dir !== face) { face = dir; (man.firstElementChild as HTMLElement).style.setProperty("--face", String(face)); }
      mx(target);
      if (!walking) { walking = true; figs.current.walker?.dance(1600); }
      clearTimeout(idle);
      idle = window.setTimeout(() => { walking = false; figs.current.walker?.act("wave", 1600); }, 900);
    };
    addEventListener("pointermove", move, { passive: true });

    /* every few seconds someone does their thing, only while the name is on screen */
    let vis = false;
    const vio = new IntersectionObserver(([e]) => { vis = e.isIntersecting; });
    vio.observe(set);
    let lastActor = "";
    const busy = window.setInterval(() => {
      if (!vis) return;
      const pool = CREW.filter((s) => s.id !== lastActor);
      const s = pool[Math.floor(Math.random() * pool.length)];
      lastActor = s.id;
      figs.current[s.id]?.act(s.act, 2200);
    }, 2800);

    return () => {
      ctx.revert(); io.disconnect(); vio.disconnect(); clearInterval(busy); clearTimeout(idle);
      removeEventListener("pointermove", move);
    };
    // the walker's start is read once; later resizes move the others through state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const top = () => { if (lenis) lenis.scrollTo(0, { duration: 1.6 }); else scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <footer ref={root} className="foot panel panel--deep">
      <div className="wrap">
        <div className="foot__top">
          <div className="foot__cta">
            <h2 className="title title--md">Have a launch coming?</h2>
            <p className="foot__lead">Book a free 30 minute call. You leave with a scope and a start date, and get a fixed quote before you&nbsp;decide.</p>
            <div className="foot__actions">
              <Link href="/contact/" className="btn btn--primary btn--lg">Book a free call <ArrowRight size={18} weight="bold" aria-hidden="true" /></Link>
              <CopyEmail />
            </div>
          </div>
          <div className="foot__cols">
            <nav className="foot__col" aria-label="Studio">
              <h3>Studio</h3>
              <Link href="/#work">Work</Link>
              <Link href="/#process">Process</Link>
              <Link href="/#team">Team</Link>
              <Link href="/#questions">Questions</Link>
            </nav>
            <nav className="foot__col" aria-label="Services">
              <h3>Services</h3>
              {services.slice(0, 5).map((s) => <Link key={s.slug} href={`/contact/?service=${s.slug}`}>{s.name}</Link>)}
            </nav>
            {/* each contact line appears only once its real value is set (see README, Before launch) */}
            <div className="foot__col">
              <h3>Contact</h3>
              <Link href="/contact/">Book a call</Link>
              {site.emailReady && <a href={`mailto:${site.email}`}>{site.email}</a>}
              {site.whatsapp && <a href={`https://wa.me/${site.whatsapp}`}>WhatsApp</a>}
              {site.socials.map((s) => <a key={s.href} href={s.href}>{s.label}</a>)}
            </div>
          </div>
        </div>

        <div ref={setRef} className="foot__set">
          <p ref={wordRef} className="foot__word">
            <span className="sr-only">{WORD}</span>
            {[...WORD].map((ch, i) => <span key={i} className={ch === " " ? "foot__m foot__m--sp" : "foot__m"} aria-hidden="true"><span className="foot__char">{ch === " " ? " " : ch}</span></span>)}
          </p>
          <span className="foot__floor" aria-hidden="true" />
          {spots && (
            <div className="foot__crew" aria-hidden="true">
              {CREW.map((s) => (
                <div key={s.id} data-id={s.id} className="foot__fig" onClick={() => figs.current[s.id]?.act("spin")}
                  style={{ left: spots[s.id].x, top: spots[s.id].y, width: spots[s.id].d, height: spots[s.id].d }}>
                  <span className="foot__figin" style={{ ["--face" as string]: s.face }}>
                    <Voxel ref={(h) => { figs.current[s.id] = h; }} figure={s.figure} idle={s.idle} size={256} lift={14} />
                  </span>
                </div>
              ))}
              <div ref={walker} className="foot__fig foot__walker" onClick={() => figs.current.walker?.act("spin")}
                style={{ left: 0, top: spots.walker.y, width: spots.walker.d, height: spots.walker.d }}>
                <span className="foot__figin">
                  <Voxel ref={(h) => { figs.current.walker = h; }} figure={MAN} idle={idles.stand} size={256} lift={20} />
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="foot__base">
          <span>© 2026 Eve Studio</span>
          <span className="foot__legal"><Link href="/privacy/">Privacy</Link><Link href="/terms/">Terms</Link></span>
          <button type="button" className="foot__up" onClick={top}>Back to top <ArrowUp size={14} weight="bold" aria-hidden="true" /></button>
        </div>
      </div>
    </footer>
  );
}
