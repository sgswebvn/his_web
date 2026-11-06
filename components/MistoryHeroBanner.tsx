"use client";

import React, { useState, useEffect } from "react";

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
        className="home-hero-section relative w-full h-[calc(100vh-80px)] min-h-[580px] max-h-[1050px] 2xl:max-h-[1200px] overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(180deg, #EA8F98 0%, #E87A90 35%, #00807C 80%, #004D4A 100%)"
        }}
      >
        {/* Animated Vector SVG Graphic - Expansive full-screen hero matching mistory.vn */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          {svgContent ? (
            <div
              className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-cover animate-fade-in"
              dangerouslySetInnerHTML={{
                __html: svgContent.replace(
                  /<svg\b([^>]*)>/i,
                  '<svg $1 preserveAspectRatio="xMidYMid slice" class="home-hero-svg block w-full h-full">'
                )
              }}
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

        {/* Subtle bottom edge transition into the content section */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fbf7ee] to-transparent z-10 pointer-events-none opacity-80" />
      </section>
    </div>
  );
};

