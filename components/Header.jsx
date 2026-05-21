"use client";
import { useState } from "react";
import { Icon, Button, LicencePill } from "./Primitives";

function UtilityBar() {
  return (
    <div className="utility-bar">
      <div className="container util-row">
        <LicencePill>BMET Licensed · RL-2567</LicencePill>
        <div className="util-right">
          <a href="tel:+8801678137040" className="util-link">
            <Icon name="phone" size={14}/> +880 1678 137040
          </a>
          <span className="util-sep" />
          <span className="util-link"><Icon name="shield-check" size={14}/> BAIRA Member</span>
        </div>
      </div>
    </div>
  );
}

function NavItem({ label, children, active, activeChild, onChildClick, onClick }) {
  const [open, setOpen] = useState(false);
  if (!children) {
    return (
      <a className={"nav-link" + (active ? " active" : "")} href="#"
        onClick={(e) => { if (onClick) { e.preventDefault(); onClick(); } }}>
        {label}
      </a>
    );
  }
  return (
    <div className="nav-item" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className={"nav-link" + (active ? " active" : "")}>
        {label} <Icon name="chevron-down" size={14}/>
      </button>
      {open ? (
        <div className="nav-drop">
          {children.map((c, i) => {
            const item = typeof c === "string" ? { label: c } : c;
            const cls = "drop-link" + (activeChild === item.label ? " current" : "");
            return (
              <a key={i} href="#" className={cls}
                onClick={(e) => { e.preventDefault(); onChildClick && onChildClick(item); }}>
                {item.label}
              </a>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function Header({ onNavigate, route }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (r) => (e) => { e.preventDefault(); setMobileOpen(false); onNavigate && onNavigate(r); };

  return (
    <>
      <UtilityBar />
      <header className="site-header">
        <div className="container header-row">
          <a href="#" className="brand" onClick={go("home")}>
            <img src="/sns-logo.png" alt="SNS Overseas" />
          </a>
          <nav className="nav-desktop">
            <NavItem label="About"
              active={route === "company" || route === "about" || route === "why" || route === "team" || route === "md" || route === "about-bangladesh"}
              activeChild={
                route === "company" ? "Company Overview"
                : route === "why" ? "Why Choose Us"
                : route === "team" ? "Leadership & Team"
                : route === "md" ? "MD's Message"
                : route === "about-bangladesh" ? "About Bangladesh"
                : null
              }
              onChildClick={(it) => {
                if (it.label === "Company Overview")   onNavigate && onNavigate("company");
                if (it.label === "Why Choose Us")      onNavigate && onNavigate("why");
                if (it.label === "Leadership & Team")  onNavigate && onNavigate("team");
                if (it.label === "MD's Message")       onNavigate && onNavigate("md");
                if (it.label === "About Bangladesh")   onNavigate && onNavigate("about-bangladesh");
              }}
              children={["Company Overview","MD's Message","Leadership & Team","Why Choose Us","About Bangladesh"]}/>
            <NavItem label="Services" active={route === "services"} onClick={() => onNavigate && onNavigate("services")} />
            <NavItem label="Worker Categories" active={route === "worker-categories"} onClick={() => onNavigate && onNavigate("worker-categories")} />
            <NavItem label="Training & Testing Center" active={route === "training-testing-center"} onClick={() => onNavigate && onNavigate("training-testing-center")} />
            <NavItem label="Clients" active={route === "clients"} onClick={() => onNavigate && onNavigate("clients")} />
            <NavItem label="Credentials" active={route === "credentials"} onClick={() => onNavigate && onNavigate("credentials")} />
            <NavItem label="Medical Report" active={route === "medical-report"} onClick={() => onNavigate && onNavigate("medical-report")} />
            <NavItem label="Registration"
              active={route === "apply" || route === "worker-registration" || route === "agent-registration" || route === "demand-submission"}
              activeChild={
                route === "worker-registration" ? "Apply as a Worker"
                : route === "apply" ? "Apply as a Worker"
                : route === "demand-submission" ? "Hire Workers"
                : route === "agent-registration" ? "Become an Agent"
                : null
              }
              onChildClick={(it) => {
                if (it.label === "Apply as a Worker") onNavigate && onNavigate("worker-registration");
                if (it.label === "Hire Workers")      onNavigate && onNavigate("demand-submission");
                if (it.label === "Become an Agent")   onNavigate && onNavigate("agent-registration");
              }}
              children={["Apply as a Worker","Hire Workers","Become an Agent"]}/>
            <NavItem label="Gallery"
              active={route === "office-gallery" || route === "training-gallery"}
              activeChild={
                route === "office-gallery"   ? "Office Gallery"
                : route === "training-gallery" ? "Training & Testing Gallery"
                : null
              }
              onChildClick={(it) => {
                if (it.label === "Office Gallery")              onNavigate && onNavigate("office-gallery");
                if (it.label === "Training & Testing Gallery") onNavigate && onNavigate("training-gallery");
              }}
              children={["Office Gallery","Training & Testing Gallery"]}/>
            <NavItem label="Contact" active={route === "contact"} onClick={() => onNavigate && onNavigate("contact")} />
          </nav>
          <div className="header-cta">
            <Button variant="outline" size="small" onClick={go("demand-submission")}>Hire Workers</Button>
            <Button variant="apply" size="small" onClick={go("apply")}>Apply Now</Button>
          </div>
          <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "x" : "menu"} size={22} color="var(--navy-800)"/>
          </button>
        </div>
        {mobileOpen ? (
          <div className="nav-mobile">
            <a className="nav-link" onClick={go("home")}>Home</a>
            <div className="nav-mobile-group">
              <a className="nav-link nav-group-head">About</a>
              <a className={"nav-link nav-sub" + (route === "company" ? " current" : "")} onClick={go("company")}>Company Overview</a>
              <a className={"nav-link nav-sub" + (route === "md" ? " current" : "")} onClick={go("md")}>MD's Message</a>
              <a className={"nav-link nav-sub" + (route === "team" ? " current" : "")} onClick={go("team")}>Leadership & Team</a>
              <a className={"nav-link nav-sub" + (route === "why" ? " current" : "")} onClick={go("why")}>Why Choose Us</a>
              <a className={"nav-link nav-sub" + (route === "about-bangladesh" ? " current" : "")} onClick={go("about-bangladesh")}>About Bangladesh</a>
            </div>
            <a className={"nav-link" + (route === "services" ? " current" : "")} onClick={go("services")}>Services</a>
            <a className={"nav-link" + (route === "worker-categories" ? " current" : "")} onClick={go("worker-categories")}>Worker Categories</a>
            <a className={"nav-link" + (route === "training-testing-center" ? " current" : "")} onClick={go("training-testing-center")}>Training & Testing Center</a>
            <a className={"nav-link" + (route === "clients" ? " current" : "")} onClick={go("clients")}>Clients</a>
            <a className={"nav-link" + (route === "credentials" ? " current" : "")} onClick={go("credentials")}>Credentials</a>
            <a className={"nav-link" + (route === "medical-report" ? " current" : "")} onClick={go("medical-report")}>Medical Report</a>
            <a className={"nav-link" + (route === "worker-registration" || route === "apply" ? " current" : "")} onClick={go("worker-registration")}>Apply as a Worker</a>
            <a className={"nav-link" + (route === "demand-submission" ? " current" : "")} onClick={go("demand-submission")}>Hire Workers</a>
            <a className={"nav-link" + (route === "agent-registration" ? " current" : "")} onClick={go("agent-registration")}>Become an Agent</a>
            <div className="nav-mobile-group">
              <a className="nav-link nav-group-head">Gallery</a>
              <a className={"nav-link nav-sub" + (route === "office-gallery" ? " current" : "")} onClick={go("office-gallery")}>Office Gallery</a>
              <a className={"nav-link nav-sub" + (route === "training-gallery" ? " current" : "")} onClick={go("training-gallery")}>Training &amp; Testing Gallery</a>
            </div>
            <a className={"nav-link" + (route === "contact" ? " current" : "")} onClick={go("contact")}>Contact</a>
            <div className="m-cta">
              <Button variant="outline" block onClick={go("demand-submission")}>Hire Workers</Button>
              <Button variant="apply" block onClick={go("worker-registration")}>Apply Now</Button>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}

export { Header };
