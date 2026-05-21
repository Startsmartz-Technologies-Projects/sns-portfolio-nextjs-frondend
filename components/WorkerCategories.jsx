"use client";
import { Icon, Button, Eyebrow, SectionHead } from "./Primitives";

/* ===============================================================
   Page 7 of 18 — Worker Categories
   Spec: SRS FR-26, FR-27, FR-28 (also FR-1, FR-3, FR-4, FR-5, FR-8)
   Composition: Hero · 7 sector cards (3+3+1) · 9 construction trade
                cards (3 × 3) · 6 other-sector role listings ·
                Single-taxonomy reassurance band · Closing CTA
   =============================================================== */

/* ----------------------------------------------------------------
   Local Lucide-style icons not already in Primitives.
---------------------------------------------------------------- */
const WcGlyph = {
  arrowRight: (<><path d="M5 12h14M13 5l7 7-7 7"/></>),
  arrowUpRight: (<><path d="M7 17 17 7M7 7h10v10"/></>),

  /* Sector header icons (rendered white at 22px in the photo header) */
  hardhat: (
    <>
      <path d="M3 17a9 9 0 0 1 18 0"/>
      <path d="M2 17h20v3H2zM2 21h20"/>
      <path d="M10 8V5h4v3"/>
    </>
  ),
  chefHat: (
    <>
      <path d="M6 13a4 4 0 0 1-1-7.8 5 5 0 0 1 9.8-1A5 5 0 0 1 19 13"/>
      <path d="M6 13v6h12v-6M9 13v6M15 13v6"/>
    </>
  ),
  spray: (
    <>
      <path d="M8 7h6v4H8z"/>
      <path d="M9 11v10h4V11"/>
      <path d="M14 5h4M14 8h4M14 11h4"/>
    </>
  ),
  factory: (
    <>
      <path d="M3 21V11l5 3V11l5 3V8l5 3v10z"/>
      <path d="M3 21h18M9 17h2M14 17h2"/>
    </>
  ),
  sprout: (
    <>
      <path d="M7 20s.5-7 5-7M17 20s-.5-7-5-7M12 13v8"/>
      <path d="M9 9a4 4 0 0 1 6 0M12 5v4"/>
    </>
  ),
  steering: (
    <>
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="2"/>
      <path d="M12 3v7M12 14v7M5 12h5M14 12h5"/>
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5z"/>
      <path d="m3 13 9 5 9-5M3 18l9 5 9-5"/>
    </>
  ),

  /* Trade-card icons (rendered navy-500 at 26px inside navy-50 tile) */
  rebar: (
    <>
      <path d="M3 6h18M3 12h18M3 18h18"/>
      <path d="m4 3 4 18M10 3l4 18M16 3l4 18"/>
    </>
  ),
  trowel: (
    <>
      <path d="m3 21 5-5"/>
      <path d="M9 15 18 6a2.83 2.83 0 1 0-4-4L5 11l4 4z"/>
      <path d="m9 15 3-3"/>
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1"/>
      <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
    </>
  ),
  wrench: (
    <>
      <path d="M14.7 6.3a4 4 0 1 0 5 5L21 13l-7 7a2 2 0 0 1-3 0l-3-3 8-8z"/>
    </>
  ),
  plug: (
    <>
      <path d="M9 2v6M15 2v6"/>
      <path d="M7 8h10v4a5 5 0 0 1-10 0z"/>
      <path d="M12 17v5"/>
    </>
  ),
  facade: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1"/>
      <path d="M4 9h16M4 15h16M10 3v18M16 3v18"/>
    </>
  ),
  plank: (
    <>
      <rect x="3" y="6" width="18" height="5" rx="1"/>
      <rect x="3" y="13" width="18" height="5" rx="1"/>
      <path d="M8 6v5M14 6v5M11 13v5M17 13v5"/>
    </>
  ),
  glass: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1"/>
      <path d="M12 3v18M3 12h18"/>
      <path d="m4 4 16 16"/>
    </>
  ),
  saw: (
    <>
      <path d="M3 17h13l5-5-5-5H3"/>
      <path d="m6 7 1 2-2 1 1 2-2 1 1 2-2 1"/>
    </>
  ),
};

