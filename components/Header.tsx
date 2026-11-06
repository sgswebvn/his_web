"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY_INFO } from "@/data/heritageData";
import { Ticket, PhoneCall, MapPin, Menu, X, Compass, CalendarCheck, ShieldCheck } from "lucide-react";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Always show when near the very top of the page
          if (currentScrollY <= 80) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 6) {
            // Scrolling down -> hide navbar
            setIsVisible(false);
            setMobileMenuOpen(false);
          } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 6) {
            // Scrolling up -> show navbar
            setIsVisible(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Khám phá di sản", href: "/kham-pha" },
    { label: "Đặt vé tham quan", href: "/dat-ve" },
    { label: "Hành trình tham quan", href: "/hanh-trinh" },
    { label: "Thông tin & Hỗ trợ", href: "/thong-tin-ho-tro" }
  ];

  return (
    <header
      className={`sticky top-0 z-40 bg-[#35D8A9] text-[#0C382E] shadow-md shadow-[#239B7A]/20 transition-transform duration-300 ease-in-out will-change-transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top micro bar */}
      <div className="bg-[#2DBE94] border-b border-[#239E7B]/40 px-4 py-1.5 text-[11px] text-[#0C382E] hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-[#0C382E]">
              <MapPin className="w-3.5 h-3.5 text-[#0C382E]" />
              {COMPANY_INFO.address}
            </span>
            <span className="opacity-30">|</span>
            <span className="text-[#0C382E]/90">
              Mở cửa: Mùa hè 06:30 - 17:30 | Mùa đông 07:00 - 17:00
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#0C382E]">
              Sự kiện đang diễn ra: "Khảm Sắc Cố Đô"
            </span>
            <span className="opacity-30">|</span>
            <a
              href={`tel:${COMPANY_INFO.hotline}`}
              className="flex items-center gap-1 text-[#7A2A44] hover:text-[#521A2C] font-black transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#7A2A44]" />
              <span>Hotline: {COMPANY_INFO.hotline}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex flex-col justify-center group py-1">
            <div className="font-serif font-black text-xl sm:text-2xl text-[#0B342B] tracking-wider uppercase leading-none group-hover:text-[#041A14] transition-colors">
              {COMPANY_INFO.brand}
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#134D3F] font-bold tracking-[0.2em] uppercase mt-1">
              Quần thể Di tích Cố đô Huế
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-xl text-sm transition-all ${
                    isActive
                      ? "bg-[#0B342B] text-[#FFF1D9] font-bold shadow-sm"
                      : "text-[#0B342B]/90 hover:text-[#041A14] hover:bg-[#28BA90]/30 font-semibold"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Quick Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/dat-ve"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7A2A44] via-[#652036] to-[#4F1628] hover:from-[#8F3351] hover:to-[#601E33] text-[#FFF1D9] font-bold text-xs uppercase tracking-wider shadow-md border border-[#CA9764]/40 active:scale-95 transition-all flex items-center gap-2"
            >
              <Ticket className="w-4 h-4 text-[#FFF1D9]" />
              <span>Đặt vé ngay</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl bg-[#28BA90]/40 hover:bg-[#28BA90]/70 flex items-center justify-center text-[#0B342B] hover:text-black border border-[#28BA90] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Only on tablets or fallback) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#35D8A9] border-t border-[#28BA90]/40 px-4 py-4 space-y-2 animate-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive
                    ? "bg-[#0B342B] text-[#FFF1D9] font-bold"
                    : "text-[#0B342B]/90 hover:bg-[#28BA90]/40 hover:text-black font-semibold"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/dat-ve"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7A2A44] via-[#652036] to-[#4F1628] text-[#FFF1D9] font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md border border-[#CA9764]/40"
            >
              <Ticket className="w-4 h-4 text-[#FFF1D9]" />
              <span>Đặt vé ngay</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
