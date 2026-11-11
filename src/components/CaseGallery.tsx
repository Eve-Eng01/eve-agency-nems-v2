"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Shot } from "@/content/cases";
import { motion, reduced } from "@/lib/motion";
import { lenis } from "./Smooth";

/* The identity in use: rows of renders that share one height (each tile grows by its aspect ratio,
   so nothing is cropped). Tiles rise in once, zoom a touch and show their name on hover, and open
   in a full screen viewer: arrows or a swipe to move, Escape or the backdrop to close. */
export function CaseGallery({ rows, client, title = "The identity in use", lead }: { rows: Shot[][]; client: string; title?: string; lead?: string }) {
  const all = rows.flat();
  const root = useRef<HTMLElement>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [at, setAt] = useState<number | null>(null);

  /* arrival: tiles rise row by row, once */
  useEffect(() => {
    if (reduced()) return;
    const { gsap } = motion();
    const el = root.current!;
    const ctx = gsap.context(() => {
      el.querySelectorAll(".gal__row").forEach((row) => {
        gsap.from(row.children, { y: 48, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: row, start: "top 88%", once: true } });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const open = (i: number, btn: HTMLButtonElement) => { opener.current = btn; setAt(i); };
  const close = useCallback(() => setAt(null), []);
  const step = useCallback((d: number) => setAt((i) => (i === null ? i : (i + d + all.length) % all.length)), [all.length]);

  /* the dialog: modal (focus stays inside, the page behind is inert), smooth scroll paused */
  /* opening and closing both run from state, so cleanup never depends on the dialog's own close event */
  const shown = useRef(false);
  useEffect(() => {
    const d = dlg.current!;
    if (at !== null && !shown.current) { shown.current = true; if (!d.open) d.showModal(); lenis?.stop(); }
    if (at === null && shown.current) { shown.current = false; if (d.open) d.close(); lenis?.start(); opener.current?.focus(); }
  }, [at]);
  useEffect(() => {
    const d = dlg.current!;
    const onClose = () => setAt(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Escape") { e.preventDefault(); setAt(null); }
    };
    d.addEventListener("close", onClose);
    d.addEventListener("keydown", onKey);
    return () => { d.removeEventListener("close", onClose); d.removeEventListener("keydown", onKey); };
  }, [step]);

  /* swipe on touch screens */
  const touch = useRef<number | null>(null);
  const shot = at === null ? null : all[at];

  return (
    <section ref={root} className="gal" aria-labelledby="gal-h">
      <div className="wrap">
        <header className="gal__head">
          <h2 id="gal-h" className="h-5">{title}</h2>
          <p className="case__lead">{lead ?? `Twelve renders of ${client} at work, from business cards to a billboard. Open any one to see it full size.`}</p>
        </header>
        <div className="gal__rows">
          {rows.map((row, r) => (
            <div key={r} className="gal__row">
              {row.map((s) => {
                const i = all.indexOf(s);
                return (
                  <button key={s.src} type="button" className="gal__tile" style={{ "--ar": s.w / s.h } as React.CSSProperties}
                    aria-label={`${s.label}: open full size`} onClick={(e) => open(i, e.currentTarget)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.src} alt={s.alt} width={s.w} height={s.h} loading="lazy" decoding="async" />
                    <span className="gal__tag" aria-hidden="true">{s.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <dialog ref={dlg} className="lb" aria-label={shot ? `${shot.label}, ${at! + 1} of ${all.length}` : "Viewer"}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => { if (touch.current === null) return; const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1); touch.current = null; }}>
        {shot && (
          <>
            <figure className="lb__fig" key={shot.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} />
            </figure>
            <div className="lb__bar">
              <span className="lb__name">{shot.label}<small>{at! + 1} / {all.length}</small></span>
              <span className="lb__ctl">
                <button type="button" className="lb__btn" onClick={() => step(-1)} aria-label="Previous">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
                </button>
                <button type="button" className="lb__btn" onClick={() => step(1)} aria-label="Next">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
                </button>
                <button type="button" className="lb__btn" onClick={close} aria-label="Close">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
              </span>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
