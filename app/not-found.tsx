import Link from "next/link";
import { Compass, Ticket, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white rounded-3xl p-8 shadow-xl border border-amber-200/80 space-y-5">
        <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto font-serif font-black text-2xl">
          404
        </div>
        <div className="space-y-2">
          <h2 className="font-serif font-bold text-2xl text-stone-900">
            Trang Không Tồn Tại
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            Đường dẫn bạn vừa truy cập không tồn tại hoặc đã được chuyển sang hệ thống đặt vé mới của Quần thể Di tích Cố đô Huế.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <Link
            href="/"
            className="flex-1 py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Home className="w-4 h-4 text-amber-300" />
            <span>Về trang chủ</span>
          </Link>
          <Link
            href="/dat-ve"
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-900 to-amber-700 hover:from-red-800 hover:to-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Ticket className="w-4 h-4 text-amber-300" />
            <span>Đặt vé tham quan</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

