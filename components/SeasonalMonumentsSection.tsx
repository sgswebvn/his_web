"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HERITAGE_SITES, HeritageSite } from "@/data/heritageData";
import SeasonStatusBar from "./SeasonStatusBar";
import { ChevronLeft, ChevronRight, Sparkles, MapPin, Ticket, Clock, Info } from "lucide-react";

interface SeasonalMonumentsSectionProps {
  onSelectSite: (site: HeritageSite) => void;
}

interface SeasonData {
  id: string;
  seasonKey: "xuan" | "ha" | "thu" | "dong";
  seasonName: string;
  seasonSlogan: string;
  siteId: string;
  dotColor: string;
  colorName: string;
  backgroundGradient: string;
  features: string[];
  poeticVerse: string;
}

const SEASONS: SeasonData[] = [
  {
    id: "xuan",
    seasonKey: "xuan",
    seasonName: "Mùa Xuân",
    seasonSlogan: "Sắc Xuân Hoàng Cung — Đại Nội Uy Nghiêm",
    siteId: "dai-noi",
    dotColor: "#EF5288",
    colorName: "Blush Petal • Sắc Đào Hoàng Cung",
    backgroundGradient:
      "linear-gradient(180deg, #312048 0%, #A33A64 35%, #EF5288 70%, #FDE4EB 100%)",
    features: ["Ngọ Môn Uy Nghiêm", "Điện Thái Hòa", "Tử Cấm Thành", "Nhã Nhạc Cung Đình"],
    poeticVerse: "Mai vàng khoe sắc bờ thành cổ • Sắc xuân rạng ngời chốn hoàng cung"
  },
  {
    id: "ha",
    seasonKey: "ha",
    seasonName: "Mùa Hạ",
    seasonSlogan: "Sắc Hạ Thâm Nghiêm — Lăng Minh Mạng Tĩnh Mặc",
    siteId: "lang-minh-mang",
    dotColor: "#768864",
    colorName: "Reseda Green • Sắc Xanh Non Cố Đô",
    backgroundGradient:
      "linear-gradient(180deg, #1D2A1C 0%, #3F5535 35%, #768864 70%, #E3EED5 100%)",
    features: ["Cửa Đại Hồng Môn", "Hồ Tân Nguyệt", "Đỉnh Cao Phong Thủy", "Rừng Thông Bạt Ngàn"],
    poeticVerse: "Gió hạ thông reo hồ tĩnh mặc • Đăng đối nghiêm trang thế núi sông"
  },
  {
    id: "thu",
    seasonKey: "thu",
    seasonName: "Mùa Thu",
    seasonSlogan: "Sắc Thu Trầm Mặc — Lăng Tự Đức Thi Vị",
    siteId: "lang-tu-duc",
    dotColor: "#E5A93B",
    colorName: "Sunny Citron • Sắc Vàng Trầm Mặc",
    backgroundGradient:
      "linear-gradient(180deg, #2D1A0A 0%, #8C5C1B 35%, #D49D42 70%, #FFF2A6 100%)",
    features: ["Hồ Lưu Khiêm", "Minh Khiêm Đường", "Xung Khiêm Tạ", "Tâm Hồn Thi Sĩ"],
    poeticVerse: "Lá thu vàng rụng hồ Lưu Khiêm • Cung đàn xưa vọng khúc êm đềm"
  },
  {
    id: "dong",
    seasonKey: "dong",
    seasonName: "Mùa Đông",
    seasonSlogan: "Sắc Đông Kiêu Sa — Lăng Khải Định Tuyệt Mỹ",
    siteId: "lang-khai-dinh",
    dotColor: "#4A90E2",
    colorName: "Soft Blue • Sắc Lam Sương Khói",
    backgroundGradient:
      "linear-gradient(180deg, #131B27 0%, #2A486A 35%, #5683B5 70%, #B2DEFF 100%)",
    features: ["Cung Thiên Định", "Khảm Sành Sứ Độc Bản", "Cửu Long Ẩn Vân", "Giao Thoa Đông – Tây"],
    poeticVerse: "Sương giăng xứ Huế đông huyền ảo • Tinh hoa khảm sứ ánh vàng son"
  }
];

