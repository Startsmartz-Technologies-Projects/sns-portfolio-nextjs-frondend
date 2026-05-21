"use client";
import { useState, useRef } from "react";
import { Icon, Button, Field, Input, Textarea, Select, Alert, SectionHead } from "./Primitives";
import { validateForm, focusFirstError, required, email, phone, numberRange } from "./formValidation";

const SECTORS = [
  { id: "construction", label: "Construction",            icon: "building" },
  { id: "hospitality",  label: "Hospitality & Catering",  icon: "stethoscope" },
  { id: "cleaning",     label: "Cleaning Services",       icon: "package" },
  { id: "manufacturing",label: "Manufacturing",           icon: "wrench" },
  { id: "agriculture",  label: "Agriculture & Farming",   icon: "graduation" },
  { id: "drivers",      label: "Drivers",                 icon: "send" },
  { id: "other",        label: "Other / Unskilled",       icon: "briefcase" },
];

const COUNTRIES = [
  { id: "sa",       label: "Saudi Arabia" },
  { id: "uae",      label: "UAE" },
  { id: "kw",       label: "Kuwait" },
  { id: "qa",       label: "Qatar" },
  { id: "om",       label: "Oman" },
  { id: "my",       label: "Malaysia" },
  { id: "other",    label: "Other" },
];

const EXPERIENCE = ["None", "0 – 2 years", "3 – 5 years", "5+ years"];

function IconChip({ icon, label, selected, onClick }) {
  return (
    <button type="button" className={"tap-chip" + (selected ? " selected" : "")} onClick={onClick} aria-pressed={selected}>
      <div className="tap-tile"><Icon name={icon} size={22}/></div>
      <span className="tap-lbl">{label}</span>
      {selected ? <span className="tap-check"><Icon name="check" size={12} color="var(--navy-900)" strokeWidth={3}/></span> : null}
    </button>
  );
}

function FlagChip({ flag, label, selected, onClick }) {
  return (
    <button type="button" className={"tap-chip cty" + (selected ? " selected" : "")} onClick={onClick} aria-pressed={selected}>
      <div className="cty-flag">{flag}</div>
      <span className="tap-lbl">{label}</span>
      {selected ? <span className="tap-check"><Icon name="check" size={12} color="var(--navy-900)" strokeWidth={3}/></span> : null}
    </button>
  );
}
const FLAGS = { sa: "🇸🇦", uae: "🇦🇪", kw: "🇰🇼", qa: "🇶🇦", om: "🇴🇲", my: "🇲🇾", other: "🌐" };
/* Note: flag emoji used here purely as fallback inside the country tile. Per
   the brand rule, no emoji appear elsewhere — and these can be swapped for
   per-country SVG flags when supplied. */

function PillChip({ label, selected, onClick }) {
  return (
    <button type="button" className={"pill-chip" + (selected ? " selected" : "")} onClick={onClick} aria-pressed={selected}>
      {label}
    </button>
  );
}

function FormSectionHead({ n, title }) {
  return (
    <div className="form-section-head">
      <div className="form-section-num">{n}</div>
      <h3 className="h3">{title}</h3>
    </div>
  );
}

function FileDrop({ label, sublabel }) {
  return (
    <label className="file-drop">
      <Icon name="upload" size={22} color="var(--navy-500)"/>
      <span className="file-drop-t">{label} or <strong>browse</strong></span>
      <span className="file-drop-s">{sublabel}</span>
      <input type="file" hidden />
    </label>
  );
}

/* Per-field validation rules for the worker form. */
const WF_SCHEMA = {
  full_name: [required("Full name")],
  phone:     [required("Phone / WhatsApp"), phone()],
  email:     [email()],
  age:       [required("Age"), numberRange(16, 70, "Age")],
  address:   [required("Present district / address")],
};

