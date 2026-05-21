"use client";
import { Icon, Button, Eyebrow, SectionHead, LicencePill } from "./Primitives";

/* ===============================================================
   Page 11 of 18 — Credentials & Documentation
   Spec: SRS FR-34 (also FR-1, FR-3, FR-4, FR-5, FR-8)
   Composition: Hero · Headline credentials strip · 5 doc cards
                · Sample demand letter highlight · Privacy band
                · How-to-verify · Closing enquiry CTA
   =============================================================== */

/* ----------------------------------------------------------------
   Local Lucide-style glyphs. Documents differ by icon hint so the
   five tiles read as distinct kinds at a glance.
---------------------------------------------------------------- */
const DocGlyph = {
  /* Document-with-stamp — recruiting licence: page + a notarial
     stamp/seal circle in the lower-right corner. */
  stamp: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/>
      <path d="M14 3v6h6"/>
      <path d="M20 3l-6 6"/>
      <circle cx="17.5" cy="17.5" r="3.5"/>
      <path d="M15.8 17.5h3.4"/>
    </>
  ),
  /* Plain document — generic credential */
  doc: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
      <path d="M14 3v6h6"/>
      <path d="M8 13h6M8 17h4"/>
    </>
  ),
  /* Document with Bangla-script glyph hint (lines + a small arc loop) */
  docScript: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
      <path d="M14 3v6h6"/>
      <path d="M8 13h2.5a1.5 1.5 0 1 1 0 3H8"/>
      <path d="M13 13v3.5"/>
      <path d="M8 17.5h7"/>
    </>
  ),
  /* Document — translated (two-page overlap) */
  docTranslated: (
    <>
      <path d="M16 8H8a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V12z"/>
      <path d="M16 8v4h4"/>
      <path d="M10 1h6l4 4v9"/>
      <path d="M10 14h6M10 18h4"/>
    </>
  ),
  /* Document with globe — certificate of incorporation */
  docGlobe: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/>
      <path d="M14 3v6h6"/>
      <circle cx="17.5" cy="17.5" r="3.5"/>
      <path d="M14 17.5h7M17.5 14a6 6 0 0 1 0 7"/>
    </>
  ),
  /* Demand letter — page with arrow descending to a recipient line */
  letter: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
      <path d="M14 3v6h6"/>
      <path d="M8 13h8M8 16h6M8 19h4"/>
    </>
  ),
  shieldCheck: (
    <>
      <path d="M12 2 4 5v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5l-8-3z"/>
      <path d="m9 12 2 2 4-4"/>
    </>
  ),
  arrowRight: <><path d="M5 12h14M13 5l7 7-7 7"/></>,
  download:   <><path d="M12 4v12M7 11l5 5 5-5M5 20h14"/></>,
  external:   <><path d="M7 17 17 7M7 7h10v10"/></>,
  eye:        <><circle cx="12" cy="12" r="3"/><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/></>,
  building:   <><path d="M4 21V5l8-3 8 3v16M9 9h2M13 9h2M9 13h2M13 13h2M9 17h2M13 17h2"/></>,
};

/* Placeholder wrapper — visually flagged client slot */
function CrPlaceholder({ children }) {
  return <span className="copy-placeholder">{children}</span>;
}

