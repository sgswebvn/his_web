"use client";

import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBookingApp } from "./MobileBookingApp";

export const ResponsiveViewContainer: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileWidth = window.innerWidth < 768;
      const isMobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(isMobileWidth || (isMobileAgent && window.innerWidth < 1024));
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <>
      {/* 
        MANDATORY MOBILE CONSTRAINT:
        On mobile screens, ONLY render the dedicated Mobile Booking App!
      */}
      <div className="mobile-only-app md:hidden">
        <MobileBookingApp />
      </div>

      {/* 
        DESKTOP VIEW:
        Full portal with Header, Pages, and Footer
      */}
      <div className="desktop-only-view hidden md:block min-h-screen flex flex-col bg-[#fbf7ee]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};

