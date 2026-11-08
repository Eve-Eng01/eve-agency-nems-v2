/* One place that loads GSAP and its plugins, so every component shares the same instance. */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let ready = false;
export function motion() {
  if (!ready && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    ready = true;
  }
  return { gsap, ScrollTrigger, SplitText };
}

export const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
export const fine = () => typeof window !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches;

export const EASE = "expo.out";
