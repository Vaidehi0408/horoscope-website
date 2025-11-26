import React, { useState } from "react";
import ZodiacGrid from "./components/ZodicGrid";
import HoroscopeView from "./components/HoroscopeView";

const SIGNS = [
  { id: "aries", name: "Aries", symbol: "♈︎", color: "#FF7A7A" },
  { id: "taurus", name: "Taurus", symbol: "♉︎", color: "#FFD07A" },
  { id: "gemini", name: "Gemini", symbol: "♊︎", color: "#FFD67A" },
  { id: "cancer", name: "Cancer", symbol: "♋︎", color: "#9AD4FF" },
  { id: "leo", name: "Leo", symbol: "♌︎", color: "#FFD37A" },
  { id: "virgo", name: "Virgo", symbol: "♍︎", color: "#A8F0C6" },
  { id: "libra", name: "Libra", symbol: "♎︎", color: "#C7A8FF" },
  { id: "scorpio", name: "Scorpio", symbol: "♏︎", color: "#FF9ACD" },
  { id: "sagittarius", name: "Sagittarius", symbol: "♐︎", color: "#FFD27A" },
  { id: "capricorn", name: "Capricorn", symbol: "♑︎", color: "#9CC7FF" },
  { id: "aquarius", name: "Aquarius", symbol: "♒︎", color: "#7AE0FF" },
  { id: "pisces", name: "Pisces", symbol: "♓︎", color: "#C6D8FF" },
];

// REAL ASTROLOGY-BASED ALWAYS LUCKY COLORS
const LUCKY_COLORS = {
  aries: "Red",
  taurus: "Green",
  gemini: "Yellow",
  cancer: "White",
  leo: "Gold",
  virgo: "Brown",
  libra: "Pink",
  scorpio: "Black",
  sagittarius: "Purple",
  capricorn: "Navy Blue",
  aquarius: "Turquoise",
  pisces: "Sea Green",
};

export default function App() {
  const [selected, setSelected] = useState(null);

  const selectedLuckyColor = selected ? LUCKY_COLORS[selected.id] : null;

  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">Free Daily Horoscopes</h1>
        <p className="app-sub">
          Discover what the stars have planned for you today — tap any zodiac sign to unlock your personalized horoscope, lucky color, and cosmic guidance.
        </p>
      </header>

      <main className="app-main">
        <ZodiacGrid
          signs={SIGNS}
          onSelect={(s) => setSelected(s)}
          selected={selected}
        />

        {/* PASS LUCKY COLOR TO HoroscopeView */}
        <HoroscopeView sign={selected} luckyColor={selectedLuckyColor} />
      </main>
    </div>
  );
}
