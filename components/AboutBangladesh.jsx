"use client";
import { Icon, Button, Eyebrow, SectionHead } from "./Primitives";

/* ===============================================================
   Page 6 of 18 — About Bangladesh
   Spec: SRS FR-23 (also FR-1, FR-3, FR-4, FR-5, FR-8)
   Primary audience for this page: overseas employers.
   =============================================================== */

/* ----------------------------------------------------------------
   Local glyphs — Lucide-style line icons not in the shared set.
   Rendered via Icon's children slot so stroke / sizing stay
   consistent with the rest of the system.
---------------------------------------------------------------- */
const AbGlyph = {
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
  graduationCap: (
    <>
      <path d="M12 3 1 9l11 6 9-4.9V17"/>
      <path d="M5 13v5l7 3 7-3v-5"/>
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9"/>
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
    </>
  ),
  flag: (
    <>
      <path d="M4 21V4"/>
      <path d="M4 4h12l-2 4 2 4H4"/>
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3"/>
      <circle cx="17" cy="9" r="2.4"/>
      <path d="M2 21v-1a6 6 0 0 1 12 0v1M15 21v-1a5 5 0 0 1 7 0"/>
    </>
  ),
  school: (
    <>
      <path d="M4 21V10l8-5 8 5v11"/>
      <path d="M9 21v-6h6v6"/>
      <path d="M2 10h20"/>
    </>
  ),
  tools: (
    <>
      <path d="M14.7 6.3a4 4 0 1 0 5 5L21 13l-7 7a2 2 0 0 1-3 0l-3-3 8-8z"/>
      <path d="m4 4 5 5"/>
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
};

/* Placeholder wrappers — visibly flagged copy slots the client must fill */
function AbPlaceholder({ children, lines = 1 }) {
  return <span className="copy-placeholder" data-lines={lines}>{children}</span>;
}
/* Muted figure / number placeholder used inside the workforce facts strip. */
function AbFigurePlaceholder({ children }) {
  return <span className="fact-placeholder" title="Client to supply">{children}</span>;
}

function AboutBangladesh({ onNavigate }) {
  const go = (r) => () => onNavigate && onNavigate(r);
  const goLink = (r) => (e) => { e.preventDefault(); onNavigate && onNavigate(r); };
  return (
    <>
      {/* 2 — Compact page hero (~48 / 56 padding) */}
      <section className="page-hero ab-hero" data-screen-label="01 Hero">
        <div className="hero-arc small" aria-hidden="true"/>
        <div className="container ab-hero-inner">
          <Eyebrow>Context for employers</Eyebrow>
          <h1 className="display-l ab-hero-h">About Bangladesh</h1>
          <p className="page-hero-lead">
            For hiring companies abroad — a short orientation to Bangladesh
            as a large, well-established and regulated source of overseas
            manpower.
          </p>
        </div>
      </section>

      {/* 3 — The country at a glance — 2-col prose + image */}
      <section className="section" data-screen-label="02 Glance">
        <div className="container">
          <SectionHead
            eyebrow="The country at a glance"
            title="Bangladesh at a glance"
            lead="A short orientation for hiring companies new to the country — its workforce, its training system, and the ministry framework that governs labour export."
          />
          <div className="ab-glance-grid">
            <div className="ab-glance-prose">
              <p>
                Bangladesh is a vibrant South Asian country known for its
                natural beauty &mdash; green countryside, flowing rivers, the
                Sundarbans (the world&rsquo;s largest mangrove forest) and the
                long coastline of Cox&rsquo;s Bazar. Centuries of history have
                given it a strong national identity built on tradition,
                language and resilience.
              </p>
              <p>
                The people of Bangladesh are widely recognised for their
                dedication, adaptability and strong work ethic. This has built
                a dynamic workforce that contributes to industries both within
                the country and abroad, and has made the nation an established
                source of overseas labour.
              </p>
              <p>
                Emerging from a challenging past, the country has achieved
                steady economic growth, improved infrastructure and notable
                human development &mdash; and today stands as a reliable source
                of skilled, semi-skilled and unskilled manpower for global
                employers.
              </p>
            </div>

            <figure className="ab-photo ab-photo-portrait" aria-label="Photo placeholder — workers or a Bangladesh scene">
              <div className="ab-photo-inner">
                <div className="ab-photo-arc" aria-hidden="true"/>
                <span className="facility-tag">
                  <Icon size={12} color="#fff">{AbGlyph.globe}</Icon> Country
                </span>
                <AbArrowMotif className="ab-photo-motif"/>
                <div className="facility-note">
                  Photograph of workers or a Bangladesh scene
                  <em>[Client to supply &middot; WebP / AVIF &middot; 4:5 &middot; lazy-loaded]</em>
                </div>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* 4 — Workforce facts strip — trust-strip idiom, all four values placeholders */}
      <section className="section section-alt" data-screen-label="03 Facts">
        <div className="container">
          <SectionHead
            eyebrow="Bangladesh in figures"
            title="The country by the numbers"
            lead="A few key figures for hiring companies new to the country, drawn from official Government of Bangladesh data."
          />

          <div className="trust-strip fact-strip" role="list" aria-label="Bangladesh in figures">
            <FactItem glyph={AbGlyph.users}        figure="175.4M"       sub="National population (2026)"/>
            <FactItem glyph={AbGlyph.graduationCap} figure="US$2,911"    sub="GDP per capita"/>
            <FactItem glyph={AbGlyph.globe}         figure="143,998 km²" sub="Total land area"/>
            <FactItem glyph={AbGlyph.flag}          figure="Bangla"      sub="Official language · English widely spoken"/>
          </div>

          <p className="ab-facts-foot">
            Figures from official Government of Bangladesh data.
          </p>
        </div>
      </section>

      {/* 5 — Technical education & training system */}
      <section className="section" data-screen-label="04 TVET">
        <div className="container">
          <SectionHead
            eyebrow="Skills pipeline"
            title="Technical education that feeds the pipeline"
            lead="Three tiers — public institutes, trade-specific programmes, and certification — turn out the candidates that overseas employers eventually hire."
          />

          <div className="svc-grid svc-grid-3">
            <TvetCard
              glyph={AbGlyph.school}
              title="Government technical institutes"
              body={<>
                Public training is delivered through the Bangladesh Technical
                Education Board (BTEB), the Bureau of Manpower, Employment and
                Training (BMET), and a wide network of public and private
                polytechnic institutes.
              </>}
            />
            <TvetCard
              glyph={AbGlyph.tools}
              title="Trade-skill training programmes"
              body={<>
                Vocational training centres provide hands-on training in
                fields such as construction, electrical work, IT, healthcare
                support and manufacturing — aligned with international
                standards and labour-market requirements.
              </>}
            />
            <TvetCard
              glyph={AbGlyph.certificate}
              title="Trade testing &amp; certification"
              body={<>
                Specialised programmes — including overseas-employment
                training, language preparation and certification courses —
                continually improve the global employability of Bangladeshi
                workers.
              </>}
            />
          </div>

          <div className="sec-foot">
            <a className="link-ghost" href="#/training-testing-center" onClick={goLink("training-testing-center")}>
              See our own training &amp; testing centre{" "}
              <Icon size={14}>{AbGlyph.arrowRight}</Icon>
            </a>
          </div>
        </div>
      </section>

      {/* 6 — Labour-export readiness — 2-col bullets + image */}
      <section className="section section-alt" data-screen-label="05 Readiness">
        <div className="container">
          <SectionHead
            eyebrow="Regulation &amp; readiness"
            title="Built for labour export"
            lead="A long-established labour-export tradition, backed by a clear regulatory framework."
          />

          <div className="ab-readiness-grid">
            <ul className="spec-list ab-readiness-list">
              {[
                { t: "Overseas Employment and Migrants Act, 2013",
                  d: "Labour migration is governed by a dedicated national law that sets the rules for recruitment and protects workers' rights." },
                { t: "Regulated by BMET",
                  d: "The Bureau of Manpower, Employment and Training licenses recruiting agencies and oversees the deployment of workers abroad." },
                { t: "Industry association — BAIRA",
                  d: "Agencies are organised under the Bangladesh Association of International Recruiting Agencies, which upholds professional standards." },
                { t: "Ministry formalities and clearance",
                  d: "Every worker is processed through formal Government clearance before departure, with documentation checked at each stage." },
                { t: "A large, young workforce",
                  d: "An expanding technical-education network makes the country a dependable source of skilled, semi-skilled and unskilled manpower." },
              ].map((p, n) => (
                <li key={n}>
                  <span className="spec-marker" aria-hidden="true">
                    <Icon size={12} color="var(--navy-900)" strokeWidth={2.5}>
                      {AbGlyph.arrowUpRight}
                    </Icon>
                  </span>
                  <div>
                    <h4>{p.t}</h4>
                    <p>{p.d}</p>
                  </div>
                </li>
              ))}
            </ul>

            <figure className="ab-photo ab-photo-tall" aria-label="Photo placeholder — facility or process">
              <div className="ab-photo-inner">
                <div className="ab-photo-arc" aria-hidden="true"/>
                <span className="facility-tag">
                  <Icon name="building" size={12} color="#fff"/> Facility
                </span>
                <AbArrowMotif className="ab-photo-motif"/>
                <div className="facility-note">
                  Photograph of a facility, process or BMET-clearance scene
                  <em>[Client to supply &middot; WebP / AVIF &middot; 3:4 &middot; lazy-loaded]</em>
                </div>
              </div>
            </figure>
          </div>

          <p className="ab-reassurance">
            SNS Overseas operates under the{" "}
            <strong>Overseas Employment and Migrants Act, 2013</strong>{" "}
            as a{" "}
            <strong>BMET-licensed recruiting agency (RL-2567)</strong>{" "}
            and <strong>BAIRA member</strong>.
          </p>
        </div>
      </section>

      {/* 7 — Connector band: "From country to agency" */}
      <section className="section" data-screen-label="06 Connector">
        <div className="container">
          <div className="panel-card ab-connector">
            <div className="ab-connector-copy">
              <Eyebrow>Now meet the agency</Eyebrow>
              <h3>From country to agency</h3>
              <p>
                You&rsquo;ve seen the country and the system. Here&rsquo;s how
                SNS Overseas turns that context into a placement &mdash; the
                services we deliver and the employers we already work with.
              </p>
            </div>
            <div className="ab-connector-actions">
              <Button as="a" href="#/services" variant="outline" size="default" onClick={goLink("services")}>
                See our services <Icon size={16}>{AbGlyph.arrowRight}</Icon>
              </Button>
              <a className="link-ghost" href="#/clients" onClick={goLink("clients")}>
                View our clients <Icon size={14}>{AbGlyph.arrowUpRight}</Icon>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — Closing enquiry CTA band — EMPLOYER-LED (Hire Workers first) */}
      <section className="section contact-band ab-closing" data-screen-label="07 Enquiry">
        <div className="container contact-band-inner">
          <div>
            <span className="eyebrow" style={{color:"#7fd9e3"}}>Get in touch</span>
            <h2 className="h2" style={{color:"#fff", marginTop:6, maxWidth:"22ch"}}>
              Recruit through a licensed Bangladeshi agency
            </h2>
            <p style={{color:"var(--navy-200)", marginTop:8, maxWidth:"56ch"}}>
              Recruit skilled, trained and trade-tested workers through a
              fully licensed Bangladeshi agency.
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

/* ----------------------------------------------------------------
   Sub-components
---------------------------------------------------------------- */
function FactItem({ glyph, figure, sub }) {
  return (
    <div className="trust-item fact-item" role="listitem">
      <div className="trust-tile" aria-hidden="true">
        <Icon size={18} color="#fff">{glyph}</Icon>
      </div>
      <div className="trust-txt">
        <div className="trust-t fact-t">{figure}</div>
        <div className="trust-s">{sub}</div>
      </div>
    </div>
  );
}

function TvetCard({ glyph, title, body }) {
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

/* Decorative ascending arrow tile used at low opacity bottom-left of the
   country photo placeholder. */
function AbArrowMotif({ className }) {
  return (
    <div className={"ab-arrow-motif" + (className ? " " + className : "")} aria-hidden="true">
      <svg viewBox="0 0 40 40">
        <defs>
          <linearGradient id="ab-amg" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#00E676"/>
            <stop offset="100%" stopColor="#00BCD4"/>
          </linearGradient>
        </defs>
        <path d="M8 32 L26 14 M14 14 H26 V26"
          stroke="url(#ab-amg)" strokeWidth="5" fill="none"
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

export { AboutBangladesh };
