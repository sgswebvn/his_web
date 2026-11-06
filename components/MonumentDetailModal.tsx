"use client";

import React, { useState } from "react";
import { HeritageSite } from "@/data/heritageData";
import { X, MapPin, Clock, Ticket, ExternalLink, Calendar, ChevronLeft, ChevronRight, ShieldAlert } from "lucide-react";
import Image from "next/image";

interface MonumentDetailModalProps {
  site: HeritageSite | null;
  onClose: () => void;
  onBookNow: (site: HeritageSite) => void;
}

export const MonumentDetailModal: React.FC<MonumentDetailModalProps> = ({
  site,
  onClose,
  onBookNow
}) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  if (!site) return null;

  const nextImage = () => {
    setCurrentImgIdx((prev) => (prev + 1) % site.images.length);
  };

  const prevImage = () => {
    setCurrentImgIdx((prev) => (prev - 1 + site.images.length) % site.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-200 max-h-[92vh] flex flex-col">
        {/* Header with image carousel */}
        <div className="relative h-64 sm:h-80 w-full bg-stone-900 overflow-hidden flex-shrink-0">
          <img
            src={site.images[currentImgIdx] || site.thumbnail}
            alt={site.name}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image carousel arrows */}
          {site.images.length > 1 && (
            <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none z-10">
              <button
                type="button"
                onClick={prevImage}
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center pointer-events-auto backdrop-blur-sm transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center pointer-events-auto backdrop-blur-sm transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Thumbnail dots */}
          {site.images.length > 1 && (
            <div className="absolute bottom-16 inset-x-0 flex justify-center gap-1.5 z-10">
              {site.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImgIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentImgIdx ? "w-6 bg-amber-400" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Title on image */}
          <div className="absolute bottom-3 left-4 right-4 z-10 text-white">
            <span className="inline-block text-[10px] font-bold tracking-wider uppercase bg-amber-500/90 text-stone-950 px-2 py-0.5 rounded-sm mb-1.5 shadow">
              {site.category === "hoang-cung" ? "Hoàng Thành & Cung Đình" : site.category === "lang-tam" ? "Lăng Tẩm Hoàng Gia" : "Di Tích Lịch Sử"}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
              {site.name}
            </h2>
            <p className="text-xs text-stone-300 italic">{site.englishName}</p>
          </div>
        </div>

        {/* Modal Content Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-stone-700 text-sm">
          {/* Quick info bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/70 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-800 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-800 block">Địa chỉ:</span>
                <span className="text-stone-600 leading-snug">{site.address}</span>
                {site.mapUrl && (
                  <a
                    href={site.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-900 font-semibold mt-1"
                  >
                    Xem bản đồ <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-800 block">Giờ mở cửa:</span>
                <span className="text-stone-600 block">Hè: {site.summerHours}</span>
                <span className="text-stone-600 block">Đông: {site.winterHours}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Ticket className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-800 block">Giá vé tham quan:</span>
                <span className="text-red-900 font-bold block">
                  Người lớn: {site.priceAdult > 0 ? `${site.priceAdult.toLocaleString("vi-VN")} đ` : "Miễn phí"}
                </span>
                <span className="text-stone-600 block">
                  Trẻ em (7–12t): {site.priceChild > 0 ? `${site.priceChild.toLocaleString("vi-VN")} đ` : "Miễn phí"}
                </span>
              </div>
            </div>
          </div>

          {/* Description paragraphs */}
          <div className="space-y-3 leading-relaxed">
            <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-200 pb-1">
              Giới thiệu lịch sử & Tổng quan
            </h3>
            {site.fullDesc.map((p, idx) => (
              <p key={idx} className="text-stone-600 text-xs sm:text-sm">
                {p}
              </p>
            ))}
          </div>

          {/* Architecture & Highlights */}
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-200 pb-1">
              Đặc trưng kiến trúc nổi bật
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-200/60">
              {site.architecture}
            </p>
          </div>

          {/* Rules highlight */}
          <div className="flex items-start gap-2 text-xs bg-red-50/70 border border-red-200 p-3 rounded-lg text-red-950">
            <ShieldAlert className="w-4 h-4 text-red-800 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Lưu ý khi tham quan:</span> Vui lòng mặc trang phục lịch sự, kín đáo khi vào nội điện; không sờ vào hiện vật; giữ yên lặng nơi tôn nghiêm.
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
          <div className="text-xs text-stone-500 hidden sm:block">
            Mã định danh di tích: <span className="font-mono font-semibold">{site.id}</span>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-100 transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(site);
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-900 to-amber-700 hover:from-red-800 hover:to-amber-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Ticket className="w-4 h-4 text-amber-300" />
              <span>Đặt vé tham quan ({site.priceAdult > 0 ? `${site.priceAdult.toLocaleString("vi-VN")} đ` : "Miễn phí"})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

