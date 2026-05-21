"use client";
import { useState, useEffect, useRef, createContext, useContext } from "react";

/* =============================================================
   Icon — a thin wrapper around inline Lucide-style SVGs.
   Pass `name` (see ICONS below) or `children` for arbitrary SVG.
   ============================================================= */
const ICONS = {
  "shield-check": <><path d="M12 2 4 5v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5l-8-3z"/><path d="m9 12 2 2 4-4"/></>,
  "user":         <><circle cx="12" cy="8" r="3.2"/><path d="M5 21v-1.5a7 7 0 0 1 14 0V21"/></>,
  "users":        <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M2 21v-1a6 6 0 0 1 12 0v1M15 21v-1a5 5 0 0 1 7 0"/></>,
  "briefcase":    <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/></>,
  "building":     <><path d="M4 21V5l8-3 8 3v16M9 9h2M13 9h2M9 13h2M13 13h2M9 17h2M13 17h2"/></>,
  "globe":        <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
  "phone":        <><path d="M22 17v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7 12.8 12.8 0 0 0 .7 2.8 2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5 12.8 12.8 0 0 0 2.8.7 2 2 0 0 1 1.7 2z"/></>,
  "mail":         <><rect x="2" y="4.5" width="20" height="15" rx="2"/><path d="m22 7-10 6L2 7"/></>,
  "map-pin":      <><path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></>,
  "file-text":    <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M9 13h6M9 17h4"/></>,
  "send":         <><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></>,
  "plane":        <><path d="M17 8 22 4l-1 6-8 5 2 7-2 1-3-6-6-3 1-2 7 2 5-8z"/></>,
  "graduation":   <><path d="M12 3 1 9l11 6 9-4.9V17M5 13v5l7 3 7-3v-5"/></>,
  "wrench":       <><path d="M14.7 6.3a4 4 0 1 0 5 5L21 13l-7 7a2 2 0 0 1-3 0l-3-3 8-8z"/></>,
  "package":      <><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.3 7 12 12l8.7-5M12 22V12"/></>,
  "stethoscope":  <><path d="M6 3v6a4 4 0 0 0 8 0V3M6 3h2M12 3h2M10 13v3a4 4 0 0 0 8 0v-1"/><circle cx="18" cy="14" r="2"/></>,
  "scale":         <><path d="M12 3v18M5 21h14M5 8l-3 7a4 4 0 0 0 6 0L5 8zM19 8l-3 7a4 4 0 0 0 6 0l-3-7zM5 8h14"/></>,
  "calendar":      <><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
  "chevron-down": <><path d="m6 9 6 6 6-6"/></>,
  "chevron-right":<><path d="m9 6 6 6-6 6"/></>,
  "arrow-up-right":<><path d="M7 17 17 7M7 7h10v10"/></>,
  "menu":         <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  "x":            <><path d="M18 6 6 18M6 6l12 12"/></>,
  "check":        <><path d="m5 12 5 5 9-11"/></>,
  "upload":       <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></>,
  "info":         <><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/></>,
  "alert":        <><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></>,
};
function Icon({ name, size = 20, strokeWidth = 2, color = "currentColor", style, className, children }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}
      style={{ stroke: color, strokeWidth, fill: "none", strokeLinecap: "round", strokeLinejoin: "round", display: "block", ...style }}>
      {children || ICONS[name] || null}
    </svg>
  );
}

/* =============================================================
   Buttons
   ============================================================= */
function Button({ as = "button", variant = "apply", size = "default", block, children, ...rest }) {
  const Tag = as;
  const cls = `btn btn-${variant} btn-${size}` + (block ? " btn-block" : "");
  return <Tag className={cls} {...rest}>{children}</Tag>;
}

/* =============================================================
   Licence pill — gold trust marker
   ============================================================= */
function LicencePill({ children = "BMET Licensed · RL-2567" }) {
  return <span className="lic-pill">{children}</span>;
}

/* =============================================================
   Eyebrow overline + section header
   ============================================================= */
function Eyebrow({ children }) { return <span className="eyebrow">{children}</span>; }
function SectionHead({ eyebrow, title, lead, align = "left" }) {
  return (
    <header className="section-head" style={{ textAlign: align, alignItems: align === "center" ? "center" : "flex-start" }}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="h2">{title}</h2>
      {lead ? <p className="lead">{lead}</p> : null}
    </header>
  );
}

/* =============================================================
   Input + Field
   ============================================================= */
function Field({ label, required, help, error, success, children, id }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}{required ? <span className="req"> *</span> : null}</label>
      {children}
      {error ? <span className="err"><Icon name="alert" size={14}/> {error}</span>
        : success ? <span className="help success">{success}</span>
        : help ? <span className="help">{help}</span> : null}
    </div>
  );
}
function Input({ error, success, ...rest }) {
  const cls = "inp" + (error ? " is-error" : success ? " is-success" : "");
  return <input className={cls} {...rest} />;
}
function Textarea({ error, ...rest }) {
  const cls = "inp ta" + (error ? " is-error" : "");
  return <textarea className={cls} {...rest} />;
}
function Select({ children, error, ...rest }) {
  const cls = "inp sel" + (error ? " is-error" : "");
  return (
    <div className="sel-wrap">
      <select className={cls} {...rest}>{children}</select>
      <Icon name="chevron-down" size={16} color="var(--ink-500)" className="sel-caret" />
    </div>
  );
}

/* =============================================================
   Alert
   ============================================================= */
function Alert({ variant = "info", title, children }) {
  const iconName = variant === "success" ? "check" : variant === "error" ? "alert" : "info";
  return (
    <div className={`alert alert-${variant}`}>
      <span className="alert-ic"><Icon name={iconName} size={14} color="#fff"/></span>
      <div>
        {title ? <p className="alert-ttl">{title}</p> : null}
        <p className="alert-msg">{children}</p>
      </div>
    </div>
  );
}

/* Export to window so other Babel scripts see them */

export { Icon, Button, LicencePill, Eyebrow, SectionHead, Field, Input, Textarea, Select, Alert };
