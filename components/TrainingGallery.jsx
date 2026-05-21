"use client";
import { useState as  useTgState, useEffect as  useTgEffect, useRef as  useTgRef, useCallback as  useTgCallback, useMemo as  useTgMemo } from "react";
import { Icon, Button, Eyebrow, SectionHead } from "./Primitives";

/* ================================================================
   Page 17 of 18 — Training & Testing Gallery
   Spec: SRS FR-1, FR-3, FR-4, FR-5, FR-8, FR-27, FR-31, FR-40
   Composition (mirrors Office Gallery + extras for this page):
     Header · Page hero · Context-strip back to Centre · Filter strip ·
     Photo grid (15 tiles) · Pre-deployment process reminder ·
     Privacy panel · Closing enquiry CTA band (Hire first) ·
     Footer · WhatsApp FAB
     + Lightbox overlay (real modal · keyboard cycle · Esc closes)
   ================================================================ */

/* ----------------------------------------------------------------
   Local glyphs used on this page only.
---------------------------------------------------------------- */
const TgGlyph = {
  arrowRight:  (<><path d="M5 12h14M13 5l7 7-7 7"/></>),
  arrowLeft:   (<><path d="M19 12H5M11 5 4 12l7 7"/></>),
  arrowUpRight:(<><path d="M7 17 17 7M7 7h10v10"/></>),
};

/* Visibly-flagged copy slot — matches the rest of the site. */
function TgPlaceholder({ children }) {
  return <span className="copy-placeholder">{children}</span>;
}

/* ----------------------------------------------------------------
   Canonical photo set — 15 placeholders. Caption + category from
   the SRS table for this page. Trade names spelt exactly per
   canonical-facts §5.1. Aspect ratios mixed for masonry rhythm.
---------------------------------------------------------------- */
const TG_PHOTOS = [
  { id: 1,  cat: "Facility",             caption: "Centre exterior",                              ratio: "4 / 3" },
  { id: 2,  cat: "Facility",             caption: "Training floor — wide shot",                   ratio: "3 / 2" },
  { id: 3,  cat: "Training in progress", caption: "Plastering training",                          ratio: "3 / 4" },
  { id: 4,  cat: "Training in progress", caption: "Tiling training",                              ratio: "1 / 1" },
  { id: 5,  cat: "Trade tests",          caption: "Steel Reinforcement trade test",               ratio: "4 / 3" },
  { id: 6,  cat: "Trade tests",          caption: "Plumbing & Pipefitting trade test",            ratio: "3 / 4" },
  { id: 7,  cat: "Tools & materials",    caption: "Training tools",                               ratio: "1 / 1" },
  { id: 8,  cat: "Training in progress", caption: "Electrical Wiring Installation training",      ratio: "4 / 3" },
  { id: 9,  cat: "Trade tests",          caption: "Cladding Installation trade test",             ratio: "3 / 4" },
  { id: 10, cat: "Records & results",    caption: "Records desk",                                 ratio: "1 / 1" },
  { id: 11, cat: "Facility",             caption: "Workshop area",                                ratio: "4 / 3" },
  { id: 12, cat: "Training in progress", caption: "Joinery training",                             ratio: "3 / 4" },
  { id: 13, cat: "Trade tests",          caption: "Curtain Wall Installation trade test",         ratio: "3 / 2" },
  { id: 14, cat: "Tools & materials",    caption: "Tools bench",                                  ratio: "4 / 3" },
  { id: 15, cat: "Records & results",    caption: "Issuing trade-test record",                    ratio: "1 / 1" },
];

const TG_CATEGORIES = [
  "All",
  "Facility",
  "Training in progress",
  "Trade tests",
  "Tools & materials",
  "Records & results",
];

/* ----------------------------------------------------------------
   Decorative gradient placeholder — varied navy / cyan / teal mix.
   Same token palette as the Office Gallery so the two galleries
   feel like one set. 15 presets give every tile a different stop.
---------------------------------------------------------------- */
const TG_TILE_PRESETS = [
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
  { bg: "linear-gradient(140deg, #0B2C54 0%, #15498A 50%, #4DB6AC 100%)", arc: "#4DB6AC" },
  { bg: "linear-gradient(135deg, #103A6B 0%, #1565C0 55%, #00BCD4 100%)", arc: "#00BCD4" },
  { bg: "linear-gradient(160deg, #0A2440 0%, #1565C0 55%, #00ACC1 100%)", arc: "#00ACC1" },
];

