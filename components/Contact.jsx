"use client";
import { useState, useEffect } from "react";
import { Icon, Button, Field, Input, Textarea, Alert, Eyebrow, LicencePill } from "./Primitives";

/* =============================================================
   Page 18 of 18 — Contact  ·  SRS §5.5
   FR-1, FR-3, FR-4, FR-5, FR-7, FR-8, FR-42 … FR-52
   Built strictly to design-system-v1.spec.md §8 / §9.3.
   ============================================================= */
/* ---- Lucide-style icons used only on this page --------------- */
const CT_ICONS = {
  /* "ar-arrow-r" is already in AR; redeclare locally so the file
     is self-contained and there's no script-order coupling. */
  "ct-arrow-r":      <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  "ct-circle-check": <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 6-6"/></>,
  "ct-clock":        <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  /* WhatsApp glyph — single path of the official mark, used at small
     sizes only (24 px tile). The mark is a brand exception declared
     in spec §8.11 and is the one approved off-brand colour. */
  "ct-external":     <><path d="M14 5h5v5M19 5l-9 9M5 5h6M5 19h14v-6"/></>,
};
function CtIcon({ name, size = 22, color, strokeWidth = 2 }) {
  return <Icon size={size} color={color} strokeWidth={strokeWidth}>{CT_ICONS[name]}</Icon>;
}

/* WhatsApp glyph (filled SVG — not a stroked Lucide icon, so it
   matches the floating FAB's mark exactly). */
function WaGlyph({ size = 20, color = "#fff" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color} aria-hidden="true">
      <path d="M20.5 3.5A11.7 11.7 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.6A11.9 11.9 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.5-8.5zM12 22a10 10 0 0 1-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A10 10 0 1 1 22 12a10 10 0 0 1-10 10zm5.4-7.5c-.3-.1-1.7-.9-2-1s-.5-.1-.7.2-.8 1-1 1.2-.4.2-.7.1a8.2 8.2 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5L9 7c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.2c0 1.3.9 2.6 1.1 2.8a10 10 0 0 0 4 3.6c2.4 1 2.4.7 2.9.7a2.7 2.7 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3z"/>
    </svg>
  );
}

/* =============================================================
   Section eyebrow + H2 wrapper used twice on this page.
   ============================================================= */
function CtSectionHead({ eyebrow, title, lead, align = "left" }) {
  return (
    <header className={"ct-sec-head" + (align === "center" ? " is-center" : "")}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="h2">{title}</h2>
      {lead ? <p className="ct-sec-lead">{lead}</p> : null}
    </header>
  );
}

/* =============================================================
   A single contact-row inside the details panel.
   ============================================================= */
function CtDetailRow({ tile, label, value, sub, href, srLabel, valueClass }) {
  const inner = (
    <span className={"ct-row-val" + (valueClass ? " " + valueClass : "")}>
      {value}
    </span>
  );
  return (
    <div className="ct-row">
      <div className="ct-row-tile" aria-hidden="true">{tile}</div>
      <div className="ct-row-meta">
        <span className="ct-row-lbl">{label}</span>
        {href ? (
          <a className="ct-row-link" href={href} aria-label={srLabel || undefined}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
            {inner}
          </a>
        ) : inner}
        {sub ? <span className="ct-row-sub">{sub}</span> : null}
      </div>
    </div>
  );
}

/* =============================================================
   The details column — its own panel (a single card per the brief).
   ============================================================= */
