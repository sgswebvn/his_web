"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HERITAGE_SITES,
  BRAND_LAUNCH_EVENT,
  CULTURAL_VALUES,
  COMPANY_INFO,
  HeritageSite
} from "@/data/heritageData";
import { MonumentDetailModal } from "@/components/MonumentDetailModal";
import {
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Play,
  Award,
  Clock,
  Gift,
  Camera,
  CheckCircle2,
  Layers,
  ArrowUpRight
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);

  const filteredSites = HERITAGE_SITES.filter((site) => {
    if (categoryFilter === "all") return true;
    return site.category === categoryFilter;
  });

  const handleBookNow = (site: HeritageSite) => {
    router.push(`/dat-ve?site=${site.id}`);
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO BANNER */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950 text-white">
        {/* Background Image with layered overlays */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('/images/hue/dai-noi/img_0566.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-900/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-stone-950/40 to-stone-950" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 pt-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 backdrop-blur-md text-amber-300 text-xs sm:text-sm font-semibold tracking-wider uppercase animate-fade-in">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Di Sản Văn Hóa Thế Giới UNESCO 1993</span>
          </div>

          {/* Slogan & Title */}
          <div className="space-y-4">
            <h1 className="font-serif font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white drop-shadow-2xl">
              Khám Phá Di Sản
              <span className="block mt-2 font-serif text-3xl sm:text-5xl lg:text-6xl gold-gradient-text">
                Cố Đô Huế – Khảm Sắc Cố Đô
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-200/90 leading-relaxed font-light drop-shadow">
              Hành trình trở về kinh đô vương triều Nguyễn, nơi tinh hoa kiến trúc phong thủy đỉnh cao giao hòa cùng nghệ thuật khảm sành sứ độc bản ngàn năm.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#di-tich"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-900 via-amber-700 to-red-950 hover:from-red-800 hover:to-amber-600 text-white font-bold text-sm tracking-wider uppercase shadow-2xl shadow-amber-900/50 border border-amber-400/40 transition-all active:scale-95 flex items-center justify-center gap-2 group"
            >
              <Compass className="w-5 h-5 text-amber-300 group-hover:rotate-45 transition-transform" />
              <span>Khám phá 14 di tích</span>
            </a>

            <a
              href="#gia-tri-van-hoa"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-sm tracking-wide border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Khảm sắc cố đô</span>
            </a>
          </div>

          {/* Quick Stats Microbar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 text-left">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <div className="text-2xl sm:text-3xl font-serif font-black text-amber-400">1993</div>
              <div className="text-xs text-stone-300 mt-1">UNESCO Công nhận Di sản đầu tiên của VN</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <div className="text-2xl sm:text-3xl font-serif font-black text-amber-400">14+</div>
              <div className="text-xs text-stone-300 mt-1">Quần thể Di tích & Lăng tẩm Hoàng gia</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <div className="text-2xl sm:text-3xl font-serif font-black text-amber-400">100%</div>
              <div className="text-xs text-stone-300 mt-1">Vé điện tử QR quét tại cổng vào ngay</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <div className="text-2xl sm:text-3xl font-serif font-black text-amber-400">8 Tuyến</div>
              <div className="text-xs text-stone-300 mt-1">Vé tuyến ưu đãi tiết kiệm tới 120k</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GIỚI THIỆU DI SẢN HUẾ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-amber-200/70 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              Tổng Quan Di Sản Cố Đô
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-stone-900 leading-tight">
              Kinh Đô Triều Nguyễn & Kho Tàng Văn Hóa Vô Giá
            </h2>
            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p className="font-serif italic text-base sm:text-lg text-amber-900 bg-amber-50/70 p-4 rounded-2xl border-l-4 border-amber-600">
                “Quần thể di tích Cố đô Huế là kinh đô của triều đại nhà Nguyễn (1802–1945) và là di sản văn hóa thế giới đầu tiên của Việt Nam được UNESCO công nhận vào năm 1993. Tọa lạc dọc bờ sông Hương thơ mộng, quần thể nổi bật với quy hoạch phong thủy đỉnh cao gồm Kinh thành, Hoàng thành, Tử Cấm thành cùng hệ thống lăng tẩm mang kiến trúc độc đáo. Nơi đây là trung tâm lưu giữ kho tàng văn hóa vô giá, tiêu biểu như Nhã nhạc cung đình Huế, Châu bản và Mộc bản triều Nguyễn.”
              </p>
              <p>
                Mỗi công trình kiến trúc tại Huế không chỉ chứng kiến giai đoạn chuyển biến lịch sử quan trọng mà còn phản ánh trọn vẹn đời sống nghệ thuật và tinh thần của vương triều phong kiến cuối cùng tại Việt Nam.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/kham-pha"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-950 text-amber-100 font-bold text-xs uppercase tracking-wider hover:bg-red-900 transition-colors"
              >
                <span>Xem chi tiết các di tích</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/hanh-trinh"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs uppercase tracking-wider hover:bg-stone-50 transition-colors"
              >
                <span>Gợi ý lịch trình tham quan</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-300 aspect-[4/3]">
              <img
                src="/images/hue/dai-noi/img_0568.jpg"
                alt="Đại Nội Huế Hoàng Thành"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                  Kinh thành Huế
                </span>
                <div className="font-serif font-bold text-lg text-amber-100">
                  Cổng Ngọ Môn & Điện Thái Hòa
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TVC QUẢNG BÁ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30">
          <div className="p-8 sm:p-10 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Phim Ngắn Nghệ Thuật
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-amber-100 mt-1">
                TVC Quảng Bá Di Sản Cố Đô Huế
              </h2>
            </div>
            <p className="text-xs text-stone-400 max-w-md">
              Thưởng thức những thước phim sống động khắc họa vẻ đẹp trầm mặc của thành quách, cung điện và tinh hoa khảm sành sứ xứ Huế qua lăng kính điện ảnh hiện đại.
            </p>
          </div>

          {/* Video Player Container */}
          <div className="relative aspect-video w-full bg-stone-900 flex items-center justify-center overflow-hidden">
            {!isPlayingVideo ? (
              <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlayingVideo(true)}>
                <img
                  src="/images/hue/dai-noi/img_0595.png"
                  alt="TVC Di sản Huế"
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/20 transition-colors" />

                {/* Big Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-red-900 to-amber-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform border-4 border-amber-300/80">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 text-white fill-white" />
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-stone-300">
                  <span className="bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md">
                    ▶ Nhấn để phát video giới thiệu Quần thể Di tích Cố đô Huế
                  </span>
                  <span className="bg-amber-600/80 text-white font-bold px-2.5 py-1 rounded-md">
                    Full HD
                  </span>
                </div>
              </div>
            ) : (
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/6iKj9_b4-sA?autoplay=1"
                title="TVC Di sản Huế"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </section>

      {/* 4. DI TÍCH TIÊU BIỂU (14 DI TÍCH VỚI BỘ LỌC) */}
      <section id="di-tich" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Quần Thể Di Tích
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-stone-900">
            Các Điểm Đến Di Tích Tiêu Biểu
          </h2>
          <p className="text-sm text-stone-600">
            Khám phá 14 công trình lịch sử tráng lệ, từ Đại Nội uy nghiêm, hệ thống lăng tẩm hoàng gia đến các cung điện giao thoa văn hóa Đông – Tây.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: "all", label: "Tất cả (14 di tích)" },
            { id: "hoang-cung", label: "Hoàng Cung & Kinh Thành" },
            { id: "lang-tam", label: "Lăng Tẩm Các Vua" },
            { id: "cung-dien", label: "Cung Điện Hoàng Gia" },
            { id: "di-tich-khac", label: "Di Tích Lịch Sử Khác" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                categoryFilter === cat.id
                  ? "bg-red-950 text-amber-300 shadow-md ring-2 ring-amber-500"
                  : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Monument Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site) => (
            <div
              key={site.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-amber-200/80 hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                <img
                  src={site.thumbnail}
                  alt={site.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                {/* Category Pill */}
                <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-500/30">
                  {site.category === "hoang-cung" ? "Kinh Thành" : site.category === "lang-tam" ? "Lăng Tẩm" : site.category === "cung-dien" ? "Cung Điện" : "Di Tích"}
                </span>

                {/* Price Tag */}
                <div className="absolute top-3 right-3 bg-red-900/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow border border-amber-400/40">
                  {site.priceAdult > 0 ? `${site.priceAdult.toLocaleString("vi-VN")} đ` : "Miễn phí vé"}
                </div>

                {/* Title on image bottom */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-serif font-bold text-lg text-amber-100 group-hover:text-amber-200 transition-colors">
                    {site.name}
                  </h3>
                  <p className="text-[11px] text-stone-300 italic">{site.englishName}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-1.5 text-xs text-stone-500">
                    <MapPin className="w-3.5 h-3.5 text-red-700 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{site.address}</span>
                  </div>
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {site.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setSelectedSite(site)}
                    className="w-full py-2.5 px-4 rounded-xl border border-amber-300/80 bg-amber-50/70 hover:bg-amber-100/90 text-amber-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 group"
                  >
                    <span>Xem chi tiết di tích</span>
                    <ChevronRight className="w-3.5 h-3.5 text-amber-800 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. KHÁM PHÁ GIÁ TRỊ VĂN HÓA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Giá Trị Văn Hóa Nghệ Thuật
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-stone-900">
            Kiến Trúc Cung Đình & Nghệ Thuật Khảm Sành Sứ
          </h2>
          <p className="text-sm text-stone-600">
            Nơi hội tụ những giá trị thẩm mỹ, tư tưởng trật tự vương triều và bàn tay tài hoa của nghệ nhân xứ kinh kỳ.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CULTURAL_VALUES.map((val) => (
            <div
              key={val.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-amber-200/80 flex flex-col"
            >
              <div className="h-64 relative overflow-hidden">
                <img
                  src={val.image}
                  alt={val.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                    {val.subtitle}
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-amber-100 mt-1">
                    {val.title}
                  </h3>
                </div>
              </div>
              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <blockquote className="font-serif italic text-sm sm:text-base text-amber-950 bg-amber-50/80 p-4 rounded-2xl border-l-4 border-amber-600 leading-relaxed">
                  “{val.quote}”
                </blockquote>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SỰ KIỆN RA MẮT BỘ NHẬN DIỆN MỚI: KHẢM SẮC CỐ ĐÔ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-stone-950 via-red-950 to-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-amber-500/40 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {BRAND_LAUNCH_EVENT.status}
              </div>
              <h2 className="font-serif font-black text-3xl sm:text-4xl text-amber-100 mt-2">
                Chiến Dịch: “{BRAND_LAUNCH_EVENT.campaignName}”
              </h2>
              <p className="text-xs text-amber-300 mt-1 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" />
                Thời gian diễn ra: {BRAND_LAUNCH_EVENT.timeframe}
              </p>
            </div>
            <p className="text-xs text-stone-300 max-w-md leading-relaxed">
              {BRAND_LAUNCH_EVENT.overview}
            </p>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Online Mini Game */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Gift className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-amber-200">
                  {BRAND_LAUNCH_EVENT.onlineActivity.title}
                </h4>
                <div className="text-[11px] text-amber-300 font-semibold">
                  Thời gian: {BRAND_LAUNCH_EVENT.onlineActivity.time}
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Chụp ảnh / quay video check-in tại các điểm di tích Huế, đăng bài kèm hashtag trên Fanpage để nhận giải.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 text-xs text-amber-300 font-medium">
                🎁 Giải thưởng: {BRAND_LAUNCH_EVENT.onlineActivity.prize}
              </div>
            </div>

            {/* Offline 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Camera className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-amber-200">
                  {BRAND_LAUNCH_EVENT.offlineEvents[0].name}
                </h4>
                <div className="text-[11px] text-amber-300 font-semibold">
                  Thời gian: {BRAND_LAUNCH_EVENT.offlineEvents[0].time}
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {BRAND_LAUNCH_EVENT.offlineEvents[0].description}
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 text-xs text-stone-400">
                Địa điểm: {BRAND_LAUNCH_EVENT.offlineEvents[0].location}
              </div>
            </div>

            {/* Offline 2 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-amber-200">
                  {BRAND_LAUNCH_EVENT.offlineEvents[1].name}
                </h4>
                <div className="text-[11px] text-amber-300 font-semibold">
                  Thời gian: {BRAND_LAUNCH_EVENT.offlineEvents[1].time}
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {BRAND_LAUNCH_EVENT.offlineEvents[1].description}
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 text-xs text-stone-400">
                Địa điểm: {BRAND_LAUNCH_EVENT.offlineEvents[1].location}
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <a
              href={COMPANY_INFO.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>Tham gia Mini Game trên Fanpage chính thức</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 7. HERITAGE EXPLORATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-950 via-stone-900 to-amber-950 text-white p-8 sm:p-12 shadow-2xl border border-amber-400/40 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Hành Trình Di Sản Cố Đô
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-amber-100">
              Khám Phá Toàn Diện 14 Di Tích Tiêu Biểu
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Tìm hiểu sâu sắc về lịch sử, kiến trúc phong thủy và tinh hoa nghệ thuật khảm sành sứ độc bản của Quần thể Di tích Cố đô Huế.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/kham-pha"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm uppercase tracking-wider shadow-2xl transition-all active:scale-95 flex items-center gap-2"
            >
              <Compass className="w-5 h-5 text-stone-950" />
              <span>Xem chi tiết khám phá</span>
            </Link>
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
