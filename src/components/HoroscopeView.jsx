import React, { useEffect, useState } from "react";
import Tabs from "./Tabs";

/* ✅ Color name → Hex map for the lucky color box */
const COLOR_MAP = {
  Red: "#ef4444",
  Green: "#22c55e",
  Yellow: "#facc15",
  White: "#f9fafb",
  Gold: "#fbbf24",
  Brown: "#92400e",
  Pink: "#ec4899",
  Black: "#111827",
  Purple: "#9333ea",
  "Navy Blue": "#1e3a8a",
  Turquoise: "#06b6d4",
  "Sea Green": "#14b8a6",
};

/**
 * HoroscopeView:
 *  - shows details for a selected sign
 *  - tabs: today | weekly | monthly | yearly
 *  - uses ohmanda.com via MULTI-PROXY fallback
 *  - weekly/monthly/yearly -> generated summary
 */
export default function HoroscopeView({ sign, luckyColor }) {
  const [tab, setTab] = useState("today");
  const [loading, setLoading] = useState(false);
  const [horoscope, setHoroscope] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTab("today");
    setHoroscope(null);
    setError(null);
  }, [sign]);

  useEffect(() => {
    if (!sign) return;
    fetchHoroscope();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sign, tab]);

  // ✅ BULLETPROOF FETCH WITH MULTI-PROXY + OFFLINE FALLBACK
  async function fetchHoroscope() {
    setLoading(true);
    setError(null);
    setHoroscope(null);

    try {
      const originalUrl = `https://ohmanda.com/api/horoscope/${sign.id}/`;

      const proxies = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(originalUrl)}`,
        `https://corsproxy.io/?${encodeURIComponent(originalUrl)}`,
      ];

      let data = null;

      if (tab === "today") {
        for (let proxyUrl of proxies) {
          try {
            const resp = await fetch(proxyUrl, { cache: "no-store" });
            if (!resp.ok) throw new Error(`Proxy failed: ${resp.status}`);
            data = await resp.json();
            break;
          } catch (err) {
            console.warn("Proxy failed:", proxyUrl);
          }
        }

        // If ALL proxies fail → Offline fallback
        if (!data) {
          setHoroscope({
            source: "offline",
            date: new Date().toLocaleDateString(),
            text: `Today brings mixed energy for ${sign.name}. 
Stay calm, avoid rushed decisions, and focus on steady progress.`,
          });

          // setError("Live server busy — showing offline horoscope.");
          setLoading(false);
          return;
        }

        // SUCCESS
        setHoroscope({
          source: "ohmanda",
          date: data.date || new Date().toLocaleDateString(),
          text: data.horoscope || data.description || "No text returned.",
        });

        setLoading(false);
        return;
      }

      // Generated Weekly / Monthly / Yearly
      if (tab === "weekly" || tab === "monthly" || tab === "yearly") {
        const fakeText = `This ${tab} period brings important shifts for ${
          sign.name
        }. 
Focus on balance, communication, and smart decisions.
New opportunities may appear in work and relationships.`;

        setHoroscope({
          source: "generated",
          date: new Date().toLocaleDateString(),
          text: fakeText,
        });

        setLoading(false);
        return;
      }

      setError("Unknown timeframe");
      setLoading(false);
    } catch (err) {
      console.error("HOROSCOPE ERROR:", err);

      // ✅ Absolute safety fallback
      setHoroscope({
        source: "offline",
        date: new Date().toLocaleDateString(),
        text: `Energy is calm today for ${sign.name}. 
Use this time to reset your priorities and build inner strength.`,
      });

      setError("Network issue — showing offline horoscope.");
      setLoading(false);
    }
  }

  if (!sign) {
    return (
      <aside className="panel-empty">
        <p>Select a zodiac sign from the left to view horoscopes</p>
      </aside>
    );
  }

  return (
    <aside className="panel">
      <div className="panel-head">
        <div className="panel-sign">
          <div className="panel-symbol">{sign.symbol}</div>
          <div>
            <div className="panel-name">{sign.name}</div>
            <div className="panel-range">{sign.range}</div>
          </div>
        </div>

        <Tabs value={tab} onChange={setTab} />
      </div>

      <div className="panel-body">
        {loading && <div className="loader">Loading...</div>}
        {error && <div className="error">{error}</div>}

        {!loading && horoscope && (
          <div className="horoscope-card">
            <div className="horoscope-meta">
              <span className="meta-source lucky-color-row">
                Lucky Color:
                <span
                  className="lucky-color-box-mini"
                  style={{
                    backgroundColor:
                      COLOR_MAP[luckyColor] || "#d1d5db",
                  }}
                />
                <b>{luckyColor}</b>
              </span>

              <span className="meta-date">{horoscope.date}</span>
            </div>

            <pre className="horoscope-text">{horoscope.text}</pre>
          </div>
        )}
      </div>
    </aside>
  );
}