/* ----------------------------------------------------------------
   Trade Licence variant of the trust strip — per the brief, the
   fourth tile here swaps "In-house Training" for "Trade Licence".
---------------------------------------------------------------- */
function CredentialsTrustStrip() {
  const items = [
    { icon: "shield-check", t: "Licence RL-2567",  s: "Issued by BMET" },
    { icon: "users",        t: "BAIRA Member",     s: "Recognised association" },
    { icon: "building",     t: "Govt. Regulated",  s: "Migrants Act, 2013" },
    { icon: "file-text",    t: "Trade Licence",    s: "TRAD/DNCC/054873/2022" },
  ];
  return (
    <div className="container trust-wrap cr-trust-wrap">
      <div className="trust-strip">
        {items.map((it, i) => (
          <div className="trust-item" key={i}>
            <div className="trust-tile">
              <Icon name={it.icon} size={18} color="#fff"/>
            </div>
            <div className="trust-txt">
              <div className="trust-t">{it.t}</div>
              <div className="trust-s">{it.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Canonical five core documents — order & titles from
   canonical-facts.md / SRS FR-34. Do not edit names or numbers.
---------------------------------------------------------------- */
const CORE_DOCS = [
  {
    glyph: DocGlyph.stamp,
    title: "Recruiting Agency Licence",
    meta: "RL-2567 · Issued by BMET",
    verified: true,
    download: false, // client decides — defaults to no
    ariaTail: "Recruiting Agency Licence RL-2567",
  },
  {
    glyph: DocGlyph.doc,
    title: "BAIRA Membership Certificate",
    meta: "Bangladesh Association of International Recruiting Agencies",
    verified: true,
    download: false,
    ariaTail: "BAIRA Membership Certificate",
  },
  {
    glyph: DocGlyph.docScript,
    title: "Trade Licence — Bangla original",
    meta: "TRAD/DNCC/054873/2022 · Dhaka North City Corporation",
    verified: true,
    download: false,
    ariaTail: "Trade Licence — Bangla original",
  },
  {
    glyph: DocGlyph.docTranslated,
    title: "Trade Licence — translated",
    meta: "English translation of the Trade Licence",
    verified: true,
    download: true, // illustrative — translated copy is safe to share
    ariaTail: "Trade Licence — translated",
  },
  {
    glyph: DocGlyph.docGlobe,
    title: "Certificate of Incorporation",
    meta: "Registrar of Joint Stock Companies & Firms",
    verified: true,
    download: false,
    ariaTail: "Certificate of Incorporation",
  },
];

function DocCard({ glyph, title, meta, verified, download, ariaTail }) {
  return (
    <article className="doc-card" aria-label={verified ? "Verified document" : undefined}>
      <div className="doc-thumb" aria-hidden="true">
        <Icon size={42} strokeWidth={1.6} color="var(--navy-500)">{glyph}</Icon>
        {verified ? (
          <span className="doc-verified" aria-hidden="true">
            <Icon size={11} color="#fff" strokeWidth={3}>
              <path d="m5 12 5 5 9-11"/>
            </Icon>
            VERIFIED
          </span>
        ) : null}
      </div>
      <div className="doc-body">
        <h4 className="doc-title">{title}</h4>
        <p className="doc-meta">{meta}</p>
        <div className="doc-actions">
          <a className="doc-link" href="#"
             onClick={(e) => e.preventDefault()}
             aria-label={`View document — ${ariaTail}`}>
            View document <Icon size={13} color="currentColor">{DocGlyph.arrowRight}</Icon>
          </a>
          {download ? (
            <a className="doc-download" href="#"
               onClick={(e) => e.preventDefault()}
               aria-label={`Download PDF — ${ariaTail}`}>
              <Icon size={13} color="currentColor">{DocGlyph.download}</Icon> Download PDF
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/* ----------------------------------------------------------------
   Sample demand letter — single wider doc-card spanning two columns
---------------------------------------------------------------- */
function SampleDemandCard({ onNavigate }) {
  return (
    <article className="doc-card doc-card-wide" aria-label="Sample document">
      <div className="doc-thumb doc-thumb-wide" aria-hidden="true">
        <Icon size={56} strokeWidth={1.5} color="var(--navy-500)">{DocGlyph.letter}</Icon>
        <span className="doc-sample" aria-hidden="true">SAMPLE</span>
      </div>
      <div className="doc-body doc-body-wide">
        <Eyebrow>Sample</Eyebrow>
        <h4 className="doc-title-wide">Sample Demand Letter</h4>
        <p className="doc-desc">
          An anonymised template of the kind of demand letter employers send
          us to start a recruitment. Use it as a guide if you are preparing
          one.
        </p>
        <div className="doc-wide-actions">
          <Button as="a" href="#" variant="outline" size="default"
            onClick={(e) => e.preventDefault()}
            aria-label="View sample — Sample Demand Letter">
            View sample <Icon size={14}>{DocGlyph.arrowRight}</Icon>
          </Button>
          <a className="link-ghost" href="#/demand-submission"
             onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("demand-submission"); }}
             aria-label="Submit a real demand — opens the demand-submission form">
            Submit a real demand <Icon size={14}>{DocGlyph.external}</Icon>
          </a>
        </div>
      </div>
    </article>
  );
}

/* ----------------------------------------------------------------
   How to verify — spec-list (3 short steps) + a larger licence-pill
   anchor block to the right.
---------------------------------------------------------------- */
const VERIFY_STEPS = [
  {
    t: "Note the licence number",
    body: (
      <>Recruiting Licence <strong>RL-2567</strong>, issued by BMET
      (Ministry of Expatriates&apos; Welfare and Overseas Employment).</>
    ),
  },
  {
    t: "Check on the BMET register",
    body: (
      <>Every BMET-licensed agency is listed on the Ministry&apos;s
      public records.</>
    ),
  },
  {
    t: "Reach out if you need confirmation",
    body: (
      <>Contact us directly and we can guide you to the right source.</>
    ),
  },
];

/* ================================================================
   Page composition
================================================================ */
function Credentials({ onNavigate }) {
  const go = (r) => () => onNavigate && onNavigate(r);
  return (
    <>
      {/* 2 — Compact page hero */}
      <section className="page-hero cr-hero" data-screen-label="01 Hero">
        <div className="hero-arc small" aria-hidden="true"/>
        <div className="container cr-hero-inner">
          <Eyebrow>Verifiable credentials</Eyebrow>
          <h1 className="display-l">Credentials & Documentation</h1>
          <p className="page-hero-lead">
            Every credential we hold, available to view. Where a document is
            safe to share, you can download a copy.
          </p>
        </div>
      </section>

      {/* 3 — Headline credentials strip (Trade Licence variant) */}
      <section className="cr-strip-section" data-screen-label="02 Trust strip">
        <CredentialsTrustStrip/>
      </section>

      {/* 4 — Document grid: five core documents */}
      <section className="section section-alt cr-docs" data-screen-label="03 Documents">
        <div className="container">
          <SectionHead
            eyebrow="Official documents"
            title="Our credentials, on the record"
            lead="The official record of how SNS Overseas is licensed, registered and recognised."
          />
          <div className="doc-grid">
            {CORE_DOCS.map((d, i) => <DocCard key={i} {...d}/>)}
          </div>
        </div>
      </section>

      {/* 5 — Sample demand letter highlight */}
      <section className="section cr-sample" data-screen-label="04 Sample">
        <div className="container">
          <SectionHead
            eyebrow="Demand letter"
            title="A sample demand letter for employers"
            lead="Shown on its own because it sits at the intersection of credential and what to expect — preview the format before you draft one."
          />
          <SampleDemandCard onNavigate={onNavigate}/>
        </div>
      </section>

      {/* 6 — Privacy band: what we removed */}
      <section className="section section-alt cr-privacy" data-screen-label="05 Privacy">
        <div className="container">
          <aside className="panel-card cr-privacy-card">
            <div className="cr-privacy-bar" aria-hidden="true"/>
            <div className="cr-privacy-copy">
              <Eyebrow>Privacy</Eyebrow>
              <h3>Documents are reviewed before publication</h3>
              <p>
                Before any document is published here, our team reviews it to
                ensure no personal data — names, ID numbers, addresses — is
                visible. If you need a verified copy of a credential with the
                original markings, please contact us directly.
              </p>
            </div>
            <div className="cr-privacy-link">
              <a className="link-ghost" href="#/privacy-notice"
                 onClick={(e) => e.preventDefault()}
                 aria-label="Read the Privacy Notice">
                Read the Privacy Notice <Icon size={14}>{DocGlyph.arrowRight}</Icon>
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* 7 — How to verify our licence */}
      <section className="section cr-verify" data-screen-label="06 Verify">
        <div className="container">
          <SectionHead
            eyebrow="Verification"
            title="How to verify our recruiting licence"
            lead="Three short steps. We've kept the wording simple — flag any clarifications you need and we'll refine before publish."
          />
          <div className="cr-verify-grid">
            <ol className="spec-list cr-verify-list">
              {VERIFY_STEPS.map((s, i) => (
                <li key={i}>
                  <span className="spec-marker" aria-hidden="true">
                    <Icon size={12} color="currentColor" strokeWidth={2.5}>
                      <path d="M5 12h14M13 5l7 7-7 7"/>
                    </Icon>
                  </span>
                  <div>
                    <h4>{`Step ${i + 1} — ${s.t}`}</h4>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <aside
              className="cr-verify-anchor"
              role="img"
              aria-label="BMET-licensed — licence number RL-2567">
              <span className="cr-verify-eyebrow">Our licence</span>
              <span className="cr-verify-pill">
                <LicencePill>BMET Licensed · RL-2567</LicencePill>
              </span>
              <p className="cr-verify-foot">
                Issued by the Bureau of Manpower, Employment &amp; Training
                under the Ministry of Expatriates&apos; Welfare and Overseas
                Employment, Government of the People&apos;s Republic of Bangladesh.
              </p>
              <span className="cr-verify-draft" aria-hidden="true">
                Draft wording — refine with client
              </span>
            </aside>
          </div>
        </div>
      </section>

      {/* 8 — Closing enquiry CTA band */}
      <section className="section contact-band" data-screen-label="07 Enquiry">
        <div className="container contact-band-inner">
          <div>
            <span className="eyebrow" style={{color:"#7fd9e3"}}>Get in touch</span>
            <h2 className="h2" style={{color:"#fff", marginTop:6}}>
              Verified, regulated, and ready to work with you
            </h2>
            <p style={{color:"var(--navy-200)", marginTop:6, maxWidth:"56ch"}}>
              Tell us whether you are hiring or looking for work — our team will take it from there.
            </p>
          </div>
          <div className="contact-band-ctas">
            <Button variant="apply" size="large" onClick={go("worker-registration")}>Apply Now</Button>
            <Button variant="outline-dark" size="large" onClick={go("demand-submission")}>Hire Workers</Button>
          </div>
        </div>
      </section>
    </>
  );
}

export { Credentials };
