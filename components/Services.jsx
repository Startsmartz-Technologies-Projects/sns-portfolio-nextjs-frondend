"use client";
import { Icon, Button, Eyebrow, SectionHead } from "./Primitives";

/* ===============================================================
   Page 8 of 18 — Services
   Spec: SRS FR-24, FR-25 (also FR-1, FR-3, FR-4, FR-5, FR-8)
   Composition: Hero · 4×2 service cards · Process · Partner strip ·
                Connector band · Closing enquiry CTA
   =============================================================== */

/* ----------------------------------------------------------------
   Local Lucide-style icons not already in Primitives.
---------------------------------------------------------------- */
const SvcGlyph = {
  handshake: (
    <>
      <path d="m11 17 2 2a2 2 0 0 0 3-3"/>
      <path d="m14 16 3 3a2 2 0 0 0 3-3l-5-5"/>
      <path d="M3 13 8 8l3 3-2 2a2 2 0 0 0 3 3l5-5 3 3"/>
      <path d="m21 13-3-3M3 13l3 3"/>
    </>
  ),
  cap: (
    <>
      <path d="M12 3 1 9l11 6 9-4.9V17"/>
      <path d="M5 13v5l7 3 7-3v-5"/>
    </>
  ),
  clipboardCheck: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2"/>
      <path d="M9 4h6v3H9z"/>
      <path d="m9.5 13.5 2 2 4-4"/>
    </>
  ),
  stethoscope: (
    <>
      <path d="M6 3v6a4 4 0 0 0 8 0V3"/>
      <path d="M6 3h2M12 3h2"/>
      <path d="M10 13v3a4 4 0 0 0 8 0v-1"/>
      <circle cx="18" cy="13" r="2"/>
    </>
  ),
  passport: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2"/>
      <circle cx="12" cy="11" r="3"/>
      <path d="M9 17h6"/>
    </>
  ),
  ministry: (
    <>
      <path d="M3 21h18"/>
      <path d="M5 21V10l7-4 7 4v11"/>
      <path d="M9 21v-6h6v6"/>
      <path d="M9 11h.01M15 11h.01"/>
    </>
  ),
  plane: (
    <>
      <path d="M17 8 22 4l-1 6-8 5 2 7-2 1-3-6-6-3 1-2 7 2 5-8z"/>
    </>
  ),
  folder: (
    <>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <path d="M8 13h8M8 16h5"/>
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </>
  ),
  shield: (
    <>
      <path d="M12 2 4 5v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5l-8-3z"/>
      <path d="m9 12 2 2 4-4"/>
    </>
  ),
  bank: (
    <>
      <path d="M3 10h18L12 3z"/>
      <path d="M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18"/>
    </>
  ),
};

/* Placeholder wrapper — visually flagged client slot */
function SvcPlaceholder({ children }) {
  return <span className="copy-placeholder">{children}</span>;
}

/* ----------------------------------------------------------------
   Exact, canonical service list — order, names & casing from
   canonical-facts.md / SRS FR-24.
---------------------------------------------------------------- */
const SERVICES = [
  {
    glyph: SvcGlyph.handshake,
    title: "Worker Selection & Recruitment",
    body: "Sourcing, screening and selecting skilled and semi-skilled workers matched to employer demand.",
  },
  {
    glyph: SvcGlyph.cap,
    title: "Skills Development Training",
    body: "In-house training preparing workers for trade tests and overseas job-readiness.",
  },
  {
    glyph: SvcGlyph.clipboardCheck,
    title: "Skills & Trade Testing",
    body: "Practical trade testing at our own centre, certifying competence before deployment.",
  },
  {
    glyph: SvcGlyph.stethoscope,
    title: "Medical Fitness Testing",
    body: "Co-ordinated medical fitness testing through our partner medical centre.",
  },
  {
    glyph: SvcGlyph.passport,
    title: "Visa Processing",
    body: "End-to-end visa processing — from documentation to consular submission.",
  },
  {
    glyph: SvcGlyph.ministry,
    title: "Ministry Formalities",
    body: "Completion of all Government and Ministry formalities and clearances.",
  },
  {
    glyph: SvcGlyph.plane,
    title: "Travel Arrangements",
    body: "Travel arrangements through our travel partner so workers reach the destination on time.",
  },
  {
    glyph: SvcGlyph.folder,
    title: "Worker Profile Records",
    body: "Maintenance of structured worker profile records for ongoing client reference.",
  },
];

function ServiceCard({ glyph, title, body }) {
  return (
    <article className="svc-card">
      <div className="svc-icon" aria-hidden="true">
        <Icon size={24} color="var(--navy-500)">{glyph}</Icon>
      </div>
      <h4>{title}</h4>
      <p>{body}</p>
    </article>
  );
}

/* ----------------------------------------------------------------
   Process steps — duplicates the Home page sequence so the message
   reinforces (spec §8.9). Local copy so this page reads stand-alone.
---------------------------------------------------------------- */
const SVC_STEPS = [
  { n: 1, t: "Register",      d: "Worker, employer or agent submits the relevant form." },
  { n: 2, t: "Screen & Train", d: "Selection, skills training and trade testing at our centre." },
  { n: 3, t: "Process",       d: "Medical, visa and ministry formalities completed." },
  { n: 4, t: "Deploy",        d: "Travel arranged; the worker begins overseas employment." },
];

