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
      className={`sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-amber-600/30 text-white shadow-lg transition-transform duration-300 ease-in-out will-change-transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top micro bar */}
      <div className="bg-red-950/80 border-b border-amber-500/20 px-4 py-1.5 text-[11px] text-amber-200/90 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {COMPANY_INFO.address}
            </span>
            <span className="opacity-40">|</span>
            <span className="text-amber-300">
              Mở cửa: Mùa hè 06:30 - 17:30 | Mùa đông 07:00 - 17:00
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-amber-300">
              Sự kiện đang diễn ra: "Khảm Sắc Cố Đô"
            </span>
            <span className="opacity-40">|</span>
            <a
              href={`tel:${COMPANY_INFO.hotline}`}
              className="flex items-center gap-1 text-amber-300 hover:text-white font-bold transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>Hotline: {COMPANY_INFO.hotline}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-red-800 flex items-center justify-center shadow-lg border border-amber-400/50 group-hover:scale-105 transition-transform">
              <span className="font-serif font-black text-white text-2xl tracking-tighter">H</span>
            </div>
            <div>
              <div className="font-serif font-black text-lg sm:text-xl text-amber-200 tracking-wide uppercase leading-tight group-hover:text-amber-100 transition-colors">
                {COMPANY_INFO.brand}
              </div>
              <div className="text-[11px] text-amber-400/90 font-medium tracking-wider uppercase">
                Quần thể Di tích Cố đô Huế
              </div>
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
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm"
                      : "text-stone-300 hover:text-white hover:bg-white/5"
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
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-900 via-amber-700 to-red-950 hover:from-red-800 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-900/30 border border-amber-400/40 active:scale-95 transition-all flex items-center gap-2"
            >
              <Ticket className="w-4 h-4 text-amber-300" />
              <span>Đặt vé ngay</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-stone-300 hover:text-white border border-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Only on tablets or fallback) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900/98 border-t border-white/10 px-4 py-4 space-y-2 animate-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30"
                    : "text-stone-300 hover:bg-white/5 hover:text-white"
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
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-900 via-amber-700 to-red-950 text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4 text-amber-300" />
              <span>Đặt vé ngay</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
