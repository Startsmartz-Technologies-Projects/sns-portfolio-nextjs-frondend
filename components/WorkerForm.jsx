"use client";
import { useState } from "react";
import { Icon, Button, Field, Input, Textarea, Select, Alert, SectionHead } from "./Primitives";

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

function WorkerForm({ onSubmit } = {}) {
  const [sector, setSector] = useState("construction");
  const [exp, setExp] = useState("3 – 5 years");
  const [countries, setCountries] = useState(["sa", "uae"]);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleCountry = (id) => setCountries(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) return;
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
    <form className="worker-form" onSubmit={handleSubmit}>
      <Alert variant="info" title="Before you apply…">
        Have your passport (if you have one), NID and a recent photo handy.
        Uploads are optional but speed up processing.
      </Alert>

      <FormSectionHead n={1} title="About you"/>
      <div className="form-grid">
        <Field label="Full name" required id="f-name">
          <Input id="f-name" placeholder="As shown on your passport / NID"/>
        </Field>
        <Field label="Phone / WhatsApp" required id="f-phone" help="We'll contact you here.">
          <Input id="f-phone" type="tel" placeholder="+880 1XXXXXXXXX"/>
        </Field>
        <Field label="Email" id="f-email">
          <Input id="f-email" type="email" placeholder="you@example.com"/>
        </Field>
        <Field label="Age" required id="f-age">
          <Input id="f-age" type="number" placeholder="e.g. 28"/>
        </Field>
        <Field label="Present district / address" required id="f-addr">
          <Input id="f-addr" placeholder="District, division"/>
        </Field>
        <Field label="Passport number" id="f-pp" help="Leave blank if you don't yet have one.">
          <Input id="f-pp" placeholder="e.g. BC0123456"/>
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
        <Input id="f-trade" placeholder="e.g. Tiling (TL)"/>
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
        <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
        <span className="consent-tick"><Icon name="check" size={12} color="var(--navy-900)" strokeWidth={3}/></span>
        <span className="consent-body">
          I agree to be contacted by SNS Overseas about overseas employment
          opportunities, and I have read the <a href="#">Privacy Notice</a>.
        </span>
      </label>

      <Button variant="apply" size="large" block disabled={!consent || submitting}>
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