/* ----------------------------------------------------------------
   <TgPhoto> — gradient tile content shared between grid tiles and
   the lightbox photo slot.
---------------------------------------------------------------- */
function TgPhoto({ index, caption, big }) {
  const preset = TG_TILE_PRESETS[index % TG_TILE_PRESETS.length];
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
   <TgFilterStrip> — pill-chip row (spec §8.6), `radiogroup`.
---------------------------------------------------------------- */
function TgFilterStrip({ active, onChange, count }) {
  const groupRef = useTgRef(null);
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
    <section className="og-filter-band" aria-label="Filter training and testing photos by category">
      <div className="container og-filter-inner">
        <div
          ref={groupRef}
          role="radiogroup"
          aria-label="Photo categories"
          className="og-filter-row"
          onKeyDown={onKey}
        >
          {TG_CATEGORIES.map((c) => {
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
   <TgPhotoTile> — focusable button. Opens lightbox at this index.
---------------------------------------------------------------- */
function TgPhotoTile({ photo, displayIndex, displayCount, totalIndex, onOpen }) {
  return (
    <button
      type="button"
      className="og-tile"
      style={{ aspectRatio: photo.ratio }}
      onClick={() => onOpen(totalIndex)}
      aria-label={`View photo — ${photo.caption} — ${displayIndex} of ${displayCount}`}
    >
      <TgPhoto index={photo.id - 1} caption={photo.caption}/>
      <span className="og-tile-tag" aria-hidden="true">{photo.cat}</span>
      <span className="og-tile-overlay" aria-hidden="true">
        <span className="og-tile-view">
          View <Icon size={14}>{TgGlyph.arrowRight}</Icon>
        </span>
      </span>
    </button>
  );
}

/* ----------------------------------------------------------------
   <TgLightbox> — modal photo viewer. Identical structure to the
   Office Gallery lightbox; only the overline copy changes.
---------------------------------------------------------------- */
function TgLightbox({ index, photos, onClose, onPrev, onNext, loadState = "ready" }) {
  const closeRef = useTgRef(null);
  const prevRef = useTgRef(null);
  const nextRef = useTgRef(null);

  useTgEffect(() => {
    closeRef.current && closeRef.current.focus();
    const onKey = (e) => {
      if (e.key === "Escape")          { e.preventDefault(); onClose(); }
      else if (e.key === "ArrowLeft")  { e.preventDefault(); onPrev();  }
      else if (e.key === "ArrowRight") { e.preventDefault(); onNext();  }
      else if (e.key === "Tab") {
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
        aria-labelledby="tg-lb-caption"
        onClick={(e) => e.stopPropagation()}
      >
        {loadState === "loading" ? <span className="og-lb-progress" aria-hidden="true"/> : null}

        <header className="og-lb-top">
          <div className="og-lb-top-text">
            <span className="og-lb-over">Training &amp; Testing Gallery</span>
            <h2 id="tg-lb-caption" className="og-lb-caption">{p.caption}</h2>
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
            <TgPhoto index={p.id - 1} caption={p.caption} big/>
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
            <Icon size={16}>{TgGlyph.arrowLeft}</Icon> Previous
          </button>
          <span className="pill-chip og-lb-cat" aria-hidden="true">{p.cat}</span>
          <button
            ref={nextRef}
            type="button"
            className="btn btn-outline-dark btn-small og-lb-nav"
            onClick={onNext}
            aria-label="Next photo"
          >
            Next <Icon size={16}>{TgGlyph.arrowRight}</Icon>
          </button>
        </footer>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   <TgContextStrip> — small panel-card directly below the hero,
   linking back to the Training & Testing Centre page so visitors
   don't get stranded in photos. Lives on a `surface-2` band.
---------------------------------------------------------------- */
function TgContextStrip({ onNavigate }) {
  return (
    <section className="section-alt tg-context-band" aria-label="Looking for the full story">
      <div className="container">
        <aside className="panel-card tg-context">
          <div className="tg-context-body">
            <Eyebrow>The full story</Eyebrow>
            <p className="tg-context-copy">
              <strong>Looking for the full story?</strong>
              {" "}Read how our centre selects, trains and tests workers before
              they leave the country.
            </p>
          </div>
          <div className="tg-context-action">
            <a
              className="link-ghost"
              href="#training-testing-center"
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("training-testing-center"); }}
              aria-label="Visit the Training and Testing Center page"
            >
              Visit Training &amp; Testing Center
              {" "}<Icon size={14}>{TgGlyph.arrowRight}</Icon>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   <TgProcessReminder> — alt-section on `surface-2` echoing the
   pre-deployment process from the Training & Testing Center page,
   so visitors remember the photos are part of a defined process.
---------------------------------------------------------------- */
const TG_PREDEP_STEPS = [
  { n: 1, t: "Select", d: "Worker selected and matched to the demand." },
  { n: 2, t: "Train",  d: "Skills training at our centre." },
  { n: 3, t: "Test",   d: "Trade test against a clear standard; result recorded." },
  { n: 4, t: "Clear",  d: "Medical, visa and ministry formalities completed." },
];

function TgProcessReminder() {
  return (
    <section className="section section-alt" data-screen-label="04 Process reminder">
      <div className="container">
        <SectionHead
          eyebrow="Part of a process"
          title="From selection to deployment, in four steps"
          lead="The photographs above are taken during a defined pre-deployment process — not staged for the camera."
        />
        <div className="steps">
          {TG_PREDEP_STEPS.map((s) => (
            <div className="step" key={s.n}>
              <div className="step-num">{s.n}</div>
              <h3 className="h4">{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Page composition
================================================================ */
function TrainingGallery({ state = "default", onNavigate }) {
  const [activeCat, setActiveCat] = useTgState("All");
  const [lbIndex, setLbIndex]     = useTgState(null);   // null = closed

  // Initial state from URL hash — `:lightbox` opens viewer at photo #5
  // (Steel Reinforcement trade test) so the design demo lands on a
  // canonical-trade caption.
  useTgEffect(() => {
    if (state === "lightbox") setLbIndex(4);
    else setLbIndex(null);
  }, [state]);

  const visible = useTgMemo(() => (
    activeCat === "All" ? TG_PHOTOS : TG_PHOTOS.filter((p) => p.cat === activeCat)
  ), [activeCat]);

  const openAt = useTgCallback((i) => setLbIndex(i), []);
  const close  = useTgCallback(() => setLbIndex(null), []);
  const prev   = useTgCallback(() => setLbIndex((i) => (i - 1 + TG_PHOTOS.length) % TG_PHOTOS.length), []);
  const next   = useTgCallback(() => setLbIndex((i) => (i + 1) % TG_PHOTOS.length), []);

  return (
    <>
      {/* 2 — Compact page hero */}
      <section className="page-hero og-hero" data-screen-label="01 Hero">
        <div className="hero-arc small" aria-hidden="true"/>
        <div className="container og-hero-inner">
          <Eyebrow>Inside our centre</Eyebrow>
          <h1 className="display-l">Training &amp; Testing Gallery</h1>
          <p className="page-hero-lead">
            Our in-house training and trade-testing centre — workers learning,
            trades being tested, results being recorded.
          </p>
        </div>
      </section>

      {/* 3 — Context strip — link back to the Centre page */}
      <TgContextStrip onNavigate={onNavigate}/>

      {/* 4 — Filter / category strip */}
      <TgFilterStrip active={activeCat} onChange={setActiveCat} count={visible.length}/>

      {/* 5 — Photo grid */}
      <section className="section og-grid-section" data-screen-label="02 Grid">
        <div className="container">
          <SectionHead
            eyebrow="Photos"
            title="Our training and testing centre at work"
            lead="Photographs from training sessions, trade tests and the centre itself."
          />
          <div className="og-grid" role="list">
            {visible.map((photo, i) => {
              const totalIdx = TG_PHOTOS.findIndex((q) => q.id === photo.id);
              return (
                <div key={photo.id} role="listitem" className="og-grid-cell">
                  <TgPhotoTile
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

      {/* 7 — Pre-deployment process reminder */}
      <TgProcessReminder/>

      {/* 8 — Photo-courtesy / privacy panel */}
      <section className="section" data-screen-label="05 Privacy">
        <div className="container">
          <aside className="panel-card og-privacy tg-privacy" aria-labelledby="tg-privacy-title">
            <div className="og-privacy-body">
              <Eyebrow>Photos</Eyebrow>
              <h3 id="tg-privacy-title">What's in these photos</h3>
              <p>
                These photos show our training and trade-testing centre in
                operation. Workers and trainers appear with consent. We do
                not publish anyone's identification or personal documents.
              </p>
            </div>
            <div className="og-privacy-actions">
              <a className="link-ghost"
                 href="#office-gallery"
                 onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("office-gallery"); }}
                 aria-label="See the Office Gallery">
                See the Office Gallery
                {" "}<Icon size={14}>{TgGlyph.arrowRight}</Icon>
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* 9 — Closing enquiry CTA band — Hire Workers FIRST */}
      <section className="section contact-band og-closing tg-closing" data-screen-label="06 Enquiry">
        <div className="container contact-band-inner">
          <div>
            <span className="eyebrow" style={{color:"#7fd9e3"}}>Get in touch</span>
            <h2 className="h2" style={{color:"#fff", marginTop:6, maxWidth:"26ch"}}>
              Hire workers trained and tested here
            </h2>
            <p style={{color:"var(--navy-200)", marginTop:8, maxWidth:"56ch"}}>
              Submit a demand and we'll match workers from the cohorts you've
              seen here.
            </p>
          </div>
          <div className="contact-band-ctas">
            <Button variant="hire" size="large"
              onClick={() => onNavigate && onNavigate("demand-submission")}>
              Hire Workers
            </Button>
            <Button variant="apply" size="large"
              onClick={() => onNavigate && onNavigate("worker-registration")}>
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* 6 — Lightbox (renders only when open) */}
      {lbIndex != null ? (
        <TgLightbox
          index={lbIndex}
          photos={TG_PHOTOS}
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

export { TrainingGallery };
