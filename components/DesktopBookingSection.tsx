"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  ShieldCheck,
  CheckCircle2,
  Download,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Info,
  Check,
  ArrowRight
} from "lucide-react";

interface DesktopBookingSectionProps {
  initialSiteId?: string;
  initialRouteId?: string;
}

export const DesktopBookingSection: React.FC<DesktopBookingSectionProps> = ({
  initialSiteId = "dai-noi",
  initialRouteId = "tuyen-6"
}) => {
  const [ticketMode, setTicketMode] = useState<"single" | "route">("single");
  const [selectedSiteId, setSelectedSiteId] = useState<string>(initialSiteId);
  const [selectedRouteId, setSelectedRouteId] = useState<string>(initialRouteId);

  // Tomorrow's date as default
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);
  const [visitDate, setVisitDate] = useState<string>(tomorrowStr);
  const [timeSlot, setTimeSlot] = useState<string>("07:30 - 11:30 (Buổi sáng mát mẻ)");

  // Quantities
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);

  // Customer info
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customNote, setCustomNote] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Payment modal & order completion
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  useEffect(() => {
    if (initialSiteId) {
      setSelectedSiteId(initialSiteId);
      setTicketMode("single");
    }
  }, [initialSiteId]);

  const currentSite: HeritageSite = useMemo(() => {
    return HERITAGE_SITES.find((s) => s.id === selectedSiteId) || HERITAGE_SITES[0];
  }, [selectedSiteId]);

  const currentRoute: RouteTicket = useMemo(() => {
    return ROUTE_TICKETS.find((r) => r.id === selectedRouteId) || ROUTE_TICKETS[0];
  }, [selectedRouteId]);

  const adultUnitPrice = ticketMode === "single" ? currentSite.priceAdult : currentRoute.priceAdult;
  const childUnitPrice = ticketMode === "single" ? currentSite.priceChild : currentRoute.priceChild;
  const totalAmount = adultUnitPrice * adultCount + childUnitPrice * childCount;
  const targetTitle = ticketMode === "single" ? currentSite.name : currentRoute.name;

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!customerName.trim()) errors.name = "Vui lòng nhập họ và tên của bạn";
    if (!customerPhone.trim() || customerPhone.length < 9)
      errors.phone = "Vui lòng nhập số điện thoại hợp lệ";
    if (!customerEmail.trim() || !customerEmail.includes("@"))
      errors.email = "Vui lòng nhập email hợp lệ để nhận vé điện tử";
    if (adultCount === 0 && childCount === 0)
      errors.count = "Vui lòng chọn ít nhất 1 vé tham quan";
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setCompletedOrder(null);
    setAdultCount(1);
    setChildCount(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {completedOrder ? (
        /* DESKTOP SUCCESS TICKET SCREEN */
        <div className="max-w-3xl mx-auto py-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center space-y-3 shadow-sm">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-serif font-bold text-2xl text-emerald-900">
              Đặt vé & Thanh toán thành công!
            </h2>
            <p className="text-sm text-emerald-700 max-w-lg mx-auto">
              Vé điện tử của bạn đã được xuất thành công trên hệ thống. Bản sao vé có mã QR cùng hướng dẫn tham quan đã được tự động gửi đến email:{" "}
              <strong>{completedOrder.customerEmail}</strong>.
            </p>
          </div>

          {/* OFFICIAL ELECTRONIC TICKET CARD (PRINTABLE) */}
          <div
            id="printable-ticket"
            className="bg-white rounded-3xl border-2 border-amber-400 shadow-2xl overflow-hidden relative"
          >
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-red-950 via-stone-900 to-red-900 text-white p-6 sm:p-8 text-center relative border-b-2 border-dashed border-amber-500/40">
              <div className="text-xs uppercase tracking-widest text-amber-300 font-bold mb-1">
                TRUNG TÂM BẢO TỒN DI TÍCH CỐ ĐÔ HUẾ
              </div>
              <h3 className="font-serif font-black text-2xl sm:text-3xl text-amber-100 tracking-wide">
                VÉ THAM QUAN ĐIỆN TỬ CHÍNH THỨC
              </h3>
              <p className="text-xs text-stone-300 mt-1">{COMPANY_INFO.name}</p>

              {/* Decorative Cuts */}
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-[#fbf7ee] rounded-full border border-amber-400"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#fbf7ee] rounded-full border border-amber-400"></div>
            </div>

            {/* Ticket Body */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Left Details */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold text-stone-500">Mã đơn vé:</span>
                  <span className="font-mono font-bold text-lg text-red-900 bg-red-50 border border-red-200 px-3 py-0.5 rounded-lg">
                    {completedOrder.ticketCode}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full ml-auto">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    ĐÃ THANH TOÁN
                  </span>
                </div>

                <div className="space-y-2.5 text-sm border-t border-b border-stone-200/80 py-4">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Người đặt vé:</span>
                    <span className="font-bold text-stone-900">{completedOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Số điện thoại:</span>
                    <span className="font-semibold text-stone-800">{completedOrder.customerPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Email nhận vé:</span>
                    <span className="font-semibold text-stone-800">{completedOrder.customerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Địa điểm / Tuyến tham quan:</span>
                    <span className="font-serif font-bold text-red-950 text-right max-w-[60%]">
                      {completedOrder.targetName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Ngày tham quan:</span>
                    <span className="font-bold text-stone-900">{completedOrder.visitDate}</span>
                  </div>
                  {completedOrder.timeSlot && (
                    <div className="flex justify-between">
                      <span className="text-stone-500">Khung giờ đón khách:</span>
                      <span className="text-stone-800 font-medium">{completedOrder.timeSlot}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-stone-500">Số lượng:</span>
                    <span className="font-bold text-stone-900">
                      {completedOrder.adultCount} Người lớn
                      {completedOrder.childCount > 0 ? `, ${completedOrder.childCount} Trẻ em` : ""}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-stone-200">
                    <span className="font-bold text-base text-stone-900">Tổng thanh toán:</span>
                    <span className="font-serif font-black text-2xl text-red-900">
                      {Number(completedOrder.totalAmount).toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </div>

                <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 text-xs text-stone-600 space-y-1">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-amber-700" />
                    Hướng dẫn sử dụng khi vào cổng:
                  </div>
                  <div>• Xuất trình mã QR trực tiếp trên màn hình hoặc bản in tại cửa kiểm soát.</div>
                  <div>• Giờ mở cửa: Mùa hè 06:30 – 17:30 (đóng 18:30); Mùa đông 07:00 – 17:00 (đóng 18:00).</div>
                  <div>• Mặc trang phục trang nghiêm, lịch sự khi vào các cung điện và nơi thờ tự.</div>
                </div>
              </div>

              {/* Right QR Code Badge */}
              <div className="bg-gradient-to-b from-amber-50 to-amber-100 border border-amber-300 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-inner">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-3">
                  MÃ QR SOÁT VÉ
                </span>
                <div className="p-3 bg-white rounded-2xl shadow-lg border border-stone-200">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&color=7f1d1d&data=${encodeURIComponent(
                      JSON.stringify({
                        code: completedOrder.ticketCode,
                        name: completedOrder.customerName,
                        site: completedOrder.targetName,
                        date: completedOrder.visitDate,
                        total: completedOrder.totalAmount
                      })
                    )}`}
                    alt="Mã QR Soát Vé"
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <span className="text-xs text-stone-600 font-semibold mt-3">
                  Quét tự động tại cổng soát vé
                </span>
                <span className="text-[10px] text-stone-400 mt-1">
                  Hỗ trợ 24/7: {COMPANY_INFO.hotline}
                </span>
              </div>
            </div>

            {/* Ticket Footer Action */}
            <div className="bg-stone-50 border-t border-stone-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-stone-500">
                Chúc bạn có một chuyến du ngoạn Cố đô Huế tràn đầy cảm xúc và trải nghiệm ý nghĩa!
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>In / Tải vé điện tử</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs transition-colors"
                >
                  Đặt thêm vé khác
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* MAIN BOOKING STEPPER INTERFACE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form & Configuration (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Mode Switcher */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-900 text-amber-200 font-bold text-sm flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg text-stone-900">
                      Chọn Loại Vé Tham Quan
                    </h2>
                    <p className="text-xs text-stone-500">
                      Lựa chọn vé theo từng điểm di tích đơn lẻ hoặc vé tuyến tham quan kết hợp
                    </p>
                  </div>
                </div>

                {/* Pill Switcher */}
                <div className="p-1 bg-stone-100 rounded-xl flex items-center gap-1 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setTicketMode("single")}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      ticketMode === "single"
                        ? "bg-white text-red-950 shadow font-black"
                        : "text-stone-500 hover:text-stone-900"
                    }`}
                  >
                    Vé Đơn Điểm (14 Di Tích)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTicketMode("route")}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      ticketMode === "route"
                        ? "bg-white text-red-950 shadow font-black"
                        : "text-stone-500 hover:text-stone-900"
                    }`}
                  >
                    Vé Tuyến (Tiết Kiệm)
                  </button>
                </div>
              </div>

              {/* Single Monument Grid */}
              {ticketMode === "single" ? (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-stone-700">
                    Danh sách 14 di tích thuộc Quần thể Di tích Cố đô Huế:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[380px] overflow-y-auto pr-1">
                    {HERITAGE_SITES.map((site) => {
                      const isSelected = site.id === selectedSiteId;
                      return (
                        <button
                          key={site.id}
                          type="button"
                          onClick={() => setSelectedSiteId(site.id)}
                          className={`p-2.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                            isSelected
                              ? "border-amber-600 bg-amber-50/70 shadow-md ring-2 ring-amber-500"
                              : "border-stone-200 bg-white hover:bg-stone-50 hover:border-amber-300"
                          }`}
                        >
                          <div className="w-full h-24 rounded-xl overflow-hidden mb-2 bg-stone-100 relative">
                            <img
                              src={site.thumbnail}
                              alt={site.name}
                              className="w-full h-full object-cover"
                            />
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center shadow">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            )}
                            {site.priceAdult === 0 && (
                              <span className="absolute bottom-1 left-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                                Miễn phí
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-stone-900 line-clamp-1">
                              {site.name}
                            </div>
                            <div className="text-[11px] font-bold text-red-900 mt-0.5">
                              {site.priceAdult > 0 ? `${site.priceAdult.toLocaleString("vi-VN")} đ` : "Miễn phí"}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Route Tickets List */
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-stone-700">
                    Danh sách các tuyến tham quan liên thông ưu đãi:
                  </label>
                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {ROUTE_TICKETS.map((route) => {
                      const isSelected = route.id === selectedRouteId;
                      return (
                        <button
                          key={route.id}
                          type="button"
                          onClick={() => setSelectedRouteId(route.id)}
                          className={`w-full p-4 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? "border-amber-600 bg-amber-50/70 shadow-md ring-2 ring-amber-500"
                              : "border-stone-200 bg-white hover:bg-stone-50 hover:border-amber-300"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-serif font-bold text-sm text-stone-900">
                                {route.name}
                              </div>
                              <p className="text-xs text-stone-500 mt-1">{route.description}</p>
                            </div>
                            {route.saving && (
                              <span className="flex-shrink-0 bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-full border border-red-200">
                                {route.saving}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-6 mt-3 pt-3 border-t border-stone-100 text-xs">
                            <div>
                              <span className="text-stone-400">Giá vé người lớn: </span>
                              <span className="font-bold text-red-900 text-sm">
                                {route.priceAdult.toLocaleString("vi-VN")} đ
                              </span>
                            </div>
                            <div>
                              <span className="text-stone-400">Giá vé trẻ em: </span>
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

            {/* Step 2: Date, Time & Weather */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                <div className="w-8 h-8 rounded-full bg-red-900 text-amber-200 font-bold text-sm flex items-center justify-center">
                  2
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg text-stone-900">
                    Thời Gian & Dự Báo Thời Tiết
                  </h2>
                  <p className="text-xs text-stone-500">
                    Chọn ngày tham quan để kiểm tra dự báo thời tiết tại Quần thể di tích
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">
                    Ngày dự kiến tham quan:
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={visitDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 font-medium text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    <Calendar className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">
                    Khung giờ tham quan đề xuất:
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 font-medium text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="07:30 - 11:30 (Buổi sáng mát mẻ)">
                      07:30 – 11:30 (Buổi sáng mát mẻ, nắng dịu)
                    </option>
                    <option value="13:30 - 17:30 (Buổi chiều êm đềm)">
                      13:30 – 17:30 (Buổi chiều êm đềm hoàng hôn)
                    </option>
                    <option value="06:30 - 17:30 (Cả ngày mùa hè)">
                      06:30 – 17:30 (Mở cửa mùa hè)
                    </option>
                    <option value="07:00 - 17:00 (Cả ngày mùa đông)">
                      07:00 – 17:00 (Mở cửa mùa đông)
                    </option>
                  </select>
                </div>
              </div>

              {/* Weather forecast module */}
              <WeatherWidget selectedDate={visitDate} />
            </div>

            {/* Step 3: Quantities */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                <div className="w-8 h-8 rounded-full bg-red-900 text-amber-200 font-bold text-sm flex items-center justify-center">
                  3
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg text-stone-900">
                    Chọn Số Lượng Vé
                  </h2>
                  <p className="text-xs text-stone-500">
                    Quy định: Vé người lớn và vé trẻ em theo bảng giá chính thức ban hành
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Stepper Adult */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-stone-900">Người lớn</div>
                    <div className="text-xs text-red-900 font-bold mt-0.5">
                      {adultUnitPrice > 0 ? `${adultUnitPrice.toLocaleString("vi-VN")} đ / vé` : "Miễn phí"}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdultCount((p) => Math.max(0, p - 1))}
                      className="w-9 h-9 rounded-xl bg-white border border-stone-300 font-bold text-stone-700 flex items-center justify-center hover:bg-stone-100 active:scale-95 shadow-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-base text-stone-900">
                      {adultCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdultCount((p) => p + 1)}
                      className="w-9 h-9 rounded-xl bg-red-900 text-amber-100 font-bold flex items-center justify-center hover:bg-red-800 active:scale-95 shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Stepper Child */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-stone-900">Trẻ em (7 – 12 tuổi)</div>
                    <div className="text-xs text-stone-600 font-medium mt-0.5">
                      {childUnitPrice > 0 ? `${childUnitPrice.toLocaleString("vi-VN")} đ / vé` : "Miễn phí"}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setChildCount((p) => Math.max(0, p - 1))}
                      className="w-9 h-9 rounded-xl bg-white border border-stone-300 font-bold text-stone-700 flex items-center justify-center hover:bg-stone-100 active:scale-95 shadow-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-base text-stone-900">
                      {childCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setChildCount((p) => p + 1)}
                      className="w-9 h-9 rounded-xl bg-red-900 text-amber-100 font-bold flex items-center justify-center hover:bg-red-800 active:scale-95 shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-xs text-stone-500 italic bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                💡 <strong>Chính sách ưu đãi:</strong> Trẻ em dưới 7 tuổi hoặc chiều cao dưới 1.2m được hoàn toàn miễn phí vé khi đi cùng người lớn.
              </div>
              {formErrors.count && (
                <p className="text-red-600 text-xs font-semibold">{formErrors.count}</p>
              )}
            </div>

            {/* Step 4: Customer Details */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                <div className="w-8 h-8 rounded-full bg-red-900 text-amber-200 font-bold text-sm flex items-center justify-center">
                  4
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg text-stone-900">
                    Thông Tin Người Đặt Vé
                  </h2>
                  <p className="text-xs text-stone-500">
                    Vui lòng điền thông tin chính xác để nhận vé điện tử và mã QR qua email
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Họ và tên người đại diện *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  </div>
                  {formErrors.name && (
                    <p className="text-red-600 text-xs mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Số điện thoại liên hệ *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="0912 345 678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  </div>
                  {formErrors.phone && (
                    <p className="text-red-600 text-xs mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Email nhận vé điện tử QR *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  </div>
                  {formErrors.email && (
                    <p className="text-red-600 text-xs mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Ghi chú thêm (tùy chọn)
                  </label>
                  <input
                    type="text"
                    placeholder="Yêu cầu hướng dẫn viên, hỗ trợ xe lăn,..."
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Summary & Checkout Action (4 cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-300/80 space-y-5">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest block">
                  TỔNG HỢP ĐƠN VÉ
                </span>
                <h3 className="font-serif font-bold text-xl text-stone-900 mt-1">
                  {targetTitle}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                  <Calendar className="w-3.5 h-3.5 text-red-800" />
                  <span>{visitDate}</span>
                </div>
              </div>

              {/* Itemized Calculation */}
              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex justify-between items-center">
                  <span>Vé Người lớn ({adultCount} x {adultUnitPrice.toLocaleString("vi-VN")} đ):</span>
                  <span className="font-semibold text-stone-800">
                    {(adultUnitPrice * adultCount).toLocaleString("vi-VN")} đ
                  </span>
                </div>

                {childCount > 0 && (
                  <div className="flex justify-between items-center">
                    <span>Vé Trẻ em ({childCount} x {childUnitPrice.toLocaleString("vi-VN")} đ):</span>
                    <span className="font-semibold text-stone-800">
                      {(childUnitPrice * childCount).toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center text-emerald-700 font-medium">
                  <span>Phí xuất vé QR điện tử:</span>
                  <span>Miễn phí</span>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs uppercase font-bold text-stone-800 block">
                      Tổng thanh toán:
                    </span>
                    <span className="text-[11px] text-stone-400">Đã bao gồm thuế & phí</span>
                  </div>
                  <div className="font-serif font-black text-2xl text-red-950">
                    {totalAmount > 0 ? `${totalAmount.toLocaleString("vi-VN")} đ` : "Miễn phí"}
                  </div>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                type="button"
                onClick={handleStartPayment}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-900 via-amber-700 to-red-950 hover:from-red-800 hover:to-amber-600 text-white font-bold text-sm tracking-wider uppercase shadow-xl shadow-amber-900/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                <Ticket className="w-4 h-4 text-amber-300" />
                <span>Tiến hành thanh toán</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-[11px] text-stone-500 text-center leading-relaxed">
                🔒 Thanh toán mô phỏng an toàn, tích hợp xuất mã QR tức thì và gửi email tự động.
              </div>
            </div>

            {/* Quick Support Card */}
            <div className="bg-stone-900 text-white p-5 rounded-3xl space-y-2 border border-amber-500/30">
              <div className="text-xs font-bold text-amber-300">Bạn cần tư vấn lộ trình?</div>
              <p className="text-[11px] text-stone-300 leading-snug">
                Liên hệ ngay hotline hỗ trợ du khách của {COMPANY_INFO.name}:
              </p>
              <div className="pt-1">
                <a
                  href={`tel:${COMPANY_INFO.hotline}`}
                  className="font-bold text-amber-200 text-sm hover:underline block"
                >
                  📞 {COMPANY_INFO.hotline}
                </a>
              </div>
            </div>
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
    </div>
  );
};

