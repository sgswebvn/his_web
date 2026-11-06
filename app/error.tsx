"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Router Caught Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white rounded-3xl p-8 shadow-xl border border-red-200 space-y-5">
        <div className="w-14 h-14 bg-red-100 text-red-700 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif font-bold text-2xl text-stone-900">
            Đã Xảy Ra Lỗi Xử Lý
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            Hệ thống gặp sự cố khi tải trang. Bạn vui lòng thử tải lại trang hoặc quay về trang chủ.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => reset()}
            className="flex-1 py-3 px-4 rounded-xl bg-red-950 hover:bg-red-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-amber-300" />
            <span>Thử lại</span>
          </button>
          <Link
            href="/"
            className="flex-1 py-3 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Home className="w-4 h-4 text-stone-600" />
            <span>Trang chủ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

