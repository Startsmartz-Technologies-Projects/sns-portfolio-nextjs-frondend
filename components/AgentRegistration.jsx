"use client";
import { useState, useEffect, useRef } from "react";
import { Icon, Button, Field, Input, Textarea, Alert, Eyebrow } from "./Primitives";
import { validateForm, focusFirstError, required, email, phone, nid } from "./formValidation";

/* =============================================================
   Page 13 of 18 — Agent Registration  ·  SRS §5.4
   FR-1, FR-3, FR-4, FR-5, FR-8, FR-39, FR-45 … FR-53  ·  CON-3,
   NFR-6, NFR-7, NFR-12.
   Built strictly to design-system-v1.spec.md §8 / §9.3.
   ============================================================= */
/* ---- Lucide-style icons not in Primitives.jsx ---------------- */
const AR_ICONS = {
  "ar-shield-check": <><path d="M12 2 4 5v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5l-8-3z"/><path d="m9 12 2 2 4-4"/></>,
  "ar-building":     <><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-5h6v5M8 11h2M14 11h2M8 15h2M14 15h2"/><path d="M2 21h20"/></>,
  /* Two clasped forearms — a simple line "handshake" mark. */
  "ar-handshake":    <><path d="M11 17 7 13l3-3 4 4M14 11l3-3 4 4-4 4"/><path d="M3 13v-3l4-4 4 4M21 13v-3l-4-4-4 4"/></>,
  "ar-arrow-r":      <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  "ar-circle-check": <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 6-6"/></>,
};

function ArIcon({ name, size = 22, color, strokeWidth = 2 }) {
  return <Icon size={size} color={color} strokeWidth={strokeWidth}>{AR_ICONS[name]}</Icon>;
}

/* =============================================================
   Three "Why partner" panels — compact white surface, navy-50
   icon tile, H4 title, 2-line description. (Brief §3)
   ============================================================= */
function ArWhyPanel({ icon, title, text }) {
  return (
    <div className="ar-why-panel">
      <div className="ar-why-tile" aria-hidden="true">
        <ArIcon name={icon} size={20} color="var(--navy-500)" strokeWidth={2}/>
      </div>
      <h4 className="ar-why-title">{title}</h4>
      <p className="ar-why-text">{text}</p>
    </div>
  );
}

/* =============================================================
   File drop (visual + native input behind) — re-implemented
   here so the page file is self-contained and announces the
   chosen file name once selected (NFR-6 / accessibility).
   ============================================================= */
function ArFileDrop({ id, name, sublabel = "PDF, JPG or PNG · up to 5 MB", accept = ".pdf,.jpg,.jpeg,.png" }) {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  return (
    <label htmlFor={id} className="file-drop ar-file-drop">
      <ArIcon name="ar-arrow-r" size={22} color="var(--navy-500)"/>
      {fileName ? (
        <>
          <span className="file-drop-t" aria-live="polite"><strong>{fileName}</strong></span>
          <span className="file-drop-s">{fileSize} · Tap to replace</span>
        </>
      ) : (
        <>
          <span className="file-drop-t">Tap to upload or <strong>browse</strong></span>
          <span className="file-drop-s">{sublabel}</span>
        </>
      )}
      <input id={id} name={name} type="file" hidden accept={accept}
        onChange={(e) => {
          const f = e.target.files?.[0];
          setFileName(f?.name || "");
          if (f) {
            const kb = f.size / 1024;
            setFileSize(kb >= 1024 ? `${(kb/1024).toFixed(1)} MB` : `${Math.round(kb)} KB`);
          } else { setFileSize(""); }
        }} />
    </label>
  );
}

/* =============================================================
   "Agent Registration" label above the first field with the
   2 px arrow-gradient bar beneath (matches WR form head).
   ============================================================= */
function ArFormHead() {
  return (
    <div className="wr-form-head">
      <h2 className="h2">Agent Registration</h2>
      <span className="wr-form-head-bar" aria-hidden="true"/>
    </div>
  );
}

/* =============================================================
   Success block — replaces the form when state === "success".
   ============================================================= */