export default function SeasonalMonumentsSection({ onSelectSite }: SeasonalMonumentsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cardHover, setCardHover] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSeason = SEASONS[activeIndex];
  const currentSite = HERITAGE_SITES.find((s) => s.id === currentSeason.siteId) || HERITAGE_SITES[0];

  // Auto-play cycling every 6 seconds, pauses while mouse hovers
  useEffect(() => {
    if (isHovered) return;
    autoPlayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SEASONS.length);
    }, 6500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isHovered]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SEASONS.length) % SEASONS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SEASONS.length);
  };

  return (
    <section
      id="di-tich-tieu-bieu"
      className="relative overflow-hidden min-h-[820px] lg:min-h-[920px] flex flex-col justify-between select-none transition-colors duration-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Background Gradients (Crossfading) */}
      {SEASONS.map((season, idx) => (
        <div
          key={season.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none ${
            idx === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: season.backgroundGradient }}
        />
      ))}

      {/* Subtle royal pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.4) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.4) 2%, transparent 0%)",
          backgroundSize: "100px 100px"
        }}
      />

      {/* Floating Misty Clouds (Left & Right) */}
      <div className="absolute top-1/4 -left-12 w-64 sm:w-80 opacity-40 pointer-events-none animate-pulse">
        <img
          src="/wp-content/themes/gnws/assets/images/may-khoi-san-pham.svg"
          alt=""
          className="w-full h-auto object-contain filter drop-shadow-md"
        />
      </div>
      <div className="absolute top-1/3 -right-16 w-72 sm:w-96 opacity-40 pointer-events-none transform -scale-x-100 animate-pulse">
        <img
          src="/wp-content/themes/gnws/assets/images/may-khoi-san-pham.svg"
          alt=""
          className="w-full h-auto object-contain filter drop-shadow-md"
        />
      </div>

      {/* TOP HEADER & STATUS BAR */}
      <div className="relative z-10 w-full pt-8 sm:pt-12 px-4 flex flex-col items-center">
        {/* Section Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/40 backdrop-blur-md border border-amber-300/40 text-amber-200 text-xs uppercase tracking-widest font-semibold shadow-lg mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: "8s" }} />
          <span>Di Tích Tiêu Biểu Bốn Mùa Cố Đô</span>
        </div>

        {/* Desktop / Tablet Authentic SVG Bamboo Status Bar */}
        <div className="hidden md:flex justify-center w-full max-w-5xl py-2">
          <SeasonStatusBar activeIndex={activeIndex} onSelectSeason={(idx) => setActiveIndex(idx)} />
        </div>

        {/* Mobile Friendly Season Tabs */}
        <div className="flex md:hidden items-center justify-center gap-2 w-full max-w-sm px-2 py-1 bg-stone-900/50 backdrop-blur-md rounded-2xl border border-amber-400/30">
          {SEASONS.map((season, idx) => (
            <button
              key={season.id}
              onClick={() => setActiveIndex(idx)}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                idx === activeIndex
                  ? "bg-amber-400 text-stone-950 shadow-md font-black"
                  : "text-amber-100/70 hover:text-white"
              }`}
            >
              {season.seasonName}
            </button>
          ))}
        </div>

        {/* Season Title & Poetic Slogan */}
        <div className="text-center mt-4 sm:mt-6 max-w-2xl px-4">
          <h2 className="font-serif italic text-2xl sm:text-4xl lg:text-5xl text-[#FFF1D9] font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-all duration-500">
            {currentSeason.seasonSlogan}
          </h2>
          <p className="text-xs sm:text-sm text-amber-100/90 font-serif italic mt-2 tracking-wide drop-shadow">
            "{currentSeason.poeticVerse}"
          </p>
        </div>
      </div>

      {/* CENTER SHOWCASE: 3D ROYAL BOX PRESENTATION */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center">
        <div className="relative w-full max-w-xl group">
          {/* Outer Royal Frame with Gold Trim */}
          <div
            className="relative rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-amber-400/30 via-stone-900/60 to-stone-950/90 backdrop-blur-xl border-2 border-amber-300/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] transition-all duration-500 hover:scale-[1.02] cursor-pointer"
            onMouseEnter={() => setCardHover(true)}
            onMouseLeave={() => setCardHover(false)}
            onClick={() => onSelectSite(currentSite)}
          >
            {/* Corner traditional flourishes */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-300 pointer-events-none rounded-tl-sm" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-300 pointer-events-none rounded-tr-sm" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-300 pointer-events-none rounded-bl-sm" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-300 pointer-events-none rounded-br-sm" />

            {/* Inner Image Container */}
            <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden bg-stone-900 border border-amber-400/40">
              <img
                src={cardHover && currentSite.images[1] ? currentSite.images[1] : currentSite.thumbnail}
                alt={currentSite.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

              {/* Top Pill Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="bg-red-950/90 backdrop-blur-md text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/40 shadow-lg">
                  {currentSeason.colorName}
                </span>
                <span className="bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
                  UNESCO 1993
                </span>
              </div>

              {/* Top Right Price Tag */}
              <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full shadow-lg border border-amber-300">
                {currentSite.priceAdult.toLocaleString("vi-VN")} đ / vé
              </div>

              {/* Bottom Card Information */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-amber-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="line-clamp-1">{currentSite.address}</span>
                  <span className="opacity-40">|</span>
                  <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>{currentSite.summerHours}</span>
                </div>

                <h3 className="font-serif font-black text-xl sm:text-2xl lg:text-3xl text-amber-100 group-hover:text-amber-200 transition-colors drop-shadow">
                  {currentSite.name}
                </h3>

                <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed opacity-90 hidden sm:block">
                  {currentSite.shortDesc}
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {currentSeason.features.map((feat, i) => (
                    <span
                      key={i}
                      className="text-[10px] sm:text-[11px] bg-white/10 hover:bg-white/20 backdrop-blur-sm text-amber-200 px-2 py-0.5 rounded-md border border-amber-300/20"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Overlay Hint */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
            <span className="bg-stone-900/90 text-amber-300 text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full border border-amber-400/50 shadow-md">
              Nhấp vào để xem chi tiết
            </span>
          </div>
        </div>

        {/* CTA Button: Authentic Traditional Scroll Button */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => onSelectSite(currentSite)}
            className="group relative inline-flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none"
            aria-label={`Xem chi tiết ${currentSite.name}`}
          >
            <img
              src="/wp-content/themes/gnws/assets/images/season-cta-btn.svg"
              alt="Xem chi tiết di tích"
              className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            />
          </button>

          {/* Season Dots with Active Ring & Arrows */}
          <div className="flex items-center gap-4 sm:gap-6 mt-1">
            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-stone-900/50 hover:bg-stone-900 text-amber-200 border border-amber-400/30 flex items-center justify-center transition-all"
              aria-label="Mùa trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              {SEASONS.map((s, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-7 h-7 border-[3px] border-[#FBE196] shadow-[0_0_12px_rgba(251,225,150,0.8)] scale-110"
                        : "w-5 h-5 bg-white/40 hover:bg-white/70"
                    }`}
                    style={isActive ? { backgroundColor: s.dotColor } : {}}
                    aria-label={`Chuyển tới ${s.seasonName}`}
                    aria-pressed={isActive}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-stone-900/50 hover:bg-stone-900 text-amber-200 border border-amber-400/30 flex items-center justify-center transition-all"
              aria-label="Mùa tiếp"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM ANIMATED WAVE LAYERS */}
      <div className="relative z-0 w-full overflow-hidden pointer-events-none mt-4 -mb-1">
        <img
          src="/images/mistory/season-background.svg"
          alt=""
          className="w-full h-auto block object-cover max-h-[160px] sm:max-h-[200px] lg:max-h-[240px] opacity-90"
        />
      </div>
    </section>
  );
}
