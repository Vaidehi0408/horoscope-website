import React from "react";

/**
 * Tabs for timeframe selection.
 * props:
 *  - value: 'today' | 'weekly' | 'monthly' | 'yearly'
 *  - onChange(value)
 */
export default function Tabs({ value, onChange }) {

  console.log(value,onChange, "data")
  
  const tabs = [
    { id: "today", label: "Today" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
  ];

  return (
    <div className="tabs">
      {tabs.map((t) => (
        <button
          key={t.id}
          className={`tab ${value === t.id ? "tab-active" : ""}`}
          onClick={() => onChange(t.id)}
          aria-pressed={value === t.id}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
