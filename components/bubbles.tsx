"use client";

import React, { useId } from "react";

// Deterministic ambient bubbles configuration - toned down, subtle, and gentle
const AMBIENT_BUBBLES = [
  { id: 1, left: "8%", size: 14, duration: 12.0, delay: -2.0, drift1: "10px", drift2: "-8px", drift3: "6px" },
  { id: 2, left: "24%", size: 18, duration: 15.0, delay: -8.5, drift1: "-10px", drift2: "8px", drift3: "-6px" },
  { id: 3, left: "42%", size: 11, duration: 11.0, delay: -4.5, drift1: "8px", drift2: "-6px", drift3: "8px" },
  { id: 4, left: "58%", size: 20, duration: 16.0, delay: -12.0, drift1: "-12px", drift2: "10px", drift3: "-8px" },
  { id: 5, left: "72%", size: 13, duration: 13.0, delay: -3.5, drift1: "8px", drift2: "-10px", drift3: "6px" },
  { id: 6, left: "86%", size: 16, duration: 14.5, delay: -9.0, drift1: "-8px", drift2: "10px", drift3: "-8px" },
  { id: 7, left: "94%", size: 10, duration: 11.5, delay: -6.0, drift1: "6px", drift2: "-8px", drift3: "6px" },
];

// Burst bubbles for when the envelope is opened
const BURST_BUBBLES = [
  { id: 1, left: "50%", bottom: "45%", size: 22, driftX: "-45px", duration: 1.8, delay: 0 },
  { id: 2, left: "48%", bottom: "48%", size: 16, driftX: "38px", duration: 1.6, delay: 0.08 },
  { id: 3, left: "52%", bottom: "44%", size: 28, driftX: "-22px", duration: 2.1, delay: 0.12 },
  { id: 4, left: "47%", bottom: "46%", size: 14, driftX: "55px", duration: 1.5, delay: 0.15 },
  { id: 5, left: "53%", bottom: "47%", size: 20, driftX: "-60px", duration: 2.0, delay: 0.2 },
  { id: 6, left: "49%", bottom: "43%", size: 32, driftX: "18px", duration: 2.3, delay: 0.25 },
  { id: 7, left: "51%", bottom: "49%", size: 12, driftX: "-32px", duration: 1.7, delay: 0.3 },
  { id: 8, left: "46%", bottom: "45%", size: 24, driftX: "65px", duration: 2.2, delay: 0.35 },
  { id: 9, left: "54%", bottom: "44%", size: 18, driftX: "-15px", duration: 1.9, delay: 0.4 },
  { id: 10, left: "50%", bottom: "47%", size: 26, driftX: "-48px", duration: 2.4, delay: 0.45 },
  { id: 11, left: "48%", bottom: "46%", size: 15, driftX: "42px", duration: 1.8, delay: 0.5 },
  { id: 12, left: "52%", bottom: "48%", size: 30, driftX: "-28px", duration: 2.2, delay: 0.55 },
  { id: 13, left: "49%", bottom: "45%", size: 13, driftX: "25px", duration: 1.6, delay: 0.6 },
  { id: 14, left: "51%", bottom: "43%", size: 20, driftX: "-52px", duration: 2.0, delay: 0.65 },
];

/**
 * Continuous floating bubbles inside underwater environments (Bottom sheet or screen)
 * Fully non-blocking (pointer-events-none) so users can tap and interact with any element underneath.
 */
export function AmbientBubbles({ className = "" }: { className?: string }) {
  const isFixed = className.includes("fixed");
  return (
    <div
      className={`${isFixed ? "fixed" : "absolute"} inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {AMBIENT_BUBBLES.map((b) => (
        <div
          key={b.id}
          className="underwater-bubble pointer-events-none select-none"
          style={
            {
              left: b.left,
              bottom: "-50px",
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              "--drift-1": b.drift1,
              "--drift-2": b.drift2,
              "--drift-3": b.drift3,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/**
 * Celebratory burst of bubbles emerging when the invitation envelope opens
 */
export function EnvelopeBubbleBurst({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-20"
      aria-hidden="true"
    >
      {BURST_BUBBLES.map((b) => (
        <div
          key={b.id}
          className="burst-bubble"
          style={
            {
              left: b.left,
              top: b.bottom,
              width: `${b.size}px`,
              height: `${b.size}px`,
              "--drift-x": b.driftX,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
