"use client";

import { useRef, useState, useEffect } from "react";

const shots = [
  { src: "/img/gallery/croissant-tray.webp", alt: "A tray of freshly baked butter croissants", w: "wide" },
  { src: "/img/gallery/cinnamon-roll.webp", alt: "Glazed cinnamon roll", w: "narrow" },
  { src: "/img/gallery/cappuccino.webp", alt: "Cappuccino with heart latte art in a steel mug", w: "square" },
  { src: "/img/gallery/pistachio-swirl.webp", alt: "Pistachio-glazed pastry swirl", w: "narrow" },
  { src: "/img/gallery/pastry-swirl.webp", alt: "Golden laminated pastry swirl on a wooden board", w: "wide" },
  { src: "/img/gallery/sea-salt-cookie.webp", alt: "Dark chocolate cookie with sea salt", w: "narrow" },
  { src: "/img/g-napkin.webp", alt: "Iced coffee and a croissant on a SOKO napkin", w: "square" },
  { src: "/img/gallery/pretzel.webp", alt: "Soft salted pretzel", w: "narrow" },
  { src: "/img/gallery/latte.webp", alt: "Latte with rosetta art on a white saucer", w: "narrow" },
];

export default function Gallery() {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = () => {
    const t = track.current;
    if (!t) return;
    setAtStart(t.scrollLeft < 8);
    setAtEnd(t.scrollLeft + t.clientWidth >= t.scrollWidth - 8);
  };

  useEffect(sync, []);

  const go = (dir: 1 | -1) => {
    const t = track.current;
    if (!t) return;
    t.scrollBy({ left: dir * t.clientWidth * 0.6, behavior: "smooth" });
  };

  return (
    <div className="gallery">
      <div className="gallery-track" ref={track} onScroll={sync}>
        {shots.map((s) => (
          <figure key={s.src} className={`shot shot--${s.w}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={s.alt} loading="lazy" draggable={false} />
          </figure>
        ))}
      </div>
      <button className="g-arrow g-prev" aria-label="Previous photos" onClick={() => go(-1)} hidden={atStart}>
        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button className="g-arrow g-next" aria-label="Next photos" onClick={() => go(1)} hidden={atEnd}>
        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
  );
}
