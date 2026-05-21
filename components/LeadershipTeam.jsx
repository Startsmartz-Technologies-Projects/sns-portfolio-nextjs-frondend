"use client";
import { Icon, Button, Eyebrow, SectionHead } from "./Primitives";

/* ===============================================================
   Page 5 of 18 — Leadership & Team
   Spec: SRS FR-22 (also FR-1, FR-3, FR-4, FR-5, FR-8)
   =============================================================== */

/* ----------------------------------------------------------------
   Local glyphs — Lucide-style line icons rendered via Icon's
   children slot so stroke / sizing stay consistent.
---------------------------------------------------------------- */
const LtGlyph = {
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
  users: (
    <>
      <circle cx="9" cy="8" r="3"/>
      <circle cx="17" cy="9" r="2.4"/>
      <path d="M2 21v-1a6 6 0 0 1 12 0v1M15 21v-1a5 5 0 0 1 7 0"/>
    </>
  ),
};

/* Placeholder wrapper — visibly flagged copy slot the client must fill */
function LtPlaceholder({ children, lines = 1 }) {
  return <span className="copy-placeholder" data-lines={lines}>{children}</span>;
}

function LeadershipTeam({ onNavigate }) {
  const go = (r) => () => onNavigate && onNavigate(r);
  const goLink = (r) => (e) => { e.preventDefault(); onNavigate && onNavigate(r); };
  return (
    <>
      {/* 2 — Compact page hero */}
      <section className="page-hero lt-hero" data-screen-label="01 Hero">
        <div className="hero-arc small" aria-hidden="true"/>
        <div className="container lt-hero-inner">
          <Eyebrow>Leadership &amp; Team</Eyebrow>
          <h1 className="display-l">The people behind SNS Overseas</h1>
          <p className="page-hero-lead">
            A founder-led team backed by experienced managers and regional
            representatives — accountable for every placement we make.
          </p>
        </div>
      </section>

      {/* 3 — Leadership row · 3-up team cards on white */}
      <section className="section" data-screen-label="02 Leadership">
        <div className="container">
          <SectionHead
            eyebrow="Leadership"
            title="Leadership"
            lead="The three people who set the direction of SNS Overseas."
          />

          <div className="team-grid">
            <TeamCard
              initials="AZ"
              name="Abu Zakir"
              role="Managing Director"
              sub={
                <>
                  Founder
                  <span className="team-sep" aria-hidden="true"/>
                  <a href="#/about/managing-directors-message" onClick={goLink("md")}>
                    Read the MD&rsquo;s message
                    <Icon size={11}>{LtGlyph.arrowRight}</Icon>
                  </a>
                </>
              }
            />
            <TeamCard
              initials="AB"
              name="Lt. Colonel Abu Bashir, BSP (Rtd)"
              role="CEO"
              sub="Strategic leadership"
            />
            <TeamCard
              initials="AR"
              name="Abdur Rashid"
              role="Director (Operations)"
              sub="Day-to-day operations"
            />
          </div>
        </div>
      </section>

      {/* 4 — Leadership in brief · credentials strip on surface-2 */}
      <section className="section section-alt" data-screen-label="03 Credentials">
        <div className="container">
          <div className="panel-card cred-strip-card">
            <header className="cred-strip-head">
              <Eyebrow>Leadership in brief</Eyebrow>
              <h3>Leadership credentials at a glance</h3>
              <span className="cred-strip-draft" aria-label="Draft copy, subject to client refinement">
                Draft — subject to client refinement
              </span>
            </header>

            <ul className="spec-list">
              <li>
                <span className="spec-marker" aria-hidden="true">
                  <Icon size={12} color="var(--navy-900)" strokeWidth={2.5}>
                    {LtGlyph.arrowUpRight}
                  </Icon>
                </span>
                <div>
                  <h4>Founder-led</h4>
                  <p>
                    The company is led by its founder, Managing Director
                    {" "}<strong>Abu Zakir</strong>, since 2022.
                  </p>
                </div>
              </li>
              <li>
                <span className="spec-marker" aria-hidden="true">
                  <Icon size={12} color="var(--navy-900)" strokeWidth={2.5}>
                    {LtGlyph.arrowUpRight}
                  </Icon>
                </span>
                <div>
                  <h4>Disciplined leadership</h4>
                  <p>
                    CEO <strong>Lt. Colonel Abu Bashir, BSP (Rtd)</strong>{" "}
                    brings retired military service to the agency&rsquo;s
                    strategic direction.
                  </p>
                </div>
              </li>
              <li>
                <span className="spec-marker" aria-hidden="true">
                  <Icon size={12} color="var(--navy-900)" strokeWidth={2.5}>
                    {LtGlyph.arrowUpRight}
                  </Icon>
                </span>
                <div>
                  <h4>Operations-focused</h4>
                  <p>
                    Director <strong>Abdur Rashid</strong> oversees
                    day-to-day recruitment and deployment operations.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5 — Wider team band */}
      <section className="section" data-screen-label="04 Wider team">
        <div className="container">
          <SectionHead
            eyebrow="The wider team"
            title="Wider team"
            lead="The managers, representatives and support staff behind every placement, deployment and day-to-day operation."
          />
          <div className="team-grid">
            <TeamCard initials="SI" name="ABM Shafiqul Islam" role="General Manager"/>
            <TeamCard initials="CM" name="Chaon Munshi (Mamun)" role="Overseas Director"/>
            <TeamCard initials="TH" name="Tuhin Hossain" role="Assistant General Manager"/>
            <TeamCard initials="RI" name="Md Rafiqul Islam" role="Malaysia Representative"/>
            <TeamCard initials="OM" name="Omit Hassan Mobin" role="Accounts Manager"/>
            <TeamCard initials="SR" name="Sadiar Rahman" role="Embassy Representative (KSA)"/>
            <TeamCard initials="SH" name="Sahadat Hossain" role="BMET Representative"/>
            <TeamCard initials="AH" name="Arif Hossain" role="Computer Operator"/>
            <TeamCard initials="MT" name="Mithu" role="Office Assistant"/>
          </div>
        </div>
      </section>

      {/* 6 — Closing "what we do" card on surface-2 */}
      <section className="section section-alt" data-screen-label="05 Delivers">
        <div className="container">
          <div className="panel-card delivers-card">
            <div className="delivers-copy">
              <Eyebrow>The work</Eyebrow>
              <h3>What this team delivers</h3>
              <p>
                A full overseas-recruitment service backed by an in-house
                training and trade-testing centre — so workers arrive
                screened, trained and tested.
              </p>
            </div>
            <div className="delivers-actions">
              <Button as="a" href="#/services" variant="outline" size="default" onClick={goLink("services")}>
                See our services <Icon size={16}>{LtGlyph.arrowRight}</Icon>
              </Button>
              <a className="link-ghost" href="#/training-testing-center" onClick={goLink("training-testing-center")}>
                Visit the training centre <Icon size={14}>{LtGlyph.arrowUpRight}</Icon>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — Closing enquiry CTA band */}
      <section className="section contact-band" data-screen-label="06 Enquiry">
        <div className="container contact-band-inner">
          <div>
            <span className="eyebrow" style={{color:"#7fd9e3"}}>Get in touch</span>
            <h2 className="h2" style={{color:"#fff", marginTop:6}}>
              Ready to work with us?
            </h2>
            <p style={{color:"var(--navy-200)", marginTop:6, maxWidth:"52ch"}}>
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

/* ----------------------------------------------------------------
   TeamCard — spec §8.5 team-card.
   • 84×84 grad-globe avatar with Sora 700 white initials.
   • Initials fallback uses aria-hidden + offscreen text equivalent.
   • Real <img> portraits (when client supplies) carry a meaningful alt:
       "Portrait of [Name], [Role] at SNS Overseas".
---------------------------------------------------------------- */
function TeamCard({ initials, name, role, sub, photo }) {
  const altText = `Portrait of ${name}, ${role} at SNS Overseas`;
  return (
    <article className="team-card">
      {photo ? (
        <img
          className="team-avatar team-avatar-img"
          src={photo}
          alt={altText}
          loading="lazy"
        />
      ) : (
        <>
          <div className="team-avatar" aria-hidden="true">{initials}</div>
          <span className="sr-only">{altText} — portrait not yet supplied.</span>
        </>
      )}
      <div className="team-meta">
        <h4 className="team-name">{name}</h4>
        <p className="team-role">{role}</p>
        {sub ? <p className="team-sub">{sub}</p> : null}
      </div>
    </article>
  );
}

export { LeadershipTeam };
