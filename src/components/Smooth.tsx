"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { motion, reduced } from "@/lib/motion";

export let lenis: Lenis | null = null;

/* Weighted scroll driven by GSAP's clock, so scroll scenes and smooth scroll never disagree.
   Also runs the page-wide reveals: [data-split] headings rise word by word, [data-reveal] blocks unmask. */
export function Smooth() {
  const path = usePathname();

  useEffect(() => {
    const { gsap, ScrollTrigger } = motion();
    if (reduced()) return;
    lenis = new Lenis({ lerp: 0.1, anchors: { offset: -88 } });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis?.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis?.destroy(); lenis = null; };
  }, []);

  useEffect(() => {
    const { gsap, ScrollTrigger, SplitText } = motion();
    if (!location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
    if (reduced()) return;
    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        const split = SplitText.create(el, { type: "words,lines", mask: "lines", linesClass: "line" });
        gsap.from(split.words, {
          yPercent: 110, rotate: 4, duration: 1.1, ease: "expo.out", stagger: 0.035,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(12% 6% 12% 6% round 24px)", scale: 1.06, opacity: 0.4 }, {
          clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, opacity: 1, duration: 1.4, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
      document.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) => {
        gsap.from(el.children, {
          y: 48, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.07,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { clearTimeout(t); ctx.revert(); };
  }, [path]);

  return null;
}
