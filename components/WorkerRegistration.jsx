"use client";
import { useState, useEffect, useRef } from "react";
import { Icon, Button, Field, Input, Alert, Eyebrow } from "./Primitives";

/* =============================================================
   Page 12 of 18 — Worker Registration  ·  SRS §5.2  ·  FR-35,
   FR-36, FR-45, FR-46, FR-47, FR-48, FR-49, FR-50, FR-51,
   FR-52, FR-53  ·  CN-6, AC-5.
   Built strictly to design-system-v1.spec.md §8 / §9.3.
   ============================================================= */
/* ---- Canonical lists (canonical-facts.md / AC-5) -------------
   Order and spelling are fixed. Do not reorder, rename, or add. */
const WR_SECTORS = [
  { id: "construction",  label: "Construction",            icon: "wr-building"   },
  { id: "hospitality",   label: "Hospitality & Catering",  icon: "wr-chef"       },
  { id: "cleaning",      label: "Cleaning Services",       icon: "wr-broom"      },
  { id: "manufacturing", label: "Manufacturing",           icon: "wr-factory"    },
  { id: "agriculture",   label: "Agriculture & Farming",   icon: "wr-wheat"      },
  { id: "drivers",       label: "Drivers",                 icon: "wr-steering"   },
  { id: "other",         label: "Other / Unskilled",       icon: "wr-people"     },
];
const WR_COUNTRIES = [
  { id: "sa",    label: "Saudi Arabia" },
  { id: "uae",   label: "UAE"          },
  { id: "kw",    label: "Kuwait"       },
  { id: "qa",    label: "Qatar"        },
  { id: "om",    label: "Oman"         },
  { id: "my",    label: "Malaysia"     },
  { id: "other", label: "Other"        },
];
const WR_EXPERIENCE = ["None", "0–2 years", "3–5 years", "5+ years"];

/* ---- Lucide-style line icons not in Primitives.jsx ----------- */
const WR_ICONS = {
  "wr-building":  <><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-5h6v5M8 11h2M14 11h2M8 15h2M14 15h2"/><path d="M2 21h20"/></>,
  "wr-chef":      <><path d="M6 14V12a4 4 0 1 1 3-7 4 4 0 0 1 6 0 4 4 0 1 1 3 7v2"/><path d="M5 14h14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4z"/><path d="M9 14v6M15 14v6M12 14v6"/></>,
  "wr-broom":     <><path d="M14 4 9 9M19 9l-5-5M15 8l-7 7"/><path d="M9 9 4 14a3 3 0 0 0 0 4l2 2a3 3 0 0 0 4 0l5-5z"/><path d="m6 18 2-4M10 20l2-4M14 16l-2 4"/></>,
  "wr-factory":   <><path d="M3 21V11l5 3V11l5 3V8l4-4 1 17z"/><path d="M3 21h18M8 17h1M13 17h1M17 17h1"/></>,
  "wr-wheat":     <><path d="M3 21c0-6 4-10 9-10s9 4 9 10"/><path d="M12 11V3"/><path d="M8 9c-2 0-3 1-3 3 2 0 3-1 3-3zM16 9c2 0 3 1 3 3-2 0-3-1-3-3zM8 5c-2 0-3 1-3 3 2 0 3-1 3-3zM16 5c2 0 3 1 3 3-2 0-3-1-3-3zM12 7c0-2-1-3-3-3 0 2 1 3 3 3zM12 7c0-2 1-3 3-3 0 2-1 3-3 3z"/></>,
  "wr-steering":  <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.4"/><path d="M12 9.6V4M10 13.2l-5 3.4M14 13.2l5 3.4"/></>,
  "wr-people":    <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9.5" r="2.2"/><path d="M2 20v-1.5a6 6 0 0 1 12 0V20M14.5 20v-1.5a4.5 4.5 0 0 1 7.5-3.4"/></>,
  "wr-pin":       <><path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.6"/></>,
  "wr-globe":     <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
  "wr-arrow-r":   <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  "wr-circle-check": <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 6-6"/></>,
};

function WrIcon({ name, size = 22, color, strokeWidth = 2 }) {
  return <Icon size={size} color={color} strokeWidth={strokeWidth}>{WR_ICONS[name]}</Icon>;
}

/* ---- Chips --------------------------------------------------- */
function IconChip({ icon, label, selected, onClick, role = "radio", ariaChecked }) {
  return (
    <button type="button" role={role} aria-checked={ariaChecked ?? selected}
      className={"tap-chip" + (selected ? " selected" : "")} onClick={onClick}>
      <div className="tap-tile"><WrIcon name={icon} size={22}/></div>
      <span className="tap-lbl">{label}</span>
      {selected ? (
        <span className="tap-check" aria-hidden="true">
          <Icon name="check" size={12} color="var(--navy-900)" strokeWidth={3}/>
        </span>
      ) : null}
    </button>
  );
}

