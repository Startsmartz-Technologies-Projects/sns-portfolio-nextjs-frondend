"use client";
import { Icon, Button, Eyebrow, SectionHead } from "./Primitives";

/* ===============================================================
   Page 10 of 18 — Clients
   Spec: SRS FR-32, FR-33 (also FR-1, FR-3, FR-4, FR-5, FR-8)
   Composition:
     Hero · Jump strip · Gulf states (SA/UAE/KW/QA/OM) ·
     Malaysia · Caveat band · Become-a-client connector ·
     Closing enquiry CTA
   =============================================================== */

/* ----------------------------------------------------------------
   Local glyphs used on this page only.
---------------------------------------------------------------- */
const ClGlyph = {
  arrowRight: (<><path d="M5 12h14M13 5l7 7-7 7"/></>),
  arrowUpRight: (<><path d="M7 17 17 7M7 7h10v10"/></>),
};

/* Visibly-flagged client copy slot — matches Services / About pages. */
function ClPlaceholder({ children }) {
  return <span className="copy-placeholder">{children}</span>;
}

/* ----------------------------------------------------------------
   Canonical region / country structure (from canonical-facts).
   Order is fixed: SA · UAE · Kuwait · Qatar · Oman · Malaysia.
---------------------------------------------------------------- */
const GULF = [
  {
    id: "sa", name: "Saudi Arabia",
    clients: [
      "Arabian Gulf Co.",
      "Twaik Est.",
      "Zahran Oper. & Main. Co. Ltd.",
      "Khaled Bin Ibrahim Al Babtain Arabian Maintenance & Technical Services Co. Ltd.",
      "Waleed Alhakami Est.",
      "Takweenal Rahadens",
      "Mascoal Ghad Contracting",
      "Gulf Catering Company",
      "Pizza Hut",
      "Gulf Sam",
      "RS Intratech Company",
      "Asloob International Company",
      "Al Afraz Company",
      "Al Manar Company",
      "Saraco",
      "Arasaco",
      "Miswaon",
      "Al Mahara Company",
      "Eyamama",
      "Al Habib Catering",
      "Al Ghad Contracting",
      "Rifka",
      "Afdal Company",
      "Al Osaim Poultry Farm",
      "Al Jaharan",
      "Mowa Water Company",
      "Al Shider Company",
      "Mazal Al Arabia Company",
    ],
  },
  {
    id: "kw", name: "Kuwait",
    clients: [
      "National Cleaning Company",
      "Wael Al-Nusif Trading & Co. W.L.L.",
      "Ghanem Hamd Al-Dabbous",
      "Care Services Kuwait",
      "Damac Draigh General Trading Co.",
    ],
  },
  {
    id: "uae", name: "United Arab Emirates",
    clients: [
      "Damac Al Otaibai",
      "Bel Hasa Projects LLC.",
    ],
  },
];
const MALAYSIA = {
  id: "my", name: "Malaysia",
  clients: [
    "Akasem Industries Sdn. Bhd.",
    "Davex Engineering (M) Sdn. Bhd.",
    "Win Wood Work Sdn. Bhd.",
    "Noble Carpets Sdn. Bhd.",
    "Southern Furniture Sdn. Bhd.",
    "B.T. Industries",
    "Gento Precision Engineering Sdn. Bhd.",
    "Central Malaysia Press Sdn. Bhd.",
    "Madeleine Bakery Cafe Sdn. Bhd.",
    "Tong-Ah Company Sdn. Bhd.",
    "Changann Industries Sdn. Bhd.",
    "Phalenopsis Sdn. Bhd.",
    "Konk Heong Yuen Groundnut Factory Sdn. Bhd.",
    "Electro Plating Sdn. Bhd.",
  ],
};

const ALL_REGIONS = [...GULF, MALAYSIA];

/* ----------------------------------------------------------------
   The client-logo tile (spec §8.5) — the client's name on a white
   surface. Logos can replace the text once the client supplies them.
---------------------------------------------------------------- */
function ClientLogoTile({ name }) {
  return (
    <div className="client-logo">
      <span className="client-logo-name">{name}</span>
    </div>
  );
}

/* Inline arrow-gradient glyph used as the leading marker on
   country sub-heads. */
function SubHeadArrow() {
  return (
    <span className="sub-head-arrow" aria-hidden="true">
      <svg viewBox="0 0 16 16" width="14" height="14">
        <defs>
          <linearGradient id="cl-sub-arrow" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#00E676"/>
            <stop offset="100%" stopColor="#00BCD4"/>
          </linearGradient>
        </defs>
        <path d="M4 12 12 4M5 4h7v7" stroke="url(#cl-sub-arrow)"
              strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
              fill="none"/>
      </svg>
    </span>
  );
}

/* Country sub-head (Sora 600 18 px navy-700 + leading grad arrow). */
function CountrySubHead({ id, name, count }) {
  return (
    <h3 id={id} className="sub-head" tabIndex="-1">
      <SubHeadArrow/>
      <span className="sub-head-name">{name}</span>
      <span className="sub-head-count">{count} {count === 1 ? "client" : "clients"}</span>
    </h3>
  );
}

