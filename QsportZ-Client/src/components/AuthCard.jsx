import React from "react";

export default function AuthCard({ title, children, bottomText }) {
  return (
    <div
      className="
        max-w-md w-full
        bg-white/5 backdrop-blur-lg
        p-10 rounded-xl
        shadow-xl border border-white/10
        text-white
      ">
      <div className="flex justify-center mb-4">
        <img
          src="/images/qsportz-logo.png"
          alt="QSportz"
          className="
            h-10
            filter                /* enable CSS filters */
            invert                /* invert them to white (on dark bg) */
          "
        />
      </div>

      <h2 className="text-3xl font-extrabold mb-6 text-center">{title}</h2>
      {children}
      {bottomText && (
        <p className="mt-6 text-center text-gray-400 text-sm">{bottomText}</p>
      )}
    </div>
  );
}
