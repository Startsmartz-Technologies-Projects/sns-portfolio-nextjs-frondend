"use client";
import { SectionHead } from "./Primitives";

function ProcessSteps() {
  const steps = [
    { n: 1, t: "Register",        d: "Share your details on the worker registration form." },
    { n: 2, t: "Screen & Train",  d: "Skills testing and training at our own facility." },
    { n: 3, t: "Process",         d: "Medical clearance, visa processing and ministry formalities." },
    { n: 4, t: "Deploy",          d: "Travel arranged. You start work in your destination country." },
  ];
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="How it works"
          title="Four steps from registration to deployment."
          align="center"
        />
        <div className="steps">
          {steps.map((s) => (
            <div className="step" key={s.n}>
              <div className="step-num">{s.n}</div>
              <h4 className="h4">{s.t}</h4>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { ProcessSteps };
