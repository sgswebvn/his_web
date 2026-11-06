"use client";

import React, { useState, useEffect, useRef } from "react";
import { HERITAGE_SITES, HeritageSite } from "@/data/heritageData";
import SeasonStatusBar from "./SeasonStatusBar";
import { ChevronLeft, ChevronRight, Sparkles, MapPin, Clock } from "lucide-react";

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

// Bảng màu chuẩn theo hình ảnh:
// - Màu chính/nền: #312048
// - Mùa xuân: Blush Petal (#F7C8D0)
// - Mùa hạ: Reseda green (#748163)
// - Mùa thu: Sunny Citron (#FEF0A7)
// - Mùa đông: Soft Blue (#B3E0FD)
const SEASONS: SeasonData[] = [
  {
    id: "xuan",
    seasonKey: "xuan",
    seasonName: "Mùa Xuân",
    seasonSlogan: "Sắc Xuân Hoàng Cung — Đại Nội Uy Nghiêm",
    siteId: "dai-noi",
    dotColor: "#F7C8D0",
    colorName: "Blush Petal • Sắc Đào Hoàng Cung",
    backgroundGradient:
      "linear-gradient(180deg, #312048 0%, #683854 35%, #F7C8D0 75%, #FDF4F6 100%)",
    features: ["Ngọ Môn Uy Nghiêm", "Điện Thái Hòa", "Tử Cấm Thành", "Nhã Nhạc Cung Đình"],
    poeticVerse: "Mai vàng khoe sắc bờ thành cổ • Sắc xuân rạng ngời chốn hoàng cung"
  },
  {
    id: "ha",
    seasonKey: "ha",
    seasonName: "Mùa Hạ",
    seasonSlogan: "Sắc Hạ Thâm Nghiêm — Lăng Minh Mạng Tĩnh Mặc",
    siteId: "lang-minh-mang",
    dotColor: "#748163",
    colorName: "Reseda Green • Sắc Xanh Non Cố Đô",
    backgroundGradient:
      "linear-gradient(180deg, #312048 0%, #464E3F 35%, #748163 75%, #EFF3EB 100%)",
    features: ["Cửa Đại Hồng Môn", "Hồ Tân Nguyệt", "Đăng Đối Phong Thủy", "Rừng Thông Bạt Ngàn"],
    poeticVerse: "Gió hạ thông reo hồ tĩnh mặc • Đăng đối nghiêm trang thế núi sông"
  },
  {
    id: "thu",
    seasonKey: "thu",
    seasonName: "Mùa Thu",
    seasonSlogan: "Sắc Thu Trầm Mặc — Lăng Tự Đức Thi Vị",
    siteId: "lang-tu-duc",
    dotColor: "#FEF0A7",
    colorName: "Sunny Citron • Sắc Vàng Trầm Mặc",
    backgroundGradient:
      "linear-gradient(180deg, #312048 0%, #6D5634 35%, #FEF0A7 75%, #FFFDF2 100%)",
    features: ["Hồ Lưu Khiêm", "Minh Khiêm Đường", "Xung Khiêm Tạ", "Tâm Hồn Thi Sĩ"],
    poeticVerse: "Lá thu vàng rụng hồ Lưu Khiêm • Cung đàn xưa vọng khúc êm đềm"
  },
  {
    id: "dong",
    seasonKey: "dong",
    seasonName: "Mùa Đông",
    seasonSlogan: "Sắc Đông Kiêu Sa — Lăng Khải Định Tuyệt Mỹ",
    siteId: "lang-khai-dinh",
    dotColor: "#B3E0FD",
    colorName: "Soft Blue • Sắc Lam Sương Khói",
    backgroundGradient:
      "linear-gradient(180deg, #312048 0%, #3D4E6D 35%, #B3E0FD 75%, #F2F8FE 100%)",
    features: ["Cung Thiên Định", "Khảm Sành Sứ Độc Bản", "Cửu Long Ẩn Vân", "Giao Thoa Đông – Tây"],
    poeticVerse: "Sương giăng xứ Huế đông huyền ảo • Tinh hoa khảm sứ ánh vàng son"
  }
];

