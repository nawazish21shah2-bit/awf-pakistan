"use client";

import React from "react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fafbfc] text-primary font-sans flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-200 shadow-xl text-center space-y-6">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto font-bold text-xl">
            !
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-primary">Application Error</h1>
            <p className="text-xs text-gray-600">
              An unexpected system error occurred. Please refresh the page to reload the application.
            </p>
          </div>
          <button
            onClick={() => reset()}
            className="bg-[var(--color-accent)] text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-[var(--color-accent-deep)] transition-colors"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