function ContactDetailsPanel() {
  return (
    <aside className="ct-details-panel" aria-labelledby="ct-office-h">
      <Eyebrow>Office</Eyebrow>
      <h2 className="h2" id="ct-office-h">Our Dhaka office</h2>

      <div className="ct-rows">
        <CtDetailRow
          tile={<Icon name="map-pin" size={18} color="#fff" strokeWidth={2}/>}
          label="Address"
          value={<>BHSK Shun Shing Tower,<br/>Aziz Sarak, Dhaka-1229, Bangladesh</>}/>

        <CtDetailRow
          tile={<Icon name="phone" size={18} color="#fff" strokeWidth={2}/>}
          label="Phone"
          value="+880 1678137040"
          sub="Tap to call"
          href="tel:+8801678137040"
          srLabel="Call SNS Overseas"
          valueClass="is-link"/>

        <CtDetailRow
          tile={<Icon name="mail" size={18} color="#fff" strokeWidth={2}/>}
          label="Email"
          value="snsoverseas1977@gmail.com"
          sub="Tap to email"
          href="mailto:snsoverseas1977@gmail.com"
          srLabel="Email SNS Overseas"
          valueClass="is-link"/>

        {/* WhatsApp gets its own tile colour treatment so it stays
            recognisable as a brand exception. */}
        <div className="ct-row ct-row-wa">
          <div className="ct-row-tile ct-tile-wa" aria-hidden="true">
            <WaGlyph size={20}/>
          </div>
          <div className="ct-row-meta">
            <span className="ct-row-lbl">WhatsApp</span>
            <a className="ct-row-link" href="https://wa.me/8801678137040"
              target="_blank" rel="noopener noreferrer"
              aria-label="Chat with SNS Overseas on WhatsApp">
              <span className="ct-row-val is-link">Chat on WhatsApp</span>
            </a>
            <span className="ct-row-sub">Same number as the phone</span>
          </div>
        </div>

        <div className="ct-row">
          <div className="ct-row-tile" aria-hidden="true" style={{background:"var(--navy-50)", border:"1px solid var(--navy-100)"}}>
            <CtIcon name="ct-clock" size={18} color="var(--navy-500)"/>
          </div>
          <div className="ct-row-meta">
            <span className="ct-row-lbl">Office hours</span>
            <span className="ct-row-val">
              <span className="copy-placeholder">
                [Client hours — to be supplied, e.g. Sun–Thu 09:00–18:00, Fri closed]
              </span>
            </span>
            <span className="ct-row-sub">SRS §12 item 4 — awaiting client confirmation</span>
          </div>
        </div>
      </div>

      <div className="ct-details-foot">
        <span role="img" aria-label="BMET-licensed — licence number RL-2567">
          <LicencePill>BMET Licensed · RL-2567</LicencePill>
        </span>
      </div>
    </aside>
  );
}

/* =============================================================
   The "Contact us" form-head label (mirrors the WR/AR pattern).
   ============================================================= */
function CtFormHead() {
  return (
    <div className="wr-form-head">
      <h2 className="h2">Contact us</h2>
      <span className="wr-form-head-bar" aria-hidden="true"/>
    </div>
  );
}

/* =============================================================
   Success block — replaces the form when state === "success".
   ============================================================= */
function CtSuccessBlock({ onReset, onNavigate }) {
  return (
    <div className="wr-success" role="alert" aria-live="polite">
      <Alert variant="success" title="Message received">
        Thank you. Our team will reply within 2 working days.
      </Alert>
      <div className="wr-success-actions">
        <Button variant="ghost" onClick={onReset}>Send another message</Button>
        <a className="wr-ghost-link" href="#home"
          onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("home"); }}>
          Back to home <CtIcon name="ct-arrow-r" size={14}/>
        </a>
      </div>
    </div>
  );
}

/* =============================================================
   The form — single column, max 560 px (per spec §9.3).
   ============================================================= */