export default function SeasonalMonumentsSection({ onSelectSite }: SeasonalMonumentsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardHover, setCardHover] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const lastWheelTimeRef = useRef(0);
  const activeIndexRef = useRef(0);

  // Keep ref synchronized with state for event listeners
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const currentSeason = SEASONS[activeIndex];
  const currentSite = HERITAGE_SITES.find((s) => s.id === currentSeason.siteId) || HERITAGE_SITES[0];

  // Helper to change season and smoothly sync track scroll
  const goToSeason = (idx: number, smoothScroll = true) => {
    const clamped = Math.max(0, Math.min(3, idx));
    setActiveIndex(clamped);
    activeIndexRef.current = clamped;

    if (smoothScroll && trackRef.current && typeof window !== "undefined") {
      const rect = trackRef.current.getBoundingClientRect();
      const trackAbsoluteTop = window.scrollY + rect.top;
      const targetY = trackAbsoluteTop + clamped * window.innerHeight;
      isAnimatingRef.current = true;
      window.scrollTo({ top: targetY, behavior: "smooth" });
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 700);
    }
  };

  // Synchronize native scroll progress with active season
  useEffect(() => {
    const handleScroll = () => {
      if (isAnimatingRef.current || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const scrolled = -rect.top;
      const maxScroll = rect.height - windowH;

      if (scrolled >= 0 && scrolled <= maxScroll) {
        const rawProgress = scrolled / maxScroll;
        const targetIndex = Math.min(3, Math.max(0, Math.round(rawProgress * 3)));
        if (targetIndex !== activeIndexRef.current) {
          setActiveIndex(targetIndex);
          activeIndexRef.current = targetIndex;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lăn chuột để chuyển cảnh (1 -> 2 -> 3 -> 4) khi khung hình đang được ghim (pinned)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = track.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Kiểm tra xem khung hình đã khựng vào viewport chưa (gần chạm top)
      const isPinnedInView = rect.top <= 15 && rect.bottom >= windowH - 15;
      if (!isPinnedInView) return;

      const currentIdx = activeIndexRef.current;
      const delta = e.deltaY;

      // Bỏ qua rung lắc trackpad nhỏ
      if (Math.abs(delta) < 22) return;

      const now = Date.now();
      const timeSinceLast = now - lastWheelTimeRef.current;

      // LĂN XUỐNG (delta > 0)
      if (delta > 0) {
        if (currentIdx < 3) {
          // Chưa hết 4 mùa: Chặn cuộn trang web xuống dưới, chỉ chuyển mùa tiếp theo!
          e.preventDefault();
          if (timeSinceLast < 600 || isAnimatingRef.current) return;

          lastWheelTimeRef.current = now;
          goToSeason(currentIdx + 1, true);
        }
        // Nếu đã ở mùa Đông (currentIdx === 3), để trình duyệt lăn chuột bình thường xuống nội dung bên dưới!
      }
      // LĂN LÊN (delta < 0)
      else if (delta < 0) {
        if (currentIdx > 0) {
          // Chưa về mùa đầu: Chặn cuộn trang web lên trên, chỉ lùi về mùa trước!
          e.preventDefault();
          if (timeSinceLast < 600 || isAnimatingRef.current) return;

          lastWheelTimeRef.current = now;
          goToSeason(currentIdx - 1, true);
        }
        // Nếu đã ở mùa Xuân (currentIdx === 0), để trình duyệt lăn chuột bình thường lên nội dung bên trên!
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    // Outer scroll track: 400vh (100vh cho mỗi mùa, giúp lăn chuột khựng và chuyển cảnh)
    <div
      ref={trackRef}
      id="di-tich-tieu-bieu"
      className="relative h-[400vh] w-full"
    >
      {/* Pinned Viewport Container (Ghim cố định toàn màn hình khi lướt tới) */}
      <section className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        {/* Dynamic Background Gradients chuyển đổi mượt mà theo bảng màu */}
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

        {/* Floating Misty Clouds (Hai bên mạn thuyền) */}
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

        {/* 1. TOP HEADER & STATUS BAR (Cây tre trượt ngọc & chữ thư pháp) */}
        <div className="relative z-10 w-full pt-4 sm:pt-6 md:pt-8 px-4 flex flex-col items-center flex-shrink-0">
          {/* Badge Section */}
          <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-900/60 backdrop-blur-md border border-amber-300/40 text-amber-200 text-[11px] sm:text-xs uppercase tracking-widest font-semibold shadow-lg mb-2 sm:mb-3">
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: "8s" }} />
            <span>Di Tích Tiêu Biểu Bốn Mùa Cố Đô</span>
          </div>

          {/* Desktop/Tablet Authentic SVG Bamboo Status Bar */}
          <div className="hidden md:flex justify-center w-full max-w-4xl py-1">
            <SeasonStatusBar activeIndex={activeIndex} onSelectSeason={(idx) => goToSeason(idx, true)} />
          </div>

          {/* Mobile Friendly Season Tabs */}
          <div className="flex md:hidden items-center justify-center gap-1.5 w-full max-w-sm px-2 py-1 bg-stone-900/60 backdrop-blur-md rounded-2xl border border-amber-400/30">
            {SEASONS.map((season, idx) => (
              <button
                key={season.id}
                onClick={() => goToSeason(idx, true)}
                className={`flex-1 py-1 px-2 rounded-xl text-[11px] font-bold transition-all text-center ${
                  idx === activeIndex
                    ? "bg-amber-300 text-stone-950 shadow-md font-black"
                    : "text-amber-100/70 hover:text-white"
                }`}
              >
                {season.seasonName}
              </button>
            ))}
          </div>

          {/* Season Title & Poetic Slogan */}
          <div className="text-center mt-2 sm:mt-3 max-w-2xl px-4">
            <h2 className="font-serif italic text-xl sm:text-3xl lg:text-4xl text-[#FFF1D9] font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-all duration-500">
              {currentSeason.seasonSlogan}
            </h2>
            <p className="text-[11px] sm:text-xs text-amber-100/90 font-serif italic mt-1 tracking-wide drop-shadow hidden sm:block">
              "{currentSeason.poeticVerse}"
            </p>
          </div>
        </div>

        {/* 2. CENTER SHOWCASE: 3D ROYAL BOX PRESENTATION */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-2 sm:py-3 flex flex-col items-center flex-1 justify-center min-h-0">
          <div className="relative w-full max-w-lg group">
            {/* Outer Royal Frame with Gold Trim */}
            <div
              className="relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 bg-gradient-to-b from-amber-400/30 via-stone-900/60 to-stone-950/90 backdrop-blur-xl border-2 border-amber-300/60 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] transition-all duration-500 hover:scale-[1.01] cursor-pointer"
              onMouseEnter={() => setCardHover(true)}
              onMouseLeave={() => setCardHover(false)}
              onClick={() => onSelectSite(currentSite)}
            >
              {/* Corner traditional flourishes */}
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-300 pointer-events-none rounded-tl-sm" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-300 pointer-events-none rounded-tr-sm" />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-300 pointer-events-none rounded-bl-sm" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-300 pointer-events-none rounded-br-sm" />

              {/* Inner Image Container */}
              <div className="relative h-52 sm:h-64 md:h-72 lg:h-80 w-full rounded-xl sm:rounded-2xl overflow-hidden bg-stone-900 border border-amber-400/40">
                <img
                  src={cardHover && currentSite.images[1] ? currentSite.images[1] : currentSite.thumbnail}
                  alt={currentSite.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />

                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/25 to-transparent" />

                {/* Top Pill Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="bg-red-950/90 backdrop-blur-md text-amber-300 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-amber-400/40 shadow">
                    {currentSeason.colorName}
                  </span>
                  <span className="bg-stone-900/80 backdrop-blur-md text-white text-[9px] font-semibold px-2 py-0.5 rounded-full border border-white/20 hidden sm:inline-block">
                    UNESCO 1993
                  </span>
                </div>

                {/* Top Right Price Tag */}
                <div className="absolute top-2.5 right-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-[11px] sm:text-xs font-black px-3 py-0.5 rounded-full shadow-lg border border-amber-200">
                  {currentSite.priceAdult.toLocaleString("vi-VN")} đ / vé
                </div>

                {/* Bottom Card Information */}
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-amber-300 font-medium">
                    <MapPin className="w-3 h-3 text-amber-400 flex-shrink-0" />
                    <span className="line-clamp-1">{currentSite.address}</span>
                    <span className="opacity-40">|</span>
                    <Clock className="w-3 h-3 text-amber-400 flex-shrink-0" />
                    <span>{currentSite.summerHours}</span>
                  </div>

                  <h3 className="font-serif font-black text-lg sm:text-xl lg:text-2xl text-amber-100 group-hover:text-amber-200 transition-colors drop-shadow">
                    {currentSite.name}
                  </h3>

                  <p className="text-[11px] text-stone-200 line-clamp-1 leading-relaxed opacity-90 hidden sm:block">
                    {currentSite.shortDesc}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    {currentSeason.features.map((feat, i) => (
                      <span
                        key={i}
                        className="text-[9px] sm:text-[10px] bg-white/10 hover:bg-white/20 backdrop-blur-sm text-amber-200 px-2 py-0.5 rounded-md border border-amber-300/20"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Hint tag */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 pointer-events-none">
              <span className="bg-stone-900/90 text-amber-300 text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-400/50 shadow-md">
                Nhấp để xem chi tiết di tích
              </span>
            </div>
          </div>

          {/* CTA Button: Authentic Traditional Scroll Button */}
          <div className="mt-4 sm:mt-5 flex flex-col items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={() => onSelectSite(currentSite)}
              className="group relative inline-flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none"
              aria-label={`Xem chi tiết ${currentSite.name}`}
            >
              <img
                src="/wp-content/themes/gnws/assets/images/season-cta-btn.svg"
                alt="Xem chi tiết di tích"
                className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              />
            </button>

            {/* 4 Chấm tròn điều hướng theo màu & Mũi tên Previous / Next */}
            <div className="flex items-center gap-3 sm:gap-5">
              <button
                type="button"
                onClick={() => goToSeason(activeIndex - 1, true)}
                className="w-7 h-7 rounded-full bg-stone-900/50 hover:bg-stone-900 text-amber-200 border border-amber-400/30 flex items-center justify-center transition-all"
                aria-label="Mùa trước"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2.5">
                {SEASONS.map((s, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => goToSeason(idx, true)}
                      className={`rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-6 h-6 border-[3px] border-[#FBE196] shadow-[0_0_12px_rgba(251,225,150,0.8)] scale-110"
                          : "w-4 h-4 bg-white/40 hover:bg-white/70"
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
                onClick={() => goToSeason(activeIndex + 1, true)}
                className="w-7 h-7 rounded-full bg-stone-900/50 hover:bg-stone-900 text-amber-200 border border-amber-400/30 flex items-center justify-center transition-all"
                aria-label="Mùa tiếp"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM ANIMATED WAVE LAYERS (5 dải sóng dập dềnh chân trang) */}
        <div className="relative z-0 w-full overflow-hidden pointer-events-none -mb-1 flex-shrink-0">
          <img
            src="/images/mistory/season-background.svg"
            alt=""
            className="w-full h-auto block object-cover max-h-[100px] sm:max-h-[140px] md:max-h-[170px] opacity-90"
          />
        </div>
      </section>
    </div>
  );
}
