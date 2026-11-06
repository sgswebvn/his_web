# Mistory.vn - Next.js Fullstack Clone

Dự án clone toàn diện giao diện và chức năng của website thương hiệu mỹ phẩm **Mistory** ([https://mistory.vn/](https://mistory.vn/)), xây dựng hoàn chỉnh bằng **Next.js 14 (App Router) + TypeScript + React Context**.

---

## 🌟 Kiến trúc Next.js (App Router)

### 1. Quản lý trạng thái bằng React Context (`/context/CartContext.tsx`)
- **Cart Context (`useCart()`)**: Quản lý giỏ hàng toàn cục qua React State, tự động lưu trữ và đồng bộ bền vững với `localStorage`.
- **Huy hiệu giỏ hàng (Cart Badge)**: Tự động cập nhật số lượng tức thời trên Header ở bất kỳ trang nào.
- **Thao tác giỏ hàng**: Thêm sản phẩm, tăng/giảm số lượng, xóa sản phẩm, làm trống giỏ hàng.
- **Mã ưu đãi (Coupons)**: Tự động tính toán chiết khấu (`MISTORY10`, `FREESHIP`, `MISTORY50K`).
- **Thông báo Toast**: Hiển thị popup toast mượt mà góc màn hình khi thêm sản phẩm thành công.

### 2. Các Components cốt lõi (`/components/`)
- **`Header.tsx`**: Thanh điều hướng cố định (Sticky Header khi cuộn trang), logo, menu chính với dropdown, icon tìm kiếm mở nhanh khung tìm kiếm, icon tài khoản, icon giỏ hàng kèm badge số lượng thời gian thực, nút hamburger mở menu mobile.
- **`Footer.tsx`**: Chân trang đầy đủ thông tin thương hiệu, chính sách hỗ trợ, các kênh mạng xã hội, hotline, email.
- **`MobileMenu.tsx`**: Drawer menu trượt mượt mà cho màn hình điện thoại với sub-menu dạng accordion.
- **`Toast.tsx`**: Toast notification tự động xuất hiện và biến mất sau 4 giây.
- **`LayoutShell.tsx`**: Wrapper bọc toàn bộ ứng dụng với `CartProvider`.

### 3. Hệ thống Trang Next.js (`/app/`)
- `/` - **Trang chủ**: Video banner, intro mây bay, giới thiệu bộ sưu tập Vũ Khúc Thủy Đình, sản phẩm nổi bật, slider, câu chuyện thương hiệu.
- `/cua-hang` - **Cửa hàng**: Danh mục accordion mở rộng/thu gọn mượt mà, phân loại "Sản phẩm" và "Quà tặng".
- `/san-pham`, `/qua-tang` - **Danh mục rút gọn**.
- `/phan-ma-hong-4in1-vu-khuc-thuy-dinh` - **Trang chi tiết sản phẩm**: Bộ chọn phiên bản (Swatches), tăng giảm số lượng, Drawer mua hàng (`#popup-box`), nút "Thêm vào giỏ" và "Mua ngay".
- `/phan-phu-lua-hong`, `/phan-phu-lua-trong-suot`, `/guong-phuong-o`, `/box-sach-lich-su` - **Các trang chi tiết sản phẩm khác**.
- `/gio-hang` - **Trang Giỏ hàng React**: Bảng sản phẩm chi tiết, kiểm soát số lượng trực tiếp, form nhập mã giảm giá, tính phí vận chuyển, tổng tiền.
- `/thanh-toan` - **Trang Thanh toán React**: Form thu thập thông tin khách hàng, chọn phương thức COD / Chuyển khoản VietQR / Thẻ quốc tế, kiểm tra dữ liệu và sinh mã đơn hàng thực tế (`MS-XXXXXX`).
- `/tai-khoan` - **Tài khoản**: Đăng nhập & Đăng ký người dùng, lưu phiên đăng nhập và hiển thị dashboard khách hàng.
- `/tim-kiem` - **Tìm kiếm**: Lọc và hiển thị sản phẩm theo từ khóa `?s=...`.
- `/tin-tuc`, `/cau-chuyen-van-hoa-lich-su`, `/cham-soc-suc-khoe-sac-dep` - **Blog & Chuyên mục tin tức**.
- `/lien-he` - **Liên hệ**: Form liên hệ với xác thực và trạng thái gửi thành công.
- `/chinh-sach-bao-mat`, `/chinh-sach-doi-tra`, `/chinh-sach-van-don` - **Các trang chính sách**.

---

## 🚀 Khởi chạy dự án

### Chế độ phát triển (Development):
```bash
npm run dev
```
Truy cập: [http://localhost:3000](http://localhost:3000)

### Chế độ Production (Build & Start):
```bash
npm run build
npm run start
```

---

## 📦 Tài nguyên cục bộ (100% Local in `public/`)
- Mọi hình ảnh, font chữ (`BeVietnamPro`, `BeautiqueDisplay`, `Lavonia`), file CSS, vector SVG và video gốc 128 MB (`0605_VKTD_FINALE.mp4`) nằm trọn vẹn trong thư mục `public/wp-content/`.
- Không phụ thuộc mạng Internet, hoàn toàn độc lập và an toàn.
