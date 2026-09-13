"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { BottomSheet } from "@/components/motion/bottom-sheet";
import { EnvelopeBubbleBurst, AmbientBubbles } from "@/components/bubbles";
import { BoilingFilter } from "@/components/boiling-filter";

const giftItems = [
  {
    id: 1,
    image: "/compressed/gift-ideas/1.webp",
    title: "Clothes 12 Months and Up",
    note: "*Neutral colors only please",
  },
  {
    id: 2,
    image: "/compressed/gift-ideas/2.webp",
    title: "Mustela Products",
  },
  {
    id: 3,
    image: "/compressed/gift-ideas/3.webp",
    title: "Aquaphor Baby Ointment",
  },
  {
    id: 4,
    image: "/compressed/gift-ideas/4.webp",
    title: "Cycles & Cradle",
  },
  {
    id: 5,
    image: "/compressed/gift-ideas/5.webp",
    title: "EQ Water Wipes",
  },
  {
    id: 10,
    image: "/compressed/gift-ideas/10.webp",
    title: "Desitin Cream",
  },
  {
    id: 8,
    image: "/compressed/gift-ideas/8.webp",
    title: "Mamy Poko",
    note: "Size: Medium & Large",
  },
  {
    id: 9,
    image: "/compressed/gift-ideas/9.webp",
    title: "Educational & Story Books",
  },
  {
    id: 6,
    image: "/compressed/gift-ideas/6.webp",
    title: "Montessori Activity Walker",
  },
  {
    id: 7,
    image: "/compressed/gift-ideas/7.webp",
    title: "Montessori Wooden Toys",
  },
];

const TARGET_EVENT_DATE = new Date("2026-10-10T10:00:00+08:00").getTime();

