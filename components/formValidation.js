/* ================================================================
   Shared form-validation helpers for the Registration pages
   (Worker Registration, Agent Registration, Demand Submission).

   Each validator takes the field's string value and returns either
   an error message (string) or "" when the value is valid. Compose
   them per-field with `validateField`.
   ================================================================ */

/* ---- Primitive validators -------------------------------------- */
export const required = (label = "This field") => (v) =>
  v && String(v).trim() ? "" : `${label} is required.`;

export const minLen = (n, label = "This field") => (v) =>
  !v || String(v).trim().length >= n ? "" : `${label} must be at least ${n} characters.`;

export const email = () => (v) => {
  if (!v || !String(v).trim()) return "";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim())
    ? "" : "Enter a valid email address.";
};

/* Bangladeshi / international mobile — digits, spaces, +, -, ( ).
   Requires at least 8 digits so partial numbers are caught. */
export const phone = () => (v) => {
  if (!v || !String(v).trim()) return "";
  const digits = String(v).replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15
    ? "" : "Enter a valid phone number with country code.";
};

/* Bangladesh NID — 10, 13 or 17 digits. */
export const nid = () => (v) => {
  if (!v || !String(v).trim()) return "";
  const digits = String(v).replace(/\D/g, "");
  return [10, 13, 17].includes(digits.length)
    ? "" : "Enter a valid NID number (10, 13 or 17 digits).";
};

export const numberRange = (min, max, label = "Value") => (v) => {
  if (v === "" || v == null) return "";
  const n = Number(v);
  if (Number.isNaN(n)) return `${label} must be a number.`;
  if (min != null && n < min) return `${label} must be at least ${min}.`;
  if (max != null && n > max) return `${label} must be ${max} or less.`;
  return "";
};

/* ---- Composition ----------------------------------------------- */
/* Run a list of validators; return the first non-empty message. */
export function validateField(value, validators = []) {
  for (const fn of validators) {
    const msg = fn(value);
    if (msg) return msg;
  }
  return "";
}

/* Validate a whole form. `schema` maps field name -> validator list.
   `values` maps field name -> value. Returns an errors object that
   only contains entries for fields that failed. */
export function validateForm(values, schema) {
  const errors = {};
  for (const [field, validators] of Object.entries(schema)) {
    const msg = validateField(values[field], validators);
    if (msg) errors[field] = msg;
  }
  return errors;
}

/* Move focus to the first field (by name) that has an error. */
export function focusFirstError(errors, formEl) {
  if (!formEl) return;
  for (const name of Object.keys(errors)) {
    const el = formEl.querySelector(`[name="${name}"]`);
    if (el) { el.focus(); break; }
  }
}
