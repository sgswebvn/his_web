"use client";

import React from "react";
import Link from "next/link";
import { COMPANY_INFO } from "@/data/heritageData";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Ticket, ExternalLink, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-amber-500/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <div className="font-serif font-black text-xl text-amber-200 tracking-wider uppercase leading-tight">
                {COMPANY_INFO.brand}
              </div>
              <div className="text-[11px] text-amber-400/90 font-medium tracking-wider uppercase mt-0.5">
                {COMPANY_INFO.name}
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              {COMPANY_INFO.aboutMission}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_INFO.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-amber-600/30 hover:text-amber-300 border border-white/10 flex items-center justify-center transition-all"
                title="Fanpage Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={COMPANY_INFO.tiktok}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-amber-600/30 hover:text-amber-300 border border-white/10 flex items-center justify-center transition-all"
                title="Kênh TikTok"
              >
                <span className="font-black text-xs">TT</span>
              </a>
            </div>
          </div>

          {/* Col 2: Liên kết nhanh */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-amber-200 border-l-2 border-amber-500 pl-2.5">
              Khám Phá & Đặt Vé
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  Trang chủ di sản
                </Link>
              </li>
              <li>
                <Link href="/kham-pha" className="hover:text-amber-300 transition-colors">
                  14 Điểm di tích tiêu biểu
                </Link>
              </li>
              <li>
                <Link href="/dat-ve" className="hover:text-amber-300 transition-colors">
                  Bảng giá & Đặt vé tham quan
                </Link>
              </li>
              <li>
                <Link href="/hanh-trinh" className="hover:text-amber-300 transition-colors">
                  Hành trình nửa ngày & 1 ngày
                </Link>
              </li>
              <li>
                <Link href="/thong-tin-ho-tro" className="hover:text-amber-300 transition-colors">
                  Nội quy & Hướng dẫn sử dụng vé QR
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Giờ mở cửa & Quy định */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-amber-200 border-l-2 border-amber-500 pl-2.5">
              Thời Gian Tham Quan
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                <span className="font-bold text-amber-300 block">Mùa hè (16/03 – 15/10):</span>
                <span>• Bán vé: 06:30 – 17:30</span>
                <span className="block text-stone-400">• Đóng cửa: 18:30</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                <span className="font-bold text-amber-300 block">Mùa đông (16/10 – 15/03):</span>
                <span>• Bán vé: 07:00 – 17:00</span>
                <span className="block text-stone-400">• Đóng cửa: 18:00</span>
              </div>
            </div>
          </div>

          {/* Col 4: Liên hệ & Hỗ trợ */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-amber-200 border-l-2 border-amber-500 pl-2.5">
              Thông Tin Liên Hệ
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.hotline}`}
                  className="font-bold text-amber-300 hover:text-white transition-colors"
                >
                  {COMPANY_INFO.hotline}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-amber-300 transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="pt-2">
                <div className="p-3 bg-red-950/60 rounded-xl border border-red-800/40 text-[11px] text-amber-200/90 leading-relaxed">
                  🛡️ Vé điện tử có mã QR hợp chuẩn, quét trực tiếp tại cổng không cần đổi vé giấy.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. Bộ nhận diện thương hiệu "Khảm Sắc Cố Đô".
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Bảo tồn & Lan tỏa Di sản Văn hóa Thế giới Cố đô Huế</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