// Google Form URL for RSVP (leave empty or replace with your actual Google Form link)
const RSVP_GOOGLE_FORM_URL = "";

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
  const [isMuted, setIsMuted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [showRsvpNotice, setShowRsvpNotice] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio references for interactive sound effects & background celebration music
  const popAudioRef = useRef<HTMLAudioElement | null>(null);
  const waterBubbleAudioRef = useRef<HTMLAudioElement | null>(null);
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Pre-load audio on client mount
    const pop = new Audio("/button-bubble-pop.mp3");
    pop.volume = 0.8;
    pop.preload = "auto";
    popAudioRef.current = pop;

    // Underwater bubbling ambiance - lowered volume to sit gently in the background
    const water = new Audio("/krnbeatz-bubble-in-water-422579.mp3");
    water.volume = 0.15;
    water.loop = true;
    water.preload = "auto";
    const onWaterEnded = () => {
      water.currentTime = 0;
      water.play().catch(() => {});
    };
    water.addEventListener("ended", onWaterEnded);
    waterBubbleAudioRef.current = water;

    // Happy Birthday (Mandolin Version) celebration music
    const music = new Audio(encodeURI("/Happy Birthday (Mandolin Version).mp3"));
    music.volume = 0.65;
    music.loop = true;
    music.preload = "auto";
    const onMusicEnded = () => {
      music.currentTime = 0;
      music.play().catch(() => {});
    };
    music.addEventListener("ended", onMusicEnded);
    musicAudioRef.current = music;

    return () => {
      water.removeEventListener("ended", onWaterEnded);
      music.removeEventListener("ended", onMusicEnded);
      pop.pause();
      water.pause();
      music.pause();
      popAudioRef.current = null;
      waterBubbleAudioRef.current = null;
      musicAudioRef.current = null;
    };
  }, []);

  const playPopSound = () => {
    if (isMuted || !popAudioRef.current) return;
    try {
      popAudioRef.current.currentTime = 0;
      popAudioRef.current.play().catch(() => {});
    } catch {}
  };

  const playBackgroundAudio = () => {
    if (isMuted) return;
    try {
      if (waterBubbleAudioRef.current) {
        waterBubbleAudioRef.current.volume = 0.15;
        waterBubbleAudioRef.current.play().catch(() => {});
      }
      if (musicAudioRef.current) {
        musicAudioRef.current.volume = 0.65;
        musicAudioRef.current.play().catch(() => {});
      }
    } catch {}
  };

  const stopBackgroundAudio = () => {
    try {
      const water = waterBubbleAudioRef.current;
      const music = musicAudioRef.current;
      const fadeStep = 0.05;
      const interval = setInterval(() => {
        let done = true;
        if (water && water.volume > fadeStep) {
          water.volume = Math.max(0, water.volume - fadeStep);
          done = false;
        }
        if (music && music.volume > fadeStep) {
          music.volume = Math.max(0, music.volume - fadeStep);
          done = false;
        }
        if (done) {
          clearInterval(interval);
          if (water) {
            water.pause();
            water.currentTime = 0;
            water.volume = 0.15;
          }
          if (music) {
            music.pause();
            music.currentTime = 0;
            music.volume = 0.65;
          }
        }
      }, 40);
    } catch {}
  };

  // Countdown ticking effect
  useEffect(() => {
    setTimeLeft(calculateTimeUntilEvent());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeUntilEvent());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle clicking the envelope or the open button
  const handleCardClick = () => {
    playPopSound();

    if (!isOpened) {
      setIsOpened(true);
      // Play mandolin celebration music and ambient underwater bubbles together
      playBackgroundAudio();

      // After 1 sec of invitation-card-opened being displayed, open bottom sheet
      timerRef.current = setTimeout(() => {
        setSheetOpen(true);
      }, 1000);
    } else {
      setSheetOpen(true);
      playBackgroundAudio();
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
      {/* SVG Filters for hand-drawn boiling lines animation */}
      <BoilingFilter />

      {/* Subtle Sound Mute/Unmute toggle */}
      <button
        type="button"
        onClick={() => {
          setIsMuted((prev) => {
            const next = !prev;
            if (next) {
              waterBubbleAudioRef.current?.pause();
              musicAudioRef.current?.pause();
            } else if (isOpened) {
              playBackgroundAudio();
            }
            return next;
          });
        }}
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        title={isMuted ? "Unmute sound" : "Mute sound"}
        className="fixed top-4 right-4 z-30 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 border border-stone-200/80 shadow-xs hover:shadow-md backdrop-blur-xs transition-all active:scale-95 cursor-pointer select-none"
      >
        {isMuted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-stone-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-[#183B49]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
      
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
            {/* Bubble burst when envelope opens */}
            <EnvelopeBubbleBurst active={isOpened} />

            <Image
              src={isOpened ? "/compressed/invitation-card-opened.webp" : "/compressed/invitation-card-closed.webp"}
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
                  src="/compressed/invitation-card-opened.webp"
                  alt=""
                  width={714}
                  height={805}
                  priority
                />
              </div>
            )}
          </div>
        </div>

        {/* Interactive Click to open Button / View details anchored directly below the 52vh baseline */}
        <div className="absolute top-[52vh] left-0 right-0 pt-4 text-center">
          {!isOpened ? (
            <button
              type="button"
              onClick={handleCardClick}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 active:scale-95 text-xs text-stone-600 hover:text-stone-900 font-medium transition-all cursor-pointer select-none"
            >
              <span>Click to open</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-stone-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 active:scale-95 text-xs text-stone-600 hover:text-stone-900 font-medium transition-all cursor-pointer select-none"
            >
              <span>View Details</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-stone-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>
          )}
        </div>

      </main>

      {/* Ambient floating bubbles across the screen while bottom sheet is open */}
      {sheetOpen && (
        <AmbientBubbles className="fixed inset-0 pointer-events-none z-40" />
      )}

      {/* CUSTOM BOTTOM SHEET */}
      {/* 0.5rem padding each side (left-2 right-2), connected flush to the bottom (bottom-0), solid white, no gradients, no emojis */}
      <BottomSheet
        open={sheetOpen}
        onOpenChange={(isOpen) => {
          setSheetOpen(isOpen);
          if (!isOpen) {
            stopBackgroundAudio();
          }
        }}
        showCloseButton={true}
        backgroundImage="/compressed/underwater-bg.webp"
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
                  src="/compressed/gianna.webp"
                  alt="Gianna Isabelle"
                  className="w-full h-auto object-cover block"
                />
              </div>

              {/* Baby Mermaid on Seashell Sticker */}
              <div className="absolute -bottom-5 -right-6 sm:-right-8 w-20 sm:w-24 pointer-events-none select-none z-10 drop-shadow-md boil-jiggle">
                <img
                  src="/compressed/sticker-mermaid-seashell.webp"
                  alt="Baby mermaid on seashell"
                  className="w-full h-auto object-contain rotate-[6deg] hover:rotate-[9deg] transition-transform duration-300 boil-alive"
                />
              </div>
            </div>

            {/* Date - Non-italicized numbers and comma */}
            <div className="mt-5">
              <span className="font-sans text-base sm:text-lg font-bold tracking-[0.16em] uppercase text-[#183B49]">
                October{" "}
                <span className="font-sans not-italic font-bold tracking-normal text-[#183B49]">
                  10, 2026
                </span>
              </span>
            </div>
          </div>

          {/* Section 1: Countdown & Event Locations (7rem space below Date) */}
          <div className="pt-[7rem] flex flex-col">
            
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
                    src="/compressed/church.webp"
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
                      src="/compressed/google-maps-icon.webp"
                      alt=""
                      className="w-4 h-4 object-contain shrink-0"
                    />
                    <span>Get Direction at Google Map</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Transition Route: Church Ceremony -> Venue Reception */}
            <div className="flex flex-col items-center justify-center my-3 select-none" aria-hidden="true">
              <div className="w-0.5 h-12 border-l-2 border-dashed border-stone-300" />
              <svg 
                className="w-4 h-4 text-stone-400 -mt-0.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>


            {/* Box Card 2: Venue / Reception */}
            <div className="relative">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 overflow-hidden shadow-xs">
                {/* Resort Image */}
                <div className="w-full h-48 sm:h-56 relative bg-stone-100">
                  <img
                    src="/compressed/resort.webp"
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
                        src="/compressed/facebook-icon.webp"
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
                        src="/compressed/google-maps-icon.webp"
                        alt=""
                        className="w-4 h-4 object-contain shrink-0"
                      />
                      <span>Get Direction at Google Map</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Pastel Anemone & Ponyo Goldfish Sticker (Left Side) */}
              <div className="absolute -bottom-5 -left-3 w-16 sm:w-20 pointer-events-none select-none z-10 drop-shadow-md boil-jiggle">
                <img
                  src="/compressed/sticker-anemone-goldfish.webp"
                  alt="Anemone and goldfish"
                  className="w-full h-auto object-contain rotate-[-4deg] hover:rotate-[8deg] transition-transform duration-300 boil-alive"
                />
              </div>
            </div>

            {/* Section: Dress Code (5rem / mt-20 space) */}
            <div className="mt-20 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <h3 className="font-cursive text-5xl sm:text-6xl text-[#183B49] leading-none mb-2">
                  Dress Code
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-xs leading-relaxed font-normal">
                  Semi-formal attire. Pastel colors are warmly appreciated.
                </p>

                {/* Pastel Clamshell with Pearl Sticker */}
                <div className="absolute -top-3 -right-6 sm:-right-8 w-14 sm:w-16 pointer-events-none select-none z-10 drop-shadow-md boil-jiggle">
                  <img
                    src="/compressed/sticker-clamshell-pearl.webp"
                    alt="Pastel clamshell with pearl"
                    className="w-full h-auto object-contain rotate-[8deg] hover:rotate-[12deg] transition-transform duration-300 boil-alive"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-stone-50 overflow-hidden p-2 sm:p-3 w-full shadow-xs">
                <img
                  src="/compressed/dress-code.webp"
                  alt="Dress Code: Semi-formal attire in pastel colors"
                  className="w-full h-auto rounded-xl object-contain block"
                />
              </div>
            </div>

            {/* Section: Safety Guidelines (5rem / mt-20 space) */}
            <div className="mt-20 flex flex-col items-center text-center">
              <div className="relative mb-4 flex items-center justify-center">
                <h3 className="relative z-10 font-cursive text-5xl sm:text-6xl text-[#183B49] leading-none">
                  Safety Guidelines
                </h3>

                {/* Gentle Baby Sea Turtle Sticker placed with -z-1 below the text */}
                <div 
                  className="absolute -top-3 -right-5 sm:-right-7 w-16 sm:w-20 pointer-events-none select-none -z-1 drop-shadow-xs boil-jiggle"
                  style={{ zIndex: -1 }}
                >
                  <img
                    src="/compressed/sticker-baby-turtle.webp"
                    alt="Baby sea turtle"
                    className="w-full h-auto object-contain rotate-[-6deg] opacity-90 transition-transform duration-500 boil-alive"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-stone-50 overflow-hidden p-2 sm:p-3 w-full shadow-xs">
                <img
                  src="/compressed/safety-guidelines.webp"
                  alt="Safety Guidelines: No smoking, Face mask if you are sick, No kissing, Hand sanitizer"
                  className="w-full h-auto rounded-xl object-contain block"
                />
              </div>
            </div>

            {/* Section: Gift Ideas (5rem / mt-20 spacing) */}
            <div className="mt-20 flex flex-col pb-4">
              
              {/* Header: Centered Gift Ideas + Natural Request Text + Treasure Chest Sticker */}
              <div className="text-center flex flex-col items-center mb-8 px-2">
                
                {/* Whimsical Vintage Treasure Chest Sticker for Gianna's Savings */}
                <div className="mb-2 w-16 sm:w-20 pointer-events-none select-none drop-shadow-md boil-jiggle">
                  <img
                    src="/compressed/sticker-treasure-chest.webp"
                    alt="Treasure chest for Gianna's savings"
                    className="w-full h-auto object-contain rotate-[-3deg] hover:rotate-[0deg] transition-transform duration-300 boil-alive"
                  />
                </div>

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
                      <div className="h-28 sm:h-32 w-full flex items-center justify-center p-1.5 relative drop-shadow-[0_2px_6px_rgba(0,0,0,0.07)]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="max-h-full max-w-full object-contain pointer-events-none select-none transition-transform duration-300 group-hover:scale-105 boil-alive-subtle"
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

            {/* Section: RSVP & See You! (5rem / mt-20 spacing) */}
            <div className="mt-20 flex flex-col items-center text-center pb-10 relative">
              
              {/* Header with "See you!" */}
              <div className="relative mb-5 flex flex-col items-center w-full">
                <span className="font-cormorant text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#D97A72] mb-1">
                  We Can't Wait To Celebrate
                </span>
                
                <h3 className="font-cursive text-6xl sm:text-7xl text-[#183B49] leading-none mb-3">
                  See you!
                </h3>
                
                <p className="text-xs sm:text-sm text-stone-600 max-w-xs leading-relaxed font-normal">
                  Your presence would mean the world to us as we welcome Gianna into the Christian world and celebrate her first year.
                </p>
              </div>

              {/* RSVP Box Card */}
              <div className="relative w-full rounded-2xl border border-stone-200 bg-stone-50 overflow-visible p-5 sm:p-6 shadow-xs flex flex-col items-center text-center mt-2">
                
                <div className="w-full flex flex-col items-center">
                  <h4 className="font-cormorant text-xl sm:text-2xl font-bold text-[#183B49] mt-1 mb-1">
                    RSVP by September 20, 2026
                  </h4>

                  <p className="text-xs text-stone-500 max-w-xs leading-relaxed mb-5">
                    Please let us know if you can join us so we can reserve your seat and meal with the venue reception.
                  </p>

                  {/* Google Form RSVP Button */}
                  <a
                    href={RSVP_GOOGLE_FORM_URL || "#"}
                    target={RSVP_GOOGLE_FORM_URL ? "_blank" : undefined}
                    rel={RSVP_GOOGLE_FORM_URL ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      playPopSound();
                      if (!RSVP_GOOGLE_FORM_URL) {
                        e.preventDefault();
                        setShowRsvpNotice(true);
                        setTimeout(() => setShowRsvpNotice(false), 4500);
                      }
                    }}
                    className="group relative w-full max-w-xs flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[#183B49] text-white hover:bg-[#122e3a] active:scale-[0.98] shadow-sm hover:shadow-md transition-all duration-200 text-xs sm:text-sm font-semibold tracking-wide cursor-pointer"
                  >
                    <img
                      src="/compressed/google-forms-logo.webp"
                      alt=""
                      className="w-4 h-auto shrink-0 object-contain transition-transform duration-200 group-hover:scale-110"
                    />
                    <span>RSVP via Google Form</span>
                    <svg
                      className="w-3.5 h-3.5 shrink-0 opacity-70 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                  {/* Gentle interactive notice if Google Form is still being prepared */}
                  {showRsvpNotice && (
                    <div className="mt-3 text-[11px] text-[#D97A72] bg-white border border-[#D97A72]/30 px-3.5 py-2 rounded-xl shadow-2xs font-medium max-w-xs animate-in fade-in duration-200">
                      Google Form will open here once the link is connected!
                    </div>
                  )}
                </div>

                {/* Scuba Diver Sticker (Bottom Left of RSVP Card) */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 w-20 sm:w-24 pointer-events-none select-none z-10 drop-shadow-md boil-jiggle">
                  <img
                    src="/compressed/sticker-scuba-diver.webp"
                    alt="Cute scuba diver with goggles and tank"
                    className="w-full h-auto object-contain rotate-[-8deg] hover:rotate-[-3deg] transition-transform duration-300 boil-alive"
                  />
                </div>

                {/* Joyful Waving Mermaid Sticker (Bottom Right of RSVP Card - flipped to face human scuba diver) */}
                <div className="absolute -bottom-6 -right-4 sm:-right-6 w-20 sm:w-24 pointer-events-none select-none z-10 drop-shadow-md boil-jiggle">
                  <img
                    src="/compressed/sticker-rsvp-mermaid.webp"
                    alt="Joyful waving mermaid"
                    className="w-full h-auto object-contain -scale-x-100 rotate-[-6deg] hover:rotate-[-12deg] transition-transform duration-300 boil-alive"
                  />
                </div>

              </div>

              {/* Warm Sign-off */}
              <div className="mt-8 flex flex-col items-center text-center">
                <span className="font-cursive text-3xl sm:text-4xl text-[#183B49]">
                  With all our love,
                </span>
                <span className="font-cormorant text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-stone-500 mt-1">
                  Gianna & Family
                </span>
              </div>

            </div>

          </div>

        </div>
      </BottomSheet>


    </div>
  );
}
