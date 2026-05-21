"use client";


function Stats() {
  const items = [
    { v: "9",    l: "Construction trades" },
    { v: "6+",   l: "Countries served" },
    { v: "2022", l: "Established" },
  ];
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="stat-block">
          {items.map((it, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-v">{it.v}</div>
              <div className="stat-l">{it.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Stats };
