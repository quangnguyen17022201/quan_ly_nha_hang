# SPATULA & STAR – Website quản lý nhà hàng (bản đơn giản)

Bài tập lớn môn Thiết kế Web.

| Họ tên | MSSV | Phụ trách |
| :--- | :--- | :--- |
| **Nguyễn Duy Quang** | 252601076 | Trang gọi món, sơ đồ bàn, triển khai GitHub Pages |
| **Nguyễn Tú Tài** | 252601081 | Trang quản lý / đặt bàn |
| **Trịnh Việt Anh** | 252601015 | Trang thanh toán hóa đơn, xử lý tính tổng tiền |
| **Hoàng Công Tiến Dũng**(Trưởng nhóm)  | 252601023 | Phân tích yêu cầu, hỗ trợ kiểm thử và viết báo cáo |
| **Hàn Tuấn Đạt** | 252601032 | Trang đăng nhập, đồng hồ thời gian thực, hỗ trợ kết nối hệ thống |

---
### LIÊN KẾT TRANG
KHO CHỨ CODE:**https://github.com/quangnguyen17022201/quan_ly_nha_hang

WEBSITE TRỰC TIẾP:**https://quangnguyen17022201.github.io/quan_ly_nha_hang/
---

###  DANH SÁCH TRANG VÀ CHỨC NĂNG

| Trang | File HTML | Chức năng chính |
| :--- | :--- | :--- |
| **Đăng nhập** | `index.html` | Đăng nhập hệ thống nhà hàng, xác thực tài khoản ca làm việc, hiển thị đồng hồ thời gian thực. |
| **Đặt bàn** | `datban.html` | Hiển thị danh sách/sơ đồ bàn, đặt bàn trước, cập nhật trạng thái bàn trống hoặc đang có khách. |
| **Gọi món** | `goi-mon.html` | Hiển thị thực đơn theo danh mục (Món chính, Súp, Spaghetti, Đồ uống...), thêm món vào order, cập nhật tổng tiền tạm tính. |
| **Thanh toán** | `thanh-toan.html` | Xem chi tiết hóa đơn theo bàn, tính tổng tiền, thực hiện thanh toán, in hóa đơn và giải phóng trạng thái bàn. |

---
###  CẤU TRÚC THƯ MỤC DỰ ÁN

```text
quan_ly_nha_hang/
├── index.html              # Trang đăng nhập hệ thống
├── datban.html             # Trang quản lý & đặt bàn
├── goi-mon.html            # Trang thực đơn gọi món
├── thanh-toan.html         # Trang xem hóa đơn & thanh toán
├── css/
│   ├── dangnhap.css        # Kiểu dáng trang đăng nhập
│   ├── datban.css          # Kiểu dáng sơ đồ bàn & trạng thái
│   ├── goi-mon.css         # Kiểu dáng thực đơn & phiếu order
│   └── thanh-toan.css      # Kiểu dáng phiếu thanh toán
├── js/
│   ├── dangnhap.js         # Logic xác thực & đồng hồ hệ thống
│   ├── datban.js           # Logic lưu trữ & cập nhật sơ đồ bàn
│   ├── goi-mon.js          # Logic chọn món, tính tiền tạm tính
│   └── thanh-toan.js       # Logic xuất hóa đơn & xóa dữ liệu bàn
└── image/                  # Logo nhà hàng, ảnh món ăn, ảnh nền
```
---
##  Tài Khoản nhân viên đăng nhập

Để kiểm thử các chức năng Thầy-Cô và các bạn có thể đăng nhập tại trang `index.html` với thông tin sau:

- **Tài khoản Quản trị (Admin):**
  - **Tên đăng nhập:** `ADMIN`
  - **Mật khẩu:** `123456`
---
### CÁCH DÙNG 
 Mở trình duyệt và truy cập: https://github.com/quangnguyen17022201/quan_ly_nha_hang
---
### CẤU TRÚC DỮ LIỆU (LOCALSTORAGE)

Do dự án triển khai dưới dạng ứng dụng Front-End thuần, dữ liệu được lưu trữ trực tiếp trên **LocalStorage** của trình duyệt theo các khóa sau:

1. **`danhSachBan`**: Lưu danh sách trạng thái của tất cả các bàn trong nhà hàng.
   * *Dữ liệu mẫu:* `[{ soBan: 1, trangThai: "da-dat", tenKhach: "Nguyễn Văn A" }, ...]`
2. **`donHang_Ban_X`**: Lưu danh sách các món ăn đã được chọn kèm số lượng và đơn giá riêng cho từng bàn `X`.
   * *Dữ liệu mẫu:* `[{ tenMon: "Beefsteak", soLuong: 2, gia: 350000 }, ...]`
3. **`thongTinThanhToan`**: Lưu thông tin bàn ăn đang chuyển sang trang thanh toán để tạo hóa đơn.

---
###  TỔNG KẾT VÀ HƯỚNG PHÁT TRIỂN
* **Kết quả đạt được:** Hệ thống hoàn thiện đầy đủ các chức năng quản lý từ khâu Đăng nhập $\rightarrow$ Đặt bàn $\rightarrow$ Gọi món $\rightarrow$ Thanh toán. Giao diện đồng bộ, hiển thị mượt mà trên trình duyệt.
