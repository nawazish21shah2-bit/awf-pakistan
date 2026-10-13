"use client";

import React, { useState, useEffect } from "react";
import { Palette, X, Check } from "lucide-react";

interface ColorScheme {
  name: string;
  primary: string;
  primarySoft: string;
  accent: string;
  accentDeep: string;
  accentSoft: string;
  accentRgb: string;
}

const colorSchemes: ColorScheme[] = [
  {
    name: "Pakistan Green",
    primary: "#004d00",
    primarySoft: "#006600",
    accent: "#10b981",
    accentDeep: "#059669",
    accentSoft: "#34d399",
    accentRgb: "16, 185, 129",
  },
  {
    name: "Forest Deep",
    primary: "#1a472a",
    primarySoft: "#2d5a3d",
    accent: "#22c55e",
    accentDeep: "#16a34a",
    accentSoft: "#4ade80",
    accentRgb: "34, 197, 94",
  },
  {
    name: "Emerald Luxe",
    primary: "#064e3b",
    primarySoft: "#065f46",
    accent: "#34d399",
    accentDeep: "#10b981",
    accentSoft: "#6ee7b7",
    accentRgb: "52, 211, 153",
  },
  {
    name: "Mint Fresh",
    primary: "#047857",
    primarySoft: "#059669",
    accent: "#6ee7b7",
    accentDeep: "#34d399",
    accentSoft: "#a7f3d0",
    accentRgb: "110, 231, 183",
  },
  {
    name: "Olive Heritage",
    primary: "#3f6212",
    primarySoft: "#4d7c0f",
    accent: "#84cc16",
    accentDeep: "#65a30d",
    accentSoft: "#a3e635",
    accentRgb: "132, 204, 22",
  },
  {
    name: "Teal Modern",
    primary: "#0f766e",
    primarySoft: "#115e59",
    accent: "#2dd4bf",
    accentDeep: "#14b8a6",
    accentSoft: "#5eead4",
    accentRgb: "45, 212, 191",
  },
  {
    name: "Bright Lime",
    primary: "#65a30d",
    primarySoft: "#84cc16",
    accent: "#bef264",
    accentDeep: "#a3e635",
    accentSoft: "#d9f99d",
    accentRgb: "190, 242, 100",
  },
  {
    name: "Spring Green",
    primary: "#16a34a",
    primarySoft: "#22c55e",
    accent: "#86efac",
    accentDeep: "#4ade80",
    accentSoft: "#bbf7d0",
    accentRgb: "134, 239, 172",
  },
  {
    name: "Neon Green",
    primary: "#22c55e",
    primarySoft: "#4ade80",
    accent: "#4ade80",
    accentDeep: "#22c55e",
    accentSoft: "#86efac",
    accentRgb: "74, 222, 128",
  },
  {
    name: "Chartreuse",
    primary: "#4d7c0f",
    primarySoft: "#65a30d",
    accent: "#c0eb75",
    accentDeep: "#a3e635",
    accentSoft: "#dcfce7",
    accentRgb: "192, 235, 117",
  },
  {
    name: "Pure Green",
    primary: "#008000",
    primarySoft: "#00a000",
    accent: "#00ff00",
    accentDeep: "#00cc00",
    accentSoft: "#66ff66",
    accentRgb: "0, 255, 0",
  },
  {
    name: "Bright Emerald",
    primary: "#10b981",
    primarySoft: "#34d399",
    accent: "#6ee7b7",
    accentDeep: "#34d399",
    accentSoft: "#a7f3d0",
    accentRgb: "110, 231, 183",
  },
];

export function ColorCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme | null>(null);

  useEffect(() => {
    // Load saved scheme from localStorage
    const saved = localStorage.getItem("awf-color-scheme");
    if (saved) {
      const scheme = colorSchemes.find((s) => s.name === saved);
      if (scheme) {
        setSelectedScheme(scheme);
        applyScheme(scheme);
      }
    } else {
      // Default to Pakistan Green
      const defaultScheme = colorSchemes[0];
      setSelectedScheme(defaultScheme);
      applyScheme(defaultScheme);
    }
  }, []);

  const applyScheme = (scheme: ColorScheme) => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", scheme.primary);
    root.style.setProperty("--color-primary-soft", scheme.primarySoft);
    root.style.setProperty("--color-accent", scheme.accent);
    root.style.setProperty("--color-accent-deep", scheme.accentDeep);
    root.style.setProperty("--color-accent-soft", scheme.accentSoft);
    root.style.setProperty("--color-accent-rgb", scheme.accentRgb);
  };

  const handleSchemeSelect = (scheme: ColorScheme) => {
    setSelectedScheme(scheme);
    applyScheme(scheme);
    localStorage.setItem("awf-color-scheme", scheme.name);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary-soft text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
        aria-label="Customize colors"
      >
        <Palette className="w-6 h-6" />
      </button>

      {/* Customizer Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              <span className="font-semibold text-sm">Color Scheme</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 p-1 rounded transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scheme List */}
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme.name}
                onClick={() => handleSchemeSelect(scheme)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all hover:shadow-md"
                style={{
                  borderColor: selectedScheme?.name === scheme.name ? scheme.primary : "#e5e7eb",
                  backgroundColor: selectedScheme?.name === scheme.name ? `${scheme.primary}05` : "white",
                }}
              >
                {/* Color Preview */}
                <div className="flex gap-1">
                  <div
                    className="w-8 h-8 rounded-lg shadow-sm"
                    style={{ backgroundColor: scheme.primary }}
                  />
                  <div
                    className="w-8 h-8 rounded-lg shadow-sm"
                    style={{ backgroundColor: scheme.accent }}
                  />
                </div>

                {/* Scheme Name */}
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm text-gray-900">{scheme.name}</div>
                  <div className="text-xs text-gray-500">
                    {scheme.primary} / {scheme.accent}
                  </div>
                </div>

                {/* Checkmark */}
                {selectedScheme?.name === scheme.name && (
                  <Check className="w-5 h-5 text-gray-700" />
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Selection is saved to your browser
            </p>
          </div>
        </div>
      )}
    </>
  );
}
