import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ResponsiveViewContainer } from "@/components/ResponsiveViewContainer";

export const metadata: Metadata = {
  title: "Khảm Sắc Cố Đô – Quần thể Di tích Cố đô Huế | Đặt vé trực tuyến",
  description:
    "Cổng thông tin quảng bá di sản và hệ thống đặt vé tham quan trực tuyến Quần thể Di tích Cố đô Huế. Khám phá 14 di tích hoàng gia, bảng giá vé chính thức, thanh toán và xuất vé điện tử QR nhanh chóng.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className="bg-[#fbf7ee] text-stone-900 antialiased selection:bg-amber-200 selection:text-amber-900">
        <ResponsiveViewContainer>{children}</ResponsiveViewContainer>
      </body>
    </html>
  );
}
