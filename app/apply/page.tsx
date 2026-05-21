import { WorkerForm } from "@/components/WorkerForm";

export default function Page() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-arc small" />
        <div className="container">
          <span className="eyebrow" style={{ color: "#7fd9e3" }}>
            Worker Registration
          </span>
          <h1 className="display-l" style={{ color: "#fff", marginTop: 8 }}>
            Apply to work abroad.
          </h1>
          <p className="page-hero-lead">
            Tell us about you and the work you do. We respond on WhatsApp
            within one working day.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="form-page">
          <WorkerForm />
        </div>
      </section>
    </>
  );
}