function CountryChip({ label, selected, onClick }) {
  return (
    <button type="button" role="checkbox" aria-checked={selected}
      className={"tap-chip cty" + (selected ? " selected" : "")} onClick={onClick}>
      <div className="tap-tile"><WrIcon name="wr-pin" size={20}/></div>
      <span className="tap-lbl">{label}</span>
      {selected ? (
        <span className="tap-check" aria-hidden="true">
          <Icon name="check" size={12} color="var(--navy-900)" strokeWidth={3}/>
        </span>
      ) : null}
    </button>
  );
}

function PillChip({ label, selected, onClick }) {
  return (
    <button type="button" role="radio" aria-checked={selected}
      className={"pill-chip" + (selected ? " selected" : "")} onClick={onClick}>
      {label}
    </button>
  );
}

/* ---- File drop (visual + native input behind) ---------------- */
function FileDrop({ id, name, sublabel = "PDF, JPG or PNG · up to 5 MB", accept = ".pdf,.jpg,.jpeg,.png" }) {
  const [fileName, setFileName] = useState("");
  return (
    <label htmlFor={id} className="file-drop">
      <WrIcon name="wr-arrow-r" size={22} color="var(--navy-500)"/>
      {fileName ? (
        <>
          <span className="file-drop-t"><strong>{fileName}</strong></span>
          <span className="file-drop-s">Tap to replace</span>
        </>
      ) : (
        <>
          <span className="file-drop-t">Tap to upload or <strong>browse</strong></span>
          <span className="file-drop-s">{sublabel}</span>
        </>
      )}
      <input id={id} name={name} type="file" hidden accept={accept}
        onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
    </label>
  );
}

/* =============================================================
   Process steps — compact horizontal variant (spec §8.9)
   ============================================================= */
