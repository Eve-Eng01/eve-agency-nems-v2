"use client";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "@/components/icons";
import { motion, reduced } from "@/lib/motion";

/* The hero is an artboard. The headline is set in three staggered lines, the purple words get
   selected like a layer in a design file, and a construction drawing (guides through the type,
   a circle with its handles, a few nodes) draws itself behind it. The circle leans toward the pointer. */

type Geo = { w: number; h: number; guides: number[]; sel: { x: number; y: number; w: number; h: number } | null };

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const board = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  /* measure the type, so the guides run through real baselines and the selection hugs the word */
  useLayoutEffect(() => {
    const b = board.current!;
    /* layout offsets, not screen boxes: the lines are mid-animation while fonts load */
    const at = (el: HTMLElement) => {
      let x = 0, y = 0, n: HTMLElement | null = el;
      while (n && n !== b) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
      return { x, y, w: el.offsetWidth, h: el.offsetHeight };
    };
    const measure = () => {
      const lines = Array.from(b.querySelectorAll<HTMLElement>(".hero__l"));
      const guides = lines.flatMap((l) => { const q = at(l); return [q.y + q.h * 0.16, q.y + q.h * 0.84]; });
      const word = b.querySelector<HTMLElement>(".hero__sel");
      setGeo({ w: b.offsetWidth, h: b.offsetHeight, guides, sel: word ? at(word) : null });
    };
    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(b);
    return () => ro.disconnect();
  }, []);

  const ready = !!geo;
  useEffect(() => {
    if (!ready) return;
    const { gsap } = motion();
    const el = root.current!;
    if (reduced()) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".hero__l > span", { yPercent: 105, duration: 1.3, stagger: 0.09 }, 0.1)
        .from(".draw-g", { strokeDashoffset: 1, duration: 1.6, ease: "power3.inOut", stagger: 0.05 }, 0.2)
        .from(".draw-c", { strokeDashoffset: 1, duration: 1.8, ease: "power3.inOut" }, 0.45)
        .from(".draw-n", { scale: 0, transformOrigin: "50% 50%", duration: 0.6, stagger: 0.03, ease: "back.out(3)" }, 1.1)
        .from(".hero__selbox", { opacity: 0, scale: 1.06, duration: 0.7 }, 1.25)
        .from(".hero__badge", { opacity: 0, y: -6, duration: 0.5 }, 1.5)
        .from(".hero__side > *, .hero__proof li", { y: 24, opacity: 0, duration: 1, stagger: 0.07 }, 0.9);

      /* the circle and its handles lean toward the pointer, a little */
      const orb = el.querySelector(".hero__orb");
      const ox = gsap.quickTo(orb, "x", { duration: 1.4, ease: "power3.out" });
      const oy = gsap.quickTo(orb, "y", { duration: 1.4, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        if (e.clientY > r.bottom) return;
        ox(((e.clientX - r.left) / r.width - 0.5) * 36);
        oy(((e.clientY - r.top) / r.height - 0.5) * 28);
      };
      addEventListener("pointermove", move, { passive: true });
      return () => removeEventListener("pointermove", move);
    }, el);
    return () => ctx.revert();
  }, [ready]);

  /* the construction drawing, in board pixels */
  const g = geo;
  const cx = g ? g.w * 0.68 : 0, cy = g ? g.h * 0.46 : 0, rad = g ? Math.min(g.w * 0.2, g.h * 0.36) : 0;
  const nodes: [number, number][] = g ? [[cx, cy - rad], [cx + rad, cy], [cx, cy + rad], [cx - rad, cy], [cx - rad * 0.9, cy - rad], [cx + rad * 0.9, cy - rad]] : [];

  return (
    <section ref={root} className="hero" aria-labelledby="hero-h">
      <div ref={board} className="hero__board wrap">
        {g && (
          <svg className="hero__draw" viewBox={`0 0 ${g.w} ${g.h}`} width={g.w} height={g.h} aria-hidden="true">
            {g.guides.map((y, i) => <line key={i} className="draw-g" x1={0} x2={g.w} y1={y} y2={y} pathLength={1} />)}
            <line className="draw-g" x1={cx} x2={cx} y1={0} y2={g.h} pathLength={1} />
            <g className="hero__orb">
              <circle className="draw-c" cx={cx} cy={cy} r={rad} pathLength={1} />
              <line className="draw-g draw-h" x1={cx - rad * 0.9} x2={cx + rad * 0.9} y1={cy - rad} y2={cy - rad} pathLength={1} />
              {nodes.map(([x, y], i) => <rect key={i} className={i > 3 ? "draw-n draw-n--h" : "draw-n"} x={x - 5} y={y - 5} width={10} height={10} rx={i > 3 ? 5 : 1} />)}
            </g>
          </svg>
        )}
        <div className="hero__type">
          <h1 id="hero-h" className="hero__h">
            <span className="hero__l hero__l--1"><span>From idea</span></span>{" "}
            <span className="hero__l hero__l--2"><span>to <em className="hero__sel">launch</em></span></span>{" "}
            <span className="hero__l hero__l--3"><span><em>day.</em></span></span>
          </h1>
          <div className="hero__side">
            <p>Eve Studio designs and builds apps, websites, brands and launch campaigns for founders. You get one plan and a fixed quote before any work&nbsp;starts.</p>
            <div className="hero__actions">
              <Link href="/contact/" className="btn btn--primary btn--lg">Book a free call <ArrowRight size={18} weight="bold" aria-hidden="true" /></Link>
              <Link href="/#work" className="btn btn--ghost btn--lg">See the work</Link>
            </div>
          </div>
        </div>
        {g?.sel && (() => {
          /* on a phone the word runs to the edge, so the box hugs it tighter */
          const px = g.w < 700 ? 3 : 6, sw = g.sel.w + px * 2 + (g.w < 700 ? 0 : 2);
          return (
            <div className="hero__selbox" aria-hidden="true" style={{ left: g.sel.x - px, top: g.sel.y + g.sel.h * 0.1, width: sw, height: g.sel.h * 0.82 }}>
              <i /><i /><i /><i />
              <span className="hero__badge">{Math.round(sw)} × {Math.round(g.sel.h * 0.82)}</span>
            </div>
          );
        })()}
        <ul className="hero__proof">
          <li><Check size={16} weight="bold" aria-hidden="true" /> Free 30 minute call</li>
          <li><Check size={16} weight="bold" aria-hidden="true" /> Fixed quote before we start</li>
          <li><Check size={16} weight="bold" aria-hidden="true" /> Start within two weeks</li>
        </ul>
      </div>
    </section>
  );
}
