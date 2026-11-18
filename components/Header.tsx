"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "#top" },
  { label: "Our Menu", href: "#menu" },
  { label: "Our Story", href: "#story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Visit Us", href: "#visit" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);

  // Swap the header to brown ink whenever it sits over a light (cream) section.
  useEffect(() => {
    const check = () => {
      const probe = 70;
      const sections = document.querySelectorAll<HTMLElement>("[data-theme]");
      let isLight = false;
      sections.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) isLight = s.dataset.theme === "light";
      });
      setLight(isLight);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`site-header ${light && !open ? "is-light" : ""}`}>
        <a href="#top" className="brand" aria-label="SOKO Café & Bakery — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={light && !open ? "/img/logo-full.png" : "/img/logo-cream.png"} alt="SOKO — a sleeping cat resting on the wordmark" width={1400} height={1055} />
          <span>Café &amp; Bakery</span>
        </a>

        <button
          className={`burger ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </header>

      <nav className={`menu-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <ul>
          {links.map((l, i) => (
            <li key={l.href} style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}>
              <a href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="menu-foot">Slow coffee. Fresh bakes. · hello@sokocafe.com</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="menu-cat" src="/img/logo-cream.png" alt="" aria-hidden />
      </nav>
    </>
  );
}
