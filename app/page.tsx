"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { BottomSheet } from "@/components/motion/bottom-sheet";

const giftItems = [
  {
    id: 1,
    image: "/gift-ideas/1.png",
    title: "Clothes 12 Months and Up",
    note: "*Neutral colors only please",
  },
  {
    id: 2,
    image: "/gift-ideas/2.png",
    title: "Mustela Products",
  },
  {
    id: 3,
    image: "/gift-ideas/3.png",
    title: "Aquaphor Baby Ointment",
  },
  {
    id: 4,
    image: "/gift-ideas/4.png",
    title: "Cycles & Cradle",
  },
  {
    id: 5,
    image: "/gift-ideas/5.png",
    title: "EQ Water Wipes",
  },
  {
    id: 10,
    image: "/gift-ideas/10.png",
    title: "Desitin Cream",
  },
  {
    id: 8,
    image: "/gift-ideas/8.png",
    title: "Mamy Poko",
    note: "Size: Medium & Large",
  },
  {
    id: 9,
    image: "/gift-ideas/9.png",
    title: "Educational & Story Books",
  },
  {
    id: 6,
    image: "/gift-ideas/6.png",
    title: "Montessori Activity Walker",
  },
  {
    id: 7,
    image: "/gift-ideas/7.png",
    title: "Montessori Wooden Toys",
  },
];

const TARGET_EVENT_DATE = new Date("2026-10-10T10:00:00+08:00").getTime();

