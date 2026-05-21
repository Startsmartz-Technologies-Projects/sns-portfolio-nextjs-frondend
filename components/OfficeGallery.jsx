"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Icon, Button, Eyebrow, SectionHead } from "./Primitives";

/* ================================================================
   Page 16 of 18 — Office Gallery
   Spec: SRS FR-1, FR-3, FR-4, FR-5, FR-8, FR-40
   Composition:
     Header · Page hero · Filter strip · Photo grid (masonry) ·
     Privacy panel · Closing enquiry CTA band · Footer · WhatsApp FAB
     + Lightbox overlay (real modal · keyboard cycle · Esc closes)
   ================================================================ */

/* ----------------------------------------------------------------
   Local glyphs used on this page only.
---------------------------------------------------------------- */
const OgGlyph = {
  arrowRight:  (<><path d="M5 12h14M13 5l7 7-7 7"/></>),
  arrowLeft:   (<><path d="M19 12H5M11 5 4 12l7 7"/></>),
  arrowUpRight:(<><path d="M7 17 17 7M7 7h10v10"/></>),
  expand:      (<><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></>),
};

/* Visibly-flagged copy slot — matches the rest of the site. */
function OgPlaceholder({ children }) {
  return <span className="copy-placeholder">{children}</span>;
}

/* ----------------------------------------------------------------
   Canonical photo set — 12 placeholders.
   Caption + category from the SRS table for this page.
   Aspect ratios mixed (4:3 / 3:4 / 1:1) for masonry rhythm.
---------------------------------------------------------------- */
const OG_PHOTOS = [
  { id: 1,  cat: "Building",                  caption: "Exterior of the office building", ratio: "4 / 3" },
  { id: 2,  cat: "Reception",                 caption: "Reception desk",                  ratio: "1 / 1" },
  { id: 3,  cat: "Reception",                 caption: "Reception waiting area",          ratio: "3 / 4" },
  { id: 4,  cat: "Meeting & training rooms",  caption: "Meeting room",                    ratio: "4 / 3" },
  { id: 5,  cat: "Meeting & training rooms",  caption: "Conference table",                ratio: "3 / 2" },
  { id: 6,  cat: "Team at work",              caption: "Team at a workstation",           ratio: "1 / 1" },
  { id: 7,  cat: "Team at work",              caption: "Manager's office",                ratio: "4 / 3" },
  { id: 8,  cat: "Building",                  caption: "Lobby",                           ratio: "3 / 4" },
  { id: 9,  cat: "Meeting & training rooms",  caption: "Interview area",                  ratio: "1 / 1" },
  { id: 10, cat: "Team at work",              caption: "Documentation desk",              ratio: "4 / 3" },
  { id: 11, cat: "Reception",                 caption: "Visitor seating",                 ratio: "3 / 4" },
  { id: 12, cat: "Building",                  caption: "Building entrance",               ratio: "3 / 2" },
];

const OG_CATEGORIES = [
  "All",
  "Building",
  "Reception",
  "Meeting & training rooms",
  "Team at work",
];

/* ----------------------------------------------------------------
   Decorative gradient placeholder — varied navy / cyan / teal mix.
   Returns inline-style object so each tile in the grid feels distinct
   without leaking raw hex into stylesheets (palette stops are drawn
   from the design tokens: navy-950 → navy-500 → cyan-500 / teal-300).
---------------------------------------------------------------- */
const TILE_PRESETS = [
  { bg: "linear-gradient(135deg, #0B2C54 0%, #1565C0 60%, #00ACC1 100%)", arc: "#00BCD4" },
  { bg: "linear-gradient(155deg, #103A6B 0%, #15498A 55%, #4DB6AC 100%)", arc: "#4DB6AC" },
  { bg: "linear-gradient(120deg, #15498A 0%, #1565C0 50%, #00ACC1 100%)", arc: "#00ACC1" },
  { bg: "linear-gradient(170deg, #0A2440 0%, #103A6B 60%, #00BCD4 100%)", arc: "#00BCD4" },
  { bg: "linear-gradient(140deg, #1565C0 0%, #00ACC1 60%, #4DB6AC 100%)", arc: "#4DB6AC" },
  { bg: "linear-gradient(135deg, #061A30 0%, #15498A 55%, #00ACC1 100%)", arc: "#00ACC1" },
  { bg: "linear-gradient(160deg, #103A6B 0%, #15498A 50%, #4DB6AC 100%)", arc: "#4DB6AC" },
  { bg: "linear-gradient(125deg, #0B2C54 0%, #1565C0 60%, #00BCD4 100%)", arc: "#00BCD4" },
  { bg: "linear-gradient(150deg, #15498A 0%, #00ACC1 80%, #4DB6AC 100%)", arc: "#4DB6AC" },
  { bg: "linear-gradient(165deg, #0A2440 0%, #15498A 50%, #00ACC1 100%)", arc: "#00ACC1" },
  { bg: "linear-gradient(130deg, #1565C0 0%, #00ACC1 50%, #4DB6AC 100%)", arc: "#4DB6AC" },
  { bg: "linear-gradient(155deg, #061A30 0%, #103A6B 50%, #00BCD4 100%)", arc: "#00BCD4" },
];

