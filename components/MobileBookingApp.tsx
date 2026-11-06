"use client";

import React, { useState, useMemo } from "react";
import {
  HERITAGE_SITES,
  ROUTE_TICKETS,
  COMPANY_INFO,
  HeritageSite,
  RouteTicket
} from "@/data/heritageData";
import { WeatherWidget } from "./WeatherWidget";
import { PaymentModal } from "./PaymentModal";
import {
  Ticket,
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Download,
  Loader2,
  Share2,
  AlertCircle,
  HelpCircle,
  PhoneCall,
  Sparkles,
  Info
} from "lucide-react";

export const MobileBookingApp: React.FC = () => {
  // Booking state
  const [ticketMode, setTicketMode] = useState<"single" | "route">("single");
  const [selectedSiteId, setSelectedSiteId] = useState<string>("dai-noi");
  const [selectedRouteId, setSelectedRouteId] = useState<string>("tuyen-6");
  
  // Date state (default to tomorrow)
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);
  const [visitDate, setVisitDate] = useState<string>(tomorrowStr);
  const [timeSlot, setTimeSlot] = useState<string>("07:30 - 11:30 (Buổi sáng mát mẻ)");

  // Quantity
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);

  // Customer info
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Payment & Success states
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownloadTicket = async () => {
    if (!completedOrder) return;
    try {
      setIsDownloading(true);
      const element = document.getElementById("printable-ticket");
      if (!element) return;

      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `ve-dien-tu-${completedOrder.ticketCode}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Lỗi khi tải ảnh vé:", err);
      if (completedOrder.qrDataUrl) {
        const link = document.createElement("a");
        link.href = completedOrder.qrDataUrl;
        link.download = `ve-dien-tu-${completedOrder.ticketCode}.png`;
        link.click();
      }
    } finally {
      setIsDownloading(false);
    }
  };

  // Computed active target
  const currentSite: HeritageSite = useMemo(() => {
    return HERITAGE_SITES.find((s) => s.id === selectedSiteId) || HERITAGE_SITES[0];
  }, [selectedSiteId]);

  const currentRoute: RouteTicket = useMemo(() => {
    return ROUTE_TICKETS.find((r) => r.id === selectedRouteId) || ROUTE_TICKETS[0];
  }, [selectedRouteId]);

  // Pricing calculations
  const adultUnitPrice = ticketMode === "single" ? currentSite.priceAdult : currentRoute.priceAdult;
  const childUnitPrice = ticketMode === "single" ? currentSite.priceChild : currentRoute.priceChild;
  const totalAmount = adultUnitPrice * adultCount + childUnitPrice * childCount;
  const targetTitle = ticketMode === "single" ? currentSite.name : currentRoute.name;

  // Validation
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!customerName.trim()) errors.name = "Vui lòng nhập họ và tên của bạn";
    if (!customerPhone.trim() || customerPhone.length < 9)
      errors.phone = "Vui lòng nhập số điện thoại hợp lệ";
    if (!customerEmail.trim() || !customerEmail.includes("@"))
      errors.email = "Vui lòng nhập email để nhận mã vé điện tử";
    if (adultCount === 0 && childCount === 0)
      errors.count = "Vui lòng chọn ít nhất 1 vé";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStartPayment = () => {
    if (validateForm()) {
      setIsPaymentOpen(true);
    }
  };

  const handlePaymentSuccess = (apiResult: any) => {
    setIsPaymentOpen(false);
    setCompletedOrder(apiResult.order || {
      ticketCode: apiResult.ticketCode,
      customerName,
      customerPhone,
      customerEmail,
      targetName: targetTitle,
      visitDate,
      timeSlot,
      adultCount,
      childCount,
      totalAmount
    });
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetBooking = () => {
    setCompletedOrder(null);
    setAdultCount(1);
    setChildCount(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#fbf7ee] text-stone-900 pb-28 select-none font-sans">
      {/* Mobile App Header */}
      <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md border-b border-amber-600/30 text-white px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="font-serif font-black text-base text-amber-200 tracking-wider uppercase leading-tight">
              {COMPANY_INFO.brand}
            </div>
            <div className="text-[9px] text-amber-400/90 font-medium tracking-wider uppercase">
              {COMPANY_INFO.mobileSlogan}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${COMPANY_INFO.hotline}`}
              className="flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all active:scale-95"
            >
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>{COMPANY_INFO.hotline}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {completedOrder ? (
        /* SUCCESS ELECTRONIC TICKET SCREEN */
        <main className="p-4 space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="font-serif font-bold text-lg text-emerald-900">
              Đặt vé & Thanh toán thành công!
            </h2>
            <p className="text-xs text-emerald-700">
              Vé điện tử đã được xác nhận. Mã vé và thông tin cũng đã được tự động gửi tới email:{" "}
              <strong>{completedOrder.customerEmail}</strong>.
            </p>
          </div>

          {/* OFFICIAL ELECTRONIC TICKET CARD */}
          <div
            id="printable-ticket"
            className="bg-white rounded-2xl border-2 border-amber-400 shadow-xl overflow-hidden relative"
          >
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-red-950 via-stone-900 to-red-900 text-white p-4 text-center relative">
              <div className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </div>
              <h3 className="font-serif font-bold text-base text-amber-100 mt-1">
                VÉ THAM QUAN ĐIỆN TỬ CỐ ĐÔ HUẾ
              </h3>
              <p className="text-[11px] text-stone-300 mt-0.5">{COMPANY_INFO.name}</p>

              {/* Decorative side cuts */}
              <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-[#fbf7ee] rounded-full border border-amber-400"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#fbf7ee] rounded-full border border-amber-400"></div>
            </div>

            {/* Ticket Body */}
            <div className="p-5 space-y-4">
              {/* QR Code Container */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-2">
                  MÃ VÉ: {completedOrder.ticketCode}
                </span>

                {/* QR Code View */}
                <div className="p-3 bg-white rounded-xl shadow-md border border-stone-200">
                  <img
                    src={
                      completedOrder.qrDataUrl ||
                      `https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=7f1d1d&data=${encodeURIComponent(
                        JSON.stringify({
                          code: completedOrder.ticketCode,
                          name: completedOrder.customerName,
                          site: completedOrder.targetName,
                          date: completedOrder.visitDate,
                          total: completedOrder.totalAmount
                        })
                      )}`
                    }
                    alt="Mã QR Soát Vé"
                    crossOrigin="anonymous"
                    className="w-44 h-44 object-contain"
                  />
                </div>

                <p className="text-[11px] text-stone-600 mt-2 font-medium">
                  Xuất trình mã QR này tại cổng kiểm soát di tích
                </p>
                <div className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full mt-1.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  ĐÃ XÁC THỰC VÀO CỔNG
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-2 text-xs border-t border-b border-stone-100 py-3">
                <div className="flex justify-between">
                  <span className="text-stone-500">Khách hàng:</span>
                  <span className="font-bold text-stone-900">{completedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Số điện thoại:</span>
                  <span className="font-semibold text-stone-800">{completedOrder.customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Địa điểm / Tuyến:</span>
                  <span className="font-bold text-red-950 text-right max-w-[65%]">
                    {completedOrder.targetName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Ngày tham quan:</span>
                  <span className="font-bold text-stone-900">{completedOrder.visitDate}</span>
                </div>
                {completedOrder.timeSlot && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Khung giờ:</span>
                    <span className="text-stone-700 font-medium">{completedOrder.timeSlot}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-500">Số lượng vé:</span>
                  <span className="font-semibold text-stone-800">
                    {completedOrder.adultCount} Người lớn
                    {completedOrder.childCount > 0 ? `, ${completedOrder.childCount} Trẻ em` : ""}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                  <span className="font-bold text-stone-800">Tổng tiền:</span>
                  <span className="font-serif font-black text-base text-red-900">
                    {Number(completedOrder.totalAmount).toLocaleString("vi-VN")} đ
                  </span>
                </div>
              </div>

              {/* Instructions in ticket */}
              <div className="bg-stone-50 rounded-xl p-3 text-[11px] text-stone-600 space-y-1 leading-relaxed">
                <div className="font-bold text-stone-800 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-amber-700" />
                  Hướng dẫn sử dụng tại cổng di tích:
                </div>
                <div>1. Mở màn hình này hoặc ảnh chụp vé đưa cho nhân viên tại cổng.</div>
                <div>2. Tuân thủ trang phục lịch sự khi vào các cung điện, nơi thờ tự.</div>
                <div>3. Giờ mở cửa: Mùa hè 06:30 - 17:30 / Mùa đông 07:00 - 17:00.</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleDownloadTicket}
              disabled={isDownloading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-900 via-amber-700 to-red-950 hover:from-red-800 hover:to-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all disabled:opacity-60"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Đang tải ảnh vé PNG vào máy...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>Tải vé điện tử về máy (Ảnh PNG)</span>
                </>
              )}
            </button>
            <button
              onClick={handleResetBooking}
              className="w-full py-3 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs transition-colors"
            >
              Đặt thêm vé khác
            </button>
          </div>
        </main>
      ) : (
        /* MOBILE FIRST BOOKING FORM */
        <main className="p-4 space-y-4">
          {/* Welcome Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-stone-900 via-red-950 to-stone-950 text-white p-4 shadow-lg border border-amber-500/30">
            <div className="relative z-10 space-y-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-stone-950 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" />
                Cổng Đặt Vé Trực Tuyến
              </span>
              <h1 className="font-serif font-bold text-lg text-amber-100">
                Khám Phá Di Sản Cố Đô Huế
              </h1>
              <p className="text-[11px] text-stone-300 leading-snug">
                Đặt vé nhanh chóng một chạm, nhận ngay vé điện tử QR Code quét qua cổng không cần xếp hàng.
              </p>
            </div>
            {/* Background image fade */}
            <div
              className="absolute inset-0 opacity-20 bg-cover bg-center"
              style={{ backgroundImage: `url('/images/hue/dai-noi/img_0566.jpg')` }}
            />
          </div>

          {/* Step 1: Chọn Loại Vé (Đơn điểm vs Tuyến) */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-red-900 text-amber-200 font-bold text-xs flex items-center justify-center">
                  1
                </div>
                <h2 className="font-serif font-bold text-sm text-stone-900">
                  Chọn Loại Vé Tham Quan
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowRulesModal(true)}
                className="text-[11px] text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                Nội quy & Giờ mở cửa
              </button>
            </div>

            {/* Segmented Control */}
            <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-xl gap-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setTicketMode("single")}
                className={`py-2 rounded-lg transition-all ${
                  ticketMode === "single"
                    ? "bg-white text-red-950 shadow-sm font-bold"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                Vé Đơn Điểm (14 Di tích)
              </button>
              <button
                type="button"
                onClick={() => setTicketMode("route")}
                className={`py-2 rounded-lg transition-all ${
                  ticketMode === "route"
                    ? "bg-white text-red-950 shadow-sm font-bold"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                Vé Tuyến (Tiết kiệm)
              </button>
            </div>

            {/* If Single Monument: Horizontal Scroll / Cards */}
            {ticketMode === "single" ? (
              <div className="space-y-2.5">
                <label className="block text-[11px] font-semibold text-stone-600">
                  Chọn di tích tham quan:
                </label>
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x">
                  {HERITAGE_SITES.map((site) => {
                    const isSelected = site.id === selectedSiteId;
                    return (
                      <button
                        key={site.id}
                        type="button"
                        onClick={() => setSelectedSiteId(site.id)}
                        className={`flex-shrink-0 w-36 rounded-xl border p-2 text-left transition-all snap-start ${
                          isSelected
                            ? "border-amber-600 bg-amber-50/80 shadow ring-1 ring-amber-600"
                            : "border-stone-200 bg-white hover:bg-stone-50"
                        }`}
                      >
                        <div className="w-full h-20 rounded-lg overflow-hidden relative mb-1.5 bg-stone-100">
                          <img
                            src={site.thumbnail}
                            alt={site.name}
                            className="w-full h-full object-cover"
                          />
                          {site.priceAdult === 0 && (
                            <span className="absolute top-1 left-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                              Miễn phí
                            </span>
                          )}
                        </div>
                        <div className="font-bold text-xs text-stone-900 line-clamp-1">
                          {site.name}
                        </div>
                        <div className="text-[11px] text-red-900 font-semibold mt-0.5">
                          {site.priceAdult > 0 ? `${site.priceAdult.toLocaleString("vi-VN")} đ` : "Miễn phí"}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Monument Spotlight Card */}
                <div className="bg-amber-50/50 rounded-xl p-3 border border-amber-200/60 flex items-start gap-3">
                  <img
                    src={currentSite.thumbnail}
                    alt={currentSite.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-stone-200"
                  />
                  <div className="space-y-1 text-xs">
                    <div className="font-serif font-bold text-stone-900">{currentSite.name}</div>
                    <div className="flex items-center gap-1 text-[11px] text-stone-500">
                      <MapPin className="w-3 h-3 text-red-700 flex-shrink-0" />
                      <span className="line-clamp-1">{currentSite.address}</span>
                    </div>
                    <div className="text-[11px] text-stone-600 line-clamp-2">
                      {currentSite.shortDesc}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* If Route Ticket */
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-stone-600">
                  Chọn tuyến tham quan liên thông:
                </label>
                <div className="space-y-2">
                  {ROUTE_TICKETS.map((route) => {
                    const isSelected = route.id === selectedRouteId;
                    return (
                      <button
                        key={route.id}
                        type="button"
                        onClick={() => setSelectedRouteId(route.id)}
                        className={`w-full p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "border-amber-600 bg-amber-50/80 shadow ring-1 ring-amber-600"
                            : "border-stone-200 bg-white hover:bg-stone-50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-bold text-xs text-stone-900">{route.name}</div>
                            <div className="text-[11px] text-stone-500 mt-0.5">
                              {route.description}
                            </div>
                          </div>
                          {route.saving && (
                            <span className="flex-shrink-0 bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {route.saving}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-2 pt-2 border-t border-stone-100 text-xs">
                          <div>
                            <span className="text-stone-400 text-[10px]">Người lớn: </span>
                            <span className="font-bold text-red-900">
                              {route.priceAdult.toLocaleString("vi-VN")} đ
                            </span>
                          </div>
                          <div>
                            <span className="text-stone-400 text-[10px]">Trẻ em: </span>
                            <span className="font-bold text-stone-700">
                              {route.priceChild > 0 ? `${route.priceChild.toLocaleString("vi-VN")} đ` : "Miễn phí"}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Chọn Ngày & Khung Giờ Tham Quan (với Thời Tiết) */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-900 text-amber-200 font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h2 className="font-serif font-bold text-sm text-stone-900">
                Chọn Ngày & Khung Giờ
              </h2>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700">
                Ngày dự kiến tham quan:
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={visitDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 font-medium text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <Calendar className="w-4 h-4 text-stone-400 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Weather widget for the chosen date */}
            <WeatherWidget selectedDate={visitDate} />

            <div className="space-y-2 pt-1">
              <label className="block text-xs font-semibold text-stone-700">
                Khung giờ tham quan gợi ý:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  "07:30 - 11:30 (Sáng mát mẻ)",
                  "13:30 - 17:30 (Chiều êm dịu)",
                  "06:30 - 17:30 (Mùa hè trọn ngày)",
                  "07:00 - 17:00 (Mùa đông trọn ngày)"
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`p-2 rounded-xl border text-left text-[11px] transition-all ${
                      timeSlot === slot
                        ? "border-amber-600 bg-amber-50 text-amber-900 font-bold"
                        : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <Clock className="w-3 h-3 text-amber-700 inline mr-1" />
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Chọn Số Lượng Vé */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-900 text-amber-200 font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h2 className="font-serif font-bold text-sm text-stone-900">
                Chọn Số Lượng Vé
              </h2>
            </div>

            {/* Stepper Adult */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100">
              <div>
                <div className="font-bold text-xs text-stone-900">Người lớn</div>
                <div className="text-[11px] text-red-900 font-semibold">
                  {adultUnitPrice > 0 ? `${adultUnitPrice.toLocaleString("vi-VN")} đ / vé` : "Miễn phí"}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setAdultCount((prev) => Math.max(0, prev - 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-stone-300 font-bold text-stone-700 flex items-center justify-center active:scale-95 shadow-sm"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-sm text-stone-900">
                  {adultCount}
                </span>
                <button
                  type="button"
                  onClick={() => setAdultCount((prev) => prev + 1)}
                  className="w-8 h-8 rounded-lg bg-red-900 text-amber-100 font-bold flex items-center justify-center active:scale-95 shadow-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Stepper Child */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100">
              <div>
                <div className="font-bold text-xs text-stone-900">Trẻ em (7 – 12 tuổi)</div>
                <div className="text-[11px] text-stone-600 font-medium">
                  {childUnitPrice > 0 ? `${childUnitPrice.toLocaleString("vi-VN")} đ / vé` : "Miễn phí"}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setChildCount((prev) => Math.max(0, prev - 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-stone-300 font-bold text-stone-700 flex items-center justify-center active:scale-95 shadow-sm"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-sm text-stone-900">
                  {childCount}
                </span>
                <button
                  type="button"
                  onClick={() => setChildCount((prev) => prev + 1)}
                  className="w-8 h-8 rounded-lg bg-red-900 text-amber-100 font-bold flex items-center justify-center active:scale-95 shadow-sm"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-[11px] text-stone-500 italic bg-amber-50/50 p-2 rounded-lg border border-amber-200/50">
              * Trẻ em dưới 7 tuổi hoặc chiều cao dưới 1.2m được hoàn toàn miễn phí vé vào cổng.
            </div>
            {formErrors.count && (
              <p className="text-red-600 text-xs font-medium">{formErrors.count}</p>
            )}
          </div>

          {/* Step 4: Thông Tin Người Đặt Vé */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-900 text-amber-200 font-bold text-xs flex items-center justify-center">
                4
              </div>
              <h2 className="font-serif font-bold text-sm text-stone-900">
                Thông Tin Khách Hàng
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Họ và tên người đại diện *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ví dụ: Nguyễn Văn An"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                </div>
                {formErrors.name && (
                  <p className="text-red-600 text-[11px] mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Số điện thoại liên hệ *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Ví dụ: 0912 345 678"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                </div>
                {formErrors.phone && (
                  <p className="text-red-600 text-[11px] mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Email nhận vé điện tử QR *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Ví dụ: an.nguyen@gmail.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                </div>
                {formErrors.email && (
                  <p className="text-red-600 text-[11px] mt-1">{formErrors.email}</p>
                )}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Floating Bottom Sticky Bar - Optimized for 1-hand thumb tap */}
      {!completedOrder && (
        <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-amber-300/80 p-3 shadow-2xl z-40">
          <div className="max-w-md mx-auto flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                Tổng thanh toán:
              </div>
              <div className="font-serif font-black text-lg text-red-900 leading-tight">
                {totalAmount > 0 ? `${totalAmount.toLocaleString("vi-VN")} đ` : "Miễn phí"}
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartPayment}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-900 via-amber-700 to-red-950 hover:from-red-800 hover:to-red-900 text-white font-bold text-xs tracking-wide shadow-lg shadow-amber-900/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Ticket className="w-4 h-4 text-amber-300" />
              <span>Xác nhận đặt vé</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Simulated Payment Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        orderData={{
          customerName,
          customerPhone,
          customerEmail,
          targetName: targetTitle,
          visitDate,
          timeSlot,
          adultCount,
          childCount,
          totalAmount,
          ticketCode: `HUE-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
        }}
        onSuccess={handlePaymentSuccess}
      />

      {/* Rules & Open Hours Bottom Sheet Modal */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
              <h3 className="font-serif font-bold text-sm text-amber-100">
                Nội Quy & Thời Gian Mở Cửa
              </h3>
              <button
                type="button"
                onClick={() => setShowRulesModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-y-auto space-y-4 text-xs text-stone-700">
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 space-y-1">
                <div className="font-bold text-amber-900">Thời gian tham quan:</div>
                <div>• Mùa hè (16/03 – 15/10): 06:30 – 17:30 (Đóng cửa 18:30)</div>
                <div>• Mùa đông (16/10 – 15/03 năm sau): 07:00 – 17:00 (Đóng cửa 18:00)</div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-stone-900">10 Điều Nội Quy Tham Quan:</div>
                <ol className="list-decimal list-inside space-y-1.5 leading-relaxed text-[11px] text-stone-600">
                  {COMPANY_INFO.rules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="p-3 border-t bg-stone-50">
              <button
                type="button"
                onClick={() => setShowRulesModal(false)}
                className="w-full py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs"
              >
                Đã hiểu và đồng ý
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

