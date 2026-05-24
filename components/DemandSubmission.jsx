"use client";
import { useState, useEffect, useRef } from "react";
import { Icon, Button, Field, Input, Textarea, Select, Alert, Eyebrow, LicencePill } from "./Primitives";
import { validateForm, focusFirstError, required, email, phone, numberRange } from "./formValidation";

/* =============================================================
   Page 14 of 18 — Demand Submission  ·  SRS §5.3
   FR-1, FR-3, FR-4, FR-5, FR-8, FR-37, FR-38, FR-45 … FR-53
   ·  CN-7, AC-5, CON-3.
   Built strictly to design-system-v1.spec.md §8 / §9.3.
   Employer-led page — Submit uses the solid navy btn-hire,
   not the gradient apply CTA (spec §8.1 dual-CTA convention).
   ============================================================= */
/* ---- Canonical lists (canonical-facts.md / AC-5) -------------
   Order and spelling are fixed. Do not reorder, rename, or add. */
const DS_CATEGORIES = [
  { id: "construction",  label: "Construction"           },
  { id: "hospitality",   label: "Hospitality & Catering" },
  { id: "cleaning",      label: "Cleaning Services"      },
  { id: "manufacturing", label: "Manufacturing"          },
  { id: "agriculture",   label: "Agriculture & Farming"  },
  { id: "drivers",       label: "Drivers"                },
  { id: "other",         label: "Other / Unskilled"      },
];
const DS_COUNTRIES = [
  "Saudi Arabia", "UAE", "Kuwait", "Qatar", "Oman", "Malaysia", "Other",
];

/* ---- Lucide-style line icons not in Primitives.jsx ----------- */
const DS_ICONS = {
  /* Letter / scroll — Demand Letter */
  "ds-letter":     <><path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><path d="m3 7 9 6 9-6"/><path d="M7 11h2M7 14h4"/></>,
  /* Stamp — Power of Attorney */
  "ds-stamp":      <><path d="M5 21h14"/><path d="M5 19h14v-2a3 3 0 0 0-3-3h-2.5l.5-4a2 2 0 0 0-2-2.2 2 2 0 0 0-2 2.2l.5 4H8a3 3 0 0 0-3 3v2z"/></>,
  /* Handshake — Recruitment Agreement */
  "ds-handshake":  <><path d="M11 17 7 13l3-3 4 4"/><path d="M14 11l3-3 4 4-4 4"/><path d="M3 13v-3l4-4 4 4"/><path d="M21 13v-3l-4-4-4 4"/></>,
  /* Folder — Employer information */
  "ds-folder":     <><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/><path d="M7 13h10M7 16h6"/></>,
  "ds-arrow-r":    <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  "ds-upload":     <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5M12 3v12"/></>,
  "ds-circle-check": <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 6-6"/></>,
  /* Trust strip icons */
  "ds-shield":     <><path d="M12 2 4 5v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5l-8-3z"/><path d="m9 12 2 2 4-4"/></>,
  "ds-medal":      <><circle cx="12" cy="15" r="5"/><path d="m8 11-3-8h4l3 6M16 11l3-8h-4l-3 6"/></>,
  "ds-scale":      <><path d="M12 3v18M5 21h14"/><path d="M5 8l-3 7a4 4 0 0 0 6 0L5 8zM19 8l-3 7a4 4 0 0 0 6 0l-3-7zM5 8h14"/></>,
  "ds-cap":        <><path d="M12 3 1 9l11 6 9-4.9V17"/><path d="M5 13v5l7 3 7-3v-5"/></>,
};
function DsIcon({ name, size = 22, color, strokeWidth = 2 }) {
  return <Icon size={size} color={color} strokeWidth={strokeWidth}>{DS_ICONS[name]}</Icon>;
}

/* =============================================================
   Process steps — compact 4-up (mirrors WR rhythm).
   ============================================================= */
