"use client";
import { useEffect, useRef } from "react";
import { ART_H, ART_W, drawArt, loadArtFonts, REST, type ArtId } from "@/art/draw";

/* A still of one piece of work, drawn once per change, and only once it comes near the screen.
   `early` also draws it in idle time after load, for pictures a link can jump straight to. */
export function ArtFrame({ id, className = "", early = false }: { id: ArtId; className?: string; early?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    let dead = false, done = false;
    const draw = (reveal: boolean) => {
      if (done) return;
      done = true;
      io.disconnect();
      loadArtFonts().then(() => {
        if (dead) return;
        const k = Math.min(2, window.devicePixelRatio || 1) * (cv.clientWidth / ART_W);
        cv.width = Math.round(ART_W * k);
        cv.height = Math.round(ART_H * k);
        drawArt(cv.getContext("2d")!, id, REST[id], k);
        if (reveal && !matchMedia("(prefers-reduced-motion: reduce)").matches) cv.animate([{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0 0)" }], { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
      });
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) draw(true); }, { rootMargin: "600px 0px" });
    io.observe(cv);
    let idle = 0;
    if (early) {
      const ric = window.requestIdleCallback ?? ((f: () => void) => window.setTimeout(f, 1200));
      const go = () => { idle = ric(() => draw(false), { timeout: 3000 }); };
      if (document.readyState === "complete") go(); else addEventListener("load", go, { once: true });
    }
    return () => { dead = true; io.disconnect(); if (idle) (window.cancelIdleCallback ?? clearTimeout)(idle); };
  }, [id, early]);
  return <canvas ref={ref} className={`art ${className}`} aria-hidden="true" />;
}
