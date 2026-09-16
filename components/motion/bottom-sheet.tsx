"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EASE_DRAWER } from "@/lib/ease";
import { PresenceGate } from "@/lib/presence-gate";
import { cn } from "@/lib/utils";

const DRAWER = { duration: 0.5, ease: EASE_DRAWER } as const;

export interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  backgroundImage?: string;
}

export function BottomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  showCloseButton = true,
  backgroundImage,
}: BottomSheetProps) {
  const [mounted, setMounted] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const uid = useId();
  const titleId = `${uid}-title`;
  const descriptionId = `${uid}-description`;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background body and html scroll while bottom sheet is open
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    const prev = {
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyOverflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
    };
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prev.htmlOverflow;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.left = prev.bodyLeft;
      body.style.right = prev.bodyRight;
      body.style.overflow = prev.bodyOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [open, onOpenChange]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <PresenceGate key="backdrop">
          {({ gate }) => (
            <motion.button
              type="button"
              aria-label="Close bottom sheet"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={DRAWER}
              {...gate}
              onClick={() => onOpenChange(false)}
              className="pointer-events-auto fixed inset-0 z-50 bg-black/30"
            />
          )}
        </PresenceGate>
      ) : null}
      {open ? (
        <PresenceGate key="sheet">
          {({ gate }) => (
            <motion.div
              ref={sheetRef}
              initial={reduce ? { y: 0, opacity: 0 } : { y: "100%" }}
              animate={reduce ? { y: 0, opacity: 1 } : { y: 0 }}
              exit={reduce ? { y: 0, opacity: 0 } : { y: "100%" }}
              transition={reduce ? { duration: 0.25, ease: EASE_DRAWER } : DRAWER}
              {...gate}
              style={{
                maxHeight: "calc(100dvh - 5rem)",
                ...gate.style,
              }}
              className={cn(
                // 0.5rem side padding/margin (left-2 right-2), connected flush to the bottom (bottom-0), overflow-hidden clips to rounded-t-3xl
                // Guaranteed top margin via calc(100dvh - 5rem) so it never touches or sticks to the top browser bar on mobile
                "pointer-events-auto fixed bottom-0 left-2 right-2 z-50 mx-auto flex max-w-lg flex-col rounded-t-3xl overflow-hidden max-h-[calc(100dvh-5rem)]",
                "border-t border-x border-stone-200 bg-white text-stone-900 shadow-2xl",
                className
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? titleId : undefined}
              aria-describedby={description ? descriptionId : undefined}
              aria-label={title ? undefined : "Bottom sheet"}
            >
              {/* Underwater Ghibli Background Image */}
              {backgroundImage && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none bg-cover bg-top bg-no-repeat z-0"
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                />
              )}

              {/* Top Sheet Drag Handle Indicator */}
              <div className="w-full flex items-center justify-center pt-3 pb-1 shrink-0 z-20 pointer-events-none select-none">
                <div className="w-10 h-1.25 rounded-full bg-stone-300/80" />
              </div>

              {/* Close Button at Top Right */}
              {showCloseButton && (
                <div className="absolute right-3.5 top-3.5 z-20">
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    aria-label="Close"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-xs text-stone-700 shadow-xs transition-colors hover:bg-white hover:text-stone-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Title / Description if provided */}
              {(title || description) && (
                <div className="relative z-10 px-6 pt-5 pb-2 text-center">
                  {title && (
                    <h2 id={titleId} className="text-base font-semibold text-stone-900">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id={descriptionId} className="text-xs text-stone-500">
                      {description}
                    </p>
                  )}
                </div>
              )}

              {/* Natural Scrollable Content Area: free scroll without scrollbar bleeding */}
              <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-5 pt-2 pb-8 sm:px-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {children}
              </div>
            </motion.div>
          )}
        </PresenceGate>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
