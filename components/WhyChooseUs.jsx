"use client";
import { Icon, Button, Eyebrow, SectionHead } from "./Primitives";
import { TrustStrip } from "./TrustStrip";

/* ===============================================================
   Page 3 of 18 — Why Choose Us
   Spec: SRS FR-20 (also FR-1, FR-3, FR-4, FR-5, FR-8)
   =============================================================== */

/* ----------------------------------------------------------------
   Local icons — Lucide-style line glyphs the shared Primitives set
   doesn't ship. Rendered via Icon's `children` slot so stroke /
   sizing rules stay consistent with the rest of the system.
---------------------------------------------------------------- */
const WcuGlyph = {
  shieldCheck: (
    <>
      <path d="M12 2 4 5v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5l-8-3z"/>
      <path d="m9 12 2 2 4-4"/>
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="6"/>
      <path d="m8.5 13.5-2 7L12 18l5.5 2.5-2-7"/>
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5"/>
      <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2"/>
    </>
  ),
  clipboardCheck: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2"/>
      <path d="M9 4h6v3H9z"/>
      <path d="m9.5 13.5 2 2 4-4"/>
    </>
  ),
  scale: (
    <>
      <path d="M12 3v18M5 21h14"/>
      <path d="M7 6h10M12 6l-5 8a4 4 0 0 0 6 0L12 6l5 8a4 4 0 0 0 6 0"/>
    </>
  ),
  handshake: (
    <>
      <path d="m11 17 2 2a2 2 0 0 0 3-3"/>
      <path d="m14 16 3 3a2 2 0 0 0 3-3l-5-5"/>
      <path d="M3 13 8 8l3 3-2 2a2 2 0 0 0 3 3l5-5 3 3"/>
      <path d="m21 13-3-3M3 13l3 3"/>
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2"/>
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>
    </>
  ),
  userCheck: (
    <>
      <circle cx="9" cy="8" r="3.2"/>
      <path d="M3 21v-1.5a6 6 0 0 1 12 0V21"/>
      <path d="m16 12 2 2 4-4"/>
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.4"/>
      <circle cx="5" cy="19" r="2.4"/>
      <circle cx="19" cy="19" r="2.4"/>
      <path d="M12 7.5v4M6.5 17 11 12.5M17.5 17 13 12.5"/>
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </>
  ),
};

/* Placeholder wrapper — visually flagged copy slot the client must fill */
function WcuPlaceholder({ children, lines = 1 }) {
  return <span className="copy-placeholder" data-lines={lines}>{children}</span>;
}

