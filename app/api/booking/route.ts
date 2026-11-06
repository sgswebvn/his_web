import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import QRCode from "qrcode";
import { COMPANY_INFO } from "@/data/heritageData";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      targetName,
      ticketType,
      visitDate,
      timeSlot,
      adultCount = 1,
      childCount = 0,
      totalAmount = 0,
      customNote = ""
    } = body;

    if (!customerName || !customerPhone || !customerEmail || !targetName || !visitDate) {
      return NextResponse.json(
        { success: false, message: "Vui lòng cung cấp đầy đủ thông tin đặt vé bắt buộc." },
        { status: 400 }
      );
    }

    // Generate unique Ticket ID
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const ticketCode = body.ticketCode || `HUE-${new Date().getFullYear()}-${randomSuffix}`;
    const formattedDate = new Date(visitDate).toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    // Generate QR Code data URL & buffer for inline email embedding
    const qrPayload = JSON.stringify({
      code: ticketCode,
      name: customerName,
      site: targetName,
      date: visitDate,
      adults: adultCount,
      children: childCount,
      total: totalAmount,
      issuer: COMPANY_INFO.name,
      verified: true
    });

    const qrDataUrl = await QRCode.toDataURL(qrPayload, {
      width: 320,
      margin: 2,
      color: {
        dark: "#7f1d1d", // Royal maroon
        light: "#ffffff"
      }
    });

    // Generate PNG Buffer for attachment
    const qrBuffer = await QRCode.toBuffer(qrPayload, {
      width: 320,
      margin: 2,
      color: {
        dark: "#7f1d1d",
        light: "#ffffff"
      }
    });

    const adminEmail = process.env.ADMIN_EMAIL || "hieucv204@gmail.com";
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM || "Khảm Sắc Cố Đô <onboarding@resend.dev>";

    // Build Email HTML Templates
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #fbf7ee; padding: 24px; color: #291a10;">
        <div style="max-w: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e7d8c5; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
          <div style="background: linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%); color: #ffffff; padding: 28px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px; letter-spacing: 1px; color: #fef08a;">QUẦN THỂ DI TÍCH CỐ ĐÔ HUẾ</h1>
            <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9; color: #fde68a;">KHẢM SẮC CỐ ĐÔ – VÉ THAM QUAN ĐIỆN TỬ CHÍNH THỨC</p>
          </div>
          
          <div style="padding: 28px;">
            <p style="font-size: 16px; margin-top: 0;">Kính gửi <strong>${customerName}</strong>,</p>
            <p style="font-size: 14px; line-height: 1.6; color: #4b5563;">
              Cảm ơn quý khách đã tin tưởng lựa chọn tham quan Quần thể Di tích Cố đô Huế. Đơn đặt vé của quý khách đã được thanh toán và xác nhận thành công trên hệ thống.
            </p>

            <div style="background: #fffbeb; border: 2px dashed #f59e0b; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
              <span style="font-size: 12px; font-weight: bold; color: #92400e; text-transform: uppercase; letter-spacing: 1px;">MÃ VÉ ĐIỆN TỬ HỢP LỆ</span>
              <div style="font-size: 26px; font-weight: bold; color: #7f1d1d; letter-spacing: 2px; margin: 8px 0;">${ticketCode}</div>
              
              <div style="margin: 16px 0;">
                <img src="${qrDataUrl}" alt="Mã QR Soát Vé" style="width: 200px; height: 200px; border-radius: 10px; border: 1px solid #d1d5db; display: block; margin: 0 auto;" />
              </div>

              <p style="font-size: 12px; color: #78350f; margin: 0; font-weight: bold;">
                (Xuất trình mã QR này trực tiếp tại cổng kiểm soát vé để quét vào tham quan. File ảnh QR cũng được đính kèm ở thư này.)
              </p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
              <tbody>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 0; color: #6b7280;">Điểm tham quan / Tuyến:</td>
                  <td style="padding: 10px 0; font-weight: bold; text-align: right; color: #111827;">${targetName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 0; color: #6b7280;">Ngày tham quan:</td>
                  <td style="padding: 10px 0; font-weight: bold; text-align: right; color: #111827;">${formattedDate}</td>
                </tr>
                ${timeSlot ? `
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 0; color: #6b7280;">Khung giờ đón khách:</td>
                  <td style="padding: 10px 0; font-weight: bold; text-align: right; color: #111827;">${timeSlot}</td>
                </tr>` : ""}
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 0; color: #6b7280;">Số lượng vé Người lớn:</td>
                  <td style="padding: 10px 0; font-weight: bold; text-align: right; color: #111827;">${adultCount} vé</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 0; color: #6b7280;">Số lượng vé Trẻ em (7–12 tuổi):</td>
                  <td style="padding: 10px 0; font-weight: bold; text-align: right; color: #111827;">${childCount} vé</td>
                </tr>
                <tr style="border-bottom: 2px solid #7f1d1d;">
                  <td style="padding: 14px 0; font-size: 16px; font-weight: bold; color: #7f1d1d;">Tổng thanh toán:</td>
                  <td style="padding: 14px 0; font-size: 20px; font-weight: bold; text-align: right; color: #b45309;">${Number(totalAmount).toLocaleString("vi-VN")} đ</td>
                </tr>
              </tbody>
            </table>

            <div style="background-color: #f8fafc; border-radius: 10px; padding: 18px; font-size: 13px; line-height: 1.6; color: #334155; margin-bottom: 24px; border-left: 4px solid #7f1d1d;">
              <strong style="color: #0f172a; display: block; margin-bottom: 8px;">Quy định tham quan & Giờ mở cửa:</strong>
              <ul style="margin: 0; padding-left: 20px;">
                <li><strong>Thời gian mở cửa:</strong> Mùa hè (16/03–15/10) từ 06:30 đến 17:30 (đóng cửa 18:30); Mùa đông (16/10–15/03) từ 07:00 đến 17:00 (đóng cửa 18:00).</li>
                <li>Trang phục lịch sự, trang nghiêm khi vào khu vực nội điện và các cung điện thờ cúng.</li>
                <li>Không mang vũ khí, chất cháy nổ và không hút thuốc lá trong khuôn viên di tích.</li>
                <li>Giữ gìn vệ sinh chung, không viết vẽ lên hiện vật hoặc công trình kiến trúc cổ.</li>
              </ul>
            </div>

            <div style="text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px;">
              <p style="margin: 0; font-weight: bold; color: #7f1d1d; font-size: 15px;">${COMPANY_INFO.name}</p>
              <p style="margin: 4px 0; font-size: 12px; color: #6b7280;">Hotline: ${COMPANY_INFO.hotline} | Email: ${COMPANY_INFO.email}</p>
              <p style="margin: 0; font-size: 12px; color: #6b7280;">Địa chỉ: ${COMPANY_INFO.address}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #1f2937;">
        <h2 style="color: #7f1d1d;">Thông báo đơn đặt vé mới</h2>
        <p>Hệ thống vừa ghi nhận đơn đặt vé thành công:</p>
        <ul>
          <li><strong>Mã vé:</strong> ${ticketCode}</li>
          <li><strong>Khách hàng:</strong> ${customerName}</li>
          <li><strong>Số điện thoại:</strong> ${customerPhone}</li>
          <li><strong>Email khách:</strong> ${customerEmail}</li>
          <li><strong>Địa điểm / Tuyến:</strong> ${targetName}</li>
          <li><strong>Ngày tham quan:</strong> ${formattedDate} (${timeSlot || "Cả ngày"})</li>
          <li><strong>Vé người lớn:</strong> ${adultCount} vé</li>
          <li><strong>Vé trẻ em:</strong> ${childCount} vé</li>
          <li><strong>Tổng tiền:</strong> ${Number(totalAmount).toLocaleString("vi-VN")} đ</li>
          <li><strong>Ghi chú:</strong> ${customNote || "Không có"}</li>
          <li><strong>Thời gian đặt:</strong> ${new Date().toLocaleString("vi-VN")}</li>
        </ul>
      </div>
    `;

    // -------------------------------------------------------------
    // EMAIL SENDING ENGINE (RESEND API -> FALLBACK GMAIL SMTP)
    // Runs super fast via HTTPS REST (Port 443), never blocked by Render!
    // -------------------------------------------------------------
    const sendEmails = async () => {
      // 1. Try Resend if API Key is configured
      if (resendApiKey && resendApiKey.trim().length > 0) {
        try {
          const resend = new Resend(resendApiKey);

          const [customerRes, adminRes] = await Promise.allSettled([
            resend.emails.send({
              from: resendFrom,
              to: [customerEmail],
              subject: `[Xác nhận đặt vé thành công] Mã vé: ${ticketCode} - ${targetName}`,
              html: customerHtml,
              attachments: [
                {
                  filename: `ve-dien-tu-${ticketCode}.png`,
                  content: qrBuffer
                }
              ]
            }),
            resend.emails.send({
              from: resendFrom,
              to: [adminEmail],
              subject: `[ĐƠN VÉ MỚI] ${ticketCode} - ${customerName} - ${Number(totalAmount).toLocaleString("vi-VN")} đ`,
              html: adminHtml,
              attachments: [
                {
                  filename: `ve-dien-tu-${ticketCode}.png`,
                  content: qrBuffer
                }
              ]
            })
          ]);

          console.log("Resend execution finished:", { customerRes, adminRes });
          return;
        } catch (resendErr: any) {
          console.error("Resend API failed, falling back to SMTP:", resendErr?.message);
        }
      }

      // 2. Fallback to Nodemailer SMTP (Localhost / backup)
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (smtpUser && smtpPass && smtpPass.trim().length > 0) {
        try {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true,
            connectionTimeout: 4000,
            greetingTimeout: 4000,
            socketTimeout: 4000,
            auth: {
              user: smtpUser,
              pass: smtpPass
            }
          });

          await Promise.allSettled([
            transporter.sendMail({
              from: `"Khảm Sắc Cố Đô – Di Sản Huế" <${smtpUser}>`,
              to: customerEmail,
              subject: `[Xác nhận đặt vé thành công] Mã vé: ${ticketCode} - ${targetName}`,
              html: customerHtml,
              attachments: [
                {
                  filename: `ve-dien-tu-${ticketCode}.png`,
                  content: qrBuffer
                }
              ]
            }),
            transporter.sendMail({
              from: `"Hệ thống Đặt vé Di sản Huế" <${smtpUser}>`,
              to: adminEmail,
              subject: `[ĐƠN VÉ MỚI] ${ticketCode} - ${customerName} - ${Number(totalAmount).toLocaleString("vi-VN")} đ`,
              html: adminHtml,
              attachments: [
                {
                  filename: `ve-dien-tu-${ticketCode}.png`,
                  content: qrBuffer
                }
              ]
            })
          ]);
          console.log("SMTP fallback email finished");
        } catch (smtpErr: any) {
          console.error("SMTP fallback error:", smtpErr?.message);
        }
      }
    };

    // Execute email sending in background or fast await (up to 1.5s max so request never hangs)
    await Promise.race([
      sendEmails(),
      new Promise((resolve) => setTimeout(resolve, 1500))
    ]);

    // Return instant success response with full ticket and QR code
    return NextResponse.json({
      success: true,
      ticketCode,
      qrDataUrl,
      order: {
        ticketCode,
        customerName,
        customerPhone,
        customerEmail,
        targetName,
        ticketType,
        visitDate,
        formattedDate,
        timeSlot: timeSlot || "Theo quy định giờ mở cửa",
        adultCount,
        childCount,
        totalAmount,
        qrDataUrl,
        createdAt: new Date().toISOString()
      },
      emailStatus: {
        engine: resendApiKey ? "resend" : "smtp",
        dispatched: true
      }
    });
  } catch (error: any) {
    console.error("Booking API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Đã xảy ra lỗi trong quá trình xử lý đơn đặt vé." },
      { status: 500 }
    );
  }
}
