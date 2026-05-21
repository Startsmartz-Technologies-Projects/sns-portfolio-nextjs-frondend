"use client";
import { Icon } from "./Primitives";

function TrustStrip() {
  const items = [
    { icon: "shield-check", t: "Licence RL-2567",  s: "Issued by BMET" },
    { icon: "users",        t: "BAIRA Member",      s: "Recognised association" },
    { icon: "building",     t: "Govt. Regulated",   s: "Migrants Act, 2013" },
    { icon: "graduation",   t: "In-house Training", s: "Own testing centre" },
  ];
  return (
    <div className="container trust-wrap">
      <div className="trust-strip">
        {items.map((it, i) => (
          <div className="trust-item" key={i}>
            <div className="trust-tile"><Icon name={it.icon} size={18} color="#fff"/></div>
            <div className="trust-txt">
              <div className="trust-t">{it.t}</div>
              <div className="trust-s">{it.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { TrustStrip };
