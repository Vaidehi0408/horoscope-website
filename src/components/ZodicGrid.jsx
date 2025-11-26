import React from "react";

/**
 * Grid of 12 zodiac cards.
 * Props:
 *  - signs: array of {id, name, range, symbol, color}
 *  - onSelect(signObj)
 *  - selected
 */
export default function ZodiacGrid({ signs = [], onSelect, selected }) {
  return (
    <section className="grid-wrap">
      {signs.map((s) => {
        const active = selected && selected.id === s.id;
        return (
          <button
            key={s.id}
            className={`z-card ${active ? "z-active" : ""}`}
            onClick={() => onSelect(s)}
            aria-pressed={active}
          >
            <div className="z-symbol" style={{ background: s.color + "22" }}>
              <span className="z-symbol-inner">{s.symbol}</span>
            </div>

            <div className="z-meta">
              <div className="z-name">{s.name}</div>
              <div className="z-range">{s.range}</div>
            </div>
          </button>
        );
      })}
    </section>
  );
}