/* Placeholder wrappers — visibly flagged client slots */
function WcPlaceholder({ children }) {
  return <span className="copy-placeholder">{children}</span>;
}
function WcPlaceholderDark({ children }) {
  return <span className="copy-placeholder copy-placeholder-dark">{children}</span>;
}

/* ----------------------------------------------------------------
   Section 3 — Seven sector cards (canonical order, taxonomy §5.1)
   Construction stays on default grad-globe; the other six get
   subtle per-sector variants drawn from the navy / cyan / teal /
   green range. No hex literals — these are the spec-mentioned
   example gradients.
---------------------------------------------------------------- */
const SECTORS = [
  {
    id: "construction",
    tag: "9 TRADES",
    name: "Construction",
    glyph: WcGlyph.hardhat,
    grad: "var(--grad-globe)",
    desc: "Steel reinforcement, plastering, tiling, plumbing, electrical, formwork and more.",
    link: "View trades",
  },
  {
    id: "hospitality",
    tag: "SECTOR",
    name: "Hospitality & Catering",
    glyph: WcGlyph.chefHat,
    grad: "linear-gradient(135deg, #103A6B 0%, #008CA8 100%)",
    desc: "Cooks and chefs, kitchen helpers, waiters, food-service staff.",
    link: "View roles",
  },
  {
    id: "cleaning",
    tag: "SECTOR",
    name: "Cleaning Services",
    glyph: WcGlyph.spray,
    grad: "linear-gradient(135deg, #15498A 0%, #4DB6AC 100%)",
    desc: "Hospital cleaners, office and industrial cleaners, housekeeping.",
    link: "View roles",
  },
  {
    id: "manufacturing",
    tag: "SECTOR",
    name: "Manufacturing",
    glyph: WcGlyph.factory,
    grad: "linear-gradient(135deg, #0B2C54 0%, #1565C0 100%)",
    desc: "Factory operators and production workers.",
    link: "View roles",
  },
  {
    id: "agriculture",
    tag: "SECTOR",
    name: "Agriculture & Farming",
    glyph: WcGlyph.sprout,
    grad: "linear-gradient(135deg, #103A6B 0%, #4DB6AC 100%)",
    desc: "Farm and plantation workers, poultry-farm workers.",
    link: "View roles",
  },
  {
    id: "drivers",
    tag: "SECTOR",
    name: "Drivers",
    glyph: WcGlyph.steering,
    grad: "linear-gradient(135deg, #0A2440 0%, #00ACC1 100%)",
    desc: "Light, heavy, and equipment drivers.",
    link: "View roles",
  },
  {
    id: "other",
    tag: "SECTOR",
    name: "Other / Unskilled",
    glyph: WcGlyph.layers,
    grad: "linear-gradient(135deg, #15498A 0%, #00ACC1 60%, #4DB6AC 100%)",
    desc: "General labour and roles not listed in the named sectors.",
    link: "View roles",
  },
];

function SectorCard({ id, tag, name, glyph, grad, desc, link, idx }) {
  return (
    <a
      className="sector-card wc-sector-card"
      href={`#${id}`}
      aria-label={`${name} — jump to ${name} details`}
    >
      <div
        className="sector-photo wc-sector-photo"
        style={{ background: grad }}
        aria-hidden="true"
      >
        <div className="sector-photo-stripes"/>
        <span className="sector-tag-pill">{tag}</span>
        <div className="sector-photo-ic">
          <Icon size={26} color="#fff" strokeWidth={1.8}>{glyph}</Icon>
        </div>
        <h3 className="sector-name">{name}</h3>
      </div>
      <div className="sector-body">
        <p>{desc}</p>
        <span className="sector-link">
          {link} <Icon size={14}>{WcGlyph.arrowRight}</Icon>
        </span>
      </div>
    </a>
  );
}

