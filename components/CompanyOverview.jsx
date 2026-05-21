"use client";
import { Icon, Button, Eyebrow, SectionHead } from "./Primitives";

/* ===============================================================
   Page 2 of 18 — Company Overview
   Spec: SRS FR-19 (also FR-1, FR-3, FR-4, FR-5, FR-8)
   =============================================================== */

/* Slot — renders supplied copy if present, otherwise a flagged placeholder. */
function Slot({ value, placeholder, lines = 1 }) {
  if (value && value.trim()) return <>{value}</>;
  return <span className="copy-placeholder" data-lines={lines}>{placeholder}</span>;
}

function CompanyOverview({ tweaks = {} }) {
  const t = tweaks || {};
  return (
    <>
      {/* 2 — Compact page hero */}
      <section className="page-hero co-hero" data-screen-label="01 Hero">
        <div className="hero-arc small" aria-hidden="true"/>
        <div className="container co-hero-inner">
          <Eyebrow>About SNS Overseas</Eyebrow>
          <h1 className="display-l co-hero-h">
            A licensed bridge between Bangladeshi workers and overseas
            employers
          </h1>
          <p className="page-hero-lead">
            SNS Overseas is a BMET-licensed recruiting agency in Dhaka,
            recruiting, training and deploying skilled, semi-skilled and
            unskilled Bangladeshi workers for employers across the Gulf and
            Malaysia.
          </p>
        </div>
      </section>

      {/* 3 — Who We Are */}
      <section className="section" data-screen-label="02 Who We Are">
        <div className="container co-prose">
          <header className="section-head">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="h2">A Dhaka-based recruiting agency, in business since 2022.</h2>
          </header>
          <p className="body-l">
            SNS Overseas was established in <strong>2022</strong> as a BMET-licensed
            (<strong>RL-2567</strong>) recruiting agency, and is a member of <strong>BAIRA</strong>. We
            source, screen, train and deploy Bangladeshi workers to employers
            across the Gulf and Malaysia.
          </p>
          <p>
            What sets SNS Overseas apart is that selection, skills training
            and trade testing all happen in-house, at our own centre. Workers
            are not simply forwarded — they are prepared, assessed and
            certified before they are placed before an employer.
          </p>
          <p>
            We work with three groups: overseas employers seeking reliable
            manpower, Bangladeshi workers seeking a safe and legitimate route
            abroad, and local agents who refer candidates to us. Every
            placement follows the Overseas Employment and Migrants Act, 2013
            and the rules of the Bureau of Manpower, Employment and Training
            (BMET).
          </p>
        </div>
      </section>

      {/* 4 — Company at a Glance — credentials panel */}
      <section className="section section-alt" data-screen-label="03 Glance">
        <div className="container">
          <SectionHead
            eyebrow="Company at a glance"
            title="Our credentials, at a glance."
            lead="The legitimacy markers that underpin every placement we make. All numbers can be cross-checked with the issuing authority."
          />
          <div className="cred-grid">
            <CredentialTile
              icon="calendar"
              overline="Established"
              value="2022"
              caption="Founded in Dhaka, Bangladesh"
            />
            <CredentialTile
              icon="shield-check"
              overline="Recruiting Licence"
              value="RL-2567"
              caption="Issued by BMET, Ministry of Expatriates' Welfare and Overseas Employment"
            />
            <CredentialTile
              icon="file-text"
              overline="Trade Licence"
              value="TRAD/DNCC/054873/2022"
              caption="Dhaka North City Corporation"
              span2
            />
            <CredentialTile
              icon="users"
              overline="Membership"
              value="BAIRA"
              caption="Bangladesh Association of International Recruiting Agencies"
            />
            <CredentialTile
              icon="scale"
              overline="Regulatory basis"
              value="Migrants Act, 2013"
              caption="Overseas Employment and Migrants Act, 2013"
            />
          </div>
          <div className="cred-foot">
            <a href="#" className="btn btn-ghost btn-small">
              View credentials & documents <Icon name="arrow-up-right" size={14}/>
            </a>
          </div>
        </div>
      </section>

      {/* 5 — Our Mission */}
      <section className="section" data-screen-label="04 Mission">
        <div className="container mv-row">
          <div className="mv-side mv-side-left">
            <ArrowMotif />
            <Eyebrow>Our mission</Eyebrow>
            <h2 className="h2">Mission</h2>
          </div>
          <blockquote className="mv-quote mv-quote-l">
            To ethically recruit and place skilled Bangladeshi workers in
            reputable overseas employment, upholding their rights, dignity and
            well-being at every step of the journey — from registration to
            arrival at the desired country.
          </blockquote>
        </div>
      </section>

      {/* 6 — Our Vision */}
      <section className="section section-alt" data-screen-label="05 Vision">
        <div className="container mv-row mv-row-rev">
          <div className="mv-side mv-side-right">
            <ArrowMotif />
            <Eyebrow>Our vision</Eyebrow>
            <h2 className="h2">Vision</h2>
          </div>
          <blockquote className="mv-quote mv-quote-r">
            To become a leading and most trusted overseas recruitment agency
            in Bangladesh, recognised for our integrity, compliance and
            contribution to the nation's workforce development and remittance
            economy.
          </blockquote>
        </div>
      </section>

      {/* 7 — Closing CTA band */}
      <section className="section contact-band" data-screen-label="06 CTA">
        <div className="container contact-band-inner">
          <div>
            <span className="eyebrow" style={{color:"#7fd9e3"}}>Get in touch</span>
            <h2 className="h2" style={{color:"#fff", marginTop:6}}>Ready to work with us?</h2>
            <p style={{color:"var(--navy-200)", marginTop:6, maxWidth:"52ch"}}>
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

/* ----------------------------------------------------------------
   Sub-components
---------------------------------------------------------------- */
function CredentialTile({ icon, overline, value, caption, span2 }) {
  return (
    <article className={"cred-tile" + (span2 ? " cred-tile-wide" : "")}>
      <div className="cred-icon"><Icon name={icon} size={18} color="#fff"/></div>
      <div className="cred-overline">{overline}</div>
      <div className="cred-value">{value}</div>
      <p className="cred-caption">{caption}</p>
    </article>
  );
}

function ArrowMotif() {
  /* The decorative ascending arrow from §7.3 — square tile with grad-arrow
     fill clipped to a chunky NE-pointing arrow shape. */
  return (
    <div className="arrow-motif" aria-hidden="true">
      <svg viewBox="0 0 40 40">
        <defs>
          <linearGradient id="amg" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#00E676"/>
            <stop offset="100%" stopColor="#00BCD4"/>
          </linearGradient>
        </defs>
        <path d="M8 32 L26 14 M14 14 H26 V26"
          stroke="url(#amg)" strokeWidth="5" fill="none"
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

export { CompanyOverview };
