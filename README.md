# 7 Núi Travel — Du Lịch Nghỉ Dưỡng & Chữa Lành Bảy Núi An Giang

Website chuyên biệt cho mô hình **Du lịch chữa lành & Nghỉ dưỡng tâm trí (Healing Retreat Tourism)**, tập trung vào vùng đất Thất Sơn (Bảy Núi) - An Giang.

---

## 🍃 Triết Lý & Điểm Nhấn Thiết Kế

1. **Phong cách nghệ thuật nhẹ nhàng, sâu lắng (Mindful & Zen Aesthetic)**:
   - Tông màu lấy cảm hứng từ thiên nhiên An Giang: Xanh rêu rừng tràm Trà Sư (`#264638`), Be ấm phù sa (`#FAF7F2`), Vàng hoàng hôn thốt nốt (`#C88D3D`), và Nâu đất mẹ (`#9E6746`).
   - Kiểu chữ tiêu đề cổ điển, hoài niệm (`Cormorant Garamond`) tạo cảm giác sâu sắc, kết hợp font chữ hiện đại dễ đọc (`Plus Jakarta Sans`).
   - Hiệu ứng sương khói bồng bềnh nhẹ nhàng mô phỏng mây ngàn đỉnh Thiên Cấm Sơn.

2. **Chiến lược Marketing thấu hiểu nỗi đau (Empathy & High Conversion)**:
   - **Khối "Nỗi niềm cần buông" (The Mirror)**: Chạm thẳng vào tâm lý kiệt sức (burnout), áp lực KPI, quá tải thông báo điện thoại của người làm văn phòng.
   - **Trắc nghiệm nhanh 30s**: Giúp khách tự đánh giá mức độ căng thẳng và đề xuất hành trình xoa dịu tương ứng.
   - **Thông điệp chuyển hóa**: Không bán tour chạy sô, nhấn mạnh sự tĩnh lặng, nhóm nhỏ tối đa 8 khách, và trải nghiệm **Digital Detox** (tạm rời xa điện thoại, laptop).

3. **Tính Năng Tương Tác Đặc Sắc**:
   - **Pop-up Đăng Ký Tour Thông Minh**: Kích hoạt khi khách bấm "Đặt Tour" ở bất kỳ gói nào, tự động điền sẵn tên tour và có ô cho khách giãi bày nỗi niềm, mong muốn riêng tư.
   - **Trình Phát Chuông Thiền Thư Giãn (Ambient Zen Sound)**: Sử dụng Web Audio API tạo tiếng chuông xoay Tây Tạng ngân vang nhẹ nhàng giúp khách tĩnh tâm ngay khi vừa truy cập trang.
   - **Bộ Lọc Hành Trình**: Lọc theo thời gian (1 Ngày, 2N1D, 3N2D).
   - **Chế Độ Giao Diện Ngày Ấm / Đêm Rừng Trầm (Theme Switcher)**: Dịu mắt, phù hợp đọc cả vào ban đêm.

---

## 🚀 Cách Xem Website Ngay Lập Tức

### Cách 1: Mở trực tiếp bằng trình duyệt (Không cần cài đặt gì)
- Đi đến thư mục: `C:\Users\LENOVo\.gemini\antigravity\scratch\7-nui-travel`
- Nhấp đúp chuột vào file `index.html` để mở ngay trên trình duyệt (Chrome, Edge, Cốc Cốc, v.v.).

### Cách 2: Khởi chạy máy chủ cục bộ bằng Python
```powershell
python -m http.server 3000 --directory C:\Users\LENOVo\.gemini\antigravity\scratch\7-nui-travel
```
Sau đó truy cập địa chỉ: `http://localhost:3000`

### Cách 3: Chạy với Vite Dev Server
```powershell
cd C:\Users\LENOVo\.gemini\antigravity\scratch\7-nui-travel
npm install
npm run dev
```

---

## 📁 Cấu Trúc Mã Nguồn

```
7-nui-travel/
├── index.html        # Toàn bộ cấu trúc HTML5, thông điệp marketing và popup
├── package.json      # Cấu hình dự án cho Vite
├── README.md         # Hướng dẫn chi tiết
└── src/
    ├── styles.css    # Hiệu ứng mây bay, kiểu chữ serif, custom scrollbar
    └── main.js       # Xử lý popup đặt tour, âm thanh chuông thiền, trắc nghiệm
```

---

## ✍️ Hướng Dẫn Tùy Biến Thêm

- **Thay đổi thông tin liên hệ / Hotline**: Chỉnh sửa tại mục `#header`, phần chân trang `<footer>` và trong form popup ở file `index.html`.
- **Thêm gói tour hoặc đổi giá vé**: Cập nhật trực tiếp các thẻ `tour-card` trong phần `#tours` của `index.html`.
- **Kết nối gửi email đặt tour thực tế**: Dễ dàng liên kết Form `#tour-booking-form` với dịch vụ như EmailJS hoặc webhook Telegram để nhận thông báo đặt tour ngay về điện thoại.