/* ----------------------------------------------------------------
   Partner strip — trust-strip visual idiom (spec §8.3) but used
   for partner organisations. 2-up centred so it reads balanced.
---------------------------------------------------------------- */
const PARTNERS = [
  {
    glyph: SvcGlyph.stethoscope,
    title: "Care Rapid Point (CRP)",
    sub: "Medical partner — Diagnostic & Consultation Centre",
    link: { label: "View medical process", href: "#/medical-report" },
  },
  {
    glyph: SvcGlyph.plane,
    title: "Rahbar Tours and Travels",
    sub: "Travel partner",
    link: null,
  },
];

function PartnerItem({ glyph, title, sub, link }) {
  return (
    <div className="partner-item">
      <div className="partner-tile" aria-hidden="true">
        <Icon size={22} color="#fff">{glyph}</Icon>
      </div>
      <div className="partner-meta">
        <p className="partner-t">{title}</p>
        <p className="partner-s">{sub}</p>
        {link ? (
          <a href={link.href} className="partner-link"
             aria-label={`${link.label} — ${title}`}>
            {link.label} <Icon size={13}>{SvcGlyph.arrowRight}</Icon>
          </a>
        ) : null}
      </div>
    </div>
  );
}

/* ================================================================
   Page composition
================================================================ */
function Services() {
  return (
    <>
      {/* 2 — Compact page hero */}
      <section className="page-hero svc-hero" data-screen-label="01 Hero">
        <div className="hero-arc small" aria-hidden="true"/>
        <div className="container svc-hero-inner">
          <Eyebrow>What we do</Eyebrow>
          <h1 className="display-l">Services</h1>
          <p className="page-hero-lead">
            Eight services covering the full recruitment journey — from
            selecting the right worker to landing them in their new role.
          </p>
        </div>
      </section>

      {/* 3 — Eight service cards (4×2 grid on desktop) */}
      <section className="section" data-screen-label="02 Services">
        <div className="container">
          <SectionHead
            eyebrow="End-to-end"
            title="Eight services we deliver"
            lead="Every step of a placement, handled in-house or with named partners."
          />
          <div className="svc-grid">
            {SERVICES.map((s, i) => <ServiceCard key={i} {...s}/>)}
          </div>
        </div>
      </section>

      {/* 4 — Process steps · alt surface */}
      <section className="section section-alt" data-screen-label="03 Process">
        <div className="container">
          <SectionHead
            eyebrow="How it works"
            title="From demand letter to deployment"
            lead="A typical placement moves through four stages, from first enquiry to deployment."
          />
          <div className="steps">
            {SVC_STEPS.map((s) => (
              <div className="step" key={s.n}>
                <div className="step-num">{s.n}</div>
                <h4 className="h4">{s.t}</h4>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
          <p className="steps-caption">
            A typical sequence — actual flow depends on the role and destination.
          </p>
        </div>
      </section>

      {/* 5 — Partner organisations strip */}
      <section className="section" data-screen-label="04 Partners">
        <div className="container">
          <SectionHead
            eyebrow="Working with"
            title="Partner organisations"
            align="center"
          />
          <div className="partner-strip">
            {PARTNERS.map((p, i) => <PartnerItem key={i} {...p}/>)}
          </div>
          <p className="partner-banking">
            <Icon size={13} color="var(--ink-500)">{SvcGlyph.bank}</Icon>
            Banking partner: <strong>Al-Arafah Islami Bank Ltd.</strong>
          </p>
        </div>
      </section>

      {/* 6 — Why services with us — connector band (alt surface) */}
      <section className="section section-alt" data-screen-label="05 Connector">
        <div className="container">
          <article className="panel-card connector-card">
            <div className="connector-copy">
              <Eyebrow>Why this matters</Eyebrow>
              <h3>All eight under one licensed roof</h3>
              <p>
                Every service above runs through a single accountable team —
                a BMET-licensed agency (RL-2567), BAIRA member, with our own
                in-house training and trade-testing centre. Fewer handoffs,
                clearer documentation, and a worker who arrives prepared.
              </p>
            </div>
            <div className="connector-actions">
              <Button as="a" href="#/credentials" variant="outline" size="default"
                aria-label="See our credentials — license, BAIRA and registration documents">
                See our credentials <Icon size={16}>{SvcGlyph.arrowRight}</Icon>
              </Button>
              <a className="link-ghost" href="#/about/why-choose-us"
                aria-label="Why choose us — the four reasons employers, workers and agents pick SNS Overseas">
                Why choose us <Icon size={14} name="arrow-up-right"/>
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
            <h2 className="h2" style={{color:"#fff", marginTop:6}}>
              Ready to start recruiting or applying?
            </h2>
            <p style={{color:"var(--navy-200)", marginTop:6, maxWidth:"52ch"}}>
              Tell us whether you are hiring or looking for work — our team will take it from there.
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

export { Services };
