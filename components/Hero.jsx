"use client";
import { Icon, Button, Eyebrow } from "./Primitives";

function Hero({ onApply, onHire }) {
  return (
    <section className="hero">
      <div className="hero-arc" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <Eyebrow>BMET Licensed · RL-2567 · BAIRA Member</Eyebrow>
          <h1 className="display-xl hero-h">A trusted route from Bangladesh to skilled work abroad.</h1>
          <p className="hero-lead">
            BMET-licensed and BAIRA-member, SNS Overseas recruits, trains, tests
            and deploys workers across the Gulf states and Malaysia.
          </p>
          <div className="hero-ctas">
            <Button variant="apply" size="large" onClick={onApply}>
              I'm looking for work <Icon name="arrow-up-right" size={18}/>
            </Button>
            <Button variant="outline-dark" size="large" onClick={onHire}>
              I want to hire workers
            </Button>
          </div>
          <div className="hero-meta">
            <span><Icon name="shield-check" size={14} color="#7fd9e3"/> Govt. regulated under Migrants Act, 2013</span>
            <span><Icon name="building" size={14} color="#7fd9e3"/> Dhaka HQ · serving 6 countries</span>
          </div>
        </div>
        <div className="hero-photo" aria-hidden="true">
          <div className="hero-photo-inner">
            <span className="photo-note">Photography placeholder<br/><em>real workers / training centre</em></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