function calculateTimeUntilEvent() {
  const diff = TARGET_EVENT_DATE - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown ticking effect
  useEffect(() => {
    setTimeLeft(calculateTimeUntilEvent());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeUntilEvent());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle clicking the envelope
  const handleCardClick = () => {
    if (!isOpened) {
      setIsOpened(true);
      // After 1 sec of invitation-card-opened.png being displayed, open bottom sheet
      timerRef.current = setTimeout(() => {
        setSheetOpen(true);
      }, 1000);
    } else {
      setSheetOpen(true);
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full bg-white overflow-x-hidden">
      
      {/* Main Container - No centered flex */}
      <main className="relative z-10 w-full max-w-md mx-auto min-h-[100dvh]">
        
        {/* Envelope Interactive Stage - Anchored with bottom edge at fixed 52vh baseline */}
        <div 
          onClick={handleCardClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleCardClick();
            }
          }}
          aria-label={isOpened ? "Invitation envelope opened" : "Click to open invitation envelope"}
          className="absolute top-[52vh] left-1/2 -translate-x-1/2 -translate-y-full w-[300px] sm:w-[330px] cursor-pointer outline-none select-none active:scale-[0.99] transition-transform duration-200"
        >
          {/* Box aligned to bottom so image bottom never shifts */}
          <div className="relative w-full flex flex-col justify-end h-[345px] sm:h-[380px]">
            <Image
              src={isOpened ? "/invitation-card-opened.png" : "/invitation-card-closed.png"}
              alt={isOpened ? "Opened Invitation Card Envelope" : "Closed Invitation Card Envelope"}
              width={714}
              height={isOpened ? 805 : 458}
              priority
              className="w-full h-auto object-contain pointer-events-none select-none block"
            />

            {/* Preload opened envelope for instant replacement */}
            {!isOpened && (
              <div className="hidden" aria-hidden="true">
                <Image
                  src="/invitation-card-opened.png"
                  alt=""
                  width={714}
                  height={805}
                  priority
                />
              </div>
            )}
          </div>
        </div>

        {/* Status indicator / View details anchored directly below the 52vh baseline */}
        <div className="absolute top-[52vh] left-0 right-0 pt-4 text-center">
          {!isOpened ? (
            <span className="text-stone-500 text-xs tracking-widest uppercase font-medium hover:text-stone-900 transition-colors">
              Click to open
            </span>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSheetOpen(true);
              }}
              className="text-xs text-stone-500 hover:text-stone-900 underline underline-offset-4 transition-colors"
            >
              View Details
            </button>
          )}
        </div>

      </main>

      {/* CUSTOM BOTTOM SHEET */}
      {/* 1rem padding each side (left-4 right-4), connected flush to the bottom (bottom-0), solid white, no gradients, no emojis */}
      <BottomSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        showCloseButton={true}
        backgroundImage="/underwater-bg.jpg"
        className="border-stone-200 text-stone-900"
      >
        <div className="flex flex-col max-w-md mx-auto py-2">
          
          {/* Section 1 Header: Arched Invitation Intro & Gianna Preview */}
          <div className="text-center flex flex-col items-center mb-8">
            
            {/* Arched Text (Not italic, curved in a circle/arch like annotated mockup) */}
            <div className="w-full max-w-[360px] sm:max-w-[400px] mx-auto flex flex-col items-center">
              <svg
                viewBox="0 0 440 120"
                className="w-full h-auto overflow-visible select-none"
                aria-label="Join us for the baptism and 1st birthday of"
              >
                <path
                  id="header-arc"
                  d="M 10,110 A 280,280 0 0,1 430,110"
                  fill="none"
                />
                <text
                  className="fill-[#183B49] text-[16px] sm:text-[17px] font-cormorant font-bold tracking-[0.14em]"
                  textAnchor="middle"
                >
                  <textPath href="#header-arc" startOffset="50%">
                    JOIN US FOR THE BAPTISM AND 1ST BIRTHDAY OF
                  </textPath>
                </text>
              </svg>

              {/* OUR DAUGHTER */}
              <p className="font-cormorant text-sm sm:text-base font-bold uppercase tracking-[0.3em] text-[#183B49] -mt-1">
                OUR DAUGHTER
              </p>

              {/* Gianna Isabelle in dress code cursive script font */}
              <h2 className="font-cursive text-6xl sm:text-7xl text-[#183B49] leading-none mt-1">
                Gianna Isabelle
              </h2>
            </div>

            {/* Preview image of Gianna with Baby Mermaid on Seashell Sticker */}
            <div className="relative w-68 sm:w-76 mx-auto mt-6">
              <div className="overflow-hidden rounded-2xl shadow-xs">
                <img
                  src="/gianna.jpg"
                  alt="Gianna Isabelle"
                  className="w-full h-auto object-cover block"
                />
              </div>

              {/* Baby Mermaid on Seashell Sticker */}
              <div className="absolute -bottom-5 -right-6 sm:-right-8 w-20 sm:w-24 pointer-events-none select-none z-10">
                <img
                  src="/sticker-mermaid-seashell.png"
                  alt="Baby mermaid on seashell"
                  className="w-full h-auto object-contain drop-shadow-md rotate-[6deg] hover:rotate-[9deg] transition-transform duration-300"
                />
              </div>
            </div>

            {/* Date - Non-italicized numbers and comma */}
            <div className="mt-5">
              <span className="font-cormorant text-base sm:text-lg font-bold tracking-[0.16em] uppercase text-[#183B49]">
                October{" "}
                <span className="font-sans not-italic font-bold tracking-normal text-[#183B49]">
                  10, 2026
                </span>
              </span>
            </div>
          </div>

          {/* Section 1: Countdown & Event Locations (7rem space below Date) */}
          <div className="pt-[7rem] flex flex-col relative">
            
            {/* Floating Baby Sea Turtle Sticker in the 7rem gap */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none z-10">
              <img
                src="/sticker-baby-turtle.png"
                alt="Baby sea turtle"
                className="w-16 sm:w-20 h-auto object-contain drop-shadow-md rotate-[-4deg] hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Box Card 1: Church Ceremony with Countdown Header */}
            <div className="rounded-2xl border border-stone-200 bg-stone-50 overflow-hidden shadow-xs">
              
              {/* Countdown Header inside Box Card 1 */}
              <div className="w-full p-4 sm:p-5 flex flex-col items-center text-center">
                <h3 className="font-cormorant text-lg sm:text-xl font-bold italic uppercase tracking-[0.14em] text-[#183B49] mb-4 text-center leading-snug">
                  <span className="block">COUNTDOWN CELEBRATION</span>
                  <span className="block">AND LOCATIONS</span>
                </h3>

                <div className="grid grid-cols-4 w-full divide-x divide-stone-200/80">
                  {[
                    { label: "Days", value: timeLeft !== null ? String(timeLeft.days) : "--" },
                    { label: "Hours", value: timeLeft !== null ? String(timeLeft.hours).padStart(2, "0") : "--" },
                    { label: "Minutes", value: timeLeft !== null ? String(timeLeft.minutes).padStart(2, "0") : "--" },
                    { label: "Seconds", value: timeLeft !== null ? String(timeLeft.seconds).padStart(2, "0") : "--" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center justify-center px-1"
                    >
                      <span className="font-sans font-bold text-xl sm:text-2xl text-[#183B49] not-italic tabular-nums leading-none">
                        {item.value}
                      </span>
                      <span className="text-[10px] font-medium text-stone-500 uppercase tracking-wider mt-1.5 leading-none">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Church Image with left & right spacing */}
              <div className="px-4 sm:px-5 w-full">
                <div className="w-full h-48 sm:h-56 relative bg-stone-100 rounded-xl overflow-hidden shadow-2xs border border-stone-200/70">
                  <img
                    src="/church.jpg"
                    alt="Immaculate Conception Parish Church (Concepcion)"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Church Details */}
              <div className="p-4 sm:p-5 flex flex-col gap-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Church (Concepcion, Tarlac)
                  </span>
                  <span className="text-xs font-semibold text-[#D97A72] bg-white border border-stone-200 px-2.5 py-0.5 rounded-md">
                    10AM
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#183B49] leading-snug">
                  Immaculate Conception Parish Church
                </h3>

                <div className="pt-2">
                  <a
                    href="https://maps.app.goo.gl/NpEfPgrtJjy48qQQ7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full  flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 text-xs sm:text-sm font-medium transition-colors"
                  >
                    <img
                      src="/google-maps-icon.png"
                      alt=""
                      className="w-4 h-4 object-contain shrink-0"
                    />
                    <span>Get Direction at Google Map</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Transition Route: Mermaid swimming downward from Church Ceremony to Venue Reception */}
            <div className="flex flex-col items-center justify-center my-3 sm:my-4 select-none" aria-hidden="true">
              <img
                src="/mermaid-transition.png"
                alt="Mermaid swimming downward"
                className="w-20 sm:w-24 h-auto object-contain block drop-shadow-sm transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Box Card 2: Venue / Reception */}
            <div className="relative">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 overflow-hidden shadow-xs">
                {/* Resort Image */}
                <div className="w-full h-48 sm:h-56 relative bg-stone-100">
                  <img
                    src="/resort.png"
                    alt="Benedictines Resort"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Venue Details */}
                <div className="p-4 sm:p-5 flex flex-col gap-2 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Venue
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#183B49] leading-snug">
                    Benedictines Resort
                  </h3>

                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href="https://www.facebook.com/benedictinesresort"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 text-xs sm:text-sm font-medium transition-colors"
                    >
                      <img
                        src="/facebook-icon.png"
                        alt=""
                        className="w-4 h-4 object-contain shrink-0"
                      />
                      <span>View on Facebook</span>
                    </a>

                    <a
                      href="https://maps.app.goo.gl/B1yeDxuD8wzj3Dph7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 text-xs sm:text-sm font-medium transition-colors"
                    >
                      <img
                        src="/google-maps-icon.png"
                        alt=""
                        className="w-4 h-4 object-contain shrink-0"
                      />
                      <span>Get Direction at Google Map</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Pastel Anemone & Ponyo Goldfish Sticker */}
              <div className="absolute -bottom-5 -right-3 w-16 sm:w-20 pointer-events-none select-none z-10">
                <img
                  src="/sticker-anemone-goldfish.png"
                  alt="Anemone and goldfish"
                  className="w-full h-auto object-contain drop-shadow-md rotate-[4deg] hover:rotate-[7deg] transition-transform duration-300"
                />
              </div>
            </div>

            {/* Section: Dress Code (5rem / mt-20 space) */}
            <div className="mt-20 flex flex-col items-center text-center">
              <div className="mb-4">
                <h3 className="font-cursive text-5xl sm:text-6xl text-[#183B49] leading-none mb-2">
                  Dress Code
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-xs leading-relaxed font-normal">
                  Semi-formal attire. Pastel colors are warmly appreciated.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-stone-50 overflow-hidden p-2 sm:p-3 w-full">
                <img
                  src="/dress-code.jpg"
                  alt="Dress Code: Semi-formal attire in pastel colors"
                  className="w-full h-auto rounded-xl object-contain block"
                />
              </div>
            </div>

            {/* Section: Safety Guidelines (5rem / mt-20 space) */}
            <div className="mt-20 flex flex-col items-center text-center">
              <div className="mb-4">
                <h3 className="font-cursive text-5xl sm:text-6xl text-[#183B49] leading-none">
                  Safety Guidelines
                </h3>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-stone-50 overflow-hidden p-2 sm:p-3 w-full">
                <img
                  src="/safety-guidelines.jpg"
                  alt="Safety Guidelines: No smoking, Face mask if you are sick, No kissing, Hand sanitizer"
                  className="w-full h-auto rounded-xl object-contain block"
                />
              </div>
            </div>

            {/* Section: Gift Ideas (5rem / mt-20 spacing) */}
            <div className="mt-20 flex flex-col pb-4">
              
              {/* Header: Centered Gift Ideas + Natural Request Text */}
              <div className="text-center flex flex-col items-center mb-8 px-2">
                <h3 className="font-cursive text-5xl sm:text-6xl text-[#183B49] leading-none mb-3">
                  Gift Ideas
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-xs sm:max-w-sm leading-relaxed font-normal">
                  Your love and prayers are all that we request, but if you wish to give, a monetary gift for <span className="font-semibold text-[#183B49]">Gianna’s savings</span> or any of the gift ideas below would be really appreciated.
                </p>
              </div>

              {/* Gift Ideas Sticker Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                {giftItems.map((item, idx) => {
                  // Subtle playful rotation for organic sticker feel
                  const rotations = [
                    "hover:-rotate-1 rotate-[-1.5deg]",
                    "hover:rotate-1 rotate-[1.5deg]",
                    "hover:rotate-0 rotate-[-1deg]",
                    "hover:-rotate-1 rotate-[2deg]",
                    "hover:rotate-1 rotate-[-2deg]",
                  ];
                  const rotClass = rotations[idx % rotations.length];

                  return (
                    <div
                      key={item.id}
                      className={`group relative rounded-2xl border border-stone-200/90 bg-stone-50/80 p-3.5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-[1.02] hover:bg-white hover:border-stone-300 hover:shadow-md ${rotClass}`}
                    >
                      {/* Sticker badge visual with die-cut shadow */}
                      <div className="h-28 sm:h-32 w-full flex items-center justify-center p-1.5 relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="max-h-full max-w-full object-contain pointer-events-none select-none transition-transform duration-300 group-hover:scale-105 [filter:drop-shadow(0_1px_1px_rgba(255,255,255,0.9))_drop-shadow(0_4px_8px_rgba(0,0,0,0.1))]"
                        />
                      </div>

                      {/* Name & details */}
                      <div className="mt-2.5 w-full flex flex-col items-center">
                        <h4 className="text-xs font-bold text-[#183B49] leading-tight">
                          {item.title}
                        </h4>
                        {item.note && (
                          <span className="text-[10px] font-medium text-[#D97A72] mt-1 leading-tight">
                            {item.note}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      </BottomSheet>

    </div>
  );
}