function WhyChooseUs() {
  return (
    <>
      {/* 2 — Compact page hero */}
      <section className="page-hero wcu-hero" data-screen-label="01 Hero">
        <div className="hero-arc small" aria-hidden="true"/>
        <div className="container wcu-hero-inner">
          <Eyebrow>Why choose us</Eyebrow>
          <h1 className="display-l">
            Why employers, workers and agents choose SNS Overseas
          </h1>
          <p className="page-hero-lead">
            A government licence, BAIRA membership, our own training and
            trade-testing centre, and a worker-first approach — the reasons
            we are trusted on every side of a placement.
          </p>
        </div>
      </section>

      {/* 3 — Trust strip immediately below the hero on white */}
      <div className="wcu-trust-wrap" data-screen-label="02 Trust">
        <TrustStrip/>
      </div>

      {/* 4 — Six differentiator cards (3x2 grid) */}
      <section className="section section-alt" data-screen-label="03 Differentiators">
        <div className="container">
          <SectionHead
            eyebrow="What sets us apart"
            title="Why employers and workers pick us"
            lead="Six reasons SNS Overseas is a recruitment partner you can rely on."
          />
          <div className="svc-grid svc-grid-3">
            <DifferentiatorCard
              glyph={WcuGlyph.shieldCheck}
              title="Government-licensed agency"
              body={<>Recruiting Licence <strong>RL-2567</strong> issued by BMET
                (Ministry of Expatriates' Welfare and Overseas Employment) —
                verifiable and current.</>}
            />
            <DifferentiatorCard
              glyph={WcuGlyph.award}
              title="BAIRA member"
              body="Recognised by the Bangladesh Association of International Recruiting Agencies — held to the industry's professional standards."
            />
            <DifferentiatorCard
              glyph={WcuGlyph.building}
              title="In-house training centre"
              body="Our own facility for skills development — workers arrive job-ready, not unprepared."
            />
            <DifferentiatorCard
              glyph={WcuGlyph.clipboardCheck}
              title="In-house trade testing"
              body="Practical trade tests at our own centre certify competence before deployment."
            />
            <DifferentiatorCard
              glyph={WcuGlyph.scale}
              title="Regulatory compliance"
              body="Operating under the Overseas Employment and Migrants Act, 2013 — every deployment follows the legal process."
            />
            <DifferentiatorCard
              glyph={WcuGlyph.handshake}
              title="Ethical recruitment"
              body="Worker-first practices, transparent terms, and no shortcuts on documentation, fitness or training."
            />
          </div>
        </div>
      </section>

      {/* 5 — Training & Testing feature band */}
      <section className="feature-band" data-screen-label="04 Training">
        <div className="hero-arc" aria-hidden="true"/>
        <div className="container feature-band-grid">
          <div className="feature-band-copy">
            <Eyebrow>Our facility</Eyebrow>
            <h2 className="h2">Our own training and trade-testing centre.</h2>
            <p className="feature-lead">
              Running skills training and trade testing under one roof means
              every worker is prepared and assessed before deployment — so
              employers receive job-ready candidates on a faster, more
              predictable timeline.
            </p>
            <ul className="feature-band-bullets">
              <li>Skills development for nine named construction trades</li>
              <li>Practical trade-tests at our own centre</li>
              <li>Workers arrive screened, trained and tested</li>
              <li>Faster, more predictable deployment timelines</li>
            </ul>
            <div className="feature-band-ctas">
              <Button as="a" href="#" variant="outline-dark" size="default">
                Visit the centre <Icon size={16}>{WcuGlyph.arrowRight}</Icon>
              </Button>
            </div>
          </div>
          {/* Right — facility photo, falls back to grad-globe placeholder */}
          <figure className="facility-frame" aria-label="Training and testing centre — photo placeholder">
            <div className="facility-inner">
              <div className="facility-arc" aria-hidden="true"/>
              <span className="facility-tag">
                <Icon name="building" size={12} color="#fff"/> Training centre
              </span>
              <div className="facility-note">
                Photo of the in-house training &amp; trade-testing facility
                <em>[Client to supply WebP/AVIF · 4:3 · lazy-loaded]</em>
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* 6 — What this means for each audience */}
      <section className="section" data-screen-label="05 For you">
        <div className="container">
          <SectionHead
            eyebrow="For each of you"
            title="What this means for you"
            lead="What our licence, facility and ethics mean for employers, job seekers and agents."
          />
          <div className="aud-grid">
            <AudienceCard
              overline="For employers"
              glyph={WcuGlyph.briefcase}
              title="A reliable supply chain of vetted workers"
              body="Licensed sourcing, in-house screening and trade-testing, and Migrants-Act-compliant paperwork — so each deployment is predictable, traceable, and on-time."
              href="#"
            />
            <AudienceCard
              overline="For job seekers"
              glyph={WcuGlyph.userCheck}
              title="A regulated, well-trained route abroad"
              body="A BMET-licensed agency, training and trade-testing under one roof, and no shortcuts on documentation or fitness — so you arrive ready and protected."
              href="#"
            />
            <AudienceCard
              overline="For agents"
              glyph={WcuGlyph.network}
              title="A licensed partner you can refer to with confidence"
              body="RL-2567 and BAIRA-recognised, with the training capacity to back the candidates you send us — refer your community without risking their trust."
              href="#"
            />
          </div>
        </div>
      </section>

      {/* 7 — Closing enquiry CTA band */}
      <section className="section contact-band" data-screen-label="06 Enquiry">
        <div className="container contact-band-inner">
          <div>
            <span className="eyebrow" style={{color:"#7fd9e3"}}>Get in touch</span>
            <h2 className="h2" style={{color:"#fff", marginTop:6}}>Ready to work with us?</h2>
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

/* ----------------------------------------------------------------
   Sub-components
---------------------------------------------------------------- */
function DifferentiatorCard({ glyph, title, body }) {
  return (
    <article className="svc-card">
      <div className="svc-icon" aria-hidden="true">
        <Icon size={22} color="var(--navy-500)">{glyph}</Icon>
      </div>
      <div className="svc-card-body">
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    </article>
  );
}

function AudienceCard({ overline, glyph, title, body, href }) {
  return (
    <article className="aud-card">
      <header className="aud-head">
        <div className="aud-tile" aria-hidden="true">
          <Icon size={20}>{glyph}</Icon>
        </div>
        <span className="aud-overline">{overline}</span>
      </header>
      <h3>{title}</h3>
      <p>{body}</p>
      <a className="aud-link" href={href} aria-label={`Learn more — ${overline}`}>
        Learn more <Icon size={14}>{WcuGlyph.arrowRight}</Icon>
      </a>
    </article>
  );
}

export { WhyChooseUs };
