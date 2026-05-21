"use client";
import { Icon, Button, LicencePill } from "./Primitives";

function Footer({ onNavigate }) {
  const go = (r) => (e) => { e.preventDefault(); onNavigate && onNavigate(r); };
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="foot-col foot-brand">
            <img src="/sns-logo-reversed.png" alt="SNS Overseas" className="foot-logo"/>
            <p className="foot-addr">
              BHSK Shun Shing Tower,<br/>Aziz Sarak, Dhaka-1229, Bangladesh
            </p>
            <p className="foot-line"><Icon name="phone" size={14}/> +880 1678 137040</p>
            <p className="foot-line"><Icon name="mail" size={14}/> snsoverseas1977@gmail.com</p>
            <div style={{marginTop:12}}><LicencePill/></div>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <a href="#" onClick={go("company")}>About SNS Overseas</a>
            <a href="#" onClick={go("why")}>Why Choose Us</a>
            <a href="#" onClick={go("team")}>Leadership & Team</a>
            <a href="#" onClick={go("credentials")}>Credentials</a>
          </div>
          <div className="foot-col">
            <h5>For You</h5>
            <a href="#" onClick={go("worker-registration")}>Apply as a Worker</a>
            <a href="#" onClick={go("demand-submission")}>Hire Workers</a>
            <a href="#" onClick={go("agent-registration")}>Become an Agent</a>
            <a href="#" onClick={go("medical-report")}>Medical Report</a>
          </div>
          <div className="foot-col foot-cta">
            <h5>Get started</h5>
            <p className="foot-cta-line">Ready to take the next step? Register in minutes.</p>
            <Button variant="apply" size="small" onClick={go("worker-registration")}>Apply Now</Button>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 SNS Overseas. All rights reserved.</span>
          <span>BAIRA Member · Trade Licence TRAD/DNCC/054873/2022 · <a href="#" onClick={(e) => e.preventDefault()}>Privacy Notice</a></span>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
