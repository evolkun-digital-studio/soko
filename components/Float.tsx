"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Image to float. Omit it and pass children to float a custom group instead. */
  src?: string;
  children?: React.ReactNode;
  alt?: string;
  /** Parallax strength. Positive = moves up faster than scroll, negative = lags behind. */
  speed?: number;
  rotate?: number;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Fly in from outside the viewport on page load. The start offset, extra
   * rotation and delay come from the CSS custom properties --fx, --fy, --fr
   * and --fd on the element's class, so they can change per breakpoint.
   */
  fly?: boolean;
};

/** Longest we hold the fly-in waiting for slow images before starting anyway. */
const READY_TIMEOUT = 2500;

/**
 * A floating cut-out image that drifts at its own speed while the page scrolls.
 *
 * Two wrappers, two jobs: the OUTER element only carries the scroll-parallax
 * translate (written from JS), the INNER element carries the resting rotation
 * and the load fly-in (CSS keyframes). Neither transform overwrites the other.
 */
export default function Float({ src, children, alt = "", speed = 0.25, rotate = 0, className = "", style, fly = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Scroll parallax. Normally measured from the parent section, so it rests at
  // 0 when the section is centred in the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const host = el.parentElement as HTMLElement;
    let raf = 0;
    let minimum = 0;
    let maximum = 0;
    let parallax = 1;

    const measure = () => {
      parallax = Number.parseFloat(getComputedStyle(el).getPropertyValue("--parallax")) || 1;
      if (!fly) return;
      // Measure the resting, rotated frame rather than the animated bounding box.
      // The fly-in and scroll transforms live on separate wrappers.
      const angle = (rotate * Math.PI) / 180;
      const height = Math.abs(Math.sin(angle)) * el.offsetWidth + Math.abs(Math.cos(angle)) * el.offsetHeight;
      const top = el.offsetTop + (el.offsetHeight - height) / 2;
      const inset = Number.parseFloat(getComputedStyle(host).getPropertyValue("--float-inset")) || 24;
      minimum = Math.min(0, inset - top);
      maximum = Math.max(0, host.clientHeight - inset - top - height);
    };

    const update = () => {
      raf = 0;
      let offset = 0;
      if (!motion.matches) {
        if (fly) {
          const r = host.getBoundingClientRect();
          const progress = Math.min(1, Math.max(0, -r.top / r.height));
          const desired = -progress * r.height * speed * parallax;
          const room = desired < 0 ? -minimum : maximum;
          // Ease toward the available space, never crossing the section edge.
          offset = room > 0 ? Math.sign(desired) * room * Math.tanh(Math.abs(desired) / room) : 0;
        } else {
          const r = host.getBoundingClientRect();
          offset = (r.top + r.height / 2 - window.innerHeight / 2) * speed;
        }
      }
      // --parallax (default 1) lets CSS scale the drift, e.g. tone it down on mobile.
      const translation = fly ? `${offset.toFixed(2)}px` : `calc(${offset.toFixed(2)}px * var(--parallax, 1))`;
      el.style.transform = `translate3d(0, ${translation}, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(host);
    observer.observe(el);
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    motion.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      motion.removeEventListener("change", onScroll);
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [speed, fly, rotate]);

  // Fly-in: the keyframes are paused on their first frame (off-screen) by CSS.
  // Release them once every flying image in this section has loaded, so the
  // staggered delays stay in sync and nothing lands as an empty box.
  useEffect(() => {
    const inner = innerRef.current;
    if (!fly || !inner) return;
    const host = ref.current?.parentElement;
    const imgs = Array.from(host?.querySelectorAll<HTMLImageElement>(".float-inner.fly img") ?? []);
    let cancelled = false;
    const start = () => {
      if (!cancelled) inner.classList.add("is-ready");
    };

    const loaded = imgs.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise<void>((res) => {
            img.addEventListener("load", () => res(), { once: true });
            img.addEventListener("error", () => res(), { once: true });
          }),
    );
    const timer = window.setTimeout(start, READY_TIMEOUT);
    Promise.all(loaded).then(() => {
      window.clearTimeout(timer);
      start();
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [fly]);

  return (
    <div ref={ref} className={`float ${className}`} style={style} aria-hidden={alt ? undefined : true}>
      <div
        ref={innerRef}
        className={`float-inner${fly ? " fly" : ""}`}
        style={{ "--r": `${rotate}deg` } as React.CSSProperties}
      >
        {children ?? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} draggable={false} />
        )}
      </div>
    </div>
  );
}
