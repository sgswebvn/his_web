"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Compass, ChevronDown } from "lucide-react";

export const MistoryHeroBanner: React.FC = () => {
  const [cloudsOpen, setCloudsOpen] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    // 1. Fetch animated SVG banner
    fetch("/images/mistory/mistory-hero.svg")
      .then((res) => res.text())
      .then((data) => setSvgContent(data))
      .catch((err) => console.error("Could not load hero SVG:", err));

    // 2. Trigger intro clouds parting effect
    const openTimer = setTimeout(() => {
      setCloudsOpen(true);
    }, 120);

    // 3. Remove intro clouds completely after transition finishes
    const finishTimer = setTimeout(() => {
      setIntroFinished(true);
    }, 2200);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* ============================================================
          1. INTRO CLOUDS PARTING ANIMATION ("Áng mây mở ra 2 bên")
      ============================================================ */}
      {!introFinished && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden transition-opacity duration-700 ease-out">
          {/* Top-Left Cloud */}
          <img
            src="/images/mistory/may-intro.png"
            alt="Mây hoàng cung"
            className={`fixed top-[-22vh] left-[-48vw] w-[max(1600px,120vw)] max-w-none transition-all duration-[1700ms] ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform ${
              cloudsOpen
                ? "translate-x-[-110vw] translate-y-[-70vh] opacity-0"
                : "translate-x-0 translate-y-0 opacity-100"
            }`}
          />

          {/* Top-Right Cloud */}
          <img
            src="/images/mistory/may-intro.png"
            alt="Mây hoàng cung"
            className={`fixed top-[-22vh] right-[-48vw] w-[max(1600px,120vw)] max-w-none transition-all duration-[1700ms] ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform scale-x-[-1] ${
              cloudsOpen
                ? "translate-x-[110vw] translate-y-[-70vh] opacity-0"
                : "translate-x-0 translate-y-0 opacity-100"
            }`}
          />

          {/* Bottom-Left Cloud */}
          <img
            src="/images/mistory/may-intro.png"
            alt="Mây hoàng cung"
            className={`fixed bottom-[-22vh] left-[-50vw] w-[max(1700px,128vw)] max-w-none transition-all duration-[1700ms] ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform ${
              cloudsOpen
                ? "translate-x-[-110vw] translate-y-[70vh] opacity-0"
                : "translate-x-0 translate-y-0 opacity-100"
            }`}
          />

          {/* Bottom-Right Cloud */}
          <img
            src="/images/mistory/may-intro.png"
            alt="Mây hoàng cung"
            className={`fixed bottom-[-22vh] right-[-50vw] w-[max(1700px,128vw)] max-w-none transition-all duration-[1700ms] ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform scale-x-[-1] ${
              cloudsOpen
                ? "translate-x-[110vw] translate-y-[70vh] opacity-0"
                : "translate-x-0 translate-y-0 opacity-100"
            }`}
          />
        </div>
      )}

      {/* ============================================================
          2. ANIMATED HERO BANNER ("Banner chuyển động mistory.vn")
      ============================================================ */}
      <section
        className="home-hero-section relative 2xl:min-h-screen lg:min-h-[900px] md:min-h-[720px] min-h-[480px] overflow-hidden flex flex-col justify-between"
        style={{
          background: "linear-gradient(180deg, #F5A3B7 0%, #E87A90 35%, #00807C 80%, #004D4A 100%)"
        }}
      >
        {/* Top Decorative Wave */}
        <img
          src="/images/mistory/top-wave.svg"
          alt=""
          loading="lazy"
          className="absolute top-0 left-1/2 -translate-x-1/2 object-contain scale-125 max-md:h-[80px] min-[1920px]:object-cover min-[1920px]:w-full pointer-events-none z-20"
        />

        {/* Animated Vector SVG Graphic */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
          {svgContent ? (
            <div
              className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-cover animate-fade-in"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          ) : (
            /* Fallback while loading */
            <object
              type="image/svg+xml"
              data="/images/mistory/mistory-hero.svg"
              className="w-full h-full object-cover"
              aria-label="Cố đô Huế - Mistory Animated Banner"
            />
          )}
        </div>

        {/* Soft bottom gradient to blend seamlessly into next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fbf7ee] via-[#fbf7ee]/40 to-transparent z-10 pointer-events-none" />

        {/* ============================================================
            3. ROYAL CONTENT OVERLAY
        ============================================================ */}
        <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-24 sm:pt-32 pb-16">
          {/* UNESCO Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/60 border border-amber-400/40 backdrop-blur-md text-amber-300 text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-lg animate-fade-in">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Di Sản Văn Hóa Thế Giới UNESCO 1993</span>
          </div>

          {/* Title & Slogan */}
          <div className="space-y-3">
            <h1 className="font-serif font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
              Khám Phá Di Sản
              <span className="block mt-2 font-serif text-3xl sm:text-5xl lg:text-6xl text-amber-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                Cố Đô Huế – Khảm Sắc Cố Đô
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-100 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              Hành trình trở về kinh đô vương triều Nguyễn, nơi tinh hoa kiến trúc phong thủy đỉnh cao giao hòa cùng nghệ thuật khảm sành sứ độc bản ngàn năm.
            </p>
          </div>

          {/* Action Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#di-tich"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-950 via-amber-800 to-red-900 hover:from-red-900 hover:to-amber-700 text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl border border-amber-400/50 transition-all active:scale-95 flex items-center justify-center gap-2 group backdrop-blur-sm"
            >
              <Compass className="w-4 h-4 text-amber-300 group-hover:rotate-45 transition-transform" />
              <span>Khám phá 14 di tích</span>
            </a>

            <a
              href="#gia-tri-van-hoa"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-stone-900/60 hover:bg-stone-900/80 backdrop-blur-md text-amber-100 font-semibold text-xs sm:text-sm tracking-wide border border-amber-300/40 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Khảm sắc cố đô</span>
            </a>
          </div>

          {/* Scroll Down Hint */}
          <div className="pt-6 hidden sm:block">
            <a
              href="#gioi-thieu"
              className="inline-flex flex-col items-center text-xs text-stone-200/90 hover:text-white transition-colors"
            >
              <span className="text-[11px] font-medium tracking-widest uppercase mb-1 drop-shadow">
                Cuộn xuống để khám phá
              </span>
              <ChevronDown className="w-4 h-4 animate-bounce text-amber-300 drop-shadow" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
