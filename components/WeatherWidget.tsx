"use client";

import React, { useMemo } from "react";
import { CloudSun, Sun, CloudRain, Wind, Thermometer } from "lucide-react";

interface WeatherWidgetProps {
  selectedDate: string;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ selectedDate }) => {
  const weatherInfo = useMemo(() => {
    if (!selectedDate) {
      return {
        temp: "27°C",
        status: "Trời nắng ráo, dịu mát",
        icon: Sun,
        humidity: "72%",
        recommendation: "Thời tiết rất thích hợp để dạo bộ tham quan Đại Nội và các lăng tẩm hoàng gia.",
        color: "text-amber-500"
      };
    }

    const d = new Date(selectedDate);
    const day = d.getDate();
    const month = d.getMonth() + 1;

    // Simulate realistic Hue weather based on seasonality
    // Hue rainy season is typically Oct - Jan, sunny Feb - Aug
    if (month >= 10 || month <= 1) {
      const isRainyDay = day % 3 === 0;
      if (isRainyDay) {
        return {
          temp: "22°C - 24°C",
          status: "Mưa phùn nhẹ đặc trưng Cố Đô",
          icon: CloudRain,
          humidity: "88%",
          recommendation: "Mang theo ô/dù che mưa. Cảnh sắc hoàng cung dưới mưa Huế mang nét trầm mặc rất thơ mộng.",
          color: "text-blue-500"
        };
      } else {
        return {
          temp: "23°C - 25°C",
          status: "Trời mát mẻ, nhiều mây dịu nhẹ",
          icon: CloudSun,
          humidity: "78%",
          recommendation: "Thời tiết lý tưởng, không bị gắt nắng, rất thuận lợi để tham quan ngoài trời.",
          color: "text-emerald-500"
        };
      }
    } else {
      return {
        temp: "28°C - 32°C",
        status: "Nắng vàng rực rỡ, trời trong xanh",
        icon: Sun,
        humidity: "65%",
        recommendation: "Nên mang nón lá, kem chống nắng và đi sớm buổi sáng để chụp ảnh tuyệt đẹp.",
        color: "text-amber-500"
      };
    }
  }, [selectedDate]);

  const IconComponent = weatherInfo.icon;

  return (
    <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 text-xs text-stone-700 shadow-sm transition-all">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5 font-semibold text-stone-800">
          <IconComponent className={`w-4 h-4 ${weatherInfo.color}`} />
          <span>Dự báo thời tiết Huế: {weatherInfo.status}</span>
        </div>
        <div className="flex items-center gap-1 font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-full">
          <Thermometer className="w-3 h-3 text-amber-700" />
          <span>{weatherInfo.temp}</span>
        </div>
      </div>
      <p className="text-[11px] leading-relaxed text-stone-600">
        💡 {weatherInfo.recommendation} (Độ ẩm: {weatherInfo.humidity})
      </p>
    </div>
  );
};

