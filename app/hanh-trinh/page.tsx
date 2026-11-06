"use client";

import React from "react";
import Link from "next/link";
import { TOUR_JOURNEYS } from "@/data/heritageData";
import {
  Compass,
  MapPin,
  Clock,
  Ticket,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  AlertCircle
} from "lucide-react";

export default function HanhTrinhPage() {
  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
          <Compass className="w-4 h-4 text-amber-700" />
          Chạm Bước Chân – Khám Phá Cố Đô
        </span>
        <h1 className="font-serif font-black text-3xl sm:text-5xl text-stone-900 tracking-tight">
          Hành Trình Tham Quan Di Sản Huế
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Gợi ý các lộ trình nửa ngày và trọn vẹn một ngày tối ưu thời gian, kết nối các di tích biểu tượng và trải nghiệm trọn vẹn văn hóa, ẩm thực vùng đất sông Hương núi Ngự.
        </p>
      </div>

      {/* Journeys List */}
      <div className="space-y-12">
        {TOUR_JOURNEYS.map((journey) => (
          <div
            key={journey.id}
            className="bg-white rounded-3xl overflow-hidden shadow-xl border border-amber-200/80 p-6 sm:p-10 space-y-8"
          >
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-red-900 bg-red-100 px-3 py-1 rounded-full mb-2">
                  {journey.duration}
                </span>
                <h2 className="font-serif font-black text-2xl sm:text-3xl text-stone-900">
                  {journey.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-amber-800 font-semibold mt-1">
                  <MapPin className="w-4 h-4 text-amber-700" />
                  <span>Lộ trình: {journey.route}</span>
                </div>
              </div>

              <Link
                href="/dat-ve"
                className="self-start md:self-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-red-900 to-amber-700 hover:from-red-800 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow transition-all flex items-center gap-2"
              >
                <Ticket className="w-4 h-4 text-amber-300" />
                <span>Đặt vé cho tuyến này</span>
              </Link>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed max-w-4xl">
              {journey.description}
            </p>

            {/* Timeline Stops */}
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-base text-stone-900 border-l-4 border-amber-600 pl-3">
                Lịch trình chi tiết từng điểm đến:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {journey.stops.map((stop, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-lg w-fit">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{stop.time}</span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-stone-900">
                        {stop.siteName}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {stop.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-200/60 text-[11px] text-amber-900 font-semibold">
                      💡 {stop.ticketTip}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips & Recommendations */}
            <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 text-xs text-stone-700 space-y-2">
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                Mẹo tham quan hữu ích:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside text-stone-600">
                {journey.tips.map((tip, tIdx) => (
                  <li key={tIdx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