function DsProcessSteps() {
  const steps = [
    { n: 1, t: "Submit demand",          d: "Fill in this form. Attach your demand letter if you have it." },
    { n: 2, t: "We respond",             d: "Our team contacts you to confirm specifications and timeline." },
    { n: 3, t: "Selection & training",   d: "Candidates are selected, trained, and trade-tested at our centre." },
    { n: 4, t: "Deployment",             d: "Medical, visa, ministry formalities and travel arrangements completed." },
  ];
  return (
    <div className="wr-steps ds-steps">
      {steps.map((s) => (
        <div className="wr-step" key={s.n}>
          <div className="wr-step-num">{s.n}</div>
          <h4 className="h4">{s.t}</h4>
          <p>{s.d}</p>
        </div>
      ))}
    </div>
  );
}

/* =============================================================
   Required documents — 4-up grid of compact doc tiles
   ============================================================= */
const DS_DOCS = [
  { n: 1, icon: "ds-letter",    title: "Demand Letter",
    desc: "A letter on your company letterhead requesting workers and stating numbers, trades and destination." },
  { n: 2, icon: "ds-stamp",     title: "Power of Attorney",
    desc: "Authorises SNS Overseas to act on your behalf in recruitment matters." },
  { n: 3, icon: "ds-handshake", title: "Recruitment Agreement",
    desc: "Sets out the terms between your company and SNS Overseas." },
  { n: 4, icon: "ds-folder",    title: "Employer information",
    desc: "Trade licence, business registration, and contact details of your hiring office." },
];

function DsDocTile({ n, icon, title, desc }) {
  return (
    <div className="ds-doc">
      <div className="ds-doc-tile" aria-hidden="true">
        <DsIcon name={icon} size={20} color="var(--navy-500)" strokeWidth={2}/>
      </div>
      <span className="ds-doc-overline">Document {n} of {DS_DOCS.length}</span>
      <h4 className="ds-doc-title">{title}</h4>
      <p className="ds-doc-desc">{desc}</p>
    </div>
  );
}

/* =============================================================
   File drop — self-contained
   ============================================================= */
