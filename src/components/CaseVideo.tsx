"use client";
import { useEffect, useRef, useState } from "react";

/* A silent screen recording that plays only while it is on screen, and never by itself under
   reduced motion. A pause button sits on it, since it loops for longer than five seconds. */
export function CaseVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const v = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const user = useRef<boolean | null>(null);

  useEffect(() => {
    const el = v.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) user.current = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && user.current !== false) el.play().catch(() => {});
      else if (!e.isIntersecting) el.pause();
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const el = v.current!;
    if (el.paused) { user.current = true; el.play().catch(() => {}); } else { user.current = false; el.pause(); }
  };

  return (
    <div className="cvid">
      <video ref={v} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <button type="button" className="cvid__btn" onClick={toggle} aria-label={playing ? "Pause the recording" : "Play the recording"}>
        {playing
          ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" /></svg>
          : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>}
      </button>
    </div>
  );
}
