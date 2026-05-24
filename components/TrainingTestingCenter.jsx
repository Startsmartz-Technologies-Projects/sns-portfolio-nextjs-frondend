"use client";
import { Icon, Button, Eyebrow, SectionHead } from "./Primitives";
import { FACILITY_IMAGES, FACILITY_HERO_IMAGE } from "./mediaAssets";

/* ===============================================================
   Page 9 of 18 — Training & Testing Center
   Spec: SRS FR-29, FR-30, FR-31 (also FR-1, FR-3, FR-4, FR-5, FR-8)
   Primary audience: overseas employers.
   =============================================================== */

const TcGlyph = {
  arrowRight: (
    <>
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17 17 7M7 7h10v10"/>
    </>
  ),
  hardhat: (
    <>
      <path d="M3 17a9 9 0 0 1 18 0"/>
      <path d="M2 21h20"/>
      <path d="M2 17h20v3H2z"/>
      <path d="M10 8V5h4v3"/>
    </>
  ),
  clipboardCheck: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2"/>
      <path d="M9 4h6v3H9z"/>
      <path d="m9.5 13.5 2 2 4-4"/>
    </>
  ),
  certificate: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2"/>
      <path d="M7 9h10M7 12h6"/>
      <circle cx="16" cy="18" r="2.4"/>
      <path d="m14.5 19.5-1 3 2.5-1 2.5 1-1-3"/>
    </>
  ),
  shield: (
    <>
      <path d="M12 2 4 5v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5l-8-3z"/>
      <path d="m9 12 2 2 4-4"/>
    </>
  ),
  building: (
    <>
      <path d="M4 21V5l8-3 8 3v16M9 9h2M13 9h2M9 13h2M13 13h2M9 17h2M13 17h2"/>
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2"/>
      <path d="M9 4h6v3H9zM9 12h6M9 16h4"/>
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="6"/>
      <path d="m8.5 14-2 7 5.5-3 5.5 3-2-7"/>
    </>
  ),
};

/* Placeholder wrapper — visibly flagged client slot */
function TcPlaceholder({ children }) {
  return <span className="copy-placeholder">{children}</span>;
}
function TcPlaceholderDark({ children }) {
  return <span className="copy-placeholder copy-placeholder-dark">{children}</span>;
}

/* ----------------------------------------------------------------
   Section 3 — Capability summary (3-up service cards)
---------------------------------------------------------------- */
const CAPABILITIES = [
  {
    glyph: TcGlyph.hardhat,
    title: "Skills training",
    body: "Workers learn the practical skills required for the trade — tools, materials, safety, sequence under supervised instruction.",
  },
  {
    glyph: TcGlyph.clipboardCheck,
    title: "Trade testing",
    body: "Each trade is tested in practice: workers complete a task to a brief, judged against a clear standard.",
  },
  {
    glyph: TcGlyph.certificate,
    title: "Certification & records",
    body: "Workers who pass receive a trade-test record kept on file and made available to the employer.",
  },
];

function CapabilityCard({ glyph, title, body }) {
  return (
    <article className="svc-card">
      <div className="svc-icon" aria-hidden="true">
        <Icon size={24} color="var(--navy-500)">{glyph}</Icon>
      </div>
      <div className="svc-card-body">
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    </article>
  );
}

/* ----------------------------------------------------------------
   Section 4 — The nine construction trades (canonical-facts §5.1 /
   FR-27). Order, names and abbreviations are non-negotiable.
---------------------------------------------------------------- */
const TRADES = [
  { tag: "SR",  name: "Steel Reinforcement" },
  { tag: "PL",  name: "Plastering" },
  { tag: "TL",  name: "Tiling" },
  { tag: "PPF", name: "Plumbing & Pipefitting" },
  { tag: "EWI", name: "Electrical Wiring Installation" },
  { tag: "CI",  name: "Cladding Installation" },
  { tag: "TF",  name: "Timber Formwork" },
  { tag: "CWI", name: "Curtain Wall Installation" },
  { tag: "JN",  name: "Joinery" },
];

function TradeTile({ tag, name }) {
  return (
    <div className="tc-trade">
      <span className="tc-trade-tag" aria-label={`Trade abbreviation ${tag}`}>{tag}</span>
      <span className="tc-trade-name">{name}</span>
    </div>
  );
}