function WorkerForm({ onSubmit, onNavigate } = {}) {
  const [sector, setSector] = useState("construction");
  const [exp, setExp] = useState("3 – 5 years");
  const [countries, setCountries] = useState(["sa", "uae"]);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState({
    full_name: "", phone: "", email: "", age: "", address: "", passport: "", trade: "",
  });
  const [errors, setErrors] = useState({});
  const [consentError, setConsentError] = useState("");
  const formRef = useRef(null);

  const toggleCountry = (id) => setCountries(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);

  /* Update a value and clear that field's error as the user types. */
  const setField = (name) => (e) => {
    const v = e.target.value;
    setValues(prev => ({ ...prev, [name]: v }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;

    const fieldErrors = validateForm(values, WF_SCHEMA);
    const consentMsg = consent ? "" : "Please agree to be contacted before submitting.";
    setErrors(fieldErrors);
    setConsentError(consentMsg);

    if (Object.keys(fieldErrors).length || consentMsg) {
      focusFirstError(fieldErrors, formRef.current);
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      onSubmit && onSubmit();
    }, 700);
  };

  if (submitted) {
    return (
      <div className="form-success">
        <Alert variant="success" title="Application received.">
          We will be in touch on WhatsApp within one working day. Keep your
          passport and a recent photo ready for the next step.
        </Alert>
      </div>
    );
  }

  return (
    <form className="worker-form" onSubmit={handleSubmit} noValidate ref={formRef}>
      <Alert variant="info" title="Before you apply…">
        Have your passport (if you have one), NID and a recent photo handy.
        Uploads are optional but speed up processing.
      </Alert>

      <FormSectionHead n={1} title="About you"/>
      <div className="form-grid">
        <Field label="Full name" required id="f-name" error={errors.full_name}>
          <Input id="f-name" name="full_name" value={values.full_name}
            onChange={setField("full_name")}
            placeholder="As shown on your passport / NID"
            error={errors.full_name} aria-invalid={!!errors.full_name}/>
        </Field>
        <Field label="Phone / WhatsApp" required id="f-phone" error={errors.phone}
          help="We'll contact you here.">
          <Input id="f-phone" name="phone" type="tel" value={values.phone}
            onChange={setField("phone")}
            placeholder="+880 1XXXXXXXXX"
            error={errors.phone} aria-invalid={!!errors.phone}/>
        </Field>
        <Field label="Email" id="f-email" error={errors.email}>
          <Input id="f-email" name="email" type="email" value={values.email}
            onChange={setField("email")}
            placeholder="you@example.com"
            error={errors.email} aria-invalid={!!errors.email}/>
        </Field>
        <Field label="Age" required id="f-age" error={errors.age}>
          <Input id="f-age" name="age" type="number" value={values.age}
            onChange={setField("age")}
            placeholder="e.g. 28"
            error={errors.age} aria-invalid={!!errors.age}/>
        </Field>
        <Field label="Present district / address" required id="f-addr" error={errors.address}>
          <Input id="f-addr" name="address" value={values.address}
            onChange={setField("address")}
            placeholder="District, division"
            error={errors.address} aria-invalid={!!errors.address}/>
        </Field>
        <Field label="Passport number" id="f-pp" help="Leave blank if you don't yet have one.">
          <Input id="f-pp" name="passport" value={values.passport}
            onChange={setField("passport")}
            placeholder="e.g. BC0123456"/>
        </Field>
      </div>

      <FormSectionHead n={2} title="What work do you do?"/>
      <Field label="Job sector" required help="Pick the sector that best matches your experience.">
        <div className="chip-group">
          {SECTORS.map(s => (
            <IconChip key={s.id} {...s} selected={sector === s.id} onClick={() => setSector(s.id)} />
          ))}
        </div>
      </Field>
      <Field label="Specific trade / skill" id="f-trade" help={sector === "construction" ? "e.g. Tiling, Plumbing & Pipefitting, Electrical Wiring Installation…" : "A short description of your work."}>
        <Input id="f-trade" name="trade" value={values.trade}
          onChange={setField("trade")}
          placeholder="e.g. Tiling (TL)"/>
      </Field>
      <Field label="Years of experience" required>
        <div className="chip-group">
          {EXPERIENCE.map(e => (
            <PillChip key={e} label={e} selected={exp === e} onClick={() => setExp(e)}/>
          ))}
        </div>
      </Field>

      <FormSectionHead n={3} title="Where do you want to work?"/>
      <Field label="Preferred country" help="Choose as many as you're open to.">
        <div className="chip-group">
          {COUNTRIES.map(c => (
            <FlagChip key={c.id} flag={FLAGS[c.id]} label={c.label}
              selected={countries.includes(c.id)} onClick={() => toggleCountry(c.id)}/>
          ))}
        </div>
      </Field>

      <FormSectionHead n={4} title="Documents (optional)"/>
      <div className="form-grid">
        <FileDrop label="Tap to upload your passport"  sublabel="PDF, JPG or PNG · up to 5 MB"/>
        <FileDrop label="Tap to upload CV / documents" sublabel="PDF, JPG or PNG · up to 5 MB"/>
      </div>

      <label className="consent">
        <input type="checkbox" checked={consent}
          onChange={e => { setConsent(e.target.checked); if (e.target.checked) setConsentError(""); }} />
        <span className="consent-tick"><Icon name="check" size={12} color="var(--navy-900)" strokeWidth={3}/></span>
        <span className="consent-body">
          I agree to be contacted by SNS Overseas about overseas employment
          opportunities, and I have read the <a href="#" onClick={(e) => e.preventDefault()}>Privacy Notice</a>.
        </span>
      </label>
      {consentError ? (
        <span className="err" role="alert"><Icon name="alert" size={14}/> {consentError}</span>
      ) : null}

      <Button variant="apply" size="large" block disabled={submitting}>
        {submitting ? "Sending…" : "Submit application"}
      </Button>
      <p className="reassurance">
        <Icon name="shield-check" size={14} color="var(--cyan-600)"/>
        BMET-licensed (RL-2567) · we never share your details outside the recruitment process.
      </p>
    </form>
  );
}

export { WorkerForm };