function DsFileDrop({ id, name, sublabel = "PDF, JPG or PNG · up to 5 MB", accept = ".pdf,.jpg,.jpeg,.png" }) {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  return (
    <label htmlFor={id} className="file-drop ds-file-drop">
      <DsIcon name="ds-upload" size={22} color="var(--navy-500)"/>
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
   Numbered form-section header (spec §8.7 form-section-head)
   ============================================================= */
function DsFormSectionHead({ n, title, id }) {
  return (
    <div className="form-section-head" id={id}>
      <span className="form-section-num" aria-hidden="true">{n}</span>
      <h4 className="h4">{title}</h4>
    </div>
  );
}

/* =============================================================
   "Demand Submission" label above the first section + grad-arrow bar
   ============================================================= */
function DsFormHead() {
  return (
    <div className="wr-form-head">
      <h2 className="h2">Demand Submission</h2>
      <span className="wr-form-head-bar" aria-hidden="true"/>
    </div>
  );
}

/* =============================================================
   Success block — replaces the form when state === "success"
   ============================================================= */
function DsSuccessBlock({ onReset, onServices }) {
  return (
    <div className="wr-success" role="alert" aria-live="polite">
      <Alert variant="success" title="Demand received">
        Thank you. Our team will respond to you within 2 working days.
      </Alert>
      <div className="wr-success-actions">
        <Button variant="ghost" onClick={onReset}>Submit another demand</Button>
        <a className="wr-ghost-link" href="#services"
          onClick={(e) => { e.preventDefault(); onServices && onServices(); }}>
          Back to Services <DsIcon name="ds-arrow-r" size={14}/>
        </a>
      </div>
    </div>
  );
}

/* =============================================================
   The form — single centred column, max 560 px, two numbered
   sections (Company / Requirement).
   ============================================================= */
/* Per-field validation rules for the demand form. */
const DS_SCHEMA = {
  company_name: [required("Company name")],
  contact_name: [required("Contact person name")],
  country:      [required("Country")],
  email:        [required("Business email"), email()],
  phone:        [required("Phone / WhatsApp"), phone()],
  worker_count: [required("Number of workers"), numberRange(1, 100000, "Number of workers")],
};

function DemandSubmissionForm({ state = "default", onNavigate }) {
  const [trades, setTrades]           = useState(state === "error" ? ["construction"] : ["construction", "drivers"]);
  const [consent, setConsent]         = useState(state !== "default");
  const [showInfo, setShowInfo]       = useState(true);
  const [submitState, setSubmitState] = useState(state);
  const [values, setValues] = useState({
    company_name: "", contact_name: "", country: "", email: "", phone: "",
    worker_count: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [consentError, setConsentError] = useState("");
  const [tradesError, setTradesError] = useState("");
  const formRef = useRef(null);

  /* Mirror prop -> local override: adjust during render when prop changes. */
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

  const toggleTrade = (id) => {
    setTrades(t => t.includes(id) ? t.filter(x => x !== id) : [...t, id]);
    setTradesError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const fieldErrors = validateForm(values, DS_SCHEMA);
    const consentMsg = consent ? "" : "Please agree to be contacted before submitting.";
    const tradesMsg  = trades.length ? "" : "Select at least one worker category.";
    setErrors(fieldErrors);
    setConsentError(consentMsg);
    setTradesError(tradesMsg);

    if (Object.keys(fieldErrors).length || consentMsg || tradesMsg) {
      focusFirstError(fieldErrors, formRef.current);
      return;
    }

    setSubmitState("submitting");
    setTimeout(() => setSubmitState("success"), 1200);
  };

  /* Success replaces the whole form in-place */
  if (isSuccess) {
    return (
      <div className="wr-form-shell ds-form-shell">
        <DsFormHead/>
        <DsSuccessBlock
          onReset={() => setSubmitState("default")}
          onServices={() => onNavigate && onNavigate("services")}
        />
      </div>
    );
  }

  return (
    <div className={"wr-form-shell ds-form-shell" + (isSubmitting ? " is-dimmed" : "")}>
      <DsFormHead/>

      {isError ? (
        <Alert variant="error" title="Submission failed">
          Something went wrong. Your details are saved — please tap Submit again.
        </Alert>
      ) : null}

      {!isError && showInfo ? (
        <div className="ar-info-wrap">
          <Alert variant="info" title="Before you submit">
            Attaching your demand letter speeds up our response. PDFs, JPGs,
            and PNGs up to 5 MB are accepted.
          </Alert>
          <button type="button" className="ar-info-dismiss" aria-label="Dismiss"
            onClick={() => setShowInfo(false)}>
            <Icon name="x" size={14} color="currentColor"/>
          </button>
        </div>
      ) : null}

      <form className="wr-form ds-form" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting} ref={formRef}>

        {/* =====================================================
            SECTION 1 — Your Company (SRS §5.3 §1)
            ===================================================== */}
        <DsFormSectionHead n="1" title="Your Company" id="ds-sec-company"/>

        {/* 1. Company name */}
        <Field label="Company name" required id="ds-co-name" error={errors.company_name}>
          <Input id="ds-co-name" name="company_name" autoComplete="organization"
            placeholder="e.g. Al-Nasr Contracting Co."
            value={values.company_name} onChange={setField("company_name")}
            error={errors.company_name} aria-invalid={!!errors.company_name}/>
        </Field>

        {/* 2. Contact person name */}
        <Field label="Contact person name" required id="ds-contact" error={errors.contact_name}>
          <Input id="ds-contact" name="contact_name" autoComplete="name"
            placeholder="Full name"
            value={values.contact_name} onChange={setField("contact_name")}
            error={errors.contact_name} aria-invalid={!!errors.contact_name}/>
        </Field>

        {/* 3. Country — native select */}
        <Field label="Country" required id="ds-country" error={errors.country}>
          <Select id="ds-country" name="country"
            value={values.country} onChange={setField("country")}
            error={errors.country} aria-invalid={!!errors.country}
            aria-label="Country">
            <option value="" disabled>Select a country</option>
            {DS_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
        </Field>

        {/* 4. Business email */}
        <Field label="Business email" required id="ds-email" error={errors.email}>
          <Input id="ds-email" name="email" type="email" autoComplete="email"
            placeholder="you@company.com"
            value={values.email} onChange={setField("email")}
            error={errors.email} aria-invalid={!!errors.email}/>
        </Field>

        {/* 5. Phone / WhatsApp */}
        <Field label="Phone / WhatsApp" required id="ds-phone"
          error={errors.phone}
          help="Include the country code, e.g. +966…">
          <Input id="ds-phone" name="phone" type="tel" autoComplete="tel"
            inputMode="tel"
            placeholder="+966…"
            value={values.phone} onChange={setField("phone")}
            error={errors.phone}
            aria-invalid={!!errors.phone}/>
        </Field>

        {/* =====================================================
            SECTION 2 — Your Requirement (SRS §5.3 §2)
            ===================================================== */}
        <DsFormSectionHead n="2" title="Your Requirement" id="ds-sec-req"/>

        {/* 1. Worker category / trades — multi-select pill chips */}
        <Field label="Worker category / trade(s) required" required
          error={tradesError}
          help="Tap all that apply.">
          <div className="chip-group ds-chip-group"
            role="group" aria-label="Worker categories required">
            {DS_CATEGORIES.map(c => {
              const selected = trades.includes(c.id);
              return (
                <button type="button" key={c.id}
                  role="checkbox" aria-checked={selected}
                  className={"pill-chip" + (selected ? " selected" : "")}
                  onClick={() => toggleTrade(c.id)}>
                  {c.label}
                </button>
              );
            })}
          </div>
        </Field>

        {/* 2. Number of workers required */}
        <Field label="Number of workers required" required id="ds-count"
          error={errors.worker_count}
          help="If you need several categories, give the total here and use the message field for the per-category breakdown.">
          <Input id="ds-count" name="worker_count" type="number"
            inputMode="numeric" min="1"
            placeholder="e.g. 40"
            value={values.worker_count} onChange={setField("worker_count")}
            error={errors.worker_count} aria-invalid={!!errors.worker_count}/>
        </Field>

        {/* 3. Demand letter upload (optional) */}
        <Field label="Demand letter upload" id="ds-letter-up"
          help="Encouraged but not required at this stage. Type and size are checked before submitting.">
          <DsFileDrop id="ds-letter-up" name="demand_letter_file"/>
        </Field>

        {/* 4. Additional requirements / message — textarea */}
        <Field label="Additional requirements / message" id="ds-message"
          help="Anything else we should know — start date, experience level, language, specific trades, working conditions…">
          <Textarea id="ds-message" name="message" rows={4}
            placeholder="Start date, experience level, accommodation, salary range, etc."
            value={values.message} onChange={setField("message")}/>
        </Field>

        {/* Honeypot (FR-49) — visually hidden */}
        <div aria-hidden="true" style={{position:"absolute", left:"-10000px", top:"auto", width:1, height:1, overflow:"hidden"}}>
          <label>Leave this field blank
            <input type="text" name="website_url" tabIndex="-1" autoComplete="off"/>
          </label>
        </div>

        {/* 5. Consent */}
        <label className="consent">
          <input type="checkbox" checked={consent}
            onChange={e => { setConsent(e.target.checked); if (e.target.checked) setConsentError(""); }} />
          <span className="consent-tick" aria-hidden="true">
            <Icon name="check" size={12} color="var(--navy-900)" strokeWidth={3}/>
          </span>
          <span className="consent-body">
            I agree to be contacted by SNS Overseas regarding this submission,
            and I have read the <a href="#" onClick={(e) => e.preventDefault()}>Privacy Notice</a>.
          </span>
        </label>
        {consentError ? (
          <span className="err" role="alert"><Icon name="alert" size={14}/> {consentError}</span>
        ) : null}

        {/* 6. Reassurance line */}
        <p className="wr-reassurance">
          <DsIcon name="ds-circle-check" size={14} color="var(--cyan-600)"/>
          Your submission goes to our team. We are a BMET-licensed agency
          (RL-2567), BAIRA member.
        </p>

        {/* 7. Submit — solid navy btn-hire (employer-led page) */}
        <Button variant="hire" size="large" block
          disabled={isSubmitting}
          aria-live="polite">
          {isSubmitting ? (
            <><span className="wr-spinner ds-spinner-on-dark" aria-hidden="true"/> Sending…</>
          ) : (
            <>Submit Demand <DsIcon name="ds-arrow-r" size={16} color="#fff" strokeWidth={2.5}/></>
          )}
        </Button>
      </form>
    </div>
  );
}

/* =============================================================
   Reassurance trust strip — same 4 items as the home trust strip
   ============================================================= */
function DsTrustStrip() {
  const items = [
    { icon: "ds-shield", t: "Licence RL-2567",  s: "Issued by BMET" },
    { icon: "ds-medal",  t: "BAIRA Member",      s: "Recognised association" },
    { icon: "ds-scale",  t: "Govt. Regulated",   s: "Migrants Act, 2013" },
    { icon: "ds-cap",    t: "In-house Training", s: "Own testing centre" },
  ];
  return (
    <div className="trust-strip ds-trust-strip">
      {items.map((it, i) => (
        <div className="trust-item" key={i}>
          <div className="trust-tile" aria-hidden="true">
            <DsIcon name={it.icon} size={18} color="#fff" strokeWidth={2}/>
          </div>
          <div>
            <div className="trust-t">{it.t}</div>
            <div className="trust-s">{it.s}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* =============================================================
   The whole page — hero → process band → required documents →
   form → reassurance trust strip → closing connector.
   ============================================================= */
function DemandSubmission({ state = "default", onNavigate }) {
  return (
    <div data-screen-label="14 Demand Submission">

      {/* 2. Page hero (form-page pattern — no CTAs) */}
      <section className="page-hero ds-hero">
        <div className="hero-arc small"/>
        <div className="container ds-hero-inner">
          <Eyebrow>For Employers</Eyebrow>
          <h1 className="display-l ds-hero-h">Submit a demand for workers</h1>
          <p className="page-hero-lead">
            Tell us about your company and the workers you need. We will respond
            within 2 working days.
          </p>
        </div>
      </section>

      {/* 3. Recruitment process — 4 employer-facing steps */}
      <section className="ds-process-band">
        <div className="container">
          <div className="wr-howband-head">
            <Eyebrow>How recruiting through us works</Eyebrow>
            <h3 className="h3">From demand to deployment</h3>
          </div>
          <DsProcessSteps/>
        </div>
      </section>

      {/* 4. Required documents — pre-flight check (white surface) */}
      <section className="ds-docs-band">
        <div className="container">
          <div className="ds-docs-head">
            <Eyebrow>What you&apos;ll typically need</Eyebrow>
            <h3 className="h3">Documents we may request</h3>
          </div>
          <div className="ds-docs-grid">
            {DS_DOCS.map(d => <DsDocTile key={d.n} {...d}/>)}
          </div>
          <p className="ds-docs-foot">
            Specifics vary by destination country. Our team will confirm exact
            requirements after you submit this form.
          </p>
        </div>
      </section>

      {/* 5–6. The form column (with info / error alerts above) */}
      <section className="ds-form-section">
        <div className="ds-form-page">
          <DemandSubmissionForm state={state} onNavigate={onNavigate}/>
        </div>
      </section>

      {/* 7. Why submit through us — reassurance band on surface-2 */}
      <section className="section section-alt ds-trust-band">
        <div className="container">
          <div className="wr-howband-head ds-trust-head">
            <Eyebrow>Why submit through us</Eyebrow>
            <h3 className="h3">Credentials that travel with every demand</h3>
          </div>
          <DsTrustStrip/>
        </div>
      </section>

      {/* 8. Closing band — existing client / see more (white surface) */}
      <section className="ds-closing-band">
        <div className="container">
          <div className="ds-closing-card">
            <div className="ds-closing-copy">
              <Eyebrow>Existing client?</Eyebrow>
              <h3 className="h3">We track every demand we receive</h3>
              <p>
                Returning clients can reference past demands by company name in
                the message field above, our team will match the file before
                we get back to you.
              </p>
            </div>
            <div className="ds-closing-actions">
              <a className="wr-ghost-link strong" href="#clients"
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("clients"); }}>
                See our clients <DsIcon name="ds-arrow-r" size={14}/>
              </a>
              <a className="wr-ghost-link" href="#services"
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("services"); }}>
                Read our services <DsIcon name="ds-arrow-r" size={14}/>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export { DemandSubmission, DemandSubmissionForm };
