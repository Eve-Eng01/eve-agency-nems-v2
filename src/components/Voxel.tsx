"use client";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { Figure, Pose, buildFigure, mergePose, poses, prepare, renderFigure } from "@/art/voxel";
import { reduced } from "@/lib/motion";

export type VoxelHandle = { act: (name: "wave" | "spin" | "tool", ms?: number) => void; rest: () => void; dance: (ms?: number) => void };
type Props = {
  figure: Figure; size?: number; className?: string; label?: string; style?: React.CSSProperties; lift?: number;
  /** A pose held between actions, looping while the figure is on screen. Keep it a stable reference. */
  idle?: (t: number) => Pose;
};

/* One pixel figure from the team, drawn on its own canvas, able to wave, spin or use its tool.
   With an idle pose it stays alive: one loop at 30 frames a second, only while it is on screen,
   with actions laid over the idle. */
export const Voxel = forwardRef<VoxelHandle, Props>(function Voxel({ figure, size = 480, className, label, style, lift = 0, idle }, handle) {
  const ref = useRef<HTMLCanvasElement>(null);
  const fig = useMemo(() => prepare(buildFigure(figure)), [figure]);
  const raf = useRef(0);
  const action = useRef<{ fn: (t: number) => Pose; t0: number; ms: number } | null>(null);

  const paint = (pose?: Pose) => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (cv && ctx) renderFigure(ctx, cv.width, cv.height, fig, pose, lift);
  };
  const stop = () => { cancelAnimationFrame(raf.current); raf.current = 0; };
  const run = (fn: (t: number) => Pose, ms: number) => {
    if (reduced()) return;
    if (idle) { action.current = { fn, t0: performance.now(), ms }; return; }
    stop();
    const t0 = performance.now();
    const tick = (now: number) => {
      if (now - t0 > ms) { paint(); raf.current = 0; return; }
      paint(fn((now - t0) / 1000));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  useImperativeHandle(handle, () => ({
    act: (name, ms = 3000) => run(poses[name], name === "spin" ? 900 : ms),
    rest: () => { action.current = null; if (!idle) { stop(); paint(); } },
    dance: (ms = 4200) => run(poses.dance, ms),
  }));

  /* a still figure paints once per render */
  useEffect(() => { if (!idle) { paint(); return stop; } });

  /* a living figure runs its own loop */
  useEffect(() => {
    if (!idle) return;
    const cv = ref.current!;
    if (reduced()) { paint(idle(0)); return; }
    let vis = false, lastPaint = 0;
    const t0 = performance.now();
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; });
    io.observe(cv);
    const tick = (now: number) => {
      raf.current = requestAnimationFrame(tick);
      if (!vis || now - lastPaint < 33) return;
      lastPaint = now;
      const base = idle((now - t0) / 1000);
      const a = action.current;
      if (a && now - a.t0 > a.ms) action.current = null;
      paint(action.current ? mergePose(base, a!.fn((now - a!.t0) / 1000)) : base);
    };
    paint(idle(0));
    raf.current = requestAnimationFrame(tick);
    return () => { io.disconnect(); stop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idle, fig]);

  return <canvas ref={ref} width={size} height={size} className={className} style={style} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} />;
});
