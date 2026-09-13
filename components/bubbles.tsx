"use client";

import React, { useId } from "react";

// Deterministic ambient bubbles configuration
const AMBIENT_BUBBLES = [
  { id: 1, left: "6%", size: 14, duration: 8.5, delay: -1.2 },
  { id: 2, left: "14%", size: 22, duration: 11.2, delay: -5.4 },
  { id: 3, left: "24%", size: 10, duration: 7.8, delay: -3.1 },
  { id: 4, left: "32%", size: 28, duration: 13.5, delay: -8.0 },
  { id: 5, left: "42%", size: 16, duration: 9.6, delay: -2.7 },
  { id: 6, left: "53%", size: 20, duration: 10.4, delay: -6.5 },
  { id: 7, left: "64%", size: 12, duration: 8.1, delay: -4.3 },
  { id: 8, left: "75%", size: 30, duration: 14.2, delay: -9.8 },
  { id: 9, left: "84%", size: 18, duration: 9.9, delay: -1.8 },
  { id: 10, left: "92%", size: 15, duration: 8.9, delay: -5.0 },
  { id: 11, left: "10%", size: 24, duration: 12.0, delay: -7.2 },
  { id: 12, left: "28%", size: 13, duration: 8.4, delay: -4.0 },
  { id: 13, left: "48%", size: 26, duration: 12.8, delay: -10.5 },
  { id: 14, left: "68%", size: 11, duration: 7.5, delay: -2.2 },
  { id: 15, left: "88%", size: 22, duration: 11.0, delay: -6.8 },
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
 */
export function AmbientBubbles({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {AMBIENT_BUBBLES.map((b) => (
        <div
          key={b.id}
          className="underwater-bubble"
          style={{
            left: b.left,
            bottom: "-40px",
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
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
