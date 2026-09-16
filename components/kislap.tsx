"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * 4-Point Fairytale Star / Sparkle SVG (Kislap / Bituin)
 * High-aesthetic Disney/Little Mermaid fairytale sparkle.
 * Fully non-blocking (pointer-events-none) so users can tap and interact with anything.
 */
export function KislapSparkle({
  className = "",
  size = 18,
  color = "#FBBF24",
  pulse = false,
  style,
}: {
  className?: string;
  size?: number;
  color?: string;
  pulse?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={cn(
        pulse ? "kislap-star-pulse" : "kislap-star",
        "pointer-events-none select-none",
        className
      )}
      style={style}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        className="pointer-events-none select-none drop-shadow-xs"
      >
        <path d="M12 0 C12 6.627 17.373 12 24 12 C17.373 12 12 17.373 12 24 C12 17.373 6.627 12 0 12 C6.627 12 12 6.627 12 0 Z" />
      </svg>
    </span>
  );
}

/**
 * Cluster of 3 twinkling stars for decorating important elements / titles / photo cards
 */
export function KislapCluster({
  className = "",
  color = "#F59E0B",
  secondaryColor = "#38BDF8",
}: {
  className?: string;
  color?: string;
  secondaryColor?: string;
}) {
  return (
    <div className={cn("relative pointer-events-none select-none inline-block", className)} aria-hidden="true">
      {/* Primary Gold Star */}
      <KislapSparkle
        size={18}
        color={color}
        style={{ top: "0px", left: "0px", animationDuration: "2.8s", animationDelay: "0s" }}
      />
      {/* Secondary Cyan/Aquamarine Star */}
      <KislapSparkle
        size={11}
        color={secondaryColor}
        style={{ top: "-10px", left: "14px", animationDuration: "2.1s", animationDelay: "-1.1s" }}
      />
      {/* Pearl White Sparkle */}
      <KislapSparkle
        size={8}
        color="#FFFFFF"
        style={{ top: "12px", left: "12px", animationDuration: "2.5s", animationDelay: "-0.6s" }}
      />
    </div>
  );
}

// Pre-defined distributed coordinates for ambient twinkling bituin/kislap inside bottom sheet
const AMBIENT_BITUIN = [
  { id: 1, top: "1.5%", left: "8%", size: 14, color: "#FBBF24", duration: "3.2s", delay: "-0.5s" },
  { id: 2, top: "3.5%", right: "10%", size: 18, color: "#38BDF8", duration: "2.7s", delay: "-1.2s" },
  { id: 3, top: "7%", left: "86%", size: 12, color: "#FDE68A", duration: "3.5s", delay: "-2.1s" },
  { id: 4, top: "11%", left: "6%", size: 16, color: "#FFFFFF", duration: "2.9s", delay: "-0.8s" },
  { id: 5, top: "15%", right: "8%", size: 20, color: "#FBBF24", duration: "3.4s", delay: "-1.8s" },
  { id: 6, top: "20%", left: "4%", size: 13, color: "#7DD3FC", duration: "2.6s", delay: "-1.0s" },
  { id: 7, top: "25%", right: "6%", size: 17, color: "#FDE68A", duration: "3.8s", delay: "-2.4s" },
  { id: 8, top: "31%", left: "7%", size: 15, color: "#FFFFFF", duration: "3.0s", delay: "-1.5s" },
  { id: 9, top: "36%", right: "9%", size: 19, color: "#38BDF8", duration: "2.8s", delay: "-0.3s" },
  { id: 10, top: "41%", left: "5%", size: 14, color: "#FBBF24", duration: "3.3s", delay: "-2.0s" },
  { id: 11, top: "46%", right: "7%", size: 16, color: "#FDE68A", duration: "3.1s", delay: "-1.1s" },
  { id: 12, top: "51%", left: "8%", size: 18, color: "#7DD3FC", duration: "2.9s", delay: "-2.6s" },
  { id: 13, top: "57%", right: "5%", size: 13, color: "#FFFFFF", duration: "3.6s", delay: "-0.7s" },
  { id: 14, top: "62%", left: "6%", size: 20, color: "#FBBF24", duration: "3.0s", delay: "-1.9s" },
  { id: 15, top: "68%", right: "8%", size: 15, color: "#38BDF8", duration: "2.7s", delay: "-1.4s" },
  { id: 16, top: "73%", left: "5%", size: 17, color: "#FDE68A", duration: "3.5s", delay: "-2.8s" },
  { id: 17, top: "79%", right: "6%", size: 14, color: "#FFFFFF", duration: "2.9s", delay: "-0.9s" },
  { id: 18, top: "85%", left: "7%", size: 18, color: "#FBBF24", duration: "3.2s", delay: "-1.6s" },
  { id: 19, top: "90%", right: "8%", size: 12, color: "#7DD3FC", duration: "2.5s", delay: "-2.2s" },
  { id: 20, top: "95%", left: "6%", size: 16, color: "#FDE68A", duration: "3.4s", delay: "-0.4s" },
];

/**
 * Ambient background field of twinkling stars throughout the scrollable bottom sheet
 */
export function KislapBituinBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none overflow-hidden select-none z-0", className)}
      aria-hidden="true"
    >
      {AMBIENT_BITUIN.map((s) => (
        <KislapSparkle
          key={s.id}
          size={s.size}
          color={s.color}
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