/* ----------------------------------------------------------------
   Section 5 — Pre-deployment steps
---------------------------------------------------------------- */
const PREDEP_STEPS = [
  { n: 1, t: "Select", d: "Worker selected and matched to the demand." },
  { n: 2, t: "Train",  d: "Skills training at our centre to job-readiness." },
  { n: 3, t: "Test",   d: "Trade test against a clear standard; result recorded." },
  { n: 4, t: "Clear",  d: "Medical, visa and ministry formalities completed." },
];

/* ----------------------------------------------------------------
   Section 6 — Facility & activity photo strip
   Varied gradients within the navy / cyan / teal range.
---------------------------------------------------------------- */
const PHOTOS = [
  { tag: "Training floor", grad: "linear-gradient(135deg,#103A6B,#008CA8)",       sub: "Workers under supervised instruction", src: FACILITY_IMAGES["training floor"] },
  { tag: "Trade test",     grad: "linear-gradient(135deg,#15498A,#4DB6AC)",       sub: "Practical assessment in progress",     src: FACILITY_IMAGES["trade test"] },
  { tag: "Tools",          grad: "linear-gradient(135deg,#0B2C54,#1565C0)",       sub: "Trade-specific tools and materials",   src: FACILITY_IMAGES["tools"] },
  { tag: "Workers",        grad: "linear-gradient(135deg,#1565C0,#4DB6AC)",       sub: "Pre-deployment cohort",                src: FACILITY_IMAGES["workers"] },
  { tag: "Records room",   grad: "linear-gradient(135deg,#0A2440,#00ACC1)",       sub: "Trade-test records kept on file",      src: FACILITY_IMAGES["records room"] },
  { tag: "Common area",    grad: "linear-gradient(135deg,#103A6B,#4DB6AC)",       sub: "Shared spaces at the centre",          src: FACILITY_IMAGES["common area"] },
];

function TcPhotoTile({ tag, grad, sub, src, onNavigate }) {
  return (
    <a className="tc-photo"
       href="#/training-testing-gallery"
       onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("training-gallery"); }}
       style={{ "--tc-grad": grad }}
       aria-label={`View photo — ${tag.toLowerCase()} — opens the Training & Testing Gallery`}>
      {src ? (
        <img className="tc-photo-img" src={src} alt={`${tag} — ${sub}`} loading="lazy" decoding="async"/>
      ) : (
        <div className="tc-photo-inner" aria-hidden="true"/>
      )}
      <span className="tc-photo-tag">{tag}</span>
      {!src && <span className="tc-photo-note">[Client photograph]</span>}
      <span className="tc-photo-view">View larger <Icon size={11}>{TcGlyph.arrowUpRight}</Icon></span>
    </a>
  );
}

/* ----------------------------------------------------------------
   Section 7 — Reassurance band (trust-strip idiom, 4-up)
---------------------------------------------------------------- */
const CREDS = [
  { glyph: TcGlyph.shield,    title: "BMET-licensed agency", sub: "Licence RL-2567" },
  { glyph: TcGlyph.building,  title: "Own facility",         sub: "Training and trade testing under one roof" },
  { glyph: TcGlyph.clipboard, title: "Recorded results",     sub: "Trade-test records kept on file" },
  { glyph: TcGlyph.award,     title: "BAIRA member",         sub: "Recognised association" },
];

function CredItem({ glyph, title, sub }) {
  return (
    <div className="trust-item">
      <div className="trust-tile" aria-hidden="true">
        <Icon size={18} color="#fff">{glyph}</Icon>
      </div>
      <div className="trust-txt">
        <div className="trust-t">{title}</div>
        <div className="trust-s">{sub}</div>
      </div>
    </div>
  );
}