/* A single country block: sub-head + auto-fill logo grid. */
function CountryGroup({ id, name, clients }) {
  return (
    <div className="country-block">
      <CountrySubHead id={id} name={name} count={clients.length}/>
      <div className="client-logo-grid">
        {clients.map((c, i) => (
          <ClientLogoTile key={i} name={c}/>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Quick-country jump strip — pill-chip row, default state.
   Scrolls programmatically (the page's hash-router would otherwise
   try to treat `#sa` etc. as a top-level route).
---------------------------------------------------------------- */
function JumpStrip() {
  const onJump = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
    // Move focus for keyboard / SR users without scroll-jumping.
    el.focus({ preventScroll: true });
  };
  return (
    <section className="cl-jump-band" aria-labelledby="cl-jump-title">
      <div className="container cl-jump-inner">
        <span id="cl-jump-title" className="cl-jump-label">
          Jump to region
        </span>
        <ul className="cl-jump-list" role="list">
          {ALL_REGIONS.map((r) => (
            <li key={r.id}>
              <a className="pill-chip cl-jump-chip" href={`#${r.id}`}
                 onClick={onJump(r.id)}
                 aria-label={`Jump to ${r.name} clients`}>
                {r.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ================================================================
   Page composition
================================================================ */
function Clients({ onNavigate }) {
  const go = (r) => () => onNavigate && onNavigate(r);
  const goLink = (r) => (e) => { e.preventDefault(); onNavigate && onNavigate(r); };
  return (
    <>
      {/* 2 — Compact page hero */}
      <section className="page-hero cl-hero" data-screen-label="01 Hero">
        <div className="hero-arc small" aria-hidden="true"/>
        <div className="container cl-hero-inner">
          <Eyebrow>Who we work with</Eyebrow>
          <h1 className="display-l">Clients</h1>
          <p className="page-hero-lead">
            Overseas employers we have served, grouped by destination,
            across Saudi Arabia, Kuwait, the UAE and Malaysia.
          </p>
        </div>
      </section>

      {/* 5 — Quick country jump strip (sits between hero and Gulf section) */}
      <JumpStrip/>

      {/* 3 — Region group: Gulf states */}
      <section className="section cl-region" id="gulf" data-screen-label="02 Gulf">
        <div className="container">
          <SectionHead
            eyebrow="Region 1 of 2"
            title="Gulf states"
            lead="Employers across Saudi Arabia, Kuwait and the United Arab Emirates."
          />
          <div className="cl-country-stack">
            {GULF.map((c) => (
              <CountryGroup key={c.id} {...c}/>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Region group: Malaysia · alt surface */}
      <section className="section section-alt cl-region" id="my" tabIndex="-1" data-screen-label="03 Malaysia">
        <div className="container">
          <SectionHead
            eyebrow="Region 2 of 2"
            title="Malaysia"
            lead="Manufacturers, contractors and service businesses across Malaysia."
          />
          {/* No country-level sub-head — Malaysia is the only entry. */}
          <div className="client-logo-grid">
            {MALAYSIA.clients.map((c, i) => (
              <ClientLogoTile key={i} name={c}/>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Caveat / clarification band */}
      <section className="section" data-screen-label="04 Note">
        <div className="container">
          <aside className="panel-card cl-note" aria-labelledby="cl-note-title">
            <span className="cl-note-bar" aria-hidden="true"/>
            <div className="cl-note-body">
              <Eyebrow>Note</Eyebrow>
              <h3 id="cl-note-title">A selected list</h3>
              <p>
                These are overseas employers SNS Overseas has recruited for.
                Clients are listed by name; logos will be added where a client
                has confirmed their mark may be shown publicly. Where a client
                has asked us to keep their identity private, we have respected
                that.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* 7 — Become a client — connector band (alt surface) */}
      <section className="section section-alt" data-screen-label="05 Connector">
        <div className="container">
          <article className="panel-card cl-connector">
            <div className="cl-connector-copy">
              <Eyebrow>Hire through us</Eyebrow>
              <h3>Submit a demand letter</h3>
              <p>
                Send us a demand letter with the trades, numbers and country
                you need. We respond on WhatsApp within one working day and
                walk you through the formal placement process.
              </p>
            </div>
            <div className="cl-connector-actions">
              <Button as="a" href="#/demand-submission" variant="hire" size="default"
                onClick={goLink("demand-submission")}
                aria-label="Submit a demand letter to SNS Overseas">
                Submit a demand <Icon size={16}>{ClGlyph.arrowRight}</Icon>
              </Button>
              <a className="link-ghost" href="#/services"
                onClick={goLink("services")}
                aria-label="See the services we deliver">
                See our services <Icon size={14}>{ClGlyph.arrowUpRight}</Icon>
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* 8 — Closing enquiry CTA — employer-led ordering (Hire first) */}
      <section className="section contact-band cl-closing" data-screen-label="06 Enquiry">
        <div className="container contact-band-inner">
          <div>
            <span className="eyebrow" style={{color:"#7fd9e3"}}>Get in touch</span>
            <h2 className="h2" style={{color:"#fff", marginTop:6, maxWidth:"22ch"}}>
              Looking to recruit?
            </h2>
            <p style={{color:"var(--navy-200)", marginTop:8, maxWidth:"56ch"}}>
              Submit a demand letter and recruit through a fully licensed
              Bangladeshi agency.
            </p>
          </div>
          <div className="contact-band-ctas">
            <Button variant="hire" size="large" onClick={go("demand-submission")}>Hire Workers</Button>
            <Button variant="apply" size="large" onClick={go("worker-registration")}>Apply Now</Button>
          </div>
        </div>
      </section>
    </>
  );
}

export { Clients };
