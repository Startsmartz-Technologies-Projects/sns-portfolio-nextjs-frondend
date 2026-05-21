"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * AutoReveal — site-wide scroll reveal.
 *
 * Mounted once in app/layout.tsx. On every route it scans the DOM for
 * <section> elements and gives a fade + slide-up reveal (see
 * app/styles/reveal.css) to:
 *   - each section's direct content blocks (heading, intro, etc.), and
 *   - the individual cards/tiles inside any grid block, each with its
 *     own stagger delay, so a row of cards cascades in one by one.
 *
 * No per-page markup is needed — every page picks this up automatically.
 */

const STEP_MS = 140; // delay between staggered siblings

// A content block is treated as a "grid": instead of revealing it as one
// box, its children are revealed individually. Matched by class substring,
// so this covers svc-grid, sector-grid, country-grid, clients-grid,
// stat-block, cards rows, step lists, etc. across every page.
const GRID_HINTS = [
  "grid",
  "stat-block",
  "steps",
  "cards",
  "-list",
  "tiles",
  "trust-strip",
  "region-cards",
];

function isGridLike(el) {
  const cls = el.className;
  if (typeof cls !== "string") return false;
  if (!GRID_HINTS.some((h) => cls.includes(h))) return false;
  // Only treat it as a grid if it actually holds repeated items.
  return el.children.length > 1;
}

export default function AutoReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Reduced motion: do nothing — CSS leaves content visible.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // { el, delay } — every element to animate, with its stagger offset.
    const targets = [];

    document.querySelectorAll("main section").forEach((section) => {
      // Stagger one level inside the section's .container when present.
      const container = section.querySelector(":scope > .container");
      const blocks = Array.from((container || section).children);

      let delayCount = 0;

      blocks.forEach((block) => {
        if (isGridLike(block)) {
          // Reveal each card/tile individually, cascading across the grid.
          Array.from(block.children).forEach((card) => {
            targets.push({ el: card, delay: delayCount * STEP_MS });
            delayCount += 1;
          });
        } else {
          // Reveal the block as a whole.
          targets.push({ el: block, delay: delayCount * STEP_MS });
          delayCount += 1;
        }
      });
    });

    if (targets.length === 0) return;

    // Prime: hide everything and set its stagger delay.
    targets.forEach(({ el, delay }) => {
      el.classList.add("reveal-item");
      el.style.setProperty("--reveal-delay", `${delay}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach(({ el }) => {
      // Anything already on screen at load reveals immediately (no flash).
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        // Defer two frames so the transition still plays from the hidden state.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => el.classList.add("is-visible"))
        );
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
      // Clean up so a route change starts fresh.
      targets.forEach(({ el }) => {
        el.classList.remove("reveal-item", "is-visible");
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