/* ================================================================
   Page composition
================================================================ */
function TrainingTestingCenter({ onNavigate }) {
  const go = (r) => () => onNavigate && onNavigate(r);
  const goLink = (r) => (e) => { e.preventDefault(); onNavigate && onNavigate(r); };
  return (
    <>
      {/* 2 — Feature hero on grad-navy (large) */}
      <section className="feature-band tc-hero" data-screen-label="01 Hero">
        <div className="hero-arc" aria-hidden="true"/>
        <div className="container">
          <div className="feature-band-grid">
            <div>
              <Eyebrow>Our facility</Eyebrow>
              <h1 className="display-l">Our own training and trade-testing centre</h1>
              <p className="feature-lead">
                Workers train and trade-test under one roof at our own
                facility, before deployment.
              </p>
              <div className="feature-band-ctas">
                <Button as="a" href="#/training-testing-gallery" variant="outline-dark" size="default" onClick={goLink("training-gallery")}>
                  Visit the Training Gallery <Icon size={16}>{TcGlyph.arrowRight}</Icon>
                </Button>
              </div>
            </div>

            <figure className="facility-frame" aria-label="Training & testing facility">
              <div className="facility-inner">
                <img
                  className="facility-img"
                  src={FACILITY_HERO_IMAGE}
                  alt="SNS Overseas training and testing facility"
                  loading="eager"
                  decoding="async"
                />
                <span className="facility-tag">
                  <Icon size={12} color="#fff">{TcGlyph.building}</Icon> Facility
                </span>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* 3 — Capability summary (3-up) */}
      <section className="section" data-screen-label="02 Inside">
        <div className="container">
          <SectionHead
            eyebrow="What we run"
            title="Inside the centre"
            lead="Skills training, trade testing and record-keeping, all under one roof."
          />
          <div className="svc-grid svc-grid-3">
            {CAPABILITIES.map((c, i) => <CapabilityCard key={i} {...c}/>)}
          </div>
        </div>
      </section>

      {/* 4 — What we test (3 × 3 trade tiles) */}
      <section className="section section-alt" data-screen-label="03 Trades">
        <div className="container">
          <SectionHead
            eyebrow="Trade tests"
            title="Trades tested at our centre"
            lead="The nine named construction trades we test against a clear standard."
          />
          <div className="tc-trade-grid">
            {TRADES.map((t) => <TradeTile key={t.tag} {...t}/>)}
          </div>
          <div className="tc-trade-foot">
            <p>
              Other sectors &mdash; hospitality, cleaning, manufacturing,
              agriculture, drivers &mdash; are screened differently:
              practical assessment without formal trade testing.
            </p>
            <a className="link-ghost" href="#/worker-categories" onClick={goLink("worker-categories")}>
              See all sectors and trades <Icon size={14}>{TcGlyph.arrowRight}</Icon>
            </a>
          </div>
        </div>
      </section>

      {/* 5 — Before the mission (pre-deployment process) */}
      <section className="section" data-screen-label="04 Pre-deployment">
        <div className="container">
          <SectionHead
            eyebrow="Before the mission"
            title="The pre-deployment process"
            lead="Every worker moves through four stages before deployment."
          />
          <div className="steps">
            {PREDEP_STEPS.map((s) => (
              <div className="step" key={s.n}>
                <div className="step-num">{s.n}</div>
                <h4 className="h4">{s.t}</h4>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
          <p className="tc-steps-caption">
            Travel arrangements then follow, through our travel partner{" "}
            <strong>Rahbar Tours and Travels</strong>.
          </p>
        </div>
      </section>

      {/* 6 — Facility & activity photo strip */}
      <section className="section section-alt" data-screen-label="05 Gallery">
        <div className="container">
          <SectionHead
            eyebrow="Inside the centre"
            title="Facility & activity"
            lead="A look inside the centre — training floors, trade-test bays and the records room."
          />
          <div className="tc-photo-grid">
            {PHOTOS.map((p, i) => <TcPhotoTile key={i} {...p} onNavigate={onNavigate}/>)}
          </div>
          <div className="tc-gallery-foot">
            <a className="link-ghost" href="#/training-testing-gallery" onClick={goLink("training-gallery")}>
              See the full Training &amp; Testing Gallery{" "}
              <Icon size={14}>{TcGlyph.arrowRight}</Icon>
            </a>
          </div>
        </div>
      </section>

      {/* 7 — Reassurance band (trust-strip idiom) */}
      <section className="section" data-screen-label="06 Reassurance">
        <div className="container">
          <SectionHead
            eyebrow="Credentials"
            title="Why employers trust our centre"
            align="center"
          />
          <div className="tc-cred-strip" role="list" aria-label="Credentials of the training and testing centre">
            {CREDS.map((c, i) => <CredItem key={i} {...c}/>)}
          </div>
        </div>
      </section>

      {/* 8 — Closing enquiry CTA band — EMPLOYER-LED */}
      <section className="section contact-band tc-closing" data-screen-label="07 Enquiry">
        <div className="container contact-band-inner">
          <div>
            <span className="eyebrow" style={{color:"#7fd9e3"}}>Get in touch</span>
            <h2 className="h2" style={{color:"#fff", marginTop:6, maxWidth:"22ch"}}>
              Hire workers trained and tested by us
            </h2>
            <p style={{color:"var(--navy-200)", marginTop:8, maxWidth:"56ch"}}>
              Recruit workers trained and trade-tested at our own centre
              before they deploy.
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

export { TrainingTestingCenter };
