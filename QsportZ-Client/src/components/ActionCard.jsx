import React from "react";

/**
 * Reusable action card button for promoting key actions
 */
export default function ActionCard({ label, onClick, to }) {
  const baseClasses =
    "flex items-center justify-center p-6 bg-red-600 hover:bg-red-700 rounded-xl font-semibold text-white transition-colors";
  if (to) {
    return (
      <a href={to} className={`${baseClasses}`}>
        {label}
      </a>
    );
  }
  return (
    <button className={baseClasses} onClick={onClick}>
      {label}
    </button>
  );
}
