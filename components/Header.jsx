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
            <Icon name="phone" size={14} /> +880 1678 137040
          </a>
          <span className="util-sep" />
          <span className="util-link"><Icon name="shield-check" size={14} /> BAIRA Member</span>
        </div>
      </div>
    </div>
  );
}

/* Maps a route name to the dropdown child label that should show as current. */
const NAV_ACTIVE_CHILD = {
  company: "Company Overview",
  why: "Why Choose Us",
  md: "Managing Director's Message",
  team: "Leadership & Team",
  "about-bangladesh": "About Bangladesh",
  services: "Services",
  "worker-categories": "Worker Categories",
  "training-testing-center": "Training & Testing Center",
  "medical-report": "Medical Report",
  clients: "Clients",
  credentials: "Credentials & Documentation",
  "worker-registration": "Worker Registration",
  apply: "Worker Registration",
  "agent-registration": "Agent Registration",
  "demand-submission": "Demand Submission",
  "office-gallery": "Office Gallery",
  "training-gallery": "Training & Testing Gallery",
};

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
        {label} <Icon name="chevron-down" size={14} />
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
      {/* <UtilityBar /> */}
      <header className="site-header">
        <div className="container header-row">
          <a href="#" className="brand" onClick={go("home")}>
            <img src="/sns-logo.png" alt="SNS Overseas" />
          </a>
          <nav className="nav-desktop">
            <NavItem label="About"
              active={["company", "about", "why", "team", "md", "about-bangladesh"].includes(route)}
              activeChild={NAV_ACTIVE_CHILD[route] || null}
              onChildClick={(it) => onNavigate && onNavigate(it.route)}
              children={[
                { label: "Company Overview", route: "company" },
                { label: "Why Choose Us", route: "why" },
                { label: "Managing Director's Message", route: "md" },
                { label: "Leadership & Team", route: "team" },
                { label: "About Bangladesh", route: "about-bangladesh" },
              ]} />
            <NavItem label="Services"
              active={["services", "worker-categories", "training-testing-center", "medical-report"].includes(route)}
              activeChild={NAV_ACTIVE_CHILD[route] || null}
              onChildClick={(it) => onNavigate && onNavigate(it.route)}
              children={[
                { label: "Services", route: "services" },
                { label: "Worker Categories", route: "worker-categories" },
                { label: "Training & Testing Center", route: "training-testing-center" },
                { label: "Medical Report", route: "medical-report" },
              ]} />
            <NavItem label="Credentials"
              active={["clients", "credentials"].includes(route)}
              activeChild={NAV_ACTIVE_CHILD[route] || null}
              onChildClick={(it) => onNavigate && onNavigate(it.route)}
              children={[
                { label: "Clients", route: "clients" },
                { label: "Credentials & Documentation", route: "credentials" },
              ]} />
            <NavItem label="Registration"
              active={["worker-registration", "apply", "agent-registration", "demand-submission"].includes(route)}
              activeChild={NAV_ACTIVE_CHILD[route] || null}
              onChildClick={(it) => onNavigate && onNavigate(it.route)}
              children={[
                { label: "Worker Registration", route: "worker-registration" },
                { label: "Agent Registration", route: "agent-registration" },
                { label: "Demand Submission", route: "demand-submission" },
              ]} />
            <NavItem label="Gallery"
              active={["office-gallery", "training-gallery"].includes(route)}
              activeChild={NAV_ACTIVE_CHILD[route] || null}
              onChildClick={(it) => onNavigate && onNavigate(it.route)}
              children={[
                { label: "Office Gallery", route: "office-gallery" },
                { label: "Training & Testing Gallery", route: "training-gallery" },
              ]} />
          </nav>
          <div className="header-cta">
            <Button variant="apply" size="small" onClick={go("contact")}>Contact</Button>
          </div>
          {/* <div className="header-cta">
            <Button variant="outline" size="small" onClick={go("demand-submission")}>Hire Workers</Button>
            <Button variant="apply" size="small" onClick={go("apply")}>Apply Now</Button>
          </div> */}
          <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "x" : "menu"} size={22} color="var(--navy-800)" />
          </button>
        </div>
        {mobileOpen ? (
          <div className="nav-mobile">
            <a className="nav-link" onClick={go("home")}>Home</a>
            <div className="nav-mobile-group">
              <a className="nav-link nav-group-head">About</a>
              <a className={"nav-link nav-sub" + (route === "company" ? " current" : "")} onClick={go("company")}>Company Overview</a>
              <a className={"nav-link nav-sub" + (route === "why" ? " current" : "")} onClick={go("why")}>Why Choose Us</a>
              <a className={"nav-link nav-sub" + (route === "md" ? " current" : "")} onClick={go("md")}>Managing Director&apos;s Message</a>
              <a className={"nav-link nav-sub" + (route === "team" ? " current" : "")} onClick={go("team")}>Leadership & Team</a>
              <a className={"nav-link nav-sub" + (route === "about-bangladesh" ? " current" : "")} onClick={go("about-bangladesh")}>About Bangladesh</a>
            </div>
            <div className="nav-mobile-group">
              <a className="nav-link nav-group-head">Services</a>
              <a className={"nav-link nav-sub" + (route === "services" ? " current" : "")} onClick={go("services")}>Services</a>
              <a className={"nav-link nav-sub" + (route === "worker-categories" ? " current" : "")} onClick={go("worker-categories")}>Worker Categories</a>
              <a className={"nav-link nav-sub" + (route === "training-testing-center" ? " current" : "")} onClick={go("training-testing-center")}>Training & Testing Center</a>
              <a className={"nav-link nav-sub" + (route === "medical-report" ? " current" : "")} onClick={go("medical-report")}>Medical Report</a>
            </div>
            <div className="nav-mobile-group">
              <a className="nav-link nav-group-head">Credentials</a>
              <a className={"nav-link nav-sub" + (route === "clients" ? " current" : "")} onClick={go("clients")}>Clients</a>
              <a className={"nav-link nav-sub" + (route === "credentials" ? " current" : "")} onClick={go("credentials")}>Credentials & Documentation</a>
            </div>
            <div className="nav-mobile-group">
              <a className="nav-link nav-group-head">Registration</a>
              <a className={"nav-link nav-sub" + (route === "worker-registration" || route === "apply" ? " current" : "")} onClick={go("worker-registration")}>Worker Registration</a>
              <a className={"nav-link nav-sub" + (route === "agent-registration" ? " current" : "")} onClick={go("agent-registration")}>Agent Registration</a>
              <a className={"nav-link nav-sub" + (route === "demand-submission" ? " current" : "")} onClick={go("demand-submission")}>Demand Submission</a>
            </div>
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
