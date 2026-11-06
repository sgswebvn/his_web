import React, { Suspense } from "react";
import { DesktopBookingSection } from "@/components/DesktopBookingSection";
import { COMPANY_INFO } from "@/data/heritageData";
import { Ticket, Clock, ShieldCheck, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";

export default function DatVePage({
  searchParams
}: {
  searchParams?: { site?: string; route?: string };
}) {
  const initialSiteId = searchParams?.site || "dai-noi";
  const initialRouteId = searchParams?.route || "tuyen-6";

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
          <Ticket className="w-3.5 h-3.5 text-amber-700" />
          Hệ Thống Đặt Vé Trực Tuyến
        </span>
        <h1 className="font-serif font-black text-3xl sm:text-5xl text-stone-900 tracking-tight">
          Đặt Vé Tham Quan Cố Đô Huế
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          Lựa chọn vé đơn điểm hoặc vé tuyến ưu đãi, thanh toán mô phỏng tiện lợi và nhận ngay vé điện tử có mã QR soát vé tự động tại cổng.
        </p>
      </div>

      {/* 5-step process visual bar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-200/80">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-xs">
          {[
            { step: "Bước 1", title: "Lựa chọn vé", desc: "Vé đơn điểm hoặc tuyến kết hợp" },
            { step: "Bước 2", title: "Chọn ngày & số lượng", desc: "Xem dự báo thời tiết Cố Đô" },
            { step: "Bước 3", title: "Nhập thông tin", desc: "Họ tên, SĐT và email nhận vé" },
            { step: "Bước 4", title: "Thanh toán mô phỏng", desc: "Quét VietQR hoặc thẻ ngân hàng" },
            { step: "Bước 5", title: "Nhận vé điện tử", desc: "Mã QR hợp chuẩn vào cổng" }
          ].map((s, idx) => (
            <div key={idx} className="relative flex flex-col space-y-1 p-3 bg-stone-50 rounded-2xl border border-stone-100">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">{s.step}</span>
              <span className="font-bold text-stone-900">{s.title}</span>
              <span className="text-[11px] text-stone-500">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Interactive Booking Component */}
      <Suspense fallback={<div className="py-20 text-center font-bold">Đang tải biểu mẫu đặt vé...</div>}>
        <DesktopBookingSection initialSiteId={initialSiteId} initialRouteId={initialRouteId} />
      </Suspense>

      {/* Visiting Regulations & Times */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-8 space-y-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-800" />
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Quy Định Thời Gian Tham Quan & Giờ Mở Cửa
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-700">
          <div className="bg-white p-5 rounded-2xl border border-amber-200/80 space-y-2">
            <span className="font-bold text-red-950 text-sm block">1. Thời gian mở cửa bán vé phục vụ:</span>
            <div className="space-y-1 text-stone-600">
              <p>• <strong>Mùa hè (từ 16/03 đến 15/10):</strong> Mở cửa 06:30 đến 17:30</p>
              <p>• <strong>Mùa đông (từ 16/10 đến 15/03 năm sau):</strong> Mở cửa 07:00 đến 17:00</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200/80 space-y-2">
            <span className="font-bold text-red-950 text-sm block">2. Thời gian đóng cửa ngừng phục vụ khách:</span>
            <div className="space-y-1 text-stone-600">
              <p>• <strong>Mùa hè:</strong> Đóng cửa lúc 18:30 (60 phút kể từ khi kết thúc bán vé)</p>
              <p>• <strong>Mùa đông:</strong> Đóng cửa lúc 18:00 (60 phút kể từ khi kết thúc bán vé)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