function ContactForm({ state = "default", onNavigate }) {
  const [consent, setConsent]         = useState(state !== "default");
  const [showInfo, setShowInfo]       = useState(state === "default");
  const [submitState, setSubmitState] = useState(state);

  const isSubmitting = submitState === "submitting";
  const isSuccess    = submitState === "success";
  const isError      = submitState === "error";

  useEffect(() => {
    setSubmitState(state);
    /* Mirror state -> info-alert visibility so the canvas can capture
       the success/error states with the alert hidden (less noise). */
    if (state !== "default") setShowInfo(false);
    if (state === "default") setShowInfo(true);
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent || isSubmitting) return;
    setSubmitState("submitting");
    setTimeout(() => setSubmitState("success"), 1200);
  };

  if (isSuccess) {
    return (
      <div className="wr-form-shell">
        <CtFormHead/>
        <CtSuccessBlock
          onReset={() => { setSubmitState("default"); setShowInfo(true); }}
          onNavigate={onNavigate}/>
      </div>
    );
  }

  return (
    <div className={"wr-form-shell" + (isSubmitting ? " is-dimmed" : "")}>
      <CtFormHead/>

      <p className="ct-form-helper">Tell us what you need. We will reply within 2 working days.</p>

      {isError ? (
        <Alert variant="error" title="Submission failed">
          Something went wrong. Your details are saved — please tap Send Message again.
        </Alert>
      ) : null}

      {!isError && showInfo ? (
        <div className="ct-info-panel">
          <div className="ar-info-wrap">
            <Alert variant="info" title="Want a faster reply?">
              For specific paths — applying as a worker, hiring workers, or
              registering as an agent — please use the relevant form.
            </Alert>
            <button type="button" className="ar-info-dismiss" aria-label="Dismiss"
              onClick={() => setShowInfo(false)}>
              <Icon name="x" size={14} color="currentColor"/>
            </button>
          </div>
          <div className="ct-info-links">
            <a className="ct-info-link" href="#worker-registration"
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("worker-registration"); }}>
              <span>Apply as a worker</span>
              <CtIcon name="ct-arrow-r" size={13}/>
            </a>
            <a className="ct-info-link" href="#demand-submission"
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("demand-submission"); }}>
              <span>Submit a demand</span>
              <CtIcon name="ct-arrow-r" size={13}/>
            </a>
            <a className="ct-info-link" href="#agent-registration"
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("agent-registration"); }}>
              <span>Become an agent</span>
              <CtIcon name="ct-arrow-r" size={13}/>
            </a>
          </div>
        </div>
      ) : null}

      <form className="wr-form ct-form" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>

        {/* 1. Name */}
        <Field label="Name" required id="ct-name">
          <Input id="ct-name" name="full_name" autoComplete="name"
            placeholder="Your full name"
            defaultValue={isError ? "Abdul Karim" : ""}/>
        </Field>

        {/* 2. Email — error state surfaces here */}
        <Field label="Email" required id="ct-email"
          help={isError ? undefined : undefined}>
          <Input id="ct-email" name="email" type="email" autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            defaultValue={isError ? "abdul@example" : ""}
            error={isError}
            aria-invalid={isError || undefined}
            aria-describedby={isError ? "ct-email-err" : undefined}/>
          {isError ? (
            <span id="ct-email-err" className="err" role="alert" aria-live="polite">
              <Icon name="alert" size={14}/>
              Please enter a complete email address — it should look like name@example.com.
            </span>
          ) : null}
        </Field>

        {/* 3. Phone — optional */}
        <Field label="Phone" id="ct-phone"
          help="Useful if you would like a call back.">
          <Input id="ct-phone" name="phone" type="tel" autoComplete="tel"
            inputMode="tel"
            placeholder="+880 17…"
            defaultValue={isError ? "+880 1678" : ""}/>
        </Field>

        {/* 4. Subject */}
        <Field label="Subject" required id="ct-subject">
          <Input id="ct-subject" name="subject"
            placeholder="What is your message about?"
            defaultValue={isError ? "Question about worker registration" : ""}/>
        </Field>

        {/* 5. Message */}
        <Field label="Message" required id="ct-msg"
          help="Be as detailed as helps us reply well.">
          <Textarea id="ct-msg" name="message" rows={5}
            placeholder="Write your message here…"
            defaultValue={isError ? "Hello, I would like to know more about the worker registration process for Saudi Arabia. Thank you." : ""}/>
        </Field>

        {/* Honeypot (FR-49) */}
        <div aria-hidden="true" style={{position:"absolute", left:"-10000px", top:"auto", width:1, height:1, overflow:"hidden"}}>
          <label>Leave this field blank
            <input type="text" name="referrer_url" tabIndex="-1" autoComplete="off"/>
          </label>
        </div>

        {/* 6. Consent */}
        <label className="consent">
          <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
          <span className="consent-tick" aria-hidden="true">
            <Icon name="check" size={12} color="var(--navy-900)" strokeWidth={3}/>
          </span>
          <span className="consent-body">
            I agree to be contacted by SNS Overseas regarding this enquiry,
            and I have read the <a href="#privacy-notice" onClick={(e) => e.preventDefault()}>Privacy Notice</a>.
          </span>
        </label>

        {/* 7. Reassurance line */}
        <p className="wr-reassurance">
          <CtIcon name="ct-circle-check" size={14} color="var(--cyan-600)"/>
          Your message goes to our team. We are a BMET-licensed agency (RL-2567).
        </p>

        {/* 8. Submit */}
        <Button variant="apply" size="large" block
          disabled={!consent || isSubmitting}
          aria-live="polite">
          {isSubmitting ? (
            <><span className="wr-spinner" aria-hidden="true"/> Sending…</>
          ) : (
            <>Send Message <CtIcon name="ct-arrow-r" size={16} color="var(--navy-900)" strokeWidth={2.5}/></>
          )}
        </Button>
      </form>
    </div>
  );
}

/* =============================================================
   Map placeholder — a `grad-globe` block at the same dimensions
   the live embed will occupy. Centred Lucide pin in white plus a
   caption pill, per the brief.
   ============================================================= */
function MapPlaceholder() {
  return (
    <div className="ct-map-frame" role="img"
      aria-label="Map placeholder — office location">
      <div className="ct-map-inner">
        <div className="ct-map-stripes" aria-hidden="true"/>
        <div className="ct-map-pin" aria-hidden="true">
          <Icon name="map-pin" size={32} color="#fff" strokeWidth={2.2}/>
        </div>
        <span className="ct-map-caption">
          Map placeholder — BHSK Shun Shing Tower, Aziz Sarak, Dhaka-1229
        </span>
      </div>
    </div>
  );
}

