import type { ArtId } from "@/art/draw";
import type { Pic } from "@/content/cases";
import { ArtFrame } from "./ArtFrame";

/* A piece of work: the real picture when there is one, otherwise the drawn sample.
   Inside a labelled link the picture is decorative (alt ""); on its own page it is described. */
export function WorkPic({ pic, art, sizes = "(min-width: 900px) 50vw, 100vw", describe = false, early = false, className = "" }: { pic?: Pic; art: ArtId; sizes?: string; describe?: boolean; early?: boolean; className?: string }) {
  if (!pic) return <ArtFrame id={art} early={early} className={className} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={`art ${className}`} src={pic.src800} srcSet={`${pic.src800} 800w, ${pic.src} 1600w`} sizes={sizes} alt={describe ? pic.alt : ""} width={1600} height={1000} loading={early ? "eager" : "lazy"} decoding="async" />
  );
}
