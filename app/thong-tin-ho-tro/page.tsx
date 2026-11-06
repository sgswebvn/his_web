"use client";

import React, { useState } from "react";
import { COMPANY_INFO } from "@/data/heritageData";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  QrCode,
  Calendar,
  AlertCircle,
  Send
} from "lucide-react";

export default function ThongTinHoTroPage() {
  const [sentMessage, setSentMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentMessage(true);
    setTimeout(() => setSentMessage(false), 4000);
  };

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
          <HelpCircle className="w-4 h-4 text-amber-700" />
          Trung Tâm Hỗ Trợ Khách Tham Quan
        </span>
        <h1 className="font-serif font-black text-3xl sm:text-5xl text-stone-900 tracking-tight">
          Thông Tin & Hỗ Trợ Du Khách
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Tất cả thông tin về đơn vị vận hành, hướng dẫn đặt vé, hướng dẫn sử dụng vé điện tử QR, bảng giờ mở cửa và nội quy tham quan di tích Huế.
        </p>
      </div>

      {/* Grid: Company Intro & Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Intro */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-amber-200/80 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
              Đơn Vị Xây Dựng & Vận Hành
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              {COMPANY_INFO.name}
            </h2>
            <div className="text-sm text-amber-800 font-semibold">
              Bộ nhận diện thương hiệu: "{COMPANY_INFO.brand}"
            </div>
          </div>

          <p className="text-sm text-stone-600 leading-relaxed">
            {COMPANY_INFO.aboutMission}
          </p>

          <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 text-xs text-stone-700 space-y-2">
            <div className="font-bold text-stone-900">Tầm nhìn & Định hướng:</div>
            <p className="leading-relaxed text-stone-600">
              Chuyển đổi số mạnh mẽ trong trải nghiệm du lịch văn hóa, số hóa quy trình bán vé và soát vé qua mã QR, nâng tầm vẻ đẹp di sản văn hóa Việt Nam vươn xa trên bản đồ quốc tế.
            </p>
          </div>

          <div className="pt-2">
            <a
              href={COMPANY_INFO.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Theo dõi Fanpage chính thức</span>
            </a>
          </div>
        </div>

        {/* Contact info cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-stone-900 text-white rounded-3xl p-8 shadow-xl border border-amber-500/30 space-y-6">
            <h3 className="font-serif font-bold text-xl text-amber-200 border-b border-white/10 pb-3">
              Kênh Liên Hệ & Trợ Giúp
            </h3>
            <ul className="space-y-4 text-xs">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-stone-400">Trụ sở chính:</div>
                  <div className="font-semibold text-stone-200 mt-0.5">{COMPANY_INFO.address}</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-stone-400">Đường dây nóng hỗ trợ (Hotline):</div>
                  <a href={`tel:${COMPANY_INFO.hotline}`} className="font-bold text-base text-amber-300 hover:underline">
                    {COMPANY_INFO.hotline}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-stone-400">Hòm thư điện tử:</div>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="font-semibold text-amber-200 hover:underline">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick contact form */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-stone-200 space-y-4">
            <h4 className="font-serif font-bold text-base text-stone-900">
              Gửi tin nhắn cho chúng tôi
            </h4>
            {sentMessage ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Tin nhắn của bạn đã được gửi thành công! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Họ và tên của bạn"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="email"
                  required
                  placeholder="Email của bạn"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Nội dung cần hỗ trợ (đặt vé, lộ trình, dịch vụ,...)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-red-950 hover:bg-red-900 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-amber-300" />
                  <span>Gửi tin nhắn</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Booking Guide & QR Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 5-step booking */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-amber-200/80 space-y-4">
          <div className="flex items-center gap-2.5 text-amber-800 border-b border-stone-100 pb-3">
            <CheckCircle2 className="w-5 h-5 text-amber-700" />
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Hướng Dẫn Đặt Vé & Thanh Toán (5 Bước)
            </h3>
          </div>
          <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
            <div><strong>Bước 1. Lựa chọn vé tham quan:</strong> Truy cập mục Đặt vé, chọn vé đơn điểm hoặc vé theo tuyến phù hợp.</div>
            <div><strong>Bước 2. Chọn ngày & số lượng:</strong> Chọn ngày dự kiến tham quan (kèm xem thời tiết), số lượng vé người lớn và trẻ em.</div>
            <div><strong>Bước 3. Nhập thông tin người đặt:</strong> Điền chính xác họ tên, số điện thoại và email để nhận vé điện tử.</div>
            <div><strong>Bước 4. Kiểm tra & thanh toán:</strong> Kiểm tra lại điểm tham quan, ngày sử dụng, số lượng vé và thực hiện thanh toán trực tuyến an toàn.</div>
            <div><strong>Bước 5. Nhận vé điện tử:</strong> Sau khi xác nhận, vé điện tử kèm mã QR sẽ hiển thị tức thì và tự động gửi tới email của bạn.</div>
          </div>
        </div>

        {/* QR Usage Guide */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-amber-200/80 space-y-4">
          <div className="flex items-center gap-2.5 text-amber-800 border-b border-stone-100 pb-3">
            <QrCode className="w-5 h-5 text-amber-700" />
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Hướng Dẫn Sử Dụng Vé Điện Tử QR Tại Cổng
            </h3>
          </div>
          <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
            <div><strong>1. Nhận vé:</strong> Kiểm tra email hoặc màn hình xác nhận sau khi đặt vé thành công.</div>
            <div><strong>2. Kiểm tra thông tin:</strong> Đối chiếu mã vé, tên người đặt, địa điểm và ngày sử dụng.</div>
            <div><strong>3. Chuẩn bị mã QR:</strong> Mở vé điện tử trên điện thoại hoặc mang theo bản in vé.</div>
            <div><strong>4. Xuất trình vé:</strong> Đưa mã QR cho nhân viên tại cổng kiểm soát để máy quét quét mã.</div>
            <div><strong>5. Hoàn tất vào cổng:</strong> Thực hiện theo hướng dẫn của nhân viên và bắt đầu tham quan di tích.</div>
          </div>
        </div>
      </div>

      {/* Opening Hours & 10 Regulations */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-amber-200/80 space-y-8">
        <div>
          <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
            Quy Định Chung
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-stone-900 mt-1">
            Thời Gian Mở Cửa & 10 Điều Nội Quy Tham Quan
          </h2>
        </div>

        {/* Hours */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-1.5">
            <span className="font-bold text-red-950 text-sm block">Thời gian mở cửa bán vé:</span>
            <p>• <strong>Mùa hè (16/03 đến 15/10):</strong> 06h30 đến 17h30 (Đóng cửa ngừng đón khách: 18h30)</p>
            <p>• <strong>Mùa đông (16/10 đến 15/03 năm sau):</strong> 07h00 đến 17h00 (Đóng cửa ngừng đón khách: 18h00)</p>
          </div>
          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-1.5 text-stone-600">
            <span className="font-bold text-stone-900 text-sm block">Lưu ý thời gian đóng cửa:</span>
            <p>Thời gian đóng cửa ngừng phục vụ khách tham quan được tính 60 phút kể từ khi kết thúc thời gian bán vé quy định.</p>
          </div>
        </div>

        {/* 10 Regulations Full */}
        <div className="space-y-3">
          <h3 className="font-serif font-bold text-base text-stone-900 border-l-4 border-red-800 pl-3">
            Nội quy tham quan di tích:
          </h3>
          <ol className="space-y-2.5 text-xs text-stone-600 leading-relaxed list-decimal list-inside">
            {COMPANY_INFO.rules.map((rule, idx) => (
              <li key={idx} className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                {rule}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
