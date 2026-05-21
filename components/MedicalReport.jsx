"use client";
import { Icon, Button, Eyebrow, LicencePill } from "./Primitives";
import { TrustStrip } from "./TrustStrip";

/* =============================================================
   Page 15 of 18 — Medical Report / Status Check  ·  SRS FR-41
   FR-1, FR-3, FR-4, FR-5, FR-8

   A deliberately simple, single-purpose page. Open-item AS-6 is
   resolved (online lookup is available), so this page implements
   the "link to it clearly" branch — one obvious CTA that opens
   the official Wafid / GCC medical-examination results portal
   in a new tab.

   The page intentionally avoids:
   - Pass-rate statistics, retest counts, fees, turnaround times.
   - Featuring the medical partner (CRP) — that lives elsewhere.
   - Reveal animations (low-bandwidth audience).

   Built strictly to design-system-v1.spec.md §8 / §9.
   ============================================================= */

/* ---- Lucide-style icons used only on this page --------------- */
const MR_ICONS = {
  "mr-arrow-r":     <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  /* External-link affordance per spec §8.1 — reinforces the
     new-tab behaviour for sighted users alongside the aria-label. */
  "mr-external":    <><path d="M14 5h5v5M19 5l-9 9M5 5h6M5 19h14v-6"/></>,
};
function MrIcon({ name, size = 18, color = "currentColor", strokeWidth = 2 }) {
  return <Icon size={size} color={color} strokeWidth={strokeWidth}>{MR_ICONS[name]}</Icon>;
}

/* Slot — renders supplied copy if present, otherwise a flagged placeholder. */
function MrSlot({ value, placeholder }) {
  if (value && value.trim()) return <>{value}</>;
  return <span className="copy-placeholder">{placeholder}</span>;
}

/* =============================================================
   The lookup card — the focal point of the page. Constrained to
   ≈ 640 px so it reads as one contained, confident unit rather
   than a full-bleed band.
   ============================================================= */
function LookupCard({ tweaks = {} }) {
  const t = tweaks || {};
  const portalUrl = (t.ctaUrl && t.ctaUrl.trim()) || "https://wafid.com/en/medical-status-search/";
  const showWhatYouNeed = t.showWhatYouNeed !== false;
  const showExternalGlyph = t.showExternalGlyph !== false;
  const ctaLabel = (t.ctaLabel && t.ctaLabel.trim()) || null;

  return (
    <div className="mr-card" role="region" aria-labelledby="mr-lookup-h">

      <div className="mr-card-head">
        <Eyebrow>Medical Report</Eyebrow>
        <h1 className="display-l mr-card-h" id="mr-lookup-h">
          Check your medical report
        </h1>
        <p className="mr-card-helper">
          Check your medical-fitness result on the official examination
          results portal. The button below opens it in a new tab.
        </p>
      </div>

      <a
        className="btn btn-apply btn-large mr-cta"
        href={portalUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={(ctaLabel || "Check my medical report") + " — opens the medical results portal in a new tab"}
      >
        <span>{ctaLabel || "Check my medical report"}</span>
        <MrIcon name="mr-arrow-r" size={18} color="var(--navy-900)" strokeWidth={2.5}/>
        {showExternalGlyph ? (
          <MrIcon name="mr-external" size={14} color="var(--navy-900)" strokeWidth={2.2}/>
        ) : null}
      </a>

      <p className="mr-cta-sub">
        Opens <strong>{hostFromUrl(portalUrl)}</strong> in a new tab. SNS Overseas does not
        store your details.
      </p>

      {showWhatYouNeed ? (
        <>
          <hr className="mr-divider" aria-hidden="true"/>

          <div className="mr-need">
            <Eyebrow>What you'll need</Eyebrow>
            <ul className="spec-list mr-need-list">
              <li>
                <span className="spec-marker" aria-hidden="true">
                  <Icon name="check" size={14} color="var(--navy-900)" strokeWidth={3}/>
                </span>
                <div>
                  <h4>Your passport number</h4>
                  <p>The same passport you used at the medical examination.</p>
                </div>
              </li>
              <li>
                <span className="spec-marker" aria-hidden="true">
                  <Icon name="check" size={14} color="var(--navy-900)" strokeWidth={3}/>
                </span>
                <div>
                  <h4>Your nationality</h4>
                  <p>Select Bangladesh (or your country of citizenship).</p>
                </div>
              </li>
            </ul>
            <p className="mr-need-foot">
              You can also search using your Wafid slip number.
            </p>
          </div>
        </>
      ) : null}

    </div>
  );
}

/* Render only the hostname for the "Opens X in a new tab" caption. */
function hostFromUrl(url) {
  try { return new URL(url).hostname.replace(/^www\./, ""); }
  catch (_) { return "the results portal"; }
}

/* =============================================================
   The whole page — header lives in the App shell; this returns
   everything from the hero through to the closing CTA band.
   ============================================================= */
function MedicalReport({ onNavigate, tweaks = {} }) {
  const t = tweaks || {};
  const showTrustStrip   = t.showTrustStrip   !== false;
  const showClosingBand  = t.showClosingBand  !== false;

  return (
    <div data-screen-label="15 Medical Report">

      {/* 2. Lookup hero — the entire focal section of the page. */}
      <section className="page-hero mr-hero" data-screen-label="15 Medical Report — Lookup">
        <div className="hero-arc small mr-hero-arc" aria-hidden="true"/>
        <div className="container mr-hero-inner">
          <LookupCard tweaks={t}/>
        </div>
      </section>

      {/* 3. Reassurance band — trust strip (identical to home). */}
      {showTrustStrip ? (
        <div className="mr-trust-wrap" data-screen-label="15 Medical Report — Trust">
          <TrustStrip/>
        </div>
      ) : null}

      {/* 4. Closing band — worker-led dual CTA. */}
      {showClosingBand ? (
        <section className="contact-band mr-closing" data-screen-label="15 Medical Report — Closing">
          <div className="container contact-band-inner">
            <div className="mr-closing-copy">
              <span className="eyebrow" style={{color:"#7fd9e3"}}>Get in touch</span>
              <h2 className="h2" style={{color:"#fff", marginTop:6, maxWidth:"22ch"}}>
                {t.closingHeading || "Questions about your medical?"}
              </h2>
              <p className="mr-closing-lead">
                {(t.closingLead && t.closingLead.trim()) ||
                  "If your result isn't clear or you have any questions, our team is here to help."}
              </p>
            </div>
            <div className="contact-band-ctas">
              <Button variant="apply" size="large"
                onClick={() => onNavigate && onNavigate("worker-registration")}>
                Apply Now <Icon name="arrow-up-right" size={18}/>
              </Button>
              <Button variant="outline-dark" size="large"
                onClick={() => onNavigate && onNavigate("contact")}>
                Contact us
              </Button>
            </div>
          </div>
        </section>
      ) : null}

    </div>
  );
}

export { MedicalReport, LookupCard };