/* ----------------------------------------------------------------
   Section 4 — Nine construction trades (canonical-facts §5.1 /
   FR-27). Order, names and abbreviations are non-negotiable.
---------------------------------------------------------------- */
const TRADES = [
  { tag: "SR",  name: "Steel Reinforcement",          glyph: WcGlyph.rebar,
    desc: "Cutting, bending and fixing steel reinforcement for reinforced-concrete structures." },
  { tag: "PL",  name: "Plastering",                   glyph: WcGlyph.trowel,
    desc: "Internal and external plastering work, ready for finishing." },
  { tag: "TL",  name: "Tiling",                       glyph: WcGlyph.grid,
    desc: "Floor and wall tiling — measurement, cutting, fixing and grouting." },
  { tag: "PPF", name: "Plumbing & Pipefitting",       glyph: WcGlyph.wrench,
    desc: "Domestic and commercial plumbing, pipefitting and water-supply installation." },
  { tag: "EWI", name: "Electrical Wiring Installation", glyph: WcGlyph.plug,
    desc: "Domestic and light-industrial electrical wiring and fixture installation." },
  { tag: "CI",  name: "Cladding Installation",        glyph: WcGlyph.facade,
    desc: "Installation of exterior cladding panels and systems." },
  { tag: "TF",  name: "Timber Formwork",              glyph: WcGlyph.plank,
    desc: "Timber formwork for reinforced-concrete casting." },
  { tag: "CWI", name: "Curtain Wall Installation",    glyph: WcGlyph.glass,
    desc: "Installation of glass and aluminium curtain-wall systems." },
  { tag: "JN",  name: "Joinery",                      glyph: WcGlyph.saw,
    desc: "Carpentry and joinery for fit-out work." },
];

function TradeCard({ tag, name, glyph, desc }) {
  return (
    <article className="svc-card wc-trade-card">
      <div className="wc-trade-card-head">
        <div className="svc-icon" aria-hidden="true">
          <Icon size={26} color="var(--navy-500)" strokeWidth={1.8}>{glyph}</Icon>
        </div>
        <span className="wc-trade-overline" aria-label={`Abbreviation ${tag}`}>{tag}</span>
      </div>
      <h4 className="wc-trade-name">
        {name} <span className="wc-trade-abbr">({tag})</span>
      </h4>
      <p className="wc-trade-desc">{desc}</p>
    </article>
  );
}

/* ----------------------------------------------------------------
   Section 5 — Other sectors role listings.
---------------------------------------------------------------- */
const OTHER_SECTORS = [
  {
    id: "hospitality",
    name: "Hospitality & Catering",
    desc: "Front-of-house and back-of-house roles for hotels, restaurants and catering operators.",
    roles: ["Cooks / chefs", "Kitchen helpers", "Waiters", "Food-service staff"],
  },
  {
    id: "cleaning",
    name: "Cleaning Services",
    desc: "Contract cleaning for healthcare, commercial and residential facilities.",
    roles: ["Hospital cleaners", "Office / industrial cleaners", "Housekeeping"],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    desc: "Factory floor and production-line workers for light and general manufacturing.",
    roles: ["Factory operators", "Production workers"],
  },
  {
    id: "agriculture",
    name: "Agriculture & Farming",
    desc: "Farm, plantation and poultry workers for agricultural operations.",
    roles: ["Farm and plantation workers", "Poultry-farm workers"],
  },
  {
    id: "drivers",
    name: "Drivers",
    desc: "Licensed drivers across vehicle classes — local and long-haul.",
    roles: ["Light drivers", "Heavy drivers", "Equipment drivers"],
  },
  {
    id: "other",
    name: "Other / Unskilled",
    desc: "General labour and roles that do not fit the named sectors above.",
    roles: ["General labour", "Roles not listed above"],
  },
];

function ArrowGlyph({ size = 14 }) {
  return (
    <span className="wc-sub-arrow" aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 24 24"
        style={{ display: "block" }}>
        <defs>
          <linearGradient id="wc-arr-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#00E676"/>
            <stop offset="100%" stopColor="#00BCD4"/>
          </linearGradient>
        </defs>
        <path d="M7 17 17 7M7 7h10v10"
          stroke="url(#wc-arr-grad)" strokeWidth="2.4"
          strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    </span>
  );
}

function OtherSectorBlock({ id, name, desc, roles }) {
  return (
    <section className="wc-other-block" id={id} tabIndex={-1}>
      <div className="wc-sub-head">
        <ArrowGlyph/>
        <span className="wc-sub-head-label">Sector</span>
      </div>
      <h3 className="wc-other-name">{name}</h3>
      <p className="wc-other-desc">{desc}</p>
      <ul className="wc-role-pills" aria-label={`${name} — roles placed`}>
        {roles.map((r, i) => (
          <li key={i}><span className="pill-chip">{r}</span></li>
        ))}
      </ul>
    </section>
  );
}

