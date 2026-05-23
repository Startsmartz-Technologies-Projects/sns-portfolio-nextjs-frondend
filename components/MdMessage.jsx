"use client";
import { Icon, Button, Eyebrow } from "./Primitives";

/* ===============================================================
   Page 4 of 18 — Managing Director's Message
   Spec: SRS FR-21 (also FR-1, FR-3, FR-4, FR-5, FR-8)
   =============================================================== */

/* Placeholder slot — visibly flags client copy the design is waiting on. */
function MdSlot({ children, lines = 1 }) {
  return <span className="copy-placeholder" data-lines={lines}>{children}</span>;
}

function MdMessage({ onNavigate }) {
  const go = (r) => () => onNavigate && onNavigate(r);
  const goLink = (r) => (e) => { e.preventDefault(); onNavigate && onNavigate(r); };
  return (
    <>
      {/* 2 — Compact page hero */}
      <section className="page-hero md-hero" data-screen-label="01 Hero">
        <div className="hero-arc small" aria-hidden="true" />
        <div className="container md-hero-inner">
          <Eyebrow>Managing Director&apos;s Message</Eyebrow>
          <h1 className="display-l md-hero-h">
            A message from our Managing Director
          </h1>
          <p className="md-hero-attr">
            <span className="md-hero-attr-name">Abu Zakir</span>
            <span className="md-hero-attr-sep" aria-hidden="true">·</span>
            <span>Managing Director, SNS Overseas</span>
          </p>
        </div>
      </section>

      {/* 3 — Portrait + opening band */}
      <section className="section section-alt md-portrait-section" data-screen-label="02 Portrait & opening">
        <div className="container md-portrait-grid">

          {/* Left — portrait card (initials fallback) */}
          <div className="md-portrait-col">
            <article className="md-portrait-card">
              <div className="md-portrait-photo">
                <div className="md-portrait-arc" aria-hidden="true" />
                <img
                  className="md-avatar md-avatar-img"
                  src="https://res.cloudinary.com/dk4csiouq/image/upload/v1779520209/WhatsApp_Image_2026-05-23_at_1.06.30_PM_1_hhwmxx.jpg"
                  alt="Portrait of Abu Zakir, Managing Director of SNS Overseas"
                  loading="lazy"
                />
              </div>
              <div className="md-arrow-strip" aria-hidden="true" />
              <div className="md-portrait-cap">
                <h4>Abu Zakir</h4>
                <p className="md-role">Managing Director</p>
                <p className="md-sub">SNS Overseas · Dhaka</p>
              </div>
            </article>
          </div>

          {/* Right — opening pull-quote */}
          <div className="md-opening-col">
            <Eyebrow>Opening word</Eyebrow>
            <blockquote className="md-opening-quote">
              It gives us great pleasure to present SNS Overseas to our
              valued clients, partners and well-wishers — and to share what
              we stand for.
            </blockquote>
            <p className="md-opening-meta">
              Drawn from the full message below.
            </p>
          </div>
        </div>
      </section>

      {/* 4 — The full message */}
      <section className="section" data-screen-label="03 The message">
        <div className="container md-message">
          <header className="section-head">
            <Eyebrow>The message</Eyebrow>
            <h2 className="h2">From Abu Zakir, Managing Director</h2>
          </header>

          <p className="body-l">
            After receiving approval and obtaining our recruiting licence
            from the Bureau of Manpower, Employment and Training (BMET), under
            the Ministry of Expatriates&apos; Welfare and Overseas Employment, we
            began our journey with a strong commitment to honesty, dedication
            and quality service. Since then, we have worked closely with
            reputable organisations in different countries while following
            all government rules and regulations.
          </p>

          <p>
            Today, the global demand for skilled manpower is growing rapidly,
            and overseas employers are always looking for capable, hardworking
            people. Long experience in this sector has helped us understand
            the real needs of both employers and workers, and to provide
            better opportunities and reliable service.
          </p>

          <h4 className="md-subhead">To our workers</h4>
          <p>
            To the workers who place their trust in us: our goal is to help
            skilled, semi-skilled and unskilled workers find better
            opportunities abroad at a reasonable and affordable cost — so you
            can improve your lives and support your families with dignity.
          </p>

          <h4 className="md-subhead">To our employers</h4>
          <p>
            To the employers we serve: we provide capable, well-prepared
            workers and reliable service, with every placement carried out
            under the Overseas Employment and Migrants Act, 2013 and all
            applicable government rules.
          </p>

          <h4 className="md-subhead">To our agents</h4>
          <p>
            To the agents and partners who work alongside us: we have built
            our reputation on trust, sincerity and professionalism, and we are
            committed to maintaining those values in every relationship.
          </p>

          <p>
            With hope and confidence, we look forward to creating more
            opportunities for workers and their families. We invite you to
            get in touch and begin the journey with us.
          </p>

          {/* Signature block */}
          <div className="md-signature">
            <p className="md-sig-greet">With respect,</p>
            <p className="md-sig-name">Abu Zakir</p>
            <p className="md-sig-role">
              Managing Director, SNS Overseas
            </p>
          </div>
        </div>
      </section>

      {/* 5 — Optional pull-quote highlight */}
      <section className="section section-alt md-highlight-section" data-screen-label="04 Pull-quote (optional)">
        <div className="container">
          <div className="md-highlight">
            <Eyebrow>Where we stand</Eyebrow>
            <div className="md-highlight-rule" aria-hidden="true" />
            <blockquote className="md-highlight-quote">
              <span className="md-quote-glyph" aria-hidden="true">“</span>
              We strongly believe that manpower recruitment is not just a
              business — it is a responsibility.
            </blockquote>
            <div className="md-highlight-rule" aria-hidden="true" />
            <p className="md-highlight-attr">
              Abu Zakir · Managing Director, SNS Overseas
            </p>
          </div>
        </div>
      </section>

      {/* 6 — Meet the team card */}
      <section className="section md-team-section" data-screen-label="05 Meet the team">
        <div className="container">
          <article className="md-team-card">
            <div className="md-team-copy">
              <Eyebrow>The rest of the team</Eyebrow>
              <h3>Meet the rest of the team</h3>
              <p>
                Our CEO, Director of Operations and the placement,
                training and testing staff behind every deployment.
              </p>
            </div>
            <div className="md-team-cta">
              <Button as="a" href="#" variant="outline" size="default" onClick={goLink("team")}>
                See Leadership &amp; Team
                <Icon name="arrow-up-right" size={14} />
              </Button>
            </div>
          </article>
        </div>
      </section>

      {/* 7 — Closing enquiry CTA band */}
      <section className="section contact-band" data-screen-label="06 Enquiry">
        <div className="container contact-band-inner">
          <div>
            <span className="eyebrow" style={{ color: "#7fd9e3" }}>
              Get in touch
            </span>
            <h2 className="h2" style={{ color: "#fff", marginTop: 6 }}>
              Ready to work with us?
            </h2>
            <p
              style={{
                color: "var(--navy-200)",
                marginTop: 6,
                maxWidth: "52ch",
              }}
            >
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

export { MdMessage };
