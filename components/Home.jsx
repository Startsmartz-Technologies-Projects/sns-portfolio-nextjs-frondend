"use client";
import { Icon, Button, Eyebrow, SectionHead } from "./Primitives";
import { TrustStrip } from "./TrustStrip";
import { ProcessSteps } from "./ProcessSteps";
import { RESOURCE_IMAGES, HERO_VIDEO } from "./mediaAssets";

/* =============================================================
   SNS Overseas — Home page composition
   Page 1 of 18 · SRS FR-1, FR-3 – FR-18
   Order: Hero · Trust strip · Services (3) · Sectors (3) ·
          Training band · Countries · Employer value · Clients ·
          Process · Closing CTA · (Footer + FAB live in App shell)

   Scroll reveal (fade + slide-up) is applied site-wide and
   automatically by <AutoReveal> in app/layout.tsx — no per-section
   markup is needed here. See app/styles/reveal.css.
   ============================================================= */

/* ----------------------------------------------------------------
   Section 2 — Dual-CTA hero (FR-9 · FR-6 self-identification)
---------------------------------------------------------------- */
function HomeHero({ onApply, onHire }) {
  return (
    <section className="hero home-hero home-hero-video" data-screen-label="01 Home — Hero">
      <video
        className="hero-bg-video"
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="hero-bg-overlay" aria-hidden="true" />
      <div className="hero-arc" />
      <div className="container home-hero-grid">
        <div className="hero-copy">
          <Eyebrow>Licensed Overseas Manpower Recruitment</Eyebrow>
          <h1 className="display-xl hero-h">
            A trusted route from Bangladesh to skilled work abroad.
          </h1>
          <p className="hero-lead">
            A BMET-licensed recruiting agency based in Dhaka, SNS Overseas
            selects, trains and trade-tests Bangladeshi workers — then handles
            every step through to deployment with overseas employers across
            the Gulf and Malaysia.
          </p>
          <div className="hero-ctas">
            <Button variant="apply" size="large" onClick={onApply}>
              I'm looking for work <Icon name="arrow-up-right" size={18} />
            </Button>
            <Button variant="outline-dark" size="large" onClick={onHire}>
              I want to hire workers
            </Button>
          </div>
          <div className="hero-meta">
            <span><Icon name="shield-check" size={14} color="#7fd9e3"/> Licence RL-2567 · BMET</span>
            <span><Icon name="building" size={14} color="#7fd9e3"/> Dhaka HQ · serving 6 countries</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Section 4 — Services summary (FR-11)
---------------------------------------------------------------- */
function HomeServicesPreview({ go }) {
  const items = [
    { icon: "users",      t: "Worker Selection & Recruitment", d: "Sourcing, vetting and matching candidates to your demand letter." },
    { icon: "graduation", t: "Skills Development Training",    d: "In-house training across construction, hospitality and more." },
    { icon: "wrench",     t: "Skills & Trade Testing",         d: "Standardised trade tests so employers get verified candidates." },
  ];
  return (
    <section className="section" data-screen-label="01 Home — Services">
      <div className="container">
        <SectionHead
          eyebrow="Our services"
          title="Eight services. Three to begin with."
          lead="From sourcing through to deployment, every step is handled in-house or with named partners."
        />
        <div className="svc-grid svc-grid-3">
          {items.map((s, i) => (
            <article className="svc-card" key={i}>
              <div className="svc-icon"><Icon name={s.icon} size={26} color="var(--navy-500)"/></div>
              <h3 className="h4">{s.t}</h3>
              <p>{s.d}</p>
            </article>
          ))}
        </div>
        <div className="sec-foot">
          <a href="#" className="link-ghost" onClick={go && go("services")}>View all services <Icon name="arrow-up-right" size={14}/></a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Section 5 — Worker categories preview (FR-12)
   Sector card with photo header, navy overlay, sector name bottom-left.
---------------------------------------------------------------- */
function HomeSectorsPreview({ go }) {
  const sectors = [
    {
      name: "Construction",
      tag: "9 trades",
      desc: "Steel reinforcement, plastering, tiling, plumbing & six more named trades.",
      grad: "linear-gradient(135deg, #15498A 0%, #1565C0 50%, #00ACC1 100%)",
      img: RESOURCE_IMAGES.construction,
      icon: "wrench",
    },
    {
      name: "Hospitality & Catering",
      tag: "Sector",
      desc: "Cooks, chefs, kitchen helpers, waiters and food-service staff.",
      grad: "linear-gradient(135deg, #103A6B 0%, #008CA8 60%, #4DB6AC 100%)",
      img: RESOURCE_IMAGES.hotel,
      icon: "package",
    },
    {
      name: "Drivers",
      tag: "Sector",
      desc: "Light, heavy, and equipment drivers for the Gulf states.",
      grad: "linear-gradient(135deg, #0B2C54 0%, #15498A 55%, #00ACC1 100%)",
      img: RESOURCE_IMAGES.drivers,
      icon: "briefcase",
    },
  ];

  return (
    <section className="section section-alt" data-screen-label="01 Home — Sectors">
      <div className="container">
        <SectionHead
          eyebrow="Worker categories"
          title="A curated pool across seven sectors."
          lead="Three previewed below. Construction carries the nine named trades; full taxonomy on the categories page."
        />
        <div className="sector-grid">
          {sectors.map((s, i) => (
            <article className="sector-card" key={i}>
              <div className="sector-photo" style={{background: s.grad}}>
                {s.img ? (
                  <img className="sector-photo-img" src={s.img} alt="" loading="lazy" decoding="async"/>
                ) : null}
                <div className="sector-photo-stripes" />
                <span className="sector-tag-pill">{s.tag}</span>
                <Icon name={s.icon} size={42} color="rgba(255,255,255,.22)" className="sector-photo-ic"/>
                <h3 className="sector-name">{s.name}</h3>
              </div>
              <div className="sector-body">
                <p>{s.desc}</p>
                <a className="sector-link" href="#" onClick={go && go("worker-categories")}>View all trades <Icon name="chevron-right" size={14}/></a>
              </div>
            </article>
          ))}
        </div>
        <div className="sec-foot">
          <a href="#" className="link-ghost" onClick={go && go("worker-categories")}>View all categories <Icon name="arrow-up-right" size={14}/></a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Section 6 — Training & Testing feature band (FR-13)
---------------------------------------------------------------- */
function HomeTrainingBand({ go }) {
  return (
    <section className="feature-band home-feature-band" data-screen-label="01 Home — Training">
      <div className="hero-arc" />
      <div className="container feature-band-grid">
        <div>
          <Eyebrow>Training & Testing centre</Eyebrow>
          <h2 className="h2">An in-house facility — not a referral.</h2>
          <p className="feature-lead">
            Candidates train and trade-test under one roof before they leave
            Bangladesh, so employers receive deployment-ready workers with
            documented skills.
          </p>
          <ul className="feature-band-bullets">
            <li>Trade-test bays for construction roles</li>
            <li>Hospitality kitchen and service mock-up</li>
            <li>Driving theory and assessment</li>
            <li>Certificates kept in worker profile</li>
          </ul>
          <div className="feature-band-ctas">
            <Button variant="outline-dark" size="default" onClick={go && go("training-testing-center")}>
              Visit the centre <Icon name="arrow-up-right" size={16}/>
            </Button>
          </div>
        </div>
        <div className="facility-frame">
          <div className="facility-inner">
            <img
              className="facility-img"
              src="https://res.cloudinary.com/dk4csiouq/image/upload/v1779518346/WhatsApp_Image_2026-05-23_at_12.21.00_PM_y82k1i.jpg"
              alt="SNS Overseas training centre"
              loading="lazy"
              decoding="async"
            />
            <div className="facility-arc" />
            <span className="facility-tag">Training centre</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Section 7 — Countries we serve (FR-14)
   Six tiles in canonical order.
---------------------------------------------------------------- */
function HomeCountries({ go }) {
  const countries = [
    "Saudi Arabia", "UAE", "Kuwait", "Qatar", "Oman", "Malaysia",
  ];
  return (
    <section className="section" data-screen-label="01 Home — Countries">
      <div className="container">
        <SectionHead
          eyebrow="Countries we serve"
          title="Six destinations across the Gulf and Southeast Asia."
          align="center"
        />
        <div className="country-grid">
          {countries.map((c, i) => (
            <a className="country-tile" href="#" key={i} onClick={go && go("worker-categories")}>
              <div className="country-icon">
                <Icon name="map-pin" size={22} color="var(--navy-500)"/>
              </div>
              <div className="country-name">{c}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Section 8 — Employer value block (FR-15)
   Split panel · employer copy left, stat block right.
---------------------------------------------------------------- */
function HomeEmployerBlock({ go }) {
  return (
    <section className="section section-alt" data-screen-label="01 Home — Employers">
      <div className="container emp-grid">
        <div className="emp-copy">
          <Eyebrow>For employers</Eyebrow>
          <h2 className="h2">A pool of trained, job-ready workers.</h2>
          <p>
            Every worker we put forward is sourced, screened and prepared
            in-house. Our own training and trade-testing centre means
            candidates arrive with documented skills — so you receive
            deployment-ready workers matched to your demand letter.
          </p>
          <p>
            As a BMET-licensed agency (RL-2567) and BAIRA member, we complete
            medical, visa and ministry formalities under the Overseas
            Employment and Migrants Act, 2013 — giving you a single,
            accountable partner from demand letter to arrival.
          </p>
          <div className="emp-actions">
            <Button variant="hire" size="default" onClick={go && go("demand-submission")}>
              Submit a demand letter <Icon name="arrow-up-right" size={16}/>
            </Button>
          </div>
        </div>
        <div className="emp-stats stat-block">
          <div className="stat-item">
            <div className="stat-v">9</div>
            <div className="stat-l">Construction trades</div>
          </div>
          <div className="stat-item">
            <div className="stat-v">6+</div>
            <div className="stat-l">Countries served</div>
          </div>
          <div className="stat-item">
            <div className="stat-v">2022</div>
            <div className="stat-l">Established</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Section 9 — Clients preview (FR-16)
   Placeholder name tiles — spec allows when logos not yet supplied.
---------------------------------------------------------------- */
function HomeClients({ go }) {
  // A representative selection of real clients across the regions we serve;
  // the full list lives on the Clients page.
  const slots = [
    { name: "Arabian Gulf Co.",            country: "Saudi Arabia" },
    { name: "Gulf Catering Company",       country: "Saudi Arabia" },
    { name: "Pizza Hut",                   country: "Saudi Arabia" },
    { name: "Al Manar Company",            country: "Saudi Arabia" },
    { name: "Al Osaim Poultry Farm",       country: "Saudi Arabia" },
    { name: "Akasem Industries Sdn. Bhd.", country: "Malaysia" },
    { name: "Noble Carpets Sdn. Bhd.",     country: "Malaysia" },
    { name: "Win Wood Work Sdn. Bhd.",     country: "Malaysia" },
    { name: "National Cleaning Company",   country: "Kuwait" },
    { name: "Bel Hasa Projects LLC.",      country: "UAE" },
  ];
  return (
    <section className="section" data-screen-label="01 Home — Clients">
      <div className="container">
        <SectionHead
          eyebrow="Selected clients we have served"
          title="Employers across the Gulf and Malaysia."
          lead="A selection of the overseas employers we have recruited for — see the full list on the Clients page."
          align="center"
        />
        <div className="clients-grid">
          {slots.map((s, i) => (
            <div className="client-tile" key={i}>
              <span className="client-tile-mark">{s.name}</span>
              <span className="client-tile-meta">{s.country}</span>
            </div>
          ))}
        </div>
        <div className="sec-foot">
          <a href="#" className="link-ghost" onClick={go && go("clients")}>See all clients <Icon name="arrow-up-right" size={14}/></a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Section 10 — Process steps (FR-17)
   Reuses existing ProcessSteps but wraps on surface-2 for rhythm.
---------------------------------------------------------------- */
function HomeProcessBand() {
  return (
    <div className="home-process section-alt">
      <ProcessSteps />
    </div>
  );
}

/* ----------------------------------------------------------------
   Section 11 — Closing dual-CTA band (FR-18 · FR-6)
   Mirrors the hero so the page bookends with self-ID split.
---------------------------------------------------------------- */
function HomeClosingCta({ onApply, onHire }) {
  return (
    <section className="contact-band home-closing" data-screen-label="01 Home — Closing CTA">
      <div className="closing-arc" />
      <div className="container contact-band-inner">
        <div className="contact-band-copy">
          <span className="eyebrow" style={{color:"#7fd9e3"}}>Get started</span>
          <h2 className="h2" style={{color:"#fff", marginTop:6}}>Pick the door that fits you.</h2>
          <p className="closing-lead">
            Whether you are looking for work overseas or looking to hire
            skilled workers, choose your path below and our team will guide
            you from there.
          </p>
        </div>
        <div className="contact-band-ctas">
          <Button variant="apply" size="large" onClick={onApply}>
            Apply Now <Icon name="arrow-up-right" size={18}/>
          </Button>
          <Button variant="outline-dark" size="large" onClick={onHire}>
            Hire Workers
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Composition — drop-in HomeScreen used by the App router.
---------------------------------------------------------------- */
function HomeScreen({ navigate }) {
  const go = (r) => () => navigate && navigate(r);
  /* link variant — prevents the default "#" jump before navigating */
  const goLink = (r) => (e) => { e.preventDefault(); navigate && navigate(r); };
  return (
    <>
      <HomeHero onApply={go("worker-registration")} onHire={go("demand-submission")} />
      <TrustStrip />
      <HomeServicesPreview go={goLink} />
      <HomeSectorsPreview go={goLink} />
      <HomeTrainingBand go={go} />
      <HomeCountries go={goLink} />
      <HomeEmployerBlock go={go} />
      <HomeClients go={goLink} />
      <HomeProcessBand />
      <HomeClosingCta onApply={go("worker-registration")} onHire={go("demand-submission")} />
    </>
  );
}

export { HomeHero, HomeServicesPreview, HomeSectorsPreview, HomeTrainingBand, HomeCountries, HomeEmployerBlock, HomeClients, HomeProcessBand, HomeClosingCta, HomeScreen };