/* ================================================================
   Page composition
================================================================ */
function WorkerCategories() {
  return (
    <>
      {/* 2 — Compact page hero */}
      <section className="page-hero wc-hero" data-screen-label="01 Hero">
        <div className="hero-arc small" aria-hidden="true"/>
        <div className="container wc-hero-inner">
          <Eyebrow>Sectors &amp; Trades</Eyebrow>
          <h1 className="display-l wc-hero-h">Worker Categories</h1>
          <p className="page-hero-lead">
            We place skilled, semi-skilled and unskilled workers across seven
            sectors. Construction is broken out into nine named trades.
          </p>
        </div>
      </section>

      {/* 3 — Sector grid (3 + 3 + 1) */}
      <section className="section wc-sectors" data-screen-label="02 Sectors">
        <div className="container">
          <SectionHead
            eyebrow="By sector"
            title="Seven sectors we serve"
            lead="Seven sectors covering the full range of roles we recruit for — with Construction broken out into nine named trades below."
          />
          <div className="wc-sector-grid">
            {SECTORS.map((s, i) => <SectorCard key={s.id} idx={i} {...s}/>)}
          </div>
        </div>
      </section>

      {/* 4 — Construction nine trades · alt surface */}
      <section
        className="section section-alt wc-construction"
        id="construction"
        tabIndex={-1}
        data-screen-label="03 Construction"
      >
        <div className="container">
          <SectionHead
            eyebrow="Sector 1 of 7"
            title="Construction — nine named trades"
            lead="Nine named construction trades — each one trained and trade-tested at our own centre."
          />
          <div className="wc-trade-grid">
            {TRADES.map((t) => <TradeCard key={t.tag} {...t}/>)}
          </div>
          <p className="wc-trades-foot">
            Trade names and abbreviations follow the national
            construction-trade standard.
          </p>
        </div>
      </section>

      {/* 5 — Other sectors role listings */}
      <section className="section wc-others" data-screen-label="04 Other Sectors">
        <div className="container">
          <SectionHead
            eyebrow="Sectors 2 – 7"
            title="The other six sectors"
            lead="The roles we place across hospitality, cleaning, manufacturing, agriculture, driving and general labour."
          />
          <div className="wc-others-stack">
            {OTHER_SECTORS.map((s) => <OtherSectorBlock key={s.id} {...s}/>)}
          </div>
        </div>
      </section>

      {/* 6 — Single canonical taxonomy reassurance band · alt surface */}
      <section className="section section-alt wc-reassurance" data-screen-label="05 Taxonomy">
        <div className="container">
          <article className="panel-card wc-taxonomy-card">
            <div className="wc-taxonomy-bar" aria-hidden="true"/>
            <div className="wc-taxonomy-copy">
              <Eyebrow>One taxonomy</Eyebrow>
              <h3>The same list everywhere</h3>
              <p>
                The sectors and trades shown above match the chips on the
                <strong> Worker Registration</strong> form exactly &mdash; so
                a worker who self-identifies on this page will find the same
                labels on the form. One canonical list, used site-wide
                (SRS&nbsp;AC-5).
              </p>
            </div>
            <div className="wc-taxonomy-actions">
              <a className="link-ghost wc-taxonomy-link"
                 href="#apply"
                 aria-label="Apply as a worker — opens the Worker Registration form">
                Apply as a worker
                <Icon size={14} name="arrow-up-right"/>
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* 7 — Closing enquiry CTA band */}
      <section className="section contact-band" data-screen-label="06 Enquiry">
        <div className="container contact-band-inner">
          <div>
            <span className="eyebrow" style={{color:"#7fd9e3"}}>Get in touch</span>
            <h2 className="h2" style={{color:"#fff", marginTop:6, maxWidth:"24ch"}}>
              Looking to recruit or to apply?
            </h2>
            <p style={{color:"var(--navy-200)", marginTop:8, maxWidth:"56ch"}}>
              Tell us whether you are hiring or looking for work — our team
              will take it from there.
            </p>
          </div>
          <div className="contact-band-ctas">
            <Button variant="apply" size="large">Apply Now</Button>
            <Button variant="outline-dark" size="large">Hire Workers</Button>
          </div>
        </div>
      </section>
    </>
  );
}

export { WorkerCategories };
