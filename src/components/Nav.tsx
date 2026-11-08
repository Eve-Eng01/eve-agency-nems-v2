"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/icons";
import { lenis } from "./Smooth";

const links = [
  { href: "/work/", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/#services", label: "Services" },
  { href: "/#team", label: "Team" },
];

/* A plain bar across the top: the mark on the left, the links and the call on the right.
   It turns solid once the page moves under it. */
export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => { setOpen(false); }, [path]);
  /* while the menu is open: focus moves into it, the page behind can't be tabbed to or scrolled,
     and Escape closes it and hands focus back to the button */
  const toggle = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  useEffect(() => {
    document.documentElement.dataset.menu = open ? "open" : "";
    document.querySelectorAll("main, footer").forEach((el) => el.toggleAttribute("inert", open));
    if (open) { lenis?.stop(); document.querySelector<HTMLElement>("#menu .menu__link")?.focus(); }
    else { lenis?.start(); if (wasOpen.current) toggle.current?.focus(); }
    wasOpen.current = open;
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [open]);
  useEffect(() => {
    const on = () => setSolid(scrollY > 24);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  /* the menu sits beside the bar, not inside it: the bar's frosted blur would otherwise
     become the menu's frame once the page scrolls, shrinking it to the bar's height */
  return (
    <>
    <header className={solid ? "nav is-solid" : "nav"}>
      <a className="skip" href="#main">Skip to content</a>
      <div className="nav__bar">
        <Link href="/" className="nav__logo" aria-label="Eve Studio, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/eve-logo-nav.png" alt="" width={66} height={38} />
          <span>Studio</span>
        </Link>
        <nav className="nav__links" aria-label="Main">
          {links.map((l) => <Link key={l.href} href={l.href} className="nav__link" aria-current={l.href === "/work/" && path.startsWith("/work") ? "page" : undefined}>{l.label}</Link>)}
        </nav>
        <Link href="/contact/" className="btn btn--primary btn--sm nav__cta">Book a free call <ArrowRight size={14} weight="bold" aria-hidden="true" /></Link>
        <button ref={toggle} type="button" className="nav__menu" aria-expanded={open} aria-controls="menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          <span /><span />
        </button>
      </div>
    </header>
      <div id="menu" className="menu" hidden={!open}>
        <nav aria-label="Menu">
          {[{ href: "/", label: "Home" }, ...links, { href: "/contact/", label: "Book a free call" }].map((l, i) => (
            <Link key={l.href + l.label} href={l.href} className="menu__link" style={{ "--i": i } as React.CSSProperties} onClick={() => { wasOpen.current = false; setOpen(false); }}>{l.label}</Link>
          ))}
        </nav>
      </div>
    </>
  );
}
