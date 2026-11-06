"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HERITAGE_SITES,
  ROUTE_TICKETS,
  HeritageSite
} from "@/data/heritageData";
import { MonumentDetailModal } from "@/components/MonumentDetailModal";
import {
  MapPin,
  Clock,
  Ticket,
  ExternalLink,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Compass,
  ArrowRight
} from "lucide-react";

export default function KhamPhaPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);

  const filteredSites = HERITAGE_SITES.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || site.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleBookNow = (site: HeritageSite) => {
    router.push(`/dat-ve?site=${site.id}`);
  };

  return (
    <div className="space-y-16 py-12">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            <Compass className="w-4 h-4 text-amber-700" />
            Khám Phá Di Sản Huế
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-stone-900 tracking-tight">
            Quần Thể Di Tích Cố Đô Huế
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Kinh đô của vương triều nhà Nguyễn (1802–1945), nơi hội tụ 14 công trình di sản văn hóa thế giới được UNESCO công nhận với quy hoạch phong thủy đỉnh cao và kiến trúc hoàng gia tráng lệ.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-lg border border-amber-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Tìm tên di tích, địa chỉ, lăng tẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
          </div>

          {/* Category buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: "all", label: "Tất cả (14)" },
              { id: "hoang-cung", label: "Hoàng Cung" },
              { id: "lang-tam", label: "Lăng Tẩm" },
              { id: "cung-dien", label: "Cung Điện" },
              { id: "di-tich-khac", label: "Di Tích Khác" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  categoryFilter === cat.id
                    ? "bg-red-950 text-amber-300 shadow ring-1 ring-amber-500"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Monuments Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site) => (
            <div
              key={site.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-amber-200/70 hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Card Photo */}
              <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                <img
                  src={site.thumbnail}
                  alt={site.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                {/* Price pill */}
                <div className="absolute top-3 right-3 bg-red-900 text-amber-100 text-xs font-bold px-3 py-1 rounded-full shadow border border-amber-400/40">
                  {site.priceAdult > 0 ? `${site.priceAdult.toLocaleString("vi-VN")} đ` : "Miễn phí vé"}
                </div>

                {/* Category badge */}
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                  {site.category === "hoang-cung" ? "Kinh Thành" : site.category === "lang-tam" ? "Lăng Tẩm" : site.category === "cung-dien" ? "Cung Điện" : "Di Tích"}
                </span>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-serif font-bold text-lg text-amber-100">
                    {site.name}
                  </h3>
                  <p className="text-[11px] text-stone-300 italic">{site.englishName}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5 text-xs text-stone-600">
                  <div className="flex items-start gap-1.5 text-stone-500">
                    <MapPin className="w-3.5 h-3.5 text-red-700 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{site.address}</span>
                  </div>

                  <p className="line-clamp-3 text-stone-600 leading-relaxed">
                    {site.shortDesc}
                  </p>

                  <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-stone-600">Mở cửa hè: {site.summerHours}</span>
                    {site.mapUrl && (
                      <a
                        href={site.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-800 font-bold hover:underline flex items-center gap-0.5"
                      >
                        Bản đồ <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSite(site)}
                    className="flex-1 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-xs transition-colors"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBookNow(site)}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-900 to-amber-700 hover:from-red-800 hover:to-amber-600 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5"
                  >
                    <Ticket className="w-3.5 h-3.5 text-amber-300" />
                    <span>Đặt vé điểm này</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Price Tables Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Bảng Giá Vé Niêm Yết
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-stone-900">
            Bảng Giá Vé Tham Quan Chính Thức
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Áp dụng cho du khách tham quan Quần thể Di tích Cố đô Huế theo quy định nhà nước.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Table 1: Đơn Điểm */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-200/80 space-y-4">
            <h3 className="font-serif font-bold text-base sm:text-lg text-red-950 border-b border-stone-200 pb-2 flex items-center justify-between">
              <span>1. Bảng giá vé tham quan đơn điểm</span>
              <span className="text-xs font-sans text-stone-500 font-normal">13 Di tích thu phí</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-stone-200 text-stone-500">
                    <th className="py-2.5 px-2">STT</th>
                    <th className="py-2.5 px-2">Di tích</th>
                    <th className="py-2.5 px-2 text-right">Người lớn</th>
                    <th className="py-2.5 px-2 text-right">Trẻ em (7–12t)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {[
                    { stt: 1, name: "Đại Nội Huế", adult: "200.000đ", child: "40.000đ" },
                    { stt: 2, name: "Lăng Minh Mạng", adult: "150.000đ", child: "30.000đ" },
                    { stt: 3, name: "Lăng Tự Đức", adult: "150.000đ", child: "30.000đ" },
                    { stt: 4, name: "Lăng Khải Định", adult: "150.000đ", child: "30.000đ" },
                    { stt: 5, name: "Lăng Gia Long", adult: "150.000đ", child: "Miễn phí" },
                    { stt: 6, name: "Lăng Đồng Khánh", adult: "100.000đ", child: "Miễn phí" },
                    { stt: 7, name: "Lăng Thiệu Trị", adult: "50.000đ", child: "Miễn phí" },
                    { stt: 8, name: "Bảo tàng Cổ vật Cung đình Huế", adult: "50.000đ", child: "Miễn phí" },
                    { stt: 9, name: "Điện Hòn Chén", adult: "50.000đ", child: "Miễn phí" },
                    { stt: 10, name: "Cung An Định", adult: "50.000đ", child: "Miễn phí" },
                    { stt: 11, name: "Đàn Nam Giao", adult: "50.000đ", child: "Miễn phí" },
                    { stt: 12, name: "Lăng Dục Đức", adult: "50.000đ", child: "Miễn phí" },
                    { stt: 13, name: "Hải Vân Quan", adult: "70.000đ", child: "Miễn phí" }
                  ].map((row) => (
                    <tr key={row.stt} className="hover:bg-amber-50/40">
                      <td className="py-2 px-2 text-stone-400 font-mono">{row.stt}</td>
                      <td className="py-2 px-2 font-semibold text-stone-800">{row.name}</td>
                      <td className="py-2 px-2 text-right font-bold text-red-900">{row.adult}</td>
                      <td className="py-2 px-2 text-right text-stone-600">{row.child}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Tuyến */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-200/80 space-y-4">
            <h3 className="font-serif font-bold text-base sm:text-lg text-red-950 border-b border-stone-200 pb-2 flex items-center justify-between">
              <span>2. Bảng giá vé tham quan theo tuyến</span>
              <span className="text-xs font-sans text-stone-500 font-normal">8 Tuyến liên thông</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-stone-200 text-stone-500">
                    <th className="py-2.5 px-2">STT</th>
                    <th className="py-2.5 px-2">Tuyến tham quan</th>
                    <th className="py-2.5 px-2 text-right">Người lớn</th>
                    <th className="py-2.5 px-2 text-right">Trẻ em</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {ROUTE_TICKETS.map((route, idx) => (
                    <tr key={route.id} className="hover:bg-amber-50/40">
                      <td className="py-2.5 px-2 text-stone-400 font-mono">{idx + 1}</td>
                      <td className="py-2.5 px-2">
                        <div className="font-semibold text-stone-800">{route.name}</div>
                        {route.saving && (
                          <span className="text-[10px] text-red-700 font-bold">{route.saving}</span>
                        )}
                      </td>
                      <td className="py-2.5 px-2 text-right font-bold text-red-900">
                        {route.priceAdult.toLocaleString("vi-VN")}đ
                      </td>
                      <td className="py-2.5 px-2 text-right text-stone-600">
                        {route.priceChild > 0 ? `${route.priceChild.toLocaleString("vi-VN")}đ` : "Miễn phí"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pt-2 text-center">
              <Link
                href="/dat-ve"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-900 to-amber-700 hover:from-red-800 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow"
              >
                <span>Chuyển tới trang Đặt vé ngay</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Monument Detail Modal */}
      <MonumentDetailModal
        site={selectedSite}
        onClose={() => setSelectedSite(null)}
        onBookNow={handleBookNow}
      />
    </div>
  );
}