/* =============================================================
   The whole page — header lives in the App shell; this returns
   everything from the hero down to the closing CTA band.
   ============================================================= */
function Contact({ state = "default", onNavigate }) {
  return (
    <div data-screen-label="18 Contact">

      {/* 2. Page hero (compact) */}
      <section className="page-hero ct-hero">
        <div className="hero-arc small"/>
        <div className="container ct-hero-inner">
          <Eyebrow>Reach us</Eyebrow>
          <h1 className="display-l ct-hero-h">Contact SNS Overseas</h1>
          <p className="page-hero-lead">
            Phone, email, WhatsApp, or this form — whichever suits you.
          </p>
        </div>
      </section>

      {/* 3 + 4. Two-column: details (5/12) left, form (7/12) right */}
      <section className="ct-main-section">
        <div className="container ct-main-grid">
          <ContactDetailsPanel/>
          <div className="ct-form-col">
            <ContactForm state={state} onNavigate={onNavigate}/>
          </div>
        </div>
      </section>

      {/* 6. Embedded map band (placeholder state) */}
      <section className="section section-alt ct-map-section">
        <div className="container">
          <CtSectionHead
            eyebrow="Find us"
            title="On the map"
            lead="Our corporate office in Aziz Sarak, Dhaka-1229."/>
          <MapPlaceholder/>
          <div className="ct-map-actions">
            <a className="wr-ghost-link" href="https://www.google.com/maps?q=BHSK+Shun+Shing+Tower+Aziz+Sarak+Dhaka"
              target="_blank" rel="noopener noreferrer">
              Open in Google Maps <CtIcon name="ct-external" size={14}/>
            </a>
            <a className="wr-ghost-link" href="https://www.google.com/maps/dir/?api=1&destination=BHSK+Shun+Shing+Tower+Aziz+Sarak+Dhaka"
              target="_blank" rel="noopener noreferrer">
              Get directions <CtIcon name="ct-arrow-r" size={14}/>
            </a>
          </div>
        </div>
      </section>

      {/* 7. Audience-specific shortcuts — three small cards */}
      <section className="section ct-shortcut-section">
        <div className="container">
          <CtSectionHead
            eyebrow="Or take a direct path"
            title="Faster routes for specific needs"/>
          <div className="ct-shortcut-grid">
            <a className="ct-shortcut-card" href="#demand-submission"
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("demand-submission"); }}>
              <span className="ct-shortcut-tag">FOR EMPLOYERS</span>
              <h4 className="ct-shortcut-title">Submit a demand</h4>
              <p className="ct-shortcut-desc">
                Submit your recruitment requirements as a demand letter.
              </p>
              <span className="ct-shortcut-link">
                Go <CtIcon name="ct-arrow-r" size={14}/>
              </span>
            </a>
            <a className="ct-shortcut-card" href="#worker-registration"
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("worker-registration"); }}>
              <span className="ct-shortcut-tag">FOR JOB SEEKERS</span>
              <h4 className="ct-shortcut-title">Apply as a worker</h4>
              <p className="ct-shortcut-desc">
                Register your details so we can match you with overseas employers.
              </p>
              <span className="ct-shortcut-link">
                Go <CtIcon name="ct-arrow-r" size={14}/>
              </span>
            </a>
            <a className="ct-shortcut-card" href="#agent-registration"
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("agent-registration"); }}>
              <span className="ct-shortcut-tag">FOR AGENTS</span>
              <h4 className="ct-shortcut-title">Become an agent</h4>
              <p className="ct-shortcut-desc">
                Register your agency or details, including NID verification.
              </p>
              <span className="ct-shortcut-link">
                Go <CtIcon name="ct-arrow-r" size={14}/>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. Closing enquiry CTA band */}
      <section className="contact-band ct-closing-band">
        <div className="container contact-band-inner">
          <div>
            <span className="eyebrow" style={{color:"#7fd9e3"}}>Get in touch</span>
            <h2 className="h2" style={{color:"#fff", marginTop:6, maxWidth:"22ch"}}>
              Or stay in touch on WhatsApp
            </h2>
            <p className="ct-closing-lead">
              Message us on WhatsApp for a quick reply, or use any of the
              options above — whichever suits you.
            </p>
          </div>
          <div className="contact-band-ctas">
            <Button variant="apply" size="large"
              onClick={() => onNavigate && onNavigate("worker-registration")}>
              Apply Now
            </Button>
            <Button variant="outline-dark" size="large"
              onClick={() => onNavigate && onNavigate("demand-submission")}>
              Hire Workers
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}

export { Contact, ContactForm, ContactDetailsPanel };
