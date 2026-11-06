"use client";

import React, { useState, useEffect } from "react";
import { QrCode, CreditCard, CheckCircle2, ShieldCheck, AlertCircle, Loader2, X, Copy, Check } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    targetName: string;
    visitDate: string;
    timeSlot?: string;
    adultCount: number;
    childCount: number;
    totalAmount: number;
    ticketCode: string;
  };
  onSuccess: (ticketData: any) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  orderData,
  onSuccess
}) => {
  const [method, setMethod] = useState<"qr" | "atm" | "card">("qr");
  const [step, setStep] = useState<"select" | "processing" | "success">("select");
  const [copied, setCopied] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(600); // 10 minutes

  useEffect(() => {
    if (!isOpen) {
      setStep("select");
      setCountdown(600);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSimulatePayment = async () => {
    setStep("processing");

    let apiResult: any = null;

    // Call API with a strict 2.5-second timeout
    const apiCallPromise = (async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        const res = await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          apiResult = await res.json();
        }
      } catch (e) {
        console.warn("API call completed or handled:", e);
      }
    })();

    // Exact 2.2s loading + 0.8s success = 3.0s total experience
    await Promise.all([
      apiCallPromise,
      new Promise((resolve) => setTimeout(resolve, 2200))
    ]);

    setStep("success");

    setTimeout(() => {
      onSuccess(
        apiResult || {
          success: true,
          ticketCode: orderData.ticketCode,
          order: orderData
        }
      );
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900 via-stone-900 to-red-950 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-400/40">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-amber-100">
                Thanh toán mô phỏng an toàn
              </h3>
              <p className="text-[11px] text-amber-200/80">
                Quần thể Di tích Cố đô Huế – Mã đơn: {orderData.ticketCode}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {step === "processing" && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <Loader2 className="w-12 h-12 text-amber-600 animate-spin" />
              <div>
                <h4 className="font-bold text-stone-800 text-lg">Đang xác thực thanh toán...</h4>
                <p className="text-xs text-stone-500 mt-1">
                  Hệ thống đang kết nối ngân hàng và khởi tạo mã vé QR điện tử của bạn
                </p>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-emerald-700 text-xl">Thanh toán thành công!</h4>
              <p className="text-xs text-stone-600">Đang xuất vé điện tử chính thức...</p>
            </div>
          )}

          {step === "select" && (
            <>
              {/* Order quick recap */}
              <div className="bg-amber-50/60 rounded-xl p-3.5 border border-amber-200/60 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-stone-800">{orderData.targetName}</div>
                  <div className="text-stone-500 text-[11px] mt-0.5">
                    {orderData.visitDate} | {orderData.adultCount} NL, {orderData.childCount} TE
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-stone-500">Cần thanh toán</div>
                  <div className="font-bold text-base text-red-900">
                    {orderData.totalAmount.toLocaleString("vi-VN")} đ
                  </div>
                </div>
              </div>

              {/* Payment methods tab */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  Chọn phương thức thanh toán mô phỏng:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setMethod("qr")}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                      method === "qr"
                        ? "border-amber-600 bg-amber-50 text-amber-900 font-bold shadow-sm ring-1 ring-amber-600"
                        : "border-stone-200 bg-white hover:bg-stone-50 text-stone-600"
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-amber-700" />
                    <span className="text-[11px]">Quét VietQR</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod("atm")}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                      method === "atm"
                        ? "border-amber-600 bg-amber-50 text-amber-900 font-bold shadow-sm ring-1 ring-amber-600"
                        : "border-stone-200 bg-white hover:bg-stone-50 text-stone-600"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-amber-700" />
                    <span className="text-[11px]">Thẻ ATM Nội địa</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod("card")}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                      method === "card"
                        ? "border-amber-600 bg-amber-50 text-amber-900 font-bold shadow-sm ring-1 ring-amber-600"
                        : "border-stone-200 bg-white hover:bg-stone-50 text-stone-600"
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5 text-amber-700" />
                    <span className="text-[11px]">Visa / Master</span>
                  </button>
                </div>
              </div>

              {/* QR Code view */}
              {method === "qr" && (
                <div className="border border-stone-200 rounded-xl p-4 bg-white space-y-3.5">
                  <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
                    <span>Thời gian giữ vé:</span>
                    <span className="font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                      {formatTime(countdown)}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Simulated QR Box */}
                    <div className="relative p-2 bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-dashed border-amber-400 rounded-xl flex flex-col items-center justify-center shadow-inner">
                      <div className="w-40 h-40 bg-white rounded-lg p-2 shadow-sm flex flex-col items-center justify-center text-center">
                        {/* Realistic VietQR Graphic pattern */}
                        <div className="w-full h-full border border-stone-800 p-1 rounded flex flex-col justify-between">
                          <div className="flex justify-between">
                            <div className="w-8 h-8 border-4 border-stone-900 rounded-sm"></div>
                            <div className="w-8 h-8 border-4 border-stone-900 rounded-sm"></div>
                          </div>
                          <div className="text-[9px] font-bold tracking-tight text-amber-900 uppercase">
                            VIETQR HUẾ HERITAGE
                          </div>
                          <div className="flex justify-between">
                            <div className="w-8 h-8 border-4 border-stone-900 rounded-sm"></div>
                            <div className="w-4 h-4 bg-stone-900 rounded-sm m-2"></div>
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-stone-500 mt-1 font-medium">
                        Quét bằng App Ngân hàng bất kỳ
                      </span>
                    </div>

                    {/* Bank Info */}
                    <div className="flex-1 w-full space-y-2 text-xs">
                      <div className="bg-stone-50 p-2 rounded-lg border border-stone-100">
                        <div className="text-[10px] text-stone-400">Ngân hàng thụ hưởng</div>
                        <div className="font-bold text-stone-800">MBBank (Quân Đội) - CN Huế</div>
                      </div>

                      <div className="bg-stone-50 p-2 rounded-lg border border-stone-100 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-stone-400">Số tài khoản</div>
                          <div className="font-mono font-bold text-stone-800 text-sm">
                            0325912850
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy("0325912850", "stk")}
                          className="text-amber-700 hover:text-amber-900 flex items-center gap-1 text-[11px] font-semibold"
                        >
                          {copied === "stk" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          {copied === "stk" ? "Đã chép" : "Sao chép"}
                        </button>
                      </div>

                      <div className="bg-stone-50 p-2 rounded-lg border border-stone-100 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-stone-400">Nội dung chuyển khoản</div>
                          <div className="font-mono font-bold text-red-900 text-xs">
                            VEDISAN {orderData.ticketCode}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(`VEDISAN ${orderData.ticketCode}`, "nd")}
                          className="text-amber-700 hover:text-amber-900 flex items-center gap-1 text-[11px] font-semibold"
                        >
                          {copied === "nd" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          {copied === "nd" ? "Đã chép" : "Sao chép"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ATM / Card simulated inputs */}
              {method !== "qr" && (
                <div className="border border-stone-200 rounded-xl p-4 bg-white space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] text-stone-500 mb-1">Số thẻ (Mô phỏng)</label>
                    <input
                      type="text"
                      defaultValue="9704 2292 8888 6666"
                      className="w-full px-3 py-2 border rounded-lg font-mono text-stone-700 bg-stone-50"
                      readOnly
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-stone-500 mb-1">Tên in trên thẻ</label>
                      <input
                        type="text"
                        defaultValue={orderData.customerName.toUpperCase()}
                        className="w-full px-3 py-2 border rounded-lg font-mono text-stone-700 bg-stone-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-stone-500 mb-1">Hạn mở thẻ</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full px-3 py-2 border rounded-lg font-mono text-stone-700 bg-stone-50"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Sandbox notice */}
              <div className="flex items-start gap-2 bg-blue-50/80 border border-blue-200/80 rounded-xl p-3 text-[11px] text-blue-900 leading-relaxed">
                <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Hệ thống thanh toán thử nghiệm:</strong> Bạn không cần chuyển tiền thật. Nhấn nút <strong>“Xác nhận thanh toán mô phỏng”</strong> bên dưới để hoàn tất đơn hàng và nhận ngay vé điện tử có mã QR.
                </span>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={handleSimulatePayment}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-900 via-amber-700 to-red-950 hover:from-red-800 hover:to-red-900 text-white font-bold text-sm tracking-wide shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Xác nhận thanh toán mô phỏng ({orderData.totalAmount.toLocaleString("vi-VN")} đ)</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