/* ----------------------------------------------------------------
   <PhotoPlaceholder> — the gradient tile content shared between
   grid tiles and the lightbox photo slot.
---------------------------------------------------------------- */
function PhotoPlaceholder({ index, caption, big }) {
  const preset = TILE_PRESETS[index % TILE_PRESETS.length];
  return (
    <span className="og-photo-ph" aria-hidden="true" style={{ background: preset.bg }}>
      <span className="og-photo-stripes"/>
      <span className="og-photo-arc" style={{ background: preset.arc }}/>
      {big ? (
        <span className="og-photo-note">
          <Icon name="building" size={28} color="rgba(255,255,255,.85)"/>
          <span className="og-photo-note-lbl">Photo placeholder</span>
          <span className="og-photo-note-sub">Awaiting client supply · {caption}</span>
        </span>
      ) : null}
    </span>
  );
}

/* ----------------------------------------------------------------
   <FilterStrip> — pill-chip row (spec §8.6), `radiogroup`.
   Arrow keys move focus; space / enter selects. Caption line
   reports the current count.
---------------------------------------------------------------- */
function FilterStrip({ active, onChange, count }) {
  const groupRef = useRef(null);
  const onKey = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const items = Array.from(groupRef.current.querySelectorAll('[role="radio"]'));
    const idx = items.indexOf(document.activeElement);
    const next = e.key === "ArrowRight"
      ? items[(idx + 1) % items.length]
      : items[(idx - 1 + items.length) % items.length];
    next && next.focus();
  };
  return (
    <section className="og-filter-band" aria-label="Filter office photos by area">
      <div className="container og-filter-inner">
        <div
          ref={groupRef}
          role="radiogroup"
          aria-label="Photo categories"
          className="og-filter-row"
          onKeyDown={onKey}
        >
          {OG_CATEGORIES.map((c) => {
            const selected = c === active;
            return (
              <button
                key={c}
                role="radio"
                aria-checked={selected}
                tabIndex={selected ? 0 : -1}
                className={"pill-chip og-filter-chip" + (selected ? " selected" : "")}
                onClick={() => onChange(c)}
              >
                {c}
              </button>
            );
          })}
        </div>
        <p className="og-count" aria-live="polite">
          Showing <strong>{count}</strong>
          {" "}{count === 1 ? "photo" : "photos"}
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   <PhotoTile> — focusable button. Opens lightbox at this index.
---------------------------------------------------------------- */
function PhotoTile({ photo, displayIndex, displayCount, totalIndex, onOpen }) {
  return (
    <button
      type="button"
      className="og-tile"
      style={{ aspectRatio: photo.ratio }}
      onClick={() => onOpen(totalIndex)}
      aria-label={`View photo — ${photo.caption} — ${displayIndex} of ${displayCount}`}
    >
      <PhotoPlaceholder index={photo.id - 1} caption={photo.caption}/>
      <span className="og-tile-tag" aria-hidden="true">{photo.cat}</span>
      <span className="og-tile-overlay" aria-hidden="true">
        <span className="og-tile-view">
          View <Icon size={14}>{OgGlyph.arrowRight}</Icon>
        </span>
      </span>
    </button>
  );
}

/* ----------------------------------------------------------------
   <Lightbox> — modal photo viewer. Real dialog: focus-trapped,
   keyboard cycle, Esc closes, focus returns to originating tile.
---------------------------------------------------------------- */
function Lightbox({ index, photos, onClose, onPrev, onNext, loadState = "ready" }) {
  const closeRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    closeRef.current && closeRef.current.focus();
    const onKey = (e) => {
      if (e.key === "Escape")        { e.preventDefault(); onClose(); }
      else if (e.key === "ArrowLeft"){ e.preventDefault(); onPrev();  }
      else if (e.key === "ArrowRight"){e.preventDefault(); onNext();  }
      else if (e.key === "Tab") {
        // Trap focus across the three controls
        const focusables = [closeRef.current, prevRef.current, nextRef.current].filter(Boolean);
        if (focusables.length < 2) return;
        const i = focusables.indexOf(document.activeElement);
        if (e.shiftKey && i === 0) { e.preventDefault(); focusables[focusables.length - 1].focus(); }
        else if (!e.shiftKey && i === focusables.length - 1) { e.preventDefault(); focusables[0].focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const p = photos[index];
  const total = photos.length;

  return (
    <div className="og-lb-overlay" role="presentation" onClick={onClose}>
      <div
        className="og-lb"
        role="dialog"
        aria-modal="true"
        aria-labelledby="og-lb-caption"
        onClick={(e) => e.stopPropagation()}
      >
        {loadState === "loading" ? <span className="og-lb-progress" aria-hidden="true"/> : null}

        <header className="og-lb-top">
          <div className="og-lb-top-text">
            <span className="og-lb-over">Office Gallery</span>
            <h2 id="og-lb-caption" className="og-lb-caption">{p.caption}</h2>
          </div>
          <span className="og-lb-counter" aria-label={`Photo ${index + 1} of ${total}`}>
            {index + 1} / {total}
          </span>
          <button
            ref={closeRef}
            type="button"
            className="og-lb-close"
            onClick={onClose}
            aria-label="Close photo viewer"
          >
            <Icon size={22} color="#fff"><path d="M18 6 6 18M6 6l12 12"/></Icon>
          </button>
        </header>

        <div className="og-lb-stage">
          <figure className="og-lb-figure" style={{ aspectRatio: p.ratio }}>
            <PhotoPlaceholder index={p.id - 1} caption={p.caption} big/>
            {loadState === "error" ? (
              <div className="og-lb-error" role="alert">
                <div className="alert alert-error" style={{maxWidth:420}}>
                  <span className="alert-ic"><Icon name="alert" size={14} color="#fff"/></span>
                  <div>
                    <p className="alert-ttl">Photo could not load</p>
                    <p className="alert-msg">Tap × to close and try another.</p>
                  </div>
                </div>
              </div>
            ) : null}
          </figure>
        </div>

        <footer className="og-lb-bottom">
          <button
            ref={prevRef}
            type="button"
            className="btn btn-outline-dark btn-small og-lb-nav"
            onClick={onPrev}
            aria-label="Previous photo"
          >
            <Icon size={16}>{OgGlyph.arrowLeft}</Icon> Previous
          </button>
          <span className="pill-chip og-lb-cat" aria-hidden="true">{p.cat}</span>
          <button
            ref={nextRef}
            type="button"
            className="btn btn-outline-dark btn-small og-lb-nav"
            onClick={onNext}
            aria-label="Next photo"
          >
            Next <Icon size={16}>{OgGlyph.arrowRight}</Icon>
          </button>
        </footer>
      </div>
    </div>
  );
}

/* ================================================================
   Page composition
================================================================ */
function OfficeGallery({ state = "default", onNavigate }) {
  const [activeCat, setActiveCat]   = useState("All");
  const [lbIndex, setLbIndex]       = useState(null);   // null = closed
  const lastTileRef                 = useRef(null);

  // Initial state from URL hash — `:lightbox` opens viewer at photo #3
  // (the Reception waiting area, per design brief).
  useEffect(() => {
    if (state === "lightbox") setLbIndex(2);
    else setLbIndex(null);
  }, [state]);

  const visible = useMemo(() => (
    activeCat === "All" ? OG_PHOTOS : OG_PHOTOS.filter((p) => p.cat === activeCat)
  ), [activeCat]);

  const openAt  = useCallback((i) => setLbIndex(i), []);
  const close   = useCallback(() => setLbIndex(null), []);
  const prev    = useCallback(() => setLbIndex((i) => (i - 1 + OG_PHOTOS.length) % OG_PHOTOS.length), []);
  const next    = useCallback(() => setLbIndex((i) => (i + 1) % OG_PHOTOS.length), []);

  return (
    <>
      {/* 2 — Compact page hero */}
      <section className="page-hero og-hero" data-screen-label="01 Hero">
        <div className="hero-arc small" aria-hidden="true"/>
        <div className="container og-hero-inner">
          <Eyebrow>Inside our office</Eyebrow>
          <h1 className="display-l">Office Gallery</h1>
          <p className="page-hero-lead">
            A look inside our Dhaka office — the building, reception, meeting
            rooms, and our team at work.
          </p>
        </div>
      </section>

      {/* 3 — Filter / category strip */}
      <FilterStrip active={activeCat} onChange={setActiveCat} count={visible.length}/>

      {/* 4 — Photo grid */}
      <section className="section og-grid-section" data-screen-label="02 Grid">
        <div className="container">
          <SectionHead
            eyebrow="Photos"
            title="Our Dhaka office"
            lead="Photographs of our corporate office in Aziz Sarak, Dhaka."
          />
          <div className="og-grid" role="list">
            {visible.map((photo, i) => {
              const totalIdx = OG_PHOTOS.findIndex((q) => q.id === photo.id);
              return (
                <div key={photo.id} role="listitem" className="og-grid-cell">
                  <PhotoTile
                    photo={photo}
                    displayIndex={i + 1}
                    displayCount={visible.length}
                    totalIndex={totalIdx}
                    onOpen={openAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 — Photo-courtesy / privacy panel */}
      <section className="section section-alt" data-screen-label="03 Privacy">
        <div className="container">
          <aside className="panel-card og-privacy" aria-labelledby="og-privacy-title">
            <div className="og-privacy-body">
              <Eyebrow>Photos</Eyebrow>
              <h3 id="og-privacy-title">What's in these photos</h3>
              <p>
                These photos show our Dhaka office and our team in their
                working roles. Where workers or clients appear, it is with
                their consent. We never publish anyone's identification or
                personal documents.
              </p>
            </div>
            <div className="og-privacy-actions">
              <a className="link-ghost"
                 href="#training-gallery"
                 aria-label="See the Training and Testing Gallery">
                See the Training &amp; Testing Gallery
                {" "}<Icon size={14}>{OgGlyph.arrowRight}</Icon>
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* 7 — Closing enquiry CTA band */}
      <section className="section contact-band og-closing" data-screen-label="04 Enquiry">
        <div className="container contact-band-inner">
          <div>
            <span className="eyebrow" style={{color:"#7fd9e3"}}>Visit or contact us</span>
            <h2 className="h2" style={{color:"#fff", marginTop:6, maxWidth:"22ch"}}>
              Come and meet us
            </h2>
            <p style={{color:"var(--navy-200)", marginTop:8, maxWidth:"56ch"}}>
              Drop by our Dhaka office, or send us a note — whichever is
              easier for you.
            </p>
          </div>
          <div className="contact-band-ctas">
            <Button as="a" href="#contact" variant="outline-dark" size="large">
              Find our office <Icon size={16}>{OgGlyph.arrowRight}</Icon>
            </Button>
            <Button variant="apply" size="large"
              onClick={() => onNavigate && onNavigate("apply")}>
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* 5 — Lightbox (renders only when open) */}
      {lbIndex != null ? (
        <Lightbox
          index={lbIndex}
          photos={OG_PHOTOS}
          onClose={close}
          onPrev={prev}
          onNext={next}
          loadState={state === "lightbox-loading" ? "loading"
                   : state === "lightbox-error"   ? "error"
                   : "ready"}
        />
      ) : null}
    </>
  );
}

export { OfficeGallery };