function ProcessStepsCompact() {
  const steps = [
    { n: 1, t: "You apply",   d: "Fill in this form. Upload your passport and CV if you have them." },
    { n: 2, t: "We call you", d: "Our team contacts you on WhatsApp within 2 working days." },
    { n: 3, t: "Skills check",d: "You come to our training and trade-testing centre to be checked." },
    { n: 4, t: "Deployment",  d: "Medical, visa and travel arranged when a role matches." },
  ];
  return (
    <div className="wr-steps">
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
   Success block — replaces the form when state === "success"
   ============================================================= */
function WrSuccessBlock({ onReset, onCategories, onServices }) {
  return (
    <div className="wr-success" role="alert" aria-live="polite">
      <Alert variant="success" title="Application received">
        Thank you. Our team will contact you on WhatsApp within 2 working days.
      </Alert>
      <div className="wr-success-actions">
        <Button variant="ghost" onClick={onReset}>Apply for someone else</Button>
        <a className="wr-ghost-link" href="#worker-categories" onClick={(e) => { e.preventDefault(); onCategories && onCategories(); }}>
          View worker categories <WrIcon name="wr-arrow-r" size={14}/>
        </a>
        <a className="wr-ghost-link" href="#services" onClick={(e) => { e.preventDefault(); onServices && onServices(); }}>
          See our services <WrIcon name="wr-arrow-r" size={14}/>
        </a>
      </div>
    </div>
  );
}

/* =============================================================
   The form itself — single centred column, max 560 px.
   The `state` prop overrides interactive behaviour so the page
   can be shown frozen in any of: default | submitting | success
   | error.
   ============================================================= */
function WorkerRegistrationForm({ state = "default", onNavigate }) {
  const [sector, setSector]         = useState(state === "error" ? "" : "construction");
  const [countries, setCountries]   = useState(state === "error" ? ["sa","uae"] : ["sa","uae","qa"]);
  const [exp, setExp]               = useState(state === "error" ? "3–5 years" : "3–5 years");
  const [ageMode, setAgeMode]       = useState("age"); // "age" | "dob"
  const [consent, setConsent]       = useState(state !== "default");
  const [showInfo, setShowInfo]     = useState(true);
  const [submitState, setSubmitState] = useState(state); // local override

  /* Sync state changes from prop (the canvas can mount each artboard
     with a different `state`). Adjusted during render to avoid a
     cascading render from an effect. */
  const [prevState, setPrevState] = useState(state);
  if (state !== prevState) {
    setPrevState(state);
    setSubmitState(state);
  }

  const isSubmitting = submitState === "submitting";
  const isSuccess    = submitState === "success";
  const isError      = submitState === "error";

  const toggleCountry = (id) =>
    setCountries(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent || isSubmitting) return;
    setSubmitState("submitting");
    setTimeout(() => setSubmitState("success"), 1200);
  };

  /* ----- Success replaces the form in-place ----- */
  if (isSuccess) {
    return (
      <div className="wr-form-shell">
        <WrFormHead/>
        <WrSuccessBlock
          onReset={() => setSubmitState("default")}
          onCategories={() => onNavigate && onNavigate("worker-categories")}
          onServices={() => onNavigate && onNavigate("services")}
        />
      </div>
    );
  }

  return (
    <div className={"wr-form-shell" + (isSubmitting ? " is-dimmed" : "")}>
      <WrFormHead/>

      {isError ? (
        <Alert variant="error" title="Submission failed">
          Something went wrong. Your details are saved — please tap Submit again.
        </Alert>
      ) : null}

      <form className="wr-form" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
        {/* 1. Full name */}
        <Field label="Full name" required id="wr-name">
          <Input id="wr-name" name="full_name" autoComplete="name"
            placeholder="As shown on your passport / NID"
            defaultValue={isError ? "Md. Rakibul Hasan" : ""}/>
        </Field>

        {/* 2. Phone / WhatsApp */}
        <Field label="Phone / WhatsApp number" required id="wr-phone"
          help="We will contact you on this number about your application.">
          <Input id="wr-phone" name="phone" type="tel" autoComplete="tel"
            placeholder="+880 17…"
            defaultValue={isError ? "+880 17" : ""}
            error={isError}
            aria-invalid={isError || undefined}
            aria-describedby={isError ? "wr-phone-err" : undefined}/>
          {isError ? (
            <span id="wr-phone-err" className="err" role="alert">
              <Icon name="alert" size={14}/>
              Please enter a complete mobile number (11 digits after +880).
            </span>
          ) : null}
        </Field>

        {/* 3. Email (optional) */}
        <Field label="Email" id="wr-email">
          <Input id="wr-email" name="email" type="email" autoComplete="email"
            placeholder="you@example.com"/>
        </Field>

        {/* 4. Age or DOB */}
        <Field label="Age or date of birth" required id="wr-age-grp"
          help="Whichever is easier for you.">
          <div className="age-toggle" role="radiogroup" aria-label="Age or date of birth">
            <button type="button" role="radio" aria-checked={ageMode === "age"}
              className={"age-toggle-opt" + (ageMode === "age" ? " selected" : "")}
              onClick={() => setAgeMode("age")}>Age</button>
            <button type="button" role="radio" aria-checked={ageMode === "dob"}
              className={"age-toggle-opt" + (ageMode === "dob" ? " selected" : "")}
              onClick={() => setAgeMode("dob")}>Date of birth</button>
          </div>
          <div className="age-row">
            {ageMode === "age" ? (
              <Input name="age" type="number" inputMode="numeric" min="18" max="65"
                placeholder="e.g. 28" aria-label="Age in years"/>
            ) : (
              <Input name="dob" type="date" aria-label="Date of birth"/>
            )}
          </div>
        </Field>

        {/* 5. Present district / address */}
        <Field label="Present district / address" required id="wr-addr">
          <Input id="wr-addr" name="address" autoComplete="street-address"
            placeholder="District, upazila, village"/>
        </Field>

        {/* 6. Passport number (optional) */}
        <Field label="Passport number" id="wr-pp" help="Leave blank if you don't yet have one.">
          <Input id="wr-pp" name="passport_no" placeholder="e.g. BC0123456"/>
        </Field>

        {/* 7. Job sector — icon chip grid, single-select */}
        <Field label="Job sector" required
          help="Pick the sector that best matches your experience.">
          <div className="chip-group" role="radiogroup" aria-label="Job sector">
            {WR_SECTORS.map(s => (
              <IconChip key={s.id} {...s}
                selected={sector === s.id}
                onClick={() => setSector(s.id)}/>
            ))}
          </div>
        </Field>

        {/* 8. Specific trade / skill (optional) */}
        <Field label="Specific trade / skill" id="wr-trade"
          help="For example, 'Mason' or 'Steel Fixer'.">
          <Input id="wr-trade" name="trade" placeholder="e.g. Mason"/>
        </Field>

        {/* 9. Years of experience — pill chips */}
        <Field label="Years of experience" required>
          <div className="chip-group" role="radiogroup" aria-label="Years of experience">
            {WR_EXPERIENCE.map(e => (
              <PillChip key={e} label={e}
                selected={exp === e} onClick={() => setExp(e)}/>
            ))}
          </div>
        </Field>

        {/* 10. Preferred country — icon chip grid, multi-select */}
        <Field label="Preferred destination country"
          help="Choose as many as you are open to.">
          <div className="chip-group" role="group" aria-label="Preferred destination countries">
            {WR_COUNTRIES.map(c => (
              <CountryChip key={c.id} label={c.label}
                selected={countries.includes(c.id)}
                onClick={() => toggleCountry(c.id)}/>
            ))}
          </div>
        </Field>

        {/* 11. Passport upload */}
        <Field label="Passport upload" id="wr-pp-up"
          help="Type and size are checked before submitting.">
          <FileDrop id="wr-pp-up" name="passport_file"/>
        </Field>

        {/* 12. CV / other documents */}
        <Field label="CV / other documents" id="wr-cv-up"
          help="Upload your CV or any certificates you have.">
          <FileDrop id="wr-cv-up" name="cv_file"/>
        </Field>

        {/* Honeypot (FR-49) — visually hidden, off-screen, no autocomplete */}
        <div aria-hidden="true" style={{position:"absolute", left:"-10000px", top:"auto", width:1, height:1, overflow:"hidden"}}>
          <label>Leave this field blank
            <input type="text" name="company" tabIndex="-1" autoComplete="off"/>
          </label>
        </div>

        {/* 13. Consent */}
        <label className="consent">
          <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
          <span className="consent-tick" aria-hidden="true">
            <Icon name="check" size={12} color="var(--navy-900)" strokeWidth={3}/>
          </span>
          <span className="consent-body">
            I agree to be contacted by SNS Overseas regarding this application,
            and I have read the <a href="#" onClick={(e) => e.preventDefault()}>Privacy Notice</a>.
          </span>
        </label>

        {/* 14. Reassurance line (verbatim per brief) */}
        <p className="wr-reassurance">
          <WrIcon name="wr-circle-check" size={14} color="var(--cyan-600)"/>
          Your information is private. We are a BMET-licensed agency (RL-2567).
        </p>

        {/* 15. Submit */}
        <Button variant="apply" size="large" block
          disabled={!consent || isSubmitting}
          aria-live="polite">
          {isSubmitting ? (
            <><span className="wr-spinner" aria-hidden="true"/> Sending…</>
          ) : (
            <>Submit application <WrIcon name="wr-arrow-r" size={16} color="var(--navy-900)" strokeWidth={2.5}/></>
          )}
        </Button>
      </form>
    </div>
  );
}

/* Small heading above the first field — "Worker Registration" with
   a 2 px grad-arrow bar underneath. */
function WrFormHead() {
  return (
    <div className="wr-form-head">
      <h2 className="h2">Worker Registration</h2>
      <span className="wr-form-head-bar" aria-hidden="true"/>
    </div>
  );
}

/* =============================================================
   The whole page — hero → process band → form → agent connector
   ============================================================= */
function WorkerRegistration({ state = "default", onNavigate }) {
  return (
    <div data-screen-label="12 Worker Registration">
      {/* 2. Page hero (form-page pattern — tighter padding) */}
      <section className="page-hero wr-hero">
        <div className="hero-arc small"/>
        <div className="container wr-hero-inner">
          <Eyebrow>Worker Registration</Eyebrow>
          <h1 className="display-l wr-hero-h">Apply to work overseas</h1>
          <p className="page-hero-lead">
            Tell us about yourself. We will contact you on WhatsApp within 2
            working days.
          </p>
        </div>
      </section>

      {/* 3. What to expect — process steps */}
      <section className="wr-howband">
        <div className="container">
          <div className="wr-howband-head">
            <Eyebrow>How it works</Eyebrow>
            <h3 className="h3">What happens next</h3>
          </div>
          <ProcessStepsCompact/>
        </div>
      </section>

      {/* 4. The form column (with optional info alert above) */}
      <section className="section wr-form-section">
        <div className="wr-form-page">
          <WorkerRegistrationForm state={state} onNavigate={onNavigate}/>
        </div>
      </section>

      {/* 8. Closing band — applying through an agent */}
      <section className="section section-alt wr-agent-band">
        <div className="container">
          <div className="wr-agent-card">
            <div className="wr-agent-bar" aria-hidden="true"/>
            <div className="wr-agent-copy">
              <Eyebrow>Through an agent?</Eyebrow>
              <h3 className="h3">If you found us through a local agent</h3>
              <p>
                You can still register here yourself,  it does not affect your
                application. Agents who source candidates for SNS Overseas can
                also register on their own page.
              </p>
            </div>
            <a className="wr-ghost-link strong" href="#agent-registration"
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("agent-registration"); }}>
              Become an agent <WrIcon name="wr-arrow-r" size={14}/>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export { WorkerRegistration, WorkerRegistrationForm };