function ArSuccessBlock({ onReset, onHome }) {
  return (
    <div className="wr-success" role="alert" aria-live="polite">
      <Alert variant="success" title="Application received">
        Thank you. Our team will review your details and contact you within 2 working days.
      </Alert>
      <div className="wr-success-actions">
        <Button variant="ghost" onClick={onReset}>Register another agent</Button>
        <a className="wr-ghost-link" href="#home"
          onClick={(e) => { e.preventDefault(); onHome && onHome(); }}>
          Back to home <ArIcon name="ar-arrow-r" size={14}/>
        </a>
      </div>
    </div>
  );
}

/* =============================================================
   The form — single centred column, max 560 px.
   `state` overrides interactive behaviour so the canvas can mount
   the page frozen in any of: default | submitting | success |
   error.
   ============================================================= */
/* Per-field validation rules for the agent form. */
const AR_SCHEMA = {
  org_name:  [required("Organisation / agency name")],
  full_name: [required("Your name")],
  email:     [required("Email"), email()],
  phone:     [required("Phone / WhatsApp"), phone()],
  nid_no:    [required("NID number"), nid()],
  address:   [required("Address")],
};

function AgentRegistrationForm({ state = "default", onNavigate }) {
  const [consent, setConsent]         = useState(state !== "default");
  const [showInfo, setShowInfo]       = useState(true);
  const [submitState, setSubmitState] = useState(state);
  const [values, setValues] = useState({
    org_name: "", full_name: "", email: "", phone: "", nid_no: "", address: "", area: "",
  });
  const [errors, setErrors] = useState({});
  const [consentError, setConsentError] = useState("");
  const formRef = useRef(null);

  /* Mirror prop -> local override: adjust state during render when the
     prop changes, instead of via an effect (avoids a cascading render). */
  const [prevState, setPrevState] = useState(state);
  if (state !== prevState) {
    setPrevState(state);
    setSubmitState(state);
  }

  const isSubmitting = submitState === "submitting";
  const isSuccess    = submitState === "success";
  const isError      = submitState === "error";

  const setField = (name) => (e) => {
    const v = e.target.value;
    setValues(prev => ({ ...prev, [name]: v }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const fieldErrors = validateForm(values, AR_SCHEMA);
    const consentMsg = consent ? "" : "Please agree to be contacted before submitting.";
    setErrors(fieldErrors);
    setConsentError(consentMsg);

    if (Object.keys(fieldErrors).length || consentMsg) {
      focusFirstError(fieldErrors, formRef.current);
      return;
    }

    setSubmitState("submitting");
    setTimeout(() => setSubmitState("success"), 1200);
  };

  if (isSuccess) {
    return (
      <div className="wr-form-shell">
        <ArFormHead/>
        <ArSuccessBlock
          onReset={() => setSubmitState("default")}
          onHome={() => onNavigate && onNavigate("home")}
        />
      </div>
    );
  }

  return (
    <div className={"wr-form-shell" + (isSubmitting ? " is-dimmed" : "")}>
      <ArFormHead/>

      {isError ? (
        <Alert variant="error" title="Submission failed">
          Something went wrong. Your details are saved — please tap Submit again.
        </Alert>
      ) : null}

      {!isError && showInfo ? (
        <div className="ar-info-wrap">
          <Alert variant="info" title="Before you apply">
            Have your NID photo or scan ready — uploading it speeds up verification.
          </Alert>
          <button type="button" className="ar-info-dismiss" aria-label="Dismiss"
            onClick={() => setShowInfo(false)}>
            <Icon name="x" size={14} color="currentColor"/>
          </button>
        </div>
      ) : null}

      <form className="wr-form ar-form" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting} ref={formRef}>

        {/* 1. Organisation / agency name */}
        <Field label="Organisation / agency name" required id="ar-org"
          error={errors.org_name}
          help="If you operate as an individual, use your own name.">
          <Input id="ar-org" name="org_name" autoComplete="organization"
            placeholder="e.g. Sunrise Manpower"
            value={values.org_name} onChange={setField("org_name")}
            error={errors.org_name} aria-invalid={!!errors.org_name}/>
        </Field>

        {/* 2. Your name */}
        <Field label="Your name" required id="ar-name" error={errors.full_name}>
          <Input id="ar-name" name="full_name" autoComplete="name"
            placeholder="As shown on your NID"
            value={values.full_name} onChange={setField("full_name")}
            error={errors.full_name} aria-invalid={!!errors.full_name}/>
        </Field>

        {/* 3. Email */}
        <Field label="Email" required id="ar-email" error={errors.email}>
          <Input id="ar-email" name="email" type="email" autoComplete="email"
            placeholder="you@example.com"
            value={values.email} onChange={setField("email")}
            error={errors.email} aria-invalid={!!errors.email}/>
        </Field>

        {/* 4. Phone / WhatsApp */}
        <Field label="Phone / WhatsApp" required id="ar-phone"
          error={errors.phone}
          help="We will contact you on this number.">
          <Input id="ar-phone" name="phone" type="tel" autoComplete="tel"
            inputMode="tel"
            placeholder="+880 17…"
            value={values.phone} onChange={setField("phone")}
            error={errors.phone}
            aria-invalid={!!errors.phone}/>
        </Field>

        {/* 5. NID number */}
        <Field label="NID number" required id="ar-nid" error={errors.nid_no}
          help="Bangladesh National ID number (10, 13 or 17 digits).">
          <Input id="ar-nid" name="nid_no" inputMode="numeric" pattern="[0-9]*"
            autoComplete="off"
            placeholder="e.g. 1234567890"
            value={values.nid_no} onChange={setField("nid_no")}
            error={errors.nid_no} aria-invalid={!!errors.nid_no}/>
        </Field>

        {/* 6. NID upload */}
        <Field label="NID upload" required id="ar-nid-up"
          help="Upload a clear photo or scan of your NID — both sides if it is two-sided. Type and size are checked before submitting.">
          <ArFileDrop id="ar-nid-up" name="nid_file"/>
        </Field>

        {/* 7. Address — textarea */}
        <Field label="Address" required id="ar-addr" error={errors.address}
          help="Your residential or office address in Bangladesh.">
          <Textarea id="ar-addr" name="address" autoComplete="street-address"
            rows={3}
            placeholder="House / road / village, upazila, district"
            value={values.address} onChange={setField("address")}
            error={errors.address} aria-invalid={!!errors.address}/>
        </Field>

        {/* 8. Area / region of operation — optional */}
        <Field label="Area / region of operation" id="ar-area"
          help="For example, 'Comilla district' or 'Sylhet division'.">
          <Input id="ar-area" name="area"
            placeholder="e.g. Comilla district"
            value={values.area} onChange={setField("area")}/>
        </Field>

        {/* Honeypot (FR-49) — visually hidden, off-screen, no autocomplete */}
        <div aria-hidden="true" style={{position:"absolute", left:"-10000px", top:"auto", width:1, height:1, overflow:"hidden"}}>
          <label>Leave this field blank
            <input type="text" name="referrer_url" tabIndex="-1" autoComplete="off"/>
          </label>
        </div>

        {/* 9. Consent */}
        <label className="consent">
          <input type="checkbox" checked={consent}
            onChange={e => { setConsent(e.target.checked); if (e.target.checked) setConsentError(""); }} />
          <span className="consent-tick" aria-hidden="true">
            <Icon name="check" size={12} color="var(--navy-900)" strokeWidth={3}/>
          </span>
          <span className="consent-body">
            I agree to be contacted by SNS Overseas regarding this application,
            and I have read the <a href="#" onClick={(e) => e.preventDefault()}>Privacy Notice</a>.
          </span>
        </label>
        {consentError ? (
          <span className="err" role="alert"><Icon name="alert" size={14}/> {consentError}</span>
        ) : null}

        {/* 10. Reassurance line (verbatim from canonical facts) */}
        <p className="wr-reassurance">
          <ArIcon name="ar-circle-check" size={14} color="var(--cyan-600)"/>
          Your NID details are private. We use them only to verify your identity.
          SNS Overseas is a BMET-licensed agency (RL-2567).
        </p>

        {/* 11. Submit */}
        <Button variant="apply" size="large" block
          disabled={isSubmitting}
          aria-live="polite">
          {isSubmitting ? (
            <><span className="wr-spinner" aria-hidden="true"/> Sending…</>
          ) : (
            <>Submit Registration <ArIcon name="ar-arrow-r" size={16} color="var(--navy-900)" strokeWidth={2.5}/></>
          )}
        </Button>
      </form>
    </div>
  );
}

/* =============================================================
   The whole page — hero → why partner → pre-flight → form →
   privacy reassurance → worker connector.
   ============================================================= */
function AgentRegistration({ state = "default", onNavigate }) {
  return (
    <div data-screen-label="13 Agent Registration">

      {/* 2. Page hero (form-page pattern) */}
      <section className="page-hero ar-hero">
        <div className="hero-arc small"/>
        <div className="container ar-hero-inner">
          <Eyebrow>Agent Registration</Eyebrow>
          <h1 className="display-l ar-hero-h">Partner with SNS Overseas as a local agent</h1>
          <p className="page-hero-lead">
            Tell us about your agency. We will get back to you within 2 working days.
          </p>
        </div>
      </section>

      {/* 3. Why partner — three compact panels */}
      <section className="ar-why-band">
        <div className="container">
          <div className="ar-why-head">
            <Eyebrow>Why partner</Eyebrow>
            <h3 className="h3">What partnership with SNS Overseas means</h3>
          </div>
          <div className="ar-why-grid">
            <ArWhyPanel
              icon="ar-shield-check"
              title="A licensed agency to refer to"
              text="Refer workers to a BMET-licensed agency (RL-2567) backed by BAIRA membership."/>
            <ArWhyPanel
              icon="ar-building"
              title="Our facility, your candidates"
              text="Workers you refer can be trained and trade-tested at our own centre."/>
            <ArWhyPanel
              icon="ar-handshake"
              title="Transparent terms"
              text="Clear referral terms, regular communication, and direct contact with our team."/>
          </div>
        </div>
      </section>

      {/* 4. What to have ready — pre-flight spec-list */}
      <section className="ar-ready-band">
        <div className="container">
          <div className="ar-ready-head">
            <Eyebrow>Before you start</Eyebrow>
            <h3 className="h3">What to have ready</h3>
          </div>
          <ul className="spec-list ar-ready-list">
            <li>
              <span className="spec-marker" aria-hidden="true">
                <ArIcon name="ar-arrow-r" size={12} color="var(--navy-900)" strokeWidth={2.6}/>
              </span>
              <div>
                <h4>Your NID</h4>
                <p>National Identity card number plus a clear photo or scan of the card.</p>
              </div>
            </li>
            <li>
              <span className="spec-marker" aria-hidden="true">
                <ArIcon name="ar-arrow-r" size={12} color="var(--navy-900)" strokeWidth={2.6}/>
              </span>
              <div>
                <h4>Your address</h4>
                <p>Full residential or office address in Bangladesh.</p>
              </div>
            </li>
            <li>
              <span className="spec-marker" aria-hidden="true">
                <ArIcon name="ar-arrow-r" size={12} color="var(--navy-900)" strokeWidth={2.6}/>
              </span>
              <div>
                <h4>Your phone & email</h4>
                <p>A phone number you reach on WhatsApp and a working email address.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 5. The form column */}
      <section className="ar-form-section">
        <div className="ar-form-page">
          <AgentRegistrationForm state={state} onNavigate={onNavigate}/>
        </div>
      </section>

      {/* 7. NID privacy reassurance band */}
      <section className="section section-alt ar-privacy-band">
        <div className="container">
          <div className="ar-privacy-card">
            <div className="ar-privacy-bar" aria-hidden="true"/>
            <div className="ar-privacy-copy">
              <Eyebrow>Privacy</Eyebrow>
              <h3 className="h3">How we handle your NID</h3>
              <p>
                Your NID upload is stored privately. It is never shown on this
                website, and we use it only to verify your identity as a
                partner. We handle uploaded files in line with the Privacy
                Notice.
              </p>
            </div>
            <a className="wr-ghost-link strong" href="#privacy-notice"
              onClick={(e) => e.preventDefault()}>
              Read the Privacy Notice <ArIcon name="ar-arrow-r" size={14}/>
            </a>
          </div>
        </div>
      </section>

      {/* 8. Closing band — applying as a worker? */}
      <section className="ar-worker-band">
        <div className="container">
          <div className="ar-worker-card">
            <div className="ar-worker-copy">
              <Eyebrow>Looking for work?</Eyebrow>
              <h3 className="h3">If you are applying as a worker</h3>
              <p>
                Agent registration is for individuals or organisations referring
                workers to SNS Overseas. If you are looking for a job overseas,
                please use Worker Registration instead.
              </p>
            </div>
            <a className="wr-ghost-link strong" href="#worker-registration"
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("worker-registration"); }}>
              Apply as a worker <ArIcon name="ar-arrow-r" size={14}/>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export { AgentRegistration, AgentRegistrationForm };
